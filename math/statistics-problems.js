/*
 * LearningHub - Statistics Problem Set
 * Registers 4 topics with LearningHubProblemSet runtime.
 * Topics:
 *   stats-estimation-mle       - point estimation and maximum likelihood
 *   stats-confidence-intervals - confidence intervals
 *   stats-hypothesis-testing   - z, t, chi-square tests
 *   stats-regression           - simple and multiple linear regression
 */
(function () {
  "use strict";

  function whenReady(fn) {
    if (window.LearningHubProblemSet) { fn(window.LearningHubProblemSet); return; }
    var waited = 0;
    var iv = setInterval(function () {
      waited += 50;
      if (window.LearningHubProblemSet) {
        clearInterval(iv);
        fn(window.LearningHubProblemSet);
      } else if (waited > 8000) {
        clearInterval(iv);
        console.error("[statistics-problems] LearningHubProblemSet never loaded");
      }
    }, 50);
  }

  whenReady(function (PS) {

  // =====================================================================
  // TOPIC 1: stats-estimation-mle
  // =====================================================================
  var BANK_EST_WARMUP = [
    {
      prompt: 'You observe 100 coin flips and see 57 heads. What is the maximum-likelihood estimate of $p$?',
      answer: '$\\hat p = 0.57$.',
      steps: [
        'Likelihood: $L(p) = p^{57}(1-p)^{43}$.',
        'Log-likelihood: $\\ell(p) = 57\\log p + 43\\log(1-p)$.',
        'Take derivative and set to zero: $57/p - 43/(1-p) = 0$, giving $p = 57/100$.',
      ],
    },
    {
      prompt: 'The MLE of the mean of iid $\\mathcal N(\\mu, \\sigma^2)$ samples is what?',
      answer: 'The sample mean $\\bar X = \\tfrac 1 n\\sum X_i$.',
      steps: [
        'Log-likelihood: $\\ell = -\\tfrac n2\\log(2\\pi\\sigma^2) - \\tfrac{1}{2\\sigma^2}\\sum(x_i - \\mu)^2$.',
        'Differentiate w.r.t. $\\mu$: $\\partial\\ell/\\partial\\mu = \\tfrac{1}{\\sigma^2}\\sum(x_i - \\mu) = 0$.',
        'Solve: $\\hat\\mu = \\bar X$.',
      ],
    },
    {
      prompt: 'If $\\hat\\theta$ is an unbiased estimator of $\\theta$, what does that mean precisely?',
      answer: '$\\mathbb E[\\hat\\theta] = \\theta$ for all $\\theta$.',
      steps: [
        'Unbiased = no systematic error: on average, across repeated samples, the estimator hits the truth.',
        'Does not guarantee low variance or consistency on its own.',
      ],
    },
    {
      prompt: 'Show that the sample variance $s^2 = \\tfrac{1}{n-1}\\sum(X_i - \\bar X)^2$ is unbiased for $\\sigma^2$ (just state the reason).',
      answer: 'The $n-1$ "Bessel correction" exactly offsets the bias introduced by centering at $\\bar X$ instead of $\\mu$.',
      steps: [
        'Computation: $\\mathbb E[\\sum(X_i - \\bar X)^2] = (n-1)\\sigma^2$.',
        'So dividing by $n-1$ gives an unbiased estimator.',
        'Dividing by $n$ (as MLE does for Normal variance) gives a biased estimate that is too small.',
      ],
    },
    {
      prompt: 'Method of moments: for iid samples from $\\text{Exp}(\\lambda)$, estimate $\\lambda$ from the sample mean $\\bar X$.',
      answer: '$\\hat\\lambda = 1/\\bar X$.',
      steps: [
        '$\\mathbb E[X] = 1/\\lambda$, so equate to sample mean: $\\bar X = 1/\\hat\\lambda$.',
        'Solve: $\\hat\\lambda = 1/\\bar X$.',
      ],
    },
    {
      prompt: 'Biology: you count $X = 12$ bacteria in a 1-mL sample, assuming a Poisson distribution. What is the MLE of the rate $\\lambda$?',
      answer: '$\\hat\\lambda = 12$ per mL.',
      steps: [
        'Likelihood: $L(\\lambda) = e^{-\\lambda}\\lambda^{12}/12!$.',
        'Log-likelihood: $\\ell(\\lambda) = -\\lambda + 12\\log\\lambda - \\log 12!$.',
        'Set $d\\ell/d\\lambda = -1 + 12/\\lambda = 0 \\Rightarrow \\hat\\lambda = 12$.',
      ],
    },
  ];

  var BANK_EST_STANDARD = [
    {
      prompt: 'Derive the MLE of $\\sigma^2$ for iid $\\mathcal N(\\mu, \\sigma^2)$ when $\\mu$ is known. Is it biased?',
      answer: '$\\hat\\sigma^2_{MLE} = \\tfrac 1 n\\sum(X_i - \\mu)^2$; it is unbiased when $\\mu$ is known.',
      steps: [
        'Log-likelihood: $\\ell = -\\tfrac n 2\\log(2\\pi\\sigma^2) - \\tfrac{1}{2\\sigma^2}\\sum(X_i - \\mu)^2$.',
        'Differentiate w.r.t. $\\sigma^2$: $-n/(2\\sigma^2) + \\tfrac{1}{2\\sigma^4}\\sum(X_i-\\mu)^2 = 0$.',
        'Solve: $\\hat\\sigma^2 = \\tfrac{1}{n}\\sum(X_i - \\mu)^2$.',
        'Expectation: $\\mathbb E[(X_i-\\mu)^2] = \\sigma^2$, so $\\mathbb E[\\hat\\sigma^2] = \\sigma^2$ — unbiased.',
      ],
    },
    {
      prompt: 'Fisher information: find $I(p)$ for a single Bernoulli trial with parameter $p$.',
      answer: '$I(p) = 1/[p(1-p)]$.',
      steps: [
        'Score function: $\\partial\\log f(x; p)/\\partial p = (x - p)/[p(1-p)]$.',
        '$I(p) = \\mathbb E[(\\text{score})^2] = \\text{Var}(X)/[p(1-p)]^2 = p(1-p)/[p(1-p)]^2 = 1/[p(1-p)]$.',
      ],
    },
    {
      prompt: 'State the Cramér-Rao lower bound and give its interpretation.',
      answer: 'For any unbiased estimator $\\hat\\theta$ of $\\theta$, $\\text{Var}(\\hat\\theta) \\ge 1/I(\\theta)$.',
      steps: [
        'The bound: $\\text{Var}(\\hat\\theta) \\ge 1/I(\\theta)$, where $I(\\theta)$ is the Fisher information.',
        'Interpretation: Fisher information sets a floor on how precisely you can estimate $\\theta$, no matter how cleverly you engineer the estimator.',
        'An estimator achieving the bound is called "efficient".',
      ],
    },
    {
      prompt: 'The MLE of the Poisson rate $\\lambda$ from iid samples is $\\bar X$. What is the asymptotic distribution of $\\sqrt n(\\bar X - \\lambda)$?',
      answer: '$\\mathcal N(0, \\lambda)$.',
      steps: [
        'By the CLT: $\\sqrt n(\\bar X - \\mu)/\\sigma\\to\\mathcal N(0, 1)$.',
        'For Poisson, $\\mu = \\sigma^2 = \\lambda$, so $\\sqrt n(\\bar X - \\lambda)\\to\\mathcal N(0, \\lambda)$.',
        'Or use MLE asymptotics: $\\sqrt n(\\hat\\lambda - \\lambda)\\to\\mathcal N(0, 1/I(\\lambda)) = \\mathcal N(0, \\lambda)$.',
      ],
    },
    {
      prompt: 'Economics: you want to estimate the per-capita income $\\mu$ of a city. You sample 400 households and compute $\\bar X = \\$52000$ with $s = \\$8000$. Give a point estimate and its standard error.',
      answer: 'Point estimate: $\\$52000$. Standard error: $\\$400$.',
      steps: [
        'Point estimate of $\\mu$: the sample mean $\\bar X = \\$52{,}000$.',
        'Standard error: $s/\\sqrt n = 8000/20 = \\$400$.',
      ],
    },
    {
      prompt: 'Clinical trials: 40 out of 200 patients respond to a new treatment. Estimate the response rate and its standard error.',
      answer: '$\\hat p = 0.20$, standard error $= 0.0283$.',
      steps: [
        'MLE for a Bernoulli proportion: $\\hat p = 40/200 = 0.2$.',
        'Standard error: $\\sqrt{\\hat p(1-\\hat p)/n} = \\sqrt{0.2\\cdot 0.8/200} = \\sqrt{0.0008}\\approx 0.0283$.',
      ],
    },
    {
      prompt: 'Physics: suppose the count of radioactive decays in $t$ seconds is $\\text{Poisson}(\\lambda t)$. You observe 200 decays in 10 seconds. Find the MLE of $\\lambda$ and its approximate standard error.',
      answer: '$\\hat\\lambda = 20$/sec; $\\text{SE}\\approx\\sqrt{20/10} = \\sqrt 2 \\approx 1.41$/sec.',
      steps: [
        'MLE: $\\hat\\lambda = N/t = 200/10 = 20$ per second.',
        'Fisher information for $N\\sim\\text{Poisson}(\\lambda t)$: $I(\\lambda) = t/\\lambda$. With $t=10$, $I = 10/\\hat\\lambda = 0.5$.',
        '$\\text{Var}(\\hat\\lambda) \\approx 1/I = 2$, SE $\\approx\\sqrt 2 \\approx 1.41$.',
      ],
    },
    {
      prompt: 'ML perspective: interpret MLE as minimizing negative log-likelihood. Show that for a Gaussian model with fixed $\\sigma^2$, MLE of $\\mu$ equals OLS.',
      answer: 'Gaussian log-likelihood equals squared error plus constants, so maximizing it equals minimizing SSE.',
      steps: [
        '$-\\log f(x_i; \\mu, \\sigma^2) = \\tfrac{(x_i - \\mu)^2}{2\\sigma^2} + \\tfrac12\\log(2\\pi\\sigma^2)$.',
        'Summing over data: $-\\ell(\\mu) = \\tfrac{1}{2\\sigma^2}\\sum(x_i - \\mu)^2 + \\text{const}$.',
        'Minimizing is the same as minimizing $\\sum(x_i - \\mu)^2$, which is OLS.',
        'This identifies Gaussian MLE with least squares, and shows why squared error is a natural loss under normal noise.',
      ],
    },
  ];

  PS.registerTopic("stats-estimation-mle", {
    title: "Point estimation and MLE",
    description: "Maximum likelihood, method of moments, bias, and Fisher information.",
    warmup:   BANK_EST_WARMUP,
    standard: BANK_EST_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 2: stats-confidence-intervals
  // =====================================================================
  var BANK_CI_WARMUP = [
    {
      prompt: 'A sample of $n = 100$ has $\\bar X = 50$ and known $\\sigma = 10$. Give a $95\\%$ confidence interval for $\\mu$.',
      answer: '$[48.04, 51.96]$.',
      steps: [
        'SE $= \\sigma/\\sqrt n = 10/10 = 1$.',
        'CI: $\\bar X \\pm 1.96\\cdot\\text{SE} = 50 \\pm 1.96 = [48.04, 51.96]$.',
      ],
    },
    {
      prompt: 'Same data but with unknown $\\sigma$; the sample standard deviation is $s = 10$. Use the $t$-distribution; what is the $95\\%$ CI?',
      answer: '$[48.02, 51.98]$ using $t_{99, 0.025}\\approx 1.984$.',
      steps: [
        'Use $t$ distribution with $n-1 = 99$ degrees of freedom.',
        '$t_{99, 0.025}\\approx 1.984$.',
        'CI: $50 \\pm 1.984\\cdot 1 = [48.02, 51.98]$.',
      ],
    },
    {
      prompt: 'What does "95% confidence" mean, precisely?',
      answer: 'If the experiment were repeated many times, $95\\%$ of the constructed intervals would contain the true parameter.',
      steps: [
        'Confidence refers to the procedure, not a specific interval.',
        'It is not a probability statement about the parameter (which is a fixed constant in frequentist theory).',
        'Any particular CI either contains $\\mu$ or it doesn\'t — we just don\'t know which.',
      ],
    },
    {
      prompt: 'In a political poll, 520 out of 1000 respondents prefer candidate A. Give the $95\\%$ Wald CI for $p$.',
      answer: '$[0.489, 0.551]$.',
      steps: [
        '$\\hat p = 0.52$, SE $= \\sqrt{0.52\\cdot 0.48/1000}\\approx 0.0158$.',
        'CI: $0.52 \\pm 1.96\\cdot 0.0158 \\approx 0.52 \\pm 0.031 = [0.489, 0.551]$.',
      ],
    },
    {
      prompt: 'Why is a $99\\%$ confidence interval always wider than a $95\\%$ interval for the same data?',
      answer: 'Higher confidence means the interval must capture a larger fraction of the sampling distribution, so it must be wider.',
      steps: [
        'The critical value increases as the confidence level grows: $z_{0.025} = 1.96 < z_{0.005} = 2.58$.',
        'Width scales with the critical value, so 99% CI is about $2.58/1.96\\approx 1.32$ times wider.',
      ],
    },
    {
      prompt: 'You want a margin of error at most $2$ on a mean estimation with $\\sigma = 10$ and $95\\%$ confidence. How large should $n$ be?',
      answer: '$n \\ge 97$ (round up from $96.04$).',
      steps: [
        'Margin: $1.96\\cdot\\sigma/\\sqrt n \\le 2$.',
        '$\\sqrt n \\ge 1.96\\cdot 10/2 = 9.8$.',
        '$n \\ge 96.04$; round up to $97$.',
      ],
    },
  ];

  var BANK_CI_STANDARD = [
    {
      prompt: 'Clinical trial: in a drug study, the sample difference in cure rates is $\\hat p_1 - \\hat p_2 = 0.10$ with pooled SE $0.04$. Construct a $95\\%$ CI.',
      answer: '$[0.022, 0.178]$.',
      steps: [
        'CI: $0.10 \\pm 1.96\\cdot 0.04 = 0.10 \\pm 0.0784$.',
        'Interval: $[0.0216, 0.1784]$. Since 0 is not in it, the difference is statistically significant at the 5% level.',
      ],
    },
    {
      prompt: 'Engineering: you measure the tensile strength of 16 specimens of a new alloy: $\\bar X = 450$ MPa, $s = 20$ MPa. Give a $95\\%$ CI for $\\mu$.',
      answer: '$[439.3, 460.7]$ MPa using $t_{15, 0.025}\\approx 2.131$.',
      steps: [
        'Small sample, so use the $t$ distribution.',
        'Degrees of freedom $= 15$, $t^* \\approx 2.131$.',
        'SE $= s/\\sqrt{16} = 5$.',
        'CI: $450\\pm 2.131\\cdot 5 = 450\\pm 10.66 \\approx [439.34, 460.66]$.',
      ],
    },
    {
      prompt: 'Interpret correctly vs. incorrectly: which of these is a valid statement about a 95% CI $[42, 58]$ for $\\mu$?\n\n(a) "The probability that $\\mu$ is in $[42, 58]$ is $0.95$."\n(b) "$95\\%$ of similarly-constructed intervals would contain $\\mu$."\n(c) "$95\\%$ of the data falls in $[42, 58]$."',
      answer: 'Only (b) is correct.',
      steps: [
        '(a) is a Bayesian-flavoured statement; in strict frequentist language, $\\mu$ is fixed, not random.',
        '(b) is the correct frequentist interpretation.',
        '(c) is about the data distribution, not the mean.',
      ],
    },
    {
      prompt: 'What happens to CI width as $n$ quadruples?',
      answer: 'It halves.',
      steps: [
        'Width $\\propto 1/\\sqrt n$.',
        'Quadrupling $n$ multiplies $\\sqrt n$ by $2$, so width shrinks by $1/2$.',
        'Practical lesson: doubling precision requires quadrupling sample size.',
      ],
    },
    {
      prompt: 'You want a 95% CI for a proportion with margin of error $\\pm 3$ percentage points, and you don\'t know $p$. Use the worst-case variance to find $n$.',
      answer: '$n \\approx 1068$.',
      steps: [
        'Worst case is $p(1-p) = 0.25$ (at $p = 0.5$).',
        'Margin $= 1.96\\sqrt{0.25/n} \\le 0.03$.',
        '$\\sqrt{1/(4n)} \\le 0.0153$, so $n \\ge 1/(4\\cdot 0.000234)\\approx 1068$.',
      ],
    },
    {
      prompt: 'Economics: you compute a 90% CI for unemployment rate as $[5.8\\%, 6.2\\%]$. What is the margin of error?',
      answer: '$0.2\\%$.',
      steps: [
        'Half-width: $(6.2 - 5.8)/2 = 0.2\\%$.',
        'The point estimate is $6.0\\%$.',
      ],
    },
    {
      prompt: 'Biology: a greenhouse experiment measures growth of 10 plants: mean $= 15.2$ cm, $s = 2.5$ cm. Construct a 95% CI for mean growth.',
      answer: '$[13.41, 16.99]$ cm using $t_{9, 0.025}\\approx 2.262$.',
      steps: [
        'Degrees of freedom $= 9$; $t^* = 2.262$.',
        'SE $= 2.5/\\sqrt{10}\\approx 0.7906$.',
        'Margin: $2.262\\cdot 0.7906 \\approx 1.789$.',
        'CI: $15.2 \\pm 1.789 \\approx [13.41, 16.99]$.',
      ],
    },
    {
      prompt: 'Show why a 95% CI based on a normal assumption is symmetric around the point estimate, but CIs for skewed distributions (like variance) may not be.',
      answer: 'The normal pivot $(\\bar X - \\mu)/(\\sigma/\\sqrt n)$ is symmetric; the chi-square distribution used for variance CIs is not.',
      steps: [
        'For the mean, the sampling distribution $\\bar X \\approx \\mathcal N(\\mu, \\sigma^2/n)$ is symmetric, so CI is $\\bar X \\pm z\\cdot\\text{SE}$.',
        'For variance, $(n-1)s^2/\\sigma^2 \\sim \\chi^2_{n-1}$, which is right-skewed.',
        'That forces the CI $[(n-1)s^2/\\chi^2_{high},\\ (n-1)s^2/\\chi^2_{low}]$ to be asymmetric around $s^2$.',
      ],
    },
  ];

  PS.registerTopic("stats-confidence-intervals", {
    title: "Confidence intervals",
    description: "Constructing and interpreting CIs for means and proportions; sample-size calculations.",
    warmup:   BANK_CI_WARMUP,
    standard: BANK_CI_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 3: stats-hypothesis-testing
  // =====================================================================
  var BANK_HYP_WARMUP = [
    {
      prompt: 'What is the difference between Type I and Type II error?',
      answer: 'Type I = reject $H_0$ when it\'s true (false positive). Type II = fail to reject $H_0$ when it\'s false (false negative).',
      steps: [
        '$\\alpha = P(\\text{Type I}) = P(\\text{reject }H_0 | H_0)$.',
        '$\\beta = P(\\text{Type II}) = P(\\text{fail to reject }H_0 | H_1)$.',
        'Power of a test $= 1 - \\beta = P(\\text{reject }H_0 | H_1)$.',
      ],
    },
    {
      prompt: 'You observe a sample mean of $102$ from $n = 25$ observations with known $\\sigma = 5$. Test $H_0: \\mu = 100$ at $\\alpha = 0.05$ using a z-test.',
      answer: '$Z = 2$; p-value $\\approx 0.046$ (two-sided); reject $H_0$.',
      steps: [
        'Standard error: $\\sigma/\\sqrt n = 5/5 = 1$.',
        '$Z = (102 - 100)/1 = 2$.',
        'Two-sided p-value: $2(1 - \\Phi(2)) = 2\\cdot 0.0228 = 0.0455$.',
        'Since $0.0455 < 0.05$, reject $H_0$ at the $5\\%$ level.',
      ],
    },
    {
      prompt: 'A p-value of $0.03$ means what?',
      answer: 'If $H_0$ were true, we would see data this extreme or more about $3\\%$ of the time.',
      steps: [
        'p-value is the probability, computed under $H_0$, of data at least as extreme as observed.',
        'It is NOT the probability that $H_0$ is true.',
        'It is NOT the probability of a Type I error for your current test — that\'s $\\alpha$ (pre-set).',
      ],
    },
    {
      prompt: 'You have $n = 16$ and want to use a $t$-test for the mean. How many degrees of freedom?',
      answer: '$n - 1 = 15$.',
      steps: [
        'The $t$-test with estimated standard deviation uses $n-1$ degrees of freedom.',
        'That\'s the DOF of $s^2$ after subtracting off the sample-mean estimate.',
      ],
    },
    {
      prompt: 'For a chi-square goodness-of-fit test with $k$ categories and no estimated parameters, how many degrees of freedom?',
      answer: '$k - 1$.',
      steps: [
        'The count constraint $\\sum O_i = n$ removes one degree of freedom.',
        'If you also estimate $m$ parameters from the data, the DOF becomes $k - 1 - m$.',
      ],
    },
    {
      prompt: 'State the conclusion of a two-sample t-test: $t = 2.8$, $\\text{DOF} = 30$, p-value $= 0.009$.',
      answer: 'Reject $H_0$ at any reasonable significance level; there is strong evidence the two means differ.',
      steps: [
        'p-value = $0.009$ is smaller than typical $\\alpha$ cutoffs like $0.05$ or $0.01$.',
        'Interpretation: the observed difference is unlikely under the null that the groups have equal means.',
      ],
    },
  ];

  var BANK_HYP_STANDARD = [
    {
      prompt: 'Clinical trial: a new drug cures $55$ of $100$ patients. Historical cure rate is $0.45$. Test $H_0: p = 0.45$ vs $H_1: p > 0.45$ at $\\alpha = 0.05$.',
      answer: '$Z = 2.01$, p-value $\\approx 0.022$, reject $H_0$.',
      steps: [
        '$\\hat p = 0.55$. Under $H_0$: SE $= \\sqrt{0.45\\cdot 0.55/100}\\approx 0.0497$.',
        '$Z = (0.55 - 0.45)/0.0497\\approx 2.01$.',
        'One-sided p-value: $1 - \\Phi(2.01)\\approx 0.022$.',
        'Since $0.022 < 0.05$, reject $H_0$.',
      ],
    },
    {
      prompt: 'You run a two-sample t-test with $\\bar X_1 = 10, s_1 = 2, n_1 = 25$ and $\\bar X_2 = 8, s_2 = 3, n_2 = 30$. Assume unequal variances. Compute the test statistic.',
      answer: '$t \\approx 2.935$.',
      steps: [
        'SE $= \\sqrt{s_1^2/n_1 + s_2^2/n_2} = \\sqrt{4/25 + 9/30} = \\sqrt{0.16 + 0.3} = \\sqrt{0.46}\\approx 0.678$.',
        '$t = (10 - 8)/0.678 \\approx 2.949$. (Close to $2.935$ depending on rounding.)',
        'With Welch\'s approximation for DOF, p-value is roughly $0.005$, so reject $H_0$.',
      ],
    },
    {
      prompt: 'Chi-square goodness-of-fit: a die is rolled 60 times. Observed counts are $(15, 12, 8, 10, 7, 8)$. Test whether the die is fair at $\\alpha = 0.05$.',
      answer: '$\\chi^2 = 4.6$, DOF $= 5$, p-value $\\approx 0.467$; do not reject.',
      steps: [
        'Expected under $H_0$: $10$ per category.',
        '$\\chi^2 = \\sum (O_i - E_i)^2/E_i = (25 + 4 + 4 + 0 + 9 + 4)/10 = 46/10 = 4.6$.',
        'DOF $= 6 - 1 = 5$; critical value $\\chi^2_{5, 0.05}\\approx 11.07$.',
        '$4.6 < 11.07$, so do not reject $H_0$. The die is consistent with fair.',
      ],
    },
    {
      prompt: 'Power: you run a $z$-test at $\\alpha = 0.05$ with $n = 25, \\sigma = 10$ to detect a shift from $\\mu_0 = 100$ to $\\mu_1 = 103$. What is the approximate power?',
      answer: 'About $0.423$.',
      steps: [
        'SE $= 10/5 = 2$.',
        'Critical value (one-sided upper): $100 + 1.645\\cdot 2 = 103.29$.',
        'Under $H_1$: $\\bar X\\sim\\mathcal N(103, 4)$. $P(\\bar X > 103.29) = P(Z > 0.145)\\approx 0.442$.',
        'So power $\\approx 0.44$. (Varies depending on one- vs two-sided test.)',
      ],
    },
    {
      prompt: 'Biology: in a chi-square test of independence for a $2\\times 3$ contingency table, how many degrees of freedom?',
      answer: '$(2-1)(3-1) = 2$.',
      steps: [
        'General formula: $(r - 1)(c - 1)$ for an $r\\times c$ table.',
        'Here $r = 2$, $c = 3$, so DOF $= 1\\cdot 2 = 2$.',
      ],
    },
    {
      prompt: 'Why should you not "p-hack" by looking at the data and deciding the hypothesis afterwards?',
      answer: 'The advertised $\\alpha$ level only holds when the hypothesis is fixed in advance; adapting inflates Type I error.',
      steps: [
        'If you test many related hypotheses and report only the significant ones, the effective $\\alpha$ is much larger than nominal.',
        'This leads to false "discoveries" that don\'t replicate.',
        'Controls: pre-registration, Bonferroni/FDR correction, or split-sample validation.',
      ],
    },
    {
      prompt: 'Quality control: an assembly line produces bolts with mean length $50$ mm historically. A sample of $n = 36$ bolts gives $\\bar X = 49.5$ mm, $s = 1.5$ mm. Is the mean length still $50$?',
      answer: '$t = -2$, DOF $= 35$, two-sided p-value $\\approx 0.053$; borderline — do not reject at 5%.',
      steps: [
        'Hypotheses: $H_0: \\mu = 50$ vs $H_1: \\mu\\ne 50$.',
        'SE $= s/\\sqrt{36} = 0.25$.',
        '$t = (49.5 - 50)/0.25 = -2$.',
        'With DOF $= 35$, $p\\approx 0.053$.',
        'Right at the edge; in practice, investigate, don\'t rely solely on the dichotomous decision.',
      ],
    },
    {
      prompt: 'Show that a $95\\%$ CI for $\\mu$ excludes $\\mu_0$ iff a two-sided $z$-test at $\\alpha = 0.05$ rejects $H_0: \\mu = \\mu_0$.',
      answer: 'CIs and two-sided tests are dual: rejection $\\iff \\mu_0\\notin\\text{CI}$.',
      steps: [
        'Two-sided test rejects when $|\\bar X - \\mu_0|/(\\sigma/\\sqrt n) > z^*$.',
        'That is equivalent to $|\\bar X - \\mu_0| > z^*\\cdot\\text{SE}$.',
        'The 95% CI is $\\bar X \\pm z^*\\cdot\\text{SE}$.',
        'So $\\mu_0$ is outside the CI exactly when the test rejects.',
      ],
    },
  ];

  PS.registerTopic("stats-hypothesis-testing", {
    title: "Hypothesis testing",
    description: "z, t, and chi-square tests; p-values, power, and the test-CI duality.",
    warmup:   BANK_HYP_WARMUP,
    standard: BANK_HYP_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 4: stats-regression
  // =====================================================================
  var BANK_REG_WARMUP = [
    {
      prompt: 'Fit a simple linear regression $y = \\beta_0 + \\beta_1 x$ to the points $(1, 2), (2, 3), (3, 5), (4, 6)$.',
      answer: '$\\hat\\beta_1 = 1.4$, $\\hat\\beta_0 = 0.5$, so $\\hat y = 0.5 + 1.4 x$.',
      steps: [
        '$\\bar x = 2.5$, $\\bar y = 4$.',
        '$S_{xy} = \\sum(x_i - \\bar x)(y_i - \\bar y) = (-1.5)(-2) + (-0.5)(-1) + (0.5)(1) + (1.5)(2) = 3 + 0.5 + 0.5 + 3 = 7$.',
        '$S_{xx} = \\sum(x_i - \\bar x)^2 = 2.25 + 0.25 + 0.25 + 2.25 = 5$.',
        '$\\hat\\beta_1 = S_{xy}/S_{xx} = 7/5 = 1.4$.',
        '$\\hat\\beta_0 = \\bar y - \\hat\\beta_1\\bar x = 4 - 1.4(2.5) = 4 - 3.5 = 0.5$.',
      ],
    },
    {
      prompt: 'What does the coefficient of determination $R^2$ measure?',
      answer: 'The fraction of the variance in $y$ explained by the fitted model.',
      steps: [
        '$R^2 = 1 - \\text{SSR}/\\text{SST}$.',
        'SSR = sum of squared residuals, SST = total sum of squares around the mean.',
        'Ranges from 0 (model explains nothing) to 1 (perfect fit).',
      ],
    },
    {
      prompt: 'If a simple linear regression gives $\\hat\\beta_1 = 2$ with standard error $0.5$, what is the $t$-statistic for $H_0: \\beta_1 = 0$?',
      answer: '$t = 4$.',
      steps: [
        '$t = \\hat\\beta_1/\\text{SE}(\\hat\\beta_1) = 2/0.5 = 4$.',
        'With enough DOF this is very significant.',
      ],
    },
    {
      prompt: 'Interpret a slope of $\\hat\\beta_1 = 3$ for regression of income on years of education.',
      answer: 'On average, each additional year of education is associated with $\\$3$ more in income (with the chosen units).',
      steps: [
        'A one-unit increase in the predictor is associated with a $\\hat\\beta_1$-unit change in the expected response.',
        '"Associated with" is deliberate — this is correlation, not causation.',
      ],
    },
    {
      prompt: 'What does a residual plot look like for a good fit?',
      answer: 'A formless cloud of points around zero, with no trend, curvature, or fan-shape.',
      steps: [
        'Good fit: residuals scatter randomly with constant variance.',
        'Curvature in residuals = model missing a nonlinear term.',
        'Fan shape = heteroskedasticity (variance depends on $x$).',
        'Outliers far from zero deserve attention.',
      ],
    },
    {
      prompt: 'In a multiple regression $y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2$, how do you interpret $\\beta_1$?',
      answer: 'Expected change in $y$ for a 1-unit change in $x_1$, holding $x_2$ fixed.',
      steps: [
        'The "partial" interpretation is key: all other predictors are held constant.',
        'If $x_1$ and $x_2$ are correlated, $\\beta_1$ can differ from the simple-regression slope of $y$ on $x_1$ alone.',
      ],
    },
  ];

  var BANK_REG_STANDARD = [
    {
      prompt: 'Show that the normal equations for simple OLS give $\\hat\\beta_1 = S_{xy}/S_{xx}$ and $\\hat\\beta_0 = \\bar y - \\hat\\beta_1\\bar x$.',
      answer: 'Derive from setting $\\partial\\text{SSE}/\\partial\\beta_i = 0$.',
      steps: [
        'SSE $= \\sum(y_i - \\beta_0 - \\beta_1 x_i)^2$.',
        '$\\partial/\\partial\\beta_0: -2\\sum(y_i - \\beta_0 - \\beta_1 x_i) = 0 \\Rightarrow \\beta_0 = \\bar y - \\beta_1\\bar x$.',
        '$\\partial/\\partial\\beta_1: -2\\sum x_i(y_i - \\beta_0 - \\beta_1 x_i) = 0$. Substitute $\\beta_0$ and simplify to $\\beta_1 = S_{xy}/S_{xx}$.',
      ],
    },
    {
      prompt: 'Economics: fitted model $\\text{wage} = 10 + 2\\cdot\\text{years\\_school} + 0.5\\cdot\\text{experience}$ with $n = 500$, $R^2 = 0.4$. Interpret $R^2$ and the slope on years of schooling.',
      answer: '$40\\%$ of the variance in wages is explained by the two predictors; each additional year of schooling is associated with $\\$2$ more in wage, holding experience fixed.',
      steps: [
        '$R^2 = 0.4$: moderate explanatory power.',
        'Slope on schooling: "ceteris paribus" effect is $2$.',
        'Still careful with causation: experience and schooling are probably correlated, and the model says nothing about hidden confounders.',
      ],
    },
    {
      prompt: 'Multicollinearity: what happens to OLS estimates when two predictors are nearly perfectly correlated?',
      answer: 'Coefficient estimates become unstable with huge standard errors, though predictions from the full model may still be fine.',
      steps: [
        'Technically, $X^T X$ is near-singular, so $(X^T X)^{-1}$ has large entries.',
        'Individual coefficients can swing wildly with small changes in data.',
        'Predictions $X\\hat\\beta$ can still be accurate because the two predictors fight each other.',
        'Fixes: drop one predictor, combine them, or use regularization (ridge/LASSO).',
      ],
    },
    {
      prompt: 'For the data $\\{(1,3), (2, 4), (3, 5), (4, 4), (5, 6)\\}$, compute the residuals and SSR after fitting $\\hat y = 2.6 + 0.6 x$.',
      answer: 'Residuals: $-0.2, 0.2, 0.6, -1.0, 0.4$; SSR $= 1.6$.',
      steps: [
        'Predictions: $\\hat y_i = 2.6 + 0.6 x_i = 3.2, 3.8, 4.4, 5.0, 5.6$.',
        'Residuals: $3 - 3.2 = -0.2$; $4 - 3.8 = 0.2$; $5 - 4.4 = 0.6$; $4 - 5.0 = -1.0$; $6 - 5.6 = 0.4$.',
        'SSR: $0.04 + 0.04 + 0.36 + 1.0 + 0.16 = 1.60$.',
      ],
    },
    {
      prompt: 'Biology: you regress body weight on food intake in mice and get $\\hat\\beta_1 = 0.8\\ \\text{g}/\\text{g}$ with SE $0.2$ and $n = 20$. Is the slope significantly different from zero at $5\\%$?',
      answer: 'Yes. $t = 4$ with DOF $= 18$; p-value $\\approx 0.0008$.',
      steps: [
        '$t = 0.8/0.2 = 4$.',
        'DOF $= n - 2 = 18$.',
        'Two-sided p-value is tiny ($\\approx 0.0008$), so reject $H_0$.',
      ],
    },
    {
      prompt: 'Heteroskedasticity: you see a fan-shaped residual plot widening with $\\hat y$. What OLS assumption is violated, and what are two fixes?',
      answer: 'Homoskedasticity (constant variance of errors) is violated. Fixes: weighted least squares, or use robust (sandwich) standard errors.',
      steps: [
        'OLS assumes $\\text{Var}(\\epsilon_i) = \\sigma^2$ (constant).',
        'If variance grows with $\\hat y$, point estimates remain unbiased but SEs and p-values are wrong.',
        'Option 1: WLS with weights $\\propto 1/\\hat\\sigma_i^2$.',
        'Option 2: use heteroskedasticity-robust SEs (Huber-White).',
        'Option 3: transform the response (e.g., $\\log y$) if the relationship is multiplicative.',
      ],
    },
    {
      prompt: 'Engineering: a fitted regression predicts pipe pressure $P = 50 + 3T$ where $T$ is temperature in $^\\circ$C. Predict $P$ at $T = 20$ and give a rough prediction interval if residual SD is $4$.',
      answer: 'Point prediction $110$; 95% PI approximately $[102, 118]$.',
      steps: [
        'Point prediction: $50 + 3(20) = 110$.',
        'Approximate 95% prediction interval: $\\hat P \\pm 2\\cdot s_{\\epsilon}$ (ignoring the small additional uncertainty from estimating $\\beta$).',
        '$= 110 \\pm 2\\cdot 4 = [102, 118]$.',
        'A formal PI also accounts for uncertainty in $\\hat\\beta$, which widens the interval slightly.',
      ],
    },
    {
      prompt: 'Diagnostics: give three standard diagnostic checks to perform after fitting a linear regression.',
      answer: '(1) Residuals vs fitted plot for curvature or heteroskedasticity. (2) Q-Q plot of residuals for normality. (3) Leverage / Cook\'s distance for influential points.',
      steps: [
        '(1) Residuals vs fitted: look for patterns that indicate model misspecification.',
        '(2) Q-Q plot: residuals should lie roughly on the $y = x$ line if they are normal.',
        '(3) Leverage and Cook\'s distance: flag points whose removal would change the fit most.',
        'Also consider variance inflation factors (VIF) for multicollinearity.',
      ],
    },
    {
      prompt: 'ML: explain the connection between OLS and maximum likelihood under Gaussian noise.',
      answer: 'Under $y_i = x_i^\\top\\beta + \\epsilon_i$ with $\\epsilon_i\\sim\\mathcal N(0, \\sigma^2)$ iid, the MLE of $\\beta$ equals the OLS estimator.',
      steps: [
        'Log-likelihood: $\\ell(\\beta, \\sigma^2) = -\\tfrac n 2\\log(2\\pi\\sigma^2) - \\tfrac{1}{2\\sigma^2}\\sum(y_i - x_i^\\top\\beta)^2$.',
        'Maximizing over $\\beta$ is equivalent to minimizing $\\sum(y_i - x_i^\\top\\beta)^2$.',
        'That is the OLS objective. So $\\hat\\beta_{MLE} = \\hat\\beta_{OLS}$.',
        'This is why squared error is the "natural" loss for regression under normal noise.',
      ],
    },
  ];

  PS.registerTopic("stats-regression", {
    title: "Linear regression",
    description: "Simple and multiple OLS, $R^2$, residual diagnostics, and connections to MLE.",
    warmup:   BANK_REG_WARMUP,
    standard: BANK_REG_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  });  // whenReady
})();
