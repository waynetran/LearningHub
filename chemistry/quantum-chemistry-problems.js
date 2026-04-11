/*
 * LearningHub — Quantum Chemistry Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   chem-qc-foundations — Born-Oppenheimer, variational principle, molecular orbitals
 *   chem-qc-hf-basis    — Hartree-Fock, self-consistent field, basis sets
 *   chem-qc-dft         — density functional theory, exchange-correlation functionals
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[quantum-chemistry-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: chem-qc-foundations
  // ============================================================
  var FOUND_WARMUP = [
    {
      prompt: 'State the Born-Oppenheimer approximation.',
      answer: 'Decouple electronic and nuclear motion: solve the electronic Schrödinger equation at fixed nuclear positions, then treat the resulting energy as a potential for slower nuclear motion.',
      steps: [
        'Nuclei are $\\sim 10^3$–$10^5$ times heavier than electrons, so they move much more slowly.',
        'Factor the wavefunction: $\\Psi(\\mathbf r, \\mathbf R) \\approx \\psi_e(\\mathbf r; \\mathbf R)\\chi_n(\\mathbf R)$.',
        'Electrons see a fixed nuclear potential; nuclei move on the electronic energy surface.',
        'The approximation breaks down near conical intersections where electronic states become degenerate.',
      ],
    },
    {
      prompt: 'Write the electronic Hamiltonian for a molecule in atomic units.',
      answer: '$\\hat H_e = -\\tfrac12\\sum_i \\nabla_i^2 - \\sum_{i,A} Z_A/r_{iA} + \\sum_{i<j} 1/r_{ij}$.',
      steps: [
        'First term: kinetic energy of the electrons.',
        'Second term: attraction between each electron $i$ and each nucleus $A$ at distance $r_{iA}$.',
        'Third term: mutual Coulomb repulsion of electrons.',
        'Nuclear-nuclear repulsion is a constant added afterwards in the Born-Oppenheimer picture.',
      ],
    },
    {
      prompt: 'State the variational principle and say why it is useful in quantum chemistry.',
      answer: 'For any trial wavefunction $\\Psi$, the Rayleigh quotient $E[\\Psi] = \\langle\\Psi|\\hat H|\\Psi\\rangle/\\langle\\Psi|\\Psi\\rangle$ is $\\ge$ the true ground-state energy. It lets you optimize approximate wavefunctions by minimizing a computable energy.',
      steps: [
        'Expand $\\Psi$ in exact eigenstates $\\phi_n$ with energies $E_n$.',
        'Then $\\langle\\Psi|\\hat H|\\Psi\\rangle = \\sum_n |c_n|^2 E_n \\ge E_0 \\sum_n |c_n|^2$.',
        'Divide through to get $E[\\Psi] \\ge E_0$.',
        'Minimizing $E[\\Psi]$ over any trial family gives the best bound within that family.',
      ],
    },
    {
      prompt: 'What is a molecular orbital?',
      answer: 'A single-electron wavefunction delocalized over the whole molecule, typically written as a linear combination of atomic orbitals (LCAO).',
      steps: [
        'In the independent-electron picture, each electron sits in its own orbital.',
        'Molecular orbitals span the molecule, unlike atomic orbitals which are centered on one nucleus.',
        'LCAO: $\\psi_i = \\sum_A c_{Ai}\\phi_A$, where $\\phi_A$ are atomic-orbital basis functions.',
      ],
    },
    {
      prompt: 'What is a Slater determinant and why is it needed?',
      answer: 'An antisymmetrized product of spin-orbitals that satisfies the Pauli exclusion principle for fermions.',
      steps: [
        'Electrons are indistinguishable fermions, so the total wavefunction must be antisymmetric under particle exchange.',
        'A determinant is antisymmetric by construction: swapping two rows flips its sign.',
        'Each row contains one orbital evaluated at the same electron; each column is one electron.',
        'The normalization is $1/\\sqrt{N!}$.',
      ],
    },
  ];

  var FOUND_STANDARD = [
    {
      prompt: 'For $H_2^+$ with inter-nuclear distance $R$, write the simplest LCAO trial wavefunction.',
      answer: '$\\psi_{\\pm} = (\\phi_A \\pm \\phi_B)/\\sqrt{2(1 \\pm S_{AB})}$ where $\\phi_{A,B}$ are 1s orbitals and $S_{AB} = \\langle\\phi_A|\\phi_B\\rangle$.',
      steps: [
        'Use two 1s atomic orbitals, one centered on each nucleus.',
        'Two symmetry-adapted combinations: bonding (even) and antibonding (odd).',
        'Normalization includes the overlap $S_{AB}$ because the 1s orbitals are not orthogonal.',
        '$\\psi_+$ is lower in energy; $\\psi_-$ is higher.',
      ],
    },
    {
      prompt: 'Derive the ground-state energy of a hydrogen atom variationally using the trial function $\\psi(\\mathbf r) = (Z^3/\\pi)^{1/2}e^{-Zr}$ (Z variational).',
      answer: '$E(Z) = Z^2/2 - Z$; minimizing gives $Z=1$ and $E = -1/2$ Hartree, exact.',
      steps: [
        'Kinetic energy: $\\langle T\\rangle = Z^2/2$.',
        'Potential energy: $\\langle V\\rangle = -Z$.',
        'Total: $E(Z) = Z^2/2 - Z$.',
        'Minimize: $dE/dZ = Z - 1 = 0$, so $Z = 1$ and $E = -0.5$ Hartree, exact for H.',
      ],
    },
    {
      prompt: 'Variational ground-state energy of He using a product trial $(Z^3/\\pi)e^{-Z(r_1+r_2)}$. What $Z$ minimizes the energy?',
      answer: '$Z_{\\rm opt} = 27/16$ and $E_{\\rm min} \\approx -2.848$ Hartree.',
      steps: [
        'Kinetic energy (2 electrons): $Z^2$.',
        'Electron-nucleus potential: $-4Z$ (each electron sees full $Z=2$ nuclear charge).',
        'Electron-electron repulsion: $5Z/8$.',
        'Total: $E(Z) = Z^2 - 4Z + 5Z/8 = Z^2 - 27Z/8$. Minimize: $Z_{\\rm opt} = 27/16$.',
        'At minimum, $E \\approx -2.848$ Hartree vs. exact $-2.904$. Within $2\\%$.',
      ],
    },
    {
      prompt: 'Explain why the helium atom cannot be solved analytically.',
      answer: 'The electron-electron repulsion term $1/r_{12}$ couples the two electrons\' coordinates and prevents separation of variables.',
      steps: [
        'Non-interacting electrons: the Schrödinger equation separates and each electron is hydrogenic.',
        'With $1/r_{12}$, the Hamiltonian is no longer a sum of one-electron operators.',
        'The eigenvalue problem is a 6D PDE with a singular coupling.',
        'Perturbation theory, variational calculations, and high-accuracy numerics are used instead.',
      ],
    },
    {
      prompt: 'Explain why the energy of the bonding MO in $H_2^+$ is lower than that of a free H atom.',
      answer: 'Because the bonding MO has nonzero amplitude between the two nuclei, lowering the electron\'s average potential energy below that of a single H atom.',
      steps: [
        'The electron spends time in the internuclear region, where both nuclei attract it.',
        'Kinetic energy increases slightly because the orbital is more spread out.',
        'The potential-energy decrease outweighs the kinetic-energy increase for $R$ near equilibrium.',
        'At very large $R$, the energy approaches that of a free H atom.',
      ],
    },
  ];

  var FOUND_CHALLENGE = [
    {
      prompt: 'Explain the difference between "vertical" and "adiabatic" electronic excitation energies, and which is larger.',
      answer: 'Vertical is the energy at the ground-state geometry (fixed nuclei); adiabatic includes nuclear relaxation on the excited-state surface. Vertical > adiabatic.',
      steps: [
        'In the Franck-Condon picture, electronic transitions happen on timescales much shorter than nuclear motion.',
        'The vertical excitation occurs without nuclear rearrangement.',
        'After the transition, nuclei can relax on the excited-state potential surface, lowering the energy further.',
        'The difference equals the excited-state reorganization energy.',
      ],
    },
    {
      prompt: 'Describe the Hellmann-Feynman theorem and one of its uses in quantum chemistry.',
      answer: 'For an exact eigenstate, $\\partial E/\\partial\\lambda = \\langle\\Psi|\\partial\\hat H/\\partial\\lambda|\\Psi\\rangle$. It gives forces on nuclei in terms of the classical electric field at each nucleus, essential for geometry optimization.',
      steps: [
        'Take the derivative of $\\langle\\Psi|\\hat H|\\Psi\\rangle$ with respect to any Hamiltonian parameter $\\lambda$.',
        'For an exact eigenstate the terms with derivatives of $\\Psi$ vanish.',
        'Choose $\\lambda$ to be a nuclear coordinate: the force on that nucleus is the expectation value of the Coulomb force.',
        'This turns quantum force calculations into classical-looking integrals over the charge density.',
      ],
    },
    {
      prompt: 'Why do we use symmetry-adapted basis functions, and what do they save?',
      answer: 'They block-diagonalize the Hamiltonian by symmetry species, reducing the cost of matrix diagonalization and producing orbitals labeled by irreducible representations of the molecular point group.',
      steps: [
        'Group theory splits a reducible representation into irreducible ones.',
        'Matrix elements between different irreps vanish by symmetry.',
        'Solving a $N\\times N$ eigenvalue problem becomes several smaller ones (one per irrep).',
        'This saves compute and prevents spurious symmetry-breaking in approximate methods.',
      ],
    },
  ];

  PS.registerTopic("chem-qc-foundations", {
    title: "Foundations of quantum chemistry",
    description: "Born-Oppenheimer, molecular orbitals, and the variational principle as the backbone of electronic-structure theory.",
    warmup: FOUND_WARMUP,
    standard: FOUND_STANDARD,
    challenge: FOUND_CHALLENGE,
  });

  // ============================================================
  // TOPIC: chem-qc-hf-basis
  // ============================================================
  var HF_WARMUP = [
    {
      prompt: 'State the Hartree-Fock approximation in one sentence.',
      answer: 'Each electron moves in the mean field produced by the other electrons; the many-electron wavefunction is a single Slater determinant of optimized spin-orbitals.',
      steps: [
        'Replace the true electron-electron repulsion with an average over all other electrons.',
        'Optimize the orbitals by minimizing the variational energy.',
        'The result is self-consistent: the mean field depends on the orbitals, which depend on the mean field.',
      ],
    },
    {
      prompt: 'What does "SCF" stand for, and what loop does it describe?',
      answer: 'Self-Consistent Field: iteratively diagonalize the Fock matrix, build a new density, and rebuild the Fock matrix until convergence.',
      steps: [
        'Start with an initial guess for the density (e.g. sum of atomic densities).',
        'Build the Fock matrix from the density.',
        'Diagonalize to get new orbitals.',
        'Rebuild the density; repeat until the energy stops changing (to some tolerance, e.g., $10^{-8}$ Hartree).',
      ],
    },
    {
      prompt: 'What is the physical difference between Coulomb and exchange terms in the Fock operator?',
      answer: 'Coulomb is the classical mean-field repulsion between electron densities; exchange is a purely quantum term enforcing Pauli antisymmetry and reducing the self-repulsion of same-spin electrons.',
      steps: [
        'Coulomb: $J_{ij} = \\iint |\\phi_i|^2\\,r_{12}^{-1}\\,|\\phi_j|^2\\,dr_1dr_2$.',
        'Exchange: $K_{ij} = \\iint \\phi_i^*(1)\\phi_j^*(2) r_{12}^{-1} \\phi_j(1)\\phi_i(2)\\,dr_1 dr_2$, only between same-spin pairs.',
        'Exchange cancels the spurious self-interaction in the Coulomb term for $i=j$.',
      ],
    },
    {
      prompt: 'What is a basis set in quantum chemistry?',
      answer: 'A finite set of functions (typically atomic-orbital-like) used to expand molecular orbitals. Bigger basis = more flexible wavefunction but higher cost.',
      steps: [
        'MOs are expanded as $\\psi_i = \\sum_\\mu c_{\\mu i}\\chi_\\mu$ where $\\chi_\\mu$ are basis functions.',
        'Matrix elements of $\\hat H$ are computed in the basis.',
        'The SCF finds the coefficients $c_{\\mu i}$ that minimize the variational energy.',
      ],
    },
    {
      prompt: 'What is the difference between STO-3G and 6-31G* in plain terms?',
      answer: 'STO-3G is a minimal basis (one function per occupied AO, each fit to 3 Gaussians); 6-31G* is a split-valence double-zeta basis with polarization functions on heavy atoms. 6-31G* is much larger and more accurate.',
      steps: [
        'STO-3G: 1 function per valence AO; useful for teaching and qualitative pictures only.',
        '6-31G: valence split into 3+1 Gaussians — more radial flexibility.',
        '6-31G*: adds d polarization functions on non-H atoms to capture distortions.',
        '6-31G** also adds p polarization on hydrogens.',
      ],
    },
  ];

  var HF_STANDARD = [
    {
      prompt: 'Write the Roothaan-Hall equations.',
      answer: '$\\mathbf{FC} = \\mathbf{SC}\\boldsymbol\\varepsilon$, where $\\mathbf F$ is the Fock matrix, $\\mathbf S$ is the overlap matrix, $\\mathbf C$ are orbital coefficients, and $\\boldsymbol\\varepsilon$ is the diagonal matrix of orbital energies.',
      steps: [
        'Project Hartree-Fock into a finite basis.',
        'Obtain a generalized eigenvalue problem because the basis is not orthonormal ($\\mathbf S \\ne \\mathbf I$).',
        'Orthogonalize (e.g., Löwdin $S^{-1/2}$) to convert to a standard eigenvalue problem.',
        'Iterate to self-consistency.',
      ],
    },
    {
      prompt: 'Why is Hartree-Fock not exact even in the limit of a complete basis?',
      answer: 'HF uses a single Slater determinant, missing electron correlation — the instantaneous avoidance of electrons beyond the mean field.',
      steps: [
        'HF optimizes the best possible single-determinant wavefunction.',
        'Real electrons are correlated: they avoid each other more than the mean field predicts.',
        'The difference $E_{\\rm exact} - E_{\\rm HF}$ is called correlation energy, typically 1% of the total energy but often the difference between right and wrong chemistry.',
        'Post-HF methods (CI, CC, MP2) or DFT try to recover the correlation.',
      ],
    },
    {
      prompt: 'Compute (symbolically) the scaling of HF with basis set size $N$. Why is it often called an $O(N^4)$ method?',
      answer: 'Computing the two-electron integrals $(ij|kl)$ scales as $O(N^4)$, dominating cost for small systems.',
      steps: [
        'There are up to $N^4$ unique two-electron integrals (modulo symmetry).',
        'SCF iterations assemble the Fock matrix from these.',
        'Diagonalization is only $O(N^3)$, cheaper than integral work for small-to-medium molecules.',
        'Prescreening and density fitting can lower effective scaling in practice.',
      ],
    },
    {
      prompt: 'Explain what "double zeta plus polarization" means in a basis-set context.',
      answer: 'Two independent functions per valence atomic orbital ("double zeta") plus higher-angular-momentum functions to let orbitals polarize in the presence of neighboring atoms.',
      steps: [
        'Single-zeta basis: one function per AO. Too rigid — orbital shape is frozen.',
        'Double-zeta: two functions per valence AO, allowing radial flexibility.',
        'Polarization: add p functions to H (or d to carbon) so orbitals can tilt/distort.',
        'Typical DZP basis set: 6-31G*, cc-pVDZ.',
      ],
    },
    {
      prompt: 'Why do Gaussian-type orbitals (GTOs) dominate over Slater-type orbitals (STOs) in practice?',
      answer: 'The product of two Gaussians on different centers is itself a Gaussian at an intermediate center, making multi-center two-electron integrals tractable. STOs do not have this property.',
      steps: [
        'STOs have correct cusp and exponential decay, so they fit atomic orbitals more accurately.',
        'But STO two-center integrals require numerical or complicated analytical methods.',
        'GTOs: $e^{-\\alpha r^2}$ have simpler mathematics. Gaussian product theorem reduces two-center integrals to one-center ones.',
        'Modern basis sets use contracted GTOs (linear combinations of primitives) to mimic STO shape with GTO efficiency.',
      ],
    },
  ];

  var HF_CHALLENGE = [
    {
      prompt: 'Compare the cost of MP2, CCSD, and CCSD(T) with respect to basis size $N$.',
      answer: 'MP2 scales $O(N^5)$; CCSD scales $O(N^6)$; CCSD(T) scales $O(N^7)$ — the "gold standard" for small molecules but computationally demanding.',
      steps: [
        'MP2 is second-order many-body perturbation theory from HF reference.',
        'CCSD includes single and double excitations via the exponential coupled-cluster ansatz.',
        'CCSD(T) adds a perturbative triples correction on top of CCSD — hence the parentheses.',
        'Each step up the ladder roughly halves the error in energy but raises cost by an order of $N$.',
      ],
    },
    {
      prompt: 'Explain why open-shell species (like O$_2$) pose problems for standard restricted HF.',
      answer: 'Restricted HF forces paired spatial orbitals, which can\'t represent an open-shell state. You need unrestricted (UHF) or restricted open-shell (ROHF) variants, each with their own issues (spin contamination for UHF; non-unique orbitals for ROHF).',
      steps: [
        'O$_2$ has two unpaired electrons in degenerate $\\pi^*$ orbitals — a triplet ground state.',
        'RHF can\'t represent it; you must allow spin-polarized orbitals.',
        'UHF allows $\\alpha$ and $\\beta$ orbitals to differ but introduces spin contamination (mixing with higher-spin states).',
        'ROHF keeps spin purity but requires extra machinery for single determinants.',
      ],
    },
    {
      prompt: 'The complete basis set (CBS) limit matters for high-accuracy work. Why, and how do people estimate it?',
      answer: 'Finite-basis errors can exceed correlation errors for small basis sets. People extrapolate energies from a sequence of increasingly large basis sets (e.g., cc-pVDZ, cc-pVTZ, cc-pVQZ) using an assumed $1/L^3$ or $e^{-\\alpha L}$ form.',
      steps: [
        'Correlation-consistent basis sets cc-pV$n$Z have systematic improvement with $n$.',
        'HF energies converge as $e^{-\\alpha\\sqrt n}$; correlation energies as $1/L^3$ where $L \\propto n$.',
        'Fit or extrapolate to $n \\to \\infty$ to estimate the CBS-limit energy.',
        'Reduces basis-set error and lets one focus on method error (HF vs. CCSD vs. ...).',
      ],
    },
  ];

  PS.registerTopic("chem-qc-hf-basis", {
    title: "Hartree-Fock and basis sets",
    description: "The workhorse single-determinant method and the finite function bases that make it computable.",
    warmup: HF_WARMUP,
    standard: HF_STANDARD,
    challenge: HF_CHALLENGE,
  });

  // ============================================================
  // TOPIC: chem-qc-dft
  // ============================================================
  var DFT_WARMUP = [
    {
      prompt: 'State the Hohenberg-Kohn theorem in plain language.',
      answer: 'The ground-state energy of a many-electron system is a unique functional of the electron density $\\rho(\\mathbf r)$.',
      steps: [
        'All information about the system (electrons, external potential) is encoded in $\\rho$.',
        'Two different external potentials cannot give the same ground-state density.',
        'Therefore, instead of the $N$-electron wavefunction (a function of $3N$ coordinates), one can in principle work with the 3D density.',
      ],
    },
    {
      prompt: 'What is the Kohn-Sham approach to DFT?',
      answer: 'Map the interacting problem onto a fictitious non-interacting system with the same density, solved by single-particle orbitals moving in an effective potential.',
      steps: [
        'Define non-interacting orbitals $\\phi_i$ with density $\\rho = \\sum_i |\\phi_i|^2$.',
        'Construct an effective potential $v_{\\rm eff} = v_{\\rm ext} + v_H + v_{\\rm xc}$.',
        'Solve $(-\\tfrac12\\nabla^2 + v_{\\rm eff})\\phi_i = \\varepsilon_i\\phi_i$.',
        'Iterate to self-consistency like in HF.',
      ],
    },
    {
      prompt: 'What does the exchange-correlation functional $E_{\\rm xc}[\\rho]$ encode?',
      answer: 'All many-body quantum effects not captured by the classical Coulomb and kinetic energies of a non-interacting system.',
      steps: [
        'The total energy in DFT: $E = T_s[\\rho] + E_{\\rm ext}[\\rho] + E_H[\\rho] + E_{\\rm xc}[\\rho]$.',
        '$T_s$ is the non-interacting kinetic energy; $E_{\\rm ext}$ and $E_H$ are classical.',
        '$E_{\\rm xc}$ bundles exchange, correlation, and the difference between interacting and non-interacting kinetic energies.',
        'It is the only unknown piece, and DFT\'s accuracy depends entirely on how well it is approximated.',
      ],
    },
    {
      prompt: 'What do LDA, GGA, and hybrid functionals mean?',
      answer: 'LDA uses local density only; GGA adds gradients of the density; hybrids mix in a fraction of exact Hartree-Fock exchange.',
      steps: [
        'LDA: $E_{\\rm xc}[\\rho] = \\int \\varepsilon_{\\rm xc}(\\rho(\\mathbf r))\\rho\\,d^3 r$; built from the uniform electron gas.',
        'GGA (e.g., PBE): also uses $|\\nabla\\rho|$; improves atomization energies.',
        'Hybrid (e.g., B3LYP, PBE0): mixes in 20–25% exact HF exchange, correcting many LDA/GGA errors.',
        'Higher rungs include meta-GGA and double-hybrids that include MP2-like correlation.',
      ],
    },
    {
      prompt: 'Why is DFT popular in quantum chemistry despite being approximate?',
      answer: 'It captures most correlation at roughly HF cost (O(N^3–4)), so it scales to much larger molecules than post-HF methods while giving "chemically useful" accuracy for many problems.',
      steps: [
        'HF misses correlation; post-HF (MP2/CCSD) is expensive.',
        'DFT builds correlation into the functional and needs only single-particle orbitals.',
        'Cost is comparable to HF, so systems of 100+ atoms are routine.',
        'Caveats: self-interaction error, systematic failures for dispersion, transition metals, etc.',
      ],
    },
  ];

  var DFT_STANDARD = [
    {
      prompt: 'Explain what "self-interaction error" is in DFT.',
      answer: 'In standard DFT, the Hartree energy of a single electron is not exactly cancelled by the approximate exchange, so the electron unphysically repels itself. This biases results for charge delocalization and reaction barriers.',
      steps: [
        'For one electron, $E_H[\\rho] \\ne 0$ but the true total energy has no self-Coulomb.',
        'Exact exchange would cancel it exactly; approximate $v_{\\rm xc}$ does not.',
        'Consequences: overdelocalized charges, underestimated reaction barriers, wrong dissociation.',
        'Hybrid functionals reduce (but do not eliminate) the error by mixing in exact exchange.',
      ],
    },
    {
      prompt: 'Name a standard failure of GGA functionals for transition metals.',
      answer: 'GGAs often get wrong spin-state orderings (e.g., high-spin vs. low-spin Fe complexes) and overestimate metal-ligand bond lengths.',
      steps: [
        'Transition metals involve nearly degenerate d orbitals.',
        'GGA exchange underestimates gaps between close-lying states.',
        'Wrong spin-state orderings crop up in iron porphyrins and cobalt complexes, important for biochemistry.',
        'Functionals like B3LYP* (lower HF fraction) or DFT+U can improve results.',
      ],
    },
    {
      prompt: 'Why do pure DFT functionals underestimate dispersion (van der Waals) interactions, and what is a common fix?',
      answer: 'Local and semi-local functionals can\'t capture the non-local $1/R^6$ correlation between instantaneous dipoles. The DFT-D correction (Grimme) adds an empirical pairwise $C_6/R^6$ term.',
      steps: [
        'Dispersion arises from long-range correlated fluctuations of the electron density.',
        'LDA/GGA are local and can\'t see two distant regions correlating.',
        'Grimme\'s D2/D3/D4 adds empirical pair potentials with damping at short range.',
        'Non-local functionals (vdW-DF, VV10) handle dispersion from first principles at higher cost.',
      ],
    },
    {
      prompt: 'Describe the Kohn-Sham "band gap problem" for DFT semiconductors.',
      answer: 'The KS eigenvalue gap underestimates the true fundamental gap (e.g., Si: LDA $\\sim 0.6$ eV vs. experiment $1.17$ eV) because the derivative discontinuity of $v_{\\rm xc}$ is missing from standard functionals.',
      steps: [
        'The fundamental gap is defined thermodynamically: $I - A$ (ionization energy minus electron affinity).',
        'KS eigenvalues do not equal $I$ and $A$ exactly.',
        'The missing piece is the "derivative discontinuity" $\\Delta_{\\rm xc}$.',
        'Hybrid functionals partly restore it; rigorous solutions include GW theory.',
      ],
    },
    {
      prompt: 'Why is B3LYP still the most popular functional in organic chemistry despite its age?',
      answer: 'It gives reasonable structures, vibrations, and thermochemistry for most main-group organic molecules at modest cost, and the community has built up decades of reference data.',
      steps: [
        'Becke 88 exchange + Lee-Yang-Parr correlation + 20% HF exchange.',
        'Parameterized by Becke in 1993 against a small training set.',
        'Fortuitous error cancellation makes it work well for main-group organic chemistry.',
        'Fails for dispersion, transition metals, and radicals — context matters.',
      ],
    },
  ];

  var DFT_CHALLENGE = [
    {
      prompt: 'Discuss why DFT is called "ab initio" by some and "semi-empirical" by others.',
      answer: 'Ab initio because it derives from the formal HK-KS framework without using experimental data in principle; semi-empirical because practical functionals (especially hybrids) are parameter-fit to molecular data.',
      steps: [
        'Strict "ab initio" means no empirical fit at all.',
        'LDA is derived from the uniform electron gas, which is parameter-free in principle.',
        'GGAs like PBE are parameter-free (from exact constraints); others like BLYP use fits.',
        'Hybrid functionals (B3LYP) explicitly include parameters fit to experiment.',
      ],
    },
    {
      prompt: 'Describe one "exact constraint" that any DFT functional should satisfy, and why it matters.',
      answer: 'The Lieb-Oxford bound $E_{\\rm xc} \\ge -1.68\\int \\rho^{4/3}$ limits how negative exchange-correlation can be. Functionals violating it can give unphysically low energies, and enforcing it (e.g., in SCAN) improves robustness.',
      steps: [
        'Exact constraints are properties the true functional must satisfy.',
        'Examples: uniform coordinate scaling, derivative discontinuity at integer $N$, Lieb-Oxford bound.',
        'SCAN (Sun-Ruzsinszky-Perdew) enforces 17 known constraints.',
        'Respecting constraints avoids catastrophic failures outside training data.',
      ],
    },
    {
      prompt: 'Explain why TDDFT is used for excited states and what its main failure modes are.',
      answer: 'Time-dependent DFT linearizes around the ground-state density to compute excitation energies efficiently. Failures include charge-transfer states (underestimated), Rydberg states, and double excitations.',
      steps: [
        'Runge-Gross theorem generalizes Hohenberg-Kohn to time-dependent densities.',
        'Linear response gives Casida equations; solving them yields excitation energies.',
        'Local functionals give wrong asymptotics, underestimating charge-transfer energies.',
        'Range-separated hybrids (e.g., CAM-B3LYP) improve this considerably.',
      ],
    },
  ];

  PS.registerTopic("chem-qc-dft", {
    title: "Density functional theory",
    description: "Hohenberg-Kohn, Kohn-Sham, and the practical functionals that make DFT the workhorse of computational chemistry.",
    warmup: DFT_WARMUP,
    standard: DFT_STANDARD,
    challenge: DFT_CHALLENGE,
  });

})();
