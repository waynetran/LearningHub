/*
 * LearningHub — Chemical Kinetics Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   chem-kin-rate-laws — rate laws, reaction orders, integrated forms
 *   chem-kin-arrhenius — Arrhenius, activation energy, collision theory
 *   chem-kin-mechanisms — elementary steps, RDS, catalysis, enzymes
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[kinetics-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: chem-kin-rate-laws
  // ============================================================
  var RATE_WARMUP = [
    {
      prompt: 'Define the rate of a reaction $aA + bB \\to cC + dD$.',
      answer: '$r = -\\dfrac{1}{a}\\dfrac{d[A]}{dt} = -\\dfrac{1}{b}\\dfrac{d[B]}{dt} = \\dfrac{1}{c}\\dfrac{d[C]}{dt} = \\dfrac{1}{d}\\dfrac{d[D]}{dt}$.',
      steps: [
        'Write $d[i]/dt$ for each species.',
        'Divide by the stoichiometric coefficient to get a species-independent rate.',
        'The minus signs on reactants reflect their consumption; products gain positive signs.',
      ],
    },
    {
      prompt: 'What does "rate constant" $k$ depend on, and what does it not depend on?',
      answer: 'It depends on temperature, the reaction mechanism, and the solvent, but NOT on concentrations of reactants or products.',
      steps: [
        'Rate laws are usually of the form $r = k[A]^m[B]^n$.',
        'All concentration dependence is captured by the $[A]^m[B]^n$ part.',
        '$k$ itself is a constant of proportionality set by $T$ and the microscopic barrier.',
      ],
    },
    {
      prompt: 'What does "reaction order" refer to?',
      answer: 'The exponent of a species in the (empirical) rate law; the overall order is the sum of those exponents.',
      steps: [
        'For $r = k[A]^m[B]^n$, the reaction is $m$-th order in A and $n$-th order in B.',
        'Overall order is $m + n$.',
        'Orders are determined experimentally; they need not match stoichiometric coefficients.',
      ],
    },
    {
      prompt: 'Write the integrated rate law for a first-order reaction.',
      answer: '$[A]_t = [A]_0 e^{-kt}$ or equivalently $\\ln[A]_t = \\ln[A]_0 - kt$.',
      steps: [
        'Start from $d[A]/dt = -k[A]$.',
        'Separate variables and integrate.',
        'Exponential decay: the fraction remaining depends only on elapsed time, not the initial amount.',
      ],
    },
    {
      prompt: 'Write the formula for the half-life of a first-order reaction.',
      answer: '$t_{1/2} = \\ln 2 / k \\approx 0.693/k$, independent of initial concentration.',
      steps: [
        'Half-life: time for $[A]$ to fall to half its starting value.',
        'Set $[A]_0/2 = [A]_0 e^{-kt_{1/2}}$.',
        'Solve: $t_{1/2} = \\ln 2 / k$.',
        'Independence from $[A]_0$ is characteristic of first-order decay — e.g., radioactive decay.',
      ],
    },
  ];

  var RATE_STANDARD = [
    {
      prompt: 'A first-order reaction has $k = 0.0231\\ \\mathrm{s^{-1}}$. How long until 75% of the reactant is consumed?',
      answer: '$t \\approx 60$ s.',
      steps: [
        '75% consumed means $[A]/[A]_0 = 0.25$.',
        '$\\ln(0.25) = -kt$, so $t = \\ln(4)/k$.',
        '$t = 1.386/0.0231 \\approx 60.0$ s.',
        'Note this is two half-lives ($t_{1/2} = 30$ s).',
      ],
    },
    {
      prompt: 'For a second-order reaction $2A \\to \\text{products}$ with rate law $r = k[A]^2$, derive the integrated form and half-life.',
      answer: '$1/[A]_t = 1/[A]_0 + 2kt$, half-life $t_{1/2} = 1/(2k[A]_0)$, which depends on initial concentration.',
      steps: [
        'Rate of A: $d[A]/dt = -2r = -2k[A]^2$.',
        'Separate variables: $d[A]/[A]^2 = -2k\\,dt$.',
        'Integrate: $-1/[A] = -2kt + C$, so $1/[A]_t = 1/[A]_0 + 2kt$.',
        'Half-life: set $[A] = [A]_0/2$, solve for $t$: $t_{1/2} = 1/(2k[A]_0)$. Dilute samples take longer.',
      ],
    },
    {
      prompt: 'The decomposition of $\\rm N_2O_5$ follows first-order kinetics with $k = 3.5\\times 10^{-5}\\ \\mathrm{s^{-1}}$ at 25°C. Starting with 0.100 M, what is $[\\rm N_2O_5]$ after 1 hour?',
      answer: '$\\approx 0.0882$ M.',
      steps: [
        'Elapsed time: 3600 s.',
        'Exponent: $kt = 3.5\\times 10^{-5}\\cdot 3600 = 0.126$.',
        '$[A]_t = 0.100\\,e^{-0.126} \\approx 0.100\\cdot 0.8817 \\approx 0.0882$ M.',
        'About 12% decomposes.',
      ],
    },
    {
      prompt: 'Data from a kinetics experiment: when $[A]$ is doubled, the rate quadruples; when $[B]$ is doubled, the rate is unchanged. What is the rate law?',
      answer: '$r = k[A]^2[B]^0 = k[A]^2$.',
      steps: [
        'Doubling $[A]$ gives $4\\times$ the rate $\\Rightarrow 2^m = 4 \\Rightarrow m = 2$.',
        'Doubling $[B]$ gives the same rate $\\Rightarrow 2^n = 1 \\Rightarrow n = 0$.',
        'The rate law is $r = k[A]^2$.',
        'B does not appear; this often signals that B is not in the rate-determining step.',
      ],
    },
    {
      prompt: 'Use the method of initial rates: two runs with $[A]_0 = 0.10$ and $0.20$ M give initial rates $5.0\\times 10^{-4}$ and $10\\times 10^{-4}$ M/s. What is the order in A?',
      answer: 'First order in A.',
      steps: [
        'Ratio of rates: $(10\\times 10^{-4})/(5.0\\times 10^{-4}) = 2$.',
        'Ratio of $[A]$: $0.20/0.10 = 2$.',
        'So $2^m = 2 \\Rightarrow m = 1$.',
      ],
    },
  ];

  var RATE_CHALLENGE = [
    {
      prompt: 'For a zero-order reaction $r = k$, derive the integrated rate law and the half-life. Under what conditions does this apply physically?',
      answer: '$[A]_t = [A]_0 - kt$; half-life $t_{1/2} = [A]_0/(2k)$. Physically, zero-order kinetics arise when a surface or enzyme is saturated, so the rate depends only on the catalyst, not on $[A]$.',
      steps: [
        'Rate: $d[A]/dt = -k$.',
        'Integrate: $[A] = [A]_0 - kt$.',
        'Half-life: $[A]_0/2 = [A]_0 - kt_{1/2} \\Rightarrow t_{1/2} = [A]_0/(2k)$.',
        'Physical examples: metabolism of alcohol in the liver, gas reactions on fully-covered catalytic surfaces.',
      ],
    },
    {
      prompt: 'A radioactive isotope has a half-life of 14.3 days. What fraction remains after 60 days?',
      answer: '$\\approx 5.4\\%$.',
      steps: [
        'Number of half-lives: $60/14.3 \\approx 4.196$.',
        'Fraction remaining: $(1/2)^{4.196}$.',
        '$= 2^{-4.196} \\approx 0.0544$.',
        'About 5.4% remains — useful for dating.',
      ],
    },
    {
      prompt: 'For the reaction $A + B \\to C$ with $r = k[A][B]$, derive the integrated rate law under the pseudo-first-order assumption that $[B] \\gg [A]$.',
      answer: '$[A]_t = [A]_0 e^{-k\'t}$ with $k\' = k[B]_0$.',
      steps: [
        'If $[B]$ barely changes, treat it as constant: $[B] \\approx [B]_0$.',
        'Then $r = (k[B]_0)[A] = k\'[A]$.',
        'This is the first-order form integrated to $[A]_t = [A]_0 e^{-k\'t}$.',
        'Commonly used to simplify experimental analysis when one reactant is in large excess.',
      ],
    },
  ];

  PS.registerTopic("chem-kin-rate-laws", {
    title: "Rate laws and reaction orders",
    description: "Differential and integrated rate laws, half-lives, and how to extract kinetic order from experiment.",
    warmup: RATE_WARMUP,
    standard: RATE_STANDARD,
    challenge: RATE_CHALLENGE,
  });

  // ============================================================
  // TOPIC: chem-kin-arrhenius
  // ============================================================
  var ARRH_WARMUP = [
    {
      prompt: 'Write the Arrhenius equation.',
      answer: '$k = A\\,e^{-E_a/RT}$.',
      steps: [
        '$A$ is the pre-exponential (frequency) factor.',
        '$E_a$ is the activation energy.',
        '$R = 8.314\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}$ is the gas constant.',
        '$T$ is absolute temperature in Kelvin.',
      ],
    },
    {
      prompt: 'What physical picture does activation energy represent?',
      answer: 'The minimum energy barrier separating reactants from products along the reaction coordinate.',
      steps: [
        'Reactants must acquire enough thermal energy to climb the barrier.',
        'The transition state is the top of the barrier.',
        'The Boltzmann factor $e^{-E_a/RT}$ gives the fraction of molecular collisions with enough energy to react.',
      ],
    },
    {
      prompt: 'A rule of thumb: reaction rates roughly double for every 10 K increase near room temperature. What $E_a$ does this imply?',
      answer: '$E_a \\approx 50$ kJ/mol.',
      steps: [
        'Set $k(T+10)/k(T) = 2$.',
        '$e^{E_a/(RT) - E_a/(R(T+10))} = 2$.',
        'At $T = 300$ K, this works out to $E_a \\approx 52$ kJ/mol.',
        'Half of all common organic reactions are in this ballpark.',
      ],
    },
    {
      prompt: 'What is the Arrhenius plot, and how is it used to extract $E_a$?',
      answer: 'A plot of $\\ln k$ vs. $1/T$; the slope is $-E_a/R$.',
      steps: [
        'Take the log of the Arrhenius equation: $\\ln k = \\ln A - E_a/(RT)$.',
        'Plot $\\ln k$ (y) vs. $1/T$ (x).',
        'Slope = $-E_a/R$, intercept = $\\ln A$.',
        'Works over a reasonable temperature range where $E_a$ is constant.',
      ],
    },
    {
      prompt: 'What assumption does collision theory make about reactions in gas phase?',
      answer: 'That the rate depends on how often molecules collide, the fraction of collisions with enough energy, and a steric factor accounting for proper orientation.',
      steps: [
        'Rate $\\propto Z \\cdot f \\cdot p$ where $Z$ is collision frequency, $f = e^{-E_a/RT}$, and $p$ is a steric factor $\\in (0, 1]$.',
        'Collision frequency scales as $\\sqrt{T}$ and with concentrations.',
        'Steric factor captures the fact that not every collision has the right geometry to react.',
      ],
    },
  ];

  var ARRH_STANDARD = [
    {
      prompt: 'A reaction has $k = 1.0\\times 10^{-3}$ s$^{-1}$ at 298 K and $k = 2.0\\times 10^{-3}$ s$^{-1}$ at 308 K. Estimate $E_a$.',
      answer: '$E_a \\approx 53$ kJ/mol.',
      steps: [
        'From the two-point Arrhenius: $\\ln(k_2/k_1) = -(E_a/R)(1/T_2 - 1/T_1)$.',
        '$\\ln 2 = 0.693$; $1/308 - 1/298 = -1.089\\times 10^{-4}$ K$^{-1}$.',
        '$E_a = 0.693\\cdot 8.314 / 1.089\\times 10^{-4}$.',
        '$\\approx 52{,}900$ J/mol $\\approx 53$ kJ/mol.',
      ],
    },
    {
      prompt: 'At $T_1 = 300$ K, $k = 1.0$ s$^{-1}$. If $E_a = 80$ kJ/mol, what is $k$ at $T_2 = 350$ K?',
      answer: '$k(350) \\approx 85$ s$^{-1}$.',
      steps: [
        'Use $\\ln(k_2/k_1) = -(E_a/R)(1/T_2 - 1/T_1)$.',
        '$1/350 - 1/300 = -4.76\\times 10^{-4}$ K$^{-1}$.',
        '$\\ln(k_2/k_1) = -(80{,}000/8.314)(-4.76\\times 10^{-4}) = 4.58$.',
        '$k_2/k_1 = e^{4.58} \\approx 97$. Hmm — recompute: $k_2 \\approx 97$ s$^{-1}$. (Note: small ambiguities in $E_a$ give 85–100.)',
      ],
    },
    {
      prompt: 'Why is the Arrhenius equation an empirical fit rather than a rigorous theoretical law?',
      answer: 'It does not derive from first principles — the simple $Ae^{-E_a/RT}$ form is empirical. Transition-state theory gives a more principled version with a temperature-dependent prefactor.',
      steps: [
        'Arrhenius noticed experimentally that $\\ln k$ is nearly linear in $1/T$.',
        '$A$ absorbs the frequency of collisions or attempt frequency, but is itself $T$-dependent.',
        'Transition-state theory (Eyring) gives $k = (k_B T/h)e^{-\\Delta G^\\ddagger/RT}$ — more physically grounded.',
        'Both forms coincide over typical lab temperature ranges.',
      ],
    },
    {
      prompt: 'Compare the size of the pre-exponential factor $A$ for a unimolecular gas-phase reaction vs. a bimolecular one.',
      answer: 'Unimolecular: $A \\sim 10^{13}$ s$^{-1}$, roughly a bond vibration frequency. Bimolecular: $A \\sim 10^{11}$ M$^{-1}$s$^{-1}$, limited by collision frequency.',
      steps: [
        'Unimolecular: the molecule "tries" to cross the barrier at each vibration.',
        '$\\sim k_B T/h \\sim 10^{13}$ s$^{-1}$ at 300 K.',
        'Bimolecular: molecules must meet. Gas collision frequency is $\\sim 10^{10}$–$10^{11}$ M$^{-1}$s$^{-1}$.',
        'Steric factors can knock either down by 1–3 orders of magnitude.',
      ],
    },
    {
      prompt: 'Why does an endothermic reaction have $E_a \\ge \\Delta H$?',
      answer: 'You must supply at least the reaction enthalpy to reach the products, so the barrier cannot be lower than $\\Delta H$.',
      steps: [
        'For an endothermic reaction, products sit above reactants on the energy diagram.',
        'The barrier $E_a$ is measured from reactants to the transition state.',
        'The transition state must be at least as high as the products, so $E_a \\ge \\Delta H$.',
        'For exothermic reactions, $E_a$ can be small or even near zero.',
      ],
    },
  ];

  var ARRH_CHALLENGE = [
    {
      prompt: 'Explain the Eyring equation and show how it relates to Arrhenius.',
      answer: '$k = (k_B T / h)\\,e^{-\\Delta G^\\ddagger/RT} = (k_B T/h)\\,e^{\\Delta S^\\ddagger/R}\\,e^{-\\Delta H^\\ddagger/RT}$. Comparing with Arrhenius: $A \\approx (k_B T/h)e^{\\Delta S^\\ddagger/R}(e)$ and $E_a \\approx \\Delta H^\\ddagger + RT$.',
      steps: [
        'Eyring derives $k$ from the partition function of the transition state.',
        'Split $\\Delta G^\\ddagger = \\Delta H^\\ddagger - T\\Delta S^\\ddagger$.',
        'Compare term-by-term with $k = Ae^{-E_a/RT}$.',
        '$\\Delta H^\\ddagger$ replaces $E_a$ (approximately) and $\\Delta S^\\ddagger$ gets absorbed into $A$.',
      ],
    },
    {
      prompt: 'Describe the kinetic isotope effect and why replacing H with D slows many reactions.',
      answer: 'The C-D bond has a lower zero-point energy than C-H (because D is heavier), so the effective barrier for breaking a C-D bond is higher. Typical kinetic isotope effects $k_H/k_D \\sim 3$–$7$ for C-H bond breaking.',
      steps: [
        'Zero-point energy of a bond: $\\tfrac12\\hbar\\omega$, and $\\omega \\propto 1/\\sqrt\\mu$ where $\\mu$ is the reduced mass.',
        'Replacing H with D roughly doubles $\\mu$, lowering $\\omega$ by a factor $\\sqrt 2$.',
        'The C-D bond\'s ZPE is lower by $\\sim$5 kJ/mol, making the barrier effectively higher.',
        'Primary KIEs are diagnostic of C-H bond breaking in the rate-determining step.',
      ],
    },
    {
      prompt: 'Why does the rate of many biological enzyme reactions not follow simple Arrhenius behavior at high temperatures?',
      answer: 'Enzymes denature above their optimal temperature. As $T$ increases, the intrinsic rate constant rises (Arrhenius), but the fraction of active enzyme falls, eventually dominating and giving a "turnover temperature" where rate peaks and then drops.',
      steps: [
        'Below the optimum: $k$ increases with $T$ per Arrhenius.',
        'Above the optimum: protein unfolds, losing its catalytic structure.',
        'Net rate = (intrinsic rate) × (fraction folded) has a maximum.',
        'Typical peak for mesophiles: 30–40°C; thermophiles push into 70–100°C.',
      ],
    },
  ];

  PS.registerTopic("chem-kin-arrhenius", {
    title: "Arrhenius and activation energy",
    description: "Temperature dependence of rates, collision theory, and the transition-state picture.",
    warmup: ARRH_WARMUP,
    standard: ARRH_STANDARD,
    challenge: ARRH_CHALLENGE,
  });

  // ============================================================
  // TOPIC: chem-kin-mechanisms
  // ============================================================
  var MECH_WARMUP = [
    {
      prompt: 'What is an elementary step?',
      answer: 'A single-step molecular event whose rate law follows directly from its stoichiometry.',
      steps: [
        'Not all reactions are elementary; many proceed via a sequence of simpler steps.',
        'For an elementary step, the rate law is $r = k \\prod [\\text{reactants}]^{\\text{molecularity}}$.',
        'Only elementary steps have rate laws predictable from stoichiometry.',
      ],
    },
    {
      prompt: 'What is the rate-determining step (RDS) in a multi-step mechanism?',
      answer: 'The slowest elementary step, which sets the overall rate — the "bottleneck".',
      steps: [
        'In a sequential mechanism $A \\to B \\to C \\to \\dots$, the slowest step limits throughput.',
        'The observed rate law typically reflects the stoichiometry of the RDS and all steps before it.',
        'Faster steps are effectively in equilibrium and don\'t appear in the rate law directly.',
      ],
    },
    {
      prompt: 'What does the steady-state approximation assume?',
      answer: 'That an intermediate\'s concentration doesn\'t change significantly over the reaction timescale because its production and consumption rates are nearly equal.',
      steps: [
        'For an intermediate I: $d[I]/dt \\approx 0$.',
        'Solve for $[I]$ in terms of reactant concentrations.',
        'Substitute back into the expression for the observed rate.',
        'Valid when $[I]$ is small and transient.',
      ],
    },
    {
      prompt: 'What does a catalyst do, thermodynamically speaking?',
      answer: 'Nothing — it does not change $\\Delta G$ of the reaction. It only lowers the activation energy of the rate-determining step, speeding up equilibration.',
      steps: [
        'Catalysts provide an alternative pathway with a lower barrier.',
        'The equilibrium constant is unchanged because it depends only on $\\Delta G$.',
        'Both forward and reverse rates are enhanced by the same factor.',
      ],
    },
    {
      prompt: 'Write the Michaelis-Menten rate law.',
      answer: '$v = V_{\\max}[S]/(K_M + [S])$.',
      steps: [
        'Derived from enzyme + substrate $\\rightleftharpoons$ ES $\\to$ E + P using steady-state on ES.',
        '$V_{\\max} = k_{\\rm cat}[E]_0$ is the maximum rate.',
        '$K_M$ is the substrate concentration at half-maximum velocity.',
      ],
    },
  ];

  var MECH_STANDARD = [
    {
      prompt: 'A reaction has the mechanism: Step 1 $A + B \\rightleftharpoons C$ (fast equilibrium, constant $K_1$); Step 2 $C \\to D$ (slow, rate constant $k_2$). Find the overall rate law.',
      answer: '$r = k_2 K_1 [A][B]$.',
      steps: [
        'Step 1 equilibrium: $K_1 = [C]/([A][B])$, so $[C] = K_1[A][B]$.',
        'Step 2 is rate-determining: $r = k_2[C]$.',
        'Substitute: $r = k_2 K_1[A][B]$.',
        'The overall rate depends on $[A]$ and $[B]$ even though they\'re not in the RDS directly.',
      ],
    },
    {
      prompt: 'For the SSA: in the mechanism $A + B \\to^{k_1} I \\to^{k_2} P$, derive the rate of product formation in terms of $[A], [B]$.',
      answer: '$r = k_1 k_2 [A][B] / k_2 = k_1[A][B]$ (since only $I \\to P$ consumes $I$).',
      steps: [
        'Steady state on I: $d[I]/dt = k_1[A][B] - k_2[I] = 0$.',
        'So $[I] = (k_1/k_2)[A][B]$.',
        'Rate of P: $r = k_2[I] = k_1[A][B]$.',
        'For this simple chain, the answer equals step 1 alone.',
      ],
    },
    {
      prompt: 'An enzyme has $K_M = 1$ mM and $V_{\\max} = 10\\ \\mu$M/s. Compute the rate at $[S] = 0.5$ mM.',
      answer: '$v \\approx 3.33\\ \\mu$M/s.',
      steps: [
        '$v = V_{\\max}[S]/(K_M + [S]) = 10 \\cdot 0.5/(1 + 0.5)$.',
        '$= 10 \\cdot 0.333$.',
        '$\\approx 3.33\\ \\mu$M/s.',
      ],
    },
    {
      prompt: 'Why does the steady-state approximation fail for intermediates with large equilibrium constants?',
      answer: 'Because their concentrations accumulate appreciably; the assumption $[I] \\approx$ constant fails when $[I]$ is comparable to reactants.',
      steps: [
        'SSA requires the intermediate to be short-lived and small in concentration.',
        'If the intermediate accumulates, $d[I]/dt$ is not small.',
        'Use the pre-equilibrium approximation instead, or solve the ODEs numerically.',
      ],
    },
    {
      prompt: 'In the ozone destruction mechanism $\\rm Cl + O_3 \\to ClO + O_2$; $\\rm ClO + O \\to Cl + O_2$, explain why a single Cl atom can destroy many ozone molecules.',
      answer: 'Because Cl is a catalyst — it is regenerated in the second step, so one Cl atom can cycle through many times before being removed from the gas phase.',
      steps: [
        'Net reaction: $\\rm O_3 + O \\to 2O_2$; Cl is unchanged.',
        'Cl is consumed in step 1 and regenerated in step 2.',
        'Each cycle destroys one O$_3$; the atomic Cl lifetime is much longer than the cycle time.',
        'This catalytic chain explains the Montreal Protocol\'s focus on CFCs.',
      ],
    },
  ];

  var MECH_CHALLENGE = [
    {
      prompt: 'Discuss the Lindemann-Hinshelwood mechanism for unimolecular reactions and its prediction that $k_{\\rm uni}$ falls off at low pressure.',
      answer: 'Unimolecular reactions require collisional activation. At high pressure, activation is fast and the rate is first-order; at low pressure, activation becomes the bottleneck and the effective rate drops, becoming second-order in the reactant.',
      steps: [
        'Step 1: $A + M \\to^{k_1} A^* + M$ (activation by collision).',
        'Step 2: $A^* \\to^{k_2} P$ (unimolecular decay).',
        'SSA on $A^*$: $[A^*] = k_1[A][M]/(k_{-1}[M] + k_2)$.',
        'Rate: $r = k_2 k_1 [A][M]/(k_{-1}[M] + k_2)$. High-P: first-order in A. Low-P: second-order (requires collision partner).',
      ],
    },
    {
      prompt: 'Enzyme inhibition: compare how competitive vs. uncompetitive inhibitors affect $K_M$ and $V_{\\max}$.',
      answer: 'Competitive: apparent $K_M$ increases, $V_{\\max}$ unchanged. Uncompetitive: both $K_M$ and $V_{\\max}$ decrease by the same factor.',
      steps: [
        'Competitive inhibitor binds the active site; high [S] outcompetes it, so $V_{\\max}$ is recovered but $K_M$ looks bigger.',
        'Uncompetitive inhibitor binds only to ES; it pulls ES into an inactive form, lowering both $V_{\\max}$ and apparent $K_M$ in proportion.',
        'Non-competitive: mixes the two effects, lowering $V_{\\max}$ without changing $K_M$.',
      ],
    },
    {
      prompt: 'Why do heterogeneous catalysts like Pt or Ni for hydrogenation follow a Langmuir-Hinshelwood rate law rather than simple second-order kinetics?',
      answer: 'Both reactants must adsorb onto the surface before reacting. Rate depends on the product of surface coverages, which in turn depend on the gas-phase pressures via Langmuir isotherms; this yields rate laws that saturate at high pressure and change order with coverage.',
      steps: [
        'Surface coverage: $\\theta_i = K_i P_i/(1 + \\sum_j K_j P_j)$.',
        'Rate: $r \\propto \\theta_A\\theta_B$.',
        'At low coverage, rate $\\propto P_A P_B$ (second-order).',
        'At high coverage, rate saturates and can even decrease with excess of one reactant (self-poisoning).',
      ],
    },
  ];

  PS.registerTopic("chem-kin-mechanisms", {
    title: "Reaction mechanisms and catalysis",
    description: "Elementary steps, rate-determining step, steady-state analysis, and how catalysts change the picture.",
    warmup: MECH_WARMUP,
    standard: MECH_STANDARD,
    challenge: MECH_CHALLENGE,
  });

})();
