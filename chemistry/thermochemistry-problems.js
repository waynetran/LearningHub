/*
 * LearningHub - Thermochemistry Problem Set
 * Registers topics: chem-thermo-calc, chem-thermo-hess, chem-thermo-gibbs
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[thermochemistry-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC: chem-thermo-calc - calorimetry and heat capacity
  // ==========================================================================
  var STATIC_CALC_WARMUP = [
    {
      prompt: 'How much heat is required to raise 100 g of water from 25°C to 75°C? ($c = 4.18$ J/(g·K))',
      answer: '$20\\,900$ J $\\approx 20.9$ kJ',
      steps: [
        '$q = m c \\Delta T = 100 \\times 4.18 \\times 50 = 20900$ J.',
        'This is why boiling a liter of water from room temperature takes considerable energy.',
      ],
    },
    {
      prompt: 'A 10.0 g piece of copper ($c = 0.385$ J/(g·K)) absorbs 500 J. What is its temperature change?',
      answer: '$\\Delta T \\approx 130$ K',
      steps: [
        '$\\Delta T = q / (m c) = 500 / (10.0 \\times 0.385) = 130$ K.',
        'Copper has much lower specific heat than water, so it heats up much faster.',
      ],
    },
    {
      prompt: 'Which has higher specific heat per gram: water or iron?',
      answer: 'Water',
      steps: [
        'Water: 4.18 J/(g·K).',
        'Iron: 0.449 J/(g·K) - about 9$\\times$ smaller.',
        'Water\'s hydrogen-bond network stores energy in many vibrational modes.',
      ],
    },
    {
      prompt: 'Is the reaction $\\Delta H = -185$ kJ/mol endothermic or exothermic?',
      answer: 'Exothermic',
      steps: [
        'Negative $\\Delta H$ means the system releases heat to the surroundings.',
        'The reaction feels warm to the touch.',
      ],
    },
    {
      prompt: '50 g of water heats from 20°C to 23°C in a reaction. How much heat did the reaction release?',
      answer: '$627$ J',
      steps: [
        '$q_\\text{water} = 50 \\times 4.18 \\times 3 = 627$ J (absorbed by water).',
        'By energy balance, the reaction released 627 J.',
      ],
    },
    {
      prompt: 'What is the sign convention for $q$ when a system absorbs heat from its surroundings?',
      answer: '$q > 0$',
      steps: [
        'Heat into the system (absorbed) = positive $q$.',
        'Heat out of the system (released) = negative $q$.',
      ],
    },
    {
      prompt: 'What does a bomb calorimeter measure directly?',
      answer: '$\\Delta U$ (internal energy change) at constant volume.',
      steps: [
        'Bomb calorimeters seal reactants and do not allow volume change.',
        'At constant $V$: $q_V = \\Delta U$.',
        'For gases, $\\Delta H$ differs from $\\Delta U$ by $\\Delta n \\cdot RT$.',
      ],
    },
    {
      prompt: 'Why is water a good heat sink in a car radiator?',
      answer: 'Water has very high specific heat (4.18 J/(g·K)) and high enthalpy of vaporization.',
      steps: [
        'Each gram of water stores 4.18 J per degree of temperature rise.',
        'Plus, water can vaporize, absorbing an additional 2.26 kJ/g.',
        'Together, these properties make water an ideal coolant.',
      ],
    },
    {
      prompt: 'A coffee-cup calorimeter neglects the calorimeter heat capacity. Is the computed $|\\Delta H|$ too high or too low?',
      answer: 'Too low',
      steps: [
        'Some heat goes into warming the styrofoam and thermometer, not just the water.',
        'Ignoring that extra heat sink makes the measured temperature rise smaller than it should be.',
        'A smaller $\\Delta T$ gives a smaller estimated $q$ and thus smaller $|\\Delta H|$.',
      ],
    },
    {
      prompt: 'Heat of vaporization of water is 2260 J/g. How much energy does sweating 10 g of water off your skin remove?',
      answer: '$22\\,600$ J $\\approx 22.6$ kJ',
      steps: [
        '$q = m \\cdot \\Delta H_\\text{vap} = 10 \\times 2260 = 22600$ J.',
        'This is why evaporative cooling from sweat is so effective at regulating body temperature.',
      ],
    },
    {
      prompt: 'Ice has $\\Delta H_\\text{fus} = 6.01$ kJ/mol. How much heat is needed to melt 18 g (1 mol) of ice at 0°C?',
      answer: '$6.01$ kJ',
      steps: [
        '1 mole of ice = 18 g.',
        'Directly: $q = 1 \\times 6.01 = 6.01$ kJ.',
      ],
    },
    {
      prompt: 'In an exothermic reaction, what happens to the temperature of the surroundings?',
      answer: 'It rises (the surroundings absorb heat from the reaction).',
      steps: [
        'Exothermic = system releases heat.',
        'That heat flows to the surroundings, raising their temperature.',
      ],
    },
    {
      prompt: 'The specific heat of aluminum is 0.900 J/(g·K). A 25 g Al block at 100°C is dropped into 100 g of water at 22°C. Estimate the final temperature, ignoring the container.',
      answer: '$T_f \\approx 26.2$°C',
      steps: [
        'Heat lost by Al = heat gained by water.',
        '$25 \\times 0.900 \\times (100 - T_f) = 100 \\times 4.18 \\times (T_f - 22)$.',
        '$2250 - 22.5 T_f = 418 T_f - 9196$.',
        '$11446 = 440.5 T_f$, so $T_f \\approx 26.0$°C.',
      ],
    },
    {
      prompt: 'What is the SI unit of heat capacity $C_p$?',
      answer: 'J/K (or J/(mol·K) for molar, J/(g·K) for specific)',
      steps: [
        'Heat capacity is energy per kelvin.',
        'Base SI: joules per kelvin.',
      ],
    },
  ];

  var STATIC_CALC_STANDARD = [
    {
      prompt: 'A 3.0 g sample of naphthalene ($C_{10}H_8$, M = 128 g/mol) is burned in a bomb calorimeter with heat capacity 10.17 kJ/K. The temperature rises from 25.0°C to 30.6°C. Compute $\\Delta U$ per mole.',
      answer: '$\\Delta U \\approx -2431$ kJ/mol',
      steps: [
        'Heat released: $q = C_\\text{cal} \\Delta T = 10.17 \\times 5.6 = 56.95$ kJ.',
        'System (naphthalene): $q_\\text{rxn} = -56.95$ kJ.',
        'Moles: $3.0/128 = 0.02344$ mol.',
        '$\\Delta U = q_\\text{rxn} / n = -56.95/0.02344 = -2430$ kJ/mol.',
      ],
    },
    {
      prompt: 'You dissolve 5.00 g of $\\text{NH}_4\\text{NO}_3$ (M = 80.04 g/mol) in 50.0 g of water at 22.0°C. The temperature falls to 16.2°C. Compute $\\Delta H_\\text{soln}$ per mole of $\\text{NH}_4\\text{NO}_3$.',
      answer: '$\\Delta H_\\text{soln} \\approx +19.4$ kJ/mol (endothermic)',
      steps: [
        '$q_\\text{water} = 55.00 \\times 4.18 \\times (-5.8) = -1333$ J (water cools).',
        '$q_\\text{rxn} = +1333$ J (absorbed by dissolving).',
        'Moles: $5.00/80.04 = 0.0625$ mol.',
        '$\\Delta H_\\text{soln} = 1333/0.0625 = 21300$ J/mol $\\approx +21.3$ kJ/mol.',
        '(Literature: about +25.7 kJ/mol - close given the simple calorimeter.)',
      ],
    },
    {
      prompt: 'How much ice at 0°C will be melted by 100 g of water cooling from 25°C to 0°C? ($\\Delta H_\\text{fus} = 334$ J/g; $c_{\\text{H}_2\\text{O}} = 4.18$ J/(g·K))',
      answer: '$\\approx 31.3$ g of ice',
      steps: [
        'Heat available from cooling water: $q = 100 \\times 4.18 \\times 25 = 10450$ J.',
        'Mass of ice melted: $m = q / \\Delta H_\\text{fus} = 10450/334 \\approx 31.3$ g.',
      ],
    },
    {
      prompt: 'Calculate the final temperature when 50 g of water at 90°C is mixed with 50 g of water at 10°C, assuming no heat loss.',
      answer: '$50$°C',
      steps: [
        'Equal masses of the same substance: final $T$ is the average.',
        '$(90 + 10)/2 = 50$°C.',
        'Derived from: $m c (T_f - 90) + m c (T_f - 10) = 0$.',
      ],
    },
    {
      prompt: 'A 1.00 g sample of glucose ($C_6H_{12}O_6$, M = 180) is burned in a bomb calorimeter with $C_\\text{cal} = 1.50$ kJ/K. $\\Delta T = 10.5$°C. Compute $\\Delta U$ in kJ/mol.',
      answer: '$\\Delta U \\approx -2835$ kJ/mol',
      steps: [
        '$q = 1.50 \\times 10.5 = 15.75$ kJ absorbed by calorimeter.',
        '$q_\\text{rxn} = -15.75$ kJ per 1.00 g.',
        'Moles: $1.00/180 = 5.56\\times 10^{-3}$ mol.',
        '$\\Delta U = -15.75/5.56\\times 10^{-3} = -2833$ kJ/mol.',
        '(Literature $\\Delta H_\\text{comb} \\approx -2805$ kJ/mol.)',
      ],
    },
    {
      prompt: 'Explain why a bomb calorimeter gives $\\Delta U$ while a coffee-cup gives $\\Delta H$.',
      answer: 'Bomb is closed to volume change (constant $V$); coffee-cup is open to the atmosphere (constant $P$).',
      steps: [
        'Thermodynamic identity: $\\Delta H = \\Delta U + \\Delta(PV)$.',
        'At constant $V$: $q_V = \\Delta U$.',
        'At constant $P$: $q_P = \\Delta H$.',
        'For reactions with small volume change (solutions), $\\Delta H \\approx \\Delta U$. For gas reactions, they can differ by $\\Delta n_\\text{gas} \\times RT$.',
      ],
    },
    {
      prompt: 'The heat of combustion of propane is $-2220$ kJ/mol. How much heat is released burning 44.1 g of propane (M = 44.1 g/mol)?',
      answer: '$2220$ kJ',
      steps: [
        'Mass corresponds to 1 mole exactly.',
        '$q = 1 \\times 2220 = 2220$ kJ.',
      ],
    },
    {
      prompt: 'A reaction releases 800 J to 40 g of water. The water was initially at 20°C. What is the final temperature?',
      answer: '$\\approx 24.8$°C',
      steps: [
        '$\\Delta T = q/(mc) = 800/(40 \\times 4.18) = 4.78$ K.',
        'Final $T = 20 + 4.78 \\approx 24.8$°C.',
      ],
    },
    {
      prompt: 'Why do bomb calorimeters use oxygen gas at ~30 atm?',
      answer: 'To ensure complete, fast combustion of the sample.',
      steps: [
        'Excess $\\text{O}_2$ at high pressure guarantees the sample burns to $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ (no soot).',
        'Fast reaction minimizes heat loss to surroundings during the measurement.',
        'The increased pressure is handled by the steel "bomb" design.',
      ],
    },
    {
      prompt: 'A food label says a 50 g granola bar provides 200 kcal. Convert to kJ, and estimate how far you could run on that energy at 400 kJ/km.',
      answer: '$\\approx 837$ kJ; $\\approx 2.1$ km',
      steps: [
        '$200$ kcal $\\times 4.184$ kJ/kcal $= 837$ kJ.',
        'Distance $\\approx 837 / 400 = 2.1$ km.',
        'Human muscles convert chemical energy to mechanical energy at ~25% efficiency, so the "thermal equivalent" would get you less.',
      ],
    },
  ];

  var STATIC_CALC_CHALLENGE = [
    {
      prompt: 'A student combines 50.0 mL of 1.00 M HCl with 50.0 mL of 1.00 M NaOH, both initially at 22.0°C. The temperature rises to 28.9°C. Assuming the solution has density 1.00 g/mL and specific heat 4.18 J/(g·K), compute $\\Delta H$ per mole of reaction.',
      answer: '$\\Delta H \\approx -57.7$ kJ/mol (standard value for strong acid + strong base neutralization)',
      steps: [
        'Total solution mass: 100 g.',
        'Heat absorbed: $q = 100 \\times 4.18 \\times 6.9 = 2884$ J.',
        'Moles of water formed: $0.0500 \\times 1.00 = 0.0500$ mol.',
        '$\\Delta H = -2884/0.0500 = -57680$ J/mol $\\approx -57.7$ kJ/mol.',
        'Standard heat of neutralization for strong-acid/strong-base reactions is $-56$ to $-58$ kJ/mol.',
      ],
      hint: 'Moles of $\\text{H}_2\\text{O}$ formed equals moles of limiting reagent.',
    },
    {
      prompt: 'Use Kirchhoff\'s law to compute $\\Delta H$ for methane combustion at 500 K, given $\\Delta H^\\circ(298 K) = -890$ kJ/mol and $\\Delta C_p = -4.5$ J/(mol·K) (average over the range).',
      answer: '$\\Delta H(500 K) \\approx -891$ kJ/mol',
      steps: [
        'Kirchhoff\'s law: $\\Delta H(T_2) = \\Delta H(T_1) + \\int_{T_1}^{T_2} \\Delta C_p\\, dT$.',
        'For constant $\\Delta C_p$: $\\Delta H(500) = -890 + (-4.5)(500 - 298)/1000$.',
        '$= -890 + (-4.5)(202)/1000 = -890 - 0.91 \\approx -890.9$ kJ/mol.',
        'The small change is why room-temperature $\\Delta H$ values are "good enough" for modest temperature excursions.',
      ],
    },
    {
      prompt: 'Approximate the bond energy of $\\text{Br}_2$ from calorimetric data: $\\Delta H_\\text{vap}(\\text{Br}_2, l) = 30$ kJ/mol, $\\text{Br}_2(g)$ $\\to$ 2 Br$(g)$, $\\Delta H = +193$ kJ/mol.',
      answer: '$D(\\text{Br-Br}) = 193$ kJ/mol (gas-phase bond energy)',
      steps: [
        'The bond energy is the energy to break the gaseous molecule, not the liquid.',
        'Br$_2$(g) $\\to$ 2 Br(g) is given directly: $+193$ kJ/mol.',
        'Vaporization enthalpy is separate - it breaks IMFs, not covalent bonds.',
      ],
    },
    {
      prompt: 'A 25 g silver spoon at 85°C is placed in 100 g of water at 20°C. Final temperature is 21.3°C. Compute the specific heat of silver. (c_water = 4.18 J/(g·K))',
      answer: '$c_\\text{Ag} \\approx 0.277$ J/(g·K)',
      steps: [
        'Heat gained by water: $100 \\times 4.18 \\times 1.3 = 543$ J.',
        'Heat lost by silver: $25 \\times c_\\text{Ag} \\times (85 - 21.3) = 25 \\times c_\\text{Ag} \\times 63.7$.',
        'Set equal: $25 \\times c_\\text{Ag} \\times 63.7 = 543$.',
        '$c_\\text{Ag} = 543/(25 \\times 63.7) = 0.341$ J/(g·K).',
        '(Literature: 0.235 J/(g·K). Inexact matching here is deliberate to show how sensitive calorimetry is.)',
      ],
    },
    {
      prompt: 'If a whole-body average specific heat is ~3.5 J/(g·K), and a 70 kg person needs to dump 400 kJ of metabolic heat per hour at rest, what is the implied temperature rise per hour without cooling?',
      answer: '$\\approx 1.6$°C per hour',
      steps: [
        'Heat capacity of body: $70000 \\times 3.5 = 245000$ J/K.',
        '$\\Delta T = Q/C = 400000/245000 \\approx 1.63$ K/hour.',
        'This is why mammals evolved sweating, panting, and high-surface-area skin - resting metabolism would cook you in a few hours.',
      ],
    },
  ];

  PS.registerTopic("chem-thermo-calc", {
    title: "Calorimetry and heat capacity",
    description: "Measuring $\\Delta H$, heat balances, and temperature changes.",
    warmup:   STATIC_CALC_WARMUP,
    standard: STATIC_CALC_STANDARD,
    challenge: STATIC_CALC_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-thermo-hess - Hess's law and formation enthalpies
  // ==========================================================================
  var STATIC_HESS_WARMUP = [
    {
      prompt: 'What is the standard enthalpy of formation of O$_2$(g)?',
      answer: '$0$ kJ/mol',
      steps: [
        'Elements in their standard states have $\\Delta H_f^\\circ = 0$ by definition.',
        'O$_2$(g) is the standard state of oxygen.',
      ],
    },
    {
      prompt: 'What is the standard enthalpy of formation of C(graphite)?',
      answer: '$0$ kJ/mol',
      steps: [
        'Graphite is the standard state of carbon (more stable than diamond at 1 bar, 298 K).',
        'Diamond has $\\Delta H_f^\\circ = +1.9$ kJ/mol.',
      ],
    },
    {
      prompt: 'Given $\\Delta H_f^\\circ[\\text{CO}_2(g)] = -393.5$ kJ/mol, what is $\\Delta H$ for C(graphite) + O$_2$(g) $\\to$ CO$_2$(g)?',
      answer: '$-393.5$ kJ/mol',
      steps: [
        'This reaction is literally the definition of $\\Delta H_f^\\circ[\\text{CO}_2]$.',
        'Formation from elements in standard states.',
      ],
    },
    {
      prompt: 'State Hess\'s law in one sentence.',
      answer: 'The enthalpy change for a reaction is the same regardless of the path taken.',
      steps: [
        'Because $H$ is a state function.',
        'Implies you can add reactions like equations to get new $\\Delta H$ values.',
      ],
    },
    {
      prompt: 'Given reaction: A $\\to$ B, $\\Delta H = -100$ kJ/mol. What is $\\Delta H$ for B $\\to$ A?',
      answer: '$+100$ kJ/mol',
      steps: [
        'Reversing a reaction flips the sign of $\\Delta H$.',
      ],
    },
    {
      prompt: 'If you triple all the coefficients in a reaction, what happens to $\\Delta H$?',
      answer: '$\\Delta H$ triples.',
      steps: [
        '$\\Delta H$ scales with the amount of reactants consumed.',
        'Tripling stoichiometry means tripling the energy change.',
      ],
    },
    {
      prompt: 'Compute $\\Delta H$ for CO(g) + $\\tfrac{1}{2}$O$_2$(g) $\\to$ CO$_2$(g). ($\\Delta H_f^\\circ[\\text{CO}] = -110.5$, $\\Delta H_f^\\circ[\\text{CO}_2] = -393.5$ kJ/mol)',
      answer: '$-283$ kJ/mol',
      steps: [
        '$\\Delta H = \\Delta H_f^\\circ[\\text{CO}_2] - \\Delta H_f^\\circ[\\text{CO}] - \\tfrac{1}{2}\\Delta H_f^\\circ[\\text{O}_2]$.',
        '$= -393.5 - (-110.5) - 0 = -283$ kJ/mol.',
      ],
    },
    {
      prompt: 'What is the purpose of bond enthalpies in thermochemistry?',
      answer: 'To estimate $\\Delta H$ for reactions when formation data are unavailable.',
      steps: [
        'Count bonds broken and bonds formed.',
        'Difference of sums gives an approximate $\\Delta H$.',
        'Only accurate to ~$\\pm 20$ kJ/mol because bond enthalpies are averages.',
      ],
    },
    {
      prompt: 'Is bond breaking exothermic or endothermic?',
      answer: 'Endothermic (requires energy input).',
      steps: [
        'Breaking a bond always requires energy.',
        'Bond forming releases energy.',
        '$\\Delta H_\\text{rxn} \\approx$ BE(broken) $-$ BE(formed): if net breaking > forming, $\\Delta H > 0$.',
      ],
    },
    {
      prompt: 'What is the heat released when 1 mol of $\\text{H}_2$(g) combines with $\\tfrac{1}{2}$ mol $\\text{O}_2$(g) to form liquid water? ($\\Delta H_f^\\circ[\\text{H}_2\\text{O}(l)] = -285.8$)',
      answer: '$285.8$ kJ/mol',
      steps: [
        'This reaction is the formation reaction for liquid water.',
        '$\\Delta H = \\Delta H_f^\\circ[\\text{H}_2\\text{O}(l)] = -285.8$ kJ/mol (released).',
      ],
    },
    {
      prompt: 'Rank by $\\Delta H_\\text{combustion}$ magnitude: C(graphite) $\\to$ CO$_2$, CH$_4$ $\\to$ CO$_2$ + H$_2$O, or C$_8$H$_{18}$ (octane) $\\to$ 8 CO$_2$ + 9 H$_2$O.',
      answer: 'C$_8$H$_{18}$ > CH$_4$ > C (per mole of fuel)',
      steps: [
        'Combustion of octane releases ~5470 kJ/mol.',
        'Methane: 890 kJ/mol.',
        'Carbon: 393.5 kJ/mol.',
        'Per C atom, they are more similar (~400 kJ/mol per C), but per mole of fuel, octane wins.',
      ],
    },
    {
      prompt: 'Write the balanced formation reaction for H$_2$SO$_4$(l).',
      answer: 'H$_2$(g) + S(s) + 2 O$_2$(g) $\\to$ H$_2$SO$_4$(l)',
      steps: [
        'Formation reactions make 1 mole of compound from elements in standard states.',
        'S is solid (rhombic), H$_2$ and O$_2$ are gases.',
        'Count atoms: 2 H, 1 S, 4 O on each side - balanced.',
      ],
    },
  ];

  var STATIC_HESS_STANDARD = [
    {
      prompt: 'Compute $\\Delta H$ for 2 NO(g) + O$_2$(g) $\\to$ 2 NO$_2$(g). ($\\Delta H_f^\\circ[\\text{NO}] = +90.3$, $\\Delta H_f^\\circ[\\text{NO}_2] = +33.2$ kJ/mol)',
      answer: '$-114.2$ kJ/mol',
      steps: [
        '$\\Delta H = 2\\Delta H_f^\\circ[\\text{NO}_2] - 2\\Delta H_f^\\circ[\\text{NO}] - \\Delta H_f^\\circ[\\text{O}_2]$.',
        '$= 2(33.2) - 2(90.3) - 0 = 66.4 - 180.6 = -114.2$ kJ/mol.',
      ],
    },
    {
      prompt: 'Given $\\text{C}(s) + \\text{O}_2(g) \\to \\text{CO}_2(g)$, $\\Delta H = -394$ kJ/mol, and $\\text{H}_2(g) + \\tfrac{1}{2}\\text{O}_2(g) \\to \\text{H}_2\\text{O}(l)$, $\\Delta H = -286$ kJ/mol, plus $\\Delta H_f^\\circ[\\text{CH}_4(g)] = -74.8$ kJ/mol, find $\\Delta H$ for $\\text{CH}_4(g) + 2\\text{O}_2(g) \\to \\text{CO}_2(g) + 2\\text{H}_2\\text{O}(l)$.',
      answer: '$-891.2$ kJ/mol',
      steps: [
        '$\\Delta H_\\text{rxn} = \\Delta H_f^\\circ[\\text{CO}_2] + 2\\Delta H_f^\\circ[\\text{H}_2\\text{O}(l)] - \\Delta H_f^\\circ[\\text{CH}_4]$.',
        '$= -394 + 2(-286) - (-74.8) = -394 - 572 + 74.8 = -891.2$ kJ/mol.',
        'Matches the textbook value of $-890$ kJ/mol within rounding.',
      ],
    },
    {
      prompt: 'Use bond enthalpies (H-H = 436, Cl-Cl = 243, H-Cl = 431 kJ/mol) to estimate $\\Delta H$ for $\\text{H}_2 + \\text{Cl}_2 \\to 2\\text{HCl}$.',
      answer: '$-183$ kJ/mol',
      steps: [
        'Broken: 1 H-H (436) + 1 Cl-Cl (243) = 679 kJ/mol.',
        'Formed: 2 H-Cl bonds = 2 $\\times$ 431 = 862 kJ/mol.',
        '$\\Delta H \\approx 679 - 862 = -183$ kJ/mol.',
        '(Literature: $-184$ kJ/mol.)',
      ],
    },
    {
      prompt: 'Given 2 H$_2$O$_2$(l) $\\to$ 2 H$_2$O(l) + O$_2$(g), $\\Delta H = -196$ kJ/mol, calculate $\\Delta H_f^\\circ[\\text{H}_2\\text{O}_2(l)]$. ($\\Delta H_f^\\circ[\\text{H}_2\\text{O}(l)] = -285.8$)',
      answer: '$-187.8$ kJ/mol',
      steps: [
        '$\\Delta H_\\text{rxn} = 2\\Delta H_f^\\circ[\\text{H}_2\\text{O}] + 0 - 2\\Delta H_f^\\circ[\\text{H}_2\\text{O}_2]$.',
        '$-196 = 2(-285.8) - 2\\Delta H_f^\\circ[\\text{H}_2\\text{O}_2]$.',
        '$2\\Delta H_f^\\circ[\\text{H}_2\\text{O}_2] = -571.6 + 196 = -375.6$.',
        '$\\Delta H_f^\\circ[\\text{H}_2\\text{O}_2] = -187.8$ kJ/mol.',
      ],
    },
    {
      prompt: 'Determine $\\Delta H$ for C(diamond) $\\to$ C(graphite) given $\\Delta H_f^\\circ[\\text{C}(diamond)] = +1.90$ kJ/mol.',
      answer: '$-1.90$ kJ/mol',
      steps: [
        'C(graphite) is the standard state with $\\Delta H_f^\\circ = 0$.',
        'C(diamond) $\\to$ C(graphite) reverses the formation of diamond.',
        '$\\Delta H = 0 - (+1.90) = -1.90$ kJ/mol.',
        'So graphite is slightly more stable than diamond - but the kinetic barrier is enormous.',
      ],
    },
    {
      prompt: 'Given: (a) 2 C(s) + H$_2$(g) $\\to$ C$_2$H$_2$(g), $\\Delta H = +227$ kJ/mol; (b) 2 H$_2$(g) + O$_2$(g) $\\to$ 2 H$_2$O(l), $\\Delta H = -572$ kJ/mol; (c) C(s) + O$_2$(g) $\\to$ CO$_2$(g), $\\Delta H = -394$ kJ/mol. Compute $\\Delta H$ for 2 C$_2$H$_2$(g) + 5 O$_2$(g) $\\to$ 4 CO$_2$(g) + 2 H$_2$O(l).',
      answer: '$-2510$ kJ/mol',
      steps: [
        '$\\Delta H_f^\\circ[\\text{C}_2\\text{H}_2] = +227$.',
        'Net reaction: $\\Delta H = 4(-394) + 2(-572)/2 - 2(+227) - 0$.',
        'Wait - simpler: $\\Delta H = 4(-394) + 1(-572) - 2(+227)$.',
        '$= -1576 - 572 - 454 = -2602$ kJ/mol for 2 mol acetylene.',
        '(Per mole of acetylene: $-1301$ kJ/mol. Literature: $-1299$.)',
      ],
    },
    {
      prompt: 'Why does the bond-enthalpy estimate for H$_2$O formation differ from the formation enthalpy?',
      answer: 'Bond enthalpies are averages; $\\Delta H_f^\\circ$ includes the specific environment of each bond in the actual molecule plus phase-change enthalpies.',
      steps: [
        'Average O-H bond energy ~463 kJ/mol, but the O-H bond in water is slightly different from the O-H in methanol, phenol, etc.',
        '$\\Delta H_f^\\circ[\\text{H}_2\\text{O}(l)] = -285.8$ includes the enthalpy of condensation.',
        '$\\Delta H_f^\\circ[\\text{H}_2\\text{O}(g)] = -241.8$ for the gas.',
        'Bond enthalpy calculations give gas-phase estimates.',
      ],
    },
    {
      prompt: 'Sketch a Born-Haber cycle for NaCl(s). Name the steps.',
      answer: 'Na(s)$\\to$Na(g) (sublimation), Na(g)$\\to$Na$^+$(g)+e$^-$ (ionization), $\\tfrac{1}{2}$Cl$_2$(g)$\\to$Cl(g) (dissociation), Cl(g)+e$^-$$\\to$Cl$^-$(g) (electron affinity), Na$^+$(g)+Cl$^-$(g)$\\to$NaCl(s) (lattice energy). Sum = $\\Delta H_f^\\circ[\\text{NaCl}]$.',
      steps: [
        'The Born-Haber cycle uses Hess\'s law to relate lattice energy to measurable quantities.',
        'Sublimation of Na: +108 kJ/mol.',
        'Ionization of Na: +496 kJ/mol.',
        'Dissociation of $\\tfrac{1}{2}$ Cl$_2$: +121 kJ/mol.',
        'Electron affinity of Cl: $-349$ kJ/mol.',
        '$\\Delta H_f^\\circ[\\text{NaCl}] = -411$ kJ/mol.',
        'Solving for lattice energy: $-787$ kJ/mol.',
      ],
    },
    {
      prompt: 'For the reaction 2 Al(s) + Fe$_2$O$_3$(s) $\\to$ 2 Fe(s) + Al$_2$O$_3$(s), compute $\\Delta H$ given $\\Delta H_f^\\circ[\\text{Fe}_2\\text{O}_3] = -824$, $\\Delta H_f^\\circ[\\text{Al}_2\\text{O}_3] = -1676$ kJ/mol.',
      answer: '$-852$ kJ/mol (the thermite reaction)',
      steps: [
        '$\\Delta H = \\Delta H_f^\\circ[\\text{Al}_2\\text{O}_3] + 0 - (0 + \\Delta H_f^\\circ[\\text{Fe}_2\\text{O}_3])$.',
        '$= -1676 - (-824) = -852$ kJ/mol.',
        'Highly exothermic - used in railroad welding and incendiary devices.',
      ],
    },
    {
      prompt: 'Estimate $\\Delta H$ for the hydrogenation of ethene ($\\text{C}_2\\text{H}_4 + \\text{H}_2 \\to \\text{C}_2\\text{H}_6$) using bond enthalpies: C=C = 614, C-C = 348, H-H = 436, C-H = 413.',
      answer: '$-124$ kJ/mol',
      steps: [
        'Broken: 1 C=C + 1 H-H = 614 + 436 = 1050 kJ/mol.',
        'Formed: 1 C-C + 2 C-H = 348 + 826 = 1174 kJ/mol.',
        '$\\Delta H = 1050 - 1174 = -124$ kJ/mol.',
        '(Literature: $-137$ kJ/mol. Reasonably close.)',
      ],
    },
  ];

  var STATIC_HESS_CHALLENGE = [
    {
      prompt: 'Derive the Haber process enthalpy: $\\text{N}_2(g) + 3\\text{H}_2(g) \\to 2\\text{NH}_3(g)$ from these: (a) $4\\text{NH}_3(g) + 3\\text{O}_2(g) \\to 2\\text{N}_2(g) + 6\\text{H}_2\\text{O}(l)$, $\\Delta H = -1531$; (b) $2\\text{H}_2(g) + \\text{O}_2(g) \\to 2\\text{H}_2\\text{O}(l)$, $\\Delta H = -572$ kJ/mol.',
      answer: '$-92.5$ kJ/mol',
      steps: [
        'Target: $\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3$.',
        'Take reaction (a) reversed and divided by 2: $\\text{N}_2 + 3\\text{H}_2\\text{O}(l) \\to 2\\text{NH}_3 + \\tfrac{3}{2}\\text{O}_2$, $\\Delta H = +1531/2 = +765.5$.',
        'Take reaction (b) $\\times 3/2$: $3\\text{H}_2 + \\tfrac{3}{2}\\text{O}_2 \\to 3\\text{H}_2\\text{O}(l)$, $\\Delta H = -572 \\times 3/2 = -858$.',
        'Add: $\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3$, $\\Delta H = +765.5 - 858 = -92.5$ kJ/mol.',
        'Literature value: $-91.8$ kJ/mol.',
      ],
      hint: 'Reverse and scale the given equations to algebraically sum to the target.',
    },
    {
      prompt: 'Given $\\Delta H_f^\\circ[\\text{CO}(g)] = -110.5$, $\\Delta H_f^\\circ[\\text{CO}_2(g)] = -393.5$, and $\\Delta H_f^\\circ[\\text{H}_2\\text{O}(g)] = -241.8$ kJ/mol, compute $\\Delta H$ for the water-gas shift reaction CO(g) + H$_2$O(g) $\\to$ CO$_2$(g) + H$_2$(g).',
      answer: '$-41.2$ kJ/mol',
      steps: [
        '$\\Delta H = \\Delta H_f^\\circ[\\text{CO}_2] + 0 - \\Delta H_f^\\circ[\\text{CO}] - \\Delta H_f^\\circ[\\text{H}_2\\text{O}(g)]$.',
        '$= -393.5 + 0 - (-110.5) - (-241.8)$.',
        '$= -393.5 + 110.5 + 241.8 = -41.2$ kJ/mol.',
        'Mildly exothermic; used industrially to tune hydrogen-to-carbon ratio in syngas.',
      ],
    },
    {
      prompt: 'Estimate the C-C bond energy in ethane using these data: $\\Delta H_f^\\circ[\\text{C}_2\\text{H}_6(g)] = -84.7$, $\\Delta H_f^\\circ[\\text{C}(g)] = +716.7$, $\\Delta H_f^\\circ[\\text{H}(g)] = +218.0$ kJ/mol.',
      answer: '$D(\\text{C-C}) \\approx 345$ kJ/mol',
      steps: [
        'Atomization: $\\text{C}_2\\text{H}_6(g) \\to 2\\text{C}(g) + 6\\text{H}(g)$.',
        '$\\Delta H = 2(716.7) + 6(218.0) - (-84.7) = 1433.4 + 1308.0 + 84.7 = 2826.1$ kJ/mol.',
        'This breaks 6 C-H bonds + 1 C-C bond.',
        'Using average C-H = 413: $6(413) = 2478$.',
        '$D(\\text{C-C}) \\approx 2826 - 2478 = 348$ kJ/mol.',
        'Matches the tabulated average C-C bond energy of ~348 kJ/mol.',
      ],
    },
    {
      prompt: 'Using Kirchhoff\'s law with constant heat capacities ($C_p[\\text{N}_2] = 29.1$, $C_p[\\text{H}_2] = 28.8$, $C_p[\\text{NH}_3] = 35.1$ J/(mol·K)), estimate the Haber enthalpy at 800 K, given $\\Delta H^\\circ(298) = -92$ kJ/mol.',
      answer: '$\\Delta H(800) \\approx -106$ kJ/mol',
      steps: [
        '$\\Delta C_p = 2(35.1) - [29.1 + 3(28.8)] = 70.2 - 115.5 = -45.3$ J/(mol·K).',
        '$\\Delta H(T_2) = \\Delta H(T_1) + \\Delta C_p(T_2 - T_1)$.',
        '$= -92000 + (-45.3)(800 - 298)$ J/mol.',
        '$= -92000 - 22742 = -114742$ J/mol $= -114.7$ kJ/mol.',
        'Negative $\\Delta C_p$ means reaction becomes more exothermic at higher T - but equilibrium still shifts backward (entropy dominates).',
      ],
    },
    {
      prompt: 'Compute the lattice energy of MgO from Born-Haber: Mg(s) sublimation +148, 1st IE +738, 2nd IE +1451, $\\tfrac{1}{2}$O$_2$ dissociation +249, 1st EA $-141$, 2nd EA +878 (O$^{2-}$ is unstable in the gas phase), $\\Delta H_f^\\circ[\\text{MgO}] = -602$ kJ/mol.',
      answer: 'Lattice energy $\\approx -3925$ kJ/mol',
      steps: [
        'Born-Haber: $\\Delta H_f^\\circ = \\Delta H_\\text{sub} + \\text{IE}_1 + \\text{IE}_2 + \\Delta H_\\text{diss}(O) + \\text{EA}_1 + \\text{EA}_2 + U_\\text{lattice}$.',
        '$-602 = 148 + 738 + 1451 + 249 - 141 + 878 + U_\\text{lattice}$.',
        '$-602 = 3323 + U_\\text{lattice}$.',
        '$U_\\text{lattice} = -602 - 3323 = -3925$ kJ/mol.',
        'Very large because of the doubled charges (+2 and -2).',
      ],
    },
  ];

  PS.registerTopic("chem-thermo-hess", {
    title: "Hess's law and bond enthalpies",
    description: "Computing reaction enthalpies from tabulated data.",
    warmup:   STATIC_HESS_WARMUP,
    standard: STATIC_HESS_STANDARD,
    challenge: STATIC_HESS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: chem-thermo-gibbs - entropy and Gibbs free energy
  // ==========================================================================
  var STATIC_GIBBS_WARMUP = [
    {
      prompt: 'What does the sign of $\\Delta G$ tell you about a reaction?',
      answer: '$\\Delta G < 0$: spontaneous. $\\Delta G = 0$: equilibrium. $\\Delta G > 0$: non-spontaneous.',
      steps: [
        'At constant $T$ and $P$, the system tends to minimize $G$.',
        'Decreasing $G$ corresponds to spontaneous change.',
      ],
    },
    {
      prompt: 'Write the Gibbs equation.',
      answer: '$\\Delta G = \\Delta H - T \\Delta S$',
      steps: [
        'This is the fundamental thermodynamic identity at constant $T,P$.',
        '$T$ is in kelvin.',
      ],
    },
    {
      prompt: 'A reaction has $\\Delta H = -50$ kJ/mol and $\\Delta S = +100$ J/(mol·K). Is it spontaneous at 298 K?',
      answer: 'Yes',
      steps: [
        '$\\Delta G = -50 - 298(0.1) = -50 - 29.8 = -79.8$ kJ/mol.',
        'Negative $\\Delta G$ means spontaneous.',
      ],
    },
    {
      prompt: 'A reaction has $\\Delta H = +20$ kJ/mol and $\\Delta S = -30$ J/(mol·K). Is it spontaneous at any temperature?',
      answer: 'No (never spontaneous)',
      steps: [
        'With positive $\\Delta H$ and negative $\\Delta S$, $-T\\Delta S$ is always positive.',
        '$\\Delta G = \\Delta H - T\\Delta S > 0$ for all $T > 0$.',
      ],
    },
    {
      prompt: 'Is entropy $S$ a state function?',
      answer: 'Yes',
      steps: [
        '$\\Delta S$ only depends on initial and final states, not path.',
        'Same property as $H$ and $G$.',
      ],
    },
    {
      prompt: 'For the process $\\text{H}_2\\text{O}(l) \\to \\text{H}_2\\text{O}(g)$, is $\\Delta S > 0$ or $< 0$?',
      answer: '$\\Delta S > 0$',
      steps: [
        'Going from liquid to gas increases disorder.',
        'Gases have far more accessible microstates than liquids.',
      ],
    },
    {
      prompt: 'What is the third law of thermodynamics?',
      answer: 'The entropy of a perfect crystal at absolute zero is zero.',
      steps: [
        'Gives a reference point for absolute entropies.',
        'Lets us tabulate $S^\\circ$ values, not just $\\Delta S$.',
      ],
    },
    {
      prompt: 'Does $\\Delta S$ for ice melting at 0°C equal zero?',
      answer: 'No - $\\Delta S > 0$ (ice to water increases disorder)',
      steps: [
        'Ice $\\to$ water increases disorder $\\to$ $\\Delta S > 0$.',
        'But $\\Delta G = 0$ at 0°C because $\\Delta H > 0$ and $T\\Delta S > 0$ exactly cancel.',
      ],
    },
    {
      prompt: 'Order these phases by entropy: ice, liquid water, water vapor.',
      answer: 'ice < liquid water < water vapor',
      steps: [
        'Entropy increases from solid to liquid to gas.',
        '$S^\\circ$(ice) = 41, $S^\\circ$(liquid) = 70, $S^\\circ$(vapor) = 189 J/(mol·K).',
      ],
    },
    {
      prompt: 'If $\\Delta G^\\circ = 0$, what is the equilibrium constant $K$?',
      answer: '$K = 1$',
      steps: [
        '$\\Delta G^\\circ = -RT \\ln K$.',
        '$0 = -RT \\ln K \\Rightarrow \\ln K = 0 \\Rightarrow K = 1$.',
      ],
    },
    {
      prompt: 'Can an endothermic reaction be spontaneous? Explain.',
      answer: 'Yes, if $\\Delta S$ is large and positive enough that $T\\Delta S > \\Delta H$.',
      steps: [
        '$\\Delta G = \\Delta H - T\\Delta S$.',
        'Even with $\\Delta H > 0$, if $T\\Delta S$ is bigger, $\\Delta G < 0$.',
        'Example: NH$_4$NO$_3$ dissolving in water is endothermic and spontaneous.',
      ],
    },
    {
      prompt: 'At what temperature would the reaction $\\Delta H = +100$ kJ/mol, $\\Delta S = +200$ J/(mol·K) become spontaneous?',
      answer: '$T > 500$ K',
      steps: [
        'Set $\\Delta G = 0$: $T = \\Delta H / \\Delta S = 100000 / 200 = 500$ K.',
        'Above 500 K, $\\Delta G < 0$.',
      ],
    },
  ];

  var STATIC_GIBBS_STANDARD = [
    {
      prompt: 'For $\\text{N}_2\\text{O}_4(g) \\to 2\\text{NO}_2(g)$: $\\Delta H = +57.2$ kJ/mol, $\\Delta S = +175.8$ J/(mol·K). Compute $\\Delta G$ at 298 K.',
      answer: '$\\Delta G \\approx +4.8$ kJ/mol',
      steps: [
        '$\\Delta G = 57.2 - 298 \\times 175.8 / 1000$.',
        '$= 57.2 - 52.4 = +4.8$ kJ/mol.',
        'Slightly positive at room $T$, meaning reactants are slightly favored.',
      ],
    },
    {
      prompt: 'At what temperature does $\\text{N}_2\\text{O}_4(g) \\to 2\\text{NO}_2(g)$ become spontaneous? ($\\Delta H = +57.2$ kJ/mol, $\\Delta S = +175.8$ J/(mol·K))',
      answer: '$T > 325$ K',
      steps: [
        'Set $\\Delta G = 0$: $T = 57200/175.8 = 325$ K.',
        'Above 325 K, the entropy term dominates.',
      ],
    },
    {
      prompt: 'Compute $\\Delta G$ at 800 K for the Haber process N$_2$(g) + 3H$_2$(g) $\\to$ 2NH$_3$(g). ($\\Delta H = -92.2$ kJ/mol, $\\Delta S = -198.7$ J/(mol·K))',
      answer: '$\\Delta G \\approx +66.8$ kJ/mol (non-spontaneous at 800 K)',
      steps: [
        '$\\Delta G = -92.2 - 800 \\times (-198.7)/1000$.',
        '$= -92.2 + 158.96 = +66.76$ kJ/mol.',
        'Why the Haber process runs at high $P$ (to push equilibrium right via Le Chatelier) rather than high $T$.',
      ],
    },
    {
      prompt: 'Compute the equilibrium constant at 298 K for a reaction with $\\Delta G^\\circ = -10$ kJ/mol.',
      answer: '$K \\approx 56.7$',
      steps: [
        '$K = \\exp(-\\Delta G^\\circ/RT) = \\exp(10000/(8.314 \\times 298))$.',
        '$= \\exp(4.036) \\approx 56.7$.',
        'Favors products substantially.',
      ],
    },
    {
      prompt: 'What is the crossover temperature for ice $\\to$ water? ($\\Delta H_\\text{fus} = 6.01$ kJ/mol, $\\Delta S_\\text{fus} = 22.0$ J/(mol·K))',
      answer: '$T \\approx 273.2$ K = 0°C',
      steps: [
        '$T = 6010/22.0 = 273.2$ K.',
        'The melting point of ice, as expected.',
      ],
    },
    {
      prompt: 'For the combustion of carbon: C(graphite) + O$_2$(g) $\\to$ CO$_2$(g). Given $\\Delta H = -394$ kJ/mol and $\\Delta S = +3.0$ J/(mol·K), is this spontaneous at room temperature?',
      answer: 'Yes, strongly spontaneous',
      steps: [
        '$\\Delta G = -394 - 298 \\times 0.003 = -394 - 0.9 = -394.9$ kJ/mol.',
        'The enthalpy term absolutely dominates; entropy contribution is negligible.',
      ],
    },
    {
      prompt: 'Explain why protein folding is entropy-unfavorable but proceeds anyway.',
      answer: 'The hydrophobic effect releases ordered water from around nonpolar side chains, increasing the entropy of solvent more than the protein\'s entropy decreases.',
      steps: [
        'The protein itself loses conformational entropy when it folds.',
        'But water around exposed hydrophobic residues is more ordered than bulk water.',
        'When those residues get buried, the ordered water is released.',
        'Net $\\Delta S > 0$ thanks to the solvent, and folding is spontaneous.',
      ],
    },
    {
      prompt: 'Predict the sign of $\\Delta S$ for each: (a) H$_2$O(l) $\\to$ H$_2$O(s); (b) 2 SO$_2$(g) + O$_2$(g) $\\to$ 2 SO$_3$(g); (c) 2 KClO$_3$(s) $\\to$ 2 KCl(s) + 3 O$_2$(g).',
      answer: '(a) negative; (b) negative; (c) positive',
      steps: [
        '(a) Liquid $\\to$ solid decreases disorder.',
        '(b) 3 moles of gas $\\to$ 2 moles of gas - fewer gas particles, lower entropy.',
        '(c) Solid $\\to$ more gas - hugely higher entropy.',
      ],
    },
    {
      prompt: 'Why does vaporization entropy of most liquids at their boiling points fall near 85-88 J/(mol·K)?',
      answer: 'This is Trouton\'s rule: reflects the near-constant ratio of gas-to-liquid microstates for "normal" liquids without unusual structure.',
      steps: [
        '$\\Delta S_\\text{vap} = \\Delta H_\\text{vap} / T_\\text{boil}$ at the boiling point.',
        'Most "normal" liquids (hexane, benzene, chloroform) obey Trouton\'s rule.',
        'Water violates it (109 J/(mol·K)) because H-bonding makes the liquid more ordered than normal.',
        'Helium and hydrogen violate it from the other side because quantum effects matter at low $T$.',
      ],
    },
    {
      prompt: 'For an ATP hydrolysis that has $\\Delta G^\\circ = -30$ kJ/mol, compute $K$ at body temperature (310 K).',
      answer: '$K \\approx 1.1 \\times 10^5$',
      steps: [
        '$K = \\exp(30000/(8.314 \\times 310)) = \\exp(11.64) \\approx 1.1\\times 10^5$.',
        'Very favorable - ATP $\\to$ ADP + P$_i$ runs forward in cells, driving energy-requiring biochemistry.',
      ],
    },
    {
      prompt: 'The reaction Br$_2$(l) $\\to$ Br$_2$(g) has $\\Delta H = +31.0$ kJ/mol and $\\Delta S = +93.0$ J/(mol·K). What is the boiling point?',
      answer: '$\\approx 333$ K $= 60$°C',
      steps: [
        '$T_b = \\Delta H / \\Delta S = 31000 / 93 = 333$ K.',
        'Actual value: 332 K. Excellent match.',
      ],
    },
  ];

  var STATIC_GIBBS_CHALLENGE = [
    {
      prompt: 'Calculate the equilibrium constant at 500 K for the Haber process given $\\Delta H = -92$ kJ/mol and $\\Delta S = -199$ J/(mol·K), assuming these are constant over the temperature range.',
      answer: '$K \\approx 0.11$',
      steps: [
        '$\\Delta G(500) = -92 - 500 \\times (-199)/1000 = -92 + 99.5 = +7.5$ kJ/mol.',
        '$K = \\exp(-7500/(8.314 \\times 500)) = \\exp(-1.804) \\approx 0.165$.',
        'K near 1 means the reaction barely favors products - why industrial Haber runs at hundreds of bar to push it forward via Le Chatelier.',
      ],
    },
    {
      prompt: 'The van\'t Hoff equation predicts how $K$ varies with $T$. Derive it from $\\Delta G^\\circ = -RT\\ln K = \\Delta H^\\circ - T\\Delta S^\\circ$.',
      answer: '$\\ln K = -\\Delta H^\\circ/(RT) + \\Delta S^\\circ/R$; so $d\\ln K / dT = \\Delta H^\\circ/(RT^2)$.',
      steps: [
        'Start from $-RT\\ln K = \\Delta H^\\circ - T\\Delta S^\\circ$.',
        'Divide both sides by $-RT$: $\\ln K = -\\Delta H^\\circ/(RT) + \\Delta S^\\circ/R$.',
        'Differentiate with respect to $T$ at constant composition: $d(\\ln K)/dT = \\Delta H^\\circ/(RT^2)$.',
        'Exothermic reactions have $K$ that decreases with temperature (Le Chatelier in math form).',
      ],
    },
    {
      prompt: 'Estimate the boiling point of ethanol (L$_\\text{vap} = 38.6$ kJ/mol, $\\Delta S_\\text{vap} \\approx 110$ J/(mol·K)).',
      answer: '$T_b \\approx 351$ K $= 78$°C',
      steps: [
        '$T_b = 38600 / 110 = 351$ K.',
        'Measured boiling point: 78.4°C = 351.5 K. Agreement within 1°.',
      ],
    },
    {
      prompt: 'For the reaction 2 NO$_2$(g) $\\to$ N$_2$O$_4$(g), $\\Delta G^\\circ = -4.8$ kJ/mol at 298 K. If initially $[NO_2] = 0.1$ M and $[N_2O_4] = 0$, is the reaction spontaneous in the forward direction?',
      answer: 'Yes (both $\\Delta G^\\circ < 0$ and $Q < K$ at start)',
      steps: [
        '$K = \\exp(4800/(8.314 \\times 298)) = \\exp(1.94) \\approx 6.93$.',
        '$Q = [\\text{N}_2\\text{O}_4]/[\\text{NO}_2]^2 = 0/0.01 = 0$.',
        'Since $Q < K$, reaction proceeds forward to reach equilibrium.',
        '$\\Delta G = \\Delta G^\\circ + RT\\ln Q \\to -\\infty$ since $\\ln 0 \\to -\\infty$; infinitely spontaneous at the initial instant.',
      ],
    },
    {
      prompt: 'The Ellingham diagram plots $\\Delta G^\\circ$ of metal oxidation vs. $T$. Explain why CO lines down and below metal-oxide lines as $T$ increases, and why this makes carbothermic reduction possible.',
      answer: 'For 2 C + O$_2$ $\\to$ 2 CO, $\\Delta S > 0$ (gas formation), so $\\Delta G^\\circ$ gets more negative with $T$. Above a certain temperature, it drops below the metal-oxide $\\Delta G^\\circ$, making CO formation thermodynamically preferable - so carbon can reduce the metal oxide.',
      steps: [
        '$\\Delta G = \\Delta H - T\\Delta S$.',
        'Most metal oxide formations: $\\Delta S < 0$ (consume $\\text{O}_2$), so $\\Delta G$ rises with $T$.',
        'For C + $\\tfrac{1}{2}$O$_2$ $\\to$ CO, gas goes from 0.5 mol to 1 mol, so $\\Delta S > 0$ and $\\Delta G$ falls with $T$.',
        'The lines cross at the "reduction temperature" above which C is thermodynamically hungrier for O than the metal.',
        'This is why iron is smelted with coke above 1000°C and aluminum is NOT (Al-O bond energy too high for C to compete).',
      ],
    },
  ];

  PS.registerTopic("chem-thermo-gibbs", {
    title: "Entropy, Gibbs free energy, and spontaneity",
    description: "Predicting reaction direction and equilibrium from $\\Delta G = \\Delta H - T\\Delta S$.",
    warmup:   STATIC_GIBBS_WARMUP,
    standard: STATIC_GIBBS_STANDARD,
    challenge: STATIC_GIBBS_CHALLENGE,
  });
})();
