/*
 * LearningHub - Electromagnetism Problem Set
 * Registers four topics with the LearningHubProblemSet runtime:
 *   phys-em-coulomb   - point charges, Coulomb's law, superposition
 *   phys-em-gauss     - Gauss's law and symmetry
 *   phys-em-induction - Faraday's law, motional EMF, inductors
 *   phys-em-maxwell   - Maxwell's equations and EM waves
 *
 * Problems are hand-authored with worked steps. Constants used:
 *   k = 1/(4 pi eps0) = 9e9 N m^2 / C^2
 *   eps0 = 8.854e-12 F/m
 *   mu0 = 4 pi * 1e-7 H/m
 *   c = 3e8 m/s
 *   e = 1.6e-19 C
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[em-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-em-coulomb
  // ============================================================
  var COULOMB_WARMUP = [
    {
      prompt: 'Two $+1\\,\\mu\\text{C}$ charges are $1\\,\\text{m}$ apart. What is the force between them?',
      answer: '$9 \\times 10^{-3}\\,\\text{N}$, repulsive',
      steps: [
        '$F = k q_1 q_2 / r^2 = (9\\times 10^9)(10^{-6})(10^{-6})/1 = 9\\times 10^{-3}\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'What is the magnitude of the electric field $0.5\\,\\text{m}$ from a $+2\\,\\mu\\text{C}$ point charge?',
      answer: '$72{,}000\\,\\text{V/m}$',
      steps: [
        '$E = k q / r^2 = (9\\times 10^9)(2\\times 10^{-6})/(0.25) = 72{,}000\\,\\text{V/m}$.',
      ],
    },
    {
      prompt: 'An electron in a uniform field $E = 1000\\,\\text{V/m}$ experiences what force?',
      answer: '$1.6\\times 10^{-16}\\,\\text{N}$',
      steps: [
        '$F = q E = (1.6\\times 10^{-19})(1000) = 1.6\\times 10^{-16}\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'How many electrons make up $-1\\,\\text{C}$ of charge?',
      answer: '$\\approx 6.25 \\times 10^{18}$',
      steps: [
        '$N = 1 / (1.6\\times 10^{-19}) \\approx 6.25\\times 10^{18}$.',
      ],
    },
    {
      prompt: 'Two charges $q_1 = +3\\,\\mu\\text{C}$ and $q_2 = -4\\,\\mu\\text{C}$ are $2\\,\\text{m}$ apart. What is the force on $q_1$?',
      answer: '$2.7\\times 10^{-2}\\,\\text{N}$ toward $q_2$ (attractive).',
      steps: [
        '$F = k|q_1 q_2|/r^2 = (9\\times 10^9)(3\\times 10^{-6})(4\\times 10^{-6})/4$.',
        '$= (9\\times 10^9)(12\\times 10^{-12})/4 = 108\\times 10^{-3}/4 = 0.027\\,\\text{N}$.',
        'Opposite signs attract, so the force pulls $q_1$ toward $q_2$.',
      ],
    },
  ];

  var COULOMB_STANDARD = [
    {
      prompt: 'Three charges of $+2\\,\\mu\\text{C}$ each sit at the corners of an equilateral triangle of side $1\\,\\text{m}$. Find the force on one of them.',
      answer: '$\\approx 0.0624\\,\\text{N}$ directed away from the midpoint of the opposite side.',
      steps: [
        'Each pair exerts $F = k q^2 / r^2 = (9\\times 10^9)(4\\times 10^{-12})/1 = 0.036\\,\\text{N}$.',
        'The two forces from the other charges meet at $60^\\circ$ angles with each other.',
        'Their vector sum has magnitude $2 F \\cos 30^\\circ = \\sqrt{3} \\cdot 0.036 \\approx 0.0624\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'An electric dipole of moment $p = q d$ in a uniform field $E$ experiences what torque at angle $\\theta$ to the field?',
      answer: '$\\tau = p E \\sin\\theta$',
      steps: [
        'Forces on the two charges have equal magnitude and opposite direction.',
        'They form a couple with moment arm $d\\sin\\theta$.',
        '$\\tau = q E \\cdot d \\sin\\theta = p E \\sin\\theta$.',
      ],
    },
    {
      prompt: 'A $+5\\,\\mu\\text{C}$ charge is at origin, $-3\\,\\mu\\text{C}$ at $(4\\,\\text{m}, 0)$. Find the electric field at $(2\\,\\text{m}, 0)$.',
      answer: '$\\approx 1.8\\times 10^4\\,\\text{V/m}$ in the $+x$ direction.',
      steps: [
        'From $+5\\,\\mu\\text{C}$: $E_1 = (9\\times 10^9)(5\\times 10^{-6})/4 = 1.125\\times 10^4\\,\\text{V/m}$ in $+x$.',
        'From $-3\\,\\mu\\text{C}$: $E_2 = (9\\times 10^9)(3\\times 10^{-6})/4 = 0.675\\times 10^4\\,\\text{V/m}$, also in $+x$ (field points toward the negative charge).',
        'Total: $E \\approx 1.8\\times 10^4\\,\\text{V/m}$ in $+x$.',
      ],
    },
    {
      prompt: 'Two charges $+q$ at $(\\pm a, 0)$. Find the electric field magnitude on the y-axis at height $y$.',
      answer: '$E(y) = \\dfrac{2 k q y}{(a^2 + y^2)^{3/2}}$ in the $+y$ direction.',
      steps: [
        'Distance from each charge to point $(0, y)$: $r = \\sqrt{a^2 + y^2}$.',
        'By symmetry, the $x$-components cancel; only the $y$-components add.',
        'Each contributes $E\\cos\\theta = (kq/r^2)(y/r) = k q y / r^3$.',
        'Two of them: $E = 2 k q y / (a^2 + y^2)^{3/2}$.',
      ],
    },
    {
      prompt: 'The electric potential $V$ at distance $r$ from a point charge $q$ is $V = kq/r$. What is the potential at $0.5\\,\\text{m}$ from a $+4\\,\\mu\\text{C}$ charge?',
      answer: '$72{,}000\\,\\text{V}$',
      steps: [
        '$V = (9\\times 10^9)(4\\times 10^{-6})/0.5 = 72{,}000\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'How much work is required to bring a $+1\\,\\mu\\text{C}$ charge from infinity to a point $1\\,\\text{m}$ from a $+5\\,\\mu\\text{C}$ charge?',
      answer: '$0.045\\,\\text{J}$',
      steps: [
        '$W = q V = q (k Q / r) = (10^{-6})(9\\times 10^9)(5\\times 10^{-6})/1 = 0.045\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A parallel-plate capacitor has plates of area $0.01\\,\\text{m}^2$ separated by $1\\,\\text{mm}$, with vacuum between. Find its capacitance.',
      answer: '$C \\approx 88.5\\,\\text{pF}$',
      steps: [
        '$C = \\epsilon_0 A / d = (8.854\\times 10^{-12})(0.01)/(10^{-3})$.',
        '$= 8.854\\times 10^{-11}\\,\\text{F} \\approx 88.5\\,\\text{pF}$.',
      ],
    },
    {
      prompt: 'A $10\\,\\mu\\text{F}$ capacitor is charged to $100\\,\\text{V}$. How much energy does it store?',
      answer: '$0.05\\,\\text{J}$',
      steps: [
        '$U = \\tfrac{1}{2} C V^2 = \\tfrac{1}{2}(10\\times 10^{-6})(10{,}000) = 0.05\\,\\text{J}$.',
      ],
    },
  ];

  var COULOMB_CHALLENGE = [
    {
      prompt: 'Four charges $+q$ sit at the corners of a square of side $a$. What is the force on one corner charge?',
      answer: 'Magnitude $(k q^2 / a^2)(1 + 1/\\sqrt{8}) \\sqrt{2}$, directed outward along the diagonal. Equivalently $\\approx (1.91)(k q^2/a^2)$.',
      steps: [
        'Two adjacent charges each exert $F = k q^2 / a^2$; their vector sum points along the diagonal with magnitude $F\\sqrt{2}$.',
        'The diagonally opposite charge exerts $k q^2 / (a\\sqrt{2})^2 = k q^2/(2 a^2)$, also along the same diagonal.',
        'Total along diagonal: $\\sqrt{2} (k q^2/a^2) + (k q^2)/(2 a^2)$.',
        'Factor: $(k q^2/a^2)(\\sqrt{2} + 1/2) \\approx 1.914 \\, k q^2/a^2$.',
      ],
    },
    {
      prompt: 'A uniformly charged ring of radius $a$ and total charge $Q$. Find the electric field along the central axis at distance $z$.',
      answer: '$E(z) = \\dfrac{k Q z}{(a^2 + z^2)^{3/2}}$ along the axis.',
      steps: [
        'Each element $dq$ is at distance $r = \\sqrt{a^2 + z^2}$ from the point.',
        'Components perpendicular to the axis cancel by symmetry.',
        'The axial component of each $dE$ is $(k \\, dq / r^2)(z/r) = k z \\, dq/r^3$.',
        'Integrate: $E = k Q z / r^3 = k Q z / (a^2 + z^2)^{3/2}$.',
        'Check limits: $z \\gg a$ gives $E \\approx k Q / z^2$ (point charge); $z = 0$ gives $0$.',
      ],
    },
    {
      prompt: 'Show that the electrostatic potential energy of assembling $N$ point charges is $U = \\tfrac{1}{2} \\sum_i q_i V_i$, where $V_i$ is the potential at charge $i$ from all the others.',
      answer: 'Derived below.',
      steps: [
        'Total energy is pairwise: $U = \\sum_{i<j} k q_i q_j / r_{ij}$.',
        'Rewrite as half a double sum: $U = \\tfrac{1}{2} \\sum_{i\\ne j} k q_i q_j / r_{ij}$.',
        'Recognize the inner sum as $V_i$, the potential at charge $i$ due to all others: $V_i = \\sum_{j\\ne i} k q_j / r_{ij}$.',
        'So $U = \\tfrac{1}{2} \\sum_i q_i V_i$. The $\\tfrac{1}{2}$ avoids double-counting pairs.',
      ],
    },
    {
      prompt: 'A $1\\,\\mu\\text{F}$ capacitor at $100\\,\\text{V}$ is connected in parallel with an uncharged $2\\,\\mu\\text{F}$. Find the final voltage and the energy lost.',
      answer: 'Final voltage $\\approx 33.3\\,\\text{V}$. Energy lost $\\approx 3.3\\,\\text{mJ}$ (two-thirds of the original $5\\,\\text{mJ}$).',
      steps: [
        'Conservation of charge: $Q = C_1 V_0 = (10^{-6})(100) = 10^{-4}\\,\\text{C}$.',
        'After connection, total $C = 3\\,\\mu\\text{F}$, so $V = Q/C = 10^{-4}/(3\\times 10^{-6}) \\approx 33.3\\,\\text{V}$.',
        'Initial energy: $\\tfrac{1}{2} C_1 V_0^2 = 5\\,\\text{mJ}$.',
        'Final energy: $\\tfrac{1}{2} C V^2 = \\tfrac{1}{2}(3\\times 10^{-6})(1111) \\approx 1.67\\,\\text{mJ}$.',
        'Energy lost (to resistive dissipation and radiation during the switch-close): $\\approx 3.33\\,\\text{mJ}$.',
      ],
    },
  ];

  PS.registerTopic("phys-em-coulomb", {
    title: "Coulomb's law and electric fields",
    description: "Point-charge forces, superposition, and the electric field.",
    warmup: COULOMB_WARMUP,
    standard: COULOMB_STANDARD,
    challenge: COULOMB_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-em-gauss
  // ============================================================
  var GAUSS_WARMUP = [
    {
      prompt: 'State Gauss\'s law in words.',
      answer: 'The net electric flux through any closed surface equals the total enclosed charge divided by $\\epsilon_0$.',
      steps: [
        '$\\oint \\vec E \\cdot d\\vec A = Q_{\\text{enc}}/\\epsilon_0$.',
        'The integral is over any closed surface (a "Gaussian surface"); the charge is whatever is inside it.',
      ],
    },
    {
      prompt: 'What flux passes through a closed surface enclosing $2\\,\\text{C}$ of charge?',
      answer: '$\\Phi \\approx 2.26\\times 10^{11}\\,\\text{V·m}$',
      steps: [
        '$\\Phi = Q/\\epsilon_0 = 2/(8.854\\times 10^{-12}) \\approx 2.26\\times 10^{11}\\,\\text{V·m}$.',
      ],
    },
    {
      prompt: 'An infinite line of charge with linear density $\\lambda$ produces what electric field at distance $r$?',
      answer: '$E = \\lambda / (2\\pi\\epsilon_0 r)$',
      steps: [
        'Use a cylindrical Gaussian surface of radius $r$, length $L$.',
        'Flux through the curved surface: $E \\cdot 2\\pi r L$.',
        'Charge enclosed: $\\lambda L$.',
        'Gauss: $E(2\\pi r L) = \\lambda L/\\epsilon_0$, so $E = \\lambda/(2\\pi\\epsilon_0 r)$.',
      ],
    },
    {
      prompt: 'An infinite sheet with surface charge density $\\sigma$ produces what field?',
      answer: '$E = \\sigma / (2\\epsilon_0)$ on each side, perpendicular to the sheet.',
      steps: [
        'Use a pillbox Gaussian surface with faces of area $A$ on each side.',
        'Flux through both faces: $2 E A$ (field points outward on both sides).',
        'Charge enclosed: $\\sigma A$.',
        '$2 E A = \\sigma A / \\epsilon_0$, so $E = \\sigma/(2\\epsilon_0)$.',
      ],
    },
  ];

  var GAUSS_STANDARD = [
    {
      prompt: 'A solid conducting sphere of radius $R$ carries total charge $Q$. Find $E(r)$ both inside and outside.',
      answer: 'Inside: $E = 0$. Outside ($r > R$): $E = k Q / r^2$.',
      steps: [
        'Inside a conductor in electrostatic equilibrium, $E = 0$. A Gaussian surface at $r < R$ encloses zero charge.',
        'All the charge $Q$ sits on the surface.',
        'For $r > R$: flux through a sphere of radius $r$ is $E \\cdot 4\\pi r^2 = Q/\\epsilon_0$.',
        'So $E = Q/(4\\pi\\epsilon_0 r^2) = k Q / r^2$. Same as a point charge at the center.',
      ],
    },
    {
      prompt: 'A uniformly charged solid insulating sphere of radius $R$ and total charge $Q$. Find $E(r)$ for $r < R$.',
      answer: '$E = k Q r / R^3$, linear in $r$.',
      steps: [
        'Volume charge density: $\\rho = Q / (\\tfrac{4}{3}\\pi R^3)$.',
        'Enclosed charge in sphere of radius $r$: $Q_{\\text{enc}} = \\rho \\cdot \\tfrac{4}{3}\\pi r^3 = Q (r/R)^3$.',
        'Gauss: $E \\cdot 4\\pi r^2 = Q(r/R)^3/\\epsilon_0$.',
        '$E = Q r/(4\\pi\\epsilon_0 R^3) = k Q r / R^3$.',
        'So $E$ grows linearly inside and falls as $1/r^2$ outside, matching at $r = R$.',
      ],
    },
    {
      prompt: 'A coaxial cable has an inner cylinder of radius $a$ with charge per unit length $+\\lambda$ and an outer shell at radius $b$ with $-\\lambda$. Find the field in each region.',
      answer: 'Inside ($r < a$): $0$. Between ($a < r < b$): $\\lambda/(2\\pi\\epsilon_0 r)$ outward. Outside ($r > b$): $0$.',
      steps: [
        'For $r < a$, Gaussian cylinder encloses no charge.',
        'For $a < r < b$, encloses only the inner $+\\lambda L$, giving $E = \\lambda/(2\\pi\\epsilon_0 r)$.',
        'For $r > b$, enclosed charge is $(\\lambda - \\lambda) L = 0$, so $E = 0$.',
        'This is why coaxial cables shield their signals — the field is confined to the dielectric gap.',
      ],
    },
    {
      prompt: 'Two large parallel plates carry equal and opposite surface charge densities $\\pm\\sigma$. Find the field between them.',
      answer: '$E = \\sigma/\\epsilon_0$, directed from the positive to the negative plate.',
      steps: [
        'Each sheet alone produces $E = \\sigma/(2\\epsilon_0)$ on both sides.',
        'Between the plates, the fields from the two sheets point in the same direction and add.',
        'Total: $E = \\sigma/\\epsilon_0$.',
        'Outside the plates the fields cancel.',
      ],
    },
    {
      prompt: 'A spherical conductor of radius $R$ has a cavity inside containing a point charge $+q$. What charge appears on the outer surface?',
      answer: '$+q$ on the outer surface (regardless of cavity position).',
      steps: [
        'Inside the bulk of the conductor, $E = 0$, so a Gaussian surface inside the metal encloses zero net charge.',
        'That forces the cavity wall to carry $-q$ (to cancel the enclosed $+q$).',
        'Charge conservation: the outer surface must carry $+q$ to keep the conductor\'s total charge neutral.',
        'This is the basis of shielding — external fields do not feel internal charges and vice versa.',
      ],
    },
  ];

  var GAUSS_CHALLENGE = [
    {
      prompt: 'Use Gauss\'s law to derive that the electric field just outside any conductor is $E = \\sigma/\\epsilon_0$, where $\\sigma$ is the local surface charge density.',
      answer: 'Derived below.',
      steps: [
        'Construct a pillbox straddling the surface, one face inside, one outside, area $A$.',
        'Inside the conductor, $E = 0$, so no flux through the inner face.',
        'Outside, field is normal to the surface (tangential component would push charges along the surface until it vanished).',
        'Flux through outer face: $E A$. Enclosed charge: $\\sigma A$.',
        'Gauss: $E A = \\sigma A / \\epsilon_0$, so $E = \\sigma/\\epsilon_0$.',
      ],
    },
    {
      prompt: 'A slab of thickness $2 d$ has uniform volume charge density $\\rho$. Find the electric field everywhere.',
      answer: 'Inside the slab ($|z| < d$): $E(z) = \\rho z / \\epsilon_0$. Outside: $E = \\pm \\rho d / \\epsilon_0$.',
      steps: [
        'Take the slab centered on $z = 0$, symmetric.',
        'Use a pillbox with one face at $z = 0$ (where $E = 0$ by symmetry) and the other at height $z$ inside the slab.',
        'Flux: $E(z) \\cdot A$. Enclosed: $\\rho A z$.',
        'Gauss: $E(z) = \\rho z / \\epsilon_0$ for $|z| < d$.',
        'Outside the slab, no more charge is enclosed as $|z|$ grows, so $E$ stays at $\\rho d/\\epsilon_0$.',
      ],
    },
    {
      prompt: 'A point charge $q$ sits at the center of a hollow conducting sphere (inner radius $a$, outer radius $b$), with the shell carrying total charge $-q/2$. Find the charge on each surface and $E$ in each region.',
      answer: 'Inner surface: $-q$. Outer surface: $+q/2$. Fields: for $r<a$, $kq/r^2$; for $a<r<b$, $0$; for $r>b$, $k(q/2)/r^2$.',
      steps: [
        'Inside the metal, $E = 0$. A Gaussian sphere with $a < r < b$ encloses the point charge plus inner-surface charge, so inner surface must carry $-q$.',
        'Shell total is $-q/2$; since inner is $-q$, outer must be $+q/2$.',
        'For $r < a$: only the point charge contributes, $E = kq/r^2$.',
        'For $a < r < b$: inside the metal, $E = 0$.',
        'For $r > b$: enclosed total is $q - q + q/2 = q/2$, so $E = k(q/2)/r^2$.',
      ],
    },
  ];

  PS.registerTopic("phys-em-gauss", {
    title: "Gauss's law and symmetry",
    description: "Using Gauss's law to compute fields in highly symmetric geometries.",
    warmup: GAUSS_WARMUP,
    standard: GAUSS_STANDARD,
    challenge: GAUSS_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-em-induction
  // ============================================================
  var IND_WARMUP = [
    {
      prompt: 'State Faraday\'s law in words.',
      answer: 'The EMF induced in a closed loop equals the negative rate of change of magnetic flux through the loop.',
      steps: [
        '$\\mathcal{E} = -d\\Phi_B/dt$.',
        'The minus sign is Lenz\'s law: induced currents oppose the change that caused them.',
      ],
    },
    {
      prompt: 'A $100$-turn coil has a magnetic flux through it that changes from $0$ to $0.02\\,\\text{Wb}$ in $0.1\\,\\text{s}$. What is the induced EMF?',
      answer: '$20\\,\\text{V}$',
      steps: [
        '$\\mathcal{E} = -N d\\Phi/dt = -100 \\cdot (0.02/0.1) = -20\\,\\text{V}$.',
        'Magnitude is $20\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'A $5\\,\\text{H}$ inductor has current rising at $2\\,\\text{A/s}$. What voltage appears across it?',
      answer: '$10\\,\\text{V}$',
      steps: [
        '$V = L \\, dI/dt = 5 \\cdot 2 = 10\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'A magnet is dropped through a copper tube. Why does it fall slower than in free space?',
      answer: 'Changing flux in the tube induces eddy currents that oppose the magnet\'s motion (Lenz\'s law).',
      steps: [
        'Faraday: moving magnet creates a changing flux in loops of the tube wall.',
        'Induced current flows in those loops.',
        'Lenz: the current produces a magnetic field opposing the motion — braking the magnet.',
      ],
    },
  ];

  var IND_STANDARD = [
    {
      prompt: 'A rod of length $L = 0.5\\,\\text{m}$ moves at $v = 4\\,\\text{m/s}$ perpendicular to a field $B = 0.2\\,\\text{T}$. What is the motional EMF across the rod?',
      answer: '$0.4\\,\\text{V}$',
      steps: [
        '$\\mathcal{E} = B L v = 0.2 \\cdot 0.5 \\cdot 4 = 0.4\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'A square loop of side $0.1\\,\\text{m}$ lies in a uniform field $B = 0.5\\,\\text{T}$ parallel to its normal. The field is reduced to zero in $0.01\\,\\text{s}$. Find the induced EMF.',
      answer: '$0.5\\,\\text{V}$',
      steps: [
        'Initial flux: $\\Phi = BA = 0.5 \\cdot 0.01 = 5\\times 10^{-3}\\,\\text{Wb}$.',
        '$|\\mathcal{E}| = \\Delta\\Phi/\\Delta t = 5\\times 10^{-3}/10^{-2} = 0.5\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'A solenoid has $n = 1000\\,\\text{turns/m}$ and radius $2\\,\\text{cm}$. A current $I = 2\\,\\text{A}$ flows. What is $B$ inside?',
      answer: '$\\approx 2.5\\times 10^{-3}\\,\\text{T}$',
      steps: [
        '$B = \\mu_0 n I = (4\\pi\\times 10^{-7})(1000)(2)$.',
        '$\\approx 2.513\\times 10^{-3}\\,\\text{T}$.',
      ],
    },
    {
      prompt: 'A $10\\,\\text{mH}$ inductor carries $2\\,\\text{A}$. How much energy is stored in its magnetic field?',
      answer: '$0.02\\,\\text{J}$',
      steps: [
        '$U = \\tfrac{1}{2} L I^2 = \\tfrac{1}{2}(10^{-2})(4) = 2\\times 10^{-2}\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A transformer has $N_p = 1000$ turns on the primary and $N_s = 100$ on the secondary. If the primary sees $120\\,\\text{V}$ AC, what does the secondary put out?',
      answer: '$12\\,\\text{V}$',
      steps: [
        'Turn ratio: $V_s / V_p = N_s / N_p$.',
        '$V_s = 120 \\cdot (100/1000) = 12\\,\\text{V}$.',
      ],
    },
    {
      prompt: 'A bar magnet moves toward a loop. Does the induced current in the loop flow clockwise or counterclockwise as viewed from the magnet\'s approach side? (Assume the magnet\'s N pole faces the loop.)',
      answer: 'Counterclockwise as viewed from the magnet.',
      steps: [
        'Flux through the loop (in the direction the magnet is moving) is increasing.',
        'Lenz: induced current must create a field opposing this increase.',
        'By the right-hand rule, that current flows counterclockwise as seen from the magnet, creating an "N-pole" facing the incoming magnet and repelling it.',
      ],
    },
    {
      prompt: 'An RL circuit: $R = 4\\,\\Omega$, $L = 2\\,\\text{H}$, battery $12\\,\\text{V}$. What is the time constant, and what is the steady-state current?',
      answer: 'Time constant $\\tau = 0.5\\,\\text{s}$; steady-state $I = 3\\,\\text{A}$.',
      steps: [
        '$\\tau = L/R = 2/4 = 0.5\\,\\text{s}$.',
        'Steady state: $I_\\infty = V/R = 12/4 = 3\\,\\text{A}$.',
      ],
    },
  ];

  var IND_CHALLENGE = [
    {
      prompt: 'A rod of mass $m$ and length $L$ slides along two frictionless parallel rails in a uniform magnetic field $B$ perpendicular to the plane. The rails are connected by a resistor $R$. The rod is given initial velocity $v_0$. Find $v(t)$.',
      answer: '$v(t) = v_0 \\exp(-B^2 L^2 t/(m R))$',
      steps: [
        'Motional EMF: $\\mathcal{E} = B L v$.',
        'Current: $I = \\mathcal{E}/R = BLv/R$.',
        'Force on rod from field: $F = -I L B = -B^2 L^2 v/R$ (opposing motion).',
        'Newton\'s 2nd law: $m \\, dv/dt = -B^2 L^2 v/R$.',
        'Solve: $v(t) = v_0 e^{-t/\\tau}$ with $\\tau = mR/(B^2 L^2)$.',
      ],
    },
    {
      prompt: 'Show that the energy dissipated by the resistor in the previous problem equals the rod\'s initial kinetic energy.',
      answer: 'Verified below.',
      steps: [
        'Power dissipated: $P = I^2 R = (BLv)^2/R = B^2 L^2 v^2/R$.',
        'Total energy: $E = \\int_0^\\infty P \\,dt = (B^2 L^2 / R) \\int_0^\\infty v_0^2 e^{-2 t/\\tau} dt$.',
        'Integral: $(v_0^2)(\\tau/2) = v_0^2 (mR)/(2 B^2 L^2)$.',
        'Multiply: $E = (B^2 L^2/R) \\cdot v_0^2 m R/(2 B^2 L^2) = \\tfrac{1}{2} m v_0^2$.',
        'Exactly the initial KE — energy is conserved, transferred from motion to heat.',
      ],
    },
    {
      prompt: 'Derive the self-inductance of a long solenoid of length $\\ell$, cross-section $A$, with $N$ total turns.',
      answer: '$L = \\mu_0 N^2 A / \\ell$',
      steps: [
        '$B$ inside: $\\mu_0 (N/\\ell) I$.',
        'Flux through one turn: $\\Phi_1 = B A = \\mu_0 N A I / \\ell$.',
        'Total flux linkage: $N\\Phi_1 = \\mu_0 N^2 A I / \\ell$.',
        'Definition: $L = (\\text{flux linkage})/I = \\mu_0 N^2 A / \\ell$.',
      ],
    },
    {
      prompt: 'Calculate the energy stored per unit volume in a magnetic field $B$.',
      answer: '$u = B^2/(2\\mu_0)$',
      steps: [
        'Consider a solenoid of volume $V = A\\ell$.',
        'Stored energy: $U = \\tfrac{1}{2} L I^2 = \\tfrac{1}{2}(\\mu_0 N^2 A/\\ell) I^2$.',
        'But $B = \\mu_0 N I / \\ell$, so $I = B\\ell/(\\mu_0 N)$.',
        'Substitute: $U = \\tfrac{1}{2} (\\mu_0 N^2 A/\\ell)(B\\ell/\\mu_0 N)^2 = \\tfrac{1}{2}(B^2 A \\ell)/\\mu_0 = V B^2/(2\\mu_0)$.',
        'Energy per volume: $u = B^2/(2\\mu_0)$.',
      ],
    },
  ];

  PS.registerTopic("phys-em-induction", {
    title: "Faraday's law and induction",
    description: "Motional EMF, Lenz's law, inductors, and transformers.",
    warmup: IND_WARMUP,
    standard: IND_STANDARD,
    challenge: IND_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-em-maxwell
  // ============================================================
  var MAX_WARMUP = [
    {
      prompt: 'Name the four Maxwell equations in differential form (just names, not the equations).',
      answer: 'Gauss\'s law for $\\vec E$; Gauss\'s law for $\\vec B$ (no magnetic monopoles); Faraday\'s law; Ampère-Maxwell law.',
      steps: [
        'Gauss for $\\vec E$: $\\nabla\\cdot\\vec E = \\rho/\\epsilon_0$.',
        'Gauss for $\\vec B$: $\\nabla\\cdot\\vec B = 0$.',
        'Faraday: $\\nabla\\times\\vec E = -\\partial\\vec B/\\partial t$.',
        'Ampère-Maxwell: $\\nabla\\times\\vec B = \\mu_0\\vec J + \\mu_0\\epsilon_0 \\partial\\vec E/\\partial t$.',
      ],
    },
    {
      prompt: 'The speed of light in vacuum is related to $\\epsilon_0$ and $\\mu_0$ how?',
      answer: '$c = 1/\\sqrt{\\mu_0 \\epsilon_0}$',
      steps: [
        'Maxwell derived this by taking the curl of Faraday and substituting Ampère-Maxwell.',
        'The wave equation that falls out has speed $1/\\sqrt{\\mu_0 \\epsilon_0} \\approx 3\\times 10^8\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'Radio waves of frequency $1\\,\\text{MHz}$ have what wavelength in vacuum?',
      answer: '$300\\,\\text{m}$',
      steps: [
        '$\\lambda = c/f = (3\\times 10^8)/(10^6) = 300\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'In an EM wave, the electric field amplitude is $E_0 = 30\\,\\text{V/m}$. What is the magnetic field amplitude?',
      answer: '$B_0 = 10^{-7}\\,\\text{T}$',
      steps: [
        '$E/B = c$, so $B_0 = E_0/c = 30/(3\\times 10^8) = 10^{-7}\\,\\text{T}$.',
      ],
    },
  ];

  var MAX_STANDARD = [
    {
      prompt: 'What is the physical meaning of Maxwell\'s displacement current term $\\mu_0\\epsilon_0 \\partial\\vec E/\\partial t$?',
      answer: 'A changing electric field acts as a source of magnetic field, just like a current does. Without it, Maxwell\'s equations would be inconsistent during, e.g., capacitor charging.',
      steps: [
        'Without the term, Ampère\'s law says $\\nabla\\times\\vec B = \\mu_0 \\vec J$.',
        'Take divergence: $0 = \\mu_0\\nabla\\cdot\\vec J$, which requires $\\nabla\\cdot\\vec J = 0$ always.',
        'But continuity $\\partial\\rho/\\partial t + \\nabla\\cdot\\vec J = 0$ allows $\\nabla\\cdot\\vec J \\ne 0$ when charge accumulates.',
        'Maxwell\'s correction: add $\\mu_0\\epsilon_0 \\partial\\vec E/\\partial t$ so the divergence of the right side always vanishes.',
        'As a bonus, this term produces EM waves.',
      ],
    },
    {
      prompt: 'Show that the average intensity (power per area) of a plane EM wave in vacuum is $I = \\tfrac{1}{2} c \\epsilon_0 E_0^2$.',
      answer: 'Derived below.',
      steps: [
        'Poynting vector: $\\vec S = (1/\\mu_0) \\vec E \\times \\vec B$.',
        'For a plane wave, $B = E/c$, so $S = E B/\\mu_0 = E^2 /(c\\mu_0) = c\\epsilon_0 E^2$ (using $c^2 = 1/(\\mu_0\\epsilon_0)$).',
        'Time-average $\\langle E^2 \\rangle = E_0^2/2$ for a sinusoidal wave.',
        '$I = \\langle S\\rangle = \\tfrac{1}{2} c\\epsilon_0 E_0^2$.',
      ],
    },
    {
      prompt: 'The average intensity of sunlight at Earth\'s surface is about $1000\\,\\text{W/m}^2$. Estimate the electric field amplitude.',
      answer: '$E_0 \\approx 870\\,\\text{V/m}$',
      steps: [
        'Use $I = \\tfrac{1}{2} c\\epsilon_0 E_0^2$.',
        'Solve: $E_0 = \\sqrt{2 I/(c\\epsilon_0)}$.',
        '$E_0 = \\sqrt{2000/((3\\times 10^8)(8.854\\times 10^{-12}))} = \\sqrt{2000/(2.656\\times 10^{-3})}$.',
        '$= \\sqrt{7.53\\times 10^5} \\approx 868\\,\\text{V/m}$.',
      ],
    },
    {
      prompt: 'Show that the radiation pressure on a perfectly absorbing surface is $P_{\\text{rad}} = I/c$.',
      answer: 'Derived below.',
      steps: [
        'An EM wave carries momentum density $S/c^2$.',
        'Over area $A$ and time $dt$, momentum delivered is $(S/c^2)\\cdot c\\cdot A\\,dt = (S/c) A\\,dt$.',
        'Force: $F = dp/dt = S A / c$.',
        'Pressure: $P = F/A = S/c = I/c$.',
      ],
    },
    {
      prompt: 'Radio wave with $E_0 = 20\\,\\text{V/m}$. Find its intensity and the force on a $1\\,\\text{m}^2$ absorbing sheet.',
      answer: 'Intensity $\\approx 0.53\\,\\text{W/m}^2$; force $\\approx 1.77\\times 10^{-9}\\,\\text{N}$.',
      steps: [
        '$I = \\tfrac{1}{2} c\\epsilon_0 E_0^2 = \\tfrac{1}{2}(3\\times 10^8)(8.854\\times 10^{-12})(400) \\approx 0.531\\,\\text{W/m}^2$.',
        '$F = I A / c = 0.531/(3\\times 10^8) \\approx 1.77\\times 10^{-9}\\,\\text{N}$.',
        'Radiation pressure is tiny, but it is why solar sails work.',
      ],
    },
    {
      prompt: 'A GPS satellite transmits at about $1.5\\,\\text{GHz}$. What is the wavelength?',
      answer: '$\\approx 0.20\\,\\text{m}$',
      steps: [
        '$\\lambda = c/f = (3\\times 10^8)/(1.5\\times 10^9) = 0.2\\,\\text{m}$.',
      ],
    },
  ];

  var MAX_CHALLENGE = [
    {
      prompt: 'Starting from Maxwell\'s equations in vacuum (no sources), derive the wave equation for $\\vec E$.',
      answer: 'Derived below.',
      steps: [
        'Take the curl of Faraday\'s law: $\\nabla\\times(\\nabla\\times\\vec E) = -\\partial(\\nabla\\times\\vec B)/\\partial t$.',
        'Use Ampère-Maxwell without sources: $\\nabla\\times\\vec B = \\mu_0\\epsilon_0 \\partial\\vec E/\\partial t$.',
        'Substitute: $\\nabla\\times(\\nabla\\times\\vec E) = -\\mu_0\\epsilon_0 \\partial^2\\vec E/\\partial t^2$.',
        'Use the identity $\\nabla\\times(\\nabla\\times\\vec E) = \\nabla(\\nabla\\cdot\\vec E) - \\nabla^2\\vec E$. Since $\\nabla\\cdot\\vec E = 0$ in vacuum, this becomes $-\\nabla^2\\vec E$.',
        'So $\\nabla^2\\vec E = \\mu_0\\epsilon_0 \\partial^2\\vec E/\\partial t^2$.',
        'This is the wave equation with speed $1/\\sqrt{\\mu_0\\epsilon_0} = c$.',
      ],
    },
    {
      prompt: 'Show that the Coulomb and Biot-Savart laws imply $\\nabla\\cdot\\vec E = \\rho/\\epsilon_0$ and $\\nabla\\cdot\\vec B = 0$ respectively.',
      answer: 'Sketch below.',
      steps: [
        'Coulomb: $\\vec E = (k/r^2)\\hat r$ for a point charge; take divergence.',
        'Divergence of $\\hat r / r^2$ is $4\\pi\\delta^3(\\vec r)$ (a distribution).',
        'Multiply by source $k q$ and generalize: $\\nabla\\cdot\\vec E = \\rho/\\epsilon_0$.',
        'For $\\vec B$: Biot-Savart builds $\\vec B$ from a curl of an integral involving $\\vec J$.',
        'Divergence of a curl is identically zero, so $\\nabla\\cdot\\vec B = 0$ automatically.',
      ],
    },
    {
      prompt: 'An electromagnetic wave propagates in the $+x$ direction with $\\vec E = E_0 \\hat y \\cos(kx - \\omega t)$. What is $\\vec B$?',
      answer: '$\\vec B = (E_0/c) \\hat z \\cos(kx - \\omega t)$',
      steps: [
        'Plane waves in vacuum have $\\vec E \\perp \\vec B \\perp \\vec k$.',
        'Right-hand rule: $\\hat k \\times \\hat E$ gives the direction of $\\hat B$. With $\\hat k = \\hat x$ and $\\hat E = \\hat y$, $\\hat B = \\hat z$.',
        'Amplitudes: $B_0 = E_0/c$.',
        'Same phase as $\\vec E$: in-phase oscillation.',
      ],
    },
    {
      prompt: 'Estimate the power radiated by a $100\\,\\text{W}$ light bulb that reaches a $1\\,\\text{m}^2$ target $2\\,\\text{m}$ away, assuming isotropic emission.',
      answer: '$\\approx 2\\,\\text{W}$',
      steps: [
        'Isotropic radiation: power per area at distance $r$ is $P/(4\\pi r^2)$.',
        '$I = 100/(4\\pi \\cdot 4) = 100/(50.3) \\approx 1.99\\,\\text{W/m}^2$.',
        'Power on $1\\,\\text{m}^2$: $\\approx 2\\,\\text{W}$.',
        'Of course a real bulb radiates mostly infrared; only $\\sim 5\\%$ is visible.',
      ],
    },
  ];

  PS.registerTopic("phys-em-maxwell", {
    title: "Maxwell's equations and EM waves",
    description: "The full theory of electromagnetism and what comes out of it.",
    warmup: MAX_WARMUP,
    standard: MAX_STANDARD,
    challenge: MAX_CHALLENGE,
  });

})();
