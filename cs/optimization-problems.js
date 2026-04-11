/*
 * LearningHub - Optimization Problem Set
 * Registers 4 topics with LearningHubProblemSet runtime.
 * Topics: opt-convex, opt-gd, opt-constrained, opt-lp
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[optimization-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC 1: opt-convex  (Convex sets, convex functions, Jensen's inequality)
  // ==========================================================================

  var STATIC_CONVEX_WARMUP = [
    {
      prompt: 'State the definition of a convex set $C \\subseteq \\mathbb{R}^n$.',
      answer: 'For every $x, y \\in C$ and every $\\theta \\in [0, 1]$, the point $\\theta x + (1 - \\theta) y$ is also in $C$.',
      steps: [
        'Pick any two points in the set.',
        'The entire line segment connecting them must lie inside the set.',
        'Equivalently: $C$ is closed under convex combinations of pairs.',
      ],
    },
    {
      prompt: 'Is the set $\\{x \\in \\mathbb{R}^2 : x_1^2 + x_2^2 \\le 4\\}$ convex?',
      answer: 'Yes.',
      steps: [
        'This is a closed disk of radius $2$ centered at the origin.',
        'Every norm ball $\\{x : \\|x\\| \\le r\\}$ is convex: if $\\|x\\|, \\|y\\| \\le r$ then by the triangle inequality $\\|\\theta x + (1-\\theta) y\\| \\le \\theta r + (1-\\theta) r = r$.',
        'So the set is convex.',
      ],
    },
    {
      prompt: 'Is the set $\\{(x_1, x_2) \\in \\mathbb{R}^2 : x_1^2 + x_2^2 \\ge 1\\}$ (the complement of the open unit disk) convex?',
      answer: 'No.',
      steps: [
        'Take $x = (-1, 0)$ and $y = (1, 0)$, both on the unit circle, so both in the set.',
        'Midpoint is $(0, 0)$, which has norm $0 < 1$ and is NOT in the set.',
        'A single counterexample is enough to disprove convexity.',
      ],
    },
    {
      prompt: 'Define a convex function $f : \\mathbb{R}^n \\to \\mathbb{R}$.',
      answer: '$f$ is convex iff $f(\\theta x + (1 - \\theta) y) \\le \\theta f(x) + (1 - \\theta) f(y)$ for all $x, y$ in the domain and $\\theta \\in [0, 1]$.',
      steps: [
        'The chord between two points on the graph lies on or above the graph.',
        'Equivalently (if $f$ is differentiable): $f(y) \\ge f(x) + \\nabla f(x)^\\top (y - x)$.',
        'Equivalently (if $f$ is twice differentiable): $\\nabla^2 f(x) \\succeq 0$ on the domain.',
      ],
    },
    {
      prompt: 'Is $f(x) = x^4$ convex on $\\mathbb{R}$?',
      answer: 'Yes.',
      steps: [
        'Compute the second derivative: $f\'\'(x) = 12 x^2$.',
        '$12 x^2 \\ge 0$ for all real $x$.',
        'Non-negative second derivative on an interval implies convex.',
      ],
    },
    {
      prompt: 'State Jensen\'s inequality for a convex function $f$ and random variable $X$.',
      answer: '$f(\\mathbb{E}[X]) \\le \\mathbb{E}[f(X)]$.',
      steps: [
        'Jensen extends the convexity inequality from two points to any distribution.',
        'It is one of the most heavily used tools in probability, information theory, and statistics.',
        'Equality holds iff $X$ is constant or $f$ is affine on the support of $X$.',
      ],
    },
  ];

  var STATIC_CONVEX_STANDARD = [
    {
      prompt: 'Prove that the intersection of two convex sets $A, B \\subseteq \\mathbb{R}^n$ is convex.',
      answer: '$A \\cap B$ is convex.',
      steps: [
        'Let $x, y \\in A \\cap B$ and $\\theta \\in [0, 1]$.',
        'Then $x, y \\in A$, so by convexity of $A$, $\\theta x + (1 - \\theta) y \\in A$.',
        'Similarly $\\theta x + (1 - \\theta) y \\in B$.',
        'Therefore $\\theta x + (1 - \\theta) y \\in A \\cap B$.',
      ],
    },
    {
      prompt: 'A portfolio manager allocates weights $w \\in \\mathbb{R}^n$ satisfying $w \\ge 0$ and $\\sum_i w_i = 1$. Show this feasible set is convex.',
      answer: 'The probability simplex $\\Delta^{n-1}$ is convex.',
      steps: [
        'Pick $w, v \\in \\Delta^{n-1}$ and $\\theta \\in [0, 1]$. Set $u = \\theta w + (1 - \\theta) v$.',
        'Each entry: $u_i = \\theta w_i + (1 - \\theta) v_i \\ge 0$ since both $w_i, v_i \\ge 0$.',
        'Sum: $\\sum_i u_i = \\theta \\sum_i w_i + (1 - \\theta) \\sum_i v_i = \\theta + (1 - \\theta) = 1$.',
        'So $u \\in \\Delta^{n-1}$, and the simplex is convex.',
      ],
    },
    {
      prompt: 'Show that the log-sum-exp function $f(x) = \\log \\sum_{i=1}^n e^{x_i}$ is convex on $\\mathbb{R}^n$.',
      answer: '$f$ is convex.',
      steps: [
        'Compute the Hessian $\\nabla^2 f$. Let $p_i = e^{x_i} / \\sum_j e^{x_j}$ (the softmax).',
        '$\\nabla^2 f = \\mathrm{diag}(p) - p p^\\top$.',
        'For any $z$: $z^\\top (\\mathrm{diag}(p) - p p^\\top) z = \\sum_i p_i z_i^2 - (\\sum_i p_i z_i)^2$.',
        'By Jensen applied to the distribution $p$, this equals $\\mathrm{Var}_p(z) \\ge 0$.',
        'Hessian is PSD everywhere, so $f$ is convex.',
      ],
    },
    {
      prompt: 'Use Jensen to derive the AM-GM inequality for positive numbers $a_1, \\ldots, a_n$.',
      answer: '$\\frac{1}{n}(a_1 + \\cdots + a_n) \\ge \\sqrt[n]{a_1 \\cdots a_n}$.',
      steps: [
        'The function $-\\log x$ is convex (second derivative $1/x^2 > 0$).',
        'Apply Jensen to the uniform distribution on $\\{a_1, \\ldots, a_n\\}$: $-\\log(\\bar{a}) \\le \\frac{1}{n} \\sum_i -\\log(a_i)$.',
        'Negate: $\\log \\bar{a} \\ge \\frac{1}{n} \\sum_i \\log a_i = \\log \\sqrt[n]{a_1 \\cdots a_n}$.',
        'Exponentiate to obtain AM-GM.',
      ],
    },
    {
      prompt: 'A physicist minimizes the elastic potential $U(x) = \\tfrac{1}{2} k_1 x_1^2 + \\tfrac{1}{2} k_2 x_2^2 + \\tfrac{1}{2} k_{12}(x_1 - x_2)^2$ with $k_1, k_2, k_{12} > 0$. Is $U$ convex?',
      answer: 'Yes, strictly convex.',
      steps: [
        'Write $U$ as $\\tfrac{1}{2} x^\\top H x$ with $H = \\begin{pmatrix} k_1 + k_{12} & -k_{12} \\\\ -k_{12} & k_2 + k_{12} \\end{pmatrix}$.',
        'Diagonal entries are positive; determinant is $(k_1+k_{12})(k_2+k_{12}) - k_{12}^2 = k_1 k_2 + k_{12}(k_1 + k_2) > 0$.',
        'So $H$ is symmetric positive definite.',
        'A quadratic form with PD Hessian is strictly convex, and the unique minimum is at $x = 0$.',
      ],
    },
    {
      prompt: 'The log-loss for a single binary example is $\\ell(w) = -y \\log \\sigma(w^\\top x) - (1 - y) \\log(1 - \\sigma(w^\\top x))$ where $\\sigma$ is the sigmoid. Is it convex in $w$?',
      answer: 'Yes — this is why logistic regression has a globally optimal solution.',
      steps: [
        'Let $z = w^\\top x$. Then $\\ell = \\mathrm{softplus}(z) - y z$ where $\\mathrm{softplus}(z) = \\log(1 + e^z)$.',
        'Softplus has second derivative $\\sigma(z)(1 - \\sigma(z)) \\ge 0$, so softplus is convex in $z$.',
        'Composition with the affine function $z(w) = w^\\top x$ preserves convexity.',
        '$- y z$ is linear, hence convex. Sum of convex functions is convex.',
      ],
    },
  ];

  var STATIC_CONVEX_CHALLENGE = [
    {
      prompt: 'Let $f : \\mathbb{R}^n \\to \\mathbb{R}$ be convex. Prove that any local minimum of $f$ is also a global minimum.',
      answer: 'Local minimum implies global minimum for convex $f$.',
      steps: [
        'Suppose $x^\\star$ is a local minimum but not global: there exists $y$ with $f(y) < f(x^\\star)$.',
        'For $\\theta \\in (0, 1)$, convexity gives $f(\\theta y + (1 - \\theta) x^\\star) \\le \\theta f(y) + (1 - \\theta) f(x^\\star) < f(x^\\star)$.',
        'Taking $\\theta$ small, these points lie arbitrarily close to $x^\\star$ yet have strictly smaller value.',
        'This contradicts $x^\\star$ being a local minimum.',
      ],
    },
    {
      prompt: 'An engineer designs a resistor network. The total power dissipated is $P(I) = \\sum_i R_i I_i^2$ where $R_i > 0$ are fixed and $I_i$ are branch currents. Given that the currents must satisfy Kirchhoff\'s laws (a linear subspace), argue that the minimum-power flow is unique.',
      answer: 'Unique minimum exists.',
      steps: [
        'Each $R_i I_i^2$ is strictly convex in $I_i$; the sum is strictly convex in $I$.',
        'A strictly convex function restricted to a linear subspace is still strictly convex.',
        'Strict convexity plus nonempty feasible set plus a minimizer (coercive) gives uniqueness.',
        'Kirchhoff\'s laws define an affine subspace (current conservation), so the minimum is well-defined and unique — this is Maxwell\'s minimum-heat principle.',
      ],
    },
    {
      prompt: 'Show that if $f$ is convex and $g$ is convex and nondecreasing, then $h(x) = g(f(x))$ is convex.',
      answer: 'Composition $g \\circ f$ is convex.',
      steps: [
        'Pick $x, y$ and $\\theta \\in [0, 1]$.',
        '$f(\\theta x + (1 - \\theta) y) \\le \\theta f(x) + (1 - \\theta) f(y)$ by convexity of $f$.',
        'Apply $g$, which is nondecreasing: $g(f(\\theta x + (1-\\theta) y)) \\le g(\\theta f(x) + (1 - \\theta) f(y))$.',
        'Apply convexity of $g$: $\\le \\theta g(f(x)) + (1 - \\theta) g(f(y))$.',
      ],
    },
    {
      prompt: 'In a variational formulation of classical mechanics, the action is $S[q] = \\int_0^T L(q, \\dot q) \\, dt$. For the free particle $L = \\tfrac{1}{2} m \\dot q^2$, is $S$ a convex functional of $q$?',
      answer: 'Yes.',
      steps: [
        'The integrand is quadratic in $\\dot q$ with positive coefficient, so it is strictly convex in $\\dot q$.',
        'Integration of a pointwise-convex functional preserves convexity.',
        'So $S$ is strictly convex in $q$ on the space of smooth paths with fixed endpoints.',
        'Consequence: the minimizer (straight-line motion) is unique — the Euler-Lagrange equation has a unique solution.',
      ],
    },
    {
      prompt: 'Prove that the set of positive semidefinite matrices is convex.',
      answer: '$S^n_+$ is a convex cone.',
      steps: [
        'Let $A, B \\in S^n_+$ and $\\theta \\in [0, 1]$.',
        'For any $z \\in \\mathbb{R}^n$: $z^\\top (\\theta A + (1 - \\theta) B) z = \\theta z^\\top A z + (1 - \\theta) z^\\top B z \\ge 0$.',
        'So $\\theta A + (1 - \\theta) B \\succeq 0$, proving convexity.',
        'Additionally, $\\alpha A \\in S^n_+$ for $\\alpha \\ge 0$, so it is a cone.',
      ],
    },
  ];

  PS.registerTopic("opt-convex", {
    title: "Convex analysis — sets, functions, and Jensen",
    description: "Practice recognizing convex sets and functions, and applying Jensen's inequality to problems from physics, finance, and ML.",
    warmup: STATIC_CONVEX_WARMUP,
    standard: STATIC_CONVEX_STANDARD,
    challenge: STATIC_CONVEX_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: opt-gd  (Gradient descent family)
  // ==========================================================================

  var STATIC_GD_WARMUP = [
    {
      prompt: 'Write the gradient descent update rule for minimizing $f(x)$ with step size $\\eta > 0$.',
      answer: '$x_{k+1} = x_k - \\eta \\nabla f(x_k)$.',
      steps: [
        'Move against the gradient: downhill in the steepest direction.',
        'Step size $\\eta$ (also called learning rate) controls how far you move.',
        'Too small = slow; too large = overshoot or diverge.',
      ],
    },
    {
      prompt: 'For $f(x) = \\tfrac{1}{2} x^2$ starting at $x_0 = 4$ with $\\eta = 0.5$, what is $x_1$?',
      answer: '$x_1 = 2$.',
      steps: [
        '$\\nabla f(x) = x$, so $\\nabla f(4) = 4$.',
        '$x_1 = 4 - 0.5 \\cdot 4 = 2$.',
      ],
    },
    {
      prompt: 'For $f(x) = \\tfrac{1}{2} x^2$ with step size $\\eta$, write $x_{k+1}$ as a closed form in $x_0$.',
      answer: '$x_{k} = (1 - \\eta)^k x_0$.',
      steps: [
        'Each step: $x_{k+1} = x_k - \\eta x_k = (1 - \\eta) x_k$.',
        'Iterate: $x_k = (1 - \\eta)^k x_0$.',
        'Converges to $0$ iff $|1 - \\eta| < 1$, i.e. $0 < \\eta < 2$.',
      ],
    },
    {
      prompt: 'What is the difference between batch gradient descent and stochastic gradient descent (SGD)?',
      answer: 'Batch GD uses the full-dataset gradient per step; SGD uses the gradient of a single (random) example.',
      steps: [
        'Batch: $\\nabla f(x) = \\frac{1}{N} \\sum_{i=1}^N \\nabla f_i(x)$, expensive but exact.',
        'SGD: use $\\nabla f_i(x)$ for random $i$ — noisy but $N$ times cheaper per step.',
        'Mini-batch SGD averages over a small batch — the common compromise.',
      ],
    },
    {
      prompt: 'In the heavy-ball (momentum) update $v_{k+1} = \\beta v_k - \\eta \\nabla f(x_k); \\; x_{k+1} = x_k + v_{k+1}$, what does $\\beta$ control?',
      answer: 'The amount of inertia / memory of past gradients. Typical values: $\\beta \\in [0.9, 0.99]$.',
      steps: [
        '$\\beta = 0$ recovers plain gradient descent.',
        '$\\beta$ close to $1$ means the velocity accumulates many past gradients — faster in narrow valleys.',
        'Too-large $\\beta$ can cause oscillation or overshoot.',
      ],
    },
    {
      prompt: 'Write the Adam update for parameter $x$ given gradient $g_k$ at step $k$.',
      answer: '$m_k = \\beta_1 m_{k-1} + (1-\\beta_1) g_k$; $v_k = \\beta_2 v_{k-1} + (1-\\beta_2) g_k^2$; bias-correct; $x_{k+1} = x_k - \\eta \\hat m_k / (\\sqrt{\\hat v_k} + \\epsilon)$.',
      steps: [
        '$m_k$ is an EMA of gradients (first moment); $v_k$ is an EMA of squared gradients (second moment).',
        'Bias correction: $\\hat m_k = m_k / (1 - \\beta_1^k)$, $\\hat v_k = v_k / (1 - \\beta_2^k)$.',
        'Per-coordinate adaptive step: divide by $\\sqrt{\\hat v_k}$ to normalize scale.',
        'Defaults: $\\beta_1 = 0.9$, $\\beta_2 = 0.999$, $\\epsilon = 10^{-8}$.',
      ],
    },
  ];

  var STATIC_GD_STANDARD = [
    {
      prompt: 'Minimize $f(x_1, x_2) = x_1^2 + 4 x_2^2$ starting at $(2, 1)$ with $\\eta = 0.1$. Give $x^{(1)}$ and $x^{(2)}$.',
      answer: '$x^{(1)} = (1.6, 0.2)$, $x^{(2)} = (1.28, 0.04)$.',
      steps: [
        '$\\nabla f = (2 x_1, 8 x_2)$. At $(2, 1)$: gradient $= (4, 8)$.',
        '$x^{(1)} = (2, 1) - 0.1 (4, 8) = (1.6, 0.2)$.',
        'At $(1.6, 0.2)$: gradient $= (3.2, 1.6)$.',
        '$x^{(2)} = (1.6, 0.2) - 0.1 (3.2, 1.6) = (1.28, 0.04)$.',
      ],
    },
    {
      prompt: 'For a strongly convex quadratic $f(x) = \\tfrac{1}{2} x^\\top A x - b^\\top x$ with $A \\succ 0$, the optimal constant step size for gradient descent is what?',
      answer: '$\\eta^\\star = \\dfrac{2}{\\lambda_{\\min}(A) + \\lambda_{\\max}(A)}$.',
      steps: [
        'Gradient descent on this problem: $x_{k+1} = (I - \\eta A) x_k + \\eta b$.',
        'Convergence rate depends on the spectral radius of $I - \\eta A$, which is $\\max(|1 - \\eta \\lambda_{\\min}|, |1 - \\eta \\lambda_{\\max}|)$.',
        'Balancing those two extremes gives the optimal $\\eta^\\star$.',
        'The resulting rate involves the condition number $\\kappa = \\lambda_{\\max} / \\lambda_{\\min}$: $(\\kappa - 1)/(\\kappa + 1)$ per step.',
      ],
    },
    {
      prompt: 'A portfolio manager minimizes risk $f(w) = w^\\top \\Sigma w$ subject to $\\mathbf{1}^\\top w = 1$ via projected gradient descent. Write one projected update step.',
      answer: '$w_{k+1} = \\Pi_{\\Delta}(w_k - \\eta \\cdot 2 \\Sigma w_k)$ where $\\Pi_\\Delta$ projects onto $\\{w : \\mathbf{1}^\\top w = 1\\}$.',
      steps: [
        'Gradient: $\\nabla f(w) = 2 \\Sigma w$.',
        'Take an unconstrained step: $\\tilde w = w_k - 2 \\eta \\Sigma w_k$.',
        'Project back onto the affine constraint: $\\Pi_\\Delta(\\tilde w) = \\tilde w - (\\mathbf{1}^\\top \\tilde w - 1) \\cdot \\mathbf{1}/n$.',
        'Signed projection since the subspace has codimension $1$.',
      ],
    },
    {
      prompt: 'Why is momentum empirically faster than vanilla GD in ill-conditioned problems?',
      answer: 'Momentum accumulates consistent gradient directions and averages out oscillations across narrow ravines, reducing the effective condition number.',
      steps: [
        'Ill-conditioned means some eigendirections have tiny curvature, others have large curvature.',
        'Vanilla GD bounces across high-curvature directions and crawls along low-curvature ones.',
        'Momentum damps the high-curvature oscillations (they cancel in the moving average) and accelerates the low-curvature drift.',
        'The rate improves from $(\\kappa - 1)/(\\kappa + 1)$ to $(\\sqrt\\kappa - 1)/(\\sqrt\\kappa + 1)$.',
      ],
    },
    {
      prompt: 'A supply-chain optimizer runs SGD on the sum of delivery-cost functions $f_i(x)$ over $N = 10^6$ routes. Each full gradient costs $1$ second. With mini-batches of size $100$, how many updates per second?',
      answer: 'About $10^4$ updates per second.',
      steps: [
        'A full batch costs $1$ s for $10^6$ examples, so one example costs $10^{-6}$ s of gradient work.',
        'A mini-batch of size $100$ costs $100 \\cdot 10^{-6} = 10^{-4}$ s.',
        'Updates per second: $1 / 10^{-4} = 10^4$.',
      ],
    },
    {
      prompt: 'Show that for a $L$-smooth function $f$ (gradient $L$-Lipschitz), gradient descent with $\\eta = 1/L$ satisfies $f(x_{k+1}) \\le f(x_k) - \\tfrac{1}{2L} \\|\\nabla f(x_k)\\|^2$.',
      answer: 'Descent lemma bound.',
      steps: [
        'By $L$-smoothness: $f(y) \\le f(x) + \\nabla f(x)^\\top (y - x) + \\tfrac{L}{2} \\|y - x\\|^2$.',
        'Substitute $y = x - (1/L) \\nabla f(x)$: $f(y) \\le f(x) - \\tfrac{1}{L} \\|\\nabla f(x)\\|^2 + \\tfrac{1}{2L} \\|\\nabla f(x)\\|^2$.',
        'Simplify: $f(y) \\le f(x) - \\tfrac{1}{2L} \\|\\nabla f(x)\\|^2$.',
        'This guarantees monotone decrease, with drop proportional to squared gradient norm.',
      ],
    },
  ];

  var STATIC_GD_CHALLENGE = [
    {
      prompt: 'For the control problem $\\min_u \\int_0^T (y(t) - y^\\star)^2 + \\lambda u(t)^2 \\, dt$ subject to linear dynamics $\\dot y = A y + B u$, what is the standard first-order optimization approach?',
      answer: 'Compute the gradient via the adjoint (costate) equation and take a gradient step in $u$.',
      steps: [
        'Form the Lagrangian with a costate $p(t)$ adjoint to the dynamics.',
        'The adjoint ODE $\\dot p = -A^\\top p - 2(y - y^\\star)$ runs backward in time.',
        'The gradient in control space is $\\partial_u \\mathcal{L} = 2 \\lambda u + B^\\top p$.',
        'Gradient descent: $u \\leftarrow u - \\eta (2 \\lambda u + B^\\top p)$. This is the backbone of trajectory optimization and model-based RL.',
      ],
    },
    {
      prompt: 'Show that SGD with step size $\\eta_k = 1/k$ converges in expectation on a strongly convex objective. Sketch the argument.',
      answer: 'Expected suboptimality shrinks as $O(1/k)$.',
      steps: [
        'Let $x^\\star$ be the optimum. Define $\\Delta_k = \\mathbb{E} \\|x_k - x^\\star\\|^2$.',
        'Expand $\\|x_{k+1} - x^\\star\\|^2 = \\|x_k - x^\\star\\|^2 - 2 \\eta_k \\langle g_k, x_k - x^\\star \\rangle + \\eta_k^2 \\|g_k\\|^2$.',
        'Take expectations, use unbiasedness $\\mathbb{E}[g_k] = \\nabla f(x_k)$ and $\\mu$-strong convexity.',
        'Recurrence $\\Delta_{k+1} \\le (1 - 2 \\mu \\eta_k) \\Delta_k + \\eta_k^2 G^2$ yields $\\Delta_k = O(1/k)$ with $\\eta_k = 1/k$.',
      ],
    },
    {
      prompt: 'An Adam-optimized neural net sometimes diverges when $\\beta_2$ is too small. Why?',
      answer: 'The running variance estimate $v_k$ becomes noisy and can shrink sharply between steps, causing $\\hat v_k$ to underestimate and the effective step $\\eta / \\sqrt{\\hat v_k}$ to blow up.',
      steps: [
        '$v_k$ is an EMA of $g_k^2$ with memory $1/(1 - \\beta_2)$.',
        'With $\\beta_2$ small (e.g. $0.9$), two consecutive rare large gradients can collapse $v_k$ on the next small-gradient step.',
        'Then $\\eta / \\sqrt{v_k}$ spikes, kicking parameters far off.',
        'The AMSGrad variant fixes this by replacing $v_k$ with a running maximum, which can only grow.',
      ],
    },
    {
      prompt: 'Prove that for convex $L$-smooth $f$, gradient descent with $\\eta = 1/L$ achieves $f(x_k) - f^\\star = O(1/k)$.',
      answer: 'Sublinear convergence at rate $O(1/k)$.',
      steps: [
        'From the descent lemma: $f(x_{k+1}) - f^\\star \\le f(x_k) - f^\\star - \\tfrac{1}{2L} \\|\\nabla f(x_k)\\|^2$.',
        'Convexity: $f(x_k) - f^\\star \\le \\nabla f(x_k)^\\top (x_k - x^\\star) \\le \\|\\nabla f(x_k)\\| \\|x_k - x^\\star\\|$.',
        'Combine to get a recursion on $\\delta_k = f(x_k) - f^\\star$: $\\delta_{k+1} \\le \\delta_k - \\delta_k^2 / (2 L R^2)$ where $R = \\|x_0 - x^\\star\\|$.',
        'Solving this recursion yields $\\delta_k \\le 2 L R^2 / k$.',
      ],
    },
    {
      prompt: 'In the design of a Butterworth filter, an engineer minimizes passband ripple over a bounded parameter domain via projected gradient. Why does the projection step matter even when the unconstrained minimum lies inside the domain?',
      answer: 'Because the trajectory of gradient descent can leave the feasible region even when both the start and the optimum lie inside it — without projection, iterates become non-physical.',
      steps: [
        'GD takes finite steps along straight lines in the direction of $-\\nabla f$.',
        'With non-convex objectives or large step sizes, intermediate iterates may exit the feasible cube.',
        'Projection ($\\Pi_C$) brings them back by clipping each coordinate to its bounds.',
        'This guarantees every iterate is a valid filter design, so the optimization stays physically meaningful.',
      ],
    },
  ];

  PS.registerTopic("opt-gd", {
    title: "Gradient descent family — GD, SGD, momentum, Adam",
    description: "Work through first-order optimization dynamics, step-size selection, and adaptive methods, with problems drawn from ML, control, and logistics.",
    warmup: STATIC_GD_WARMUP,
    standard: STATIC_GD_STANDARD,
    challenge: STATIC_GD_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: opt-constrained  (KKT conditions, Lagrangian duality)
  // ==========================================================================

  var STATIC_CONSTR_WARMUP = [
    {
      prompt: 'Write the Lagrangian for $\\min f(x)$ subject to $g_i(x) \\le 0$ and $h_j(x) = 0$.',
      answer: '$\\mathcal{L}(x, \\lambda, \\nu) = f(x) + \\sum_i \\lambda_i g_i(x) + \\sum_j \\nu_j h_j(x)$ with $\\lambda_i \\ge 0$.',
      steps: [
        'Inequality multipliers $\\lambda_i$ must be nonnegative (they "charge" violations).',
        'Equality multipliers $\\nu_j$ are unrestricted in sign.',
        'Original objective is a linear combination of the Lagrangian over the feasible region.',
      ],
    },
    {
      prompt: 'State the KKT conditions for a point $x^\\star$ to be optimal in a convex problem.',
      answer: 'Stationarity: $\\nabla f + \\sum_i \\lambda_i \\nabla g_i + \\sum_j \\nu_j \\nabla h_j = 0$; primal feasibility: $g_i \\le 0, h_j = 0$; dual feasibility: $\\lambda_i \\ge 0$; complementary slackness: $\\lambda_i g_i = 0$.',
      steps: [
        'KKT = Karush-Kuhn-Tucker — four conditions.',
        'For convex problems with a constraint qualification, KKT is necessary and sufficient for optimality.',
        'Complementary slackness says each $\\lambda_i$ is zero unless the corresponding constraint is active.',
      ],
    },
    {
      prompt: 'Minimize $f(x, y) = x^2 + y^2$ subject to $x + y = 1$. Use a Lagrange multiplier.',
      answer: '$(x^\\star, y^\\star) = (1/2, 1/2)$; $\\nu^\\star = -1$.',
      steps: [
        'Lagrangian: $\\mathcal{L} = x^2 + y^2 + \\nu(x + y - 1)$.',
        'Stationarity: $2x + \\nu = 0$, $2y + \\nu = 0$ $\\Rightarrow$ $x = y$.',
        'Feasibility: $x + y = 1$ $\\Rightarrow$ $x = y = 1/2$.',
        'Solve for $\\nu$: $2 \\cdot 1/2 + \\nu = 0 \\Rightarrow \\nu = -1$.',
      ],
    },
    {
      prompt: 'What does "strong duality" mean?',
      answer: 'The primal optimal value equals the dual optimal value: $p^\\star = d^\\star$.',
      steps: [
        'Weak duality ($d^\\star \\le p^\\star$) always holds.',
        'Strong duality means no gap.',
        'For convex problems satisfying a constraint qualification (e.g. Slater\'s condition), strong duality holds.',
      ],
    },
    {
      prompt: 'What is Slater\'s condition?',
      answer: 'There exists a strictly feasible point: some $x$ with $g_i(x) < 0$ (strictly) for all inequality constraints and $h_j(x) = 0$.',
      steps: [
        'Slater\'s condition is a standard constraint qualification for convex problems.',
        'It guarantees strong duality and existence of dual optimal multipliers.',
        'Intuition: the feasible set has a nonempty interior.',
      ],
    },
    {
      prompt: 'Define the dual function $g(\\lambda, \\nu) = \\inf_x \\mathcal{L}(x, \\lambda, \\nu)$. What property does $g$ always have?',
      answer: '$g$ is concave in $(\\lambda, \\nu)$, regardless of whether $f$ and the constraints are convex.',
      steps: [
        '$\\mathcal{L}(x, \\lambda, \\nu)$ is affine in $(\\lambda, \\nu)$ for each fixed $x$.',
        'Pointwise infimum of a family of affine functions is concave.',
        'So $g$ is always a concave function — the dual problem is always convex (after negation).',
      ],
    },
  ];

  var STATIC_CONSTR_STANDARD = [
    {
      prompt: 'A circuit designer maximizes power delivered to a load, $P = R_L I^2$ with $I = V/(R_S + R_L)$ and $V, R_S$ fixed. Find the optimal $R_L \\ge 0$ by calculus.',
      answer: '$R_L^\\star = R_S$ (maximum power transfer theorem).',
      steps: [
        '$P(R_L) = R_L V^2 / (R_S + R_L)^2$.',
        '$dP/dR_L = V^2 [(R_S + R_L)^2 - 2 R_L (R_S + R_L)] / (R_S + R_L)^4 = V^2 (R_S - R_L) / (R_S + R_L)^3$.',
        'Set to zero: $R_L = R_S$.',
        'Second-derivative check confirms a maximum.',
      ],
    },
    {
      prompt: 'Maximize the entropy $H(p) = -\\sum_i p_i \\log p_i$ subject to $\\sum_i p_i = 1$, $p_i \\ge 0$. Find $p^\\star$.',
      answer: '$p_i^\\star = 1/n$ (uniform distribution).',
      steps: [
        'Lagrangian: $\\mathcal{L} = -\\sum p_i \\log p_i + \\nu (\\sum p_i - 1) + \\sum \\mu_i (-p_i)$ with $\\mu_i \\ge 0$.',
        'Assuming all $p_i > 0$ at optimum, complementary slackness gives $\\mu_i = 0$.',
        'Stationarity: $-\\log p_i - 1 + \\nu = 0 \\Rightarrow p_i = e^{\\nu - 1}$ — the same for every $i$.',
        'Normalization forces $p_i = 1/n$.',
      ],
    },
    {
      prompt: 'A portfolio manager solves $\\min_w w^\\top \\Sigma w$ subject to $\\mathbf{1}^\\top w = 1$. Find $w^\\star$ in closed form.',
      answer: '$w^\\star = \\dfrac{\\Sigma^{-1} \\mathbf{1}}{\\mathbf{1}^\\top \\Sigma^{-1} \\mathbf{1}}$.',
      steps: [
        'Lagrangian: $\\mathcal{L}(w, \\nu) = w^\\top \\Sigma w + \\nu (1 - \\mathbf{1}^\\top w)$.',
        'Stationarity: $2 \\Sigma w - \\nu \\mathbf{1} = 0 \\Rightarrow w = (\\nu/2) \\Sigma^{-1} \\mathbf{1}$.',
        'Feasibility: $\\mathbf{1}^\\top w = 1 \\Rightarrow (\\nu/2) \\mathbf{1}^\\top \\Sigma^{-1} \\mathbf{1} = 1$.',
        'Substitute back to get the global minimum variance portfolio.',
      ],
    },
    {
      prompt: 'Given the SVM primal $\\min_{w,b} \\tfrac{1}{2} \\|w\\|^2$ s.t. $y_i (w^\\top x_i + b) \\ge 1$, sketch the derivation of the dual.',
      answer: '$\\max_\\alpha \\sum_i \\alpha_i - \\tfrac{1}{2} \\sum_{ij} \\alpha_i \\alpha_j y_i y_j x_i^\\top x_j$ subject to $\\alpha_i \\ge 0, \\sum_i \\alpha_i y_i = 0$.',
      steps: [
        'Lagrangian: $\\mathcal{L} = \\tfrac{1}{2} \\|w\\|^2 - \\sum_i \\alpha_i [y_i (w^\\top x_i + b) - 1]$.',
        'Stationarity in $w$: $w = \\sum_i \\alpha_i y_i x_i$. In $b$: $\\sum_i \\alpha_i y_i = 0$.',
        'Substitute back into $\\mathcal{L}$ to eliminate $w$ and $b$.',
        'The dual depends only on inner products $x_i^\\top x_j$ — this is where kernels enter.',
      ],
    },
    {
      prompt: 'A logistics company assigns $n$ trucks to routes to minimize $\\sum_i c_i u_i^2$ s.t. $\\sum_i u_i = Q$ (total shipment). Find $u_i^\\star$.',
      answer: '$u_i^\\star = \\dfrac{Q / c_i}{\\sum_j 1/c_j}$.',
      steps: [
        'Lagrangian: $\\sum c_i u_i^2 + \\nu (Q - \\sum u_i)$.',
        'Stationarity: $2 c_i u_i - \\nu = 0 \\Rightarrow u_i = \\nu / (2 c_i)$.',
        'Feasibility: $\\sum u_i = (\\nu/2) \\sum 1/c_i = Q \\Rightarrow \\nu = 2 Q / \\sum 1/c_j$.',
        'Substitute: $u_i^\\star \\propto 1/c_i$ — high-cost trucks get smaller loads.',
      ],
    },
    {
      prompt: 'For $\\min x^2$ subject to $x \\ge 1$, find the KKT point.',
      answer: '$x^\\star = 1$, $\\lambda^\\star = 2$.',
      steps: [
        'The inequality $x \\ge 1$ is $g(x) = 1 - x \\le 0$.',
        'Stationarity: $2x - \\lambda = 0 \\Rightarrow x = \\lambda / 2$.',
        'Try the constraint active: $x = 1$, then $\\lambda = 2 \\ge 0$ — dual feasible.',
        'Complementary slackness: $\\lambda (1 - x) = 2 \\cdot 0 = 0$. All KKT conditions hold.',
      ],
    },
  ];

  var STATIC_CONSTR_CHALLENGE = [
    {
      prompt: 'Derive the water-filling solution for $\\max_{p_i} \\sum_i \\log(1 + p_i / \\sigma_i^2)$ subject to $\\sum_i p_i = P$, $p_i \\ge 0$.',
      answer: '$p_i^\\star = \\max(0, \\; \\mu - \\sigma_i^2)$ where $\\mu$ is chosen so that $\\sum_i p_i^\\star = P$.',
      steps: [
        'Lagrangian: $\\sum_i \\log(1 + p_i/\\sigma_i^2) + \\nu (P - \\sum p_i) + \\sum \\mu_i p_i$.',
        'KKT: $\\tfrac{1/\\sigma_i^2}{1 + p_i/\\sigma_i^2} - \\nu + \\mu_i = 0$, with $\\mu_i \\ge 0$, $\\mu_i p_i = 0$.',
        'If constraint inactive ($p_i > 0$): $\\mu_i = 0 \\Rightarrow p_i + \\sigma_i^2 = 1/\\nu \\Rightarrow p_i = 1/\\nu - \\sigma_i^2$.',
        'Combining: $p_i = \\max(0, 1/\\nu - \\sigma_i^2)$. Set $\\mu = 1/\\nu$ and tune $\\mu$ to match the total power budget.',
        'This is the capacity-achieving allocation for a set of parallel Gaussian channels — fundamental in information theory and wireless.',
      ],
    },
    {
      prompt: 'Consider the LP $\\min c^\\top x$ s.t. $Ax \\le b$. Write the dual problem.',
      answer: '$\\max -b^\\top \\lambda$ s.t. $A^\\top \\lambda + c = 0$, $\\lambda \\ge 0$.',
      steps: [
        'Lagrangian: $\\mathcal{L} = c^\\top x + \\lambda^\\top (Ax - b) = (c + A^\\top \\lambda)^\\top x - b^\\top \\lambda$.',
        'Dual function: $g(\\lambda) = \\inf_x \\mathcal{L}$; this is $-\\infty$ unless $c + A^\\top \\lambda = 0$.',
        'Dual: $\\max_{\\lambda \\ge 0} -b^\\top \\lambda$ s.t. $A^\\top \\lambda = -c$.',
        'Equivalently $\\max b^\\top y$ s.t. $A^\\top y \\le c, y \\ge 0$ after sign flips — the standard LP dual.',
      ],
    },
    {
      prompt: 'A physicist minimizes $E = \\tfrac{1}{2} k (r - r_0)^2$ subject to $\\|r\\| \\le R$ (a particle confined to a ball). Find the minimizer.',
      answer: '$r^\\star = r_0$ if $\\|r_0\\| \\le R$; otherwise $r^\\star = R \\cdot r_0 / \\|r_0\\|$.',
      steps: [
        'Unconstrained minimum is at $r_0$ with energy zero. If it is already feasible, done.',
        'Otherwise, the constraint is active; $g(r) = \\|r\\|^2 - R^2 = 0$.',
        'Lagrangian gradient: $k(r - r_0) + 2 \\lambda r = 0 \\Rightarrow r = k r_0 / (k + 2 \\lambda)$.',
        'So $r^\\star$ is parallel to $r_0$; $\\|r^\\star\\| = R$ gives the final answer.',
      ],
    },
    {
      prompt: 'In Lagrangian duality with strong duality, give the interpretation of the optimal dual multiplier $\\lambda_i^\\star$ for constraint $g_i(x) \\le 0$.',
      answer: '$\\lambda_i^\\star = -\\partial p^\\star / \\partial b_i$ where $b_i$ is a right-hand-side perturbation.',
      steps: [
        'Consider the perturbed problem $\\min f(x)$ s.t. $g_i(x) \\le b_i$.',
        'The optimal primal value $p^\\star(b)$ is a function of the perturbation.',
        '$\\lambda_i^\\star$ equals the negative derivative of $p^\\star$ with respect to $b_i$ at $b = 0$.',
        'Economic reading: $\\lambda_i^\\star$ is the "shadow price" of relaxing the $i$-th constraint by one unit.',
      ],
    },
    {
      prompt: 'A chemical engineer maximizes product yield $f(x, y) = xy$ subject to $x + 2y \\le 10$, $x, y \\ge 0$. Solve.',
      answer: '$(x^\\star, y^\\star) = (5, 2.5)$, $f^\\star = 12.5$.',
      steps: [
        'At the optimum the budget constraint must bind (otherwise scale up $x$ or $y$).',
        'With $x + 2y = 10$: maximize $x (10 - x)/2$ over $x \\in [0, 10]$.',
        'Derivative: $(10 - 2x)/2 = 0 \\Rightarrow x = 5$, $y = 2.5$.',
        'KKT: stationarity $(y, x) = \\lambda (1, 2)$ gives $\\lambda = 2.5$ — consistent with the shadow-price interpretation.',
      ],
    },
  ];

  PS.registerTopic("opt-constrained", {
    title: "Constrained optimization — KKT and duality",
    description: "Solve Lagrangian problems, derive KKT conditions, and interpret dual variables in engineering, finance, and information-theoretic settings.",
    warmup: STATIC_CONSTR_WARMUP,
    standard: STATIC_CONSTR_STANDARD,
    challenge: STATIC_CONSTR_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: opt-lp  (Linear programming and the simplex method)
  // ==========================================================================

  var STATIC_LP_WARMUP = [
    {
      prompt: 'Write an LP in standard form.',
      answer: '$\\min c^\\top x$ s.t. $Ax = b$, $x \\ge 0$.',
      steps: [
        'Variables are nonnegative.',
        'Constraints are equalities (introduce slack variables as needed).',
        'Objective is linear.',
      ],
    },
    {
      prompt: 'Convert the constraint $3 x_1 + 4 x_2 \\le 12$ to standard form.',
      answer: '$3 x_1 + 4 x_2 + s = 12$, $s \\ge 0$.',
      steps: [
        'Add a nonnegative slack variable $s$.',
        'The inequality becomes an equality plus the bound $s \\ge 0$.',
      ],
    },
    {
      prompt: 'What is a basic feasible solution (BFS) of an LP?',
      answer: 'A solution where $m$ variables (the "basic" set) are free and the remaining $n - m$ (non-basic) are fixed at $0$, subject to feasibility.',
      steps: [
        'If $Ax = b$ has $m$ constraints, pick $m$ columns of $A$ forming an invertible basis $B$.',
        'Set non-basic variables to zero and solve $B x_B = b$.',
        'The solution is a BFS iff $x_B \\ge 0$.',
      ],
    },
    {
      prompt: 'Where do LP optima lie geometrically?',
      answer: 'At a vertex (extreme point) of the feasible polytope, assuming a finite optimum exists.',
      steps: [
        'The feasible set of an LP is a polyhedron.',
        'A linear objective is optimized at an extreme point.',
        'If the optimum is achieved along a whole edge or face, every vertex on that face is also optimal.',
      ],
    },
    {
      prompt: 'Maximize $x + y$ subject to $x + 2y \\le 4$, $2x + y \\le 4$, $x, y \\ge 0$. Find the optimum geometrically.',
      answer: '$(x^\\star, y^\\star) = (4/3, 4/3)$, objective $= 8/3$.',
      steps: [
        'Corners of the feasible region: $(0,0), (2,0), (0,2), (4/3, 4/3)$.',
        'Evaluate objective at each: $0, 2, 2, 8/3$.',
        'Maximum occurs at $(4/3, 4/3)$ where both constraints bind.',
      ],
    },
    {
      prompt: 'What does the simplex method do, in one sentence?',
      answer: 'It walks from vertex to adjacent vertex of the feasible polytope, always improving (or staying flat on) the objective, until no improving move exists.',
      steps: [
        'Start at a basic feasible solution.',
        'Pick a non-basic variable with negative reduced cost to enter the basis.',
        'Use the ratio test to pick which basic variable leaves.',
        'Repeat until all reduced costs are $\\ge 0$.',
      ],
    },
  ];

  var STATIC_LP_STANDARD = [
    {
      prompt: 'A factory makes two products. Each unit of A yields profit $3$ and uses $1$ hour labor, $2$ units of material. Each unit of B yields profit $5$ and uses $3$ hours labor, $1$ unit of material. Labor is $12$ hours, material is $10$ units. Write the LP.',
      answer: '$\\max 3 x_A + 5 x_B$ s.t. $x_A + 3 x_B \\le 12$, $2 x_A + x_B \\le 10$, $x_A, x_B \\ge 0$.',
      steps: [
        'Decision variables: units of each product.',
        'Objective: total profit.',
        'Constraints: labor and material budgets plus nonnegativity.',
      ],
    },
    {
      prompt: 'Solve the factory LP from the previous problem geometrically.',
      answer: '$(x_A, x_B) = (18/5, 14/5)$, profit $= 124/5 = 24.8$.',
      steps: [
        'Feasible vertices: $(0,0), (5,0), (0,4), (18/5, 14/5)$.',
        'Profit at each: $0, 15, 20, 3(18/5) + 5(14/5) = 54/5 + 70/5 = 124/5$.',
        'Maximum is at the intersection of both binding constraints.',
      ],
    },
    {
      prompt: 'For the transportation problem — $m$ sources with supplies $s_i$, $n$ sinks with demands $d_j$, shipping cost $c_{ij}$ — write the LP.',
      answer: '$\\min \\sum_{ij} c_{ij} x_{ij}$ s.t. $\\sum_j x_{ij} = s_i$, $\\sum_i x_{ij} = d_j$, $x_{ij} \\ge 0$.',
      steps: [
        'Variables: flow on each source-sink edge.',
        'Row constraints: supply $i$ is fully used.',
        'Column constraints: demand $j$ is fully met.',
        'Total-unimodularity of the constraint matrix means there is always an optimal integer solution.',
      ],
    },
    {
      prompt: 'State the LP duality theorem.',
      answer: 'If the primal has a finite optimum then so does the dual, and the optimal values are equal. If one is unbounded, the other is infeasible.',
      steps: [
        'Every primal LP has a dual LP with the same data transposed.',
        'Weak duality: primal value $\\ge$ dual value for any feasible pair.',
        'Strong duality: they match at the optimum (no gap).',
        'Complementary slackness couples primal and dual solutions.',
      ],
    },
    {
      prompt: 'A diet problem minimizes food cost subject to minimum daily nutrient requirements. Sketch the dual LP and its economic meaning.',
      answer: 'The dual maximizes the "shadow prices" of the nutrients subject to the constraint that each food\'s imputed value (sum of nutrient shadow prices weighted by content) is at most its cost.',
      steps: [
        'Primal: $\\min c^\\top x$ s.t. $A x \\ge b$, $x \\ge 0$.',
        'Dual: $\\max b^\\top y$ s.t. $A^\\top y \\le c$, $y \\ge 0$.',
        '$y_i$ is the implicit market price you would be willing to pay per unit of nutrient $i$.',
        'At optimum, each actually-consumed food has imputed value exactly equal to its cost — a no-arbitrage condition.',
      ],
    },
    {
      prompt: 'Perform one pivot of the simplex method on $\\max z = 3 x_1 + 2 x_2$ s.t. $x_1 + x_2 \\le 4$, $x_1 + 3 x_2 \\le 6$, $x \\ge 0$, starting from the all-slack basis.',
      answer: '$x_1$ enters, $s_1$ (the slack of the first constraint) leaves; new BFS is $x_1 = 4, x_2 = 0, s_1 = 0, s_2 = 2$, $z = 12$.',
      steps: [
        'Reduced costs: $\\bar c_1 = 3, \\bar c_2 = 2$ (both positive, so current basis is not optimal for maximization).',
        'Pick the most-positive reduced cost: $x_1$ enters.',
        'Ratio test: $4/1 = 4$ vs $6/1 = 6$; min is on row $1$, so $s_1$ leaves.',
        'Pivot: substitute $x_1 = 4 - x_2 - s_1$. New $z = 12 - x_2 - 3 s_1$ plus corrections; objective rises to $12$.',
      ],
    },
  ];

  var STATIC_LP_CHALLENGE = [
    {
      prompt: 'Why can the simplex method, in the worst case, visit exponentially many vertices? Name the classic example.',
      answer: 'The Klee-Minty cube: an LP on the unit cube with a perturbed objective where simplex with Dantzig\'s rule visits all $2^n$ vertices.',
      steps: [
        'Klee and Minty (1972) constructed a family of $n$-dimensional LPs.',
        'The feasible region is a distorted cube with $2^n$ vertices.',
        'With the largest-reduced-cost pivot rule, simplex traverses all of them.',
        'Despite this, simplex is fast in practice and on random inputs (smoothed-analysis result of Spielman and Teng, 2001).',
      ],
    },
    {
      prompt: 'Which polynomial-time algorithms for LP do we know, and roughly what is their complexity?',
      answer: 'Khachiyan\'s ellipsoid method ($O(n^6 L)$ bit-operations) and Karmarkar\'s interior-point method ($O(n^{3.5} L)$), plus modern primal-dual interior-point variants.',
      steps: [
        'Khachiyan (1979): first proof that LP is in P, via the ellipsoid method.',
        'Karmarkar (1984): first practical polynomial interior-point algorithm.',
        'Modern LP solvers use primal-dual interior-point methods or active-set/simplex, often hybrid.',
        'Smale\'s 9th problem asks whether LP can be solved in strongly polynomial time — still open.',
      ],
    },
    {
      prompt: 'A logistics company wants to route trucks over a capacitated network to minimize cost. Formulate as an LP.',
      answer: 'Min-cost flow LP: $\\min \\sum_{(i,j)} c_{ij} x_{ij}$ s.t. $\\sum_j x_{ij} - \\sum_j x_{ji} = b_i$ (flow conservation), $0 \\le x_{ij} \\le u_{ij}$.',
      steps: [
        'Variables: flow on each edge.',
        'Constraints: conservation at each node with supply/demand $b_i$, and edge capacity $u_{ij}$.',
        'Objective: linear edge cost.',
        'Totally unimodular constraint matrix guarantees integer solutions when $b_i$ and $u_{ij}$ are integers.',
      ],
    },
    {
      prompt: 'In portfolio optimization, a trader wants to maximize expected return subject to a linear risk constraint and position limits. Write the LP.',
      answer: '$\\max \\mu^\\top w$ s.t. $\\sum_i \\beta_i w_i \\le B$ (risk budget), $0 \\le w_i \\le u_i$, $\\mathbf{1}^\\top w = 1$.',
      steps: [
        'Linear expected-return objective.',
        'Linear risk-budget constraint using factor betas.',
        'Box constraints on individual positions.',
        'LP is used when risk is modeled linearly; mean-variance moves this to a QP.',
      ],
    },
    {
      prompt: 'The energy-grid dispatch problem: $\\min \\sum_g c_g p_g$ over generators $g$, subject to $\\sum_g p_g = D$ (meet demand $D$) and $0 \\le p_g \\le p_g^{\\max}$. How is it solved at scale, and what is the economic interpretation of the dual?',
      answer: 'Solved as an LP (typically with simplex or an interior-point method). The dual variable on the demand constraint is the locational marginal price (LMP) of electricity.',
      steps: [
        'Stack generators by marginal cost (merit order).',
        'Bring them online in order until supply meets demand.',
        'The marginal cost of the last generator dispatched sets the LMP — the shadow price of the demand constraint.',
        'This is the backbone of wholesale electricity markets.',
      ],
    },
  ];

  PS.registerTopic("opt-lp", {
    title: "Linear programming and the simplex method",
    description: "LP modeling, geometric intuition, simplex pivots, and duality — with examples from manufacturing, logistics, finance, and energy markets.",
    warmup: STATIC_LP_WARMUP,
    standard: STATIC_LP_STANDARD,
    challenge: STATIC_LP_CHALLENGE,
  });

})();
