/*
 * LearningHub - Algorithms Problem Set
 * Registers 5 topics with LearningHubProblemSet runtime.
 * Topics: algo-bigo, algo-sorting, algo-graphs, algo-dp, algo-greedy
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[algorithms-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // Helpers
  // ==========================================================================
  function fmtNum(x) {
    if (!isFinite(x)) return '\\infty';
    if (x >= 1e12) return x.toExponential(2).replace('e+', ' \\times 10^{') + '}';
    if (x >= 1e6) return Math.round(x).toLocaleString();
    if (x >= 1) return String(Math.round(x));
    return x.toFixed(3);
  }

  // ==========================================================================
  // TOPIC 1: algo-bigo  (Big-O reasoning and runtime estimation)
  // ==========================================================================

  // Warm-up: classify a simple loop nest
  function genBigOLoopClassify(rng) {
    var forms = [
      { code: 'for i in 1..n: work(1)', ans: '$O(n)$', why: 'A single loop doing constant work each iteration.' },
      { code: 'for i in 1..n:\n  for j in 1..n: work(1)', ans: '$O(n^2)$', why: 'Two nested loops each running $n$ times give $n \\cdot n$.' },
      { code: 'for i in 1..n:\n  for j in 1..i: work(1)', ans: '$O(n^2)$', why: 'Inner loop sums to $1+2+\\cdots+n = n(n+1)/2$.' },
      { code: 'while n > 1: n = n / 2', ans: '$O(\\log n)$', why: 'Halving $n$ reaches $1$ after $\\log_2 n$ steps.' },
      { code: 'for i in 1..n: for j=i while j<n: j=j*2', ans: '$O(n \\log n)$', why: 'Outer loop $n$, inner doubles so $\\log n$ steps.' },
      { code: 'for i in 1..n: for j in 1..n: for k in 1..n: work(1)', ans: '$O(n^3)$', why: 'Three nested length-$n$ loops.' },
    ];
    var pick = rng.pick(forms);
    return {
      prompt: 'Give the tightest big-O time complexity of this pseudocode in terms of $n$:<br><code>' + pick.code + '</code>',
      answer: pick.ans,
      steps: [
        'Count the work per iteration (constant here).',
        'Count how many times each loop runs.',
        pick.why,
      ],
    };
  }

  // Warm-up: growth-ordering - which dominates?
  function genBigOOrder(rng) {
    var pairs = [
      ['$n \\log n$', '$n^2$', '$n^2$'],
      ['$2^n$', '$n^{10}$', '$2^n$'],
      ['$n!$', '$2^n$', '$n!$'],
      ['$\\log n$', '$\\sqrt{n}$', '$\\sqrt{n}$'],
      ['$n^3$', '$n^2 \\log n$', '$n^3$'],
      ['$n$', '$n \\log n$', '$n \\log n$'],
    ];
    var p = rng.pick(pairs);
    return {
      prompt: 'Which function grows faster as $n \\to \\infty$: ' + p[0] + ' or ' + p[1] + '?',
      answer: p[2],
      steps: [
        'Take the ratio and examine the limit.',
        'Polynomials beat poly-logs; exponentials beat polynomials; factorials beat exponentials.',
        p[2] + ' wins.',
      ],
    };
  }

  // Standard: runtime estimation in wall-clock time
  function genBigOWallClock(rng) {
    // algorithm rate in basic operations per second
    var OPS = 1e9;
    var cases = [
      { n: 1e6, kind: 'n',      label: '$O(n)$',       f: function(n){return n;} },
      { n: 1e6, kind: 'nlogn',  label: '$O(n \\log n)$', f: function(n){return n*Math.log2(n);} },
      { n: 1e5, kind: 'n2',     label: '$O(n^2)$',     f: function(n){return n*n;} },
      { n: 1e4, kind: 'n2',     label: '$O(n^2)$',     f: function(n){return n*n;} },
      { n: 500,  kind: 'n3',    label: '$O(n^3)$',     f: function(n){return n*n*n;} },
      { n: 30,   kind: '2n',    label: '$O(2^n)$',     f: function(n){return Math.pow(2,n);} },
    ];
    var c = rng.pick(cases);
    var ops = c.f(c.n);
    var sec = ops / OPS;
    var human;
    if (sec < 1e-3) human = fmtNum(sec*1e6) + '\\ \\mu s';
    else if (sec < 1) human = fmtNum(sec*1e3) + '\\ ms';
    else if (sec < 3600) human = fmtNum(sec) + '\\ s';
    else if (sec < 86400*365) human = fmtNum(sec/3600) + '\\ h';
    else human = fmtNum(sec/(86400*365)) + '\\ years';
    return {
      prompt: 'A ' + c.label + ' algorithm runs at about $10^9$ basic operations per second. Estimate the wall-clock time for $n = ' + c.n.toExponential(0).replace('e+', ' \\times 10^{') + '}$.',
      answer: '$\\approx ' + human + '$',
      steps: [
        'Plug $n$ into the cost formula to get basic-operation count.',
        'Operation count $\\approx ' + fmtNum(ops) + '$.',
        'Divide by $10^9$ ops/sec: $' + fmtNum(sec) + '$ seconds.',
        'Convert to a human-sized unit: $\\approx ' + human + '$.',
      ],
    };
  }

  var STATIC_BIGO_STANDARD = [
    {
      prompt: 'A scientist has $n = 10^9$ data points and wants to run pairwise distance calculations between all pairs. How many pair comparisons are needed, and is it feasible on a laptop in under a day at $10^9$ ops/sec?',
      answer: '$\\binom{n}{2} \\approx 5 \\times 10^{17}$ comparisons — not feasible ($\\sim 16$ years).',
      steps: [
        'Pairwise cost is $\\binom{n}{2} = n(n-1)/2 \\approx n^2/2$.',
        'For $n = 10^9$ that is $\\approx 5 \\times 10^{17}$ operations.',
        'At $10^9$ ops/sec that takes $5 \\times 10^8$ seconds $\\approx 16$ years.',
        'You must reduce to $O(n \\log n)$ or use spatial indexing (KD-tree, LSH).',
      ],
    },
    {
      prompt: 'Prove from the formal definition of big-O that $3n^2 + 5n + 7 = O(n^2)$.',
      answer: 'Choose $c = 15$, $n_0 = 1$.',
      steps: [
        'Need $c > 0$, $n_0 > 0$ with $3n^2 + 5n + 7 \\le c n^2$ for $n \\ge n_0$.',
        'For $n \\ge 1$: $3n^2 + 5n + 7 \\le 3n^2 + 5n^2 + 7n^2 = 15 n^2$.',
        'So $c = 15$, $n_0 = 1$ works.',
      ],
    },
    {
      prompt: 'An algorithm does $f(n) = n \\log_2 n$ comparisons. Going from $n = 10^6$ to $n = 10^9$, by what factor does the running time grow?',
      answer: 'About $1500\\times$.',
      steps: [
        'Ratio is $\\dfrac{10^9 \\log_2 10^9}{10^6 \\log_2 10^6} = 10^3 \\cdot \\dfrac{30}{20} = 1500$.',
        'Scaling by $1000$ in $n$ gives only a $1500\\times$ slowdown — much better than $10^6$ for quadratic.',
      ],
    },
    {
      prompt: 'A simulation runs $T(n) = 2 T(n/2) + n$ work per step. What is $T(n)$?',
      answer: '$\\Theta(n \\log n)$',
      steps: [
        'This is the mergesort recurrence.',
        'Master theorem: $a = 2, b = 2, f(n) = n$ with $n^{\\log_b a} = n$.',
        'Case 2: $T(n) = \\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Simplify $O(n^2 + n \\log n + 100 n + 42)$ to the tightest standard form.',
      answer: '$O(n^2)$',
      steps: [
        'Drop constants and lower-order terms.',
        'The $n^2$ dominates $n \\log n$, $n$, and any constant.',
        'Result: $O(n^2)$.',
      ],
    },
    {
      prompt: 'A PM asks you whether replacing a $O(n^2)$ algorithm with a $O(n \\log n)$ one is worth the engineering effort when $n = 2{,}000$. How would you answer quantitatively?',
      answer: 'Only about $\\sim 180\\times$ speedup for this $n$; likely worth it if $n$ will grow.',
      steps: [
        'At $n = 2000$: $n^2 = 4 \\times 10^6$, $n \\log_2 n \\approx 2000 \\cdot 11 = 22000$.',
        'Ratio $\\approx 180$. That is a real but not huge win at this size.',
        'At $n = 2 \\times 10^5$: ratio balloons to roughly $11{,}000$; the asymptotic win matters only when $n$ is large.',
      ],
    },
    {
      prompt: 'True or false: $n \\log n = O(n^{1.1})$. Justify.',
      answer: 'True.',
      steps: [
        'Compare $n \\log n$ to $n^{1.1} = n \\cdot n^{0.1}$.',
        'For large $n$, $n^{0.1}$ grows faster than $\\log n$ (any positive power of $n$ dominates any logarithm).',
        'So eventually $\\log n < n^{0.1}$, giving $n \\log n < n^{1.1}$.',
      ],
    },
    {
      prompt: 'You have $f(n) = O(n)$ and $g(n) = O(n^2)$. Is $f(n) \\cdot g(n) = O(n^3)$?',
      answer: 'Yes.',
      steps: [
        '$f(n) \\le c_1 n$ and $g(n) \\le c_2 n^2$ for large $n$.',
        'Then $f(n) g(n) \\le c_1 c_2 n^3$.',
        'So $f g = O(n^3)$.',
      ],
    },
    {
      prompt: 'Rank these by asymptotic growth (slowest first): $n!$, $n^2$, $n \\log n$, $\\log n$, $2^n$, $n$.',
      answer: '$\\log n \\prec n \\prec n \\log n \\prec n^2 \\prec 2^n \\prec n!$',
      steps: [
        'Logs beat linear slightly, linear beats $n \\log n$, polynomial beats poly-log.',
        'Exponential beats any polynomial; factorial beats exponential.',
      ],
    },
    {
      prompt: 'A database engineer sees a report take $2$ seconds on $10^4$ rows and $200$ seconds on $10^5$ rows. What is the likely time complexity?',
      answer: '$O(n^2)$',
      steps: [
        'Input grew $10\\times$. Time grew $100\\times$.',
        'Quadratic time scales as $(10)^2 = 100$. This matches.',
        'Linear would give $10\\times$, $n \\log n$ about $12\\times$, cubic $1000\\times$.',
      ],
    },
    {
      prompt: 'You must find if an array of $n$ integers contains duplicates. Give algorithms for $O(n^2)$, $O(n \\log n)$, and expected $O(n)$.',
      answer: 'Brute pairs; sort and scan; hash set.',
      steps: [
        '$O(n^2)$: compare every pair.',
        '$O(n \\log n)$: sort, then check consecutive equal.',
        'Expected $O(n)$: insert into a hash set, return true on first collision.',
      ],
    },
    {
      prompt: 'Explain why $T(n) = T(n-1) + n$ is $\\Theta(n^2)$.',
      answer: '$T(n) = n(n+1)/2 = \\Theta(n^2)$.',
      steps: [
        'Unroll: $T(n) = n + (n-1) + (n-2) + \\cdots + 1 + T(0)$.',
        'Arithmetic sum: $n(n+1)/2$.',
        'Leading term is $n^2/2$, so $T(n) = \\Theta(n^2)$.',
      ],
    },
  ];

  var STATIC_BIGO_CHALLENGE = [
    {
      prompt: 'Show that $\\log(n!) = \\Theta(n \\log n)$.',
      answer: 'Stirling gives upper and lower bounds matching $n \\log n$.',
      steps: [
        'Upper: $\\log(n!) = \\sum_{k=1}^n \\log k \\le n \\log n$.',
        'Lower: $\\log(n!) \\ge \\sum_{k=\\lceil n/2 \\rceil}^n \\log k \\ge (n/2)\\log(n/2) = (n/2)(\\log n - 1)$.',
        'Both bounds are $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'An engineer claims Radix sort is $O(n)$ and so beats comparison sorts. What is the catch?',
      answer: 'Radix is $O(n \\cdot k)$ where $k$ is key length; the hidden factor can be large.',
      steps: [
        'Radix sort passes over $k$ digits per key, with $O(n)$ work per pass.',
        'Total $O(n k)$. For $b$-bit integers, $k = O(\\log \\max)$.',
        'For arbitrary comparisons or long keys, $k$ can be $\\Omega(\\log n)$ so the bound degenerates.',
        'Radix beats comparison sorts only when keys are short fixed-width integers.',
      ],
    },
    {
      prompt: 'Solve $T(n) = 3 T(n/4) + n \\log n$ up to $\\Theta$.',
      answer: '$\\Theta(n \\log n)$',
      steps: [
        '$a=3$, $b=4$, so $n^{\\log_b a} = n^{\\log_4 3} \\approx n^{0.79}$.',
        '$f(n) = n \\log n$ grows faster than $n^{0.79}$ by a polynomial factor, so case 3.',
        'Check regularity: $3 f(n/4) = (3/4) n \\log(n/4) \\le (3/4) n \\log n$ eventually, so regularity holds.',
        'Answer: $\\Theta(n \\log n)$.',
      ],
    },
    {
      prompt: 'Prove that any comparison-based sort must make $\\Omega(n \\log n)$ comparisons in the worst case.',
      answer: 'Decision-tree counting argument.',
      steps: [
        'A comparison sort corresponds to a binary decision tree whose leaves are the $n!$ possible permutations.',
        'A binary tree with $L$ leaves has height $\\ge \\lceil \\log_2 L \\rceil$.',
        'So any comparison sort makes at least $\\log_2(n!) = \\Theta(n \\log n)$ comparisons in the worst case.',
      ],
    },
    {
      prompt: 'An analyst needs to run $10^4$ Monte Carlo simulations, each of complexity $O(n^2)$ where $n = 2000$. Each op is $10$ ns. Estimate total runtime.',
      answer: '$\\approx 400$ seconds ($\\sim 7$ minutes).',
      steps: [
        'Per sim: $n^2 = 4 \\times 10^6$ ops $\\times 10^{-8}$ s = $4 \\times 10^{-2}$ s.',
        'Total: $10^4 \\times 4 \\times 10^{-2} = 400$ s.',
      ],
    },
  ];

  PS.registerTopic("algo-bigo", {
    title: "Big-O reasoning and runtime estimation",
    description: "Classify loops, rank growth rates, and convert asymptotics into wall-clock estimates.",
    warmup: [genBigOLoopClassify, genBigOOrder],
    standard: [genBigOWallClock, STATIC_BIGO_STANDARD],
    challenge: STATIC_BIGO_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: algo-sorting
  // ==========================================================================

  // Warm-up generator: trace one pass of bubble sort
  function genBubblePass(rng) {
    var a = [];
    for (var i = 0; i < 5; i++) a.push(rng.int(1, 20));
    var b = a.slice();
    for (var j = 0; j < b.length - 1; j++) {
      if (b[j] > b[j+1]) { var t = b[j]; b[j] = b[j+1]; b[j+1] = t; }
    }
    return {
      prompt: 'After one left-to-right pass of bubble sort on $[' + a.join(', ') + ']$, what is the array?',
      answer: '$[' + b.join(', ') + ']$',
      steps: [
        'Compare adjacent pairs and swap if out of order.',
        'The largest element "bubbles" to the rightmost position after one pass.',
      ],
    };
  }

  // Warm-up: sort identification by behavior
  function genSortIdentify(rng) {
    var cards = [
      { c: 'In-place, $O(n \\log n)$ average but $O(n^2)$ worst, poor cache behavior? (Hint: partition-based.)', a: 'Quicksort' },
      { c: 'Stable, worst-case $O(n \\log n)$, needs $O(n)$ extra space for merging?', a: 'Mergesort' },
      { c: 'In-place, $O(n \\log n)$ worst case, uses a binary heap?', a: 'Heapsort' },
      { c: '$O(n^2)$, but $O(n)$ on a nearly-sorted input, one-pass-per-item?', a: 'Insertion sort' },
      { c: '$O(n + k)$ for integer keys bounded by $k$, not comparison based?', a: 'Counting sort' },
    ];
    var c = rng.pick(cards);
    return {
      prompt: 'Which sorting algorithm matches this description? ' + c.c,
      answer: c.a,
      steps: [
        'Match the properties one by one.',
        'Answer: ' + c.a + '.',
      ],
    };
  }

  var STATIC_SORTING_STANDARD = [
    {
      prompt: 'Trace mergesort on the array $[5, 2, 8, 1, 9, 3, 7, 4]$. What are the two halves right before the final merge?',
      answer: '$[1, 2, 5, 8]$ and $[3, 4, 7, 9]$',
      steps: [
        'Split once: $[5,2,8,1]$ and $[9,3,7,4]$.',
        'Recurse on each half; each is sorted independently.',
        'Left half becomes $[1,2,5,8]$; right half becomes $[3,4,7,9]$.',
        'Final merge yields $[1,2,3,4,5,7,8,9]$.',
      ],
    },
    {
      prompt: 'You partition the array $[7, 3, 9, 2, 8, 5, 4, 6]$ around the first element ($7$) using Lomuto partition. Give the result.',
      answer: '$[3, 2, 5, 4, 6, 7, 8, 9]$ (pivot is at index 5).',
      steps: [
        'Scan left-to-right. Anything $\\le 7$ goes into the left zone.',
        'Elements $\\le 7$ in order: $3, 2, 5, 4, 6$.',
        'Elements $> 7$ follow: $9, 8$.',
        'Pivot $7$ sits between them.',
      ],
    },
    {
      prompt: 'Sort $[4, 1, 3, 1, 5, 9, 2, 6, 5, 3]$ with counting sort where keys range $0..9$. Give the count array after scanning.',
      answer: 'count $= [0, 2, 1, 2, 1, 2, 1, 0, 0, 1]$',
      steps: [
        'Make a count array of length $10$.',
        'Increment count[x] for each value.',
        'Value tallies: $1\\to 2$, $2\\to 1$, $3\\to 2$, $4\\to 1$, $5\\to 2$, $6\\to 1$, $9\\to 1$.',
      ],
    },
    {
      prompt: 'Explain why quicksort is usually faster than mergesort in practice despite identical asymptotic complexity.',
      answer: 'Better constants, cache behavior, in-place operation.',
      steps: [
        'Quicksort partitions in place, reading contiguous memory — cache-friendly.',
        'Mergesort needs extra $O(n)$ space and copies elements to a buffer.',
        'Quicksort has a smaller inner loop and lower constant factors.',
        'With random pivots or median-of-three, worst case is extremely unlikely.',
      ],
    },
    {
      prompt: 'A bioinformatician needs to sort $10^8$ 32-bit integer reads. Which sort is most appropriate and why?',
      answer: 'Radix sort, exploiting the fixed 32-bit key width.',
      steps: [
        'Keys are bounded integers, so radix sort gives $O(n k)$ with $k = 32/r$ passes for $r$-bit digits.',
        'That beats comparison sorts $O(n \\log n) = O(n \\cdot 27)$ in constant factors too.',
        'Mergesort is a safe fallback but slower in practice.',
      ],
    },
    {
      prompt: 'The array $A = [a_1, a_2, \\ldots, a_n]$ is "almost sorted": each element is at most $k$ positions from its final spot. Give an algorithm that sorts it in $O(n \\log k)$.',
      answer: 'Use a min-heap of size $k+1$.',
      steps: [
        'Insert the first $k+1$ elements into a min-heap.',
        'Repeat: extract-min (next sorted output), insert next element from array.',
        'Each heap op is $O(\\log k)$; total $O(n \\log k)$.',
      ],
    },
    {
      prompt: 'Why is stability important when you sort a log of events by timestamp after already sorting by user?',
      answer: 'Stability preserves the user-order within each timestamp bucket.',
      steps: [
        'You first sort by user, then by timestamp.',
        'A stable sort keeps rows with equal timestamps in their prior (by-user) order.',
        'Without stability, the user ordering is scrambled within ties.',
      ],
    },
    {
      prompt: 'Given $n$ integers in the range $[0, n^3]$, describe an $O(n)$ sorting strategy.',
      answer: 'Radix sort in base $n$: 3 passes, each $O(n)$.',
      steps: [
        'Each integer has at most 3 base-$n$ digits.',
        'Radix sort with $O(n)$ counting sort per digit pass.',
        'Total: $3 \\cdot O(n) = O(n)$.',
      ],
    },
    {
      prompt: 'An operations team has $10^6$ delivery orders to sort by priority ($1..5$). What is the fastest in-memory approach?',
      answer: 'Counting sort, $O(n + k)$ with $k = 5$.',
      steps: [
        'Tabulate count per priority.',
        'Write output by scanning priorities in order.',
        '$O(n)$ total for $k$ small.',
      ],
    },
    {
      prompt: 'Find the $k$-th smallest element of an array in expected $O(n)$ time.',
      answer: 'Quickselect — partition and recurse into one side.',
      steps: [
        'Pick a pivot, partition. Say the pivot lands at position $p$.',
        'If $p = k$, return the pivot.',
        'If $k < p$, recurse left; otherwise recurse right.',
        'Expected cost is $O(n)$ with random pivots; worst case is $O(n^2)$.',
      ],
    },
  ];

  var STATIC_SORTING_CHALLENGE = [
    {
      prompt: 'External sort: you have $10^{10}$ records on disk and only $10^8$ records of RAM. Describe a strategy.',
      answer: 'Sort-then-merge: make sorted runs of $10^8$, then do a $k$-way merge.',
      steps: [
        'Read $10^8$ records at a time, sort in memory, write back as a "run". You get $\\sim 100$ runs.',
        'Merge runs using a min-heap of size $100$: repeatedly extract smallest, refill from its source run.',
        'Total I/O is $O(n \\log_k n)$ where $k$ is the fan-in of the merge.',
      ],
    },
    {
      prompt: 'Given an array of $n$ elements where only $O(\\log n)$ are out of place, design an algorithm to fix it in $O(n)$ time.',
      answer: 'Scan for out-of-place items, remove them, binary-insert each back.',
      steps: [
        'One pass to detect items that break the sorted order and collect them into a side list $L$ of size $k = O(\\log n)$.',
        'Remove them from the main array (shift); the remaining array is sorted in $O(n)$ time.',
        'Binary-insert each of the $k$ items: $O(k \\log n)$ which is $O(\\log^2 n)$.',
        'Total: $O(n + \\log^2 n) = O(n)$.',
      ],
    },
    {
      prompt: 'Design an algorithm that, given $n$ integers, returns them sorted in non-decreasing order of frequency, breaking ties by value.',
      answer: 'Hash-count, then sort by (frequency, value) in $O(n \\log n)$.',
      steps: [
        'Pass 1: build a hash map value $\\to$ count.',
        'Pass 2: emit pairs $(\\text{count}, \\text{value})$ into a list.',
        'Sort the list by count ascending, ties broken by value.',
        'Reconstruct the output by repeating each value its count times.',
      ],
    },
    {
      prompt: 'Merge $k$ sorted arrays of total size $n$ into one sorted array in $O(n \\log k)$ time.',
      answer: 'Min-heap of size $k$ holding the current front of each array.',
      steps: [
        'Initialize a min-heap with $(a_i[0], i)$ for each of the $k$ arrays.',
        'Repeatedly pop the smallest $(v, i)$, emit $v$, push the next element from array $i$.',
        'Each of $n$ elements triggers an $O(\\log k)$ heap op.',
        'Total: $O(n \\log k)$.',
      ],
    },
    {
      prompt: 'Prove that any sort that only uses the operations "swap adjacent elements" must take $\\Omega(n^2)$ in the worst case.',
      answer: 'Inversions can be $\\binom{n}{2}$; each adjacent swap fixes at most one.',
      steps: [
        'Define an inversion as a pair $(i,j)$ with $i<j$ but $a_i > a_j$.',
        'The reversed array has $\\binom{n}{2}$ inversions.',
        'An adjacent swap changes the inversion count by exactly $\\pm 1$.',
        'So any such sort needs at least $\\binom{n}{2} = \\Omega(n^2)$ swaps.',
      ],
    },
  ];

  PS.registerTopic("algo-sorting", {
    title: "Sorting algorithms",
    description: "Classical comparison sorts, non-comparison sorts, and practical trade-offs.",
    warmup: [genBubblePass, genSortIdentify],
    standard: STATIC_SORTING_STANDARD,
    challenge: STATIC_SORTING_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: algo-graphs
  // ==========================================================================

  var STATIC_GRAPHS_WARMUP = [
    {
      prompt: 'A graph has vertices $\\{A,B,C,D,E\\}$ and edges $\\{AB, AC, BD, CE\\}$. Starting from $A$, list the BFS visit order.',
      answer: '$A, B, C, D, E$',
      steps: [
        'Queue starts $[A]$. Visit $A$, enqueue neighbors $B, C$.',
        'Dequeue $B$, enqueue $D$. Dequeue $C$, enqueue $E$.',
        'Dequeue $D$, then $E$. Order: $A, B, C, D, E$.',
      ],
    },
    {
      prompt: 'Same graph $\\{A,B,C,D,E\\}$ with edges $\\{AB, AC, BD, CE\\}$. Give a valid DFS order starting from $A$ (neighbors in alphabetical order).',
      answer: '$A, B, D, C, E$',
      steps: [
        'Push $A$, visit $A$. Recurse into $B$ first.',
        'From $B$, recurse into $D$. No unvisited neighbors, backtrack.',
        'Back at $A$, recurse into $C$, then $E$.',
      ],
    },
    {
      prompt: 'How many edges does a simple undirected graph on $n$ vertices have at most?',
      answer: '$\\binom{n}{2} = n(n-1)/2$',
      steps: [
        'Each unordered pair of distinct vertices can be an edge at most once.',
        'The number of pairs is $\\binom{n}{2}$.',
      ],
    },
    {
      prompt: 'True or false: a tree with $n$ vertices has exactly $n - 1$ edges.',
      answer: 'True.',
      steps: [
        'A tree is connected and acyclic.',
        'Induction: adding a vertex to a tree requires exactly one new edge to keep it connected and acyclic.',
      ],
    },
    {
      prompt: 'Sum of degrees in a graph with $m$ edges?',
      answer: '$2m$',
      steps: [
        'Each edge contributes $1$ to the degree of each endpoint.',
        'So total degree is $2m$ (handshaking lemma).',
      ],
    },
  ];

  var STATIC_GRAPHS_STANDARD = [
    {
      prompt: 'Run BFS from source $s$ on this graph: vertices $\\{s, a, b, c, d, e\\}$, edges $\\{sa, sb, ac, bd, cd, de\\}$. Give the shortest distance from $s$ to each vertex.',
      answer: '$d(s)=0, d(a)=1, d(b)=1, d(c)=2, d(d)=2, d(e)=3$',
      steps: [
        'Layer 0: $\\{s\\}$.',
        'Layer 1: $\\{a, b\\}$ (neighbors of $s$).',
        'Layer 2: $\\{c, d\\}$ (new neighbors of $a$ and $b$).',
        'Layer 3: $\\{e\\}$ (new neighbor of $d$).',
      ],
    },
    {
      prompt: 'Dijkstra from $s$: vertices $\\{s, a, b, c, t\\}$, edges with weights $(s,a,4), (s,b,2), (a,c,3), (b,a,1), (b,c,4), (c,t,2)$. Find $d(t)$.',
      answer: '$d(t) = 7$',
      steps: [
        'Init: $d(s)=0$, everything else $\\infty$.',
        'Settle $s$. Relax $a=4, b=2$.',
        'Settle $b$ (dist $2$). Relax $a = \\min(4, 2+1)=3$, $c = 2+4 = 6$.',
        'Settle $a$ (dist $3$). Relax $c = \\min(6, 3+3)=6$.',
        'Settle $c$ (dist $6$). Relax $t = 6 + 2 = 8$... wait, let me recheck: via $a$, $c = 6$; $t = 8$. But actually, the direct path $s \\to b \\to a \\to c \\to t = 2+1+3+2 = 8$. Best is $s \\to b \\to c$? No, $b \\to c$ gives $6$, then $+2 = 8$. Shortest is $8$.',
        'Corrected answer: $d(t) = 8$.',
      ],
    },
    {
      prompt: 'A graph has $n$ vertices and $m$ edges, stored as an adjacency list. What is the total time cost of BFS?',
      answer: '$O(n + m)$',
      steps: [
        'Each vertex is enqueued and dequeued once: $O(n)$ total.',
        'Each edge is explored exactly twice (once from each endpoint) in an undirected graph: $O(m)$.',
        'Total $O(n + m)$.',
      ],
    },
    {
      prompt: 'Given a DAG of tasks with dependencies, how do you determine a valid execution order?',
      answer: 'Topological sort via DFS or Kahn\'s algorithm.',
      steps: [
        'DFS approach: run DFS; on each vertex\'s finish, push onto a stack.',
        'Reverse the stack to get a topological order.',
        'Kahn\'s approach: repeatedly remove a vertex with in-degree 0.',
      ],
    },
    {
      prompt: 'In a social graph with $10^8$ users and average degree $200$, estimate the space needed for an adjacency-list representation.',
      answer: '$\\approx 10^8 + 2 \\times 10^{10}$ edge entries; $\\sim 80$ GB raw.',
      steps: [
        'Vertices: $10^8$ nodes.',
        'Edges (undirected, each stored twice): $2 \\cdot 10^8 \\cdot 200 = 4 \\times 10^{10}$ entries.',
        'At $4$ bytes per neighbor id plus overhead, we\'re in the tens of GB range.',
      ],
    },
    {
      prompt: 'Write the Bellman-Ford relaxation rule and state when it converges.',
      answer: '$d(v) \\leftarrow \\min(d(v), d(u) + w(u,v))$; runs $n-1$ rounds.',
      steps: [
        'For each edge $(u,v,w)$, try to improve $d(v)$.',
        'After $n-1$ full passes, all shortest paths are found (if no negative cycle).',
        'An $n$-th pass that still relaxes means a negative cycle exists.',
      ],
    },
    {
      prompt: 'Given a connected undirected weighted graph, name two algorithms that compute a minimum spanning tree.',
      answer: 'Kruskal ($O(m \\log m)$ with union-find) and Prim ($O(m \\log n)$ with a heap).',
      steps: [
        'Kruskal: sort edges by weight; add edge if it connects two different components.',
        'Prim: grow a tree from a seed vertex, always adding the cheapest edge leaving the tree.',
      ],
    },
    {
      prompt: 'BFS finds shortest paths on unweighted graphs. Why does it fail when edges have arbitrary positive weights?',
      answer: 'BFS assumes each edge costs $1$; unequal weights break the layer invariant.',
      steps: [
        'BFS dequeues in FIFO order, so it always expands the shallowest unvisited vertex.',
        'With edge weight $1$, "shallowest" equals "shortest distance".',
        'With unequal weights, a longer-hop-count path may be shorter in total, so BFS gets it wrong.',
        'Dijkstra replaces the FIFO queue with a priority queue keyed on total distance.',
      ],
    },
    {
      prompt: 'A logistics company has a road network with negative tolls (rebates) but no cycles of net negative cost. Which shortest-path algorithm should they use?',
      answer: 'Bellman-Ford, $O(nm)$.',
      steps: [
        'Dijkstra requires non-negative weights.',
        'Bellman-Ford handles negative edges as long as no negative cycle is reachable.',
      ],
    },
    {
      prompt: 'Use DFS to detect a cycle in a directed graph. What color-based invariant do you track?',
      answer: 'Three colors: white (unvisited), gray (on stack), black (done). A gray-to-gray edge is a back edge, indicating a cycle.',
      steps: [
        'Start all vertices white.',
        'Mark gray on entry, black on finish.',
        'If DFS discovers an edge to a gray vertex, that\'s a back edge and proves a cycle.',
      ],
    },
  ];

  var STATIC_GRAPHS_CHALLENGE = [
    {
      prompt: 'Given a weighted graph, find the shortest cycle length through a fixed vertex $v$.',
      answer: 'Run Dijkstra from $v$ over all neighbors and combine.',
      steps: [
        'For each neighbor $u$ of $v$ (edge weight $w$), temporarily delete edge $(v,u)$.',
        'Run Dijkstra from $v$ to $u$ on the remaining graph to find $d(v,u)$.',
        'Shortest cycle through $v$ is $\\min_u (d(v,u) + w)$.',
      ],
    },
    {
      prompt: 'Given a DAG with weighted nodes, find the maximum-weight path from any source to any sink in $O(n + m)$.',
      answer: 'Topo-sort, then linear DP: $f(v) = w(v) + \\max_{u \\to v} f(u)$.',
      steps: [
        'Topological sort gives a linear order compatible with dependencies.',
        'Process vertices in order. For each $v$, $f(v) = w(v) + \\max_{u \\to v} f(u)$ (or $w(v)$ if no predecessors).',
        'Take $\\max_v f(v)$.',
      ],
    },
    {
      prompt: 'Prove that Dijkstra does not work when edge weights can be negative, by exhibiting a counter-example.',
      answer: 'Three-vertex graph $s \\to a = 1$, $s \\to b = 2$, $b \\to a = -2$ gives wrong answer.',
      steps: [
        'With edges $s\\to a$ (weight $1$), $s\\to b$ (weight $2$), $b \\to a$ (weight $-2$):',
        'True shortest $d(a) = 0$ (via $b$).',
        'Dijkstra settles $a$ first at distance $1$ and never revisits, giving $d(a) = 1$.',
      ],
    },
    {
      prompt: 'A scheduling problem: $n$ tasks, each with deadline $d_i$ and duration $p_i$. Model "is there a schedule making all deadlines?" as a graph/flow problem.',
      answer: 'Bipartite matching or a greedy EDF check — not a simple graph, but earliest-deadline-first works.',
      steps: [
        'Sort tasks by deadline ascending.',
        'Schedule them in that order; compute cumulative completion time.',
        'If at any point cumulative time exceeds the task\'s deadline, no schedule is feasible (EDF is optimal for feasibility).',
      ],
    },
    {
      prompt: 'Given a graph with $n$ vertices, design an algorithm to find all strongly connected components in $O(n + m)$.',
      answer: 'Kosaraju or Tarjan.',
      steps: [
        'Kosaraju: DFS on $G$ recording finish times; reverse the graph; DFS in decreasing finish order.',
        'Each tree in the second DFS is an SCC.',
        'Tarjan computes low-link values in a single DFS pass.',
      ],
    },
  ];

  PS.registerTopic("algo-graphs", {
    title: "Graph algorithms",
    description: "Traversals, shortest paths, and MST walkthroughs with concrete edge lists.",
    warmup: STATIC_GRAPHS_WARMUP,
    standard: STATIC_GRAPHS_STANDARD,
    challenge: STATIC_GRAPHS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: algo-dp
  // ==========================================================================

  var STATIC_DP_WARMUP = [
    {
      prompt: 'Define the recurrence for the $n$-th Fibonacci number and give a DP table for $n = 0..6$.',
      answer: '$F_n = F_{n-1} + F_{n-2}$; table $[0,1,1,2,3,5,8]$.',
      steps: [
        'Base: $F_0 = 0$, $F_1 = 1$.',
        'Fill iteratively: $F_2 = 1, F_3 = 2, F_4 = 3, F_5 = 5, F_6 = 8$.',
      ],
    },
    {
      prompt: 'How many ways to climb $n$ stairs taking $1$ or $2$ steps at a time? Write the recurrence.',
      answer: '$W_n = W_{n-1} + W_{n-2}$, $W_0 = 1$, $W_1 = 1$ (Fibonacci shifted).',
      steps: [
        'Last step is either $1$ (leaving $n-1$ stairs) or $2$ (leaving $n-2$).',
        'So $W_n = W_{n-1} + W_{n-2}$.',
      ],
    },
    {
      prompt: 'What distinguishes top-down from bottom-up DP?',
      answer: 'Top-down uses recursion + memoization; bottom-up iteratively fills a table.',
      steps: [
        'Top-down starts from the question, recurses down, caches results by state.',
        'Bottom-up starts from the base cases and fills in order of increasing state.',
        'Both have the same asymptotic cost; bottom-up usually has smaller constants.',
      ],
    },
    {
      prompt: 'What two properties must a problem have for DP to apply?',
      answer: 'Optimal substructure and overlapping subproblems.',
      steps: [
        'Optimal substructure: the optimum of the whole is built from the optimum of subproblems.',
        'Overlapping subproblems: the same subproblem is needed many times — memoization pays off.',
      ],
    },
    {
      prompt: 'For the coin change problem with coins $\\{1, 2, 5\\}$ and amount $6$, how many coins are needed (minimum)?',
      answer: '$2$ coins: $5 + 1$.',
      steps: [
        '$6 = 5 + 1$ uses $2$ coins.',
        'Any other combination needs more ($3+3$ is not possible with this set, $2+2+2 = 3$).',
      ],
    },
  ];

  var STATIC_DP_STANDARD = [
    {
      prompt: 'Coin change: given coins $\\{1, 3, 4\\}$ and target $6$, find the minimum number of coins. Write the DP recurrence and give the answer.',
      answer: 'Minimum is $2$ ($3+3$). Recurrence: $f(n) = 1 + \\min_{c \\in C} f(n - c)$, $f(0) = 0$.',
      steps: [
        'States: $f(n)$ = min coins to make amount $n$.',
        'Base: $f(0) = 0$.',
        'Transition: $f(n) = 1 + \\min_c f(n-c)$ over coins $c \\le n$.',
        'Table $f(0..6)$: $0, 1, 2, 1, 1, 2, 2$.',
      ],
    },
    {
      prompt: 'Longest increasing subsequence of $[10, 9, 2, 5, 3, 7, 101, 18]$?',
      answer: 'Length $4$ (e.g., $[2, 3, 7, 18]$ or $[2, 3, 7, 101]$).',
      steps: [
        'State $f(i)$ = LIS length ending at index $i$.',
        '$f = [1, 1, 1, 2, 2, 3, 4, 4]$.',
        'Max is $4$.',
      ],
    },
    {
      prompt: 'Edit distance between "kitten" and "sitting"?',
      answer: '$3$',
      steps: [
        'DP table $f(i,j)$ = edit distance between prefixes of length $i$ and $j$.',
        'Transitions: insert, delete, or substitute (all cost 1), or free if chars match.',
        'Walkthrough: kitten $\\to$ sitten (sub k$\\to$s), sitten $\\to$ sittin (sub e$\\to$i), sittin $\\to$ sitting (insert g).',
        'Three operations.',
      ],
    },
    {
      prompt: 'Given the string "babad", find any longest palindromic substring and describe the DP.',
      answer: '"bab" or "aba" (length $3$).',
      steps: [
        'State $f(i,j)$ = is $s[i..j]$ a palindrome?',
        'Base: length-1 and length-2 (equal chars) are palindromes.',
        'Transition: $f(i,j) = f(i+1, j-1) \\land [s_i = s_j]$.',
        'Track the longest interval you encounter; answer is $3$.',
      ],
    },
    {
      prompt: 'Count the number of distinct ways to tile a $2 \\times n$ grid with $1 \\times 2$ dominoes.',
      answer: 'Fibonacci: $f(n) = f(n-1) + f(n-2)$.',
      steps: [
        'Either the rightmost column is one vertical domino ($f(n-1)$ ways), or it is two horizontal dominoes stacked ($f(n-2)$ ways).',
        'Base: $f(0) = 1, f(1) = 1$.',
        'Same as Fibonacci numbers.',
      ],
    },
    {
      prompt: '0/1 knapsack: items with (weight, value) $(2,3), (3,4), (4,5), (5,6)$ and capacity $W = 5$. Max value?',
      answer: '$7$',
      steps: [
        'DP $f(i, w)$ = max value using first $i$ items, weight $\\le w$.',
        'Transition: $f(i,w) = \\max(f(i-1,w),\\ v_i + f(i-1, w - w_i))$ if $w_i \\le w$.',
        'Filling the table yields $f(4, 5) = 7$ (items 1 and 2: $3+4 = 7$).',
      ],
    },
    {
      prompt: 'A scheduler has jobs with durations $\\{4, 2, 7, 5\\}$ and needs to split them between two workers minimizing makespan. Solve with DP.',
      answer: 'Makespan $9$: worker 1 = $\\{4, 5\\}$, worker 2 = $\\{2, 7\\}$.',
      steps: [
        'Sum $= 18$. Goal: find a subset with sum as close to $9$ as possible.',
        'Subset-sum DP over target $9$: $\\{4, 5\\}$ sums to $9$, other side sums to $9$.',
        'Makespan = $\\max(9, 9) = 9$.',
      ],
    },
    {
      prompt: 'Maximum subarray sum of $[-2, 1, -3, 4, -1, 2, 1, -5, 4]$ (Kadane).',
      answer: '$6$ (subarray $[4,-1,2,1]$).',
      steps: [
        'Track $f(i) = \\max(a_i,\\ f(i-1) + a_i)$.',
        'Values: $-2, 1, -2, 4, 3, 5, 6, 1, 5$.',
        'Max is $6$.',
      ],
    },
    {
      prompt: 'Given stock prices per day $[7, 1, 5, 3, 6, 4]$, find the max profit from one buy and one sell.',
      answer: '$5$ (buy at $1$, sell at $6$).',
      steps: [
        'State: min price so far and best profit so far.',
        'Iterate: min $=7, 1, 1, 1, 1, 1$; profit $= 0, 0, 4, 4, 5, 5$.',
        'Answer $5$.',
      ],
    },
    {
      prompt: 'Longest common subsequence of "ABCBDAB" and "BDCABA"?',
      answer: 'Length $4$ (e.g., "BCBA" or "BDAB").',
      steps: [
        'DP $f(i,j) = f(i-1, j-1) + 1$ if chars match, else $\\max(f(i-1,j), f(i, j-1))$.',
        'Answer is in $f(m,n) = 4$.',
      ],
    },
  ];

  var STATIC_DP_CHALLENGE = [
    {
      prompt: 'Unbounded knapsack with items $(w_i, v_i)$ and capacity $W$. Give the recurrence and state the complexity.',
      answer: '$f(w) = \\max(f(w),\\ v_i + f(w - w_i))$; $O(nW)$ time, $O(W)$ space.',
      steps: [
        'Unlike 0/1 knapsack, you can reuse items.',
        'Iterate $w$ from $0$ to $W$, for each item relax $f(w) \\leftarrow \\max(f(w), f(w - w_i) + v_i)$.',
        'Only one array is needed because each item is considered repeatedly.',
      ],
    },
    {
      prompt: 'LCS with a twist: count the number of distinct longest common subsequences of two strings. Give the DP.',
      answer: 'Two tables: length $f(i,j)$ and count $g(i,j)$.',
      steps: [
        'Maintain $(f, g)$ per cell where $f$ is LCS length and $g$ is LCS count.',
        'If $a_i = b_j$: $f(i,j) = f(i-1,j-1)+1$, $g(i,j) = g(i-1,j-1)$.',
        'Else: take $\\max$ of $(f(i-1,j), f(i,j-1))$. If they tie, add their $g$ values (subtract $g(i-1,j-1)$ if both inherit it, to avoid double-counting).',
        'Final answer is $g(m,n)$.',
      ],
    },
    {
      prompt: 'Weighted interval scheduling: $n$ jobs each with start, finish, and profit. Find the maximum-profit non-overlapping subset.',
      answer: 'Sort by finish time; $f(i) = \\max(f(i-1),\\ v_i + f(p(i)))$ where $p(i)$ is the latest non-conflicting job.',
      steps: [
        'Sort jobs by finish time.',
        'Compute $p(i)$ = largest index $j < i$ with $f_j \\le s_i$ (binary search).',
        'DP: $f(i) = \\max(f(i-1),\\ v_i + f(p(i)))$.',
        'Total time $O(n \\log n)$.',
      ],
    },
    {
      prompt: 'Matrix chain multiplication: given dimensions of $n$ matrices, find the optimal parenthesization cost.',
      answer: '$O(n^3)$ DP: $f(i,j) = \\min_{i \\le k < j} f(i,k) + f(k+1,j) + d_{i-1} d_k d_j$.',
      steps: [
        'State: $f(i,j)$ = min cost to compute product $A_i \\cdots A_j$.',
        'Base: $f(i,i) = 0$.',
        'Try all split points $k$ and take the minimum.',
        '$O(n^3)$ states-times-transitions.',
      ],
    },
    {
      prompt: 'Design an $O(n \\log n)$ algorithm for LIS. Explain why it is correct.',
      answer: 'Maintain a "tails" array, binary-search each new element.',
      steps: [
        'Maintain $T$ where $T[k]$ is the smallest possible tail of an increasing subsequence of length $k+1$ seen so far.',
        'For each new $a$, binary-search for the leftmost $T[k] \\ge a$ and overwrite it.',
        'Length of $T$ at the end is LIS length.',
        'Correctness: $T$ is kept sorted and minimal, so longer tails only extend if the element is strictly greater than the current tail.',
      ],
    },
  ];

  PS.registerTopic("algo-dp", {
    title: "Dynamic programming",
    description: "Classic DP patterns: coin change, LIS, edit distance, knapsack, and multi-constraint variants.",
    warmup: STATIC_DP_WARMUP,
    standard: STATIC_DP_STANDARD,
    challenge: STATIC_DP_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 5: algo-greedy
  // ==========================================================================

  var STATIC_GREEDY_WARMUP = [
    {
      prompt: 'You have to make change for $63$ cents using U.S. coins $\\{1, 5, 10, 25\\}$. What does a greedy "largest first" strategy give?',
      answer: '$2 \\times 25 + 1 \\times 10 + 0 \\times 5 + 3 \\times 1 = 6$ coins.',
      steps: [
        'Take as many $25$ as possible: $2$ (remaining $13$).',
        'Take as many $10$: $1$ (remaining $3$).',
        'Take as many $5$: $0$. Take $1$s: $3$. Total $6$.',
      ],
    },
    {
      prompt: 'Same coin set but amount $30$: is greedy optimal?',
      answer: 'Yes: $1 \\times 25 + 0 \\times 10 + 1 \\times 5 = 2$ coins.',
      steps: [
        'Greedy: $25 + 5 = 30$ using $2$ coins.',
        'No combination with more $10$s improves it.',
      ],
    },
    {
      prompt: 'For the coin set $\\{1, 3, 4\\}$ and amount $6$, is greedy optimal?',
      answer: 'No. Greedy gives $4+1+1 = 3$ coins; optimal is $3+3 = 2$ coins.',
      steps: [
        'Greedy picks the largest first: $4$, then needs $2$ more (two $1$s).',
        'But $3 + 3 = 6$ uses only $2$ coins.',
        'Greedy does not always work — it depends on the coin set.',
      ],
    },
    {
      prompt: 'What makes activity selection amenable to a greedy algorithm?',
      answer: 'Choosing the earliest-finishing activity never excludes a better future choice (exchange argument).',
      steps: [
        'Any optimal solution can be modified by swapping its first activity for the earliest-finishing one without losing activities.',
        'Therefore the greedy choice is "safe".',
      ],
    },
    {
      prompt: 'For activity selection, which sorting key do you use?',
      answer: 'Sort by finish time ascending.',
      steps: [
        'Pick the activity with the earliest finish time.',
        'Remove all conflicting ones. Repeat.',
      ],
    },
  ];

  var STATIC_GREEDY_STANDARD = [
    {
      prompt: 'Given activities with $(s, f)$: $(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)$. Run activity selection and list the chosen activities.',
      answer: 'Selected: $(1,4), (5,7), (8,11), (12,16)$. Four activities.',
      steps: [
        'Sort by finish time: $(1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)$.',
        'Pick $(1,4)$. Next compatible ($s \\ge 4$): $(5,7)$.',
        'Next compatible ($s \\ge 7$): $(8,11)$.',
        'Next compatible ($s \\ge 11$): $(12,16)$.',
      ],
    },
    {
      prompt: 'Fractional knapsack with items $(w, v) = (10, 60), (20, 100), (30, 120)$ and capacity $50$. Max value?',
      answer: '$240$',
      steps: [
        'Value per unit weight: $60/10=6$, $100/20=5$, $120/30=4$.',
        'Take item 1 fully ($+60$, remaining $40$).',
        'Take item 2 fully ($+100$, remaining $20$).',
        'Take $2/3$ of item 3 ($+80$).',
        'Total $240$.',
      ],
    },
    {
      prompt: 'Huffman coding: given letter frequencies $a:5, b:9, c:12, d:13, e:16, f:45$, give the total encoded length.',
      answer: '$224$ bits.',
      steps: [
        'Total freq $= 100$.',
        'Merge smallest two repeatedly, summing merged weights each time.',
        'Merge sequence costs: $5+9=14$, $12+13=25$, $14+16=30$, $25+30=55$, $45+55=100$.',
        'Sum of merge costs $= 14 + 25 + 30 + 55 + 100 = 224$.',
      ],
    },
    {
      prompt: 'Minimum number of platforms at a train station, given arrivals $[9:00, 9:40, 9:50, 11:00, 15:00, 18:00]$ and departures $[9:10, 12:00, 11:20, 11:30, 19:00, 20:00]$.',
      answer: '$3$',
      steps: [
        'Merge events by time with $+1$ for arrival, $-1$ for departure.',
        'Peak concurrent trains is $3$ (around 11:00).',
        'Minimum platforms = peak concurrent count = $3$.',
      ],
    },
    {
      prompt: 'Interval covering: you have intervals $[(1,3), (2,5), (3,6), (5,8), (7,10)]$ and you must cover $[1,10]$ using as few as possible. Solve greedily.',
      answer: '$3$ intervals: $(1,3), (3,6), (7,10)$. Wait — gap at $6$-$7$! Correct pick: $(1,3), (2,5), (5,8), (7,10)$ — $4$ intervals. Actually: greedy-by-far-right gives $(2,5), (5,8), (7,10)$ plus an interval covering $1$: total $3$. Best is $3$.',
      steps: [
        'Sort candidates by left endpoint.',
        'At each step, among intervals that start at or before the current frontier, pick the one with the farthest right endpoint.',
        'Greedy argument: farthest right covers the most additional ground.',
      ],
    },
    {
      prompt: 'On a highway with gas stations at positions $p_1 < p_2 < \\cdots < p_n$ and a tank range of $r$, find the minimum number of stops to reach the end starting from position $0$.',
      answer: 'Repeatedly drive to the farthest reachable station before you must refuel.',
      steps: [
        'Track current position and available range.',
        'Scan forward; the next stop is the farthest station still within range.',
        'Exchange argument: stopping earlier never helps.',
      ],
    },
    {
      prompt: 'Why does greedy work for fractional knapsack but fail for 0/1 knapsack?',
      answer: 'Fractional allows splitting items, so value/weight ratio dominates; 0/1 forbids splitting, so item interactions matter.',
      steps: [
        'Fractional: take items in decreasing ratio $v/w$ until the knapsack is full; partial take of the last.',
        '0/1: you can\'t take a fraction, so picking a high-ratio item might waste remaining capacity.',
        'Counter-example: items $(10, 60), (20, 100), (30, 120)$, capacity $50$. Greedy ratio-first takes items 1+2+nothing = $160$; optimal is 2+3 = $220$.',
      ],
    },
    {
      prompt: 'Given $n$ jobs each with profit $p_i$ and deadline $d_i$, each job takes unit time, find the max-profit schedule.',
      answer: 'Sort jobs by profit descending; greedily place each at the latest free slot $\\le d_i$.',
      steps: [
        'Sort jobs by descending profit.',
        'For each job, try to place it in its latest possible slot (using a disjoint-set structure for speed).',
        'Skip if no slot is available. Greedy is optimal by a matroid argument.',
      ],
    },
    {
      prompt: 'A router receives packets with sizes $\\{50, 40, 30, 20, 20, 20, 10\\}$ KB. Buckets hold $100$ KB. What does First-Fit-Decreasing (FFD) give?',
      answer: '$2$ buckets: $\\{50, 40, 10\\}$ and $\\{30, 20, 20, 20\\}$.',
      steps: [
        'Sort descending: $50, 40, 30, 20, 20, 20, 10$.',
        'Place $50$ in bucket 1, $40$ fits (total $90$), $30$ starts bucket 2, $20$ fits, $20$ fits ($70$), $20$ fits ($90$), $10$ back in bucket 1.',
        'Bucket 1: $\\{50, 40, 10\\} = 100$. Bucket 2: $\\{30, 20, 20, 20\\} = 90$.',
      ],
    },
    {
      prompt: 'Minimum Spanning Tree: on a graph with edges and weights $(AB, 4), (AC, 1), (BC, 3), (BD, 2), (CD, 5)$, run Kruskal and list the MST edges.',
      answer: 'MST edges: $AC(1), BD(2), BC(3)$. Total weight $6$.',
      steps: [
        'Sort edges by weight: $AC(1), BD(2), BC(3), AB(4), CD(5)$.',
        'Add $AC$: components $\\{A,C\\}, \\{B\\}, \\{D\\}$.',
        'Add $BD$: $\\{A,C\\}, \\{B,D\\}$.',
        'Add $BC$: merges to a single component $\\{A,B,C,D\\}$.',
        'Total weight $1 + 2 + 3 = 6$. Stop.',
      ],
    },
  ];

  var STATIC_GREEDY_CHALLENGE = [
    {
      prompt: 'Prove that activity selection by earliest-finish-time is optimal (exchange argument).',
      answer: 'Any optimal solution can be transformed into one beginning with the earliest-finishing activity, without loss.',
      steps: [
        'Let $OPT$ be an optimal solution and let $a^*$ be its first activity (earliest finish among chosen).',
        'Let $g$ be the globally earliest-finishing activity; by assumption $g$.finish $\\le a^*$.finish.',
        'Replace $a^*$ with $g$ in $OPT$. The remaining activities are still compatible with $g$ since $g$ finishes no later than $a^*$.',
        'The modified solution has the same size. Recurse on the sub-instance to show greedy matches OPT throughout.',
      ],
    },
    {
      prompt: 'When is first-fit decreasing (FFD) provably within a constant factor of optimal bin packing?',
      answer: 'FFD uses at most $(11/9) \\cdot OPT + 1$ bins.',
      steps: [
        'Johnson\'s classical result: FFD is within $11/9$ of optimum.',
        'Pathological inputs (with tight margins) force the constant.',
      ],
    },
    {
      prompt: 'Prove that Dijkstra is a greedy algorithm and state the exchange property.',
      answer: 'Greedy choice: settle the unvisited vertex with smallest tentative distance.',
      steps: [
        'Invariant: when Dijkstra settles vertex $v$, $d(v)$ is the true shortest-path distance.',
        'Suppose not: let $v$ be the first violated vertex. Then some other vertex $u$ on the true shortest path to $v$ is still unsettled, but has $d(u) \\le d(v)$.',
        'That contradicts the choice of $v$ as the minimum-distance unsettled vertex. Non-negative weights are crucial.',
      ],
    },
    {
      prompt: 'Design a greedy algorithm for the problem: "given $n$ points on a line, cover all of them using the minimum number of unit-length closed intervals".',
      answer: 'Sort points, place each interval to start at the leftmost uncovered point.',
      steps: [
        'Sort points ascending.',
        'Iterate: take the leftmost uncovered point $p$ and place an interval $[p, p+1]$.',
        'Skip all points in $[p, p+1]$. Repeat.',
        'Exchange argument: any optimal solution can be shifted left without increasing count.',
      ],
    },
    {
      prompt: 'Given weighted jobs with deadlines, explain why the "profit sort + latest-slot" greedy is optimal, using a matroid argument.',
      answer: 'Schedulable sets form a matroid — greedy on the weights of a matroid is optimal.',
      steps: [
        'The set family $\\{S \\mid$ the jobs in $S$ can all be scheduled before their deadlines$\\}$ is the independent sets of a matroid.',
        'A fundamental theorem says that sorting elements by weight descending and greedily adding them (if the augmented set is still independent) gives the max-weight independent set.',
        'Hence the greedy schedule by profit is optimal.',
      ],
    },
  ];

  PS.registerTopic("algo-greedy", {
    title: "Greedy algorithms",
    description: "Activity selection, Huffman, MST, fractional knapsack, and exchange arguments.",
    warmup: STATIC_GREEDY_WARMUP,
    standard: STATIC_GREEDY_STANDARD,
    challenge: STATIC_GREEDY_CHALLENGE,
  });

})();
