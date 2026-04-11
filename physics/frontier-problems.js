/*
 * LearningHub — Frontier Physics Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   phys-frontier-strings — strings, extra dimensions, dualities
 *   phys-frontier-qinfo   — qubits, entanglement, quantum gates
 *   phys-frontier-topo    — topological matter and topological invariants
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[frontier-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-frontier-strings
  // ============================================================
  var STRINGS_WARMUP = [
    {
      prompt: 'In one sentence, what does string theory replace point particles with?',
      answer: 'One-dimensional extended objects ("strings") whose vibrational modes correspond to different particle species.',
      steps: [
        'A point particle traces out a 1D world-line in spacetime.',
        'A string traces out a 2D world-sheet.',
        'Quantizing the vibrations of the string gives a spectrum of states; different vibrational modes look like different particles.',
      ],
    },
    {
      prompt: 'How many spacetime dimensions does superstring theory require?',
      answer: 'Ten (9 spatial + 1 temporal).',
      steps: [
        'Bosonic string theory is critical in 26 dimensions.',
        'Adding worldsheet supersymmetry lowers the critical dimension to 10.',
        'The extra 6 dimensions are usually assumed to be compactified on a Calabi-Yau manifold.',
      ],
    },
    {
      prompt: 'What is compactification, and why is it needed in string theory?',
      answer: 'Curling up extra dimensions into a tiny compact space so they are invisible at low energies — needed because string theory lives in 10D but observed physics is 4D.',
      steps: [
        'A dimension compactified on a circle of radius $R$ gives Kaluza-Klein modes of mass $n/R$.',
        'For $R$ extremely small, all $n \\ne 0$ modes are too heavy to see.',
        'The four large dimensions we observe are the uncompactified ones.',
      ],
    },
    {
      prompt: 'What is T-duality?',
      answer: 'A symmetry of string theory relating compactification on a circle of radius $R$ to one of radius $\\alpha\'/R$.',
      steps: [
        'In a compactified theory there are two quantum numbers: momentum around the circle and winding number.',
        'T-duality swaps them, equivalent to $R \\leftrightarrow \\alpha\'/R$.',
        'Physical observables are invariant — large and small compactifications are indistinguishable.',
      ],
    },
    {
      prompt: 'What is the "string landscape"?',
      answer: 'The vast set of distinct vacuum solutions of string theory (often cited as $\\sim 10^{500}$).',
      steps: [
        'Different choices of Calabi-Yau manifold, flux configurations, and branes give different 4D physics.',
        'Estimates suggest $\\gtrsim 10^{500}$ distinct vacua.',
        'Critics argue this makes it hard to make unique predictions; proponents argue anthropic selection among the landscape is legitimate.',
      ],
    },
  ];

  var STRINGS_STANDARD = [
    {
      prompt: 'A closed string has modes of frequency $\\omega_n = n\\omega_0$ for $n = 1,2,\\ldots$. Its ground state has negative mass squared. What is done about this tachyon in superstring theory?',
      answer: 'The GSO projection removes the tachyon and leaves a supersymmetric spectrum with massless ground states (graviton, gauge bosons).',
      steps: [
        'Bosonic string has a ground state with $m^2 = -1/\\alpha\'$ — a tachyon, signaling instability.',
        'Adding worldsheet fermions (superstring) and projecting onto states with definite worldsheet fermion number (GSO) eliminates the tachyon.',
        'The lightest surviving states are massless: graviton, gravitino, gauge bosons, ...',
      ],
    },
    {
      prompt: 'Describe the AdS/CFT correspondence in one paragraph.',
      answer: 'Maldacena\'s conjecture: string theory on a $(d+1)$-dimensional anti-de Sitter space is dual to a $d$-dimensional conformal field theory living on its boundary. Bulk gravitational dynamics equal boundary gauge-theory dynamics.',
      steps: [
        'Type IIB string theory on $AdS_5 \\times S^5$ is dual to $\\mathcal{N}=4$ super Yang-Mills on the boundary.',
        'Strong gauge coupling in the CFT corresponds to weakly-curved gravity in the bulk.',
        'This is the first rigorous example of holography: a gravitational theory encoded in a lower-dimensional non-gravitational one.',
        'Used to study hadron physics, black-hole information, and condensed-matter systems.',
      ],
    },
    {
      prompt: 'Compute the number of distinct ground-state vacua from flux quantization on a simple manifold with 10 independent three-cycles, assuming each flux number ranges over $\\{1,2,\\ldots,10\\}$.',
      answer: '$10^{10}$ distinct flux vacua.',
      steps: [
        'Each three-cycle has a quantized flux number.',
        'With 10 independent cycles and 10 allowed values each, there are $10^{10}$ combinations.',
        'Real Calabi-Yau manifolds have many more three-cycles, giving the famously large landscape.',
      ],
    },
    {
      prompt: 'Why is a graviton a generic prediction of closed string theory?',
      answer: 'A closed string\'s spectrum always contains a massless spin-2 particle — by the Weinberg-Witten theorem, such a particle must couple like a graviton.',
      steps: [
        'Closed strings have two sets of oscillators (left- and right-moving).',
        'The symmetric traceless combination of the first excited oscillators is a massless spin-2 mode.',
        'A consistent massless spin-2 in flat space must couple universally to energy-momentum — i.e., it is a graviton.',
      ],
    },
    {
      prompt: 'What is a D-brane, and why are D-branes important in modern string theory?',
      answer: 'A D-brane is a $(p+1)$-dimensional surface in spacetime on which open strings end. They are dynamical objects with their own tension and carry charges under higher-form gauge fields.',
      steps: [
        'Originally introduced as boundary conditions for open strings.',
        'Polchinski (1995) showed they are also sources of Ramond-Ramond fields with definite tension and charge.',
        'Stacks of D-branes host gauge theories on their worldvolume — key to AdS/CFT and brane-world model building.',
      ],
    },
  ];

  var STRINGS_CHALLENGE = [
    {
      prompt: 'Explain the swampland program: what is it trying to do, and why does it matter?',
      answer: 'The swampland program tries to carve effective field theories into "landscape" (those that have a consistent UV completion in quantum gravity) and "swampland" (those that do not). It matters because it turns consistency with quantum gravity into empirical constraints on low-energy physics.',
      steps: [
        'Not every effective field theory can arise from string theory.',
        'Conjectured criteria (weak gravity, distance, de Sitter, no global symmetries) would forbid broad classes of EFTs.',
        'If any criterion is correct, it can rule out specific models of inflation or dark energy in our universe.',
      ],
    },
    {
      prompt: 'How is compactification volume related to the 4D Newton constant? Show schematically why a large extra volume dilutes gravity.',
      answer: '$G_4 \\sim G_{10}/V_6$, so a large internal volume $V_6$ reduces the effective 4D gravitational coupling.',
      steps: [
        'Einstein-Hilbert action in 10D: $S \\sim (1/G_{10}) \\int d^{10}x\\,\\sqrt{g}\\,R$.',
        'Integrating out the 6 compact dimensions gives an effective 4D action with prefactor $V_6/G_{10}$.',
        'So $1/G_4 \\sim V_6/G_{10}$, meaning $G_4 \\sim G_{10}/V_6$.',
        'This is the basis for large-extra-dimensions models that attempt to solve the hierarchy problem.',
      ],
    },
    {
      prompt: 'Why is it difficult to experimentally test string theory directly, and what indirect signatures do theorists look for?',
      answer: 'String scale $M_s \\sim M_{\\rm Pl}$ is far above collider energies, so direct detection is impossible. Indirect hints include supersymmetric partners, large extra dimensions, axion-like particles, stringy corrections to gravity, and cosmological signatures in the CMB.',
      steps: [
        'At $\\sim$TeV energies we probe $10^{16}$ times less than the Planck scale.',
        'SUSY partners at LHC energies would indirectly support string-motivated models.',
        'Large or warped extra dimensions could lower $M_s$ into reach.',
        'Stringy axions can yield dark matter candidates and CMB birefringence signals.',
      ],
    },
  ];

  PS.registerTopic("phys-frontier-strings", {
    title: "Strings, branes, and extra dimensions",
    description: "What string theory proposes, what the landscape is, and the rough shape of experimental hopes.",
    warmup: STRINGS_WARMUP,
    standard: STRINGS_STANDARD,
    challenge: STRINGS_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-frontier-qinfo
  // ============================================================
  var QINFO_WARMUP = [
    {
      prompt: 'Write the general state of a single qubit.',
      answer: '$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ with $|\\alpha|^2 + |\\beta|^2 = 1$.',
      steps: [
        'A qubit lives in a 2D complex Hilbert space.',
        'Basis states $|0\\rangle$ and $|1\\rangle$ form an orthonormal basis.',
        'Normalization requires the squared amplitudes to sum to 1.',
      ],
    },
    {
      prompt: 'What does applying the Hadamard gate $H$ to $|0\\rangle$ produce?',
      answer: '$H|0\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$.',
      steps: [
        'The Hadamard matrix is $\\tfrac{1}{\\sqrt2}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}$.',
        'Applied to $|0\\rangle = (1,0)^T$: $(1/\\sqrt2)(1,1)^T$.',
        'That is the uniform superposition, a key starting point in quantum algorithms.',
      ],
    },
    {
      prompt: 'Write the singlet (Bell) state.',
      answer: '$|\\Psi^-\\rangle = \\tfrac{1}{\\sqrt2}(|01\\rangle - |10\\rangle)$.',
      steps: [
        'Two-qubit entangled state, antisymmetric under swap.',
        'No product-state decomposition $|\\psi_A\\rangle|\\psi_B\\rangle$ exists.',
        'A measurement of one qubit fully determines the other.',
      ],
    },
    {
      prompt: 'Why can\'t you clone an unknown quantum state?',
      answer: 'Linearity of quantum evolution forbids a unitary that takes $|\\psi\\rangle|0\\rangle \\to |\\psi\\rangle|\\psi\\rangle$ for arbitrary $|\\psi\\rangle$ — the no-cloning theorem.',
      steps: [
        'Assume such a unitary $U$ exists: $U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$ and $U|\\phi\\rangle|0\\rangle = |\\phi\\rangle|\\phi\\rangle$.',
        'Inner product of the left sides: $\\langle\\psi|\\phi\\rangle$.',
        'Inner product of the right sides: $\\langle\\psi|\\phi\\rangle^2$.',
        'These can only be equal if $\\langle\\psi|\\phi\\rangle \\in \\{0,1\\}$, a contradiction for generic states.',
      ],
    },
    {
      prompt: 'State Bell\'s theorem informally.',
      answer: 'No local hidden-variable theory can reproduce all predictions of quantum mechanics.',
      steps: [
        'Consider correlations between two entangled particles measured along different axes.',
        'QM predicts a correlation pattern that exceeds any local classical bound (e.g., CHSH $\\le 2$).',
        'Experiments since Aspect (1982) confirm the QM prediction and violate Bell inequalities.',
      ],
    },
  ];

  var QINFO_STANDARD = [
    {
      prompt: 'Compute $\\sigma_x |0\\rangle$, $\\sigma_y |0\\rangle$, $\\sigma_z |0\\rangle$ in the computational basis.',
      answer: '$\\sigma_x|0\\rangle = |1\\rangle$, $\\sigma_y|0\\rangle = i|1\\rangle$, $\\sigma_z|0\\rangle = |0\\rangle$.',
      steps: [
        '$\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$, so $\\sigma_x(1,0)^T = (0,1)^T = |1\\rangle$.',
        '$\\sigma_y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix}$, so $\\sigma_y(1,0)^T = (0,i)^T = i|1\\rangle$.',
        '$\\sigma_z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$, so $\\sigma_z(1,0)^T = (1,0)^T = |0\\rangle$.',
      ],
    },
    {
      prompt: 'Derive the CHSH inequality and state the quantum bound.',
      answer: 'Classical bound: $|\\langle S\\rangle| \\le 2$ with $S = A_1B_1 + A_1B_2 + A_2B_1 - A_2B_2$. Quantum bound (Tsirelson): $|\\langle S\\rangle| \\le 2\\sqrt 2$.',
      steps: [
        '$A_i, B_j \\in \\{\\pm 1\\}$ are measurement outcomes on Alice and Bob.',
        'Algebraic identity: for any such assignment, $|A_1B_1 + A_1B_2 + A_2B_1 - A_2B_2| \\le 2$.',
        'Taking expectations preserves the bound for local hidden variables.',
        'Quantum mechanics with Bell states achieves $2\\sqrt 2$ — experimentally observed.',
      ],
    },
    {
      prompt: 'Explain how quantum teleportation uses a Bell pair and two classical bits to transmit one qubit of information.',
      answer: 'Alice and Bob share a Bell state. Alice performs a Bell-basis measurement on her half and her unknown qubit; she sends the 2-bit result classically to Bob, who applies a corresponding Pauli correction.',
      steps: [
        'Prepare entangled pair $|\\Phi^+\\rangle$ between Alice and Bob.',
        'Alice measures her unknown qubit $|\\psi\\rangle$ plus her half of the pair in the Bell basis; outcome is one of 4 Bell states.',
        'She sends the 2-bit outcome to Bob over a classical channel.',
        'Bob applies one of $\\{I, X, Z, XZ\\}$ depending on the message, recovering $|\\psi\\rangle$ exactly.',
      ],
    },
    {
      prompt: 'Shor\'s algorithm factors an $n$-bit integer in polynomial time. What quantum subroutine is responsible for the speedup?',
      answer: 'The quantum Fourier transform (QFT) used to find the period of $f(x) = a^x \\bmod N$.',
      steps: [
        'Factoring reduces to finding the period $r$ of $a^x \\bmod N$ for random $a$.',
        'Classical period finding requires exponential time.',
        'Quantum period finding uses a QFT over a superposition of function values, collapsing onto multiples of $1/r$.',
        'Post-processing extracts $r$, and with $r$ you can compute the factors.',
      ],
    },
    {
      prompt: 'What does the Holevo bound say?',
      answer: 'You can\'t use $n$ qubits to transmit more than $n$ classical bits of information through measurement.',
      steps: [
        'Given a quantum state that encodes classical data, measurement gives at most $\\log_2 d$ bits for a $d$-dimensional system.',
        'For qubits, $d = 2^n$, so $n$ bits at most.',
        'This despite the fact that a qubit\'s state lives in a continuous 2D complex space.',
      ],
    },
  ];

  var QINFO_CHALLENGE = [
    {
      prompt: 'Sketch an error-correction argument for why ~$10^3$–$10^4$ physical qubits are needed per logical qubit in a surface-code quantum computer.',
      answer: 'To reach physical error rates below the $\\sim 10^{-3}$ threshold required for logical errors of $\\sim 10^{-12}$, you need a code distance of order 20–30, which in the surface code requires hundreds to thousands of physical qubits per logical qubit plus measurement overhead.',
      steps: [
        'Surface code logical error rate decays exponentially in code distance $d$: $p_L \\sim (p/p_{\\rm th})^{d/2}$.',
        'Target: $p_L \\lesssim 10^{-12}$ for long computations; $p \\sim 10^{-3}$, $p_{\\rm th} \\sim 10^{-2}$.',
        'Need $d \\gtrsim 25$ ish; physical qubits per logical qubit $\\sim 2d^2 \\sim 1250$.',
        'Add measurement ancillas and factories for non-Clifford gates to get $\\sim 10^3$–$10^4$.',
      ],
    },
    {
      prompt: 'Explain why Grover\'s algorithm only gives a quadratic speedup, not exponential like Shor\'s.',
      answer: 'Grover\'s rotation per step improves amplitude linearly; $N$ iterations turn $O(\\sqrt N)$ steps into a marked state. The absence of additional structure caps the speedup at quadratic.',
      steps: [
        'Each Grover iteration rotates the state vector by an angle $\\sim 1/\\sqrt N$ toward the marked subspace.',
        'After $O(\\sqrt N)$ iterations the amplitude in the marked subspace is $O(1)$.',
        'Classical unstructured search is $O(N)$, so Grover gives $O(\\sqrt N)$ — quadratic.',
        'Shor exploits the hidden periodic structure of modular exponentiation; Grover assumes nothing.',
      ],
    },
    {
      prompt: 'What is quantum supremacy, and what is a fair critique of claimed demonstrations?',
      answer: 'Quantum supremacy is the demonstration that a quantum device performs a computation infeasible classically. Fair critiques point out that the tasks chosen (random circuit sampling, Gaussian boson sampling) are narrow and often subsequently partially classically simulated, though the gap keeps growing.',
      steps: [
        'Google Sycamore (2019) reported supremacy via random circuit sampling on 53 qubits.',
        'Skeptics found tensor-network methods that partially closed the gap.',
        'Later demos (Pan, Jiuzhang) pushed the boundary further.',
        'True supremacy requires the quantum advantage to hold against the best classical adversary, not the best known one.',
      ],
    },
  ];

  PS.registerTopic("phys-frontier-qinfo", {
    title: "Qubits, entanglement, and quantum computing",
    description: "The mathematical backbone of quantum information and the physics behind gate-model quantum computers.",
    warmup: QINFO_WARMUP,
    standard: QINFO_STANDARD,
    challenge: QINFO_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-frontier-topo
  // ============================================================
  var TOPO_WARMUP = [
    {
      prompt: 'What is a topological invariant, informally?',
      answer: 'A property of a system that cannot change under smooth deformations of parameters without closing an energy gap.',
      steps: [
        'Topology studies properties preserved under continuous deformation.',
        'In condensed matter, one can deform a Hamiltonian without crossing phase transitions; invariants label distinct phases.',
        'Examples: Chern number in 2D, $\\mathbb{Z}_2$ invariant in 3D topological insulators.',
      ],
    },
    {
      prompt: 'Give the classic example of a topologically non-trivial phase observed experimentally.',
      answer: 'The integer quantum Hall effect, where Hall conductance is quantized in units of $e^2/h$.',
      steps: [
        'Discovered by von Klitzing (1980).',
        'Plateaus in $\\sigma_{xy}$ at integer multiples of $e^2/h$ to better than $10^{-9}$.',
        'TKNN (1982) showed this integer is a Chern number in momentum space.',
      ],
    },
    {
      prompt: 'What is a topological insulator?',
      answer: 'A material that is insulating in the bulk but has topologically-protected conducting states on its surface, driven by strong spin-orbit coupling.',
      steps: [
        'Bulk bands have a nontrivial $\\mathbb{Z}_2$ invariant.',
        'Band theory then requires gapless surface states (bulk-boundary correspondence).',
        'The surface states are protected by time-reversal symmetry and are robust against non-magnetic disorder.',
      ],
    },
    {
      prompt: 'Define the Berry phase for a slowly-varying Hamiltonian.',
      answer: '$\\gamma_C = i \\oint_C \\langle n(\\mathbf R) | \\nabla_{\\mathbf R} | n(\\mathbf R) \\rangle \\cdot d\\mathbf R$.',
      steps: [
        'Adiabatic theorem: a system stays in its instantaneous eigenstate $|n(\\mathbf R(t))\\rangle$.',
        'Beyond the dynamical phase, it picks up a geometric phase $\\gamma_C$.',
        'The integral is gauge-invariant for closed paths $C$.',
      ],
    },
    {
      prompt: 'Why are anyons only possible in 2+1 dimensions?',
      answer: 'In 3D, particle exchanges form the symmetric group with only two 1D irreps (bosons/fermions). In 2D the configuration space is multiply connected — exchange forms the braid group, which has richer representations.',
      steps: [
        'In $d \\ge 3$, double exchange of identical particles is homotopic to no exchange, forcing the phase after single exchange to square to 1.',
        'In 2D, exchange paths cannot be unlinked; the braid group is non-trivial.',
        'Representations of the braid group include fractional statistics (Abelian anyons) and non-Abelian ones.',
      ],
    },
  ];

  var TOPO_STANDARD = [
    {
      prompt: 'In the integer quantum Hall effect, the Hall conductance is $\\sigma_{xy} = \\nu\\,e^2/h$. Compute the value at $\\nu = 1$ and compare to a typical resistance.',
      answer: '$\\sigma_{xy} \\approx 3.87 \\times 10^{-5}\\ \\mathrm S$, i.e., $R_H = h/e^2 \\approx 25.8\\ \\mathrm{k\\Omega}$.',
      steps: [
        '$e^2/h = (1.602\\times 10^{-19})^2 / (6.626\\times 10^{-34}) \\approx 3.87\\times 10^{-5}\\ \\mathrm S$.',
        '$h/e^2 \\approx 25812.8\\ \\mathrm\\Omega$.',
        'This is the "von Klitzing constant" and defines the current SI resistance standard.',
      ],
    },
    {
      prompt: 'Why are topologically protected edge states robust against disorder?',
      answer: 'Because backscattering requires transitioning into a state with opposite momentum and (in topological insulators) opposite spin — which requires breaking time-reversal symmetry, forbidden by non-magnetic impurities.',
      steps: [
        'In a topological insulator\'s edge, counter-propagating modes have opposite spin.',
        'A non-magnetic impurity can\'t flip spin, so it can\'t scatter left-movers into right-movers.',
        'The edge conduction is therefore dissipationless in the low-temperature limit.',
      ],
    },
    {
      prompt: 'What is a Chern number, and what system is it computed for?',
      answer: 'An integer topological invariant obtained by integrating the Berry curvature over the 2D Brillouin zone of a band insulator.',
      steps: [
        'For each band, define Berry curvature $\\Omega(\\mathbf k) = \\nabla_{\\mathbf k}\\times \\mathbf A(\\mathbf k)$ where $\\mathbf A$ is the Berry connection.',
        'Chern number $C = (1/2\\pi)\\int_{BZ} \\Omega\\,d^2 k$.',
        'It is an integer by Chern-Gauss-Bonnet and counts the number of chiral edge states on a finite sample.',
      ],
    },
    {
      prompt: 'Give a physical interpretation of the SSH (Su-Schrieffer-Heeger) model\'s topology.',
      answer: 'The SSH chain has two dimerization patterns; one is topologically trivial and one has zero-energy edge states, distinguished by a $\\mathbb Z_2$ (winding number) invariant.',
      steps: [
        'Alternating hoppings $t, t\'$ on a 1D lattice.',
        'For $t < t\'$, the chain ends in "strong" bonds — trivial phase.',
        'For $t > t\'$, ends in "weak" bonds — topological phase with zero-energy boundary modes.',
        'A simple, exactly solvable model with a $\\mathbb Z_2$ invariant from winding of the bulk Hamiltonian.',
      ],
    },
    {
      prompt: 'What experimental signature would confirm Majorana zero modes at the ends of a topological superconducting nanowire?',
      answer: 'A zero-bias peak in the tunneling conductance, robust to perturbations, quantized to $2e^2/h$, and arising only in the topological phase.',
      steps: [
        'Majorana modes are zero-energy boundary states of a 1D topological superconductor.',
        'Andreev reflection from a normal-metal lead gives conductance $2e^2/h$ when a Majorana is present.',
        'Robustness to parameter variation and quantization distinguishes it from trivial zero-bias peaks.',
        'Claims so far are suggestive but not yet conclusive.',
      ],
    },
  ];

  var TOPO_CHALLENGE = [
    {
      prompt: 'Outline the idea of topological quantum computing with non-Abelian anyons. What is the central advantage?',
      answer: 'Braiding non-Abelian anyons implements unitary gates that depend only on the topology of the braid. Because local perturbations can\'t change topology, the gates are intrinsically fault-tolerant.',
      steps: [
        'Non-Abelian anyons have a multi-dimensional ground-state manifold at fixed particle positions.',
        'Exchanging (braiding) two anyons rotates within this manifold — a unitary on the computational space.',
        'Errors from local noise can\'t unbraid a knot, so computations are topologically protected.',
        'Candidate platforms: $\\nu=5/2$ fractional quantum Hall, Majorana-based systems.',
      ],
    },
    {
      prompt: 'Why is the bulk-boundary correspondence an example of a general principle in physics, and where else does it appear?',
      answer: 'It says that when a bulk has a topologically non-trivial invariant, the boundary must host gapless modes matching that invariant. Analogous principles: holography (AdS/CFT), anomaly inflow, and index theorems in math/physics.',
      steps: [
        'Bulk topological invariants count modes that cannot be removed by local deformations.',
        'Those modes must "live somewhere" — they appear on boundaries.',
        'Holography extends this: a bulk theory is dual to a boundary field theory of one lower dimension.',
        'The index theorem ties zero modes of Dirac operators to integer topological invariants of the underlying space.',
      ],
    },
    {
      prompt: 'The Haldane model is a 2D lattice model with zero net magnetic flux that exhibits a quantum Hall effect. Why is it historically important?',
      answer: 'It showed that the integer quantum Hall effect is not tied to a real magnetic field; it can arise from broken time-reversal symmetry alone. This opened the door to anomalous Hall effects and the whole classification of topological band insulators.',
      steps: [
        'Haldane (1988) added complex next-nearest-neighbor hoppings to a honeycomb lattice.',
        'The flux through each sublattice triangle alternates but totals zero over the unit cell.',
        'Time-reversal is broken; bands acquire non-trivial Chern number without external field.',
        'The idea generalizes to the Kane-Mele $\\mathbb Z_2$ insulator and the entire classification of symmetry-protected topological phases.',
      ],
    },
  ];

  PS.registerTopic("phys-frontier-topo", {
    title: "Topological matter",
    description: "Berry phase, Chern numbers, topological insulators, and why boundary modes are robust.",
    warmup: TOPO_WARMUP,
    standard: TOPO_STANDARD,
    challenge: TOPO_CHALLENGE,
  });

})();
