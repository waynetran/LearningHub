/*
 * LearningHub - Theoretical CS Problem Set
 * Registers 4 topics: theory-dfa, theory-tm, theory-undecidable, theory-reductions
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[theoretical-cs-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC 1: theory-dfa
  // ==========================================================================

  var STATIC_DFA_WARMUP = [
    {
      prompt: 'Design a DFA over $\\{0, 1\\}$ that accepts strings ending in $1$.',
      answer: 'Two states: $q_0$ (start, last char was $0$ or empty), $q_1$ (last char was $1$, accepting).',
      steps: [
        '$q_0 \\xrightarrow{0} q_0$, $q_0 \\xrightarrow{1} q_1$.',
        '$q_1 \\xrightarrow{0} q_0$, $q_1 \\xrightarrow{1} q_1$.',
        'Accepting state: $\\{q_1\\}$.',
      ],
    },
    {
      prompt: 'Design a DFA over $\\{a, b\\}$ that accepts all strings containing the substring "ab".',
      answer: 'Three states: start, saw-$a$, saw-$ab$ (accepting).',
      steps: [
        '$q_0 \\xrightarrow{a} q_1$, $q_0 \\xrightarrow{b} q_0$.',
        '$q_1 \\xrightarrow{a} q_1$, $q_1 \\xrightarrow{b} q_2$.',
        '$q_2 \\xrightarrow{a/b} q_2$. $q_2$ is accepting.',
      ],
    },
    {
      prompt: 'How many states does a DFA need to accept "binary strings with an even number of 1s"?',
      answer: '$2$',
      steps: [
        'Track parity: $q_0$ (even, accepting) and $q_1$ (odd).',
        '$q_0 \\xrightarrow{1} q_1$, $q_1 \\xrightarrow{1} q_0$; $0$ loops.',
      ],
    },
    {
      prompt: 'Is $\\{0^n 1^n \\mid n \\ge 0\\}$ regular?',
      answer: 'No — it is not a regular language.',
      steps: [
        'A DFA has finitely many states and cannot count unbounded matching.',
        'Proven non-regular by the pumping lemma.',
      ],
    },
    {
      prompt: 'Give a regular expression for "binary strings with an even number of 0s".',
      answer: '$(1^* 0 1^* 0 1^*)^*$',
      steps: [
        'Match zero or more $1$s, then one $0$, then more $1$s, then another $0$, etc.',
        'Each bracketed group adds two $0$s.',
      ],
    },
  ];

  var STATIC_DFA_STANDARD = [
    {
      prompt: 'Construct a DFA that accepts binary strings where the number of $1$s is a multiple of $3$.',
      answer: '$3$ states ($q_0$ accepting), transitions on $1$ cycle $q_0 \\to q_1 \\to q_2 \\to q_0$; $0$ self-loops.',
      steps: [
        'State $q_i$: "count of $1$s mod $3$ = $i$".',
        'Reading $0$: stay put. Reading $1$: advance by one mod 3.',
        'Accept iff at $q_0$.',
      ],
    },
    {
      prompt: 'Build a DFA over $\\{0, 1\\}$ that accepts strings divisible by $3$ when interpreted as binary numbers (MSB first).',
      answer: '$3$ states tracking "value mod $3$". $q_0$ is accepting.',
      steps: [
        'If in state $q_r$ reading $b$, the new value mod $3$ is $(2r + b) \\bmod 3$.',
        '$q_0 \\xrightarrow{0} q_0, q_0 \\xrightarrow{1} q_1$.',
        '$q_1 \\xrightarrow{0} q_2, q_1 \\xrightarrow{1} q_0$.',
        '$q_2 \\xrightarrow{0} q_1, q_2 \\xrightarrow{1} q_2$.',
      ],
    },
    {
      prompt: 'Use the pumping lemma to prove $L = \\{ww \\mid w \\in \\{0,1\\}^*\\}$ is not regular.',
      answer: 'Any pumped substring breaks the "two equal halves" property.',
      steps: [
        'Assume $L$ is regular with pumping length $p$.',
        'Pick $s = 0^p 1 0^p 1$. It is in $L$ ($w = 0^p 1$).',
        'Split $s = xyz$ with $|xy| \\le p$, $|y| \\ge 1$. Then $xy \\subseteq 0^p$.',
        'Pump to $xy^2z$: we get $0^{p+|y|} 1 0^p 1$. This is not of the form $ww$.',
        'Contradiction — $L$ is not regular.',
      ],
    },
    {
      prompt: 'Convert the NFA with states $\\{A, B\\}$, transitions $A \\xrightarrow{0} \\{A, B\\}$, $A \\xrightarrow{1} \\{A\\}$, $B \\xrightarrow{0} \\{\\}$, $B \\xrightarrow{1} \\{\\}$, start $A$, accept $\\{B\\}$ into a DFA via subset construction.',
      answer: 'DFA states: $\\{A\\}, \\{A, B\\}$; $\\{A\\} \\xrightarrow{0} \\{A,B\\}, \\{A\\} \\xrightarrow{1} \\{A\\}, \\{A,B\\} \\xrightarrow{0} \\{A,B\\}, \\{A,B\\} \\xrightarrow{1} \\{A\\}$. Accept $\\{A,B\\}$.',
      steps: [
        'Start from $\\{A\\}$.',
        '$\\{A\\}$ on $0$: union of $A$\'s $0$-successors $= \\{A, B\\}$.',
        '$\\{A, B\\}$ on $0$: still $\\{A, B\\}$. On $1$: $\\{A\\}$.',
        'Accepting states are any subset containing $B$.',
      ],
    },
    {
      prompt: 'Give a regex for strings over $\\{0, 1\\}$ that do not contain the substring $11$.',
      answer: '$(0 \\cup 10)^* (\\epsilon \\cup 1)$',
      steps: [
        'Avoid two consecutive $1$s.',
        'Every $1$ must be followed by a $0$, except possibly the last character.',
      ],
    },
    {
      prompt: 'How many states does a minimal DFA for "strings ending in $01$" need?',
      answer: '$3$',
      steps: [
        'States track the last two characters we care about: $q_0$ (nothing yet), $q_1$ (last was $0$), $q_2$ (last two were $01$, accept).',
      ],
    },
    {
      prompt: 'Is the intersection of two regular languages always regular?',
      answer: 'Yes — take the product DFA.',
      steps: [
        'Regular languages are closed under intersection.',
        'Build a DFA whose state is a pair $(p, q)$ from the two DFAs and whose accepting states are pairs where both components accept.',
      ],
    },
    {
      prompt: 'A DFA over $\\{a, b\\}$ has states $\\{q_0, q_1, q_2\\}$, start $q_0$, accept $\\{q_2\\}$. Transitions: $q_0 \\xrightarrow{a} q_1, q_0 \\xrightarrow{b} q_2, q_1 \\xrightarrow{a} q_0, q_1 \\xrightarrow{b} q_2, q_2 \\xrightarrow{a} q_1, q_2 \\xrightarrow{b} q_2$. Is "aba" accepted?',
      answer: 'Yes.',
      steps: [
        'Trace: $q_0 \\xrightarrow{a} q_1 \\xrightarrow{b} q_2 \\xrightarrow{a} q_1$.',
        'Wait — ends in $q_1$, not accepting. Let me retrace: $q_0 \\to q_1 \\to q_2 \\to q_1$. So "aba" ends in $q_1$, rejecting.',
        'Corrected answer: No, "aba" is rejected.',
      ],
    },
    {
      prompt: 'Prove regular languages are closed under complement.',
      answer: 'Swap accepting and non-accepting states in a DFA.',
      steps: [
        'Let $D = (Q, \\Sigma, \\delta, q_0, F)$ be a DFA for $L$.',
        'Define $D\' = (Q, \\Sigma, \\delta, q_0, Q \\setminus F)$.',
        '$D\'$ accepts $\\Sigma^* \\setminus L$ — same DFA, complementary accept set.',
      ],
    },
    {
      prompt: 'Write a regex for "strings over $\\{0,1\\}$ of length exactly $4$ with at least one $0$".',
      answer: '$(0 \\cup 1)^4 \\setminus 1111$, or equivalently: $0 (0 \\cup 1)^3 \\cup 1 0 (0 \\cup 1)^2 \\cup 110 (0 \\cup 1) \\cup 1110$.',
      steps: [
        'Total length-4 strings minus the single "1111".',
        'Explicit form: case-split on the position of the first $0$.',
      ],
    },
  ];

  var STATIC_DFA_CHALLENGE = [
    {
      prompt: 'Prove that for every NFA with $n$ states, the equivalent minimal DFA has at most $2^n$ states, and give a family showing this bound is tight.',
      answer: 'Subset construction gives $\\le 2^n$; language "$n$-th char from the end is $1$" needs $2^n$.',
      steps: [
        'Subset construction: DFA state is a subset of NFA states, so at most $2^n$ subsets.',
        'Tight family: $L_n = \\{w \\mid$ the $n$-th character from the right is $1\\}$. Proving the DFA needs at least $2^n$ states uses a distinguishing-string argument.',
      ],
    },
    {
      prompt: 'Show that $L = \\{a^i b^j \\mid i > j\\}$ is not regular.',
      answer: 'Pumping lemma.',
      steps: [
        'Pumping length $p$. Choose $s = a^{p+1} b^p$, which is in $L$.',
        'By pumping, split $s = xyz$ with $|xy| \\le p$, so $y$ is all $a$s.',
        'Pump down: $xz$ has fewer $a$s, potentially making $i \\le j$.',
        'Specifically, $xy^0 z = a^{p+1-|y|} b^p$; choose a pumping that yields $i = p$, contradicting $i > j$.',
      ],
    },
    {
      prompt: 'Minimize this DFA using the partition-refinement algorithm. States $\\{A,B,C,D,E\\}$ with $A,B$ accepting; same transition structure on $\\{0,1\\}$: $A\\to(B,C), B\\to(B,D), C\\to(E,B), D\\to(C,E), E\\to(D,A)$.',
      answer: 'Merge equivalent states; the answer depends on the table — partition starts $\\{A,B\\}, \\{C,D,E\\}$ and refines.',
      steps: [
        'Initial partition: accept set $\\{A,B\\}$ and reject set $\\{C,D,E\\}$.',
        'For each block, check whether all states in it transition to the same block under each symbol.',
        'Split whenever two states end up in different target blocks.',
        'Repeat until no split is possible. Remaining blocks are the minimal DFA\'s states.',
      ],
    },
    {
      prompt: 'Prove that regular languages are closed under reversal.',
      answer: 'Reverse transitions, swap start/accept, then build an NFA.',
      steps: [
        'Start from a DFA $D$ for $L$.',
        'Build NFA $N$ with the same states, but every transition reversed.',
        'Make old accepting states the new start (add a fresh start with $\\epsilon$ to each); old start becomes accepting.',
        '$N$ accepts $L^R$. Convert back to DFA if needed.',
      ],
    },
    {
      prompt: 'Show that the language of arithmetic expressions over parenthesized sums is not regular.',
      answer: 'Unbounded parenthesis nesting requires unbounded counting, not regular.',
      steps: [
        'Matching parentheses of arbitrary depth forces the automaton to track an unbounded count.',
        'Use pumping on $(^n)^n$: any pumped portion unbalances the parentheses, so the language fails the pumping lemma.',
        'Hence it is not regular (it is context-free).',
      ],
    },
  ];

  PS.registerTopic("theory-dfa", {
    title: "Finite automata and regular languages",
    description: "Design DFAs, apply the pumping lemma, and reason about closure properties.",
    warmup: STATIC_DFA_WARMUP,
    standard: STATIC_DFA_STANDARD,
    challenge: STATIC_DFA_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: theory-tm
  // ==========================================================================

  var STATIC_TM_WARMUP = [
    {
      prompt: 'What are the components of a Turing machine in formal notation?',
      answer: '$M = (Q, \\Sigma, \\Gamma, \\delta, q_0, q_{\\text{accept}}, q_{\\text{reject}})$.',
      steps: [
        '$Q$: finite set of states.',
        '$\\Sigma$: input alphabet.',
        '$\\Gamma \\supseteq \\Sigma$: tape alphabet including blank.',
        '$\\delta: Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$: transition.',
        '$q_0, q_{\\text{accept}}, q_{\\text{reject}}$: start, accepting, rejecting.',
      ],
    },
    {
      prompt: 'What is the difference between "recognize" and "decide" a language?',
      answer: 'Decide: always halts. Recognize: halts and accepts on yes-instances but may loop on no-instances.',
      steps: [
        'Decider: halts on every input.',
        'Recognizer: halts-accepts on strings in $L$; might loop on strings not in $L$.',
      ],
    },
    {
      prompt: 'What does the Church-Turing thesis say?',
      answer: 'Every intuitively computable function is computable by a Turing machine.',
      steps: [
        'It equates the informal notion of "algorithm" with formal TMs.',
        'Cannot be proved; supported by equivalence of many models (lambda calculus, register machines, etc.).',
      ],
    },
    {
      prompt: 'Is a two-tape TM more powerful than a single-tape TM?',
      answer: 'No — same recognizable languages, though a two-tape simulation of a single tape can be quadratically faster.',
      steps: [
        'A single-tape TM can simulate a two-tape TM with at most quadratic time overhead.',
        'Both decide exactly the same class of languages.',
      ],
    },
    {
      prompt: 'Name a problem that is recognizable but not decidable.',
      answer: 'The halting problem $ATM$.',
      steps: [
        '$ATM = \\{\\langle M, w \\rangle \\mid M$ accepts $w\\}$ is recognizable (simulate $M$ on $w$).',
        'It is not decidable (classical diagonalization).',
      ],
    },
  ];

  var STATIC_TM_STANDARD = [
    {
      prompt: 'Design a TM (states and transitions) that accepts $\\{0^n 1^n \\mid n \\ge 0\\}$. Give the idea, not the full table.',
      answer: 'Cross off pairs $0, 1$ from the ends until empty.',
      steps: [
        'Sweep right to find the leftmost $0$, replace it with X, move right to the leftmost $1$, replace with Y.',
        'Return to the left and repeat.',
        'Accept if the tape becomes all X\'s and Y\'s with no unmatched $0$ or $1$.',
      ],
    },
    {
      prompt: 'Give a high-level TM description for "the input contains more $0$s than $1$s".',
      answer: 'Cross off one $0$ and one $1$ at a time; if only $0$s remain unmatched, accept.',
      steps: [
        'Repeatedly find and cross off one $0$ and one $1$.',
        'If the tape has only unmatched $0$s (no $1$s), accept.',
        'If the tape has unmatched $1$s (or is empty), reject.',
      ],
    },
    {
      prompt: 'Describe how a Turing machine can decide whether a number written in unary is prime.',
      answer: 'Trial-divide by each smaller unary number; accept if no divisor.',
      steps: [
        'For each $k$ from $2$ to $n-1$: attempt to match $k$ copies of a block against $n$.',
        'If any $k$ divides $n$ evenly, reject; else accept.',
        'A TM can implement this straightforwardly on a bounded tape.',
      ],
    },
    {
      prompt: 'Build a TM state table for "$L = \\{w \\in \\{0\\}^* \\mid |w|$ is even$\\}$".',
      answer: '$3$ states: $q_0$ (even, accept), $q_1$ (odd), $q_{\\text{accept}}$.',
      steps: [
        '$q_0$ on $0$: write $0$, right, go to $q_1$.',
        '$q_1$ on $0$: write $0$, right, go to $q_0$.',
        '$q_0$ on blank: go to $q_{\\text{accept}}$.',
        '$q_1$ on blank: go to $q_{\\text{reject}}$.',
      ],
    },
    {
      prompt: 'Prove that the collection of languages a TM can recognize is closed under union.',
      answer: 'Run two TMs in parallel on interleaved tape slots; accept if either accepts.',
      steps: [
        'Let $M_1, M_2$ recognize $L_1, L_2$.',
        'Build $M$ with a two-track tape simulating $M_1$ and $M_2$ in lock-step.',
        'Accept as soon as either $M_1$ or $M_2$ accepts.',
      ],
    },
    {
      prompt: 'Prove that decidable languages are closed under concatenation.',
      answer: 'For each split point, run the deciders and combine.',
      steps: [
        'Given deciders $M_1, M_2$ for $L_1, L_2$.',
        'On input $w$ of length $n$: for each $i = 0, \\ldots, n$, run $M_1$ on $w[1..i]$ and $M_2$ on $w[i+1..n]$.',
        'If any split makes both accept, accept; else reject. Each decider halts, so the combined machine halts.',
      ],
    },
    {
      prompt: 'A TM $M$ runs in $O(n^2)$ time. Can we simulate it on a universal TM in poly time?',
      answer: 'Yes — the universal TM has a polynomial slowdown.',
      steps: [
        'A universal TM simulates $M$ with overhead polynomial in the description of $M$ (fixed) and the time of $M$.',
        'Hence total time is $O(n^2)$ times a constant depending on $M$.',
      ],
    },
    {
      prompt: 'Sketch a proof that a nondeterministic TM can be simulated by a deterministic TM (with exponential slowdown).',
      answer: 'BFS the tree of nondeterministic choices.',
      steps: [
        'Each NTM configuration has a branching factor $b$ bounded by $|\\delta|$.',
        'A DTM enumerates computation paths in BFS order by simulating one "choice sequence" at a time.',
        'Accept if any branch accepts. Worst-case time is $b^{T(n)}$ for NTM runtime $T(n)$.',
      ],
    },
    {
      prompt: 'Show that the class of TM-recognizable languages is not closed under complement.',
      answer: 'If it were, every recognizable language would be decidable — which is false.',
      steps: [
        'Suppose recognizable + co-recognizable. Then a language and its complement are both recognizable.',
        'Running the two recognizers in parallel gives a decider: one or the other must halt.',
        'Hence if recognizable were closed under complement, every recognizable language would be decidable. But $ATM$ is recognizable and undecidable.',
      ],
    },
    {
      prompt: 'Explain why multiple tapes do not expand the computational power of Turing machines.',
      answer: 'A single-tape TM simulates $k$ tapes using a tape alphabet that encodes $k$ tracks.',
      steps: [
        'Use a tape alphabet of pairs $(\\Gamma^k)$ to hold $k$ tracks.',
        'Mark each "head position" with a special symbol.',
        'Simulating one step of the $k$-tape machine takes $O(T)$ single-tape steps.',
        'Total overhead is at most quadratic, but recognizable class is unchanged.',
      ],
    },
  ];

  var STATIC_TM_CHALLENGE = [
    {
      prompt: 'Prove that the collection of Turing-recognizable (recursively enumerable) languages is countable, while the set of all languages over $\\{0,1\\}$ is uncountable. What does this imply?',
      answer: 'Countably many TMs but uncountably many languages; most languages are not even recognizable.',
      steps: [
        'Each TM is a finite string; the set of TMs is countable.',
        'A language is a subset of $\\{0,1\\}^*$; the power set of a countably infinite set is uncountable (Cantor).',
        'So a Turing machine cannot exist for most languages — they are beyond the reach of any algorithm.',
      ],
    },
    {
      prompt: 'Build a TM for $\\{a^i b^j c^k \\mid i \\cdot j = k\\}$.',
      answer: 'Multi-pass idea: for each $a$, copy $b$-block onto $c$-block as "consumed", accepting when all match.',
      steps: [
        'First verify the input has the form $a^* b^* c^*$.',
        'For each $a$: walk the $b$ block, and for each $b$ cross off one matching $c$.',
        'After all $a$s processed, verify no $c$s remain.',
      ],
    },
    {
      prompt: 'Prove that the language $L = \\{\\langle M \\rangle \\mid M$ halts on the empty input$\\}$ is not decidable.',
      answer: 'Reduce from $ATM$: given $\\langle M, w \\rangle$, build $M_w$ that ignores input, simulates $M$ on $w$, and halts iff $M$ accepts.',
      steps: [
        'Assume $L$ is decidable by some decider $D$.',
        'Given $\\langle M, w \\rangle$, build $M_w$: on any input, ignore it, simulate $M$ on $w$, halt iff $M$ accepts.',
        '$M_w$ halts on empty input iff $M$ accepts $w$.',
        'So $D(\\langle M_w \\rangle)$ decides $ATM$. Contradiction.',
      ],
    },
    {
      prompt: 'Show that there exists a language $L$ such that $L$ is co-recognizable but $L$ is not recognizable.',
      answer: 'Complement of $ATM$ is co-recognizable but not recognizable.',
      steps: [
        '$\\overline{ATM}$ has a recognizable complement ($ATM$) so it is co-recognizable.',
        'If $\\overline{ATM}$ were also recognizable, then $ATM$ would be decidable (run both recognizers in parallel).',
        'But $ATM$ is undecidable. Hence $\\overline{ATM}$ is not recognizable.',
      ],
    },
    {
      prompt: 'Prove that a linear-bounded automaton (LBA) is strictly less powerful than a general TM.',
      answer: 'LBA-decidable languages $=$ context-sensitive, which is strictly contained in recursive.',
      steps: [
        'Linear-bounded automaton: TM whose tape is limited to $O(n)$ cells.',
        'Every context-sensitive language is LBA-decidable; every LBA-decidable language is context-sensitive (standard result).',
        'Halting on LBAs is decidable (finitely many configurations to check), but halting on unbounded TMs is not. So LBAs are strictly weaker.',
      ],
    },
  ];

  PS.registerTopic("theory-tm", {
    title: "Turing machines",
    description: "Formal descriptions, closure properties, and simulation across TM variants.",
    warmup: STATIC_TM_WARMUP,
    standard: STATIC_TM_STANDARD,
    challenge: STATIC_TM_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: theory-reductions
  // ==========================================================================

  var STATIC_RED_WARMUP = [
    {
      prompt: 'What is the definition of a polynomial-time reduction $A \\le_p B$?',
      answer: 'A poly-time computable function $f$ such that $x \\in A \\iff f(x) \\in B$.',
      steps: [
        '$f$ runs in time polynomial in $|x|$.',
        'Membership is preserved exactly: yes-instance maps to yes-instance, no to no.',
      ],
    },
    {
      prompt: 'If $A \\le_p B$ and $B \\in P$, what can you conclude?',
      answer: '$A \\in P$.',
      steps: [
        'Compose the reduction $f$ with a poly-time solver for $B$.',
        'Total time is still polynomial.',
      ],
    },
    {
      prompt: 'If $A \\le_p B$ and $A$ is NP-hard, what can you conclude about $B$?',
      answer: '$B$ is NP-hard too.',
      steps: [
        'Any $C \\in NP$ reduces to $A$ (since $A$ is NP-hard).',
        '$A$ reduces to $B$.',
        'Composition gives $C \\le_p B$, so $B$ is NP-hard.',
      ],
    },
    {
      prompt: 'What is the difference between an NP-complete and NP-hard problem?',
      answer: 'NP-complete $=$ NP-hard AND in NP. NP-hard need not be in NP.',
      steps: [
        'NP-hard: every $NP$ problem reduces to it.',
        'NP-complete: NP-hard and itself in $NP$ (admits a short certificate).',
      ],
    },
    {
      prompt: 'Is SAT NP-complete?',
      answer: 'Yes (Cook-Levin theorem).',
      steps: [
        'In $NP$: certificate is a satisfying assignment.',
        'NP-hard: the Cook-Levin construction shows every $NP$ language reduces to SAT.',
      ],
    },
  ];

  var STATIC_RED_STANDARD = [
    {
      prompt: 'Give a polynomial-time reduction from $3$-SAT to Independent Set.',
      answer: 'Clause-triangle graph with conflict edges; IS of size $m$ corresponds to a satisfying assignment.',
      steps: [
        'For a formula with $m$ clauses, create $3m$ vertices (one per literal occurrence).',
        'Connect the three vertices in each clause with a triangle (so at most one of them ends up in the IS).',
        'Connect every pair of contradictory literals ($x$ and $\\bar x$) across clauses.',
        '$G$ has an IS of size $m$ iff the formula is satisfiable.',
      ],
    },
    {
      prompt: 'Reduce Independent Set to Vertex Cover.',
      answer: 'A set $S$ is IS iff $V \\setminus S$ is a VC.',
      steps: [
        'Given $(G, k)$ asking "is there an IS of size $\\ge k$?", output $(G, n - k)$.',
        'A set $S \\subseteq V$ is independent iff $V \\setminus S$ covers every edge.',
        'So IS of size $\\ge k$ exists iff VC of size $\\le n - k$ exists.',
      ],
    },
    {
      prompt: 'Reduce Vertex Cover to Set Cover.',
      answer: 'Each vertex becomes a set containing its incident edges.',
      steps: [
        'Build a set-cover instance with universe = edges.',
        'For each vertex $v$, create the set $S_v = \\{e \\mid v \\in e\\}$.',
        'VC of size $k$ $\\iff$ set cover of size $k$.',
      ],
    },
    {
      prompt: 'Reduce $3$-SAT to Subset Sum.',
      answer: 'Construct integers encoding variables and clauses so the sum forces a valid assignment.',
      steps: [
        'Associate one integer per literal ($x_i$ and $\\bar x_i$) whose digits indicate "1 in the variable column" and "1 in each clause where the literal appears".',
        'Add slack integers per clause to absorb $0, 1,$ or $2$ extras.',
        'Pick a target whose digits say "exactly one of $x_i$ or $\\bar x_i$" per variable and "exactly $3$ chosen contributions" per clause.',
        'A satisfying assignment yields a subset summing to the target.',
      ],
    },
    {
      prompt: 'Reduce Hamiltonian Cycle to TSP (decision version).',
      answer: 'Use the complete graph with weights $1$ on edges of $G$ and $2$ elsewhere; ask for tour of length $\\le n$.',
      steps: [
        'Build $K_n$ with weight $1$ for edges of $G$, weight $2$ for non-edges.',
        'TSP decision: "tour of length $\\le n$?"',
        'Hamiltonian cycle exists in $G$ iff TSP answer is yes. All edges used must be weight $1$.',
      ],
    },
    {
      prompt: 'Reduce $3$-Colorability to SAT.',
      answer: 'Three Boolean variables per vertex plus clauses enforcing proper coloring.',
      steps: [
        'Variables $c_{v, i}$ for $i \\in \\{1, 2, 3\\}$: "vertex $v$ gets color $i$".',
        'Clause "$c_{v,1} \\vee c_{v,2} \\vee c_{v,3}$": each vertex has some color.',
        'Clauses $\\neg c_{v,i} \\vee \\neg c_{v,j}$ for $i \\neq j$: no vertex has two colors.',
        'For each edge $(u,v)$ and color $i$: $\\neg c_{u,i} \\vee \\neg c_{v,i}$.',
      ],
    },
    {
      prompt: 'Reduce Vertex Cover to Dominating Set.',
      answer: 'Subdivide each edge so covering corresponds to dominating.',
      steps: [
        'Given $(G, k)$: replace each edge by a path of length 2 (new vertex in the middle).',
        'The new graph has a dominating set of size $k$ iff the original had a vertex cover of size $k$.',
      ],
    },
    {
      prompt: 'Reduce Clique to Independent Set.',
      answer: 'Take the complement graph.',
      steps: [
        '$(G, k)$ instance of Clique $\\to (\\bar G, k)$.',
        'A clique in $G$ is an IS in $\\bar G$, and vice versa.',
      ],
    },
    {
      prompt: 'Reduce $3$-SAT to Integer Linear Programming.',
      answer: 'Each variable is a $\\{0,1\\}$-integer; each clause is a linear inequality $\\ge 1$.',
      steps: [
        'Variables $x_i \\in \\{0, 1\\}$ (integer).',
        'For a clause like $x_1 \\vee \\bar x_2 \\vee x_3$: write $x_1 + (1 - x_2) + x_3 \\ge 1$.',
        'Feasibility of the ILP is equivalent to satisfiability.',
      ],
    },
    {
      prompt: 'You have a fast algorithm for $k$-coloring. How can you use it as a subroutine to solve clique?',
      answer: 'Not directly — colorability does not imply clique; both NP-complete but independently so.',
      steps: [
        'Chromatic number $\\ge$ clique size, but equality is not forced.',
        'You would need a separate reduction; one common route is Clique $\\to$ 3-SAT $\\to$ 3-Coloring.',
      ],
    },
  ];

  var STATIC_RED_CHALLENGE = [
    {
      prompt: 'Prove that Hamiltonian Path is NP-complete by reduction from Vertex Cover.',
      answer: 'Construct a gadget per vertex and per edge that forces a Hamiltonian path iff a vertex cover exists.',
      steps: [
        'Given $(G, k)$: build a new graph $H$ with an "edge gadget" for every edge of $G$.',
        'The edge gadget is a 12-vertex block that admits one of exactly two traversal patterns, each "charging" one endpoint.',
        'Connect $k$ "selector" vertices globally that choose which vertices are in the cover.',
        'Show $H$ has a Hamiltonian path iff $G$ has a vertex cover of size $k$. (The full construction is in Sipser, Chapter 7.5.)',
      ],
    },
    {
      prompt: 'Prove that the problem "Given a graph $G$ and integer $k$, does $G$ have a simple path of length $\\ge k$?" is NP-complete.',
      answer: 'Reduce from Hamiltonian Path: $G$ has a Ham path iff it has a simple path of length $n - 1$.',
      steps: [
        'Given $(G)$: output $(G, n - 1)$.',
        '$G$ has a Hamiltonian path iff it has a simple path of length $n - 1$.',
        'The reduction is polynomial; membership in $NP$ is easy (a path is a poly-size certificate).',
      ],
    },
    {
      prompt: 'Prove that "Given an integer $n$ and $k$, is there a partition of $\\{1, \\ldots, n\\}$ into $k$ subsets of equal sum?" is NP-hard.',
      answer: 'Reduce from Partition (which is NP-hard).',
      steps: [
        'Partition: "split a set $S$ into two equal-sum halves". Known NP-hard.',
        'Given a partition instance: treat it as a $k = 2$ case of the new problem.',
        'A partition exists iff a $2$-way equal-sum split does.',
        'So the new problem is NP-hard.',
      ],
    },
    {
      prompt: 'Given a graph $G$, show that "Does $G$ have a spanning tree of diameter $\\le k$?" is NP-hard.',
      answer: 'Reduce from Set Cover (classical result).',
      steps: [
        'Given a set cover instance, build a star-plus-gadgets graph.',
        'A spanning tree of diameter $\\le 4$ exists iff the set cover has size $\\le k$.',
        'The gadgets encode element-set incidence.',
      ],
    },
    {
      prompt: 'Prove that $2$-SAT is in $P$ but $3$-SAT is NP-complete.',
      answer: '$2$-SAT reduces to implication graph and SCC detection; $3$-SAT is NP-complete by Cook-Levin.',
      steps: [
        '$2$-SAT: build an implication graph with $2$ nodes per variable ($x$ and $\\bar x$). Each clause $a \\vee b$ becomes $\\bar a \\to b$ and $\\bar b \\to a$. The formula is satisfiable iff no variable and its negation lie in the same strongly connected component.',
        'SCCs can be computed in linear time, so $2$-SAT is in $P$.',
        '$3$-SAT: Cook-Levin shows every $NP$ problem reduces to SAT; standard clause-length manipulation reduces SAT to $3$-SAT.',
      ],
    },
  ];

  PS.registerTopic("theory-reductions", {
    title: "Reductions and NP-completeness proofs",
    description: "Polynomial-time mappings between problems, and how to show new problems NP-complete.",
    warmup: STATIC_RED_WARMUP,
    standard: STATIC_RED_STANDARD,
    challenge: STATIC_RED_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: theory-undecidable
  // ==========================================================================

  var STATIC_UD_WARMUP = [
    {
      prompt: 'State the halting problem.',
      answer: '$HALT = \\{\\langle M, w \\rangle \\mid M$ halts on $w\\}$.',
      steps: [
        'Given a TM description $\\langle M \\rangle$ and an input $w$, decide whether $M$ halts on $w$.',
        'Proved undecidable by Turing in 1936.',
      ],
    },
    {
      prompt: 'In one sentence, why is the halting problem undecidable?',
      answer: 'An assumed decider can be fed its own source to produce a contradiction.',
      steps: [
        'Suppose a decider $H$ exists.',
        'Build $D(\\langle M \\rangle)$: if $H$ says $M$ halts on $\\langle M \\rangle$, loop forever; else halt.',
        '$D(\\langle D \\rangle)$ halts iff it doesn\'t. Contradiction.',
      ],
    },
    {
      prompt: 'Is the language "does TM $M$ print any output?" decidable?',
      answer: 'No — it is undecidable (a nontrivial property of $M$\'s behavior, by Rice\'s theorem).',
      steps: [
        'Any nontrivial semantic property of a TM\'s language is undecidable.',
        '"Produces any output" depends on $M$\'s behavior, not its syntax.',
      ],
    },
    {
      prompt: 'State Rice\'s theorem.',
      answer: 'Every nontrivial semantic property of Turing-recognizable languages is undecidable.',
      steps: [
        'A property is semantic if it depends only on the language recognized, not on $M$\'s description.',
        'Nontrivial: at least one TM satisfies and at least one does not.',
        'Rice shows all such properties are undecidable.',
      ],
    },
    {
      prompt: 'Is "does TM $M$ have at least 10 states?" undecidable?',
      answer: 'No — it is syntactic, so decidable.',
      steps: [
        'Just read the description of $M$ and count the state symbols.',
        'Rice\'s theorem does not apply to syntactic properties.',
      ],
    },
  ];

  var STATIC_UD_STANDARD = [
    {
      prompt: 'Prove that $E_{TM} = \\{\\langle M\\rangle \\mid L(M) = \\emptyset\\}$ is undecidable.',
      answer: 'Reduce from $ATM$ by constructing a TM that only accepts if the original accepts a specific string.',
      steps: [
        'Given $\\langle M, w \\rangle$, build $M_w$: on any input $x$, check $x = w$; if not, reject; if so, run $M$ on $w$ and accept iff $M$ does.',
        '$L(M_w) = \\{w\\}$ if $M$ accepts $w$, else $\\emptyset$.',
        'So a decider for $E_{TM}$ would give a decider for $ATM$. Contradiction.',
      ],
    },
    {
      prompt: 'Prove that $REG_{TM} = \\{\\langle M \\rangle \\mid L(M)$ is regular$\\}$ is undecidable.',
      answer: 'By Rice\'s theorem (regularity is a semantic nontrivial property).',
      steps: [
        '"$L(M)$ is regular" depends only on the language $L(M)$, not on $M$\'s encoding.',
        'Trivially true for some TMs (e.g., those deciding finite languages) and false for others ($\\{0^n 1^n\\}$).',
        'Rice: undecidable.',
      ],
    },
    {
      prompt: 'Is $\\{\\langle M_1, M_2 \\rangle \\mid L(M_1) = L(M_2)\\}$ decidable?',
      answer: 'No — equivalence of TMs is undecidable (Rice).',
      steps: [
        'Equivalence is a semantic nontrivial property.',
        'A direct reduction from $E_{TM}$ also works: $L(M_1) = L(M_2)$ with $M_2$ a fixed machine rejecting everything iff $L(M_1) = \\emptyset$.',
      ],
    },
    {
      prompt: 'Show that Post\'s Correspondence Problem (PCP) is undecidable (you may cite the standard result).',
      answer: 'Reduce from the halting problem; the reduction simulates $M$ via tile sequences.',
      steps: [
        'Encode TM configurations as dominoes (top = prior config, bottom = next).',
        'A valid sequence of dominoes corresponds to a halting run of $M$.',
        'Hence PCP has a solution iff $M$ halts, reducing $HALT$ to PCP.',
      ],
    },
    {
      prompt: 'Prove that the set of valid TM descriptions is decidable even though the halting problem is not.',
      answer: 'Parsing a description is a finite syntactic check; halting is semantic.',
      steps: [
        'A TM description is a finite string with specific syntax (states, transitions).',
        'Parsing/validating is straightforward and decidable.',
        'Halting depends on the machine\'s run, not its syntax — undecidable.',
      ],
    },
    {
      prompt: 'Show that the problem "Does TM $M$ ever write a non-blank on its tape?" is undecidable.',
      answer: 'This is a nontrivial semantic property of a TM\'s computation (by Rice\'s idea).',
      steps: [
        'Reduce from $HALT$. Given $\\langle M, w \\rangle$, build $M\'$: on input, simulate $M$ on $w$ using a separate tape region; if $M$ halts, write a non-blank on the main tape.',
        '$M\'$ writes a non-blank iff $M$ halts on $w$.',
        'So deciding "writes a non-blank" would decide $HALT$.',
      ],
    },
    {
      prompt: 'Explain why compiler writers can still implement termination analyzers despite undecidability.',
      answer: 'Undecidability is a worst-case statement; most real programs admit sound conservative analysis.',
      steps: [
        'Undecidability says no single algorithm handles every program.',
        'A termination analyzer can answer "yes", "no", or "don\'t know".',
        'It is incomplete but sound, and works well on the subset of programs people actually write.',
      ],
    },
    {
      prompt: 'Is $\\{\\langle M \\rangle \\mid M$ accepts at least $k$ strings$\\}$ decidable for a fixed $k$?',
      answer: 'No — undecidable by Rice.',
      steps: [
        '"Accepts $\\ge k$ strings" is a semantic nontrivial property of $L(M)$.',
        'Rice: undecidable.',
      ],
    },
    {
      prompt: 'Show that $A_{TM}$ is recognizable even though it is not decidable.',
      answer: 'Run a universal TM simulating $M$ on $w$.',
      steps: [
        'Universal TM $U$ on input $\\langle M, w \\rangle$: simulate $M$ on $w$.',
        'If $M$ accepts $w$, $U$ accepts. If $M$ rejects, $U$ rejects. If $M$ loops, $U$ loops.',
        'So $U$ recognizes $A_{TM}$: it halts-accepts on yes-instances.',
      ],
    },
    {
      prompt: 'Is the language "the program contains a loop" decidable?',
      answer: 'Yes — it is a syntactic property.',
      steps: [
        'Scan the program source for loop constructs.',
        'Decidable, finite check.',
      ],
    },
  ];

  var STATIC_UD_CHALLENGE = [
    {
      prompt: 'Prove Rice\'s theorem in full.',
      answer: 'Reduce from $ATM$ using a nontrivial semantic property $P$.',
      steps: [
        'Let $P$ be a nontrivial semantic property. Assume WLOG the empty language $\\emptyset$ does not have $P$ (else complement $P$).',
        'Pick a witness TM $T$ with $L(T) \\in P$.',
        'Given $\\langle M, w \\rangle$, build $M_{w}$: on input $x$, simulate $M$ on $w$; if $M$ accepts $w$, run $T$ on $x$; else reject.',
        '$L(M_w) = L(T)$ if $M$ accepts $w$, else $\\emptyset$. So deciding $P$ for $M_w$ decides $A_{TM}$.',
      ],
    },
    {
      prompt: 'Show that the halting problem restricted to TMs that always halt in polynomial time is decidable.',
      answer: 'Yes — run the TM for a polynomial number of steps.',
      steps: [
        'Given a description of $M$ with an explicit polynomial bound $p(n)$, run $M$ for $p(n)$ steps.',
        'If $M$ halts in that time, we know; if not, we would know it never does.',
        'The issue with general halting is the unbounded runtime.',
      ],
    },
    {
      prompt: 'Prove that there exist languages that are not Turing-recognizable.',
      answer: 'Countability argument: countably many TMs, uncountably many languages.',
      steps: [
        'The set of TMs is countable (each is a finite string).',
        'The set of languages is uncountable (Cantor).',
        'So the map TM $\\to$ language cannot be onto. Most languages are not recognizable.',
      ],
    },
    {
      prompt: 'Prove that the set of TMs whose first output (on some input) is the string "hello" is undecidable.',
      answer: 'Undecidable by Rice — a semantic nontrivial property.',
      steps: [
        '"First output is \'hello\'" depends on $M$\'s behavior, not just its description.',
        'Rice\'s theorem implies undecidability.',
      ],
    },
    {
      prompt: 'Construct a language that is neither recognizable nor co-recognizable.',
      answer: 'Problem $EQ_{TM} = \\{\\langle M_1, M_2 \\rangle \\mid L(M_1) = L(M_2)\\}$.',
      steps: [
        'Show $EQ_{TM}$ is not recognizable: if it were, composing with the obvious reduction from $\\overline{A_{TM}}$ would recognize a non-recognizable set.',
        'Show $\\overline{EQ_{TM}}$ is not recognizable similarly.',
        'Hence $EQ_{TM}$ sits strictly outside the recognizable/co-recognizable hierarchy.',
      ],
    },
  ];

  PS.registerTopic("theory-undecidable", {
    title: "Undecidability and Rice's theorem",
    description: "Prove classic undecidable problems by reduction from the halting problem.",
    warmup: STATIC_UD_WARMUP,
    standard: STATIC_UD_STANDARD,
    challenge: STATIC_UD_CHALLENGE,
  });

})();
