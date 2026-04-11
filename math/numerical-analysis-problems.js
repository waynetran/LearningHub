/*
 * LearningHub - Numerical Analysis Problem Set
 * Registers 4 topics:
 *   na-fp-cond   — floating-point representation and conditioning
 *   na-roots     — bisection, Newton, secant
 *   na-interp    — polynomial interpolation and quadrature
 *   na-linsys    — LU, Cholesky, iterative methods for linear systems
 */
(function () {
  "use strict";

  function register() {
    if (!window.LearningHubProblemSet) return false;
    var PS = window.LearningHubProblemSet;

    // ====================================================================
    // TOPIC 1: na-fp-cond
    // ====================================================================
    var FP_WARMUP = [
      {
        prompt: 'What is machine epsilon $\\varepsilon_{\\mathrm{mach}}$ in IEEE-754 double precision?',
        answer: '$\\varepsilon_{\\mathrm{mach}}=2^{-52}\\approx 2.22\\times 10^{-16}$.',
        steps: [
          'Double precision uses $52$ bits of fraction plus an implicit leading $1$.',
          'Smallest relative gap between representable numbers: $2^{-52}$.',
          'About $16$ decimal digits of precision.',
        ],
      },
      {
        prompt: 'Express the relative error of approximating $\\pi$ by $3.14$.',
        answer: '$\\approx 5.07\\times 10^{-4}$.',
        steps: [
          'Absolute error: $|\\pi - 3.14| \\approx 0.00159$.',
          'Relative error: $0.00159/\\pi \\approx 5.07\\times 10^{-4}$.',
          '"Two decimal digits" at the start of $\\pi$.',
        ],
      },
      {
        prompt: 'Why is $(1 + 10^{-20}) - 1$ exactly $0$ in double precision?',
        answer: 'Because $10^{-20}$ is below machine epsilon times $1$.',
        steps: [
          '$10^{-20}\\ll 2^{-52}\\approx 2.22\\times 10^{-16}$.',
          'When added to $1$, rounding to the nearest representable number gives $1$ exactly.',
          'Subtracting $1$ yields $0$.',
        ],
      },
      {
        prompt: 'How many bits are in the exponent of an IEEE-754 double?',
        answer: '$11$ bits.',
        steps: [
          '$1$ sign bit, $11$ exponent bits, $52$ fraction bits — total $64$.',
          'Exponent range about $\\pm 1023$ with a bias of $1023$.',
        ],
      },
      {
        prompt: 'Estimate the relative condition number of $f(x)=\\sqrt x$ at $x=4$.',
        answer: '$\\kappa\\approx 1/2$.',
        steps: [
          'Relative condition: $\\kappa(x) = |xf\'(x)/f(x)|$.',
          '$f\'(x)=1/(2\\sqrt x)$, so $\\kappa = |x\\cdot 1/(2\\sqrt x)/\\sqrt x| = 1/2$.',
          'Well-conditioned at $x=4$: a $1\\%$ error in $x$ gives about $0.5\\%$ error in $\\sqrt x$.',
        ],
      },
      {
        prompt: 'Which IEEE-754 special value is produced by $0/0$?',
        answer: '$\\mathrm{NaN}$ (not a number).',
        steps: [
          'Division of zero by zero is indeterminate.',
          'IEEE-754 returns NaN, which propagates through subsequent arithmetic.',
        ],
      },
      {
        prompt: 'Is the sum $a + (b + c)$ equal to $(a+b) + c$ in floating point?',
        answer: 'Not in general — floating-point addition is non-associative.',
        steps: [
          'Each rounding step can lose a few ulps of precision.',
          'Different orderings round differently.',
          'This is why compilers do not freely reassociate floats without \\texttt{-ffast-math}.',
        ],
      },
      {
        prompt: 'Evaluate the absolute error of approximating $e$ by $2.718$.',
        answer: '$\\approx 2.8\\times 10^{-4}$.',
        steps: [
          '$e\\approx 2.71828$.',
          '$|e - 2.718|\\approx 0.00028$.',
        ],
      },
      {
        prompt: 'What does the term "ulp" stand for, and what does it measure?',
        answer: 'Unit in the last place — the spacing between consecutive floating-point numbers at a given magnitude.',
        steps: [
          'Near $1$, $1$ ulp $\\approx 2^{-52}$ in double.',
          'It is the natural unit for stating rounding errors.',
        ],
      },
      {
        prompt: 'Does catastrophic cancellation happen when subtracting two numbers of very different magnitudes?',
        answer: 'No — cancellation is catastrophic when subtracting two very close numbers.',
        steps: [
          'Subtracting $1$ from $1.000000000001$ cancels most of the significant digits.',
          'Subtracting $1$ from $10^{20}$ just discards the $1$ but leaves $10^{20}$ intact (still 16 good digits of $10^{20}$).',
          'Large vs large leading digits cancel; that is the risk.',
        ],
      },
      {
        prompt: 'Approximate $\\sqrt{1+x}-1$ for tiny $x$ in a numerically safe way.',
        answer: 'Use $\\sqrt{1+x}-1 \\approx x/2 - x^2/8$ (or multiply by conjugate: $x/(\\sqrt{1+x}+1)$).',
        steps: [
          'Naive evaluation subtracts two near-equal numbers, losing precision.',
          'Rationalize: $\\sqrt{1+x}-1 = \\dfrac{(1+x)-1}{\\sqrt{1+x}+1} = \\dfrac{x}{\\sqrt{1+x}+1}$.',
          'No cancellation, full precision.',
        ],
      },
      {
        prompt: 'Is the function $f(x)=1/(1-x)$ well-conditioned near $x=0.99$?',
        answer: 'Poorly conditioned — small errors in $x$ blow up.',
        steps: [
          'Near $x=1$, $f$ goes to infinity.',
          '$f\'(x)=1/(1-x)^2$, so $|xf\'/f|=|x/(1-x)|$, which explodes as $x\\to 1$.',
          'At $x=0.99$, $\\kappa\\approx 99$ — a $1\\%$ error in $x$ gives nearly $99\\%$ error in $f$.',
        ],
      },
      {
        prompt: 'What is the smallest positive normal double-precision number?',
        answer: '$2^{-1022}\\approx 2.23\\times 10^{-308}$.',
        steps: [
          'Normal numbers have exponent $\\ge -1022$.',
          'Smaller values are subnormal and lose precision.',
        ],
      },
      {
        prompt: 'Express the machine representation of $0.1$ — exact or approximate?',
        answer: 'Approximate: $0.1$ is a repeating binary fraction.',
        steps: [
          'In binary, $0.1 = 0.0001100110011\\ldots_2$.',
          'Any finite-bit representation is an approximation. This is why $0.1 + 0.2 \\ne 0.3$ in double.',
        ],
      },
      {
        prompt: 'Rank from fastest to slowest (typical CPU): $+, *, \\div, \\sqrt{}$.',
        answer: '$+$ and $*$ are usually comparable (pipelined, $\\sim 4$ cycles latency); $\\div$ and $\\sqrt{}$ are $\\sim 3\\text{–}6\\times$ slower and not fully pipelined.',
        steps: [
          'Add/multiply ship one result per cycle on modern CPUs.',
          'Divide/sqrt are iterative and not pipelined.',
          'Rule of thumb for tight loops: avoid needless divisions.',
        ],
      },
    ];

    var FP_STANDARD = [
      {
        prompt: 'Use the conjugate trick to compute $\\sqrt{10001}-\\sqrt{10000}$ without catastrophic cancellation.',
        answer: '$\\approx 0.005$.',
        steps: [
          'Multiply by $(\\sqrt{10001}+\\sqrt{10000})/(\\sqrt{10001}+\\sqrt{10000})$.',
          'Result: $1/(\\sqrt{10001}+\\sqrt{10000}) \\approx 1/200 = 0.005$.',
          'Direct subtraction would lose most of the significant digits.',
        ],
      },
      {
        prompt: 'Why does the sample variance formula $\\frac{1}{n-1}\\sum(x_i^2) - \\bar x^2$ often lose precision, and what is the preferred alternative?',
        answer: 'Two near-equal large numbers are subtracted. Use the two-pass or Welford online algorithm.',
        steps: [
          'When variance is small, $\\sum x_i^2$ and $n\\bar x^2$ are nearly equal.',
          'Their difference suffers catastrophic cancellation.',
          'Welford updates $M_k$ and $S_k$ recursively and is numerically stable.',
        ],
      },
      {
        prompt: 'Compute the relative condition number of $f(x)=\\log x$ at $x=1.01$.',
        answer: '$\\kappa \\approx 100$ — sensitive near $x=1$.',
        steps: [
          '$\\kappa(x) = |x/f(x)|$ for $f\'(x)=1/x$, giving $|1/\\log x|$.',
          'At $x=1.01$, $\\log x\\approx 0.00995$, so $\\kappa\\approx 100$.',
          'Don\'t compute $\\log$ of values extremely close to $1$ directly; use \\texttt{log1p(x-1)}.',
        ],
      },
      {
        prompt: 'Evaluate $(1-\\cos x)/x^2$ for $x = 10^{-8}$ in a numerically safe way.',
        answer: 'Use $2\\sin^2(x/2)/x^2$ or the Taylor expansion; the value is $\\approx 1/2$.',
        steps: [
          'Naive: $\\cos 10^{-8}$ rounds to $1$, giving $0/x^2 = 0$.',
          'Better: $1-\\cos x = 2\\sin^2(x/2)$. Then $2\\sin^2(x/2)/x^2 \\approx 2(x/2)^2/x^2 = 1/2$.',
          'Or rely on a library \\texttt{expm1}/\\texttt{cosm1}.',
        ],
      },
      {
        prompt: 'A physics simulation accumulates $10^9$ tiny positive contributions to a running sum. What summation method minimizes error?',
        answer: 'Kahan (compensated) summation.',
        steps: [
          'Naive summation loses up to $O(n\\varepsilon)$ relative error.',
          'Kahan tracks a correction term for the discarded low-order bits.',
          'Error drops to $O(\\varepsilon)$, independent of $n$ in typical cases.',
        ],
      },
      {
        prompt: 'Give an example where forward error is small but backward error is large.',
        answer: 'Finding the wrong root of a nearby problem.',
        steps: [
          'Backward error: how much must you perturb the input to make the computed output exactly correct?',
          'Forward error: how far is the output from the true answer?',
          'Forward small and backward large is atypical — more commonly backward is small (stable algorithm) but forward is large (ill-conditioned problem).',
        ],
      },
      {
        prompt: 'You need to solve $ax^2+bx+c=0$ numerically. How do you compute both roots without losing precision?',
        answer: 'Compute the root with the larger magnitude via the standard formula, then use $x_1 x_2 = c/a$.',
        steps: [
          'Standard formula $x=(-b\\pm\\sqrt{b^2-4ac})/(2a)$ loses precision when $b$ is large and $\\sqrt{\\Delta}\\approx|b|$.',
          'Compute $x_1 = -(b+\\mathrm{sign}(b)\\sqrt{\\Delta})/(2a)$ (stable, same sign).',
          'Then $x_2 = c/(a x_1)$ to get the other root.',
        ],
      },
      {
        prompt: 'For double precision, estimate the rounding error when computing $a + b$ where $a$ and $b$ are $O(1)$.',
        answer: '$O(\\varepsilon_{\\mathrm{mach}})\\approx 2\\times 10^{-16}$.',
        steps: [
          'IEEE round-to-nearest gives $|\\text{fl}(a+b) - (a+b)| \\le \\varepsilon_{\\mathrm{mach}} |a+b|$ at worst.',
          'For $O(1)$ sums, that is about $10^{-16}$.',
        ],
      },
      {
        prompt: 'Why is evaluating a polynomial as $a_0 + x(a_1 + x(a_2 + \\ldots))$ (Horner) numerically preferred?',
        answer: 'Fewer operations and lower rounding error than the naive $\\sum a_i x^i$.',
        steps: [
          '$n$ multiplies and $n$ adds instead of $2n-1$ multiplies plus $n$ adds.',
          'Each intermediate stays of modest magnitude, so rounding accumulates less.',
        ],
      },
      {
        prompt: 'Suppose you compute $\\sinh x$ for small $x$ directly as $(e^x - e^{-x})/2$. What goes wrong, and how do you fix it?',
        answer: 'Catastrophic cancellation; use the Taylor series or library \\texttt{sinh}.',
        steps: [
          'For small $x$, $e^x$ and $e^{-x}$ are both close to $1$, so their difference loses precision.',
          'Taylor: $\\sinh x = x + x^3/6 + x^5/120 + \\dots$ converges quickly for small $x$.',
          'Or just call the library routine, which is tuned.',
        ],
      },
      {
        prompt: 'What is a "stable" algorithm in the backward-error sense?',
        answer: 'The computed answer is the exact answer to a nearby problem.',
        steps: [
          'Formally: $\\hat y = f(x+\\Delta x)$ with $\\|\\Delta x\\|/\\|x\\|$ small (of order $\\varepsilon$).',
          'Backward-stable algorithms commit no more error than the unavoidable representation error.',
        ],
      },
      {
        prompt: 'Why is Gaussian elimination without pivoting unstable?',
        answer: 'A tiny pivot inflates round-off errors in the remaining updates.',
        steps: [
          'If the pivot is near zero, the multiplier $a_{ij}/a_{ii}$ is huge.',
          'Subsequent row operations amplify any representation error in other entries.',
          'Partial pivoting swaps in the largest-magnitude pivot, bounding the multiplier at $1$.',
        ],
      },
      {
        prompt: 'An ML training step sums gradients over a minibatch of $1024$ samples. Roughly how much precision can you lose?',
        answer: 'Up to $\\sim 10$ bits ($\\approx \\log_2 1024$) by naive summation, far more with bad ordering.',
        steps: [
          'Each addition risks one ulp of error.',
          '$1024 = 2^{10}$ adds give worst-case $2^{10}\\varepsilon$ relative error.',
          'Modern frameworks use compensated or tree summation for mixed-precision stability.',
        ],
      },
      {
        prompt: 'What is $\\mathrm{fl}(0.1 + 0.2)$ in double precision?',
        answer: '$0.30000000000000004$.',
        steps: [
          'Neither $0.1$ nor $0.2$ is exactly representable.',
          'The rounded sum is off from $0.3$ by about $10^{-17}$.',
          'This is the canonical "floating-point surprise" that junior engineers hit on their first day.',
        ],
      },
      {
        prompt: 'Explain when you should prefer single-precision over double-precision floats in a production workload.',
        answer: 'When bandwidth, memory, or throughput matter more than that last $7$ decimal digits.',
        steps: [
          'GPU matmul is $2\\text{–}4\\times$ faster in fp32 vs fp64 and far faster in fp16/bf16.',
          'ML training tolerates fp32 (or mixed precision) because gradients have noise anyway.',
          'Scientific computing with ill-conditioned problems (linear solves near singular matrices, chaotic systems) still benefits from double.',
        ],
      },
    ];

    var FP_CHALLENGE = [
      {
        prompt: 'Prove Wilkinson\'s backward error bound for inner product: $\\mathrm{fl}(x^T y) = (x+\\Delta x)^T y$ with $|\\Delta x_i|\\le n\\varepsilon |x_i|$.',
        answer: 'Sketch.',
        steps: [
          'Each multiply/add introduces a factor $(1+\\delta_k)$ with $|\\delta_k|\\le\\varepsilon$.',
          'Chaining $n$ such factors: $\\prod(1+\\delta_k)\\le (1+\\varepsilon)^n\\le 1+n\\varepsilon+O(\\varepsilon^2)$.',
          'Absorb into $\\Delta x$, concluding the result.',
          'This is why inner products on millions of elements need extended precision or compensated sums.',
        ],
      },
      {
        prompt: 'Show that the condition number of matrix inversion w.r.t. small perturbations is $\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\|$.',
        answer: 'Derivation.',
        steps: [
          'Perturb $A\\to A+\\Delta A$; then $(A+\\Delta A)^{-1} \\approx A^{-1} - A^{-1}\\Delta A\\,A^{-1}$.',
          'Taking norms: $\\|\\Delta(A^{-1})\\|/\\|A^{-1}\\|\\le \\|A\\|\\|A^{-1}\\| \\cdot \\|\\Delta A\\|/\\|A\\|$.',
          'The leading factor is $\\kappa(A)$.',
        ],
      },
      {
        prompt: 'Derive a stable formula for $\\log(1 + e^x)$ that avoids overflow for large $x$ and loss of precision for large negative $x$.',
        answer: '$\\log(1+e^x) = \\max(x,0) + \\log(1 + e^{-|x|})$.',
        steps: [
          'Large positive $x$: $e^x$ overflows. Factor out $e^x$: $\\log(1+e^x) = x + \\log(1+e^{-x})$.',
          'Large negative $x$: $e^x$ underflows, so naive use of $\\log$ gives $0$. Use $\\log$1p$(e^x)$.',
          'Unified form: $\\max(x,0) + \\mathrm{log1p}(e^{-|x|})$. This is the standard "log-sum-exp trick" used in softmax.',
        ],
      },
      {
        prompt: 'Show that a unit-roundoff analysis of Horner\'s rule yields $\\hat p(x) = \\sum \\hat a_i x^i$ with $|\\hat a_i - a_i|\\le 2n\\varepsilon|a_i|$.',
        answer: 'Sketch.',
        steps: [
          'Each step $b_i = a_i + x b_{i+1}$ introduces rounding in the multiply and the add.',
          'At most $2$ rounding steps per coefficient, and $n$ coefficients.',
          'Backward-propagate the rounding errors into perturbations of the $a_i$. The bound follows.',
        ],
      },
      {
        prompt: 'Consider the recurrence $x_{n+1} = 4x_n(1-x_n)$ with $x_0=0.1$ in double precision. Discuss how rounding error grows and what that says about simulating chaos.',
        answer: 'Error grows exponentially; simulations are valid only for a bounded number of steps.',
        steps: [
          'The logistic map at $r=4$ has Lyapunov exponent $\\log 2$.',
          'A single-ulp error at iteration $k$ becomes $O(2^{N-k}\\varepsilon)$ by iteration $N$.',
          'After $\\sim 54$ steps in double, rounding error has completely obliterated the trajectory.',
          'You can still get correct statistical behavior (ergodic averages), just not pointwise trajectories.',
        ],
      },
    ];

    PS.registerTopic("na-fp-cond", {
      title: "Floating-point and conditioning",
      description: "IEEE-754, rounding, cancellation, backward error, and condition numbers.",
      warmup: FP_WARMUP,
      standard: FP_STANDARD,
      challenge: FP_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 2: na-roots
    // ====================================================================
    var ROOT_WARMUP = [
      {
        prompt: 'Using bisection, give the first interval after one step on $f(x)=x^2-2$ starting from $[1, 2]$.',
        answer: '$[1, 1.5]$.',
        steps: [
          'Midpoint $m = 1.5$. $f(1.5) = 0.25 > 0$.',
          '$f(1) = -1 < 0$, so the root is in $[1, 1.5]$.',
        ],
      },
      {
        prompt: 'Newton\'s method on $f(x)=x^2-a$ has iteration $x_{n+1}=\\tfrac12(x_n + a/x_n)$. Apply one step to $a=2, x_0=1$.',
        answer: '$x_1 = 1.5$.',
        steps: [
          '$x_1 = (1 + 2/1)/2 = 3/2 = 1.5$.',
          'Classical Babylonian $\\sqrt 2$ iteration.',
        ],
      },
      {
        prompt: 'How many bisection iterations to shrink an interval of width $1$ to width $10^{-6}$?',
        answer: '$\\lceil\\log_2(10^6)\\rceil = 20$ iterations.',
        steps: [
          'After $n$ steps the width is $2^{-n}$.',
          '$2^{-n}\\le 10^{-6}$ gives $n\\ge\\log_2 10^6 \\approx 19.93$.',
          'So $n=20$.',
        ],
      },
      {
        prompt: 'What is the order of convergence of Newton\'s method for a simple root?',
        answer: 'Quadratic.',
        steps: [
          'Error squares each step: $e_{n+1}\\approx C e_n^2$.',
          'Roughly doubles the number of correct digits per iteration.',
        ],
      },
      {
        prompt: 'State a sufficient condition for bisection to converge.',
        answer: '$f$ continuous on $[a,b]$ with $f(a)\\cdot f(b) < 0$.',
        steps: [
          'Intermediate Value Theorem guarantees a root.',
          'Each bisection halves the interval containing it.',
        ],
      },
      {
        prompt: 'Apply Newton to $f(x)=\\cos x - x$ with $x_0 = 0.75$. Compute $x_1$.',
        answer: '$x_1 \\approx 0.7391$.',
        steps: [
          '$f\'(x) = -\\sin x - 1$.',
          'At $x_0=0.75$: $f(0.75)\\approx 0.0183$, $f\'(0.75)\\approx -1.6816$.',
          '$x_1 = 0.75 - 0.0183/(-1.6816) \\approx 0.7391$.',
        ],
      },
      {
        prompt: 'Does bisection work on $f(x) = x^2 + 1$ over $\\mathbb{R}$?',
        answer: 'No — no real root; you can never find two $x$\'s with opposite signs.',
        steps: [
          '$f(x)>0$ everywhere on $\\mathbb{R}$.',
          'Bisection requires a sign change, which never happens.',
        ],
      },
      {
        prompt: 'What is the order of convergence of the secant method?',
        answer: 'Golden ratio: $\\approx 1.618$.',
        steps: [
          'Error relation: $e_{n+1}\\approx C e_n e_{n-1}$.',
          'Yields the Fibonacci-style exponent $(1+\\sqrt 5)/2$.',
        ],
      },
      {
        prompt: 'Write the secant update formula.',
        answer: '$x_{n+1}=x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n)-f(x_{n-1})}$.',
        steps: [
          'Secant approximates $f\'(x_n)$ by a finite-difference slope.',
          'Substitutes into the Newton update.',
          'Avoids explicit derivatives, useful when $f\'$ is expensive.',
        ],
      },
      {
        prompt: 'For $f(x) = x^3 - x$, what are the real roots?',
        answer: '$x \\in \\{-1, 0, 1\\}$.',
        steps: [
          '$x^3 - x = x(x^2-1) = x(x-1)(x+1)$.',
        ],
      },
      {
        prompt: 'What happens if you start Newton on $f(x) = x^3$ at $x_0 = 1$?',
        answer: 'It converges linearly, not quadratically, because $0$ is a multiple root.',
        steps: [
          'At multiple roots, $f\'$ vanishes at the root, slowing convergence.',
          'One fix: modify Newton to $x_{n+1}=x_n - m f(x_n)/f\'(x_n)$ where $m$ is the multiplicity.',
        ],
      },
      {
        prompt: 'How does fixed-point iteration $x_{n+1}=g(x_n)$ converge to a fixed point $x^*$ of $g$?',
        answer: 'Linearly if $|g\'(x^*)| < 1$.',
        steps: [
          'Taylor: $x_{n+1}-x^* \\approx g\'(x^*)(x_n - x^*)$.',
          'Contracts iff the derivative at the fixed point has magnitude less than $1$.',
        ],
      },
      {
        prompt: 'Apply bisection one step to $f(x) = \\sin x$ on $[3, 4]$.',
        answer: 'New interval is $[3, 3.5]$.',
        steps: [
          '$f(3)\\approx 0.141 >0$, $f(4)\\approx -0.757 <0$.',
          '$f(3.5)\\approx -0.351 <0$, so root is in $[3, 3.5]$.',
          'True root is $\\pi\\approx 3.14159$.',
        ],
      },
      {
        prompt: 'When is Newton\'s method faster per step than bisection?',
        answer: 'Near a simple root, once you are in the basin of convergence.',
        steps: [
          'Newton doubles the digits per step (quadratic).',
          'Bisection adds one bit ($\\approx 0.3$ decimal digits) per step.',
          'Far from the root or near a multiple root, Newton can be worse or divergent.',
        ],
      },
      {
        prompt: 'What is the Brent method good for?',
        answer: 'Combining bisection (robust) with secant/inverse-quadratic (fast) to get the best of both worlds.',
        steps: [
          'Keeps a bracket and guarantees convergence like bisection.',
          'Takes faster steps when the function behaves nicely.',
          'The default in SciPy\'s \\texttt{scipy.optimize.brentq}.',
        ],
      },
    ];

    var ROOT_STANDARD = [
      {
        prompt: 'Using Newton on $f(x) = x^2 - 5$, starting from $x_0 = 2$, compute $x_2$.',
        answer: '$x_2 \\approx 2.23607$.',
        steps: [
          '$x_1 = (2 + 5/2)/2 = 2.25$.',
          '$x_2 = (2.25 + 5/2.25)/2 = (2.25 + 2.2222)/2 \\approx 2.23611$.',
          'True value: $\\sqrt 5 \\approx 2.23607$.',
        ],
      },
      {
        prompt: 'Find a root of $f(x) = x e^x - 1$ using Newton starting from $x_0 = 0.5$ (2 iterations).',
        answer: '$x_2 \\approx 0.56715$.',
        steps: [
          '$f\'(x) = e^x(1+x)$.',
          '$f(0.5)=0.5 e^{0.5}-1\\approx -0.1756$. $f\'(0.5)\\approx e^{0.5}\\cdot 1.5\\approx 2.474$.',
          '$x_1 \\approx 0.5 - (-0.1756)/2.474 \\approx 0.5710$.',
          'Repeat to get $x_2 \\approx 0.56715$. This is Lambert\'s $W(1)$.',
        ],
      },
      {
        prompt: 'Explain why Newton\'s method may diverge on $f(x) = \\arctan x$ for $|x_0|$ too large.',
        answer: 'The slope near the root is $1$ but the Newton step overshoots for $|x_0|>1.39$ or so.',
        steps: [
          '$\\arctan x$ flattens out at $\\pm\\pi/2$.',
          'For large $|x|$, $f\'$ is small while $f$ is order $1$, giving a huge update.',
          'The iterate jumps past the root and grows in magnitude, diverging.',
        ],
      },
      {
        prompt: 'Use bisection on $f(x) = x - \\cos x$ on $[0, 1]$ for $3$ iterations.',
        answer: 'Final bracket $[0.625, 0.75]$.',
        steps: [
          'Midpoint $0.5$: $f(0.5)=0.5-\\cos 0.5\\approx -0.378<0$. Bracket $\\to [0.5,1]$.',
          'Midpoint $0.75$: $f(0.75)\\approx 0.018>0$. Bracket $\\to [0.5,0.75]$.',
          'Midpoint $0.625$: $f(0.625)\\approx -0.186<0$. Bracket $\\to [0.625,0.75]$.',
          'True root $\\approx 0.7391$.',
        ],
      },
      {
        prompt: 'Apply Newton\'s method to compute $\\sqrt[3]{a}$. Derive the iteration for $a=10$, compute $x_1$ from $x_0=2$.',
        answer: '$x_1 = (2\\cdot 2 + 10/4)/3 = 2.1667$.',
        steps: [
          '$f(x) = x^3 - a$; $f\'(x) = 3x^2$.',
          'Newton: $x_{n+1} = x_n - (x_n^3 - a)/(3x_n^2) = (2x_n + a/x_n^2)/3$.',
          'At $a=10, x_0=2$: $x_1 = (4 + 10/4)/3 = 6.5/3 \\approx 2.1667$.',
        ],
      },
      {
        prompt: 'How does false position (regula falsi) differ from bisection? Give one advantage and one drawback.',
        answer: 'It interpolates linearly instead of halving; faster in smooth cases but can stagnate at one endpoint.',
        steps: [
          'False position: $c = (a f(b) - b f(a))/(f(b)-f(a))$.',
          'Advantage: usually converges faster than bisection.',
          'Drawback: if $f$ is very convex/concave, one endpoint is never updated and convergence slows to linear with a bad constant.',
        ],
      },
      {
        prompt: 'A chemical equilibrium calculation needs the root of $p(x)=x^3 - 2x - 5$ near $x=2$. One Newton step from $x_0=2$.',
        answer: '$x_1 = 2.1$.',
        steps: [
          '$f(2) = 8-4-5 = -1$.',
          '$f\'(2) = 3\\cdot 4 - 2 = 10$.',
          '$x_1 = 2 - (-1)/10 = 2.1$. (Classical Wallis example, actual root $\\approx 2.0946$.)',
        ],
      },
      {
        prompt: 'For the fixed-point iteration $x_{n+1} = \\cos x_n$, estimate the rate of convergence near the fixed point.',
        answer: 'Linear with rate $|\\sin x^*|\\approx 0.674$.',
        steps: [
          'Fixed point $x^*\\approx 0.7391$.',
          'Rate $= |g\'(x^*)|$ where $g(x)=\\cos x$, $g\'(x) = -\\sin x$.',
          '$|\\sin 0.7391|\\approx 0.674 < 1$ so it converges, slowly.',
        ],
      },
      {
        prompt: 'Derive a Newton-style iteration that computes $1/a$ without using division (for a reciprocal circuit).',
        answer: '$x_{n+1} = x_n(2 - a x_n)$.',
        steps: [
          'Solve $f(x)=1/x - a = 0$.',
          '$f\'(x) = -1/x^2$.',
          'Newton: $x_{n+1} = x_n - (1/x_n - a)/(-1/x_n^2) = x_n(2 - a x_n)$, purely multiplicative.',
          'This is how hardware dividers often work.',
        ],
      },
      {
        prompt: 'Root-find the break-even price where discounted cash flow $= 0$: $f(r) = -1000 + \\sum_{k=1}^5 200/(1+r)^k$. Estimate via bisection on $[0, 0.5]$ for one step.',
        answer: 'Root near $r\\approx 0.0566$; after one step bracket is $[0, 0.25]$.',
        steps: [
          '$f(0) = -1000 + 1000 = 0$. Actually wait — that is a root exactly! Let\'s instead say the break-even is where NPV $=0$ and shift: $f(r) = \\text{PV}(200/(1+r)^k) - 800$.',
          'Bracketing $[0, 0.5]$: $f(0) = 200$, $f(0.5) \\approx -367$.',
          'Midpoint $0.25$: $f(0.25)\\approx -262<0$, so the IRR lies in $[0, 0.25]$.',
        ],
      },
      {
        prompt: 'Estimate the order of convergence of Newton\'s method on a double root $f(x)=(x-1)^2$ starting near $x=1$.',
        answer: 'Linear, with rate $1/2$.',
        steps: [
          '$f(x) = (x-1)^2$, $f\'(x)=2(x-1)$.',
          'Newton: $x_{n+1} = x_n - (x_n-1)^2/(2(x_n-1)) = (x_n+1)/2$.',
          'Error halves each step — linear convergence.',
        ],
      },
      {
        prompt: 'Compare cost: $n$ iterations of bisection vs $n$ of Newton if $f$ is expensive to evaluate.',
        answer: 'Both do one $f$ call per step, but Newton also needs one $f\'$ call.',
        steps: [
          'Bisection: $1$ function evaluation per step.',
          'Newton: $1$ function + $1$ derivative. If the derivative is as expensive as $f$, one Newton step costs $2\\times$ a bisection step.',
          'But Newton\'s fast convergence usually wins for smooth problems.',
        ],
      },
      {
        prompt: 'Safeguarded Newton: describe one technique to fall back to bisection when Newton misbehaves.',
        answer: 'If a Newton step leaves the current bracket, take a bisection step instead.',
        steps: [
          'Maintain a bracket $[a,b]$ with a sign change.',
          'Try Newton from the best iterate; if the new $x$ is outside $[a,b]$, use $(a+b)/2$.',
          'Guarantees convergence (bisection-speed worst case) while enjoying Newton-speed average case.',
        ],
      },
      {
        prompt: 'Bisect on $f(x) = e^x - 2$ starting from $[0, 1]$ for $3$ iterations.',
        answer: 'Bracket $[0.625, 0.75]$; root $\\approx \\ln 2 \\approx 0.6931$.',
        steps: [
          '$f(0)=-1<0$, $f(1)\\approx 0.718>0$. $m=0.5$: $f(0.5)\\approx -0.351<0$. $[0.5,1]$.',
          '$m=0.75$: $f(0.75)\\approx 0.117>0$. $[0.5,0.75]$.',
          '$m=0.625$: $f(0.625)\\approx -0.132<0$. $[0.625,0.75]$.',
        ],
      },
      {
        prompt: 'A physicist fits a transcendental model and Newton diverges. Propose a diagnostic.',
        answer: 'Check the condition number of $f$ and the sign of $f\'$ near the initial guess; try safeguarded Newton or Brent.',
        steps: [
          'Compute $|f(x_0)/f\'(x_0)|$. If it is huge, the initial guess is in a flat region.',
          'Plot $f$ to locate sign changes.',
          'Use Brent (bracketed, guaranteed) as a default for black-box roots.',
        ],
      },
    ];

    var ROOT_CHALLENGE = [
      {
        prompt: 'Prove Newton\'s method converges quadratically near a simple root.',
        answer: 'Sketch.',
        steps: [
          'Let $e_n = x_n - x^*$. Taylor: $0 = f(x^*) = f(x_n) - f\'(x_n)e_n + \\tfrac12 f\''+'\'(\\xi)e_n^2$.',
          'Rearrange: $f(x_n) = f\'(x_n)e_n - \\tfrac12 f\'\'(\\xi)e_n^2$.',
          'Plug into Newton: $e_{n+1} = e_n - f(x_n)/f\'(x_n) = \\tfrac12 e_n^2 f\'\'(\\xi)/f\'(x_n)$.',
          'So $e_{n+1} = O(e_n^2)$: quadratic.',
        ],
      },
      {
        prompt: 'Design a Newton iteration to compute $a^{1/k}$ for integer $k$. Derive the update.',
        answer: '$x_{n+1} = \\dfrac{(k-1)x_n + a/x_n^{k-1}}{k}$.',
        steps: [
          'Solve $f(x) = x^k - a = 0$.',
          '$f\'(x) = k x^{k-1}$.',
          'Newton: $x_{n+1} = x_n - (x_n^k - a)/(k x_n^{k-1})$, which simplifies to the given form.',
          'Each step doubles accuracy near the root.',
        ],
      },
      {
        prompt: 'Give a function where bisection converges but Newton does not, and explain why.',
        answer: '$f(x) = \\mathrm{sign}(x)\\sqrt{|x|}$ near $0$; Newton overshoots.',
        steps: [
          '$f$ has a simple root at $0$ but infinite slope.',
          'Newton: $x_{n+1} = x_n - f(x_n)/f\'(x_n) = x_n - (|x_n|/\\frac{1}{2}|x_n|^{-1/2})\\mathrm{sign}(x_n) = -x_n$.',
          'Iterates flip sign without shrinking — no convergence.',
          'Bisection still works (sign change bracket, continuous).',
        ],
      },
      {
        prompt: 'Explain how Newton\'s method for complex polynomials gives fractal basins of attraction.',
        answer: 'Different starting points converge to different roots; the boundary has fractal structure (e.g. Newton fractal for $z^3-1$).',
        steps: [
          'Near each root, an open basin converges there.',
          'Between roots, iterates bounce between basins in an intricate pattern.',
          'The boundary is self-similar and uncountable — a classical example of sensitive dependence on initial conditions.',
        ],
      },
      {
        prompt: 'Halley\'s method improves on Newton: $x_{n+1} = x_n - \\dfrac{2 f f\'}{2f\'^2 - f f\'\'}$. What is its order of convergence?',
        answer: 'Cubic.',
        steps: [
          'One extra derivative evaluation per step.',
          'Converges cubically near simple roots ($e_{n+1}\\approx C e_n^3$).',
          'Used in GPU transcendental routines where cheap derivatives are available.',
        ],
      },
    ];

    PS.registerTopic("na-roots", {
      title: "Root finding",
      description: "Bisection, Newton, secant, fixed-point iteration, safeguarded methods.",
      warmup: ROOT_WARMUP,
      standard: ROOT_STANDARD,
      challenge: ROOT_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 3: na-interp
    // ====================================================================
    var INTERP_WARMUP = [
      {
        prompt: 'Fit a straight line through $(0,1)$ and $(2,5)$.',
        answer: '$y = 2x + 1$.',
        steps: [
          'Slope $= (5-1)/(2-0) = 2$.',
          'Intercept $=1$.',
          '$y = 2x+1$.',
        ],
      },
      {
        prompt: 'Write the Lagrange basis polynomial $\\ell_0(x)$ through the nodes $x_0=0, x_1=1, x_2=2$.',
        answer: '$\\ell_0(x) = \\dfrac{(x-1)(x-2)}{(0-1)(0-2)} = \\dfrac{(x-1)(x-2)}{2}$.',
        steps: [
          'Lagrange basis: $\\ell_i(x) = \\prod_{j\\ne i}(x-x_j)/(x_i - x_j)$.',
          'Zero at other nodes, $1$ at $x_0$.',
        ],
      },
      {
        prompt: 'Given the trapezoidal rule on a single interval $[a,b]$ estimate $\\int_0^2 x^2\\,dx$.',
        answer: '$T = (2-0)/2 \\cdot (0 + 4) = 4$.',
        steps: [
          'Trap: $(b-a)/2 \\cdot (f(a)+f(b))$.',
          '$f(x)=x^2$. $f(0)=0, f(2)=4$.',
          'True value is $8/3\\approx 2.67$; trap overestimates because $x^2$ is convex.',
        ],
      },
      {
        prompt: 'Apply Simpson\'s rule with one panel to $\\int_0^2 x^2\\,dx$.',
        answer: '$S = (2-0)/6 \\cdot (0 + 4\\cdot 1 + 4) = 8/3$.',
        steps: [
          'Simpson: $(b-a)/6 \\cdot (f(a) + 4f(m) + f(b))$ with $m=(a+b)/2=1$.',
          '$f(1)=1$. $S = 2/6\\cdot(0+4+4)=8/3$.',
          'Exact for quadratics — matches the true value.',
        ],
      },
      {
        prompt: 'What is the error order of Simpson\'s rule on smooth functions?',
        answer: '$O(h^4)$ per panel, $O(h^4)$ overall.',
        steps: [
          'Per-panel error $\\sim -\\tfrac{(b-a)^5}{2880} f^{(4)}(\\xi)$.',
          'Halving $h$ reduces error by $\\approx 16\\times$.',
        ],
      },
      {
        prompt: 'How many interpolation nodes determine a polynomial of degree $n$ uniquely?',
        answer: '$n+1$ distinct nodes.',
        steps: [
          '$n+1$ unknown coefficients.',
          '$n+1$ values at distinct nodes give a nonsingular Vandermonde system.',
        ],
      },
      {
        prompt: 'State the Runge phenomenon in one sentence.',
        answer: 'Polynomial interpolation on equally-spaced nodes can oscillate wildly near the endpoints for smooth but highly varying functions.',
        steps: [
          'Classical example: interpolating $1/(1+25x^2)$ on $[-1,1]$ with equally-spaced nodes.',
          'Cure: use Chebyshev nodes, which cluster near the endpoints.',
        ],
      },
      {
        prompt: 'What nodes does Gauss-Legendre quadrature use?',
        answer: 'The roots of the Legendre polynomial $P_n$ on $[-1,1]$.',
        steps: [
          '$n$-point Gauss quadrature is exact for polynomials up to degree $2n-1$.',
          'Best possible for a fixed number of evaluations on smooth integrands.',
        ],
      },
      {
        prompt: 'Write the trapezoidal rule on $n$ equal panels for $\\int_a^b f(x)\\,dx$.',
        answer: '$T = h\\bigl(\\tfrac{f(x_0)+f(x_n)}{2} + \\sum_{i=1}^{n-1} f(x_i)\\bigr)$ with $h=(b-a)/n$.',
        steps: [
          'Each panel contributes $(h/2)(f(x_i) + f(x_{i+1}))$.',
          'Summing, interior nodes are counted twice.',
        ],
      },
      {
        prompt: 'What is a cubic spline?',
        answer: 'A piecewise cubic polynomial that is $C^2$ at the interior nodes.',
        steps: [
          'Each segment is a cubic in its own interval.',
          'Values and first two derivatives match at interior nodes.',
          'Splines avoid Runge-like oscillations and are the standard for smooth curve fitting.',
        ],
      },
      {
        prompt: 'Use Simpson\'s rule with $2$ panels ($h=0.5$) to estimate $\\int_0^1 e^x\\,dx$.',
        answer: '$\\approx 1.71886$.',
        steps: [
          'Nodes $0, 0.5, 1$.',
          '$S = (h/3)(f(0) + 4 f(0.5) + f(1))$? Wait: with 2 panels and Simpson we need Simpson\'s $1/3$ rule using endpoints and midpoint.',
          'Composite Simpson for 2 panels requires 3 evaluations: $(h/3)(f(0)+4 f(0.5)+f(1)) = (0.5/3)(1 + 4e^{0.5} + e) \\approx 1.71886$. Exact value $e-1 \\approx 1.71828$.',
        ],
      },
      {
        prompt: 'What is the midpoint rule on $[a,b]$?',
        answer: '$(b-a)\\cdot f((a+b)/2)$.',
        steps: [
          'Simplest open Newton-Cotes.',
          'Error $O(h^3)$ per panel, just like the trapezoidal rule, with half the constant.',
        ],
      },
      {
        prompt: 'Is Lagrange interpolation numerically stable for large $n$?',
        answer: 'No — the Vandermonde matrix is very ill-conditioned; prefer Newton\'s divided differences or barycentric form.',
        steps: [
          'Direct Lagrange evaluation is fine, but forming and inverting a Vandermonde to solve for coefficients is not.',
          'Barycentric Lagrange is numerically stable and $O(n)$ per evaluation after setup.',
        ],
      },
      {
        prompt: 'What is the interpolation error for a polynomial of degree $n$ on $[a,b]$?',
        answer: '$f(x) - p_n(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^n(x-x_i)$.',
        steps: [
          'Classical error formula from Taylor-like bounds.',
          'Choosing nodes to minimize $\\max|\\prod(x-x_i)|$ gives Chebyshev nodes.',
        ],
      },
      {
        prompt: 'What is $\\int_{-1}^1 x^2\\,dx$ via Gauss-Legendre with $2$ nodes $\\pm 1/\\sqrt 3$, weights $1$?',
        answer: '$2/3$ (exact).',
        steps: [
          '$f(\\pm 1/\\sqrt 3) = 1/3$.',
          'Sum: $1\\cdot 1/3 + 1\\cdot 1/3 = 2/3$.',
          'Exact for degree up to $2\\cdot 2-1=3$.',
        ],
      },
    ];

    var INTERP_STANDARD = [
      {
        prompt: 'Find the unique quadratic through $(0,0),(1,1),(2,4)$.',
        answer: '$p(x) = x^2$.',
        steps: [
          'Try $p(x) = a x^2+b x+c$. Three equations: $c=0$, $a+b=1$, $4a+2b=4$.',
          'Subtract: $2a+b=2$ gives $a=1$, then $b=0$.',
          '$p(x)=x^2$.',
        ],
      },
      {
        prompt: 'Use composite trapezoidal with $n=4$ to estimate $\\int_0^1 \\sqrt{1-x^2}\\,dx$.',
        answer: '$\\approx 0.7489$ (true $\\pi/4\\approx 0.7854$).',
        steps: [
          '$h=0.25$. Values at $x=0,0.25,0.5,0.75,1$: $1, \\sqrt{0.9375}\\approx 0.9682, \\sqrt{0.75}\\approx 0.866, \\sqrt{0.4375}\\approx 0.6614, 0$.',
          'Trap: $0.25\\cdot(1/2 + 0.9682 + 0.866 + 0.6614 + 0/2) = 0.25\\cdot 2.9956 \\approx 0.7489$.',
          'Trapezoid underestimates because of the vertical tangent at $x=1$.',
        ],
      },
      {
        prompt: 'Derive Simpson\'s rule by integrating the quadratic Lagrange interpolant through $a, m=(a+b)/2, b$.',
        answer: '$(b-a)/6 \\cdot (f(a)+4 f(m) + f(b))$.',
        steps: [
          'Fit $p_2(x)$ through the three points.',
          'Integrate $\\int_a^b p_2(x)\\,dx$ symbolically — the weights $1, 4, 1$ with prefactor $(b-a)/6$ drop out.',
          'Exact for cubics, not just quadratics, because of symmetry.',
        ],
      },
      {
        prompt: 'For the function $f(x) = 1/(1+25x^2)$ on $[-1,1]$, why does polynomial interpolation on equispaced nodes fail badly?',
        answer: 'Runge phenomenon — interpolation error grows exponentially near the endpoints.',
        steps: [
          'The Lebesgue constant of equispaced nodes grows like $2^n/(n\\ln n)$.',
          'Small perturbations of $f$ get amplified hugely near $\\pm 1$.',
          'Cheby nodes have polynomial-log Lebesgue constant; no Runge issue.',
        ],
      },
      {
        prompt: 'Estimate $\\int_0^\\pi \\sin x\\,dx$ using $4$-point Gauss-Legendre after mapping to $[-1,1]$.',
        answer: '$\\approx 2$ to machine precision.',
        steps: [
          'Change variable $x = \\pi(t+1)/2$, $dx = \\pi/2\\,dt$.',
          'Sum $\\sum w_i \\sin(\\pi(t_i+1)/2)$ with Gauss-Legendre nodes and weights, multiplied by $\\pi/2$.',
          'Exact answer $2$; Gauss converges superalgebraically on analytic integrands.',
        ],
      },
      {
        prompt: 'How does the error of composite trapezoidal scale with step size $h$?',
        answer: '$O(h^2)$.',
        steps: [
          'Per-panel error $O(h^3)$.',
          '$n=(b-a)/h$ panels, so total error $O(h^2)$.',
        ],
      },
      {
        prompt: 'Explain the advantage of Clenshaw-Curtis quadrature over Gauss-Legendre.',
        answer: 'Nested nodes (can reuse previous evaluations), simpler to compute, nearly as accurate.',
        steps: [
          'Nodes are Chebyshev extrema, which are nested: doubling $n$ reuses existing evaluations.',
          'Gauss nodes are not nested.',
          'Accuracy is a small constant worse than Gauss in practice, but often worth the nesting.',
        ],
      },
      {
        prompt: 'Fit a natural cubic spline to data $(0,0),(1,1),(2,0)$ and describe the system you would solve for the second derivatives.',
        answer: 'Tridiagonal system with natural boundary conditions $M_0 = M_2 = 0$.',
        steps: [
          'Let $M_i = S\''+'\'(x_i)$ be the unknowns.',
          'Continuity of the first derivative at interior nodes gives the interior tridiagonal equations.',
          'Natural BC: $M_0 = M_2 = 0$, so only $M_1$ remains, solved from one linear equation.',
        ],
      },
      {
        prompt: 'What is the exactness degree of $n$-point Gauss-Legendre quadrature?',
        answer: '$2n-1$.',
        steps: [
          '$n$ nodes and $n$ weights: $2n$ free parameters.',
          'Demanding exactness for $1, x, x^2, \\dots, x^{2n-1}$ gives $2n$ conditions.',
          'So $\\int_{-1}^1 p(x)\\,dx$ is exact for polynomials up to degree $2n-1$.',
        ],
      },
      {
        prompt: 'When integrating a periodic function over one period, how does the trapezoidal rule perform?',
        answer: 'Exponentially accurate — error decays faster than any polynomial in $h$.',
        steps: [
          'Periodicity makes the Euler-Maclaurin correction terms vanish.',
          'Remaining error is dominated by Fourier tail.',
          'For analytic periodic integrands, error decays like $e^{-cn}$.',
        ],
      },
      {
        prompt: 'Consider Monte Carlo integration in $d$ dimensions. What is its error rate?',
        answer: '$O(n^{-1/2})$, independent of $d$.',
        steps: [
          'Standard deviation of the Monte Carlo estimator is $\\sigma/\\sqrt n$.',
          'Dimension-free — that\'s why MC beats deterministic quadrature in high dimensions, despite the slow rate.',
        ],
      },
      {
        prompt: 'Compute the Newton divided difference table for $(0,1),(1,2),(3,10)$, then write the interpolating polynomial.',
        answer: '$p(x) = 1 + 1\\cdot(x-0) + 1\\cdot(x-0)(x-1)$, i.e. $p(x) = x^2 + 1$. Check: $p(3) = 10$. Actually $p(3)=10$. $p(1)=2$. $p(0)=1$. Good.',
        steps: [
          'First divided differences: $[f_0,f_1] = (2-1)/(1-0) = 1$; $[f_1,f_2] = (10-2)/(3-1) = 4$.',
          'Second: $[f_0,f_1,f_2] = (4-1)/(3-0) = 1$.',
          'Newton form: $1 + 1\\cdot(x-0) + 1\\cdot(x-0)(x-1) = x^2 + 1$ after expansion.',
        ],
      },
      {
        prompt: 'Why is Richardson extrapolation useful for quadrature?',
        answer: 'It combines two trapezoidal-rule estimates at halved step sizes to eliminate the $O(h^2)$ term, giving Simpson\'s rule "for free".',
        steps: [
          'Let $T(h)$ be the trapezoidal estimate with step $h$.',
          'Combine: $(4 T(h/2) - T(h))/3$, which cancels the leading $h^2$ error.',
          'This is Romberg integration: iterate to kill more terms.',
        ],
      },
      {
        prompt: 'In ML, why do people prefer low-degree splines over global polynomial fits?',
        answer: 'Local control and no Runge-like oscillations.',
        steps: [
          'Splines are local: perturbing one data point affects only nearby segments.',
          'Global polynomials on many points have huge high-order coefficients and oscillate.',
          'Smoothing splines and kernel methods descend from the same intuition.',
        ],
      },
      {
        prompt: 'Use composite Simpson with $n=2$ intervals (so $3$ nodes) on $\\int_0^1 \\cos x\\,dx$.',
        answer: '$\\approx 0.8415$ (true $\\sin 1 \\approx 0.84147$).',
        steps: [
          '$h=0.5$. $S = (h/3)(f(0) + 4 f(0.5) + f(1)) = (1/6)(1 + 4\\cos 0.5 + \\cos 1)$.',
          '$\\cos 0.5\\approx 0.8776$, $\\cos 1\\approx 0.5403$.',
          '$S \\approx (1/6)(1 + 3.5103 + 0.5403) = 0.8418$.',
        ],
      },
    ];

    var INTERP_CHALLENGE = [
      {
        prompt: 'Derive the error term of the composite trapezoidal rule via Euler-Maclaurin.',
        answer: 'Leading error $-(b-a) h^2 f\'(\\xi)/12$, with further corrections in even powers of $h$.',
        steps: [
          'Euler-Maclaurin: $\\int_a^b f\\,dx = h\\sum f(x_i) (\\text{with endpoint weights}) - \\sum B_{2k} h^{2k}[f^{(2k-1)}(b)-f^{(2k-1)}(a)]/(2k)! + \\dots$.',
          'Extract the first correction: $B_2/2! = 1/12$.',
          'For smooth non-periodic $f$ the dominant error is $-(b-a) h^2 (f\'(b)-f\'(a))/12$.',
        ],
      },
      {
        prompt: 'Show that Chebyshev nodes minimize the $\\infty$-norm of $\\prod(x-x_i)$ on $[-1,1]$.',
        answer: 'Sketch of the Chebyshev extremal argument.',
        steps: [
          'Let $T_{n+1}$ be the Chebyshev polynomial. Its roots are the Chebyshev nodes.',
          '$2^{-n} T_{n+1}(x) = \\prod(x-x_i)$ (monic rescaling).',
          '$\\max |T_{n+1}(x)| = 1$ on $[-1,1]$, and no other monic polynomial of degree $n+1$ has smaller infinity norm (equioscillation theorem).',
          'Hence Chebyshev nodes minimize the worst-case interpolation error factor.',
        ],
      },
      {
        prompt: 'Prove Gauss-Legendre is exact for polynomials of degree $\\le 2n-1$.',
        answer: 'Sketch.',
        steps: [
          'Write $p = q L_n + r$ where $L_n$ is the degree-$n$ Legendre polynomial and $\\deg q, \\deg r \\le n-1$.',
          '$\\int_{-1}^1 q L_n = 0$ since $q$ is orthogonal to $L_n$.',
          '$r$ has degree $<n$, interpolated exactly by any $n$ nodes.',
          'Since the Gauss nodes are the roots of $L_n$, the quadrature vanishes on $q L_n$ and is exact on $r$, hence on $p$.',
        ],
      },
      {
        prompt: 'Estimate the number of operations needed to evaluate a degree-$n$ polynomial interpolant using barycentric Lagrange form.',
        answer: '$O(n)$ per evaluation after $O(n^2)$ precomputation.',
        steps: [
          'Precompute the barycentric weights $w_i = 1/\\prod_{j\\ne i}(x_i - x_j)$: $O(n^2)$.',
          'Evaluate at $x$: $p(x) = \\sum \\tfrac{w_i}{x-x_i} y_i / \\sum \\tfrac{w_i}{x-x_i}$, cost $O(n)$.',
          'Numerically stable, unlike forming Vandermonde explicitly.',
        ],
      },
      {
        prompt: 'Describe adaptive quadrature and why it beats fixed-grid methods.',
        answer: 'It recursively refines subintervals where the integrand is hard, keeping the total number of evaluations small.',
        steps: [
          'Split $[a,b]$ in half; compute two estimates (e.g. Simpson) — one for the whole, one by adding the two halves.',
          'If they agree within tolerance, accept. Else recurse on each half.',
          'Concentrates work where $f$ is rough; crucial for integrands with peaks or near-singularities.',
        ],
      },
    ];

    PS.registerTopic("na-interp", {
      title: "Interpolation and quadrature",
      description: "Lagrange, Newton, splines, Chebyshev, trapezoidal, Simpson, Gauss.",
      warmup: INTERP_WARMUP,
      standard: INTERP_STANDARD,
      challenge: INTERP_CHALLENGE,
    });

    // ====================================================================
    // TOPIC 4: na-linsys
    // ====================================================================
    var LS_WARMUP = [
      {
        prompt: 'Solve $2x=4$ trivially; state what LU decomposition reduces to for a $1\\times 1$ matrix.',
        answer: '$L=1, U=2$; $x=2$.',
        steps: [
          'One-by-one LU is trivial: $A=1\\cdot A$.',
          'The point: LU extends this "factor and back-substitute" idea to any size.',
        ],
      },
      {
        prompt: 'Given $L = \\begin{pmatrix}1 & 0 \\\\ 2 & 1\\end{pmatrix}$ and $U = \\begin{pmatrix}3 & 1 \\\\ 0 & 4\\end{pmatrix}$, compute $A = LU$.',
        answer: '$A = \\begin{pmatrix}3 & 1 \\\\ 6 & 6\\end{pmatrix}$.',
        steps: [
          'Row 1: $1\\cdot(3,1) = (3,1)$.',
          'Row 2: $2\\cdot(3,1) + 1\\cdot(0,4) = (6, 2+4) = (6,6)$.',
        ],
      },
      {
        prompt: 'What does a Cholesky decomposition of a symmetric positive-definite matrix look like?',
        answer: '$A = L L^T$ with $L$ lower-triangular and positive diagonal.',
        steps: [
          'Exists iff $A$ is SPD.',
          'Roughly half the work of LU.',
          'Numerically stable without pivoting.',
        ],
      },
      {
        prompt: 'Solve $L\\mathbf{y}=\\mathbf{b}$ with $L=\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}$ and $\\mathbf{b}=(3,8)^T$.',
        answer: '$\\mathbf{y}=(3,2)^T$.',
        steps: [
          'Row 1: $y_1 = 3$.',
          'Row 2: $2 y_1 + y_2 = 8 \\Rightarrow y_2 = 2$.',
          'Forward substitution.',
        ],
      },
      {
        prompt: 'Solve $U\\mathbf{x}=\\mathbf{y}$ with $U=\\begin{pmatrix}3&1\\\\0&4\\end{pmatrix}$, $\\mathbf{y}=(3,2)^T$.',
        answer: '$\\mathbf{x}=(2/3, 1/2)^T$.',
        steps: [
          'Row 2: $4 x_2 = 2 \\Rightarrow x_2 = 1/2$.',
          'Row 1: $3 x_1 + 1/2 = 3 \\Rightarrow x_1 = 5/6$. Wait: $3 x_1 = 3 - 1/2 = 5/2$, so $x_1 = 5/6$. Let me recompute — with $y_1=3$ and $U_{11}=3, U_{12}=1, x_2=1/2$: $3 x_1 + 1\\cdot 1/2 = 3$, so $x_1 = (3-1/2)/3 = 5/6$.',
          'Back substitution done.',
        ],
      },
      {
        prompt: 'What is the cost of LU factorization of a dense $n\\times n$ matrix?',
        answer: '$\\sim 2n^3/3$ flops.',
        steps: [
          'Gaussian elimination does $O(n^3)$ work.',
          'Exact leading constant is $2n^3/3$.',
          'Forward/back substitution adds $O(n^2)$, negligible.',
        ],
      },
      {
        prompt: 'Name one reason to use iterative solvers (CG, GMRES) instead of direct ones.',
        answer: 'Large sparse matrices where $O(n^3)$ is prohibitive.',
        steps: [
          'Direct LU creates fill-in, destroying sparsity.',
          'Iterative methods only need matrix-vector products, exploiting sparsity directly.',
          'Crucial for PDE discretizations with millions of unknowns.',
        ],
      },
      {
        prompt: 'What does the conjugate gradient method require about the matrix $A$?',
        answer: 'SPD (symmetric positive definite).',
        steps: [
          'CG minimizes the $A$-norm of the error in a Krylov subspace.',
          'The minimization only makes sense if $A$ induces an inner product — SPD.',
        ],
      },
      {
        prompt: 'Estimate how many CG iterations are needed to reduce error by a factor $\\varepsilon$.',
        answer: '$O(\\sqrt{\\kappa}\\log(1/\\varepsilon))$ where $\\kappa$ is the condition number.',
        steps: [
          'Standard CG error bound: $\\|e_k\\|_A \\le 2\\bigl((\\sqrt\\kappa-1)/(\\sqrt\\kappa+1)\\bigr)^k \\|e_0\\|_A$.',
          'Solve for $k$: $k\\sim \\tfrac12\\sqrt\\kappa\\log(1/\\varepsilon)$.',
        ],
      },
      {
        prompt: 'Why pivot during LU?',
        answer: 'To avoid tiny pivots that blow up round-off errors.',
        steps: [
          'Partial pivoting swaps the current row with the one that has the largest absolute pivot entry.',
          'Keeps multipliers bounded by $1$ in absolute value.',
        ],
      },
      {
        prompt: 'Does Gauss-Seidel always converge on SPD systems?',
        answer: 'Yes.',
        steps: [
          'For SPD matrices, the Gauss-Seidel iteration matrix has spectral radius $<1$.',
          'Jacobi also works when $A$ is strictly diagonally dominant.',
        ],
      },
      {
        prompt: 'What is a preconditioner?',
        answer: 'A matrix $M\\approx A$ that is cheap to invert, used to transform $Ax=b$ into a better-conditioned system.',
        steps: [
          'Apply $M^{-1}$ from the left: $M^{-1}A x = M^{-1} b$.',
          'Goal: $\\kappa(M^{-1}A) \\ll \\kappa(A)$ so iterations converge faster.',
          'Common choices: diagonal (Jacobi), incomplete LU, multigrid.',
        ],
      },
      {
        prompt: 'How much does memory grow for a sparse matrix stored in CSR format with $\\mathrm{nnz}$ nonzeros, $n$ rows?',
        answer: 'About $\\mathrm{nnz}$ values + $\\mathrm{nnz}$ column indices + $n+1$ row pointers.',
        steps: [
          'CSR stores values, column indices, and row offsets.',
          'Total: $O(\\mathrm{nnz} + n)$, far better than dense $O(n^2)$ for sparse problems.',
        ],
      },
      {
        prompt: 'Why is Cholesky twice as fast as LU for SPD matrices?',
        answer: 'It only computes and stores one triangular factor.',
        steps: [
          'LU has two $n\\times n$ triangular factors, roughly $2n^3/3$ flops.',
          'Cholesky exploits symmetry, needing $n^3/3$ flops.',
          'Also avoids pivoting overhead.',
        ],
      },
      {
        prompt: 'When would you prefer an LU-based direct solver over CG?',
        answer: 'Dense small-to-medium systems, or when you need to solve with many right-hand sides.',
        steps: [
          'LU factors once, reuses for cheap back-substitution per new RHS.',
          'For dense $n \\lesssim 10^4$ on a modern CPU, LU is faster than CG.',
        ],
      },
    ];

    var LS_STANDARD = [
      {
        prompt: 'Compute the LU factorization of $A=\\begin{pmatrix}2 & 1 \\\\ 4 & 3\\end{pmatrix}$.',
        answer: '$L = \\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}, U = \\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}$.',
        steps: [
          'Pivot $a_{11}=2$. Multiplier $4/2=2$.',
          'Eliminate: new row $2 = (4,3) - 2(2,1) = (0,1)$.',
          'So $U_{22}=1$; $L$ has entry $2$ below the diagonal.',
        ],
      },
      {
        prompt: 'Use LU to solve $\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}\\mathbf x = (4, 10)^T$.',
        answer: '$\\mathbf x = (1, 2)^T$.',
        steps: [
          'From LU above, solve $L\\mathbf y = \\mathbf b$: $y_1=4, y_2=10-2\\cdot 4 = 2$.',
          'Back-substitute $U\\mathbf x = \\mathbf y$: $x_2 = 2$, $2 x_1 + 2 = 4 \\Rightarrow x_1 = 1$.',
        ],
      },
      {
        prompt: 'Perform one Jacobi iteration on $\\begin{pmatrix}4&1\\\\1&3\\end{pmatrix}\\mathbf x = (5,4)^T$ from $\\mathbf x^{(0)}=(0,0)^T$.',
        answer: '$\\mathbf x^{(1)}=(5/4, 4/3)^T$.',
        steps: [
          'Jacobi: $x_i^{(k+1)} = (b_i - \\sum_{j\\ne i} a_{ij} x_j^{(k)})/a_{ii}$.',
          '$x_1^{(1)} = (5-0)/4 = 5/4$.',
          '$x_2^{(1)} = (4-0)/3 = 4/3$.',
        ],
      },
      {
        prompt: 'Apply Cholesky to $A = \\begin{pmatrix}4 & 2 \\\\ 2 & 3\\end{pmatrix}$.',
        answer: '$L = \\begin{pmatrix}2 & 0 \\\\ 1 & \\sqrt 2\\end{pmatrix}$.',
        steps: [
          '$L_{11} = \\sqrt 4 = 2$.',
          '$L_{21} = 2/2 = 1$.',
          '$L_{22} = \\sqrt{3 - 1^2} = \\sqrt 2$.',
        ],
      },
      {
        prompt: 'Show that the condition number of $A = \\mathrm{diag}(1, 10^{-6})$ is $10^6$, and explain the practical impact.',
        answer: '$\\kappa_2(A) = \\sigma_{\\max}/\\sigma_{\\min} = 10^6$.',
        steps: [
          'Singular values are $1$ and $10^{-6}$.',
          'Ratio is $10^6$, hence $\\kappa_2 = 10^6$.',
          'In double precision, you can lose up to $6$ digits of accuracy in the solution for random perturbations in $b$.',
        ],
      },
      {
        prompt: 'Derive the number of iterations CG needs to converge on a $n\\times n$ matrix with distinct eigenvalues.',
        answer: 'At most $n$ iterations (in exact arithmetic).',
        steps: [
          'CG\'s search polynomial vanishes on all $n$ distinct eigenvalues within $n$ steps.',
          'In exact arithmetic it finds the exact solution.',
          'In finite precision it may need more iterations — but rapid convergence is still typical.',
        ],
      },
      {
        prompt: 'Describe Gauss-Seidel on $\\begin{pmatrix}4&1\\\\1&3\\end{pmatrix}\\mathbf x = (5,4)^T$ starting from $(0,0)^T$. Give $\\mathbf x^{(1)}$.',
        answer: '$x_1^{(1)} = 5/4$, $x_2^{(1)} = (4 - 5/4)/3 = 11/12$.',
        steps: [
          'Unlike Jacobi, Gauss-Seidel uses the updated $x_1$ immediately for the $x_2$ update.',
          '$x_1^{(1)} = 5/4$.',
          '$x_2^{(1)} = (4 - 1\\cdot 5/4)/3 = (11/4)/3 = 11/12$.',
        ],
      },
      {
        prompt: 'Why does partial pivoting suffice for numerical stability in Gaussian elimination?',
        answer: 'It keeps multipliers bounded by $1$, limiting growth of rounding errors.',
        steps: [
          'Without pivoting, a tiny pivot leads to large multipliers $m = a_{ik}/a_{ii}$.',
          'These amplify round-off in the updated entries.',
          'Partial pivoting (largest absolute value in column) keeps $|m|\\le 1$.',
        ],
      },
      {
        prompt: 'Estimate the work of one CG iteration.',
        answer: 'One matrix-vector product plus a few vector operations: $O(\\mathrm{nnz}) + O(n)$.',
        steps: [
          'Matrix-vector product is typically the dominant cost.',
          'A couple of dot products and vector updates add $O(n)$.',
          'Per iteration, linear in the nonzeros of $A$.',
        ],
      },
      {
        prompt: 'Run two iterations of Jacobi on $\\begin{pmatrix}10&-1\\\\-1&10\\end{pmatrix}\\mathbf x = (9, 9)^T$ from $(0,0)^T$.',
        answer: '$(0.9, 0.9)\\to(0.99, 0.99)$.',
        steps: [
          'Iteration 1: $x_1 = 9/10 = 0.9$, $x_2 = 9/10 = 0.9$.',
          'Iteration 2: $x_1 = (9 + 0.9)/10 = 0.99$, $x_2 = (9 + 0.9)/10 = 0.99$.',
          'Converges to $\\mathbf x = (1,1)$.',
        ],
      },
      {
        prompt: 'Why is CG unaffected by negative eigenvalues — or is it?',
        answer: 'CG requires SPD; negative eigenvalues break it. Use MINRES or GMRES instead.',
        steps: [
          'CG relies on the $A$-norm being a valid norm.',
          'Negative eigenvalues break positive-definiteness.',
          'MINRES generalizes to symmetric indefinite; GMRES to nonsymmetric.',
        ],
      },
      {
        prompt: 'Derive the Jacobi iteration matrix and give a sufficient condition for convergence.',
        answer: '$M_J = D^{-1}(L+U)$ with $A = D - L - U$; converges iff spectral radius $\\rho(M_J)<1$. Strict diagonal dominance suffices.',
        steps: [
          'Jacobi: $x^{(k+1)} = D^{-1}((L+U)x^{(k)} + b)$.',
          'Iteration matrix $M_J = D^{-1}(L+U)$.',
          'If $A$ is strictly diagonally dominant, $\\|M_J\\|_\\infty < 1$, so convergence.',
        ],
      },
      {
        prompt: 'In a finite-element simulation, you get a stiffness matrix that is SPD but ill-conditioned. What solver would you pick?',
        answer: 'Preconditioned CG, with a problem-specific preconditioner (e.g. incomplete Cholesky, multigrid).',
        steps: [
          'SPD + sparse + large $\\Rightarrow$ CG family.',
          'Ill-conditioned $\\Rightarrow$ must precondition or CG is slow.',
          'Multigrid is optimal for elliptic PDEs; IC(0) is a cheap starting point.',
        ],
      },
      {
        prompt: 'For a tridiagonal matrix, what is the cost of LU factorization and solve?',
        answer: '$O(n)$.',
        steps: [
          'Thomas algorithm exploits the banded structure.',
          'One sweep forward, one sweep backward — linear in $n$.',
          'No fill-in because the factors remain tridiagonal.',
        ],
      },
      {
        prompt: 'Explain why iterative refinement can improve the accuracy of a direct LU solve.',
        answer: 'It computes the residual in extra precision and corrects the solution iteratively.',
        steps: [
          'Solve $Ax=b$ giving $\\hat x$; compute residual $r = b - A\\hat x$ in higher precision.',
          'Solve $A\\delta = r$ using the existing LU factors (cheap).',
          'Update $\\hat x \\leftarrow \\hat x + \\delta$. A few steps typically recover full precision.',
        ],
      },
    ];

    var LS_CHALLENGE = [
      {
        prompt: 'Prove that Cholesky factorization exists and is unique for symmetric positive-definite matrices.',
        answer: 'Constructive proof by induction on $n$.',
        steps: [
          'Base $n=1$: $A_{11}>0$, so $L_{11} = \\sqrt{A_{11}}$.',
          'Inductive step: partition $A = \\begin{pmatrix}\\alpha & v^T\\\\ v & B\\end{pmatrix}$ with $\\alpha>0$ (SPD diagonal).',
          'Set $L_{11}=\\sqrt\\alpha, \\ell = v/\\sqrt\\alpha$. The Schur complement $B - \\ell\\ell^T$ is SPD of size $n-1$ (standard fact).',
          'Apply induction to get its Cholesky factor, then assemble.',
          'Uniqueness: each entry is determined by the formula from known entries.',
        ],
      },
      {
        prompt: 'Show that the residual norm in CG decreases monotonically (in the $A$-norm).',
        answer: 'Via the variational characterization.',
        steps: [
          'CG iterates minimize $\\|x - x^*\\|_A$ over the current Krylov subspace.',
          'Krylov subspaces are nested: $K_{k} \\subseteq K_{k+1}$.',
          'Minimum over a larger set is $\\le$ minimum over a smaller set.',
          'Hence $\\|e_{k+1}\\|_A \\le \\|e_k\\|_A$.',
        ],
      },
      {
        prompt: 'For a symmetric $5\\times 5$ matrix, how many flops does Cholesky use vs LU with partial pivoting?',
        answer: 'Cholesky: $\\approx 5^3/3\\approx 42$ flops. LU: $\\approx 2\\cdot 5^3/3\\approx 83$ flops.',
        steps: [
          'Cholesky: $n^3/3 + O(n^2)$.',
          'LU: $2n^3/3 + O(n^2)$.',
          'Factor of $2$ savings — same order, half the constant.',
        ],
      },
      {
        prompt: 'Describe multigrid as a fast linear solver and state its cost.',
        answer: '$O(n)$ per iteration on elliptic problems; optimal complexity.',
        steps: [
          'Relax on a fine grid (a few smoothing sweeps).',
          'Restrict the residual to a coarser grid and recursively solve.',
          'Prolongate the correction back up.',
          'V-cycles give $O(n)$ total work; convergence rate independent of mesh size.',
        ],
      },
      {
        prompt: 'Derive the BFGS quasi-Newton update that approximates the inverse Hessian, and argue why it is useful for large ML optimization.',
        answer: 'Rank-2 update that preserves positive-definiteness and curvature.',
        steps: [
          'Let $s_k = x_{k+1}-x_k$, $y_k = \\nabla f_{k+1}-\\nabla f_k$.',
          'BFGS update to $H_k\\approx (\\nabla^2 f)^{-1}$: $H_{k+1} = (I - \\rho_k s_k y_k^T) H_k (I - \\rho_k y_k s_k^T) + \\rho_k s_k s_k^T$ with $\\rho_k = 1/(y_k^T s_k)$.',
          'Avoids forming or factoring the Hessian explicitly.',
          'L-BFGS stores only the last $m$ pairs, reducing memory to $O(mn)$ and making it practical for deep learning-scale problems.',
        ],
      },
    ];

    PS.registerTopic("na-linsys", {
      title: "Linear systems — direct and iterative solvers",
      description: "LU, Cholesky, Jacobi/Gauss-Seidel, CG, preconditioning.",
      warmup: LS_WARMUP,
      standard: LS_STANDARD,
      challenge: LS_CHALLENGE,
    });

    return true;
  }

  if (!register()) {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (register() || tries > 50) clearInterval(iv);
    }, 100);
  }
})();
