/*
 * LearningHub - Calculus Problem Set
 * Registers 8 topics with LearningHubProblemSet runtime.
 * Topics: calc-limits, calc-derivs-basic, calc-chain, calc-apps,
 *         calc-integrals, calc-ftc, calc-techniques, calc-taylor
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[calculus-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // Helpers
  // ==========================================================================
  function signStr(n) { return n >= 0 ? '+' : '-'; }
  function absS(n) { return Math.abs(n); }

  // Pretty-print "c*term" with a leading sign, collapsing 1 and -1.
  function term(c, t) {
    if (c === 0) return '';
    if (t === '') {
      return (c > 0 ? ' + ' : ' - ') + Math.abs(c);
    }
    if (c === 1) return ' + ' + t;
    if (c === -1) return ' - ' + t;
    return (c > 0 ? ' + ' : ' - ') + Math.abs(c) + t;
  }

  // Leading term (no leading '+')
  function leadTerm(c, t) {
    if (c === 0) return '0';
    if (t === '') return String(c);
    if (c === 1) return t;
    if (c === -1) return '-' + t;
    return c + t;
  }

  // Format a polynomial of form a x^2 + b x + c (skipping zeros).
  function polyQuad(a, b, c) {
    var out = leadTerm(a, 'x^2');
    out += term(b, 'x');
    out += term(c, '');
    return out;
  }

  function polyCubic(a, b, c, d) {
    var out = leadTerm(a, 'x^3');
    out += term(b, 'x^2');
    out += term(c, 'x');
    out += term(d, '');
    return out;
  }

  // Format a signed integer for inside of parentheses, e.g. "(-3)" or "(2)"
  function paren(n) { return '(' + n + ')'; }

  // Factorial
  function fact(n) {
    var r = 1;
    for (var i = 2; i <= n; i++) r *= i;
    return r;
  }

  // GCD for fraction reduction
  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a || 1;
  }

  // Nicely print p/q as LaTeX, reducing and handling signs.
  function frac(p, q) {
    if (q === 0) return '\\text{undefined}';
    if (p === 0) return '0';
    var s = (p * q < 0) ? '-' : '';
    p = Math.abs(p); q = Math.abs(q);
    var g = gcd(p, q);
    p /= g; q /= g;
    if (q === 1) return s + p;
    return s + '\\frac{' + p + '}{' + q + '}';
  }

  // ==========================================================================
  // TOPIC 1: calc-limits
  // ==========================================================================

  // Warmup: direct substitution on a quadratic polynomial
  function genLimitPolyDirect(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-5, 5);
    var c = rng.nonzeroInt(-9, 9);
    var x0 = rng.int(-3, 3);
    var ans = a * x0 * x0 + b * x0 + c;
    return {
      prompt: '$\\displaystyle \\lim_{x \\to ' + x0 + '}\\left(' + polyQuad(a, b, c) + '\\right)$',
      answer: '$' + ans + '$',
      steps: [
        'The polynomial is continuous everywhere, so the limit equals the value at $x = ' + x0 + '$.',
        'Substitute: $' + a + paren(x0) + '^2 + ' + b + paren(x0) + ' + ' + paren(c) + '$.',
        'Evaluate: $' + (a * x0 * x0) + ' + ' + (b * x0) + ' + ' + c + ' = ' + ans + '$.',
      ],
    };
  }

  // Warmup: direct substitution on a simple rational where denom != 0
  function genLimitRationalDirect(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-6, 6);
    var c = rng.nonzeroInt(-4, 4);
    var d = rng.nonzeroInt(-6, 6);
    var x0 = rng.int(-3, 3);
    var num = a * x0 + b;
    var den = c * x0 + d;
    if (den === 0) { d += 1; den = c * x0 + d; }
    return {
      prompt: '$\\displaystyle \\lim_{x \\to ' + x0 + '} \\frac{' + a + 'x ' + (b >= 0 ? '+ ' + b : '- ' + (-b)) + '}{' + c + 'x ' + (d >= 0 ? '+ ' + d : '- ' + (-d)) + '}$',
      answer: '$' + frac(num, den) + '$',
      steps: [
        'The denominator at $x = ' + x0 + '$ is $' + c + paren(x0) + ' + ' + paren(d) + ' = ' + den + ' \\neq 0$.',
        'Since the rational is continuous there, plug in directly.',
        'Numerator: $' + a + paren(x0) + ' + ' + paren(b) + ' = ' + num + '$.',
        'Result: $\\frac{' + num + '}{' + den + '} = ' + frac(num, den) + '$.',
      ],
    };
  }

  // Standard: 0/0 indeterminate that factors as (x-a) cancelling
  function genLimitFactorCancel(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-6, 6);
    while (b === a) b = rng.nonzeroInt(-6, 6);
    // limit x->a of (x^2 - (a+b) x + a*b) / (x - a) = (x-a)(x-b)/(x-a) -> a - b
    var sum = a + b;
    var prod = a * b;
    var ans = a - b;
    // Render "x - a" with sign logic so a=-2 prints as "x + 2"
    var denomStr = a >= 0 ? 'x - ' + a : 'x + ' + (-a);
    var factorA = a >= 0 ? '(x - ' + a + ')' : '(x + ' + (-a) + ')';
    var factorB = b >= 0 ? '(x - ' + b + ')' : '(x + ' + (-b) + ')';
    return {
      prompt: '$\\displaystyle \\lim_{x \\to ' + a + '} \\frac{x^2 ' + term(-sum, 'x') + term(prod, '') + '}{' + denomStr + '}$',
      answer: '$' + ans + '$',
      steps: [
        'Direct substitution gives $\\frac{0}{0}$ - an indeterminate form.',
        'Factor the numerator: $x^2 ' + term(-sum, 'x') + term(prod, '') + ' = ' + factorA + factorB + '$.',
        'Cancel $' + factorA + '$: $\\lim_{x \\to ' + a + '}' + factorB + '$.',
        'Plug in: $' + a + (b >= 0 ? ' - ' + b : ' + ' + (-b)) + ' = ' + ans + '$.',
      ],
    };
  }

  // Standard: limit at infinity of rational of equal degree
  function genLimitInfEqualDeg(rng) {
    var a = rng.nonzeroInt(-6, 6);
    var b = rng.nonzeroInt(-6, 6);
    var c = rng.nonzeroInt(-6, 6);
    var d = rng.nonzeroInt(-6, 6);
    return {
      prompt: '$\\displaystyle \\lim_{x \\to \\infty} \\frac{' + a + 'x^2 ' + term(b, 'x') + '}{' + c + 'x^2 ' + term(d, '') + '}$',
      answer: '$' + frac(a, c) + '$',
      steps: [
        'Numerator and denominator both have degree $2$.',
        'Divide top and bottom by $x^2$: $\\dfrac{' + a + ' + ' + b + '/x}{' + c + ' + ' + d + '/x^2}$.',
        'As $x \\to \\infty$, the $1/x$ terms vanish.',
        'Limit is the ratio of leading coefficients: $\\frac{' + a + '}{' + c + '} = ' + frac(a, c) + '$.',
      ],
    };
  }

  var STATIC_LIMITS_STANDARD = [
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 3}\\frac{x^2 - 9}{x - 3}$.',
      answer: '$6$',
      steps: [
        'Direct substitution gives $0/0$.',
        'Factor: $x^2 - 9 = (x-3)(x+3)$.',
        'Cancel: $\\lim_{x\\to 3}(x+3) = 6$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\sqrt{x+4} - 2}{x}$.',
      answer: '$\\frac{1}{4}$',
      steps: [
        'Form is $0/0$. Multiply by the conjugate $\\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2}$.',
        'Numerator becomes $(x+4) - 4 = x$.',
        'Expression simplifies to $\\frac{1}{\\sqrt{x+4}+2}$.',
        'Plug in $x=0$: $\\frac{1}{2+2} = \\frac{1}{4}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to \\infty}\\frac{3x^3 - x + 2}{5x^3 + 4x^2}$.',
      answer: '$\\frac{3}{5}$',
      steps: [
        'Degrees of numerator and denominator match (both $3$).',
        'Divide top and bottom by $x^3$.',
        'Lower-order terms vanish; limit is $3/5$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to \\infty}\\frac{2x + 1}{x^2 + 3}$.',
      answer: '$0$',
      steps: [
        'Numerator has degree $1$, denominator degree $2$.',
        'Divide top and bottom by $x^2$: $\\frac{2/x + 1/x^2}{1 + 3/x^2}$.',
        'Top goes to $0$, bottom to $1$, so the limit is $0$.',
      ],
    },
    {
      prompt: 'Let $f(x) = \\begin{cases} x + 1 & x < 2 \\\\ x^2 - 1 & x \\ge 2 \\end{cases}$. Find $\\lim_{x \\to 2^-} f(x)$ and $\\lim_{x \\to 2^+} f(x)$.',
      answer: 'Left: $3$; right: $3$.',
      steps: [
        'Left: use $x+1$ branch. $\\lim_{x\\to 2^-}(x+1) = 3$.',
        'Right: use $x^2 - 1$ branch. $\\lim_{x\\to 2^+}(x^2-1) = 3$.',
        'Both one-sided limits are $3$, so $\\lim_{x\\to 2} f(x) = 3$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 1}\\frac{x^3 - 1}{x - 1}$.',
      answer: '$3$',
      steps: [
        'Form $0/0$. Factor $x^3 - 1 = (x-1)(x^2 + x + 1)$.',
        'Cancel: $\\lim_{x\\to 1}(x^2 + x + 1) = 3$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 2}\\frac{x^2 - 4}{x^2 - 5x + 6}$.',
      answer: '$-4$',
      steps: [
        'Factor top: $(x-2)(x+2)$. Factor bottom: $(x-2)(x-3)$.',
        'Cancel $(x-2)$: $\\frac{x+2}{x-3}$.',
        'Plug in $x=2$: $\\frac{4}{-1} = -4$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{h\\to 0}\\frac{(3+h)^2 - 9}{h}$.',
      answer: '$6$',
      steps: [
        'Expand: $(3+h)^2 - 9 = 9 + 6h + h^2 - 9 = 6h + h^2$.',
        'Divide: $\\frac{6h + h^2}{h} = 6 + h$.',
        'Limit as $h\\to 0$: $6$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to -\\infty}\\frac{4x^2 - x}{2x^2 + 5}$.',
      answer: '$2$',
      steps: [
        'Equal degrees. Divide by $x^2$.',
        'Leading coefficient ratio: $4/2 = 2$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\sin(3x)}{x}$.',
      answer: '$3$',
      steps: [
        'Rewrite as $3\\cdot\\frac{\\sin(3x)}{3x}$.',
        'Use $\\lim_{u\\to 0}\\frac{\\sin u}{u} = 1$ with $u = 3x$.',
        'Result: $3 \\cdot 1 = 3$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2}$.',
      answer: '$\\frac{1}{2}$',
      steps: [
        'Multiply by conjugate: $\\frac{(1-\\cos x)(1+\\cos x)}{x^2(1+\\cos x)} = \\frac{1-\\cos^2 x}{x^2(1+\\cos x)} = \\frac{\\sin^2 x}{x^2(1+\\cos x)}$.',
        'Recognize $\\frac{\\sin x}{x} \\to 1$.',
        'Limit becomes $\\frac{1}{1+1} = \\frac{1}{2}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0^+} \\frac{|x|}{x}$ and $\\lim_{x\\to 0^-}\\frac{|x|}{x}$.',
      answer: 'Right: $1$; left: $-1$; two-sided limit does not exist.',
      steps: [
        'For $x > 0$, $|x| = x$, so ratio is $1$.',
        'For $x < 0$, $|x| = -x$, so ratio is $-1$.',
        'Since one-sided limits disagree, $\\lim_{x\\to 0}|x|/x$ does not exist.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 4}\\frac{\\sqrt{x} - 2}{x - 4}$.',
      answer: '$\\frac{1}{4}$',
      steps: [
        'Multiply by conjugate $\\frac{\\sqrt{x}+2}{\\sqrt{x}+2}$.',
        'Numerator: $x - 4$. Cancel: $\\frac{1}{\\sqrt{x}+2}$.',
        'Plug in $x=4$: $\\frac{1}{4}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\tan x}{x}$.',
      answer: '$1$',
      steps: [
        'Rewrite as $\\frac{\\sin x}{x}\\cdot\\frac{1}{\\cos x}$.',
        '$\\frac{\\sin x}{x} \\to 1$ and $\\cos x \\to 1$.',
        'Product is $1$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to \\infty}\\left(\\sqrt{x^2+x} - x\\right)$.',
      answer: '$\\frac{1}{2}$',
      steps: [
        'Multiply by conjugate: $\\frac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}$.',
        'Divide top and bottom by $x$ (for $x>0$, $x = \\sqrt{x^2}$): $\\frac{1}{\\sqrt{1 + 1/x} + 1}$.',
        'As $x\\to\\infty$: $\\frac{1}{1+1} = \\frac{1}{2}$.',
      ],
    },
  ];

  var STATIC_LIMITS_CHALLENGE = [
    {
      prompt: 'Find $a$ so that $f(x) = \\begin{cases} x^2 + 1 & x < 2 \\\\ ax + 3 & x \\ge 2 \\end{cases}$ is continuous at $x = 2$.',
      answer: '$a = 1$',
      steps: [
        'Left limit: $\\lim_{x\\to 2^-}(x^2+1) = 5$.',
        'Right limit: $\\lim_{x\\to 2^+}(ax+3) = 2a+3$.',
        'For continuity set $2a+3 = 5$, so $a = 1$.',
      ],
    },
    {
      prompt: 'Find $a, b$ so $f(x) = \\begin{cases} ax + b & x < 1 \\\\ x^2 & 1 \\le x \\le 2 \\\\ bx - a & x > 2\\end{cases}$ is continuous everywhere.',
      answer: '$a = -\\tfrac{2}{3},\\ b = \\tfrac{5}{3}$',
      steps: [
        'Continuity at $x = 1$: $a + b = 1^2 = 1$.',
        'Continuity at $x = 2$: $2^2 = 2b - a$, i.e. $2b - a = 4$.',
        'Add the two equations: $3b = 5$, so $b = 5/3$.',
        'Then $a = 1 - b = -2/3$.',
      ],
      hint: 'Equate one-sided limits at each junction to enforce continuity.',
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0} x^2 \\sin(1/x)$.',
      answer: '$0$',
      steps: [
        'For all $x\\ne 0$, $-1 \\le \\sin(1/x) \\le 1$, so $-x^2 \\le x^2\\sin(1/x) \\le x^2$.',
        'Both $-x^2 \\to 0$ and $x^2 \\to 0$ as $x\\to 0$.',
        'By the squeeze theorem, the limit is $0$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\sin x - x}{x^3}$.',
      answer: '$-\\frac{1}{6}$',
      steps: [
        'Form is $0/0$. Apply L\'Hopital: $\\lim\\frac{\\cos x - 1}{3x^2}$.',
        'Still $0/0$. Apply L\'Hopital again: $\\lim\\frac{-\\sin x}{6x}$.',
        'Still $0/0$. Third application: $\\lim\\frac{-\\cos x}{6} = -\\frac{1}{6}$.',
      ],
      hint: 'You will need L\'Hopital more than once.',
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{e^x - 1 - x}{x^2}$.',
      answer: '$\\frac{1}{2}$',
      steps: [
        'Form $0/0$. L\'Hopital: $\\lim\\frac{e^x - 1}{2x}$.',
        'Still $0/0$. L\'Hopital again: $\\lim\\frac{e^x}{2} = \\frac{1}{2}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\ln(1+x) - x}{x^2}$.',
      answer: '$-\\frac{1}{2}$',
      steps: [
        'L\'Hopital once: $\\lim\\frac{1/(1+x) - 1}{2x} = \\lim\\frac{-x/(1+x)}{2x} = \\lim\\frac{-1}{2(1+x)} = -\\frac{1}{2}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0^+} x\\ln x$.',
      answer: '$0$',
      steps: [
        'Rewrite as $\\lim \\frac{\\ln x}{1/x}$, which is $-\\infty/\\infty$.',
        'L\'Hopital: $\\lim \\frac{1/x}{-1/x^2} = \\lim(-x) = 0$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0^+}(1+x)^{1/x}$.',
      answer: '$e$',
      steps: [
        'Let $L = \\lim(1+x)^{1/x}$. Take logs: $\\ln L = \\lim\\frac{\\ln(1+x)}{x}$.',
        'L\'Hopital: $\\lim\\frac{1/(1+x)}{1} = 1$.',
        'So $\\ln L = 1$, and $L = e$.',
      ],
    },
    {
      prompt: 'Prove $\\displaystyle \\lim_{x\\to 0} x\\sin(1/x) = 0$ using the squeeze theorem.',
      answer: '$0$',
      steps: [
        'For $x\\ne 0$, $|\\sin(1/x)| \\le 1$.',
        'Multiply by $|x|$: $|x\\sin(1/x)| \\le |x|$.',
        'So $-|x| \\le x\\sin(1/x) \\le |x|$.',
        'Both bounds tend to $0$; squeeze gives $x\\sin(1/x) \\to 0$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to \\infty}x\\left(\\sqrt{x^2+1} - x\\right)$.',
      answer: '$\\frac{1}{2}$',
      steps: [
        'Multiply by conjugate: $\\frac{x((\\sqrt{x^2+1})^2 - x^2)}{\\sqrt{x^2+1}+x} = \\frac{x}{\\sqrt{x^2+1}+x}$.',
        'Divide by $x$: $\\frac{1}{\\sqrt{1+1/x^2}+1}$.',
        'Limit: $\\frac{1}{2}$.',
      ],
    },
    {
      prompt: 'Find $c$ so $\\displaystyle \\lim_{x\\to \\infty}\\left(\\frac{x+c}{x-c}\\right)^x = 9$.',
      answer: '$c = \\ln 3$',
      steps: [
        'Take $\\ln$: limit becomes $\\lim x\\ln\\frac{x+c}{x-c}$.',
        'Write $\\ln\\frac{x+c}{x-c} = \\ln(1 + \\tfrac{c}{x}) - \\ln(1 - \\tfrac{c}{x}) \\approx \\tfrac{2c}{x}$ for large $x$.',
        'So limit of $\\ln$ is $2c$, meaning original limit is $e^{2c}$.',
        'Set $e^{2c} = 9$: $2c = \\ln 9$, $c = \\tfrac{1}{2}\\ln 9 = \\ln 3$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{\\tan x - \\sin x}{x^3}$.',
      answer: '$\\frac{1}{2}$',
      steps: [
        'Factor: $\\tan x - \\sin x = \\sin x(\\frac{1}{\\cos x} - 1) = \\sin x\\cdot\\frac{1-\\cos x}{\\cos x}$.',
        'So limit is $\\lim\\frac{\\sin x}{x}\\cdot\\frac{1-\\cos x}{x^2}\\cdot\\frac{1}{\\cos x}$.',
        'Each factor: $1$, $\\tfrac{1}{2}$, $1$. Product: $\\tfrac{1}{2}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{n\\to \\infty}\\left(1 + \\frac{2}{n}\\right)^n$.',
      answer: '$e^2$',
      steps: [
        'Recall $\\lim_{n\\to\\infty}(1+a/n)^n = e^a$.',
        'With $a = 2$, limit is $e^2$.',
      ],
    },
    {
      prompt: 'Show that $\\displaystyle \\lim_{x\\to 0}\\sin(1/x)$ does not exist.',
      answer: 'Does not exist',
      steps: [
        'Pick $x_n = \\frac{1}{n\\pi}$. Then $\\sin(1/x_n) = \\sin(n\\pi) = 0$.',
        'Pick $y_n = \\frac{2}{(4n+1)\\pi}$. Then $\\sin(1/y_n) = \\sin((4n+1)\\pi/2) = 1$.',
        'Two sequences tend to $0$ but give different limits, so $\\lim_{x\\to 0}\\sin(1/x)$ does not exist.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\lim_{x\\to 0}\\frac{e^{2x} - e^{-2x}}{\\sin x}$.',
      answer: '$4$',
      steps: [
        'Form $0/0$. L\'Hopital: $\\lim\\frac{2e^{2x} + 2e^{-2x}}{\\cos x}$.',
        'At $x=0$: $\\frac{2 + 2}{1} = 4$.',
      ],
    },
  ];

  PS.registerTopic("calc-limits", {
    title: "Limits - evaluation and conceptual",
    description: "Direct substitution, indeterminate forms, one-sided limits, and continuity.",
    warmup:   [genLimitPolyDirect, genLimitRationalDirect],
    standard: [genLimitFactorCancel, genLimitInfEqualDeg, STATIC_LIMITS_STANDARD],
    challenge: STATIC_LIMITS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: calc-derivs-basic
  // ==========================================================================

  // Warmup: power rule on a polynomial a x^n
  function genDerivPowerSingle(rng) {
    var a = rng.nonzeroInt(-9, 9);
    var n = rng.int(2, 7);
    var newC = a * n;
    var newP = n - 1;
    var aStr = a === 1 ? '' : (a === -1 ? '-' : a + '');
    var newCStr = newC === 1 ? '' : (newC === -1 ? '-' : newC + '');
    var fStr = aStr + 'x^{' + n + '}';
    var dStr = newCStr + (newP === 1 ? 'x' : 'x^{' + newP + '}');
    return {
      prompt: 'Differentiate $f(x) = ' + fStr + '$.',
      answer: '$f\'(x) = ' + dStr + '$',
      steps: [
        'Power rule: $\\frac{d}{dx}[x^n] = n x^{n-1}$.',
        'Keep the constant: $' + a + ' \\cdot ' + n + 'x^{' + n + '-1} = ' + dStr + '$.',
      ],
    };
  }

  // Warmup: derivative of a cubic polynomial
  function genDerivCubicPoly(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-5, 5);
    var c = rng.nonzeroInt(-7, 7);
    var d = rng.int(-9, 9);
    return {
      prompt: 'Differentiate $f(x) = ' + polyCubic(a, b, c, d) + '$.',
      answer: '$f\'(x) = ' + polyQuad(3 * a, 2 * b, c) + '$',
      steps: [
        'Apply the power rule to each term.',
        '$\\frac{d}{dx}[' + a + 'x^3] = ' + (3 * a) + 'x^2$.',
        '$\\frac{d}{dx}[' + b + 'x^2] = ' + (2 * b) + 'x$.',
        '$\\frac{d}{dx}[' + c + 'x] = ' + c + '$. The constant $' + d + '$ drops out.',
        'Combine: $f\'(x) = ' + polyQuad(3 * a, 2 * b, c) + '$.',
      ],
    };
  }

  // Standard: product rule on two linear factors
  function genDerivProductLinear(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-5, 5);
    var c = rng.nonzeroInt(-5, 5);
    var d = rng.nonzeroInt(-5, 5);
    // f = (a x + b)(c x + d); f' = a(cx+d) + c(ax+b) = 2ac x + (ad+bc)
    var lead = 2 * a * c;
    var mid = a * d + b * c;
    var u = innerLinear(a, b);
    var v = innerLinear(c, d);
    return {
      prompt: 'Differentiate $f(x) = (' + u + ')(' + v + ')$ using the product rule.',
      answer: '$f\'(x) = ' + leadTerm(lead, 'x') + term(mid, '') + '$',
      steps: [
        'Product rule: $(uv)\' = u\'v + uv\'$.',
        'Let $u = ' + u + '$, so $u\' = ' + a + '$.',
        'Let $v = ' + v + '$, so $v\' = ' + c + '$.',
        '$f\'(x) = ' + a + '(' + v + ') + ' + c + '(' + u + ') = ' + leadTerm(lead, 'x') + term(mid, '') + '$.',
      ],
    };
  }

  // Standard: simple trig/exp derivative with coefficient
  function genDerivTrigExp(rng) {
    var kind = rng.int(0, 3);
    var a = rng.nonzeroInt(-6, 6);
    if (kind === 0) {
      return {
        prompt: 'Differentiate $f(x) = ' + a + '\\sin x$.',
        answer: '$f\'(x) = ' + a + '\\cos x$',
        steps: [
          '$\\frac{d}{dx}[\\sin x] = \\cos x$.',
          'Constant multiple rule: derivative is $' + a + '\\cos x$.',
        ],
      };
    }
    if (kind === 1) {
      return {
        prompt: 'Differentiate $f(x) = ' + a + '\\cos x$.',
        answer: '$f\'(x) = ' + (-a) + '\\sin x$',
        steps: [
          '$\\frac{d}{dx}[\\cos x] = -\\sin x$.',
          'Multiply by $' + a + '$: derivative is $' + (-a) + '\\sin x$.',
        ],
      };
    }
    if (kind === 2) {
      return {
        prompt: 'Differentiate $f(x) = ' + a + 'e^{x}$.',
        answer: '$f\'(x) = ' + a + 'e^{x}$',
        steps: [
          '$\\frac{d}{dx}[e^x] = e^x$.',
          'Derivative is $' + a + 'e^x$.',
        ],
      };
    }
    return {
      prompt: 'Differentiate $f(x) = ' + a + '\\ln x$.',
      answer: '$f\'(x) = \\dfrac{' + a + '}{x}$',
      steps: [
        '$\\frac{d}{dx}[\\ln x] = \\dfrac{1}{x}$.',
        'Multiply by $' + a + '$: $\\dfrac{' + a + '}{x}$.',
      ],
    };
  }

  // Standard: quotient rule on linear / linear
  function genDerivQuotientLinear(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-5, 5);
    var c = rng.nonzeroInt(-5, 5);
    var d = rng.nonzeroInt(-5, 5);
    // f = (ax+b)/(cx+d); f' = (a(cx+d) - c(ax+b))/(cx+d)^2 = (ad - bc)/(cx+d)^2
    var num = a * d - b * c;
    var u = innerLinear(a, b);
    var v = innerLinear(c, d);
    return {
      prompt: 'Differentiate $f(x) = \\dfrac{' + u + '}{' + v + '}$.',
      answer: '$f\'(x) = \\dfrac{' + num + '}{(' + v + ')^2}$',
      steps: [
        'Quotient rule: $(u/v)\' = (u\'v - uv\')/v^2$.',
        'Here $u = ' + u + '$ (so $u\' = ' + a + '$) and $v = ' + v + '$ (so $v\' = ' + c + '$).',
        'Numerator of derivative: $' + a + '(' + v + ') - ' + c + '(' + u + ') = ' + num + '$ (the $x$ terms cancel).',
        'So $f\'(x) = \\dfrac{' + num + '}{(' + v + ')^2}$.',
      ],
    };
  }

  var STATIC_DERIVS_CHALLENGE = [
    {
      prompt: 'Find $f^{(4)}(x)$ for $f(x) = x^5 - 3x^4 + 2x^2$.',
      answer: '$f^{(4)}(x) = 120x - 72$',
      steps: [
        '$f\'(x) = 5x^4 - 12x^3 + 4x$.',
        '$f\'\'(x) = 20x^3 - 36x^2 + 4$.',
        '$f\'\'\'(x) = 60x^2 - 72x$.',
        '$f^{(4)}(x) = 120x - 72$.',
      ],
    },
    {
      prompt: 'Find all $x$ where $f\'(x) = 0$ for $f(x) = x^3 - 6x^2 + 9x + 1$.',
      answer: '$x = 1$ and $x = 3$',
      steps: [
        '$f\'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3)$.',
        'Set equal to zero: $x = 1$ or $x = 3$.',
      ],
    },
    {
      prompt: 'Prove $\\dfrac{d}{dx}[\\sec x] = \\sec x \\tan x$ using the quotient rule.',
      answer: '$\\sec x \\tan x$',
      steps: [
        'Write $\\sec x = \\dfrac{1}{\\cos x}$.',
        'Quotient rule: $\\dfrac{d}{dx}\\left[\\dfrac{1}{\\cos x}\\right] = \\dfrac{0\\cdot\\cos x - 1\\cdot(-\\sin x)}{\\cos^2 x} = \\dfrac{\\sin x}{\\cos^2 x}$.',
        'Split: $\\dfrac{\\sin x}{\\cos^2 x} = \\dfrac{1}{\\cos x}\\cdot\\dfrac{\\sin x}{\\cos x} = \\sec x \\tan x$.',
      ],
    },
    {
      prompt: 'Prove $\\dfrac{d}{dx}[\\tan x] = \\sec^2 x$ using the quotient rule.',
      answer: '$\\sec^2 x$',
      steps: [
        '$\\tan x = \\sin x / \\cos x$.',
        'Quotient rule: $\\dfrac{\\cos x \\cos x - \\sin x(-\\sin x)}{\\cos^2 x} = \\dfrac{\\cos^2 x + \\sin^2 x}{\\cos^2 x}$.',
        'Numerator is $1$, so result is $\\dfrac{1}{\\cos^2 x} = \\sec^2 x$.',
      ],
    },
    {
      prompt: 'Find the $n$-th derivative of $f(x) = e^{2x}$.',
      answer: '$f^{(n)}(x) = 2^n e^{2x}$',
      steps: [
        '$f\'(x) = 2e^{2x}$, $f\'\'(x) = 4e^{2x}$, $f\'\'\'(x) = 8e^{2x}$.',
        'By induction, each differentiation pulls out another factor of $2$.',
        'So $f^{(n)}(x) = 2^n e^{2x}$.',
      ],
    },
    {
      prompt: 'Find $f\'\'(1)$ for $f(x) = x\\ln x$.',
      answer: '$1$',
      steps: [
        'Product rule: $f\'(x) = \\ln x + x\\cdot\\tfrac{1}{x} = \\ln x + 1$.',
        'Differentiate again: $f\'\'(x) = \\tfrac{1}{x}$.',
        'At $x=1$: $f\'\'(1) = 1$.',
      ],
    },
    {
      prompt: 'Show that $f(x) = \\sin x$ satisfies $f\'\'(x) + f(x) = 0$.',
      answer: 'Verified',
      steps: [
        '$f\'(x) = \\cos x$.',
        '$f\'\'(x) = -\\sin x$.',
        '$f\'\'(x) + f(x) = -\\sin x + \\sin x = 0$.',
      ],
    },
    {
      prompt: 'Find the slope of the tangent to $f(x) = x^3 - 2x + 1$ at $x = -1$.',
      answer: '$1$',
      steps: [
        '$f\'(x) = 3x^2 - 2$.',
        '$f\'(-1) = 3 - 2 = 1$.',
      ],
    },
    {
      prompt: 'If $f(x) = x e^x$, find $f^{(n)}(x)$.',
      answer: '$f^{(n)}(x) = (x + n)e^x$',
      steps: [
        '$f\'(x) = e^x + xe^x = (x+1)e^x$.',
        '$f\'\'(x) = (x+2)e^x$; pattern: each derivative adds $1$ to the linear factor.',
        'By induction $f^{(n)}(x) = (x+n)e^x$.',
      ],
    },
    {
      prompt: 'Find the values of $a, b$ such that $f(x) = ax^3 + bx$ has a horizontal tangent at $(1, -2)$.',
      answer: '$a = 1, b = -3$',
      steps: [
        'Point on curve: $a + b = -2$.',
        '$f\'(x) = 3ax^2 + b$. Horizontal tangent at $x=1$: $3a + b = 0$.',
        'Subtract: $2a = 2$, so $a = 1$, then $b = -3$.',
      ],
    },
    {
      prompt: 'Derive $\\dfrac{d}{dx}[\\cot x] = -\\csc^2 x$ from the quotient rule.',
      answer: '$-\\csc^2 x$',
      steps: [
        '$\\cot x = \\cos x / \\sin x$.',
        'Quotient rule: $\\dfrac{-\\sin x \\sin x - \\cos x \\cos x}{\\sin^2 x} = \\dfrac{-(\\sin^2 x + \\cos^2 x)}{\\sin^2 x}$.',
        'Numerator is $-1$: result is $-\\dfrac{1}{\\sin^2 x} = -\\csc^2 x$.',
      ],
    },
    {
      prompt: 'Let $f(x) = \\sqrt{x}$. Use the limit definition to show $f\'(x) = \\dfrac{1}{2\\sqrt{x}}$.',
      answer: '$\\dfrac{1}{2\\sqrt{x}}$',
      steps: [
        '$f\'(x) = \\lim_{h\\to 0}\\dfrac{\\sqrt{x+h} - \\sqrt{x}}{h}$.',
        'Multiply by conjugate: $\\lim\\dfrac{(x+h) - x}{h(\\sqrt{x+h}+\\sqrt{x})} = \\lim\\dfrac{1}{\\sqrt{x+h}+\\sqrt{x}}$.',
        'As $h\\to 0$: $\\dfrac{1}{2\\sqrt{x}}$.',
      ],
    },
    {
      prompt: 'Find all local extrema of $f(x) = x^3 - 3x$.',
      answer: 'Local max at $x=-1$, local min at $x=1$',
      steps: [
        '$f\'(x) = 3x^2 - 3 = 3(x-1)(x+1) = 0 \\Rightarrow x = \\pm 1$.',
        '$f\'\'(x) = 6x$. At $x=-1$: $f\'\'(-1) = -6 < 0$, local max.',
        'At $x=1$: $f\'\'(1) = 6 > 0$, local min.',
      ],
    },
    {
      prompt: 'If $f(x) = (x^2 + 1)^3$, find $f\'(x)$ by expanding first, then verify using the chain rule.',
      answer: '$f\'(x) = 6x(x^2+1)^2$',
      steps: [
        'Expand: $(x^2+1)^3 = x^6 + 3x^4 + 3x^2 + 1$.',
        'Differentiate term by term: $6x^5 + 12x^3 + 6x = 6x(x^4 + 2x^2 + 1) = 6x(x^2+1)^2$.',
        'Chain rule confirms: $3(x^2+1)^2 \\cdot 2x = 6x(x^2+1)^2$.',
      ],
    },
    {
      prompt: 'Show that $f(x) = e^{-x^2/2}$ satisfies $f\'(x) = -x f(x)$.',
      answer: 'Verified',
      steps: [
        'Chain rule: $f\'(x) = e^{-x^2/2}\\cdot\\tfrac{d}{dx}[-x^2/2] = e^{-x^2/2}\\cdot(-x)$.',
        'So $f\'(x) = -x e^{-x^2/2} = -x f(x)$.',
      ],
    },
  ];

  PS.registerTopic("calc-derivs-basic", {
    title: "Derivatives - basic rules",
    description: "Power, product, quotient, and basic trig/exp/log derivatives.",
    warmup:   [genDerivPowerSingle, genDerivCubicPoly],
    standard: [genDerivProductLinear, genDerivTrigExp, genDerivQuotientLinear],
    challenge: STATIC_DERIVS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: calc-chain
  // ==========================================================================

  // Pretty inner "a x + b" string for chain-rule problems. Handles a=+/-1.
  function innerLinear(a, b) {
    var aPart;
    if (a === 1) aPart = 'x';
    else if (a === -1) aPart = '-x';
    else aPart = a + 'x';
    return aPart + term(b, '').trim().replace(/^/, ' ');
  }

  // Format a scalar coefficient that multiplies a function, handling 1 and -1
  function coefStr(c) {
    if (c === 1) return '';
    if (c === -1) return '-';
    return c + '';
  }

  // Warmup: d/dx sin(a x + b)
  function genChainSinLinear(rng) {
    var a = rng.nonzeroInt(-6, 6);
    var b = rng.nonzeroInt(-9, 9);
    var inner = innerLinear(a, b);
    return {
      prompt: 'Differentiate $f(x) = \\sin(' + inner + ')$.',
      answer: '$f\'(x) = ' + coefStr(a) + '\\cos(' + inner + ')$',
      steps: [
        'Chain rule: $\\dfrac{d}{dx}[\\sin u] = \\cos u \\cdot u\'$.',
        'Inner function $u = ' + inner + '$, so $u\' = ' + a + '$.',
        'Result: $' + coefStr(a) + '\\cos(' + inner + ')$.',
      ],
    };
  }

  // Warmup: d/dx e^(ax+b)
  function genChainExpLinear(rng) {
    var a = rng.nonzeroInt(-6, 6);
    var b = rng.nonzeroInt(-9, 9);
    var inner = innerLinear(a, b);
    return {
      prompt: 'Differentiate $f(x) = e^{' + inner + '}$.',
      answer: '$f\'(x) = ' + coefStr(a) + 'e^{' + inner + '}$',
      steps: [
        'Chain rule: $\\dfrac{d}{dx}[e^u] = e^u \\cdot u\'$.',
        'Here $u = ' + inner + '$, so $u\' = ' + a + '$.',
        'Result: $' + coefStr(a) + 'e^{' + inner + '}$.',
      ],
    };
  }

  // Warmup: d/dx (a x + b)^n
  function genChainLinearPower(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-9, 9);
    var n = rng.int(2, 6);
    var newC = a * n;
    var inner = innerLinear(a, b);
    var newExp = n - 1 === 1 ? '' : '^{' + (n - 1) + '}';
    return {
      prompt: 'Differentiate $f(x) = (' + inner + ')^{' + n + '}$.',
      answer: '$f\'(x) = ' + newC + '(' + inner + ')' + newExp + '$',
      steps: [
        'Chain rule with power: $\\dfrac{d}{dx}[u^n] = n u^{n-1} u\'$.',
        '$u = ' + inner + '$, $u\' = ' + a + '$.',
        'Result: $' + n + '(' + inner + ')' + newExp + '\\cdot ' + a + ' = ' + newC + '(' + inner + ')' + newExp + '$.',
      ],
    };
  }

  // Standard: d/dx sin^n(a x + b)
  function genChainSinPower(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-6, 6);
    var n = rng.int(2, 5);
    var inner = innerLinear(a, b);
    var sinPow = n - 1 === 1 ? '\\sin' : '\\sin^{' + (n - 1) + '}';
    return {
      prompt: 'Differentiate $f(x) = \\sin^{' + n + '}(' + inner + ')$.',
      answer: '$f\'(x) = ' + (n * a) + sinPow + '(' + inner + ')\\cos(' + inner + ')$',
      steps: [
        'Rewrite as $[\\sin(' + inner + ')]^{' + n + '}$.',
        'Outer chain: $' + n + '[\\sin(\\cdots)]^{' + (n - 1) + '}\\cdot\\cos(\\cdots)\\cdot ' + a + '$.',
        'Multiply coefficients: $' + (n * a) + sinPow + '(\\cdots)\\cos(\\cdots)$.',
      ],
    };
  }

  // Standard: d/dx e^(a x^2 + b x)
  function genChainExpQuad(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-5, 5);
    // build inner a x^2 + b x with leading coefficient handling
    var axSq;
    if (a === 1) axSq = 'x^2';
    else if (a === -1) axSq = '-x^2';
    else axSq = a + 'x^2';
    var inner = axSq + term(b, 'x').trim().replace(/^/, ' ');
    // derivative coefficient on x: 2a; plus constant b
    var dx;
    var twoA = 2 * a;
    if (twoA === 1) dx = 'x';
    else if (twoA === -1) dx = '-x';
    else dx = twoA + 'x';
    var deriv = dx + term(b, '').trim().replace(/^/, ' ');
    return {
      prompt: 'Differentiate $f(x) = e^{' + inner + '}$.',
      answer: '$f\'(x) = (' + deriv + ')\\,e^{' + inner + '}$',
      steps: [
        'Chain rule: $\\dfrac{d}{dx}[e^u] = e^u u\'$.',
        '$u = ' + inner + '$, so $u\' = ' + deriv + '$.',
        'Result: $(' + deriv + ')e^{u}$.',
      ],
    };
  }

  var STATIC_CHAIN_CHALLENGE = [
    {
      prompt: 'Differentiate $f(x) = \\sin(\\cos(x^2))$.',
      answer: '$f\'(x) = -2x\\sin(x^2)\\cos(\\cos(x^2))$',
      steps: [
        'Outermost: $\\cos(\\cos(x^2))$ times the derivative of the inside.',
        'Next layer: derivative of $\\cos(x^2)$ is $-\\sin(x^2)\\cdot 2x$.',
        'Combine: $\\cos(\\cos(x^2))\\cdot(-\\sin(x^2))\\cdot 2x = -2x\\sin(x^2)\\cos(\\cos(x^2))$.',
      ],
    },
    {
      prompt: 'Differentiate $f(x) = e^{\\sin(3x)}$.',
      answer: '$f\'(x) = 3\\cos(3x)e^{\\sin(3x)}$',
      steps: [
        '$\\dfrac{d}{dx}[e^u] = e^u u\'$ with $u = \\sin(3x)$.',
        '$u\' = 3\\cos(3x)$.',
        'Result: $3\\cos(3x)e^{\\sin(3x)}$.',
      ],
    },
    {
      prompt: 'Differentiate $f(x) = \\sqrt{1 + \\tan(x^2)}$.',
      answer: '$f\'(x) = \\dfrac{x\\sec^2(x^2)}{\\sqrt{1 + \\tan(x^2)}}$',
      steps: [
        'Write as $(1 + \\tan(x^2))^{1/2}$.',
        'Outer: $\\tfrac{1}{2}(1 + \\tan(x^2))^{-1/2}$ times derivative of inside.',
        'Inside: derivative of $\\tan(x^2)$ is $\\sec^2(x^2)\\cdot 2x$.',
        'Combine: $\\tfrac{1}{2}(1+\\tan(x^2))^{-1/2}\\cdot 2x\\sec^2(x^2) = \\dfrac{x\\sec^2(x^2)}{\\sqrt{1+\\tan(x^2)}}$.',
      ],
    },
    {
      prompt: 'A 10-ft ladder rests against a wall. The bottom slides away at $2$ ft/s. How fast is the top sliding down when the bottom is $6$ ft from the wall?',
      answer: '$-\\dfrac{3}{2}$ ft/s (moving down at $1.5$ ft/s)',
      steps: [
        'Let $x$ = distance from wall, $y$ = height on wall. Then $x^2 + y^2 = 100$.',
        'Differentiate w.r.t. $t$: $2x\\dot x + 2y\\dot y = 0$.',
        'At $x=6$, $y = \\sqrt{100-36} = 8$. Given $\\dot x = 2$.',
        '$12\\cdot 2 + 16\\dot y = 0 \\Rightarrow \\dot y = -\\dfrac{24}{16} = -\\dfrac{3}{2}$ ft/s.',
      ],
    },
    {
      prompt: 'Water drains from a conical tank (radius $3$, height $6$) at $1$ m$^3$/s. How fast is the water level dropping when the water is $4$ m deep?',
      answer: '$-\\dfrac{1}{4\\pi}$ m/s',
      steps: [
        'By similar triangles $r/h = 3/6$, so $r = h/2$.',
        'Volume: $V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\pi (h/2)^2 h = \\tfrac{\\pi h^3}{12}$.',
        'Differentiate: $\\dot V = \\tfrac{\\pi h^2}{4}\\dot h$.',
        'Given $\\dot V = -1$ (draining), $h = 4$: $-1 = \\tfrac{16\\pi}{4}\\dot h = 4\\pi \\dot h$.',
        '$\\dot h = -\\dfrac{1}{4\\pi}$ m/s.',
      ],
    },
    {
      prompt: 'Use implicit differentiation to find $dy/dx$ if $x^2 + xy + y^2 = 7$.',
      answer: '$\\dfrac{dy}{dx} = -\\dfrac{2x+y}{x+2y}$',
      steps: [
        'Differentiate both sides w.r.t. $x$: $2x + y + x y\' + 2y y\' = 0$.',
        'Group terms with $y\'$: $y\'(x + 2y) = -(2x + y)$.',
        'Solve: $y\' = -\\dfrac{2x+y}{x+2y}$.',
      ],
    },
    {
      prompt: 'Find the slope of the tangent to $x^2 + y^2 = 25$ at $(3, 4)$.',
      answer: '$-\\dfrac{3}{4}$',
      steps: [
        'Implicit diff: $2x + 2y y\' = 0 \\Rightarrow y\' = -x/y$.',
        'At $(3,4)$: $y\' = -3/4$.',
      ],
    },
    {
      prompt: 'A spherical balloon is inflated so the radius grows at $2$ cm/s. How fast is the volume growing when $r = 5$ cm?',
      answer: '$200\\pi$ cm$^3$/s',
      steps: [
        '$V = \\tfrac{4}{3}\\pi r^3$.',
        '$\\dot V = 4\\pi r^2 \\dot r$.',
        'At $r=5, \\dot r = 2$: $\\dot V = 4\\pi\\cdot 25\\cdot 2 = 200\\pi$.',
      ],
    },
    {
      prompt: 'Differentiate $f(x) = \\ln(\\sec x + \\tan x)$ and simplify.',
      answer: '$f\'(x) = \\sec x$',
      steps: [
        'Chain rule: $f\'(x) = \\dfrac{\\sec x \\tan x + \\sec^2 x}{\\sec x + \\tan x}$.',
        'Factor numerator: $\\sec x(\\tan x + \\sec x)$.',
        'Cancel: $f\'(x) = \\sec x$.',
      ],
    },
    {
      prompt: 'A person $6$ ft tall walks away from a $15$-ft lamppost at $4$ ft/s. How fast is the tip of their shadow moving?',
      answer: '$\\dfrac{20}{3}$ ft/s',
      steps: [
        'Let $x$ = distance of person from post, $s$ = length of shadow. By similar triangles $\\dfrac{s}{6} = \\dfrac{x+s}{15}$, so $15s = 6(x+s)$, giving $s = \\dfrac{2x}{3}$.',
        'Tip of shadow at distance $x + s = x + \\dfrac{2x}{3} = \\dfrac{5x}{3}$ from post.',
        'Differentiate: rate is $\\dfrac{5}{3}\\dot x = \\dfrac{5}{3}\\cdot 4 = \\dfrac{20}{3}$ ft/s.',
      ],
    },
    {
      prompt: 'Differentiate $f(x) = x^x$ (for $x>0$).',
      answer: '$f\'(x) = x^x(\\ln x + 1)$',
      steps: [
        'Take $\\ln$: $\\ln f = x\\ln x$.',
        'Differentiate: $\\dfrac{f\'}{f} = \\ln x + 1$.',
        'Multiply by $f = x^x$: $f\'(x) = x^x(\\ln x + 1)$.',
      ],
      hint: 'Use logarithmic differentiation.',
    },
    {
      prompt: 'Differentiate $f(x) = (\\sin x)^{\\cos x}$.',
      answer: '$f\'(x) = (\\sin x)^{\\cos x}\\left(-\\sin x \\ln \\sin x + \\cos x \\cot x\\right)$',
      steps: [
        'Let $y = (\\sin x)^{\\cos x}$. Then $\\ln y = \\cos x\\ln\\sin x$.',
        'Differentiate: $\\dfrac{y\'}{y} = -\\sin x\\ln\\sin x + \\cos x\\cdot\\dfrac{\\cos x}{\\sin x}$.',
        'Multiply by $y$: $y\' = (\\sin x)^{\\cos x}(\\cos x\\cot x - \\sin x\\ln\\sin x)$.',
      ],
    },
    {
      prompt: 'Find $dy/dx$ if $\\sin(xy) = x$.',
      answer: '$\\dfrac{dy}{dx} = \\dfrac{1 - y\\cos(xy)}{x\\cos(xy)}$',
      steps: [
        'Differentiate both sides: $\\cos(xy)(y + xy\') = 1$.',
        'Expand: $y\\cos(xy) + xy\'\\cos(xy) = 1$.',
        'Solve: $y\' = \\dfrac{1 - y\\cos(xy)}{x\\cos(xy)}$.',
      ],
    },
    {
      prompt: 'Car $A$ travels north at $60$ mph, car $B$ travels east at $80$ mph from the same point. How fast is the distance between them changing one hour later?',
      answer: '$100$ mph',
      steps: [
        'After $t$ hours: $A$ at $(0, 60t)$, $B$ at $(80t, 0)$. Distance $D = \\sqrt{(60t)^2 + (80t)^2} = 100t$.',
        '$\\dot D = 100$ mph, constant.',
      ],
    },
    {
      prompt: 'Differentiate $f(x) = \\cos^3(5x^2 + 2)$.',
      answer: '$f\'(x) = -30x\\cos^2(5x^2+2)\\sin(5x^2+2)$',
      steps: [
        'Three layers. Outer: $3\\cos^2(\\cdot)$ times derivative of $\\cos(\\cdot)$.',
        'Middle: $-\\sin(\\cdot)$ times derivative of inside.',
        'Innermost: $5x^2 + 2$, derivative $10x$.',
        'Product: $3\\cos^2(5x^2+2)\\cdot(-\\sin(5x^2+2))\\cdot 10x = -30x\\cos^2(5x^2+2)\\sin(5x^2+2)$.',
      ],
    },
  ];

  PS.registerTopic("calc-chain", {
    title: "Chain rule and related rates",
    description: "Layered derivatives, implicit differentiation, and physical rate problems.",
    warmup:   [genChainSinLinear, genChainExpLinear, genChainLinearPower],
    standard: [genChainSinPower, genChainExpQuad],
    challenge: STATIC_CHAIN_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: calc-apps (uses of derivatives)
  // ==========================================================================

  // Warmup: tangent line to a quadratic at a given x
  function genTangentQuad(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-5, 5);
    var c = rng.int(-6, 6);
    var x0 = rng.int(-3, 3);
    var y0 = a * x0 * x0 + b * x0 + c;
    var slope = 2 * a * x0 + b;
    var yInt = y0 - slope * x0;
    return {
      prompt: 'Find the tangent line to $f(x) = ' + polyQuad(a, b, c) + '$ at $x = ' + x0 + '$.',
      answer: '$y = ' + leadTerm(slope, 'x') + term(yInt, '') + '$',
      steps: [
        'Point: $f(' + x0 + ') = ' + y0 + '$.',
        'Slope: $f\'(x) = ' + (2 * a) + 'x ' + term(b, '').trim() + '$, so $f\'(' + x0 + ') = ' + slope + '$.',
        'Tangent: $y - ' + y0 + ' = ' + slope + '(x - ' + x0 + ')$.',
        'Simplify: $y = ' + leadTerm(slope, 'x') + term(yInt, '') + '$.',
      ],
    };
  }

  // Warmup: tangent to cubic
  function genTangentCubic(rng) {
    var a = rng.nonzeroInt(-3, 3);
    var b = rng.nonzeroInt(-4, 4);
    var x0 = rng.int(-2, 2);
    var y0 = a * x0 * x0 * x0 + b * x0;
    var slope = 3 * a * x0 * x0 + b;
    var yInt = y0 - slope * x0;
    var fStr = leadTerm(a, 'x^3') + term(b, 'x');
    return {
      prompt: 'Find the tangent line to $f(x) = ' + fStr + '$ at $x = ' + x0 + '$.',
      answer: '$y = ' + leadTerm(slope, 'x') + term(yInt, '') + '$',
      steps: [
        '$f(' + x0 + ') = ' + y0 + '$.',
        '$f\'(x) = ' + leadTerm(3 * a, 'x^2') + term(b, '') + '$. At $x=' + x0 + '$: slope $= ' + slope + '$.',
        'Tangent: $y = ' + slope + '(x - ' + x0 + ') + ' + y0 + ' = ' + leadTerm(slope, 'x') + term(yInt, '') + '$.',
      ],
    };
  }

  // Standard: extrema of cubic f(x) = x^3 - 3px where critical pts at +/- sqrt(p)
  // We'll use integer-friendly version: f(x) = x^3 - 3 k^2 x for a chosen k
  function genExtremaCubic(rng) {
    var k = rng.int(1, 4);
    // f(x) = x^3 - 3 k^2 x; f'(x) = 3x^2 - 3k^2; critical points x = +/- k
    var xMax = -k, xMin = k;
    var fMax = xMax * xMax * xMax - 3 * k * k * xMax;
    var fMin = xMin * xMin * xMin - 3 * k * k * xMin;
    return {
      prompt: 'Find the local extrema of $f(x) = x^3 - ' + (3 * k * k) + 'x$.',
      answer: 'Local max at $(' + xMax + ', ' + fMax + ')$; local min at $(' + xMin + ', ' + fMin + ')$.',
      steps: [
        '$f\'(x) = 3x^2 - ' + (3 * k * k) + ' = 3(x^2 - ' + (k * k) + ')$.',
        'Set $f\'(x) = 0$: $x = \\pm ' + k + '$.',
        '$f\'\'(x) = 6x$. At $x = ' + xMax + '$: $f\'\'(' + xMax + ') = ' + (6 * xMax) + ' < 0$, local max.',
        'At $x = ' + xMin + '$: $f\'\'(' + xMin + ') = ' + (6 * xMin) + ' > 0$, local min.',
        'Values: $f(' + xMax + ') = ' + fMax + '$, $f(' + xMin + ') = ' + fMin + '$.',
      ],
    };
  }

  var STATIC_APPS_STANDARD = [
    {
      prompt: 'Find the absolute extrema of $f(x) = x^3 - 3x + 1$ on $[-2, 2]$.',
      answer: 'Absolute max $3$ (at $x=-1$ and $x=2$), absolute min $-1$ (at $x=-2$ and $x=1$).',
      steps: [
        '$f\'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$, both in the interval.',
        'Evaluate: $f(-2) = -1$, $f(-1) = 3$, $f(1) = -1$, $f(2) = 3$.',
        'Max is $3$, min is $-1$.',
      ],
    },
    {
      prompt: 'Find the absolute extrema of $f(x) = x^4 - 2x^2 + 3$ on $[-2, 2]$.',
      answer: 'Max $11$ at $x=\\pm 2$; min $2$ at $x=\\pm 1$.',
      steps: [
        '$f\'(x) = 4x^3 - 4x = 4x(x^2-1)$, zeros at $x=0, \\pm 1$.',
        '$f(0)=3$, $f(\\pm 1)=2$, $f(\\pm 2)=11$.',
        'Max $11$, min $2$.',
      ],
    },
    {
      prompt: 'Where is $f(x) = x\\ln x$ (for $x > 0$) increasing and decreasing?',
      answer: 'Decreasing on $(0, 1/e)$, increasing on $(1/e, \\infty)$.',
      steps: [
        '$f\'(x) = \\ln x + 1$.',
        'Zero when $\\ln x = -1$, i.e. $x = 1/e$.',
        'For $x < 1/e$: $f\'<0$ (decreasing). For $x > 1/e$: $f\' > 0$ (increasing).',
      ],
    },
    {
      prompt: 'Find the intervals of concavity for $f(x) = x^4 - 6x^2$.',
      answer: 'Concave up on $(-\\infty, -1)\\cup(1, \\infty)$, concave down on $(-1, 1)$.',
      steps: [
        '$f\'(x) = 4x^3 - 12x$, $f\'\'(x) = 12x^2 - 12 = 12(x^2 - 1)$.',
        'Zero at $x = \\pm 1$.',
        '$f\'\' > 0$ outside $[-1,1]$ (concave up), $f\'\' < 0$ inside (concave down).',
      ],
    },
    {
      prompt: 'Apply the mean value theorem to $f(x) = x^2$ on $[1, 3]$ and find $c$.',
      answer: '$c = 2$',
      steps: [
        'MVT gives some $c$ with $f\'(c) = \\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9-1}{2} = 4$.',
        '$f\'(x) = 2x$, so $2c = 4 \\Rightarrow c = 2$.',
      ],
    },
    {
      prompt: 'Use linearization of $f(x) = \\sqrt{x}$ at $x = 9$ to approximate $\\sqrt{9.2}$.',
      answer: '$\\approx 3.0333$',
      steps: [
        '$f(9) = 3$, $f\'(x) = \\dfrac{1}{2\\sqrt x}$, $f\'(9) = \\dfrac{1}{6}$.',
        '$L(x) = 3 + \\dfrac{1}{6}(x - 9)$.',
        '$L(9.2) = 3 + \\dfrac{0.2}{6} \\approx 3.0333$.',
      ],
    },
    {
      prompt: 'Find the inflection points of $f(x) = x^3 - 3x^2 + 2$.',
      answer: 'Inflection at $(1, 0)$.',
      steps: [
        '$f\'(x) = 3x^2 - 6x$, $f\'\'(x) = 6x - 6$.',
        '$f\'\' = 0$ at $x = 1$; concavity changes there.',
        '$f(1) = 1 - 3 + 2 = 0$. Inflection point $(1, 0)$.',
      ],
    },
    {
      prompt: 'On what interval is $f(x) = x^3 - 12x$ decreasing?',
      answer: '$(-2, 2)$',
      steps: [
        '$f\'(x) = 3x^2 - 12 = 3(x^2 - 4)$.',
        'Negative when $|x| < 2$.',
      ],
    },
    {
      prompt: 'Find the critical points of $f(x) = xe^{-x}$.',
      answer: '$x = 1$ (local max).',
      steps: [
        '$f\'(x) = e^{-x} - xe^{-x} = e^{-x}(1 - x)$.',
        'Zero when $x = 1$.',
        '$f\'$ is positive for $x < 1$, negative for $x > 1$: local max at $x = 1$.',
      ],
    },
    {
      prompt: 'Find the equation of the tangent line to $y = \\ln x$ at $x = e$.',
      answer: '$y = x/e$',
      steps: [
        '$y(e) = 1$, $y\'(x) = 1/x$, so slope at $x=e$ is $1/e$.',
        'Point-slope: $y - 1 = (1/e)(x - e) = x/e - 1$.',
        'So $y = x/e$.',
      ],
    },
    {
      prompt: 'Find the tangent line to $y = \\sin x$ at $x = \\pi/6$.',
      answer: '$y = \\dfrac{\\sqrt 3}{2}(x - \\pi/6) + 1/2$',
      steps: [
        '$y(\\pi/6) = 1/2$, $y\'(x) = \\cos x$, $y\'(\\pi/6) = \\sqrt 3/2$.',
        'Tangent line: $y - 1/2 = (\\sqrt 3/2)(x - \\pi/6)$.',
      ],
    },
    {
      prompt: 'A function $f$ satisfies $f(2) = 5$ and $f\'(2) = 3$. Estimate $f(2.1)$.',
      answer: '$\\approx 5.3$',
      steps: [
        'Linear approximation: $f(x) \\approx f(2) + f\'(2)(x - 2)$.',
        'At $x = 2.1$: $5 + 3(0.1) = 5.3$.',
      ],
    },
    {
      prompt: 'Find the absolute max of $f(x) = x\\sqrt{4 - x^2}$ on $[-2, 2]$.',
      answer: 'Max $2$ at $x = \\sqrt 2$.',
      steps: [
        '$f\'(x) = \\sqrt{4 - x^2} + x\\cdot\\dfrac{-x}{\\sqrt{4-x^2}} = \\dfrac{4 - 2x^2}{\\sqrt{4-x^2}}$.',
        'Zero when $x^2 = 2$: $x = \\pm\\sqrt 2$.',
        'Evaluate: $f(\\sqrt 2) = \\sqrt 2\\cdot\\sqrt 2 = 2$, $f(-\\sqrt 2) = -2$, $f(\\pm 2) = 0$.',
        'Max $= 2$.',
      ],
    },
    {
      prompt: 'For $f(x) = 2x^3 - 9x^2 + 12x$, find intervals where $f$ is concave up.',
      answer: '$x > 3/2$',
      steps: [
        '$f\'\'(x) = 12x - 18$.',
        '$f\'\' > 0$ when $x > 3/2$.',
      ],
    },
  ];

  var STATIC_APPS_CHALLENGE = [
    {
      prompt: 'A rectangular pen is to be built with $100$ m of fence, with one side against a wall (so no fence on that side). What dimensions maximize the area?',
      answer: '$50 \\times 25$ m; area $1250$ m$^2$.',
      steps: [
        'Let $x$ = side parallel to wall, $y$ = other two sides. Then $x + 2y = 100$.',
        'Area $A = xy = (100 - 2y)y = 100y - 2y^2$.',
        '$A\'(y) = 100 - 4y = 0 \\Rightarrow y = 25$.',
        '$A\'\'(y) = -4 < 0$, confirming maximum.',
        'Then $x = 100 - 50 = 50$. Area $= 1250$ m$^2$.',
      ],
    },
    {
      prompt: 'Find the point on the parabola $y = x^2$ closest to the point $(0, 2)$.',
      answer: '$\\left(\\pm\\sqrt{3/2},\\ 3/2\\right)$',
      steps: [
        'Minimize $D^2 = x^2 + (x^2 - 2)^2$ over $x$.',
        'Differentiate: $\\dfrac{d(D^2)}{dx} = 2x + 2(x^2 - 2)(2x) = 2x(1 + 2(x^2 - 2)) = 2x(2x^2 - 3)$.',
        'Set to zero: $x = 0$ or $x^2 = 3/2$.',
        '$x = 0$ gives $D = 2$; $x = \\pm\\sqrt{3/2}$ gives $y = 3/2$, $D = \\sqrt{3/2 + 1/4} = \\sqrt{7/4}$, which is smaller.',
        'Closest points: $\\left(\\pm\\sqrt{3/2}, 3/2\\right)$.',
      ],
    },
    {
      prompt: 'A cylindrical can (no top) must hold $1$ liter ($1000$ cm$^3$). What radius minimizes the material used?',
      answer: '$r = \\sqrt[3]{1000/\\pi}$ cm $\\approx 6.83$ cm.',
      steps: [
        'Volume: $\\pi r^2 h = 1000$, so $h = \\dfrac{1000}{\\pi r^2}$.',
        'Surface (bottom + side): $S = \\pi r^2 + 2\\pi r h = \\pi r^2 + \\dfrac{2000}{r}$.',
        '$S\'(r) = 2\\pi r - \\dfrac{2000}{r^2} = 0 \\Rightarrow r^3 = \\dfrac{1000}{\\pi}$.',
        '$r = \\sqrt[3]{1000/\\pi} \\approx 6.83$ cm.',
      ],
    },
    {
      prompt: 'Show that $f(x) = x^3 + x - 1$ has exactly one real root.',
      answer: 'Exactly one real root (between $0$ and $1$).',
      steps: [
        '$f\'(x) = 3x^2 + 1 > 0$ for all $x$, so $f$ is strictly increasing.',
        'A strictly increasing continuous function has at most one root.',
        '$f(0) = -1 < 0$ and $f(1) = 1 > 0$, so by IVT there is exactly one root.',
      ],
    },
    {
      prompt: 'Apply Rolle\'s theorem to $f(x) = x^3 - 3x$ on $[-\\sqrt 3, \\sqrt 3]$.',
      answer: 'Rolle gives $c = \\pm 1$.',
      steps: [
        'Check endpoints: $f(\\pm\\sqrt 3) = \\pm 3\\sqrt 3 \\mp 3\\sqrt 3 = 0$. So $f(-\\sqrt 3) = f(\\sqrt 3) = 0$.',
        '$f$ is a polynomial, hence continuous and differentiable. Rolle applies.',
        '$f\'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$.',
        'Both $\\pm 1$ lie in $(-\\sqrt 3, \\sqrt 3)$ and satisfy $f\'(c) = 0$.',
      ],
    },
    {
      prompt: 'A box with square base and open top must have volume $32000$ cm$^3$. Find the dimensions minimizing the material.',
      answer: 'Base $40 \\times 40$ cm, height $20$ cm.',
      steps: [
        'Let base side $x$, height $h$. Volume: $x^2 h = 32000$, so $h = 32000/x^2$.',
        'Surface $S = x^2 + 4xh = x^2 + \\dfrac{128000}{x}$.',
        '$S\'(x) = 2x - \\dfrac{128000}{x^2} = 0 \\Rightarrow x^3 = 64000 \\Rightarrow x = 40$.',
        '$h = 32000/1600 = 20$.',
      ],
    },
    {
      prompt: 'A farmer wants to fence a rectangular field and divide it in half with one extra fence parallel to one side. With $600$ m of fence, what is the maximum enclosed area?',
      answer: '$15000$ m$^2$ ($150 \\times 100$).',
      steps: [
        'Let $x$ be the length of the divided direction (three fence segments), $y$ the other. Then $3x + 2y = 600$, so $y = (600 - 3x)/2$.',
        'Area $A = xy = x(600 - 3x)/2 = 300x - 1.5x^2$.',
        '$A\'(x) = 300 - 3x = 0 \\Rightarrow x = 100$. Then $y = 150$.',
        'Max area: $15000$ m$^2$.',
      ],
    },
    {
      prompt: 'A wire of length $L$ is cut into two pieces. One is bent into a square, the other a circle. How should it be cut to minimize total area?',
      answer: 'Square side $\\dfrac{L}{\\pi + 4}$, circle radius $\\dfrac{L}{2(\\pi + 4)}$.',
      steps: [
        'Let square use length $s$, circle uses $L - s$. Square side $s/4$, area $s^2/16$. Circle circumference $L-s$ gives radius $(L-s)/(2\\pi)$, area $(L-s)^2/(4\\pi)$.',
        'Total $A(s) = s^2/16 + (L-s)^2/(4\\pi)$.',
        '$A\'(s) = s/8 - (L-s)/(2\\pi) = 0 \\Rightarrow \\pi s = 4(L-s) \\Rightarrow s = \\dfrac{4L}{\\pi + 4}$.',
        'Square side $s/4 = L/(\\pi + 4)$, circle radius $(L - s)/(2\\pi) = L/(2(\\pi+4))$.',
      ],
    },
    {
      prompt: 'Find two positive numbers whose sum is $20$ and whose product is maximized.',
      answer: '$10$ and $10$; max product $100$.',
      steps: [
        'Let numbers be $x$ and $20 - x$. Product $P = x(20 - x) = 20x - x^2$.',
        '$P\'(x) = 20 - 2x = 0 \\Rightarrow x = 10$.',
        '$P(10) = 100$.',
      ],
    },
    {
      prompt: 'Newton\'s method: starting from $x_0 = 2$, compute two iterations to approximate $\\sqrt 3$ (a root of $f(x) = x^2 - 3$).',
      answer: '$x_1 = 7/4$, $x_2 = 97/56 \\approx 1.7321$.',
      steps: [
        '$f(x) = x^2 - 3$, $f\'(x) = 2x$.',
        '$x_1 = x_0 - f(x_0)/f\'(x_0) = 2 - 1/4 = 7/4$.',
        '$x_2 = 7/4 - \\dfrac{(7/4)^2 - 3}{2\\cdot 7/4} = 7/4 - \\dfrac{1/16}{7/2} = 7/4 - 1/56 = 97/56$.',
      ],
    },
    {
      prompt: 'For what value of $k$ does $f(x) = x^2 - kx + 4$ have its minimum value equal to $0$?',
      answer: '$k = \\pm 4$',
      steps: [
        'Vertex at $x = k/2$; $f(k/2) = k^2/4 - k^2/2 + 4 = 4 - k^2/4$.',
        'Set $4 - k^2/4 = 0 \\Rightarrow k^2 = 16 \\Rightarrow k = \\pm 4$.',
      ],
    },
    {
      prompt: 'A ball is thrown upward with velocity $40$ m/s. Its height is $h(t) = 40t - 5t^2$. Find max height.',
      answer: '$80$ m',
      steps: [
        '$h\'(t) = 40 - 10t = 0 \\Rightarrow t = 4$.',
        '$h(4) = 160 - 80 = 80$ m.',
      ],
    },
    {
      prompt: 'Show that the equation $\\cos x = x$ has exactly one real solution.',
      answer: 'Unique solution near $x \\approx 0.739$.',
      steps: [
        'Let $g(x) = \\cos x - x$. Then $g\'(x) = -\\sin x - 1 \\le 0$, with equality only at isolated points. So $g$ is strictly decreasing.',
        '$g(0) = 1 > 0$ and $g(\\pi/2) = -\\pi/2 < 0$, so IVT gives a root.',
        'Strict monotonicity ensures uniqueness.',
      ],
    },
    {
      prompt: 'Prove that $\\sin x \\le x$ for all $x \\ge 0$.',
      answer: 'Proved by MVT / monotonicity.',
      steps: [
        'Let $f(x) = x - \\sin x$. Then $f(0) = 0$ and $f\'(x) = 1 - \\cos x \\ge 0$.',
        'So $f$ is nondecreasing on $[0,\\infty)$.',
        'Thus $f(x) \\ge f(0) = 0$, i.e. $x \\ge \\sin x$.',
      ],
    },
    {
      prompt: 'What positive number minimizes the sum of the number and its reciprocal?',
      answer: '$x = 1$; min value $2$.',
      steps: [
        'Let $f(x) = x + 1/x$ for $x > 0$.',
        '$f\'(x) = 1 - 1/x^2 = 0 \\Rightarrow x = 1$.',
        '$f\'\'(x) = 2/x^3 > 0$, so minimum. $f(1) = 2$.',
      ],
    },
  ];

  PS.registerTopic("calc-apps", {
    title: "Uses of derivatives",
    description: "Tangent lines, extrema, optimization, and mean value theorem.",
    warmup:   [genTangentQuad, genTangentCubic],
    standard: [genExtremaCubic, STATIC_APPS_STANDARD],
    challenge: STATIC_APPS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 5: calc-integrals
  // ==========================================================================

  // Warmup: integral of a x^n
  function genIntPower(rng) {
    // Pick n first so that (n+1) divides evenly into a chosen value
    var n = rng.int(2, 6); // avoid n=1 to keep prompt clean
    var newP = n + 1;
    // Pick coefficient so the result is a clean integer: a = k * newP for small k
    var k = rng.nonzeroInt(-4, 4);
    var a = k * newP;
    var xTermOut = 'x^{' + newP + '}';
    var xTermIn = n === 1 ? 'x' : 'x^{' + n + '}';
    var coefOut = k === 1 ? '' : (k === -1 ? '-' : k + '');
    var inCoef = a === 1 ? '' : (a === -1 ? '-' : a + '');
    return {
      prompt: 'Evaluate $\\displaystyle \\int ' + inCoef + xTermIn + '\\,dx$.',
      answer: '$' + coefOut + xTermOut + ' + C$',
      steps: [
        'Power rule for integration: $\\int x^n \\, dx = \\dfrac{x^{n+1}}{n+1} + C$.',
        'Pull out the constant: $' + a + '\\cdot\\dfrac{x^{' + newP + '}}{' + newP + '} + C$.',
        'Simplify: $' + coefOut + xTermOut + ' + C$.',
      ],
    };
  }

  // Warmup: integral of polynomial
  function genIntPoly(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-6, 6);
    var c = rng.nonzeroInt(-9, 9);
    return {
      prompt: 'Evaluate $\\displaystyle \\int (' + polyQuad(a, b, c) + ')\\,dx$.',
      answer: '$\\dfrac{' + a + '}{3}x^3 ' + term(b, '').trim().replace(' ', '') + '\\dfrac{1}{2}x^2 ' + term(c, 'x').trim() + ' + C$',
      steps: [
        'Integrate each term.',
        '$\\int ' + a + 'x^2\\,dx = \\dfrac{' + a + '}{3}x^3$.',
        '$\\int ' + b + 'x\\,dx = \\dfrac{' + b + '}{2}x^2$.',
        '$\\int ' + c + '\\,dx = ' + c + 'x$.',
        'Add $+ C$.',
      ],
    };
  }

  // Standard: integral of sin(ax) (positive a for cleanliness)
  function genIntSinLinear(rng) {
    var a = rng.int(2, 6);
    return {
      prompt: 'Evaluate $\\displaystyle \\int \\sin(' + a + 'x)\\,dx$.',
      answer: '$-\\dfrac{1}{' + a + '}\\cos(' + a + 'x) + C$',
      steps: [
        '$\\int \\sin u\\,du = -\\cos u + C$.',
        'With $u = ' + a + 'x$, $du = ' + a + '\\,dx$, so $dx = du/' + a + '$.',
        'Result: $-\\dfrac{1}{' + a + '}\\cos(' + a + 'x) + C$.',
      ],
    };
  }

  // Standard: integral of e^(ax) (positive a)
  function genIntExpLinear(rng) {
    var a = rng.int(2, 6);
    return {
      prompt: 'Evaluate $\\displaystyle \\int e^{' + a + 'x}\\,dx$.',
      answer: '$\\dfrac{1}{' + a + '}e^{' + a + 'x} + C$',
      steps: [
        '$\\int e^u\\,du = e^u + C$.',
        'Let $u = ' + a + 'x$, $du = ' + a + 'dx$.',
        '$\\int e^{' + a + 'x}dx = \\dfrac{1}{' + a + '}e^{' + a + 'x} + C$.',
      ],
    };
  }

  // Standard: definite integral of polynomial
  function genDefIntPoly(rng) {
    var a = rng.nonzeroInt(-4, 4);
    var b = rng.nonzeroInt(-5, 5);
    var lo = rng.int(-2, 1);
    var hi = lo + rng.int(1, 3);
    var F = function (x) { return a * x * x * x / 3 + b * x * x / 2; };
    // We evaluate numerically and present as an exact fraction
    // Using integer form: 6*(a/3 x^3 + b/2 x^2) = 2 a x^3 + 3 b x^2
    var G = function (x) { return 2 * a * x * x * x + 3 * b * x * x; };
    var numerator = G(hi) - G(lo);
    // Integral = numerator / 6
    var reduced = frac(numerator, 6);
    return {
      prompt: 'Evaluate $\\displaystyle \\int_{' + lo + '}^{' + hi + '} (' + a + 'x^2 ' + term(b, 'x').trim() + ')\\,dx$.',
      answer: '$' + reduced + '$',
      steps: [
        'Antiderivative: $F(x) = \\dfrac{' + a + '}{3}x^3 + \\dfrac{' + b + '}{2}x^2$.',
        'Evaluate at bounds: $F(' + hi + ') - F(' + lo + ')$.',
        'Compute to get $' + reduced + '$.',
      ],
    };
  }

  var STATIC_INTEGRALS_CHALLENGE = [
    {
      prompt: 'Use the definition of the Riemann integral to show $\\displaystyle \\int_0^1 x^2 \\, dx = \\dfrac{1}{3}$.',
      answer: '$\\dfrac{1}{3}$',
      steps: [
        'Partition $[0,1]$ into $n$ equal pieces of width $1/n$, with right endpoints $x_i = i/n$.',
        'Riemann sum: $S_n = \\sum_{i=1}^n (i/n)^2 \\cdot (1/n) = \\dfrac{1}{n^3}\\sum_{i=1}^n i^2$.',
        'Formula: $\\sum_{i=1}^n i^2 = \\dfrac{n(n+1)(2n+1)}{6}$.',
        '$S_n = \\dfrac{(n+1)(2n+1)}{6n^2} = \\dfrac{2n^2 + 3n + 1}{6n^2}$.',
        'As $n \\to \\infty$: $S_n \\to 2/6 = 1/3$.',
      ],
    },
    {
      prompt: 'Find the area between $y = x^2$ and $y = 2x$ over the interval where they enclose a region.',
      answer: '$\\dfrac{4}{3}$',
      steps: [
        'Intersections: $x^2 = 2x \\Rightarrow x(x - 2) = 0 \\Rightarrow x = 0, 2$.',
        'On $[0, 2]$, $2x \\ge x^2$.',
        'Area $= \\int_0^2 (2x - x^2)dx = [x^2 - x^3/3]_0^2 = 4 - 8/3 = 4/3$.',
      ],
    },
    {
      prompt: 'Find the area between $y = \\sin x$ and $y = \\cos x$ on $[0, \\pi/4]$.',
      answer: '$\\sqrt 2 - 1$',
      steps: [
        'On $[0, \\pi/4]$, $\\cos x \\ge \\sin x$.',
        'Area $= \\int_0^{\\pi/4}(\\cos x - \\sin x)dx = [\\sin x + \\cos x]_0^{\\pi/4}$.',
        'At $\\pi/4$: $\\sqrt 2/2 + \\sqrt 2/2 = \\sqrt 2$. At $0$: $0 + 1 = 1$.',
        'Difference: $\\sqrt 2 - 1$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_{-1}^{1}|x|\\,dx$.',
      answer: '$1$',
      steps: [
        'Split at $0$: $\\int_{-1}^0(-x)dx + \\int_0^1 x\\,dx$.',
        'First: $[-x^2/2]_{-1}^0 = 0 - (-1/2) = 1/2$.',
        'Second: $[x^2/2]_0^1 = 1/2$.',
        'Total: $1$.',
      ],
    },
    {
      prompt: 'Find $\\displaystyle \\int_0^{\\pi} |\\sin x|\\,dx$.',
      answer: '$2$',
      steps: [
        'On $[0, \\pi]$, $\\sin x \\ge 0$, so $|\\sin x| = \\sin x$.',
        '$\\int_0^\\pi \\sin x\\,dx = [-\\cos x]_0^\\pi = -\\cos\\pi + \\cos 0 = 1 + 1 = 2$.',
      ],
    },
    {
      prompt: 'Find the area enclosed by $y = x^3$ and $y = x$.',
      answer: '$\\dfrac{1}{2}$',
      steps: [
        'Intersections: $x^3 = x \\Rightarrow x(x-1)(x+1) = 0$, so $x = -1, 0, 1$.',
        'By symmetry compute $2\\int_0^1 (x - x^3)dx = 2[x^2/2 - x^4/4]_0^1 = 2(1/2 - 1/4) = 1/2$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_1^4 \\sqrt x\\,dx$.',
      answer: '$\\dfrac{14}{3}$',
      steps: [
        'Antiderivative: $\\dfrac{2}{3}x^{3/2}$.',
        'At $4$: $\\dfrac{2}{3}\\cdot 8 = 16/3$. At $1$: $2/3$.',
        'Difference: $14/3$.',
      ],
    },
    {
      prompt: 'Find the area between $y = e^x$, $y = 1$, from $x = 0$ to $x = 1$.',
      answer: '$e - 2$',
      steps: [
        'On $[0, 1]$, $e^x \\ge 1$.',
        '$\\int_0^1 (e^x - 1)dx = [e^x - x]_0^1 = (e - 1) - (1 - 0) = e - 2$.',
      ],
    },
    {
      prompt: 'A Riemann sum for $\\displaystyle \\int_0^1 f(x)dx$ uses $4$ subintervals with right endpoints. Compute it for $f(x) = x$.',
      answer: '$\\dfrac{5}{8}$',
      steps: [
        'Right endpoints: $1/4, 2/4, 3/4, 4/4$; width $1/4$.',
        'Sum: $(1/4)(1/4 + 1/2 + 3/4 + 1) = (1/4)(10/4) = 10/16 = 5/8$.',
        '(Exact value of the integral is $1/2$; right endpoint overestimates.)',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^3 (x^2 - 4)\\,dx$ and interpret the sign.',
      answer: '$-3$ (net signed area; below axis exceeds above)',
      steps: [
        'Antiderivative: $x^3/3 - 4x$.',
        'At $3$: $9 - 12 = -3$. At $0$: $0$.',
        'Integral equals $-3$, negative because on most of $[0,3]$ the function is below the axis.',
      ],
    },
    {
      prompt: 'Use the substitution $u = x^2$ to compute $\\displaystyle \\int_0^1 x e^{x^2}\\,dx$.',
      answer: '$\\dfrac{e - 1}{2}$',
      steps: [
        '$u = x^2$, $du = 2x\\,dx$, so $x\\,dx = du/2$.',
        'When $x=0, u=0$; when $x=1, u=1$.',
        '$\\int_0^1 e^u \\cdot du/2 = [e^u/2]_0^1 = (e-1)/2$.',
      ],
    },
    {
      prompt: 'Find the area of the region bounded by $y = 4 - x^2$ and the $x$-axis.',
      answer: '$\\dfrac{32}{3}$',
      steps: [
        'Zeros: $x = \\pm 2$.',
        '$\\int_{-2}^2 (4 - x^2)dx = [4x - x^3/3]_{-2}^2 = (8 - 8/3) - (-8 + 8/3) = 16 - 16/3 = 32/3$.',
      ],
    },
    {
      prompt: 'Use $\\displaystyle \\int_a^b f\'(x)dx = f(b) - f(a)$ to compute $\\displaystyle \\int_0^{\\pi/2}\\cos x\\,dx$.',
      answer: '$1$',
      steps: [
        'Antiderivative of $\\cos x$ is $\\sin x$.',
        '$[\\sin x]_0^{\\pi/2} = 1 - 0 = 1$.',
      ],
    },
    {
      prompt: 'Find the area between $y = x^2$ and $y = x + 2$.',
      answer: '$\\dfrac{9}{2}$',
      steps: [
        'Intersections: $x^2 = x + 2 \\Rightarrow x^2 - x - 2 = 0 \\Rightarrow (x-2)(x+1) = 0$, so $x = -1, 2$.',
        'On $[-1, 2]$, $x + 2 \\ge x^2$.',
        '$\\int_{-1}^2 (x + 2 - x^2)dx = [x^2/2 + 2x - x^3/3]_{-1}^2$.',
        'At $2$: $2 + 4 - 8/3 = 18/3 - 8/3 \\cdot 0 + ...$ Careful: $2 + 4 - 8/3 = 6 - 8/3 = 10/3$. At $-1$: $1/2 - 2 + 1/3 = -7/6$.',
        'Difference: $10/3 - (-7/6) = 20/6 + 7/6 = 27/6 = 9/2$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int_{-1}^{1} (3x^4 - 2x^2 + 1)\\,dx$.',
      answer: '$\\dfrac{28}{15}$',
      steps: [
        'Antiderivative: $3x^5/5 - 2x^3/3 + x$.',
        'At $1$: $3/5 - 2/3 + 1 = 9/15 - 10/15 + 15/15 = 14/15$.',
        'At $-1$: $-3/5 + 2/3 - 1 = -14/15$.',
        'Difference: $14/15 - (-14/15) = 28/15$.',
      ],
    },
  ];

  PS.registerTopic("calc-integrals", {
    title: "Integrals - antiderivatives and area",
    description: "Power rule, basic trig/exp integrals, definite integrals, and area between curves.",
    warmup:   [genIntPower, genIntPoly],
    standard: [genIntSinLinear, genIntExpLinear, genDefIntPoly],
    challenge: STATIC_INTEGRALS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 6: calc-ftc (Fundamental Theorem of Calculus)
  // ==========================================================================

  // Warmup: definite integral of a x^n on [lo, hi]
  function genFTCPower(rng) {
    var a = rng.nonzeroInt(-6, 6);
    var n = rng.int(2, 4);
    var lo = rng.int(0, 2);
    var hi = lo + rng.int(1, 3);
    // Integral = a/(n+1) * (hi^(n+1) - lo^(n+1))
    var hiP = Math.pow(hi, n + 1);
    var loP = Math.pow(lo, n + 1);
    var num = a * (hiP - loP);
    var den = n + 1;
    var aStr = a === 1 ? '' : (a === -1 ? '-' : a + '');
    return {
      prompt: 'Evaluate $\\displaystyle \\int_{' + lo + '}^{' + hi + '} ' + aStr + 'x^{' + n + '}\\,dx$.',
      answer: '$' + frac(num, den) + '$',
      steps: [
        'Antiderivative: $\\dfrac{' + a + '}{' + den + '}x^{' + den + '}$.',
        'Evaluate at $x = ' + hi + '$: $\\dfrac{' + a + '}{' + den + '}\\cdot ' + hiP + '$.',
        'Evaluate at $x = ' + lo + '$: $\\dfrac{' + a + '}{' + den + '}\\cdot ' + loP + '$.',
        'Difference: $' + frac(num, den) + '$.',
      ],
    };
  }

  // Warmup: definite integral of constant * (a x + b)
  function genFTCLinear(rng) {
    var a = rng.nonzeroInt(-5, 5);
    var b = rng.nonzeroInt(-6, 6);
    var lo = rng.int(-2, 1);
    var hi = lo + rng.int(1, 3);
    // Integral = a/2 (hi^2 - lo^2) + b (hi - lo)
    var val = a * (hi * hi - lo * lo) / 2 + b * (hi - lo);
    // represent as fraction with denom 2
    var num2 = a * (hi * hi - lo * lo) + 2 * b * (hi - lo);
    return {
      prompt: 'Evaluate $\\displaystyle \\int_{' + lo + '}^{' + hi + '} (' + a + 'x ' + term(b, '').trim() + ')\\,dx$.',
      answer: '$' + frac(num2, 2) + '$',
      steps: [
        'Antiderivative: $\\dfrac{' + a + '}{2}x^2 ' + term(b, 'x').trim() + '$.',
        'At $x = ' + hi + '$: value is $\\dfrac{' + a + '\\cdot ' + (hi * hi) + '}{2} + ' + b + '\\cdot ' + hi + '$.',
        'At $x = ' + lo + '$: similar.',
        'Subtract to get $' + frac(num2, 2) + '$.',
      ],
    };
  }

  // Standard: d/dx of integral from a to g(x) using FTC part 1 + chain rule
  // F(x) = int_a^{x^k} f(t) dt => F'(x) = f(x^k) * k x^{k-1}
  function genFTCPart1Chain(rng) {
    var k = rng.int(2, 4);
    var kind = rng.int(0, 2);
    if (kind === 0) {
      // int_0^{x^k} t^2 dt, derivative = (x^k)^2 * k x^{k-1} = k x^{2k + k - 1}
      return {
        prompt: 'Let $\\displaystyle F(x) = \\int_0^{x^{' + k + '}} t^2\\,dt$. Find $F\'(x)$.',
        answer: '$F\'(x) = ' + k + 'x^{' + (3 * k - 1) + '}$',
        steps: [
          'FTC part 1 + chain rule: $\\dfrac{d}{dx}\\int_0^{g(x)}f(t)dt = f(g(x))g\'(x)$.',
          'Here $f(t) = t^2$ and $g(x) = x^{' + k + '}$.',
          '$f(g(x)) = (x^{' + k + '})^2 = x^{' + (2 * k) + '}$.',
          '$g\'(x) = ' + k + 'x^{' + (k - 1) + '}$.',
          'Product: $' + k + 'x^{' + (3 * k - 1) + '}$.',
        ],
      };
    } else if (kind === 1) {
      // int_1^{x^k} sin(t) dt
      return {
        prompt: 'Let $\\displaystyle F(x) = \\int_1^{x^{' + k + '}} \\sin t\\,dt$. Find $F\'(x)$.',
        answer: '$F\'(x) = ' + k + 'x^{' + (k - 1) + '}\\sin(x^{' + k + '})$',
        steps: [
          'FTC part 1 with chain: $F\'(x) = \\sin(x^{' + k + '})\\cdot\\dfrac{d}{dx}[x^{' + k + '}]$.',
          '$\\dfrac{d}{dx}[x^{' + k + '}] = ' + k + 'x^{' + (k - 1) + '}$.',
          'Result: $' + k + 'x^{' + (k - 1) + '}\\sin(x^{' + k + '})$.',
        ],
      };
    }
    // int_2^{x^k} e^t dt
    return {
      prompt: 'Let $\\displaystyle F(x) = \\int_2^{x^{' + k + '}} e^{t}\\,dt$. Find $F\'(x)$.',
      answer: '$F\'(x) = ' + k + 'x^{' + (k - 1) + '}e^{x^{' + k + '}}$',
      steps: [
        'FTC + chain: $F\'(x) = e^{x^{' + k + '}}\\cdot ' + k + 'x^{' + (k - 1) + '}$.',
      ],
    };
  }

  var STATIC_FTC_CHALLENGE = [
    {
      prompt: 'Find $F\'(x)$ where $F(x) = \\displaystyle \\int_{x^2}^{x^3} \\sin(t)\\,dt$.',
      answer: '$F\'(x) = 3x^2\\sin(x^3) - 2x\\sin(x^2)$',
      steps: [
        'Write $F(x) = \\int_0^{x^3}\\sin t\\,dt - \\int_0^{x^2}\\sin t\\,dt$.',
        'Differentiate using FTC + chain: $\\sin(x^3)\\cdot 3x^2 - \\sin(x^2)\\cdot 2x$.',
      ],
    },
    {
      prompt: 'Find $F\'(x)$ where $F(x) = \\displaystyle \\int_{\\sin x}^{\\cos x} \\sqrt{1 + t^2}\\,dt$.',
      answer: '$F\'(x) = -\\sin x\\sqrt{1 + \\cos^2 x} - \\cos x\\sqrt{1 + \\sin^2 x}$',
      steps: [
        'Split: $F(x) = \\int_0^{\\cos x}\\sqrt{1+t^2}dt - \\int_0^{\\sin x}\\sqrt{1+t^2}dt$.',
        'Differentiate: $\\sqrt{1+\\cos^2 x}\\cdot(-\\sin x) - \\sqrt{1+\\sin^2 x}\\cdot\\cos x$.',
      ],
    },
    {
      prompt: 'A particle has velocity $v(t) = t^2 - 4$ m/s on $[0, 3]$. Find its total displacement and total distance traveled.',
      answer: 'Displacement: $-3$ m. Distance: $\\dfrac{23}{3}$ m.',
      steps: [
        'Displacement: $\\int_0^3 (t^2 - 4)dt = [t^3/3 - 4t]_0^3 = 9 - 12 = -3$.',
        'Distance: $\\int_0^3 |t^2 - 4|dt$. Note $t^2 - 4 < 0$ for $t < 2$, positive for $t > 2$.',
        '$\\int_0^2 (4 - t^2)dt + \\int_2^3 (t^2 - 4)dt$.',
        'First: $[4t - t^3/3]_0^2 = 8 - 8/3 = 16/3$.',
        'Second: $[t^3/3 - 4t]_2^3 = (9 - 12) - (8/3 - 8) = -3 - (-16/3) = -3 + 16/3 = 7/3$.',
        'Total distance: $16/3 + 7/3 = 23/3$.',
      ],
    },
    {
      prompt: 'The Net Change Theorem: if water flows into a tank at rate $r(t) = 3t^2$ L/min for $t \\in [0, 4]$, how much water enters?',
      answer: '$64$ L',
      steps: [
        'Net change: $\\int_0^4 3t^2\\,dt = [t^3]_0^4 = 64$ L.',
      ],
    },
    {
      prompt: 'Find the average value of $f(x) = \\sin x$ on $[0, \\pi]$.',
      answer: '$\\dfrac{2}{\\pi}$',
      steps: [
        'Average: $\\dfrac{1}{\\pi - 0}\\int_0^\\pi \\sin x\\,dx = \\dfrac{1}{\\pi}[-\\cos x]_0^\\pi = \\dfrac{1}{\\pi}(1 + 1) = \\dfrac{2}{\\pi}$.',
      ],
    },
    {
      prompt: 'If $F(x) = \\int_0^x (t^2 - 2t)\\,dt$, find the critical points of $F$.',
      answer: '$x = 0$ and $x = 2$',
      steps: [
        'By FTC, $F\'(x) = x^2 - 2x = x(x-2)$.',
        'Zeros: $x = 0, 2$.',
      ],
    },
    {
      prompt: 'Use FTC to prove that every continuous function on $[a,b]$ has an antiderivative.',
      answer: 'Proved',
      steps: [
        'Define $F(x) = \\int_a^x f(t)dt$ for $x \\in [a,b]$.',
        'FTC part 1 states: if $f$ is continuous, then $F\'(x) = f(x)$.',
        'Thus $F$ is an antiderivative of $f$. (This is also a key step in showing FTC part 2.)',
      ],
    },
    {
      prompt: 'Given $\\int_1^3 f(x)dx = 5$ and $\\int_1^3 g(x)dx = 2$, evaluate $\\int_1^3 (3f(x) - 2g(x))dx$.',
      answer: '$11$',
      steps: [
        'Linearity: $3\\int f - 2\\int g = 3\\cdot 5 - 2\\cdot 2 = 15 - 4 = 11$.',
      ],
    },
    {
      prompt: 'If $F(x) = \\int_0^x \\cos(t^2)dt$, find $F\'(x)$ and $F\'(\\sqrt{\\pi/2})$.',
      answer: '$F\'(x) = \\cos(x^2)$; $F\'(\\sqrt{\\pi/2}) = 0$.',
      steps: [
        'FTC: $F\'(x) = \\cos(x^2)$.',
        'At $x = \\sqrt{\\pi/2}$: $\\cos(\\pi/2) = 0$.',
      ],
    },
    {
      prompt: 'Car accelerates from rest with $a(t) = 6t$ m/s$^2$. How far does it travel from $t=0$ to $t=4$?',
      answer: '$64$ m',
      steps: [
        'Velocity: $v(t) = \\int_0^t 6s\\,ds = 3t^2$ (with $v(0)=0$).',
        'Position: $x(t) = \\int_0^t 3s^2\\,ds = t^3$.',
        '$x(4) - x(0) = 64$ m.',
      ],
    },
    {
      prompt: 'Let $g(x) = \\int_0^x \\dfrac{1}{1+t^2}dt$. What is $g$ in closed form? Compute $g(1)$.',
      answer: '$g(x) = \\arctan x$; $g(1) = \\pi/4$.',
      steps: [
        'Antiderivative of $1/(1+t^2)$ is $\\arctan t$.',
        'So $g(x) = \\arctan x - \\arctan 0 = \\arctan x$.',
        '$g(1) = \\arctan 1 = \\pi/4$.',
      ],
    },
    {
      prompt: 'Find $\\displaystyle \\lim_{x\\to 0}\\dfrac{1}{x}\\int_0^x \\cos(t^2)dt$.',
      answer: '$1$',
      steps: [
        'As $x\\to 0$ the numerator and denominator both go to $0$.',
        'L\'Hopital: derivative of numerator is $\\cos(x^2)$ (by FTC), of denominator is $1$.',
        'Limit: $\\cos(0) = 1$.',
      ],
    },
    {
      prompt: 'Show that if $f$ is continuous and $\\int_a^x f(t)dt = 0$ for all $x \\in [a,b]$, then $f \\equiv 0$.',
      answer: 'Proved via FTC',
      steps: [
        'Let $F(x) = \\int_a^x f$. We\'re told $F(x) = 0$ for all $x$.',
        'By FTC, $F\'(x) = f(x)$.',
        'But $F$ is identically $0$, so $F\'(x) = 0$, hence $f(x) = 0$.',
      ],
    },
    {
      prompt: 'If $f(1) = 2$ and $f\'$ is continuous with $\\int_1^4 f\'(x)dx = 7$, find $f(4)$.',
      answer: '$9$',
      steps: [
        'FTC part 2: $\\int_1^4 f\'(x)dx = f(4) - f(1)$.',
        '$7 = f(4) - 2$, so $f(4) = 9$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\dfrac{d}{dx}\\left[\\int_x^{x^2} \\dfrac{1}{\\ln t}dt\\right]$.',
      answer: '$\\dfrac{x - 1}{\\ln x}$',
      steps: [
        'Split: $\\int_0^{x^2} - \\int_0^x$ (any reference point works).',
        'Differentiate: $\\dfrac{1}{\\ln(x^2)}\\cdot 2x - \\dfrac{1}{\\ln x}\\cdot 1$.',
        'Simplify $\\ln(x^2) = 2\\ln x$: $\\dfrac{2x}{2\\ln x} - \\dfrac{1}{\\ln x} = \\dfrac{x - 1}{\\ln x}$.',
      ],
    },
    {
      prompt: 'A water tank is being filled at rate $r(t) = 10 + 2t$ gal/min. If it starts with $5$ gal, how much water does it contain at $t = 5$ min?',
      answer: '$80$ gal',
      steps: [
        'Total added from $t=0$ to $t=5$: $\\int_0^5 (10 + 2t)dt = [10t + t^2]_0^5 = 50 + 25 = 75$.',
        'Final amount: $5 + 75 = 80$ gal.',
      ],
    },
    {
      prompt: 'Prove that $\\displaystyle \\int_0^1 x^n \\, dx = \\dfrac{1}{n+1}$ for integer $n \\ge 0$ directly from the definition, using right Riemann sums.',
      answer: '$\\dfrac{1}{n+1}$',
      steps: [
        'Right sum with $N$ pieces: $S_N = \\sum_{i=1}^N (i/N)^n\\cdot(1/N) = \\dfrac{1}{N^{n+1}}\\sum_{i=1}^N i^n$.',
        'Fact: $\\sum_{i=1}^N i^n \\sim \\dfrac{N^{n+1}}{n+1}$ for large $N$ (Faulhaber).',
        'So $S_N \\to \\dfrac{1}{n+1}$.',
      ],
    },
  ];

  var STATIC_FTC_STANDARD = [
    {
      prompt: 'If $F(x) = \\displaystyle \\int_0^x \\sin(t^2)\\,dt$, find $F\'(x)$.',
      answer: '$F\'(x) = \\sin(x^2)$',
      steps: [
        'FTC part 1: if $F(x) = \\int_a^x f(t)dt$, then $F\'(x) = f(x)$.',
      ],
    },
    {
      prompt: 'If $F(x) = \\displaystyle \\int_2^x (t^3 + t)\\,dt$, find $F\'(x)$ and $F\'(1)$.',
      answer: '$F\'(x) = x^3 + x$; $F\'(1) = 2$.',
      steps: [
        'FTC: $F\'(x) = x^3 + x$.',
        'At $x=1$: $1 + 1 = 2$.',
      ],
    },
    {
      prompt: 'If $F(x) = \\displaystyle \\int_0^{x^2} \\sqrt{1 + t^4}\\,dt$, find $F\'(x)$.',
      answer: '$F\'(x) = 2x\\sqrt{1 + x^8}$',
      steps: [
        'FTC + chain: $F\'(x) = \\sqrt{1 + (x^2)^4}\\cdot 2x = 2x\\sqrt{1 + x^8}$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^1 (4x^3 - 2x)\\,dx$.',
      answer: '$0$',
      steps: [
        'Antiderivative: $x^4 - x^2$.',
        'At $1$: $0$. At $0$: $0$. Difference $0$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_{-1}^1 (x^3 - x)\\,dx$.',
      answer: '$0$',
      steps: [
        'Both $x^3$ and $x$ are odd; integrating odd functions over symmetric intervals gives $0$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^4 \\sqrt x\\,dx$.',
      answer: '$\\dfrac{16}{3}$',
      steps: [
        'Antiderivative $(2/3)x^{3/2}$.',
        'At $4$: $(2/3)\\cdot 8 = 16/3$. At $0$: $0$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_1^2 \\dfrac{1}{x}dx$.',
      answer: '$\\ln 2$',
      steps: [
        'Antiderivative: $\\ln|x|$.',
        '$\\ln 2 - \\ln 1 = \\ln 2$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^{\\pi/2} \\sin x\\,dx$.',
      answer: '$1$',
      steps: [
        'Antiderivative: $-\\cos x$.',
        '$-\\cos(\\pi/2) + \\cos 0 = 0 + 1 = 1$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^1 e^{2x}dx$.',
      answer: '$\\dfrac{e^2 - 1}{2}$',
      steps: [
        'Antiderivative: $e^{2x}/2$.',
        '$[e^{2x}/2]_0^1 = (e^2 - 1)/2$.',
      ],
    },
    {
      prompt: 'If $F(x) = \\displaystyle \\int_0^{\\sin x} \\sqrt{1 - t^2}\\,dt$, find $F\'(x)$.',
      answer: '$F\'(x) = \\cos x\\sqrt{1 - \\sin^2 x} = \\cos x\\cdot|\\cos x|$',
      steps: [
        'FTC + chain: $F\'(x) = \\sqrt{1 - \\sin^2 x}\\cdot\\cos x$.',
        'On ranges where $\\cos x > 0$, simplifies to $\\cos^2 x$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_1^e \\ln x\\,dx$.',
      answer: '$1$',
      steps: [
        'Antiderivative: $x\\ln x - x$.',
        'At $e$: $e - e = 0$. At $1$: $0 - 1 = -1$.',
        'Difference: $0 - (-1) = 1$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^{\\pi/4}\\sec^2 x\\,dx$.',
      answer: '$1$',
      steps: [
        'Antiderivative $\\tan x$.',
        '$\\tan(\\pi/4) - \\tan 0 = 1 - 0 = 1$.',
      ],
    },
  ];

  PS.registerTopic("calc-ftc", {
    title: "Fundamental Theorem of Calculus",
    description: "FTC parts 1 and 2, derivatives of integrals, and net change.",
    warmup:   [genFTCPower, genFTCLinear],
    standard: [genFTCPart1Chain, STATIC_FTC_STANDARD],
    challenge: STATIC_FTC_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 7: calc-techniques (techniques of integration)
  // ==========================================================================

  // Warmup generator: u-sub with du = a dx, f(ax+b)
  function genUSubLinear(rng) {
    var a = rng.nonzeroInt(2, 6);
    var b = rng.nonzeroInt(-6, 6);
    var kind = rng.int(0, 2);
    if (kind === 0) {
      return {
        prompt: 'Evaluate $\\displaystyle \\int \\cos(' + a + 'x ' + term(b, '').trim() + ')\\,dx$.',
        answer: '$\\dfrac{1}{' + a + '}\\sin(' + a + 'x ' + term(b, '').trim() + ') + C$',
        steps: [
          'Let $u = ' + a + 'x ' + term(b, '').trim() + '$, so $du = ' + a + '\\,dx$, i.e. $dx = du/' + a + '$.',
          '$\\int\\cos u \\cdot du/' + a + ' = \\dfrac{1}{' + a + '}\\sin u + C$.',
          'Back-substitute.',
        ],
      };
    }
    if (kind === 1) {
      return {
        prompt: 'Evaluate $\\displaystyle \\int e^{' + a + 'x ' + term(b, '').trim() + '}\\,dx$.',
        answer: '$\\dfrac{1}{' + a + '}e^{' + a + 'x ' + term(b, '').trim() + '} + C$',
        steps: [
          'Let $u = ' + a + 'x ' + term(b, '').trim() + '$, so $du = ' + a + 'dx$.',
          '$\\int e^u\\cdot du/' + a + ' = \\dfrac{1}{' + a + '}e^u + C$.',
        ],
      };
    }
    var n = rng.int(2, 5);
    return {
      prompt: 'Evaluate $\\displaystyle \\int (' + a + 'x ' + term(b, '').trim() + ')^{' + n + '}\\,dx$.',
      answer: '$\\dfrac{1}{' + (a * (n + 1)) + '}(' + a + 'x ' + term(b, '').trim() + ')^{' + (n + 1) + '} + C$',
      steps: [
        'Let $u = ' + a + 'x ' + term(b, '').trim() + '$, $du = ' + a + 'dx$, so $dx = du/' + a + '$.',
        '$\\int u^{' + n + '}\\cdot du/' + a + ' = \\dfrac{u^{' + (n + 1) + '}}{' + (a * (n + 1)) + '} + C$.',
      ],
    };
  }

  var STATIC_TECH_WARMUP = [
    {
      prompt: 'Evaluate $\\displaystyle \\int 2x(x^2 + 1)^3 \\,dx$.',
      answer: '$\\dfrac{(x^2+1)^4}{4} + C$',
      steps: [
        'Let $u = x^2 + 1$, $du = 2x\\,dx$.',
        '$\\int u^3\\,du = u^4/4 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x e^{x^2}\\,dx$.',
      answer: '$\\dfrac{1}{2}e^{x^2} + C$',
      steps: [
        'Let $u = x^2$, $du = 2x\\,dx$.',
        '$\\int e^u\\cdot du/2 = (1/2)e^u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{\\ln x}{x}\\,dx$.',
      answer: '$\\dfrac{(\\ln x)^2}{2} + C$',
      steps: [
        '$u = \\ln x$, $du = dx/x$.',
        '$\\int u\\,du = u^2/2 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\tan x\\,dx$.',
      answer: '$-\\ln|\\cos x| + C$',
      steps: [
        '$\\tan x = \\sin x / \\cos x$. Let $u = \\cos x$, $du = -\\sin x\\,dx$.',
        '$\\int -du/u = -\\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin^2 x\\,dx$.',
      answer: '$\\dfrac{x}{2} - \\dfrac{\\sin(2x)}{4} + C$',
      steps: [
        'Use $\\sin^2 x = (1 - \\cos 2x)/2$.',
        'Integrate: $x/2 - \\sin(2x)/4 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\cos^2 x\\,dx$.',
      answer: '$\\dfrac{x}{2} + \\dfrac{\\sin(2x)}{4} + C$',
      steps: [
        '$\\cos^2 x = (1 + \\cos 2x)/2$.',
        'Integrate each term.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{x\\ln x}\\,dx$.',
      answer: '$\\ln|\\ln x| + C$',
      steps: [
        'Let $u = \\ln x$, $du = dx/x$.',
        '$\\int du/u = \\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x}{1+x^2}\\,dx$.',
      answer: '$\\dfrac{1}{2}\\ln(1+x^2) + C$',
      steps: [
        '$u = 1 + x^2$, $du = 2x\\,dx$.',
        '$\\int du/(2u) = (1/2)\\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin x\\cos x\\,dx$.',
      answer: '$\\dfrac{\\sin^2 x}{2} + C$',
      steps: [
        '$u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int u\\,du = u^2/2 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{\\sqrt x(1 + \\sqrt x)}\\,dx$.',
      answer: '$2\\ln(1 + \\sqrt x) + C$',
      steps: [
        '$u = 1 + \\sqrt x$, $du = \\dfrac{dx}{2\\sqrt x}$, so $\\dfrac{dx}{\\sqrt x} = 2\\,du$.',
        '$\\int \\dfrac{2\\,du}{u} = 2\\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int e^{\\sin x}\\cos x\\,dx$.',
      answer: '$e^{\\sin x} + C$',
      steps: [
        '$u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int e^u\\,du = e^u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sec^2(3x)\\,dx$.',
      answer: '$\\dfrac{1}{3}\\tan(3x) + C$',
      steps: [
        '$u = 3x$, $du = 3\\,dx$.',
        '$\\int \\sec^2 u\\cdot du/3 = (1/3)\\tan u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x\\sin(x^2)\\,dx$.',
      answer: '$-\\dfrac{1}{2}\\cos(x^2) + C$',
      steps: [
        '$u = x^2$, $du = 2x\\,dx$.',
        '$-\\dfrac{1}{2}\\cos u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{\\cos x}{\\sin^2 x}\\,dx$.',
      answer: '$-\\dfrac{1}{\\sin x} + C$',
      steps: [
        '$u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int u^{-2}\\,du = -u^{-1} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{e^x}{1 + e^x}\\,dx$.',
      answer: '$\\ln(1 + e^x) + C$',
      steps: [
        '$u = 1 + e^x$, $du = e^x\\,dx$.',
        '$\\int du/u = \\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{\\sec^2 x}{\\tan x}\\,dx$.',
      answer: '$\\ln|\\tan x| + C$',
      steps: [
        '$u = \\tan x$, $du = \\sec^2 x\\,dx$.',
        '$\\int du/u = \\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\cot x\\,dx$.',
      answer: '$\\ln|\\sin x| + C$',
      steps: [
        '$\\cot x = \\cos x / \\sin x$. $u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int du/u = \\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x\\sqrt{x + 1}\\,dx$.',
      answer: '$\\dfrac{2}{5}(x+1)^{5/2} - \\dfrac{2}{3}(x+1)^{3/2} + C$',
      steps: [
        'Let $u = x + 1$, so $x = u - 1$, $dx = du$.',
        '$\\int (u-1)\\sqrt u\\,du = \\int (u^{3/2} - u^{1/2})du = \\dfrac{2}{5}u^{5/2} - \\dfrac{2}{3}u^{3/2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{1 + 9x^2}\\,dx$.',
      answer: '$\\dfrac{1}{3}\\arctan(3x) + C$',
      steps: [
        'Recall $\\int\\dfrac{du}{1+u^2} = \\arctan u + C$.',
        '$u = 3x$, $du = 3\\,dx$, $dx = du/3$.',
        '$\\dfrac{1}{3}\\arctan(3x) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{\\sqrt{1 - 4x^2}}\\,dx$.',
      answer: '$\\dfrac{1}{2}\\arcsin(2x) + C$',
      steps: [
        'Recall $\\int\\dfrac{du}{\\sqrt{1-u^2}} = \\arcsin u + C$.',
        '$u = 2x$, $du = 2\\,dx$, $dx = du/2$.',
        '$\\dfrac{1}{2}\\arcsin(2x) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{\\sqrt{4 - x^2}}$.',
      answer: '$\\arcsin(x/2) + C$',
      steps: [
        'Factor: $\\sqrt{4 - x^2} = 2\\sqrt{1 - (x/2)^2}$.',
        '$u = x/2$, $du = dx/2$: $\\int du/\\sqrt{1 - u^2} = \\arcsin u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin(5x)\\,dx$.',
      answer: '$-\\dfrac{\\cos(5x)}{5} + C$',
      steps: [
        '$u = 5x$, $du = 5\\,dx$.',
        'Result: $-\\cos(5x)/5 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int e^{-3x}\\,dx$.',
      answer: '$-\\dfrac{1}{3}e^{-3x} + C$',
      steps: [
        '$u = -3x$, $du = -3\\,dx$.',
        'Result: $-e^{-3x}/3 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int (3x - 2)^5\\,dx$.',
      answer: '$\\dfrac{(3x - 2)^6}{18} + C$',
      steps: [
        '$u = 3x - 2$, $du = 3\\,dx$.',
        '$\\int u^5 du/3 = u^6/18 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{2x + 5}$.',
      answer: '$\\dfrac{1}{2}\\ln|2x + 5| + C$',
      steps: [
        '$u = 2x+5$, $du = 2dx$.',
        '$\\int du/(2u) = (1/2)\\ln|u|+C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int 4x^3(x^4 + 1)^5\\,dx$.',
      answer: '$\\dfrac{(x^4 + 1)^6}{6} + C$',
      steps: [
        '$u = x^4 + 1$, $du = 4x^3\\,dx$.',
        '$\\int u^5 du = u^6/6 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{\\sec^2 x}{1 + \\tan x}\\,dx$.',
      answer: '$\\ln|1 + \\tan x| + C$',
      steps: [
        '$u = 1+\\tan x$, $du = \\sec^2 x\\,dx$.',
        '$\\int du/u = \\ln|u|+C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int 6x^2 e^{x^3}\\,dx$.',
      answer: '$2e^{x^3} + C$',
      steps: [
        '$u = x^3$, $du = 3x^2\\,dx$, so $6x^2\\,dx = 2\\,du$.',
        '$\\int 2e^u\\,du = 2e^u + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{(\\ln x)^3}{x}\\,dx$.',
      answer: '$\\dfrac{(\\ln x)^4}{4} + C$',
      steps: [
        '$u = \\ln x$, $du = dx/x$.',
        '$\\int u^3 du = u^4/4 + C$.',
      ],
    },
  ];

  var STATIC_TECH_STANDARD = [
    {
      prompt: 'Evaluate $\\displaystyle \\int x e^x \\, dx$.',
      answer: '$(x - 1)e^x + C$',
      steps: [
        'By parts: $u = x$, $dv = e^x dx$, so $du = dx$, $v = e^x$.',
        '$\\int x e^x dx = xe^x - \\int e^x dx = xe^x - e^x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x \\cos x\\,dx$.',
      answer: '$x\\sin x + \\cos x + C$',
      steps: [
        '$u = x$, $dv = \\cos x\\,dx$, $du = dx$, $v = \\sin x$.',
        '$x\\sin x - \\int\\sin x\\,dx = x\\sin x + \\cos x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\ln x\\,dx$.',
      answer: '$x\\ln x - x + C$',
      steps: [
        '$u = \\ln x$, $dv = dx$, $du = dx/x$, $v = x$.',
        '$x\\ln x - \\int 1\\,dx = x\\ln x - x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x\\ln x\\,dx$.',
      answer: '$\\dfrac{x^2 \\ln x}{2} - \\dfrac{x^2}{4} + C$',
      steps: [
        '$u = \\ln x$, $dv = x\\,dx$, $du = dx/x$, $v = x^2/2$.',
        '$\\dfrac{x^2\\ln x}{2} - \\int\\dfrac{x}{2}dx = \\dfrac{x^2\\ln x}{2} - \\dfrac{x^2}{4} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\arctan x\\,dx$.',
      answer: '$x\\arctan x - \\dfrac{1}{2}\\ln(1 + x^2) + C$',
      steps: [
        '$u = \\arctan x$, $dv = dx$, $du = dx/(1+x^2)$, $v = x$.',
        '$x\\arctan x - \\int x/(1+x^2)dx = x\\arctan x - (1/2)\\ln(1+x^2) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\arcsin x\\,dx$.',
      answer: '$x\\arcsin x + \\sqrt{1 - x^2} + C$',
      steps: [
        '$u = \\arcsin x$, $dv = dx$; $du = dx/\\sqrt{1-x^2}$, $v = x$.',
        '$x\\arcsin x - \\int x/\\sqrt{1-x^2}dx = x\\arcsin x + \\sqrt{1-x^2} + C$ (the remaining integral uses $u = 1-x^2$).',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{x^2 - 1}\\,dx$.',
      answer: '$\\dfrac{1}{2}\\ln\\left|\\dfrac{x - 1}{x + 1}\\right| + C$',
      steps: [
        'Partial fractions: $\\dfrac{1}{x^2 - 1} = \\dfrac{1/2}{x-1} - \\dfrac{1/2}{x+1}$.',
        'Integrate each: $\\dfrac{1}{2}\\ln|x-1| - \\dfrac{1}{2}\\ln|x+1| + C$.',
        'Combine as a single log.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{x(x+1)}\\,dx$.',
      answer: '$\\ln\\left|\\dfrac{x}{x+1}\\right| + C$',
      steps: [
        'Partial fractions: $\\dfrac{1}{x(x+1)} = \\dfrac{1}{x} - \\dfrac{1}{x+1}$.',
        'Integrate: $\\ln|x| - \\ln|x+1| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x+3}{x^2 + 2x}\\,dx$.',
      answer: '$\\dfrac{3}{2}\\ln|x| - \\dfrac{1}{2}\\ln|x+2| + C$',
      steps: [
        '$\\dfrac{x+3}{x(x+2)} = \\dfrac{A}{x} + \\dfrac{B}{x+2}$. Solve: $A = 3/2$, $B = -1/2$.',
        'Integrate to get $(3/2)\\ln|x| - (1/2)\\ln|x+2| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin^3 x\\,dx$.',
      answer: '$-\\cos x + \\dfrac{\\cos^3 x}{3} + C$',
      steps: [
        'Rewrite: $\\sin^3 x = \\sin x(1 - \\cos^2 x)$.',
        '$u = \\cos x$, $du = -\\sin x\\,dx$.',
        '$\\int -(1 - u^2)du = -u + u^3/3 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\cos^3 x\\,dx$.',
      answer: '$\\sin x - \\dfrac{\\sin^3 x}{3} + C$',
      steps: [
        '$\\cos^3 x = \\cos x(1 - \\sin^2 x)$.',
        '$u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int (1 - u^2)du = u - u^3/3 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin^2 x \\cos^3 x\\,dx$.',
      answer: '$\\dfrac{\\sin^3 x}{3} - \\dfrac{\\sin^5 x}{5} + C$',
      steps: [
        'Split a $\\cos x$ off: $\\sin^2 x(1 - \\sin^2 x)\\cos x$.',
        '$u = \\sin x$, $du = \\cos x\\,dx$.',
        '$\\int u^2(1 - u^2)du = u^3/3 - u^5/5 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\tan^2 x\\,dx$.',
      answer: '$\\tan x - x + C$',
      steps: [
        'Identity: $\\tan^2 x = \\sec^2 x - 1$.',
        'Integrate: $\\tan x - x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sec^3 x\\,dx$.',
      answer: '$\\dfrac{1}{2}(\\sec x\\tan x + \\ln|\\sec x + \\tan x|) + C$',
      steps: [
        'By parts with $u = \\sec x$, $dv = \\sec^2 x\\,dx$: $v = \\tan x$, $du = \\sec x\\tan x\\,dx$.',
        '$\\int\\sec^3 x\\,dx = \\sec x\\tan x - \\int\\sec x\\tan^2 x\\,dx = \\sec x\\tan x - \\int\\sec x(\\sec^2 x - 1)dx$.',
        '$= \\sec x\\tan x - \\int\\sec^3 x\\,dx + \\int\\sec x\\,dx$.',
        'Solve for original: $2\\int\\sec^3 x\\,dx = \\sec x\\tan x + \\ln|\\sec x + \\tan x| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sec x\\,dx$.',
      answer: '$\\ln|\\sec x + \\tan x| + C$',
      steps: [
        'Multiply numerator and denominator by $\\sec x + \\tan x$: $\\dfrac{\\sec x(\\sec x + \\tan x)}{\\sec x + \\tan x}$.',
        'Let $u = \\sec x + \\tan x$, $du = (\\sec x\\tan x + \\sec^2 x)dx = \\sec x(\\tan x + \\sec x)dx$.',
        'So integral is $\\int du/u = \\ln|u| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{x^2 + 4}$.',
      answer: '$\\dfrac{1}{2}\\arctan(x/2) + C$',
      steps: [
        'Factor: $\\dfrac{1}{4}\\cdot\\dfrac{1}{1 + (x/2)^2}$.',
        '$u = x/2$, $du = dx/2$.',
        '$\\dfrac{1}{2}\\arctan(x/2) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{x^2 + 2x + 5}$.',
      answer: '$\\dfrac{1}{2}\\arctan\\left(\\dfrac{x+1}{2}\\right) + C$',
      steps: [
        'Complete the square: $x^2 + 2x + 5 = (x+1)^2 + 4$.',
        '$u = x + 1$; $\\int du/(u^2 + 4) = (1/2)\\arctan(u/2) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x^2 \\ln x\\,dx$.',
      answer: '$\\dfrac{x^3\\ln x}{3} - \\dfrac{x^3}{9} + C$',
      steps: [
        '$u = \\ln x$, $dv = x^2\\,dx$; $du = dx/x$, $v = x^3/3$.',
        '$\\dfrac{x^3\\ln x}{3} - \\int\\dfrac{x^2}{3}dx = \\dfrac{x^3\\ln x}{3} - \\dfrac{x^3}{9} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin(2x)\\cos(3x)\\,dx$.',
      answer: '$-\\dfrac{\\cos(5x)}{10} + \\dfrac{\\cos x}{2} + C$',
      steps: [
        'Product-to-sum: $\\sin A\\cos B = \\dfrac{1}{2}[\\sin(A+B) + \\sin(A-B)]$.',
        'Here $\\sin(2x)\\cos(3x) = \\dfrac{1}{2}[\\sin(5x) + \\sin(-x)] = \\dfrac{1}{2}[\\sin(5x) - \\sin x]$.',
        'Integrate: $\\dfrac{1}{2}(-\\cos(5x)/5 + \\cos x) + C = -\\cos(5x)/10 + \\cos x/2 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{2x + 3}{x^2 - x - 2}\\,dx$.',
      answer: '$\\dfrac{7}{3}\\ln|x - 2| - \\dfrac{1}{3}\\ln|x + 1| + C$',
      steps: [
        'Factor: $x^2 - x - 2 = (x-2)(x+1)$.',
        'Partial fractions: $\\dfrac{2x+3}{(x-2)(x+1)} = \\dfrac{A}{x-2} + \\dfrac{B}{x+1}$. Then $A(x+1) + B(x-2) = 2x+3$. $x=2$: $3A = 7 \\Rightarrow A = 7/3$. $x = -1$: $-3B = 1 \\Rightarrow B = -1/3$.',
        'Integrate to get the answer.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x e^{-x}\\,dx$.',
      answer: '$-(x + 1)e^{-x} + C$',
      steps: [
        '$u = x$, $dv = e^{-x}dx$; $du = dx$, $v = -e^{-x}$.',
        '$-xe^{-x} + \\int e^{-x}dx = -xe^{-x} - e^{-x} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x \\sin(2x)\\,dx$.',
      answer: '$-\\dfrac{x\\cos(2x)}{2} + \\dfrac{\\sin(2x)}{4} + C$',
      steps: [
        '$u = x$, $dv = \\sin(2x)dx$; $du = dx$, $v = -\\cos(2x)/2$.',
        '$-x\\cos(2x)/2 + (1/2)\\int\\cos(2x)dx = -x\\cos(2x)/2 + \\sin(2x)/4 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{x^2 - 4}$.',
      answer: '$\\dfrac{1}{4}\\ln\\left|\\dfrac{x - 2}{x + 2}\\right| + C$',
      steps: [
        'Partial fractions: $\\dfrac{1}{(x-2)(x+2)} = \\dfrac{1/4}{x-2} - \\dfrac{1/4}{x+2}$.',
        'Integrate each.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{3x + 1}{x^2 + 4x + 3}\\,dx$.',
      answer: '$-\\ln|x + 1| + 4\\ln|x + 3| + C$',
      steps: [
        'Factor bottom: $(x+1)(x+3)$.',
        'Partial fractions: $A(x+3) + B(x+1) = 3x+1$. $x=-1$: $2A = -2 \\Rightarrow A=-1$. $x=-3$: $-2B = -8 \\Rightarrow B = 4$.',
        'Integrate.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin^2 x\\cos^2 x\\,dx$.',
      answer: '$\\dfrac{x}{8} - \\dfrac{\\sin(4x)}{32} + C$',
      steps: [
        '$\\sin^2 x\\cos^2 x = (1/4)\\sin^2(2x) = (1/8)(1 - \\cos(4x))$.',
        'Integrate: $x/8 - \\sin(4x)/32 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\tan^3 x\\,dx$.',
      answer: '$\\dfrac{\\tan^2 x}{2} + \\ln|\\cos x| + C$',
      steps: [
        '$\\tan^3 x = \\tan x(\\sec^2 x - 1) = \\tan x\\sec^2 x - \\tan x$.',
        '$\\int\\tan x\\sec^2 x\\,dx = \\tan^2 x/2$ (with $u = \\tan x$).',
        '$\\int\\tan x\\,dx = -\\ln|\\cos x|$.',
        'Combine.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin(3x)\\sin(2x)\\,dx$.',
      answer: '$\\dfrac{\\sin x}{2} - \\dfrac{\\sin(5x)}{10} + C$',
      steps: [
        'Product to sum: $\\sin A\\sin B = (1/2)[\\cos(A-B) - \\cos(A+B)]$.',
        '$= (1/2)[\\cos x - \\cos(5x)]$.',
        'Integrate: $(1/2)[\\sin x - \\sin(5x)/5] + C = \\sin x/2 - \\sin(5x)/10 + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x}{\\sqrt{x + 1}}\\,dx$.',
      answer: '$\\dfrac{2(x + 1)^{3/2}}{3} - 2\\sqrt{x + 1} + C$',
      steps: [
        '$u = x + 1$, $x = u - 1$, $dx = du$.',
        '$\\int (u - 1)/\\sqrt u\\,du = \\int (u^{1/2} - u^{-1/2})du$.',
        '$= 2u^{3/2}/3 - 2u^{1/2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{\\sin\\sqrt x}{\\sqrt x}\\,dx$.',
      answer: '$-2\\cos\\sqrt x + C$',
      steps: [
        '$u = \\sqrt x$, $du = dx/(2\\sqrt x)$, so $dx/\\sqrt x = 2\\,du$.',
        '$\\int 2\\sin u\\,du = -2\\cos u + C$.',
      ],
    },
  ];

  var STATIC_TECH_CHALLENGE = [
    {
      prompt: 'Evaluate $\\displaystyle \\int e^x \\sin x \\, dx$.',
      answer: '$\\dfrac{e^x(\\sin x - \\cos x)}{2} + C$',
      steps: [
        'By parts: $u = \\sin x$, $dv = e^x dx$. Then $\\int = e^x\\sin x - \\int e^x \\cos x\\,dx$.',
        'Apply parts again: $u = \\cos x$, $dv = e^x dx$. Then $\\int e^x\\cos x\\,dx = e^x\\cos x + \\int e^x\\sin x\\,dx$.',
        'Let $I = \\int e^x\\sin x\\,dx$. Then $I = e^x\\sin x - (e^x\\cos x + I)$.',
        '$2I = e^x(\\sin x - \\cos x)$, so $I = \\dfrac{e^x(\\sin x - \\cos x)}{2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int e^x \\cos x \\, dx$.',
      answer: '$\\dfrac{e^x(\\sin x + \\cos x)}{2} + C$',
      steps: [
        'Similar IBP trick to $\\int e^x\\sin x$. Apply parts twice.',
        'Let $J = \\int e^x\\cos x\\,dx$ and $I = \\int e^x\\sin x\\,dx$. You get $J = e^x\\cos x + I$ and $I = e^x\\sin x - J$.',
        'Solve: $J = \\dfrac{e^x(\\cos x + \\sin x)}{2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x^2 e^x \\, dx$ using tabular integration.',
      answer: '$(x^2 - 2x + 2)e^x + C$',
      steps: [
        'Tabular: derivatives of $x^2$: $x^2, 2x, 2, 0$. Integrals of $e^x$: $e^x, e^x, e^x, e^x$.',
        'Alternating signs: $(+)(x^2)(e^x) + (-)(2x)(e^x) + (+)(2)(e^x)$.',
        'Sum: $x^2 e^x - 2xe^x + 2e^x + C = (x^2 - 2x + 2)e^x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x^3 \\cos x \\, dx$.',
      answer: '$x^3\\sin x + 3x^2\\cos x - 6x\\sin x - 6\\cos x + C$',
      steps: [
        'Tabular with $u = x^3$ and $dv = \\cos x\\,dx$.',
        'Derivatives: $x^3, 3x^2, 6x, 6, 0$. Integrals: $\\cos, \\sin, -\\cos, -\\sin, \\cos$.',
        'Signs alternate starting with $+$. Assemble the sum.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sqrt{1 - x^2}\\,dx$ using trig substitution.',
      answer: '$\\dfrac{x\\sqrt{1-x^2} + \\arcsin x}{2} + C$',
      steps: [
        '$x = \\sin\\theta$, $dx = \\cos\\theta\\,d\\theta$, $\\sqrt{1-x^2} = \\cos\\theta$.',
        '$\\int \\cos^2\\theta\\,d\\theta = \\theta/2 + \\sin(2\\theta)/4$.',
        '$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2x\\sqrt{1-x^2}$.',
        'Back-substitute: $\\dfrac{\\arcsin x}{2} + \\dfrac{x\\sqrt{1-x^2}}{2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{\\sqrt{x^2 + 9}}$.',
      answer: '$\\ln\\left|x + \\sqrt{x^2 + 9}\\right| + C$',
      steps: [
        '$x = 3\\tan\\theta$, $dx = 3\\sec^2\\theta\\,d\\theta$, $\\sqrt{x^2 + 9} = 3\\sec\\theta$.',
        '$\\int\\dfrac{3\\sec^2\\theta\\,d\\theta}{3\\sec\\theta} = \\int\\sec\\theta\\,d\\theta = \\ln|\\sec\\theta + \\tan\\theta| + C$.',
        'Back-substitute with $\\tan\\theta = x/3$, $\\sec\\theta = \\sqrt{x^2+9}/3$.',
        'Constant adjustment absorbed in $C$: final form $\\ln|x + \\sqrt{x^2+9}| + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{\\sqrt{x^2 - 4}}$ for $x > 2$.',
      answer: '$\\ln\\left|x + \\sqrt{x^2 - 4}\\right| + C$',
      steps: [
        '$x = 2\\sec\\theta$, $dx = 2\\sec\\theta\\tan\\theta\\,d\\theta$, $\\sqrt{x^2-4} = 2\\tan\\theta$.',
        'Integrand becomes $\\int\\sec\\theta\\,d\\theta = \\ln|\\sec\\theta + \\tan\\theta| + C$.',
        'Back-substitute.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x^2}{(x^2 + 1)^2}\\,dx$.',
      answer: '$\\dfrac{1}{2}\\arctan x - \\dfrac{x}{2(x^2 + 1)} + C$',
      steps: [
        'Write $\\dfrac{x^2}{(x^2+1)^2} = \\dfrac{(x^2+1) - 1}{(x^2+1)^2} = \\dfrac{1}{x^2+1} - \\dfrac{1}{(x^2+1)^2}$.',
        '$\\int\\dfrac{1}{x^2+1} = \\arctan x$.',
        '$\\int\\dfrac{1}{(x^2+1)^2} = \\dfrac{1}{2}\\arctan x + \\dfrac{x}{2(x^2+1)}$ (standard result).',
        'Combine: $\\arctan x - \\dfrac{1}{2}\\arctan x - \\dfrac{x}{2(x^2+1)} = \\dfrac{1}{2}\\arctan x - \\dfrac{x}{2(x^2+1)} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{2x + 1}{x^2 + 2x + 5}\\,dx$.',
      answer: '$\\ln(x^2 + 2x + 5) - \\dfrac{1}{2}\\arctan\\left(\\dfrac{x+1}{2}\\right) + C$',
      steps: [
        'Split: $\\dfrac{2x+1}{x^2+2x+5} = \\dfrac{2x+2}{x^2+2x+5} - \\dfrac{1}{x^2+2x+5}$.',
        'First piece: numerator is derivative of denominator, so $\\ln(x^2+2x+5)$.',
        'Second piece: complete the square $x^2+2x+5 = (x+1)^2 + 4$, integral is $(1/2)\\arctan((x+1)/2)$.',
        'Combine with appropriate sign.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{(x^2 + 1)(x^2 + 4)}\\,dx$.',
      answer: '$\\dfrac{1}{3}\\arctan x - \\dfrac{1}{6}\\arctan(x/2) + C$',
      steps: [
        'Partial fractions: $\\dfrac{1}{(x^2+1)(x^2+4)} = \\dfrac{A}{x^2+1} + \\dfrac{B}{x^2+4}$.',
        'Clear denominators: $1 = A(x^2+4) + B(x^2+1)$. Match: $A+B = 0$, $4A+B = 1$; so $A = 1/3$, $B = -1/3$.',
        'Integrate: $(1/3)\\arctan x - (1/3)\\cdot(1/2)\\arctan(x/2) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x + 1}{x^3 + x}\\,dx$.',
      answer: '$\\ln|x| - \\dfrac{1}{2}\\ln(x^2 + 1) + \\arctan x + C$',
      steps: [
        'Factor bottom: $x(x^2 + 1)$.',
        'Partial fractions: $\\dfrac{x+1}{x(x^2+1)} = \\dfrac{A}{x} + \\dfrac{Bx + C}{x^2+1}$. Solve: $A = 1$, $B = -1$, $C = 1$.',
        'Integrate each piece: $\\ln|x|$, $-\\dfrac{1}{2}\\ln(x^2+1)$, $\\arctan x$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\sin^4 x\\,dx$.',
      answer: '$\\dfrac{3x}{8} - \\dfrac{\\sin(2x)}{4} + \\dfrac{\\sin(4x)}{32} + C$',
      steps: [
        '$\\sin^4 x = (\\sin^2 x)^2 = ((1-\\cos 2x)/2)^2 = \\dfrac{1 - 2\\cos 2x + \\cos^2 2x}{4}$.',
        '$\\cos^2 2x = (1 + \\cos 4x)/2$.',
        'Combine: $\\sin^4 x = \\dfrac{3}{8} - \\dfrac{\\cos 2x}{2} + \\dfrac{\\cos 4x}{8}$.',
        'Integrate term by term.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{\\sqrt{x}(1 + x)}\\,dx$.',
      answer: '$2\\arctan\\sqrt x + C$',
      steps: [
        'Let $u = \\sqrt x$, $x = u^2$, $dx = 2u\\,du$.',
        '$\\int\\dfrac{2u\\,du}{u(1 + u^2)} = 2\\int\\dfrac{du}{1+u^2} = 2\\arctan u + C = 2\\arctan\\sqrt x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x\\arctan x\\,dx$.',
      answer: '$\\dfrac{(x^2+1)\\arctan x}{2} - \\dfrac{x}{2} + C$',
      steps: [
        '$u = \\arctan x$, $dv = x\\,dx$; $du = dx/(1+x^2)$, $v = x^2/2$.',
        '$\\dfrac{x^2\\arctan x}{2} - \\dfrac{1}{2}\\int\\dfrac{x^2}{1+x^2}dx$.',
        '$\\int\\dfrac{x^2}{1+x^2}dx = \\int 1 - \\dfrac{1}{1+x^2}dx = x - \\arctan x$.',
        'Combine: $\\dfrac{x^2\\arctan x}{2} - \\dfrac{x - \\arctan x}{2} = \\dfrac{(x^2+1)\\arctan x}{2} - \\dfrac{x}{2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int (\\ln x)^2\\,dx$.',
      answer: '$x(\\ln x)^2 - 2x\\ln x + 2x + C$',
      steps: [
        '$u = (\\ln x)^2$, $dv = dx$; $du = 2\\ln x\\cdot dx/x$, $v = x$.',
        '$x(\\ln x)^2 - 2\\int\\ln x\\,dx = x(\\ln x)^2 - 2(x\\ln x - x) + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{1}{1 + \\sin x}\\,dx$.',
      answer: '$\\tan x - \\sec x + C$',
      steps: [
        'Multiply top and bottom by $1 - \\sin x$: $\\dfrac{1-\\sin x}{1-\\sin^2 x} = \\dfrac{1-\\sin x}{\\cos^2 x}$.',
        'Split: $\\sec^2 x - \\dfrac{\\sin x}{\\cos^2 x}$.',
        'First integrates to $\\tan x$. Second: $u = \\cos x$, $du = -\\sin x\\,dx$, so it\'s $-\\sec x\\cdot(-1) = -1/\\cos x$. Actually $\\int\\sin x/\\cos^2 x\\,dx = \\sec x$.',
        'Result: $\\tan x - \\sec x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int_0^{\\pi/2}\\sin^5 x\\,dx$.',
      answer: '$\\dfrac{8}{15}$',
      steps: [
        '$\\sin^5 x = \\sin x(1-\\cos^2 x)^2$.',
        '$u = \\cos x$, $du = -\\sin x\\,dx$. At $x=0$, $u=1$; $x=\\pi/2$, $u=0$.',
        '$\\int_1^0 -(1-u^2)^2 du = \\int_0^1 (1 - 2u^2 + u^4)du = 1 - 2/3 + 1/5 = 15/15 - 10/15 + 3/15 = 8/15$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int e^{\\sqrt x}\\,dx$.',
      answer: '$2(\\sqrt x - 1)e^{\\sqrt x} + C$',
      steps: [
        'Let $u = \\sqrt x$, so $x = u^2$ and $dx = 2u\\,du$.',
        '$\\int e^u\\cdot 2u\\,du = 2\\int u e^u\\,du$.',
        'By parts: $\\int u e^u du = (u - 1)e^u$.',
        'Multiply: $2(u-1)e^u = 2(\\sqrt x - 1)e^{\\sqrt x} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{(1 - x^2)^{3/2}}$.',
      answer: '$\\dfrac{x}{\\sqrt{1 - x^2}} + C$',
      steps: [
        '$x = \\sin\\theta$, $dx = \\cos\\theta\\,d\\theta$, $(1-x^2)^{3/2} = \\cos^3\\theta$.',
        '$\\int\\dfrac{\\cos\\theta}{\\cos^3\\theta}d\\theta = \\int\\sec^2\\theta\\,d\\theta = \\tan\\theta + C$.',
        'Back-substitute: $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{x}{\\sqrt{1-x^2}}$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int x^2 \\sqrt{1 - x^2}\\,dx$.',
      answer: '$\\dfrac{\\arcsin x}{8} - \\dfrac{x\\sqrt{1-x^2}(1 - 2x^2)}{8} + C$',
      steps: [
        '$x = \\sin\\theta$: $\\int \\sin^2\\theta\\cos^2\\theta\\,d\\theta$.',
        '$\\sin^2\\theta\\cos^2\\theta = (1/4)\\sin^2(2\\theta) = (1/8)(1 - \\cos 4\\theta)$.',
        'Integrate: $(\\theta/8) - (\\sin 4\\theta)/32$.',
        'Back-substitute using double-angle formulas. Result simplifies to the boxed form.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x^3}{\\sqrt{x^2 + 4}}\\,dx$.',
      answer: '$\\dfrac{(x^2 + 4)^{3/2}}{3} - 4\\sqrt{x^2 + 4} + C$',
      steps: [
        'Let $u = x^2 + 4$, so $x^2 = u - 4$ and $du = 2x\\,dx$, giving $x^3\\,dx = (u-4)\\cdot du/2$.',
        '$\\int\\dfrac{(u-4)}{2\\sqrt u}du = (1/2)\\int (u^{1/2} - 4u^{-1/2})du$.',
        'Integrate: $(1/2)[(2/3)u^{3/2} - 8u^{1/2}] = u^{3/2}/3 - 4u^{1/2} + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{x\\sqrt{x^2 - 1}}$ for $x > 1$.',
      answer: '$\\text{arcsec}\\,x + C$ (equivalently $\\arccos(1/x) + C$)',
      steps: [
        '$x = \\sec\\theta$, $dx = \\sec\\theta\\tan\\theta\\,d\\theta$, $\\sqrt{x^2-1} = \\tan\\theta$.',
        '$\\int\\dfrac{\\sec\\theta\\tan\\theta}{\\sec\\theta\\tan\\theta}d\\theta = \\int d\\theta = \\theta + C$.',
        'Back-substitute: $\\theta = \\text{arcsec}\\,x$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int (\\arcsin x)^2\\,dx$.',
      answer: '$x(\\arcsin x)^2 + 2\\sqrt{1 - x^2}\\arcsin x - 2x + C$',
      steps: [
        '$u = (\\arcsin x)^2$, $dv = dx$; $du = 2\\arcsin x/\\sqrt{1-x^2}\\,dx$, $v = x$.',
        '$x(\\arcsin x)^2 - 2\\int\\dfrac{x\\arcsin x}{\\sqrt{1-x^2}}dx$.',
        'For the remaining integral, let $w = \\arcsin x$, $dw = dx/\\sqrt{1-x^2}$, and note $\\sin w = x$.',
        'This becomes $\\int -\\sqrt{1-x^2}\\,dw\\cdot\\text{(after parts)}$; standard result: $\\int x\\arcsin x/\\sqrt{1-x^2}dx = -\\sqrt{1-x^2}\\arcsin x + x$.',
        'Combine: $x(\\arcsin x)^2 + 2\\sqrt{1-x^2}\\arcsin x - 2x + C$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{x^2 + 1}{x^3 - x}\\,dx$.',
      answer: '$-\\ln|x| + \\ln|x - 1| + \\ln|x + 1| + C$',
      steps: [
        'Factor: $x(x-1)(x+1)$.',
        'Partial fractions: $(x^2+1)/(x(x-1)(x+1)) = A/x + B/(x-1) + C/(x+1)$.',
        'Clear: $A(x^2-1) + Bx(x+1) + Cx(x-1) = x^2 + 1$. At $x=0$: $-A = 1 \\Rightarrow A = -1$. $x=1$: $2B = 2 \\Rightarrow B = 1$. $x=-1$: $2C = 2 \\Rightarrow C = 1$.',
        'Integrate each.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int \\dfrac{dx}{(x^2 + 1)(x - 1)}$.',
      answer: '$\\dfrac{1}{2}\\ln|x - 1| - \\dfrac{1}{4}\\ln(x^2 + 1) - \\dfrac{1}{2}\\arctan x + C$',
      steps: [
        'Partial fractions: $\\dfrac{1}{(x^2+1)(x-1)} = \\dfrac{A}{x-1} + \\dfrac{Bx + D}{x^2+1}$.',
        'Clear: $A(x^2+1) + (Bx+D)(x-1) = 1$. At $x=1$: $2A = 1 \\Rightarrow A = 1/2$. Coefficient of $x^2$: $A + B = 0 \\Rightarrow B = -1/2$. Constant: $A - D = 1 \\Rightarrow D = -1/2$.',
        'Integrate each piece.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle \\int_0^\\infty e^{-x}x^n\\,dx$ for nonnegative integer $n$.',
      answer: '$n!$',
      steps: [
        'This is the Gamma function $\\Gamma(n+1) = n!$.',
        'Proof by induction / repeated integration by parts: $\\int_0^\\infty e^{-x}x^n dx = n\\int_0^\\infty e^{-x}x^{n-1}dx$.',
        'Base $n = 0$: $\\int_0^\\infty e^{-x}dx = 1 = 0!$. Induction closes it.',
      ],
    },
  ];

  PS.registerTopic("calc-techniques", {
    title: "Techniques of integration",
    description: "u-substitution, integration by parts, partial fractions, and trigonometric tricks.",
    warmup:   [genUSubLinear, STATIC_TECH_WARMUP],
    standard: STATIC_TECH_STANDARD,
    challenge: STATIC_TECH_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 8: calc-taylor
  // ==========================================================================

  var STATIC_TAYLOR_WARMUP = [
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $x = 0$ for $f(x) = e^x$.',
      answer: '$1 + x + \\dfrac{x^2}{2}$',
      steps: [
        '$f(0) = 1$, $f\'(0) = 1$, $f\'\'(0) = 1$.',
        'Series: $\\sum f^{(n)}(0)x^n/n! = 1 + x + x^2/2 + \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\sin x$.',
      answer: '$x - \\dfrac{x^3}{6} + \\dfrac{x^5}{120}$',
      steps: [
        '$\\sin 0 = 0$, $\\cos 0 = 1$, $-\\sin 0 = 0$, $-\\cos 0 = -1$, $\\sin 0 = 0$, $\\cos 0 = 1$.',
        'Series: $x - x^3/3! + x^5/5! - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\cos x$.',
      answer: '$1 - \\dfrac{x^2}{2} + \\dfrac{x^4}{24}$',
      steps: [
        'Even derivatives at $0$: $1, -1, 1, \\ldots$; odd ones vanish.',
        'Series: $1 - x^2/2! + x^4/4! - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\ln(1 + x)$.',
      answer: '$x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3}$',
      steps: [
        '$f(0) = 0$, $f\'(x) = 1/(1+x)$, $f\'(0) = 1$.',
        '$f^{(n)}(0) = (-1)^{n-1}(n-1)!$ for $n \\ge 1$.',
        'So series is $\\sum_{n\\ge 1}(-1)^{n-1}x^n/n = x - x^2/2 + x^3/3 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the Taylor series at $0$ for $f(x) = \\dfrac{1}{1 - x}$.',
      answer: '$\\sum_{n=0}^\\infty x^n = 1 + x + x^2 + x^3 + \\ldots$',
      steps: [
        'This is a geometric series with ratio $x$.',
        'Converges for $|x| < 1$.',
      ],
    },
    {
      prompt: 'Find the Taylor series at $0$ for $f(x) = \\dfrac{1}{1 + x}$.',
      answer: '$\\sum_{n=0}^\\infty (-x)^n = 1 - x + x^2 - x^3 + \\ldots$',
      steps: [
        'Substitute $-x$ into geometric series $1/(1-u)$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\sqrt{1 + x}$.',
      answer: '$1 + \\dfrac{x}{2} - \\dfrac{x^2}{8} + \\dfrac{x^3}{16}$',
      steps: [
        'Use the binomial series: $(1+x)^{1/2} = \\sum \\binom{1/2}{n}x^n$.',
        '$\\binom{1/2}{0}=1$, $\\binom{1/2}{1}=1/2$, $\\binom{1/2}{2}=-1/8$, $\\binom{1/2}{3}=1/16$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\arctan x$.',
      answer: '$x - \\dfrac{x^3}{3} + \\dfrac{x^5}{5}$',
      steps: [
        '$\\arctan\'(x) = 1/(1+x^2) = \\sum (-x^2)^n = 1 - x^2 + x^4 - \\ldots$.',
        'Integrate termwise: $x - x^3/3 + x^5/5 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = e^{-x^2}$.',
      answer: '$1 - x^2 + \\dfrac{x^4}{2}$',
      steps: [
        'Start from $e^u = 1 + u + u^2/2 + \\ldots$.',
        'Substitute $u = -x^2$: $1 - x^2 + x^4/2 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\sinh x$.',
      answer: '$x + \\dfrac{x^3}{6} + \\dfrac{x^5}{120}$',
      steps: [
        '$\\sinh x = (e^x - e^{-x})/2$. Subtract the two series and halve.',
        'Result: $x + x^3/3! + x^5/5! + \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\cosh x$.',
      answer: '$1 + \\dfrac{x^2}{2} + \\dfrac{x^4}{24}$',
      steps: [
        '$\\cosh x = (e^x + e^{-x})/2$.',
        'Even-powered series: $1 + x^2/2! + x^4/4! + \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\ln(1 - x)$.',
      answer: '$-x - \\dfrac{x^2}{2} - \\dfrac{x^3}{3}$',
      steps: [
        'Substitute $-x$ for $x$ in the series for $\\ln(1+x)$.',
        'Result: $-x - x^2/2 - x^3/3 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\dfrac{1}{(1 - x)^2}$.',
      answer: '$1 + 2x + 3x^2 + 4x^3$',
      steps: [
        'Differentiate $1/(1-x) = \\sum x^n$ term by term.',
        '$\\sum n x^{n-1} = 1 + 2x + 3x^2 + \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\tan x$.',
      answer: '$x + \\dfrac{x^3}{3} + \\dfrac{2x^5}{15}$',
      steps: [
        'Compute $\\tan x = \\sin x / \\cos x$ and divide series, or use $\\tan\'(x) = 1 + \\tan^2 x$.',
        'Direct differentiation at $0$: $f(0)=0$, $f\'(0)=1$, $f\'\'(0)=0$, $f\'\'\'(0)=2$, etc.',
        'Series: $x + x^3/3 + 2x^5/15 + \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = x e^x$.',
      answer: '$x + x^2 + \\dfrac{x^3}{2}$',
      steps: [
        'Multiply $x$ into the series for $e^x$: $x(1 + x + x^2/2 + \\ldots)$.',
        'Shift each term by one power of $x$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = x\\sin x$.',
      answer: '$x^2 - \\dfrac{x^4}{6} + \\dfrac{x^6}{120}$',
      steps: [
        'Multiply $x$ into series for $\\sin x$.',
        'Result: $x^2 - x^4/6 + x^6/120 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\dfrac{\\sin x}{x}$.',
      answer: '$1 - \\dfrac{x^2}{6} + \\dfrac{x^4}{120}$',
      steps: [
        'Divide series for $\\sin x$ by $x$.',
        'Result: $1 - x^2/6 + x^4/120 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\dfrac{1 - \\cos x}{x^2}$.',
      answer: '$\\dfrac{1}{2} - \\dfrac{x^2}{24} + \\dfrac{x^4}{720}$',
      steps: [
        '$1 - \\cos x = x^2/2 - x^4/24 + x^6/720 - \\ldots$.',
        'Divide by $x^2$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = \\sec x$.',
      answer: '$1 + \\dfrac{x^2}{2} + \\dfrac{5x^4}{24}$',
      steps: [
        'Reciprocal of the series for $\\cos x$, or compute derivatives directly.',
        '$\\sec 0 = 1$, $\\sec\'\'(0) = 1$, $\\sec^{(4)}(0) = 5$. Taylor coefficients: $1, 0, 1/2, 0, 5/24, \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series at $0$ for $f(x) = (1 + x)^{1/3}$.',
      answer: '$1 + \\dfrac{x}{3} - \\dfrac{x^2}{9} + \\dfrac{5x^3}{81}$',
      steps: [
        'Use binomial series with exponent $1/3$.',
        '$\\binom{1/3}{0}=1$, $\\binom{1/3}{1}=1/3$, $\\binom{1/3}{2}=-1/9$, $\\binom{1/3}{3}=5/81$.',
      ],
    },
  ];

  var STATIC_TAYLOR_STANDARD = [
    {
      prompt: 'Find the Taylor series of $f(x) = \\ln x$ at $x = 1$.',
      answer: '$\\sum_{n=1}^\\infty \\dfrac{(-1)^{n-1}(x-1)^n}{n}$',
      steps: [
        'Let $u = x - 1$, so $\\ln x = \\ln(1 + u)$.',
        'Use the known series: $\\ln(1+u) = u - u^2/2 + u^3/3 - \\ldots$.',
        'Substitute back: $(x-1) - (x-1)^2/2 + (x-1)^3/3 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $f(x) = e^x$ at $x = 1$.',
      answer: '$\\sum_{n=0}^\\infty \\dfrac{e(x-1)^n}{n!}$',
      steps: [
        'Write $e^x = e\\cdot e^{x-1}$.',
        'Apply the Maclaurin series of $e^u$ with $u = x - 1$.',
      ],
    },
    {
      prompt: 'Find the Taylor series for $x e^x$ at $0$ using the series for $e^x$.',
      answer: '$\\sum_{n=0}^\\infty \\dfrac{x^{n+1}}{n!} = \\sum_{n=1}^\\infty \\dfrac{x^n}{(n-1)!}$',
      steps: [
        '$e^x = \\sum x^n/n!$.',
        'Multiply by $x$: $xe^x = \\sum x^{n+1}/n!$.',
        'Re-index: $\\sum_{n\\ge 1} x^n/(n-1)!$.',
      ],
    },
    {
      prompt: 'Find the Taylor series at $0$ for $\\int_0^x e^{-t^2}dt$.',
      answer: '$\\sum_{n=0}^\\infty \\dfrac{(-1)^n x^{2n+1}}{n!(2n+1)}$',
      steps: [
        '$e^{-t^2} = \\sum (-1)^n t^{2n}/n!$.',
        'Integrate term by term from $0$ to $x$: $\\sum (-1)^n x^{2n+1}/(n!(2n+1))$.',
      ],
    },
    {
      prompt: 'Find the first four nonzero terms of the Taylor series for $\\sin(x^2)$ at $0$.',
      answer: '$x^2 - \\dfrac{x^6}{6} + \\dfrac{x^{10}}{120} - \\dfrac{x^{14}}{5040}$',
      steps: [
        'Substitute $x^2$ for $x$ in the Maclaurin series for $\\sin$.',
        'Shift each term to even powers.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $\\cos x$ around $x = \\pi/2$.',
      answer: '$\\sum_{n=0}^\\infty \\dfrac{(-1)^{n+1}(x - \\pi/2)^{2n+1}}{(2n+1)!}$',
      steps: [
        'Write $\\cos x = \\cos((x - \\pi/2) + \\pi/2) = -\\sin(x - \\pi/2)$.',
        'Expand $-\\sin u$ with $u = x - \\pi/2$.',
      ],
    },
    {
      prompt: 'Derive the Taylor series of $\\dfrac{1}{1 + x^2}$ at $0$ and use it to write a series for $\\arctan x$.',
      answer: '$\\arctan x = \\sum_{n=0}^\\infty \\dfrac{(-1)^n x^{2n+1}}{2n+1}$',
      steps: [
        '$\\dfrac{1}{1+x^2} = \\sum (-x^2)^n = \\sum (-1)^n x^{2n}$.',
        'Integrate term by term from $0$ to $x$.',
      ],
    },
    {
      prompt: 'Use the series for $\\cos x$ to approximate $\\cos(0.1)$ to 4 decimal places.',
      answer: '$\\cos(0.1) \\approx 0.9950$',
      steps: [
        '$\\cos x \\approx 1 - x^2/2 + x^4/24$.',
        'At $x = 0.1$: $1 - 0.005 + 0.000004/24 \\approx 0.995004$.',
        'Rounded to 4 decimal places: $0.9950$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series for $f(x) = e^x\\cos x$ at $0$.',
      answer: '$1 + x - \\dfrac{x^3}{3}$',
      steps: [
        '$e^x = 1 + x + x^2/2 + x^3/6 + \\ldots$, $\\cos x = 1 - x^2/2 + \\ldots$.',
        'Multiply (truncating beyond $x^3$): $(1 + x + x^2/2 + x^3/6)(1 - x^2/2)$.',
        'Collect: $1 + x + (x^2/2 - x^2/2) + (x^3/6 - x^3/2) = 1 + x - x^3/3$.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $f(x) = \\dfrac{1}{x}$ around $x = 1$.',
      answer: '$\\sum_{n=0}^\\infty (-1)^n(x - 1)^n$',
      steps: [
        '$\\dfrac{1}{x} = \\dfrac{1}{1 + (x - 1)}$.',
        'Use geometric series with ratio $-(x-1)$: converges for $|x-1|<1$.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $f(x) = \\sqrt x$ around $x = 4$.',
      answer: '$2 + \\dfrac{x-4}{4} - \\dfrac{(x-4)^2}{64} + \\dfrac{(x-4)^3}{512} - \\ldots$',
      steps: [
        '$f(4) = 2$, $f\'(x) = 1/(2\\sqrt x)$ so $f\'(4) = 1/4$.',
        '$f\'\'(x) = -1/(4x^{3/2})$, $f\'\'(4) = -1/32$; coeff $-1/64$.',
        '$f\'\'\'(x) = 3/(8x^{5/2})$, $f\'\'\'(4) = 3/256$; coeff $1/512$.',
      ],
    },
    {
      prompt: 'Use the Taylor series to show $\\displaystyle \\lim_{x\\to 0}\\dfrac{\\sin x - x}{x^3} = -\\dfrac{1}{6}$.',
      answer: '$-\\dfrac{1}{6}$',
      steps: [
        '$\\sin x = x - x^3/6 + x^5/120 - \\ldots$.',
        '$\\sin x - x = -x^3/6 + x^5/120 - \\ldots$.',
        'Divide by $x^3$: $-1/6 + x^2/120 - \\ldots \\to -1/6$.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $\\sin^2 x$ at $0$ through order $x^6$.',
      answer: '$x^2 - \\dfrac{x^4}{3} + \\dfrac{2x^6}{45}$',
      steps: [
        '$\\sin^2 x = (1 - \\cos 2x)/2$.',
        '$\\cos 2x = 1 - (2x)^2/2 + (2x)^4/24 - (2x)^6/720 + \\ldots = 1 - 2x^2 + 2x^4/3 - 4x^6/45 + \\ldots$.',
        '$(1 - \\cos 2x)/2 = x^2 - x^4/3 + 2x^6/45 - \\ldots$.',
      ],
    },
    {
      prompt: 'Find the first three nonzero terms of the Taylor series for $e^x\\sin x$ at $0$.',
      answer: '$x + x^2 + \\dfrac{x^3}{3}$',
      steps: [
        '$(1 + x + x^2/2 + x^3/6 + \\ldots)(x - x^3/6 + \\ldots)$.',
        'Collect up to $x^3$: $x + x^2 + x^3/2 - x^3/6 = x + x^2 + x^3/3$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle \\int_0^1 \\sin(x^2)\\,dx$ as an infinite series.',
      answer: '$\\sum_{n=0}^\\infty \\dfrac{(-1)^n}{(2n+1)!(4n+3)}$',
      steps: [
        '$\\sin(x^2) = \\sum (-1)^n x^{4n+2}/(2n+1)!$.',
        'Integrate from $0$ to $1$: $\\sum (-1)^n/((2n+1)!(4n+3))$.',
      ],
    },
  ];

  var STATIC_TAYLOR_CHALLENGE = [
    {
      prompt: 'Use Lagrange\'s remainder to bound the error when $\\cos(0.5)$ is approximated by $1 - (0.5)^2/2$.',
      answer: 'Error $\\le (0.5)^4/24 \\approx 0.0026$',
      steps: [
        'Taylor with remainder: $\\cos x = 1 - x^2/2 + R_3(x)$ where $|R_3(x)| \\le |x|^4/4!$ (since $|\\cos^{(4)}| \\le 1$).',
        'At $x = 0.5$: $|R_3| \\le 0.0625/24 \\approx 0.0026$.',
      ],
    },
    {
      prompt: 'Find the radius of convergence of $\\sum_{n=0}^\\infty \\dfrac{x^n}{n!}$.',
      answer: '$R = \\infty$',
      steps: [
        'Ratio test: $\\left|\\dfrac{x^{n+1}/(n+1)!}{x^n/n!}\\right| = \\dfrac{|x|}{n+1} \\to 0$ for all $x$.',
        'So the series converges for all $x$; $R = \\infty$.',
      ],
    },
    {
      prompt: 'Find the radius of convergence of $\\sum_{n=1}^\\infty \\dfrac{x^n}{n \\cdot 3^n}$.',
      answer: '$R = 3$',
      steps: [
        'Ratio test: $\\left|\\dfrac{x^{n+1}/((n+1)3^{n+1})}{x^n/(n 3^n)}\\right| = \\dfrac{n}{3(n+1)}|x| \\to |x|/3$.',
        'Converges when $|x|/3 < 1$, i.e. $|x| < 3$.',
      ],
    },
    {
      prompt: 'Find the radius of convergence of $\\sum_{n=0}^\\infty n! x^n$.',
      answer: '$R = 0$',
      steps: [
        'Ratio: $(n+1)!|x|^{n+1}/(n!|x|^n) = (n+1)|x|$.',
        'Limit is $\\infty$ for any $x \\ne 0$; converges only at $x = 0$.',
      ],
    },
    {
      prompt: 'Find the radius of convergence of $\\sum_{n=0}^\\infty \\dfrac{x^{2n}}{(2n)!}$.',
      answer: '$R = \\infty$',
      steps: [
        'This is the Taylor series for $\\cos x$ (well, $\\cosh x$ without signs).',
        'Ratio test on $a_n = 1/(2n)!$: $a_{n+1}/a_n\\cdot|x|^2 = |x|^2/((2n+2)(2n+1)) \\to 0$.',
      ],
    },
    {
      prompt: 'Prove Euler\'s identity $e^{ix} = \\cos x + i\\sin x$ using Taylor series.',
      answer: 'Proved',
      steps: [
        '$e^{ix} = \\sum (ix)^n/n! = \\sum i^n x^n/n!$.',
        'Split by parity of $n$. Even $n = 2k$: $i^{2k} = (-1)^k$, giving $\\sum (-1)^k x^{2k}/(2k)! = \\cos x$.',
        'Odd $n = 2k+1$: $i^{2k+1} = i(-1)^k$, giving $i\\sum(-1)^k x^{2k+1}/(2k+1)! = i\\sin x$.',
        'Add: $e^{ix} = \\cos x + i\\sin x$.',
      ],
    },
    {
      prompt: 'Estimate the error in approximating $e \\approx 1 + 1 + 1/2 + 1/6 + 1/24$ using Lagrange remainder.',
      answer: 'Error $< 1/24 \\approx 0.0417$; actual error $\\approx 0.0099$.',
      steps: [
        'Taylor remainder: $|R_4(1)| \\le \\dfrac{M}{5!}\\cdot 1^5$ where $M = \\max_{0 \\le c \\le 1}|e^c| = e < 3$.',
        'So $|R_4| < 3/120 = 0.025$.',
        '(Better bound: $|R_4| \\le e/120 < 0.023$.) Actual error $e - (1 + 1 + 1/2 + 1/6 + 1/24) \\approx 0.0099$.',
      ],
    },
    {
      prompt: 'Find the Taylor series of $f(x) = \\arcsin x$ at $0$.',
      answer: '$x + \\dfrac{x^3}{6} + \\dfrac{3x^5}{40} + \\dfrac{15 x^7}{336} + \\ldots$',
      steps: [
        '$\\arcsin\'(x) = 1/\\sqrt{1 - x^2} = (1 - x^2)^{-1/2}$.',
        'Binomial series: $\\sum \\binom{-1/2}{n}(-x^2)^n = 1 + \\tfrac{1}{2}x^2 + \\tfrac{3}{8}x^4 + \\tfrac{15}{48}x^6 + \\ldots$.',
        'Integrate term by term.',
      ],
    },
    {
      prompt: 'Let $f(x) = \\ln(1 + x)$. How many terms of its Taylor series are needed to approximate $\\ln 1.5$ to within $10^{-3}$?',
      answer: 'At least $n = 7$ terms.',
      steps: [
        'Alternating series with terms $(-1)^{n-1}(0.5)^n/n$.',
        'Error bound: first neglected term $\\le (0.5)^{n+1}/(n+1)$.',
        'Need $(0.5)^{n+1}/(n+1) < 10^{-3}$.',
        '$n = 6$: $(0.5)^7/7 \\approx 0.00112$, too big. $n = 7$: $(0.5)^8/8 \\approx 0.000488 < 10^{-3}$.',
        'So $7$ terms suffice.',
      ],
    },
    {
      prompt: 'Show that $\\sum_{n=0}^\\infty x^{2n}/(2n)! = \\cosh x$.',
      answer: 'Proved',
      steps: [
        '$\\cosh x = (e^x + e^{-x})/2$.',
        '$e^x + e^{-x} = 2\\sum x^{2n}/(2n)!$ (odd terms cancel).',
        'Divide by $2$: $\\cosh x = \\sum x^{2n}/(2n)!$.',
      ],
    },
    {
      prompt: 'Find the Taylor polynomial of degree $3$ for $f(x) = \\tan x$ at $x = 0$, and bound the error on $[-0.3, 0.3]$.',
      answer: '$T_3(x) = x + x^3/3$; error term has a more involved bound.',
      steps: [
        '$\\tan 0 = 0$, $\\sec^2 0 = 1$, etc. Derivatives give $0, 1, 0, 2$.',
        'So $T_3(x) = x + x^3/3$.',
        'Error via Lagrange: need bound on $|f^{(4)}|$ on the interval. $f^{(4)}$ is bounded by a modest constant on $|x|\\le 0.3$; the bound works out to about $|x|^4\\cdot M/24$ with $M \\le 20$.',
      ],
    },
    {
      prompt: 'Is the Taylor series of $f(x) = e^{-1/x^2}$ (with $f(0) = 0$) at $0$ equal to $f$?',
      answer: 'No: all derivatives at $0$ are $0$, so the Taylor series is $0$, but $f \\ne 0$ for $x \\ne 0$.',
      steps: [
        'You can show by induction that $f^{(n)}(0) = 0$ for every $n$.',
        'Hence the Taylor series is the zero function.',
        'But $f(x) > 0$ for $x\\ne 0$, so the series does not represent $f$ in any neighborhood of $0$.',
        'This is a classic example of a smooth but non-analytic function.',
      ],
    },
    {
      prompt: 'Prove $\\sin^2 x + \\cos^2 x = 1$ using Taylor series.',
      answer: 'Verified',
      steps: [
        'Let $g(x) = \\sin^2 x + \\cos^2 x$. $g(0) = 1$.',
        '$g\'(x) = 2\\sin x\\cos x - 2\\sin x\\cos x = 0$.',
        'So $g$ is constant equal to $1$. (This uses only series-level derivative facts.)',
      ],
    },
    {
      prompt: 'Find the sum $\\displaystyle \\sum_{n=0}^\\infty \\dfrac{(-1)^n}{(2n+1)!}$.',
      answer: '$\\sin 1$',
      steps: [
        '$\\sin x = \\sum (-1)^n x^{2n+1}/(2n+1)!$.',
        'Set $x = 1$: $\\sum (-1)^n/(2n+1)! = \\sin 1$.',
      ],
    },
    {
      prompt: 'Show that $\\sum_{n=1}^\\infty \\dfrac{1}{n 2^n} = \\ln 2$.',
      answer: '$\\ln 2$',
      steps: [
        'Known series: $\\ln(1/(1-x)) = \\sum x^n/n$ for $|x|<1$.',
        'At $x = 1/2$: $\\ln 2 = \\sum (1/2)^n/n = \\sum 1/(n 2^n)$.',
      ],
    },
  ];

  PS.registerTopic("calc-taylor", {
    title: "Taylor series",
    description: "Expansions, remainder estimates, and convergence.",
    warmup:   STATIC_TAYLOR_WARMUP,
    standard: STATIC_TAYLOR_STANDARD,
    challenge: STATIC_TAYLOR_CHALLENGE,
  });

})();
