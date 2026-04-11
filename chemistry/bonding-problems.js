/*
 * LearningHub - Bonding Problem Set
 * Registers topics: chem-bond-types, chem-bond-lewis, chem-bond-geometry, chem-bond-imf
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[bonding-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC: chem-bond-types - ionic vs covalent vs metallic, electronegativity
  // ==========================================================================
  var STATIC_TYPES_WARMUP = [
    {
      prompt: 'Which bond is more ionic: Na-Cl or C-O?',
      answer: 'Na-Cl',
      steps: [
        'Pauling electronegativities: Na 0.93, Cl 3.16, so $\\Delta\\chi = 2.23$.',
        'C 2.55, O 3.44, so $\\Delta\\chi = 0.89$.',
        'The larger difference (Na-Cl) is more ionic.',
      ],
    },
    {
      prompt: 'Rank these bonds from least to most polar: C-H, O-H, H-F.',
      answer: 'C-H < O-H < H-F',
      steps: [
        '$\\Delta\\chi$: C-H $= 0.35$; O-H $= 1.24$; H-F $= 1.78$.',
        'Greater electronegativity difference = more polar bond.',
      ],
    },
    {
      prompt: 'Is the N-N bond in $\\text{N}_2$ polar or nonpolar?',
      answer: 'Nonpolar',
      steps: [
        'Both atoms are identical, so $\\Delta\\chi = 0$.',
        'A bond between identical atoms is always purely covalent.',
      ],
    },
    {
      prompt: 'What is the dominant bond type in copper metal?',
      answer: 'Metallic',
      steps: [
        'Copper atoms share a common sea of delocalized valence electrons.',
        'The positive ion cores are held together by this shared electron sea.',
      ],
    },
    {
      prompt: 'Which of these is an ionic compound: KCl, CH$_4$, O$_2$?',
      answer: 'KCl',
      steps: [
        'K is a metal with low ionization energy; Cl is a nonmetal with high electron affinity.',
        'K donates an electron to Cl, giving K$^+$ and Cl$^-$ ions that stack in a lattice.',
      ],
    },
    {
      prompt: 'Approximate the $\\Delta\\chi$ threshold above which a bond is usually called ionic.',
      answer: '$\\Delta\\chi > 1.7$',
      steps: [
        'Rule of thumb: $< 0.4$ covalent, $0.4$-$1.7$ polar covalent, $> 1.7$ ionic.',
        'This is a rough guide only; the real distinction is continuous.',
      ],
    },
    {
      prompt: 'Which atom carries the partial negative charge in a C-O bond?',
      answer: 'O',
      steps: [
        'Oxygen is more electronegative than carbon (3.44 vs 2.55).',
        'The more electronegative atom pulls shared electrons toward itself and acquires $\\delta^-$.',
      ],
    },
    {
      prompt: 'What holds a sodium chloride crystal together?',
      answer: 'Coulomb attraction between Na$^+$ and Cl$^-$ ions (plus short-range Pauli repulsion).',
      steps: [
        'Each Na$^+$ is surrounded by 6 Cl$^-$ ions in the rock-salt structure.',
        'The net Coulomb sum over the lattice gives a binding energy of $\\approx 787$ kJ/mol.',
      ],
    },
    {
      prompt: 'Explain why metallic bonding makes metals electrically conductive.',
      answer: 'Delocalized valence electrons in the electron sea can move freely under an applied field.',
      steps: [
        'In a metal, valence electrons are not tied to any one atom.',
        'An electric field causes a net drift of the electron sea, which is the current.',
      ],
    },
    {
      prompt: 'Name one covalent substance that conducts electricity.',
      answer: 'Graphite (or any other delocalized $\\pi$ system).',
      steps: [
        'Most covalent solids are insulators because their electrons are localized in bonds.',
        'Graphite is the exception: the $\\pi$ electrons in each sheet are delocalized across the entire 2D layer.',
        'This lets graphite (and graphene) conduct electricity in-plane.',
      ],
    },
    {
      prompt: 'Is the H-H bond in $\\text{H}_2$ sigma or pi?',
      answer: 'Sigma ($\\sigma$)',
      steps: [
        'The two $1s$ orbitals overlap head-on along the internuclear axis.',
        'The resulting orbital is cylindrically symmetric - the definition of $\\sigma$.',
      ],
    },
    {
      prompt: 'For the bond-dissociation energies D(N=N) $\\approx$ 418, D(N$\\equiv$N) = 945, D(N-N) $\\approx$ 160 (kJ/mol), which bond is strongest?',
      answer: 'N$\\equiv$N (triple bond)',
      steps: [
        'Bond order increases from N-N (1) to N=N (2) to N$\\equiv$N (3).',
        'Each additional $\\pi$ adds to the $\\sigma$ strength.',
        'The dissociation energy of $\\text{N}_2$ (945 kJ/mol) is why it is so unreactive and why nitrogen fixation is such an energy-intensive process.',
      ],
    },
    {
      prompt: 'Which has a stronger bond: $\\text{H}_2$ or $\\text{HD}$?',
      answer: 'They have essentially the same bond energy (electrons do not care about isotopic mass).',
      steps: [
        'Chemical bonding is an electronic phenomenon; the mass of the nucleus is irrelevant.',
        'HD has a slightly different zero-point vibrational energy (heavier reduced mass means lower $\\nu$), but the potential-energy curve is the same.',
      ],
    },
    {
      prompt: 'Arrange by electronegativity (smallest first): Cs, H, O, F.',
      answer: 'Cs < H < O < F',
      steps: [
        'Pauling: Cs 0.79, H 2.20, O 3.44, F 3.98.',
        'Electronegativity generally rises to the right and up on the periodic table.',
      ],
    },
    {
      prompt: 'Predict the primary bond type in magnesium oxide (MgO).',
      answer: 'Ionic',
      steps: [
        'Mg 1.31, O 3.44, so $\\Delta\\chi = 2.13 > 1.7$.',
        'Mg loses 2 electrons to form Mg$^{2+}$; O gains 2 to form O$^{2-}$.',
        'Very large lattice energy (~3800 kJ/mol) and high melting point confirm the ionic picture.',
      ],
    },
  ];

  var STATIC_TYPES_STANDARD = [
    {
      prompt: 'Using Pauling electronegativities (H 2.20, C 2.55, N 3.04, O 3.44, Cl 3.16), rank the polarity of: C-Cl, O-H, N-H, C-N.',
      answer: 'C-N (0.49) < N-H (0.84) < O-H (1.24) but wait: C-Cl (0.61) - correct order: C-N < C-Cl < N-H < O-H',
      steps: [
        '$\\Delta\\chi$: C-N = 0.49, C-Cl = 0.61, N-H = 0.84, O-H = 1.24.',
        'Smaller difference = less polar.',
        'C-N is barely polar; O-H is polar enough to hydrogen-bond.',
      ],
    },
    {
      prompt: 'A certain AB bond has $D(AB) = 350$ kJ/mol, while $D(AA) = 200$ and $D(BB) = 150$. Estimate $\\chi_A - \\chi_B$ using Pauling\'s formula $\\Delta\\chi \\approx 0.102\\sqrt{D(AB) - \\tfrac{1}{2}(D(AA)+D(BB))}$.',
      answer: '$\\Delta\\chi \\approx 1.59$',
      steps: [
        'Average of homonuclear BDEs: $\\tfrac{1}{2}(200+150) = 175$.',
        'Excess bond energy: $350 - 175 = 175$ kJ/mol.',
        '$\\Delta\\chi \\approx 0.102\\sqrt{175} \\approx 0.102 \\times 13.23 \\approx 1.35$.',
        '(Textbooks quote slightly different prefactors; this is the working formula.)',
      ],
    },
    {
      prompt: 'Lithium has $\\chi = 0.98$ and fluorine has $\\chi = 3.98$. Estimate the percent ionic character of the LiF bond.',
      answer: '~89% (using the empirical formula $\\%\\text{ionic} = 100[1 - e^{-(\\Delta\\chi)^2/4}]$)',
      steps: [
        '$\\Delta\\chi = 3.00$, $(\\Delta\\chi)^2 = 9.0$.',
        'Percent ionic $= 100(1 - e^{-9/4}) = 100(1 - e^{-2.25}) = 100(1 - 0.105) \\approx 89\\%$.',
        'So LiF is about 89% ionic - very close to the "pure ionic" limit.',
      ],
    },
    {
      prompt: 'Explain why diamond is an electrical insulator while its chemical cousin graphite is a conductor.',
      answer: 'Diamond has all carbons $sp^3$ with localized bonds; graphite has $sp^2$ carbons with delocalized $\\pi$ electrons.',
      steps: [
        'In diamond, every C-C bond is a pure $\\sigma$ with a large band gap ($\\approx 5.5$ eV) keeping electrons stuck.',
        'In graphite, each layer has three $sp^2$ bonds plus a delocalized $\\pi$ system spread over the whole sheet.',
        'The in-plane $\\pi$ band has no gap, so graphite conducts like a 2D metal (poorly but measurably).',
      ],
    },
    {
      prompt: 'Bond enthalpy of a single C-C bond is 348 kJ/mol; a C=C is 614; C$\\equiv$C is 839. Why is the triple bond not just 3 $\\times$ 348 kJ/mol?',
      answer: 'Because $\\pi$ overlap is weaker than $\\sigma$ overlap, so each successive $\\pi$ bond contributes less than the first (sigma) bond.',
      steps: [
        'Single bond = 1$\\sigma$ (strong, head-on overlap).',
        'Double bond adds a $\\pi$; extra energy $\\approx 614 - 348 = 266$ kJ/mol.',
        'Triple bond adds a second $\\pi$; extra energy $\\approx 839 - 614 = 225$ kJ/mol.',
        'Each $\\pi$ is about 2/3 the strength of the initial $\\sigma$ in this series.',
      ],
    },
    {
      prompt: 'Bond length of HF is 91.7 pm and its dipole moment is 1.82 D. What fraction of an electron is transferred from H to F?',
      answer: '$q \\approx 0.414\\,e$',
      steps: [
        '$\\mu_{SI} = 1.82 \\times 3.336\\times 10^{-30} \\approx 6.07\\times 10^{-30}$ C$\\cdot$m.',
        '$q = \\mu / r = 6.07\\times 10^{-30}/9.17\\times 10^{-11} \\approx 6.62\\times 10^{-20}$ C.',
        '$q/e \\approx 6.62\\times 10^{-20} / 1.602\\times 10^{-19} \\approx 0.414$.',
      ],
    },
    {
      prompt: 'Compare the lattice energies of NaF and NaCl. Which is larger and why?',
      answer: 'NaF > NaCl. Smaller F$^-$ gives a shorter Na-F distance and a larger Coulomb attraction.',
      steps: [
        'Lattice energy scales as $q_1 q_2 / r$.',
        'Charges are the same (+1, -1), so the shorter interionic distance in NaF wins.',
        'Measured lattice energies: NaF 923 kJ/mol, NaCl 787 kJ/mol.',
      ],
    },
    {
      prompt: 'Would you expect MgO or NaF to have a higher lattice energy?',
      answer: 'MgO',
      steps: [
        'Lattice energy scales as the product of charges: $q_1 q_2$.',
        'NaF: (1)(1) = 1; MgO: (2)(2) = 4.',
        'Even though MgO\'s interionic distance is similar to NaF\'s, the 4$\\times$ charge product dominates.',
        'Measured: MgO 3795 kJ/mol vs NaF 923 kJ/mol.',
      ],
    },
    {
      prompt: 'Give the bond orders of $\\text{O}_2$, $\\text{O}_2^+$, and $\\text{O}_2^-$.',
      answer: '2, 2.5, 1.5',
      steps: [
        'MO picture: fill through $\\pi^*_{2p}$ level.',
        '$\\text{O}_2$: bond order 2 (8 bonding, 4 antibonding).',
        'Remove an electron from antibonding $\\pi^*$ $\\to$ $\\text{O}_2^+$ has bond order 2.5 (stronger, shorter bond!).',
        'Add an electron to antibonding $\\pi^*$ $\\to$ $\\text{O}_2^-$ has bond order 1.5.',
      ],
    },
    {
      prompt: 'Predict which is the strongest bond: $\\text{N}_2$, $\\text{O}_2$, or $\\text{F}_2$.',
      answer: '$\\text{N}_2$',
      steps: [
        '$\\text{N}_2$: triple bond, 945 kJ/mol.',
        '$\\text{O}_2$: double bond, 498 kJ/mol.',
        '$\\text{F}_2$: single bond, 159 kJ/mol (further weakened by lone-pair repulsion on adjacent Fs).',
        'Triple > double > single by bond order.',
      ],
    },
    {
      prompt: 'Explain why the C-Cl bond energy (328 kJ/mol) is lower than the C-F bond energy (485 kJ/mol).',
      answer: 'F is smaller than Cl, so C-F overlap is better, and the bond is stronger.',
      steps: [
        'Bond strength depends on the quality of orbital overlap between atoms of similar size.',
        'F\'s $2p$ orbital is closer in size to C\'s $2p$ than Cl\'s larger $3p$ orbital.',
        'Better overlap = stronger bond. Same reason O=O is stronger than S=S, and why first-row elements make unusually strong multiple bonds.',
      ],
    },
  ];

  var STATIC_TYPES_CHALLENGE = [
    {
      prompt: 'Using the simple Coulomb formula, compute the electrostatic energy (in eV) of a Na$^+$ Cl$^-$ ion pair at $r = 236$ pm. Compare to the measured bond dissociation energy 408 kJ/mol.',
      answer: '$U \\approx -6.10$ eV $= -589$ kJ/mol; measured 408 kJ/mol; difference is Born repulsion and residual covalent character.',
      steps: [
        '$U = -\\frac{e^2}{4\\pi\\epsilon_0 r}$ with $e = 1.602\\times 10^{-19}$ C, $r = 2.36\\times 10^{-10}$ m.',
        '$U = -\\frac{(1.602\\times 10^{-19})^2}{4\\pi(8.854\\times 10^{-12})(2.36\\times 10^{-10})}$.',
        '$= -9.77\\times 10^{-19}$ J $= -6.10$ eV $= -589$ kJ/mol.',
        'Measured: 408 kJ/mol. The 180 kJ/mol shortfall accounts for Born repulsion and the zero-point separation from the classical minimum.',
      ],
      hint: '$ke^2/r$ in convenient units: $ke^2 \\approx 1.44$ eV$\\cdot$nm.',
    },
    {
      prompt: 'Derive the MO bond order of diamagnetic $\\text{B}_2$ (which turns out to have 2 unpaired electrons - paramagnetic). What does this tell you about the MO ordering in $\\text{B}_2$?',
      answer: '$\\text{B}_2$ has bond order 1 and is paramagnetic; the $\\pi_{2p}$ orbitals lie below $\\sigma_{2p}$.',
      steps: [
        'Total electrons: 10. Fill $\\sigma_{1s}^2\\sigma^*_{1s}^2\\sigma_{2s}^2\\sigma^*_{2s}^2$ = 8.',
        'Remaining 2 must go into $\\pi_{2p}$ or $\\sigma_{2p}$ depending on ordering.',
        'Experimentally $\\text{B}_2$ is paramagnetic - so the two electrons are in the pair of degenerate $\\pi_{2p}$ orbitals (Hund), singly each.',
        'This means $\\pi_{2p} < \\sigma_{2p}$ in $\\text{B}_2$ - a small-$Z$ peculiarity caused by $s$-$p$ mixing.',
        'Bond order: (2 bonding in $\\pi$)/2 = 1.',
      ],
    },
    {
      prompt: 'Why are first-row diatomics ($\\text{N}_2$, $\\text{O}_2$, $\\text{F}_2$) dramatically stronger than their second-row cousins ($\\text{P}_2$, $\\text{S}_2$, Cl$_2$ analogs)?',
      answer: 'First-row elements form excellent $\\pi$ bonds because their $2p$ orbitals overlap sideways at short distances; $3p$ and higher are too diffuse.',
      steps: [
        '$\\text{N}_2$ (945 kJ/mol) is MUCH stronger than $\\text{P}_2$ (~485 kJ/mol) even though both are triple-bonded.',
        'The $2p$ orbitals of N are compact; at the short N-N distance, sideways overlap ($\\pi$) is efficient.',
        '$3p$ orbitals of P are larger and more diffuse; at the longer P-P distance, $\\pi$ overlap is poor.',
        'This is why nitrogen chemistry has $\\text{N}_2$ as the stable form but phosphorus chemistry uses P$_4$ (four single-bonded P atoms in a tetrahedron).',
      ],
    },
    {
      prompt: 'A certain AB bond has dipole moment 1.5 D, bond length 150 pm. Compute the partial charges and the electrostatic energy of a rigid dipole interaction with a nearby identical dipole 400 pm away (axial orientation, head to tail).',
      answer: '$q \\approx 0.21\\,e$; $U_{dd} \\approx -0.43$ eV $\\approx -41$ kJ/mol',
      steps: [
        '$q = \\mu/r = 1.5 \\times 3.336\\times 10^{-30}/1.5\\times 10^{-10} = 3.34\\times 10^{-20}$ C $\\approx 0.21\\,e$.',
        'Axial dipole-dipole: $U = -\\frac{2\\mu_1\\mu_2}{4\\pi\\epsilon_0 r^3}$.',
        'Plug in numbers: $U = -2(1.5\\,D)^2/(4\\pi\\epsilon_0(400\\,pm)^3)$ with D in SI.',
        'Working out: $\\approx -6.9\\times 10^{-20}$ J $\\approx -0.43$ eV $\\approx -41$ kJ/mol.',
        '(Comparable to a hydrogen bond, which is essentially this calculation for H$\\cdots$O.)',
      ],
    },
    {
      prompt: 'Explain why $\\text{He}_2$ does not exist as a stable molecule, while $\\text{He}_2^+$ does.',
      answer: 'He$_2$ has zero net bond order; He$_2^+$ has bond order 0.5, enough for a loosely bound diatomic.',
      steps: [
        '$\\text{He}_2$ MO: $\\sigma_{1s}^2\\sigma^*_{1s}^2$. Bond order $= (2-2)/2 = 0$.',
        'Fills bonding and antibonding equally, so there is no net stabilization.',
        '$\\text{He}_2^+$: one electron removed from antibonding, leaving $\\sigma_{1s}^2\\sigma^*_{1s}^1$.',
        'Bond order $= (2-1)/2 = 0.5$. Weak but real; observed in mass spectrometers and gas-discharge tubes.',
      ],
    },
  ];

  PS.registerTopic("chem-bond-types", {
    title: "Bond types and character",
    description: "Ionic vs covalent vs metallic, electronegativity, and bond strength.",
    warmup:   STATIC_TYPES_WARMUP,
    standard: STATIC_TYPES_STANDARD,
    challenge: STATIC_TYPES_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-bond-lewis - Lewis structures and formal charges
  // ==========================================================================
  var STATIC_LEWIS_WARMUP = [
    {
      prompt: 'How many valence electrons does one nitrogen atom contribute to a Lewis structure?',
      answer: '$5$',
      steps: [
        'N is in group 15.',
        'Main-group group number = valence electron count for neutral atoms.',
      ],
    },
    {
      prompt: 'Total valence electrons in $\\text{H}_2\\text{O}$?',
      answer: '$8$',
      steps: [
        'H contributes 1 each ($\\times 2$), O contributes 6.',
        'Total: $2 + 6 = 8$ valence electrons.',
      ],
    },
    {
      prompt: 'Total valence electrons in the nitrate ion $\\text{NO}_3^-$?',
      answer: '$24$',
      steps: [
        'N: 5; each O: 6; three Os give 18.',
        'Add one for the extra negative charge.',
        '$5 + 18 + 1 = 24$ valence electrons.',
      ],
    },
    {
      prompt: 'How many lone pairs are on each terminal oxygen in $\\text{CO}_2$?',
      answer: '$2$ lone pairs per O',
      steps: [
        'Each terminal O is double-bonded to C (shares 4 electrons).',
        'Remaining: $6 - 4 = 4$ electrons $= 2$ lone pairs.',
      ],
    },
    {
      prompt: 'Formal charge on the central N in $\\text{NH}_4^+$? ($V = 5$, $L = 0$, $B = 8$).',
      answer: '$+1$',
      steps: [
        '$\\text{FC} = V - L - B/2 = 5 - 0 - 4 = +1$.',
        'The $+1$ on N is why the ion has an overall $+1$ charge (the four H atoms are all FC = 0).',
      ],
    },
    {
      prompt: 'Write the octet rule in plain words.',
      answer: 'Most main-group atoms are most stable when surrounded by 8 valence electrons (hydrogen by 2).',
      steps: [
        'Atoms share or transfer electrons to reach filled $ns^2np^6$ configurations.',
        'This mimics the electron configuration of the nearest noble gas.',
      ],
    },
    {
      prompt: 'Which atom is the central atom in $\\text{NH}_3$?',
      answer: 'N',
      steps: [
        'Hydrogen only forms one bond, so it is always terminal.',
        'Nitrogen is the only non-H atom; it must be central.',
      ],
    },
    {
      prompt: 'Draw the Lewis structure of $\\text{N}_2$. How many lone pairs and bonds?',
      answer: 'Triple bond between the two Ns, plus one lone pair on each N.',
      steps: [
        '$\\text{N}_2$ has $2\\times 5 = 10$ valence electrons.',
        'A triple bond uses 6, leaving 4 electrons as 2 lone pairs (one per N).',
        'Each N has a full octet (6 shared + 2 lone = 8).',
      ],
    },
    {
      prompt: 'Formal charge on oxygen in $\\text{H}_2\\text{O}$ ($V=6$, $L=4$, $B=4$).',
      answer: '$0$',
      steps: [
        '$\\text{FC} = 6 - 4 - 4/2 = 6 - 4 - 2 = 0$.',
        'The standard H-O-H structure has all three atoms at FC $= 0$ - this is why it is the accepted structure.',
      ],
    },
    {
      prompt: 'Which element commonly violates the octet rule by having fewer than 8 electrons in stable compounds?',
      answer: 'Boron (e.g. in $\\text{BF}_3$)',
      steps: [
        '$\\text{BF}_3$ has only 6 electrons around B (three single bonds, no lone pairs).',
        'This "incomplete octet" is why $\\text{BF}_3$ is a Lewis acid - it readily accepts an electron pair to reach 8.',
      ],
    },
    {
      prompt: 'Which Lewis structure of $\\text{CO}_2$ is correct: O=C=O or O-C$\\equiv$O?',
      answer: 'O=C=O',
      steps: [
        'O=C=O has all atoms at FC = 0.',
        'O-C$\\equiv$O has one O at $-1$ and one at $+1$.',
        'Rule of thumb: the structure with formal charges closest to 0 is preferred.',
      ],
    },
    {
      prompt: 'Total valence electrons in the sulfate ion $\\text{SO}_4^{2-}$?',
      answer: '$32$',
      steps: [
        'S: 6, each O: 6 ($\\times 4 = 24$), plus 2 for the $-2$ charge.',
        '$6 + 24 + 2 = 32$.',
      ],
    },
    {
      prompt: 'Name the phenomenon where multiple valid Lewis structures exist for a single molecule.',
      answer: 'Resonance',
      steps: [
        'The true structure is a linear combination (hybrid) of the contributing forms.',
        'Each individual Lewis form is a contributor; the real molecule has properties averaged from them.',
        'Classic example: the 3 equivalent Lewis structures of $\\text{NO}_3^-$.',
      ],
    },
    {
      prompt: 'In resonance forms, what stays the same and what can change?',
      answer: 'The atom positions stay fixed; only the electron placements move.',
      steps: [
        'Resonance does not involve moving nuclei - only electrons in $\\pi$ bonds or lone pairs shift.',
        'If atoms rearrange, you have a different molecule (an isomer), not a resonance form.',
      ],
    },
    {
      prompt: 'Why do we draw double-headed arrows between resonance structures?',
      answer: 'To show the true molecule is a weighted average of all the forms, not switching between them.',
      steps: [
        'The arrow (↔) is different from the equilibrium arrow (⇌).',
        'The molecule never actually looks like any single resonance form; it is a quantum superposition.',
      ],
    },
  ];

  var STATIC_LEWIS_STANDARD = [
    {
      prompt: 'Draw the Lewis structure of the cyanide ion $\\text{CN}^-$. Give formal charges.',
      answer: 'C$\\equiv$N with one lone pair on each; FC(C) $= -1$, FC(N) $= 0$.',
      steps: [
        'Total electrons: $4 + 5 + 1 = 10$.',
        'Triple bond (6 e$^-$) leaves 4 for lone pairs, 1 pair per atom.',
        'FC(C) $= 4 - 2 - 6/2 = -1$.',
        'FC(N) $= 5 - 2 - 6/2 = 0$.',
        'The $-1$ sits on carbon, which is why CN$^-$ bonds via C (not N) in transition-metal complexes.',
      ],
    },
    {
      prompt: 'Give the Lewis structure of $\\text{HCN}$. Is it linear?',
      answer: 'H-C$\\equiv$N; yes, linear (2 domains on C).',
      steps: [
        'Total electrons: $1 + 4 + 5 = 10$.',
        'H-C single (2 e$^-$) + C$\\equiv$N triple (6 e$^-$) = 8 used.',
        'Place lone pair on N (2 e$^-$).',
        'C has 2 electron domains (H and triple bond) $\\to$ linear.',
      ],
    },
    {
      prompt: 'How many resonance structures does the carbonate ion $\\text{CO}_3^{2-}$ have?',
      answer: '$3$ equivalent resonance structures',
      steps: [
        '$\\text{CO}_3^{2-}$ has 24 valence electrons.',
        'C is central, with single bonds to 2 Os and a double bond to 1 O.',
        'The double bond can be to any of the 3 Os, giving 3 equivalent resonance forms.',
        'The true C-O bond length ($\\approx 129$ pm) is intermediate between single (143) and double (120) pm.',
      ],
    },
    {
      prompt: 'Compute formal charges for all atoms in $\\text{SO}_4^{2-}$ (standard structure with 2 double bonds and 2 single bonds, all from S to O).',
      answer: 'FC(S) $= 0$; FC of single-bonded O $= -1$; FC of double-bonded O $= 0$.',
      steps: [
        'S: $V = 6$, $L = 0$, $B = 12$ (two doubles + two singles shared e$^-$). FC $= 6 - 0 - 6 = 0$.',
        'Double-bonded O: $V = 6$, $L = 4$, $B = 4$. FC $= 0$.',
        'Single-bonded O: $V = 6$, $L = 6$, $B = 2$. FC $= -1$.',
        'Sum: $0 + 2(0) + 2(-1) = -2$, matching the ion charge.',
      ],
    },
    {
      prompt: 'Sketch the Lewis structure of ozone $\\text{O}_3$. Show formal charges.',
      answer: 'Central O has 1 double bond to one terminal O and 1 single bond to the other; FC on central O $= +1$, FC on single-bonded O $= -1$, double-bonded O FC $= 0$.',
      steps: [
        '$\\text{O}_3$ has 18 valence electrons.',
        'Central O: $V = 6$, $L = 2$, $B = 6 \\to$ FC $= 6 - 2 - 3 = +1$.',
        'Double-bonded terminal O: $V = 6$, $L = 4$, $B = 4 \\to$ FC $= 0$.',
        'Single-bonded terminal O: $V = 6$, $L = 6$, $B = 2 \\to$ FC $= -1$.',
        'The molecule has two such structures as resonance forms, making both O-O bonds equal.',
      ],
    },
    {
      prompt: 'Explain why the nitrate ion $\\text{NO}_3^-$ has all three N-O bonds equal in length, not two single and one double.',
      answer: 'Resonance: three equivalent Lewis structures make the real N-O bond order 4/3, and all 3 bonds are equivalent.',
      steps: [
        'Draw the Lewis structure: 1 double bond and 2 single bonds to O.',
        'The double can be to any of the 3 Os $\\to$ 3 equivalent resonance forms.',
        'The true wavefunction averages them, giving bond order 4/3 in each of the three bonds.',
        'Measured N-O bond length $\\approx 125$ pm - intermediate between single (140) and double (115).',
      ],
    },
    {
      prompt: 'Which molecule has the most number of lone pairs on the central atom: $\\text{PCl}_3$, $\\text{SF}_4$, or $\\text{XeF}_2$?',
      answer: '$\\text{XeF}_2$ (3 lone pairs)',
      steps: [
        '$\\text{PCl}_3$: P has 5 valence, 3 used for bonds to Cl $\\to$ 1 lone pair.',
        '$\\text{SF}_4$: S has 6 valence, 4 used for bonds to F $\\to$ 1 lone pair.',
        '$\\text{XeF}_2$: Xe has 8 valence, 2 used for bonds to F $\\to$ 3 lone pairs.',
      ],
    },
    {
      prompt: 'Predict which atom is central in $\\text{NOCl}$: N, O, or Cl.',
      answer: 'N',
      steps: [
        'N has the lowest electronegativity of the three (3.04 vs O 3.44 and Cl 3.16).',
        'Least electronegative atom is usually central in small Lewis structures.',
        'Structure: Cl-N=O with a lone pair on N.',
      ],
    },
    {
      prompt: 'Why does $\\text{SF}_6$ apparently violate the octet rule?',
      answer: 'S has 12 electrons around it. Traditionally attributed to $d$-orbital participation, but modern MO theory explains it via multicenter bonding with no $d$ orbitals needed.',
      steps: [
        'In $\\text{SF}_6$, sulfur makes 6 bonds to 6 fluorines - 12 valence electrons on S.',
        'Classical view: $sp^3d^2$ hybridization invokes $3d$ orbitals.',
        'Modern view: the bonds are delocalized 3-center-4-electron bonds on each F-S-F axis, using only s and p.',
        'Either way, $\\text{SF}_6$ is very stable and common - the "octet rule" is really only strict for row 2 elements.',
      ],
    },
    {
      prompt: 'For the ion $\\text{ClO}_4^-$, what is the formal charge on Cl in the structure with 4 single bonds to O?',
      answer: '$+3$',
      steps: [
        'Cl: $V = 7$, $L = 0$, $B = 8$. FC $= 7 - 0 - 4 = +3$.',
        'This large $+3$ on Cl suggests the structure is not ideal.',
        'The "better" structure (with 3 double bonds, 1 single) gives Cl FC = 0 but requires 14 electrons around Cl.',
        'The real structure is a blend; the single-bonded form still contributes.',
      ],
    },
    {
      prompt: 'Draw two resonance forms of sulfur dioxide ($\\text{SO}_2$).',
      answer: 'O=S-O (left double) and O-S=O (right double), each with a lone pair on S.',
      steps: [
        '$\\text{SO}_2$ has $6 + 2(6) = 18$ valence electrons.',
        'Central S has 1 double, 1 single, 1 lone pair.',
        'The double bond can be on either O $\\to$ two equivalent resonance forms.',
        'True S-O bond order: 1.5, bond length $\\approx 143$ pm.',
      ],
    },
  ];

  var STATIC_LEWIS_CHALLENGE = [
    {
      prompt: 'Propose the best Lewis structure for the azide ion $\\text{N}_3^-$ and compute formal charges.',
      answer: 'Symmetric structure [N=N=N]$^-$ with central N FC $= +1$ and terminal N FC $= -1$ each. Linear.',
      steps: [
        'Total electrons: $3(5) + 1 = 16$.',
        'Symmetric N=N=N leaves 2 lone pairs on each terminal N.',
        'Central N: $V=5, L=0, B=8 \\to$ FC $= +1$.',
        'Terminal N: $V=5, L=4, B=4 \\to$ FC $= -1$ each.',
        'Sum: $+1 + 2(-1) = -1$. Correct total charge.',
        'Asymmetric form N$\\equiv$N-N:$^{2-}$ also contributes to resonance but places $-2$ on one atom, less favorable.',
      ],
    },
    {
      prompt: 'Explain why $\\text{CO}$ (carbon monoxide) is best drawn with a triple bond despite the atoms having different electronegativities.',
      answer: 'A triple bond with formal charges -1 on C and +1 on O gives everyone an octet and minimizes energy despite the counterintuitive charge placement.',
      steps: [
        'Total valence electrons: $4 + 6 = 10$.',
        'Triple bond (6 e$^-$) plus one lone pair on C (2 e$^-$) plus one lone pair on O (2 e$^-$) uses all 10 and gives both atoms an octet.',
        'FC(C) $= 4 - 2 - 6/2 = -1$. FC(O) $= 6 - 2 - 6/2 = +1$.',
        'Despite the formal charge placement being backward to electronegativity, the triple bond and full octets win.',
        'The dipole moment is only 0.11 D - tiny - because the formal charge separation nearly cancels the underlying electronegativity difference. A quirky, well-known result.',
      ],
    },
    {
      prompt: 'For $\\text{XeF}_4$, propose the Lewis structure and predict the shape.',
      answer: 'Square planar, with 2 lone pairs on Xe.',
      steps: [
        'Total electrons: $8 + 4(7) = 36$.',
        'Four Xe-F single bonds (8 e$^-$) + 3 lone pairs on each F (24 e$^-$) = 32.',
        'Remaining $36 - 32 = 4$ electrons go as 2 lone pairs on Xe.',
        'Six electron domains on Xe $\\to$ octahedral geometry.',
        'Two lone pairs sit trans to each other to minimize repulsion $\\to$ square-planar molecular shape.',
      ],
    },
    {
      prompt: 'Explain, using Lewis structures, why the nitrate ion $\\text{NO}_3^-$ is isoelectronic with the carbonate ion $\\text{CO}_3^{2-}$ and both have identical shapes.',
      answer: 'Both have 24 valence electrons, 3 equivalent O atoms, and trigonal planar geometry with delocalized $\\pi$ bonds.',
      steps: [
        '$\\text{NO}_3^-$: $5 + 18 + 1 = 24$ valence electrons.',
        '$\\text{CO}_3^{2-}$: $4 + 18 + 2 = 24$ valence electrons.',
        'Same electron count + same skeleton $\\Rightarrow$ same geometry: trigonal planar with 3 equivalent X-O bonds of order 4/3.',
        'This "isoelectronic" trick predicts many structural similarities across the periodic table.',
      ],
    },
    {
      prompt: 'Draw the Lewis structure of the peroxide ion $\\text{O}_2^{2-}$ and compute the bond order.',
      answer: 'O-O single bond, 3 lone pairs on each O; bond order 1.',
      steps: [
        'Total electrons: $2(6) + 2 = 14$.',
        'Single bond (2 e$^-$) + 6 lone pairs (12 e$^-$) = 14.',
        'FC on each O: $6 - 6 - 1 = -1$, summing to $-2$. Correct.',
        'Bond order 1 - much weaker than $\\text{O}_2$ (BO 2) and explains why peroxides are relatively weak (~146 kJ/mol O-O bond).',
      ],
    },
  ];

  PS.registerTopic("chem-bond-lewis", {
    title: "Lewis structures and formal charges",
    description: "Drawing Lewis diagrams, resonance, and picking the best form.",
    warmup:   STATIC_LEWIS_WARMUP,
    standard: STATIC_LEWIS_STANDARD,
    challenge: STATIC_LEWIS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-bond-geometry - VSEPR and hybridization
  // ==========================================================================
  var STATIC_GEOM_WARMUP = [
    {
      prompt: 'What shape does VSEPR predict for $\\text{CH}_4$?',
      answer: 'Tetrahedral, 109.5°',
      steps: [
        '4 bonds, 0 lone pairs on C = 4 electron domains.',
        'Four domains arrange tetrahedrally.',
      ],
    },
    {
      prompt: 'What shape does VSEPR predict for $\\text{H}_2\\text{O}$?',
      answer: 'Bent, ~104.5°',
      steps: [
        '2 bonds and 2 lone pairs on O = 4 electron domains (tetrahedral parent).',
        'Removing the lone pairs from the picture leaves a bent molecular shape.',
      ],
    },
    {
      prompt: 'What hybridization does the central atom in $\\text{CO}_2$ have?',
      answer: '$sp$',
      steps: [
        '2 electron domains on C (two double bonds).',
        '2 domains $\\to$ $sp$ hybridization, linear shape.',
      ],
    },
    {
      prompt: 'Predict the geometry of $\\text{NH}_3$.',
      answer: 'Trigonal pyramidal, ~107°',
      steps: [
        '3 bonds + 1 lone pair = 4 electron domains.',
        'Lone pair occupies one tetrahedral position, giving a pyramidal molecular shape.',
      ],
    },
    {
      prompt: 'How many $\\sigma$ and $\\pi$ bonds in $\\text{N}_2$?',
      answer: '1 $\\sigma$ and 2 $\\pi$ (triple bond)',
      steps: [
        'A triple bond always consists of one $\\sigma$ plus two $\\pi$.',
      ],
    },
    {
      prompt: 'What is the hybridization of each C in ethene ($\\text{C}_2\\text{H}_4$)?',
      answer: '$sp^2$',
      steps: [
        'Each C has 3 bonds (2 C-H + 1 C=C), no lone pairs $\\to$ 3 electron domains.',
        '3 domains = $sp^2$.',
        'Leftover $p$ orbital on each C forms the $\\pi$ bond of the C=C.',
      ],
    },
    {
      prompt: 'What is the hybridization of C in acetylene ($\\text{HC}\\equiv\\text{CH}$)?',
      answer: '$sp$',
      steps: [
        'Each C has 2 bonds (1 C-H + 1 triple) = 2 electron domains.',
        '2 domains = $sp$ hybridization, linear.',
        '2 leftover $p$ orbitals give the 2 $\\pi$ bonds.',
      ],
    },
    {
      prompt: 'How many electron domains does the central S atom in $\\text{SF}_6$ have?',
      answer: '$6$',
      steps: [
        '6 S-F bonds + 0 lone pairs = 6 electron domains.',
        'Shape: octahedral.',
      ],
    },
    {
      prompt: 'Is $\\text{CCl}_4$ polar or nonpolar?',
      answer: 'Nonpolar',
      steps: [
        'Each C-Cl bond is polar ($\\chi$ Cl $= 3.16 > $ C $= 2.55$).',
        'Tetrahedral symmetry cancels the four bond dipoles exactly.',
        'Net $\\mu = 0$.',
      ],
    },
    {
      prompt: 'Why does $\\text{H}_2\\text{O}$ have a bond angle of 104.5° instead of the ideal tetrahedral 109.5°?',
      answer: 'Lone pairs on oxygen repel the O-H bonds more strongly than bond pairs do, compressing the H-O-H angle.',
      steps: [
        'Lone pairs are held by only one nucleus (O) and spread out wider.',
        'Stronger lone-pair/bond-pair repulsion pushes the O-H bonds closer together.',
      ],
    },
    {
      prompt: 'Predict the shape of $\\text{BeCl}_2$ (in the gas phase).',
      answer: 'Linear',
      steps: [
        'Be has 2 valence electrons, both used for 2 single bonds; no lone pairs.',
        '2 domains = linear.',
        'Be is an octet-incomplete atom here (4 e$^-$ around Be), but still works.',
      ],
    },
    {
      prompt: 'What is the geometry of the $\\text{H}_3\\text{O}^+$ (hydronium) ion?',
      answer: 'Trigonal pyramidal',
      steps: [
        'Like $\\text{NH}_3$: 3 bonds + 1 lone pair = 4 domains.',
        'Tetrahedral electron geometry, pyramidal molecular shape.',
      ],
    },
    {
      prompt: 'Predict the bond angle in $\\text{NH}_3$.',
      answer: '~107°',
      steps: [
        '4 domains would give 109.5° tetrahedral.',
        '1 lone pair compresses the H-N-H angles slightly below tetrahedral, so ~107°.',
      ],
    },
    {
      prompt: 'How many $\\sigma$ and $\\pi$ bonds in $\\text{HCN}$?',
      answer: '2 $\\sigma$ and 2 $\\pi$',
      steps: [
        'H-C single bond: 1 $\\sigma$.',
        'C$\\equiv$N triple bond: 1 $\\sigma$ + 2 $\\pi$.',
        'Total: 2 $\\sigma$ + 2 $\\pi$.',
      ],
    },
    {
      prompt: 'Linear, trigonal planar, tetrahedral: which corresponds to $sp^3$ hybridization?',
      answer: 'Tetrahedral',
      steps: [
        '$sp^3$ mixes 4 atomic orbitals (one $s$, three $p$) into 4 equivalent hybrids.',
        '4 hybrids point at tetrahedral corners.',
      ],
    },
  ];

  var STATIC_GEOM_STANDARD = [
    {
      prompt: 'Predict the shape of $\\text{SF}_4$.',
      answer: 'See-saw (disphenoidal)',
      steps: [
        'S has 4 bonds + 1 lone pair = 5 electron domains.',
        'Trigonal bipyramidal electron geometry.',
        'Lone pair occupies the equatorial position (less repulsion).',
        'The remaining 4 atoms form a "see-saw" shape.',
      ],
    },
    {
      prompt: 'Predict the shape of $\\text{XeF}_2$.',
      answer: 'Linear',
      steps: [
        'Xe: 2 bonds + 3 lone pairs = 5 electron domains.',
        'Trigonal bipyramidal electron geometry.',
        'All 3 lone pairs in equatorial plane, 2 F atoms axial.',
        'Molecular shape is linear (F-Xe-F along the axial line).',
      ],
    },
    {
      prompt: 'Predict the shape of $\\text{BrF}_5$.',
      answer: 'Square pyramidal',
      steps: [
        'Br has 5 bonds + 1 lone pair = 6 electron domains.',
        'Octahedral electron geometry.',
        'Lone pair takes one position; remaining 5 F atoms form a square pyramid.',
      ],
    },
    {
      prompt: 'Give the hybridization of each C in benzene and explain how delocalization works.',
      answer: 'Each C is $sp^2$; the leftover $p$ orbitals form a $\\pi$ system delocalized around the ring.',
      steps: [
        'Each C has 3 bonds (2 C-C + 1 C-H), so 3 domains $\\to$ $sp^2$.',
        'Each C has 1 unhybridized $p$ orbital perpendicular to the ring.',
        'Six $p$ orbitals overlap sideways around the ring, forming a continuous $\\pi$ cloud of 6 delocalized electrons.',
        'This delocalization is why benzene is 150 kJ/mol more stable than "1,3,5-cyclohexatriene" would be - the resonance stabilization energy.',
      ],
    },
    {
      prompt: 'For the molecule $\\text{POCl}_3$: predict the geometry and the hybridization of P.',
      answer: 'Tetrahedral; $sp^3$',
      steps: [
        'P has 4 bonds (1 P=O + 3 P-Cl) + 0 lone pairs = 4 domains.',
        'Tetrahedral electron geometry and shape.',
        'P uses $sp^3$ hybrids for the $\\sigma$ framework, plus an unhybridized $p$ for the $\\pi$ in the P=O.',
      ],
    },
    {
      prompt: 'Which would have a larger dipole moment: $\\text{NF}_3$ or $\\text{NH}_3$?',
      answer: '$\\text{NH}_3$ (1.47 D) > $\\text{NF}_3$ (0.23 D)',
      steps: [
        'Both are pyramidal.',
        'In $\\text{NH}_3$, the N-H bond dipoles point toward N ($\\chi$ N $> $ H), and the lone pair dipole also points away from N, adding.',
        'In $\\text{NF}_3$, the N-F bond dipoles point toward F (away from N), partially cancelling the lone-pair dipole.',
        'So $\\text{NH}_3$ has the larger net dipole.',
      ],
    },
    {
      prompt: 'How many $\\sigma$ and $\\pi$ bonds are in $\\text{CH}_3\\text{CH}=\\text{CHCHO}$ (crotonaldehyde)?',
      answer: '9 $\\sigma$ and 2 $\\pi$',
      steps: [
        'Atoms: 4 C, 1 O, 6 H.',
        'C-C bonds: 3 (one of them is C=C contributing 1 $\\sigma$ + 1 $\\pi$).',
        'C-H bonds: 6 $\\sigma$.',
        'C=O bond: 1 $\\sigma$ + 1 $\\pi$.',
        'Total $\\sigma$: $3 + 6 = 9$; $\\pi$: 2.',
      ],
    },
    {
      prompt: 'Predict the geometry of $\\text{ICl}_4^-$.',
      answer: 'Square planar',
      steps: [
        'I has 4 bonds + 2 lone pairs = 6 electron domains.',
        'Octahedral electron geometry.',
        '2 lone pairs occupy trans positions to minimize repulsion.',
        'Remaining 4 Cl atoms form a square plane.',
      ],
    },
    {
      prompt: 'Why does formaldehyde ($\\text{H}_2\\text{CO}$) have an H-C-H angle less than 120°?',
      answer: 'The C=O double bond takes more space than the single C-H bonds, squeezing them together.',
      steps: [
        'C is $sp^2$, trigonal planar with ideal 120° angles.',
        'Double bonds repel other bond pairs more than single bonds do.',
        'The C=O "eats" part of the angular space, so the H-C-H angle compresses to ~116°.',
      ],
    },
    {
      prompt: 'What is the hybridization of the central O in $\\text{H}_2\\text{O}$?',
      answer: '$sp^3$',
      steps: [
        '4 electron domains on O (2 bonds + 2 lone pairs).',
        '4 domains $\\to$ $sp^3$.',
        'The 2 lone pairs live in 2 of the 4 $sp^3$ hybrid orbitals.',
      ],
    },
    {
      prompt: 'Predict the shape of $\\text{I}_3^-$ (triiodide).',
      answer: 'Linear',
      steps: [
        'Central I has 2 bonds + 3 lone pairs = 5 domains.',
        'Trigonal bipyramidal electron geometry.',
        'Lone pairs equatorial, iodines axial $\\to$ linear molecular shape.',
        'Same situation as $\\text{XeF}_2$.',
      ],
    },
  ];

  var STATIC_GEOM_CHALLENGE = [
    {
      prompt: 'Explain why $\\text{ClF}_3$ is T-shaped but $\\text{BF}_3$ is trigonal planar.',
      answer: '$\\text{BF}_3$: 3 domains, no lone pairs. $\\text{ClF}_3$: 5 domains, 2 lone pairs (trigonal bipyramidal electron geometry with equatorial lone pairs giving a T).',
      steps: [
        'B has 3 valence electrons, all used in bonds to F; no lone pairs $\\to$ 3 domains.',
        '3 domains $\\to$ trigonal planar.',
        'Cl has 7 valence electrons; 3 are used in bonds to F, leaving 2 lone pairs $\\to$ 5 domains.',
        '5 domains $\\to$ TBP electron geometry; 2 lone pairs prefer the equatorial positions to minimize 90° contacts.',
        'The 3 F atoms then sit in a T arrangement (two axial, one equatorial).',
      ],
    },
    {
      prompt: 'The H-N-H angle in $\\text{NH}_3$ is 107° but in $\\text{NF}_3$ is 102°. Explain.',
      answer: 'Fluorine pulls bonding electrons away from N more strongly, making the lone pair on N less "shared" and thus more dominant in repulsion.',
      steps: [
        'In $\\text{NH}_3$, electronegativity difference is small; the N-H electron density is fairly close to N.',
        'In $\\text{NF}_3$, F pulls the N-F electron density toward itself.',
        'With the N-F bonding electrons farther from the N-centered lone pair, the lone pair\'s repulsive "shadow" gets relatively larger, further compressing the H-N-H angle.',
        'Same geometry, but the bond-pair/lone-pair ratio of repulsive strengths shifts.',
      ],
    },
    {
      prompt: 'Using molecular orbital theory, predict whether $\\text{O}_2$ is diamagnetic or paramagnetic.',
      answer: 'Paramagnetic (two unpaired electrons in $\\pi_{2p}^*$ orbitals).',
      steps: [
        'Fill 12 valence electrons into MOs: $(\\sigma_{2s})^2(\\sigma^*_{2s})^2(\\sigma_{2p})^2(\\pi_{2p})^4(\\pi^*_{2p})^2$.',
        'The two $\\pi^*_{2p}$ electrons go into separate orbitals with parallel spins (Hund).',
        'Two unpaired electrons $\\to$ paramagnetic, exactly what liquid $\\text{O}_2$ shows when poured through a magnet.',
        'Pure Lewis theory cannot predict this - it needs MO theory to get right.',
      ],
    },
    {
      prompt: 'Why is rotation around a C=C double bond much harder than rotation around a C-C single bond?',
      answer: 'Rotation around C=C requires breaking the $\\pi$ bond (~270 kJ/mol); rotation around C-C only twists $\\sigma$ overlap (~12 kJ/mol).',
      steps: [
        'The $\\sigma$ component of a C-C bond is cylindrically symmetric - rotation costs only a small torsional barrier.',
        'The $\\pi$ component of a C=C requires $p$ orbitals to stay parallel; twisting by 90° makes them perpendicular, fully breaking the $\\pi$ overlap.',
        'Barriers: ethane ~12 kJ/mol, ethene ~270 kJ/mol.',
        'This is why cis/trans isomerism is a thing for alkenes but not alkanes.',
      ],
    },
    {
      prompt: 'Predict the bond order and spin state of $\\text{C}_2$ using MO theory.',
      answer: 'Bond order 2, diamagnetic (all electrons paired in $\\pi_{2p}$).',
      steps: [
        'Total valence electrons: 8.',
        'Due to $s$-$p$ mixing in small-$Z$ diatomics, $\\pi_{2p} < \\sigma_{2p}$ for $\\text{C}_2$.',
        'Fill order: $(\\sigma_{2s})^2(\\sigma^*_{2s})^2(\\pi_{2p})^4 = 8$ valence electrons.',
        'Bond order: $(6 - 2)/2 = 2$.',
        'All electrons paired $\\to$ diamagnetic.',
        'Weird result: $\\text{C}_2$ has a "double bond" that is two $\\pi$ bonds and no net $\\sigma$ - exotic!',
      ],
    },
  ];

  PS.registerTopic("chem-bond-geometry", {
    title: "VSEPR, hybridization, and sigma/pi",
    description: "Predicting shapes and identifying hybridizations.",
    warmup:   STATIC_GEOM_WARMUP,
    standard: STATIC_GEOM_STANDARD,
    challenge: STATIC_GEOM_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-bond-imf - Intermolecular forces
  // ==========================================================================
  var STATIC_IMF_WARMUP = [
    {
      prompt: 'Which is the strongest intermolecular force acting between $\\text{H}_2\\text{O}$ molecules?',
      answer: 'Hydrogen bonding',
      steps: [
        'Water has H bonded to highly electronegative O.',
        'Plus O lone pairs to accept H-bonds.',
        'Each water can donate 2 and accept 2 H-bonds.',
      ],
    },
    {
      prompt: 'Which has a higher boiling point: $\\text{CH}_4$ or $\\text{C}_5\\text{H}_{12}$ (pentane)?',
      answer: 'Pentane',
      steps: [
        'Bigger molecule, more electrons, more polarizable.',
        'Larger London dispersion forces.',
        'Boiling points: $\\text{CH}_4$ $-161$°C, pentane 36°C.',
      ],
    },
    {
      prompt: 'Why is $\\text{H}_2\\text{O}$ a liquid at 25°C but $\\text{H}_2\\text{S}$ a gas?',
      answer: 'Water has strong H-bonds (O-H); $\\text{H}_2\\text{S}$ has weak dipole-dipole only (S is not electronegative enough to H-bond).',
      steps: [
        'H-bonds are only formed with F, O, or N.',
        'S-H hydrogens lack the partial positive charge needed.',
        'Boiling points: $\\text{H}_2\\text{O}$ 100°C, $\\text{H}_2\\text{S}$ $-60$°C.',
      ],
    },
    {
      prompt: 'What is the dominant intermolecular force in liquid argon?',
      answer: 'London dispersion (van der Waals)',
      steps: [
        'Ar is a noble gas atom with no dipole and no H-bond donor/acceptor.',
        'Only transient induced dipoles remain.',
      ],
    },
    {
      prompt: 'Why does salt dissolve in water but not in gasoline?',
      answer: 'Water forms strong ion-dipole interactions with Na$^+$ and Cl$^-$; gasoline (nonpolar alkanes) cannot.',
      steps: [
        'Water molecules surround ions, stabilizing them via ion-dipole attraction.',
        'Nonpolar solvents offer only weak dispersion, not enough to beat the lattice energy.',
        '"Like dissolves like" - polar in polar, nonpolar in nonpolar.',
      ],
    },
    {
      prompt: 'Rank in order of increasing boiling point: Ne, Ar, Kr, Xe.',
      answer: 'Ne < Ar < Kr < Xe',
      steps: [
        'Heavier noble gases have larger polarizability and stronger London dispersion.',
        'Boiling points (K): Ne 27, Ar 87, Kr 120, Xe 165.',
      ],
    },
    {
      prompt: 'Why does ice float on water?',
      answer: 'Hydrogen bonding forces water molecules into an open hexagonal lattice in ice, which is less dense than liquid water.',
      steps: [
        'In ice, each water H-bonds to exactly 4 neighbors at tetrahedral angles.',
        'This forces an open structure with empty space.',
        'Liquid water lacks the rigid H-bond geometry and can pack tighter.',
        'Ice density $\\approx 0.92$ g/cm$^3$; liquid water 1.00 g/cm$^3$.',
      ],
    },
    {
      prompt: 'Is $\\text{CO}_2$ or $\\text{CO}$ more polar?',
      answer: '$\\text{CO}$ (though only slightly - 0.11 D).',
      steps: [
        '$\\text{CO}_2$ has two polar C=O bonds that cancel by symmetry (linear) $\\to$ net $\\mu = 0$.',
        '$\\text{CO}$ is a diatomic with no cancellation, so its small dipole moment is all that remains.',
      ],
    },
    {
      prompt: 'Which of these cannot form hydrogen bonds with water: $\\text{CH}_4$, $\\text{CH}_3\\text{OH}$, $\\text{NH}_3$?',
      answer: '$\\text{CH}_4$',
      steps: [
        '$\\text{CH}_4$ has no electronegative atoms attached to H, and no lone pairs on C.',
        '$\\text{CH}_3\\text{OH}$ has O-H (H-bond donor) and O lone pairs (acceptor).',
        '$\\text{NH}_3$ has N-H (donor) and N lone pair (acceptor).',
      ],
    },
    {
      prompt: 'Name the IMFs present in liquid ammonia.',
      answer: 'Hydrogen bonds + dispersion + dipole-dipole.',
      steps: [
        'N-H allows hydrogen bonding.',
        'All molecules have dispersion.',
        'Polar molecule also has dipole-dipole.',
      ],
    },
    {
      prompt: 'How does dispersion energy scale with intermolecular distance?',
      answer: '$U \\propto -1/r^6$',
      steps: [
        'London dispersion is a second-order interaction (induced dipole - induced dipole).',
        'The full derivation from quantum mechanics gives $1/r^6$.',
      ],
    },
    {
      prompt: 'List IMFs in order from strongest to weakest (typical energies).',
      answer: 'Ion-ion $\\gg$ ion-dipole > H-bond > dipole-dipole > dispersion',
      steps: [
        'Ion-ion: hundreds of kJ/mol (really a bond).',
        'Ion-dipole: 40-600 kJ/mol depending on charge and dipole.',
        'H-bond: 5-40 kJ/mol.',
        'Dipole-dipole: 5-25 kJ/mol.',
        'Dispersion: 0.05-40 kJ/mol (scales with size).',
      ],
    },
  ];

  var STATIC_IMF_STANDARD = [
    {
      prompt: 'Rank by boiling point (lowest to highest): $\\text{CH}_4$, $\\text{CH}_3\\text{OH}$, $\\text{CH}_3\\text{CH}_3$, $\\text{CH}_3\\text{F}$.',
      answer: '$\\text{CH}_4 < \\text{CH}_3\\text{CH}_3 < \\text{CH}_3\\text{F} < \\text{CH}_3\\text{OH}$',
      steps: [
        '$\\text{CH}_4$: dispersion only, small molecule $\\to$ lowest ($-161$°C).',
        '$\\text{CH}_3\\text{CH}_3$: dispersion only, slightly larger ($-89$°C).',
        '$\\text{CH}_3\\text{F}$: polar, dipole-dipole + dispersion ($-78$°C).',
        '$\\text{CH}_3\\text{OH}$: hydrogen bonding + dipole + dispersion (65°C).',
      ],
    },
    {
      prompt: 'Why does ethanol ($\\text{CH}_3\\text{CH}_2\\text{OH}$, bp 78°C) have a much higher boiling point than dimethyl ether ($\\text{CH}_3\\text{OCH}_3$, bp $-24$°C) despite having the same molecular formula?',
      answer: 'Ethanol can form hydrogen bonds (O-H); dimethyl ether cannot (no O-H or N-H or F-H).',
      steps: [
        'Both have the same molar mass, so dispersion contributions are similar.',
        'Ethanol has an O-H group, making it both an H-bond donor and acceptor.',
        'Dimethyl ether has O but no O-H; can only accept, not donate H-bonds.',
        'The ability to donate H-bonds gives ethanol a much more extensive IMF network.',
      ],
    },
    {
      prompt: 'The solubility of oxygen in water is very low. Explain why.',
      answer: '$\\text{O}_2$ is nonpolar and cannot H-bond to water; water prefers to H-bond to itself rather than dissolve something offering only dispersion.',
      steps: [
        'Dissolving anything in water breaks some water-water H-bonds (cost).',
        'The gain must come from new solute-solvent IMFs.',
        '$\\text{O}_2$ has only dispersion to offer; that is weaker than the H-bonds broken.',
        'Net energy cost is unfavorable $\\to$ low solubility. At 25°C, only ~8 mg/L.',
      ],
    },
    {
      prompt: 'Why does $n$-pentane have a higher boiling point than neopentane (2,2-dimethylpropane), even though they have the same molar mass?',
      answer: 'Linear $n$-pentane has more surface contact area per pair of molecules, enabling stronger dispersion; spherical neopentane has minimal contact area.',
      steps: [
        'Dispersion is proportional to the area of contact between molecules.',
        '$n$-pentane is a long worm that can snuggle up along its full length.',
        'Neopentane is a compact ball with minimal surface-surface contact in the liquid.',
        'Boiling points: $n$-pentane 36°C, neopentane 10°C.',
      ],
    },
    {
      prompt: 'In DNA, what IMFs hold the two strands of the double helix together?',
      answer: 'Hydrogen bonds between paired bases (A-T: 2 H-bonds, G-C: 3 H-bonds), plus $\\pi$-$\\pi$ stacking (dispersion) between adjacent base pairs.',
      steps: [
        'A-T forms 2 H-bonds; G-C forms 3 H-bonds.',
        'These specific geometries are why the genetic code copies faithfully.',
        'Stacking of the flat aromatic rings adds substantial dispersion energy.',
        'Actually, stacking contributes more to overall stability than H-bonding does in many contexts.',
      ],
    },
    {
      prompt: 'Order these alcohols by boiling point: methanol, ethanol, 1-butanol, 1-octanol.',
      answer: 'methanol < ethanol < 1-butanol < 1-octanol',
      steps: [
        'All four can H-bond through their single O-H.',
        'The dispersion contribution grows as the alkyl chain lengthens.',
        'Boiling points: methanol 65°C, ethanol 78°C, 1-butanol 118°C, 1-octanol 195°C.',
      ],
    },
    {
      prompt: 'Why do hydrogen bonds require a small, electronegative atom bonded to H?',
      answer: 'You need a large $\\delta^+$ on H (which requires high $\\chi$ partner) AND the H to get close to the acceptor (which requires H to be small and the partner small/compact).',
      steps: [
        'F, O, and N are the only atoms electronegative enough to produce a strong $\\delta^+$ on H.',
        'Larger atoms like S and Cl have too diffuse a lone pair and the H is farther from the nucleus to interact strongly.',
        'That is why C-H, S-H, P-H bonds do not form hydrogen bonds under normal conditions.',
      ],
    },
    {
      prompt: 'Proteins fold in water. How does the "hydrophobic effect" drive folding?',
      answer: 'Water reorganizes around nonpolar surfaces, losing entropy. Burying hydrophobic residues minimizes disruption of water structure - entropy-driven folding.',
      steps: [
        'Water molecules near a nonpolar surface form a more ordered, cage-like structure to maintain their H-bonds.',
        'That ordered shell has lower entropy than bulk water.',
        'Burying hydrophobic residues in the protein interior releases the ordered shell water, recovering entropy.',
        'The free energy savings are substantial (+T$\\Delta S$) and drive protein folding.',
      ],
    },
    {
      prompt: 'Explain why gecko feet stick to walls.',
      answer: 'Millions of microscopic setae make enough contact area that the total van der Waals (dispersion) force is sufficient to hold the gecko\'s weight.',
      steps: [
        'Each seta contacts the surface via hundreds of spatulae.',
        'Individual dispersion forces are tiny, but multiplied over a huge total contact area, they add up to a few Newtons per foot.',
        'No adhesive chemistry - pure van der Waals. Biomimetic tape tries to replicate this.',
      ],
    },
    {
      prompt: 'The boiling points of $\\text{HF}$, $\\text{HCl}$, $\\text{HBr}$, $\\text{HI}$ are 20°C, $-85$°C, $-67$°C, $-35$°C. Explain the trend.',
      answer: 'HF is anomalously high due to strong H-bonding; the others rise smoothly with dispersion as molecules get heavier.',
      steps: [
        'HF uniquely forms strong H-bonds (F is electronegative enough).',
        'HCl, HBr, HI cannot H-bond (Cl, Br, I are not electronegative enough relative to their size).',
        'Among HCl, HBr, HI, dispersion grows with molar mass and polarizability, raising the boiling points.',
        'HF breaks the pattern because its H-bonds add a big extra contribution.',
      ],
    },
    {
      prompt: 'Detergents have a polar head and a nonpolar tail. How does this structure let them dissolve oil in water?',
      answer: 'The polar head interacts with water; the nonpolar tails cluster around oil droplets, surrounding them and suspending them.',
      steps: [
        'The nonpolar tails of many detergent molecules arrange themselves around each oil droplet, pointing inward.',
        'The polar heads face outward into the water, stabilized by ion-dipole or H-bonds.',
        'The resulting "micelle" is effectively an oil droplet wrapped in a water-compatible shell.',
        'The mixture becomes a stable colloid, and you can rinse the oil away.',
      ],
    },
  ];

  var STATIC_IMF_CHALLENGE = [
    {
      prompt: 'Using the Keesom formula, estimate the thermally averaged dipole-dipole energy at 298 K between two $\\text{HCl}$ molecules separated by 400 pm. ($\\mu = 1.08$ D)',
      answer: '$U \\approx -0.8$ kJ/mol',
      steps: [
        'Keesom: $\\langle U\\rangle = -\\frac{2\\mu^4}{3(4\\pi\\epsilon_0)^2 k_B T r^6}$',
        'Plug in: $\\mu = 1.08$ D $= 3.6\\times 10^{-30}$ C$\\cdot$m; $r = 4\\times 10^{-10}$ m; $T = 298$ K.',
        '$\\mu^4 \\approx 1.68\\times 10^{-118}$ C$^4$m$^4$.',
        '$(4\\pi\\epsilon_0)^2 \\approx 1.24\\times 10^{-20}$ F$^2$/m$^2$.',
        '$k_B T \\approx 4.11\\times 10^{-21}$ J.',
        '$r^6 \\approx 4.1\\times 10^{-57}$ m$^6$.',
        'Plugging through: $\\langle U\\rangle \\approx -1.3\\times 10^{-21}$ J per pair $\\approx -0.8$ kJ/mol. Small, as expected for a dipole-dipole force.',
      ],
    },
    {
      prompt: 'The melting point of $\\text{KCl}$ is 770°C, while $\\text{NaCl}$ is 801°C. Given that the lattice energy of NaCl (787 kJ/mol) exceeds that of KCl (715 kJ/mol), explain why their melting points are so close.',
      answer: 'Melting requires overcoming only a fraction of the full lattice energy; entropy gain on melting is comparable for both; the $\\Delta H_{fusion}$ differences are small.',
      steps: [
        'Full dissociation energy is much larger than melting energy - melting only requires disrupting long-range order, not complete atomization.',
        'Enthalpy of fusion: NaCl 28 kJ/mol, KCl 26 kJ/mol - very similar.',
        'Both have similar crystal entropy, so $\\Delta G = 0$ occurs at similar temperatures.',
        'Lattice energy correlates with melting point but not linearly.',
      ],
    },
    {
      prompt: 'Water has a molar enthalpy of vaporization of 40.7 kJ/mol. If each water molecule has ~3.4 H-bonds on average, estimate the strength of one H-bond.',
      answer: '$\\sim 24$ kJ/mol per H-bond',
      steps: [
        'Vaporizing water breaks all its H-bonds and leaves isolated molecules in the gas phase.',
        'Each H-bond is shared between 2 molecules, so the number of H-bonds broken per molecule vaporized is $3.4 / 2 \\approx 1.7$.',
        '$\\Delta H_\\text{H-bond} \\approx 40.7 / 1.7 \\approx 24$ kJ/mol.',
        'This matches typical literature values of 15-25 kJ/mol for the water H-bond.',
      ],
    },
    {
      prompt: 'Explain why 2-propanol and propane-2-one (acetone) are miscible despite the latter lacking O-H.',
      answer: 'Acetone accepts H-bonds from 2-propanol; they form a mixed H-bond network that is energetically favorable.',
      steps: [
        '2-propanol has an O-H and can donate H-bonds.',
        'Acetone has an O lone pair and can accept H-bonds - it just cannot donate any.',
        'In a mixture, 2-propanol donates H-bonds to acetone\'s C=O.',
        'The mixed H-bond network is comparable in strength to pure 2-propanol\'s, so they mix freely.',
      ],
    },
    {
      prompt: 'Why is water\'s heat of vaporization (40.7 kJ/mol) so much larger than ethane\'s (14.7 kJ/mol), despite similar molar masses?',
      answer: 'Water has extensive hydrogen-bonding networks; ethane has only dispersion.',
      steps: [
        'Water: 18 g/mol; ethane: 30 g/mol.',
        'Ethane is actually more massive, so dispersion is stronger in ethane.',
        'But water\'s H-bond network contributes ~25 kJ/mol of extra cohesive energy.',
        'Large $\\Delta H_{vap}$ is why water is such an effective coolant (sweating, transpiration, evaporation cooling in power plants).',
      ],
    },
  ];

  PS.registerTopic("chem-bond-imf", {
    title: "Intermolecular forces",
    description: "Dispersion, dipole-dipole, hydrogen bonding, and phase behavior.",
    warmup:   STATIC_IMF_WARMUP,
    standard: STATIC_IMF_STANDARD,
    challenge: STATIC_IMF_CHALLENGE,
  });
})();
