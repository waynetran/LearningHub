/*
 * LearningHub - Biochemistry Problem Set
 * Registers topics: chem-bio-aa-protein, chem-bio-mm, chem-bio-metabolism
 */
(function () {
  "use strict";

  function boot() {
    if (!window.LearningHubProblemSet) {
      return setTimeout(boot, 50);
    }
    var PS = window.LearningHubProblemSet;

    // ========================================================================
    // TOPIC 1: chem-bio-aa-protein
    // ========================================================================

    var AA_STATIC = [
      {
        prompt: 'How many standard amino acids are there, and how are they all distinguished?',
        answer: '20, distinguished by side chain (R group).',
        steps: [
          'All share the same backbone: $H_3N^+-CH(R)-COO^-$.',
          'The only difference is the identity of the side chain $R$.',
          'There are 20 side chains in the standard genetic code (21 if you count selenocysteine).',
        ],
      },
      {
        prompt: 'What is the isoelectric point (pI) of a typical uncharged amino acid like alanine?',
        answer: 'About 6.0',
        steps: [
          'pI is the pH at which net charge = 0.',
          'For alanine: $pK_a$(COOH) $\\approx 2.3$, $pK_a$(NH$_3^+$) $\\approx 9.7$.',
          'pI = average = $(2.3 + 9.7)/2 = 6.0$.',
        ],
      },
      {
        prompt: 'Which amino acid has a side chain $pK_a$ near 6, making it uniquely useful for acid-base catalysis at physiological pH?',
        answer: 'Histidine',
        steps: [
          'His imidazole has $pK_a \\approx 6.0$.',
          'At pH 7.4 some His residues are protonated and some are not — they can donate or accept a proton easily.',
          'This is why His shows up in countless enzyme active sites.',
        ],
      },
      {
        prompt: 'Which two amino acids can form a disulfide bond?',
        answer: 'Two cysteines (via their –SH groups).',
        steps: [
          'Oxidation: 2 R-SH → R-S-S-R + 2 H$^+$ + 2 e$^-$.',
          'Disulfide bonds stabilize tertiary and quaternary structure.',
          'Insulin has three disulfides holding its A and B chains together.',
        ],
      },
      {
        prompt: 'In a protein\'s $\\alpha$-helix, H-bonds form between which atoms?',
        answer: 'Backbone C=O of residue $i$ and backbone N–H of residue $i+4$.',
        steps: [
          '3.6 residues per turn.',
          'Every 4th residue donates a H to the C=O four back.',
          'Side chains point outward away from the helix axis.',
        ],
      },
      {
        prompt: 'What forces stabilize a protein\'s tertiary structure, in rough order of total contribution?',
        answer: 'Hydrophobic effect > H-bonds ≈ van der Waals > electrostatics > disulfides.',
        steps: [
          'Hydrophobic effect: nonpolar side chains exclude water and pack in the interior.',
          'H-bonds between backbone and between side chains provide directional interactions.',
          'vdW packing contributes a lot in the cumulative.',
          'Salt bridges and disulfides are structurally important but usually a smaller fraction of $\\Delta G_\\text{fold}$.',
        ],
      },
      {
        prompt: 'Peptide bond planarity: why is it flat?',
        answer: 'Partial double-bond character from resonance between the C=O and the N lone pair.',
        steps: [
          'The N lone pair donates into the C=O $\\pi^*$.',
          'That resonance makes the C-N bond have ~40% double-bond character.',
          'Rotation is restricted; the six atoms around the peptide bond lie in a plane.',
        ],
      },
      {
        prompt: 'Ramachandran plot: what axes and what does it tell you?',
        answer: '$\\phi$ vs $\\psi$ backbone dihedral angles; allowed vs forbidden regions due to steric clashes.',
        steps: [
          '$\\phi$ = N-C$_\\alpha$ rotation, $\\psi$ = C$_\\alpha$-C rotation.',
          'Allowed regions correspond to $\\alpha$-helix ($\\phi \\approx -60°, \\psi \\approx -45°$) and $\\beta$-sheet ($\\phi \\approx -120°, \\psi \\approx +130°$).',
          'Gly (no side chain) can access forbidden regions; Pro is heavily restricted in $\\phi$.',
        ],
      },
      {
        prompt: 'Hemoglobin has how many subunits, and what is its quaternary structure?',
        answer: '4 subunits ($\\alpha_2\\beta_2$ heterotetramer).',
        steps: [
          'Two $\\alpha$ chains + two $\\beta$ chains.',
          'Each subunit has a heme (Fe-porphyrin) that binds $O_2$.',
          'Cooperativity: binding at one heme increases affinity at the others (Hill coefficient ~2.8).',
        ],
      },
      {
        prompt: 'What does the Bohr effect describe in hemoglobin?',
        answer: 'Drop in $O_2$ affinity when pH drops (CO$_2$ or lactate rises).',
        steps: [
          'Active muscle produces CO$_2$ and lactate, lowering local pH.',
          'Lower pH stabilizes the T (tense, low-affinity) state of hemoglobin.',
          'This makes hemoglobin release $O_2$ exactly where the tissue needs it.',
        ],
      },
      {
        prompt: 'Anfinsen\'s classic experiment on ribonuclease A showed what principle?',
        answer: 'Primary sequence encodes native structure — denatured protein can refold spontaneously.',
        steps: [
          'He denatured RNase A in urea + $\\beta$-mercaptoethanol, breaking disulfides.',
          'Removed denaturants, the enzyme refolded and regained activity.',
          'Conclusion: all information for the native fold is in the sequence.',
          'Won the 1972 Nobel for this.',
        ],
      },
      {
        prompt: 'Why does boiling an egg white permanently denature it?',
        answer: 'Heat disrupts non-covalent interactions, and the exposed hydrophobic residues aggregate irreversibly.',
        steps: [
          'Albumin proteins unfold.',
          'Hydrophobic cores become exposed.',
          'Inter-protein hydrophobic contacts and new disulfide exchanges lock the aggregate.',
          'Reversing thermal denaturation is possible for many small proteins but not for a concentrated aggregated soup.',
        ],
      },
      {
        prompt: 'AlphaFold 2 (2020) took how much of the protein structure prediction problem off the table?',
        answer: 'Essentially all of the easy-to-medium single-chain case. It matches experimental accuracy on most sequences with known homologs.',
        steps: [
          'CASP14 showed median GDT_TS near 92/100 — within experimental uncertainty.',
          'Uses a multiple-sequence alignment (MSA) and a transformer-like Evoformer module.',
          'Harder problems remain: large assemblies, conformational dynamics, de novo proteins without homologs.',
        ],
      },
      {
        prompt: 'What is the difference between a prosthetic group and a substrate?',
        answer: 'Prosthetic groups are tightly bound cofactors that travel with the protein; substrates bind transiently and are chemically transformed.',
        steps: [
          'Heme in hemoglobin is a prosthetic group — covalently held or very tightly bound.',
          'Glucose is a substrate of hexokinase; it binds, gets phosphorylated, leaves.',
          'Prosthetic groups are typically required for the protein to fold or function.',
        ],
      },
      {
        prompt: 'A protein has molar absorptivity $\\epsilon_{280} = 20{,}000$ M$^{-1}$cm$^{-1}$. What is its concentration when $A_{280} = 0.4$ in a 1 cm cuvette?',
        answer: '20 μM',
        steps: [
          'Beer\'s law: $A = \\epsilon c \\ell$.',
          '$c = A / (\\epsilon \\ell) = 0.4 / (20000 \\cdot 1) = 2 \\times 10^{-5}$ M = 20 μM.',
        ],
      },
    ];

    PS.registerTopic("chem-bio-aa-protein", {
      title: "Amino acids and protein structure",
      description: "Residues, peptide bonds, 1° through 4° structure.",
      warmup: AA_STATIC,
      standard: AA_STATIC,
      challenge: AA_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 2: chem-bio-mm (Michaelis-Menten)
    // ========================================================================

    var MM_STATIC = [
      {
        prompt: 'State the Michaelis-Menten equation.',
        answer: '$v = V_{\\max}[S]/(K_m + [S])$',
        steps: [
          'Derived from steady-state assumption on $[ES]$.',
          'Two parameters: $V_{\\max}$ and $K_m$.',
        ],
      },
      {
        prompt: 'At what $[S]$ is the rate equal to $V_{\\max}/2$?',
        answer: '$[S] = K_m$',
        steps: [
          'Set $v = V_{\\max}/2$ and solve: $K_m + [S] = 2[S]$, so $[S] = K_m$.',
          'This is the defining property of $K_m$.',
        ],
      },
      {
        prompt: 'An enzyme has $k_{\\text{cat}} = 1000$ s$^{-1}$ and $K_m = 10$ μM. Compute $k_{\\text{cat}}/K_m$.',
        answer: '$10^8$ M$^{-1}$s$^{-1}$',
        steps: [
          '$K_m = 10 \\times 10^{-6}$ M.',
          '$k_{\\text{cat}}/K_m = 1000 / 10^{-5} = 10^8$ M$^{-1}$s$^{-1}$.',
          'At the diffusion limit — this enzyme is essentially kinetically perfect.',
        ],
      },
      {
        prompt: 'Catalase has $k_{\\text{cat}} \\approx 4 \\times 10^7$ s$^{-1}$. If $[E]_T = 1$ nM, what is $V_{\\max}$?',
        answer: '$V_{\\max} = 4 \\times 10^{-2}$ M/s = 40 mM/s',
        steps: [
          '$V_{\\max} = k_{\\text{cat}} [E]_T = 4 \\times 10^7 \\cdot 10^{-9}$ s$^{-1}$·M.',
          '$= 4 \\times 10^{-2}$ M/s.',
        ],
      },
      {
        prompt: 'A competitive inhibitor is present at $[I] = K_i$. What happens to the apparent $K_m$?',
        answer: 'It doubles: $K_m^\\text{app} = K_m(1 + [I]/K_i) = 2 K_m$.',
        steps: [
          'Competitive inhibitors raise apparent $K_m$ by the factor $(1 + [I]/K_i)$.',
          'At $[I] = K_i$, the factor is 2.',
          '$V_{\\max}$ is unchanged — enough substrate outcompetes the inhibitor.',
        ],
      },
      {
        prompt: 'What does a Lineweaver-Burk plot put on the axes?',
        answer: '$1/v$ vs $1/[S]$',
        steps: [
          'Double reciprocal of MM equation gives a straight line.',
          '$1/v = (K_m/V_{\\max}) (1/[S]) + 1/V_{\\max}$.',
          'Intercept on $1/v$ axis is $1/V_{\\max}$; on $1/[S]$ axis is $-1/K_m$.',
        ],
      },
      {
        prompt: 'A non-competitive inhibitor affects which MM parameter?',
        answer: 'Lowers $V_{\\max}$; $K_m$ unchanged.',
        steps: [
          'Inhibitor binds an allosteric site, removing active enzyme from the pool.',
          'Less active enzyme → lower $V_{\\max}$.',
          '$K_m$ (a property of the enzyme-substrate binding site) is unchanged.',
        ],
      },
      {
        prompt: 'You measure $v$ at $[S] = 0.5 K_m$. What fraction of $V_{\\max}$ is the rate?',
        answer: '$v/V_{\\max} = 1/3$',
        steps: [
          '$v/V_{\\max} = [S]/(K_m + [S]) = 0.5 K_m / (1.5 K_m) = 1/3$.',
        ],
      },
      {
        prompt: 'Why is the initial-rate assumption important in an MM assay?',
        answer: 'Only the initial rate reflects $[S] \\approx [S]_0$; later, $[S]$ drops and product inhibition may appear.',
        steps: [
          'The MM equation assumes a constant $[S]$ during the measurement.',
          'Early in the reaction, $[S]$ has barely changed from its initial value.',
          'If you wait too long, $[S]$ drops (and $[P]$ rises), and the apparent rate deviates from the true kinetic rate.',
        ],
      },
      {
        prompt: 'Aspirin irreversibly acetylates a serine in cyclooxygenase (COX). Is this competitive or non-competitive?',
        answer: 'Neither — it is irreversible (covalent) inactivation. Kinetically looks like non-competitive but is time-dependent.',
        steps: [
          'Aspirin acetylates Ser530 in COX, covalently.',
          'Once acetylated, the enzyme is dead — no amount of substrate rescues it.',
          'Apparent $V_{\\max}$ drops with time as more enzyme becomes acetylated.',
        ],
      },
      {
        prompt: 'An enzyme has $K_m = 100$ μM for its natural substrate A and $K_m = 2$ mM for an analogue B. Which binds tighter?',
        answer: 'A (smaller $K_m$ usually means higher affinity).',
        steps: [
          '$K_m$ roughly approximates a dissociation constant for the ES complex.',
          'Lower $K_m$ = lower $[S]$ needed to saturate = higher affinity.',
          'A has 20× lower $K_m$, so it binds about 20× tighter.',
        ],
      },
      {
        prompt: 'Define turnover number $k_{\\text{cat}}$ in words.',
        answer: 'Number of substrate molecules converted per active site per second at saturation.',
        steps: [
          'Units: s$^{-1}$.',
          'Range: fractional for slow enzymes like OMP decarboxylase, up to $\\sim 10^7$ for catalase.',
        ],
      },
      {
        prompt: 'What is the diffusion-limited rate constant for two small molecules meeting in water at 25°C?',
        answer: 'About $10^9$ to $10^{10}$ M$^{-1}$s$^{-1}$',
        steps: [
          'Smoluchowski formula gives $\\sim 10^{10}$ M$^{-1}$s$^{-1}$ for typical small molecules.',
          'For enzymes with larger effective radii it drops to $\\sim 10^8$-$10^9$.',
          'Enzymes can not react faster than their substrates can diffuse in.',
        ],
      },
      {
        prompt: 'Hexokinase has $K_m$ (glucose) ≈ 0.1 mM. Glucokinase (the liver isoform) has $K_m$ ≈ 10 mM. What is the physiological significance?',
        answer: 'Hexokinase is always saturated; glucokinase responds to blood glucose in the physiological range (~5 mM).',
        steps: [
          'Most tissues want to phosphorylate glucose whenever it is available — high-affinity hexokinase does this.',
          'Liver acts as a buffer: when blood glucose is high, glucokinase speeds up; when it is normal, glucokinase is operating below saturation.',
          'Different $K_m$ values implement different physiological roles.',
        ],
      },
      {
        prompt: 'If you double the enzyme concentration, what happens to $V_{\\max}$ and to $K_m$?',
        answer: '$V_{\\max}$ doubles; $K_m$ unchanged.',
        steps: [
          '$V_{\\max} = k_{\\text{cat}}[E]_T$, linear in enzyme concentration.',
          '$K_m$ is an intrinsic property of the enzyme, independent of its concentration.',
        ],
      },
    ];

    PS.registerTopic("chem-bio-mm", {
      title: "Enzymes and Michaelis-Menten",
      description: "Kinetic parameters, inhibition modes, catalytic efficiency.",
      warmup: MM_STATIC,
      standard: MM_STATIC,
      challenge: MM_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });

    // ========================================================================
    // TOPIC 3: chem-bio-metabolism
    // ========================================================================

    var MET_STATIC = [
      {
        prompt: 'Net ATP yield per glucose from glycolysis (substrate-level only).',
        answer: '2 ATP',
        steps: [
          '2 ATP consumed (hexokinase, PFK).',
          '4 ATP produced (phosphoglycerate kinase, pyruvate kinase).',
          'Net 2 ATP, plus 2 NADH that enter oxidative phosphorylation.',
        ],
      },
      {
        prompt: 'What is the ATP yield from complete aerobic oxidation of one glucose?',
        answer: '~30 ATP (textbook: 30-32 depending on shuttle assumptions).',
        steps: [
          '2 ATP from glycolysis.',
          '2 ATP (as GTP) from TCA cycle.',
          'NADH and FADH$_2$ through oxidative phosphorylation contribute the rest.',
          'Modern estimates are ~30 ATP total accounting for proton leaks and transport costs.',
        ],
      },
      {
        prompt: 'Why does anaerobic fermentation of glucose produce only 2 ATP?',
        answer: 'NADH can\'t be reoxidized without $O_2$, so only the substrate-level phosphorylation in glycolysis remains.',
        steps: [
          'NADH is regenerated to NAD$^+$ by reducing pyruvate to lactate (animals) or ethanol + CO$_2$ (yeast).',
          'No further ATP comes from that — it just keeps glycolysis running.',
          'OxPhos contributes nothing without $O_2$ to accept electrons.',
        ],
      },
      {
        prompt: 'What is the "committed" step of glycolysis, and what regulates it?',
        answer: 'Phosphofructokinase-1 (PFK-1) converts F6P to F1,6BP. Allosterically inhibited by ATP and citrate, activated by AMP and F2,6BP.',
        steps: [
          'First irreversible step unique to glycolysis (hexokinase produces G6P which can go to other pathways).',
          'PFK-1 senses cellular energy status via ATP/AMP ratio.',
          'Cross-regulated by the TCA cycle intermediate citrate.',
        ],
      },
      {
        prompt: 'Where does the TCA cycle happen in a eukaryotic cell?',
        answer: 'Mitochondrial matrix.',
        steps: [
          'Pyruvate enters mitochondrion, is converted to acetyl-CoA by pyruvate dehydrogenase.',
          'The TCA cycle runs in the matrix, feeding NADH and FADH$_2$ to the inner-membrane respiratory chain.',
        ],
      },
      {
        prompt: 'How many CO$_2$ are released per turn of the TCA cycle? Per glucose?',
        answer: '2 per turn; 6 per glucose (2 turns + 2 from PDH).',
        steps: [
          'Each turn of the TCA cycle releases 2 CO$_2$ (one from isocitrate DH, one from $\\alpha$-ketoglutarate DH).',
          'Pyruvate → acetyl-CoA releases 1 more CO$_2$ per pyruvate.',
          'Glucose yields 2 pyruvates so 2 turns: $2 + 2 \\times 2 = 6$ CO$_2$.',
        ],
      },
      {
        prompt: 'Name the four complexes of the electron transport chain.',
        answer: 'I (NADH dehydrogenase), II (succinate DH), III (cyt bc1), IV (cyt c oxidase).',
        steps: [
          'I: NADH → CoQ + pumps 4 H$^+$.',
          'II: FADH$_2$ → CoQ (no pumping).',
          'III: CoQH$_2$ → cyt c + pumps 4 H$^+$.',
          'IV: cyt c → $O_2 \\to H_2O$ + pumps 2 H$^+$.',
        ],
      },
      {
        prompt: 'Chemiosmotic theory: who proposed it and what does it say?',
        answer: 'Peter Mitchell (1961). ATP synthesis is coupled to a transmembrane proton gradient, not a direct chemical intermediate.',
        steps: [
          'Respiratory chain pumps H$^+$ across the inner membrane, storing energy as an electrochemical gradient.',
          'ATP synthase lets H$^+$ flow back, turning a rotor that phosphorylates ADP to ATP.',
          'Mitchell won the 1978 Nobel.',
        ],
      },
      {
        prompt: 'Cyanide and CO inhibit which respiratory complex?',
        answer: 'Complex IV (cytochrome c oxidase).',
        steps: [
          'Both bind the heme Fe at the $O_2$-binding site.',
          'Block electron transfer to $O_2$.',
          'Cells switch to anaerobic metabolism immediately; tissue with the highest $O_2$ demand (brain, heart) fails first.',
        ],
      },
      {
        prompt: 'The "P/O ratio" roughly captures what?',
        answer: 'ATP made per pair of electrons transferred through the ETC.',
        steps: [
          'NADH → full chain (Complexes I, III, IV) → ~2.5 ATP.',
          'FADH$_2$ → enters at Complex II, bypasses I → ~1.5 ATP.',
          'Historical textbooks quoted 3 and 2 — modern measurements are slightly lower.',
        ],
      },
      {
        prompt: 'In a Warburg-effect cancer cell, where does energy come from?',
        answer: 'Primarily aerobic glycolysis (lactate fermentation even in $O_2$), not OxPhos.',
        steps: [
          'Warburg (1920s) observed tumor cells make lactate even with abundant $O_2$.',
          'Rapidly dividing cells need carbon building blocks more than maximum ATP.',
          'This is exploited diagnostically: FDG-PET images glucose uptake, lighting up tumors.',
        ],
      },
      {
        prompt: 'The Cori cycle shuttles what between muscle and liver?',
        answer: 'Lactate (from muscle) → liver → glucose → back to muscle.',
        steps: [
          'Working muscle produces lactate.',
          'Lactate reaches the liver, is oxidized to pyruvate, and converted back to glucose via gluconeogenesis.',
          'Net: muscle burns 2 ATP per glucose; liver spends 6 ATP to regenerate glucose. Muscle offloads the metabolic bill.',
        ],
      },
      {
        prompt: 'How does the pentose phosphate pathway (PPP) differ from glycolysis?',
        answer: 'Produces NADPH (for biosynthesis and antioxidant defense) and ribose-5-phosphate (for nucleotides), not ATP.',
        steps: [
          'PPP shunts glucose-6-phosphate into an oxidative branch that makes 2 NADPH and CO$_2$.',
          'The non-oxidative branch shuffles sugars to produce ribose-5-P.',
          'Critical in tissues that synthesize a lot (liver, lactating mammary, adipose) and in red blood cells for glutathione recycling.',
        ],
      },
      {
        prompt: 'Free energy of ATP hydrolysis under cellular conditions, roughly?',
        answer: '$\\Delta G \\approx -50$ to $-60$ kJ/mol',
        steps: [
          'Standard $\\Delta G^{\\circ\\prime} \\approx -30$ kJ/mol (pH 7, 1 M reactants).',
          'Cellular $[ATP]/[ADP][P_i]$ ratio shifts this by ~$-20$ kJ/mol.',
          'Net: about $-50$ to $-60$ kJ/mol in the cell — plenty to drive uphill reactions.',
        ],
      },
      {
        prompt: 'Explain why one glucose equivalent fat is a denser fuel than one glucose equivalent carbohydrate.',
        answer: 'Fats are more reduced, so oxidizing them yields more electrons per carbon and thus more ATP per gram.',
        steps: [
          'Carbohydrate already has many C-O bonds; only some oxidation remains.',
          'Fatty acids have long C-H chains — each bond can be oxidized to CO$_2$ + H$_2$O.',
          '9 kcal/g for fat vs 4 kcal/g for carbohydrate.',
          'Which is why animals store long-term energy as fat, not glycogen.',
        ],
      },
    ];

    PS.registerTopic("chem-bio-metabolism", {
      title: "Metabolism and energetics",
      description: "Glycolysis, TCA, OxPhos, ATP yield.",
      warmup: MET_STATIC,
      standard: MET_STATIC,
      challenge: MET_STATIC,
      warmupCount: 5,
      standardCount: 5,
      challengeCount: 3,
    });
  }

  boot();
})();
