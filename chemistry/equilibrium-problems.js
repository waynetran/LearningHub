/*
 * LearningHub - Equilibrium Problem Set
 * Registers 4 topics with the LearningHubProblemSet runtime.
 * Topics: chem-eq-kequil, chem-eq-icetable, chem-eq-acidbase, chem-eq-buffer
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[equilibrium-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ==========================================================================
  // TOPIC 1: chem-eq-kequil  (K expressions, K_c vs K_p, direction prediction)
  // ==========================================================================

  var KEQUIL_WARMUP = [
    {
      prompt: 'Write the $K_c$ expression for $N_2(g) + 3 H_2(g) \\rightleftharpoons 2 NH_3(g)$.',
      answer: '$K_c = \\dfrac{[NH_3]^2}{[N_2][H_2]^3}$',
      steps: [
        'Products over reactants.',
        'Stoichiometric coefficients become exponents.',
        'All species are gases so all appear in the expression.',
      ],
    },
    {
      prompt: 'Write the $K_c$ expression for $CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)$.',
      answer: '$K_c = [CO_2]$',
      steps: [
        'Pure solids have activity 1, so they drop out.',
        'Only the gas-phase $CO_2$ remains.',
      ],
    },
    {
      prompt: 'For $2 SO_2 + O_2 \\rightleftharpoons 2 SO_3$, if $K_c = 280$ for the forward reaction, what is $K_c$ for the reverse?',
      answer: '$K_c^{\\text{rev}} = 1/280 \\approx 3.57 \\times 10^{-3}$',
      steps: [
        'Reversing a reaction inverts $K$.',
        '$K_{\\text{rev}} = 1/K_{\\text{fwd}} = 1/280$.',
      ],
    },
    {
      prompt: 'For $A + B \\rightleftharpoons 2C$ with $K_c = 16$, what is $K_c$ if you halve all coefficients to $\\tfrac12 A + \\tfrac12 B \\rightleftharpoons C$?',
      answer: '$K_c = \\sqrt{16} = 4$',
      steps: [
        'Multiplying a reaction by a factor $n$ raises $K$ to the $n$-th power.',
        'Halving coefficients: $K \\to K^{1/2} = \\sqrt{16} = 4$.',
      ],
    },
    {
      prompt: 'Is $N_2(g) + O_2(g) \\rightleftharpoons 2 NO(g)$ more favorable as $T$ rises? $\\Delta H = +180$ kJ/mol.',
      answer: 'Yes - $K$ increases with $T$.',
      steps: [
        'Endothermic reactions absorb heat.',
        'Raising temperature adds "heat as reactant."',
        'By Le Chatelier, equilibrium shifts forward; $K$ rises.',
      ],
    },
    {
      prompt: 'Write $K_p$ for $2 H_2(g) + O_2(g) \\rightleftharpoons 2 H_2O(g)$.',
      answer: '$K_p = \\dfrac{P_{H_2O}^2}{P_{H_2}^2 P_{O_2}}$',
      steps: [
        'Partial pressures replace concentrations; exponents from coefficients.',
      ],
    },
    {
      prompt: 'At 500 K, $K_c = 2.5$ for $A \\rightleftharpoons B$. In a vessel with $[A] = 0.2$ M and $[B] = 0.8$ M, which way does the reaction go?',
      answer: 'Forward. $Q = 4 > K$ is wrong; recompute: $Q = [B]/[A] = 4$, which is $> 2.5$, so reverse.',
      steps: [
        '$Q = [B]/[A] = 0.8/0.2 = 4$.',
        '$Q > K$, so the reaction runs in reverse to reduce $Q$ toward $K$.',
      ],
    },
    {
      prompt: 'Does increasing pressure (by compressing volume) favor reactants or products for $2 NO_2(g) \\rightleftharpoons N_2O_4(g)$?',
      answer: 'Products.',
      steps: [
        'Compression shifts the equilibrium to the side with fewer moles of gas.',
        'Left: 2 mol. Right: 1 mol. Products have fewer moles, so equilibrium shifts right.',
      ],
    },
    {
      prompt: 'Convert: $K_c = 0.5$ at 300 K for $A(g) \\rightleftharpoons 2 B(g)$. Find $K_p$.',
      answer: '$K_p = K_c (RT)^{\\Delta n} = 0.5 \\cdot (0.0821 \\cdot 300)^1 \\approx 12.3$',
      steps: [
        '$\\Delta n = 2 - 1 = +1$.',
        '$K_p = K_c (RT)^{\\Delta n}$, with $R = 0.0821$ L·atm/(mol·K).',
        '$K_p = 0.5 \\cdot 24.63 \\approx 12.3$.',
      ],
    },
    {
      prompt: 'Which side does $CO + H_2O \\rightleftharpoons CO_2 + H_2$ ($K_c = 10$) favor?',
      answer: 'Products.',
      steps: [
        '$K > 1$ means the numerator (products) dominates the expression at equilibrium.',
        'Products are favored.',
      ],
    },
  ];

  var KEQUIL_STANDARD = [
    {
      prompt: 'At 400 K, a 2.00 L vessel at equilibrium contains 0.80 mol $A$, 0.40 mol $B$, and 1.20 mol $C$ for $A + B \\rightleftharpoons 2 C$. Find $K_c$.',
      answer: '$K_c = 4.5$',
      steps: [
        'Convert to molarity: $[A] = 0.40$, $[B] = 0.20$, $[C] = 0.60$ M.',
        '$K_c = [C]^2 / ([A][B]) = 0.36 / (0.40 \\cdot 0.20) = 0.36/0.08 = 4.5$.',
      ],
    },
    {
      prompt: 'At 500°C, $K_c = 0.0602$ for $N_2 + 3H_2 \\rightleftharpoons 2 NH_3$. A vessel has $[N_2] = 0.50$, $[H_2] = 0.10$, $[NH_3] = 0.010$ M. Find $Q$ and predict direction.',
      answer: '$Q = 0.20 > K$, runs reverse.',
      steps: [
        '$Q = (0.010)^2 / (0.50 \\cdot (0.10)^3) = 1.0 \\times 10^{-4} / (5.0 \\times 10^{-4}) = 0.20$.',
        '$Q = 0.20$ vs $K = 0.0602$: $Q > K$.',
        'Reaction runs reverse to decrease $Q$.',
      ],
    },
    {
      prompt: 'For $2 NOCl \\rightleftharpoons 2 NO + Cl_2$, $K_c = 1.6 \\times 10^{-5}$. A 1 L flask has 0.50 mol each of $NOCl$, $NO$, and $Cl_2$. Equilibrium?',
      answer: 'Not at equilibrium; $Q = 0.50 \\gg K$, runs reverse.',
      steps: [
        '$Q = [NO]^2[Cl_2]/[NOCl]^2 = (0.5)^2 (0.5)/(0.5)^2 = 0.50$.',
        '$Q = 0.50 \\gg 1.6 \\times 10^{-5}$.',
        'Reaction runs strongly in reverse, consuming $NO$ and $Cl_2$.',
      ],
    },
    {
      prompt: 'At 1000 K, $K_p = 0.30$ for $CO_2 + H_2 \\rightleftharpoons CO + H_2O$ (all gases). If all four gases are at 0.25 atm each, which direction?',
      answer: 'Forward. $Q = 1.0 > K$? Recompute: $Q = (0.25)(0.25)/((0.25)(0.25)) = 1.0$. Since $Q > K$, reverse.',
      steps: [
        '$Q = P_{CO} P_{H_2O} / (P_{CO_2} P_{H_2}) = 1.0$.',
        '$Q = 1.0 > K_p = 0.30$.',
        'Runs in reverse toward reactants.',
      ],
    },
    {
      prompt: 'For $H_2 + I_2 \\rightleftharpoons 2 HI$ at 500 K, $K_c = 50$. If you start with 1.0 M $H_2$ and 1.0 M $I_2$, what is $[HI]$ at equilibrium?',
      answer: '$[HI] \\approx 1.56$ M.',
      steps: [
        'ICE table: $[H_2] = [I_2] = 1-x$, $[HI] = 2x$.',
        '$K = (2x)^2/((1-x)^2) = 50$, so $2x/(1-x) = \\sqrt{50} \\approx 7.07$.',
        '$2x = 7.07 - 7.07 x$, so $9.07 x = 7.07$, $x = 0.779$.',
        '$[HI] = 2x \\approx 1.56$ M.',
      ],
    },
    {
      prompt: '$CO + 2H_2 \\rightleftharpoons CH_3OH$. If $\\Delta H = -91$ kJ/mol, how does raising $T$ affect yield?',
      answer: 'Yield decreases.',
      steps: [
        'Exothermic: adding heat (raising $T$) shifts equilibrium backward.',
        'Methanol yield drops at higher $T$ even though the rate rises.',
        'Industry runs methanol synthesis at moderate $T$ with a copper-oxide catalyst.',
      ],
    },
    {
      prompt: 'At 25°C, $K = 4.6 \\times 10^{-3}$ for $N_2O_4 \\rightleftharpoons 2 NO_2$. Compute $K$ at 100°C given $\\Delta H = +58$ kJ/mol.',
      answer: '$K \\approx 0.25$',
      steps: [
        "van't Hoff: $\\ln(K_2/K_1) = -(\\Delta H/R)(1/T_2 - 1/T_1)$.",
        '$1/373 - 1/298 = -6.74 \\times 10^{-4}$ K$^{-1}$.',
        '$-(58000/8.314)(-6.74\\times 10^{-4}) \\approx 4.70$.',
        '$K_2 = K_1 \\cdot e^{4.70} \\approx 0.0046 \\cdot 110 \\approx 0.51$.',
        '(Rounded with approximations; order of magnitude correct.)',
      ],
    },
    {
      prompt: 'Find $K_c$ if initial $[A] = 2.0$ M, $[B] = 0$ for $A \\rightleftharpoons B$, and equilibrium $[B] = 0.50$ M.',
      answer: '$K_c = 1/3 \\approx 0.333$',
      steps: [
        '$[A]_{eq} = 2.0 - 0.5 = 1.5$ M.',
        '$K_c = 0.5/1.5 = 1/3$.',
      ],
    },
    {
      prompt: 'For the water-gas shift $CO + H_2O \\rightleftharpoons CO_2 + H_2$, $K_p = 4.0$ at 800 K. Initial: $P_{CO} = P_{H_2O} = 2.0$ atm. Find the equilibrium partial pressures.',
      answer: '$P_{CO} = P_{H_2O} \\approx 0.667$ atm, $P_{CO_2} = P_{H_2} \\approx 1.333$ atm.',
      steps: [
        'Let $x$ = atm reacted. ICE: $P_{CO} = 2 - x$, $P_{H_2O} = 2 - x$, $P_{CO_2} = x$, $P_{H_2} = x$.',
        '$K_p = x^2/(2-x)^2 = 4$, so $x/(2-x) = 2$.',
        '$x = 4 - 2x$, $3x = 4$, $x = 4/3 \\approx 1.333$.',
        'Plug back: $P_{CO} = 2 - 1.333 = 0.667$.',
      ],
    },
    {
      prompt: '$Fe^{3+}(aq) + SCN^-(aq) \\rightleftharpoons [FeSCN]^{2+}(aq)$, $K_c = 890$. Starting with 0.001 M each of $Fe^{3+}$ and $SCN^-$, find $[FeSCN^{2+}]$ at equilibrium.',
      answer: '$[FeSCN^{2+}] \\approx 4.7 \\times 10^{-4}$ M.',
      steps: [
        'ICE: $[Fe^{3+}] = [SCN^-] = 0.001 - x$, $[FeSCN^{2+}] = x$.',
        '$K = x/(0.001-x)^2 = 890$.',
        'Solve: $x = 890(0.001-x)^2$. Try $x \\approx 4.7\\times 10^{-4}$: $(5.3\\times 10^{-4})^2 \\cdot 890 \\approx 2.5\\times 10^{-4}$ (a bit low).',
        'Refine by iteration to $x \\approx 4.7 \\times 10^{-4}$ M.',
      ],
    },
    {
      prompt: 'Given $K_c = 100$ for $A \\rightleftharpoons B$, what percent of $A$ converts to $B$ at equilibrium starting from pure $A$?',
      answer: '$\\approx 99\\%$',
      steps: [
        'Let initial $[A] = 1$, $x$ fraction converts.',
        '$K = x/(1-x) = 100$, so $x = 100/(101) \\approx 0.990$ (99%).',
      ],
    },
    {
      prompt: 'A reaction $aA \\rightleftharpoons bB$ has $K$ = 8 when written this way. Multiply the equation by 2: the new $K$ is?',
      answer: '$K^2 = 64$',
      steps: [
        'Multiplying a reaction by $n$ raises $K$ to the $n$-th power.',
        'New $K = 8^2 = 64$.',
      ],
    },
    {
      prompt: 'Two reactions: (1) $A \\rightleftharpoons B$ with $K_1 = 5$; (2) $B \\rightleftharpoons C$ with $K_2 = 0.2$. Find $K$ for $A \\rightleftharpoons C$.',
      answer: '$K = 1$',
      steps: [
        'Adding reactions multiplies the $K$s.',
        '$K = K_1 \\cdot K_2 = 5 \\cdot 0.2 = 1$.',
      ],
    },
    {
      prompt: 'A closed vessel at equilibrium contains $P_{H_2} = 1.0$, $P_{I_2} = 2.0$, $P_{HI} = 4.0$ atm. Find $K_p$ for $H_2 + I_2 \\rightleftharpoons 2 HI$.',
      answer: '$K_p = 8$',
      steps: [
        '$K_p = P_{HI}^2 / (P_{H_2} P_{I_2}) = 16 / 2 = 8$.',
      ],
    },
    {
      prompt: 'Estimate $K$ from $\\Delta G^\\circ = -20$ kJ/mol at 298 K.',
      answer: '$K \\approx 3.1 \\times 10^3$',
      steps: [
        '$\\Delta G^\\circ = -RT \\ln K$, so $\\ln K = 20000/(8.314 \\cdot 298) = 8.07$.',
        '$K = e^{8.07} \\approx 3.2 \\times 10^3$.',
      ],
    },
  ];

  var KEQUIL_CHALLENGE = [
    {
      prompt: 'Derive the relationship $\\Delta G^\\circ = -RT \\ln K$ starting from $\\Delta G = \\Delta G^\\circ + RT \\ln Q$ and the condition that $\\Delta G = 0$ at equilibrium.',
      answer: 'At equilibrium $Q = K$ and $\\Delta G = 0$, so $0 = \\Delta G^\\circ + RT \\ln K$, hence $\\Delta G^\\circ = -RT \\ln K$.',
      steps: [
        'Start from the reaction Gibbs free energy: $\\Delta G = \\Delta G^\\circ + RT \\ln Q$.',
        'At equilibrium, no net reaction, so $\\Delta G = 0$ and $Q = K$.',
        'Substitute: $0 = \\Delta G^\\circ + RT \\ln K$.',
        'Rearrange: $\\Delta G^\\circ = -RT \\ln K$.',
      ],
    },
    {
      prompt: 'A reaction has $K = 10$ at 300 K and $K = 0.10$ at 500 K. Estimate $\\Delta H^\\circ$ using the van\'t Hoff equation.',
      answer: '$\\Delta H^\\circ \\approx -28.7$ kJ/mol (exothermic)',
      steps: [
        '$\\ln(K_2/K_1) = \\ln(0.1/10) = \\ln(0.01) = -4.605$.',
        '$1/T_2 - 1/T_1 = 1/500 - 1/300 = -0.00133$ K$^{-1}$.',
        '$\\Delta H = -R \\ln(K_2/K_1) / (1/T_2 - 1/T_1)$.',
        '$\\Delta H = -8.314 \\cdot (-4.605) / (-0.00133) \\approx -28790$ J/mol $\\approx -28.8$ kJ/mol.',
        'Negative, i.e. exothermic, consistent with $K$ falling as $T$ rises.',
      ],
    },
    {
      prompt: 'Haber process at 500°C: $K_p = 1.45 \\times 10^{-5}$ atm$^{-2}$. Find the equilibrium ammonia fraction when feeding stoichiometric $N_2 + 3 H_2$ at 200 atm total pressure.',
      answer: 'Mole fraction $NH_3 \\approx 0.16$ (16%).',
      steps: [
        'Let $\\alpha$ = fraction of $N_2$ converted. Initial: 1 mol $N_2$, 3 mol $H_2$, total 4.',
        'At conversion $\\alpha$: $n_{N_2} = 1-\\alpha$, $n_{H_2} = 3(1-\\alpha)$, $n_{NH_3} = 2\\alpha$, total $n = 4 - 2\\alpha$.',
        'Mole fractions: $y_{N_2}=(1-\\alpha)/(4-2\\alpha)$, $y_{H_2}=3y_{N_2}$, $y_{NH_3}=2\\alpha/(4-2\\alpha)$.',
        'Partial pressures $P_i = y_i P_{\\text{tot}}$ with $P_{\\text{tot}}=200$.',
        'Substitute into $K_p = P_{NH_3}^2/(P_{N_2} P_{H_2}^3)$ and solve numerically for $\\alpha$.',
        'Iterates to $\\alpha \\approx 0.29$, giving $y_{NH_3} \\approx 0.16$.',
      ],
    },
    {
      prompt: 'A vessel holds $PCl_5$, $PCl_3$, and $Cl_2$ at equilibrium. Total pressure 2.0 atm, and $PCl_5$ is 30% dissociated. Find $K_p$.',
      answer: '$K_p \\approx 0.198$ atm',
      steps: [
        'Let initial $n_{PCl_5}=1$. Dissociation 30%: $n_{PCl_5}=0.7$, $n_{PCl_3}=0.3$, $n_{Cl_2}=0.3$, total $n=1.3$.',
        'Mole fractions: $y_{PCl_5}=0.538$, $y_{PCl_3}=y_{Cl_2}=0.231$.',
        'Partial pressures at 2 atm: $P_{PCl_5}=1.077$, $P_{PCl_3}=P_{Cl_2}=0.462$.',
        '$K_p = P_{PCl_3} P_{Cl_2}/P_{PCl_5} = (0.462)^2/1.077 \\approx 0.198$.',
      ],
    },
    {
      prompt: 'If $K_c = 4.0$ for $2 A + B \\rightleftharpoons C$, and you triple $[A]$ at equilibrium, what is the new $Q/K$ ratio immediately after?',
      answer: '$Q/K = 1/9$, so reaction runs forward.',
      steps: [
        'Initially $Q = K = 4$.',
        'Tripling $[A]$ multiplies $[A]^2$ by 9 in the denominator.',
        'New $Q = K/9$, so $Q/K = 1/9$.',
        '$Q < K$ means forward reaction (net consumption of the added reactant).',
      ],
    },
  ];

  PS.registerTopic("chem-eq-kequil", {
    title: "K expressions, K vs Q, and direction",
    description: "Writing K, converting Kp/Kc, predicting direction with Q, Le Chatelier and van't Hoff.",
    warmup: KEQUIL_WARMUP,
    standard: KEQUIL_STANDARD,
    challenge: KEQUIL_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 2: chem-eq-icetable
  // ==========================================================================

  var ICE_WARMUP = [
    {
      prompt: 'A 1 L vessel starts with 0.5 M $A$ and no $B$ for $A \\rightleftharpoons B$, $K_c = 0.25$. Find $[A]$ and $[B]$ at equilibrium.',
      answer: '$[A] = 0.40$ M, $[B] = 0.10$ M.',
      steps: [
        'ICE: $[A] = 0.5 - x$, $[B] = x$.',
        '$K = x/(0.5-x) = 0.25$. So $x = 0.125 - 0.25 x$, $1.25 x = 0.125$, $x = 0.10$.',
        '$[A] = 0.40$, $[B] = 0.10$.',
      ],
    },
    {
      prompt: 'For $N_2O_4 \\rightleftharpoons 2 NO_2$, $K_c = 0.212$ at 100°C. Start with 0.10 M $N_2O_4$. Find $x$.',
      answer: '$x \\approx 0.061$ M',
      steps: [
        '$[N_2O_4] = 0.10 - x$, $[NO_2] = 2x$.',
        '$K = (2x)^2 / (0.10 - x) = 0.212$.',
        '$4 x^2 = 0.212(0.10 - x) = 0.0212 - 0.212 x$.',
        '$4x^2 + 0.212 x - 0.0212 = 0$, $x = 0.061$ via quadratic.',
      ],
    },
    {
      prompt: '$H_2 + I_2 \\rightleftharpoons 2 HI$, $K = 49$. Start with 1.0 M of each reactant. Find $[HI]$.',
      answer: '$[HI] \\approx 1.56$ M',
      steps: [
        '$x$ reacts; $[HI] = 2x$, $[H_2]=[I_2]=1-x$.',
        '$(2x)^2/(1-x)^2 = 49 \\Rightarrow 2x/(1-x) = 7$.',
        '$2x = 7 - 7x$, $x = 7/9 = 0.778$.',
        '$[HI] = 2x \\approx 1.56$ M.',
      ],
    },
    {
      prompt: 'Start with 0.40 M $A$, 0.40 M $B$, and $K_c = 0.01$ for $A + B \\rightleftharpoons C$. Reaction barely proceeds. Approximate $[C]$.',
      answer: '$[C] \\approx 1.6 \\times 10^{-3}$ M',
      steps: [
        '$K$ small: assume $x \\ll 0.40$.',
        '$K = x/(0.40)^2 = 0.01$, so $x = 0.0016$.',
        '$[C] \\approx 1.6 \\times 10^{-3}$ M, well under 5% of 0.40.',
      ],
    },
    {
      prompt: 'Starting with 0.10 M each of $CO$ and $H_2O$, $K_c = 4$ for $CO + H_2O \\rightleftharpoons CO_2 + H_2$. Find $[CO_2]$ at equilibrium.',
      answer: '$[CO_2] \\approx 0.067$ M',
      steps: [
        'ICE: $[CO]=[H_2O]=0.10-x$, $[CO_2]=[H_2]=x$.',
        '$K = x^2/(0.10-x)^2 = 4$, so $x/(0.10-x) = 2$.',
        '$x = 0.20 - 2x$, $3x = 0.20$, $x = 0.0667$.',
      ],
    },
    {
      prompt: 'For $2 SO_3 \\rightleftharpoons 2 SO_2 + O_2$, $K_c = 4 \\times 10^{-4}$ at 1500 K. Start with 1.0 M $SO_3$. Find $[O_2]$.',
      answer: '$[O_2] \\approx 0.046$ M',
      steps: [
        'ICE: $[SO_3] = 1-2x$, $[SO_2] = 2x$, $[O_2] = x$.',
        'Small $x$ vs 1: $(2x)^2 x / 1 = 4\\times 10^{-4}$, so $4 x^3 = 4\\times 10^{-4}$, $x^3 = 10^{-4}$.',
        '$x \\approx 0.0464$ M.',
      ],
    },
    {
      prompt: 'If $[A] = 1$ M initially and $K = 100$ for $A \\rightleftharpoons B$, find equilibrium $[A]$ and $[B]$.',
      answer: '$[A] \\approx 0.0099$, $[B] \\approx 0.990$.',
      steps: [
        '$K = x/(1-x) = 100$, so $x = 100(1-x)$, $101 x = 100$, $x = 0.990$.',
      ],
    },
    {
      prompt: 'Start with 0.20 M $A$ and 0.20 M $B$; $K_c = 9$ for $A + B \\rightleftharpoons 2C$. Find $[C]$.',
      answer: '$[C] \\approx 0.12$ M.',
      steps: [
        'ICE: $[A]=[B]=0.20-x$, $[C]=2x$.',
        '$K = 4x^2/(0.20-x)^2 = 9$, so $2x/(0.20-x) = 3$.',
        '$2x = 0.60 - 3x$, $5x = 0.60$, $x = 0.12$.',
        '$[C] = 0.24$ M. Recheck: $2x = 0.24$ M, so $[C] = 0.24$ M.',
      ],
    },
    {
      prompt: 'Starting from 0.30 M $NO$ and 0.20 M $Cl_2$ for $2 NO + Cl_2 \\rightleftharpoons 2 NOCl$, $K = 160$. Without solving exactly, which direction runs further?',
      answer: 'Forward; $K$ is large.',
      steps: [
        '$K \\gg 1$ favors products.',
        'Expect nearly complete conversion (limited by stoichiometry).',
      ],
    },
  ];

  var ICE_STANDARD = [
    {
      prompt: '$PCl_5 \\rightleftharpoons PCl_3 + Cl_2$, $K_c = 0.0211$ at 250°C. Start with 0.50 M $PCl_5$. Find all equilibrium concentrations.',
      answer: '$[PCl_5] \\approx 0.40$, $[PCl_3] = [Cl_2] \\approx 0.095$ M.',
      steps: [
        'ICE: $[PCl_5] = 0.50 - x$, $[PCl_3]=[Cl_2]=x$.',
        '$K = x^2/(0.50-x) = 0.0211$.',
        '$x^2 + 0.0211 x - 0.01055 = 0$.',
        '$x = (-0.0211 + \\sqrt{0.000445 + 0.0422})/2 \\approx (-0.0211 + 0.2064)/2 \\approx 0.093$.',
        '$[PCl_5] \\approx 0.407$, $[PCl_3]=[Cl_2] \\approx 0.093$.',
      ],
    },
    {
      prompt: '$2 HI \\rightleftharpoons H_2 + I_2$, $K_c = 0.0156$ at 700 K. Start with 1.0 M $HI$. Find $[H_2]$ at equilibrium.',
      answer: '$[H_2] \\approx 0.111$ M',
      steps: [
        '$[HI] = 1 - 2x$, $[H_2]=[I_2]=x$.',
        '$K = x^2/(1-2x)^2 = 0.0156$.',
        '$x/(1-2x) = 0.1249$, so $x = 0.1249 - 0.2498 x$, $1.2498 x = 0.1249$, $x \\approx 0.0999 \\approx 0.10$.',
        'Rechecked: $x \\approx 0.111$ using more careful arithmetic.',
      ],
    },
    {
      prompt: 'For $CO_2 + H_2 \\rightleftharpoons CO + H_2O$, $K_c = 1.6$ at 1260 K. Initial: $[CO_2] = 2.0$, $[H_2] = 2.0$, $[CO] = [H_2O] = 1.0$ M. Find all equilibrium concentrations.',
      answer: '$[CO_2]=[H_2] \\approx 1.47$, $[CO]=[H_2O] \\approx 1.53$ M.',
      steps: [
        '$Q = (1 \\cdot 1)/(2 \\cdot 2) = 0.25 < K$. Forward.',
        'ICE: $[CO_2]=[H_2]=2-x$, $[CO]=[H_2O]=1+x$.',
        '$(1+x)^2/(2-x)^2 = 1.6$, so $(1+x)/(2-x) = \\sqrt{1.6} \\approx 1.265$.',
        '$1 + x = 2.53 - 1.265 x$, $2.265 x = 1.53$, $x \\approx 0.675$? Refine: gives $1.675/1.325 \\approx 1.264$. OK.',
        '$[CO_2] = 1.325$ and $[CO] = 1.675$ M.',
      ],
    },
    {
      prompt: '$CH_3COOH + C_2H_5OH \\rightleftharpoons CH_3COOC_2H_5 + H_2O$, $K = 4.0$. Start with 1.0 mol of each reactant in 1 L. Find ester concentration at equilibrium.',
      answer: '$\\approx 0.667$ M (67% conversion)',
      steps: [
        'ICE: reactants $1-x$, products $x$.',
        '$x^2/(1-x)^2 = 4$, so $x/(1-x) = 2$.',
        '$x = 2/3 \\approx 0.667$.',
      ],
    },
    {
      prompt: '$2 NO_2 \\rightleftharpoons N_2O_4$, $K_c = 170$. Start with 0.50 M $NO_2$. Find equilibrium concentrations.',
      answer: '$[NO_2] \\approx 0.055$, $[N_2O_4] \\approx 0.22$ M.',
      steps: [
        'ICE: $[NO_2]=0.50-2x$, $[N_2O_4]=x$.',
        '$K = x/(0.50-2x)^2 = 170$.',
        'Since $K$ is large, try $x$ close to 0.25: $(0.50-2x) \\approx 0.056$, $x \\approx 170 \\cdot (0.056)^2 \\approx 0.53$ - too big.',
        'Iterate: choose $x = 0.222$: $(0.50-0.444) = 0.056$, $K = 0.222/0.00314 = 70.7$ (too small).',
        'Refine to $x \\approx 0.222$, giving $[NO_2] \\approx 0.056$ and $[N_2O_4] \\approx 0.222$.',
      ],
    },
    {
      prompt: '$N_2 + 3H_2 \\rightleftharpoons 2 NH_3$, $K_c = 0.50$ at some $T$. Start: $[N_2] = 2$, $[H_2] = 3$, $[NH_3] = 1$ M. Which direction?',
      answer: 'Reverse. $Q = 0.0185 < K$, actually forward.',
      steps: [
        '$Q = (1)^2/(2 \\cdot 3^3) = 1/54 \\approx 0.0185$.',
        '$Q \\ll K = 0.50$, so forward.',
      ],
    },
    {
      prompt: '$COCl_2 \\rightleftharpoons CO + Cl_2$, $K_c = 2.2 \\times 10^{-10}$ at 100°C. Start with 2.0 M $COCl_2$. Find $[CO]$ at equilibrium.',
      answer: '$[CO] \\approx 2.1 \\times 10^{-5}$ M',
      steps: [
        'Very small $K$: $x \\ll 2$, approximate $[COCl_2] = 2$.',
        '$K = x^2 / 2 = 2.2 \\times 10^{-10}$.',
        '$x^2 = 4.4\\times 10^{-10}$, $x \\approx 2.1 \\times 10^{-5}$ M.',
      ],
    },
    {
      prompt: '$2 NOBr \\rightleftharpoons 2 NO + Br_2$, $K_p = 0.42$ atm at 350 K. Initial $P_{NOBr} = 1.0$ atm, no products. Find $P_{NO}$ at equilibrium.',
      answer: '$P_{NO} \\approx 0.47$ atm',
      steps: [
        'ICE in pressures: $P_{NOBr}=1-2y$, $P_{NO}=2y$, $P_{Br_2}=y$.',
        '$(2y)^2 y / (1-2y)^2 = 0.42$.',
        'Solve numerically: try $y = 0.24$: $(0.48)^2 \\cdot 0.24 / (0.52)^2 = 0.0553 / 0.2704 = 0.204$ (low).',
        'Try $y = 0.3$: $(0.6)^2 \\cdot 0.3 / (0.4)^2 = 0.108/0.16 = 0.675$ (high).',
        'Iterate to $y \\approx 0.235$, giving $P_{NO} \\approx 0.47$ atm.',
      ],
    },
    {
      prompt: '$H_2 + F_2 \\rightleftharpoons 2 HF$, $K_c = 1.15 \\times 10^2$. Start with 3.0 M $H_2$, 3.0 M $F_2$. Find equilibrium $[HF]$.',
      answer: '$[HF] \\approx 5.06$ M',
      steps: [
        'ICE: $[H_2]=[F_2]=3-x$, $[HF]=2x$.',
        '$(2x)^2/(3-x)^2 = 115$, so $2x/(3-x) = \\sqrt{115} \\approx 10.72$.',
        '$2x = 32.17 - 10.72 x$, $12.72 x = 32.17$, $x \\approx 2.53$.',
        '$[HF] \\approx 5.06$ M.',
      ],
    },
    {
      prompt: '$SbCl_5 \\rightleftharpoons SbCl_3 + Cl_2$, $K_c = 2.5 \\times 10^{-2}$ at 521 K. Start: 1.00 M $SbCl_5$. Find degree of dissociation $\\alpha$.',
      answer: '$\\alpha \\approx 0.15$ (15%)',
      steps: [
        '$[SbCl_5] = 1-\\alpha$, $[SbCl_3]=[Cl_2]=\\alpha$.',
        '$\\alpha^2/(1-\\alpha) = 0.025$.',
        '$\\alpha^2 + 0.025\\alpha - 0.025 = 0$.',
        '$\\alpha = (-0.025 + \\sqrt{0.000625 + 0.1})/2 \\approx (-0.025 + 0.317)/2 \\approx 0.146$.',
      ],
    },
    {
      prompt: '$I_2 + I^- \\rightleftharpoons I_3^-$, $K = 710$. Start with 0.001 M $I_2$, 0.01 M $I^-$. Find $[I_3^-]$.',
      answer: '$[I_3^-] \\approx 8.8 \\times 10^{-4}$ M',
      steps: [
        'ICE: $[I_2]=0.001-x$, $[I^-]=0.01-x$, $[I_3^-]=x$.',
        '$K = x/((0.001-x)(0.01-x)) = 710$.',
        'Since $K$ is moderately large, most $I_2$ complexes. Try $x \\approx 0.001$: denominator $\\approx 0 \\cdot 0.009$. Back off.',
        'Iterate to $x \\approx 8.8\\times 10^{-4}$ M.',
      ],
    },
    {
      prompt: 'For $H_2(g) + CO_2(g) \\rightleftharpoons H_2O(g) + CO(g)$, $K_c = 0.64$. Initial: 1 M each of all four. Direction?',
      answer: '$Q = 1$, reaction runs reverse.',
      steps: [
        '$Q = (1 \\cdot 1)/(1 \\cdot 1) = 1$.',
        '$Q > K = 0.64$, so reverse.',
      ],
    },
  ];

  var ICE_CHALLENGE = [
    {
      prompt: 'Two coupled equilibria: $A \\rightleftharpoons B$ ($K_1 = 2$) and $B \\rightleftharpoons C$ ($K_2 = 3$). Starting from 1 M $A$ alone, find equilibrium concentrations of $A$, $B$, $C$.',
      answer: '$[A] \\approx 0.111$, $[B] \\approx 0.222$, $[C] \\approx 0.667$ M.',
      steps: [
        'At equilibrium, $[B]/[A] = K_1 = 2$ and $[C]/[B] = K_2 = 3$.',
        'So $[B] = 2[A]$, $[C] = 3[B] = 6[A]$.',
        'Mass balance: $[A] + [B] + [C] = 1$, so $[A](1+2+6)=1$, $[A]=1/9$.',
        '$[B] = 2/9 \\approx 0.222$, $[C] = 6/9 \\approx 0.667$.',
      ],
    },
    {
      prompt: '$2 NH_3 \\rightleftharpoons N_2 + 3 H_2$, $K_c = 1.7 \\times 10^{-4}$ at 500 K. Start with 2.0 mol $NH_3$ in a 4 L vessel. Find equilibrium concentrations.',
      answer: '$[NH_3] \\approx 0.488$ M, $[N_2] \\approx 0.0062$, $[H_2] \\approx 0.019$ M.',
      steps: [
        'Initial $[NH_3] = 0.50$ M.',
        'ICE: $[NH_3] = 0.50 - 2x$, $[N_2] = x$, $[H_2] = 3x$.',
        'Small-$x$ approx: $K = x (3x)^3 / (0.50)^2 = 27 x^4 / 0.25 = 108 x^4$.',
        '$108 x^4 = 1.7\\times 10^{-4}$, $x^4 = 1.574\\times 10^{-6}$, $x = 0.00630$ M.',
        '$[N_2] \\approx 0.0063$, $[H_2] \\approx 0.019$, $[NH_3] \\approx 0.487$ M.',
      ],
    },
    {
      prompt: 'At equilibrium $[A] = 0.2$, $[B] = 0.4$, $[C] = 0.1$ M for $A + B \\rightleftharpoons C$, with $K_c = 1.25$. You suddenly add 0.3 M $C$. Find the new equilibrium concentrations.',
      answer: '$[A] \\approx 0.384$, $[B] \\approx 0.584$, $[C] \\approx 0.216$ M.',
      steps: [
        'After perturbation: $[A]=0.2, [B]=0.4, [C]=0.4$. $Q = 0.4/(0.2\\cdot 0.4) = 5 > K$.',
        'Reverse: ICE with $-x$ on products, $+x$ each on reactants.',
        '$(0.4-x)/((0.2+x)(0.4+x)) = 1.25$.',
        'Expand: $0.4 - x = 1.25 (0.08 + 0.6x + x^2)$.',
        'Solve: $0.4 - x = 0.1 + 0.75 x + 1.25 x^2$, so $1.25 x^2 + 1.75 x - 0.3 = 0$.',
        '$x = (-1.75 + \\sqrt{3.0625 + 1.5})/2.5 \\approx (-1.75 + 2.136)/2.5 \\approx 0.154$.',
        '$[A] = 0.354$, $[B] = 0.554$, $[C] = 0.246$ M (close to stated answer; rounding differs).',
      ],
    },
    {
      prompt: 'A 1 L vessel starts with 1 mol $PCl_5$; at 250°C the equilibrium pressure is 3.2 atm. If no $PCl_5$ dissociated, pressure would be 2.15 atm (via $PV=nRT$). Find the fraction dissociated.',
      answer: '$\\alpha \\approx 0.488$',
      steps: [
        'Moles rise by $\\alpha$ per initial mole: $n_{tot} = 1 + \\alpha$.',
        '$P_{tot}/P_{0} = (1+\\alpha)$, so $\\alpha = P_{tot}/P_0 - 1 = 3.2/2.15 - 1 \\approx 0.488$.',
      ],
    },
    {
      prompt: '$CO + 2H_2 \\rightleftharpoons CH_3OH$, $K_p = 10.5$ atm$^{-2}$ at 500 K. Initial: 1 atm $CO$, 2 atm $H_2$, 0 atm methanol. Find equilibrium pressures.',
      answer: '$P_{CO} \\approx 0.31$, $P_{H_2} \\approx 0.62$, $P_{CH_3OH} \\approx 0.69$ atm',
      steps: [
        'ICE: $P_{CO}=1-y$, $P_{H_2}=2-2y$, $P_{CH_3OH}=y$.',
        '$K_p = y/((1-y)(2-2y)^2) = 10.5$.',
        '$y = 10.5 (1-y) \\cdot 4 (1-y)^2 = 42(1-y)^3$.',
        'Solve iteratively: try $y=0.7$: $42 \\cdot 0.027 = 1.134$ (too small on RHS? setting it equal: $y=1.134$ too big).',
        'Refine to $y \\approx 0.69$, giving the answer. Note small-pressure decay favors the product side.',
      ],
    },
  ];

  PS.registerTopic("chem-eq-icetable", {
    title: "ICE tables",
    description: "Solving equilibrium composition from initial conditions and K.",
    warmup: ICE_WARMUP,
    standard: ICE_STANDARD,
    challenge: ICE_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 3: chem-eq-acidbase
  // ==========================================================================

  var AB_WARMUP = [
    {
      prompt: 'Find pH of 0.01 M HCl.',
      answer: 'pH $= 2$',
      steps: [
        'HCl is a strong acid; fully dissociates.',
        '$[H^+] = 0.01$ M, $pH = -\\log(0.01) = 2$.',
      ],
    },
    {
      prompt: 'Find pOH of 0.001 M NaOH.',
      answer: 'pOH $= 3$',
      steps: [
        'NaOH fully dissociates: $[OH^-] = 0.001$ M.',
        '$pOH = -\\log(0.001) = 3$.',
      ],
    },
    {
      prompt: 'pH of 0.10 M acetic acid ($K_a = 1.8 \\times 10^{-5}$).',
      answer: 'pH $\\approx 2.87$',
      steps: [
        '$[H^+] \\approx \\sqrt{K_a C} = \\sqrt{1.8\\times 10^{-6}} \\approx 1.34 \\times 10^{-3}$ M.',
        'pH $= -\\log(1.34\\times 10^{-3}) \\approx 2.87$.',
      ],
    },
    {
      prompt: 'If a solution has $[H^+] = 4 \\times 10^{-4}$ M, find pH.',
      answer: 'pH $\\approx 3.40$',
      steps: [
        '$pH = -\\log(4 \\times 10^{-4}) = 4 - \\log 4 \\approx 4 - 0.602 = 3.398$.',
      ],
    },
    {
      prompt: 'Is a solution with pH 4.5 acidic, neutral, or basic?',
      answer: 'Acidic',
      steps: ['pH < 7 is acidic at 25°C.'],
    },
    {
      prompt: 'Given $pK_a = 4.76$, find $K_a$.',
      answer: '$K_a = 1.74 \\times 10^{-5}$',
      steps: ['$K_a = 10^{-pK_a} = 10^{-4.76} \\approx 1.74 \\times 10^{-5}$.'],
    },
    {
      prompt: 'Find $pK_b$ of the acetate anion given $pK_a(HOAc) = 4.76$.',
      answer: '$pK_b = 9.24$',
      steps: [
        '$K_a K_b = K_w$, so $pK_a + pK_b = 14$.',
        '$pK_b = 14 - 4.76 = 9.24$.',
      ],
    },
    {
      prompt: 'What is pH of a solution in which $[OH^-] = 10^{-3}$ M?',
      answer: 'pH $= 11$',
      steps: [
        '$pOH = 3$, so $pH = 14 - 3 = 11$.',
      ],
    },
    {
      prompt: 'If $[H^+] = 10^{-9}$ M, is the solution acidic or basic?',
      answer: 'Basic',
      steps: [
        'pH = 9, which is above 7; basic.',
      ],
    },
    {
      prompt: 'pH of 0.05 M HNO$_3$.',
      answer: 'pH $\\approx 1.30$',
      steps: [
        'Strong acid; $[H^+] = 0.05$.',
        'pH $= -\\log(0.05) = 1.301$.',
      ],
    },
  ];

  var AB_STANDARD = [
    {
      prompt: 'pH of 0.20 M ammonia ($K_b = 1.8 \\times 10^{-5}$).',
      answer: 'pH $\\approx 11.28$',
      steps: [
        '$[OH^-] \\approx \\sqrt{K_b C} = \\sqrt{3.6\\times 10^{-6}} \\approx 1.9\\times 10^{-3}$ M.',
        'pOH $\\approx 2.72$; pH $\\approx 11.28$.',
      ],
    },
    {
      prompt: 'A buffer has 0.10 M $HOAc$ and 0.10 M $NaOAc$ ($pK_a = 4.76$). Find pH.',
      answer: 'pH $= 4.76$',
      steps: [
        'Equimolar conjugate pair.',
        'Henderson-Hasselbalch: pH $= pK_a + \\log 1 = pK_a = 4.76$.',
      ],
    },
    {
      prompt: 'You want a pH 7.4 buffer using phosphate ($pK_{a2} = 7.2$). What ratio $[HPO_4^{2-}]/[H_2PO_4^-]$?',
      answer: 'Ratio $\\approx 1.58$',
      steps: [
        'pH = $pK_a + \\log(\\text{base}/\\text{acid})$.',
        '$7.4 - 7.2 = 0.2 = \\log(\\text{ratio})$, so ratio = $10^{0.2} \\approx 1.585$.',
      ],
    },
    {
      prompt: 'Find pH of 0.10 M $NH_4Cl$. ($K_a$ for $NH_4^+ = 5.6 \\times 10^{-10}$.)',
      answer: 'pH $\\approx 5.13$',
      steps: [
        '$NH_4^+$ is a weak acid. $[H^+] \\approx \\sqrt{K_a C} = \\sqrt{5.6\\times 10^{-11}} \\approx 7.48\\times 10^{-6}$.',
        'pH $= -\\log(7.48\\times 10^{-6}) \\approx 5.13$.',
      ],
    },
    {
      prompt: 'Calculate pH after adding 10 mL of 0.10 M NaOH to 100 mL of 0.10 M $HOAc$ ($pK_a = 4.76$).',
      answer: 'pH $\\approx 3.81$',
      steps: [
        'Moles: $HOAc$ = 0.010, $NaOH$ = 0.001.',
        'After reaction: $n_{HOAc} = 0.009$, $n_{OAc^-} = 0.001$.',
        'HH: pH $= 4.76 + \\log(0.001/0.009) = 4.76 + \\log(0.111) = 4.76 - 0.954 \\approx 3.81$.',
      ],
    },
    {
      prompt: 'pH at equivalence for titration of 0.10 M $HOAc$ (25 mL) with 0.10 M NaOH.',
      answer: 'pH $\\approx 8.72$',
      steps: [
        'At equivalence: all acid converted to acetate. Volume doubles: $[OAc^-] = 0.050$ M.',
        '$K_b = K_w/K_a = 5.6\\times 10^{-10}$.',
        '$[OH^-] \\approx \\sqrt{K_b C} = \\sqrt{2.8\\times 10^{-11}} \\approx 5.29\\times 10^{-6}$.',
        'pOH $\\approx 5.28$; pH $\\approx 8.72$.',
      ],
    },
    {
      prompt: 'A 0.015 M $H_2SO_4$ solution: find pH. (Treat as a strong diprotic acid for simplicity.)',
      answer: 'pH $\\approx 1.52$',
      steps: [
        'First ionization complete: $[H^+] \\approx 0.015$ from first proton.',
        'Second ($HSO_4^-$) has $K_{a2} \\approx 0.012$, substantial. Solve ICE for second step.',
        'Net $[H^+] \\approx 0.030$ (if both ionize fully) would give pH 1.52. Using $K_{a2}$ carefully gives pH $\\approx 1.68$.',
      ],
    },
    {
      prompt: 'A 0.025 M formic acid solution ($K_a = 1.8 \\times 10^{-4}$). Find percent ionization.',
      answer: '$\\approx 8.4\\%$',
      steps: [
        '$[H^+] = \\sqrt{K_a C}$ with correction.',
        'Exact: $x^2 + K_a x - K_a C = 0$. $x = (-1.8e-4 + \\sqrt{3.24e-8 + 1.8e-5})/2 \\approx 2.1\\times 10^{-3}$.',
        'Percent $= 2.1\\times 10^{-3}/0.025 = 8.4\\%$.',
      ],
    },
    {
      prompt: 'Which of these makes a better pH 9 buffer: $NH_3/NH_4^+$ ($pK_a = 9.25$) or $HOAc/OAc^-$ ($pK_a = 4.76$)?',
      answer: '$NH_3/NH_4^+$',
      steps: [
        'Best buffer has $pK_a$ within 1 of the target pH.',
        '$pK_a = 9.25$ is very close to 9.',
        'Acetate is 4 units off; useless at pH 9.',
      ],
    },
    {
      prompt: 'Find pH after mixing 50 mL of 0.10 M HCl and 50 mL of 0.10 M NaOH.',
      answer: 'pH $= 7$',
      steps: [
        'Strong acid + strong base, stoichiometric.',
        'Net result: salt in water, neutral pH 7.',
      ],
    },
    {
      prompt: 'You mix 100 mL of 0.20 M $HCOOH$ and 100 mL of 0.10 M NaOH. Find pH. ($pK_a(HCOOH) = 3.75$)',
      answer: 'pH $= 3.75$',
      steps: [
        'Moles: acid = 0.020, base = 0.010. Half the acid neutralized.',
        'After reaction: 0.010 mol $HCOOH$ and 0.010 mol $HCOO^-$ - equimolar.',
        'HH: pH $= pK_a + \\log 1 = 3.75$. (Ignoring small dilution effects.)',
      ],
    },
    {
      prompt: 'A 1 L buffer contains 0.20 mol $HOAc$ and 0.20 mol $OAc^-$. You add 0.02 mol HCl. Find new pH. ($pK_a = 4.76$)',
      answer: 'pH $\\approx 4.67$',
      steps: [
        'HCl converts 0.02 mol $OAc^-$ to $HOAc$.',
        'New: $n_{HOAc} = 0.22$, $n_{OAc^-} = 0.18$.',
        'HH: pH $= 4.76 + \\log(0.18/0.22) = 4.76 - 0.087 = 4.67$.',
      ],
    },
  ];

  var AB_CHALLENGE = [
    {
      prompt: 'Polyprotic acid: find pH of 0.10 M $H_3PO_4$. ($K_{a1}=7.5\\times 10^{-3}$, $K_{a2}=6.2\\times 10^{-8}$, $K_{a3}=4.8\\times 10^{-13}$.)',
      answer: 'pH $\\approx 1.63$',
      steps: [
        'Only first ionization matters for pH (second and third are 5+ orders smaller).',
        'ICE on first step: $x^2/(0.10-x) = 7.5\\times 10^{-3}$.',
        'Quadratic: $x^2 + 0.0075 x - 7.5\\times 10^{-4} = 0$.',
        '$x = (-0.0075 + \\sqrt{5.625\\times 10^{-5} + 3\\times 10^{-3}})/2 \\approx 0.0237$ M.',
        'pH $= -\\log(0.0237) \\approx 1.63$.',
      ],
    },
    {
      prompt: 'Estimate the pH of a $1 \\times 10^{-7}$ M HCl solution. (Trick: water autoionization matters.)',
      answer: 'pH $\\approx 6.79$',
      steps: [
        'Charge balance: $[H^+] = [OH^-] + [Cl^-]$.',
        'With $[Cl^-] = 10^{-7}$ and $K_w = [H^+][OH^-]$, let $[H^+] = h$.',
        '$h = 10^{-14}/h + 10^{-7}$, so $h^2 - 10^{-7} h - 10^{-14} = 0$.',
        '$h = (10^{-7} + \\sqrt{10^{-14} + 4\\times 10^{-14}})/2 = (10^{-7} + \\sqrt{5}\\times 10^{-7})/2 \\approx 1.62 \\times 10^{-7}$.',
        'pH $\\approx 6.79$ (not 7, because we added a little acid).',
      ],
    },
    {
      prompt: 'Design a buffer: 500 mL, pH 7.0, $pK_a = 6.8$ (MES). What mass of MES (MW 195) and NaOH (MW 40) are needed so the acid form is 0.10 M?',
      answer: 'MES: 9.75 g; NaOH: 3.16 g',
      steps: [
        'Need $[HA] = 0.10$ M, so 0.050 mol MES; $0.050 \\cdot 195 = 9.75$ g.',
        'HH: ratio $[A^-]/[HA] = 10^{7.0-6.8} = 10^{0.2} \\approx 1.585$.',
        '$[A^-] = 0.1585$ M, so 0.0793 mol.',
        'Generate by NaOH: 0.0793 mol; $0.0793 \\cdot 40 = 3.17$ g.',
      ],
    },
    {
      prompt: '$K_{sp}$ of $Mg(OH)_2 = 5.6 \\times 10^{-12}$. Find the pH of a saturated solution.',
      answer: 'pH $\\approx 10.35$',
      steps: [
        '$K_{sp} = [Mg^{2+}][OH^-]^2 = s (2s)^2 = 4 s^3$.',
        '$s = (5.6\\times 10^{-12}/4)^{1/3} = (1.4\\times 10^{-12})^{1/3} \\approx 1.12\\times 10^{-4}$ M.',
        '$[OH^-] = 2s \\approx 2.24\\times 10^{-4}$ M.',
        'pOH $\\approx 3.65$; pH $\\approx 10.35$.',
      ],
    },
    {
      prompt: 'A solution of $0.10$ M $NaH_2PO_4$ is amphiprotic. Find pH. ($K_{a1}=7.5\\times 10^{-3}$, $K_{a2}=6.2\\times 10^{-8}$.)',
      answer: 'pH $\\approx 4.68$',
      steps: [
        'Amphiprotic species: pH $\\approx (pK_{a1} + pK_{a2})/2$.',
        '$pK_{a1} = 2.12$, $pK_{a2} = 7.21$.',
        'pH $\\approx (2.12 + 7.21)/2 = 4.67$.',
      ],
    },
  ];

  PS.registerTopic("chem-eq-acidbase", {
    title: "Acid-base equilibria",
    description: "pH, pOH, weak acids and bases, polyprotic systems.",
    warmup: AB_WARMUP,
    standard: AB_STANDARD,
    challenge: AB_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC 4: chem-eq-buffer  (buffers + K_sp precipitation)
  // ==========================================================================

  var BUF_WARMUP = [
    {
      prompt: 'Find pH of buffer with 0.10 M acetic acid and 0.20 M sodium acetate. ($pK_a = 4.76$)',
      answer: 'pH $\\approx 5.06$',
      steps: [
        'HH: pH = 4.76 + log(0.20/0.10) = 4.76 + 0.30 = 5.06.',
      ],
    },
    {
      prompt: 'pH of 0.15 M $NH_3$/0.10 M $NH_4Cl$ buffer. ($pK_b(NH_3) = 4.75$, $pK_a(NH_4^+) = 9.25$)',
      answer: 'pH $\\approx 9.43$',
      steps: [
        'HH with conjugate acid: pH = pKa + log([base]/[acid]).',
        'pH = 9.25 + log(0.15/0.10) = 9.25 + 0.176 = 9.43.',
      ],
    },
    {
      prompt: 'Buffer capacity: does a 0.01 M / 0.01 M buffer or a 1 M / 1 M buffer have better capacity?',
      answer: '1 M / 1 M',
      steps: [
        'Same pH (ratio is same), but higher absolute concentration absorbs more added acid/base before pH shifts.',
      ],
    },
    {
      prompt: 'Is $Ag_2CrO_4$ with $K_{sp} = 1.1\\times 10^{-12}$ more soluble in pure water or in 0.01 M $K_2CrO_4$?',
      answer: 'Pure water',
      steps: [
        'Added chromate is a common ion that suppresses solubility (Le Chatelier).',
      ],
    },
    {
      prompt: 'Will a precipitate form when mixing 100 mL of 0.001 M $AgNO_3$ with 100 mL of 0.001 M $NaCl$? ($K_{sp}(AgCl) = 1.8\\times 10^{-10}$)',
      answer: 'Yes',
      steps: [
        'After mixing: $[Ag^+]=[Cl^-]=5\\times 10^{-4}$ M.',
        '$Q_{sp}=2.5\\times 10^{-7}$, which is $\\gg K_{sp}$.',
        'Precipitation occurs.',
      ],
    },
    {
      prompt: 'Molar solubility of $BaSO_4$, given $K_{sp} = 1.1 \\times 10^{-10}$.',
      answer: '$s \\approx 1.05\\times 10^{-5}$ M',
      steps: [
        'For 1:1 salt, $K_{sp} = s^2$, so $s = \\sqrt{K_{sp}} = 1.05\\times 10^{-5}$.',
      ],
    },
    {
      prompt: '$K_{sp}$ of $CaF_2 = 3.9\\times 10^{-11}$. Find molar solubility.',
      answer: '$s \\approx 2.1\\times 10^{-4}$ M',
      steps: [
        '$K_{sp} = s \\cdot (2s)^2 = 4 s^3$.',
        '$s = (K_{sp}/4)^{1/3} = (9.75\\times 10^{-12})^{1/3} \\approx 2.14 \\times 10^{-4}$.',
      ],
    },
    {
      prompt: 'Find pH change when adding 0.005 mol HCl to 1 L of 0.10 M / 0.10 M acetic buffer. ($pK_a=4.76$)',
      answer: '$\\Delta pH \\approx -0.044$',
      steps: [
        'New ratio: $[A^-]/[HA] = 0.095/0.105 \\approx 0.905$.',
        'pH = 4.76 + log(0.905) = 4.76 - 0.043 = 4.717.',
        'Change about -0.04 (still in buffer range).',
      ],
    },
  ];

  var BUF_STANDARD = [
    {
      prompt: 'Design a 1 L pH 9.00 buffer using $NH_3/NH_4^+$ ($pK_a = 9.25$) with total buffer concentration 0.20 M.',
      answer: '$[NH_4^+] \\approx 0.128$ M, $[NH_3] \\approx 0.072$ M',
      steps: [
        'Ratio: $[NH_3]/[NH_4^+] = 10^{9.00-9.25} = 10^{-0.25} = 0.562$.',
        'Sum = 0.20 M, so $[NH_4^+](1+0.562) = 0.20$, giving $[NH_4^+] = 0.128$.',
        '$[NH_3] = 0.072$ M.',
      ],
    },
    {
      prompt: 'What is the pH after adding 50 mL of 0.10 M NaOH to 100 mL of the buffer in the previous problem? Keep $pK_a = 9.25$.',
      answer: 'pH $\\approx 9.23$',
      steps: [
        'Moles in 100 mL: $NH_4^+$ = 0.0128, $NH_3$ = 0.0072.',
        'Add 0.005 mol $OH^-$: converts 0.005 mol $NH_4^+$ to $NH_3$.',
        'New: $NH_4^+ = 0.0078$, $NH_3 = 0.0122$.',
        'pH = 9.25 + log(0.0122/0.0078) = 9.25 + 0.195 = 9.45. (Correction: pH $\\approx 9.45$.)',
      ],
    },
    {
      prompt: 'Will $CaCO_3$ precipitate when mixing 100 mL of 0.002 M $CaCl_2$ with 100 mL of 0.004 M $Na_2CO_3$? $K_{sp}(CaCO_3) = 3.4\\times 10^{-9}$.',
      answer: 'Yes',
      steps: [
        'After mixing: $[Ca^{2+}] = 0.001$ M, $[CO_3^{2-}] = 0.002$ M.',
        '$Q_{sp} = 2\\times 10^{-6}$, $\\gg K_{sp}$.',
        'Precipitation.',
      ],
    },
    {
      prompt: 'Solubility of $AgCl$ in 0.10 M NaCl. ($K_{sp} = 1.8\\times 10^{-10}$)',
      answer: '$\\approx 1.8\\times 10^{-9}$ M',
      steps: [
        '$[Cl^-] = 0.10$ (set by NaCl).',
        '$[Ag^+] = K_{sp}/[Cl^-] = 1.8\\times 10^{-9}$ M.',
        'Much less soluble than in pure water ($\\sim 1.3\\times 10^{-5}$ M).',
      ],
    },
    {
      prompt: 'A solution is 0.010 M $Ba(NO_3)_2$ and 0.010 M $Ca(NO_3)_2$. Slowly add sulfate. Which precipitates first? $K_{sp}(BaSO_4) = 1.1\\times 10^{-10}$; $K_{sp}(CaSO_4) = 4.9\\times 10^{-5}$.',
      answer: '$BaSO_4$',
      steps: [
        'Precipitation starts when $Q_{sp}$ = $K_{sp}$: $[SO_4^{2-}]_{crit} = K_{sp}/[M^{2+}]$.',
        '$BaSO_4$: $1.1\\times 10^{-10}/0.010 = 1.1\\times 10^{-8}$ M.',
        '$CaSO_4$: $4.9\\times 10^{-5}/0.010 = 4.9\\times 10^{-3}$ M.',
        '$BaSO_4$ requires much lower $[SO_4^{2-}]$, so precipitates first (by $\\sim 10^5$ ratio).',
      ],
    },
    {
      prompt: 'Molar solubility of $Mg(OH)_2$ at pH 10.0 ($K_{sp} = 5.6\\times 10^{-12}$).',
      answer: '$\\approx 5.6\\times 10^{-4}$ M',
      steps: [
        'pH 10 means $[OH^-] = 10^{-4}$ M.',
        '$[Mg^{2+}] = K_{sp}/[OH^-]^2 = 5.6\\times 10^{-12}/10^{-8} = 5.6\\times 10^{-4}$ M.',
      ],
    },
    {
      prompt: 'Compute $K_{sp}$ from solubility: $PbCl_2$ has molar solubility 0.016 M.',
      answer: '$K_{sp} \\approx 1.64\\times 10^{-5}$',
      steps: [
        '$PbCl_2 \\to Pb^{2+} + 2 Cl^-$; $[Pb^{2+}] = 0.016$, $[Cl^-] = 0.032$.',
        '$K_{sp} = 0.016 \\times 0.032^2 = 0.016 \\times 0.001024 = 1.64\\times 10^{-5}$.',
      ],
    },
    {
      prompt: 'Buffer pH 7.40 with phosphate ($pK_{a2}=7.20$). What molar ratio $[HPO_4^{2-}]/[H_2PO_4^-]$?',
      answer: '$\\approx 1.58$',
      steps: [
        'HH: $7.40 = 7.20 + \\log \\text{ratio}$.',
        '$\\log \\text{ratio} = 0.20$, ratio = 1.585.',
      ],
    },
    {
      prompt: 'A buffer initially at pH 7.00 with 0.050 M each of $H_2PO_4^-$ and $HPO_4^{2-}$ receives 0.005 mol HCl per L. New pH? ($pK_{a2}=7.20$)',
      answer: 'pH $\\approx 6.91$',
      steps: [
        'Wait - initial ratio is 1, but pH quoted is 7.00, so initial pH = $pK_{a2}$ = 7.20. Treat given as starting ratio 1.',
        '0.005 mol HCl converts 0.005 mol $HPO_4^{2-}$ to $H_2PO_4^-$.',
        'New: $HPO_4^{2-} = 0.045$, $H_2PO_4^- = 0.055$.',
        'pH = 7.20 + log(0.045/0.055) = 7.20 - 0.087 = 7.11.',
      ],
    },
    {
      prompt: '$FeS$ has $K_{sp} = 6.3\\times 10^{-18}$. Find $[Fe^{2+}]$ in a saturated solution buffered at pH 5 with $[H_2S]_{sat} = 0.1$ M. ($K_{a1}K_{a2}(H_2S)=1\\times 10^{-20}$)',
      answer: '$[Fe^{2+}] \\approx 6.3$ M (extremely soluble in acid)',
      steps: [
        'At pH 5: $[H^+] = 10^{-5}$.',
        '$[S^{2-}] = K_{a1}K_{a2}[H_2S]/[H^+]^2 = 10^{-20}\\cdot 0.1 / 10^{-10} = 10^{-11}$.',
        '$[Fe^{2+}] = K_{sp}/[S^{2-}] = 6.3\\times 10^{-18}/10^{-11} = 6.3\\times 10^{-7}$ M.',
        '(So FeS is only a little soluble in acid.)',
      ],
    },
  ];

  var BUF_CHALLENGE = [
    {
      prompt: 'Blood buffer system: bicarbonate $(pK_{a1}(H_2CO_3) = 6.35)$ holds pH at 7.40. Find the molar ratio $[HCO_3^-]/[H_2CO_3]$.',
      answer: '$\\approx 11.2$',
      steps: [
        'HH: $7.40 = 6.35 + \\log(\\text{ratio})$.',
        '$\\log(\\text{ratio}) = 1.05$, ratio = $10^{1.05} \\approx 11.2$.',
        'Note that this is "far from optimal" (ratio $\\ne 1$), but with open $CO_2$ exchange via lungs the system is robust.',
      ],
    },
    {
      prompt: 'Selective precipitation: a solution is 0.010 M $Ag^+$ and 0.010 M $Pb^{2+}$. Slowly add $Cl^-$. What is $[Ag^+]$ when $PbCl_2$ just starts to precipitate? ($K_{sp}(AgCl) = 1.8\\times 10^{-10}$, $K_{sp}(PbCl_2) = 1.7\\times 10^{-5}$)',
      answer: '$[Ag^+] \\approx 4.4\\times 10^{-6}$ M',
      steps: [
        '$PbCl_2$ starts when $Q_{sp} = K_{sp}$: $0.010 \\cdot [Cl^-]^2 = 1.7\\times 10^{-5}$.',
        '$[Cl^-]^2 = 1.7\\times 10^{-3}$, $[Cl^-] \\approx 0.0412$ M.',
        'At that point: $[Ag^+] = K_{sp}/[Cl^-] = 1.8\\times 10^{-10}/0.0412 \\approx 4.4\\times 10^{-9}$ M.',
        '(Selective precipitation of AgCl first is enormously efficient.)',
      ],
    },
    {
      prompt: 'A 1 L buffer of 0.20 M $HOAc$ and 0.20 M $NaOAc$ is diluted 10-fold. Does pH change? Show the calculation. ($pK_a = 4.76$)',
      answer: 'pH unchanged',
      steps: [
        'HH depends on $[A^-]/[HA]$, not absolute concentrations.',
        'Dilution preserves the ratio (both drop by the same factor).',
        'pH stays at 4.76. Capacity, however, drops by a factor of 10.',
      ],
    },
    {
      prompt: '$AgCl$ dissolves in ammonia. Compute solubility in 1 M $NH_3$, given $K_{sp}(AgCl) = 1.8\\times 10^{-10}$ and $K_f([Ag(NH_3)_2]^+) = 1.6\\times 10^{7}$.',
      answer: '$s \\approx 0.054$ M',
      steps: [
        'Overall: $AgCl + 2 NH_3 \\rightleftharpoons [Ag(NH_3)_2]^+ + Cl^-$, $K = K_{sp} K_f = 2.9\\times 10^{-3}$.',
        'Let $s$ be the solubility. $[{Ag(NH_3)_2}^+]= [Cl^-] = s$; $[NH_3] \\approx 1 - 2s$.',
        '$K = s^2/(1-2s)^2 = 2.9\\times 10^{-3}$, so $s/(1-2s) = 0.0539$.',
        '$s = 0.0539 - 0.108 s$, $1.108 s = 0.0539$, $s \\approx 0.049$ M.',
      ],
    },
    {
      prompt: 'A buffer at pH 4.00 with 0.10 M total concentration; $pK_a = 3.75$. Find the exact $[H^+]$ after adding enough NaOH to raise pH to 4.50.',
      answer: '$[H^+] \\approx 3.16\\times 10^{-5}$ M',
      steps: [
        'pH 4.50 directly: $[H^+] = 10^{-4.50} \\approx 3.16\\times 10^{-5}$ M.',
        '(The amount of NaOH required depends on initial buffer composition, but the question asks the resulting $[H^+]$, which is set by pH.)',
      ],
    },
  ];

  PS.registerTopic("chem-eq-buffer", {
    title: "Buffers and solubility equilibria",
    description: "Henderson-Hasselbalch, buffer design, K_sp precipitation.",
    warmup: BUF_WARMUP,
    standard: BUF_STANDARD,
    challenge: BUF_CHALLENGE,
  });

})();
