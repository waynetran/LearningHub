/*
 * LearningHub — Cosmology Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   phys-cosmo-friedmann — the Friedmann equations, scale factor, Hubble rate
 *   phys-cosmo-cmb       — CMB physics, recombination, acoustic peaks
 *   phys-cosmo-dark      — dark matter evidence and dark-energy basics
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[cosmology-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-cosmo-friedmann
  // ============================================================
  var FRIEDMANN_WARMUP = [
    {
      prompt: 'State the first Friedmann equation for a spatially flat universe.',
      answer: '$H^2 = \\dfrac{8\\pi G}{3}\\,\\rho$, where $H = \\dot a / a$.',
      steps: [
        'Start from Einstein\'s equations with an FLRW metric $ds^2 = -dt^2 + a(t)^2\\,d\\mathbf{x}^2$.',
        'Plug in a homogeneous perfect-fluid stress tensor with energy density $\\rho$ and pressure $p$.',
        'The time-time component gives $H^2 = (8\\pi G/3)\\rho - k/a^2$; for flat space $k=0$, leaving $H^2 = 8\\pi G\\rho/3$.',
      ],
    },
    {
      prompt: 'Define the Hubble parameter $H$ in terms of the scale factor $a(t)$.',
      answer: '$H(t) \\equiv \\dot a(t) / a(t)$.',
      steps: [
        '$a(t)$ is the dimensionless scale factor, normalized so that $a(t_0) = 1$ today.',
        'Its time derivative $\\dot a$ gives the rate at which cosmic distances stretch.',
        'Dividing by $a$ converts that stretch rate into a fractional rate per unit time, with units of inverse time.',
      ],
    },
    {
      prompt: 'Roughly, what is the present-day Hubble constant $H_0$ in SI-friendly units?',
      answer: '$H_0 \\approx 70\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}} \\approx 2.3 \\times 10^{-18}\\ \\mathrm{s^{-1}}$.',
      steps: [
        '$1\\ \\mathrm{Mpc} \\approx 3.086 \\times 10^{19}\\ \\mathrm{km}$.',
        '$H_0 = 70 / (3.086\\times 10^{19})\\ \\mathrm{s^{-1}}$.',
        '$\\approx 2.27 \\times 10^{-18}\\ \\mathrm{s^{-1}}$.',
      ],
    },
    {
      prompt: 'Why is $1/H_0$ called the "Hubble time"? Give its approximate value.',
      answer: '$1/H_0 \\approx 14$ Gyr; it is a rough estimate of the age of the universe.',
      steps: [
        'For a constant-expansion-rate universe, $a(t) \\propto t$ gives exactly $t = 1/H_0$.',
        'Real cosmology has deceleration then acceleration, but $1/H_0$ lands close to the true age for $\\Lambda$CDM.',
        'Convert: $1/(2.27\\times 10^{-18}\\ \\mathrm{s^{-1}}) \\approx 4.4\\times 10^{17}\\ \\mathrm{s} \\approx 14\\ \\mathrm{Gyr}$.',
      ],
    },
    {
      prompt: 'State the critical density $\\rho_c$ and give its physical meaning.',
      answer: '$\\rho_c = 3 H^2/(8\\pi G)$; the energy density that would make the universe exactly spatially flat.',
      steps: [
        'Set $k=0$ in the Friedmann equation: $H^2 = (8\\pi G/3)\\rho$.',
        'Solve for $\\rho$: $\\rho_c = 3 H^2/(8\\pi G)$.',
        'If $\\rho > \\rho_c$ the universe is closed ($k>0$); if $\\rho < \\rho_c$, open.',
      ],
    },
  ];

  var FRIEDMANN_STANDARD = [
    {
      prompt: 'Compute today\'s critical density numerically using $H_0 = 70\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$.',
      answer: '$\\rho_c \\approx 9.2 \\times 10^{-27}\\ \\mathrm{kg\\,m^{-3}}$ (about 5 hydrogen atoms per cubic meter).',
      steps: [
        'Convert $H_0$ to SI: $H_0 = 2.27\\times 10^{-18}\\ \\mathrm{s^{-1}}$.',
        '$\\rho_c = 3H_0^2/(8\\pi G) = 3(2.27\\times 10^{-18})^2 / (8\\pi \\cdot 6.674\\times 10^{-11})$.',
        'Numerator: $\\approx 1.55\\times 10^{-35}$. Denominator: $\\approx 1.68\\times 10^{-9}$.',
        'Ratio: $\\rho_c \\approx 9.2\\times 10^{-27}\\ \\mathrm{kg\\,m^{-3}}$.',
      ],
    },
    {
      prompt: 'For a matter-dominated flat universe, derive $a(t) \\propto t^{2/3}$.',
      answer: 'Matter scales as $\\rho \\propto a^{-3}$, so $H^2 \\propto a^{-3}$; solving gives $a \\propto t^{2/3}$.',
      steps: [
        'Matter density dilutes as the volume: $\\rho_m \\propto a^{-3}$.',
        'Friedmann: $(\\dot a/a)^2 = (8\\pi G/3)\\rho_{m,0}\\,a^{-3}$.',
        'Rearrange: $\\dot a\\,a^{1/2} = \\mathrm{const}$.',
        'Integrate: $a^{3/2} \\propto t$, so $a \\propto t^{2/3}$.',
      ],
    },
    {
      prompt: 'Derive $a(t) \\propto t^{1/2}$ for a radiation-dominated flat universe.',
      answer: 'Radiation scales as $\\rho \\propto a^{-4}$, giving $a \\propto t^{1/2}$.',
      steps: [
        'Photon number density dilutes as $a^{-3}$, and each photon\'s energy redshifts as $a^{-1}$, so $\\rho_r \\propto a^{-4}$.',
        'Friedmann: $(\\dot a/a)^2 \\propto a^{-4}$.',
        'So $\\dot a \\propto a^{-1}$.',
        'Integrating, $a^2 \\propto t$, giving $a \\propto t^{1/2}$.',
      ],
    },
    {
      prompt: 'In a $\\Lambda$-dominated flat universe, show $a(t) \\propto e^{Ht}$.',
      answer: 'A cosmological constant has $\\rho = \\mathrm{const}$, so $H$ is constant and $a(t) = a_0 e^{H(t-t_0)}$.',
      steps: [
        'Dark energy (cosmological constant) has $\\rho_\\Lambda = \\mathrm{const}$.',
        '$H^2 = 8\\pi G\\rho_\\Lambda/3 = \\mathrm{const}$, so $H = H_\\Lambda$.',
        'The ODE $\\dot a = H_\\Lambda a$ integrates to $a \\propto e^{H_\\Lambda t}$.',
        'This is de Sitter expansion — the asymptotic fate of our universe.',
      ],
    },
    {
      prompt: 'Light emitted at scale factor $a_{\\rm em} = 0.5$ is observed today. What is its redshift $z$?',
      answer: '$z = 1$.',
      steps: [
        'Redshift is defined by $1 + z = a_{\\rm obs}/a_{\\rm em}$.',
        'Today $a_{\\rm obs} = 1$ and $a_{\\rm em} = 0.5$.',
        '$1 + z = 1/0.5 = 2$, so $z = 1$.',
      ],
    },
  ];

  var FRIEDMANN_CHALLENGE = [
    {
      prompt: 'Using the measured density parameters $\\Omega_m \\approx 0.31$ and $\\Omega_\\Lambda \\approx 0.69$, estimate the matter-$\\Lambda$ equality redshift $z_{\\rm eq,m\\Lambda}$.',
      answer: '$z_{\\rm eq,m\\Lambda} \\approx 0.3$ (just recent cosmic history).',
      steps: [
        'Matter scales as $\\Omega_m (1+z)^3$; $\\Lambda$ stays constant at $\\Omega_\\Lambda$.',
        'Set them equal: $\\Omega_m(1+z)^3 = \\Omega_\\Lambda$.',
        '$(1+z)^3 = 0.69/0.31 \\approx 2.23$.',
        '$1+z \\approx 1.31$, so $z \\approx 0.31$.',
      ],
    },
    {
      prompt: 'Derive the second Friedmann (acceleration) equation, $\\ddot a/a = -(4\\pi G/3)(\\rho + 3p)$, and explain why dark energy with $p = -\\rho$ accelerates expansion.',
      answer: 'Differentiating the first Friedmann equation and using continuity gives the acceleration equation; when $p<-\\rho/3$, $\\ddot a > 0$.',
      steps: [
        'Start from $H^2 = (8\\pi G/3)\\rho$ and the continuity equation $\\dot\\rho + 3H(\\rho+p)=0$.',
        'Differentiate $H^2$ with respect to time, substitute $\\dot\\rho$, and simplify.',
        'Result: $\\ddot a/a = -(4\\pi G/3)(\\rho + 3p)$.',
        'For $p = -\\rho$ (cosmological constant), $\\rho+3p = -2\\rho < 0$, so $\\ddot a > 0$ — acceleration.',
      ],
    },
    {
      prompt: 'Estimate the age of the universe in a flat $\\Lambda$CDM cosmology with $\\Omega_m = 0.3$, $\\Omega_\\Lambda = 0.7$ and $H_0 = 70\\ \\mathrm{km/s/Mpc}$, explaining why the answer is close to the naive $1/H_0$.',
      answer: 'About 13.5 Gyr — within a few percent of $1/H_0 \\approx 14$ Gyr.',
      steps: [
        'Integrate $t_0 = \\int_0^1 da/(aH(a))$ with $H(a) = H_0\\sqrt{\\Omega_m a^{-3} + \\Omega_\\Lambda}$.',
        'The integrand is larger in the matter era and smaller in the $\\Lambda$ era; the net effect is a modest $\\sim$5% correction to $1/H_0$.',
        'Evaluating numerically: $t_0 \\approx 0.96/H_0 \\approx 13.5$ Gyr.',
        'The closeness is a coincidence of $\\Omega_m \\approx 0.3$, not a general rule.',
      ],
    },
  ];

  PS.registerTopic("phys-cosmo-friedmann", {
    title: "The Friedmann equations",
    description: "How the scale factor evolves, why matter/radiation/Λ eras differ, and the basic numerical scales of the expanding universe.",
    warmup: FRIEDMANN_WARMUP,
    standard: FRIEDMANN_STANDARD,
    challenge: FRIEDMANN_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-cosmo-cmb
  // ============================================================
  var CMB_WARMUP = [
    {
      prompt: 'What temperature is the CMB today, and what is its spectrum?',
      answer: '$T_0 \\approx 2.725\\ \\mathrm{K}$, a near-perfect blackbody.',
      steps: [
        'COBE/FIRAS measured the CMB spectrum to be blackbody to within $10^{-5}$.',
        'The temperature today is $T_0 = 2.7255 \\pm 0.0006$ K.',
        'It is the most perfect blackbody ever measured.',
      ],
    },
    {
      prompt: 'Roughly, at what redshift did the CMB photons decouple from matter?',
      answer: '$z \\approx 1100$.',
      steps: [
        'Before recombination the universe was a hot plasma, opaque to light.',
        'At $T \\sim 3000$ K, protons and electrons combine into neutral hydrogen.',
        'The CMB temperature today ($2.725$ K) is $\\sim 3000/2.725 \\approx 1100$ times colder, corresponding to $z \\approx 1100$.',
      ],
    },
    {
      prompt: 'Why does recombination happen at $kT \\approx 0.3$ eV even though hydrogen binding energy is 13.6 eV?',
      answer: 'Photons outnumber baryons by $\\sim 10^9$, so even the Wien tail of the blackbody keeps ionizing hydrogen until $T$ drops well below $13.6\\,\\mathrm{eV}/k$.',
      steps: [
        'The photon-to-baryon ratio $\\eta \\sim 10^{-9}$ means there are about a billion photons per baryon.',
        'Even a tiny fraction $e^{-E/kT}$ of photons above 13.6 eV is still enough to ionize hydrogen.',
        'You have to cool to $T \\approx 3000$ K before that Boltzmann-suppressed tail finally runs out.',
      ],
    },
    {
      prompt: 'What is the "surface of last scattering"?',
      answer: 'The spherical shell around us from which the CMB photons last scattered before free-streaming — effectively a snapshot at $z \\approx 1100$.',
      steps: [
        'Before recombination, photons bounce off free electrons constantly.',
        'After recombination, photons travel freely. We see each photon from its last scattering event.',
        'Geometrically, those events form a sphere centered on us at the recombination epoch.',
      ],
    },
    {
      prompt: 'What physical process is responsible for the acoustic peaks in the CMB power spectrum?',
      answer: 'Sound waves in the photon-baryon plasma before recombination, "frozen" when the plasma decoupled.',
      steps: [
        'Dark-matter gravitational wells pull photon-baryon fluid in; radiation pressure pushes it out.',
        'This produces oscillations in each Fourier mode of the plasma — baryon acoustic oscillations.',
        'At recombination, the photons escape and carry the density/temperature pattern at that instant.',
        'Fourier modes at "in-phase" moments show up as peaks in the angular power spectrum $C_\\ell$.',
      ],
    },
  ];

  var CMB_STANDARD = [
    {
      prompt: 'Show that a blackbody spectrum redshifts into another blackbody with temperature $T\'=T/(1+z)$.',
      answer: 'Frequencies redshift uniformly, which rescales the Planck spectrum into a new blackbody at a lower temperature.',
      steps: [
        'The Planck spectrum depends only on $h\\nu/kT$.',
        'Under cosmological redshift, each frequency $\\nu$ maps to $\\nu/(1+z)$.',
        'If $T$ is simultaneously rescaled to $T/(1+z)$, the combination $h\\nu/kT$ is preserved.',
        'So the spectrum stays Planckian; the temperature just cools by $1+z$.',
      ],
    },
    {
      prompt: 'Estimate the angular scale of the first acoustic peak in the CMB. Why is it near 1°?',
      answer: 'The sound horizon at recombination projects to about 1° on the sky, giving the first peak at $\\ell \\approx 220$.',
      steps: [
        'Sound speed in the photon-baryon fluid: $c_s \\approx c/\\sqrt{3}$.',
        'Time to recombination: $t_{\\rm rec} \\sim 380{,}000$ yr.',
        'Sound horizon: $r_s \\sim c_s t_{\\rm rec} \\sim 150$ Mpc (comoving).',
        'Angular diameter distance to last scattering is $\\sim 14{,}000$ Mpc, so $\\theta \\sim r_s/d_A \\sim 1°$, i.e. $\\ell \\approx 180/\\theta \\approx 200$.',
      ],
    },
    {
      prompt: 'Why are the CMB temperature fluctuations only about $10^{-5}$ of the mean temperature?',
      answer: 'They track the density perturbations at recombination, which were themselves at the $10^{-5}$ level — small but enough to seed all structure.',
      steps: [
        'Measured anisotropies are $\\Delta T/T \\sim 10^{-5}$ (COBE, WMAP, Planck).',
        'These reflect density perturbations from inflation that had been growing linearly.',
        'Smaller amplitude is natural for linear perturbations; after recombination, dark-matter perturbations grow as $a(t)$, reaching order unity only at $z \\sim 1$.',
      ],
    },
    {
      prompt: 'What does the position of the first peak tell us about cosmic curvature?',
      answer: 'It pins down the angular-diameter distance to recombination, which depends on total density. A peak near $\\ell \\approx 220$ implies $\\Omega_{\\rm tot} \\approx 1$ — the universe is flat.',
      steps: [
        'Spatial curvature bends the geodesics that photons travel, changing the apparent size of the sound horizon.',
        'Closed universes make the peak appear at larger scales (lower $\\ell$).',
        'Open universes shift it to smaller scales (higher $\\ell$).',
        'Observed peak position matches flat geometry to $\\sim 0.5\\%$.',
      ],
    },
    {
      prompt: 'Why does the CMB contain information about the baryon density specifically?',
      answer: 'Baryons give the photon-baryon fluid inertia, which breaks the symmetry between compression and rarefaction peaks — the odd:even peak ratio fixes $\\Omega_b$.',
      steps: [
        'Without baryons, the plasma would oscillate symmetrically around zero.',
        'Baryons load the oscillation, enhancing compressions (first, third, ... peaks).',
        'The height ratio of peak 2 vs peak 1 is therefore sensitive to the baryon-to-photon ratio.',
        'Planck measures $\\Omega_b h^2 \\approx 0.0224$.',
      ],
    },
  ];

  var CMB_CHALLENGE = [
    {
      prompt: 'The Silk damping scale suppresses CMB fluctuations on small angular scales. Explain physically what causes it.',
      answer: 'Photon diffusion: photons random-walk out of small overdensities before recombination, washing out anisotropies on scales smaller than the photon mean free path.',
      steps: [
        'Photon mean free path grows near recombination as electron density drops.',
        'On scales shorter than the photon diffusion length, overdensities and underdensities mix.',
        'This produces an exponential damping tail in the power spectrum at high $\\ell$ (small scales).',
        'Observed by Planck at $\\ell \\gtrsim 1500$.',
      ],
    },
    {
      prompt: 'Estimate the number of photons per cubic centimeter in the CMB today.',
      answer: '$n_\\gamma \\approx 411\\ \\mathrm{cm^{-3}}$.',
      steps: [
        'For a blackbody, $n_\\gamma = (2\\zeta(3)/\\pi^2)(kT/\\hbar c)^3$.',
        'Plug in $T = 2.725$ K, $kT/\\hbar c = (2.725 \\times 1.38\\times 10^{-23})/(1.055\\times 10^{-34}\\cdot 3\\times 10^{8})$.',
        'That works out to $\\approx 120\\ \\mathrm{m^{-1}} = 1.2\\ \\mathrm{cm^{-1}}$.',
        'Cubing and multiplying by $2\\zeta(3)/\\pi^2 \\approx 0.244$ gives $n_\\gamma \\approx 411\\ \\mathrm{cm^{-3}}$.',
      ],
    },
    {
      prompt: 'How do CMB polarization "E-modes" and "B-modes" differ, and why are primordial B-modes a holy grail of observational cosmology?',
      answer: 'E-modes are curl-free patterns from scalar density perturbations; B-modes are divergence-free and can only be produced by gravitational waves (or foreground/lensing). Primordial B-modes would be a direct signature of inflationary tensor modes.',
      steps: [
        'Thomson scattering polarizes CMB photons when the incoming radiation field is quadrupolar.',
        'Density (scalar) perturbations can only produce E-mode patterns.',
        'Tensor perturbations (gravitational waves) generate both E and B.',
        'Detecting a primordial B-mode pattern would pin down inflation\'s energy scale.',
      ],
    },
  ];

  PS.registerTopic("phys-cosmo-cmb", {
    title: "The cosmic microwave background",
    description: "Recombination, the acoustic peaks, and what the CMB tells us about cosmological parameters.",
    warmup: CMB_WARMUP,
    standard: CMB_STANDARD,
    challenge: CMB_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-cosmo-dark
  // ============================================================
  var DARK_WARMUP = [
    {
      prompt: 'Name three independent lines of evidence that dark matter exists.',
      answer: 'Galaxy rotation curves, CMB acoustic peaks, and gravitational lensing (e.g., the Bullet Cluster).',
      steps: [
        'Rotation curves: stars in galaxies orbit too fast at large radii given the visible mass.',
        'CMB peaks: the relative heights fix the ratio of baryonic to total matter, pointing to a non-baryonic component.',
        'Lensing: e.g., the Bullet Cluster shows mass distributed differently from hot X-ray gas — consistent with collisionless dark matter.',
      ],
    },
    {
      prompt: 'Why can\'t dark matter simply be faint baryonic matter (cold gas, dim stars, or brown dwarfs)?',
      answer: 'Big Bang nucleosynthesis and CMB both fix the total baryon density to about 5% of critical, far below the $\\sim 27\\%$ total matter density.',
      steps: [
        'Primordial abundances of D, $^3$He, $^4$He depend on $\\Omega_b h^2$.',
        'BBN gives $\\Omega_b \\approx 0.05$.',
        'CMB peak heights independently give $\\Omega_b h^2 \\approx 0.0224$, consistent with BBN.',
        'Total matter is $\\Omega_m \\approx 0.31$, so $\\sim 5/6$ of matter must be non-baryonic.',
      ],
    },
    {
      prompt: 'Roughly what fraction of the current energy budget is dark energy, dark matter, and ordinary baryonic matter?',
      answer: '$\\sim 69\\%$ dark energy, $\\sim 26\\%$ dark matter, $\\sim 5\\%$ baryons.',
      steps: [
        'From Planck 2018: $\\Omega_\\Lambda \\approx 0.685$, $\\Omega_m \\approx 0.315$.',
        'Within matter, $\\Omega_b \\approx 0.049$ and $\\Omega_{\\rm cdm} \\approx 0.266$.',
        'Neutrinos contribute $\\lesssim 0.5\\%$.',
      ],
    },
    {
      prompt: 'What is the equation of state parameter $w$, and what value does a cosmological constant have?',
      answer: '$w \\equiv p/\\rho$; for $\\Lambda$, $w = -1$.',
      steps: [
        'Perfect-fluid energy-momentum tensors obey $p = w\\rho$.',
        'Dust (pressureless matter): $w = 0$.',
        'Radiation: $w = 1/3$.',
        'Cosmological constant: $w = -1$ exactly.',
      ],
    },
    {
      prompt: 'What does "$\\Lambda$CDM" stand for?',
      answer: 'Cosmological constant ($\\Lambda$) plus Cold Dark Matter — the standard model of cosmology.',
      steps: [
        '$\\Lambda$ represents dark energy as a cosmological constant.',
        'CDM is cold (non-relativistic), collisionless, non-baryonic dark matter.',
        'The two together plus known Standard-Model particles fit essentially all current data.',
      ],
    },
  ];

  var DARK_STANDARD = [
    {
      prompt: 'A galaxy rotation curve is roughly flat at $v_{\\rm rot} \\approx 200\\ \\mathrm{km/s}$ out to $r = 30\\ \\mathrm{kpc}$. Estimate the enclosed mass.',
      answer: '$M(r) \\approx 2.8 \\times 10^{11}\\,M_\\odot$.',
      steps: [
        'Circular orbit: $GM/r = v^2$, so $M = v^2 r / G$.',
        'Convert: $r = 30\\ \\mathrm{kpc} = 9.26\\times 10^{20}$ m; $v = 2\\times 10^5$ m/s.',
        '$M = (2\\times 10^5)^2 \\cdot 9.26\\times 10^{20} / 6.674\\times 10^{-11}$.',
        '$\\approx 5.55\\times 10^{41}$ kg $\\approx 2.8\\times 10^{11}\\,M_\\odot$ (one solar mass = $2\\times 10^{30}$ kg).',
      ],
    },
    {
      prompt: 'Why does a flat rotation curve at large $r$ imply a density profile $\\rho(r) \\propto 1/r^2$?',
      answer: 'If $v(r) = \\mathrm{const}$, then $M(r) \\propto r$, and $\\rho = (dM/dr)/(4\\pi r^2) \\propto 1/r^2$.',
      steps: [
        'Flat rotation curve means $v^2 = GM(r)/r = \\mathrm{const}$, so $M(r) \\propto r$.',
        'Differentiating: $dM/dr = \\mathrm{const}$.',
        'Density: $\\rho(r) = (dM/dr) / (4\\pi r^2) \\propto r^{-2}$.',
        'This is an isothermal-sphere profile, an idealization of real dark-matter halos.',
      ],
    },
    {
      prompt: 'Explain why the Bullet Cluster is considered a strong empirical case against modified gravity as an alternative to dark matter.',
      answer: 'The lensing mass is offset from the hot X-ray gas (the dominant baryonic component), so gravitational mass is not simply tracking the visible matter.',
      steps: [
        'Two galaxy clusters collided and passed through each other.',
        'The hot ICM gas interacted electromagnetically and decelerated.',
        'Galaxies and their dark-matter halos (collisionless) sailed through.',
        'Lensing maps show mass centered on the galaxies, not the X-ray gas — consistent with collisionless dark matter, hard to explain with purely modified gravity.',
      ],
    },
    {
      prompt: 'Why doesn\'t neutrino mass solve the dark-matter problem?',
      answer: 'Neutrinos are "hot" (relativistic when they decouple), so they free-stream out of perturbations and cannot seed the observed small-scale structure.',
      steps: [
        'Hot dark matter (HDM) suppresses structure on small scales below the neutrino free-streaming length.',
        'Observed galaxy clustering at small scales requires cold (non-relativistic) dark matter.',
        'Current bounds: $\\sum m_\\nu \\lesssim 0.12$ eV, only $\\sim 0.5\\%$ of $\\Omega_m$.',
      ],
    },
    {
      prompt: 'What does a measurement of $w = -1$ for dark energy tell us, and what would $w \\ne -1$ imply?',
      answer: '$w=-1$ is consistent with a true cosmological constant; $w \\ne -1$ would imply dynamical dark energy (e.g., a quintessence field).',
      steps: [
        'Pure $\\Lambda$ has $w = -1$ exactly and constant in time.',
        'Quintessence (a slowly-rolling scalar) has $w$ close to but not exactly $-1$.',
        'Phantom dark energy with $w < -1$ would lead to a "Big Rip".',
        'Current data: $w = -1.03 \\pm 0.03$, consistent with $\\Lambda$.',
      ],
    },
  ];

  var DARK_CHALLENGE = [
    {
      prompt: 'The coincidence problem asks: why are $\\Omega_m$ and $\\Omega_\\Lambda$ within a factor of 2–3 today, despite scaling differently with $a$? Give one explanation and one objection.',
      answer: 'Anthropic selection argues we observe at the only epoch with structure and observers; objection: it requires accepting a multiverse prior and is not predictive.',
      steps: [
        'Matter ($\\propto a^{-3}$) dominates early; $\\Lambda$ (constant) dominates late. Near-equality is a narrow time window.',
        'Anthropic argument: galaxies must have formed, which requires $\\Lambda$ not too large, and observers exist only near the transition epoch.',
        'Objection: depends on unobservable multiverse priors and cannot be tested directly.',
      ],
    },
    {
      prompt: 'Derive the redshift $z_{\\rm eq}$ at which matter and radiation had equal energy density, given $\\Omega_{m,0}=0.3$ and $\\Omega_{r,0}=9\\times 10^{-5}$.',
      answer: '$z_{\\rm eq} \\approx 3300$.',
      steps: [
        'Matter: $\\rho_m \\propto (1+z)^3$. Radiation: $\\rho_r \\propto (1+z)^4$.',
        'Set $\\Omega_{m,0}(1+z)^3 = \\Omega_{r,0}(1+z)^4$.',
        '$1+z = \\Omega_{m,0}/\\Omega_{r,0} = 0.3/9\\times 10^{-5} \\approx 3333$.',
        'So $z_{\\rm eq} \\approx 3300$, well before recombination at $z \\approx 1100$.',
      ],
    },
    {
      prompt: 'Dark-matter direct-detection experiments place upper bounds on the WIMP-nucleon cross section at $\\sim 10^{-47}\\ \\mathrm{cm^2}$. Discuss in a paragraph what that has ruled out and what it hasn\'t.',
      answer: 'WIMPs that interact at weak-scale strengths are nearly excluded for the 10 GeV–1 TeV mass window, but light DM ($<5$ GeV), very heavy DM, ultra-light fields (axions, fuzzy DM), and self-interacting sectors are still open.',
      steps: [
        'Direct-detection nuclear recoils are most sensitive in the 10–1000 GeV mass range.',
        'The "vanilla" supersymmetric neutralino that motivated WIMP searches is now squeezed.',
        'Light DM is probed with electron-recoil targets (SENSEI, DAMIC).',
        'Axion DM uses haloscopes like ADMX in a different frequency band entirely.',
      ],
    },
  ];

  PS.registerTopic("phys-cosmo-dark", {
    title: "Dark matter and dark energy",
    description: "Evidence, physical parameters, and what the observations rule out.",
    warmup: DARK_WARMUP,
    standard: DARK_STANDARD,
    challenge: DARK_CHALLENGE,
  });

})();
