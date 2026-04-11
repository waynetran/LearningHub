/*
 * LearningHub - General Relativity Problem Set
 * Registers 3 topics with LearningHubProblemSet runtime.
 * Topics: phys-gr-equivalence, phys-gr-schwarzschild, phys-gr-tests
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[general-relativity-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  var G = 6.674e-11;           // N m^2 / kg^2
  var C = 2.998e8;             // m/s
  var M_SUN = 1.989e30;        // kg
  var M_EARTH = 5.972e24;      // kg
  var R_SUN = 6.96e8;          // m

  function rs(M) { return 2 * G * M / (C * C); }

  // ==========================================================================
  // TOPIC 1: phys-gr-equivalence
  // ==========================================================================

  // Warm-up: fractional gravitational redshift for a height h near Earth's surface.
  function genRedshiftEarth(rng) {
    var hs = [1, 10, 22.5, 100, 1000];
    var h = rng.pick(hs);
    var g = 9.81;
    var shift = g * h / (C * C);
    return {
      prompt: 'A photon climbs a height of $' + h + '\\text{ m}$ in Earth\'s gravitational field ($g = 9.81\\ \\text{m}/\\text{s}^2$). Compute the fractional frequency shift $\\Delta f / f$.',
      answer: '$\\Delta f / f \\approx -' + shift.toExponential(3) + '$',
      steps: [
        '$\\Delta f / f = -g h / c^2$.',
        '$= -9.81 \\times ' + h + ' / (9 \\times 10^{16})$.',
        '$\\approx -' + shift.toExponential(3) + '$.',
      ],
    };
  }

  // Warm-up: same as above but phrased as "time between ticks".
  function genTickShift(rng) {
    var hs = [10, 50, 100, 1000, 10000];
    var h = rng.pick(hs);
    var days = 1;
    var frac = 9.81 * h / (C * C);
    var shift_sec = frac * 86400;
    return {
      prompt: 'Two identical clocks sit $' + h + '\\text{ m}$ apart in height near Earth\'s surface. By how much do they drift in one day?',
      answer: '$\\Delta t \\approx ' + shift_sec.toExponential(3) + '\\text{ s}/\\text{day}$',
      steps: [
        'Fractional rate difference: $g h / c^2 \\approx ' + frac.toExponential(3) + '$.',
        'One day is $86400$ s, so drift is $86400 \\times ' + frac.toExponential(3) + '$.',
        '$\\approx ' + shift_sec.toExponential(3) + '\\text{ s}$/day.',
      ],
    };
  }

  var STATIC_EQUIV_STANDARD = [
    {
      prompt: 'The Pound-Rebka experiment (1959) sent gamma rays up the tower of Harvard\'s Jefferson Lab, $h = 22.5\\text{ m}$. Predict the fractional frequency shift.',
      answer: '$\\approx 2.45 \\times 10^{-15}$',
      steps: [
        '$\\Delta f / f = g h / c^2 = 9.81 \\times 22.5 / (3 \\times 10^8)^2$.',
        '$= 220.7 / (9 \\times 10^{16})$.',
        '$\\approx 2.45 \\times 10^{-15}$.',
        'Pound and Rebka measured this within a few percent.',
      ],
    },
    {
      prompt: 'Why does a freely falling observer in a small elevator experience no gravity, according to Einstein?',
      answer: 'The equivalence principle: free-fall in a uniform gravitational field is locally indistinguishable from inertial motion in flat spacetime.',
      steps: [
        'The falling observer and everything around them accelerate at $g$ together.',
        'All internal experiments (dropping a ball, swinging a pendulum) give the same result as they would in zero gravity.',
        'Only by looking outside the elevator can the observer tell there is a gravitational field.',
        'This is the weak equivalence principle; Einstein elevated it to "no local experiment of any kind can tell the difference."',
      ],
    },
    {
      prompt: 'A clock on the surface of the Sun is compared with a clock at infinity. What is the fractional frequency shift observed at infinity? ($GM_\\odot/c^2 \\approx 1475\\text{ m}$, $R_\\odot = 6.96 \\times 10^8\\text{ m}$.)',
      answer: '$\\approx -2.12 \\times 10^{-6}$',
      steps: [
        'Weak-field formula: $\\Delta f / f \\approx -G M / (R c^2)$.',
        '$= -1475 / (6.96 \\times 10^8)$.',
        '$\\approx -2.12 \\times 10^{-6}$.',
        'Photons climbing out of the Sun are redshifted by roughly 2 parts per million.',
      ],
    },
    {
      prompt: 'What is the gravitational redshift of a photon emitted at a neutron star\'s surface ($M = 1.4 M_\\odot$, $R = 12\\text{ km}$) and received at infinity?',
      answer: '$\\Delta f / f \\approx -0.172$ (or use the full Schwarzschild formula)',
      steps: [
        'Weak-field estimate: $GM/(Rc^2) = 1.4 \\times 1475 / 12000 \\approx 0.172$.',
        'The weak-field formula is barely valid at this strength; use the full expression:',
        '$f_\\infty / f_{\\text{surface}} = \\sqrt{1 - r_s/R}$ where $r_s = 2 \\times 1.4 \\times 1475 \\approx 4.13$ km.',
        '$= \\sqrt{1 - 4.13/12} = \\sqrt{0.656} \\approx 0.810$.',
        'Fractional shift $\\approx -0.19$. Close to the linearized estimate.',
      ],
    },
    {
      prompt: 'Why did Einstein say gravity is not a force?',
      answer: 'Because all objects respond to it identically regardless of mass or composition, which means "gravity" is not a force acting on objects but a property of the spacetime the objects move in. Free-fall = following a geodesic of curved spacetime.',
      steps: [
        'Forces act differently on different test particles (e.g., charges feel electromagnetism, neutral particles don\'t).',
        'Gravity acts on every test particle the same way, independent of internal composition.',
        'This suggests gravity is not a force but a feature of the arena (spacetime) rather than the actors (particles).',
        'Mathematically, free-fall trajectories are geodesics of a curved spacetime.',
      ],
    },
    {
      prompt: 'If you fire a bullet horizontally in an accelerating rocket, the bullet appears to curve downward. How does the equivalence principle explain the bending of light in a gravitational field?',
      answer: 'By equivalence, the same curvature must happen in a gravitational field: light bends in gravity.',
      steps: [
        'In the rocket: the bullet moves in a straight line externally, but the rocket\'s floor accelerates up, so internally the bullet curves down.',
        'Same setup with a photon: it moves in a straight line externally, but the floor accelerates up, so internally it appears to bend.',
        'Since gravity is locally equivalent to acceleration, light must bend in gravity too.',
        'This is exactly what Eddington observed in 1919.',
      ],
    },
    {
      prompt: 'A GPS satellite at $r_2 = 2.66 \\times 10^7\\text{ m}$ emits signals. Compared to an identical clock on the ground at $r_1 = 6.37 \\times 10^6\\text{ m}$, what is the (approximate) GR-only clock rate difference per day?',
      answer: '$\\approx +45\\ \\mu\\text{s}/\\text{day}$ (the satellite clock runs faster)',
      steps: [
        '$GM_\\oplus / c^2 \\approx 0.00443$ m for Earth.',
        'Rate ratio $f_2/f_1 \\approx 1 + (GM/c^2)(1/r_1 - 1/r_2)$.',
        '$1/r_1 - 1/r_2 = (1/6.37 - 1/26.6) \\times 10^{-6} \\approx (0.1570 - 0.0376) \\times 10^{-6}$.',
        '$\\approx 1.194 \\times 10^{-7}$ m$^{-1}$.',
        '$\\Delta f/f \\approx 0.00443 \\times 1.194 \\times 10^{-7} \\approx 5.29 \\times 10^{-10}$.',
        'Per day: $86400 \\times 5.29 \\times 10^{-10}$ s $\\approx 45.7\\ \\mu$s. Satellite gains that much per day.',
      ],
    },
    {
      prompt: 'Net GPS correction: SR ($-7\\ \\mu\\text{s}/\\text{day}$) plus GR ($+45\\ \\mu\\text{s}/\\text{day}$). What is the net drift?',
      answer: '$\\approx +38\\ \\mu\\text{s}/\\text{day}$',
      steps: [
        'SR makes moving satellite clocks tick slow by about $7\\ \\mu$s/day.',
        'GR makes high-altitude clocks tick fast by about $45\\ \\mu$s/day.',
        'Net: $+38\\ \\mu$s/day. GPS engineers offset each satellite clock so it matches ground clocks in orbit.',
      ],
    },
  ];

  var STATIC_EQUIV_CHALLENGE = [
    {
      prompt: 'Explain why the weak equivalence principle implies that the gravitational acceleration of a falling object is independent of its mass.',
      answer: 'Because inertial and gravitational masses are equal.',
      steps: [
        '$F = G M m_g / r^2$ (gravitational force).',
        '$F = m_i a$ (Newton\'s second law).',
        'Solving: $a = (m_g/m_i) G M / r^2$.',
        'Weak equivalence: $m_g = m_i$ for every object, so $a = G M / r^2$, independent of $m$.',
      ],
    },
    {
      prompt: 'Why is it impossible to construct a coordinate system in curved spacetime that is "globally freely falling"?',
      answer: 'Because tidal forces detect the curvature on any scale larger than a point.',
      steps: [
        'A small free-fall laboratory sees no gravity (locally).',
        'A larger laboratory, however, sees nearby freely falling particles move relative to each other: tidal accelerations.',
        'Mathematically, tidal forces are the Riemann curvature tensor contracted with the velocity field.',
        'No single choice of coordinates removes the Riemann tensor everywhere; at best you can remove the Christoffel symbols at one point.',
      ],
      hint: 'Think about tidal forces in an extended falling lab.',
    },
    {
      prompt: 'Show that in Schwarzschild geometry, a clock at radius $r$ ticks at a rate $\\sqrt{1 - r_s/r}$ relative to an observer at infinity.',
      answer: 'From the $g_{tt}$ component of the metric.',
      steps: [
        'A stationary observer at radius $r$ has $dx^i = 0$.',
        'Line element: $ds^2 = -(1 - r_s/r) c^2 dt^2$.',
        'Proper time: $d\\tau = \\sqrt{1 - r_s/r}\\, dt$.',
        '$dt$ is the coordinate time (measured at infinity); $d\\tau$ is the local clock reading.',
        'So local clocks run slow by $\\sqrt{1 - r_s/r}$.',
      ],
    },
    {
      prompt: 'A hydrogen Lyman-alpha line ($\\lambda = 121.6$ nm, $f_0 = 2.466 \\times 10^{15}$ Hz) is emitted at the surface of a white dwarf with $M = M_\\odot$ and $R = 6000$ km. What is the observed wavelength at infinity?',
      answer: '$\\lambda_\\infty \\approx 121.63\\text{ nm}$',
      steps: [
        '$r_s \\approx 2.95$ km for the Sun.',
        'Rate ratio: $\\sqrt{1 - 2.95/6000} \\approx 1 - 2.46 \\times 10^{-4}$.',
        'Wavelength shift is the inverse: $\\lambda_\\infty \\approx 121.6 \\times (1 + 2.46 \\times 10^{-4}) \\approx 121.63$ nm.',
        'Sirius B\'s lines have been measured to match this prediction.',
      ],
    },
  ];

  PS.registerTopic("phys-gr-equivalence", {
    title: "Equivalence principle and redshift",
    description: "Free-fall arguments, gravitational redshift, and GPS clock corrections.",
    warmup:   [genRedshiftEarth, genTickShift],
    standard: STATIC_EQUIV_STANDARD,
    challenge: STATIC_EQUIV_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: phys-gr-schwarzschild
  // ==========================================================================

  // Warm-up: Schwarzschild radius of an arbitrary mass in solar masses.
  function genSchwarzRadius(rng) {
    var masses = [0.5, 1, 2, 5, 10, 100, 1e6, 1e8];
    var M = rng.pick(masses);
    var r = 2 * G * M * M_SUN / (C * C);
    // Express in km
    var rkm = r / 1000;
    return {
      prompt: 'Compute the Schwarzschild radius of a non-rotating black hole of mass $M = ' + M + '\\, M_\\odot$.',
      answer: '$r_s \\approx ' + (rkm < 1000 ? rkm.toFixed(2) + '\\text{ km}' : (rkm / 1000).toFixed(2) + ' \\times 10^3\\text{ km}') + '$',
      steps: [
        '$r_s = 2GM/c^2$.',
        'For $1 M_\\odot$, $r_s \\approx 2.95$ km.',
        'For $' + M + ' M_\\odot$, $r_s \\approx ' + M + ' \\times 2.95 \\approx ' + (M * 2.95).toFixed(2) + '$ km.',
      ],
    };
  }

  // Warm-up: given r_s, back out the mass.
  function genMassFromRs(rng) {
    var rkms = [3, 6, 30, 300, 3000];
    var r = rng.pick(rkms);
    var M = r / 2.95;
    return {
      prompt: 'A non-rotating black hole has Schwarzschild radius $r_s = ' + r + '\\text{ km}$. What is its mass in solar masses?',
      answer: '$M \\approx ' + M.toFixed(2) + '\\, M_\\odot$',
      steps: [
        '$r_s / (2.95\\text{ km/M}_\\odot) = ' + r + '/2.95 \\approx ' + M.toFixed(2) + '$.',
        'So $M \\approx ' + M.toFixed(2) + ' M_\\odot$.',
      ],
    };
  }

  var STATIC_SCHWARZ_STANDARD = [
    {
      prompt: 'The supermassive black hole at the center of the Milky Way, Sgr A*, has a mass of about $4.1 \\times 10^6 M_\\odot$. What is its Schwarzschild radius?',
      answer: '$r_s \\approx 1.2 \\times 10^7\\text{ km} \\approx 0.08\\text{ AU}$',
      steps: [
        '$r_s = 4.1 \\times 10^6 \\times 2.95$ km $= 1.21 \\times 10^7$ km.',
        'For reference: 1 AU = $1.5 \\times 10^8$ km, so $r_s \\approx 0.08$ AU.',
        'The horizon is about 17 times the radius of the Sun.',
      ],
    },
    {
      prompt: 'The Earth has mass $5.97 \\times 10^{24}$ kg. What is its Schwarzschild radius?',
      answer: '$\\approx 8.87\\text{ mm}$',
      steps: [
        '$r_s = 2GM/c^2 = 2 \\times 6.674 \\times 10^{-11} \\times 5.97 \\times 10^{24} / (3 \\times 10^8)^2$.',
        '$\\approx 8.87 \\times 10^{-3}$ m = 8.87 mm.',
        'To become a black hole, all of Earth\'s mass would need to fit inside a pea.',
      ],
    },
    {
      prompt: 'What is the ratio of the Schwarzschild radius of the Sun to its actual radius?',
      answer: '$r_s/R_\\odot \\approx 4.24 \\times 10^{-6}$',
      steps: [
        '$r_s(\\odot) \\approx 2.95$ km = $2.95 \\times 10^3$ m.',
        '$R_\\odot = 6.96 \\times 10^8$ m.',
        'Ratio: $2.95 \\times 10^3 / 6.96 \\times 10^8 \\approx 4.24 \\times 10^{-6}$.',
        'The Sun is nowhere near dense enough to be a black hole.',
      ],
    },
    {
      prompt: 'The photon sphere of a Schwarzschild black hole is at $r = 1.5\\, r_s$. Express this radius for a 10-solar-mass black hole.',
      answer: '$r_{\\text{ph}} \\approx 44.3\\text{ km}$',
      steps: [
        '$r_s = 10 \\times 2.95 = 29.5$ km.',
        '$r_{\\text{ph}} = 1.5 \\times 29.5 \\approx 44.3$ km.',
      ],
    },
    {
      prompt: 'An astronaut at Schwarzschild radius $r = 4 r_s$ sends a signal to another astronaut at infinity. By what factor is the frequency reduced? (Exact Schwarzschild result.)',
      answer: '$f_\\infty / f_{\\text{emit}} = \\sqrt{3/4} \\approx 0.866$',
      steps: [
        'Exact: $f_\\infty / f_{\\text{emit}} = \\sqrt{1 - r_s/r} = \\sqrt{1 - 1/4}$.',
        '$= \\sqrt{3/4} = \\sqrt{0.75} \\approx 0.866$.',
        'About a 13% reduction in frequency.',
      ],
    },
    {
      prompt: 'A clock hovers at $r = 2 r_s$ (twice the event horizon). How does its tick rate compare to a clock at infinity?',
      answer: 'about $0.707$ of the rate at infinity',
      steps: [
        'Rate ratio $\\sqrt{1 - r_s/r} = \\sqrt{1 - 1/2} = \\sqrt{1/2} \\approx 0.707$.',
        'So the hovering clock ticks at about $70.7\\%$ of the rate at infinity.',
      ],
    },
    {
      prompt: 'Why is the Schwarzschild metric singular at $r = r_s$?',
      answer: 'It is a coordinate singularity, not a physical one.',
      steps: [
        '$g_{tt}$ vanishes at $r = r_s$ and $g_{rr}$ blows up there.',
        'But curvature invariants such as $R_{\\mu\\nu\\rho\\sigma} R^{\\mu\\nu\\rho\\sigma}$ are finite at $r_s$.',
        'Transforming to Kruskal-Szekeres or Eddington-Finkelstein coordinates removes the singularity.',
        'The only physical singularity is at $r = 0$, where curvature invariants diverge.',
      ],
    },
  ];

  var STATIC_SCHWARZ_CHALLENGE = [
    {
      prompt: 'Derive the photon-sphere radius $r_{\\text{ph}} = 1.5 r_s$ for a Schwarzschild black hole.',
      answer: 'From the geodesic equation for photons.',
      steps: [
        'For a circular photon orbit, the effective potential for null geodesics $V_{\\text{eff}}(r) = (1 - r_s/r)(L^2/r^2)$ must have a stationary point.',
        '$dV_{\\text{eff}}/dr = 0$ gives $r_s/r^2 \\cdot L^2/r^2 + (1 - r_s/r)(-2 L^2/r^3) = 0$.',
        'Multiply through: $r_s/r - 2(1 - r_s/r) = 0$.',
        'Solve: $r_s/r + 2 r_s/r = 2$, so $3 r_s/r = 2$, so $r = 3 r_s/2 = 1.5 r_s$.',
      ],
      hint: 'Use the effective potential for null geodesics.',
    },
    {
      prompt: 'For a Schwarzschild black hole, show that the critical impact parameter for photon capture is $b_{\\text{crit}} = 3\\sqrt{3}\\, r_s / 2$.',
      answer: '$b_{\\text{crit}} = 3\\sqrt{3}\\, r_s/2 \\approx 2.598\\, r_s$',
      steps: [
        'Effective potential peak is at $r = 1.5 r_s$ (the photon sphere).',
        'At that radius: $V_{\\text{eff}}(1.5 r_s) = (1 - 2/3)(L^2/(1.5 r_s)^2) = (1/3)(L^2/(2.25 r_s^2)) = L^2/(6.75 r_s^2)$.',
        'For a photon coming from infinity with impact parameter $b$, $L/E = b$, so critical condition $E^2/(b^2) = V_{\\text{eff}}(1.5 r_s)$.',
        'Solve for $b$: $b_{\\text{crit}}^2 = 6.75 r_s^2 = 27/4 \\cdot r_s^2$.',
        '$b_{\\text{crit}} = (3\\sqrt{3}/2) r_s \\approx 2.598 r_s$.',
      ],
    },
    {
      prompt: 'A black hole with mass equal to Earth would have what horizon radius, and what tidal force on a 2-m human at 100 km?',
      answer: '$r_s \\approx 8.87$ mm; tidal force is negligible at 100 km.',
      steps: [
        '$r_s \\approx 8.87$ mm.',
        'Tidal acceleration: $\\Delta a = 2 G M h / r^3$ where $h = 2$ m, $r = 10^5$ m.',
        '$= 2 \\times 6.674 \\times 10^{-11} \\times 5.97 \\times 10^{24} \\times 2 / (10^5)^3$.',
        '$= 1.59 \\times 10^{-6}$ m/s$^2$. Negligible.',
      ],
    },
    {
      prompt: 'Argue qualitatively why a black hole\'s event horizon area (not volume) is the right thing to call its "size," based on the Bekenstein-Hawking entropy.',
      answer: 'Entropy is proportional to horizon area, not volume.',
      steps: [
        'Bekenstein-Hawking entropy: $S = k_B c^3 A / (4 G \\hbar)$ where $A = 4\\pi r_s^2$.',
        'This is strange — for most systems, entropy scales with volume.',
        'The "holographic principle" is the generalization: the information content of a region is bounded by its surface area, not volume.',
        'So a black hole\'s "size" in the thermodynamic sense is its area, not its volume.',
      ],
      hint: 'Consider what scales as what in the Bekenstein-Hawking formula.',
    },
  ];

  PS.registerTopic("phys-gr-schwarzschild", {
    title: "Schwarzschild and black holes",
    description: "Horizon radius, photon sphere, and gravitational redshift in strong fields.",
    warmup:   [genSchwarzRadius, genMassFromRs],
    standard: STATIC_SCHWARZ_STANDARD,
    challenge: STATIC_SCHWARZ_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: phys-gr-tests
  // ==========================================================================

  var STATIC_TESTS_WARMUP = [
    {
      prompt: 'What was the observed anomalous perihelion advance of Mercury that Le Verrier could not explain in Newtonian gravity?',
      answer: '$43$ arcseconds per century',
      steps: [
        'Total observed precession: $\\sim 574$"/century.',
        'Perturbations from other planets account for $\\sim 532$"/century.',
        'Unexplained residual: $43$"/century.',
        'Einstein computed exactly this from general relativity in November 1915.',
      ],
    },
    {
      prompt: 'What is the deflection angle of a light ray grazing the Sun, as predicted by general relativity?',
      answer: '$\\approx 1.75\\text{ arcseconds}$',
      steps: [
        '$\\delta = 4 G M_\\odot / (c^2 R_\\odot)$.',
        '$= 4 \\times 1475 / (6.96 \\times 10^8)$ radians.',
        '$\\approx 8.48 \\times 10^{-6}$ rad $\\approx 1.75$".',
        'Eddington measured this during the 1919 solar eclipse.',
      ],
    },
    {
      prompt: 'Who first detected gravitational waves, and from what astrophysical event?',
      answer: 'LIGO, in 2015, from a binary black hole merger (GW150914).',
      steps: [
        'First detection: September 14, 2015, by LIGO.',
        'Event: merger of two black holes with masses $\\sim 29$ and $36 M_\\odot$.',
        'Distance: $\\sim 1.3$ billion light-years.',
        '3 $M_\\odot$ radiated as gravitational waves in the final $\\sim 0.2$ s.',
      ],
    },
    {
      prompt: 'What is the Newtonian prediction for the light-bending angle, and by what factor does it differ from the GR prediction?',
      answer: 'Newtonian prediction is half the GR value.',
      steps: [
        'Newtonian ("ballistic photon") gives $\\delta = 2GM/(c^2 R)$.',
        'GR gives $\\delta = 4GM/(c^2 R)$, twice as much.',
        'The extra factor of 2 comes from the spatial curvature of Schwarzschild in addition to the time dilation.',
      ],
    },
  ];

  var STATIC_TESTS_STANDARD = [
    {
      prompt: 'Mercury has semimajor axis $a = 5.79 \\times 10^{10}$ m, eccentricity $e = 0.2056$, and orbital period $T = 87.97$ days. Compute the GR perihelion advance in arcseconds per century.',
      answer: '$\\approx 43$"/century',
      steps: [
        'Per orbit: $\\Delta\\phi = 6\\pi GM_\\odot / (c^2 a (1 - e^2))$.',
        '$a(1 - e^2) = 5.79 \\times 10^{10} \\times 0.9577 = 5.545 \\times 10^{10}$ m.',
        '$GM_\\odot/c^2 = 1475$ m.',
        '$\\Delta\\phi = 6\\pi \\times 1475 / (5.545 \\times 10^{10}) \\approx 5.01 \\times 10^{-7}$ rad/orbit.',
        'Orbits/century: $36525/87.97 \\approx 415.2$.',
        'Total: $5.01 \\times 10^{-7} \\times 415.2 \\approx 2.08 \\times 10^{-4}$ rad.',
        'In arcseconds: $\\times 206265 \\approx 43$".',
      ],
    },
    {
      prompt: 'Compute the maximum frequency of gravitational waves emitted during the inspiral of two $30 M_\\odot$ black holes just before merger (at the innermost stable circular orbit, about $r \\approx 6 G M/c^2$ where $M$ is total mass).',
      answer: '$f_{\\text{GW}} \\approx 73$ Hz',
      steps: [
        'Total mass $M = 60 M_\\odot$, so $GM/c^2 = 60 \\times 1475 = 8.85 \\times 10^4$ m.',
        'ISCO at $r = 6 \\times 8.85 \\times 10^4 = 5.31 \\times 10^5$ m.',
        'Kepler: $\\omega^2 = GM/r^3 \\approx 6.674\\times 10^{-11} \\times 60 \\times 1.99\\times 10^{30}/(5.31\\times 10^5)^3$.',
        '$\\omega^2 \\approx 5.31 \\times 10^4$, $\\omega \\approx 230$ rad/s.',
        'Orbital frequency: $\\omega/(2\\pi) \\approx 36.7$ Hz.',
        'GW frequency = 2 times orbital = 73 Hz. Matches LIGO band.',
      ],
    },
    {
      prompt: 'A radio signal is sent from Earth to a spacecraft near Jupiter while both are nearly aligned with the Sun (Shapiro delay). The one-way path grazes the solar limb. Estimate the extra time delay from the warped spacetime. $(GM_\\odot/c^3 \\approx 4.93 \\ \\mu\\text{s})$',
      answer: '$\\sim 200\\ \\mu\\text{s}$',
      steps: [
        'Shapiro delay: $\\Delta t \\approx (4 G M_\\odot / c^3) \\ln(4 r_E r_J / b^2)$.',
        '$r_E = 1$ AU, $r_J = 5.2$ AU, impact parameter $b = R_\\odot \\approx 0.00465$ AU.',
        '$4 r_E r_J/b^2 \\approx 4 \\cdot 5.2/(0.00465^2) \\approx 9.6 \\times 10^5$.',
        '$\\ln(9.6\\times 10^5) \\approx 13.8$.',
        '$\\Delta t \\approx 4 \\times 4.93 \\mu\\text{s} \\times 13.8 \\approx 272\\ \\mu\\text{s}$.',
        'Matches Shapiro\'s 1964 prediction (of order 100-300 $\\mu$s).',
      ],
    },
    {
      prompt: 'Gravitational-wave strain from LIGO\'s first detection peaked near $h \\sim 10^{-21}$. If LIGO\'s arms are $L = 4$ km long, what is the peak displacement of each mirror?',
      answer: '$\\Delta L \\approx 4 \\times 10^{-18}\\text{ m}$',
      steps: [
        '$\\Delta L = h L = 10^{-21} \\times 4000\\text{ m}$.',
        '$= 4 \\times 10^{-18}$ m.',
        'That\'s about one-thousandth the diameter of a proton.',
      ],
    },
    {
      prompt: 'A neutron star of mass $1.4 M_\\odot$ and radius 12 km emits light. Compute the gravitational redshift at the surface.',
      answer: '$\\Delta f / f \\approx -0.19$ (using the full Schwarzschild formula)',
      steps: [
        '$r_s = 2.95 \\times 1.4 \\approx 4.13$ km.',
        '$\\sqrt{1 - r_s/R} = \\sqrt{1 - 4.13/12} = \\sqrt{0.656} \\approx 0.810$.',
        'Fractional shift: $f_\\infty/f_{\\text{surf}} - 1 \\approx -0.190$.',
        '19% of the emitted photon energy is lost climbing out of the gravitational well.',
      ],
    },
    {
      prompt: 'Explain in one paragraph why the bending of starlight by the Sun is an "experimental test" of general relativity as opposed to Newtonian gravity.',
      answer: 'Because Newton predicts half the bending angle that GR and experiment give.',
      steps: [
        'Newtonian calculation (treating photons as slow particles with "mass") gives $2 GM/c^2 R$.',
        'GR gives $4 GM/c^2 R$, twice Newton\'s value.',
        'Eddington\'s 1919 eclipse measurement at Principe and Sobral found values consistent with GR, not Newton.',
        'Modern very-long-baseline interferometry measures the effect to 1 part in $10^4$, still in agreement with GR.',
      ],
    },
  ];

  var STATIC_TESTS_CHALLENGE = [
    {
      prompt: 'Show that the formula for the perihelion precession per orbit, $\\Delta\\phi = 6\\pi GM/(c^2 a(1-e^2))$, has dimensions of radians.',
      answer: 'Yes, dimensionally consistent.',
      steps: [
        '$GM/c^2$ has units of length (meters).',
        '$a(1-e^2)$ has units of length.',
        'Ratio is dimensionless.',
        'Multiplying by $6\\pi$ keeps it dimensionless (i.e. radians).',
      ],
    },
    {
      prompt: 'Derive the leading order Shapiro time delay $\\Delta t = (2 GM/c^3) \\ln(\\text{path length}/b)$ using the weak-field Schwarzschild metric.',
      answer: 'From integrating the weak-field line element along a light ray.',
      steps: [
        'Weak-field Schwarzschild: $ds^2 \\approx -(1 - 2 GM/(c^2 r)) c^2 dt^2 + (1 + 2 GM/(c^2 r)) dx^2$.',
        'For a light ray, $ds = 0$, so $dt \\approx (1/c)(1 + 2 GM/(c^2 r)) dx$.',
        'Extra delay: $\\Delta t = (2 GM/c^3)\\int dx/r$.',
        'For a ray with impact parameter $b$, parameterize $r(x) = \\sqrt{x^2 + b^2}$.',
        '$\\int dx/\\sqrt{x^2 + b^2} = \\ln(x + \\sqrt{x^2 + b^2}) + C$.',
        'Over a path from $-x_1$ to $x_2$: $\\ln(2 x_1 \\cdot 2 x_2 / b^2)$.',
        'So $\\Delta t \\approx (2 GM/c^3)\\ln(4 x_1 x_2/b^2)$.',
      ],
      hint: 'Set $ds = 0$ and integrate the correction to $dt$.',
    },
    {
      prompt: 'Why do gravitational waves have two polarizations ($h_+$ and $h_\\times$), while electromagnetic waves also have two polarizations? Is this a coincidence?',
      answer: 'No coincidence — both come from counting degrees of freedom of a massless, spin-2 (or spin-1) field propagating in 3+1 dimensions.',
      steps: [
        'Electromagnetic waves: massless spin-1 field. A spin-1 representation has 3 components, but gauge invariance removes 1, leaving 2 polarizations.',
        'Gravitational waves: massless spin-2 field. The metric has 10 components; coordinate invariance removes 8, leaving 2 polarizations in 4D.',
        'The mathematical framework (representation theory of the Poincare group) gives exactly this in 4D.',
        'In higher dimensions, gravity has more polarizations.',
      ],
    },
    {
      prompt: 'For a binary system of two $1.4 M_\\odot$ neutron stars in a circular orbit with period $T = 8$ hours, estimate how long until they merge due to gravitational-wave emission. (Peters\' formula: $T_{\\text{merge}} \\sim (5/256)(c^5/G^3)(a^4/(m_1 m_2 (m_1 + m_2))$.)',
      answer: '$\\sim$ hundreds of millions of years (order of magnitude)',
      steps: [
        'At $T = 8$ h, use Kepler to get $a \\approx $ a few $\\times 10^9$ m.',
        '$a \\approx (G M T^2/(4\\pi^2))^{1/3} \\approx (6.674 \\times 10^{-11} \\times 2 \\times 1.4 \\times 1.99 \\times 10^{30} \\times 28800^2/(4\\pi^2))^{1/3}$.',
        '$\\approx 2.6 \\times 10^9$ m.',
        'Plug into Peters: $T \\sim 10^{16}$ s, or several hundred million years.',
        'Hulse-Taylor binary pulsar (B1913+16) has period $\\sim 7.75$ h and is predicted to merge in $\\sim 300$ Myr.',
      ],
    },
  ];

  PS.registerTopic("phys-gr-tests", {
    title: "Observational tests of GR",
    description: "Mercury, starlight bending, gravitational waves, Shapiro delay.",
    warmup:   STATIC_TESTS_WARMUP,
    standard: STATIC_TESTS_STANDARD,
    challenge: STATIC_TESTS_CHALLENGE,
  });

})();
