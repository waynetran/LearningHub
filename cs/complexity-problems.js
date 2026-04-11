/*
 * LearningHub - Complexity Problem Set
 * Registers 4 topics: cplx-bigo, cplx-masters, cplx-amortized, cplx-pvsnp
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[complexity-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC 1: cplx-bigo  — formal big-O reasoning
  // ==========================================================================

  // Warm-up: match a function to its tight class
  function genBigOClassMatch(rng) {
    var items = [
      { f: '$100 n + 50$',               ans: '$\\Theta(n)$' },
      { f: '$7 n^2 + 3 n$',               ans: '$\\Theta(n^2)$' },
      { f: '$\\log_2(n^5)$',              ans: '$\\Theta(\\log n)$' },
      { f: '$\\sqrt n$',                   ans: '$\\Theta(\\sqrt n)$' },
      { f: '$n + n \\log n$',             ans: '$\\Theta(n \\log n)$' },
      { f: '$5 \\cdot 2^n$',              ans: '$\\Theta(2^n)$' },
      { f: '$(\\log n)^3$',                ans: '$\\Theta((\\log n)^3)$' },
    ];
    var x = rng.pick(items);
    return {
      prompt: 'Give the tightest $\\Theta$ class for $f(n) = ' + x.f.replace(/\$/g, '') + '$.',
      answer: x.ans,
      steps: [
        'Drop constant multipliers and lower-order terms.',
        'Apply identities: $\\log(n^k) = k \\log n$, etc.',
      ],
    };
  }

  // Warm-up: yes/no on a big-O claim
  function genBigOClaim(rng) {
    var claims = [
      { q: '$n^2 = O(n^3)$',          a: 'True — $n^3$ grows faster.' },
      { q: '$2^n = O(3^n)$',          a: 'True — $(2/3)^n \\to 0$.' },
      { q: '$n^{100} = O(2^n)$',      a: 'True — exponential beats any polynomial.' },
      { q: '$\\log n = O(\\sqrt n)$', a: 'True — any positive power of $n$ dominates log.' },
      { q: '$n \\log n = \\Omega(n)$', a: 'True — $n \\log n$ is asymptotically above $n$.' },
      { q: '$n^2 = o(n^2)$',          a: 'False — little-$o$ is a strict bound.' },
    ];
    var c = rng.pick(claims);
    return {
      prompt: 'True or false: ' + c.q + '. Justify briefly.',
      answer: c.a,
      steps: [
        'Compare the functions using limits or dominance rules.',
        c.a,
      ],
    };
  }

  var STATIC_BIGO_STANDARD = [
    {
      prompt: 'Use the formal definition to prove $n^2 + 3n \\log n = O(n^2)$.',
      answer: 'Choose $c = 4$, $n_0 = 1$.',
      steps: [
        'For $n \\ge 1$: $\\log n \\le n$, so $3 n \\log n \\le 3 n^2$.',
        'Therefore $n^2 + 3 n \\log n \\le 4 n^2$.',
        'Take $c = 4$, $n_0 = 1$.',
      ],
    },
    {
      prompt: 'Prove $n^2 \\ne O(n)$.',
      answer: 'Assume $n^2 \\le c n$; divide by $n$ to get $n \\le c$, impossible for large $n$.',
      steps: [
        'Suppose for contradiction $n^2 \\le c n$ for all $n \\ge n_0$.',
        'Divide by $n$: $n \\le c$ for all $n \\ge n_0$.',
        'But $n$ is unbounded — contradiction.',
      ],
    },
    {
      prompt: 'Is $2^{n+1} = O(2^n)$? Prove or disprove.',
      answer: 'Yes: $2^{n+1} = 2 \\cdot 2^n$ so $c = 2, n_0 = 1$.',
      steps: [
        '$2^{n+1} = 2 \\cdot 2^n \\le 2 \\cdot 2^n$.',
        'Take $c = 2, n_0 = 1$.',
      ],
    },
    {
      prompt: 'Is $2^{2n} = O(2^n)$?',
      answer: 'No: $2^{2n}/2^n = 2^n \\to \\infty$, so no constant $c$ works.',
      steps: [
        'Compute the ratio $2^{2n}/2^n = 2^n$.',
        'This is unbounded, so no constant multiple of $2^n$ dominates $2^{2n}$.',
      ],
    },
    {
      prompt: 'Show $\\log(n!) = \\Theta(n \\log n)$.',
      answer: 'Upper $\\le n \\log n$; lower bound via second half $\\ge (n/2)\\log(n/2)$.',
      steps: [
        'Upper: $\\log(n!) = \\sum_{k=1}^n \\log k \\le n \\log n$.',
        'Lower: $\\log(n!) \\ge \\sum_{k=\\lceil n/2 \\rceil}^n \\log k \\ge (n/2) \\log(n/2)$.',
        'Both are $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Compute $T(n)$ defined by $T(n) = T(n-1) + n^2$, $T(0) = 0$.',
      answer: '$T(n) = \\sum_{k=1}^n k^2 = n(n+1)(2n+1)/6 = \\Theta(n^3)$.',
      steps: [
        'Unroll the recurrence: $T(n) = 1^2 + 2^2 + \\cdots + n^2$.',
        'Closed form: $n(n+1)(2n+1)/6$.',
        'Leading term is $n^3/3$, so $\\Theta(n^3)$.',
      ],
    },
    {
      prompt: 'Is $n \\log n = \\Theta(\\log(n!))$?',
      answer: 'Yes — both are $\\Theta(n \\log n)$.',
      steps: [
        'From the previous problem, $\\log(n!) = \\Theta(n \\log n)$.',
        'Transitivity: two things both $\\Theta(n \\log n)$ are $\\Theta$ of each other.',
      ],
    },
    {
      prompt: 'Simplify $f(n) = \\sum_{k=1}^n 1/k$. Give a $\\Theta$ bound.',
      answer: '$\\Theta(\\log n)$.',
      steps: [
        'This is the harmonic number $H_n$.',
        'Classical: $H_n = \\ln n + \\gamma + o(1)$.',
        'So $H_n = \\Theta(\\log n)$.',
      ],
    },
    {
      prompt: 'Show that $(n+1)^2 = O(n^2)$.',
      answer: 'Choose $c = 4, n_0 = 1$.',
      steps: [
        '$(n+1)^2 = n^2 + 2n + 1 \\le n^2 + 2 n^2 + n^2 = 4 n^2$ for $n \\ge 1$.',
        'Take $c = 4$, $n_0 = 1$.',
      ],
    },
    {
      prompt: 'Rank these by asymptotic growth (slowest first): $n$, $\\log_2 n$, $n \\log n$, $n^2 / \\log n$, $2^{\\sqrt{\\log n}}$, $n^{1.1}$.',
      answer: '$\\log n \\prec 2^{\\sqrt{\\log n}} \\prec n \\prec n \\log n \\prec n^{1.1} \\prec n^2 / \\log n$.',
      steps: [
        '$2^{\\sqrt{\\log n}}$ is sub-polynomial but super-polylog.',
        '$n^{1.1}$ beats $n \\log n$ since $n^{0.1}$ beats $\\log n$.',
        '$n^2 / \\log n$ still grows like $n^2$ up to a log.',
      ],
    },
  ];

  var STATIC_BIGO_CHALLENGE = [
    {
      prompt: 'Prove that $f(n) = O(g(n))$ and $g(n) = O(f(n))$ together imply $f(n) = \\Theta(g(n))$.',
      answer: 'Use the definitions directly.',
      steps: [
        '$f = O(g)$: $\\exists c_1, n_1$ with $f(n) \\le c_1 g(n)$ for $n \\ge n_1$.',
        '$g = O(f)$: $\\exists c_2, n_2$ with $g(n) \\le c_2 f(n)$ for $n \\ge n_2$, i.e. $f(n) \\ge (1/c_2) g(n)$.',
        'Take $n_0 = \\max(n_1, n_2)$, $c = c_1$, $c\' = 1/c_2$. Then $c\' g(n) \\le f(n) \\le c g(n)$.',
      ],
    },
    {
      prompt: 'Consider $T(n) = T(\\lfloor \\sqrt n \\rfloor) + 1$, $T(2) = 1$. Solve.',
      answer: '$T(n) = \\Theta(\\log \\log n)$.',
      steps: [
        'Let $m = \\log_2 n$, so taking $\\sqrt n$ halves $m$.',
        'Define $S(m) = T(2^m)$. Then $S(m) = S(m/2) + 1$.',
        'Master theorem or unrolling: $S(m) = \\Theta(\\log m)$. Back-substitute: $T(n) = \\Theta(\\log \\log n)$.',
      ],
    },
    {
      prompt: 'Prove $n^{\\log n}$ is not polynomial, i.e. show $n^{\\log n} \\ne O(n^k)$ for any constant $k$.',
      answer: 'Take logs: $(\\log n)^2$ vs $k \\log n$.',
      steps: [
        'Compare logs: $\\log(n^{\\log n}) = (\\log n)^2$ and $\\log(n^k) = k \\log n$.',
        '$(\\log n)^2 / (k \\log n) = (\\log n)/k \\to \\infty$.',
        'So no constant $c$ makes $n^{\\log n} \\le c \\cdot n^k$.',
      ],
    },
    {
      prompt: 'Is $f(n) = n^{\\sin n}$ bounded above by any polynomial? Explain.',
      answer: 'Yes — it is $O(n)$ since $\\sin n \\le 1$.',
      steps: [
        '$\\sin n$ oscillates in $[-1, 1]$.',
        'So $n^{\\sin n} \\le n^1 = n$ for $n \\ge 1$.',
        'Hence $f(n) = O(n)$. It is not $\\Theta(n)$ because it can be arbitrarily small.',
      ],
    },
    {
      prompt: 'Prove that for any $\\varepsilon > 0$, $\\log n = o(n^\\varepsilon)$.',
      answer: 'Limit of the ratio is zero.',
      steps: [
        'Consider $\\lim_{n \\to \\infty} \\frac{\\log n}{n^\\varepsilon}$.',
        'Apply L\'Hopital or substitute $n = e^m$: $m / e^{\\varepsilon m} \\to 0$.',
        'So $\\log n = o(n^\\varepsilon)$.',
      ],
    },
  ];

  PS.registerTopic("cplx-bigo", {
    title: "Big-O formal reasoning",
    description: "Proofs from the definition, growth ranking, and classification.",
    warmup: [genBigOClassMatch, genBigOClaim],
    standard: STATIC_BIGO_STANDARD,
    challenge: STATIC_BIGO_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: cplx-masters  — Master Theorem recurrences
  // ==========================================================================

  // Parametric recurrence solver: pick a, b, f(n) and classify
  function genMaster(rng) {
    // Build a master recurrence in one of the three cases randomly.
    var scenarios = [
      // case 1: n^log_b(a) > f(n) polynomially
      { a: 4, b: 2, fExp: 1, result: 'n^2',     why: 'Case 1: $n^{\\log_b a} = n^2$ dominates $f(n) = n$ polynomially.', cls: '$\\Theta(n^2)$' },
      { a: 8, b: 2, fExp: 2, result: 'n^3',     why: 'Case 1: $n^{\\log_b a} = n^3$ dominates $f(n) = n^2$ polynomially.', cls: '$\\Theta(n^3)$' },
      // case 2: f(n) == n^log_b(a)
      { a: 2, b: 2, fExp: 1, result: 'n log n', why: 'Case 2: $n^{\\log_b a} = n = f(n)$.', cls: '$\\Theta(n \\log n)$' },
      { a: 4, b: 2, fExp: 2, result: 'n^2 log n', why: 'Case 2: $n^{\\log_b a} = n^2 = f(n)$.', cls: '$\\Theta(n^2 \\log n)$' },
      { a: 1, b: 2, fExp: 0, result: 'log n',   why: 'Case 2: $n^{\\log_b a} = 1 = f(n)$.', cls: '$\\Theta(\\log n)$' },
      // case 3: f(n) > n^log_b(a)
      { a: 2, b: 2, fExp: 2, result: 'n^2',     why: 'Case 3: $f(n) = n^2$ dominates $n^{\\log_b a} = n$; regularity holds.', cls: '$\\Theta(n^2)$' },
      { a: 3, b: 4, fExp: 1, result: 'n',       why: 'Case 3: $f(n) = n$ dominates $n^{\\log_4 3} \\approx n^{0.79}$.', cls: '$\\Theta(n)$' },
    ];
    var s = rng.pick(scenarios);
    var fStr = s.fExp === 0 ? '1' : (s.fExp === 1 ? 'n' : 'n^{' + s.fExp + '}');
    return {
      prompt: 'Solve $T(n) = ' + s.a + ' T(n/' + s.b + ') + ' + fStr + '$ using the master theorem.',
      answer: s.cls,
      steps: [
        'Identify $a = ' + s.a + ', b = ' + s.b + ', f(n) = ' + fStr + '$.',
        'Compute $n^{\\log_b a}$ (balance term).',
        s.why,
        'Conclusion: $T(n) = ' + s.cls.replace(/\$/g, '') + '$.',
      ],
    };
  }

  var STATIC_MASTERS_STANDARD = [
    {
      prompt: 'Solve $T(n) = 2 T(n/2) + n$ (mergesort).',
      answer: '$\\Theta(n \\log n)$',
      steps: [
        '$a = 2, b = 2, f(n) = n$; balance term $n^{\\log_2 2} = n$.',
        'Case 2 applies: $f(n)$ matches the balance term.',
        'Result $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 4 T(n/2) + n$.',
      answer: '$\\Theta(n^2)$',
      steps: [
        '$a = 4, b = 2, f(n) = n$; balance $n^{\\log_2 4} = n^2$.',
        'Case 1: $f = n$ is polynomially smaller than $n^2$.',
        'Result $\\Theta(n^2)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = T(n/2) + 1$ (binary search).',
      answer: '$\\Theta(\\log n)$',
      steps: [
        '$a = 1, b = 2, f = 1$; balance $n^{\\log_2 1} = 1$.',
        'Case 2: $f(n)$ matches. Result $\\Theta(\\log n)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 7 T(n/2) + n^2$ (Strassen-like).',
      answer: '$\\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2.807})$',
      steps: [
        '$a = 7, b = 2, f = n^2$; balance $n^{\\log_2 7}$.',
        '$\\log_2 7 \\approx 2.807 > 2$, so case 1 applies.',
        'Result $\\Theta(n^{\\log_2 7})$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 2 T(n/2) + n \\log n$.',
      answer: '$\\Theta(n \\log^2 n)$',
      steps: [
        'Basic master theorem does not apply cleanly since $f(n) = n \\log n$ is neither polynomially bigger nor smaller than $n^{\\log_2 2} = n$.',
        'This is a logarithmic-gap case; extended master theorem gives $\\Theta(n \\log^2 n)$.',
      ],
    },
    {
      prompt: 'An algorithm has recurrence $T(n) = 3 T(n/3) + n$. What is its time complexity?',
      answer: '$\\Theta(n \\log n)$',
      steps: [
        '$a = 3, b = 3, f = n$; balance $n^{\\log_3 3} = n$.',
        'Case 2: match. Result $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 2 T(n/4) + \\sqrt n$.',
      answer: '$\\Theta(\\sqrt n \\log n)$',
      steps: [
        '$a = 2, b = 4, f = n^{1/2}$; balance $n^{\\log_4 2} = n^{1/2}$.',
        'Case 2: match. Result $\\Theta(\\sqrt n \\log n)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 9 T(n/3) + n^2$.',
      answer: '$\\Theta(n^2 \\log n)$',
      steps: [
        '$a = 9, b = 3, f = n^2$; balance $n^{\\log_3 9} = n^2$.',
        'Case 2 match. Result $\\Theta(n^2 \\log n)$.',
      ],
    },
    {
      prompt: 'You design a divide-and-conquer data analysis pipeline that splits the data into $5$ sub-pipelines of size $n/4$ each, with linear combine step. What is its complexity?',
      answer: '$\\Theta(n^{\\log_4 5}) \\approx \\Theta(n^{1.16})$',
      steps: [
        '$T(n) = 5 T(n/4) + n$. Balance $n^{\\log_4 5} \\approx n^{1.16}$.',
        'Case 1: $f = n$ is smaller. Result $\\Theta(n^{\\log_4 5})$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = T(n/2) + n$.',
      answer: '$\\Theta(n)$',
      steps: [
        '$a = 1, b = 2, f = n$; balance $n^{\\log_2 1} = 1$.',
        'Case 3: $f = n$ dominates $1$ polynomially; regularity clear.',
        'Result $\\Theta(n)$.',
      ],
    },
  ];

  var STATIC_MASTERS_CHALLENGE = [
    {
      prompt: 'Attempt the master theorem on $T(n) = 2 T(n/2) + n/\\log n$ and explain why it fails.',
      answer: 'Falls in the gap: $f(n) = n/\\log n$ is asymptotically smaller than $n = n^{\\log_b a}$ but not by a polynomial factor. Master theorem does not apply; Akra-Bazzi gives $\\Theta(n \\log \\log n)$.',
      steps: [
        'Balance term $n^{\\log_2 2} = n$.',
        'Ratio $f(n)/n = 1/\\log n \\to 0$, but not by a polynomial factor — no $\\varepsilon > 0$ with $f = O(n^{1-\\varepsilon})$.',
        'Master theorem case 1 fails; this is the polynomial-gap hypothesis.',
        'Akra-Bazzi method or direct recurrence analysis gives $\\Theta(n \\log \\log n)$.',
      ],
    },
    {
      prompt: 'Solve $T(n) = T(n/3) + T(2n/3) + n$.',
      answer: '$\\Theta(n \\log n)$',
      steps: [
        'Not a standard master theorem form — the recursion tree has uneven branches.',
        'Each level sums to $n$; the tree height is $\\Theta(\\log n)$ (determined by the shorter branch $\\log_{3/2} n$).',
        'Total work $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Use the recursion tree method to solve $T(n) = 4 T(n/2) + n^2 \\log n$.',
      answer: '$\\Theta(n^2 \\log^2 n)$',
      steps: [
        'Level $i$: $4^i$ subproblems of size $n/2^i$ with work $(n/2^i)^2 \\log(n/2^i)$ each.',
        'Per-level work: $4^i \\cdot n^2/4^i \\cdot \\log(n/2^i) = n^2 (\\log n - i)$.',
        'Summing over $i = 0, 1, \\ldots, \\log_2 n$: $n^2 \\sum_{i=0}^{\\log n}(\\log n - i) = \\Theta(n^2 \\log^2 n)$.',
      ],
    },
    {
      prompt: 'Prove the basic master theorem case 2: if $f(n) = \\Theta(n^{\\log_b a})$ then $T(n) = \\Theta(n^{\\log_b a} \\log n)$.',
      answer: 'Recursion-tree calculation: each of the $\\log_b n$ levels contributes $\\Theta(n^{\\log_b a})$ work.',
      steps: [
        'Tree has depth $\\log_b n$ and $a^i$ subproblems at level $i$ of size $n/b^i$.',
        'Work at level $i$: $a^i \\cdot \\Theta((n/b^i)^{\\log_b a}) = \\Theta(a^i \\cdot n^{\\log_b a} / a^i) = \\Theta(n^{\\log_b a})$.',
        'Sum over all $\\log_b n$ levels: $\\Theta(n^{\\log_b a} \\log_b n)$.',
      ],
    },
    {
      prompt: 'Consider a divide-and-conquer algorithm for matrix multiplication that does $T(n) = a T(n/2) + n^2$. What value of $a$ is needed to match Strassen, and what is the consequence of lowering $a$?',
      answer: '$a = 7$ gives Strassen ($\\Theta(n^{\\log_2 7})$); any $a \\le 6$ would give $\\Theta(n^2 \\log n)$ or $\\Theta(n^2)$.',
      steps: [
        '$a = 8$: standard $\\Theta(n^3)$ (case 1 with balance $n^3$).',
        '$a = 7$: balance $n^{\\log_2 7} \\approx n^{2.807}$ dominates $n^2$, case 1. Gives Strassen\'s bound.',
        '$a = 6$: balance $n^{\\log_2 6} \\approx n^{2.585}$ still case 1.',
        '$a \\le 4$: $n^{\\log_2 a} \\le n^2$ so case 2 or 3 gives $\\Theta(n^2 \\log n)$ or $\\Theta(n^2)$ — far better than cubic.',
      ],
    },
  ];

  PS.registerTopic("cplx-masters", {
    title: "Master theorem and recurrences",
    description: "Classify divide-and-conquer recurrences into standard form and derive closed-form bounds.",
    warmup: [genMaster],
    standard: STATIC_MASTERS_STANDARD,
    challenge: STATIC_MASTERS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: cplx-amortized
  // ==========================================================================

  var STATIC_AMORT_WARMUP = [
    {
      prompt: 'What does "amortized $O(1)$" mean for dynamic array append?',
      answer: 'Average cost over a sequence of $n$ appends is $O(1)$ per op, though some appends are $O(n)$.',
      steps: [
        'Most appends are cheap (write to a free slot).',
        'Occasionally the array doubles: one op costs $O(n)$.',
        'Total cost over $n$ appends is still $O(n)$, so average is $O(1)$.',
      ],
    },
    {
      prompt: 'Name the three canonical methods of amortized analysis.',
      answer: 'Aggregate, accounting, and potential.',
      steps: [
        'Aggregate: compute total cost over the sequence; divide by number of ops.',
        'Accounting: charge each op a "credit" to cover the true cost eventually.',
        'Potential: define $\\Phi$ on the state and use $\\hat c = c + \\Delta \\Phi$.',
      ],
    },
    {
      prompt: 'If each append costs at most $3$ amortized units, what can be the total cost of $n$ appends?',
      answer: 'At most $3n$ total.',
      steps: [
        'Summing amortized costs bounds the real cost (since $\\Phi \\ge 0$ typically).',
        '$\\sum \\hat c_i = 3 n$.',
      ],
    },
    {
      prompt: 'Amortized analysis and average-case analysis — are they the same?',
      answer: 'No. Amortized is worst-case over a sequence; average-case assumes an input distribution.',
      steps: [
        'Amortized: adversary picks the sequence; we still bound the average per op.',
        'Average-case: inputs are drawn from a distribution; we bound the expected per-op cost.',
      ],
    },
    {
      prompt: 'Dynamic array doubles from $8$ to $16$. How many elements are copied in that resize?',
      answer: '$8$',
      steps: [
        'All existing elements (the $8$ in the old buffer) are copied to the new buffer.',
      ],
    },
  ];

  var STATIC_AMORT_STANDARD = [
    {
      prompt: 'Use the aggregate method to show that $n$ dynamic-array appends cost $O(n)$ total.',
      answer: 'Total $\\le 3n - 1$.',
      steps: [
        'Cheap appends: $n$ of them at $O(1)$ each. Subtotal $n$.',
        'Resizes happen when size hits $1, 2, 4, 8, \\ldots, 2^k \\le n$. Their costs are $1 + 2 + 4 + \\cdots + 2^k \\le 2n - 1$.',
        'Total $\\le 3n - 1 = O(n)$; per-op amortized cost is $O(1)$.',
      ],
    },
    {
      prompt: 'Use the accounting method for dynamic array append. How much credit do you charge each append, and why?',
      answer: 'Charge $3$ units per append; $1$ for the real cost, $2$ banked on that element.',
      steps: [
        'When the array doubles from size $k$ to $2k$, the $k$ new elements each accumulated $2$ banked credits.',
        'Those $k \\cdot 2 = 2k$ banked credits cover the $k$-element copy cost of the resize.',
        'All appends get charged a constant $3$ — hence amortized $O(1)$.',
      ],
    },
    {
      prompt: 'Union-find with union-by-rank and path compression has amortized cost $O(\\alpha(n))$ per operation. What is $\\alpha$?',
      answer: 'The inverse Ackermann function, effectively constant for astronomical inputs.',
      steps: [
        '$\\alpha(n)$ is the smallest $k$ such that the Ackermann function $A(k, \\cdot)$ exceeds $n$.',
        'For any $n$ less than $2^{65536}$ or so, $\\alpha(n) \\le 4$.',
        'For practical purposes, union-find is amortized $O(1)$ per op.',
      ],
    },
    {
      prompt: 'Why does path compression alone (without union-by-rank) still give amortized $O(\\log n)$ union-find?',
      answer: 'Tree-compression flattens chains so repeated finds are cheap.',
      steps: [
        'Each find walks up a chain; path compression rewires every visited node to the root.',
        'Subsequent finds from those nodes are $O(1)$.',
        'The amortized bound is $O(\\log n)$ with only compression, $O(\\alpha(n))$ with both.',
      ],
    },
    {
      prompt: 'Give the potential function that proves dynamic-array append is amortized $O(1)$.',
      answer: '$\\Phi = 2 \\cdot (\\text{size}) - (\\text{capacity})$.',
      steps: [
        'Non-doubling append: size increases by 1, capacity unchanged. $\\Delta \\Phi = 2$. Real cost $1$. Amortized $3$.',
        'Doubling append: size = capacity before (size after = size+1, capacity after = 2 \\cdot capacity). Real cost $O(\\text{size})$.',
        'New $\\Phi = 2(\\text{size}+1) - 2\\text{capacity}$. Old $\\Phi = 2\\text{size} - \\text{capacity} = \\text{capacity}$.',
        'Amortized $= \\text{size} + \\Delta\\Phi$: the accounting works out to $3$.',
      ],
    },
    {
      prompt: 'Analyze amortized cost of append and pop on a dynamic array that halves when $1/4$ full.',
      answer: 'Both are amortized $O(1)$.',
      steps: [
        'Doubling fires when full; halving fires when at $1/4$ utilization.',
        'The gap between grow and shrink thresholds prevents thrashing.',
        'A potential function like $\\Phi = 2 \\cdot |\\text{size} - \\text{capacity}/2|$ proves both ops amortized $O(1)$.',
      ],
    },
    {
      prompt: 'Describe a data structure where the worst-case cost of one op is $\\Theta(n)$ but amortized is $O(1)$.',
      answer: 'Dynamic array append, or binary counter increment.',
      steps: [
        'Binary counter: each increment flips bits until the first $0$. Worst case is $\\Theta(\\log n)$; amortized $O(1)$ by a potential equal to the number of set bits.',
        'Dynamic array: amortized $O(1)$ append even with $O(n)$ resizes.',
      ],
    },
    {
      prompt: 'Binary counter: an $n$-bit counter starts at $0$ and is incremented $N$ times. Total number of bit-flips?',
      answer: '$\\le 2N$.',
      steps: [
        'Bit $i$ flips once every $2^i$ increments.',
        'Total flips $= \\sum_i N/2^i \\le 2N$.',
        'Per-increment amortized cost $\\le 2$, i.e. $O(1)$.',
      ],
    },
    {
      prompt: 'You run $10^6$ union-find operations on $n = 10^5$ elements. Estimate total work.',
      answer: '$\\sim 4 \\times 10^6$ operations ($\\alpha \\le 4$ for this $n$).',
      steps: [
        'With union-by-rank + path compression, amortized cost is $\\alpha(n) \\le 4$.',
        'Total $\\le 4 \\cdot 10^6$ basic ops.',
      ],
    },
    {
      prompt: 'Why does amortized analysis matter for real-time systems?',
      answer: 'A bad worst case on a single op can miss a deadline even if average is fast.',
      steps: [
        'Real-time requires bounded per-op time, not bounded total.',
        'Dynamic array append is amortized $O(1)$ but has $O(n)$ worst case, which is unacceptable for hard real-time.',
        'Real-time systems prefer non-amortized data structures or pre-allocated memory.',
      ],
    },
  ];

  var STATIC_AMORT_CHALLENGE = [
    {
      prompt: 'Prove via the potential method that $n$ operations on a binary counter cost $O(n)$ total.',
      answer: 'Let $\\Phi$ = number of set bits. Amortized cost per increment is $2$.',
      steps: [
        'Suppose an increment flips $t$ trailing $1$s to $0$ then sets one $0$ to $1$. Real cost: $t + 1$.',
        '$\\Delta \\Phi = 1 - t$ (one bit set, $t$ unset).',
        'Amortized cost: $(t+1) + (1-t) = 2$.',
        'Over $n$ increments: $\\le 2n + \\Phi_{\\text{final}} - \\Phi_{\\text{initial}} \\le 2n + \\log n$. So $O(n)$ total.',
      ],
    },
    {
      prompt: 'Consider a stack with two operations: PUSH ($O(1)$) and MULTIPOP($k$) (pop up to $k$ elements). Show that any sequence of $n$ operations costs $O(n)$ total.',
      answer: 'Use the potential $\\Phi = $ stack size.',
      steps: [
        'PUSH: real cost $1$, $\\Delta \\Phi = 1$, amortized $2$.',
        'MULTIPOP(k): real cost $\\min(k, \\text{size})$, $\\Delta \\Phi = -\\min(k, \\text{size})$, amortized $0$.',
        'Every operation has amortized $O(1)$. Sum over $n$ ops: $O(n)$.',
      ],
    },
    {
      prompt: 'A splay tree supports search, insert, and delete in amortized $O(\\log n)$. Briefly state the access lemma.',
      answer: 'Access time of node $x$ is $O(\\log(W/w(x)))$ where $w$ is a positive weight and $W$ is the total weight.',
      steps: [
        'Assign each node a positive weight. Define $\\Phi = \\sum \\log(\\text{size}(v))$.',
        'The access lemma bounds the amortized cost of one access to $O(\\log(W/w(x)) + 1)$.',
        'With uniform weights, this is $O(\\log n)$ per op.',
      ],
    },
    {
      prompt: 'Binomial heap\'s "meld" operation takes $O(\\log n)$ worst case but $O(1)$ amortized. Give the potential function idea.',
      answer: '$\\Phi$ = number of trees in the forest.',
      steps: [
        'Meld combines two forests and consolidates trees with equal rank.',
        'Each consolidation reduces tree count by one, so real cost is compensated by $\\Delta \\Phi$.',
        'The amortized cost of meld is $O(1)$.',
      ],
    },
    {
      prompt: 'Design a data structure supporting INSERT and MEDIAN in amortized $O(\\log n)$.',
      answer: 'Two heaps: max-heap for the lower half, min-heap for the upper.',
      steps: [
        'Maintain $|L| \\in \\{|U|, |U|+1\\}$.',
        'INSERT: put into the correct heap, then rebalance by moving one element if needed.',
        'MEDIAN: the top of $L$. Both ops are $O(\\log n)$ worst case, hence amortized too.',
      ],
    },
  ];

  PS.registerTopic("cplx-amortized", {
    title: "Amortized analysis",
    description: "Aggregate, accounting, and potential methods on classic examples.",
    warmup: STATIC_AMORT_WARMUP,
    standard: STATIC_AMORT_STANDARD,
    challenge: STATIC_AMORT_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: cplx-pvsnp
  // ==========================================================================

  var STATIC_PVSNP_WARMUP = [
    {
      prompt: 'What does it mean for a decision problem to be in $P$?',
      answer: 'There exists a deterministic polynomial-time algorithm that solves every instance.',
      steps: [
        '$P$ = poly-time decidable problems.',
        'Formally: $\\exists$ Turing machine $M$ and polynomial $p$ such that $M$ halts on every input $x$ in at most $p(|x|)$ steps and correctly decides membership.',
      ],
    },
    {
      prompt: 'What is an $NP$ verifier?',
      answer: 'A polynomial-time algorithm that checks a "yes" certificate.',
      steps: [
        'Given an input $x$ and a polynomial-size certificate $c$, the verifier outputs yes or no in poly time.',
        '$x$ is in the language iff some $c$ makes the verifier accept.',
      ],
    },
    {
      prompt: 'Is primality testing in $P$, $NP$, or both?',
      answer: 'Both — it is in $P$ (AKS 2002) and also in $NP$.',
      steps: [
        'AKS gives a deterministic poly-time primality test.',
        'Since $P \\subseteq NP$, primality is in $NP$ as well.',
      ],
    },
    {
      prompt: '$SAT$ asks: given a Boolean formula, is there an assignment that makes it true. Is $SAT$ in $NP$?',
      answer: 'Yes.',
      steps: [
        'Certificate: a satisfying assignment.',
        'Verifier: plug the assignment into the formula — poly time.',
      ],
    },
    {
      prompt: 'What does "NP-hard" mean?',
      answer: 'Every problem in $NP$ reduces to it in polynomial time.',
      steps: [
        'Not necessarily in $NP$ itself.',
        'If you can solve an NP-hard problem in poly time, every NP problem becomes poly time too.',
      ],
    },
  ];

  var STATIC_PVSNP_STANDARD = [
    {
      prompt: 'Classify: "Given a weighted graph and integer $k$, is there a simple path of weight $\\ge k$?" — what complexity class?',
      answer: 'NP-complete (longest path).',
      steps: [
        'In $NP$: verify a path certificate in poly time.',
        'NP-hard: Hamiltonian path reduces to this (set $k = n-1$, unit weights).',
        'So NP-complete.',
      ],
    },
    {
      prompt: 'Classify: "Given a graph, does it have a 2-coloring (is it bipartite)?"',
      answer: 'In $P$.',
      steps: [
        'BFS from any vertex and alternate colors.',
        'Check that no edge connects same-colored vertices.',
        'Linear time.',
      ],
    },
    {
      prompt: 'Classify: "Given a set of integers, is there a subset summing to target $t$?" (Subset-sum).',
      answer: 'NP-complete.',
      steps: [
        'In $NP$: the subset itself is a poly-size certificate.',
        'NP-hard by reduction from 3SAT (classical result).',
        'Pseudo-polynomial algorithm $O(n t)$ exists, which is exponential in the bit length of $t$.',
      ],
    },
    {
      prompt: 'Classify: "Given a graph, is there a cycle that visits every vertex exactly once?" (Hamiltonian cycle).',
      answer: 'NP-complete.',
      steps: [
        'In $NP$: verify the cycle in linear time.',
        'NP-hard by reduction from 3SAT or vertex cover (classical).',
      ],
    },
    {
      prompt: 'Classify: "Given a graph, find the shortest cycle passing through all vertices (TSP with distances)."',
      answer: 'NP-hard (TSP optimization).',
      steps: [
        'Decision form: "Is there a tour of length $\\le k$?" is NP-complete.',
        'Optimization form is NP-hard but not in NP (there is no short certificate that a given tour is globally optimal).',
      ],
    },
    {
      prompt: 'Classify: "Given an integer $n$ in binary, is $n$ prime?"',
      answer: 'In $P$ (AKS 2002) and $NP \\cap \\text{co-}NP$.',
      steps: [
        'Deterministic poly-time algorithm exists (AKS).',
        'Historically known to be in $NP \\cap \\text{co-}NP$ long before AKS.',
      ],
    },
    {
      prompt: 'Classify: "Given an integer $n$ in binary, find its prime factorization."',
      answer: 'No known poly-time algorithm; in $FNP$; decision version is in $NP \\cap \\text{co-}NP$.',
      steps: [
        'Factoring is widely believed hard but not known NP-complete.',
        'RSA\'s security depends on this belief.',
        'Shor\'s quantum algorithm solves it in poly time.',
      ],
    },
    {
      prompt: 'Classify: "Given a CNF formula, find the maximum number of clauses simultaneously satisfiable (MAX-SAT)."',
      answer: 'NP-hard; decision version NP-complete.',
      steps: [
        'Decision: "can $k$ clauses be satisfied?"',
        'In $NP$: certificate is an assignment. NP-hard by inclusion of SAT (set $k$ = number of clauses).',
      ],
    },
    {
      prompt: 'Classify: "Given a graph $G$, does $G$ have at least $k$ edges?"',
      answer: 'In $P$.',
      steps: [
        'Count edges by scanning the adjacency list.',
        'Compare count to $k$. Linear time.',
      ],
    },
    {
      prompt: 'What is wrong with this argument: "since solving NP-hard problems takes exponential time in the worst case, our real-world instances must be slow too"?',
      answer: 'NP-hard worst-case does not preclude tractable heuristics or structured instances.',
      steps: [
        'NP-hardness is a worst-case statement over all instances.',
        'Real-world inputs often have structure (sparsity, bounded treewidth, regularity).',
        'Solvers (SAT, ILP, SMT) handle millions of variables in practice.',
        'Approximation algorithms, parameterized algorithms, and heuristics all exploit structure.',
      ],
    },
  ];

  var STATIC_PVSNP_CHALLENGE = [
    {
      prompt: 'Prove that $P \\subseteq NP$.',
      answer: 'A $P$ algorithm is already a verifier that ignores the certificate.',
      steps: [
        'Let $L \\in P$ decided by poly-time $M$.',
        'Build a verifier $V(x, c)$ that ignores $c$ and runs $M(x)$.',
        '$V$ accepts iff $x \\in L$, and runs in poly time. So $L \\in NP$.',
      ],
    },
    {
      prompt: 'Show that 3-coloring is NP-hard by a direct reduction from 3-SAT.',
      answer: 'Gadgets: one triangle of "True/False/Base" colors, plus variable and clause gadgets.',
      steps: [
        'Create a base triangle with three vertices labeled T, F, B (forced to different colors).',
        'For each variable $x_i$, create two vertices $x_i, \\bar x_i$ joined by an edge and both joined to B — so one must be T and the other F.',
        'For each clause, build a gadget of 6 vertices connecting its literals to the base triangle such that the gadget is 3-colorable iff at least one literal is true.',
        'Total graph is 3-colorable iff the formula is satisfiable.',
      ],
    },
    {
      prompt: 'Show that Vertex Cover $\\le_p$ Independent Set and vice versa.',
      answer: 'A set $S$ is a vertex cover iff $V \\setminus S$ is an independent set.',
      steps: [
        'Instance: graph $G$ and integer $k$.',
        'Reduce VC: "$G$ has VC of size $\\le k$" iff "$G$ has IS of size $\\ge n - k$".',
        'The map $S \\leftrightarrow V \\setminus S$ is a bijection that preserves the property.',
        'Both directions are poly-time.',
      ],
    },
    {
      prompt: 'Prove that if $P = NP$, then we can also solve NP-hard optimization problems in polynomial time (search to decision).',
      answer: 'Binary search + poly-time decision gives the optimal value; self-reduction gives a certificate.',
      steps: [
        'Let the decision version "is there a solution with value $\\le k$?" be in $P$.',
        'Binary-search on $k$ to find the optimal value.',
        'Use self-reducibility: fix one variable, ask the decision oracle if a solution still exists; if yes, commit; if no, flip. Recursively build the full solution.',
      ],
    },
    {
      prompt: 'Give a polynomial-time reduction from 3-SAT to Independent Set.',
      answer: 'Build a triangle for each clause; join contradictory literals across clauses.',
      steps: [
        'For a 3-CNF with $m$ clauses, create a graph with $3m$ vertices (one per literal occurrence).',
        'Connect the three vertices inside each clause to form a triangle.',
        'Connect every pair of vertices that are a literal and its negation.',
        'The graph has an independent set of size $m$ iff the formula is satisfiable (pick one true literal per clause).',
      ],
    },
  ];

  PS.registerTopic("cplx-pvsnp", {
    title: "P, NP, and NP-completeness",
    description: "Classify real problems, prove reductions, and reason about what a proof of $P = NP$ would imply.",
    warmup: STATIC_PVSNP_WARMUP,
    standard: STATIC_PVSNP_STANDARD,
    challenge: STATIC_PVSNP_CHALLENGE,
  });

})();
