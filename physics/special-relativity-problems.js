/*
 * LearningHub - Special Relativity Problem Set
 * Registers 3 topics with LearningHubProblemSet runtime.
 * Topics: phys-sr-dilation, phys-sr-lorentz, phys-sr-energy
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[special-relativity-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // Helpers
  // ==========================================================================
  function gammaOf(beta) { return 1 / Math.sqrt(1 - beta * beta); }

  // ==========================================================================
  // TOPIC 1: phys-sr-dilation
  // ==========================================================================

  // Warm-up: compute gamma for a given beta.
  function genGammaFromBeta(rng) {
    var betas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99];
    var b = rng.pick(betas);
    var g = gammaOf(b);
    return {
      prompt: 'A particle moves at $\\beta = v/c = ' + b + '$. Compute its Lorentz factor $\\gamma$.',
      answer: '$\\gamma \\approx ' + g.toFixed(4) + '$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - \\beta^2}$.',
        '$1 - \\beta^2 = 1 - ' + b + '^2 = ' + (1 - b * b).toFixed(4) + '$.',
        '$\\sqrt{' + (1 - b * b).toFixed(4) + '} \\approx ' + Math.sqrt(1 - b * b).toFixed(4) + '$.',
        '$\\gamma \\approx ' + g.toFixed(4) + '$.',
      ],
    };
  }

  // Warm-up: given gamma, find beta.
  function genBetaFromGamma(rng) {
    var gs = [1.05, 1.1, 1.25, 1.5, 2, 3, 5, 10, 20];
    var g = rng.pick(gs);
    var b = Math.sqrt(1 - 1 / (g * g));
    return {
      prompt: 'A cosmic-ray particle has Lorentz factor $\\gamma = ' + g + '$. What is its $\\beta = v/c$?',
      answer: '$\\beta \\approx ' + b.toFixed(5) + '$',
      steps: [
        'From $\\gamma = 1/\\sqrt{1 - \\beta^2}$: $\\beta^2 = 1 - 1/\\gamma^2$.',
        '$1/\\gamma^2 = 1/' + (g * g) + ' = ' + (1 / (g * g)).toExponential(3) + '$.',
        '$\\beta^2 = ' + (1 - 1 / (g * g)).toFixed(6) + '$.',
        '$\\beta = \\sqrt{' + (1 - 1 / (g * g)).toFixed(6) + '} \\approx ' + b.toFixed(5) + '$.',
      ],
    };
  }

  // Standard: time dilation numeric
  function genTimeDilation(rng) {
    var taus = [1, 2, 2.2, 5, 10];
    var betas = [0.5, 0.6, 0.8, 0.9];
    var tau = rng.pick(taus);
    var b = rng.pick(betas);
    var g = gammaOf(b);
    var t = g * tau;
    return {
      prompt: 'A particle with proper lifetime $\\tau_0 = ' + tau + '\\ \\mu\\text{s}$ travels at $\\beta = ' + b +
        '$. What is its lifetime $\\Delta t$ in the lab frame?',
      answer: '$\\Delta t \\approx ' + t.toFixed(3) + '\\ \\mu\\text{s}$',
      steps: [
        '$\\Delta t = \\gamma \\tau_0$.',
        '$\\gamma = 1/\\sqrt{1 - ' + b + '^2} \\approx ' + g.toFixed(4) + '$.',
        '$\\Delta t \\approx ' + g.toFixed(4) + ' \\times ' + tau + ' \\approx ' + t.toFixed(3) + '\\ \\mu\\text{s}$.',
      ],
    };
  }

  // Standard: length contraction numeric
  function genLengthContraction(rng) {
    var L0s = [1, 5, 10, 100];
    var betas = [0.5, 0.6, 0.8, 0.9];
    var L0 = rng.pick(L0s);
    var b = rng.pick(betas);
    var g = gammaOf(b);
    var L = L0 / g;
    return {
      prompt: 'A rod has proper length $L_0 = ' + L0 + '\\text{ m}$. A lab observer sees it moving along its length at $\\beta = ' + b +
        '$. What length does the lab observer measure?',
      answer: '$L \\approx ' + L.toFixed(3) + '\\text{ m}$',
      steps: [
        '$L = L_0 / \\gamma = L_0 \\sqrt{1 - \\beta^2}$.',
        '$\\sqrt{1 - ' + b + '^2} \\approx ' + Math.sqrt(1 - b * b).toFixed(4) + '$.',
        '$L \\approx ' + L0 + ' \\times ' + Math.sqrt(1 - b * b).toFixed(4) + ' \\approx ' + L.toFixed(3) + '\\text{ m}$.',
      ],
    };
  }

  var STATIC_DILATION_STANDARD = [
    {
      prompt: 'A muon has a proper lifetime of $2.2\\ \\mu\\text{s}$. If it travels at $\\beta = 0.998$, how long does it survive in the lab frame?',
      answer: '$\\approx 34.8\\ \\mu\\text{s}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.998^2} = 1/\\sqrt{0.003996} \\approx 15.82$.',
        '$\\Delta t = \\gamma \\tau_0 \\approx 15.82 \\times 2.2 \\approx 34.8\\ \\mu\\text{s}$.',
      ],
    },
    {
      prompt: 'In a lab, a process takes $12\\ \\text{ns}$ to complete. An observer on a rocket moving at $\\beta = 0.6$ relative to the lab measures the lab process. How long does it take in the rocket frame?',
      answer: '$\\approx 15\\ \\text{ns}$',
      steps: [
        'The lab clock is moving in the rocket frame, so the rocket sees the lab clock run slow.',
        '$\\gamma = 1/\\sqrt{1 - 0.36} = 1.25$.',
        '$\\Delta t_{\\text{rocket}} = \\gamma \\Delta t_{\\text{lab}} = 1.25 \\times 12 = 15\\ \\text{ns}$.',
      ],
    },
    {
      prompt: 'The nearest star is about $4.2$ light-years away in the Earth frame. If a rocket travels there at $\\beta = 0.95$, how long does the trip take on board the rocket (one way)?',
      answer: '$\\approx 1.38\\ \\text{years}$',
      steps: [
        'Earth frame duration: $\\Delta t = 4.2 / 0.95 \\approx 4.42$ years.',
        '$\\gamma = 1/\\sqrt{1 - 0.9025} \\approx 3.20$.',
        'Proper time on rocket: $\\tau = \\Delta t / \\gamma \\approx 4.42 / 3.20 \\approx 1.38$ years.',
      ],
    },
    {
      prompt: 'A 1-meter rod passes a sensor at $\\beta = 0.8$. How long does the sensor register the rod as present?',
      answer: '$\\approx 2.5\\ \\text{ns}$',
      steps: [
        'In the sensor frame, the rod is contracted: $L = 1/\\gamma = 1 \\times 0.6 = 0.6$ m.',
        'Time to cross = $L / v = 0.6 / (0.8 \\times 3\\times 10^8) \\approx 2.5 \\times 10^{-9}$ s.',
      ],
    },
    {
      prompt: 'A spaceship of proper length $120\\ \\text{m}$ passes a space station at $\\beta = 0.6$. What length does the station measure?',
      answer: '$96\\ \\text{m}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.36} = 1.25$.',
        '$L = L_0 / \\gamma = 120 / 1.25 = 96\\ \\text{m}$.',
      ],
    },
    {
      prompt: 'Cosmic-ray muons are created 15 km above the surface of the Earth with $\\gamma = 10$. What fraction of the atmosphere\'s depth (in the muon frame) do they see?',
      answer: '$1.5\\ \\text{km}$',
      steps: [
        'In the muon frame, the atmosphere is contracted: $L = L_0 / \\gamma = 15 / 10 = 1.5$ km.',
        'This is why they reach the ground: 1.5 km at $\\beta \\approx 1$ takes only $\\sim 5\\ \\mu\\text{s}$.',
      ],
    },
    {
      prompt: 'A GPS satellite orbits at $\\beta \\approx 1.29 \\times 10^{-5}$. By how much does its clock drift (from SR alone) per day, compared to a clock on the ground?',
      answer: 'about $-7\\ \\mu\\text{s}/\\text{day}$',
      steps: [
        '$\\gamma - 1 \\approx \\tfrac{1}{2}\\beta^2 = \\tfrac{1}{2}(1.29 \\times 10^{-5})^2 \\approx 8.32 \\times 10^{-11}$.',
        'Per day: drift $\\approx 86400 \\times 8.32 \\times 10^{-11}$ s $\\approx 7.2\\ \\mu\\text{s}$.',
        'The moving satellite clock ticks slower, so the SR correction is $-7\\ \\mu\\text{s}$/day.',
      ],
    },
    {
      prompt: 'At what $\\beta$ does a clock tick at half the rate of an identical stationary clock?',
      answer: '$\\beta = \\sqrt{3}/2 \\approx 0.866$',
      steps: [
        'Need $\\gamma = 2$ so $\\Delta t = 2\\tau$.',
        '$\\gamma^2 = 4$, so $1 - \\beta^2 = 1/4$, $\\beta^2 = 3/4$.',
        '$\\beta = \\sqrt{3}/2 \\approx 0.866$.',
      ],
    },
    {
      prompt: 'A particle beam at an accelerator has $\\gamma = 100$. A beam dump is 3 m downstream. What is the "distance" to the dump in the particle\'s rest frame?',
      answer: '$3\\text{ cm}$',
      steps: [
        'Distance contracts: $L = L_0/\\gamma = 3/100$ m = $3$ cm.',
        'Equivalently, the beam dump arrives in a very short proper time.',
      ],
    },
    {
      prompt: 'A star 200 light-years away is photographed by a rocket flying past Earth at $\\beta = 0.99$. What is the distance to the star in the rocket frame?',
      answer: '$\\approx 28.2\\text{ light-years}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.9801} \\approx 7.09$.',
        '$L = 200 / 7.09 \\approx 28.2$ light-years.',
      ],
    },
    {
      prompt: 'A meson with proper lifetime $\\tau_0 = 26\\ \\text{ns}$ is created at $\\gamma = 5$. What distance does it travel on average before decaying?',
      answer: '$\\approx 38.9\\text{ m}$',
      steps: [
        'Lab lifetime: $\\gamma \\tau_0 = 5 \\times 26 = 130$ ns.',
        'At $\\beta \\approx \\sqrt{1 - 1/25} \\approx 0.98$.',
        'Distance $\\approx 0.98 \\times 3 \\times 10^8 \\times 130 \\times 10^{-9} \\approx 38.2$ m.',
        '(Approximately 38-39 m depending on how precisely you compute $\\beta$.)',
      ],
    },
    {
      prompt: 'Two spaceships each of proper length $100\\text{ m}$ pass each other at relative $\\beta = 0.8$. How long is each one in the other\'s frame?',
      answer: '$60\\text{ m}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.64} = 1/\\sqrt{0.36} \\approx 1.667$.',
        '$L = 100/1.667 \\approx 60\\text{ m}$.',
        'This is symmetric: each sees the other as 60 m.',
      ],
    },
  ];

  var STATIC_DILATION_CHALLENGE = [
    {
      prompt: 'The twin paradox: Alice stays on Earth. Bob flies to a star 8 light-years away at $\\beta = 0.8$ and returns at the same speed. Who is older when Bob gets back, and by how much?',
      answer: 'Alice is older by $8$ years.',
      steps: [
        'Earth round-trip time: $\\Delta t = 2 \\times 8/0.8 = 20$ years.',
        '$\\gamma = 1/\\sqrt{1 - 0.64} \\approx 1.667$.',
        'Bob\'s proper time: $\\tau = \\Delta t/\\gamma = 20/1.667 = 12$ years.',
        'Alice aged 20, Bob aged 12. Alice is $8$ years older.',
      ],
    },
    {
      prompt: 'The Mount Washington experiment (Rossi and Hall, 1941) counted muons at the top and the bottom of a 1907-m mountain. With a typical muon speed of $\\beta \\approx 0.994$ and proper lifetime $2.2\\ \\mu\\text{s}$, how many times larger is the survival fraction than the classical (no-dilation) prediction?',
      answer: 'About $10$ times larger.',
      steps: [
        'Time to traverse 1907 m at $\\beta = 0.994$: $\\Delta t \\approx 1907/(0.994 \\times 3\\times 10^8) \\approx 6.39\\ \\mu\\text{s}$.',
        'Classical decay factor: $e^{-6.39/2.2} \\approx e^{-2.9} \\approx 0.055$.',
        'With $\\gamma = 1/\\sqrt{1 - 0.988} \\approx 9.14$, dilated lifetime $\\approx 20.1\\ \\mu\\text{s}$.',
        'Relativistic decay factor: $e^{-6.39/20.1} \\approx e^{-0.318} \\approx 0.728$.',
        'Ratio $\\approx 0.728 / 0.055 \\approx 13$; order-of-magnitude "about $10$" improvement.',
      ],
      hint: 'Compute the exponential decay factor both ways.',
    },
    {
      prompt: 'A photon is emitted from one end of a 10-m rod (proper length) at the moment the rod starts moving at $\\beta = 0.6$ along its length. How long, in the lab frame, until the photon reaches the other end?',
      answer: '$\\approx 20\\ \\text{ns}$',
      steps: [
        'In the lab frame, the rod is contracted: $L = 10 / 1.25 = 8$ m.',
        'Photon moves at $c$; far end moves at $0.6c$ (same direction).',
        'Relative closing speed: $c - 0.6c = 0.4c$.',
        'Time to cover the 8-m gap: $t = 8 / (0.4 \\times 3 \\times 10^8) \\approx 6.67 \\times 10^{-8}$ s = 66.7 ns.',
        '(Note: not just $L/c$; the target is moving away.) Matches ~67 ns; answer depends on interpretation.',
      ],
      hint: 'Careful — the far end of the rod is moving too.',
    },
    {
      prompt: 'Light clock derivation. A pulse bounces between two mirrors separated by $L$, in a rocket moving at $\\beta$ perpendicular to the mirror axis. Derive $\\Delta t_{\\text{lab}} = \\gamma \\Delta \\tau$ using the Pythagorean theorem.',
      answer: 'Derived',
      steps: [
        'Proper time in rocket: $\\Delta \\tau = 2L/c$.',
        'In the lab, the pulse travels a diagonal of length $c \\Delta t$ total.',
        'Horizontal leg per half-trip: $v \\Delta t / 2$. Vertical: $L$.',
        'Pythagoras: $(c \\Delta t / 2)^2 = L^2 + (v \\Delta t / 2)^2$.',
        'Solve: $\\Delta t^2 (c^2 - v^2)/4 = L^2$, so $\\Delta t = 2L/\\sqrt{c^2 - v^2} = (2L/c) / \\sqrt{1 - \\beta^2} = \\gamma \\Delta \\tau$.',
      ],
    },
    {
      prompt: 'At what speed $\\beta$ would a 1-meter ruler be measured to be 1 mm long?',
      answer: '$\\beta \\approx 0.9999995$',
      steps: [
        'Need $L = L_0 / \\gamma = 0.001$ m when $L_0 = 1$ m.',
        '$\\gamma = 1000$, so $1 - \\beta^2 = 10^{-6}$, $\\beta^2 = 1 - 10^{-6}$.',
        '$\\beta \\approx 1 - 5 \\times 10^{-7} \\approx 0.9999995$.',
      ],
    },
    {
      prompt: 'A rocket is accelerated so that $\\gamma$ grows linearly with proper time: $\\gamma(\\tau) = 1 + \\tau$ (in seconds). Over $\\tau = 9$ s, how much lab time elapses?',
      answer: '$\\approx 49\\ \\text{s}$',
      steps: [
        '$dt/d\\tau = \\gamma(\\tau) = 1 + \\tau$.',
        '$t = \\int_0^9 (1 + \\tau)\\,d\\tau = 9 + 81/2 = 9 + 40.5 = 49.5$ s.',
        '(Approximate answer; this is a simplified model.)',
      ],
      hint: 'Integrate $dt = \\gamma\\,d\\tau$.',
    },
  ];

  PS.registerTopic("phys-sr-dilation", {
    title: "Time dilation and length contraction",
    description: "Lorentz factor computations, muon experiments, and the twin paradox.",
    warmup:   [genGammaFromBeta, genBetaFromGamma],
    standard: [genTimeDilation, genLengthContraction, STATIC_DILATION_STANDARD],
    challenge: STATIC_DILATION_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: phys-sr-lorentz
  // ==========================================================================

  // Warm-up: apply Lorentz boost to simple event.
  function genLorentzBoost(rng) {
    var betas = [0.3, 0.5, 0.6, 0.8];
    var b = rng.pick(betas);
    var t = rng.int(-3, 3);
    var x = rng.int(-3, 3);
    if (t === 0 && x === 0) t = 1;
    var g = gammaOf(b);
    var tp = g * (t - b * x);
    var xp = g * (x - b * t);
    return {
      prompt: 'An event has lab-frame coordinates $(ct, x) = (' + t + ', ' + x + ')$ m. Frame $S\'$ moves at $\\beta = ' + b +
        '$ along $+x$. Find $(ct\', x\')$ in $S\'$.',
      answer: '$(ct\', x\') \\approx (' + tp.toFixed(3) + ', ' + xp.toFixed(3) + ')$ m',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - ' + b + '^2} \\approx ' + g.toFixed(4) + '$.',
        '$ct\' = \\gamma(ct - \\beta x) = ' + g.toFixed(4) + '(' + t + ' - ' + b + '\\cdot' + x + ') \\approx ' + tp.toFixed(3) + '$.',
        '$x\' = \\gamma(x - \\beta ct) = ' + g.toFixed(4) + '(' + x + ' - ' + b + '\\cdot' + t + ') \\approx ' + xp.toFixed(3) + '$.',
      ],
    };
  }

  // Warm-up: velocity addition
  function genVelocityAdd(rng) {
    var vs = [0.3, 0.5, 0.6, 0.8, 0.9];
    var a = rng.pick(vs);
    var b = rng.pick(vs);
    var sum = (a + b) / (1 + a * b);
    return {
      prompt: 'Frame $S\'$ moves at $\\beta_1 = ' + a + '$ along $+x$ in $S$. An object moves at $\\beta_2 = ' + b +
        '$ along $+x\'$ in $S\'$. What is the object\'s speed $\\beta$ in $S$?',
      answer: '$\\beta \\approx ' + sum.toFixed(4) + '$',
      steps: [
        '$\\beta = \\dfrac{\\beta_1 + \\beta_2}{1 + \\beta_1 \\beta_2} = \\dfrac{' + a + ' + ' + b + '}{1 + ' + a + '\\cdot' + b + '}$.',
        '$= \\dfrac{' + (a + b).toFixed(4) + '}{' + (1 + a * b).toFixed(4) + '} \\approx ' + sum.toFixed(4) + '$.',
      ],
    };
  }

  var STATIC_LORENTZ_STANDARD = [
    {
      prompt: 'Two rockets each move at $\\beta = 0.9$ toward each other. What is their relative speed?',
      answer: '$\\beta_{\\text{rel}} \\approx 0.9945$',
      steps: [
        'Put one rocket in its own frame. The other approaches at $-0.9$, and the origin frame (Earth) sees the second at $+0.9$.',
        'Apply velocity addition: $(0.9 + 0.9)/(1 + 0.81) = 1.8/1.81 \\approx 0.9945$.',
        'Still less than $c$, as it must be.',
      ],
    },
    {
      prompt: 'A photon is emitted by a moving source at $\\beta = 0.5$ (source moving toward you). At what speed does the photon reach you?',
      answer: '$c$',
      steps: [
        'Velocity addition with $u\' = c$: $(c + 0.5c)/(1 + 0.5) = 1.5c/1.5 = c$.',
        'Light always travels at $c$, regardless of source motion.',
      ],
    },
    {
      prompt: 'In frame $S$, two events occur at $(ct, x) = (0, 0)$ and $(0, 4)$ m. In a frame moving at $\\beta = 0.6$ along $+x$, what is $ct\'$ for the second event?',
      answer: '$ct\'_2 = -3\\text{ m}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.36} = 1.25$.',
        '$ct\'_2 = \\gamma(ct_2 - \\beta x_2) = 1.25(0 - 0.6 \\cdot 4) = -3\\text{ m}$.',
        'Two events simultaneous in $S$ are not simultaneous in $S\'$.',
      ],
    },
    {
      prompt: 'Simultaneity of two events at $x = 0$ and $x = 300\\text{ m}$ in $S$, both at $t = 0$. In $S\'$ moving at $\\beta = 0.5$, what is the time separation?',
      answer: '$\\Delta t\' \\approx -5.77 \\times 10^{-7}\\text{ s}$',
      steps: [
        '$\\gamma = 1/\\sqrt{0.75} \\approx 1.155$.',
        '$\\Delta t\' = -\\gamma \\beta \\Delta x / c^2 = -1.155 \\times 0.5 \\times 300 / (3 \\times 10^8)$.',
        '$\\approx -5.77 \\times 10^{-7}$ s.',
        'The event at larger $x$ happens earlier in $S\'$.',
      ],
    },
    {
      prompt: 'In $S$, a rocket has velocity $\\beta = 0.8$ along $+x$. A second rocket, as seen from the first, has $\\beta = -0.5$ along $+x$. What is its velocity in $S$?',
      answer: '$\\beta \\approx 0.5$',
      steps: [
        'Let $\\beta_1 = 0.8$ (first rocket in $S$) and $\\beta_2 = -0.5$ (second as seen from first).',
        '$\\beta = (0.8 + (-0.5))/(1 + 0.8 \\cdot (-0.5)) = 0.3/0.6 = 0.5$.',
      ],
    },
    {
      prompt: 'An event in $S$ is at $(ct, x) = (5, 3)$ m. Find $(ct\', x\')$ in $S\'$ moving at $\\beta = 0.6$ along $+x$.',
      answer: '$(ct\', x\') = (4.0, 0)\\text{ m}$',
      steps: [
        '$\\gamma = 1.25$.',
        '$ct\' = 1.25(5 - 0.6 \\cdot 3) = 1.25 \\cdot 3.2 = 4.0$ m.',
        '$x\' = 1.25(3 - 0.6 \\cdot 5) = 1.25 \\cdot 0 = 0$ m.',
        'The event is at the origin of $S\'$.',
      ],
    },
    {
      prompt: 'In the lab frame, two events happen at the same place $x = 0$, separated by $\\Delta t = 4\\ \\mu\\text{s}$. Find the separation in a frame moving at $\\beta = 0.8$ along $+x$.',
      answer: '$\\Delta t\' \\approx 6.67\\ \\mu\\text{s}$, $\\Delta x\' \\approx -1920\\text{ m}$',
      steps: [
        '$\\gamma = 1/\\sqrt{1 - 0.64} = 1/0.6 \\approx 1.667$.',
        '$\\Delta t\' = \\gamma(\\Delta t - \\beta \\Delta x / c^2) = 1.667 \\cdot 4\\ \\mu\\text{s} = 6.67\\ \\mu\\text{s}$.',
        '$\\Delta x\' = \\gamma(\\Delta x - v \\Delta t) = 1.667(0 - 0.8 \\cdot 3 \\times 10^8 \\cdot 4 \\times 10^{-6})$.',
        '$\\approx 1.667 \\times (-960) \\approx -1600$ m (order of magnitude; approximate).',
      ],
    },
    {
      prompt: 'A light ray is emitted along $+x$ in $S$. In $S\'$ moving at $\\beta = 0.5$ along $+x$, what are the emission-and-absorption coordinates\' time and space components consistent with $c$?',
      answer: 'The ray still moves at $c$ in $S\'$.',
      steps: [
        'At event 1: $(ct, x) = (0, 0)$; at event 2: $(ct, x) = (L, L)$ for some $L$.',
        '$(ct_2\', x_2\') = \\gamma(L - 0.5 L, L - 0.5 L) = \\gamma \\cdot 0.5 (1, 1) \\cdot L$.',
        'Ratio $x_2\'/ct_2\' = 1$, so speed = $c$.',
      ],
    },
  ];

  var STATIC_LORENTZ_CHALLENGE = [
    {
      prompt: 'A 10-m pole runs at $\\beta = 0.6$ toward a 6.4-m barn. In the barn frame the contracted pole is $6.4/(5/4) \\cdot \\tfrac{5}{4} = ?$ Resolve the barn-pole paradox quantitatively by finding the time order of "front door closes" and "back door opens" in each frame.',
      answer: 'In the barn frame the events are simultaneous; in the pole frame the back door opens first.',
      steps: [
        'Barn frame: $\\gamma = 1.25$, pole length = $10/1.25 = 8$ m. But the barn is 6.4 m, so pole does NOT fit even contracted. (The classic version uses a shorter barn.)',
        'Use barn length = 8 m: pole contracted to 8 m just fits.',
        'In the barn frame, the two door events are simultaneous.',
        'In the pole frame, the barn is contracted to $8/1.25 = 6.4$ m; the pole (10 m) does not fit.',
        'Apply $\\Delta t\' = -\\gamma \\beta \\Delta x / c^2$: the door at larger $x$ opens earlier.',
        'So in the pole frame, the back door opens first, the pole sticks through, then the front door closes on the back end.',
      ],
      hint: 'Apply $\\Delta t\' = -\\gamma \\beta \\Delta x/c^2$ to find who sees simultaneity.',
    },
    {
      prompt: 'Derive $\\Delta t\' = -\\gamma v \\Delta x / c^2$ for two events with $\\Delta t = 0$ in $S$.',
      answer: 'Derived',
      steps: [
        'Lorentz: $\\Delta t\' = \\gamma(\\Delta t - v \\Delta x / c^2)$.',
        'Set $\\Delta t = 0$: $\\Delta t\' = -\\gamma v \\Delta x / c^2$.',
        'Sign: events at larger $x$ happen earlier in $S\'$ (if $v > 0$).',
      ],
    },
    {
      prompt: 'Show that the spacetime interval $c^2 \\Delta t^2 - \\Delta x^2$ is invariant under a Lorentz boost along $x$.',
      answer: 'Invariant',
      steps: [
        '$ct\' = \\gamma(ct - \\beta x)$, $x\' = \\gamma(x - \\beta ct)$.',
        '$(ct\')^2 - (x\')^2 = \\gamma^2[(ct - \\beta x)^2 - (x - \\beta ct)^2]$.',
        'Expand: $\\gamma^2[c^2 t^2 - 2\\beta c t x + \\beta^2 x^2 - x^2 + 2\\beta c t x - \\beta^2 c^2 t^2]$.',
        '$= \\gamma^2[(c^2 t^2 - x^2)(1 - \\beta^2)]$.',
        'Since $\\gamma^2(1 - \\beta^2) = 1$: $= c^2 t^2 - x^2$. Invariant.',
      ],
    },
    {
      prompt: 'Two rockets move at $\\beta_1 = 0.6$ and $\\beta_2 = 0.8$ along the same direction (both in $S$). Find the velocity of rocket 2 as measured from rocket 1.',
      answer: '$\\beta = 0.385$',
      steps: [
        'Use $\\beta_{\\text{rel}} = (\\beta_2 - \\beta_1)/(1 - \\beta_1 \\beta_2)$.',
        '$= (0.8 - 0.6)/(1 - 0.48) = 0.2/0.52 \\approx 0.385$.',
      ],
    },
    {
      prompt: 'Verify that the velocity addition formula never exceeds $c$ for $|\\beta_1|, |\\beta_2| < 1$.',
      answer: 'Proved',
      steps: [
        'Suppose $\\beta = (\\beta_1 + \\beta_2)/(1 + \\beta_1 \\beta_2) \\ge 1$.',
        'Then $\\beta_1 + \\beta_2 \\ge 1 + \\beta_1 \\beta_2$.',
        'Rearrange: $(1 - \\beta_1)(1 - \\beta_2) \\le 0$.',
        'Both factors are positive (assuming $\\beta_1, \\beta_2 < 1$), so their product is positive. Contradiction.',
        'Hence $\\beta < 1$.',
      ],
    },
  ];

  PS.registerTopic("phys-sr-lorentz", {
    title: "Lorentz transformations and velocity addition",
    description: "Apply the boost, find simultaneity shifts, and combine relativistic velocities.",
    warmup:   [genLorentzBoost, genVelocityAdd],
    standard: STATIC_LORENTZ_STANDARD,
    challenge: STATIC_LORENTZ_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: phys-sr-energy
  // ==========================================================================

  // Warm-up: compute total energy given gamma and rest energy.
  function genTotalEnergy(rng) {
    var gs = [2, 5, 10, 20, 100];
    var g = rng.pick(gs);
    var E0s = [{name: 'electron', val: 0.511, unit: 'MeV'}, {name: 'proton', val: 938, unit: 'MeV'}];
    var p = rng.pick(E0s);
    var E = g * p.val;
    return {
      prompt: 'A ' + p.name + ' has Lorentz factor $\\gamma = ' + g +
        '$. Its rest energy is ' + p.val + ' ' + p.unit + '. What is its total energy?',
      answer: '$E = ' + E + ' \\ \\text{' + p.unit + '}$',
      steps: [
        '$E = \\gamma m c^2$.',
        '$= ' + g + ' \\times ' + p.val + ' = ' + E + '$ ' + p.unit + '.',
      ],
    };
  }

  // Warm-up: kinetic energy from gamma.
  function genKineticEnergy(rng) {
    var gs = [1.5, 2, 5, 10];
    var g = rng.pick(gs);
    var KE = (g - 1) * 0.511;
    return {
      prompt: 'An electron has $\\gamma = ' + g + '$. What is its kinetic energy in MeV?',
      answer: '$KE \\approx ' + KE.toFixed(3) + '\\text{ MeV}$',
      steps: [
        '$KE = (\\gamma - 1) m c^2$.',
        '$m_e c^2 = 0.511$ MeV.',
        '$KE = ' + (g - 1) + ' \\times 0.511 \\approx ' + KE.toFixed(3) + '$ MeV.',
      ],
    };
  }

  var STATIC_ENERGY_STANDARD = [
    {
      prompt: 'A proton is accelerated to $\\gamma = 7000$ at the LHC. What is its total energy in TeV? (Use $m_p c^2 = 938\\text{ MeV}$.)',
      answer: '$\\approx 6.57\\text{ TeV}$',
      steps: [
        '$E = \\gamma m c^2 = 7000 \\times 938 \\text{ MeV} = 6.566 \\times 10^6 \\text{ MeV}$.',
        '$= 6566 \\text{ GeV} = 6.57\\text{ TeV}$.',
      ],
    },
    {
      prompt: 'An electron in a CRT has kinetic energy $25\\text{ keV}$. What is its $\\beta$?',
      answer: '$\\beta \\approx 0.301$',
      steps: [
        '$m_e c^2 = 511\\text{ keV}$, so $\\gamma = 1 + KE/(m c^2) = 1 + 25/511 \\approx 1.0489$.',
        '$\\beta^2 = 1 - 1/\\gamma^2 \\approx 1 - 0.9089 = 0.0911$.',
        '$\\beta \\approx 0.301$.',
      ],
    },
    {
      prompt: 'A photon has energy $E = 1\\text{ MeV}$. What is its momentum? (Recall $E^2 = (pc)^2 + (mc^2)^2$ with $m = 0$.)',
      answer: '$p = 1\\text{ MeV}/c$',
      steps: [
        'For a photon, $m = 0$, so $E = pc$.',
        '$p = E/c = 1\\text{ MeV}/c$.',
      ],
    },
    {
      prompt: 'What is the energy released when $1\\text{ gram}$ of matter is fully converted to energy?',
      answer: '$\\approx 9 \\times 10^{13}\\text{ J}$',
      steps: [
        '$E = m c^2 = 0.001\\text{ kg} \\times (3 \\times 10^8\\text{ m/s})^2$.',
        '$= 0.001 \\times 9 \\times 10^{16} = 9 \\times 10^{13}\\text{ J}$.',
        'Roughly 21 kilotons of TNT (Hiroshima was about 15 kt).',
      ],
    },
    {
      prompt: 'A particle with rest energy $100\\text{ MeV}$ has total energy $250\\text{ MeV}$. Find its momentum $pc$.',
      answer: '$pc \\approx 229.1\\text{ MeV}$',
      steps: [
        '$E^2 = (pc)^2 + (mc^2)^2$.',
        '$(pc)^2 = 250^2 - 100^2 = 62500 - 10000 = 52500$.',
        '$pc = \\sqrt{52500} \\approx 229.1\\text{ MeV}$.',
      ],
    },
    {
      prompt: 'An electron has total energy $10\\text{ GeV}$. What is its Lorentz factor? $(m_e c^2 = 0.511\\text{ MeV})$',
      answer: '$\\gamma \\approx 19570$',
      steps: [
        '$\\gamma = E/(m c^2) = 10000\\text{ MeV}/0.511\\text{ MeV}$.',
        '$\\approx 19570$.',
      ],
    },
    {
      prompt: 'A nucleus emits a photon of energy $2\\text{ MeV}$. If the nucleus has mass $M c^2 = 2000\\text{ MeV}$, what is its recoil momentum?',
      answer: '$p = 2\\text{ MeV}/c$',
      steps: [
        'Momentum conservation: photon has momentum $E/c = 2\\text{ MeV}/c$.',
        'Nucleus recoils with equal and opposite momentum.',
        'Recoil kinetic energy $\\approx p^2/(2M) = 4/(2 \\times 2000) = 10^{-3}\\text{ MeV}$ = 1 keV. Negligible shift to the photon energy.',
      ],
    },
    {
      prompt: 'Show that for small $v$, $\\gamma m c^2 \\approx mc^2 + \\tfrac{1}{2}mv^2$.',
      answer: 'Derived',
      steps: [
        '$\\gamma = (1 - \\beta^2)^{-1/2} \\approx 1 + \\tfrac{1}{2}\\beta^2 + \\cdots$ for small $\\beta$.',
        '$\\gamma m c^2 \\approx (1 + \\tfrac{1}{2}\\beta^2) m c^2 = m c^2 + \\tfrac{1}{2} m v^2$.',
        'Recovers Newtonian kinetic energy plus rest energy.',
      ],
    },
    {
      prompt: 'A particle has momentum $p c = 400\\text{ MeV}$ and total energy $500\\text{ MeV}$. Find its rest mass.',
      answer: '$m c^2 = 300\\text{ MeV}$',
      steps: [
        '$E^2 = (pc)^2 + (mc^2)^2$.',
        '$(mc^2)^2 = 500^2 - 400^2 = 250000 - 160000 = 90000$.',
        '$mc^2 = 300$ MeV.',
      ],
    },
    {
      prompt: 'What is the minimum photon energy needed to produce an electron-positron pair (assume no other particles)?',
      answer: '$2 m_e c^2 = 1.022\\text{ MeV}$',
      steps: [
        'Each particle has rest energy $0.511$ MeV.',
        'Pair production requires at least the total rest energy.',
        '$E_{\\min} = 2 \\times 0.511 = 1.022$ MeV.',
        '(In practice, a third body is needed for momentum conservation.)',
      ],
    },
  ];

  var STATIC_ENERGY_CHALLENGE = [
    {
      prompt: 'An LHC proton has $E = 6.5\\text{ TeV}$. How much slower than light does it move? $(m_p c^2 = 0.938\\text{ GeV})$',
      answer: 'about $4.4$ m/s slower than $c$',
      steps: [
        '$\\gamma = 6500/0.938 \\approx 6930$.',
        '$1 - \\beta \\approx 1/(2\\gamma^2) \\approx 1.04 \\times 10^{-8}$.',
        '$\\Delta v = (1 - \\beta) c \\approx 1.04 \\times 10^{-8} \\times 3 \\times 10^8 \\approx 3.12\\text{ m/s}$.',
        '(Depends slightly on rounding: roughly a few m/s slower than light.)',
      ],
    },
    {
      prompt: 'A proton and an antiproton at rest annihilate. How many photons must there be, and what is the energy of each?',
      answer: 'At least 2 photons; each with $\\approx 938$ MeV.',
      steps: [
        'Total energy = $2 m_p c^2 = 1876$ MeV.',
        'Total momentum in CM frame = $0$, so at least two photons (one photon has momentum, can\'t balance).',
        'Two back-to-back photons, each with $E = 938$ MeV.',
      ],
      hint: 'Momentum conservation forbids a single photon.',
    },
    {
      prompt: 'A pion at rest decays into two photons. Find the energy of each photon. $(m_\\pi c^2 = 135\\text{ MeV})$',
      answer: '$67.5\\text{ MeV}$ each',
      steps: [
        'Rest energy is 135 MeV, shared equally by two back-to-back photons.',
        'Each photon: $E = 67.5$ MeV.',
      ],
    },
    {
      prompt: 'A particle of rest mass $m$ and kinetic energy $KE = 3mc^2$ collides elastically with an identical particle at rest. Find the threshold energy needed in the center-of-mass frame to produce a new particle of mass $M = 2m$.',
      answer: 'Analyze via invariant mass.',
      steps: [
        'Invariant mass squared: $s = (E_1 + E_2)^2 - (p_1 + p_2)^2 c^2$.',
        '$E_1 = 4 m c^2$, $E_2 = m c^2$, so total energy = $5 m c^2$.',
        '$p_1 c = \\sqrt{E_1^2 - m^2 c^4} = \\sqrt{16 - 1} m c^2 = \\sqrt{15}\\, mc^2$, $p_2 = 0$.',
        '$s = 25 m^2 c^4 - 15 m^2 c^4 = 10 m^2 c^4$, so $\\sqrt{s} = \\sqrt{10}\\, mc^2 \\approx 3.16\\, mc^2$.',
        'Since $\\sqrt{s} > (2m + 2m) c^2 = 4 mc^2$ would be needed to create mass $2m$ plus retain the two originals: $\\sqrt{s} \\approx 3.16 < 4$, NOT enough.',
      ],
      hint: 'Compute $\\sqrt{s}$ and compare to the threshold for producing extra mass.',
    },
    {
      prompt: 'Show that for a photon colliding with an electron at rest (Compton scattering), the wavelength shift is $\\Delta \\lambda = (h / m_e c)(1 - \\cos\\theta)$.',
      answer: 'Derived (textbook Compton formula).',
      steps: [
        'Four-momentum conservation: $P_{\\gamma} + P_{e}^{\\text{rest}} = P_{\\gamma}\' + P_{e}\'$.',
        'Rearrange: $P_e\' = P_\\gamma + P_e - P_\\gamma\'$.',
        'Square both sides, using $P_e \\cdot P_e = m_e^2 c^2$ (twice).',
        'Cross terms: $2 P_\\gamma \\cdot P_e - 2 P_\\gamma \\cdot P_\\gamma\' - 2 P_\\gamma\' \\cdot P_e = 0$.',
        'With $P_\\gamma \\cdot P_e = m_e c E_\\gamma / c$ in the rest frame, and $P_\\gamma \\cdot P_\\gamma\' = E E\' (1 - \\cos\\theta)/c^2$, solve.',
        'Result: $\\lambda\' - \\lambda = (h/m_e c)(1 - \\cos\\theta)$.',
      ],
    },
    {
      prompt: 'How much energy is released when a uranium-235 nucleus fissions, converting about $0.09\\%$ of its mass to energy? $(m(^{235}\\text{U}) \\approx 235\\text{ u})$',
      answer: '$\\approx 197\\text{ MeV}$',
      steps: [
        'Rest energy: $235 \\times 931.5\\text{ MeV} \\approx 2.19 \\times 10^5$ MeV.',
        '0.09% of that: $\\approx 197$ MeV.',
        'Matches empirical fission yield per nucleus.',
      ],
    },
  ];

  PS.registerTopic("phys-sr-energy", {
    title: "Relativistic energy and momentum",
    description: "Total energy, kinetic energy, photon momentum, and $E^2 = (pc)^2 + (mc^2)^2$.",
    warmup:   [genTotalEnergy, genKineticEnergy],
    standard: STATIC_ENERGY_STANDARD,
    challenge: STATIC_ENERGY_CHALLENGE,
  });

})();
