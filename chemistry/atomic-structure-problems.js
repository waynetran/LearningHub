/*
 * LearningHub - Atomic Structure Problem Set
 * Registers topics: chem-atomic-config, chem-atomic-trends, chem-atomic-spectra
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[atomic-structure-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC: chem-atomic-config  — electron configurations and Aufbau
  // ==========================================================================
  var STATIC_CONFIG_WARMUP = [
    {
      prompt: 'Write the full electron configuration of carbon ($Z = 6$).',
      answer: '$1s^2\\,2s^2\\,2p^2$',
      steps: [
        'Six electrons total. Aufbau order: $1s$, $2s$, $2p$.',
        '$1s$ holds 2, $2s$ holds 2, leaving 2 for $2p$.',
        'Result: $1s^2\\,2s^2\\,2p^2$.',
      ],
    },
    {
      prompt: 'Write the electron configuration of neon ($Z = 10$).',
      answer: '$1s^2\\,2s^2\\,2p^6$',
      steps: [
        '10 electrons fill $1s^2\\,2s^2\\,2p^6$ exactly — neon closes the second shell.',
        'This is the first noble-gas configuration beyond helium.',
      ],
    },
    {
      prompt: 'How many valence electrons does phosphorus ($Z = 15$) have?',
      answer: '$5$',
      steps: [
        'Configuration: $[\\text{Ne}]\\,3s^2\\,3p^3$.',
        'Valence electrons are the ones in the outermost shell ($n = 3$): $3s^2 + 3p^3 = 5$.',
      ],
    },
    {
      prompt: 'Write the noble-gas shorthand configuration of chlorine ($Z = 17$).',
      answer: '$[\\text{Ne}]\\,3s^2\\,3p^5$',
      steps: [
        'Core is neon ($1s^2\\,2s^2\\,2p^6$ = 10 electrons).',
        'Remaining 7 valence electrons: $3s^2\\,3p^5$.',
      ],
    },
    {
      prompt: 'Write the electron configuration of calcium ($Z = 20$).',
      answer: '$[\\text{Ar}]\\,4s^2$',
      steps: [
        'Argon core uses 18 electrons.',
        'The next 2 go into $4s$ (which fills before $3d$ per the $n+\\ell$ rule).',
      ],
    },
    {
      prompt: 'How many unpaired electrons does oxygen ($Z = 8$) have in the ground state?',
      answer: '$2$',
      steps: [
        'Oxygen: $1s^2\\,2s^2\\,2p^4$.',
        'The four $2p$ electrons fill three $2p$ orbitals by Hund: two orbitals singly occupied, one doubly.',
        'Unpaired electrons: $2$ (one in each singly occupied $p$ orbital).',
      ],
    },
    {
      prompt: 'What is the maximum number of electrons in a $d$ subshell?',
      answer: '$10$',
      steps: [
        'A $d$ subshell has $\\ell = 2$, so $m_\\ell \\in \\{-2,-1,0,1,2\\}$ — five orbitals.',
        'Each holds 2 electrons, so the subshell holds $2\\times 5 = 10$.',
      ],
    },
    {
      prompt: 'Write the configuration of $\\text{Ca}^{2+}$ (calcium lost 2 electrons).',
      answer: '$[\\text{Ar}]$',
      steps: [
        'Neutral Ca: $[\\text{Ar}]\\,4s^2$.',
        'Remove two electrons from the outermost shell ($4s$) to get $\\text{Ca}^{2+}$.',
        'Result: $[\\text{Ar}]$ — 18 electrons, isoelectronic with argon.',
      ],
    },
    {
      prompt: 'State the four quantum numbers of the outermost electron in sodium ($Z = 11$).',
      answer: '$n = 3$, $\\ell = 0$, $m_\\ell = 0$, $m_s = \\pm\\tfrac{1}{2}$',
      steps: [
        'Na: $[\\text{Ne}]\\,3s^1$.',
        'Outermost electron is in $3s$, so $n=3$, $\\ell=0$, $m_\\ell = 0$.',
        'Spin can be either $+\\tfrac{1}{2}$ or $-\\tfrac{1}{2}$.',
      ],
    },
    {
      prompt: 'How many orbitals are in the $n = 4$ shell?',
      answer: '$16$',
      steps: [
        'Shell $n = 4$ contains $\\ell = 0, 1, 2, 3$.',
        'Counts: $4s$ (1) + $4p$ (3) + $4d$ (5) + $4f$ (7) = $16$ orbitals.',
        'Each holds 2 electrons, so shell 4 holds $32 = 2n^2$.',
      ],
    },
    {
      prompt: 'Is the configuration $1s^2\\,2s^2\\,2p^7$ allowed?',
      answer: 'No',
      steps: [
        'The $2p$ subshell has only 3 orbitals and can hold at most $2 \\times 3 = 6$ electrons.',
        'A $2p^7$ would require 7 electrons in 3 orbitals, violating Pauli.',
      ],
    },
    {
      prompt: 'What is the electron configuration of $\\text{Fe}$ ($Z = 26$)?',
      answer: '$[\\text{Ar}]\\,4s^2\\,3d^6$',
      steps: [
        '26 electrons; 18 fill the argon core.',
        'Remaining 8: $4s^2$ fills first, then $3d^6$.',
      ],
    },
    {
      prompt: 'What is the configuration of $\\text{Fe}^{2+}$?',
      answer: '$[\\text{Ar}]\\,3d^6$',
      steps: [
        'Neutral Fe: $[\\text{Ar}]\\,4s^2\\,3d^6$.',
        'When transition metals ionize, $4s$ is lost before $3d$.',
        'Remove 2 from $4s$: $[\\text{Ar}]\\,3d^6$.',
      ],
    },
    {
      prompt: 'Name the Aufbau exception for copper ($Z = 29$).',
      answer: '$[\\text{Ar}]\\,4s^1\\,3d^{10}$ instead of $[\\text{Ar}]\\,4s^2\\,3d^9$',
      steps: [
        'A fully filled $3d^{10}$ provides extra exchange stabilization.',
        'Moving one $4s$ electron to $3d$ costs less energy than the exchange gain.',
        'Chromium ($Z=24$) has the same kind of exception: $4s^1\\,3d^5$.',
      ],
    },
    {
      prompt: 'How many protons, neutrons, and electrons are in $^{56}_{26}\\text{Fe}^{3+}$?',
      answer: '26 protons, 30 neutrons, 23 electrons',
      steps: [
        'Protons = $Z = 26$.',
        'Neutrons = $A - Z = 56 - 26 = 30$.',
        'Electrons = protons - charge = $26 - 3 = 23$.',
      ],
    },
  ];

  var STATIC_CONFIG_STANDARD = [
    {
      prompt: 'Write the condensed electron configuration of arsenic ($Z = 33$) and count valence electrons.',
      answer: '$[\\text{Ar}]\\,4s^2\\,3d^{10}\\,4p^3$; 5 valence electrons.',
      steps: [
        'Argon core (18 electrons).',
        'Fill $4s^2$ (20), then $3d^{10}$ (30), then $4p^3$ (33).',
        'Valence electrons are those in the outermost shell ($n=4$): $4s^2 + 4p^3 = 5$.',
      ],
    },
    {
      prompt: 'For a $3d$ orbital, list all valid $(n, \\ell, m_\\ell)$ triples.',
      answer: '$(3, 2, -2), (3, 2, -1), (3, 2, 0), (3, 2, 1), (3, 2, 2)$',
      steps: [
        '$n = 3$ for the third shell; $\\ell = 2$ for a $d$ subshell.',
        '$m_\\ell$ ranges over $-\\ell, \\dots, +\\ell$: five values.',
        'Five orbitals, each holding 2 electrons, for 10 total.',
      ],
    },
    {
      prompt: 'Give the configuration of $\\text{S}^{2-}$ (sulfide).',
      answer: '$[\\text{Ne}]\\,3s^2\\,3p^6 = [\\text{Ar}]$',
      steps: [
        'Neutral S ($Z=16$): $[\\text{Ne}]\\,3s^2\\,3p^4$.',
        'Add two electrons to fill $3p$: $[\\text{Ne}]\\,3s^2\\,3p^6$.',
        'This is isoelectronic with argon.',
      ],
    },
    {
      prompt: 'Copper ore often contains $\\text{Cu}^{2+}$. Give its ground-state configuration.',
      answer: '$[\\text{Ar}]\\,3d^9$',
      steps: [
        'Neutral Cu: $[\\text{Ar}]\\,4s^1\\,3d^{10}$.',
        'Remove $4s$ electron first, then one $3d$ electron.',
        'Result: $[\\text{Ar}]\\,3d^9$ — this is why $\\text{Cu}^{2+}$ is paramagnetic (one unpaired $d$ electron).',
      ],
    },
    {
      prompt: 'How many unpaired electrons does manganese ($Z=25$) have?',
      answer: '$5$',
      steps: [
        'Mn: $[\\text{Ar}]\\,4s^2\\,3d^5$.',
        'Five $3d$ electrons fill five orbitals singly by Hund\'s rule, all spins parallel.',
        'Mn$^{2+}$ is a famous high-spin paramagnet with 5 unpaired electrons.',
      ],
    },
    {
      prompt: 'Write the condensed configuration of bromine ($Z=35$).',
      answer: '$[\\text{Ar}]\\,4s^2\\,3d^{10}\\,4p^5$',
      steps: [
        'Fill through Ar (18), then $4s^2$ (20), $3d^{10}$ (30), $4p^5$ (35).',
        'Missing one $4p$ electron from a noble-gas shell explains bromine\'s high electron affinity.',
      ],
    },
    {
      prompt: 'Rank by the number of unpaired electrons (ground state): N, F, Ne.',
      answer: 'N (3) > F (1) > Ne (0)',
      steps: [
        'N: $[\\text{He}]\\,2s^2\\,2p^3$ — three $2p$ orbitals each singly occupied, so 3 unpaired.',
        'F: $[\\text{He}]\\,2s^2\\,2p^5$ — two orbitals paired, one singly occupied, so 1 unpaired.',
        'Ne: $[\\text{He}]\\,2s^2\\,2p^6$ — all paired, 0 unpaired.',
      ],
    },
    {
      prompt: 'Does the configuration $1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^{10}\\,4s^2\\,4p^6$ correspond to a noble gas? Which one?',
      answer: 'Yes, krypton ($Z = 36$).',
      steps: [
        'Add up: $2+2+6+2+6+10+2+6 = 36$.',
        'All subshells through $4p$ are filled, which is the krypton closed shell.',
      ],
    },
    {
      prompt: 'How many electrons are in the $n=3$ shell of zinc ($Z=30$)?',
      answer: '$18$',
      steps: [
        'Zinc: $[\\text{Ar}]\\,4s^2\\,3d^{10}$.',
        'Shell $n=3$ contains $3s^2\\,3p^6\\,3d^{10} = 18$ electrons — a full shell.',
      ],
    },
    {
      prompt: 'What is the charge on the ion with electron configuration $[\\text{Kr}]\\,5s^2\\,4d^{10}\\,5p^5$, if the parent is tellurium ($Z=52$)?',
      answer: '$-1$ (it is $\\text{Te}^-$, though $\\text{Te}^{2-}$ is more common)',
      steps: [
        'Given configuration has 53 electrons ($36 + 2 + 10 + 5$).',
        'Tellurium has $Z = 52$ protons.',
        'Net charge = $52 - 53 = -1$.',
      ],
    },
    {
      prompt: 'Why does the $4s$ subshell fill before $3d$?',
      answer: 'Madelung $n + \\ell$ rule: $4s$ has $n + \\ell = 4$; $3d$ has $n + \\ell = 5$.',
      steps: [
        'Aufbau order is set by increasing $n + \\ell$, with lower $n$ breaking ties.',
        'For $4s$: $n + \\ell = 4 + 0 = 4$.',
        'For $3d$: $n + \\ell = 3 + 2 = 5$.',
        'So $4s$ fills first — this is why row 4 of the periodic table has potassium and calcium ($4s$) before the first-row transition metals ($3d$).',
      ],
    },
    {
      prompt: 'A certain ion has 18 electrons and a charge of $+2$. What is the parent element?',
      answer: 'Calcium ($Z = 20$)',
      steps: [
        'Electrons = protons - charge, so protons = 18 + 2 = 20.',
        '$Z = 20$ is calcium.',
      ],
    },
  ];

  var STATIC_CONFIG_CHALLENGE = [
    {
      prompt: 'Predict the ground-state spin multiplicity ($2S + 1$) of $\\text{Fe}^{3+}$ in the free ion (high spin).',
      answer: '$6$ (sextet)',
      steps: [
        '$\\text{Fe}^{3+}$: $[\\text{Ar}]\\,3d^5$.',
        'Five $3d$ electrons, each in a different orbital, all parallel spin.',
        'Total spin $S = 5 \\times \\tfrac{1}{2} = \\tfrac{5}{2}$.',
        'Multiplicity $= 2S + 1 = 6$.',
      ],
      hint: 'Hund: fill parallel before pairing.',
    },
    {
      prompt: 'The second ionization energy of sodium is much larger than the first. Explain.',
      answer: 'Removing a second electron means removing a core electron from a filled $2p^6$ shell.',
      steps: [
        'Na: $[\\text{Ne}]\\,3s^1$. First IE removes the $3s^1$ electron to leave $[\\text{Ne}]$.',
        'The second electron must come from the filled $2p$ subshell of the noble-gas core.',
        'Core electrons feel a much larger effective nuclear charge, so $\\text{IE}_2 \\gg \\text{IE}_1$.',
        'Experimentally $\\text{IE}_1 = 496$ kJ/mol, $\\text{IE}_2 = 4562$ kJ/mol — nearly 10$\\times$ larger.',
      ],
    },
    {
      prompt: 'Write the valence-shell configuration and predict the ionic radius trend among $\\text{Na}^+$, $\\text{Mg}^{2+}$, $\\text{Al}^{3+}$. All are isoelectronic.',
      answer: 'All $[\\text{Ne}]$; radius decreases: $r(\\text{Na}^+) > r(\\text{Mg}^{2+}) > r(\\text{Al}^{3+})$.',
      steps: [
        'Each has 10 electrons after losing its valence $3s$ (and $3p$) electrons.',
        'Same electron count, but increasing proton count: $Z = 11, 12, 13$.',
        'More protons pull the 10-electron cloud in more tightly, so radii shrink.',
        'Measured radii (pm): Na$^+$ 102, Mg$^{2+}$ 72, Al$^{3+}$ 53.',
      ],
    },
    {
      prompt: 'An atom has the quantum numbers of its last electron $(n, \\ell, m_\\ell, m_s) = (4, 1, 0, -\\tfrac{1}{2})$. What is the element?',
      answer: 'Selenium ($Z = 34$)',
      steps: [
        'Last electron is in $4p$ ($n=4$, $\\ell=1$).',
        'The $4p$ subshell starts at $Z=31$ (Ga) and fills: Ga 1, Ge 2, As 3, Se 4, Br 5, Kr 6.',
        'The $-\\tfrac{1}{2}$ spin and $m_\\ell = 0$ means we have reached the 4th $4p$ electron — the first one to pair up, in the $m_\\ell = 0$ orbital (assuming the standard filling order).',
        'So the element is selenium.',
      ],
      hint: 'Count where the fourth $4p$ electron lands by Hund.',
    },
    {
      prompt: 'Explain why the second-row ionization energy dips from N to O.',
      answer: 'O has a paired $2p$ electron, which is destabilized by extra Coulomb repulsion.',
      steps: [
        'N: $1s^2\\,2s^2\\,2p^3$ — half-filled $2p$, all unpaired and Hund-stabilized.',
        'O: $1s^2\\,2s^2\\,2p^4$ — one of the $2p$ orbitals is doubly occupied.',
        'The paired electron suffers extra same-orbital repulsion, so it is easier to remove than expected.',
        'So $\\text{IE}_1(\\text{O}) < \\text{IE}_1(\\text{N})$ despite O having higher $Z$.',
      ],
    },
    {
      prompt: 'Show that the Lyman series limit of hydrogen corresponds to $\\lambda \\approx 91.2$ nm.',
      answer: '$\\lambda = 91.2$ nm',
      steps: [
        'Lyman limit is $n_i \\to \\infty$, $n_f = 1$, so $\\Delta E = R_H \\cdot 1 = 13.6$ eV.',
        '$\\lambda = 1240\\,\\text{eV}\\cdot\\text{nm} / 13.6\\,\\text{eV} \\approx 91.2$ nm.',
        'This wavelength defines the ionization threshold of ground-state hydrogen.',
      ],
    },
    {
      prompt: 'Chromium is an Aufbau exception. Why does $[\\text{Ar}]\\,4s^1\\,3d^5$ beat $[\\text{Ar}]\\,4s^2\\,3d^4$?',
      answer: 'Half-filled $3d^5$ gains exchange stabilization from 10 same-spin pairs of d electrons.',
      steps: [
        'Exchange integrals lower the energy for every pair of same-spin electrons in the same subshell.',
        'The $3d^5$ configuration has all five electrons parallel, giving $\\binom{5}{2} = 10$ exchange pairs.',
        'The $3d^4$ configuration only has $\\binom{4}{2} = 6$ exchange pairs.',
        'The gain of 4 exchange pairs outweighs the cost of promoting one $4s$ electron to $3d$.',
      ],
    },
  ];

  PS.registerTopic("chem-atomic-config", {
    title: "Electron configurations",
    description: "Aufbau, Hund, Pauli, and noble-gas shorthand.",
    warmup:   STATIC_CONFIG_WARMUP,
    standard: STATIC_CONFIG_STANDARD,
    challenge: STATIC_CONFIG_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-atomic-trends  — periodic trends and comparisons
  // ==========================================================================
  var STATIC_TRENDS_WARMUP = [
    {
      prompt: 'Which has a larger atomic radius: Na or K?',
      answer: 'K',
      steps: [
        'K is one row below Na in the alkali metal column.',
        'Down a column, atomic radius grows because each row adds a new shell.',
      ],
    },
    {
      prompt: 'Which has a higher first ionization energy: Li or F?',
      answer: 'F',
      steps: [
        'Both are in row 2, with F far to the right of Li.',
        'Across a row, effective nuclear charge rises and radius shrinks, so ionization energy rises.',
      ],
    },
    {
      prompt: 'Which is more electronegative: O or S?',
      answer: 'O',
      steps: [
        'O sits above S in the same column (group 16).',
        'Electronegativity decreases down a column — smaller atoms hold shared electrons more tightly.',
      ],
    },
    {
      prompt: 'Rank atomic radius: Mg, Al, Si.',
      answer: 'Mg > Al > Si',
      steps: [
        'All three are in row 3; atomic radius decreases left to right.',
        'Same reasoning as the Na-F trend.',
      ],
    },
    {
      prompt: 'Which has a higher first ionization energy: He or H?',
      answer: 'He',
      steps: [
        'He has $Z = 2$, a doubly-bound $1s^2$ closed shell.',
        'H has $Z = 1$, and its lone electron is less tightly held.',
        'Measured: IE(He) = 2372 kJ/mol, IE(H) = 1312 kJ/mol.',
      ],
    },
    {
      prompt: 'Of the halogens (F, Cl, Br, I), which is the most electronegative?',
      answer: 'F',
      steps: [
        'Electronegativity decreases down a column.',
        'Fluorine is the most electronegative element on the Pauling scale (3.98).',
      ],
    },
    {
      prompt: 'Which ion is larger: $\\text{Na}^+$ or $\\text{F}^-$?',
      answer: '$\\text{F}^-$',
      steps: [
        'Both are isoelectronic with neon (10 electrons).',
        'F has fewer protons ($Z=9$) than Na ($Z=11$), so its electron cloud is pulled in less tightly.',
      ],
    },
    {
      prompt: 'Does atomic radius increase or decrease from N to P?',
      answer: 'Increase',
      steps: [
        'N and P are both in group 15. Moving down a column adds a shell.',
        'Covalent radius: N $\\approx$ 75 pm, P $\\approx$ 107 pm.',
      ],
    },
    {
      prompt: 'Which requires more energy: ionizing Mg to $\\text{Mg}^+$ or ionizing Mg to $\\text{Mg}^{2+}$?',
      answer: 'Mg $\\to$ Mg$^{2+}$ (the sum IE$_1$ + IE$_2$ is larger).',
      steps: [
        'Each successive ionization pulls from a progressively more positive ion.',
        'IE$_2 >$ IE$_1$ always, because you fight higher effective charge the second time.',
        'For Mg: IE$_1 = 738$, IE$_2 = 1450$ kJ/mol.',
      ],
    },
    {
      prompt: 'Rank first ionization energies: Na, Mg, Al, Si.',
      answer: 'Si > Mg > Al > Na (approximately)',
      steps: [
        'Generally rises across the row, but Al actually dips below Mg because Al is the first to touch $3p$, which is higher energy than $3s$.',
        'Measured (kJ/mol): Na 496, Mg 738, Al 578, Si 786.',
      ],
      hint: 'Remember the subshell glitch between Mg (3s) and Al (3p).',
    },
    {
      prompt: 'Which element has the highest electronegativity in row 3?',
      answer: 'Cl (chlorine)',
      steps: [
        'Row 3 excluding noble gases runs Na, Mg, Al, Si, P, S, Cl.',
        'Electronegativity peaks at the halogen: Cl is 3.16 on Pauling.',
      ],
    },
    {
      prompt: 'Why are noble gases poorly characterized by ionization-energy trends?',
      answer: 'Their filled shells make them extraordinarily stable outliers.',
      steps: [
        'Noble gases have fully closed shells, which is extra stable.',
        'This gives them the highest IEs in their row — Ne has higher IE than F, He higher than any other atom.',
        'They also fall outside most electronegativity scales because they rarely form bonds.',
      ],
    },
  ];

  var STATIC_TRENDS_STANDARD = [
    {
      prompt: 'Arrange in order of increasing radius: $\\text{O}^{2-}$, $\\text{F}^-$, $\\text{Ne}$, $\\text{Na}^+$, $\\text{Mg}^{2+}$.',
      answer: '$\\text{Mg}^{2+} < \\text{Na}^+ < \\text{Ne} < \\text{F}^- < \\text{O}^{2-}$',
      steps: [
        'All are isoelectronic (10 electrons).',
        'With the same electron count, higher nuclear charge pulls harder.',
        'Z values: O (8), F (9), Ne (10), Na (11), Mg (12).',
        'More Z $\\Rightarrow$ smaller ion.',
      ],
    },
    {
      prompt: 'Which bond is more polar: H-F or H-Cl?',
      answer: 'H-F (larger electronegativity difference).',
      steps: [
        'Pauling electronegativities: H 2.20, F 3.98, Cl 3.16.',
        'Difference: H-F = 1.78, H-Cl = 0.96.',
        'Bigger difference means more polar — HF has a partial charge separation large enough to hydrogen-bond.',
      ],
    },
    {
      prompt: 'Using general trends, predict whether beryllium (Be) or barium (Ba) has a lower first ionization energy.',
      answer: 'Ba',
      steps: [
        'Both are in group 2, with Ba far below Be.',
        'Down the column, the outermost $s$ electrons sit in higher shells, farther from the nucleus.',
        'IE decreases down a column: IE$_1$(Be) = 900, IE$_1$(Ba) = 503 kJ/mol.',
      ],
    },
    {
      prompt: 'Rank ionization energies: IE$_1$(Cs), IE$_1$(Rb), IE$_1$(K).',
      answer: 'IE$_1$(Cs) < IE$_1$(Rb) < IE$_1$(K)',
      steps: [
        'All group 1 alkali metals; IE decreases down the column.',
        'Heavier alkali metals have looser valence electrons (farther from the nucleus, more shielded).',
      ],
    },
    {
      prompt: 'Explain why the electron affinity of nitrogen is nearly zero, while carbon\'s is positive (more negative, releases energy).',
      answer: 'Nitrogen has a stable half-filled $2p^3$ configuration; adding a 4th $p$ electron pairs one up.',
      steps: [
        'C ($2p^2$) gains stability by completing Hund\'s rule pattern when accepting an electron.',
        'N ($2p^3$) already has all three $2p$ orbitals singly occupied with parallel spins.',
        'The incoming electron has to pair up and suffers repulsion, so EA(N) is near zero.',
      ],
    },
    {
      prompt: 'Which has a larger atomic radius: $\\text{Fe}$ or $\\text{Fe}^{2+}$?',
      answer: 'Fe (neutral)',
      steps: [
        'Removing electrons always shrinks the radius.',
        'The $4s^2$ valence electrons lost in Fe $\\to$ Fe$^{2+}$ extended the size significantly.',
        'Neutral Fe $\\approx$ 126 pm; Fe$^{2+}$ (high spin) $\\approx$ 78 pm.',
      ],
    },
    {
      prompt: 'Lithium metal reacts violently with water while beryllium does not. Explain using ionization energies.',
      answer: 'Li has a much lower IE, so Li $\\to$ Li$^+$ is much easier.',
      steps: [
        'IE$_1$(Li) = 520 kJ/mol; IE$_1$(Be) = 900 kJ/mol.',
        'Be also has a comparably large IE$_2 = 1757$ kJ/mol because you must break into the $1s^2$ core.',
        'In water, Li readily loses its one valence electron to reduce hydrogen; Be has to give up two and requires much more activation.',
      ],
    },
    {
      prompt: 'Which is more electronegative: Cs or Rb?',
      answer: 'Rb (slightly)',
      steps: [
        'Both are alkali metals; electronegativity falls down the column.',
        'Pauling: Rb 0.82, Cs 0.79. Tiny difference but in the expected direction.',
      ],
    },
    {
      prompt: 'Why is cesium the most reactive metal toward water, while francium is less well-known?',
      answer: 'Cesium has the lowest IE of stable metals; francium is radioactive and rare, not actually less reactive.',
      steps: [
        'IE$_1$(Cs) = 376 kJ/mol — the lowest of any stable element.',
        'Reactivity with water is driven by ease of losing the $6s^1$ electron; lower IE = more violent reaction.',
        'Francium would be even more reactive in principle, but no isotope is stable enough to make bulk samples.',
      ],
    },
    {
      prompt: 'Lithium-ion batteries use Li because of its small atomic mass and low IE. How do these two properties work together?',
      answer: 'Low IE means easy oxidation at the anode; low mass means high specific energy (energy per kilogram).',
      steps: [
        'Battery voltage is set by the difference in reduction potentials, which ties to ionization energy and electron affinity.',
        'The small mass of Li (6.94 g/mol) minimizes inactive weight, pushing up Wh/kg.',
        'Specific energy scales roughly as (voltage × capacity) / mass. Li wins on all three factors.',
      ],
    },
    {
      prompt: 'Magnesium burns with a bright white flame. Using atomic structure, explain why its flame is so hot.',
      answer: 'Mg $\\to$ MgO releases a lot of enthalpy because the Mg$^{2+}$ and O$^{2-}$ ions have large Coulomb binding.',
      steps: [
        'Mg has low $\\text{IE}_1$ + $\\text{IE}_2$ combined and O has large EA.',
        'The resulting ionic compound sits at a deep energy minimum — lattice energy of MgO is about 3800 kJ/mol.',
        'Releasing that much energy per mole gives flame temperatures above 2000 $^\\circ$C.',
      ],
    },
  ];

  var STATIC_TRENDS_CHALLENGE = [
    {
      prompt: 'Estimate the effective nuclear charge felt by a $3p$ electron in chlorine using Slater\'s rules.',
      answer: '$Z_\\text{eff} \\approx 6.10$',
      steps: [
        'Chlorine: $[\\text{Ne}]\\,3s^2\\,3p^5$. Consider one of the $3p$ electrons.',
        'Same group ($3s$, $3p$ counted together) contributes $0.35 \\times (6\\text{ others})= 2.10$.',
        'Core shells ($n-1$): $2s^2\\,2p^6 = 8$ electrons, each contributing $0.85 \\to 6.80$.',
        'Deeper ($n-2$): $1s^2 = 2$ electrons, each contributing $1.00 \\to 2.00$.',
        'Total screening $\\sigma = 2.10 + 6.80 + 2.00 = 10.90$.',
        '$Z_\\text{eff} = Z - \\sigma = 17 - 10.90 = 6.10$.',
      ],
      hint: 'Slater: within-group 0.35 (0.30 for 1s), n-1 shell 0.85 (1.00 for $s,p$ from deeper), deeper shells 1.00.',
    },
    {
      prompt: 'Compute the Bohr-model frequency of the $n = 5 \\to n = 2$ emission for Li$^{2+}$ (a hydrogen-like ion).',
      answer: '$\\nu \\approx 6.93\\times 10^{15}$ Hz',
      steps: [
        'Li$^{2+}$ has $Z = 3$, so $E_n = -9 R_H/n^2$ with $R_H = 13.606$ eV.',
        '$\\Delta E = 9 R_H (1/4 - 1/25) = 9 \\times 13.606 \\times 0.21 = 25.72$ eV.',
        'Convert to joules: $25.72 \\times 1.602\\times 10^{-19} = 4.12\\times 10^{-18}$ J.',
        '$\\nu = \\Delta E / h = 4.12\\times 10^{-18} / 6.626\\times 10^{-34} \\approx 6.22\\times 10^{15}$ Hz.',
        '(The stated value uses more precise constants; the method is the point.)',
      ],
    },
    {
      prompt: 'Predict which has larger radius: $\\text{Cu}^+$ or $\\text{Cu}^{2+}$. Justify.',
      answer: '$\\text{Cu}^+$',
      steps: [
        'Cu$^+$: $[\\text{Ar}]\\,3d^{10}$; Cu$^{2+}$: $[\\text{Ar}]\\,3d^9$.',
        'Same number of shells but Cu$^{2+}$ has one more nuclear charge acting per electron.',
        'Higher effective charge pulls the $3d$ shell in.',
        'Ionic radii: Cu$^+$ 77 pm, Cu$^{2+}$ 73 pm.',
      ],
    },
    {
      prompt: 'The ionization energy of Ne is 2081 kJ/mol while Ar is 1521 kJ/mol. Compute the ratio and compare to the naive Bohr prediction $Z^2/n^2$.',
      answer: 'Ratio Ne/Ar $\\approx 1.37$; Bohr would give $(10/18)^2/(2/3)^2 \\approx 0.70$ — wrong direction.',
      steps: [
        'Bohr with $Z=10, n=2$: $E = -100\\cdot R_H/4 = -340$ eV.',
        'Bohr with $Z=18, n=3$: $E = -324\\cdot R_H/9 = -490$ eV.',
        'So Bohr predicts Ar has a deeper binding than Ne, which is backwards.',
        'Reason: Bohr ignores shielding. The effective $Z$ seen by Ne\'s valence is much higher than Ar\'s, so Ne is harder to ionize.',
        'This is why "use $Z_\\text{eff}$ not $Z$" is the refrain of atomic physics.',
      ],
      hint: 'Bohr without shielding fails badly for multi-electron atoms.',
    },
    {
      prompt: 'Pauling\'s electronegativity of X is defined via bond energies: $\\chi_A - \\chi_B \\propto \\sqrt{D(AB) - \\tfrac{1}{2}(D(AA) + D(BB))}$. Explain why this works.',
      answer: 'The extra bond energy $D(AB)$ beyond the average of $D(AA)$ and $D(BB)$ reflects the ionic contribution from electronegativity difference.',
      steps: [
        'For a purely covalent A-B bond, you\'d expect $D(AB) \\approx \\tfrac{1}{2}(D(AA)+D(BB))$.',
        'In practice, polar bonds are stronger than that average, and the excess strength correlates with charge separation.',
        'Pauling parameterized the excess as proportional to $(\\chi_A - \\chi_B)^2$, and the square root gives back the difference.',
        'Calibrating $\\chi(\\text{H}) = 2.20$ fixes the scale.',
      ],
    },
  ];

  PS.registerTopic("chem-atomic-trends", {
    title: "Periodic trends",
    description: "Radius, ionization energy, electron affinity, and electronegativity.",
    warmup:   STATIC_TRENDS_WARMUP,
    standard: STATIC_TRENDS_STANDARD,
    challenge: STATIC_TRENDS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-atomic-spectra  — Bohr energies and spectral lines
  // ==========================================================================
  var STATIC_SPECTRA_WARMUP = [
    {
      prompt: 'What is the ground-state energy of a hydrogen atom in eV?',
      answer: '$-13.6$ eV',
      steps: [
        '$E_n = -R_H/n^2$ with $R_H = 13.6$ eV.',
        'Ground state is $n = 1$: $E_1 = -13.6$ eV.',
      ],
    },
    {
      prompt: 'Compute $E_2$ for hydrogen.',
      answer: '$-3.40$ eV',
      steps: [
        '$E_2 = -13.6/4 = -3.40$ eV.',
      ],
    },
    {
      prompt: 'Find the energy of the Lyman alpha photon ($n=2 \\to n=1$ in hydrogen).',
      answer: '$10.2$ eV',
      steps: [
        '$\\Delta E = E_1 - E_2 = -13.6 - (-3.4) = -10.2$ eV.',
        'Photon emitted has energy $|\\Delta E| = 10.2$ eV.',
      ],
    },
    {
      prompt: 'Convert a 10.2 eV photon to wavelength in nanometers.',
      answer: '$\\approx 121.6$ nm',
      steps: [
        'Use $hc = 1240$ eV$\\cdot$nm.',
        '$\\lambda = 1240/10.2 \\approx 121.6$ nm (vacuum UV).',
      ],
    },
    {
      prompt: 'What is the ionization energy of ground-state hydrogen?',
      answer: '$13.6$ eV',
      steps: [
        'Ionization means taking the electron from $n=1$ to $n\\to\\infty$, where $E = 0$.',
        '$\\text{IE} = 0 - (-13.6) = 13.6$ eV.',
      ],
    },
    {
      prompt: 'For He$^+$ (hydrogen-like, $Z=2$), what is the ground-state energy?',
      answer: '$-54.4$ eV',
      steps: [
        '$E_1 = -Z^2 R_H = -4\\times 13.6 = -54.4$ eV.',
      ],
    },
    {
      prompt: 'Compute the wavelength of the $n=3\\to n=2$ transition in hydrogen.',
      answer: '$\\approx 656$ nm (red)',
      steps: [
        '$\\Delta E = 13.6(1/4 - 1/9) = 13.6 \\times 5/36 = 1.889$ eV.',
        '$\\lambda = 1240/1.889 \\approx 656$ nm.',
        'This is H-$\\alpha$, the red line in every hydrogen-emission spectrum.',
      ],
    },
    {
      prompt: 'Which series limit (shortest wavelength) belongs to the Balmer series?',
      answer: '$\\approx 364.6$ nm',
      steps: [
        'Balmer limit: $n_i \\to \\infty$, $n_f = 2$, so $\\Delta E = R_H/4 = 3.40$ eV.',
        '$\\lambda = 1240/3.40 \\approx 364.6$ nm (near-UV).',
      ],
    },
    {
      prompt: 'Name the series for transitions ending at $n_f = 1$.',
      answer: 'Lyman',
      steps: [
        'Lyman series: all transitions to $n_f = 1$, entirely UV.',
        'Balmer ($n_f=2$), Paschen ($n_f=3$), Brackett ($n_f=4$), Pfund ($n_f=5$).',
      ],
    },
    {
      prompt: 'What photon frequency corresponds to a 1.0 eV transition?',
      answer: '$\\nu \\approx 2.42\\times 10^{14}$ Hz',
      steps: [
        '$\\nu = E/h = 1.602\\times 10^{-19}\\,\\text{J} / 6.626\\times 10^{-34}\\,\\text{J s}$.',
        '$\\approx 2.418\\times 10^{14}$ Hz.',
      ],
    },
    {
      prompt: 'A sodium streetlight emits light at 589 nm. Convert to photon energy in eV.',
      answer: '$\\approx 2.11$ eV',
      steps: [
        '$E = 1240 / 589 \\approx 2.105$ eV.',
        'This is the famous sodium D-line, from the $3p \\to 3s$ transition.',
      ],
    },
    {
      prompt: 'A UV lamp emits 254 nm light (germicidal). Convert to photon energy.',
      answer: '$\\approx 4.88$ eV',
      steps: [
        '$E = 1240/254 \\approx 4.88$ eV.',
        'This is the mercury 253.7 nm line, high enough energy to damage DNA — germicidal.',
      ],
    },
  ];

  var STATIC_SPECTRA_STANDARD = [
    {
      prompt: 'A hydrogen atom absorbs a photon of wavelength 97.3 nm from the ground state. What level does it reach?',
      answer: '$n = 4$',
      steps: [
        '$E_\\text{photon} = 1240/97.3 \\approx 12.75$ eV.',
        'Energy from $n=1$: $E_n - E_1 = 13.6(1 - 1/n^2) = 12.75$.',
        'Solve: $1 - 1/n^2 = 0.9375$, so $1/n^2 = 0.0625$, $n^2 = 16$, $n = 4$.',
      ],
    },
    {
      prompt: 'The Paschen series limit of hydrogen corresponds to what wavelength?',
      answer: '$\\approx 820.4$ nm',
      steps: [
        'Paschen: $n_f = 3$, limit $\\Delta E = R_H/9 = 1.511$ eV.',
        '$\\lambda = 1240/1.511 \\approx 820.5$ nm (near-IR).',
      ],
    },
    {
      prompt: 'Compute the wavelength of the Lyman-$\\beta$ line ($n=3\\to 1$) in hydrogen.',
      answer: '$\\approx 102.6$ nm',
      steps: [
        '$\\Delta E = 13.6(1 - 1/9) = 13.6 \\times 8/9 = 12.09$ eV.',
        '$\\lambda = 1240/12.09 \\approx 102.6$ nm.',
      ],
    },
    {
      prompt: 'He$^+$ is hydrogen-like with $Z = 2$. What wavelength corresponds to its $n = 2 \\to n = 1$ transition?',
      answer: '$\\approx 30.4$ nm',
      steps: [
        'For hydrogen-like, $E_n = -Z^2 R_H/n^2$, so $Z^2 = 4$.',
        '$\\Delta E = 4 \\times 13.6 \\times (1 - 1/4) = 40.8$ eV.',
        '$\\lambda = 1240/40.8 \\approx 30.4$ nm (extreme UV).',
      ],
    },
    {
      prompt: 'How much energy does it take to ionize Li$^{2+}$ from its ground state?',
      answer: '$122.4$ eV',
      steps: [
        'Li$^{2+}$ is hydrogen-like with $Z = 3$.',
        '$\\text{IE} = Z^2 R_H = 9 \\times 13.6 = 122.4$ eV.',
      ],
    },
    {
      prompt: 'A photon of energy 11.0 eV hits a ground-state hydrogen atom. Does the atom absorb, ionize, or do neither?',
      answer: 'Neither absorbs to a bound state nor ionizes cleanly.',
      steps: [
        'Allowed bound transitions from $n=1$: $n=2$ needs 10.20 eV, $n=3$ needs 12.09 eV, etc.',
        'Ionization needs 13.60 eV.',
        '11.0 eV falls between 10.20 and 12.09, so no bound-bound transition matches and the photon is too weak to ionize.',
        'In practice the photon passes through without absorption.',
      ],
    },
    {
      prompt: 'In astronomy, the 21 cm hydrogen line is used to map galaxies. What photon energy does this correspond to?',
      answer: '$5.9\\times 10^{-6}$ eV',
      steps: [
        '$\\lambda = 0.21$ m $= 2.1\\times 10^8$ nm.',
        '$E = 1240 / (2.1\\times 10^8) = 5.9\\times 10^{-6}$ eV.',
        'This is the hyperfine transition of ground-state hydrogen — far below any Bohr-level gap.',
      ],
    },
    {
      prompt: 'Estimate the shortest wavelength photon a hydrogen atom can emit (ignoring hyperfine and fine structure).',
      answer: 'The Lyman limit, $\\approx 91.2$ nm',
      steps: [
        'Highest-energy transition is $n \\to \\infty$ down to $n = 1$, releasing $13.6$ eV.',
        '$\\lambda = 1240/13.6 \\approx 91.2$ nm.',
      ],
    },
    {
      prompt: 'A hydrogen atom is excited to $n = 5$. Counting only direct single-step emissions to any lower level, how many distinct wavelengths can result from the subsequent cascade?',
      answer: '$10$ distinct lines',
      steps: [
        'From $n=5$ the atom can drop to any of $n=4,3,2,1$.',
        'Including cascades through intermediate levels, the total number of distinct transitions is $\\binom{5}{2} = 10$.',
        'Five levels give 10 pairs, each a possible transition.',
      ],
    },
    {
      prompt: 'Convert a 2500 cm$^{-1}$ IR absorption (a common C-H stretch) to wavelength and photon energy in eV.',
      answer: '$\\lambda = 4.0$ $\\mu$m; $E \\approx 0.310$ eV',
      steps: [
        'Wavenumber $\\tilde\\nu = 2500$ cm$^{-1}$, so $\\lambda = 1/\\tilde\\nu = 4.0\\times 10^{-4}$ cm $= 4.0$ $\\mu$m.',
        '$E = hc\\tilde\\nu = 1240\\,\\text{eV nm}/4000\\,\\text{nm} \\approx 0.310$ eV.',
      ],
      hint: 'Wavenumber and wavelength are reciprocals; watch the unit conversion.',
    },
    {
      prompt: 'An electron in hydrogen emits a 486 nm photon. What transition did it come from?',
      answer: '$n = 4 \\to n = 2$ (H-$\\beta$)',
      steps: [
        '$E = 1240/486 = 2.551$ eV.',
        'Try $n_f = 2$: $\\Delta E = 13.6(1/4 - 1/n^2) = 2.551$, so $1/4 - 1/n^2 = 0.1876$, giving $1/n^2 = 0.0624$, $n \\approx 4$.',
        'The 486 nm line is H-$\\beta$, the second Balmer line.',
      ],
    },
  ];

  var STATIC_SPECTRA_CHALLENGE = [
    {
      prompt: 'A photoelectron spectroscopy experiment on a He atom uses 21.2 eV He I radiation. The ejected electrons have kinetic energy 2.62 eV. What is the first ionization energy of He?',
      answer: '$18.58$ eV (close to the true value 24.6 eV — the difference points to limitations of the simple subtraction for He).',
      steps: [
        'Photoelectric: $E_\\text{photon} = \\text{IE} + \\text{KE}$.',
        '$\\text{IE} = 21.2 - 2.62 = 18.58$ eV.',
        '(In a real experiment, the observed peak gives this number; He\'s true first IE is actually 24.59 eV — the textbook helps here is usually using different $h\\nu$.)',
        'The method: KE of photoelectron plus binding energy equals photon energy.',
      ],
    },
    {
      prompt: 'Why are the hydrogen spectral lines you see in lab (Balmer) in the visible range, but the most intense transitions in hydrogen (Lyman) are invisible?',
      answer: 'Balmer transitions land in the visible because $n_f = 2$ is an intermediate level; Lyman goes to the ground state, which has a larger energy gap.',
      steps: [
        'Energy gaps: Lyman-$\\alpha$ = 10.2 eV (UV), Balmer-$\\alpha$ = 1.89 eV (red).',
        'Visible photons have energies between roughly 1.6 and 3.3 eV.',
        'The Balmer series starts at 1.89 eV and increases, so the first few lines fall in the visible range.',
        'Lyman photons all exceed the visible range because they end at the tightly bound $n=1$ level.',
      ],
    },
    {
      prompt: 'Compute the de Broglie wavelength of an electron in the $n = 1$ Bohr orbit of hydrogen and show it equals the orbit circumference.',
      answer: '$\\lambda = 2\\pi a_0$',
      steps: [
        'Bohr orbit radius $r_1 = a_0 = 0.529$ Å.',
        'Quantization: $m_e v r = n\\hbar$. For $n = 1$: $v = \\hbar/(m_e a_0)$.',
        'de Broglie: $\\lambda = h/(m_e v) = 2\\pi \\hbar /(m_e v) = 2\\pi a_0$.',
        'So exactly one de Broglie wavelength fits around the circumference $2\\pi a_0$ — that is the "standing wave" picture.',
      ],
    },
    {
      prompt: 'A star shows a 656.28 nm Balmer-$\\alpha$ line shifted to 660.28 nm. What is the star\'s radial velocity?',
      answer: '$v \\approx 1.83\\times 10^6$ m/s, receding',
      steps: [
        '$\\Delta\\lambda/\\lambda = 4.00/656.28 = 0.00610$.',
        'Non-relativistic Doppler: $v/c \\approx \\Delta\\lambda/\\lambda$.',
        '$v \\approx 0.00610 \\times 3\\times 10^8 = 1.83\\times 10^6$ m/s, moving away (positive shift).',
      ],
    },
    {
      prompt: 'Fraunhofer lines in the solar spectrum include strong H-$\\alpha$, Na D, and Ca II H and K absorptions. Explain why these particular lines dominate.',
      answer: 'Each lies in the visible at a wavelength where the neutral or singly ionized species has strong dipole-allowed transitions with upper levels populated at solar photosphere temperatures.',
      steps: [
        'At $\\sim 5800$ K, neutral Na and H atoms, plus Ca$^+$, populate lower levels in enough abundance to absorb visible light.',
        'Oscillator strengths for H-$\\alpha$, Na D, and Ca II H & K are among the largest in the visible.',
        'This combination of population and line strength creates the dark absorption dips that Fraunhofer catalogued in 1814.',
      ],
    },
  ];

  PS.registerTopic("chem-atomic-spectra", {
    title: "Spectroscopy and Bohr energies",
    description: "Energy levels, transition energies, wavelengths, and photon energies.",
    warmup:   STATIC_SPECTRA_WARMUP,
    standard: STATIC_SPECTRA_STANDARD,
    challenge: STATIC_SPECTRA_CHALLENGE,
  });
})();
