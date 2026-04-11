/*
 * LearningHub - Organic Chemistry Problem Set
 * Registers 4 topics with the LearningHubProblemSet runtime.
 * Topics: chem-org-skeletons, chem-org-fg, chem-org-stereo, chem-org-mech, chem-org-retro
 */
(function () {
  "use strict";

  // Wait for the runtime. It loads before us in page order, but be defensive.
  function boot() {
    if (!window.LearningHubProblemSet) {
      return setTimeout(boot, 50);
    }
    var PS = window.LearningHubProblemSet;

    // ========================================================================
    // TOPIC 1: chem-org-skeletons
    // ========================================================================

    var SKEL_STATIC = [
      {
        prompt: 'Give the molecular formula and degree of unsaturation of benzene.',
        answer: '$C_6H_6$, DoU = 4',
        steps: [
          'Benzene is a six-membered aromatic ring.',
          'DoU $= (2\\cdot6 + 2 - 6)/2 = 4$.',
          'The 4 corresponds to one ring + three double bonds (formal Kekulé picture).',
        ],
      },
      {
        prompt: 'How many hydrogens does $n$-octane have? Formula and check DoU.',
        answer: '$C_8H_{18}$, DoU = 0',
        steps: [
          'Straight-chain alkane: $C_nH_{2n+2}$ with $n=8$.',
          '$2\\cdot8 + 2 = 18$ hydrogens.',
          'DoU $= 0$ — fully saturated, no rings.',
        ],
      },
      {
        prompt: 'A compound has formula $C_5H_8$. What is its DoU, and name one possible structure.',
        answer: 'DoU = 2; examples: 1,3-pentadiene, 1-pentyne, cyclopentene.',
        steps: [
          '$(2\\cdot5 + 2 - 8)/2 = 2$.',
          '2 degrees = 2 $\\pi$ bonds, 1 triple, or 1 ring + 1 $\\pi$, or 2 rings.',
          'Any of those structures satisfies the formula.',
        ],
      },
      {
        prompt: 'Caffeine has formula $C_8H_{10}N_4O_2$. Compute DoU. (Ignore O, add N.)',
        answer: 'DoU = 6',
        steps: [
          'DoU formula with N: $(2\\cdot8 + 2 + 4 - 10)/2 = 12/2 = 6$.',
          'Caffeine has two fused rings (imidazole + pyrimidine) + three C=O/C=N double bonds = 6.',
        ],
      },
      {
        prompt: 'Classify by hybridization: the two carbons in ethyne (acetylene), $HC\\equiv CH$.',
        answer: 'Both sp.',
        steps: [
          'Triple bond: each carbon has 2 $\\sigma$ bonds + 2 $\\pi$.',
          '2 $\\sigma$ neighbors = sp hybridized; linear, 180°.',
        ],
      },
      {
        prompt: 'What is the bond angle in methane, $CH_4$?',
        answer: '$\\approx 109.5°$',
        steps: [
          'sp$^3$ tetrahedral carbon.',
          '$\\cos^{-1}(-1/3) \\approx 109.47°$.',
        ],
      },
      {
        prompt: 'Draw the skeletal formula for 2-methylbutane. How many carbons does it have in total?',
        answer: '5 carbons total.',
        steps: [
          'Butane has 4 C. Methyl at C2 adds 1 more: total 5.',
          'Skeletal: zigzag 4-carbon chain with a line branching at C2.',
        ],
      },
      {
        prompt: 'Is cyclohexane saturated? What is its DoU?',
        answer: 'Yes, saturated. DoU = 1 (one ring, no $\\pi$ bonds).',
        steps: [
          '$C_6H_{12}$. $(14 - 12)/2 = 1$.',
          'The 1 comes from the ring; no double bonds.',
        ],
      },
      {
        prompt: 'Ethylene ($C_2H_4$): list the hybridization and bond angles around carbon.',
        answer: 'sp$^2$, angles $\\approx 120°$.',
        steps: [
          'Each carbon has 3 $\\sigma$ neighbors and 1 $\\pi$.',
          '3 $\\sigma$ = sp$^2$ = trigonal planar = 120°.',
        ],
      },
      {
        prompt: 'What is the general formula for a cycloalkene (one ring + one C=C)?',
        answer: '$C_n H_{2n-2}$',
        steps: [
          'Alkane $C_nH_{2n+2}$; each ring subtracts 2 H; each double bond subtracts 2 H.',
          'Start from $C_nH_{2n+2}$, subtract 4: $C_nH_{2n-2}$.',
        ],
      },
      {
        prompt: 'Aspirin has molecular formula $C_9H_8O_4$. Compute DoU.',
        answer: 'DoU = 6',
        steps: [
          'Ignore O: $(2\\cdot9+2-8)/2 = 12/2 = 6$.',
          'Benzene ring (4) + carboxylic acid C=O (1) + ester C=O (1) = 6. ✓',
        ],
      },
      {
        prompt: 'For $C_4H_{10}$, how many structural isomers exist?',
        answer: '2 (n-butane and isobutane/2-methylpropane)',
        steps: [
          'Four carbons can be arranged linearly or with one branch.',
          'No other arrangements are possible without violating valence.',
        ],
      },
      {
        prompt: 'For $C_5H_{12}$, how many structural isomers exist?',
        answer: '3 (n-pentane, isopentane, neopentane)',
        steps: [
          'Linear (n-pentane).',
          'One methyl branch (isopentane / 2-methylbutane).',
          'Two methyls on same C (neopentane / 2,2-dimethylpropane).',
        ],
      },
      {
        prompt: 'Name the alkyne $CH_3-C\\equiv C-CH_3$.',
        answer: '2-butyne',
        steps: [
          'Four carbons = but.',
          'Triple bond starts at C2 counting from either end.',
          'Name: but-2-yne or 2-butyne.',
        ],
      },
      {
        prompt: 'Why is cyclopropane more strained than cyclohexane?',
        answer: 'Forced 60° bond angles vs. ideal 109.5°.',
        steps: [
          'sp$^3$ carbon prefers 109.5°.',
          'Cyclopropane forces a 60° internal angle — huge angle strain.',
          'Cyclohexane can adopt a chair conformation with angles essentially at 109.5°, so it is essentially strain-free.',
        ],
      },
    ];

    PS.registerTopic("chem-org-skeletons", {
      title: "Hydrocarbons and skeletons",
      description: "Alkanes/alkenes/alkynes, hybridization, DoU, simple naming.",
      warmup: SKEL_STATIC,
      standard: SKEL_STATIC,
      challenge: SKEL_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 2: chem-org-fg  (Functional groups)
    // ========================================================================

    var FG_STATIC = [
      {
        prompt: 'Identify the functional group in $CH_3CH_2OH$.',
        answer: 'Alcohol (–OH)',
        steps: [
          'One –OH on a saturated carbon.',
          'This is ethanol.',
        ],
      },
      {
        prompt: 'What functional group is in $CH_3COOH$?',
        answer: 'Carboxylic acid',
        steps: [
          '–COOH is the carboxyl group: a carbonyl (C=O) plus a hydroxyl on the same carbon.',
          'This is acetic acid.',
        ],
      },
      {
        prompt: 'What distinguishes an aldehyde from a ketone?',
        answer: 'Aldehyde has at least one H on the carbonyl carbon; ketone has two carbon substituents.',
        steps: [
          'Aldehyde: R–CHO (one R, one H on C=O).',
          'Ketone: R–CO–R (two carbons on C=O).',
          'Aldehydes oxidize easily to acids; ketones resist oxidation.',
        ],
      },
      {
        prompt: 'Identify the functional group in $CH_3OCH_3$.',
        answer: 'Ether',
        steps: [
          'Oxygen between two carbon chains: R–O–R.',
          'This is dimethyl ether.',
        ],
      },
      {
        prompt: 'Which is more acidic, ethanol ($pK_a \\approx 16$) or acetic acid ($pK_a \\approx 4.76$)? Why?',
        answer: 'Acetic acid. Its conjugate base is resonance-stabilized over two equivalent oxygens.',
        steps: [
          'Lower $pK_a$ = more acidic.',
          'Acetate ($CH_3COO^-$) delocalizes negative charge between both oxygens.',
          'Ethoxide localizes it on one oxygen — much less stable, so ethanol is much less acidic.',
        ],
      },
      {
        prompt: 'Ester hydrolysis: $CH_3COOCH_3 + H_2O \\to$ ?',
        answer: '$CH_3COOH + CH_3OH$',
        steps: [
          'Water cleaves the ester C–O bond.',
          'Products: the parent acid and the parent alcohol.',
          'Catalyzed by acid or base.',
        ],
      },
      {
        prompt: 'Why is an amide ($R-CO-NR_2$) much less basic than an amine ($R-NR_2$)?',
        answer: 'The N lone pair in an amide is delocalized into the adjacent C=O, so it is not available for protonation.',
        steps: [
          'In amide: N lone pair donates into the carbonyl $\\pi^*$, forming partial C=N character.',
          'Protonation would break that resonance and destabilize the cation.',
          'Net: amides are $\\sim 10^{10}$× less basic than amines. Protonation of amides happens on O, not N.',
        ],
      },
      {
        prompt: 'What gets oxidized to an aldehyde?',
        answer: 'A primary alcohol.',
        steps: [
          '1° alcohol → aldehyde → carboxylic acid (stepwise oxidation).',
          '2° alcohol → ketone (stops there; no $\\alpha$-H on the alcohol C? no, simply no further oxidation in most conditions).',
          'Common reagents: PCC (stops at aldehyde), CrO$_3$ (goes to acid).',
        ],
      },
      {
        prompt: 'Classify this amine: $(CH_3)_2NH$.',
        answer: 'Secondary amine (2°)',
        steps: [
          'Count carbons on N: two methyl groups and one H.',
          '2 carbon substituents = secondary.',
        ],
      },
      {
        prompt: 'Aspirin has both an ester and a carboxylic acid. Which hydrolyzes faster under basic conditions, and what does that produce?',
        answer: 'The ester hydrolyzes (saponification), producing salicylate and acetate.',
        steps: [
          'Carboxylic acid is already deprotonated in base (not hydrolyzed).',
          'Ester is attacked by $OH^-$ at the carbonyl, cleaving to give the two carboxylates.',
          'Salicylate is the active drug; acetate is the byproduct.',
        ],
      },
      {
        prompt: 'What functional groups are in the amino acid glycine, $H_2N-CH_2-COOH$?',
        answer: 'Amine (primary) and carboxylic acid.',
        steps: [
          '–NH$_2$ on one end (primary amine).',
          '–COOH on the other end (carboxylic acid).',
          'At physiological pH, glycine is a zwitterion: $H_3N^+-CH_2-COO^-$.',
        ],
      },
      {
        prompt: 'Nitriles hydrolyze to what products under acid catalysis?',
        answer: 'Amides (partial), then carboxylic acids (full).',
        steps: [
          '$R-C\\equiv N + H_2O \\to R-CONH_2$ (amide).',
          'Further hydrolysis: $R-CONH_2 + H_2O \\to R-COOH + NH_3$.',
          'Used industrially to make adipic acid from adiponitrile (nylon-6,6 feedstock).',
        ],
      },
      {
        prompt: 'Identify the functional group highlighted: the C=O of acetone, $(CH_3)_2C=O$.',
        answer: 'Ketone',
        steps: [
          'C=O flanked by two carbons (two methyls) = ketone.',
          'Acetone is the simplest ketone.',
        ],
      },
      {
        prompt: 'Which molecule can donate a hydrogen bond: diethyl ether or ethanol?',
        answer: 'Ethanol (has O–H).',
        steps: [
          'Hydrogen bond donor needs X–H where X is N, O, or F.',
          'Ether has no O–H; it can accept but not donate.',
          'Ethanol has O–H; it both donates and accepts.',
        ],
      },
      {
        prompt: 'The amide linkage in proteins is called a ______ bond.',
        answer: 'Peptide bond',
        steps: [
          'Amino acid carboxyl + amino acid amine → amide + water.',
          'That amide is known as the peptide bond in protein chemistry.',
          'Partial double-bond character (resonance) makes it planar and rigid.',
        ],
      },
    ];

    PS.registerTopic("chem-org-fg", {
      title: "Functional groups",
      description: "Identification, reactivity, acid/base properties of common groups.",
      warmup: FG_STATIC,
      standard: FG_STATIC,
      challenge: FG_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 3: chem-org-stereo  (Isomerism and chirality)
    // ========================================================================

    var STEREO_STATIC = [
      {
        prompt: 'Does 2-chlorobutane contain a stereocenter? If so, how many?',
        answer: 'Yes, one (C2).',
        steps: [
          'C2 carries: Cl, H, CH$_3$, and CH$_2$CH$_3$.',
          'Four different groups ⇒ stereocenter.',
          'Exists as two enantiomers (R and S).',
        ],
      },
      {
        prompt: 'How many stereoisomers does a molecule with $n$ stereocenters generally have (upper bound)?',
        answer: '$2^n$',
        steps: [
          'Each stereocenter is independently R or S.',
          'With $n$ centers and no symmetry: $2^n$ combinations.',
          'Meso compounds collapse pairs; fewer than $2^n$ in that case.',
        ],
      },
      {
        prompt: 'Assign R/S: glyceraldehyde, $OHC-CHOH-CH_2OH$, with the –OH on the front-right in a Fischer projection.',
        answer: 'R',
        steps: [
          'Priorities: OH (1) > CHO (2) > CH$_2$OH (3) > H (4).',
          'Orient with H (lowest) in back.',
          '1 → 2 → 3 runs clockwise ⇒ R.',
          '(In biochemistry this is called D-glyceraldehyde.)',
        ],
      },
      {
        prompt: 'Cis-2-butene vs trans-2-butene: which is more stable and why?',
        answer: 'Trans. The two methyls are on opposite sides, with less steric repulsion.',
        steps: [
          'Cis puts methyl groups on the same side of the C=C.',
          'Steric clash raises energy by ~4 kJ/mol.',
          'Trans is lower in energy.',
        ],
      },
      {
        prompt: 'Enantiomers vs diastereomers — what is the difference?',
        answer: 'Enantiomers are non-superimposable mirror images (all stereocenters inverted). Diastereomers differ at one or more, but not all, stereocenters.',
        steps: [
          'Pair of molecules with opposite R/S at every center = enantiomers.',
          'Pair with opposite R/S at some but not all centers = diastereomers.',
          'Diastereomers have different physical properties (mp, bp, $[\\alpha]$); enantiomers do not (except rotation of polarized light).',
        ],
      },
      {
        prompt: 'Specific rotation of (S)-(+)-carvone is $+61°$. What is the specific rotation of (R)-(−)-carvone?',
        answer: '$-61°$',
        steps: [
          'Enantiomers rotate polarized light equally in opposite directions.',
          'Same magnitude, opposite sign.',
        ],
      },
      {
        prompt: 'Enantiomeric excess (ee) of a mixture with 90% (R) and 10% (S) = ?',
        answer: '80%',
        steps: [
          'ee $= |R - S| = 90\\% - 10\\% = 80\\%$.',
          'Equivalently, 80% single enantiomer and 20% racemate.',
        ],
      },
      {
        prompt: 'Meso compound: definition?',
        answer: 'A molecule with stereocenters but an internal mirror plane, making it achiral overall.',
        steps: [
          'Meso example: (2R,3S)-tartaric acid. Two stereocenters, yet superimposable on its mirror image.',
          'Internal plane of symmetry between C2 and C3 cancels chirality.',
          'Rotates polarized light by 0° despite having stereocenters.',
        ],
      },
      {
        prompt: 'A chiral drug is marketed as a racemate ($[\\alpha] = 0$). Why can one enantiomer still be preferred therapeutically?',
        answer: 'The two enantiomers bind a chiral receptor very differently; one may be active, the other inactive or harmful.',
        steps: [
          'Protein binding sites are chiral (made of L-amino acids).',
          'The R and S forms fit differently.',
          'Thalidomide, ibuprofen, and naproxen are classic examples where the "wrong" enantiomer is inactive or problematic.',
        ],
      },
      {
        prompt: 'Does cyclohexane have a chiral center? What about methylcyclohexane at the methylated carbon?',
        answer: 'Neither. The carbon with the methyl has two identical CH$_2$ neighbors.',
        steps: [
          'Stereocenter requires 4 different substituents.',
          'The methyl-bearing carbon has: CH$_3$, H, and two identical CH$_2$ arms around the ring.',
          'Two equivalent substituents ⇒ not a stereocenter.',
        ],
      },
      {
        prompt: 'E/Z assignment: in 2-bromo-2-butene, $CH_3(Br)C=C(CH_3)H$, which configuration has Br and the larger-CH$_3$ on the same side?',
        answer: 'Z (cis with respect to high-priority groups)',
        steps: [
          'Priorities on C2: Br > CH$_3$.',
          'Priorities on C3: CH$_3$ > H.',
          'High priority on same side ⇒ Z (zusammen).',
        ],
      },
      {
        prompt: 'In a polarimeter, a 0.5 M solution of a chiral compound in a 10 cm (= 1 dm) cell rotates light by $+3.0°$. Compute $[\\alpha]$. Assume the compound has molar mass 100 g/mol.',
        answer: '$[\\alpha] = +60$ deg·mL·g$^{-1}$·dm$^{-1}$',
        steps: [
          'Convert $c$ to g/mL: $0.5 \\text{ mol/L} \\cdot 100 \\text{ g/mol} = 50 \\text{ g/L} = 0.050 \\text{ g/mL}$.',
          '$[\\alpha] = \\alpha / (c \\ell) = 3.0 / (0.050 \\cdot 1) = 60$.',
        ],
      },
      {
        prompt: 'How many stereoisomers does glucose ($C_6H_{12}O_6$) have, given it has 4 stereocenters?',
        answer: '$2^4 = 16$',
        steps: [
          '4 stereocenters with no internal symmetry.',
          '$2^4 = 16$ stereoisomers, all sugars with different names: D-glucose, L-glucose, D-mannose, etc.',
        ],
      },
      {
        prompt: 'In cahn-ingold-prelog priority, rank: Br, Cl, CH$_3$, OH.',
        answer: 'Br > Cl > OH > CH$_3$',
        steps: [
          'By atomic number of first atom: Br (35) > Cl (17) > O (8) > C (6).',
          'So OH beats CH$_3$ because O > C.',
        ],
      },
      {
        prompt: 'Why does racemization happen when a chiral center goes through a planar intermediate?',
        answer: 'The planar (sp$^2$) intermediate can be attacked from either face with equal probability, producing both enantiomers 50/50.',
        steps: [
          'Example: S$_N$1 creates a carbocation (sp$^2$, planar).',
          'Nu can attack the top or bottom face.',
          'If both faces are equally accessible, you get a racemate.',
        ],
      },
    ];

    PS.registerTopic("chem-org-stereo", {
      title: "Isomerism and chirality",
      description: "Structural, geometric, and optical isomers; R/S assignment; ee.",
      warmup: STEREO_STATIC,
      standard: STEREO_STATIC,
      challenge: STEREO_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 4: chem-org-mech  (Mechanisms: SN1, SN2, E1, E2, EAS)
    // ========================================================================

    var MECH_STATIC = [
      {
        prompt: 'Predict the mechanism: methyl bromide + sodium iodide in acetone.',
        answer: 'S$_N$2',
        steps: [
          'Primary (actually methyl) substrate — no carbocation possible.',
          'Strong nucleophile I$^-$ in polar aprotic solvent.',
          'S$_N$2 is strongly favored.',
        ],
      },
      {
        prompt: 'Predict the mechanism: tert-butyl chloride + water.',
        answer: 'S$_N$1 (with some E1)',
        steps: [
          '3° substrate forms a stable carbocation.',
          'Weak nucleophile (water) + polar protic solvent (also water).',
          'S$_N$1 dominates; E1 gives some alkene side product.',
        ],
      },
      {
        prompt: 'S$_N$2 rate law?',
        answer: 'rate $= k[\\text{substrate}][\\text{Nu}]$',
        steps: [
          'Concerted bimolecular reaction.',
          'First order in each; second order overall.',
        ],
      },
      {
        prompt: 'S$_N$1 rate law?',
        answer: 'rate $= k[\\text{substrate}]$',
        steps: [
          'Rate-determining step is ionization (substrate alone).',
          'Nucleophile concentration does not enter.',
        ],
      },
      {
        prompt: 'Walden inversion: which mechanism produces it?',
        answer: 'S$_N$2',
        steps: [
          'Backside attack by Nu while LG departs.',
          'The three other substituents flip like an umbrella.',
          'Net: configuration at the carbon is inverted.',
        ],
      },
      {
        prompt: 'Which mechanism gives predominantly Zaitsev (more substituted) product?',
        answer: 'E2 with a small base; E1',
        steps: [
          'Thermodynamic product favored when you can equilibrate toward the more substituted (stabler) alkene.',
          'Small base → abstracts the more acidic $\\beta$-H, gives Zaitsev.',
          'Bulky base (tBuO$^-$) gives Hofmann (less substituted).',
        ],
      },
      {
        prompt: 'Why does E2 require antiperiplanar geometry?',
        answer: 'The orbitals of the departing H, the $\\sigma^*$ of the C–LG bond, and the forming $\\pi$ bond must align in one plane.',
        steps: [
          'Concerted process needs continuous orbital overlap.',
          'Anti-periplanar (180° dihedral) maximizes the overlap between the $\\sigma$(C–H) and $\\sigma^*$(C–LG).',
          'This is why certain ring conformations and configurations refuse to eliminate.',
        ],
      },
      {
        prompt: 'Electrophilic addition: HBr adds to propene. Where does the Br end up?',
        answer: 'On C2 (Markovnikov product: 2-bromopropane).',
        steps: [
          'Protonation on C1 gives a secondary carbocation (stable) at C2.',
          'Br$^-$ attacks C2.',
          'Markovnikov: Br on more-substituted C, H on less-substituted C.',
        ],
      },
      {
        prompt: 'Anti-Markovnikov addition of HBr requires what condition?',
        answer: 'Peroxides (radical initiator).',
        steps: [
          'Radical chain adds Br first, to give the more stable C radical on the more-substituted C.',
          'H then comes to the other end.',
          'Net: Br on less-substituted C.',
        ],
      },
      {
        prompt: 'Classify as activator or deactivator for EAS: –OCH$_3$, –NO$_2$, –Cl, –CH$_3$.',
        answer: '–OCH$_3$ activator (o/p); –NO$_2$ deactivator (m); –Cl deactivator (o/p); –CH$_3$ activator (o/p).',
        steps: [
          '–OCH$_3$: lone pair donates into ring — strong activator, ortho/para.',
          '–NO$_2$: withdraws by resonance and induction — strong deactivator, meta.',
          '–Cl: induction beats resonance — deactivator, but still o/p.',
          '–CH$_3$: hyperconjugation — weak activator, o/p.',
        ],
      },
      {
        prompt: 'Give the arenium (Wheland) intermediate in the nitration of benzene.',
        answer: 'Cyclohexadienyl cation with NO$_2$ on the sp$^3$ carbon and positive charge delocalized onto three ring carbons.',
        steps: [
          'NO$_2^+$ attacks a ring carbon, which becomes sp$^3$.',
          'Five-membered conjugated $\\pi$ system with +1 charge, resonance over three carbons.',
          'Base plucks off the H on that carbon to restore aromaticity.',
        ],
      },
      {
        prompt: 'Why does benzene undergo substitution, not addition, with Br$_2$/FeBr$_3$?',
        answer: 'Addition would destroy aromaticity (~36 kcal/mol stabilization); substitution preserves it.',
        steps: [
          'Direct addition to benzene would give cyclohexadiene and lose aromatic stabilization.',
          'EAS gives a bromobenzene with the ring still aromatic.',
          'The thermodynamic driving force of preserving aromaticity is huge.',
        ],
      },
      {
        prompt: 'In an S$_N$2 reaction, how does doubling both the substrate and the nucleophile affect the rate?',
        answer: 'The rate quadruples.',
        steps: [
          'Rate $= k[\\text{Nu}][\\text{RX}]$.',
          'Double both: rate $\\to 2\\cdot 2 \\cdot$ original = 4×.',
        ],
      },
      {
        prompt: 'Pick the stronger nucleophile in polar aprotic DMSO: I$^-$ or F$^-$?',
        answer: 'F$^-$',
        steps: [
          'In protic solvents, big polarizable anions (I$^-$, HS$^-$) are better nucleophiles because they are less solvated.',
          'In aprotic solvents like DMSO, the unsolvated small, charge-dense F$^-$ is more reactive.',
          'This solvent dependence is why DMSO/DMF are the go-to solvents for displacement reactions with "naked" anions.',
        ],
      },
      {
        prompt: 'In EAS on nitrobenzene, where does a new electrophile go?',
        answer: 'Meta position',
        steps: [
          '–NO$_2$ is a strong EWG and meta director.',
          'Resonance structures put positive character on the ortho/para carbons, destabilizing electrophile attack there.',
          'Meta attack avoids the cation directly next to the EWG.',
        ],
      },
    ];

    PS.registerTopic("chem-org-mech", {
      title: "Reaction mechanisms",
      description: "S$_N$1/S$_N$2/E1/E2, electrophilic addition, EAS directing effects.",
      warmup: MECH_STATIC,
      standard: MECH_STATIC,
      challenge: MECH_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 5: chem-org-retro  (Retrosynthesis)
    // ========================================================================

    var RETRO_STATIC = [
      {
        prompt: 'Retrosynthesis of diethyl ether. Disconnect and give forward route.',
        answer: 'Disconnect the C–O bond: two ethanol molecules, condensed by acid-catalyzed dehydration ($H_2SO_4$, heat).',
        steps: [
          '$CH_3CH_2-O-CH_2CH_3 \\Rightarrow 2\\,CH_3CH_2OH$.',
          'Forward: acid catalysis at 140°C gives Williamson-free etherification.',
        ],
      },
      {
        prompt: 'Target: 2-phenylethanol. Give a retrosynthesis from benzene and an alkene.',
        answer: '$PhCH_2CH_2OH \\Rightarrow PhH + CH_2=CH_2$ plus a subsequent hydration.',
        steps: [
          'Disconnect Ph–C bond: Ph$^-$ (from PhH) + electrophilic CH$_2$CH$_2$–OH equivalent.',
          'Forward: Friedel-Crafts alkylation is tricky here; a cleaner route is Ph–CH$_2$–CH$_2$OH from styrene hydration.',
        ],
      },
      {
        prompt: 'Target: aspirin (acetylsalicylic acid). Retrosynthesis.',
        answer: 'Salicylic acid + acetic anhydride (or acetyl chloride) → aspirin.',
        steps: [
          'Disconnect the ester linkage at acyl C–O.',
          'Synthons: acetyl cation (from acetic anhydride) + salicylate alkoxide.',
          'Forward: salicylic acid + (CH$_3$CO)$_2$O with acid catalysis.',
        ],
      },
      {
        prompt: 'Disconnect a simple secondary alcohol $CH_3CH(OH)CH_3$ retrosynthetically.',
        answer: '$CH_3CH(OH)CH_3 \\Rightarrow CH_3MgBr + CH_3CHO$ (Grignard on acetaldehyde).',
        steps: [
          'Disconnect C–C next to OH.',
          'Synthons: methyl carbanion + acetaldehyde.',
          'Real reagents: CH$_3$MgBr + CH$_3$CHO, then aqueous workup.',
        ],
      },
      {
        prompt: 'Retrosynthesis of 2-methylpent-3-yn-2-ol.',
        answer: '$(CH_3)_2C(OH)-C\\equiv C-CH_3 \\Rightarrow acetone + CH_3C\\equiv C^-$.',
        steps: [
          'Disconnect C–C bond $\\alpha$ to OH.',
          'Synthons: acetone electrophile + propynyl carbanion.',
          'Real: propyne + NaNH$_2$ → sodium propynide + acetone.',
        ],
      },
      {
        prompt: 'You want to make a ketone $CH_3-CO-CH_2-CH_2-CH_3$. Retrosynthesis using an alkyne hydration.',
        answer: 'Pent-1-yne + Hg$^{2+}$/H$_2$SO$_4$ (Markovnikov hydration) → 2-pentanone.',
        steps: [
          'Terminal alkyne hydration puts OH on more-substituted C, tautomerizes to ketone.',
          'CH$_3$(CH$_2$)$_2$C$\\equiv$CH → 2-pentanone.',
        ],
      },
      {
        prompt: 'Target: ibuprofen, $(CH_3)_2CHCH_2-C_6H_4-CH(CH_3)COOH$. Outline a retrosynthesis at high level.',
        answer: 'Disconnect the $\\alpha$-methyl (enolate alkylation) then the isobutyl group (Friedel-Crafts).',
        steps: [
          'Step 1: disconnect COOH$\\alpha$-methyl → p-isobutylphenylacetic acid + Me-X.',
          'Step 2: disconnect isobutyl on ring → benzene + isobutyl-X via Friedel-Crafts alkylation.',
          'Industrial Hoechst route uses a much more efficient Pd-catalyzed carbonylation; retrosynthesis on paper is only the starting point.',
        ],
      },
      {
        prompt: 'Target: ethyl propanoate, $CH_3CH_2COOCH_2CH_3$. Retrosynthesis.',
        answer: 'Propanoic acid + ethanol, Fischer esterification.',
        steps: [
          'Disconnect the ester C–O bond.',
          'Synthons: acyl cation + ethoxide.',
          'Forward: $CH_3CH_2COOH + CH_3CH_2OH + H_2SO_4 \\to$ ester + H$_2$O.',
        ],
      },
      {
        prompt: 'Target: benzoic acid. Retrosynthesis from toluene.',
        answer: 'Toluene → benzoic acid via side-chain oxidation with KMnO$_4$/heat.',
        steps: [
          'KMnO$_4$ oxidizes benzylic C–H bonds through the CH$_2$ to C=O and on to COOH.',
          'Net: PhCH$_3$ → PhCOOH.',
        ],
      },
      {
        prompt: 'You want a 1° amine via reductive amination. Retrosynthesis of benzylamine, $PhCH_2NH_2$.',
        answer: 'Benzaldehyde + NH$_3$ → imine → reduce with NaBH$_3$CN or H$_2$/Pd → PhCH$_2$NH$_2$.',
        steps: [
          'Benzaldehyde + NH$_3$ condenses to PhCH=NH.',
          'Reduction by hydride gives benzylamine.',
          'Reductive amination is preferred over direct alkylation because it avoids overalkylation.',
        ],
      },
      {
        prompt: 'Target: p-nitrobromobenzene. In what order do you install the two substituents?',
        answer: 'Bromine first, then nitrate.',
        steps: [
          'Br is a weak o/p director (deactivator).',
          'Installing Br first and then nitrating under EAS gives predominantly para-nitrobromobenzene.',
          'If you nitrated first, –NO$_2$ is a meta director, and subsequent bromination would give meta-bromonitrobenzene.',
        ],
      },
      {
        prompt: 'Target: phenol. Outline a retrosynthesis from benzene.',
        answer: 'Benzenesulfonic acid → NaOH fusion → phenol (historical Dow process). Modern: cumene process.',
        steps: [
          'Historical: sulfonate benzene, then fuse with NaOH at high temperature.',
          'Modern cumene process: benzene + propene → cumene → air oxidation → cumene hydroperoxide → phenol + acetone (both products sold).',
          'Direct C-H hydroxylation of benzene is still an active research problem.',
        ],
      },
      {
        prompt: 'Target: $CH_3CH_2CH=CH_2$ (1-butene). Retrosynthesis via elimination.',
        answer: '1-bromobutane + bulky base (tBuO$^-$) → 1-butene (Hofmann product).',
        steps: [
          '1° halide: E2 with bulky base gives the less substituted (Hofmann) alkene.',
          'Bulky base prefers abstraction of the less hindered primary H.',
        ],
      },
      {
        prompt: 'Target: acetone oxime, $(CH_3)_2C=N-OH$. Retrosynthesis.',
        answer: 'Acetone + hydroxylamine (NH$_2$OH), acid-catalyzed.',
        steps: [
          'Hydroxylamine is a nucleophile at N.',
          'Adds to ketone, eliminates water to give the oxime C=N-OH.',
        ],
      },
      {
        prompt: 'Target: any long-chain carboxylic acid from the corresponding alkene. General route.',
        answer: 'Oxidative cleavage: ozonolysis (O$_3$, then oxidative workup with H$_2$O$_2$) gives two carboxylic acids.',
        steps: [
          'O$_3$ adds across the C=C to give an ozonide.',
          'Oxidative workup cleaves to two –COOH fragments.',
          '(Reductive workup with Zn/AcOH or Me$_2$S gives aldehydes instead.)',
        ],
      },
    ];

    PS.registerTopic("chem-org-retro", {
      title: "Retrosynthesis",
      description: "Disconnection analysis for common organic targets.",
      warmup: RETRO_STATIC,
      standard: RETRO_STATIC,
      challenge: RETRO_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });
  }

  boot();
})();
