/*
 * LearningHub - Quantum Field Theory Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   phys-qft-fields   - field quantization, commutators, vacuum
 *   phys-qft-feynman  - reading diagrams, Feynman rules, vertex counting
 *   phys-qft-renorm   - cutoffs, running couplings, loop estimates
 *
 * Content is mostly conceptual; a few order-of-magnitude numerical
 * problems are mixed in where they illuminate the physics.
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[qft-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-qft-fields
  // ============================================================
  var QFT_FIELDS_WARMUP = [
    {
      prompt: 'What is the physical interpretation of applying the creation operator $a^\\dagger_k$ to the vacuum state $|0\\rangle$?',
      answer: 'It produces a one-particle state with momentum $\\vec k$.',
      steps: [
        '$|0\\rangle$ is defined so that every annihilation operator acting on it gives zero.',
        'The creation operator is the Hermitian conjugate of the annihilation operator.',
        '$a^\\dagger_k |0\\rangle$ is, by construction, a one-particle eigenstate of momentum $\\vec k$ with energy $\\omega_k = \\sqrt{|\\vec k|^2 + m^2}$.',
      ],
    },
    {
      prompt: 'Why does quantum mechanics alone fail to describe processes like $e^- e^+ \\to 2\\gamma$?',
      answer: 'It assumes a fixed particle number. QFT is required because relativistic collisions create and destroy particles.',
      steps: [
        'Ordinary quantum mechanics writes a wavefunction $\\psi(\\vec x_1, \\vec x_2, \\dots)$ for a fixed number of particles.',
        'Pair annihilation removes matter particles and adds photons, changing the particle count.',
        'QFT builds the Fock space so state vectors can span any particle number, with creation/annihilation operators moving between sectors.',
      ],
    },
    {
      prompt: 'A free scalar field has dispersion $\\omega_k = \\sqrt{|\\vec k|^2 + m^2}$. What is the rest energy of a single quantum at rest?',
      answer: '$\\omega_0 = m$ (in natural units), i.e. $m c^2$ in SI.',
      steps: [
        'Set $\\vec k = 0$, so $|\\vec k|^2 = 0$.',
        '$\\omega_0 = \\sqrt{m^2} = m$.',
        'Restoring units gives $E_0 = m c^2$, the familiar Einstein formula.',
      ],
    },
    {
      prompt: 'Show that $[\\hat\\phi(\\vec x, t), \\hat\\phi(\\vec y, t)] = 0$ at equal times for a free scalar field.',
      answer: 'Yes: equal-time field commutators vanish.',
      steps: [
        'Expand $\\hat\\phi$ in creation and annihilation operators.',
        'All $a a$ and $a^\\dagger a^\\dagger$ pieces commute with themselves.',
        'The $a a^\\dagger$ cross terms produce matching signs at equal times and cancel.',
        'This is required by microcausality — spacelike-separated field operators must commute.',
      ],
    },
    {
      prompt: 'What distinguishes a classical field from a quantum field, in one sentence?',
      answer: 'A quantum field assigns an operator (not a number) to each spacetime point.',
      steps: [
        'Classically, $\\phi(x)$ is a function valued in $\\mathbb{R}$ (or a vector space).',
        'Quantum mechanically, $\\hat\\phi(x)$ is an operator on a Hilbert space.',
        'Measuring the field gives an eigenvalue of $\\hat\\phi$; the classical value is recovered as an expectation in coherent states.',
      ],
    },
    {
      prompt: 'Why is the Klein-Gordon equation insufficient for spin-$\\tfrac{1}{2}$ particles?',
      answer: 'It describes scalars (spin 0). Spin-$\\tfrac12$ needs the Dirac equation.',
      steps: [
        'A one-component field has no place to store spin.',
        'Dirac found a first-order linear equation whose solutions are four-component spinors.',
        'Those four components encode particle/antiparticle and spin-up/spin-down.',
      ],
    },
    {
      prompt: 'State the relativistic mass-energy-momentum relation used to build the Klein-Gordon equation.',
      answer: '$E^2 = p^2 c^2 + m^2 c^4$.',
      steps: [
        'Promote $E \\to i\\hbar\\partial_t$ and $\\vec p \\to -i\\hbar\\nabla$.',
        'Squaring and acting on $\\phi$ gives $(\\partial_t^2 - c^2\\nabla^2 + m^2 c^4/\\hbar^2)\\phi = 0$.',
        'This is the Klein-Gordon equation in SI units.',
      ],
    },
    {
      prompt: 'Why does the vacuum of a free field have nonzero energy?',
      answer: 'Each mode behaves like a quantum harmonic oscillator and has ground-state energy $\\tfrac12 \\hbar \\omega$.',
      steps: [
        'Expand the field in normal modes.',
        'Each mode is a decoupled harmonic oscillator with ladder $E_n = \\hbar\\omega(n+\\tfrac12)$.',
        'Summing the $\\tfrac12\\hbar\\omega$ pieces over all modes gives the (divergent) vacuum energy.',
      ],
    },
  ];

  var QFT_FIELDS_STANDARD = [
    {
      prompt: 'Starting from $[a_k, a^\\dagger_{k\'}] = (2\\pi)^3 \\delta^3(\\vec k - \\vec k\')$, show that the number operator $\\hat N_k = a^\\dagger_k a_k$ has non-negative integer eigenvalues.',
      answer: 'Eigenvalues of $\\hat N_k$ are $0, 1, 2, \\ldots$.',
      steps: [
        '$[\\hat N_k, a^\\dagger_k] = a^\\dagger_k$ and $[\\hat N_k, a_k] = -a_k$.',
        'If $\\hat N_k|n\\rangle = n|n\\rangle$, then $a^\\dagger_k|n\\rangle$ has eigenvalue $n+1$ and $a_k|n\\rangle$ has eigenvalue $n-1$.',
        'Positivity of norms forces the ladder to terminate at $n=0$, where $a_k|0\\rangle = 0$.',
        'All eigenvalues are therefore non-negative integers.',
      ],
    },
    {
      prompt: 'Explain why equal-time canonical commutation relations imply that information cannot travel faster than light in a QFT.',
      answer: 'Because spacelike-separated field operators commute, measurements at spacelike separation cannot influence each other.',
      steps: [
        'The commutator $[\\hat\\phi(x), \\hat\\phi(y)]$ vanishes when $(x-y)^2 < 0$ (spacelike).',
        'Local observables are built from field products, so they also commute at spacelike separation.',
        'Quantum measurement of commuting observables gives statistically independent results.',
        'Therefore an experiment at $x$ cannot transmit information to $y$ faster than light — microcausality.',
      ],
    },
    {
      prompt: 'A real scalar field has one degree of freedom per spacetime point. How many does a complex scalar field have, and what is the physical consequence?',
      answer: 'Two degrees of freedom. The quanta include both particles and distinct antiparticles.',
      steps: [
        'A complex scalar is two real scalars, $\\phi = (\\phi_1 + i\\phi_2)/\\sqrt{2}$.',
        'The field now carries a $U(1)$ symmetry $\\phi \\to e^{i\\alpha}\\phi$, whose Noether charge is particle number.',
        'Quantization gives two sets of ladder operators: one for particles (charge $+1$) and one for antiparticles (charge $-1$).',
      ],
    },
    {
      prompt: 'Why is it natural to use "natural units" $\\hbar = c = 1$ in QFT?',
      answer: 'Lengths, times, and energies become interchangeable, so Lorentz invariance is manifest and formulas shorten.',
      steps: [
        'With $c = 1$, $[L] = [T]$ and $[E] = [M]$.',
        'With $\\hbar = 1$, $[L] = [E]^{-1}$, so every quantity is measured in powers of energy.',
        'This trivializes dimensional analysis and lets you focus on the physics.',
      ],
    },
    {
      prompt: 'The QED interaction gives rise to "vacuum polarization" — what is it, physically?',
      answer: 'Virtual electron-positron pairs in the vacuum partially screen any electric charge, so the effective charge depends on distance.',
      steps: [
        'A bare charge polarizes nearby virtual pairs: positrons drift toward it, electrons away.',
        'At large distances the charge you measure is the screened value.',
        'At short distances (high momentum transfer), you probe through more of the screen and see a larger effective charge.',
        'This is the physical origin of the running fine-structure constant.',
      ],
    },
    {
      prompt: 'Explain why the photon is massless in QED.',
      answer: 'Gauge invariance under local $U(1)$ phase rotations forbids a $\\tfrac12 m_\\gamma^2 A_\\mu A^\\mu$ term.',
      steps: [
        'Under $A_\\mu \\to A_\\mu - \\partial_\\mu \\alpha(x)$, the product $A_\\mu A^\\mu$ is not invariant.',
        'The kinetic term $-\\tfrac14 F_{\\mu\\nu} F^{\\mu\\nu}$ is invariant but contains no mass.',
        'Renormalization cannot generate a photon mass as long as gauge invariance is preserved.',
        'The observational bound on the photon mass is below $10^{-18}$ eV.',
      ],
    },
    {
      prompt: 'What physically distinguishes a Lagrangian density $\\mathcal{L}$ from an ordinary Lagrangian $L$?',
      answer: '$\\mathcal{L}$ is an energy-density; integrating over spatial volume gives $L$, and integrating over spacetime gives the action $S$.',
      steps: [
        '$L = \\int d^3 x\\, \\mathcal{L}$, so $\\mathcal{L}$ has units of energy per volume.',
        '$S = \\int dt\\, L = \\int d^4 x\\, \\mathcal{L}$.',
        'Working directly with $\\mathcal{L}$ keeps Lorentz invariance manifest.',
      ],
    },
    {
      prompt: 'Why does the Higgs boson get a $\\phi^4$ self-interaction term in the Standard Model?',
      answer: 'Because gauge and Lorentz invariance allow it, and renormalizability actually requires it in the scalar sector.',
      steps: [
        'Scalar fields in 4D are dimensionless up to energy scale; terms $\\phi^n$ with $n \\le 4$ are renormalizable.',
        '$\\phi^4$ is the only nontrivial self-interaction below the renormalizability bound in 4D.',
        'The Higgs potential is $V(\\phi) = -\\mu^2 \\phi^2 + \\lambda \\phi^4$, giving spontaneous symmetry breaking.',
      ],
    },
    {
      prompt: 'Compute the commutator $[a_k a_{k\'}, a^\\dagger_{k\'\'}]$.',
      answer: '$a_k (2\\pi)^3 \\delta^3(\\vec k\' - \\vec k\'\'\') + a_{k\'} (2\\pi)^3 \\delta^3(\\vec k - \\vec k\'\'\')$',
      steps: [
        'Use $[AB, C] = A[B, C] + [A, C]B$.',
        '$[a_k, a^\\dagger_{k\'\'}] = (2\\pi)^3 \\delta^3(\\vec k - \\vec k\'\')$.',
        'Therefore $[a_k a_{k\'}, a^\\dagger_{k\'\'}] = a_k[a_{k\'}, a^\\dagger_{k\'\'}] + [a_k, a^\\dagger_{k\'\'}] a_{k\'}$.',
        '$= a_k (2\\pi)^3 \\delta^3(\\vec k\' - \\vec k\'\') + (2\\pi)^3 \\delta^3(\\vec k - \\vec k\'\') a_{k\'}$.',
      ],
    },
    {
      prompt: 'Give the physical reason why a $\\phi^3$ interaction would produce a potential unbounded from below.',
      answer: 'For large $|\\phi|$, $\\phi^3$ dominates and is negative in one direction, so there is no ground state.',
      steps: [
        'Take $V(\\phi) = g\\phi^3$ with $g > 0$.',
        'As $\\phi \\to -\\infty$, $V \\to -\\infty$, so no true minimum exists.',
        'Vacuum is unstable — you must stabilize with higher-order terms like $\\lambda \\phi^4$.',
      ],
    },
    {
      prompt: 'An electron carries spin $\\tfrac12$. What Hilbert space dimension does one electron at rest occupy?',
      answer: 'Two (spin up and spin down).',
      steps: [
        'Spin-$\\tfrac12$ has multiplicity $2s + 1 = 2$.',
        'Momentum modes are separate; at a fixed rest momentum, the spin degree of freedom is the only internal choice.',
        'The Hilbert space of one-electron states is $L^2(\\mathbb R^3) \\otimes \\mathbb C^2$.',
      ],
    },
    {
      prompt: 'Write down the Lagrangian for a free real scalar field of mass $m$.',
      answer: '$\\mathcal{L} = \\tfrac12 (\\partial_\\mu \\phi)(\\partial^\\mu \\phi) - \\tfrac12 m^2 \\phi^2$',
      steps: [
        'The kinetic term $\\tfrac12(\\partial\\phi)^2$ is the simplest Lorentz-invariant derivative term.',
        'The mass term $\\tfrac12 m^2 \\phi^2$ gives the Klein-Gordon equation when varied.',
        'No interactions are present; this is the "free" theory.',
      ],
    },
    {
      prompt: 'Why is $\\hbar\\omega/2$ per mode called the "zero-point energy"?',
      answer: 'It is the ground-state energy of a quantum harmonic oscillator, present even when no quanta are excited.',
      steps: [
        'The harmonic oscillator spectrum is $E_n = \\hbar\\omega(n+\\tfrac12)$.',
        'For $n = 0$, the energy is $\\tfrac12\\hbar\\omega$.',
        'This is nonzero — you cannot localize a quantum oscillator at zero momentum and position simultaneously without violating uncertainty.',
      ],
    },
    {
      prompt: 'How does the Casimir effect demonstrate real consequences of vacuum energy?',
      answer: 'Two uncharged conducting plates attract because the vacuum modes between them are restricted relative to those outside.',
      steps: [
        'Boundary conditions quantize the allowed photon modes between the plates.',
        'The zero-point energy integral between the plates differs from the free-space value.',
        'The difference depends on the plate separation $d$; taking a derivative gives an attractive $1/d^4$ force per area.',
        'Measurements by Lamoreaux (1997) and Mohideen (1998) confirmed it at few-percent accuracy.',
      ],
    },
    {
      prompt: 'A scalar field has mass $m = 125$ GeV (the Higgs). What is its rest-frame Compton wavelength in natural units and in meters?',
      answer: '$\\lambda_C = 1/m \\approx 8 \\times 10^{-3}$ GeV$^{-1} \\approx 1.6 \\times 10^{-18}$ m.',
      steps: [
        'In natural units $\\lambda_C = \\hbar c / (m c^2) = 1/m$.',
        '$1/125 \\approx 8 \\times 10^{-3}$ GeV$^{-1}$.',
        'Convert: $1$ GeV$^{-1} \\approx 1.97 \\times 10^{-16}$ m, so $\\lambda_C \\approx 1.6 \\times 10^{-18}$ m.',
      ],
    },
  ];

  var QFT_FIELDS_CHALLENGE = [
    {
      prompt: 'Explain in your own words why requiring local (as opposed to global) $U(1)$ invariance forces the introduction of a photon field.',
      answer: 'The derivative $\\partial_\\mu \\psi$ does not transform covariantly under local phase rotations, so you need a compensating vector field whose transformation cancels the offending derivative term. That compensator is $A_\\mu$.',
      steps: [
        'Under $\\psi \\to e^{i\\alpha(x)}\\psi$, $\\partial_\\mu\\psi$ acquires an extra $i(\\partial_\\mu\\alpha)\\psi$.',
        'Introduce $D_\\mu = \\partial_\\mu + ieA_\\mu$ with $A_\\mu \\to A_\\mu - \\tfrac{1}{e}\\partial_\\mu\\alpha$.',
        'Then $D_\\mu\\psi$ transforms the same way as $\\psi$ itself, restoring invariance of the Lagrangian.',
        'The new field $A_\\mu$ must then have its own gauge-invariant kinetic term: $-\\tfrac14 F_{\\mu\\nu}F^{\\mu\\nu}$.',
      ],
      hint: 'Pay attention to what happens to the derivative of $\\psi$ when $\\alpha$ depends on position.',
    },
    {
      prompt: 'Sketch an argument for why the Higgs potential $V(\\phi) = -\\mu^2 |\\phi|^2 + \\lambda |\\phi|^4$ breaks electroweak symmetry spontaneously.',
      answer: 'The minimum of $V$ is at a nonzero value $|\\phi| = v/\\sqrt{2}$, so the vacuum is not at $\\phi = 0$. Expanding around the true minimum breaks the gauge symmetry and gives the $W, Z$ bosons mass.',
      steps: [
        'Set $dV/d|\\phi| = 0$: $|\\phi|^2 = \\mu^2/(2\\lambda) \\equiv v^2/2$.',
        'The vacuum manifold is a circle, and choosing a point on it breaks the $SU(2)\\times U(1)$ phase invariance.',
        'Three of the four original gauge bosons absorb the Goldstone modes to gain longitudinal polarizations — the $W^\\pm$ and $Z$.',
        'The remaining combination stays massless: the photon.',
        'Measured $v \\approx 246$ GeV pins the scale.',
      ],
    },
    {
      prompt: 'Why is the vacuum of an interacting QFT unitarily inequivalent to the vacuum of the free theory (Haag\'s theorem)?',
      answer: 'Because the interacting vacuum cannot be built by acting with free-field creation operators on the free vacuum; it is a genuinely different state in a different Hilbert space.',
      steps: [
        'In free QFT, $|0\\rangle$ is the unique state annihilated by all $a_k$.',
        'In the interacting theory, dressing by virtual pairs rearranges the vacuum to an infinitely complicated superposition of free-theory states.',
        'Haag showed the two vacua are related by a non-unitary (in fact, non-existent) transformation in infinite volume.',
        'Renormalization sidesteps the theorem by working with cut-off theories where unitary equivalence holds.',
      ],
    },
  ];

  PS.registerTopic("phys-qft-fields", {
    title: "Field quantization and the QFT vacuum",
    description: "Fock space, creation/annihilation operators, commutation relations, and the physical interpretation of fields.",
    warmup: QFT_FIELDS_WARMUP,
    standard: QFT_FIELDS_STANDARD,
    challenge: QFT_FIELDS_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-qft-feynman
  // ============================================================
  var QFT_FEYNMAN_WARMUP = [
    {
      prompt: 'In a Feynman diagram, what does an external line represent?',
      answer: 'An incoming or outgoing physical particle with on-shell momentum.',
      steps: [
        'External lines satisfy $E^2 = |\\vec p|^2 + m^2$ (they are "on-shell").',
        'They correspond to particles prepared or detected in the experiment.',
        'Factors in the amplitude are polarization vectors (for bosons) or spinors (for fermions).',
      ],
    },
    {
      prompt: 'What does an internal line (propagator) in a Feynman diagram represent?',
      answer: 'A virtual particle carrying the interaction between vertices. It is off-shell.',
      steps: [
        'Internal lines can have any four-momentum allowed by conservation at each vertex.',
        'Off-shell: $E^2 \\ne p^2 + m^2$ in general.',
        'Mathematically the propagator is $i/(p^2 - m^2 + i\\epsilon)$ for a scalar.',
      ],
    },
    {
      prompt: 'How many vertices appear in the simplest tree-level diagram for electron-electron scattering in QED?',
      answer: 'Two — one where the initial electron emits a photon and one where the other electron absorbs it.',
      steps: [
        'Each QED vertex has one photon and two fermion legs.',
        'Two incoming electrons plus two outgoing electrons must connect via at least one photon.',
        'The minimal topology is a "t-channel" photon exchange with two vertices.',
      ],
    },
    {
      prompt: 'In QED, each vertex contributes a factor proportional to what coupling?',
      answer: 'The electromagnetic coupling $e$, giving a factor of $-ie\\gamma^\\mu$ in the Feynman rule.',
      steps: [
        'Read the interaction term $-e\\bar\\psi\\gamma^\\mu\\psi A_\\mu$ off the Lagrangian.',
        'Functional differentiation gives the three-point vertex factor $-ie\\gamma^\\mu$.',
        'The fine-structure constant is $\\alpha = e^2/(4\\pi)$ in natural units.',
      ],
    },
    {
      prompt: 'Why are diagrams with more loops "higher order"?',
      answer: 'Each extra loop adds two vertex factors, so the amplitude carries one extra power of the coupling squared.',
      steps: [
        'A loop must be closed by an additional internal line, requiring two extra vertices.',
        'Two extra vertices multiply the amplitude by $(-ie)^2 \\sim \\alpha$.',
        'Thus the $n$-loop term scales like $\\alpha^{n}$ relative to tree level (up to logarithms).',
      ],
    },
    {
      prompt: 'Which process has a Feynman diagram with a single vertex?',
      answer: 'No process — a single QED vertex is not a physical, momentum-conserving event by itself.',
      steps: [
        'Momentum conservation at one vertex with a $\\gamma \\to e^+ e^-$ topology requires $p_\\gamma^2 = (p_{e^+} + p_{e^-})^2 \\ge (2m_e)^2$.',
        'A real massless photon has $p_\\gamma^2 = 0$, which violates the inequality.',
        'So the "vertex" is only a building block inside larger diagrams.',
      ],
    },
    {
      prompt: 'What is a propagator, in one sentence?',
      answer: 'The amplitude for a virtual particle to travel between two spacetime points; mathematically, the Green\'s function of the field\'s equation of motion.',
      steps: [
        'For a free scalar, it is $\\langle 0 | T\\hat\\phi(x)\\hat\\phi(y) | 0\\rangle$.',
        'In momentum space it becomes $i/(p^2 - m^2 + i\\epsilon)$.',
        'Every internal line in a diagram contributes one such factor.',
      ],
    },
  ];

  var QFT_FEYNMAN_STANDARD = [
    {
      prompt: 'Give the number of tree-level Feynman diagrams for Compton scattering $e^- \\gamma \\to e^- \\gamma$ in QED.',
      answer: 'Two — the $s$-channel and $u$-channel diagrams.',
      steps: [
        'In the $s$-channel, the electron absorbs the incoming photon, propagates as a virtual electron, then emits the outgoing photon.',
        'In the $u$-channel, the electron first emits the outgoing photon, then absorbs the incoming one.',
        'Both have two vertices and differ by a crossing of the photon legs.',
        'Summing both is required for gauge invariance of the amplitude.',
      ],
    },
    {
      prompt: 'In QED, why is it not enough to compute a single "dominant" tree-level diagram and call it done?',
      answer: 'Individual diagrams are not gauge invariant; only the sum is. Picking one diagram and ignoring the others gives gauge-dependent nonsense.',
      steps: [
        'Under a gauge transformation on an external photon, each diagram transforms, but their sum is invariant.',
        'Dropping a diagram destroys the cancellation.',
        'A telltale symptom: amplitudes that depend on the gauge-fixing parameter in unphysical ways.',
      ],
    },
    {
      prompt: 'Estimate the order-of-magnitude ratio of a one-loop QED correction to a tree-level amplitude.',
      answer: 'About $\\alpha/(4\\pi) \\approx 6 \\times 10^{-4}$, i.e. roughly 0.06%.',
      steps: [
        'The loop integral carries an extra factor of $e^2/(4\\pi)^2 = \\alpha/(4\\pi)$ from the two extra vertices and the loop integral measure.',
        '$\\alpha \\approx 1/137$, so $\\alpha/(4\\pi) \\approx 1/(137 \\cdot 12.57) \\approx 5.8 \\times 10^{-4}$.',
        'This is why QED predictions can be pushed to 10+ digits with manageable effort.',
      ],
    },
    {
      prompt: 'Why do diagrams for $q\\bar q$ scattering via gluon exchange look like QED diagrams, but give different numerics?',
      answer: 'Both have a gauge boson exchange, but QCD has three colors, eight gluons, and $\\alpha_s \\approx 0.1$ at the weak scale — all of which multiply the amplitude.',
      steps: [
        'Replace the photon with a gluon and the QED charge with the QCD coupling.',
        'Include SU(3) color factors from the gluon-quark vertices.',
        'The expansion parameter is $\\alpha_s / \\pi$, which is much larger than $\\alpha/\\pi$, so more loops are needed for the same precision.',
      ],
    },
    {
      prompt: 'Consider Bhabha scattering, $e^- e^+ \\to e^- e^+$. How many tree-level diagrams contribute?',
      answer: 'Two — the $s$-channel (annihilation into a virtual photon) and the $t$-channel (exchange of a virtual photon).',
      steps: [
        '$s$-channel: $e^- e^+ \\to \\gamma^* \\to e^- e^+$ via a single intermediate photon.',
        '$t$-channel: the electron emits a photon that is absorbed by the positron, without annihilation.',
        'The interference between the two terms is measurable.',
      ],
    },
    {
      prompt: 'If a theory has two coupling constants $g_1, g_2$ and a process has two tree-level diagrams (one using $g_1$ twice and one using $g_2$ twice), how does the cross-section depend on the couplings?',
      answer: 'Schematically $\\sigma \\sim |g_1^2 + g_2^2|^2$ plus interference, so it depends on all orders of both couplings up to quartic.',
      steps: [
        'Amplitude: $\\mathcal{A} = A_1 g_1^2 + A_2 g_2^2$.',
        'Squaring: $|\\mathcal{A}|^2 = |A_1|^2 g_1^4 + |A_2|^2 g_2^4 + 2\\,\\mathrm{Re}(A_1 A_2^*)\\, g_1^2 g_2^2$.',
        'Each piece shows up in the cross-section; interference can be positive or negative.',
      ],
    },
    {
      prompt: 'Why are "closed fermion loops" accompanied by a minus sign in the Feynman rules?',
      answer: 'Fermion fields anticommute. Closing a loop of fermion lines introduces one anticommutation relative to the standard ordering, costing an overall sign.',
      steps: [
        'Wick contractions of anticommuting operators carry a sign depending on permutation parity.',
        'A closed fermion loop corresponds to a cyclic trace that needs one extra swap.',
        'Bosonic loops have no such sign.',
      ],
    },
    {
      prompt: 'An interaction vertex in the Standard Model involves a charged lepton, its neutrino, and a $W$ boson. Which processes does this vertex enable?',
      answer: 'Charged-current weak processes such as muon decay $\\mu^- \\to e^- \\bar\\nu_e \\nu_\\mu$ and beta decay.',
      steps: [
        'At a $W\\ell\\nu$ vertex, a charged lepton transitions to its neutrino (or vice versa) while emitting/absorbing a $W$.',
        'String two such vertices together via a virtual $W$ and you get the classical $V-A$ four-fermion effective interaction at low energies.',
        'Muon decay and neutron beta decay both proceed through this topology.',
      ],
    },
    {
      prompt: 'Why does a 2-loop diagram cost orders of magnitude more computer time than a 1-loop diagram?',
      answer: 'It has more internal momentum integrals, more vertex orderings, and needs careful numerical extraction of overlapping divergences.',
      steps: [
        'Each loop adds one four-dimensional momentum integral and several propagators.',
        'Nested loops can produce overlapping UV singularities that must be subtracted in order.',
        'Automated computer algebra (e.g. FORM, FeynCalc) is required for multi-loop QCD work.',
      ],
    },
    {
      prompt: 'Give an example of a process where the dominant contribution is a one-loop diagram rather than a tree-level diagram.',
      answer: 'The decay $H \\to \\gamma\\gamma$ has no tree-level diagram because the Higgs does not couple directly to photons; it proceeds through a top quark or $W$ loop.',
      steps: [
        'The Standard Model Higgs couples to mass, but photons are massless — no direct Higgs-photon vertex.',
        'Instead a heavy charged particle (top, $W$) runs in a loop coupling the Higgs to two photons.',
        'The $H\\to\\gamma\\gamma$ channel was one of the cleanest ways the Higgs was discovered in 2012.',
      ],
    },
    {
      prompt: 'What is the "s-channel" versus "t-channel" distinction?',
      answer: '$s$-channel: the two incoming particles annihilate into a virtual state whose four-momentum squared equals the total $(p_1+p_2)^2 = s$. $t$-channel: a virtual particle is exchanged between them with momentum squared $t = (p_1 - p_3)^2$.',
      steps: [
        'Mandelstam variables $s, t, u$ are Lorentz-invariant kinematic labels for $2\\to 2$ processes.',
        '$s$-channel resonances show up as peaks in cross-sections at $s = m_R^2$.',
        '$t$-channel exchange gives forward-peaked angular distributions like Rutherford scattering.',
      ],
    },
    {
      prompt: 'Why does the photon Feynman propagator have the form $-ig_{\\mu\\nu}/k^2$ (in Feynman gauge)?',
      answer: 'It is the Green\'s function of Maxwell\'s equations in that gauge, with $g_{\\mu\\nu}$ encoding the four-vector structure and $1/k^2$ the massless dispersion.',
      steps: [
        'Fourier-transform the Maxwell wave equation, pick a gauge to invert the kinetic matrix.',
        'In Feynman gauge the kinetic operator becomes $-k^2 g_{\\mu\\nu}$, whose inverse is $-g_{\\mu\\nu}/k^2$.',
        'Multiply by $i$ to match the Feynman rules convention.',
      ],
    },
    {
      prompt: 'Roughly, how many Feynman diagrams contribute to the electron anomalous magnetic moment at 5 loops?',
      answer: 'Thousands — specifically 12,672 distinct QED diagrams contribute to $a_e$ at 5 loops, a calculation completed numerically by Kinoshita and collaborators.',
      steps: [
        'At each loop order the diagram count grows combinatorially.',
        'Kinoshita\'s group assembled and numerically evaluated all 12,672 five-loop QED diagrams, most recently refined in 2019.',
        'The result matches measurement to about one part in $10^{12}$.',
      ],
    },
    {
      prompt: 'Explain why crossing symmetry relates $e^- e^+ \\to \\mu^- \\mu^+$ to $e^- \\mu^- \\to e^- \\mu^-$.',
      answer: 'In a QFT amplitude, moving a particle from an initial state to a final state (or vice versa) with reversed sign corresponds to analytically continuing the momenta. Crossing-related processes share a single underlying amplitude function.',
      steps: [
        'Write the amplitude as a function of Mandelstam $s, t, u$.',
        'Crossing swaps $s \\leftrightarrow t$ or $s \\leftrightarrow u$, continuing the same analytic expression.',
        'The two processes are different physical regions of the same function.',
      ],
    },
    {
      prompt: 'Why does each closed photon loop attached to a charged particle line contribute to the "running" of the electric charge?',
      answer: 'Because virtual fermion-antifermion pairs inside the loop polarize the vacuum and screen the bare charge; integrating over loop momentum gives a logarithmic dependence on energy.',
      steps: [
        'The one-loop vacuum polarization diagram inserts a $\\Pi(k^2)$ correction to the photon propagator.',
        '$\\Pi(k^2)$ has a logarithmic UV divergence, renormalized into the charge.',
        'The finite piece depends on $\\ln(k^2/\\mu^2)$, giving the characteristic logarithmic running.',
      ],
    },
  ];

  var QFT_FEYNMAN_CHALLENGE = [
    {
      prompt: 'Using $\\alpha(M_Z) \\approx 1/128$ and $\\alpha(0) \\approx 1/137$, explain qualitatively how running couplings change experimental predictions.',
      answer: 'Cross-sections for electromagnetic processes at the $Z$-pole are enhanced by the ratio $(1/128)/(1/137) \\approx 1.07$ relative to low-energy predictions. Using the low-energy value would misstate high-energy cross-sections by a few percent.',
      steps: [
        'The coupling at scale $Q$ is extracted by solving the renormalization group equation up from $Q = 0$.',
        'Contributions from each charged-fermion threshold add to the running.',
        'At collider energies you must use $\\alpha(M_Z)$, not $\\alpha(0)$, to get percent-level agreement.',
      ],
    },
    {
      prompt: 'Why do QCD amplitudes at high energies organize themselves into "jets" rather than isolated partons?',
      answer: 'Because soft and collinear gluon emission is very probable, and color confinement means partons never appear as isolated objects. What you see in a detector are sprays of hadrons whose gross angular direction traces the original hard parton.',
      steps: [
        'Soft emissions carry logarithms that do not converge perturbatively but factorize into universal shower functions.',
        'Confinement dresses bare partons into hadrons over a nonperturbative distance $\\sim 1/\\Lambda_{\\mathrm{QCD}}$.',
        'Jet algorithms cluster the final-state hadrons back into objects corresponding to the original partons.',
      ],
    },
    {
      prompt: 'Argue that the one-loop correction to electron-photon scattering must contain an infrared divergence that cancels against the cross-section for emitting an additional soft photon.',
      answer: 'The vertex correction has an IR logarithm from soft virtual photons, and the real-emission cross-section has an identical logarithm from soft outgoing photons. Physical observables must include both, and the divergences cancel (Bloch-Nordsieck, and more generally KLN theorem).',
      steps: [
        'Any detector has an energy resolution $\\Delta E$; photons below it are not distinguished.',
        'The "measurable" cross-section is the sum: elastic loop-corrected plus soft-real-emission.',
        'The two contributions have logarithmic divergences with opposite signs that cancel when combined.',
      ],
    },
  ];

  PS.registerTopic("phys-qft-feynman", {
    title: "Feynman diagrams and perturbation theory",
    description: "Reading diagrams, counting vertices, and estimating amplitudes to order of magnitude.",
    warmup: QFT_FEYNMAN_WARMUP,
    standard: QFT_FEYNMAN_STANDARD,
    challenge: QFT_FEYNMAN_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-qft-renorm
  // ============================================================
  var QFT_RENORM_WARMUP = [
    {
      prompt: 'What is an ultraviolet divergence?',
      answer: 'A divergence in a Feynman loop integral that arises from arbitrarily large internal momenta (short distances).',
      steps: [
        'Loop momentum integrals extend to $|k| \\to \\infty$.',
        'For a badly-behaved integrand, the integral fails to converge.',
        '"UV" refers to short-wavelength, high-energy contributions that cause the problem.',
      ],
    },
    {
      prompt: 'Name one way to regularize a divergent loop integral.',
      answer: 'Impose a momentum cutoff $\\Lambda$ (or use dimensional regularization, Pauli-Villars, lattice, etc.).',
      steps: [
        'A hard cutoff $|k| < \\Lambda$ makes the integral finite but breaks Lorentz invariance.',
        'Dimensional regularization analytically continues the spacetime dimension to $4 - \\epsilon$, preserving symmetries.',
        'The divergence then appears as a $1/\\epsilon$ pole.',
      ],
    },
    {
      prompt: 'What is the "bare" mass of a field?',
      answer: 'The mass parameter written in the original Lagrangian, which is not directly measurable. The physical mass is what experiments see.',
      steps: [
        '$m_{\\text{bare}}$ appears in $\\mathcal{L}$ before quantum corrections.',
        'Loop corrections shift it to the "renormalized" mass $m_R$ that propagators pole at.',
        'Experiments measure $m_R$; $m_{\\text{bare}}$ is fictitious.',
      ],
    },
    {
      prompt: 'Why is the electron electric charge larger at short distances than at long distances?',
      answer: 'Vacuum polarization by virtual electron-positron pairs screens the bare charge; probing through the screen at short distance reveals more of the bare value.',
      steps: [
        'Virtual pairs polarize toward a charge like a dielectric.',
        'At long distance, you see the screened (smaller) effective charge $\\alpha(0) \\approx 1/137$.',
        'At short distance or high momentum, $\\alpha(M_Z) \\approx 1/128$.',
      ],
    },
    {
      prompt: 'State the physical meaning of asymptotic freedom.',
      answer: 'The strong coupling $\\alpha_s$ decreases as the energy scale increases, so quarks behave almost as free particles at very high energies.',
      steps: [
        'At low energy (~1 GeV), $\\alpha_s \\sim 1$ and perturbation theory fails.',
        'At very high energy (~100 GeV), $\\alpha_s \\sim 0.1$ and perturbation theory works.',
        'Discovered by Gross, Wilczek, and Politzer (1973). Nobel 2004.',
      ],
    },
    {
      prompt: 'Why is quantum gravity (the naive perturbative treatment of Einstein gravity) non-renormalizable?',
      answer: 'The graviton coupling $G_N$ has negative mass dimension, so higher-loop divergences require an infinite tower of counterterms — no finite set of parameters can absorb them all.',
      steps: [
        'In natural units, $[G_N] = -2$ (length squared).',
        'Each loop brings extra factors of $G_N E^2$, demanding new $R^n$ counterterms at higher curvature.',
        'No finite Lagrangian can absorb all of them, so the theory loses predictive power.',
      ],
    },
    {
      prompt: 'What does it mean for a theory to be "renormalizable"?',
      answer: 'All UV divergences can be absorbed into a finite number of parameters (masses, couplings, field normalizations), so the theory makes finite predictions for all observables.',
      steps: [
        'Each divergence is reabsorbed into a counterterm that has the same structure as a term in $\\mathcal{L}$.',
        'If only finitely many counterterms are ever needed, the theory is renormalizable.',
        'QED, QCD, and the full Standard Model are all renormalizable.',
      ],
    },
  ];

  var QFT_RENORM_STANDARD = [
    {
      prompt: 'Explain qualitatively why renormalization is not "sweeping infinities under the rug."',
      answer: 'It is a redefinition of physical parameters. What appears divergent in the bare Lagrangian is absorbed into quantities that were never physically meaningful on their own; what remains after absorption is a finite prediction in terms of measured quantities.',
      steps: [
        'You cannot measure the bare parameters directly — only combinations of them via experiments.',
        'Expressing answers in terms of the measured quantities removes the cutoff dependence.',
        'The predictive content is in <em>relationships</em> between observables, not in any single bare number.',
      ],
    },
    {
      prompt: 'A one-loop correction to a quartic scalar coupling scales as $\\lambda^2 \\ln(\\Lambda/\\mu)$. If you increase $\\Lambda$ from $10^3$ GeV to $10^{15}$ GeV at fixed $\\mu$ with $\\lambda = 0.1$, estimate the relative shift.',
      answer: '$\\lambda^2 \\ln(10^{12}) \\approx 0.01 \\cdot 27.6 \\approx 0.28$, a 28% correction.',
      steps: [
        '$\\ln(10^{12}) = 12 \\ln 10 \\approx 27.6$.',
        '$\\lambda^2 = 0.01$.',
        'Product is about $0.28$ — nearly the same order as $\\lambda$ itself, so perturbation theory is starting to feel strained.',
      ],
    },
    {
      prompt: 'What is a renormalization group equation, roughly?',
      answer: 'A differential equation describing how couplings change as you change the energy scale at which you define the theory.',
      steps: [
        'Define couplings $g(\\mu)$ at scale $\\mu$.',
        'Demand that physical quantities are independent of $\\mu$: $dO/d\\mu = 0$.',
        'This implicit equation forces $dg/d\\ln\\mu = \\beta(g)$, the beta function.',
      ],
    },
    {
      prompt: 'Sketch the shape of the QCD beta function at one loop and explain its sign.',
      answer: '$\\beta(\\alpha_s) = -b_0 \\alpha_s^2$ with $b_0 > 0$, so $d\\alpha_s/d\\ln\\mu < 0$: the coupling decreases with energy.',
      steps: [
        '$b_0 = (11 N_c - 2 n_f)/(12\\pi)$ with $N_c = 3$ colors and $n_f$ active flavors.',
        'At low $n_f$, $b_0 > 0$, giving asymptotic freedom.',
        'Non-abelian gluon self-interactions dominate over fermionic screening.',
      ],
    },
    {
      prompt: 'Why is the cosmological constant "unnatural" in the QFT sense?',
      answer: 'Zero-point vacuum fluctuations generate a contribution of order $\\Lambda_{\\text{UV}}^4$ to the vacuum energy density, which is $\\sim 10^{120}$ times the measured dark-energy density.',
      steps: [
        'Summing $\\tfrac12 \\hbar\\omega$ up to the Planck scale gives $\\sim M_{\\text{Pl}}^4$.',
        'Observations give $\\rho_\\Lambda \\sim (10^{-3}\\,\\text{eV})^4$.',
        'The ratio is $\\sim 10^{120}$, the worst "naturalness" discrepancy in physics.',
      ],
    },
    {
      prompt: 'How does dimensional regularization work, in one paragraph?',
      answer: 'You analytically continue the spacetime dimension from $4$ to $d = 4 - \\epsilon$. Loop integrals become finite functions of $\\epsilon$; divergences appear as $1/\\epsilon$ poles that are absorbed into counterterms. It preserves Lorentz invariance and gauge symmetry, making it the default regulator for modern calculations.',
      steps: [
        'Write the loop momentum integral in $d$ dimensions using $\\int d^d k$.',
        'Evaluate via Feynman parameters and Gamma functions of $d$.',
        'Expand around $d = 4$: divergences become $1/\\epsilon$, finite pieces survive.',
        'Add counterterms to cancel the $1/\\epsilon$ poles.',
      ],
    },
    {
      prompt: 'Why is the running of $\\alpha$ a test of Standard Model completeness?',
      answer: 'Because new heavy charged particles would contribute to the beta function and alter the running in measurable ways between two experimental energies.',
      steps: [
        'Each charged fermion or scalar adds a term proportional to its charge squared to the beta function.',
        'Precision $e^+ e^-$ and LHC measurements of $\\alpha(Q^2)$ agree with Standard Model running with known fields.',
        'Any unaccounted-for particle with mass below the probed scale would show up as a deviation.',
      ],
    },
    {
      prompt: 'Why does effective field theory (EFT) justify using non-renormalizable interactions in practice?',
      answer: 'Because at energies well below the cutoff, higher-dimension operators are suppressed by powers of $(E/\\Lambda)$ and contribute only small corrections. You use an EFT up to $\\Lambda$ and expand in $1/\\Lambda$.',
      steps: [
        'Include every operator allowed by symmetry, ordered by mass dimension.',
        'Each higher-dimension operator is suppressed by $1/\\Lambda^{d-4}$.',
        'For physics well below $\\Lambda$, the lowest-dimension terms dominate.',
        'Renormalizability is a feature of the leading-order truncation, not of the full theory.',
      ],
    },
    {
      prompt: 'State the Callan-Symanzik equation in words.',
      answer: 'A correlation function\'s response to a change of renormalization scale is dictated by the beta function and the anomalous dimensions of the fields involved.',
      steps: [
        '$(\\mu\\partial_\\mu + \\beta(g)\\partial_g + n\\gamma) G^{(n)} = 0$.',
        'The first term is the explicit scale derivative.',
        'The beta function captures coupling running, the anomalous dimension captures field-strength running.',
        'It is the rigorous formulation of the "running coupling" picture.',
      ],
    },
    {
      prompt: 'Give an example of an observable whose leading contribution is cutoff-dependent and explain how that gets fixed.',
      answer: 'The electron self-energy is cutoff-dependent; absorbing the divergence into the definition of the physical electron mass gives a finite relationship between scattering observables.',
      steps: [
        'The one-loop electron self-energy diverges logarithmically in QED.',
        'Write $m_{\\text{bare}} = m_R + \\delta m$ with $\\delta m$ chosen to cancel the divergence.',
        'Scattering amplitudes now depend on $m_R$, which is measured directly.',
      ],
    },
    {
      prompt: 'Why does renormalizability matter for grand unified theories (GUTs)?',
      answer: 'Because GUTs extrapolate the Standard Model couplings 12 orders of magnitude in energy, and even mild non-renormalizable corrections would ruin the extrapolation.',
      steps: [
        'GUTs predict coupling unification at $\\sim 10^{16}$ GeV.',
        'The predicted unification depends on running couplings from the weak scale to the GUT scale.',
        'Non-renormalizable corrections would distort the running at each step.',
      ],
    },
    {
      prompt: 'What does it mean to "integrate out" a heavy field?',
      answer: 'To replace its effects in the Lagrangian with a series of effective operators built from the remaining light fields, suppressed by powers of the heavy mass.',
      steps: [
        'Start with $\\mathcal{L}(\\phi_{\\text{heavy}}, \\phi_{\\text{light}})$.',
        'Perform the path integral over $\\phi_{\\text{heavy}}$ to get $\\mathcal{L}_{\\text{eff}}(\\phi_{\\text{light}})$.',
        'For example, integrating out the $W$ boson gives Fermi\'s effective theory for beta decay.',
      ],
    },
    {
      prompt: 'Explain in one sentence why lattice QCD is a nonperturbative definition of the theory.',
      answer: 'Because it discretizes spacetime onto a finite lattice with a finite number of degrees of freedom, so the path integral becomes a well-defined high-dimensional ordinary integral you can evaluate by Monte Carlo — no perturbative expansion needed.',
      steps: [
        'Spacetime is replaced by a hypercubic grid with spacing $a$.',
        'The QCD path integral becomes a sum over finitely many gluon link variables.',
        'Monte Carlo integration samples the dominant configurations.',
        'Continuum limit: $a \\to 0$ while keeping physical quantities fixed.',
      ],
    },
    {
      prompt: 'Roughly estimate the electroweak hierarchy problem: by how many orders of magnitude is the Higgs mass fine-tuned if you assume no new physics between $M_W$ and the Planck scale?',
      answer: 'About 17 orders of magnitude in the Higgs mass squared — $M_H^2 \\sim 10^4 \\text{ GeV}^2$ versus a quadratically sensitive $M_{\\text{Pl}}^2 \\sim 10^{38} \\text{ GeV}^2$.',
      steps: [
        'The one-loop correction to $m_H^2$ has a quadratic $\\Lambda^2$ piece from top loops.',
        'Taking $\\Lambda = M_{\\text{Pl}} \\sim 10^{19}$ GeV, the correction is $\\sim M_{\\text{Pl}}^2 \\sim 10^{38}$ GeV$^2$.',
        'The measured value is $(125)^2 \\sim 1.6 \\times 10^4$ GeV$^2$.',
        'Ratio is $\\sim 10^{34}$, requiring the bare mass-squared to cancel the correction to 17 decimal places.',
      ],
    },
    {
      prompt: 'Why does QCD\'s confinement make it impossible to measure a free quark?',
      answer: 'The strong coupling grows at long distances, so the energy cost to separate two color charges grows linearly. Eventually that energy exceeds the cost of creating a new quark-antiquark pair, and the would-be free quark is dressed into a hadron.',
      steps: [
        'Linear confinement: $V(r) \\sim \\sigma r$ at long distance, with string tension $\\sigma \\sim (1\\,\\text{GeV})^2$.',
        'At some separation, the energy exceeds $2 m_q$, so pair creation becomes energetically favorable.',
        'The result is two color-singlet bound states, not two free quarks.',
      ],
    },
  ];

  var QFT_RENORM_CHALLENGE = [
    {
      prompt: 'In your own words, explain why Ken Wilson\'s renormalization group philosophy reframed renormalization from "trick" to "physical principle."',
      answer: 'Wilson showed that renormalization is a change of description: as you zoom out (integrate out high-momentum modes), coupling constants flow along trajectories, and most couplings either grow or shrink toward fixed points. The observed physics at each scale is whatever operators happen to be relevant at that scale. Infinities stop being embarrassing and start being predictions about universality.',
      steps: [
        'Integrate out shells of momentum one at a time.',
        'At each step, the remaining effective Lagrangian changes — its couplings flow.',
        'Relevant, marginal, and irrelevant operators behave predictably under flow.',
        'Phase transitions in condensed matter and particle physics share universal behavior at fixed points of the flow.',
      ],
    },
    {
      prompt: 'Argue why the $\\mathcal{O}(\\alpha^5)$ QED calculation of the electron $g-2$ is a test of the vacuum structure, not just of the electron.',
      answer: 'Five-loop QED includes diagrams with internal muon and tau loops (the electron photon propagator fluctuates into muon-antimuon and tau-antitau), so the $g-2$ value measures the coupled response of the entire charged-lepton vacuum to an electromagnetic probe at the electron mass scale.',
      steps: [
        'Expand to 5-loop: thousands of diagrams, many involving heavy fermion loops.',
        'Even though the muon and tau are off-shell, their virtual contributions show up in the electron anomaly at measurable precision.',
        'Agreement with experiment to $10^{-12}$ therefore constrains the entire QED vacuum self-consistently.',
      ],
    },
    {
      prompt: 'Discuss whether a quantum theory of gravity must be non-perturbative.',
      answer: 'Quite possibly. General relativity perturbed around flat space is non-renormalizable. Approaches like asymptotic safety, string theory, and loop quantum gravity all propose non-perturbative completions. Whether <em>any</em> perturbative expansion around a classical background can suffice is still open; most researchers expect no.',
      steps: [
        'Perturbative gravity fails at two loops for pure gravity and at one loop with matter.',
        'Asymptotic safety hopes for a non-trivial UV fixed point.',
        'String theory replaces point particles with extended strings, softening UV behavior.',
        'Loop quantum gravity quantizes spacetime geometry directly.',
      ],
    },
  ];

  PS.registerTopic("phys-qft-renorm", {
    title: "Renormalization and running couplings",
    description: "Why infinities are not a disaster, what the renormalization group says, and why the whole apparatus is the cleanest way to handle ignorance about short-distance physics.",
    warmup: QFT_RENORM_WARMUP,
    standard: QFT_RENORM_STANDARD,
    challenge: QFT_RENORM_CHALLENGE,
  });

})();
