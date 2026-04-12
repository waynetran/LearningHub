/*
 * LearningHub — Problem Set Infrastructure
 * --------------------------------------------------
 * Shared client-side library for rendering parametric + static problem sets
 * on subject pages. All problems are generated or drawn entirely in the
 * browser so the site stays static and works on file://.
 *
 * How a subject page uses it:
 *
 *   <!-- in the page body, wherever a practice section belongs -->
 *   <div class="problem-set" data-topic="deriv-basic"></div>
 *
 *   <!-- near the bottom of the page -->
 *   <script defer src="calculus-problems.js"></script>  <!-- registers topics -->
 *   <script defer src="../problem-set.js"></script>     <!-- inits on DOMContentLoaded -->
 *
 * The topic file registers each topic with LearningHubProblemSet.registerTopic():
 *
 *   LearningHubProblemSet.registerTopic("deriv-basic", {
 *     title: "Derivatives — basic rules",
 *     warmup:   [genDerivPowerEasy, genDerivPolyEasy, ...],
 *     standard: [genDerivProduct, genDerivQuotient, ...],
 *     challenge: STATIC_BANK_DERIV_CHALLENGE,
 *     warmupCount: 5, standardCount: 5, challengeCount: 3,
 *   });
 *
 * A generator is any function `(rng) => { prompt, answer, steps, params? }`.
 * A static bank is an array of `{ prompt, answer, steps }` objects.
 *
 * Tiers can mix generators and static banks — each "source" in a tier array
 * is either a function or an array. The rng picks a static problem if the
 * source is an array, or calls the function with the rng if it's a function.
 */
(function () {
  "use strict";

  if (window.__LearningHubProblemSetLoaded) return;
  window.__LearningHubProblemSetLoaded = true;

  // ---------------------------------------------------------------- RNG
  // mulberry32 — deterministic 32-bit seeded PRNG. Same seed → same problems.
  function makeRng(seed) {
    var s = (seed >>> 0) || 1;
    var rng = {
      seed: seed,
      next: function () {
        s = (s + 0x6d2b79f5) >>> 0;
        var t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
    };
    rng.int = function (min, max) {
      return min + Math.floor(rng.next() * (max - min + 1));
    };
    rng.nonzeroInt = function (min, max) {
      var v;
      do { v = rng.int(min, max); } while (v === 0);
      return v;
    };
    rng.sign = function () { return rng.next() < 0.5 ? -1 : 1; };
    rng.pick = function (arr) {
      if (!arr || !arr.length) return null;
      return arr[Math.floor(rng.next() * arr.length)];
    };
    rng.pickN = function (arr, n) {
      // sample without replacement
      var copy = arr.slice();
      var out = [];
      while (out.length < n && copy.length) {
        var i = Math.floor(rng.next() * copy.length);
        out.push(copy.splice(i, 1)[0]);
      }
      return out;
    };
    rng.bool = function () { return rng.next() < 0.5; };
    return rng;
  }

  function freshSeed() {
    return (Math.floor(Math.random() * 0x7fffffff) + 1) >>> 0;
  }

  // ---------------------------------------------------------------- registry
  var TOPICS = {}; // name → topic spec

  function registerTopic(name, spec) {
    if (!name || !spec) return;
    TOPICS[name] = spec;
    // If the page already booted, retro-render any blocks waiting on this topic
    if (window.__LearningHubProblemSetBooted) {
      document.querySelectorAll('.problem-set[data-topic="' + name + '"]').forEach(function (el) {
        if (!el.dataset.rendered) hydrate(el);
      });
    }
  }

  // ---------------------------------------------------------------- instantiation
  // Turn a tier source into `count` concrete problems.
  // A tier is an Array<Source>. Each Source is either:
  //   - a generator function (rng) => problem  — called per problem
  //   - an array of static problems            — one is picked per problem
  function buildTier(tier, count, rng) {
    var out = [];
    if (!tier) return out;

    // Normalize: if the tier is a single function or single array, wrap it.
    var sources;
    if (typeof tier === "function") sources = [tier];
    else if (Array.isArray(tier)) {
      // Distinguish an array-of-sources from an array-of-static-problems.
      // Heuristic: if the first entry is a function or an array, it's a list
      // of sources. Otherwise treat the whole array as one static bank.
      if (tier.length && (typeof tier[0] === "function" || Array.isArray(tier[0]))) {
        sources = tier;
      } else {
        sources = [tier];
      }
    } else {
      return out;
    }

    // Cycle sources so each tier gets a mix even when problem count > sources
    for (var i = 0; i < count; i++) {
      var src = sources[i % sources.length];
      var problem;
      if (typeof src === "function") {
        try {
          problem = src(rng);
        } catch (e) {
          console.error("[problem-set] generator threw:", e);
          problem = { prompt: "Error generating problem.", answer: "—", steps: [String(e)] };
        }
      } else if (Array.isArray(src)) {
        problem = rng.pick(src);
        // clone so mutation never leaks across renders
        if (problem) problem = Object.assign({}, problem, { steps: (problem.steps || []).slice() });
      }
      if (problem) out.push(problem);
    }
    return out;
  }

  function buildSet(topicName, seed) {
    var topic = TOPICS[topicName];
    if (!topic) return null;
    var rng = makeRng(seed);
    return {
      topic: topicName,
      title: topic.title || topicName,
      description: topic.description || "",
      seed: seed,
      warmup:   buildTier(topic.warmup,    topic.warmupCount   || 5, rng),
      standard: buildTier(topic.standard,  topic.standardCount || 5, rng),
      challenge:buildTier(topic.challenge, topic.challengeCount|| 3, rng),
    };
  }

  // ---------------------------------------------------------------- rendering
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // We do NOT escape `prompt`, `answer`, or `steps` strings. They may contain
  // `$...$` KaTeX math and deliberate HTML. Topic authors are trusted.
  function renderProblem(p, idx) {
    var stepsHtml = "";
    if (p.steps && p.steps.length) {
      stepsHtml = '<ol class="ps-steps">' +
        p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join("") +
      '</ol>';
    }
    var hint = p.hint
      ? '<div class="ps-hint"><span class="ps-hint-label">Hint</span>' + p.hint + '</div>'
      : '';
    return '' +
      '<div class="ps-problem" data-idx="' + idx + '">' +
        '<div class="ps-prompt">' +
          '<span class="ps-num">' + (idx + 1) + '.</span> ' +
          '<span class="ps-prompt-text">' + p.prompt + '</span>' +
        '</div>' +
        hint +
        '<details class="ps-solution">' +
          '<summary>Show solution</summary>' +
          '<div class="ps-solution-body">' +
            '<div class="ps-answer"><span class="ps-answer-label">Answer:</span> ' + p.answer + '</div>' +
            stepsHtml +
          '</div>' +
        '</details>' +
      '</div>';
  }

  function renderTier(problems) {
    if (!problems || !problems.length) {
      return '<div class="ps-empty">No problems registered for this tier yet.</div>';
    }
    return problems.map(renderProblem).join("");
  }

  function renderContainer(el, set) {
    el.innerHTML = '' +
      '<div class="ps-header">' +
        '<span class="ps-label">▸ PRACTICE SET</span>' +
        '<span class="ps-title">' + escapeHtml(set.title) + '</span>' +
        '<div class="ps-controls">' +
          '<span class="ps-seed" title="Click to copy shareable link">seed #' + set.seed + '</span>' +
          '<button class="ps-btn ps-new-set" type="button">↻ New set</button>' +
        '</div>' +
      '</div>' +
      (set.description ? '<div class="ps-description">' + set.description + '</div>' : "") +
      '<div class="ps-tabs" role="tablist">' +
        '<button class="ps-tab active" data-tier="warmup"  role="tab">Warm-up <span class="ps-tab-count">' + set.warmup.length + '</span></button>' +
        '<button class="ps-tab"        data-tier="standard" role="tab">Standard <span class="ps-tab-count">' + set.standard.length + '</span></button>' +
        '<button class="ps-tab"        data-tier="challenge" role="tab">Challenge <span class="ps-tab-count">' + set.challenge.length + '</span></button>' +
      '</div>' +
      '<div class="ps-body">' +
        '<div class="ps-tier ps-tier-warmup    active" role="tabpanel">' + renderTier(set.warmup)    + '</div>' +
        '<div class="ps-tier ps-tier-standard"         role="tabpanel">' + renderTier(set.standard)  + '</div>' +
        '<div class="ps-tier ps-tier-challenge"        role="tabpanel">' + renderTier(set.challenge) + '</div>' +
      '</div>' +
      '<div class="ps-footer">' +
        '<span>Problems are generated from a seed — share the link and your friend gets the same set.</span>' +
      '</div>';

    el.dataset.seed = String(set.seed);
    el.dataset.rendered = "1";

    // tab switching
    el.querySelectorAll(".ps-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var tier = tab.dataset.tier;
        el.querySelectorAll(".ps-tab").forEach(function (t) { t.classList.toggle("active", t === tab); });
        el.querySelectorAll(".ps-tier").forEach(function (t) {
          t.classList.toggle("active", t.classList.contains("ps-tier-" + tier));
        });
      });
    });

    // new-set button
    var newBtn = el.querySelector(".ps-new-set");
    if (newBtn) {
      newBtn.addEventListener("click", function () {
        hydrate(el, freshSeed());
      });
    }

    // seed → shareable link (click to copy)
    var seedEl = el.querySelector(".ps-seed");
    if (seedEl) {
      seedEl.addEventListener("click", function () {
        var topic = el.dataset.topic;
        var url = location.origin + location.pathname + "#ps-" + topic + "=" + set.seed;
        try {
          navigator.clipboard.writeText(url).then(function () {
            var prev = seedEl.textContent;
            seedEl.textContent = "copied ✓";
            setTimeout(function () { seedEl.textContent = prev; }, 1500);
          });
        } catch (e) { /* older browsers */ }
      });
    }

    // Re-run KaTeX over the newly-inserted math, if KaTeX is loaded.
    if (typeof window.renderMathInElement === "function") {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
      } catch (e) { /* ignore render failures */ }
    }
  }

  // ---------------------------------------------------------------- hydration
  function seedFromHashFor(topic) {
    var m = (location.hash || "").match(new RegExp("ps-" + topic + "=(\\d+)"));
    return m ? parseInt(m[1], 10) : null;
  }

  function hydrate(el, forcedSeed) {
    var topic = el.dataset.topic;
    if (!topic) return;
    var seed;
    if (typeof forcedSeed === "number") seed = forcedSeed;
    else if (el.dataset.seed) seed = parseInt(el.dataset.seed, 10);
    else {
      var fromHash = seedFromHashFor(topic);
      seed = fromHash != null ? fromHash : freshSeed();
    }
    var set = buildSet(topic, seed);
    if (!set) {
      // Topic not yet registered — show a placeholder and try again after load.
      el.innerHTML = '<div class="ps-loading">Loading practice set…</div>';
      return;
    }
    renderContainer(el, set);
  }

  function initAll() {
    window.__LearningHubProblemSetBooted = true;
    document.querySelectorAll(".problem-set").forEach(function (el) {
      hydrate(el);
    });
    // If KaTeX finishes loading after we hydrate, re-render once.
    if (window.renderMathInElement == null) {
      var waited = 0;
      var iv = setInterval(function () {
        waited += 200;
        if (typeof window.renderMathInElement === "function") {
          clearInterval(iv);
          document.querySelectorAll(".problem-set[data-rendered]").forEach(function (el) {
            try {
              window.renderMathInElement(el, {
                delimiters: [
                  { left: "$$", right: "$$", display: true },
                  { left: "$", right: "$", display: false },
                ],
                throwOnError: false,
              });
            } catch (e) { /* ignore */ }
          });
        }
        if (waited > 8000) clearInterval(iv);
      }, 200);
    }
  }

  // ---------------------------------------------------------------- export + boot
  window.LearningHubProblemSet = {
    registerTopic: registerTopic,
    buildSet: buildSet,
    makeRng: makeRng,
    freshSeed: freshSeed,
    hydrate: hydrate,
    initAll: initAll,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
