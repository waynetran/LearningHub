/*
 * LearningHub - Thermodynamics Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   phys-thermo-firstlaw  - first law, work, heat, ideal gas processes
 *   phys-thermo-secondlaw - second law, entropy, Carnot engines
 *   phys-thermo-statmech  - Boltzmann distribution, partition functions
 *
 * Constants:
 *   R  = 8.314 J/(mol K)
 *   kB = 1.381e-23 J/K
 *   NA = 6.022e23 /mol
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[thermo-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-thermo-firstlaw
  // ============================================================
  var FIRST_WARMUP = [
    {
      prompt: 'A gas absorbs $500\\,\\text{J}$ of heat and does $200\\,\\text{J}$ of work on its surroundings. What is $\\Delta U$?',
      answer: '$300\\,\\text{J}$',
      steps: [
        'First law: $\\Delta U = Q - W = 500 - 200 = 300\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A gas is compressed adiabatically. What happens to its temperature and why?',
      answer: 'Temperature rises. Adiabatic means $Q = 0$, and compression means work is done <em>on</em> the gas ($W < 0$ in our convention), so $\\Delta U = -W > 0$.',
      steps: [
        '$Q = 0$ adiabatic.',
        '$W < 0$ since the surroundings push inward.',
        '$\\Delta U = Q - W > 0 \\Rightarrow$ internal energy rises $\\Rightarrow$ temperature rises.',
      ],
    },
    {
      prompt: 'One mole of ideal gas at $300\\,\\text{K}$ in a $0.025\\,\\text{m}^3$ container. What is its pressure?',
      answer: '$\\approx 99{,}768\\,\\text{Pa}$ (about $1\\,\\text{atm}$)',
      steps: [
        'Ideal gas law: $P = nRT/V$.',
        '$P = (1)(8.314)(300)/0.025 = 2494.2/0.025 = 99{,}768\\,\\text{Pa}$.',
      ],
    },
    {
      prompt: 'The molar heat capacity at constant pressure $C_P$ exceeds $C_V$ by how much for any ideal gas?',
      answer: '$R \\approx 8.314\\,\\text{J/(mol K)}$',
      steps: [
        'Mayer\'s relation: $C_P - C_V = R$.',
        'The extra term is the work done pushing against external pressure during expansion.',
      ],
    },
    {
      prompt: 'For a monatomic ideal gas, what is $C_V$ in terms of $R$?',
      answer: '$C_V = \\tfrac{3}{2} R$',
      steps: [
        'Equipartition: 3 translational degrees of freedom, each contributing $\\tfrac{1}{2} k_B T$ per particle or $\\tfrac{1}{2} R$ per mole.',
        'So $U = \\tfrac{3}{2} n R T$, and $C_V = (\\partial U / \\partial T)_V / n = \\tfrac{3}{2} R$.',
      ],
    },
  ];

  var FIRST_STANDARD = [
    {
      prompt: 'Two moles of an ideal gas expand isothermally at $T = 400\\,\\text{K}$ from $V_1 = 0.01\\,\\text{m}^3$ to $V_2 = 0.04\\,\\text{m}^3$. Find the work done, the heat absorbed, and $\\Delta U$.',
      answer: '$W = Q \\approx 9224\\,\\text{J}$, $\\Delta U = 0$.',
      steps: [
        '$W = nRT\\ln(V_2/V_1) = (2)(8.314)(400)\\ln(4)$.',
        '$\\ln 4 \\approx 1.386$.',
        '$W \\approx (2)(8.314)(400)(1.386) \\approx 9223\\,\\text{J}$.',
        'Isothermal on ideal gas: $\\Delta U = 0$, so $Q = W$.',
      ],
    },
    {
      prompt: 'A monatomic ideal gas starts at $(P_1, V_1) = (10^5\\,\\text{Pa}, 0.01\\,\\text{m}^3)$ and expands at constant pressure to $V_2 = 0.02\\,\\text{m}^3$. Find the work and $\\Delta U$. (You may need $C_V = \\tfrac{3}{2} R$.)',
      answer: '$W = 1000\\,\\text{J}$, $\\Delta U = 1500\\,\\text{J}$, $Q = 2500\\,\\text{J}$.',
      steps: [
        '$W = P\\Delta V = 10^5 \\cdot 0.01 = 1000\\,\\text{J}$.',
        'For a monatomic gas, $U = \\tfrac{3}{2} n R T = \\tfrac{3}{2} P V$.',
        '$\\Delta U = \\tfrac{3}{2} P \\Delta V = 1500\\,\\text{J}$.',
        '$Q = \\Delta U + W = 2500\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A mole of ideal gas undergoes an adiabatic expansion from $T_1 = 500\\,\\text{K}$ to $T_2 = 400\\,\\text{K}$. With $\\gamma = 5/3$, find the work done.',
      answer: '$W \\approx 1247\\,\\text{J}$',
      steps: [
        'Adiabatic: $Q = 0$, so $\\Delta U = -W$.',
        '$\\Delta U = n C_V \\Delta T = (1)(\\tfrac{3}{2} R)(-100) = -1247\\,\\text{J}$.',
        '$W = -\\Delta U \\approx 1247\\,\\text{J}$ (positive since the gas expands).',
      ],
    },
    {
      prompt: 'Why does a bicycle pump handle get hot when you pump quickly?',
      answer: 'Fast compression is approximately adiabatic: $Q \\approx 0$, so all the work you do on the gas becomes internal energy, raising its temperature.',
      steps: [
        'Fast enough that little heat escapes: adiabatic.',
        'Compression means work is done on the gas.',
        '$\\Delta U > 0 \\Rightarrow T \\uparrow$.',
        'The heat transfers to the pump wall and to your hand.',
      ],
    },
    {
      prompt: 'Estimate the rms speed of a nitrogen ($m = 4.65\\times 10^{-26}\\,\\text{kg}$) molecule at room temperature $T = 300\\,\\text{K}$.',
      answer: '$\\approx 517\\,\\text{m/s}$',
      steps: [
        'From $\\tfrac{1}{2} m \\langle v^2\\rangle = \\tfrac{3}{2} k_B T$.',
        '$v_{\\text{rms}} = \\sqrt{3 k_B T / m} = \\sqrt{(3)(1.381\\times 10^{-23})(300)/(4.65\\times 10^{-26})}$.',
        '$= \\sqrt{2.674\\times 10^5} \\approx 517\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'A tire at $20^\\circ\\text{C}$ and $200\\,\\text{kPa}$ heats to $50^\\circ\\text{C}$. Assuming constant volume, find the new pressure.',
      answer: '$\\approx 220\\,\\text{kPa}$',
      steps: [
        'At constant $V$ and $n$: $P/T = \\text{const}$.',
        'Convert to kelvin: $T_1 = 293\\,\\text{K}$, $T_2 = 323\\,\\text{K}$.',
        '$P_2 = P_1 (T_2/T_1) = 200 \\cdot 323/293 \\approx 220\\,\\text{kPa}$.',
      ],
    },
    {
      prompt: 'Two moles of diatomic ideal gas ($\\gamma = 7/5$, $C_V = 5R/2$) are heated at constant volume from $300\\,\\text{K}$ to $400\\,\\text{K}$. How much heat?',
      answer: '$Q \\approx 4157\\,\\text{J}$',
      steps: [
        'At constant $V$, $Q = \\Delta U = n C_V \\Delta T$.',
        '$= (2)(5/2 \\cdot 8.314)(100) = 2(20.785)(100) \\approx 4157\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A $0.5\\,\\text{kg}$ block of aluminum ($c = 900\\,\\text{J/(kg K)}$) is heated from $20^\\circ\\text{C}$ to $100^\\circ\\text{C}$. How much heat?',
      answer: '$36{,}000\\,\\text{J}$',
      steps: [
        '$Q = m c \\Delta T = 0.5 \\cdot 900 \\cdot 80 = 36{,}000\\,\\text{J}$.',
      ],
    },
  ];

  var FIRST_CHALLENGE = [
    {
      prompt: 'Derive the adiabatic equation $PV^\\gamma = \\text{const}$ for an ideal gas.',
      answer: 'Derived below.',
      steps: [
        'First law for a reversible process: $dU = \\delta Q - \\delta W = 0 - P\\,dV$ for adiabatic.',
        'For an ideal gas, $dU = n C_V dT$.',
        'So $n C_V dT = -P dV$.',
        'Use $PV = nRT \\Rightarrow n dT = (P\\,dV + V\\,dP)/R$.',
        'Substitute: $(C_V/R)(P\\,dV + V\\,dP) = -P\\,dV$.',
        'Rearrange: $(C_V + R) P\\,dV = -C_V V\\,dP$, i.e. $C_P P\\,dV = -C_V V\\,dP$.',
        'Divide: $\\gamma dV/V = -dP/P$.',
        'Integrate: $\\gamma\\ln V + \\ln P = \\text{const}$, i.e. $PV^\\gamma = \\text{const}$.',
      ],
    },
    {
      prompt: 'A mole of monatomic ideal gas ($\\gamma = 5/3$) at $(P_0, V_0)$ is taken through the cycle: isochoric increase to $2 P_0$, isobaric expansion to $2 V_0$, isochoric drop to $P_0$, isobaric compression back to $V_0$. Sketch mentally and find the net work per cycle.',
      answer: '$W_{\\text{net}} = P_0 V_0$',
      steps: [
        'Isochoric steps do no work.',
        'Isobaric expansion at $2 P_0$ from $V_0$ to $2 V_0$: $W = 2 P_0 \\cdot V_0 = 2 P_0 V_0$.',
        'Isobaric compression at $P_0$ from $2 V_0$ to $V_0$: $W = P_0 \\cdot (-V_0) = -P_0 V_0$.',
        'Net: $2 P_0 V_0 - P_0 V_0 = P_0 V_0$.',
        'Graphically: the cycle traces a rectangle of area $P_0 \\cdot V_0$ in the $PV$ plane.',
      ],
    },
    {
      prompt: 'One mole of diatomic ideal gas is compressed adiabatically from $(1\\,\\text{atm}, 300\\,\\text{K})$ to $1/10$ of its original volume. Find the final temperature and pressure. $\\gamma = 7/5$.',
      answer: '$T_2 \\approx 753\\,\\text{K}$, $P_2 \\approx 25\\,\\text{atm}$.',
      steps: [
        'Adiabatic: $T V^{\\gamma-1} = \\text{const}$.',
        '$T_2 = T_1 (V_1/V_2)^{\\gamma-1} = 300 \\cdot 10^{0.4}$.',
        '$10^{0.4} \\approx 2.512$, so $T_2 \\approx 753\\,\\text{K}$.',
        'Pressure: $P V^\\gamma = \\text{const}$, so $P_2 = P_1 (V_1/V_2)^\\gamma = 1\\cdot 10^{1.4}$.',
        '$10^{1.4} \\approx 25.1$, so $P_2 \\approx 25\\,\\text{atm}$.',
        '(This is roughly what happens in a diesel engine compression stroke — hot enough to ignite the fuel without a spark.)',
      ],
    },
  ];

  PS.registerTopic("phys-thermo-firstlaw", {
    title: "First law and ideal gas",
    description: "Energy accounting for gas processes — isothermal, adiabatic, isobaric, isochoric.",
    warmup: FIRST_WARMUP,
    standard: FIRST_STANDARD,
    challenge: FIRST_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-thermo-secondlaw
  // ============================================================
  var SECOND_WARMUP = [
    {
      prompt: 'A Carnot engine operates between $T_H = 600\\,\\text{K}$ and $T_C = 300\\,\\text{K}$. What is its efficiency?',
      answer: '$50\\%$',
      steps: [
        '$\\eta = 1 - T_C/T_H = 1 - 300/600 = 0.5$.',
      ],
    },
    {
      prompt: 'Why can you not build an engine with $T_C = 0\\,\\text{K}$ that achieves $100\\%$ efficiency?',
      answer: 'The third law: absolute zero is unreachable in any finite number of steps.',
      steps: [
        'Even approaching $T_C = 0$ requires an infinite sequence of cooling operations.',
        'Practically, no reservoir at $T = 0$ exists.',
      ],
    },
    {
      prompt: 'State the second law in the "entropy" form.',
      answer: 'The total entropy of an isolated system never decreases: $\\Delta S \\ge 0$, with equality only for reversible processes.',
      steps: [
        '"System" here means the system plus its thermally connected surroundings.',
        'Strict inequality for any real (irreversible) process.',
      ],
    },
    {
      prompt: 'A reservoir at $300\\,\\text{K}$ absorbs $600\\,\\text{J}$ of heat reversibly. What is its entropy change?',
      answer: '$+2\\,\\text{J/K}$',
      steps: [
        '$\\Delta S = Q/T = 600/300 = 2\\,\\text{J/K}$.',
      ],
    },
    {
      prompt: 'What is a "reservoir" in thermodynamics?',
      answer: 'A body so large that its temperature stays essentially constant as it absorbs or releases any realistic amount of heat.',
      steps: [
        'Infinite heat capacity is the limiting idealization.',
        'Real examples: oceans, the atmosphere, a very large ice bath.',
      ],
    },
  ];

  var SECOND_STANDARD = [
    {
      prompt: 'A Carnot engine takes in $1000\\,\\text{J}$ of heat from a $500\\,\\text{K}$ reservoir and rejects heat to a $300\\,\\text{K}$ reservoir. How much work does it produce?',
      answer: '$400\\,\\text{J}$',
      steps: [
        '$\\eta = 1 - T_C/T_H = 1 - 300/500 = 0.4$.',
        '$W = \\eta Q_H = 0.4 \\cdot 1000 = 400\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'Heat $Q = 500\\,\\text{J}$ flows from a reservoir at $400\\,\\text{K}$ to one at $300\\,\\text{K}$. Find the total entropy change.',
      answer: '$+0.417\\,\\text{J/K}$',
      steps: [
        '$\\Delta S_H = -Q/T_H = -500/400 = -1.25\\,\\text{J/K}$.',
        '$\\Delta S_C = +Q/T_C = +500/300 \\approx +1.667\\,\\text{J/K}$.',
        'Total: $\\approx +0.417\\,\\text{J/K}$, which is positive as the second law requires.',
      ],
    },
    {
      prompt: 'A coal plant operates between $800\\,\\text{K}$ and $300\\,\\text{K}$ and produces $1\\,\\text{GW}$ of electrical power at its real thermal efficiency of $40\\%$. How much heat does it dump per second into the cooling water?',
      answer: '$1.5\\,\\text{GJ/s}$ (that is, $1.5\\,\\text{GW}$)',
      steps: [
        'At $40\\%$ efficiency, for $1\\,\\text{GW}$ of work, the fuel must supply $1/0.4 = 2.5\\,\\text{GW}$.',
        'Waste heat: $2.5 - 1.0 = 1.5\\,\\text{GW}$.',
        'Notice this is the real, not Carnot, efficiency; Carnot would give $1 - 300/800 = 0.625$.',
      ],
    },
    {
      prompt: 'A refrigerator runs between $T_C = 260\\,\\text{K}$ and $T_H = 300\\,\\text{K}$. What is its theoretical maximum coefficient of performance?',
      answer: '$\\text{COP}_{\\max} = 6.5$',
      steps: [
        '$\\text{COP}_{\\text{Carnot,ref}} = T_C/(T_H - T_C) = 260/40 = 6.5$.',
        'Each joule of electricity can in principle move $6.5$ joules of heat out of the cold box.',
      ],
    },
    {
      prompt: 'One mole of ideal gas is isothermally expanded from $V$ to $2 V$. By how much does the gas\'s entropy change?',
      answer: '$\\Delta S = R \\ln 2 \\approx 5.76\\,\\text{J/K}$',
      steps: [
        'Isothermal: $\\Delta U = 0$, so $Q = W = nRT\\ln(V_2/V_1)$.',
        '$\\Delta S = Q/T = nR\\ln(V_2/V_1) = R\\ln 2 \\approx 5.76\\,\\text{J/K}$.',
      ],
    },
    {
      prompt: 'A $1\\,\\text{kg}$ ice cube at $0^\\circ\\text{C}$ melts in water at $20^\\circ\\text{C}$. Heat of fusion $L_f = 3.34\\times 10^5\\,\\text{J/kg}$. Estimate the total entropy change of the universe (ice + reservoir).',
      answer: '$\\approx +85\\,\\text{J/K}$',
      steps: [
        'Heat required to melt: $Q = m L_f = 3.34\\times 10^5\\,\\text{J}$.',
        'Entropy of ice (absorbing reversibly at $273\\,\\text{K}$): $\\Delta S_{\\text{ice}} = Q/273 \\approx +1224\\,\\text{J/K}$.',
        'Entropy of reservoir at $293\\,\\text{K}$: $\\Delta S_{\\text{res}} = -Q/293 \\approx -1140\\,\\text{J/K}$.',
        'Total: $\\approx +85\\,\\text{J/K}$ — positive, as required.',
      ],
    },
    {
      prompt: 'Two $1\\,\\text{kg}$ blocks, one at $400\\,\\text{K}$ and one at $200\\,\\text{K}$, are brought into thermal contact in isolation. Each has $c = 1\\,\\text{J/(kg K)}$. Find the final temperature and the total entropy change.',
      answer: '$T_f = 300\\,\\text{K}$; $\\Delta S \\approx +0.118\\,\\text{J/K}$.',
      steps: [
        'Equal heat capacities, so energy conservation gives $T_f = (T_1 + T_2)/2 = 300\\,\\text{K}$.',
        'Entropy change for a constant-$c$ block warming/cooling reversibly between $T_i$ and $T_f$: $\\Delta S = m c \\ln(T_f/T_i)$.',
        '$\\Delta S_1 = (1)(1)\\ln(300/400) \\approx -0.2877\\,\\text{J/K}$ (hot block cooling).',
        '$\\Delta S_2 = (1)(1)\\ln(300/200) \\approx +0.4055\\,\\text{J/K}$ (cold block warming).',
        'Total: $\\approx +0.118\\,\\text{J/K}$, positive as required.',
      ],
    },
  ];

  var SECOND_CHALLENGE = [
    {
      prompt: 'Show that a heat engine operating between two reservoirs cannot exceed the Carnot efficiency without violating the second law.',
      answer: 'Proof by contradiction (Carnot\'s theorem).',
      steps: [
        'Suppose an engine $X$ with efficiency $\\eta_X > \\eta_{\\text{Carnot}}$ exists.',
        'Run $X$ forward to produce work $W$ from $Q_H^X$ absorbed.',
        'Use that $W$ to run a reverse Carnot (heat pump) between the same reservoirs, extracting $Q_C^{\\text{C}}$ from cold and delivering $Q_H^{\\text{C}}$ to hot.',
        'Net work is zero. Net effect on hot reservoir: $Q_H^C - Q_H^X = -\\Delta < 0$ since $W/\\eta_X < W/\\eta_{\\text{Carnot}}$.',
        'So heat is removed from cold and delivered to hot with no net work — Clausius forbids this.',
        'Contradiction; no engine beats Carnot.',
      ],
    },
    {
      prompt: 'Show that entropy of an ideal gas changes according to $\\Delta S = n C_V \\ln(T_2/T_1) + n R \\ln(V_2/V_1)$ for any reversible path.',
      answer: 'Derived below.',
      steps: [
        'Reversible first law: $T dS = dU + P dV = n C_V dT + (nRT/V) dV$.',
        'Divide by $T$: $dS = n C_V (dT/T) + n R (dV/V)$.',
        'Integrate: $\\Delta S = n C_V\\ln(T_2/T_1) + n R\\ln(V_2/V_1)$.',
        'Since $S$ is a state function, this is valid for any path connecting the two states.',
      ],
    },
    {
      prompt: 'A mole of ideal gas undergoes free expansion from $V$ to $2 V$ (into vacuum, insulated). Find $Q$, $W$, $\\Delta U$, $\\Delta T$, and $\\Delta S$.',
      answer: '$Q = W = 0$, $\\Delta U = 0$, $\\Delta T = 0$, $\\Delta S = R\\ln 2 > 0$.',
      steps: [
        'No heat exchanged (insulated): $Q = 0$.',
        'Free expansion: pushes on vacuum, no work: $W = 0$.',
        'First law: $\\Delta U = 0$.',
        'For an ideal gas, $U$ depends only on $T$, so $\\Delta T = 0$.',
        'Entropy is a state function; compute along a reversible isothermal path from the same initial to final state: $\\Delta S = nR\\ln 2 > 0$.',
        'The process is irreversible — you cannot un-expand the gas without doing work.',
      ],
    },
    {
      prompt: 'Explain why Maxwell\'s demon, if it could exist, would violate the second law — and why it does not.',
      answer: 'The demon appears to sort molecules into fast and slow, creating a temperature gradient with no work. But measuring and remembering which molecule is which raises the demon\'s own entropy; erasing that memory (Landauer\'s principle) costs $k_B T\\ln 2$ per bit, restoring second-law balance.',
      steps: [
        'Original setup (1867): a clever microscopic gatekeeper selectively opens a door to let fast molecules pass one way and slow ones the other.',
        'Naive conclusion: temperature gradient built from nothing — violates second law.',
        'Bennett and Landauer showed the demon must store information to decide; erasing a bit is thermodynamically irreversible.',
        'Total entropy (gas + demon + memory) does not decrease; the second law survives.',
      ],
    },
  ];

  PS.registerTopic("phys-thermo-secondlaw", {
    title: "Second law, entropy, and Carnot engines",
    description: "Entropy bookkeeping and the efficiency limits of heat engines and refrigerators.",
    warmup: SECOND_WARMUP,
    standard: SECOND_STANDARD,
    challenge: SECOND_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-thermo-statmech
  // ============================================================
  var STAT_WARMUP = [
    {
      prompt: 'State Boltzmann\'s entropy formula.',
      answer: '$S = k_B \\ln \\Omega$',
      steps: [
        'Here $\\Omega$ is the number of microstates compatible with the given macrostate.',
        '$k_B$ converts microscopic counting (dimensionless) to entropy units (J/K).',
      ],
    },
    {
      prompt: 'Write the Boltzmann factor for a state of energy $E$ at temperature $T$.',
      answer: '$e^{-E/k_B T}$',
      steps: [
        'The probability of any specific microstate of energy $E$ is proportional to this factor.',
        'Normalizing by the partition function $Z$ gives the actual probability.',
      ],
    },
    {
      prompt: 'What is $k_B T$ at room temperature ($T = 300\\,\\text{K}$) in eV?',
      answer: '$\\approx 0.0259\\,\\text{eV}$',
      steps: [
        '$k_B T = (1.381\\times 10^{-23})(300) \\approx 4.14\\times 10^{-21}\\,\\text{J}$.',
        '$1\\,\\text{eV} = 1.602\\times 10^{-19}\\,\\text{J}$.',
        '$k_B T / e \\approx 0.0259\\,\\text{V}$, i.e. about $1/40\\,\\text{eV}$.',
      ],
    },
    {
      prompt: 'At room temperature, the ratio of populations in two states $E_1 = 0$ and $E_2 = 0.1\\,\\text{eV}$ is about what?',
      answer: '$\\approx e^{-4} \\approx 0.018$',
      steps: [
        '$p_2/p_1 = e^{-(E_2 - E_1)/k_B T}$.',
        '$(E_2 - E_1)/k_B T = 0.1/0.025 = 4$.',
        '$e^{-4} \\approx 0.0183$.',
      ],
    },
  ];

  var STAT_STANDARD = [
    {
      prompt: 'A system has two microstates: energy $0$ and energy $\\epsilon$. Write down the partition function and the average energy.',
      answer: '$Z = 1 + e^{-\\beta\\epsilon}$; $\\langle E\\rangle = \\epsilon/(e^{\\beta\\epsilon} + 1)$.',
      steps: [
        'Partition function: sum of Boltzmann weights, $Z = 1 + e^{-\\beta\\epsilon}$ where $\\beta = 1/k_B T$.',
        'Average energy: $\\langle E\\rangle = (0 \\cdot 1 + \\epsilon \\cdot e^{-\\beta\\epsilon})/Z = \\epsilon e^{-\\beta\\epsilon}/(1 + e^{-\\beta\\epsilon}) = \\epsilon/(e^{\\beta\\epsilon} + 1)$.',
        'At high $T$ ($\\beta\\epsilon \\ll 1$): $\\langle E\\rangle \\to \\epsilon/2$.',
        'At low $T$: $\\langle E\\rangle \\to 0$, system mostly in ground state.',
      ],
    },
    {
      prompt: 'Use equipartition to show that the internal energy of $n$ moles of a monatomic ideal gas is $\\tfrac{3}{2} nRT$.',
      answer: 'Derived below.',
      steps: [
        'Each atom has three translational degrees of freedom.',
        'Equipartition: average energy per quadratic DOF is $\\tfrac{1}{2} k_B T$.',
        'Per atom: $\\tfrac{3}{2} k_B T$. Total for $N$ atoms: $\\tfrac{3}{2} N k_B T = \\tfrac{3}{2} n R T$.',
      ],
    },
    {
      prompt: 'The most-probable speed of a Maxwell-Boltzmann distribution is $v_p = \\sqrt{2 k_B T/m}$. Find $v_p$ for nitrogen ($m = 4.65\\times 10^{-26}\\,\\text{kg}$) at $300\\,\\text{K}$.',
      answer: '$\\approx 422\\,\\text{m/s}$',
      steps: [
        '$v_p^2 = 2 k_B T / m = (2)(1.381\\times 10^{-23})(300)/(4.65\\times 10^{-26})$.',
        '$= (8.286\\times 10^{-21})/(4.65\\times 10^{-26}) \\approx 1.782\\times 10^5$.',
        '$v_p \\approx 422\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'For a Maxwell-Boltzmann distribution, rank the three speeds: most probable $v_p$, mean $\\bar v$, and rms $v_{\\text{rms}}$.',
      answer: '$v_p < \\bar v < v_{\\text{rms}}$; ratios are $\\sqrt{2} : \\sqrt{8/\\pi} : \\sqrt{3}$.',
      steps: [
        '$v_p = \\sqrt{2 k_B T/m}$.',
        '$\\bar v = \\sqrt{8 k_B T/(\\pi m)}$.',
        '$v_{\\text{rms}} = \\sqrt{3 k_B T/m}$.',
        'Numerically: $\\sqrt{2} \\approx 1.414$, $\\sqrt{8/\\pi} \\approx 1.596$, $\\sqrt{3} \\approx 1.732$, so $v_p < \\bar v < v_{\\text{rms}}$.',
      ],
    },
    {
      prompt: 'Using equipartition, explain why the molar heat capacity of a diatomic gas at room temperature is $\\tfrac{5}{2} R$.',
      answer: 'Three translational + two rotational degrees of freedom contribute, each adding $\\tfrac{1}{2} R$ per mole. Vibrations are "frozen out" at room temperature.',
      steps: [
        'A diatomic molecule has 3 translational DOF.',
        'It also has 2 rotational DOF (rotation about the bond axis contributes nothing because the moment of inertia about it is negligible).',
        'Each contributes $\\tfrac{1}{2} k_B T$ per molecule, or $\\tfrac{1}{2} R$ per mole.',
        'Total: $\\tfrac{5}{2} R$ at room temperature.',
        'Vibrational DOF would add another $R$ (kinetic + potential) but require $k_B T$ much greater than the vibrational quantum, unreachable at 300 K.',
      ],
    },
    {
      prompt: 'Explain qualitatively why the Dulong-Petit law says molar heat capacity of a solid is $3 R$.',
      answer: 'Each atom in a solid oscillates in 3 dimensions with a quadratic potential, contributing $3 \\cdot (\\tfrac{1}{2} + \\tfrac{1}{2}) k_B T = 3 k_B T$ per atom by equipartition. Per mole: $3 R$.',
      steps: [
        'An atom in a solid can oscillate in 3 independent directions.',
        'Each direction has kinetic $\\tfrac{1}{2} m\\dot x^2$ and potential $\\tfrac{1}{2} k x^2$.',
        'Equipartition: each quadratic term averages $\\tfrac{1}{2} k_B T$, for a total of $k_B T$ per direction.',
        '$3 k_B T$ per atom, $3 R$ per mole.',
        'Deviations at low $T$ were a key motivation for quantum theory.',
      ],
    },
    {
      prompt: 'Estimate the fraction of water molecules with enough kinetic energy to escape Earth\'s gravity at the top of the atmosphere ($T \\approx 1000\\,\\text{K}$, escape speed $11.2\\,\\text{km/s}$).',
      answer: 'Essentially zero for H2O; but for atomic hydrogen it is a meaningful fraction, which is why Earth has lost its hydrogen over billions of years.',
      steps: [
        'Check the ratio $mv_{\\text{esc}}^2/(2 k_B T)$ for H2O (mass $3\\times 10^{-26}\\,\\text{kg}$).',
        '$mv^2/2 = (3\\times 10^{-26})(1.25\\times 10^8)/2 \\approx 1.88\\times 10^{-18}\\,\\text{J}$.',
        '$k_B T \\approx 1.38\\times 10^{-20}\\,\\text{J}$.',
        'Ratio $\\approx 136$; Boltzmann factor $e^{-136}$, vanishingly small.',
        'For H atoms (mass $1.67\\times 10^{-27}$), ratio is $\\approx 7.5$, giving $e^{-7.5} \\approx 5.5\\times 10^{-4}$ — small but nonzero, and over geological time it adds up.',
      ],
    },
  ];

  var STAT_CHALLENGE = [
    {
      prompt: 'Derive the Maxwell-Boltzmann speed distribution from the 3D Gaussian velocity distribution $f(v_x, v_y, v_z) \\propto \\exp(-m(v_x^2 + v_y^2 + v_z^2)/(2 k_B T))$.',
      answer: '$f(v) = 4\\pi\\left(m/(2\\pi k_B T)\\right)^{3/2} v^2 e^{-m v^2/(2 k_B T)}$',
      steps: [
        'Start with the 3D Gaussian, normalized so that $\\int f\\,d^3 v = 1$: prefactor $(m/(2\\pi k_B T))^{3/2}$.',
        'Convert to spherical coordinates in velocity space: $d^3 v = 4\\pi v^2 dv$.',
        'Distribution of speeds: $f(v) dv = 4\\pi v^2 (m/(2\\pi k_B T))^{3/2} e^{-m v^2/(2 k_B T)} dv$.',
        'The $v^2$ factor is the surface of a sphere of radius $v$; it dominates the small-$v$ behavior.',
        'The exponential dominates the large-$v$ cutoff; together they produce the characteristic skewed peak.',
      ],
    },
    {
      prompt: 'Show that the entropy of a two-state system with populations $n$ and $N - n$ is maximized at $n = N/2$.',
      answer: 'Derived below.',
      steps: [
        'Number of microstates: $\\Omega = \\binom{N}{n}$.',
        '$S = k_B\\ln\\binom{N}{n}$.',
        'By Stirling, $\\ln\\binom{N}{n} = N\\ln N - n\\ln n - (N - n)\\ln(N - n)$ (ignoring lower-order terms).',
        'Differentiate with respect to $n$ and set to zero: $-\\ln n + \\ln(N - n) = 0$, so $n = N - n$, i.e. $n = N/2$.',
        'Maximum entropy at equal populations, which is also the high-temperature limit of the Boltzmann distribution.',
      ],
    },
    {
      prompt: 'A polymer chain of $N$ links can point forward (+1) or backward (-1). Derive the entropy as a function of net displacement $m = n_+ - n_-$ and show it is maximum at $m = 0$.',
      answer: 'Derived below.',
      steps: [
        'Let $n_\\pm = (N \\pm m)/2$. Number of microstates: $\\Omega = N!/(n_+! n_-!)$.',
        '$S = k_B\\ln\\Omega$.',
        'Using Stirling and expanding for small $m/N$: $S \\approx N k_B\\ln 2 - k_B m^2/(2 N)$.',
        'Maximum at $m = 0$; quadratic falloff gives a Gaussian distribution of end-to-end distances.',
        '(This is the standard model of polymer elasticity and ideal rubber.)',
      ],
    },
    {
      prompt: 'Compute the partition function of a simple harmonic oscillator with levels $E_n = (n + \\tfrac{1}{2})\\hbar\\omega$, and use it to find $\\langle E\\rangle$.',
      answer: '$Z = e^{-\\beta\\hbar\\omega/2}/(1 - e^{-\\beta\\hbar\\omega})$; $\\langle E\\rangle = \\hbar\\omega\\left(\\tfrac{1}{2} + 1/(e^{\\beta\\hbar\\omega} - 1)\\right)$.',
      steps: [
        'Sum a geometric series: $Z = \\sum_{n=0}^\\infty e^{-\\beta(n+1/2)\\hbar\\omega}$.',
        '$= e^{-\\beta\\hbar\\omega/2}\\sum_{n=0}^\\infty (e^{-\\beta\\hbar\\omega})^n = e^{-\\beta\\hbar\\omega/2}/(1 - e^{-\\beta\\hbar\\omega})$.',
        '$\\langle E\\rangle = -\\partial\\ln Z/\\partial\\beta = \\hbar\\omega/2 + \\hbar\\omega/(e^{\\beta\\hbar\\omega} - 1)$.',
        'High $T$: $\\langle E\\rangle \\to k_B T$ (classical equipartition).',
        'Low $T$: $\\langle E\\rangle \\to \\hbar\\omega/2$ (zero-point energy only).',
      ],
    },
  ];

  PS.registerTopic("phys-thermo-statmech", {
    title: "Statistical mechanics and the Boltzmann distribution",
    description: "Counting microstates, partition functions, and the microscopic origin of entropy.",
    warmup: STAT_WARMUP,
    standard: STAT_STANDARD,
    challenge: STAT_CHALLENGE,
  });

})();
