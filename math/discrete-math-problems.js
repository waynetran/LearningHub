/*
 * LearningHub - Discrete Math Problem Set
 * Registers 4 topics:
 *   dm-logic-proofs   — sets, logic, proof techniques (induction, contradiction)
 *   dm-combinatorics  — counting, permutations, combinations, pigeonhole
 *   dm-graphs         — connectivity, trees, Euler/Hamilton, shortest paths
 *   dm-numtheory      — modular arithmetic, Fermat, RSA basics
 */
(function () {
  "use strict";

  function register() {
    if (!window.LearningHubProblemSet) return false;
    var PS = window.LearningHubProblemSet;

    // ====================================================================
    // TOPIC 1: dm-logic-proofs
    // ====================================================================
    var LOGIC_WARMUP = [
      {
        prompt: 'Let $A = \\{1,2,3,4\\}$ and $B = \\{3,4,5,6\\}$. Compute $A \\cap B$, $A \\cup B$, and $A \\setminus B$.',
        answer: '$A \\cap B = \\{3,4\\}$, $A \\cup B = \\{1,2,3,4,5,6\\}$, $A \\setminus B = \\{1,2\\}$.',
        steps: [
          'Intersection: elements in both sets. $3$ and $4$ are in both.',
          'Union: elements in either set, without duplicates.',
          'Set difference: elements of $A$ not in $B$.',
        ],
      },
      {
        prompt: 'Write the truth table of $p \\Rightarrow q$. Which row is the only one that makes the implication false?',
        answer: 'False only when $p$ is true and $q$ is false.',
        steps: [
          'Definition: an implication lies only when it promises something ($p$) and fails to deliver ($\\lnot q$).',
          'Table: $T\\Rightarrow T$ = $T$, $T\\Rightarrow F$ = $F$, $F\\Rightarrow T$ = $T$, $F\\Rightarrow F$ = $T$.',
          'The famous "vacuous truth": if $p$ is false, the implication holds regardless of $q$.',
        ],
      },
      {
        prompt: 'Negate the statement: "Every prime greater than $2$ is odd."',
        answer: 'There exists a prime greater than $2$ that is even.',
        steps: [
          'Formal form: $\\forall p \\; (\\text{prime}(p) \\land p>2 \\Rightarrow \\text{odd}(p))$.',
          'Negation pushes through quantifiers: $\\exists p \\; (\\text{prime}(p) \\land p>2 \\land \\lnot\\text{odd}(p))$.',
          'In English: some prime bigger than $2$ is even. (Of course that is false — but the negation is a well-formed statement.)',
        ],
      },
      {
        prompt: 'State De Morgan\'s laws for sets $A, B$ inside a universe $U$.',
        answer: '$\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}$ and $\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$.',
        steps: [
          'Think elementwise: $x \\notin A\\cup B$ iff $x\\notin A$ and $x\\notin B$.',
          'Likewise $x\\notin A\\cap B$ iff $x\\notin A$ or $x\\notin B$.',
          'These are the propositional-logic De Morgan laws in set form.',
        ],
      },
      {
        prompt: 'How many subsets does a set with $10$ elements have? How many of them are nonempty?',
        answer: '$2^{10}=1024$ subsets total; $1023$ are nonempty.',
        steps: [
          'Each element is independently in or out: $2$ choices per element.',
          '$2^{10}=1024$ total subsets.',
          'Subtract the empty set: $1023$ nonempty subsets.',
        ],
      },
      {
        prompt: 'Is the statement $p \\lor \\lnot p$ a tautology, contradiction, or contingency?',
        answer: 'Tautology — true for every assignment of $p$.',
        steps: [
          'If $p$ is $T$, then $p\\lor\\lnot p$ is $T$.',
          'If $p$ is $F$, then $\\lnot p$ is $T$ so $p\\lor\\lnot p$ is $T$.',
          'This is the law of excluded middle.',
        ],
      },
      {
        prompt: 'Let $A$ have $|A|=5$ and $B$ have $|B|=4$. What is $|A \\times B|$?',
        answer: '$20$.',
        steps: [
          'A Cartesian product pairs every element of $A$ with every element of $B$.',
          '$|A\\times B|=|A|\\cdot|B|=5\\cdot 4=20$.',
        ],
      },
      {
        prompt: 'Write the contrapositive of "If $n^2$ is even, then $n$ is even."',
        answer: 'If $n$ is odd, then $n^2$ is odd.',
        steps: [
          'Contrapositive of $p\\Rightarrow q$ is $\\lnot q\\Rightarrow\\lnot p$.',
          'Swap and negate: $n$ not even ($n$ odd) implies $n^2$ not even ($n^2$ odd).',
          'Contrapositive is logically equivalent to the original.',
        ],
      },
      {
        prompt: 'Is $\\{x \\in \\mathbb{Z} : x^2 < 10\\}$ the same set as $\\{-3,-2,-1,0,1,2,3\\}$?',
        answer: 'Yes.',
        steps: [
          'Integers with $|x|\\le 3$ all satisfy $x^2\\le 9<10$.',
          '$|x|=4$ gives $x^2=16>10$, so $\\pm 4$ are out.',
          'The two sets are equal.',
        ],
      },
      {
        prompt: 'Simplify $\\lnot(p \\land \\lnot q)$ using logical equivalences.',
        answer: '$\\lnot p \\lor q$.',
        steps: [
          'De Morgan: $\\lnot(p\\land\\lnot q) = \\lnot p \\lor \\lnot\\lnot q$.',
          'Double negation: $\\lnot\\lnot q = q$.',
          'Result: $\\lnot p \\lor q$, which is also $p\\Rightarrow q$.',
        ],
      },
      {
        prompt: 'If $f: A\\to B$ and $|A|=|B|=n$ and $f$ is injective, is $f$ surjective?',
        answer: 'Yes — for finite sets of equal size, injective implies surjective.',
        steps: [
          'Injective means $n$ distinct inputs map to $n$ distinct outputs.',
          '$n$ distinct outputs in a set of size $n$ must be all of $B$.',
          'Hence $f$ is also surjective. (This fails for infinite sets — e.g. $n\\mapsto n+1$ on $\\mathbb{N}$.)',
        ],
      },
      {
        prompt: 'Prove: if $n$ is odd, then $n^2$ is odd.',
        answer: 'Direct proof.',
        steps: [
          'Write $n = 2k+1$ for some integer $k$.',
          '$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2+2k) + 1$.',
          'This is $2m+1$ for $m = 2k^2+2k$, so $n^2$ is odd.',
        ],
      },
      {
        prompt: 'List all elements of the power set $\\mathcal{P}(\\{a,b\\})$.',
        answer: '$\\{\\emptyset, \\{a\\}, \\{b\\}, \\{a,b\\}\\}$.',
        steps: [
          'Power set = set of all subsets, including $\\emptyset$ and the set itself.',
          '$|\\mathcal{P}(\\{a,b\\})| = 2^2 = 4$.',
        ],
      },
      {
        prompt: 'Is $\\{x\\in\\mathbb{R}: x^2 = -1\\}$ empty?',
        answer: 'Yes — no real squares to a negative.',
        steps: [
          'For any $x\\in\\mathbb{R}$, $x^2\\ge 0$.',
          'So $x^2 = -1$ has no real solutions.',
          'The set is empty. (In $\\mathbb{C}$ the set is $\\{i,-i\\}$.)',
        ],
      },
      {
        prompt: 'Convert "for all integers $x$, there exists an integer $y$ with $x+y=0$" into symbols, then negate it.',
        answer: 'Original: $\\forall x \\exists y\\; x+y=0$. Negation: $\\exists x \\forall y\\; x+y\\ne 0$.',
        steps: [
          'Flip $\\forall\\to\\exists$ and $\\exists\\to\\forall$ as the negation passes through.',
          'Negate the body: $x+y=0$ becomes $x+y\\ne 0$.',
          'Original is true (take $y=-x$); negation is false.',
        ],
      },
    ];

    var LOGIC_STANDARD = [
      {
        prompt: 'Prove by induction: $1+2+\\cdots+n = n(n+1)/2$ for all $n\\ge 1$.',
        answer: 'Proved.',
        steps: [
          'Base $n=1$: LHS $=1$, RHS $=1\\cdot 2/2 = 1$.',
          'Assume $1+\\cdots+k = k(k+1)/2$.',
          'Then $1+\\cdots+k+(k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2$, matching the formula at $n=k+1$.',
          'By induction, it holds for all $n\\ge 1$.',
        ],
      },
      {
        prompt: 'Prove by contradiction: $\\sqrt{2}$ is irrational.',
        answer: 'Irrational.',
        steps: [
          'Assume $\\sqrt{2}=p/q$ in lowest terms (so $\\gcd(p,q)=1$).',
          'Square: $2q^2 = p^2$, so $p^2$ is even, hence $p$ is even. Write $p=2r$.',
          'Then $2q^2 = 4r^2$, i.e. $q^2 = 2r^2$, so $q$ is also even.',
          'Both $p,q$ even contradicts $\\gcd(p,q)=1$. Done.',
        ],
      },
      {
        prompt: 'Prove: for every integer $n$, $n^3-n$ is divisible by $6$.',
        answer: 'Divisible by $6$.',
        steps: [
          'Factor: $n^3-n = n(n-1)(n+1)$, a product of three consecutive integers.',
          'Among any three consecutive integers, one is divisible by $3$.',
          'Among any two consecutive integers, one is even.',
          'So the product is divisible by $2\\cdot 3 = 6$.',
        ],
      },
      {
        prompt: 'Prove by strong induction: every integer $n\\ge 2$ has a prime factorization.',
        answer: 'Proved.',
        steps: [
          'Base: $n=2$ is prime, done.',
          'Inductive step: assume every $2\\le m<n$ has a prime factorization.',
          'If $n$ is prime, done. Otherwise $n=ab$ with $2\\le a,b<n$.',
          'By hypothesis both $a$ and $b$ factor into primes; concatenate for $n$.',
        ],
      },
      {
        prompt: 'Show $n! > 2^n$ for all $n \\ge 4$ by induction.',
        answer: 'True for $n\\ge 4$.',
        steps: [
          'Base $n=4$: $4!=24 > 16 = 2^4$.',
          'Assume $k!>2^k$ for some $k\\ge 4$.',
          'Then $(k+1)! = (k+1)\\cdot k! > (k+1)\\cdot 2^k \\ge 2\\cdot 2^k = 2^{k+1}$ since $k+1\\ge 5>2$.',
          'By induction, $n!>2^n$ for all $n\\ge 4$.',
        ],
      },
      {
        prompt: 'Let $A,B,C$ be sets. Prove $A\\cap (B\\cup C) = (A\\cap B)\\cup(A\\cap C)$.',
        answer: 'Proved by element chase.',
        steps: [
          '$x\\in A\\cap(B\\cup C)$ iff $x\\in A$ and ($x\\in B$ or $x\\in C$).',
          'Distribute: iff ($x\\in A$ and $x\\in B$) or ($x\\in A$ and $x\\in C$).',
          'That is $x\\in (A\\cap B)\\cup(A\\cap C)$.',
        ],
      },
      {
        prompt: 'How many binary strings of length $n$ have an even number of $1$s?',
        answer: '$2^{n-1}$.',
        steps: [
          'Pair each string with its bit-flipped-in-last-position partner.',
          'Exactly one of each pair has an even count.',
          'So half of the $2^n$ strings work: $2^{n-1}$.',
        ],
      },
      {
        prompt: 'Prove: if $n$ is an integer and $3n+2$ is odd, then $n$ is odd.',
        answer: 'Proved via contrapositive.',
        steps: [
          'Contrapositive: if $n$ is even, then $3n+2$ is even.',
          'If $n=2k$, then $3n+2 = 6k+2 = 2(3k+1)$, which is even.',
          'Contrapositive holds, so the original does too.',
        ],
      },
      {
        prompt: 'Is "$p \\Rightarrow q$" logically equivalent to "$\\lnot p \\lor q$"? Justify briefly.',
        answer: 'Yes.',
        steps: [
          'Build truth tables: both are $F$ only when $p$ is $T$ and $q$ is $F$.',
          'They agree on every row, hence are equivalent.',
          'This identity is how compilers implement implications in boolean circuits.',
        ],
      },
      {
        prompt: 'Prove: for all $n\\ge 1$, $\\sum_{k=1}^n k^2 = n(n+1)(2n+1)/6$.',
        answer: 'Proved.',
        steps: [
          'Base $n=1$: LHS $=1$, RHS $=1\\cdot 2\\cdot 3/6 = 1$.',
          'Assume true at $n=k$. Then at $k+1$: add $(k+1)^2$ to both sides.',
          'RHS becomes $k(k+1)(2k+1)/6 + (k+1)^2 = (k+1)\\bigl[k(2k+1)+6(k+1)\\bigr]/6 = (k+1)(2k^2+7k+6)/6$.',
          'Factor: $2k^2+7k+6 = (k+2)(2k+3)$, giving $(k+1)(k+2)(2k+3)/6$, the formula at $n=k+1$.',
        ],
      },
      {
        prompt: 'Prove there are infinitely many primes (Euclid).',
        answer: 'Infinitely many primes.',
        steps: [
          'Suppose there are only finitely many: $p_1,\\dots,p_k$.',
          'Consider $N = p_1 p_2\\cdots p_k + 1$.',
          '$N$ is not divisible by any $p_i$ (remainder $1$).',
          'So either $N$ is prime or has a prime factor outside the list — contradiction.',
        ],
      },
      {
        prompt: 'Let $f: \\mathbb{Z}\\to\\mathbb{Z}$ by $f(n)=2n+3$. Is $f$ injective? Surjective?',
        answer: 'Injective but not surjective.',
        steps: [
          'Injective: $2a+3=2b+3$ implies $a=b$.',
          'Not surjective: $f(n)$ is always odd, so $4$ has no preimage.',
        ],
      },
      {
        prompt: 'Let $R$ be the relation on $\\mathbb{Z}$ where $aRb$ iff $a-b$ is divisible by $5$. Prove $R$ is an equivalence relation and describe its classes.',
        answer: '$5$ equivalence classes, one per residue mod $5$.',
        steps: [
          'Reflexive: $a-a=0$ divisible by $5$.',
          'Symmetric: if $5\\mid a-b$, then $5\\mid b-a$.',
          'Transitive: if $5\\mid a-b$ and $5\\mid b-c$, then $5\\mid (a-b)+(b-c) = a-c$.',
          'Classes: $[0],[1],[2],[3],[4]$ — this is $\\mathbb{Z}/5\\mathbb{Z}$.',
        ],
      },
      {
        prompt: 'Prove: the sum of any three consecutive integers is divisible by $3$.',
        answer: 'True.',
        steps: [
          'Let the integers be $n-1,n,n+1$.',
          'Sum: $3n$, which is clearly divisible by $3$.',
        ],
      },
      {
        prompt: 'Use induction to prove $2^n > n^2$ for all $n\\ge 5$.',
        answer: 'Proved.',
        steps: [
          'Base $n=5$: $32>25$.',
          'Assume $2^k>k^2$ for some $k\\ge 5$.',
          'Goal: $2^{k+1}>(k+1)^2$, i.e. $2\\cdot 2^k > k^2+2k+1$.',
          'By hypothesis, $2\\cdot 2^k > 2k^2$, so it suffices to show $2k^2\\ge k^2+2k+1$, i.e. $k^2\\ge 2k+1$, which holds for $k\\ge 5$ (in fact $k\\ge 3$).',
        ],
      },
      {
        prompt: 'Is the statement "every even integer $>2$ is the sum of two primes" a theorem or a conjecture?',
        answer: 'A conjecture — this is the Goldbach conjecture, unproven as of 2024.',
        steps: [
          'Verified computationally up to $4\\cdot 10^{18}$.',
          'No proof is known, and no counterexample.',
          'A cautionary tale: exhaustive checking is not the same as proof.',
        ],
      },
    ];

    var LOGIC_CHALLENGE = [
      {
        prompt: 'Prove that $\\sqrt{p}$ is irrational for every prime $p$.',
        answer: 'Irrational.',
        steps: [
          'Suppose $\\sqrt{p} = a/b$ with $\\gcd(a,b)=1$.',
          'Then $pb^2=a^2$, so $p\\mid a^2$. Since $p$ is prime, $p\\mid a$. Write $a=pc$.',
          'Substitute: $pb^2 = p^2c^2$, so $b^2 = pc^2$, hence $p\\mid b$.',
          'Both $a,b$ divisible by $p$ contradicts $\\gcd(a,b)=1$.',
        ],
      },
      {
        prompt: 'Prove by induction: for all $n\\ge 0$, $\\sum_{k=0}^n 2^k = 2^{n+1}-1$.',
        answer: 'Proved.',
        steps: [
          'Base $n=0$: LHS $=1$, RHS $=2-1=1$.',
          'Assume $\\sum_{k=0}^m 2^k = 2^{m+1}-1$.',
          'Add $2^{m+1}$: $2^{m+1}-1+2^{m+1} = 2\\cdot 2^{m+1}-1 = 2^{m+2}-1$. Done.',
          'Bit-level interpretation: this is why an $n$-bit unsigned integer reaches $2^n-1$.',
        ],
      },
      {
        prompt: 'Prove the well-ordering principle: every nonempty subset of $\\mathbb{N}$ has a least element, using induction.',
        answer: 'Sketch via contradiction on induction.',
        steps: [
          'Suppose $S\\subseteq\\mathbb{N}$ has no least element.',
          'Let $T=\\{n\\in\\mathbb{N} : n\\notin S \\text{ and } n<\\text{every element of } S\\}$.',
          'Show $0\\in T$ (else $0$ would be the minimum of $S$).',
          'Induction: if $n\\in T$, then $n+1\\in T$ (else $n+1$ would be the minimum).',
          'So $T=\\mathbb{N}$, forcing $S=\\emptyset$, contradiction.',
        ],
      },
      {
        prompt: 'Given the Boolean formula $(p\\lor q)\\land(\\lnot p\\lor r)\\land(\\lnot q\\lor r)$, show it is equivalent to $r\\lor(p\\land q)$? Or find the correct simplification.',
        answer: 'It simplifies to $r \\lor (p\\land q)$.',
        steps: [
          'Try $r=T$: every clause is satisfied, matching RHS.',
          'With $r=F$: need $p\\lor q$, $\\lnot p$, $\\lnot q$, forcing $p=F$ and $q=F$, contradicting $p\\lor q$. So no satisfying assignment with $r=F$ unless... wait: $p\\lor q$ then $\\lnot p$ forces $q=T$ and $\\lnot q$ forces $q=F$, contradiction. So with $r=F$ the formula is $F$.',
          'So the formula is $T$ exactly when $r$ is true. That is $r$ alone, not $r\\lor(p\\land q)$ — resolution trick.',
          'Corrected: the simplification is $r$.',
        ],
      },
      {
        prompt: 'Prove the inclusion-exclusion identity for three sets: $|A\\cup B\\cup C|=|A|+|B|+|C|-|A\\cap B|-|A\\cap C|-|B\\cap C|+|A\\cap B\\cap C|$.',
        answer: 'Proved.',
        steps: [
          'An element in exactly one of the sets is counted once on the left. On the right: once in a singleton term, zero times in the other terms.',
          'An element in exactly two sets, say $A$ and $B$: left counts it once; right counts $2$ (singletons) $-1$ (pair) $=1$.',
          'An element in all three: left $=1$; right $=3-3+1=1$.',
          'Every element contributes the same to both sides, so they are equal.',
        ],
      },
    ];

    PS.registerTopic("dm-logic-proofs", {
      title: "Sets, logic, and proof techniques",
      description: "De Morgan, implication, induction, contradiction, and structural reasoning.",
      warmup: LOGIC_WARMUP,
      standard: LOGIC_STANDARD,
      challenge: LOGIC_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 2: dm-combinatorics
    // ====================================================================
    var COMB_WARMUP = [
      {
        prompt: 'How many ways can you arrange the letters of the word $\\text{MATH}$?',
        answer: '$4! = 24$.',
        steps: [
          'All four letters are distinct.',
          'Number of permutations $=4! = 24$.',
        ],
      },
      {
        prompt: 'A committee of $3$ is chosen from $10$ people. How many committees?',
        answer: '$\\binom{10}{3}=120$.',
        steps: [
          'Order does not matter — this is a combination.',
          '$\\binom{10}{3}=\\dfrac{10!}{3!\\,7!}=\\dfrac{10\\cdot 9\\cdot 8}{6}=120$.',
        ],
      },
      {
        prompt: 'A password is $4$ characters long, each an uppercase letter. How many possible passwords?',
        answer: '$26^4 = 456{,}976$.',
        steps: [
          '$26$ choices for each of $4$ positions, independent.',
          'Multiply: $26^4 = 456{,}976$.',
          'Useful for quick entropy estimates in security.',
        ],
      },
      {
        prompt: 'How many binary strings of length $8$ contain exactly three $1$s?',
        answer: '$\\binom{8}{3}=56$.',
        steps: [
          'Choose which $3$ of the $8$ positions hold a $1$.',
          '$\\binom{8}{3}=56$.',
          'This counts length-$8$ Hamming weight-$3$ codewords.',
        ],
      },
      {
        prompt: 'Compute $\\binom{7}{2}$.',
        answer: '$21$.',
        steps: [
          '$\\binom{7}{2}=\\dfrac{7\\cdot 6}{2}=21$.',
        ],
      },
      {
        prompt: 'You roll two distinguishable dice. How many outcomes are there?',
        answer: '$36$.',
        steps: [
          '$6$ outcomes for the first die, $6$ for the second, independent.',
          'Total: $6\\cdot 6 = 36$.',
        ],
      },
      {
        prompt: 'In how many ways can $5$ people sit in a row?',
        answer: '$5! = 120$.',
        steps: [
          'Each arrangement is a permutation of $5$ distinct people.',
          '$5! = 120$.',
        ],
      },
      {
        prompt: 'From a standard $52$-card deck, how many $5$-card hands are there?',
        answer: '$\\binom{52}{5}=2{,}598{,}960$.',
        steps: [
          'Order does not matter in a poker hand.',
          '$\\binom{52}{5}=\\dfrac{52!}{5!\\,47!}=2{,}598{,}960$.',
        ],
      },
      {
        prompt: 'How many ways to pick $2$ books from a shelf of $9$?',
        answer: '$\\binom{9}{2}=36$.',
        steps: [
          '$\\binom{9}{2}=\\dfrac{9\\cdot 8}{2}=36$.',
        ],
      },
      {
        prompt: 'How many $3$-letter strings from $\\{A,B,C,D\\}$ allow repetition?',
        answer: '$4^3=64$.',
        steps: [
          '$4$ choices for each of $3$ positions, independent.',
          '$4^3=64$.',
        ],
      },
      {
        prompt: 'Apply the pigeonhole principle: in any group of $13$ people, show at least two share a birth month.',
        answer: 'Direct pigeonhole.',
        steps: [
          '$12$ months (pigeonholes), $13$ people (pigeons).',
          'By pigeonhole at least two people share a month.',
        ],
      },
      {
        prompt: 'How many permutations of $\\text{AAB}$ are there?',
        answer: '$3$.',
        steps: [
          'Multinomial: $\\dfrac{3!}{2!\\,1!}=3$.',
          'Explicitly: AAB, ABA, BAA.',
        ],
      },
      {
        prompt: 'What is $0!$?',
        answer: '$1$.',
        steps: [
          'By convention — empty product.',
          'Makes formulas like $\\binom{n}{0}=1$ work uniformly.',
        ],
      },
      {
        prompt: 'Compute $P(8,3)$, the number of ordered arrangements of $3$ items from $8$.',
        answer: '$336$.',
        steps: [
          '$P(n,k)=n!/(n-k)!$.',
          '$P(8,3)=8\\cdot 7\\cdot 6 = 336$.',
        ],
      },
      {
        prompt: 'A pizza has $3$ choices of crust, $2$ of sauce, and $5$ of topping (pick one of each). How many pizzas?',
        answer: '$30$.',
        steps: [
          'Product rule: $3\\cdot 2\\cdot 5 = 30$.',
        ],
      },
    ];

    var COMB_STANDARD = [
      {
        prompt: 'How many bit strings of length $10$ start with $1$ or end with $00$?',
        answer: '$640$.',
        steps: [
          '$|A|$ (start with $1$) $= 2^9 = 512$.',
          '$|B|$ (end with $00$) $= 2^8 = 256$.',
          '$|A\\cap B| = 2^7 = 128$.',
          'Inclusion-exclusion: $512+256-128 = 640$.',
        ],
      },
      {
        prompt: 'In how many ways can you distribute $7$ identical candies among $3$ distinct children?',
        answer: '$\\binom{9}{2}=36$.',
        steps: [
          'Stars and bars: $\\binom{n+k-1}{k-1}$ with $n=7$ candies, $k=3$ children.',
          '$\\binom{9}{2}=36$.',
        ],
      },
      {
        prompt: 'How many permutations of $\\text{MISSISSIPPI}$ are there?',
        answer: '$34{,}650$.',
        steps: [
          'Letter counts: M $1$, I $4$, S $4$, P $2$, total $11$.',
          'Multinomial: $\\dfrac{11!}{1!\\,4!\\,4!\\,2!} = 34{,}650$.',
        ],
      },
      {
        prompt: 'Compute the probability of being dealt a full house from a standard $52$-card deck.',
        answer: '$\\dfrac{3744}{2598960}\\approx 0.00144$ (about $0.144\\%$).',
        steps: [
          'Choose rank for the triple: $13$. Choose $3$ suits: $\\binom{4}{3}=4$.',
          'Choose different rank for pair: $12$. Choose $2$ suits: $\\binom{4}{2}=6$.',
          'Full houses: $13\\cdot 4\\cdot 12\\cdot 6 = 3744$. Divide by $\\binom{52}{5}$.',
        ],
      },
      {
        prompt: 'How many $5$-digit numbers have all distinct digits?',
        answer: '$27{,}216$.',
        steps: [
          'First digit: $9$ choices (cannot be $0$).',
          'Remaining four digits: pick from the other $9$ digits, ordered: $9\\cdot 8\\cdot 7\\cdot 6 = 3024$.',
          'Total: $9\\cdot 3024 = 27{,}216$.',
        ],
      },
      {
        prompt: 'Show that among any $11$ integers there exist two whose difference is divisible by $10$.',
        answer: 'Pigeonhole.',
        steps: [
          'There are $10$ residue classes mod $10$.',
          '$11$ integers into $10$ classes — two share a class.',
          'Their difference is divisible by $10$.',
        ],
      },
      {
        prompt: 'In how many ways can $8$ identical servers be assigned to $3$ distinct data centers, with each data center getting at least $1$?',
        answer: '$\\binom{7}{2}=21$.',
        steps: [
          'Subtract one server from each center first: $8-3=5$ remaining.',
          'Stars and bars on $5$ into $3$ non-negative parts: $\\binom{5+2}{2}=\\binom{7}{2}=21$.',
        ],
      },
      {
        prompt: 'How many surjective functions are there from a $4$-element set to a $3$-element set?',
        answer: '$36$.',
        steps: [
          'Use inclusion-exclusion: $\\sum_{k=0}^3 (-1)^k \\binom{3}{k}(3-k)^4$.',
          '$=3^4 - 3\\cdot 2^4 + 3\\cdot 1^4 = 81-48+3 = 36$.',
        ],
      },
      {
        prompt: 'You place $9$ rooks on an $8\\times 8$ chessboard. Show two rooks share a row.',
        answer: 'Pigeonhole.',
        steps: [
          '$8$ rows, $9$ rooks.',
          'By pigeonhole, two rooks occupy the same row.',
        ],
      },
      {
        prompt: 'Count the $4$-letter strings from $\\{A,B,C\\}$ that contain at least one $A$.',
        answer: '$65$.',
        steps: [
          'Total strings: $3^4=81$.',
          'Strings with no $A$: $2^4=16$.',
          'At least one $A$: $81-16=65$.',
        ],
      },
      {
        prompt: 'How many integer solutions to $x_1+x_2+x_3+x_4 = 12$ with every $x_i\\ge 0$?',
        answer: '$\\binom{15}{3}=455$.',
        steps: [
          'Stars and bars: $\\binom{n+k-1}{k-1}$ with $n=12$ and $k=4$.',
          '$\\binom{15}{3}=455$.',
        ],
      },
      {
        prompt: 'How many ways to seat $4$ couples around a round table such that each couple sits together?',
        answer: '$3! \\cdot 2^4 = 96$.',
        steps: [
          'Glue each couple into a block. $4$ blocks around a round table: $(4-1)! = 6$ arrangements.',
          'Each couple can swap internally: $2^4 = 16$.',
          'Total: $6\\cdot 16 = 96$.',
        ],
      },
      {
        prompt: 'A hash function maps items to $100$ buckets uniformly. How many items until collision probability exceeds $50\\%$?',
        answer: 'About $13$ items (by the birthday approximation $\\sqrt{2\\cdot 100\\ln 2}\\approx 11.8$).',
        steps: [
          'Birthday formula: $k\\approx\\sqrt{2m\\ln 2}$ with $m=100$ buckets.',
          '$\\sqrt{200\\cdot 0.693}\\approx 11.8$, so by $\\approx 12\\text{–}13$ items collision is over $50\\%$.',
          'This is the motivation behind the $n^{1/2}$ bound in hash-based attacks.',
        ],
      },
      {
        prompt: 'How many subsets of $\\{1,\\dots,10\\}$ contain no two consecutive integers?',
        answer: '$F_{12}=144$.',
        steps: [
          'Let $a_n$ = number of "independent" subsets of $\\{1,\\dots,n\\}$.',
          'Recurrence: $a_n = a_{n-1}+a_{n-2}$ (include $n$ or not). With $a_0=1, a_1=2$.',
          'This is Fibonacci shifted: $a_{10}=144 = F_{12}$.',
        ],
      },
      {
        prompt: 'How many strictly increasing functions $f:\\{1,\\dots,4\\}\\to\\{1,\\dots,10\\}$ exist?',
        answer: '$\\binom{10}{4}=210$.',
        steps: [
          'A strictly increasing function is determined by its image: a $4$-element subset of the codomain.',
          '$\\binom{10}{4}=210$.',
        ],
      },
    ];

    var COMB_CHALLENGE = [
      {
        prompt: 'Count the number of derangements of $5$ elements (permutations with no fixed point).',
        answer: '$D_5 = 44$.',
        steps: [
          'Formula: $D_n = n!\\sum_{k=0}^n (-1)^k/k!$.',
          '$D_5 = 120\\cdot(1-1+1/2-1/6+1/24-1/120) = 120\\cdot(44/120)=44$.',
          'Derangements show up in secret-santa probability and hashing analyses.',
        ],
      },
      {
        prompt: 'Prove $\\sum_{k=0}^n \\binom{n}{k}=2^n$ combinatorially.',
        answer: 'Both sides count subsets of $[n]$.',
        steps: [
          'LHS: pick a size $k$, then choose $k$ elements.',
          'RHS: each element independently in/out.',
          'Same count, so they are equal.',
        ],
      },
      {
        prompt: 'Use Vandermonde\'s identity to compute $\\sum_{k=0}^3 \\binom{3}{k}\\binom{5}{3-k}$.',
        answer: '$\\binom{8}{3}=56$.',
        steps: [
          'Vandermonde: $\\sum_k \\binom{m}{k}\\binom{n}{r-k}=\\binom{m+n}{r}$ with $m=3, n=5, r=3$.',
          'Result: $\\binom{8}{3}=56$.',
        ],
      },
      {
        prompt: 'Prove the pigeonhole-style bound: among any $n+1$ numbers chosen from $\\{1,2,\\dots,2n\\}$, two are coprime and two satisfy $a\\mid b$.',
        answer: 'Sketch.',
        steps: [
          'Coprime pair: consecutive integers are always chosen by pigeonhole on pairs $\\{1,2\\},\\{3,4\\},\\dots$.',
          'Divisibility pair: write each chosen number as $2^a\\cdot m$ with $m$ odd. There are $n$ odd numbers in $[1,2n]$, and $n+1$ chosen numbers — two share the same odd part $m$, so one divides the other.',
        ],
      },
      {
        prompt: 'How many ways can you tile a $2\\times n$ strip with $2\\times 1$ dominoes?',
        answer: 'The $n$-th Fibonacci number: $F_{n+1}$.',
        steps: [
          'Let $T_n$ be the count. Either place a vertical domino (leaving $T_{n-1}$) or two horizontal dominoes stacked (leaving $T_{n-2}$).',
          'Recurrence $T_n = T_{n-1}+T_{n-2}$ with $T_1=1, T_2=2$.',
          'That matches Fibonacci: $T_n = F_{n+1}$.',
        ],
      },
    ];

    PS.registerTopic("dm-combinatorics", {
      title: "Counting and combinatorics",
      description: "Permutations, combinations, inclusion-exclusion, pigeonhole, stars and bars.",
      warmup: COMB_WARMUP,
      standard: COMB_STANDARD,
      challenge: COMB_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 3: dm-graphs
    // ====================================================================
    var GRAPH_WARMUP = [
      {
        prompt: 'A graph has $10$ vertices and every vertex has degree $4$. How many edges?',
        answer: '$20$.',
        steps: [
          'Sum of degrees $=2\\cdot|E|$ (handshake lemma).',
          '$10\\cdot 4 = 40$, so $|E|=20$.',
        ],
      },
      {
        prompt: 'Can a graph have degree sequence $(3,3,3,3,1)$?',
        answer: 'No — sum of degrees is odd.',
        steps: [
          'Sum: $3+3+3+3+1=13$, which is odd.',
          'Sum of degrees must be even (twice the edge count).',
          'So no such graph exists.',
        ],
      },
      {
        prompt: 'What is the number of edges in the complete graph $K_6$?',
        answer: '$15$.',
        steps: [
          '$|E(K_n)|=\\binom{n}{2}$.',
          '$\\binom{6}{2}=15$.',
        ],
      },
      {
        prompt: 'How many edges does a tree on $100$ vertices have?',
        answer: '$99$.',
        steps: [
          'A tree on $n$ vertices has $n-1$ edges.',
          '$100-1=99$.',
        ],
      },
      {
        prompt: 'Is the graph $K_{3,3}$ planar?',
        answer: 'No.',
        steps: [
          'Kuratowski: a graph is non-planar if it contains $K_5$ or $K_{3,3}$ as a minor.',
          '$K_{3,3}$ is one of the two forbidden subgraphs — not planar.',
        ],
      },
      {
        prompt: 'Does the following graph have an Eulerian circuit? $C_5$ (cycle on $5$ vertices).',
        answer: 'Yes.',
        steps: [
          'Every vertex has degree $2$ (even).',
          'Connected and all degrees even $\\Rightarrow$ Eulerian circuit exists.',
        ],
      },
      {
        prompt: 'What is the chromatic number of $K_4$?',
        answer: '$4$.',
        steps: [
          'Every pair of vertices in $K_n$ is adjacent.',
          'Each needs its own color: $\\chi(K_n)=n$.',
        ],
      },
      {
        prompt: 'In a simple graph on $n$ vertices, what is the maximum number of edges?',
        answer: '$\\binom{n}{2}$.',
        steps: [
          'Every unordered pair contributes at most one edge.',
          'At most $\\binom{n}{2}$.',
          'Achieved by $K_n$.',
        ],
      },
      {
        prompt: 'Is a tree necessarily bipartite?',
        answer: 'Yes.',
        steps: [
          'Trees have no cycles, hence no odd cycles.',
          'A graph is bipartite iff it has no odd cycle.',
          'So every tree is bipartite.',
        ],
      },
      {
        prompt: 'What is the minimum degree that guarantees a Hamiltonian cycle by Dirac\'s theorem for a simple graph on $n\\ge 3$ vertices?',
        answer: '$\\ge n/2$.',
        steps: [
          'Dirac (1952): if every vertex has degree $\\ge n/2$, then $G$ is Hamiltonian.',
          'This is a sufficient, not necessary, condition.',
        ],
      },
      {
        prompt: 'A directed graph has $n$ vertices. How many possible directed edges (no self-loops)?',
        answer: '$n(n-1)$.',
        steps: [
          'For each ordered pair $(u,v)$ with $u\\ne v$.',
          '$n$ choices for $u$, $n-1$ for $v$.',
        ],
      },
      {
        prompt: 'A graph has $6$ vertices and $10$ edges. Is it necessarily connected?',
        answer: 'No, but it must be — $\\binom{5}{2}=10$ edges fit inside a $5$-vertex clique, leaving one isolated vertex.',
        steps: [
          'Counter-example: take $K_5$ plus an isolated vertex — $10$ edges, not connected.',
          'So the answer is no.',
        ],
      },
      {
        prompt: 'For a connected graph, does adding an edge ever disconnect it?',
        answer: 'No.',
        steps: [
          'Adding edges can only add new paths, never remove existing ones.',
          'So connectivity is preserved.',
        ],
      },
      {
        prompt: 'In a BFS starting at vertex $s$, what does the BFS tree give you?',
        answer: 'Shortest paths from $s$ in an unweighted graph.',
        steps: [
          'Each vertex is first reached on its minimum-edge-count path from $s$.',
          'The parent pointers define a tree of shortest paths.',
        ],
      },
      {
        prompt: 'If a graph is $2$-colorable, what can you say about its cycles?',
        answer: 'No odd cycles.',
        steps: [
          '$2$-colorable = bipartite.',
          'Equivalent characterization: contains no odd cycle.',
        ],
      },
    ];

    var GRAPH_STANDARD = [
      {
        prompt: 'Run Dijkstra\'s algorithm from $A$ on a graph with edges $AB=4, AC=2, BC=1, BD=5, CD=8, CE=10, DE=2$. Find shortest distances from $A$.',
        answer: '$A:0, C:2, B:3, D:5, E:7$.',
        steps: [
          'Start: $A=0$.',
          'Relax $A$: $B=4, C=2$. Pick $C$.',
          'Relax $C$: $B = \\min(4, 2+1)=3$, $D=\\min(\\infty, 2+8)=10$, $E=12$. Pick $B$.',
          'Relax $B$: $D=\\min(10, 3+5)=8$. But wait — need to re-examine path $A\\to C\\to B\\to D = 2+1+5=8$. Pick $D=8$. Hmm then from $D$ get $E=\\min(12,8+2)=10$.',
          'Correction: recompute. Final shortest distances end up $A:0, C:2, B:3, D:8, E:10$.',
        ],
      },
      {
        prompt: 'Show that a tree on $n$ vertices has exactly $n-1$ edges.',
        answer: 'Proved by induction.',
        steps: [
          'Base $n=1$: $0$ edges.',
          'Remove a leaf (a degree-$1$ vertex, which always exists in a nontrivial tree). The result is a tree on $n-1$ vertices.',
          'By induction it has $n-2$ edges; adding the leaf back gives $n-1$.',
        ],
      },
      {
        prompt: 'Let $G$ be a graph with $n=8$ vertices where every vertex has degree $\\ge 4$. Show $G$ has a Hamiltonian cycle.',
        answer: 'By Dirac\'s theorem.',
        steps: [
          'Dirac: for $n\\ge 3$, minimum degree $\\ge n/2$ implies Hamiltonian.',
          '$n/2=4$ and min degree $\\ge 4$, so $G$ is Hamiltonian.',
        ],
      },
      {
        prompt: 'Does the Königsberg graph (multigraph with degrees $5,3,3,3$) have an Eulerian circuit?',
        answer: 'No, and no Eulerian trail either (Euler 1736).',
        steps: [
          'An Eulerian circuit requires all vertex degrees even.',
          'Königsberg has four odd-degree vertices. A trail needs exactly $0$ or $2$ odd-degree vertices.',
          'So neither exists — the famous Königsberg bridge problem has no solution.',
        ],
      },
      {
        prompt: 'How many spanning trees does $K_4$ have?',
        answer: '$16$ (Cayley: $n^{n-2}=4^2=16$).',
        steps: [
          'Cayley\'s formula: $K_n$ has $n^{n-2}$ spanning trees.',
          '$n=4$: $4^2=16$.',
        ],
      },
      {
        prompt: 'Use Kruskal\'s algorithm to find a minimum spanning tree of a graph with edges (sorted): $ab=1, cd=2, bc=3, ad=4, ac=5, bd=6$.',
        answer: 'MST = $\\{ab, cd, bc\\}$ with weight $6$.',
        steps: [
          'Sort edges by weight (already sorted).',
          'Add $ab$ (weight $1$): components $\\{a,b\\},\\{c\\},\\{d\\}$.',
          'Add $cd$ (weight $2$): components $\\{a,b\\},\\{c,d\\}$.',
          'Add $bc$ (weight $3$): all connected. MST weight $=1+2+3=6$.',
        ],
      },
      {
        prompt: 'Prove: a graph $G$ is bipartite iff it has no odd cycle.',
        answer: 'Standard.',
        steps: [
          '$(\\Rightarrow)$ In a bipartition $A\\sqcup B$, a cycle alternates sides, so its length is even.',
          '$(\\Leftarrow)$ Pick any vertex $v$, $2$-color by BFS parity. A monochromatic edge would close an odd cycle — contradiction with the no-odd-cycle hypothesis.',
        ],
      },
      {
        prompt: 'A DAG has $n$ vertices. Is a topological order unique?',
        answer: 'Not in general.',
        steps: [
          'A topological order exists iff the graph is acyclic.',
          'Uniqueness requires a Hamiltonian path in the DAG.',
          'Example: $\\{a\\to c, b\\to c\\}$ has two topological orders $a,b,c$ and $b,a,c$.',
        ],
      },
      {
        prompt: 'Find the number of edges in the Petersen graph.',
        answer: '$15$.',
        steps: [
          'Petersen graph has $10$ vertices, each of degree $3$.',
          '$10\\cdot 3 / 2 = 15$ edges.',
        ],
      },
      {
        prompt: 'Show that if every vertex of a connected graph has even degree, the graph has an Eulerian circuit.',
        answer: 'Proof sketch.',
        steps: [
          'Start from any vertex and walk, never reusing an edge. You cannot get stuck anywhere but the start (each vertex has even degree, so enters/exits balance).',
          'If unused edges remain, find a vertex $v$ on the current circuit with an unused incident edge and splice a fresh sub-circuit at $v$.',
          'Repeat until all edges are used — the result is an Eulerian circuit.',
        ],
      },
      {
        prompt: 'For an undirected graph, show $2|E|=\\sum_v \\deg(v)$.',
        answer: 'Handshake lemma.',
        steps: [
          'Each edge contributes $1$ to the degree of its two endpoints.',
          'Sum of degrees counts edge-endpoints.',
          'Total endpoints $= 2|E|$.',
        ],
      },
      {
        prompt: 'On a social network graph, Dijkstra is running with edge weights = edge latencies. Will it work with negative latencies?',
        answer: 'No — Dijkstra requires non-negative edges.',
        steps: [
          'Dijkstra\'s greedy choice is valid only when extending a shortest path never decreases.',
          'Negative edges invalidate that: a later detour could become shorter.',
          'Use Bellman-Ford or Johnson\'s algorithm for negative weights.',
        ],
      },
      {
        prompt: 'A simple graph has $n$ vertices and more than $n^2/4$ edges. Must it contain a triangle?',
        answer: 'Yes (Mantel\'s theorem / Turán).',
        steps: [
          'Mantel: a triangle-free graph on $n$ vertices has at most $\\lfloor n^2/4\\rfloor$ edges.',
          'Strictly more edges forces a triangle.',
          'The extremal example is the complete bipartite graph $K_{\\lfloor n/2\\rfloor,\\lceil n/2\\rceil}$.',
        ],
      },
      {
        prompt: 'A DFS of an undirected graph classifies non-tree edges as what?',
        answer: 'Back edges only (no cross or forward edges for undirected DFS).',
        steps: [
          'In an undirected DFS forest, any non-tree edge connects a vertex to an ancestor.',
          'So every non-tree edge is a back edge.',
          'Back edges are exactly the cycle witnesses for undirected graphs.',
        ],
      },
      {
        prompt: 'What\'s the complexity of BFS on a graph with $|V|=n$, $|E|=m$ using adjacency lists?',
        answer: '$O(n+m)$.',
        steps: [
          'Each vertex is enqueued/dequeued once: $O(n)$.',
          'Each edge is scanned a constant number of times: $O(m)$.',
          'Total $O(n+m)$, the gold standard linear-time traversal.',
        ],
      },
    ];

    var GRAPH_CHALLENGE = [
      {
        prompt: 'Prove: a connected graph has an Eulerian trail (but not circuit) iff it has exactly two vertices of odd degree.',
        answer: 'Classical.',
        steps: [
          '$(\\Rightarrow)$ If an Eulerian trail exists from $u$ to $v$, every internal visit enters/exits a vertex (even contributions), but $u$ and $v$ have one unmatched incidence each, so only they are odd.',
          '$(\\Leftarrow)$ Add a phantom edge between the two odd vertices to make all degrees even. Find an Eulerian circuit and remove the phantom edge.',
        ],
      },
      {
        prompt: 'Show that a planar graph has a vertex of degree $\\le 5$.',
        answer: 'Proof via Euler\'s formula.',
        steps: [
          'Assume $G$ is simple planar with $n\\ge 3$ vertices. Then $|E|\\le 3n-6$.',
          'Sum of degrees $=2|E|\\le 6n-12$, so average degree $<6$.',
          'Hence some vertex has degree $\\le 5$.',
          'This is the backbone of the greedy $6$-coloring proof for planar graphs.',
        ],
      },
      {
        prompt: 'Prove Cayley\'s formula $\\tau(K_n)=n^{n-2}$ using any method (Prüfer sequences are natural).',
        answer: 'Via Prüfer bijection.',
        steps: [
          'Define a bijection between labeled spanning trees on $n$ vertices and sequences of length $n-2$ over $\\{1,\\dots,n\\}$.',
          'There are $n^{n-2}$ such sequences.',
          'The bijection: repeatedly remove the smallest-labeled leaf and record its neighbor.',
        ],
      },
      {
        prompt: 'Find the chromatic number of the Petersen graph.',
        answer: '$3$.',
        steps: [
          'Odd girth (shortest odd cycle) is $5$, so it is not bipartite, hence $\\chi\\ge 3$.',
          'A valid $3$-coloring exists: color the outer $5$-cycle with $3$ colors alternating $1,2,1,2,3$, then color the inner star with the remaining pattern.',
          'So $\\chi = 3$.',
        ],
      },
      {
        prompt: 'Show that in any $2$-edge-coloring of $K_6$ there is a monochromatic triangle (Ramsey number $R(3,3)=6$).',
        answer: 'Proved.',
        steps: [
          'Fix a vertex $v$. It has $5$ edges, each red or blue.',
          'By pigeonhole, at least $3$ edges share a color, say red, with neighbors $a,b,c$.',
          'If any edge among $\\{a,b,c\\}$ is red, that edge plus $v$ forms a red triangle.',
          'Otherwise all three edges are blue, forming a blue triangle.',
        ],
      },
    ];

    PS.registerTopic("dm-graphs", {
      title: "Graph theory",
      description: "Connectivity, trees, Euler/Hamilton, shortest paths, colorings.",
      warmup: GRAPH_WARMUP,
      standard: GRAPH_STANDARD,
      challenge: GRAPH_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 4: dm-numtheory
    // ====================================================================
    var NT_WARMUP = [
      {
        prompt: 'Compute $17 \\bmod 5$.',
        answer: '$2$.',
        steps: [
          '$17 = 3\\cdot 5 + 2$.',
          'Remainder is $2$.',
        ],
      },
      {
        prompt: 'Compute $\\gcd(48,18)$ using the Euclidean algorithm.',
        answer: '$6$.',
        steps: [
          '$\\gcd(48,18)=\\gcd(18, 48 \\bmod 18)=\\gcd(18,12)$.',
          '$=\\gcd(12,6)=\\gcd(6,0)=6$.',
        ],
      },
      {
        prompt: 'Is $91$ prime?',
        answer: 'No, $91 = 7\\cdot 13$.',
        steps: [
          'Try small divisors: $91/7 = 13$.',
          'So $91$ factors as $7\\cdot 13$.',
        ],
      },
      {
        prompt: 'Solve $3x \\equiv 1 \\pmod{7}$ for $x\\in\\{0,\\dots,6\\}$.',
        answer: '$x=5$.',
        steps: [
          'Check $3\\cdot 5 = 15 = 2\\cdot 7 + 1$, so $15\\equiv 1 \\pmod 7$.',
          'Hence $x=5$ is the inverse of $3$ mod $7$.',
        ],
      },
      {
        prompt: 'What is $7^0 \\bmod 11$?',
        answer: '$1$.',
        steps: [
          'Any nonzero integer to the $0$ power is $1$.',
          '$1 \\bmod 11 = 1$.',
        ],
      },
      {
        prompt: 'State Fermat\'s little theorem.',
        answer: 'If $p$ is prime and $\\gcd(a,p)=1$, then $a^{p-1}\\equiv 1\\pmod p$.',
        steps: [
          'Equivalently, $a^p\\equiv a\\pmod p$ for all integers $a$.',
          'Foundation of primality tests and RSA correctness.',
        ],
      },
      {
        prompt: 'Compute $5^{12}\\bmod 13$ using Fermat.',
        answer: '$1$.',
        steps: [
          'Fermat: $a^{p-1}\\equiv 1\\pmod p$ when $\\gcd(a,p)=1$.',
          '$5^{12}\\equiv 1\\pmod{13}$.',
        ],
      },
      {
        prompt: 'Compute $2^{10} \\bmod 1000$.',
        answer: '$24$.',
        steps: [
          '$2^{10}=1024$.',
          '$1024-1000=24$.',
        ],
      },
      {
        prompt: 'Compute $\\text{lcm}(12,18)$.',
        answer: '$36$.',
        steps: [
          '$\\text{lcm}(a,b)=ab/\\gcd(a,b)$.',
          '$\\gcd(12,18)=6$, so $\\text{lcm}=12\\cdot 18/6=36$.',
        ],
      },
      {
        prompt: 'Find the multiplicative inverse of $4$ modulo $9$.',
        answer: '$7$.',
        steps: [
          'Try $4x\\equiv 1\\pmod 9$.',
          '$4\\cdot 7=28=3\\cdot 9+1$, so $4\\cdot 7\\equiv 1\\pmod 9$.',
        ],
      },
      {
        prompt: 'Does $4$ have an inverse modulo $10$?',
        answer: 'No — $\\gcd(4,10)=2\\ne 1$.',
        steps: [
          'An element has an inverse mod $n$ iff it is coprime to $n$.',
          '$\\gcd(4,10)=2$, so no inverse.',
        ],
      },
      {
        prompt: 'What is $\\phi(12)$ (Euler totient)?',
        answer: '$4$.',
        steps: [
          'Numbers coprime to $12$ in $[1,11]$: $1,5,7,11$.',
          'That is $4$ values.',
        ],
      },
      {
        prompt: 'How many integers in $[1,100]$ are divisible by $3$ or $5$?',
        answer: '$47$.',
        steps: [
          'Divisible by $3$: $\\lfloor 100/3\\rfloor=33$.',
          'Divisible by $5$: $\\lfloor 100/5\\rfloor=20$.',
          'Divisible by $15$: $\\lfloor 100/15\\rfloor=6$.',
          'Inclusion-exclusion: $33+20-6=47$.',
        ],
      },
      {
        prompt: 'What are the divisors of $28$?',
        answer: '$1,2,4,7,14,28$.',
        steps: [
          '$28 = 2^2\\cdot 7$. Divisors are products of prime-power factors: $1, 2, 4, 7, 14, 28$.',
          '$28$ is a perfect number: $1+2+4+7+14=28$.',
        ],
      },
      {
        prompt: 'Is $561$ prime?',
        answer: 'No — $561 = 3\\cdot 11\\cdot 17$. (It is the smallest Carmichael number.)',
        steps: [
          '$561 = 3\\cdot 187 = 3\\cdot 11\\cdot 17$.',
          'A Fermat test would falsely accept $561$, which is why Miller-Rabin is used instead.',
        ],
      },
    ];

    var NT_STANDARD = [
      {
        prompt: 'Compute $3^{200}\\bmod 7$.',
        answer: '$2$.',
        steps: [
          'By Fermat, $3^6\\equiv 1\\pmod 7$.',
          '$200 = 33\\cdot 6 + 2$, so $3^{200}\\equiv 3^2 = 9\\equiv 2\\pmod 7$.',
        ],
      },
      {
        prompt: 'Find $x$ such that $5x\\equiv 2\\pmod{11}$.',
        answer: '$x\\equiv 7\\pmod{11}$.',
        steps: [
          'Inverse of $5$ mod $11$: try small values. $5\\cdot 9=45=4\\cdot 11+1$, so $5^{-1}\\equiv 9$.',
          'Multiply: $x\\equiv 9\\cdot 2=18\\equiv 7\\pmod{11}$.',
        ],
      },
      {
        prompt: 'Use the extended Euclidean algorithm to find $\\gcd(120,28)$ and Bezout coefficients.',
        answer: '$\\gcd=4$; $4=120\\cdot(-1)+28\\cdot 5$ (or similar).',
        steps: [
          '$120=28\\cdot 4+8$, $28=8\\cdot 3+4$, $8=4\\cdot 2+0$, so $\\gcd=4$.',
          'Back-substitute: $4=28-8\\cdot 3=28-(120-28\\cdot 4)\\cdot 3=28\\cdot 13-120\\cdot 3$.',
          'So $4 = 120\\cdot(-3)+28\\cdot 13$.',
        ],
      },
      {
        prompt: 'RSA-style: with $p=3, q=11$, so $n=33$ and $\\phi(n)=20$. Pick public exponent $e=7$. Find the private $d$.',
        answer: '$d=3$.',
        steps: [
          'Need $7d\\equiv 1\\pmod{20}$.',
          '$7\\cdot 3=21\\equiv 1\\pmod{20}$.',
          'So $d=3$.',
        ],
      },
      {
        prompt: 'Continuing: encrypt $m=4$ with $e=7, n=33$. What is the ciphertext?',
        answer: '$c=16$.',
        steps: [
          'Ciphertext $c = m^e \\bmod n = 4^7 \\bmod 33$.',
          '$4^2=16, 4^4=256\\equiv 256-7\\cdot 33=256-231=25, 4^6=25\\cdot 16=400\\equiv 400-12\\cdot 33=400-396=4, 4^7=4\\cdot 4=16$.',
          '$c=16$.',
        ],
      },
      {
        prompt: 'Verify RSA decryption: with $n=33, d=3$ and $c=16$, recover $m$.',
        answer: '$m=4$.',
        steps: [
          '$m = c^d \\bmod n = 16^3 \\bmod 33 = 4096 \\bmod 33$.',
          '$4096 = 124\\cdot 33 + 4$, so $m=4$. Matches the plaintext.',
        ],
      },
      {
        prompt: 'Solve the system $x\\equiv 2\\pmod 3$ and $x\\equiv 3\\pmod 5$.',
        answer: '$x\\equiv 8\\pmod{15}$.',
        steps: [
          'Try values of $x\\equiv 2\\pmod 3$: $2, 5, 8, 11, 14, \\dots$.',
          'Check mod $5$: $8\\bmod 5=3$. ',
          'By CRT, $x\\equiv 8\\pmod{15}$.',
        ],
      },
      {
        prompt: 'Using Fermat, show $13\\mid n^{13}-n$ for every integer $n$.',
        answer: 'Direct application.',
        steps: [
          'Case $\\gcd(n,13)=1$: Fermat gives $n^{12}\\equiv 1\\pmod{13}$, so $n^{13}\\equiv n$.',
          'Case $13\\mid n$: both $n$ and $n^{13}$ are $\\equiv 0$.',
          'Either way, $n^{13}-n\\equiv 0\\pmod{13}$.',
        ],
      },
      {
        prompt: 'What is the last digit of $7^{100}$?',
        answer: '$1$.',
        steps: [
          'Powers of $7$ mod $10$ cycle: $7, 9, 3, 1, 7, 9, 3, 1, \\dots$ with period $4$.',
          '$100\\bmod 4=0$, so last digit is the $4$th: $1$.',
        ],
      },
      {
        prompt: 'Compute $\\phi(100)$.',
        answer: '$40$.',
        steps: [
          '$100=2^2\\cdot 5^2$. Euler totient is multiplicative on coprime factors.',
          '$\\phi(100)=100\\cdot (1-1/2)(1-1/5) = 100\\cdot (1/2)(4/5) = 40$.',
        ],
      },
      {
        prompt: 'Is $2^{341}\\equiv 2\\pmod{341}$? What does this imply?',
        answer: 'Yes, but $341$ is composite — a Fermat pseudoprime.',
        steps: [
          '$341 = 11\\cdot 31$. It happens that $2^{341}\\equiv 2\\pmod{341}$.',
          'So the naive Fermat test would accept $341$ as prime.',
          'Moral: Miller-Rabin tightens the test to avoid these liars.',
        ],
      },
      {
        prompt: 'Show that if $p$ is prime and $p\\mid ab$, then $p\\mid a$ or $p\\mid b$ (Euclid\'s lemma).',
        answer: 'Proved.',
        steps: [
          'Suppose $p\\nmid a$. Then $\\gcd(a,p)=1$.',
          'By Bezout, $ra+sp=1$, so $rab+spb=b$.',
          '$p$ divides both terms ($p\\mid ab$ and $p\\mid sp$), so $p\\mid b$.',
        ],
      },
      {
        prompt: 'Compute $\\gcd(2^{10}, 3^5)$.',
        answer: '$1$.',
        steps: [
          '$2^{10}$ and $3^5$ have no common prime factor.',
          '$\\gcd=1$ — they are coprime.',
        ],
      },
      {
        prompt: 'How many primes are there less than $30$?',
        answer: '$10$: $2,3,5,7,11,13,17,19,23,29$.',
        steps: [
          'Sieve of Eratosthenes or direct checking.',
          'Count: $10$ primes below $30$.',
        ],
      },
      {
        prompt: 'Prove: for any prime $p$, $\\binom{p}{k}\\equiv 0\\pmod p$ for $1\\le k\\le p-1$.',
        answer: 'Proved.',
        steps: [
          '$\\binom{p}{k}=\\dfrac{p!}{k!(p-k)!}=\\dfrac{p(p-1)\\cdots(p-k+1)}{k!}$.',
          'The numerator has $p$ as a factor; the denominator is coprime to $p$ since $k<p$.',
          'Hence the whole quotient is divisible by $p$.',
          'This is the kernel of the "freshman\'s dream" $(a+b)^p\\equiv a^p+b^p\\pmod p$.',
        ],
      },
    ];

    var NT_CHALLENGE = [
      {
        prompt: 'Prove Fermat\'s little theorem: for prime $p$ and $\\gcd(a,p)=1$, $a^{p-1}\\equiv 1\\pmod p$.',
        answer: 'Proof via permutation of residues.',
        steps: [
          'The set $\\{a, 2a, 3a, \\dots, (p-1)a\\}$ modulo $p$ is a permutation of $\\{1, 2, \\dots, p-1\\}$ (since $a$ is invertible).',
          'Multiply everything: $a^{p-1}(p-1)! \\equiv (p-1)!\\pmod p$.',
          'Cancel $(p-1)!$ (invertible mod $p$): $a^{p-1}\\equiv 1$.',
        ],
      },
      {
        prompt: 'Derive the CRT: if $\\gcd(m,n)=1$, the system $x\\equiv a\\pmod m, x\\equiv b\\pmod n$ has a unique solution mod $mn$.',
        answer: 'Standard construction.',
        steps: [
          'By Bezout, find $u,v$ with $um+vn=1$.',
          'Set $x = a\\cdot vn + b\\cdot um$.',
          'Verify $x\\equiv a\\pmod m$ and $x\\equiv b\\pmod n$.',
          'Uniqueness: two solutions differ by a multiple of both $m$ and $n$, hence of $mn$.',
        ],
      },
      {
        prompt: 'Show that RSA decryption recovers the plaintext: $(m^e)^d \\equiv m \\pmod n$ when $ed\\equiv 1\\pmod{\\phi(n)}$.',
        answer: 'Proof.',
        steps: [
          '$ed = 1 + k\\phi(n)$ for some integer $k$.',
          'Case $\\gcd(m,n)=1$: $m^{ed}=m\\cdot m^{k\\phi(n)}\\equiv m\\cdot 1^k = m\\pmod n$ by Euler.',
          'Edge cases $\\gcd(m,p)\\ne 1$ are handled via CRT — the congruence still holds because $p\\mid m$ and $p\\mid m^{ed}$.',
        ],
      },
      {
        prompt: 'Prove that there are infinitely many primes of the form $4k+3$.',
        answer: 'Euclid-style argument.',
        steps: [
          'Suppose only finitely many: $p_1,\\dots,p_k$, all $\\equiv 3\\pmod 4$.',
          'Consider $N = 4p_1 p_2\\cdots p_k - 1$. Then $N\\equiv 3\\pmod 4$.',
          'Any prime factor of $N$ is odd. Not all of them can be $\\equiv 1\\pmod 4$ (product of $\\equiv 1$ primes is $\\equiv 1\\pmod 4$), so some factor is $\\equiv 3\\pmod 4$.',
          'But no $p_i$ divides $N$ (remainder $-1$). Contradiction.',
        ],
      },
      {
        prompt: 'Solve $x^2\\equiv 1\\pmod{p}$ for $p$ prime, and count solutions.',
        answer: 'Exactly two: $x\\equiv \\pm 1\\pmod p$.',
        steps: [
          '$x^2-1 = (x-1)(x+1)$. If this is divisible by prime $p$, then $p$ divides one of the factors.',
          'So $x\\equiv 1$ or $x\\equiv -1\\pmod p$.',
          'The Miller-Rabin primality test uses exactly this fact: any other square root of $1$ mod $n$ is a proof of compositeness.',
        ],
      },
    ];

    PS.registerTopic("dm-numtheory", {
      title: "Number theory",
      description: "Modular arithmetic, Euclid, Fermat, Euler, CRT, and RSA basics.",
      warmup: NT_WARMUP,
      standard: NT_STANDARD,
      challenge: NT_CHALLENGE,
    });

    return true;
  }

  // Poll for the runtime; the problem-set.js script may load after this file.
  if (!register()) {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (register() || tries > 50) clearInterval(iv);
    }, 100);
  }
})();
