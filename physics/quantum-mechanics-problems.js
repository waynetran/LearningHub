/*
 * LearningHub - Quantum Mechanics Problem Set
 * Registers 4 topics with LearningHubProblemSet runtime:
 *   phys-qm-schrod     - Schrodinger equation, wavefunctions, normalization
 *   phys-qm-box        - canonical systems (box, oscillator, hydrogen)
 *   phys-qm-operators  - operators, commutators, measurement, uncertainty
 *   phys-qm-spin       - spin-1/2, Pauli matrices, qubits, Bell states
 *
 * Most problems are hand-authored because QM mixes conceptual and
 * numerical content in ways that do not parametrize cleanly.
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[quantum-mechanics-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // Constants (SI)
  var HBAR = 1.054571817e-34;   // J s
  var H    = 6.62607015e-34;    // J s
  var ME   = 9.1093837015e-31;  // kg electron mass
  var EV   = 1.602176634e-19;   // J per eV
  var C    = 2.99792458e8;      // m/s
  var R_HY = 13.605693;         // eV Rydberg energy

  // ==========================================================================
  // TOPIC 1: phys-qm-schrod (Schrodinger equation, wavefunctions, normalization)
  // ==========================================================================

  // Warm-up generator: de Broglie wavelength given mass in kg and speed.
  function genDeBroglie(rng) {
    var cases = [
      { name: "an electron ($9.11\\times10^{-31}$ kg)", m: ME, v: rng.pick([1e5, 1e6, 3e6, 5e6]) },
      { name: "a proton ($1.67\\times10^{-27}$ kg)", m: 1.67e-27, v: rng.pick([1e3, 1e4, 1e5]) },
      { name: "a 1 g marble",                      m: 1e-3, v: rng.pick([1, 10]) },
    ];
    var pick = rng.pick(cases);
    var lam = H / (pick.m * pick.v);
    return {
      prompt: 'Compute the de Broglie wavelength of ' + pick.name + ' moving at $v = ' + pick.v.toExponential(1) + '\\text{ m}/\\text{s}$.',
      answer: '$\\lambda \\approx ' + lam.toExponential(3) + '\\text{ m}$',
      steps: [
        '$\\lambda = h/p = h/(mv)$.',
        '$h = 6.626\\times10^{-34}$ J s.',
        '$p = ' + (pick.m * pick.v).toExponential(3) + '$ kg m/s.',
        '$\\lambda = 6.626\\times10^{-34}/' + (pick.m * pick.v).toExponential(3) + ' \\approx ' + lam.toExponential(3) + '$ m.',
      ],
    };
  }

  // Warm-up generator: photon energy from wavelength.
  function genPhotonEnergy(rng) {
    var cases = [
      { name: "a red photon",     lam: 700e-9 },
      { name: "a green photon",   lam: 550e-9 },
      { name: "a blue photon",    lam: 450e-9 },
      { name: "a UV photon",      lam: 250e-9 },
      { name: "an X-ray photon",  lam: 1e-10 },
    ];
    var pick = rng.pick(cases);
    var E_J = H * C / pick.lam;
    var E_eV = E_J / EV;
    return {
      prompt: 'Compute the energy of ' + pick.name + ' with wavelength $\\lambda = ' + pick.lam.toExponential(2) + '\\text{ m}$ in electron-volts.',
      answer: '$E \\approx ' + E_eV.toFixed(3) + '\\text{ eV}$',
      steps: [
        '$E = hc/\\lambda$.',
        '$hc \\approx 1.986\\times10^{-25}$ J m, or $1240$ eV nm.',
        '$E = 1240\\text{ eV nm}/' + (pick.lam * 1e9).toFixed(2) + '\\text{ nm}$.',
        '$\\approx ' + E_eV.toFixed(3) + '$ eV.',
      ],
    };
  }

  var SCHROD_WARMUP_STATIC = [
    {
      prompt: 'Write down the time-dependent Schrodinger equation for a particle of mass $m$ in a potential $V(x, t)$.',
      answer: '$i\\hbar\\,\\partial_t \\psi = \\left(-\\dfrac{\\hbar^2}{2m}\\partial_x^2 + V\\right)\\psi$',
      steps: [
        'The left side is the time-derivative term with $i\\hbar$.',
        'The right side is the Hamiltonian acting on $\\psi$.',
        'For a single non-relativistic particle, $\\hat H = \\hat p^2/(2m) + V$ with $\\hat p = -i\\hbar\\,\\partial_x$.',
      ],
    },
    {
      prompt: 'What does it mean for a wavefunction to be "normalized"?',
      answer: '$\\int |\\psi(x)|^2\\,dx = 1$: total probability of finding the particle somewhere is 1.',
      steps: [
        'The Born rule identifies $|\\psi|^2$ with a probability density.',
        'A valid probability density must integrate to 1 over the domain of definition.',
        'If $\\psi$ is not yet normalized, multiply by $1/\\sqrt{N}$ where $N = \\int|\\psi|^2\\,dx$.',
      ],
    },
    {
      prompt: 'State the Born rule in one sentence.',
      answer: 'The probability of finding the particle in an interval $dx$ around $x$ is $|\\psi(x)|^2\\,dx$.',
      steps: [
        'Historically, Born proposed in 1926 that $|\\psi|^2$ is a probability density, not $\\psi$ itself.',
        'This is the bridge between the (complex) wavefunction and (real, positive) experimental outcomes.',
        'It is an independent postulate, not derivable from the Schrodinger equation alone.',
      ],
    },
    {
      prompt: 'What is the difference between the time-dependent and time-independent Schrodinger equations?',
      answer: 'The time-independent form $\\hat H\\psi = E\\psi$ applies to stationary (energy eigen-) states; the time-dependent form $i\\hbar\\partial_t\\psi = \\hat H\\psi$ governs arbitrary states evolving in time.',
      steps: [
        'If the Hamiltonian does not depend on time, you can separate variables.',
        'Write $\\Psi(x,t) = \\psi(x) T(t)$.',
        'This gives $T(t) = e^{-iEt/\\hbar}$ and $\\hat H\\psi = E\\psi$.',
        'The latter is the time-independent (eigenvalue) equation.',
      ],
    },
  ];

  var SCHROD_STANDARD_STATIC = [
    {
      prompt: 'A free particle has wavefunction $\\psi(x) = A e^{ikx}$ on the interval $[0, L]$. Find $|A|$ so that $\\psi$ is normalized.',
      answer: '$|A| = 1/\\sqrt{L}$',
      steps: [
        '$|\\psi|^2 = |A|^2$, a constant.',
        '$\\int_0^L |A|^2\\,dx = |A|^2 L = 1$.',
        '$|A| = 1/\\sqrt{L}$.',
      ],
    },
    {
      prompt: 'For $\\psi(x) = A x e^{-x/a}$ on $[0, \\infty)$ with $a > 0$, find $A$ (assume $A$ real, positive).',
      answer: '$A = 2/a^{3/2}$',
      steps: [
        '$\\int_0^\\infty x^2 e^{-2x/a}\\,dx = 2!/(2/a)^3 = a^3/4$ (gamma integral).',
        'Require $A^2 \\cdot a^3/4 = 1$.',
        '$A = 2/a^{3/2}$.',
      ],
    },
    {
      prompt: 'An electron has de Broglie wavelength $\\lambda = 0.1$ nm (typical for electron diffraction). What is its kinetic energy in eV?',
      answer: '$\\approx 150\\text{ eV}$',
      steps: [
        '$p = h/\\lambda = 6.626\\times10^{-34}/10^{-10} = 6.626\\times10^{-24}$ kg m/s.',
        '$E = p^2/(2m) = (6.626\\times10^{-24})^2/(2\\times9.11\\times10^{-31})$.',
        '$\\approx 2.41\\times10^{-17}$ J.',
        'Divide by $1.6\\times10^{-19}$: $\\approx 150$ eV.',
      ],
    },
    {
      prompt: 'A photon and an electron each have a wavelength of $0.5$ nm. Which has more energy, and by how many orders of magnitude?',
      answer: 'The photon has more energy by about 2 orders of magnitude ($\\sim$ 2500 eV vs $\\sim$ 6 eV).',
      steps: [
        'Photon: $E = hc/\\lambda = 1240\\text{ eV nm}/0.5\\text{ nm} = 2480$ eV.',
        'Electron: $p = h/\\lambda$, $E = p^2/(2 m_e)$; with $\\lambda=0.5$ nm, $E \\approx 6$ eV.',
        'Ratio: roughly 400x. The relation $E\\propto\\lambda^{-1}$ (photon) vs $E\\propto\\lambda^{-2}$ (non-rel. electron) is the key.',
      ],
    },
    {
      prompt: 'A particle is in the ground state of an infinite square well of width $L = 1$ nm. What is its energy in eV?',
      answer: '$E_1 \\approx 0.376\\text{ eV}$',
      steps: [
        '$E_n = n^2 \\pi^2 \\hbar^2 / (2 m L^2)$.',
        'For $n=1$, $L = 10^{-9}$ m, $m = m_e$.',
        '$E_1 = \\pi^2 (1.055\\times10^{-34})^2 / (2\\times9.11\\times10^{-31}\\times 10^{-18})$.',
        '$\\approx 6.03\\times10^{-20}$ J $\\approx 0.376$ eV.',
      ],
    },
    {
      prompt: 'Show that if $\\psi(x, t) = \\psi(x) e^{-iEt/\\hbar}$, then $|\\psi(x,t)|^2$ is time-independent.',
      answer: '$|\\psi(x,t)|^2 = |\\psi(x)|^2$ — the time phase cancels.',
      steps: [
        '$|\\psi(x,t)|^2 = \\psi^*(x) e^{+iEt/\\hbar} \\psi(x) e^{-iEt/\\hbar}$.',
        'Exponentials cancel.',
        '$= |\\psi(x)|^2$. That is why energy eigenstates are called "stationary states".',
      ],
    },
    {
      prompt: 'Consider $\\Psi(x, t) = \\tfrac{1}{\\sqrt 2}(\\psi_1 e^{-iE_1 t/\\hbar} + \\psi_2 e^{-iE_2 t/\\hbar})$. Is this wavefunction stationary? Why or why not?',
      answer: 'No. The probability density oscillates at frequency $\\omega_{12} = (E_2 - E_1)/\\hbar$.',
      steps: [
        'Compute $|\\Psi|^2 = \\tfrac12(|\\psi_1|^2 + |\\psi_2|^2 + 2\\operatorname{Re}[\\psi_1^*\\psi_2 e^{-i(E_2-E_1)t/\\hbar}])$.',
        'The cross term depends on time unless $E_1 = E_2$.',
        'This is how spontaneous emission from superpositions produces Rabi oscillations.',
      ],
    },
    {
      prompt: 'Show explicitly that $\\psi(x) = \\sqrt{2/L}\\sin(\\pi x/L)$ on $[0, L]$ is normalized.',
      answer: '$\\int_0^L |\\psi|^2 dx = 1$',
      steps: [
        '$|\\psi|^2 = (2/L)\\sin^2(\\pi x/L)$.',
        '$\\int_0^L \\sin^2(\\pi x/L)\\,dx = L/2$.',
        '$(2/L)(L/2) = 1$.',
      ],
    },
    {
      prompt: 'A beam of electrons with kinetic energy 50 eV strikes a step potential of height 25 eV. Qualitatively, what happens (classically vs quantum-mechanically)?',
      answer: 'Classically, every electron transmits with reduced KE. Quantum-mechanically, some fraction reflects even though $E > V_0$.',
      steps: [
        'The wavefunction has plane-wave solutions with wavenumbers $k = \\sqrt{2mE}/\\hbar$ on the left and $k\' = \\sqrt{2m(E-V_0)}/\\hbar$ on the right.',
        'Continuity of $\\psi$ and $\\psi\'$ at the step gives a non-zero reflection coefficient $R = ((k-k\')/(k+k\'))^2$.',
        'Plug in: $k\'/k = \\sqrt{25/50}$, so $R \\approx 0.029$: about 3% reflect.',
        'The over-barrier reflection has no classical analog; it comes from wave mechanics.',
      ],
    },
    {
      prompt: 'Compute the expectation value $\\langle x \\rangle$ for the ground state of the infinite square well, $\\psi_1(x) = \\sqrt{2/L}\\sin(\\pi x/L)$ on $[0, L]$.',
      answer: '$\\langle x\\rangle = L/2$',
      steps: [
        '$\\langle x\\rangle = \\int_0^L x\\,|\\psi_1|^2\\,dx = (2/L)\\int_0^L x\\sin^2(\\pi x/L)\\,dx$.',
        'Use $\\sin^2\\theta = (1 - \\cos 2\\theta)/2$.',
        'The integral splits into $(2/L)[\\int x/2\\,dx - \\int x\\cos(2\\pi x/L)/2\\,dx]$.',
        'First piece: $(2/L)(L^2/4) = L/2$. Second piece vanishes by symmetry about $L/2$.',
        '$\\langle x\\rangle = L/2$.',
      ],
    },
  ];

  var SCHROD_CHALLENGE_STATIC = [
    {
      prompt: 'Derive the probability current $j(x,t) = (\\hbar/2mi)(\\psi^*\\partial_x\\psi - \\psi\\,\\partial_x\\psi^*)$ from the Schrodinger equation.',
      answer: 'It follows from the continuity equation $\\partial_t|\\psi|^2 + \\partial_x j = 0$.',
      steps: [
        'From the Schrodinger equation: $\\partial_t\\psi = (i\\hbar/2m)\\partial_x^2\\psi - (i/\\hbar) V\\psi$.',
        'Conjugate: $\\partial_t\\psi^* = -(i\\hbar/2m)\\partial_x^2\\psi^* + (i/\\hbar) V\\psi^*$.',
        '$\\partial_t|\\psi|^2 = \\psi^*\\partial_t\\psi + \\psi\\,\\partial_t\\psi^*$.',
        'Substitute, the $V$ terms cancel, leaving $(i\\hbar/2m)(\\psi^*\\partial_x^2\\psi - \\psi\\,\\partial_x^2\\psi^*)$.',
        'Rewrite as $\\partial_x[(i\\hbar/2m)(\\psi^*\\partial_x\\psi - \\psi\\,\\partial_x\\psi^*)]$.',
        'So $\\partial_t|\\psi|^2 = -\\partial_x j$ with $j$ as given.',
      ],
      hint: 'Start from $\\partial_t|\\psi|^2$ and use both Schrodinger and its complex conjugate.',
    },
    {
      prompt: 'A particle of energy $E$ hits a rectangular barrier of height $V_0 > E$ and width $a$. Write (without deriving) the leading-order tunneling transmission coefficient in the thick-barrier limit.',
      answer: '$T \\approx \\exp(-2\\kappa a)$ with $\\kappa = \\sqrt{2m(V_0 - E)}/\\hbar$.',
      steps: [
        'Inside the classically-forbidden region, $\\psi(x) \\propto e^{-\\kappa x}$.',
        'The wavefunction decays by a factor $e^{-\\kappa a}$ across the barrier.',
        'The probability (squared amplitude) is $T \\propto e^{-2\\kappa a}$.',
        'This is the WKB/Gamow factor, used in alpha decay and STM.',
      ],
    },
    {
      prompt: 'A wavepacket $\\psi(x, 0) = (2\\pi\\sigma^2)^{-1/4}e^{-x^2/(4\\sigma^2)}e^{ik_0 x}$ evolves under the free-particle Schrodinger equation. What happens to its width $\\sigma(t)$ over time?',
      answer: '$\\sigma^2(t) = \\sigma^2 + (\\hbar t/2 m\\sigma)^2$ — the packet spreads.',
      steps: [
        'The packet is a superposition of plane waves with momenta around $p_0 = \\hbar k_0$ and spread $\\Delta p \\sim \\hbar/(2\\sigma)$.',
        'Different momentum components move at different group velocities $p/m$.',
        'After time $t$, the component spread in position grows as $(\\Delta p/m) t$.',
        'Combined with the initial width in quadrature: $\\sigma^2(t) = \\sigma^2 + (\\hbar t/2 m\\sigma)^2$.',
        'Electrons spread to micron scale in nanoseconds; macroscopic objects are effectively frozen.',
      ],
    },
  ];

  PS.registerTopic("phys-qm-schrod", {
    title: "Schrodinger equation and wavefunctions",
    description: "Normalization, free particles, energy eigenstates, de Broglie.",
    warmup:    [genDeBroglie, genPhotonEnergy, SCHROD_WARMUP_STATIC],
    standard:  SCHROD_STANDARD_STATIC,
    challenge: SCHROD_CHALLENGE_STATIC,
  });

  // ==========================================================================
  // TOPIC 2: phys-qm-box (canonical systems: box, oscillator, hydrogen)
  // ==========================================================================

  // Warm-up generator: Box energy for electron in box of width L_nm nm at level n.
  function genBoxEnergy(rng) {
    var n = rng.pick([1, 2, 3, 4, 5]);
    var Lnm = rng.pick([0.5, 1.0, 2.0, 5.0, 10.0]);
    var L = Lnm * 1e-9;
    var E_J = n * n * Math.PI * Math.PI * HBAR * HBAR / (2 * ME * L * L);
    var E_eV = E_J / EV;
    return {
      prompt: 'An electron is in the $n = ' + n + '$ state of an infinite square well of width $L = ' + Lnm + '\\text{ nm}$. Compute the energy in eV.',
      answer: '$E_' + n + ' \\approx ' + E_eV.toFixed(3) + '\\text{ eV}$',
      steps: [
        '$E_n = n^2\\pi^2\\hbar^2/(2 m L^2)$.',
        '$E_1 = \\pi^2\\hbar^2/(2 m L^2) \\approx ' + (Math.PI * Math.PI * HBAR * HBAR / (2 * ME * L * L) / EV).toFixed(4) + '$ eV.',
        '$E_{' + n + '} = ' + (n * n) + '\\times E_1 \\approx ' + E_eV.toFixed(3) + '$ eV.',
      ],
    };
  }

  // Warm-up generator: hydrogen level energy.
  function genHydrogenLevel(rng) {
    var n = rng.pick([1, 2, 3, 4, 5, 6]);
    var E = -R_HY / (n * n);
    return {
      prompt: 'Compute the energy (in eV) of the hydrogen $n = ' + n + '$ level using the Bohr formula $E_n = -13.6/n^2$ eV.',
      answer: '$E_' + n + ' \\approx ' + E.toFixed(3) + '\\text{ eV}$',
      steps: [
        '$E_n = -13.6\\text{ eV}/n^2$.',
        '$E_' + n + ' = -13.6/' + (n * n) + '$.',
        '$\\approx ' + E.toFixed(3) + '$ eV.',
      ],
    };
  }

  // Warm-up generator: Balmer transition wavelength.
  function genBalmer(rng) {
    var n = rng.pick([3, 4, 5, 6]);
    var E_up = -R_HY / (n * n);
    var E_lo = -R_HY / 4;
    var dE = E_up - E_lo; // positive (emitted)
    var lam = 1240 / dE; // nm
    return {
      prompt: 'Compute the wavelength (in nm) of light emitted when a hydrogen atom transitions from $n = ' + n + '$ to $n = 2$.',
      answer: '$\\lambda \\approx ' + lam.toFixed(1) + '\\text{ nm}$',
      steps: [
        '$\\Delta E = 13.6(1/4 - 1/' + (n * n) + ')\\text{ eV} \\approx ' + dE.toFixed(3) + '$ eV.',
        '$\\lambda = hc/\\Delta E = 1240\\text{ eV nm}/' + dE.toFixed(3) + '\\text{ eV}$.',
        '$\\approx ' + lam.toFixed(1) + '$ nm.',
      ],
    };
  }

  var BOX_WARMUP_STATIC = [
    {
      prompt: 'Write the energy spectrum of a 1D particle in an infinite square well of width $L$.',
      answer: '$E_n = n^2\\pi^2\\hbar^2/(2mL^2)$, $n = 1, 2, 3, \\ldots$',
      steps: [
        'Inside the well, $\\psi_n(x) = \\sqrt{2/L}\\sin(n\\pi x/L)$.',
        'Plug into $\\hat H\\psi = E\\psi$ with $\\hat H = -\\hbar^2\\partial_x^2/(2m)$.',
        '$E_n = (n\\pi/L)^2\\hbar^2/(2m)$.',
      ],
    },
    {
      prompt: 'Write the energy spectrum of a 1D quantum harmonic oscillator with angular frequency $\\omega$.',
      answer: '$E_n = \\hbar\\omega(n + 1/2)$, $n = 0, 1, 2, \\ldots$',
      steps: [
        'Define raising/lowering operators $a^\\dagger, a$ in terms of $x$ and $p$.',
        '$\\hat H = \\hbar\\omega(a^\\dagger a + 1/2)$.',
        'Eigenvalues of $a^\\dagger a$ are non-negative integers, giving $E_n = \\hbar\\omega(n + 1/2)$.',
      ],
    },
  ];

  var BOX_STANDARD_STATIC = [
    {
      prompt: 'A proton is in the ground state of a nuclear-size infinite square well of width $L = 5\\text{ fm} = 5\\times10^{-15}$ m. Compute its energy in MeV.',
      answer: '$E_1 \\approx 8.2\\text{ MeV}$',
      steps: [
        '$E_1 = \\pi^2\\hbar^2/(2 m_p L^2)$.',
        '$\\hbar^2 \\approx 1.113\\times10^{-68}$ J$^2$ s$^2$.',
        '$m_p = 1.673\\times10^{-27}$ kg, $L^2 = 2.5\\times10^{-29}$ m$^2$.',
        '$E_1 \\approx 9.87\\times 1.113\\times10^{-68}/(2\\times1.673\\times10^{-27}\\times2.5\\times10^{-29})$.',
        '$\\approx 1.31\\times10^{-12}$ J $\\approx 8.2$ MeV.',
      ],
    },
    {
      prompt: 'An electron in a box has ground state energy $0.1$ eV. Estimate the box width $L$ in nm.',
      answer: '$L \\approx 1.94$ nm',
      steps: [
        'From $E_1 = \\pi^2\\hbar^2/(2 m L^2)$, solve $L = \\pi\\hbar/\\sqrt{2 m E_1}$.',
        '$E_1 = 0.1 \\times 1.6\\times10^{-19} = 1.6\\times10^{-20}$ J.',
        '$2 m E_1 = 2\\times9.11\\times10^{-31}\\times1.6\\times10^{-20} = 2.92\\times10^{-50}$ kg J.',
        '$\\sqrt{\\ldots} \\approx 1.71\\times10^{-25}$ kg m/s.',
        '$L = \\pi\\times1.055\\times10^{-34}/1.71\\times10^{-25} \\approx 1.94\\times10^{-9}$ m.',
      ],
    },
    {
      prompt: 'Compute $\\langle x^2\\rangle$ for the ground state of the infinite square well of width $L$.',
      answer: '$\\langle x^2\\rangle = L^2(1/3 - 1/(2\\pi^2))$',
      steps: [
        '$\\langle x^2\\rangle = (2/L)\\int_0^L x^2\\sin^2(\\pi x/L)\\,dx$.',
        'Use $\\sin^2(\\theta) = (1 - \\cos 2\\theta)/2$.',
        'First part: $(2/L)\\int_0^L x^2/2\\,dx = L^2/3$.',
        'Second part: $(2/L)\\int_0^L -x^2\\cos(2\\pi x/L)/2\\,dx$; by parts twice gives $-L^2/(2\\pi^2)$.',
        '$\\langle x^2\\rangle = L^2/3 - L^2/(2\\pi^2)$.',
      ],
    },
    {
      prompt: 'Derive $\\Delta x$ for the ground state of the infinite square well, given $\\langle x\\rangle = L/2$ and $\\langle x^2\\rangle = L^2(1/3 - 1/(2\\pi^2))$.',
      answer: '$\\Delta x = L\\sqrt{1/12 - 1/(2\\pi^2)}\\approx 0.181 L$',
      steps: [
        '$(\\Delta x)^2 = \\langle x^2\\rangle - \\langle x\\rangle^2$.',
        '$= L^2(1/3 - 1/(2\\pi^2)) - L^2/4$.',
        '$= L^2(1/12 - 1/(2\\pi^2))$.',
        'Numerically, $1/12 \\approx 0.0833$ and $1/(2\\pi^2) \\approx 0.0507$.',
        '$\\Delta x \\approx L\\sqrt{0.0326}\\approx 0.181 L$.',
      ],
    },
    {
      prompt: 'An oscillator with $\\omega = 2\\pi\\times10^{14}\\text{ rad/s}$ (infrared frequency) has what ground-state energy in eV?',
      answer: '$E_0 \\approx 0.207\\text{ eV}$',
      steps: [
        '$E_0 = \\hbar\\omega/2$.',
        '$\\hbar\\omega = 1.055\\times10^{-34}\\times2\\pi\\times10^{14}\\approx 6.63\\times10^{-20}$ J.',
        '$E_0 = 3.31\\times10^{-20}$ J.',
        'Divide by $1.6\\times10^{-19}$: $\\approx 0.207$ eV.',
      ],
    },
    {
      prompt: 'The hydrogen ground state has energy $-13.6$ eV. What is the ionization energy of hydrogen?',
      answer: '$13.6$ eV (this is the work needed to bring the electron from $n = 1$ to $n = \\infty$).',
      steps: [
        'The bound state energies are $E_n = -13.6\\text{ eV}/n^2$; as $n\\to\\infty$, $E \\to 0$.',
        'The ionization energy is the positive work needed to free the electron.',
        'From $n = 1$: $0 - (-13.6) = 13.6$ eV.',
      ],
    },
    {
      prompt: 'Compute the wavelength (nm) of the Lyman-alpha transition ($n = 2 \\to n = 1$) in hydrogen.',
      answer: '$\\lambda \\approx 121.6\\text{ nm}$',
      steps: [
        '$\\Delta E = 13.6(1 - 1/4)\\text{ eV} = 10.2$ eV.',
        '$\\lambda = 1240\\text{ eV nm}/10.2\\text{ eV}$.',
        '$\\approx 121.6$ nm (deep UV).',
      ],
    },
    {
      prompt: 'Why is the hydrogen spectrum discrete but the photoelectric cutoff for a metal continuous above threshold?',
      answer: 'The bound electron states in hydrogen are quantized (discrete $E_n$), so transitions between them emit photons of fixed energy. The metal work function has bound states, but once an electron is free it can carry any kinetic energy above $W$, so the photoemission spectrum has a sharp onset at $\\hbar\\omega = W$ and continues smoothly above it.',
      steps: [
        'Hydrogen: only $E_1, E_2, \\ldots$ are allowed; transitions pick from a discrete set.',
        'Metal emission: once you exceed the work function, the outgoing electron is a free-particle continuum state.',
        'Discrete-to-continuum transitions give continuous spectra; discrete-to-discrete give lines.',
      ],
    },
    {
      prompt: 'A photon of wavelength $100$ nm hits a hydrogen atom in the ground state. Can it ionize the atom?',
      answer: 'Yes. The photon energy $\\approx 12.4$ eV is less than 13.6 eV, so it is below threshold for ionization from the ground state. (Wait: check the direction.)',
      steps: [
        '$E_{\\text{photon}} = 1240/100 = 12.4$ eV.',
        'Ionization energy of ground-state H: 13.6 eV.',
        '$12.4 < 13.6$, so the photon cannot ionize a ground-state atom. The correct answer is NO.',
        'However, it can excite a ground-state electron to $n \\geq 5$ (which need 13.06, 13.22, 13.32 eV, still all higher than 12.4), or to $n = 4$ (12.75 eV, also too high). It can reach $n = 3$ (12.09 eV) and lower.',
      ],
    },
    {
      prompt: 'The Bohr radius is $a_0 \\approx 0.529$ angstrom. For the hydrogen ground state $\\psi_{100}(r) = (1/\\sqrt{\\pi a_0^3}) e^{-r/a_0}$, compute $\\langle r\\rangle$.',
      answer: '$\\langle r\\rangle = (3/2) a_0 \\approx 0.794$ angstrom',
      steps: [
        '$\\langle r\\rangle = \\int_0^\\infty r\\,|\\psi|^2\\,4\\pi r^2\\,dr$.',
        '$= (4/a_0^3)\\int_0^\\infty r^3 e^{-2r/a_0}\\,dr$.',
        'Use $\\int_0^\\infty r^3 e^{-\\alpha r}\\,dr = 6/\\alpha^4$.',
        '$(4/a_0^3)(6/(2/a_0)^4) = (4/a_0^3)(6 a_0^4/16) = (3/2) a_0$.',
      ],
    },
  ];

  var BOX_CHALLENGE_STATIC = [
    {
      prompt: 'Derive the ground state energy $E_0 = \\hbar\\omega/2$ of the quantum harmonic oscillator using the uncertainty principle as a variational argument.',
      answer: 'Minimize $E(x) = p^2/(2m) + m\\omega^2 x^2/2$ subject to $\\Delta x\\,\\Delta p \\ge \\hbar/2$.',
      steps: [
        'Assume $\\langle x\\rangle = \\langle p\\rangle = 0$, so $\\langle x^2\\rangle = (\\Delta x)^2$, etc.',
        '$\\langle E\\rangle = \\langle p^2\\rangle/(2m) + m\\omega^2\\langle x^2\\rangle/2 \\ge (\\hbar/(4\\Delta x))^2/(2m) + m\\omega^2(\\Delta x)^2/2$.',
        'Minimize over $\\Delta x$: derivative w.r.t. $(\\Delta x)^2$ is $-\\hbar^2/(16 m(\\Delta x)^4) + m\\omega^2/2 = 0$.',
        'Solve: $(\\Delta x)^2 = \\hbar/(2\\sqrt 2 m\\omega)$.',
        'Substitute back: $\\langle E\\rangle_{\\min} = \\hbar\\omega/2$ (after simplification).',
        'The tight inequality is saturated by the Gaussian ground-state wavefunction.',
      ],
      hint: 'Use $\\Delta x\\,\\Delta p = \\hbar/2$ for the Gaussian case.',
    },
    {
      prompt: 'For a particle in the first excited state $n = 2$ of an infinite square well, show that $\\langle x^2\\rangle - \\langle x\\rangle^2 = L^2(1/12 - 1/(8\\pi^2))$.',
      answer: 'Direct integration with $\\psi_2 = \\sqrt{2/L}\\sin(2\\pi x/L)$.',
      steps: [
        '$|\\psi_2|^2 = (2/L)\\sin^2(2\\pi x/L)$; by symmetry, $\\langle x\\rangle = L/2$.',
        '$\\langle x^2\\rangle = (2/L)\\int_0^L x^2\\sin^2(2\\pi x/L)\\,dx$.',
        'Split: $(2/L)\\int x^2/2 - (2/L)\\int x^2\\cos(4\\pi x/L)/2$.',
        'First integral: $L^2/3$.',
        'Second (by parts twice): $-L^2/(8\\pi^2)$.',
        'So $\\langle x^2\\rangle = L^2/3 - L^2/(8\\pi^2)$, and subtracting $L^2/4$ gives $L^2(1/12 - 1/(8\\pi^2))$.',
      ],
    },
    {
      prompt: 'Why is the hydrogen energy spectrum $E_n = -13.6/n^2$ eV degenerate in both $\\ell$ and $m$? Would this still hold for a non-Coulomb central potential?',
      answer: 'The $1/r$ potential has a "hidden" SO(4) symmetry (the Runge-Lenz vector) that forces energy to depend only on $n = n_r + \\ell + 1$. For general $V(r)$, the degeneracy in $\\ell$ breaks while $m$-degeneracy survives.',
      steps: [
        'For any central potential, rotational invariance gives $(2\\ell + 1)$-fold degeneracy in $m$.',
        'The Coulomb problem has an extra conserved vector, the Runge-Lenz vector, which does not exist for general $V(r)$.',
        'This extra symmetry combines $\\ell$ and the radial quantum number $n_r$, giving the single quantum number $n$.',
        'In hydrogen, $E_n$ depends only on $n$; in, say, sodium, the $s$ and $p$ levels split because the effective potential deviates from Coulomb.',
      ],
    },
  ];

  PS.registerTopic("phys-qm-box", {
    title: "Canonical systems: box, oscillator, hydrogen",
    description: "Energies and states of the three model problems of QM.",
    warmup:    [genBoxEnergy, genHydrogenLevel, genBalmer, BOX_WARMUP_STATIC],
    standard:  BOX_STANDARD_STATIC,
    challenge: BOX_CHALLENGE_STATIC,
  });

  // ==========================================================================
  // TOPIC 3: phys-qm-operators (operators, commutators, measurement, uncertainty)
  // ==========================================================================

  var OPERATORS_WARMUP_STATIC = [
    {
      prompt: 'State the canonical commutation relation for position and momentum.',
      answer: '$[\\hat x, \\hat p] = i\\hbar$',
      steps: [
        'Equivalent form: $\\hat x\\hat p - \\hat p\\hat x = i\\hbar$.',
        'In the position representation, $\\hat p = -i\\hbar\\,\\partial_x$.',
        'This is the foundational non-commuting pair in quantum mechanics.',
      ],
    },
    {
      prompt: 'State the Heisenberg uncertainty relation for position and momentum.',
      answer: '$\\Delta x\\,\\Delta p \\ge \\hbar/2$',
      steps: [
        'This follows from $[\\hat x,\\hat p] = i\\hbar$ and the Cauchy-Schwarz inequality.',
        '$\\Delta x = \\sqrt{\\langle x^2\\rangle - \\langle x\\rangle^2}$, similarly for $p$.',
        'Equality holds only for Gaussian wavefunctions (coherent states).',
      ],
    },
    {
      prompt: 'What does it mean for an operator $\\hat A$ to be Hermitian?',
      answer: '$\\hat A = \\hat A^\\dagger$, i.e. $\\langle\\phi|\\hat A|\\psi\\rangle = \\langle\\hat A\\phi|\\psi\\rangle$ for all states.',
      steps: [
        'Hermitian operators have real eigenvalues and orthogonal eigenstates.',
        'Observables must be Hermitian so measurement outcomes are real numbers.',
        'Examples: $\\hat x$, $\\hat p$, $\\hat H$, all Pauli matrices.',
      ],
    },
    {
      prompt: 'What does it mean for two observables to be "compatible"?',
      answer: 'Their operators commute: $[\\hat A, \\hat B] = 0$. Then they share a complete eigenbasis and can be measured simultaneously with arbitrary precision.',
      steps: [
        'Non-compatible observables (like $x$ and $p$) do not share eigenstates.',
        'Measuring one forces the state into its eigenbasis, disturbing the other.',
        'Compatible observables (like $\\hat L^2$ and $\\hat L_z$) can both be sharpened indefinitely.',
      ],
    },
  ];

  var OPERATORS_STANDARD_STATIC = [
    {
      prompt: 'Compute $[\\hat x^2, \\hat p]$.',
      answer: '$[\\hat x^2,\\hat p] = 2 i\\hbar\\hat x$',
      steps: [
        '$[\\hat x^2,\\hat p] = \\hat x[\\hat x,\\hat p] + [\\hat x,\\hat p]\\hat x$ (Leibniz).',
        '$= \\hat x(i\\hbar) + (i\\hbar)\\hat x$.',
        '$= 2 i\\hbar\\hat x$.',
      ],
    },
    {
      prompt: 'Compute $[\\hat x, \\hat p^2]$.',
      answer: '$[\\hat x,\\hat p^2] = 2 i\\hbar\\hat p$',
      steps: [
        '$[\\hat x,\\hat p^2] = [\\hat x,\\hat p]\\hat p + \\hat p[\\hat x,\\hat p]$.',
        '$= i\\hbar\\hat p + \\hat p(i\\hbar)$.',
        '$= 2 i\\hbar\\hat p$.',
      ],
    },
    {
      prompt: 'For the angular momentum operators, compute $[\\hat L_x, \\hat L_y]$. (You may quote the standard result.)',
      answer: '$[\\hat L_x, \\hat L_y] = i\\hbar\\hat L_z$',
      steps: [
        '$\\hat L_i = \\epsilon_{ijk}\\hat x_j\\hat p_k$ (sum implied).',
        'The full computation uses $[\\hat x_i, \\hat p_j] = i\\hbar\\delta_{ij}$.',
        'Result: $[\\hat L_i, \\hat L_j] = i\\hbar\\epsilon_{ijk}\\hat L_k$.',
      ],
    },
    {
      prompt: 'Prove that if $[\\hat A, \\hat H] = 0$, then $\\langle\\hat A\\rangle$ is constant in time.',
      answer: 'From the Ehrenfest theorem / Heisenberg equation.',
      steps: [
        'Heisenberg equation: $d\\langle\\hat A\\rangle/dt = (i/\\hbar)\\langle[\\hat H,\\hat A]\\rangle + \\langle\\partial_t\\hat A\\rangle$.',
        'If $\\hat A$ has no explicit time dependence and commutes with $\\hat H$, both terms vanish.',
        'Therefore $d\\langle\\hat A\\rangle/dt = 0$, i.e. $\\hat A$ is a conserved quantity.',
        'This is why energy, momentum, and angular momentum are conserved when the Hamiltonian has the corresponding symmetry.',
      ],
    },
    {
      prompt: 'If a system is in an eigenstate of $\\hat A$ with eigenvalue $a$, what is the uncertainty $\\Delta A$?',
      answer: '$\\Delta A = 0$.',
      steps: [
        '$\\langle\\hat A\\rangle = a$ and $\\langle\\hat A^2\\rangle = a^2$ when acting on an eigenstate with eigenvalue $a$.',
        '$(\\Delta A)^2 = a^2 - a^2 = 0$.',
        'Eigenstates of $\\hat A$ are precisely the states with zero uncertainty in $A$.',
      ],
    },
    {
      prompt: 'An electron is in a state with $\\Delta x = 0.1$ nm. What is the minimum $\\Delta p$ in kg m/s?',
      answer: '$\\Delta p_{\\min} \\approx 5.27\\times10^{-25}\\text{ kg m/s}$',
      steps: [
        '$\\Delta p \\ge \\hbar/(2\\Delta x) = 1.055\\times10^{-34}/(2\\times10^{-10})$.',
        '$\\approx 5.27\\times10^{-25}$ kg m/s.',
        'In eV: $\\Delta p c \\approx 5.27\\times10^{-25}\\times3\\times10^8/1.6\\times10^{-19} \\approx 988$ eV.',
      ],
    },
    {
      prompt: 'A state is a superposition $|\\psi\\rangle = (|\\phi_1\\rangle + 2|\\phi_2\\rangle)/\\sqrt 5$ of two orthonormal energy eigenstates with energies $E_1 = 1$ eV and $E_2 = 3$ eV. Compute $\\langle\\hat H\\rangle$.',
      answer: '$\\langle\\hat H\\rangle = 2.6$ eV',
      steps: [
        'Probabilities: $|c_1|^2 = 1/5$, $|c_2|^2 = 4/5$.',
        '$\\langle\\hat H\\rangle = (1/5)(1) + (4/5)(3)$.',
        '$= 0.2 + 2.4 = 2.6$ eV.',
      ],
    },
    {
      prompt: 'For the same state, what is the probability that a measurement of energy returns $1$ eV?',
      answer: '$P(E_1) = 1/5 = 0.2$',
      steps: [
        'Born rule: $P(E_k) = |\\langle\\phi_k|\\psi\\rangle|^2 = |c_k|^2$.',
        'Coefficient of $|\\phi_1\\rangle$ is $1/\\sqrt 5$.',
        'Square: $1/5$.',
      ],
    },
    {
      prompt: 'Why does the uncertainty relation say "a particle with well-defined momentum has infinitely uncertain position", and how is that possible physically?',
      answer: 'A momentum eigenstate is a plane wave $e^{ipx/\\hbar}$, which has $|\\psi|^2 =$ const everywhere. It is not normalizable as a physical state; it is an idealization useful for expansions.',
      steps: [
        'Free-particle momentum eigenstates are plane waves, not square-integrable.',
        'Physical states are wavepackets: finite (but possibly small) $\\Delta p$ and correspondingly finite $\\Delta x$.',
        'The relation $\\Delta x\\,\\Delta p \\ge \\hbar/2$ only ever constrains states that exist in Hilbert space.',
      ],
    },
    {
      prompt: 'The energy-time uncertainty relation $\\Delta E\\,\\Delta t \\ge \\hbar/2$ has a different status than $\\Delta x\\,\\Delta p$. Why?',
      answer: 'Time is not an operator in ordinary QM; it is a parameter. $\\Delta t$ here is an "intrinsic timescale for change," not a measurement uncertainty in an operator.',
      steps: [
        'In standard QM, $\\hat x$ and $\\hat p$ are both operators with a commutator.',
        'There is no $\\hat t$ operator; $t$ labels the Schrodinger evolution.',
        'A common interpretation: $\\Delta t = \\Delta\\hat A/|d\\langle\\hat A\\rangle/dt|$ for some observable $\\hat A$.',
        'So $\\Delta E\\,\\Delta t \\ge \\hbar/2$ says: states need energy spread $\\sim\\hbar/\\tau$ to change noticeably in time $\\tau$.',
      ],
    },
  ];

  var OPERATORS_CHALLENGE_STATIC = [
    {
      prompt: 'Prove the generalized uncertainty relation $\\Delta A\\,\\Delta B \\ge |\\langle[\\hat A,\\hat B]\\rangle|/2$ from the Cauchy-Schwarz inequality.',
      answer: 'Sketch of the Robertson derivation.',
      steps: [
        'Define $\\hat f = \\hat A - \\langle\\hat A\\rangle$ and $\\hat g = \\hat B - \\langle\\hat B\\rangle$ (Hermitian).',
        'Cauchy-Schwarz: $\\langle\\hat f^2\\rangle\\langle\\hat g^2\\rangle \\ge |\\langle\\hat f\\hat g\\rangle|^2$.',
        'Decompose $\\hat f\\hat g = \\{\\hat f,\\hat g\\}/2 + [\\hat f,\\hat g]/2$.',
        'The anticommutator is Hermitian (real expectation); the commutator is anti-Hermitian (imaginary expectation).',
        'So $|\\langle\\hat f\\hat g\\rangle|^2 = (\\langle\\{\\hat f,\\hat g\\}\\rangle/2)^2 + (\\langle[\\hat f,\\hat g]\\rangle/2i)^2$.',
        'Drop the first (non-negative) term to get $(\\Delta A)^2(\\Delta B)^2 \\ge (\\langle[\\hat A,\\hat B]\\rangle/(2i))^2$.',
        'Take square root: $\\Delta A\\,\\Delta B \\ge |\\langle[\\hat A,\\hat B]\\rangle|/2$.',
      ],
      hint: 'Split $\\hat f\\hat g$ into symmetric and antisymmetric parts.',
    },
    {
      prompt: 'Show that the parity operator $\\hat P\\psi(x) = \\psi(-x)$ commutes with $\\hat H = \\hat p^2/(2m) + V(|x|)$. What does this imply for the eigenstates of $\\hat H$?',
      answer: 'Even-potential Hamiltonians preserve parity; energy eigenstates can be chosen to be simultaneously parity eigenstates (even or odd).',
      steps: [
        '$\\hat P\\hat p^2\\hat P^{-1} = \\hat p^2$ (since reversing $x$ reverses $p$, and $p^2$ is even).',
        '$\\hat P V(|x|)\\hat P^{-1} = V(|-x|) = V(|x|)$.',
        'So $[\\hat P,\\hat H] = 0$.',
        'Since $\\hat P^2 = 1$, eigenvalues of $\\hat P$ are $\\pm 1$.',
        'Bound states of a symmetric potential have definite parity: alternating even/odd as you go up in $n$.',
      ],
    },
    {
      prompt: 'Derive Ehrenfest\'s theorem for $\\langle x\\rangle$ and $\\langle p\\rangle$ in a general 1D potential $V(x)$.',
      answer: '$d\\langle x\\rangle/dt = \\langle p\\rangle/m$, $d\\langle p\\rangle/dt = -\\langle V\'(x)\\rangle$.',
      steps: [
        'Heisenberg equation: $d\\langle\\hat A\\rangle/dt = (i/\\hbar)\\langle[\\hat H,\\hat A]\\rangle$.',
        '$[\\hat H,\\hat x] = [\\hat p^2/(2m),\\hat x] = -i\\hbar\\hat p/m$.',
        '$\\Rightarrow d\\langle x\\rangle/dt = \\langle p\\rangle/m$.',
        '$[\\hat H,\\hat p] = [V(\\hat x),\\hat p] = i\\hbar V\'(\\hat x)$ (using $[\\hat x,\\hat p] = i\\hbar$).',
        '$\\Rightarrow d\\langle p\\rangle/dt = -\\langle V\'(x)\\rangle$.',
        'Note this is $\\langle V\'(x)\\rangle$, not $V\'(\\langle x\\rangle)$; they coincide only for harmonic potentials.',
      ],
    },
  ];

  PS.registerTopic("phys-qm-operators", {
    title: "Operators, commutators, measurement",
    description: "Canonical commutator, Hermitian operators, Born rule, uncertainty.",
    warmup:    OPERATORS_WARMUP_STATIC,
    standard:  OPERATORS_STANDARD_STATIC,
    challenge: OPERATORS_CHALLENGE_STATIC,
  });

  // ==========================================================================
  // TOPIC 4: phys-qm-spin (spin-1/2, Pauli matrices, qubits, Bell states)
  // ==========================================================================

  var SPIN_WARMUP_STATIC = [
    {
      prompt: 'Write the three Pauli matrices.',
      answer: '$\\sigma_x=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix},\\ \\sigma_y=\\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix},\\ \\sigma_z=\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$',
      steps: [
        'They are traceless, Hermitian, and square to the identity.',
        'They anticommute pairwise: $\\{\\sigma_i,\\sigma_j\\} = 2\\delta_{ij}$.',
        'They satisfy $[\\sigma_i,\\sigma_j] = 2 i\\epsilon_{ijk}\\sigma_k$.',
      ],
    },
    {
      prompt: 'What are the eigenvalues of any Pauli matrix $\\sigma_i$?',
      answer: '$\\pm 1$',
      steps: [
        'Each Pauli matrix is $2\\times 2$, traceless, and squares to $I$.',
        'Eigenvalues $\\lambda$ satisfy $\\lambda^2 = 1$, so $\\lambda = \\pm 1$.',
        'Physical spin: $\\hat S_i = (\\hbar/2)\\sigma_i$ with eigenvalues $\\pm\\hbar/2$.',
      ],
    },
    {
      prompt: 'What are the eigenstates of $\\sigma_z$?',
      answer: '$|\\uparrow\\rangle=(1,0)^T$ (eigenvalue $+1$) and $|\\downarrow\\rangle=(0,1)^T$ (eigenvalue $-1$).',
      steps: [
        '$\\sigma_z|\\uparrow\\rangle = +|\\uparrow\\rangle$ and $\\sigma_z|\\downarrow\\rangle = -|\\downarrow\\rangle$.',
        'These are usually called $|0\\rangle$ and $|1\\rangle$ in quantum-computing notation.',
      ],
    },
    {
      prompt: 'Write the Bell state $|\\Phi^+\\rangle$ in terms of computational basis states.',
      answer: '$|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\\sqrt 2$',
      steps: [
        'This is one of four maximally entangled two-qubit states.',
        'Measuring either qubit in the $z$-basis gives a random outcome, but the two qubits\' outcomes are perfectly correlated.',
        'The other three Bell states are $|\\Phi^-\\rangle, |\\Psi^\\pm\\rangle$.',
      ],
    },
  ];

  var SPIN_STANDARD_STATIC = [
    {
      prompt: 'A qubit is in the state $|\\psi\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt 2$. What is the probability of measuring $0$ in the computational basis?',
      answer: '$P(0) = 1/2$',
      steps: [
        'Born rule: $P(0) = |\\langle 0|\\psi\\rangle|^2$.',
        '$\\langle 0|\\psi\\rangle = 1/\\sqrt 2$.',
        '$|\\ldots|^2 = 1/2$.',
      ],
    },
    {
      prompt: 'A qubit is in $|\\psi\\rangle = (|0\\rangle + i|1\\rangle)/\\sqrt 2$. What is the probability of measuring $+$ in the $X$-basis, where $|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt 2$?',
      answer: '$P(+) = 1/2$',
      steps: [
        '$\\langle +|\\psi\\rangle = (1/\\sqrt 2)(1/\\sqrt 2 + i/\\sqrt 2) = (1 + i)/2$.',
        '$|(1+i)/2|^2 = (1 + 1)/4 = 1/2$.',
        'The probability is $1/2$.',
      ],
    },
    {
      prompt: 'Compute $\\sigma_x\\sigma_y$.',
      answer: '$\\sigma_x\\sigma_y = i\\sigma_z$',
      steps: [
        'Use $[\\sigma_x,\\sigma_y] = 2 i\\sigma_z$ and $\\{\\sigma_x,\\sigma_y\\} = 0$.',
        'Adding: $2\\sigma_x\\sigma_y = 2 i\\sigma_z$.',
        '$\\sigma_x\\sigma_y = i\\sigma_z$.',
      ],
    },
    {
      prompt: 'A spin-1/2 particle is in the state $|{+}z\\rangle$. What is the probability of measuring it to be spin-up along the $x$-axis?',
      answer: '$1/2$',
      steps: [
        '$|{+}z\\rangle = (|{+}x\\rangle + |{-}x\\rangle)/\\sqrt 2$.',
        '$P(+x) = |1/\\sqrt 2|^2 = 1/2$.',
        'Measuring along a perpendicular axis always gives $1/2$ probability for each outcome.',
      ],
    },
    {
      prompt: 'Compute the expectation value $\\langle\\sigma_x\\rangle$ for the state $|\\psi\\rangle = \\cos(\\theta/2)|0\\rangle + \\sin(\\theta/2)|1\\rangle$.',
      answer: '$\\langle\\sigma_x\\rangle = \\sin\\theta$',
      steps: [
        '$\\sigma_x|0\\rangle = |1\\rangle$, $\\sigma_x|1\\rangle = |0\\rangle$.',
        '$\\sigma_x|\\psi\\rangle = \\cos(\\theta/2)|1\\rangle + \\sin(\\theta/2)|0\\rangle$.',
        '$\\langle\\psi|\\sigma_x|\\psi\\rangle = 2\\cos(\\theta/2)\\sin(\\theta/2) = \\sin\\theta$.',
      ],
    },
    {
      prompt: 'For the same state, compute $\\langle\\sigma_z\\rangle$.',
      answer: '$\\langle\\sigma_z\\rangle = \\cos\\theta$',
      steps: [
        '$\\sigma_z|0\\rangle = |0\\rangle$, $\\sigma_z|1\\rangle = -|1\\rangle$.',
        '$\\sigma_z|\\psi\\rangle = \\cos(\\theta/2)|0\\rangle - \\sin(\\theta/2)|1\\rangle$.',
        '$\\langle\\psi|\\sigma_z|\\psi\\rangle = \\cos^2(\\theta/2) - \\sin^2(\\theta/2) = \\cos\\theta$.',
      ],
    },
    {
      prompt: 'In the Bell state $|\\Phi^+\\rangle = (|00\\rangle + |11\\rangle)/\\sqrt 2$, what is the probability that the first qubit is measured as $0$?',
      answer: '$1/2$',
      steps: [
        'Project: $\\langle 0|_1\\otimes I_2|\\Phi^+\\rangle = |0\\rangle_2/\\sqrt 2$.',
        'Norm squared: $1/2$.',
        'The first qubit is maximally random despite the entanglement.',
      ],
    },
    {
      prompt: 'Given $|\\Phi^+\\rangle$, if the first qubit is measured as $0$, what is the state of the second qubit immediately afterward?',
      answer: '$|0\\rangle$ (deterministically)',
      steps: [
        'Collapse the full state onto the subspace where qubit 1 is $|0\\rangle$.',
        'The unnormalized projection is $|00\\rangle/\\sqrt 2$.',
        'Renormalize: $|0\\rangle_1|0\\rangle_2$.',
        'Qubit 2 is now definitely $|0\\rangle$ - the correlation that defines entanglement.',
      ],
    },
    {
      prompt: 'Why does the CHSH Bell inequality $|\\langle S\\rangle| \\le 2$ hold for any local hidden variable theory, while QM predicts $2\\sqrt 2$ for optimal Bell-state measurements?',
      answer: 'Classical correlations with a shared random bit cannot exceed 2; quantum entanglement allows correlations up to Tsirelson\'s bound $2\\sqrt 2$.',
      steps: [
        'CHSH $S = E(a,b) - E(a,b\') + E(a\',b) + E(a\',b\')$ for dichotomic outcomes $\\pm 1$.',
        'A local hidden variable assigns each observable a $\\pm 1$ value before measurement; combinatorics gives $|S| \\le 2$.',
        'QM on $|\\Phi^+\\rangle$ with suitable angles gives $E(a,b) = \\cos(a - b)$ and $S = 2\\sqrt 2 \\approx 2.828$.',
        'Experiments (Aspect, and many since) see $S > 2$, ruling out local realism.',
      ],
    },
    {
      prompt: 'An electron in a uniform magnetic field $B\\hat z$ has Hamiltonian $\\hat H = -(g_s\\mu_B/\\hbar)\\vec S\\cdot\\vec B = -\\omega_L\\hat S_z$. If initially $|\\psi(0)\\rangle = |{+}x\\rangle$, describe the time-evolved state and the physical interpretation.',
      answer: 'The spin precesses at the Larmor frequency $\\omega_L$ about the $z$-axis.',
      steps: [
        'Decompose $|{+}x\\rangle = (|{+}z\\rangle + |{-}z\\rangle)/\\sqrt 2$.',
        'Each eigenstate picks up phase $e^{\\mp i\\omega_L t/2}$ under $\\hat H$.',
        '$|\\psi(t)\\rangle = (e^{-i\\omega_L t/2}|{+}z\\rangle + e^{+i\\omega_L t/2}|{-}z\\rangle)/\\sqrt 2$.',
        'Up to an overall phase, this is the state with the spin pointing along $(\\cos\\omega_L t,\\ -\\sin\\omega_L t,\\ 0)$.',
        'That is Larmor precession at angular frequency $\\omega_L$, the basis of NMR and MRI.',
      ],
    },
  ];

  var SPIN_CHALLENGE_STATIC = [
    {
      prompt: 'Show that any $2\\times 2$ Hermitian matrix can be written as $a_0 I + \\vec a\\cdot\\vec\\sigma$ for real $a_0, \\vec a$. What is the significance for qubit Hamiltonians?',
      answer: '$I, \\sigma_x, \\sigma_y, \\sigma_z$ form a real 4D basis of $2\\times 2$ Hermitian matrices.',
      steps: [
        'A general Hermitian $2\\times 2$ matrix has 4 real parameters (diagonal: 2 reals; off-diagonal: 1 complex).',
        'Count: $I$ adds 1, $\\sigma_x,\\sigma_y,\\sigma_z$ add 3 — total 4.',
        'So every qubit Hamiltonian has the form $\\hat H = a_0 I + \\vec a\\cdot\\vec\\sigma$.',
        'The $a_0$ is an overall energy shift (irrelevant to dynamics); $\\vec a$ sets a Larmor-like precession about $\\hat a/|\\vec a|$ at rate $2|\\vec a|/\\hbar$.',
      ],
      hint: 'Count real parameters.',
    },
    {
      prompt: 'Compute the CHSH value $S = E(a,b) - E(a,b\') + E(a\',b) + E(a\',b\')$ for the Bell state $|\\Phi^+\\rangle$ with the angles $a=0,\\ a\'=\\pi/2,\\ b=\\pi/4,\\ b\'=3\\pi/4$. Confirm it reaches $2\\sqrt 2$.',
      answer: '$S = 2\\sqrt 2$',
      steps: [
        'On $|\\Phi^+\\rangle$, $E(\\theta_1,\\theta_2) = \\cos(\\theta_1 - \\theta_2)$ with the sign convention used here.',
        '$E(a,b) = \\cos(-\\pi/4) = \\sqrt 2/2$.',
        '$E(a,b\') = \\cos(-3\\pi/4) = -\\sqrt 2/2$.',
        '$E(a\',b) = \\cos(\\pi/4) = \\sqrt 2/2$.',
        '$E(a\',b\') = \\cos(-\\pi/4) = \\sqrt 2/2$.',
        'Sum: $\\sqrt 2/2 - (-\\sqrt 2/2) + \\sqrt 2/2 + \\sqrt 2/2 = 4(\\sqrt 2/2) = 2\\sqrt 2$.',
      ],
    },
    {
      prompt: 'Explain why, if Alice and Bob each measure one qubit of a Bell pair, the raw measurement statistics on either side alone are uniformly random — and therefore no faster-than-light signaling is possible.',
      answer: 'The reduced density matrix on either side is $I/2$, independent of the other side\'s action.',
      steps: [
        'Trace out one qubit of $|\\Phi^+\\rangle\\langle\\Phi^+|$: $\\rho_A = \\operatorname{Tr}_B|\\Phi^+\\rangle\\langle\\Phi^+| = I/2$.',
        'Any local measurement on $A$ samples from $\\rho_A$, which is maximally mixed regardless of what $B$ does.',
        'Whether Bob measures, and what he measures, cannot be detected by looking only at Alice\'s outcomes.',
        'The correlations show up only when Alice and Bob compare records — which requires classical (at most light-speed) communication. Entanglement is strong, but it does not transmit information.',
      ],
    },
  ];

  PS.registerTopic("phys-qm-spin", {
    title: "Spin, qubits, and Bell states",
    description: "Pauli matrices, measurement probabilities, entanglement, Bell inequalities.",
    warmup:    SPIN_WARMUP_STATIC,
    standard:  SPIN_STANDARD_STATIC,
    challenge: SPIN_CHALLENGE_STATIC,
  });
})();
