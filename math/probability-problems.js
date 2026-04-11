/*
 * LearningHub - Probability Problem Set
 * Registers 4 topics with LearningHubProblemSet runtime.
 * Topics:
 *   prob-basics              - sample spaces, conditioning, Bayes
 *   prob-distributions       - discrete and continuous distributions
 *   prob-expectation-variance - expectation, variance, moments
 *   prob-limits-info         - limit theorems (LLN, CLT), entropy, KL
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
        console.error("[probability-problems] LearningHubProblemSet never loaded");
      }
    }, 50);
  }

  whenReady(function (PS) {

  // =====================================================================
  // TOPIC 1: prob-basics
  // =====================================================================
  var BANK_BASICS_WARMUP = [
    {
      prompt: 'A fair six-sided die is rolled. What is the probability of rolling an even number?',
      answer: '$1/2$.',
      steps: [
        'Sample space: $\\{1, 2, 3, 4, 5, 6\\}$, all equally likely.',
        'Event "even" $= \\{2, 4, 6\\}$, which has 3 outcomes.',
        '$P = 3/6 = 1/2$.',
      ],
    },
    {
      prompt: 'Two fair coins are flipped. What is $P(\\text{at least one head})$?',
      answer: '$3/4$.',
      steps: [
        'Sample space: $\\{HH, HT, TH, TT\\}$, size 4, equally likely.',
        '"At least one head" $= \\{HH, HT, TH\\}$, size 3.',
        '$P = 3/4$.',
        'Alternatively, $1 - P(\\text{no heads}) = 1 - 1/4 = 3/4$.',
      ],
    },
    {
      prompt: 'If $P(A) = 0.3$ and $P(B) = 0.5$ and $A, B$ are disjoint, find $P(A\\cup B)$.',
      answer: '$0.8$.',
      steps: [
        'Disjoint means $P(A\\cap B) = 0$.',
        'Inclusion-exclusion: $P(A\\cup B) = P(A) + P(B) - P(A\\cap B) = 0.3 + 0.5 - 0 = 0.8$.',
      ],
    },
    {
      prompt: 'In a clinical trial, $60\\%$ of patients take drug A and $40\\%$ take drug B. Drug A cures $80\\%$; drug B cures $70\\%$. What is the overall cure rate?',
      answer: '$0.76$.',
      steps: [
        'Law of total probability: $P(\\text{cure}) = P(A)P(\\text{cure}|A) + P(B)P(\\text{cure}|B)$.',
        '$= 0.6(0.8) + 0.4(0.7) = 0.48 + 0.28 = 0.76$.',
      ],
    },
    {
      prompt: 'Cards: draw one card from a standard 52-card deck. $P(\\text{heart} \\mid \\text{red})$?',
      answer: '$1/2$.',
      steps: [
        'There are 26 red cards (13 hearts + 13 diamonds).',
        'Hearts are a subset of red cards.',
        '$P(\\text{heart}|\\text{red}) = \\tfrac{P(\\text{heart}\\cap\\text{red})}{P(\\text{red})} = \\tfrac{13/52}{26/52} = 1/2$.',
      ],
    },
    {
      prompt: 'A manufacturing plant ships 1000 widgets. 20 are defective. What\'s the chance a randomly inspected widget is defective?',
      answer: '$0.02$.',
      steps: [
        'Assuming each widget is equally likely to be picked, $P(\\text{defective}) = 20/1000 = 0.02$.',
      ],
    },
    {
      prompt: 'Events $A$ and $B$ are independent with $P(A) = 0.4$, $P(B) = 0.5$. Find $P(A\\cap B)$ and $P(A\\cup B)$.',
      answer: '$P(A\\cap B) = 0.2$, $P(A\\cup B) = 0.7$.',
      steps: [
        'Independent: $P(A\\cap B) = P(A)P(B) = 0.4 \\cdot 0.5 = 0.2$.',
        'Inclusion-exclusion: $P(A\\cup B) = 0.4 + 0.5 - 0.2 = 0.7$.',
      ],
    },
  ];

  var BANK_BASICS_STANDARD = [
    {
      prompt: 'Bayes: a disease has prevalence $1\\%$. A test has sensitivity $99\\%$ (true positive rate) and specificity $95\\%$ (true negative rate). Given a positive test, what is the probability of actually having the disease?',
      answer: 'About $16.7\\%$.',
      steps: [
        'Let $D$ = has disease, $+$ = positive test. $P(D) = 0.01$, $P(+|D) = 0.99$, $P(+|\\bar D) = 0.05$.',
        'Numerator: $P(+|D) P(D) = 0.99 \\cdot 0.01 = 0.0099$.',
        'Denominator: $P(+) = 0.0099 + 0.05 \\cdot 0.99 = 0.0099 + 0.0495 = 0.0594$.',
        '$P(D|+) = 0.0099 / 0.0594 \\approx 0.1667$.',
        'Lesson: even very accurate tests can have lots of false positives when the disease is rare.',
      ],
    },
    {
      prompt: 'A factory has three machines $M_1, M_2, M_3$ producing $30\\%, 50\\%, 20\\%$ of output with defect rates $0.01, 0.02, 0.05$. Given a defective item, what is the probability it came from $M_3$?',
      answer: 'About $0.435$.',
      steps: [
        '$P(\\text{defect}) = 0.3(0.01) + 0.5(0.02) + 0.2(0.05) = 0.003 + 0.01 + 0.01 = 0.023$.',
        '$P(M_3|\\text{defect}) = \\dfrac{0.2 \\cdot 0.05}{0.023} = \\dfrac{0.01}{0.023} \\approx 0.4348$.',
      ],
    },
    {
      prompt: 'Three cards are drawn without replacement from a standard deck. What is the probability that all three are the same suit?',
      answer: 'About $0.0518$.',
      steps: [
        'After the first card fixes a suit, 12 of the remaining 51 are that suit: $P = 12/51$.',
        'After two cards, 11 of the remaining 50 are that suit: $P = 11/50$.',
        '$P = 1 \\cdot (12/51)(11/50) = 132/2550 \\approx 0.0518$.',
      ],
    },
    {
      prompt: 'The "Monty Hall" problem: 3 doors, one with a prize. You pick door 1. Monty opens door 3, revealing no prize. Should you switch to door 2? What is $P(\\text{prize at }2 | \\text{Monty opens }3)$?',
      answer: 'Yes — switching wins with probability $2/3$.',
      steps: [
        'Assume prize equally likely behind any door and Monty (knowing the layout) always opens a no-prize door you didn\'t pick.',
        'Bayes: $P(\\text{prize at }2 | \\text{Monty opens }3)$.',
        'If prize at 1 (prob $1/3$): Monty picks between 2 and 3 randomly, so opens 3 with prob $1/2$.',
        'If prize at 2 (prob $1/3$): Monty must open 3, so prob $1$.',
        'If prize at 3 (prob $1/3$): Monty cannot open 3, prob $0$.',
        'Posterior for 2: $(1/3)(1)/[(1/3)(1/2) + (1/3)(1) + 0] = (1/3)/(1/2) = 2/3$.',
      ],
    },
    {
      prompt: 'A bag has 4 red, 6 blue marbles. Draw 2 without replacement. $P(\\text{both red})$?',
      answer: '$2/15$.',
      steps: [
        '$P(\\text{first red}) = 4/10$.',
        '$P(\\text{second red}|\\text{first red}) = 3/9$.',
        'Product: $(4/10)(3/9) = 12/90 = 2/15$.',
      ],
    },
    {
      prompt: 'In a quality-control experiment, $P(\\text{defect}|\\text{machine hot}) = 0.3$ and $P(\\text{defect}|\\text{machine cool}) = 0.05$. The machine runs hot $20\\%$ of the time. What is $P(\\text{hot}|\\text{defect})$?',
      answer: 'About $0.6$.',
      steps: [
        '$P(\\text{defect}) = 0.2(0.3) + 0.8(0.05) = 0.06 + 0.04 = 0.10$.',
        '$P(\\text{hot}|\\text{defect}) = \\dfrac{0.2 \\cdot 0.3}{0.10} = 0.06/0.10 = 0.6$.',
      ],
    },
    {
      prompt: 'Physics: a particle moves randomly on $\\{1, 2, 3\\}$. Starting at $1$, it moves to a uniformly chosen neighbour ($2$ only) from position $1$, and uniformly from $\\{1, 3\\}$ at position $2$, and only to $2$ from $3$. What is the probability that after two steps it is back at $1$?',
      answer: '$1/2$.',
      steps: [
        'Step 1: from $1$ it goes to $2$ with probability $1$.',
        'Step 2 from $2$: goes to $1$ or $3$ each with probability $1/2$.',
        'Net probability of being at $1$ after 2 steps: $1/2$.',
      ],
    },
    {
      prompt: 'Explain why independence is not the same as being mutually exclusive. Give an example of events that are one but not the other.',
      answer: 'Independent: $P(A\\cap B) = P(A)P(B)$. Mutually exclusive: $P(A\\cap B) = 0$. For $P(A), P(B) > 0$, these are incompatible.',
      steps: [
        'If $A$ and $B$ are mutually exclusive with $P(A), P(B) > 0$, then $P(A\\cap B) = 0 \\ne P(A)P(B)$, so they are not independent.',
        'Example: rolling a die, $A = \\{1,2,3\\}$, $B = \\{4,5,6\\}$ are mutually exclusive but not independent.',
        'Example of independent but not mutually exclusive: $A = \\{1,2\\}$ (first die even... never mind), simpler: two coins, $A = \\text{first is H}$, $B = \\text{second is H}$. Independent; they can both happen.',
      ],
    },
  ];

  PS.registerTopic("prob-basics", {
    title: "Sample spaces, conditioning, and Bayes",
    description: "Events, conditional probability, the law of total probability, and Bayes' theorem in practice.",
    warmup:   BANK_BASICS_WARMUP,
    standard: BANK_BASICS_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 2: prob-distributions
  // =====================================================================
  var BANK_DIST_WARMUP = [
    {
      prompt: 'A fair coin is flipped 10 times. What is the probability of exactly 3 heads?',
      answer: '$\\binom{10}{3}(1/2)^{10} = 120/1024 \\approx 0.1172$.',
      steps: [
        'This is $\\text{Binomial}(10, 0.5)$.',
        '$P(X = 3) = \\binom{10}{3}(0.5)^3(0.5)^7 = 120 \\cdot (0.5)^{10} = 120/1024 \\approx 0.1172$.',
      ],
    },
    {
      prompt: 'If $X\\sim\\text{Binomial}(n, p)$ with $n = 5, p = 0.4$, find $P(X = 2)$.',
      answer: '$0.3456$.',
      steps: [
        '$\\binom{5}{2} = 10$.',
        '$P(X = 2) = 10 \\cdot 0.4^2 \\cdot 0.6^3 = 10 \\cdot 0.16 \\cdot 0.216 = 0.3456$.',
      ],
    },
    {
      prompt: 'If $Y\\sim\\text{Poisson}(\\lambda = 3)$, find $P(Y = 0)$.',
      answer: '$e^{-3}\\approx 0.0498$.',
      steps: [
        'Poisson PMF: $P(Y=k) = e^{-\\lambda}\\lambda^k/k!$.',
        'For $k = 0$: $e^{-3}\\cdot 1/1 = e^{-3}\\approx 0.0498$.',
      ],
    },
    {
      prompt: 'For a standard normal $Z\\sim\\mathcal N(0, 1)$, approximately what is $P(-1 \\le Z \\le 1)$?',
      answer: 'About $0.6827$ (the "68" in 68-95-99.7).',
      steps: [
        'The standard normal has about 68% of its mass within one standard deviation of the mean.',
        '$P(|Z| \\le 1) \\approx 0.6827$.',
      ],
    },
    {
      prompt: 'If $T\\sim\\text{Exponential}(\\lambda = 2)$, find $P(T > 1)$.',
      answer: '$e^{-2}\\approx 0.1353$.',
      steps: [
        'Exponential tail: $P(T > t) = e^{-\\lambda t}$.',
        'With $\\lambda = 2, t = 1$: $e^{-2}\\approx 0.1353$.',
      ],
    },
    {
      prompt: 'Telecom: calls arrive at a call center at rate $5$ per minute as a Poisson process. What is the probability of at least one call in the next $30$ seconds?',
      answer: '$1 - e^{-2.5} \\approx 0.918$.',
      steps: [
        'Number in 30 seconds is Poisson with mean $\\lambda t = 5\\cdot 0.5 = 2.5$.',
        '$P(N \\ge 1) = 1 - P(N = 0) = 1 - e^{-2.5}\\approx 1 - 0.0821 \\approx 0.918$.',
      ],
    },
    {
      prompt: 'Lifetimes: a lightbulb has lifetime $\\sim\\text{Exponential}(\\lambda = 1/1000)$ hours. What is its mean lifetime?',
      answer: '$1000$ hours.',
      steps: [
        'For an exponential with rate $\\lambda$, the mean is $1/\\lambda$.',
        'Here $1/\\lambda = 1000$ hours.',
      ],
    },
  ];

  var BANK_DIST_STANDARD = [
    {
      prompt: 'Engineering: a signal has Gaussian noise $N\\sim\\mathcal N(0, \\sigma^2)$ with $\\sigma = 0.5$. What is $P(|N| > 1)$?',
      answer: 'About $0.0455$.',
      steps: [
        'Standardize: $Z = N/\\sigma$, so $|N| > 1 \\iff |Z| > 2$.',
        '$P(|Z| > 2)\\approx 0.0455$ (complement of the $95\\%$ band).',
      ],
    },
    {
      prompt: 'Biology: a gene is inherited independently from each parent with probability $0.5$. What is the probability a sample of $20$ children has between $8$ and $12$ (inclusive) with the trait?',
      answer: 'About $0.737$.',
      steps: [
        '$X\\sim\\text{Binomial}(20, 0.5)$. Need $P(8 \\le X \\le 12)$.',
        'By symmetry around the mean $10$, this is $1 - 2\\,P(X \\le 7)$. Computing exactly via CDF, $P(X \\le 7)\\approx 0.1316$.',
        'So $P(8\\le X\\le 12)\\approx 1 - 2(0.1316) = 0.737$.',
        'Alternatively use the normal approximation $\\mathcal N(10, 5)$ with continuity correction.',
      ],
    },
    {
      prompt: 'If $X$ is exponential with mean $5$, what is the probability $X$ exceeds its mean?',
      answer: '$e^{-1}\\approx 0.368$.',
      steps: [
        'Rate $\\lambda = 1/5$. $P(X > 5) = e^{-\\lambda\\cdot 5} = e^{-1}\\approx 0.368$.',
        'Every exponential has this property: $P(X > \\mathbb E[X]) = 1/e$.',
      ],
    },
    {
      prompt: 'A web service receives Poisson($\\lambda = 10$) requests per second. What is the probability of receiving more than $15$ requests in a second? (Use a normal approximation.)',
      answer: 'About $0.057$.',
      steps: [
        'Poisson with large $\\lambda$ is approximately $\\mathcal N(\\lambda, \\lambda)$.',
        'Standardize: $Z = (15.5 - 10)/\\sqrt{10}\\approx 1.74$ (continuity correction).',
        '$P(Z > 1.74) \\approx 0.041$. Without correction: $Z = (15 - 10)/\\sqrt{10}\\approx 1.58$, $P\\approx 0.057$.',
        'Exact Poisson value is $\\approx 0.0487$.',
      ],
    },
    {
      prompt: 'Pharmaceutical: the half-life of a drug in the bloodstream is exponential with half-life $4$ hours. What is its rate $\\lambda$?',
      answer: '$\\lambda = \\ln 2 / 4\\approx 0.173$ per hour.',
      steps: [
        'Half-life is the $t$ where $P(T > t) = 1/2$, i.e. $e^{-\\lambda t} = 1/2$.',
        'Solve: $\\lambda t = \\ln 2$, so $\\lambda = \\ln 2 / t = \\ln 2 / 4 \\approx 0.1733$.',
      ],
    },
    {
      prompt: 'Clinical trial: a drug works with probability $p = 0.7$ independently for each patient. Out of $50$ patients, what is the probability that at least $40$ are cured? (Use a normal approximation with continuity correction.)',
      answer: 'About $0.063$.',
      steps: [
        '$X\\sim\\text{Binomial}(50, 0.7)$, mean $35$, variance $50\\cdot 0.7\\cdot 0.3 = 10.5$, sd $\\approx 3.24$.',
        'Continuity correction: $P(X\\ge 40) \\approx P(Z > (39.5 - 35)/3.24) = P(Z > 1.389)$.',
        '$P(Z > 1.39)\\approx 0.0823$. Exact is $\\approx 0.077$.',
      ],
    },
    {
      prompt: 'Show that the geometric distribution $P(X = k) = (1-p)^{k-1} p$ for $k = 1, 2, \\ldots$ has mean $1/p$.',
      answer: '$\\mathbb E[X] = 1/p$.',
      steps: [
        'By definition $\\mathbb E[X] = \\sum_{k=1}^\\infty k(1-p)^{k-1} p$.',
        'Use the formula $\\sum_{k\\ge 1} k x^{k-1} = 1/(1-x)^2$ for $|x| < 1$.',
        'With $x = 1-p$: $\\mathbb E[X] = p \\cdot 1/p^2 = 1/p$.',
        'Sanity check: a fair coin ($p = 0.5$) takes on average $2$ flips to get the first head.',
      ],
    },
    {
      prompt: 'ML: in stochastic gradient descent with mini-batches of size $32$ drawn from a dataset of size $50000$, the number of examples belonging to class 1 (which has prevalence $10\\%$) in a given batch is approximately what distribution?',
      answer: '$\\text{Binomial}(32, 0.1)$ (close to Poisson(3.2)).',
      steps: [
        'Each of the 32 examples is drawn (essentially) independently, and each is class 1 with probability $0.1$.',
        'So the count is $\\text{Binomial}(32, 0.1)$, with mean $3.2$ and variance $2.88$.',
        'Because $np = 3.2$ is small and $n$ is moderate, $\\text{Poisson}(3.2)$ is a decent approximation.',
      ],
    },
  ];

  PS.registerTopic("prob-distributions", {
    title: "Discrete and continuous distributions",
    description: "Binomial, Poisson, Geometric, Normal, Exponential — where they come from and how to compute with them.",
    warmup:   BANK_DIST_WARMUP,
    standard: BANK_DIST_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 3: prob-expectation-variance
  // =====================================================================
  var BANK_EV_WARMUP = [
    {
      prompt: 'A fair six-sided die is rolled. Find $\\mathbb E[X]$ and $\\text{Var}(X)$.',
      answer: '$\\mathbb E[X] = 3.5$, $\\text{Var}(X) = 35/12 \\approx 2.917$.',
      steps: [
        '$\\mathbb E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5$.',
        '$\\mathbb E[X^2] = (1+4+9+16+25+36)/6 = 91/6 \\approx 15.167$.',
        '$\\text{Var}(X) = \\mathbb E[X^2] - (\\mathbb E[X])^2 = 91/6 - 49/4 = 182/12 - 147/12 = 35/12$.',
      ],
    },
    {
      prompt: 'If $X\\sim\\text{Binomial}(n, p)$, what are $\\mathbb E[X]$ and $\\text{Var}(X)$?',
      answer: '$\\mathbb E[X] = np$, $\\text{Var}(X) = np(1-p)$.',
      steps: [
        'Decompose $X$ as a sum of $n$ independent $\\text{Bernoulli}(p)$ variables.',
        'Each has mean $p$ and variance $p(1-p)$.',
        'By linearity (and independence for variance), $\\mathbb E[X] = np$, $\\text{Var}(X) = np(1-p)$.',
      ],
    },
    {
      prompt: 'For a Poisson distribution with parameter $\\lambda$, what are the mean and variance?',
      answer: 'Both equal $\\lambda$.',
      steps: [
        'Derive from the generating function or by direct summation.',
        'The key "fingerprint" of a Poisson is that its mean equals its variance.',
        'This is why "variance to mean ratio" (Fano factor) is used to test if data is Poisson-like.',
      ],
    },
    {
      prompt: 'If $X$ and $Y$ are independent with $\\mathbb E[X] = 2$, $\\mathbb E[Y] = 5$, find $\\mathbb E[XY]$ and $\\mathbb E[X + Y]$.',
      answer: '$\\mathbb E[XY] = 10$, $\\mathbb E[X+Y] = 7$.',
      steps: [
        'Linearity: $\\mathbb E[X+Y] = \\mathbb E[X] + \\mathbb E[Y] = 2 + 5 = 7$.',
        'Independence: $\\mathbb E[XY] = \\mathbb E[X]\\mathbb E[Y] = 2 \\cdot 5 = 10$.',
      ],
    },
    {
      prompt: 'For $X\\sim\\text{Uniform}(0, 1)$, compute $\\mathbb E[X]$ and $\\text{Var}(X)$.',
      answer: '$\\mathbb E[X] = 1/2$, $\\text{Var}(X) = 1/12$.',
      steps: [
        '$\\mathbb E[X] = \\int_0^1 x\\,dx = 1/2$.',
        '$\\mathbb E[X^2] = \\int_0^1 x^2\\,dx = 1/3$.',
        '$\\text{Var}(X) = 1/3 - 1/4 = 1/12$.',
      ],
    },
    {
      prompt: 'Let $X$ be the number of heads in 100 fair coin flips. What is $\\text{Var}(X)$?',
      answer: '$25$.',
      steps: [
        '$X\\sim\\text{Binomial}(100, 0.5)$.',
        '$\\text{Var}(X) = np(1-p) = 100\\cdot 0.5\\cdot 0.5 = 25$. Standard deviation: $5$.',
      ],
    },
  ];

  var BANK_EV_STANDARD = [
    {
      prompt: 'Finance: you have a $50\\%$ chance of winning $\\$200$ and a $50\\%$ chance of losing $\\$100$. What is the expected value of the gamble? What is its variance?',
      answer: '$\\mathbb E = \\$50$, $\\text{Var} = \\$^2\\ 22500$, so $\\text{sd} = \\$150$.',
      steps: [
        '$\\mathbb E[X] = 0.5\\cdot 200 + 0.5\\cdot(-100) = 100 - 50 = 50$.',
        '$\\mathbb E[X^2] = 0.5\\cdot 40000 + 0.5\\cdot 10000 = 25000$.',
        '$\\text{Var}(X) = 25000 - 2500 = 22500$. $\\text{sd} = 150$.',
      ],
    },
    {
      prompt: 'Show that for any random variable with finite variance, $\\text{Var}(aX + b) = a^2\\text{Var}(X)$.',
      answer: 'Direct from the definition of variance.',
      steps: [
        'Let $\\mu = \\mathbb E[X]$. Then $\\mathbb E[aX + b] = a\\mu + b$.',
        '$\\text{Var}(aX + b) = \\mathbb E[(aX + b - a\\mu - b)^2] = \\mathbb E[a^2(X - \\mu)^2] = a^2\\text{Var}(X)$.',
        'So adding a constant does nothing to variance; multiplying scales variance by the square.',
      ],
    },
    {
      prompt: 'If $X$ and $Y$ are correlated with $\\text{Var}(X) = 4$, $\\text{Var}(Y) = 9$, $\\text{Cov}(X, Y) = -2$, find $\\text{Var}(X + Y)$.',
      answer: '$\\text{Var}(X + Y) = 9$.',
      steps: [
        '$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y)$.',
        '$= 4 + 9 + 2(-2) = 13 - 4 = 9$.',
      ],
    },
    {
      prompt: 'Physics: the kinetic energy of a gas particle is $E = \\tfrac12 m v^2$. Given $v$ is normally distributed with mean $0$ and variance $\\sigma^2$ (1D), find $\\mathbb E[E]$.',
      answer: '$\\mathbb E[E] = \\tfrac12 m\\sigma^2$.',
      steps: [
        '$\\mathbb E[E] = \\tfrac m2 \\mathbb E[v^2]$.',
        'For $v\\sim\\mathcal N(0, \\sigma^2)$, $\\mathbb E[v^2] = \\sigma^2$.',
        'So $\\mathbb E[E] = \\tfrac12 m\\sigma^2$.',
        'This matches the equipartition theorem: $\\tfrac12 k_B T$ per translational degree of freedom when $\\sigma^2 = k_B T/m$.',
      ],
    },
    {
      prompt: 'Clinical trial: a drug is effective with probability $p$, and you observe $n$ patients. By the method of moments, estimate $p$ from the sample mean $\\bar X$.',
      answer: '$\\hat p = \\bar X$.',
      steps: [
        'Method of moments: equate the theoretical mean to the sample mean.',
        'For Bernoulli, $\\mathbb E[X] = p$. Equate: $\\hat p = \\bar X$.',
        'By the law of large numbers, this converges to $p$.',
      ],
    },
    {
      prompt: 'The moment generating function of $X\\sim\\mathcal N(\\mu, \\sigma^2)$ is $M(t) = \\exp(\\mu t + \\sigma^2 t^2/2)$. Use it to find $\\mathbb E[X]$ and $\\text{Var}(X)$.',
      answer: 'Mean $\\mu$, variance $\\sigma^2$ (as expected).',
      steps: [
        '$M\'(t) = M(t)(\\mu + \\sigma^2 t)$. At $t=0$: $\\mathbb E[X] = M\'(0) = 1 \\cdot \\mu = \\mu$.',
        '$M\'\'(t) = M\'(t)(\\mu + \\sigma^2 t) + M(t)\\sigma^2$. At $t=0$: $M\'\'(0) = \\mu^2 + \\sigma^2$.',
        '$\\text{Var}(X) = M\'\'(0) - M\'(0)^2 = \\mu^2 + \\sigma^2 - \\mu^2 = \\sigma^2$.',
      ],
    },
    {
      prompt: 'ML: a loss function is $L = \\mathbb E[(y - \\hat y)^2]$ where $\\hat y = f(x; \\theta)$ and $(x, y)$ is from a data distribution. Break $L$ into bias, variance, and irreducible noise.',
      answer: '$L = \\text{Bias}^2 + \\text{Variance} + \\sigma_\\epsilon^2$.',
      steps: [
        'Let the true function be $g(x)$ plus noise $\\epsilon$ (mean $0$, variance $\\sigma_\\epsilon^2$).',
        '$L = \\mathbb E[(g(x) + \\epsilon - \\hat y)^2] = \\mathbb E[(g - \\hat y)^2] + \\sigma_\\epsilon^2$ because $\\epsilon$ is independent of $\\hat y$.',
        'Split $(g - \\hat y) = (g - \\mathbb E[\\hat y]) + (\\mathbb E[\\hat y] - \\hat y)$, then square and take expectation.',
        'The cross-term vanishes, leaving $\\text{Bias}^2 = (g - \\mathbb E\\hat y)^2$ and $\\text{Variance} = \\text{Var}(\\hat y)$.',
      ],
    },
    {
      prompt: 'For a Cauchy distribution with density $f(x) = 1/[\\pi(1+x^2)]$, what is $\\mathbb E[X]$?',
      answer: 'Undefined (the integral does not converge absolutely).',
      steps: [
        '$\\mathbb E[X] = \\int_{-\\infty}^{\\infty} x/[\\pi(1+x^2)]\\,dx$.',
        'The integrand is an odd function; it would seem to give $0$.',
        'But the positive and negative tails each diverge individually ($\\int_0^\\infty x/(1+x^2)\\,dx$ is infinite), so the expectation is not defined in the usual sense.',
        'Lesson: heavy tails break the LLN and CLT. Sample means of Cauchy variables do not converge.',
      ],
    },
  ];

  PS.registerTopic("prob-expectation-variance", {
    title: "Expectation, variance, and moments",
    description: "Compute means, variances, and moment-generating functions; bias-variance decomposition.",
    warmup:   BANK_EV_WARMUP,
    standard: BANK_EV_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  // =====================================================================
  // TOPIC 4: prob-limits-info
  // =====================================================================
  var BANK_LIMITS_WARMUP = [
    {
      prompt: 'State the (weak) law of large numbers for iid $X_1, \\ldots, X_n$ with finite mean $\\mu$.',
      answer: '$\\bar X_n \\to \\mu$ in probability as $n\\to\\infty$.',
      steps: [
        'Weak LLN: $P(|\\bar X_n - \\mu| > \\varepsilon)\\to 0$ for every $\\varepsilon > 0$.',
        'Strong LLN: $\\bar X_n \\to \\mu$ almost surely.',
        'Both require finite mean; strong LLN also holds for iid without a second moment.',
      ],
    },
    {
      prompt: 'State the Central Limit Theorem.',
      answer: '$\\sqrt n(\\bar X_n - \\mu)/\\sigma \\to \\mathcal N(0, 1)$ in distribution.',
      steps: [
        'Let $X_1, \\ldots, X_n$ be iid with finite mean $\\mu$ and finite variance $\\sigma^2 > 0$.',
        'Then $\\dfrac{\\sqrt n(\\bar X_n - \\mu)}{\\sigma}$ converges in distribution to $\\mathcal N(0, 1)$.',
        'Equivalently, $\\bar X_n \\approx \\mathcal N(\\mu, \\sigma^2/n)$ for large $n$.',
      ],
    },
    {
      prompt: 'Entropy of a fair coin: compute $H(X)$ where $X\\in\\{0,1\\}$ has $P(0) = P(1) = 1/2$.',
      answer: '$1$ bit.',
      steps: [
        '$H(X) = -\\sum p_i \\log_2 p_i$.',
        '$= -(1/2)\\log_2(1/2) - (1/2)\\log_2(1/2) = 1/2 + 1/2 = 1$ bit.',
      ],
    },
    {
      prompt: 'Entropy of a biased coin with $p = 0.9$. How much less than 1 bit?',
      answer: 'About $0.469$ bits.',
      steps: [
        'Binary entropy: $H(p) = -p\\log_2 p - (1-p)\\log_2(1-p)$.',
        '$H(0.9) = -0.9\\log_2 0.9 - 0.1\\log_2 0.1 \\approx 0.9(0.152) + 0.1(3.322) \\approx 0.137 + 0.332 = 0.469$ bits.',
        'The coin is less "random" than a fair one, so its entropy is lower.',
      ],
    },
    {
      prompt: 'What is $H(X)$ for a uniform distribution over $n$ outcomes?',
      answer: '$\\log_2 n$ bits.',
      steps: [
        '$H(X) = -\\sum_{i=1}^n (1/n)\\log_2(1/n) = \\log_2 n$.',
        'Uniform distributions maximize entropy among distributions over a finite set.',
      ],
    },
    {
      prompt: 'The average of $100$ iid samples has standard error $\\sigma/\\sqrt{100} = \\sigma/10$. If $\\sigma = 5$, what is the standard error of $\\bar X$?',
      answer: '$0.5$.',
      steps: [
        '$\\text{sd}(\\bar X) = \\sigma/\\sqrt n = 5/10 = 0.5$.',
        'This is why averaging reduces noise: standard error shrinks as $1/\\sqrt n$.',
      ],
    },
  ];

  var BANK_LIMITS_STANDARD = [
    {
      prompt: 'Use the CLT to estimate the probability that the sample mean of $100$ iid rolls of a fair 6-sided die is greater than $4$.',
      answer: 'About $0.0023$.',
      steps: [
        'Population mean $\\mu = 3.5$, variance $35/12\\approx 2.917$, so $\\sigma\\approx 1.708$.',
        'Standard error of $\\bar X$: $\\sigma/\\sqrt{100}\\approx 0.1708$.',
        'Standardize: $Z = (4 - 3.5)/0.1708 \\approx 2.928$.',
        '$P(Z > 2.928)\\approx 0.0017$. (Actually, $\\Phi(2.93) \\approx 0.9983$, so the upper tail is $\\approx 0.0017$.)',
      ],
    },
    {
      prompt: 'KL divergence: compute $D_{KL}(P\\|Q)$ where $P$ and $Q$ are both Bernoulli with $p = 0.5$ and $q = 0.8$.',
      answer: 'About $0.322$ bits.',
      steps: [
        '$D_{KL}(P\\|Q) = \\sum_x p(x)\\log_2[p(x)/q(x)]$.',
        '$= 0.5\\log_2(0.5/0.8) + 0.5\\log_2(0.5/0.2)$.',
        '$= 0.5(-0.678) + 0.5(1.322) = -0.339 + 0.661 = 0.322$ bits.',
        'KL is not symmetric: $D(P\\|Q) \\ne D(Q\\|P)$ in general.',
      ],
    },
    {
      prompt: 'Industrial quality control: a part has mean thickness $2.0$ mm with standard deviation $0.1$ mm. You measure $25$ parts and average. What is the approximate distribution of the sample mean?',
      answer: '$\\bar X\\approx\\mathcal N(2.0, 0.02^2)$.',
      steps: [
        'By CLT, $\\bar X\\approx\\mathcal N(\\mu, \\sigma^2/n)$.',
        '$\\mu = 2.0$, $\\sigma^2/n = 0.01/25 = 0.0004$, so sd $= 0.02$.',
      ],
    },
    {
      prompt: 'A coin is tossed $n$ times with $P(H) = p$. Use Chebyshev\'s inequality to bound the probability that the empirical proportion of heads is more than $0.1$ away from $p$, when $n = 100$ and $p = 0.5$.',
      answer: '$P(|\\hat p - p| > 0.1) \\le 0.25$.',
      steps: [
        'Chebyshev: $P(|\\hat p - p| > k\\sigma) \\le 1/k^2$.',
        '$\\hat p$ has variance $p(1-p)/n = 0.25/100 = 0.0025$, sd $= 0.05$.',
        '$k\\sigma = 0.1$ gives $k = 2$, so the bound is $1/4 = 0.25$.',
        'The CLT gives a tighter estimate ($\\approx 0.046$), but Chebyshev is distribution-free.',
      ],
    },
    {
      prompt: 'Information theory: if I send a symbol from an alphabet of 256 letters uniformly, how many bits does that take in the ideal coding?',
      answer: '$8$ bits per symbol.',
      steps: [
        'Entropy of uniform over $n$ outcomes is $\\log_2 n$.',
        '$\\log_2 256 = 8$ bits.',
        'Shannon\'s source coding theorem says you cannot compress below $H(X)$ bits per symbol on average without loss.',
      ],
    },
    {
      prompt: 'What is the cross-entropy $H(P, Q) = -\\sum_x p(x)\\log_2 q(x)$ between $P = (0.5, 0.25, 0.25)$ and $Q = (1/3, 1/3, 1/3)$?',
      answer: '$\\log_2 3\\approx 1.585$ bits.',
      steps: [
        'Because $Q$ is uniform, $\\log_2 q(x) = -\\log_2 3$ for every $x$.',
        '$H(P, Q) = -\\sum_x p(x)(-\\log_2 3) = \\log_2 3\\approx 1.585$.',
        'Compare to entropy of $P$: $H(P) = 0.5 + 0.25(2) + 0.25(2) = 1.5$.',
        '$D(P\\|Q) = H(P,Q) - H(P) = 1.585 - 1.5 = 0.085$ bits.',
      ],
    },
    {
      prompt: 'ML: in classification with softmax output $q$ and one-hot label $p$, show that the cross-entropy loss simplifies to $-\\log q_k$ where $k$ is the true class.',
      answer: '$H(p, q) = -\\log q_k$ for one-hot $p$.',
      steps: [
        '$H(p, q) = -\\sum_i p_i\\log q_i$.',
        'One-hot $p$ has $p_k = 1$ and all others $0$.',
        'So the sum collapses: $H(p, q) = -\\log q_k$.',
        'This is exactly the "negative log-likelihood" of the correct class — minimizing it increases $q_k$.',
      ],
    },
    {
      prompt: 'Why does the sample mean of iid Cauchy random variables fail to obey the LLN?',
      answer: 'Cauchy has no finite mean — in fact, $\\bar X_n$ has the same distribution as a single $X$.',
      steps: [
        'Cauchy is heavy-tailed: $\\int |x| f(x)\\,dx$ diverges.',
        'So $\\mathbb E[X]$ is undefined, and the LLN\'s hypothesis fails.',
        'A remarkable property: if $X_1, \\ldots, X_n$ are iid standard Cauchy, $\\bar X_n$ is itself standard Cauchy. Averaging does not help at all.',
        'This is a cautionary tale: the "average" of noisy measurements from a heavy-tailed process may not be informative.',
      ],
    },
  ];

  PS.registerTopic("prob-limits-info", {
    title: "Limit theorems and information theory",
    description: "LLN, CLT, Chebyshev, entropy, cross-entropy, and KL divergence.",
    warmup:   BANK_LIMITS_WARMUP,
    standard: BANK_LIMITS_STANDARD,
    warmupCount: 5,
    standardCount: 5,
    challengeCount: 0,
  });

  });  // whenReady
})();
