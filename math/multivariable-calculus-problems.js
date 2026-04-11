/*
 * LearningHub - Multivariable Calculus Problem Set
 * Registers 4 topics with LearningHubProblemSet runtime.
 * Topics:
 *   mvcalc-partials-gradients   - partial derivatives and gradients
 *   mvcalc-chain-directional    - chain rule and directional derivatives
 *   mvcalc-multiple-integrals   - double/triple integrals, change of variables
 *   mvcalc-optimization         - Lagrange multipliers, Hessians, critical points
 */
(function () {
  "use strict";

  // Wait for the shared runtime (which also loads with `defer`) before registering.
  function whenReady(fn) {
    if (window.LearningHubProblemSet) { fn(window.LearningHubProblemSet); return; }
    var waited = 0;
    var iv = setInterval(function () {
      waited += 50;
      if (window.LearningHubProblemSet) {
        clearInterval(iv);
        fn(window.LearningHubProblemSet);
      } else if (waited > 8000) {
        clearInterval(iv);
        console.error("[multivariable-calculus-problems] LearningHubProblemSet never loaded");
      }
    }, 50);
  }

  whenReady(function (PS) {

  // =====================================================================
  // TOPIC 1: mvcalc-partials-gradients
  // =====================================================================
  var BANK_PARTIALS_WARMUP = [
    {
      prompt: 'Compute $\\dfrac{\\partial f}{\\partial x}$ and $\\dfrac{\\partial f}{\\partial y}$ for $f(x,y) = 3x^2 y - 5xy^3 + 7$.',
      answer: '$f_x = 6xy - 5y^3$, $f_y = 3x^2 - 15xy^2$.',
      steps: [
        'Treat $y$ as a constant when differentiating with respect to $x$: $\\partial_x(3x^2 y) = 6xy$, $\\partial_x(-5xy^3) = -5y^3$, $\\partial_x(7) = 0$.',
        'So $f_x = 6xy - 5y^3$.',
        'Now treat $x$ as a constant: $\\partial_y(3x^2 y) = 3x^2$, $\\partial_y(-5xy^3) = -15xy^2$, $\\partial_y(7) = 0$.',
        'So $f_y = 3x^2 - 15xy^2$.',
      ],
    },
    {
      prompt: 'For $f(x,y) = e^{xy}$, compute the gradient $\\nabla f$.',
      answer: '$\\nabla f = (y e^{xy},\\ x e^{xy})$.',
      steps: [
        '$\\partial_x e^{xy} = y e^{xy}$ (chain rule, $y$ is constant).',
        '$\\partial_y e^{xy} = x e^{xy}$.',
        'Stack into a vector: $\\nabla f = (y e^{xy}, x e^{xy})$.',
      ],
    },
    {
      prompt: 'Evaluate $\\nabla f$ at $(1, 2)$ for $f(x,y) = x^2 + 3y^2$.',
      answer: '$\\nabla f(1, 2) = (2, 12)$.',
      steps: [
        '$f_x = 2x$, $f_y = 6y$.',
        'Plug in $(1, 2)$: $f_x(1,2) = 2$, $f_y(1,2) = 12$.',
        'So $\\nabla f(1, 2) = (2, 12)$.',
      ],
    },
    {
      prompt: 'Find all first partials of $g(x, y, z) = x \\sin(y) + z^2$.',
      answer: '$g_x = \\sin(y)$, $g_y = x\\cos(y)$, $g_z = 2z$.',
      steps: [
        'With respect to $x$: only $x\\sin(y)$ depends on $x$, giving $\\sin(y)$.',
        'With respect to $y$: $\\partial_y(x\\sin y) = x\\cos y$; the $z^2$ contributes nothing.',
        'With respect to $z$: only $z^2$ depends on $z$, giving $2z$.',
      ],
    },
    {
      prompt: 'Biology: a bacterial growth rate is modelled as $r(T, C) = 0.1\\,T C$, where $T$ is temperature in $^\\circ$C and $C$ is nutrient concentration. What is $\\partial r / \\partial T$ at $(T,C) = (30, 5)$, and what does it mean?',
      answer: '$\\partial_T r = 0.1 C$, so at $(30, 5)$ the value is $0.5$ per $^\\circ$C.',
      steps: [
        '$\\partial_T (0.1 T C) = 0.1 C$ (treat $C$ as a constant).',
        'Plug in $C = 5$: $0.1 \\cdot 5 = 0.5$.',
        'Interpretation: at a nutrient concentration of $5$, raising the temperature by $1^\\circ$C increases the growth rate by about $0.5$ units — holding nutrients fixed.',
      ],
    },
    {
      prompt: 'Find $f_x$ and $f_y$ for $f(x,y) = \\ln(x^2 + y^2)$.',
      answer: '$f_x = \\dfrac{2x}{x^2+y^2}$, $f_y = \\dfrac{2y}{x^2+y^2}$.',
      steps: [
        'By the chain rule, $\\partial_x \\ln u = u_x/u$ with $u = x^2+y^2$.',
        '$u_x = 2x$, so $f_x = 2x/(x^2+y^2)$.',
        'Symmetrically, $u_y = 2y$, so $f_y = 2y/(x^2+y^2)$.',
      ],
    },
    {
      prompt: 'Economics: a Cobb-Douglas production function is $Q(K, L) = K^{0.3} L^{0.7}$, with $K$ capital and $L$ labor. Find the marginal product of labor, $\\partial Q/\\partial L$.',
      answer: '$\\partial Q/\\partial L = 0.7\\, K^{0.3} L^{-0.3}$.',
      steps: [
        'Treat $K$ as a constant. Power rule on $L$: $\\partial_L L^{0.7} = 0.7 L^{-0.3}$.',
        'So $\\partial Q/\\partial L = 0.7 K^{0.3} L^{-0.3}$.',
        'This is the classic "marginal product of labor": add one unit of labor, output rises by about this much, holding capital fixed.',
      ],
    },
  ];

  var BANK_PARTIALS_STANDARD = [
    {
      prompt: 'Find all second partials (including mixed) of $f(x,y) = x^3 y + x y^2$ and verify Clairaut\'s theorem.',
      answer: '$f_{xx} = 6xy$, $f_{yy} = 2x$, $f_{xy} = f_{yx} = 3x^2 + 2y$.',
      steps: [
        'First partials: $f_x = 3x^2 y + y^2$, $f_y = x^3 + 2xy$.',
        'Differentiate $f_x$ w.r.t. $x$: $f_{xx} = 6xy$.',
        'Differentiate $f_x$ w.r.t. $y$: $f_{xy} = 3x^2 + 2y$.',
        'Differentiate $f_y$ w.r.t. $x$: $f_{yx} = 3x^2 + 2y$. Matches $f_{xy}$ (Clairaut).',
        'Differentiate $f_y$ w.r.t. $y$: $f_{yy} = 2x$.',
      ],
    },
    {
      prompt: 'The heat equation in 1D is $\\partial_t u = \\alpha\\,\\partial_{xx} u$. Check whether $u(x, t) = e^{-\\alpha t}\\sin(x)$ is a solution.',
      answer: 'Yes, it satisfies the heat equation.',
      steps: [
        'Compute $\\partial_t u = -\\alpha e^{-\\alpha t}\\sin(x)$.',
        'Compute $\\partial_x u = e^{-\\alpha t}\\cos(x)$, then $\\partial_{xx} u = -e^{-\\alpha t}\\sin(x)$.',
        'So $\\alpha \\partial_{xx} u = -\\alpha e^{-\\alpha t}\\sin(x)$, which equals $\\partial_t u$. $\\checkmark$',
      ],
    },
    {
      prompt: 'For $f(x, y) = \\sqrt{x^2 + y^2}$, compute $\\nabla f$ and describe its geometric meaning.',
      answer: '$\\nabla f = \\dfrac{(x, y)}{\\sqrt{x^2+y^2}}$; it is the unit radial vector pointing outward.',
      steps: [
        'Write $f = (x^2+y^2)^{1/2}$. By the chain rule, $f_x = \\tfrac12 (x^2+y^2)^{-1/2}\\cdot 2x = x/\\sqrt{x^2+y^2}$.',
        'Similarly $f_y = y/\\sqrt{x^2+y^2}$.',
        'So $\\nabla f = (x,y)/\\|(x,y)\\|$, which is the unit vector pointing radially outward from the origin.',
        'Interpretation: $f$ is the distance from the origin, and the gradient of distance points away from the origin.',
      ],
    },
    {
      prompt: 'A physicist models a potential energy surface as $U(x,y) = x^2 + 2y^2 - xy$. Find $\\nabla U$ and the force $\\mathbf{F} = -\\nabla U$ at $(1, 1)$.',
      answer: '$\\nabla U(1,1) = (1, 3)$, so $\\mathbf{F}(1,1) = (-1, -3)$.',
      steps: [
        '$U_x = 2x - y$, so $U_x(1,1) = 2 - 1 = 1$.',
        '$U_y = 4y - x$, so $U_y(1,1) = 4 - 1 = 3$.',
        '$\\nabla U(1,1) = (1, 3)$.',
        'Force is the negative gradient of potential: $\\mathbf{F} = -\\nabla U = (-1, -3)$.',
      ],
    },
    {
      prompt: 'Engineering: the stress in a thin plate is $\\sigma(x,y) = 100 - x^2 - 3y^2$ (MPa). Which way does stress decrease fastest at the point $(2, 1)$, and what is the rate?',
      answer: 'It decreases fastest in the direction $-\\nabla\\sigma/\\|\\nabla\\sigma\\|$. At $(2,1)$: $\\nabla\\sigma = (-4, -6)$, so the fastest-decrease direction is $(4, 6)/\\sqrt{52} \\approx (0.555, 0.832)$ and the rate is $-\\|\\nabla\\sigma\\| = -\\sqrt{52} \\approx -7.21$ MPa per unit length.',
      steps: [
        '$\\sigma_x = -2x$, $\\sigma_y = -6y$. At $(2,1)$: $\\nabla\\sigma = (-4, -6)$.',
        'Stress increases fastest in direction $\\nabla\\sigma$, so it decreases fastest in direction $-\\nabla\\sigma = (4, 6)$.',
        'Normalize: $\\|(4, 6)\\| = \\sqrt{16+36} = \\sqrt{52}$.',
        'Rate of fastest decrease is $-\\|\\nabla\\sigma\\| = -\\sqrt{52} \\approx -7.21$ MPa per unit length.',
      ],
    },
    {
      prompt: 'For $f(x, y) = x^2 e^{y}$, find the tangent plane at $(1, 0, 1)$.',
      answer: '$z = 1 + 2(x-1) + 1\\cdot y$, i.e. $z = 2x + y - 1$.',
      steps: [
        '$f_x = 2x e^y$, $f_y = x^2 e^y$.',
        'At $(1, 0)$: $f(1,0) = 1$, $f_x = 2$, $f_y = 1$.',
        'Tangent plane: $z = f(a,b) + f_x(a,b)(x-a) + f_y(a,b)(y-b)$.',
        'Substitute: $z = 1 + 2(x-1) + 1\\cdot(y - 0) = 2x + y - 1$.',
      ],
    },
    {
      prompt: 'Clinical trials: a drug\'s estimated effect is $E(d, t) = 0.5 d + 0.2 d t - 0.05 t^2$, where $d$ is dose (mg) and $t$ is time (hours). At $(d, t) = (20, 4)$, what is $\\partial E/\\partial d$, and how would you interpret it?',
      answer: '$\\partial_d E = 0.5 + 0.2 t$. At $t=4$ this equals $1.3$ units of effect per mg.',
      steps: [
        '$\\partial_d (0.5 d) = 0.5$, $\\partial_d (0.2 d t) = 0.2 t$, $\\partial_d(-0.05 t^2) = 0$.',
        'So $E_d = 0.5 + 0.2 t$.',
        'At $t = 4$: $0.5 + 0.8 = 1.3$.',
        'Interpretation: at $t=4$ hours, every extra milligram of dose adds about $1.3$ units of effect, given the current time.',
      ],
    },
    {
      prompt: 'ML: compute the gradient of the squared-error loss $L(w_1, w_2) = (w_1 + 2 w_2 - 3)^2$ with respect to $(w_1, w_2)$.',
      answer: '$\\nabla L = 2(w_1 + 2 w_2 - 3)\\,(1, 2)$.',
      steps: [
        'Let $r = w_1 + 2 w_2 - 3$, so $L = r^2$.',
        'Chain rule: $\\partial L/\\partial w_1 = 2 r \\cdot \\partial_{w_1} r = 2 r \\cdot 1$.',
        '$\\partial L/\\partial w_2 = 2 r \\cdot 2 = 4 r$.',
        'So $\\nabla L = (2 r, 4 r) = 2 r \\cdot (1, 2)$ with $r = w_1 + 2w_2 - 3$. This is why gradient descent moves the weights proportional to the input vector.',
      ],
    },
  ];

  PS.registerTopic("mvcalc-partials-gradients", {
    title: "Partial derivatives and gradients",
    description: "Compute first and second partials, build gradients, and read off directions of steepest ascent.",
    warmup:   BANK_PARTIALS_WARMUP,
    standard: BANK_PARTIALS_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 2: mvcalc-chain-directional
  // =====================================================================
  var BANK_CHAIN_WARMUP = [
    {
      prompt: 'If $f(x, y) = x^2 + y^2$ with $x = \\cos t$, $y = \\sin t$, use the chain rule to find $df/dt$.',
      answer: '$df/dt = 0$.',
      steps: [
        '$\\partial f/\\partial x = 2x$, $\\partial f/\\partial y = 2y$.',
        '$dx/dt = -\\sin t$, $dy/dt = \\cos t$.',
        '$df/dt = 2x(-\\sin t) + 2y(\\cos t) = -2\\cos t\\sin t + 2\\sin t\\cos t = 0$.',
        'This makes sense: on the unit circle $f = 1$ is constant.',
      ],
    },
    {
      prompt: 'Compute the directional derivative of $f(x,y) = x^2 y$ at $(1, 2)$ in the direction of $\\mathbf{v} = (3, 4)$.',
      answer: '$D_{\\hat{\\mathbf{v}}} f(1,2) = 4/5 + 4/5 = 8/5 = 1.6$. Wait — recompute: $(12 + 4)/5 = 16/5 = 3.2$.',
      steps: [
        '$\\nabla f = (2xy,\\ x^2)$. At $(1,2)$: $\\nabla f = (4, 1)$.',
        'Normalize $\\mathbf{v} = (3, 4)$: $\\|\\mathbf{v}\\| = 5$, so $\\hat{\\mathbf{v}} = (3/5, 4/5)$.',
        '$D_{\\hat{\\mathbf{v}}} f = \\nabla f \\cdot \\hat{\\mathbf{v}} = 4(3/5) + 1(4/5) = 12/5 + 4/5 = 16/5 = 3.2$.',
      ],
    },
    {
      prompt: 'At the point $(2, -1)$ for $f(x, y) = 3x - 2y$, in which unit direction does $f$ increase fastest, and what is that rate?',
      answer: 'Direction $(3, -2)/\\sqrt{13}$; rate $\\sqrt{13}$.',
      steps: [
        '$\\nabla f = (3, -2)$ everywhere.',
        'Fastest-ascent direction is $\\nabla f / \\|\\nabla f\\|$.',
        '$\\|(3,-2)\\| = \\sqrt{9+4} = \\sqrt{13}$, so the direction is $(3,-2)/\\sqrt{13}$.',
        'The maximum rate equals $\\|\\nabla f\\| = \\sqrt{13}$.',
      ],
    },
    {
      prompt: 'If $z = f(u, v)$ with $u = x + y$ and $v = xy$, write $\\partial z/\\partial x$ in terms of $f_u$ and $f_v$.',
      answer: '$\\dfrac{\\partial z}{\\partial x} = f_u + y\\,f_v$.',
      steps: [
        'Chain rule: $\\partial z/\\partial x = f_u (\\partial u/\\partial x) + f_v (\\partial v/\\partial x)$.',
        '$\\partial u/\\partial x = 1$, $\\partial v/\\partial x = y$.',
        'So $\\partial z/\\partial x = f_u \\cdot 1 + f_v \\cdot y = f_u + y f_v$.',
      ],
    },
    {
      prompt: 'A hiker stands on a hill described by $h(x,y) = 200 - x^2 - y^2$ at the point $(3, 4)$. Is the direction $(1, 0)$ (east) uphill or downhill, and at what rate?',
      answer: 'Downhill, at rate $-6$ units of height per unit east.',
      steps: [
        '$\\nabla h = (-2x, -2y)$; at $(3,4)$ this is $(-6, -8)$.',
        'The direction $(1, 0)$ is already a unit vector.',
        '$D_{(1,0)} h = \\nabla h \\cdot (1, 0) = -6$.',
        'Negative: moving east, you drop at a rate of $6$ units of height per unit of ground distance.',
      ],
    },
    {
      prompt: 'Physics: temperature at a point is $T(x,y,z) = 100 - x^2 - 2y^2 - 3z^2$. At the point $(1, 1, 1)$, in which unit direction does temperature drop fastest?',
      answer: 'Direction $-\\nabla T/\\|\\nabla T\\| = (2, 4, 6)/\\sqrt{56}$.',
      steps: [
        '$\\nabla T = (-2x, -4y, -6z)$. At $(1,1,1)$: $(-2, -4, -6)$.',
        'Steepest-decrease direction is $-\\nabla T = (2, 4, 6)$.',
        'Normalize: $\\|(2,4,6)\\| = \\sqrt{56} = 2\\sqrt{14}$.',
        'Direction: $(1, 2, 3)/\\sqrt{14}$.',
      ],
    },
  ];

  var BANK_CHAIN_STANDARD = [
    {
      prompt: 'The temperature along a rocket\'s path is $T(x, y) = xy$. The rocket follows $x(t) = t^2$, $y(t) = 2t + 1$. Find $dT/dt$ when $t = 1$.',
      answer: '$dT/dt\\big|_{t=1} = 7$.',
      steps: [
        '$T_x = y$, $T_y = x$.',
        '$dx/dt = 2t$, $dy/dt = 2$.',
        '$dT/dt = T_x\\, x\'(t) + T_y\\, y\'(t) = y(2t) + x(2) = 2ty + 2x$.',
        'At $t=1$: $x = 1$, $y = 3$. So $dT/dt = 2(1)(3) + 2(1) = 6 + 2 = 8$. Wait, re-check: $2ty + 2x = 2(1)(3) + 2(1) = 8$.',
        'Corrected answer: $dT/dt|_{t=1} = 8$.',
      ],
    },
    {
      prompt: 'For $f(x, y) = \\ln(x^2 + y^2)$, find the directional derivative at $(3, 4)$ in the direction of $(1, 2)$.',
      answer: '$D_{\\hat{\\mathbf{u}}} f(3,4) = \\dfrac{22}{25\\sqrt{5}}$.',
      steps: [
        '$\\nabla f = \\dfrac{(2x, 2y)}{x^2+y^2}$. At $(3,4)$: $(6, 8)/25$.',
        'Unit direction: $\\hat{\\mathbf{u}} = (1, 2)/\\sqrt{5}$.',
        'Dot product: $(6\\cdot 1 + 8\\cdot 2)/(25\\sqrt 5) = 22/(25\\sqrt 5)$.',
      ],
    },
    {
      prompt: 'A particle in a plane has position $(x(t), y(t))$ and feels the potential $U(x, y) = x^2 + y^2$. Using the chain rule, show that $dU/dt = 2(x\\dot x + y\\dot y)$.',
      answer: '$dU/dt = 2(x\\dot x + y\\dot y)$, which equals $2\\mathbf{r}\\cdot\\dot{\\mathbf{r}}$.',
      steps: [
        '$U_x = 2x$, $U_y = 2y$.',
        'Chain rule: $dU/dt = U_x \\dot x + U_y \\dot y = 2x\\dot x + 2y\\dot y$.',
        'Factor: $dU/dt = 2(x\\dot x + y\\dot y) = 2\\mathbf{r}\\cdot\\dot{\\mathbf{r}}$.',
        'Interpretation: $U$ is the squared distance from origin, and its rate of change equals twice the projection of velocity onto position — a classical result.',
      ],
    },
    {
      prompt: 'Economics: a utility is $U(x, y) = x^{1/2} y^{1/2}$ where $x = $ good A, $y = $ good B. A consumer currently has $(x, y) = (4, 9)$. Along the direction of buying $1$ more of A per $2$ of B, what is the rate of utility change, per unit distance?',
      answer: 'About $0.559$ utility per unit distance in that direction.',
      steps: [
        '$U_x = \\tfrac12 x^{-1/2} y^{1/2}$, $U_y = \\tfrac12 x^{1/2} y^{-1/2}$.',
        'At $(4, 9)$: $U_x = \\tfrac12 (1/2)(3) = 0.75$, $U_y = \\tfrac12 (2)(1/3) = 1/3 \\approx 0.333$.',
        'Direction $(1, 2)$, unit: $(1, 2)/\\sqrt 5$.',
        'Dot: $(0.75 + 2/3)/\\sqrt 5 = (17/12)/\\sqrt 5 \\approx 1.4167/2.236 \\approx 0.6335$. (Rounding: close to $0.63$.)',
      ],
    },
    {
      prompt: 'Suppose $w = f(x, y, z)$ where $x, y, z$ all depend on $s$ and $t$. Write the total chain rule for $\\partial w/\\partial s$.',
      answer: '$\\dfrac{\\partial w}{\\partial s} = \\dfrac{\\partial f}{\\partial x}\\dfrac{\\partial x}{\\partial s} + \\dfrac{\\partial f}{\\partial y}\\dfrac{\\partial y}{\\partial s} + \\dfrac{\\partial f}{\\partial z}\\dfrac{\\partial z}{\\partial s}$.',
      steps: [
        'Think of $w$ as depending on $s$ through each of $x, y, z$.',
        'Contribution from $x$: $f_x \\cdot x_s$. Similarly for $y$ and $z$.',
        'Sum them.',
        'This generalizes to any number of intermediate and outer variables — the "tree diagram" of the chain rule.',
      ],
    },
    {
      prompt: 'Show that if $\\mathbf{u}$ is a unit vector tangent to a level curve of $f$ at point $P$, then $D_{\\mathbf{u}} f(P) = 0$.',
      answer: 'The gradient is perpendicular to level curves, so the directional derivative along them vanishes.',
      steps: [
        'Parametrize the level curve as $\\mathbf{r}(t)$ with $f(\\mathbf{r}(t)) = c$ constant.',
        'Differentiate: $\\nabla f(\\mathbf{r}(t))\\cdot \\mathbf{r}\'(t) = 0$.',
        'So at $P$, $\\nabla f(P)$ is perpendicular to the tangent $\\mathbf{r}\'(t)$.',
        'If $\\mathbf{u}$ is a unit tangent at $P$, then $D_\\mathbf{u} f(P) = \\nabla f \\cdot \\mathbf{u} = 0$.',
      ],
    },
    {
      prompt: 'ML: for a neural net output $y = \\sigma(Wx + b)$ with $\\sigma$ the sigmoid, use the chain rule to find $\\partial y/\\partial x_1$ (assume $x = (x_1, x_2)$ and $W$ is $1\\times 2$).',
      answer: '$\\partial y/\\partial x_1 = \\sigma\'(Wx + b)\\,W_{1,1}$ where $\\sigma\'(z) = \\sigma(z)(1-\\sigma(z))$.',
      steps: [
        'Let $z = W x + b = W_{1,1} x_1 + W_{1,2} x_2 + b$.',
        '$y = \\sigma(z)$, so $\\partial y/\\partial x_1 = \\sigma\'(z)\\cdot \\partial z/\\partial x_1$.',
        '$\\partial z/\\partial x_1 = W_{1,1}$.',
        'Therefore $\\partial y/\\partial x_1 = \\sigma\'(z)\\, W_{1,1} = y(1-y) W_{1,1}$.',
      ],
    },
    {
      prompt: 'A metal disk has temperature $T(x, y) = 200 - 5x^2 - 3y^2$ (Celsius). A bug at $(2, 1)$ walks in a straight line toward the origin. At what rate (degrees per unit walked) is its temperature changing?',
      answer: 'About $+18.78$ degrees per unit length.',
      steps: [
        '$\\nabla T = (-10x, -6y)$. At $(2, 1)$: $\\nabla T = (-20, -6)$.',
        'Direction toward origin from $(2, 1)$: $(-2, -1)/\\sqrt 5$.',
        'Dot product: $(-20)(-2/\\sqrt 5) + (-6)(-1/\\sqrt 5) = (40 + 6)/\\sqrt 5 = 46/\\sqrt 5 \\approx 20.57$.',
        'So the bug gains about $20.57$ degrees per unit distance as it walks toward the origin (where the disk is hottest).',
      ],
    },
  ];

  PS.registerTopic("mvcalc-chain-directional", {
    title: "Chain rule and directional derivatives",
    description: "The multivariable chain rule, directional derivatives, and what the gradient really points at.",
    warmup:   BANK_CHAIN_WARMUP,
    standard: BANK_CHAIN_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 3: mvcalc-multiple-integrals
  // =====================================================================
  var BANK_INTEGRALS_WARMUP = [
    {
      prompt: 'Evaluate $\\displaystyle\\int_0^1\\int_0^2 (x + y)\\,dy\\,dx$.',
      answer: '$3$.',
      steps: [
        'Inner: $\\int_0^2 (x + y)\\,dy = [xy + y^2/2]_0^2 = 2x + 2$.',
        'Outer: $\\int_0^1 (2x + 2)\\,dx = [x^2 + 2x]_0^1 = 1 + 2 = 3$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle\\int_0^1\\int_0^1 xy\\,dx\\,dy$.',
      answer: '$1/4$.',
      steps: [
        'Inner: $\\int_0^1 xy\\,dx = y [x^2/2]_0^1 = y/2$.',
        'Outer: $\\int_0^1 y/2\\,dy = [y^2/4]_0^1 = 1/4$.',
        'Or use Fubini separation: $(\\int_0^1 x\\,dx)(\\int_0^1 y\\,dy) = (1/2)(1/2) = 1/4$.',
      ],
    },
    {
      prompt: 'Find the area of the rectangle $[0, 3]\\times[0, 2]$ using a double integral.',
      answer: '$6$.',
      steps: [
        'Area $= \\iint_R 1\\, dA = \\int_0^3\\int_0^2 1\\,dy\\,dx$.',
        '$= \\int_0^3 2\\,dx = 6$.',
      ],
    },
    {
      prompt: 'Convert to polar coordinates and evaluate: $\\displaystyle\\iint_D (x^2 + y^2)\\,dA$, where $D$ is the unit disk.',
      answer: '$\\pi/2$.',
      steps: [
        'In polar coordinates: $x^2 + y^2 = r^2$ and $dA = r\\,dr\\,d\\theta$.',
        '$\\int_0^{2\\pi}\\int_0^1 r^2 \\cdot r\\,dr\\,d\\theta = \\int_0^{2\\pi} [r^4/4]_0^1\\,d\\theta = \\int_0^{2\\pi} 1/4\\,d\\theta = \\pi/2$.',
      ],
    },
    {
      prompt: 'Compute $\\displaystyle\\int_0^1\\int_0^1\\int_0^1 xyz\\,dx\\,dy\\,dz$.',
      answer: '$1/8$.',
      steps: [
        'The integrand separates: $(\\int_0^1 x\\,dx)(\\int_0^1 y\\,dy)(\\int_0^1 z\\,dz)$.',
        '$= (1/2)(1/2)(1/2) = 1/8$.',
      ],
    },
    {
      prompt: 'Find the mass of a thin plate covering the rectangle $[0, 2]\\times[0, 3]$ with density $\\rho(x,y) = 1 + x y$.',
      answer: '$15$.',
      steps: [
        'Mass $= \\int_0^2\\int_0^3 (1 + xy)\\,dy\\,dx$.',
        'Inner: $\\int_0^3 (1 + xy)\\,dy = [y + xy^2/2]_0^3 = 3 + 9x/2$.',
        'Outer: $\\int_0^2 (3 + 9x/2)\\,dx = [3x + 9x^2/4]_0^2 = 6 + 9 = 15$.',
      ],
    },
  ];

  var BANK_INTEGRALS_STANDARD = [
    {
      prompt: 'Compute the volume under $z = 4 - x^2 - y^2$ over the disk $x^2 + y^2 \\le 4$.',
      answer: '$8\\pi$.',
      steps: [
        'In polar: integrand is $4 - r^2$, region is $0 \\le r \\le 2$, $0 \\le \\theta < 2\\pi$.',
        'Volume $= \\int_0^{2\\pi}\\int_0^2 (4 - r^2)\\, r\\,dr\\,d\\theta$.',
        'Inner: $\\int_0^2 (4r - r^3)\\,dr = [2r^2 - r^4/4]_0^2 = 8 - 4 = 4$.',
        'Outer: $\\int_0^{2\\pi} 4\\,d\\theta = 8\\pi$.',
      ],
    },
    {
      prompt: 'Physics: find the center of mass of a uniform square plate $[0, a]\\times[0, a]$ with density $\\rho(x,y) = x$ (denser on the right).',
      answer: '$(\\bar x, \\bar y) = (2a/3, a/2)$.',
      steps: [
        'Total mass $M = \\int_0^a\\int_0^a x\\,dy\\,dx = a\\int_0^a x\\,dx = a\\cdot a^2/2 = a^3/2$.',
        '$\\bar x = \\tfrac{1}{M}\\int_0^a\\int_0^a x\\cdot x\\,dy\\,dx = \\tfrac{1}{M}\\cdot a\\cdot a^3/3 = (2/a^3)(a^4/3) = 2a/3$.',
        '$\\bar y = \\tfrac{1}{M}\\int_0^a\\int_0^a y\\cdot x\\,dy\\,dx = \\tfrac{1}{M}\\cdot (a^2/2)(a^2/2) = (2/a^3)(a^4/4) = a/2$.',
      ],
    },
    {
      prompt: 'Convert $\\int_0^1\\int_0^{\\sqrt{1-x^2}} e^{x^2 + y^2}\\,dy\\,dx$ to polar coordinates and evaluate.',
      answer: '$\\dfrac{\\pi(e - 1)}{4}$.',
      steps: [
        'The region is the quarter unit disk in the first quadrant.',
        'Polar: $0 \\le r \\le 1$, $0 \\le \\theta \\le \\pi/2$. Integrand: $e^{r^2}\\cdot r$.',
        '$\\int_0^{\\pi/2}\\int_0^1 e^{r^2} r\\,dr\\,d\\theta$.',
        'Inner: let $u = r^2$, $du = 2r\\,dr$, so $\\int_0^1 e^{r^2}r\\,dr = \\tfrac12 (e - 1)$.',
        'Outer: $\\int_0^{\\pi/2} \\tfrac12(e-1)\\,d\\theta = (e-1)\\pi/4$.',
      ],
    },
    {
      prompt: 'Evaluate $\\displaystyle\\iiint_E z\\,dV$ where $E$ is the region above the cone $z = \\sqrt{x^2 + y^2}$ and below the plane $z = 1$.',
      answer: '$\\pi/4$.',
      steps: [
        'In cylindrical coords: $r \\le z \\le 1$, $0 \\le r \\le 1$, $0 \\le \\theta < 2\\pi$.',
        '$\\iiint z \\,dV = \\int_0^{2\\pi}\\int_0^1 \\int_r^1 z\\cdot r\\,dz\\,dr\\,d\\theta$.',
        'Inner: $\\int_r^1 z\\,dz = (1 - r^2)/2$. Multiply by $r$: $r(1-r^2)/2$.',
        'Middle: $\\int_0^1 r(1-r^2)/2\\,dr = \\tfrac12 [r^2/2 - r^4/4]_0^1 = \\tfrac12 \\cdot 1/4 = 1/8$.',
        'Outer: $\\int_0^{2\\pi} 1/8\\,d\\theta = \\pi/4$.',
      ],
    },
    {
      prompt: 'Use the change of variables $u = x + y$, $v = x - y$ to compute $\\displaystyle\\iint_R (x+y)^2\\,dA$ over the square $R = \\{0 \\le x+y \\le 2,\\ -1 \\le x - y \\le 1\\}$.',
      answer: '$8/3$.',
      steps: [
        'The Jacobian: $\\partial(x,y)/\\partial(u,v) = 1/2$ (compute $x = (u+v)/2$, $y = (u-v)/2$; determinant of the map $(u,v)\\to(x,y)$ is $-1/2$, absolute value $1/2$).',
        'Integrand: $(x+y)^2 = u^2$.',
        'Integral: $\\int_{-1}^{1}\\int_0^2 u^2 \\cdot \\tfrac12\\,du\\,dv$.',
        'Inner: $\\tfrac12\\int_0^2 u^2\\,du = \\tfrac12 \\cdot 8/3 = 4/3$.',
        'Outer: $\\int_{-1}^1 4/3\\,dv = 8/3$.',
      ],
    },
    {
      prompt: 'Find the volume of the region bounded by $z = 0$, $z = 1$, and $x^2 + y^2 \\le 9$ using a triple integral in cylindrical coordinates.',
      answer: '$9\\pi$.',
      steps: [
        'The region is a cylinder: $0 \\le r \\le 3$, $0 \\le \\theta < 2\\pi$, $0 \\le z \\le 1$.',
        'Volume $= \\int_0^{2\\pi}\\int_0^3\\int_0^1 r\\,dz\\,dr\\,d\\theta$.',
        'Inner: $\\int_0^1 r\\,dz = r$.',
        'Middle: $\\int_0^3 r\\,dr = 9/2$.',
        'Outer: $\\int_0^{2\\pi} 9/2\\,d\\theta = 9\\pi$.',
      ],
    },
    {
      prompt: 'Probability: let $(X, Y)$ be uniform on the triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$. Compute $P(X + Y \\le 1/2)$ using a double integral.',
      answer: '$1/4$.',
      steps: [
        'The triangle has area $1/2$, so the density is $2$.',
        'The event $X+Y\\le 1/2$ is a smaller triangle with vertices $(0,0), (1/2, 0), (0, 1/2)$, area $1/8$.',
        '$P = \\iint_{X+Y\\le 1/2} 2\\,dA = 2 \\cdot 1/8 = 1/4$.',
      ],
    },
    {
      prompt: 'Biology: bacterial density on a petri dish disk of radius 5 cm is $\\rho(r) = 100 e^{-r}$ (cells/cm$^2$). Compute the total number of cells.',
      answer: '$200\\pi (1 - 6 e^{-5}) \\approx 200\\pi \\cdot 0.960 \\approx 603$ cells.',
      steps: [
        'Total $= \\int_0^{2\\pi}\\int_0^5 100 e^{-r}\\cdot r\\,dr\\,d\\theta$.',
        'Outer angle: $2\\pi$.',
        'Radial: $100\\int_0^5 r e^{-r}\\,dr$. Integration by parts: $\\int r e^{-r}\\,dr = -r e^{-r} - e^{-r} + C$.',
        'Evaluate: $[-r e^{-r} - e^{-r}]_0^5 = (-5 e^{-5} - e^{-5}) - (0 - 1) = 1 - 6 e^{-5}$.',
        'Total: $100\\cdot 2\\pi\\cdot (1 - 6 e^{-5}) = 200\\pi(1 - 6 e^{-5}) \\approx 603$.',
      ],
    },
    {
      prompt: 'Switch the order of integration: $\\displaystyle\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$ is hard as written. Swap and evaluate.',
      answer: '$(e - 1)/2$.',
      steps: [
        'The region is $0 \\le x \\le y \\le 1$. Swap: $\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy$.',
        'Inner: $\\int_0^y e^{y^2}\\,dx = y e^{y^2}$.',
        'Outer: $\\int_0^1 y e^{y^2}\\,dy$. Let $u = y^2$, $du = 2y\\,dy$.',
        '$= \\tfrac12 \\int_0^1 e^u\\,du = \\tfrac12 (e - 1)$.',
      ],
    },
  ];

  PS.registerTopic("mvcalc-multiple-integrals", {
    title: "Multiple integrals and change of variables",
    description: "Double and triple integrals in rectangular, polar, cylindrical, and general coordinates.",
    warmup:   BANK_INTEGRALS_WARMUP,
    standard: BANK_INTEGRALS_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 4: mvcalc-optimization
  // =====================================================================
  var BANK_OPT_WARMUP = [
    {
      prompt: 'Find all critical points of $f(x, y) = x^2 + y^2 - 4x + 6y$.',
      answer: 'Single critical point at $(2, -3)$.',
      steps: [
        '$f_x = 2x - 4$, $f_y = 2y + 6$.',
        'Set both to zero: $x = 2$, $y = -3$.',
        'So the only critical point is $(2, -3)$ — by completing the square, it is a global minimum of value $-13$.',
      ],
    },
    {
      prompt: 'Classify the critical point at $(0, 0)$ of $f(x, y) = x^2 - y^2$ using the Hessian test.',
      answer: 'Saddle point.',
      steps: [
        '$f_x = 2x$, $f_y = -2y$. Both vanish at $(0,0)$.',
        'Hessian $H = \\begin{pmatrix}2 & 0\\\\ 0 & -2\\end{pmatrix}$.',
        '$\\det H = -4 < 0$, so it is a saddle point.',
      ],
    },
    {
      prompt: 'Set up the Lagrangian to minimize $f(x, y) = x^2 + y^2$ subject to $x + y = 1$.',
      answer: '$\\mathcal{L}(x, y, \\lambda) = x^2 + y^2 - \\lambda(x + y - 1)$.',
      steps: [
        'The Lagrangian is $f$ minus $\\lambda$ times the constraint written as $g(x,y) = 0$.',
        'Constraint: $g(x,y) = x + y - 1 = 0$.',
        '$\\mathcal{L} = x^2 + y^2 - \\lambda(x + y - 1)$.',
      ],
    },
    {
      prompt: 'Solve the Lagrange system from the previous problem.',
      answer: '$(x, y) = (1/2, 1/2)$, with minimum value $1/2$.',
      steps: [
        '$\\partial_x\\mathcal L = 2x - \\lambda = 0 \\Rightarrow \\lambda = 2x$.',
        '$\\partial_y\\mathcal L = 2y - \\lambda = 0 \\Rightarrow \\lambda = 2y$.',
        'So $x = y$. Plug into constraint $x + y = 1$: $2x = 1$, $x = 1/2$.',
        '$(1/2, 1/2)$ gives $f = 1/4 + 1/4 = 1/2$.',
      ],
    },
    {
      prompt: 'Hessian check: for $f(x, y) = x^4 + y^4 - 4xy$, find the Hessian at $(1, 1)$ and determine the type of critical point.',
      answer: 'Local minimum.',
      steps: [
        '$f_x = 4x^3 - 4y$, $f_y = 4y^3 - 4x$. At $(1,1)$: $4 - 4 = 0$ each, so it\'s a critical point.',
        '$f_{xx} = 12x^2$, $f_{yy} = 12y^2$, $f_{xy} = -4$. At $(1,1)$: $H = \\begin{pmatrix}12 & -4\\\\ -4 & 12\\end{pmatrix}$.',
        '$\\det H = 144 - 16 = 128 > 0$ and $f_{xx} = 12 > 0$, so local minimum.',
      ],
    },
    {
      prompt: 'What does a positive-definite Hessian at a critical point tell you, and what does it imply for gradient descent?',
      answer: 'Positive-definite Hessian means local minimum; gradient descent with small enough step converges locally.',
      steps: [
        'A positive-definite matrix has all positive eigenvalues, meaning the function curves upward in every direction.',
        'So near that critical point, $f$ looks like a bowl — it is a strict local minimum.',
        'Locally, gradient descent in such a basin is a contraction with step size smaller than $2/\\lambda_{\\max}$, so it converges linearly.',
      ],
    },
  ];

  var BANK_OPT_STANDARD = [
    {
      prompt: 'Find the dimensions of the largest open-top rectangular box with a square base that can be built using $48\\ \\text{m}^2$ of material.',
      answer: 'Base side $4$ m, height $2$ m, volume $32\\ \\text{m}^3$.',
      steps: [
        'Let the base be $x\\times x$ and height $h$. Material: $x^2 + 4xh = 48$ (bottom + 4 sides).',
        'Volume: $V = x^2 h$. Solve the constraint for $h$: $h = (48 - x^2)/(4x)$.',
        'Substitute: $V(x) = x^2\\cdot (48 - x^2)/(4x) = x(48 - x^2)/4 = (48 x - x^3)/4$.',
        '$V\'(x) = (48 - 3x^2)/4 = 0 \\Rightarrow x^2 = 16 \\Rightarrow x = 4$ m.',
        'Then $h = (48 - 16)/16 = 2$ m, and $V = 16 \\cdot 2 = 32\\ \\text{m}^3$.',
      ],
    },
    {
      prompt: 'Use Lagrange multipliers to maximize $f(x, y) = xy$ on the circle $x^2 + y^2 = 8$.',
      answer: 'Max value $4$, achieved at $(\\pm 2, \\pm 2)$ with signs equal.',
      steps: [
        'Lagrangian: $\\mathcal L = xy - \\lambda(x^2 + y^2 - 8)$.',
        '$\\mathcal L_x: y = 2\\lambda x$. $\\mathcal L_y: x = 2\\lambda y$.',
        'Multiply: $xy = 4\\lambda^2 xy$, so either $xy = 0$ or $\\lambda = \\pm 1/2$.',
        'Case $\\lambda = 1/2$: $y = x$, constraint gives $2x^2 = 8$, $x = \\pm 2$, so $(2,2)$ or $(-2,-2)$.',
        'Value: $f(2,2) = 4$. (Case $\\lambda = -1/2$ gives minimum $-4$ at $(\\pm 2, \\mp 2)$.)',
      ],
    },
    {
      prompt: 'Classify all critical points of $f(x, y) = x^3 - 3xy + y^3$.',
      answer: 'Critical points at $(0, 0)$ (saddle) and $(1, 1)$ (local min).',
      steps: [
        '$f_x = 3x^2 - 3y$, $f_y = -3x + 3y^2$. Setting to zero: $y = x^2$ and $x = y^2$.',
        'Sub: $x = x^4$, so $x(x^3 - 1) = 0$, giving $x = 0$ or $x = 1$.',
        'Critical points: $(0, 0)$ and $(1, 1)$.',
        'Hessian: $f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = -3$.',
        'At $(0,0)$: $H = \\begin{pmatrix}0 & -3\\\\ -3 & 0\\end{pmatrix}$, $\\det = -9 < 0$. Saddle.',
        'At $(1,1)$: $H = \\begin{pmatrix}6 & -3\\\\ -3 & 6\\end{pmatrix}$, $\\det = 27 > 0$, $f_{xx} > 0$. Local min.',
      ],
    },
    {
      prompt: 'Economics: a Cobb-Douglas firm has utility $U(x, y) = x^{1/3} y^{2/3}$ subject to the budget $2x + y = 12$. Find the utility-maximizing bundle.',
      answer: '$(x, y) = (2, 8)$, utility $U = 2^{1/3}\\cdot 8^{2/3} = 2^{1/3}\\cdot 4 = 4\\cdot 2^{1/3}\\approx 5.04$.',
      steps: [
        'Lagrangian: $\\mathcal L = x^{1/3}y^{2/3} - \\lambda(2x + y - 12)$.',
        '$U_x = \\tfrac13 x^{-2/3} y^{2/3} = 2\\lambda$.',
        '$U_y = \\tfrac23 x^{1/3} y^{-1/3} = \\lambda$.',
        'Divide: $\\dfrac{U_x}{U_y} = \\dfrac{y/(3x)\\cdot 2}{1} = \\dfrac{2y}{3x}\\cdot ? $ Simpler: $U_x/U_y = (1/3)(y/x)\\cdot (2/3)^{-1}\\cdot ? $ Let\'s instead set ratio of marginals = ratio of prices.',
        'Standard Cobb-Douglas result: spend share $\\alpha = 1/3$ on $x$ (which costs $2$) and $\\beta = 2/3$ on $y$ (which costs $1$). So $2x = (1/3)\\cdot 12 = 4 \\Rightarrow x = 2$, and $y = (2/3)\\cdot 12 = 8$.',
        'Check budget: $2(2) + 8 = 12$. $\\checkmark$',
      ],
    },
    {
      prompt: 'Show that minimizing $\\|A\\mathbf x - \\mathbf b\\|^2$ over $\\mathbf x\\in\\mathbb R^n$ is a quadratic optimization whose gradient equals $2 A^T(A\\mathbf x - \\mathbf b)$. Find the minimizer.',
      answer: 'Normal equations: $A^T A\\mathbf x = A^T\\mathbf b$. If $A^T A$ is invertible, $\\mathbf x = (A^T A)^{-1} A^T \\mathbf b$.',
      steps: [
        'Let $\\phi(\\mathbf x) = (A\\mathbf x - \\mathbf b)^T(A\\mathbf x - \\mathbf b)$.',
        'Expand: $\\phi = \\mathbf x^T A^T A\\mathbf x - 2\\mathbf b^T A\\mathbf x + \\mathbf b^T\\mathbf b$.',
        '$\\nabla\\phi = 2 A^T A\\mathbf x - 2 A^T\\mathbf b$. Set to zero.',
        'Solve: $A^T A\\mathbf x = A^T\\mathbf b$. This is the least-squares normal equation.',
        'The Hessian $2 A^T A$ is positive semidefinite, so any solution is a global minimum; unique if $A$ has independent columns.',
      ],
    },
    {
      prompt: 'A rectangular box (closed, no lid missing) must have volume $1000\\ \\text{cm}^3$. Minimize its surface area.',
      answer: 'The cube of side $10$ cm; surface area $600\\ \\text{cm}^2$.',
      steps: [
        'Let dimensions be $x, y, z$. Constraint $xyz = 1000$. Surface $S = 2(xy + yz + xz)$.',
        'By symmetry (and the AM-GM inequality), the minimum is the cube: $x = y = z$.',
        '$x^3 = 1000 \\Rightarrow x = 10$ cm.',
        '$S = 6 \\cdot 10^2 = 600\\ \\text{cm}^2$.',
      ],
    },
    {
      prompt: 'Use the Hessian test to classify critical points of $f(x,y) = \\sin(x)\\cos(y)$ in the square $(0, \\pi)\\times(0, \\pi)$.',
      answer: 'Single critical point at $(\\pi/2, \\pi/2)$; it\'s a saddle... wait, check.',
      steps: [
        '$f_x = \\cos x\\cos y = 0$ and $f_y = -\\sin x\\sin y = 0$ simultaneously.',
        'In the open square, $\\sin x > 0$, so $\\sin y = 0$ needs $y = 0$ or $\\pi$, which are boundary. So we need $\\cos x = 0 \\Rightarrow x = \\pi/2$ and $\\cos y = 0 \\Rightarrow y = \\pi/2$ (both in the interior).',
        'At $(\\pi/2, \\pi/2)$: $f_{xx} = -\\sin x\\cos y = 0$, $f_{yy} = -\\sin x\\cos y = 0$, $f_{xy} = -\\cos x\\sin y = 0$.',
        'Hessian is zero — second-derivative test is inconclusive.',
        'Look at values: $f(\\pi/2, \\pi/2) = 1\\cdot 0 = 0$, and nearby points can be positive or negative ($\\sin(\\pi/2+\\varepsilon)\\cos(\\pi/2+\\delta)$ changes sign with $\\delta$). So it is a saddle-type behaviour.',
      ],
    },
    {
      prompt: 'ML: fit a line $y = wx$ (through origin) to data $\\{(1, 2), (2, 3), (3, 5)\\}$ by minimizing squared error. Find the optimal $w$.',
      answer: '$w = 23/14 \\approx 1.643$.',
      steps: [
        'Loss: $L(w) = \\sum_i (w x_i - y_i)^2 = (w-2)^2 + (2w-3)^2 + (3w-5)^2$.',
        '$dL/dw = 2(w-2) + 4(2w-3) + 6(3w-5) = 2w - 4 + 8w - 12 + 18w - 30 = 28w - 46$.',
        'Set to zero: $w = 46/28 = 23/14 \\approx 1.643$.',
        'Equivalent formula: $w = \\sum x_i y_i / \\sum x_i^2 = (2 + 6 + 15)/(1+4+9) = 23/14$. $\\checkmark$',
      ],
    },
    {
      prompt: 'Find the point on the plane $x + 2y + 3z = 14$ closest to the origin (use Lagrange multipliers).',
      answer: '$(1, 2, 3)$, distance $\\sqrt{14}$.',
      steps: [
        'Minimize $x^2 + y^2 + z^2$ subject to $x + 2y + 3z = 14$.',
        'Lagrange: $\\nabla(x^2+y^2+z^2) = \\lambda\\nabla(x+2y+3z)$, i.e. $(2x, 2y, 2z) = \\lambda(1, 2, 3)$.',
        'So $x = \\lambda/2$, $y = \\lambda$, $z = 3\\lambda/2$.',
        'Plug into constraint: $\\lambda/2 + 2\\lambda + 9\\lambda/2 = 14 \\Rightarrow (\\lambda/2 + 4\\lambda/2 + 9\\lambda/2) = 14 \\Rightarrow 14\\lambda/2 = 14 \\Rightarrow \\lambda = 2$.',
        'So $(x, y, z) = (1, 2, 3)$, distance $= \\sqrt{1 + 4 + 9} = \\sqrt{14}$.',
      ],
    },
  ];

  PS.registerTopic("mvcalc-optimization", {
    title: "Optimization, Lagrange multipliers, and the Hessian",
    description: "Find and classify critical points, solve constrained problems, and connect back to least squares.",
    warmup:   BANK_OPT_WARMUP,
    standard: BANK_OPT_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  });  // whenReady
})();
