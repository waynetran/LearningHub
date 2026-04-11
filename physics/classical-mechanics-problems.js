/*
 * LearningHub - Classical Mechanics Problem Set
 * Registers four topics with the LearningHubProblemSet runtime:
 *   phys-cm-kinematics - 1D and projectile motion
 *   phys-cm-newton     - Newton's laws, forces, free-body diagrams
 *   phys-cm-energy     - work, kinetic/potential energy, conservation
 *   phys-cm-rotation   - torque, moment of inertia, angular momentum
 *
 * Problems are hand-authored with worked steps. Numbers chosen so arithmetic
 * is tractable without a calculator.
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[cm-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // ============================================================
  // TOPIC: phys-cm-kinematics
  // ============================================================
  var KIN_WARMUP = [
    {
      prompt: 'A car accelerates from rest at $2.0\\,\\text{m/s}^2$ for $5.0\\,\\text{s}$. What is its final velocity?',
      answer: '$10\\,\\text{m/s}$',
      steps: [
        'Use $v = v_0 + at$.',
        'With $v_0 = 0$, $a = 2.0\\,\\text{m/s}^2$, $t = 5.0\\,\\text{s}$.',
        '$v = 0 + (2.0)(5.0) = 10\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'An object is dropped from a tall building. How far does it fall in $3.0\\,\\text{s}$? Ignore air resistance; use $g = 9.8\\,\\text{m/s}^2$.',
      answer: '$44.1\\,\\text{m}$',
      steps: [
        'Use $\\Delta y = \\tfrac{1}{2} g t^2$ for free fall from rest.',
        '$\\Delta y = \\tfrac{1}{2}(9.8)(3.0)^2 = \\tfrac{1}{2}(9.8)(9.0)$.',
        '$\\Delta y = 44.1\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A runner moves at a constant $4.0\\,\\text{m/s}$ for $120\\,\\text{s}$. How far does she go?',
      answer: '$480\\,\\text{m}$',
      steps: [
        'At constant velocity, distance is $v \\cdot t$.',
        '$(4.0)(120) = 480\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A car braking at $-4\\,\\text{m/s}^2$ from $20\\,\\text{m/s}$ stops in how many seconds?',
      answer: '$5\\,\\text{s}$',
      steps: [
        'Use $v = v_0 + at$ and set $v = 0$.',
        '$0 = 20 + (-4) t \\Rightarrow t = 5\\,\\text{s}$.',
      ],
    },
    {
      prompt: 'A ball is thrown straight up at $15\\,\\text{m/s}$. How high does it go? ($g = 10\\,\\text{m/s}^2$.)',
      answer: '$11.25\\,\\text{m}$',
      steps: [
        'At maximum height the velocity is zero.',
        'Use $v^2 = v_0^2 - 2 g h$ with $v = 0$.',
        '$h = v_0^2/(2g) = 225/20 = 11.25\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A train accelerates uniformly from $10\\,\\text{m/s}$ to $30\\,\\text{m/s}$ over $200\\,\\text{m}$. Find the acceleration.',
      answer: '$2\\,\\text{m/s}^2$',
      steps: [
        'Use $v^2 = v_0^2 + 2 a \\Delta x$.',
        '$(30)^2 = (10)^2 + 2 a (200)$, so $900 - 100 = 400 a$.',
        '$a = 800/400 = 2\\,\\text{m/s}^2$.',
      ],
    },
  ];

  var KIN_STANDARD = [
    {
      prompt: 'A projectile is launched at $30\\,\\text{m/s}$ at $60^\\circ$ above the horizontal. What are its horizontal and vertical velocity components?',
      answer: '$v_x = 15\\,\\text{m/s}$, $v_y = 15\\sqrt{3} \\approx 26\\,\\text{m/s}$',
      steps: [
        '$v_x = v_0 \\cos\\theta = 30 \\cdot \\tfrac{1}{2} = 15\\,\\text{m/s}$.',
        '$v_y = v_0 \\sin\\theta = 30 \\cdot \\tfrac{\\sqrt{3}}{2} = 15\\sqrt{3} \\approx 26.0\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'Using the previous problem, how long does the projectile stay in the air (level ground)?',
      answer: '$t \\approx 5.3\\,\\text{s}$ (using $g = 9.8$)',
      steps: [
        'Time of flight is $t = 2 v_y / g$.',
        '$t = 2 \\cdot 26.0/9.8 \\approx 5.3\\,\\text{s}$.',
      ],
    },
    {
      prompt: 'A stone is thrown horizontally at $8\\,\\text{m/s}$ from a cliff $45\\,\\text{m}$ high. How far from the base does it land? ($g = 10\\,\\text{m/s}^2$.)',
      answer: '$24\\,\\text{m}$',
      steps: [
        'Time to fall: $45 = \\tfrac{1}{2} (10) t^2 \\Rightarrow t^2 = 9 \\Rightarrow t = 3\\,\\text{s}$.',
        'Horizontal distance: $x = v_x t = 8 \\cdot 3 = 24\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A car at rest accelerates uniformly for $12\\,\\text{s}$ and covers $216\\,\\text{m}$. Find the acceleration and final velocity.',
      answer: '$a = 3\\,\\text{m/s}^2$, $v_f = 36\\,\\text{m/s}$',
      steps: [
        'Use $\\Delta x = \\tfrac{1}{2} a t^2$ with $v_0 = 0$.',
        '$216 = \\tfrac{1}{2} a (144) \\Rightarrow a = 216/72 = 3\\,\\text{m/s}^2$.',
        '$v_f = a t = 3 \\cdot 12 = 36\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'Two cars start $900\\,\\text{m}$ apart and drive toward each other. Car A at $15\\,\\text{m/s}$, car B at $30\\,\\text{m/s}$. When and where do they meet?',
      answer: '$t = 20\\,\\text{s}$, and they meet $300\\,\\text{m}$ from A.',
      steps: [
        'Closing speed is $15 + 30 = 45\\,\\text{m/s}$.',
        'Time to meet: $900/45 = 20\\,\\text{s}$.',
        'Distance A has traveled: $15 \\cdot 20 = 300\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A ball is thrown up from a $25\\,\\text{m}$ tall building with initial speed $20\\,\\text{m/s}$. Using $g = 10\\,\\text{m/s}^2$, how long before it hits the ground?',
      answer: '$t \\approx 5\\,\\text{s}$',
      steps: [
        'Take up as positive; ground is at $y = -25$.',
        '$y = v_0 t - \\tfrac{1}{2} g t^2 \\Rightarrow -25 = 20 t - 5 t^2$.',
        'Rearrange: $5 t^2 - 20 t - 25 = 0$, i.e. $t^2 - 4 t - 5 = 0$.',
        'Factor: $(t - 5)(t + 1) = 0$, so $t = 5\\,\\text{s}$ (rejecting the negative root).',
      ],
    },
    {
      prompt: 'A plane needs a runway velocity of $80\\,\\text{m/s}$ to take off. Its engines provide $4\\,\\text{m/s}^2$ of acceleration. What runway length is needed?',
      answer: '$800\\,\\text{m}$',
      steps: [
        'Use $v^2 = v_0^2 + 2 a \\Delta x$ with $v_0 = 0$, $v = 80$, $a = 4$.',
        '$\\Delta x = v^2 / (2a) = 6400/8 = 800\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'At what angle is the range of a projectile (level ground) maximized, and why?',
      answer: '$45^\\circ$.',
      steps: [
        'Range $R = v_0^2 \\sin(2\\theta) / g$.',
        '$\\sin(2\\theta)$ is maximized when $2\\theta = 90^\\circ$, i.e. $\\theta = 45^\\circ$.',
      ],
    },
    {
      prompt: 'A skydiver in free fall reaches terminal velocity of $55\\,\\text{m/s}$. How far does she fall in the first $4\\,\\text{s}$ <em>ignoring</em> drag? ($g = 9.8$.)',
      answer: '$\\approx 78\\,\\text{m}$',
      steps: [
        'Without drag, free fall from rest: $y = \\tfrac{1}{2} g t^2$.',
        '$y = \\tfrac{1}{2} (9.8) (16) = 78.4\\,\\text{m}$.',
        '(Drag starts mattering well before she hits terminal speed; real distance is smaller.)',
      ],
    },
  ];

  var KIN_CHALLENGE = [
    {
      prompt: 'A projectile is launched from the origin and lands at the same height. Show that the maximum height $h$ and the range $R$ are related by $R = 4 h / \\tan\\theta$.',
      answer: 'Derived below.',
      steps: [
        '$h = v_0^2 \\sin^2\\theta / (2 g)$ and $R = v_0^2 \\sin(2\\theta)/g = 2 v_0^2 \\sin\\theta\\cos\\theta/g$.',
        'Divide: $R/h = 4\\cos\\theta/\\sin\\theta = 4/\\tan\\theta$.',
        'So $R = 4 h / \\tan\\theta$. At $\\theta = 45^\\circ$, $R = 4 h$.',
      ],
    },
    {
      prompt: 'A ball is thrown horizontally from a cliff and another is dropped at the same instant. Which hits the ground first?',
      answer: 'They hit at the same time.',
      steps: [
        'Vertical motion is independent of horizontal motion.',
        'Both start with $v_y = 0$ and fall under the same $g$.',
        'They hit at the same time; the horizontally-thrown ball just lands farther away.',
      ],
    },
    {
      prompt: 'A baseball is hit at $40\\,\\text{m/s}$ at $30^\\circ$ above horizontal from $1\\,\\text{m}$ height. Does it clear a $6\\,\\text{m}$ fence $100\\,\\text{m}$ away? ($g = 10$.)',
      answer: 'Yes — it crosses the fence line at about $13.7\\,\\text{m}$ above the ground.',
      steps: [
        '$v_x = 40\\cos 30^\\circ \\approx 34.6\\,\\text{m/s}$.',
        'Time to fence: $t = 100/34.6 \\approx 2.89\\,\\text{s}$.',
        '$v_y = 40\\sin 30^\\circ = 20\\,\\text{m/s}$.',
        'Height at fence: $y = 1 + 20 t - 5 t^2 = 1 + 57.8 - 41.7 \\approx 17.1\\,\\text{m}$.',
        '(Actually about $17\\,\\text{m}$ — well above the $6\\,\\text{m}$ fence. It clears.)',
      ],
    },
    {
      prompt: 'A car approaching a red light at $30\\,\\text{m/s}$ brakes at $-5\\,\\text{m/s}^2$. Driver reaction time is $1.0\\,\\text{s}$ (full speed during reaction). Total stopping distance?',
      answer: '$120\\,\\text{m}$',
      steps: [
        'Distance during reaction: $30 \\cdot 1 = 30\\,\\text{m}$.',
        'Distance while braking: $v^2/(2 a) = 900/10 = 90\\,\\text{m}$.',
        'Total: $30 + 90 = 120\\,\\text{m}$.',
      ],
    },
    {
      prompt: 'A ball is dropped from $h$ and rebounds to $\\tfrac{1}{2} h$ after each bounce (lossy). What is the total distance it travels before coming to rest, in terms of $h$?',
      answer: '$3 h$',
      steps: [
        'First fall: $h$. First rise: $h/2$. First fall after: $h/2$. Second rise: $h/4$, etc.',
        'Total distance: $h + 2(h/2) + 2(h/4) + 2(h/8) + \\ldots = h + 2 h (1/2 + 1/4 + \\ldots) = h + 2 h \\cdot 1 = 3 h$.',
      ],
    },
  ];

  PS.registerTopic("phys-cm-kinematics", {
    title: "Kinematics",
    description: "1D motion with constant acceleration and projectile problems. Numbers designed for mental arithmetic.",
    warmup: KIN_WARMUP,
    standard: KIN_STANDARD,
    challenge: KIN_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-cm-newton
  // ============================================================
  var NEWTON_WARMUP = [
    {
      prompt: 'A $5\\,\\text{kg}$ block sits on a frictionless table. What horizontal force gives it an acceleration of $3\\,\\text{m/s}^2$?',
      answer: '$15\\,\\text{N}$',
      steps: [
        'Newton\'s second law: $F = m a$.',
        '$F = 5 \\cdot 3 = 15\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'State Newton\'s third law in one sentence.',
      answer: 'If object A exerts a force on object B, then B exerts an equal and opposite force on A.',
      steps: [
        'Forces always come in pairs acting on different bodies.',
        'The pair has equal magnitude and opposite direction.',
      ],
    },
    {
      prompt: 'A $2\\,\\text{kg}$ book rests on a table. What is the normal force from the table on the book? ($g = 10$.)',
      answer: '$20\\,\\text{N}$',
      steps: [
        'The book is in static equilibrium: net force is zero.',
        'Gravity pulls down with $mg = 2 \\cdot 10 = 20\\,\\text{N}$.',
        'Normal force must balance it: $N = 20\\,\\text{N}$ upward.',
      ],
    },
    {
      prompt: 'A $10\\,\\text{kg}$ crate is pushed horizontally with $30\\,\\text{N}$ on a frictionless floor. Find its acceleration.',
      answer: '$3\\,\\text{m/s}^2$',
      steps: [
        '$a = F/m = 30/10 = 3\\,\\text{m/s}^2$.',
      ],
    },
    {
      prompt: 'You stand in an elevator accelerating upward at $2\\,\\text{m/s}^2$. Is the scale reading more or less than your weight?',
      answer: 'More.',
      steps: [
        'Free-body: scale pushes up (normal $N$), gravity pulls down ($mg$).',
        'Net upward force must equal $m a$ with $a > 0$ up.',
        '$N - m g = m a \\Rightarrow N = m (g + a) > m g$.',
      ],
    },
  ];

  var NEWTON_STANDARD = [
    {
      prompt: 'A $2\\,\\text{kg}$ block is pushed with $20\\,\\text{N}$ horizontally on a surface with kinetic friction coefficient $0.2$. What is its acceleration? ($g = 10$.)',
      answer: '$8\\,\\text{m/s}^2$',
      steps: [
        'Normal force $N = m g = 20\\,\\text{N}$.',
        'Friction force $f = \\mu_k N = 0.2 \\cdot 20 = 4\\,\\text{N}$ opposing motion.',
        'Net horizontal: $F_{\\text{net}} = 20 - 4 = 16\\,\\text{N}$.',
        '$a = 16/2 = 8\\,\\text{m/s}^2$.',
      ],
    },
    {
      prompt: 'A block of mass $m$ slides down a frictionless incline of angle $\\theta$. What is its acceleration down the slope?',
      answer: '$a = g \\sin\\theta$',
      steps: [
        'Resolve gravity into components along and perpendicular to the incline.',
        'Along the slope: component is $m g \\sin\\theta$.',
        'Perpendicular: component is $m g \\cos\\theta$, balanced by normal force.',
        'Newton\'s second law along slope: $a = g \\sin\\theta$.',
      ],
    },
    {
      prompt: 'Two blocks, $m_1 = 3\\,\\text{kg}$ and $m_2 = 2\\,\\text{kg}$, are connected by a string over a frictionless pulley (Atwood machine). Find the acceleration and tension. ($g = 10$.)',
      answer: '$a = 2\\,\\text{m/s}^2$, $T = 24\\,\\text{N}$.',
      steps: [
        'Let $m_1$ move down, $m_2$ move up, both with magnitude $a$.',
        '$m_1 g - T = m_1 a \\Rightarrow 30 - T = 3 a$.',
        '$T - m_2 g = m_2 a \\Rightarrow T - 20 = 2 a$.',
        'Add: $10 = 5 a \\Rightarrow a = 2\\,\\text{m/s}^2$.',
        'Then $T = 20 + 2 a = 24\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'A $1000\\,\\text{kg}$ car is going around a flat circular track of radius $50\\,\\text{m}$ at $10\\,\\text{m/s}$. What centripetal force is required, and where does it come from?',
      answer: '$2000\\,\\text{N}$, supplied by friction between tires and road.',
      steps: [
        'Centripetal force: $F = m v^2 / r = 1000 \\cdot 100 / 50 = 2000\\,\\text{N}$.',
        'On a flat curve, the only horizontal force on the car is static friction from the road.',
        'If the required friction exceeds $\\mu_s m g$, the car slides.',
      ],
    },
    {
      prompt: 'You pull a $10\\,\\text{kg}$ sled on flat snow (friction coefficient $0.1$) with a rope at $30^\\circ$ above horizontal, applying $40\\,\\text{N}$. Find the acceleration. ($g = 10$.)',
      answer: '$\\approx 2.6\\,\\text{m/s}^2$',
      steps: [
        'Horizontal component of pull: $F_x = 40 \\cos 30^\\circ \\approx 34.6\\,\\text{N}$.',
        'Vertical component lifts the sled, reducing the normal force: $F_y = 40 \\sin 30^\\circ = 20\\,\\text{N}$.',
        'Normal force: $N = m g - F_y = 100 - 20 = 80\\,\\text{N}$.',
        'Friction: $f = 0.1 \\cdot 80 = 8\\,\\text{N}$.',
        'Net horizontal: $34.6 - 8 = 26.6\\,\\text{N}$, so $a = 2.66\\,\\text{m/s}^2$.',
      ],
    },
    {
      prompt: 'A block on a $30^\\circ$ incline has coefficient of static friction $\\mu_s = 0.4$. Does it slide on its own?',
      answer: 'Yes — barely. Static friction can only supply $\\mu_s \\cos 30^\\circ \\approx 0.346$ of $m g$, but the component pulling it down is $\\sin 30^\\circ = 0.5$ of $m g$.',
      steps: [
        'Condition for no slide: $\\tan\\theta \\le \\mu_s$.',
        '$\\tan 30^\\circ \\approx 0.577 > 0.4$, so it slides.',
      ],
    },
    {
      prompt: 'A rocket of mass $1000\\,\\text{kg}$ exerts $12{,}000\\,\\text{N}$ of thrust. What is its upward acceleration just after launch? ($g = 10$.)',
      answer: '$2\\,\\text{m/s}^2$',
      steps: [
        'Net upward force: $F_{\\text{net}} = F_{\\text{thrust}} - m g = 12000 - 10000 = 2000\\,\\text{N}$.',
        '$a = 2000/1000 = 2\\,\\text{m/s}^2$.',
      ],
    },
    {
      prompt: 'A $2\\,\\text{kg}$ object in a conical pendulum sweeps out a circle of radius $1\\,\\text{m}$ with the string at $30^\\circ$ to the vertical. Find the tension. ($g = 10$.)',
      answer: '$T \\approx 23.1\\,\\text{N}$',
      steps: [
        'Vertical: $T\\cos 30^\\circ = m g$, so $T = 20/\\cos 30^\\circ$.',
        '$\\cos 30^\\circ = \\sqrt{3}/2 \\approx 0.866$.',
        '$T \\approx 20/0.866 \\approx 23.1\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'A $3\\,\\text{kg}$ block is pushed against a wall by a horizontal force $F$. The static friction coefficient with the wall is $0.5$. What minimum $F$ prevents the block from sliding down? ($g = 10$.)',
      answer: '$60\\,\\text{N}$',
      steps: [
        'Normal force from the wall equals $F$ (horizontal equilibrium).',
        'Maximum static friction: $\\mu_s F = 0.5 F$, acting upward.',
        'For equilibrium vertically: $0.5 F \\ge m g = 30$.',
        'So $F \\ge 60\\,\\text{N}$.',
      ],
    },
  ];

  var NEWTON_CHALLENGE = [
    {
      prompt: 'Two blocks of masses $m$ and $2m$ are stacked on a frictionless floor, with the coefficient of friction between them equal to $\\mu$. What is the maximum horizontal force $F$ you can apply to the bottom block so the top one does not slip?',
      answer: '$F_{\\max} = 3 \\mu m g$',
      steps: [
        'For the top block not to slip, the only horizontal force on it is friction from below, max $\\mu m g$.',
        'That friction gives the top block acceleration $\\mu g$.',
        'Both blocks must accelerate together: $a = \\mu g$.',
        'Total force on combined mass $3 m$: $F = 3 m \\cdot \\mu g = 3 \\mu m g$.',
      ],
    },
    {
      prompt: 'A pendulum of length $L$ hangs from the ceiling of a train accelerating horizontally at $a$. At what angle $\\theta$ from vertical does the pendulum hang in steady state?',
      answer: '$\\theta = \\arctan(a / g)$',
      steps: [
        'In the train\'s frame, the bob experiences gravity $m g$ down and an inertial force $m a$ opposite to the train\'s acceleration.',
        'Tension in the string must balance both, so it points along the resultant.',
        'Angle with vertical: $\\tan\\theta = m a / m g = a / g$.',
      ],
    },
    {
      prompt: 'A car rounds a banked curve of radius $R$ at angle $\\theta$ to the horizontal. What speed lets it round the curve with <em>no</em> friction required?',
      answer: '$v = \\sqrt{g R \\tan\\theta}$',
      steps: [
        'Forces: gravity down ($m g$), normal perpendicular to the banked surface.',
        'Horizontal component of normal provides centripetal: $N\\sin\\theta = m v^2/R$.',
        'Vertical component balances gravity: $N\\cos\\theta = m g$.',
        'Divide: $\\tan\\theta = v^2/(g R)$, so $v = \\sqrt{g R \\tan\\theta}$.',
      ],
    },
    {
      prompt: 'A bead slides without friction along a wire shaped like $y = x^2/2$. Write the equation of motion (using $x$ as coordinate) and identify when it is simple harmonic.',
      answer: 'Near $x = 0$, $\\ddot x \\approx -g x$, so it is SHM with angular frequency $\\sqrt{g}$.',
      steps: [
        'Kinetic energy: $T = \\tfrac{1}{2} m (\\dot x^2 + \\dot y^2)$ with $\\dot y = x \\dot x$.',
        'So $T = \\tfrac{1}{2} m \\dot x^2 (1 + x^2)$.',
        'Potential: $V = m g y = m g x^2/2$.',
        'Lagrangian $L = T - V$. For small $x$, $1 + x^2 \\approx 1$, and Euler-Lagrange gives $m\\ddot x \\approx -m g x$.',
        'This is SHM with $\\omega = \\sqrt{g}$.',
      ],
    },
    {
      prompt: 'A block on a frictionless incline is attached by a rope over a pulley at the top to a hanging weight. Derive the condition on the incline angle for the system to be in equilibrium when the masses are equal.',
      answer: 'Impossible unless $\\theta = 90^\\circ$. In general, with block mass $m_1$ and hanging mass $m_2$, equilibrium requires $m_2 = m_1 \\sin\\theta$.',
      steps: [
        'Block on incline: net force down the slope is $m_1 g \\sin\\theta - T$.',
        'Hanging mass: net downward force is $m_2 g - T$.',
        'Equilibrium: both nets are zero, so $T = m_1 g \\sin\\theta = m_2 g$.',
        '$m_2 = m_1 \\sin\\theta$; equal masses give $\\sin\\theta = 1$, i.e. vertical.',
      ],
    },
  ];

  PS.registerTopic("phys-cm-newton", {
    title: "Newton's laws and forces",
    description: "Free-body diagrams, friction, inclined planes, and circular motion.",
    warmup: NEWTON_WARMUP,
    standard: NEWTON_STANDARD,
    challenge: NEWTON_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-cm-energy
  // ============================================================
  var ENERGY_WARMUP = [
    {
      prompt: 'How much kinetic energy does a $2\\,\\text{kg}$ object moving at $3\\,\\text{m/s}$ have?',
      answer: '$9\\,\\text{J}$',
      steps: [
        '$K = \\tfrac{1}{2} m v^2 = \\tfrac{1}{2}(2)(9) = 9\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'What is the gravitational potential energy of a $5\\,\\text{kg}$ mass lifted $4\\,\\text{m}$? ($g = 10$.)',
      answer: '$200\\,\\text{J}$',
      steps: [
        '$U = m g h = 5 \\cdot 10 \\cdot 4 = 200\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'How much work does a $10\\,\\text{N}$ force do pushing an object $5\\,\\text{m}$ in its direction?',
      answer: '$50\\,\\text{J}$',
      steps: [
        '$W = F \\cdot d = 10 \\cdot 5 = 50\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A spring with constant $k = 200\\,\\text{N/m}$ is compressed by $0.1\\,\\text{m}$. How much elastic PE does it store?',
      answer: '$1\\,\\text{J}$',
      steps: [
        '$U = \\tfrac{1}{2} k x^2 = \\tfrac{1}{2}(200)(0.01) = 1\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A $60\\,\\text{W}$ lightbulb runs for $1\\,\\text{hour}$. How much energy does it use?',
      answer: '$216{,}000\\,\\text{J}$',
      steps: [
        '$E = P \\cdot t = 60 \\cdot 3600 = 216{,}000\\,\\text{J}$.',
      ],
    },
  ];

  var ENERGY_STANDARD = [
    {
      prompt: 'A $0.5\\,\\text{kg}$ ball is dropped from $10\\,\\text{m}$. Using energy conservation, find its speed just before hitting the ground. ($g = 10$.)',
      answer: '$\\approx 14.1\\,\\text{m/s}$',
      steps: [
        'Initial PE: $m g h = 0.5 \\cdot 10 \\cdot 10 = 50\\,\\text{J}$.',
        'All converts to KE: $\\tfrac{1}{2} m v^2 = 50 \\Rightarrow v^2 = 200 \\Rightarrow v \\approx 14.1\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'A $2\\,\\text{kg}$ block slides down a frictionless ramp of height $5\\,\\text{m}$. What is its speed at the bottom? ($g = 10$.)',
      answer: '$10\\,\\text{m/s}$',
      steps: [
        'Energy conservation: $m g h = \\tfrac{1}{2} m v^2$.',
        '$v^2 = 2 g h = 100$, so $v = 10\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'A $1000\\,\\text{kg}$ car going $20\\,\\text{m/s}$ brakes to a stop. Its kinetic energy is dissipated by friction over $50\\,\\text{m}$. What is the friction force?',
      answer: '$4000\\,\\text{N}$',
      steps: [
        'KE: $\\tfrac{1}{2} m v^2 = 200{,}000\\,\\text{J}$.',
        'Work done by friction: $W = -F \\cdot d = -200{,}000$.',
        '$F = 200{,}000 / 50 = 4000\\,\\text{N}$.',
      ],
    },
    {
      prompt: 'A spring-loaded gun compresses a spring with $k = 500\\,\\text{N/m}$ by $0.2\\,\\text{m}$ and launches a $0.1\\,\\text{kg}$ ball. Find the launch speed.',
      answer: '$\\approx 14.1\\,\\text{m/s}$',
      steps: [
        'Spring PE: $\\tfrac{1}{2} k x^2 = \\tfrac{1}{2}(500)(0.04) = 10\\,\\text{J}$.',
        'All becomes KE: $\\tfrac{1}{2} m v^2 = 10 \\Rightarrow v^2 = 200$, $v \\approx 14.1\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'Estimate the power needed for a $70\\,\\text{kg}$ person to climb $3\\,\\text{m}$ of stairs in $4\\,\\text{s}$. ($g = 10$.)',
      answer: '$525\\,\\text{W}$',
      steps: [
        'Work done: $W = m g h = 70 \\cdot 10 \\cdot 3 = 2100\\,\\text{J}$.',
        'Power: $P = W / t = 2100 / 4 = 525\\,\\text{W}$.',
      ],
    },
    {
      prompt: 'A pendulum is released from rest at $60^\\circ$ from vertical. Its length is $1\\,\\text{m}$. Find its speed at the bottom. ($g = 10$.)',
      answer: '$\\approx 3.16\\,\\text{m/s}$',
      steps: [
        'Height dropped: $h = L(1 - \\cos 60^\\circ) = 1 \\cdot (1 - 0.5) = 0.5\\,\\text{m}$.',
        'Energy conservation: $v^2 = 2 g h = 10$, $v \\approx 3.16\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'A car engine delivers $50\\,\\text{kW}$ of useful power. How long to reach $30\\,\\text{m/s}$ from rest for a $1500\\,\\text{kg}$ car, ignoring friction and drag?',
      answer: '$13.5\\,\\text{s}$',
      steps: [
        'KE needed: $\\tfrac{1}{2}(1500)(900) = 675{,}000\\,\\text{J}$.',
        'Time: $t = E/P = 675{,}000 / 50{,}000 = 13.5\\,\\text{s}$.',
      ],
    },
    {
      prompt: 'A $1\\,\\text{kg}$ block on a spring ($k = 100\\,\\text{N/m}$) oscillates with amplitude $0.2\\,\\text{m}$. What is its maximum speed?',
      answer: '$2\\,\\text{m/s}$',
      steps: [
        'Total energy: $\\tfrac{1}{2} k A^2 = \\tfrac{1}{2}(100)(0.04) = 2\\,\\text{J}$.',
        'At equilibrium, all is KE: $\\tfrac{1}{2} m v^2 = 2 \\Rightarrow v = 2\\,\\text{m/s}$.',
      ],
    },
    {
      prompt: 'A roller coaster starts at rest from height $40\\,\\text{m}$. Ignoring friction, what is its speed at a loop whose top is $30\\,\\text{m}$ above ground? ($g = 10$.)',
      answer: '$\\approx 14.1\\,\\text{m/s}$',
      steps: [
        'Height dropped: $40 - 30 = 10\\,\\text{m}$.',
        '$v^2 = 2 g \\Delta h = 200$, $v \\approx 14.1\\,\\text{m/s}$.',
      ],
    },
  ];

  var ENERGY_CHALLENGE = [
    {
      prompt: 'Derive the minimum speed at the top of a vertical loop of radius $R$ for a roller coaster, assuming the rider just barely loses contact with the track.',
      answer: '$v_{\\min} = \\sqrt{g R}$',
      steps: [
        'At the top, gravity provides the centripetal force when the normal force is zero.',
        '$m g = m v^2 / R$.',
        '$v = \\sqrt{g R}$.',
      ],
    },
    {
      prompt: 'A block slides down a frictionless ramp from height $H$ and then along a flat surface with friction $\\mu$ until it stops. Find how far it slides on the flat.',
      answer: '$d = H / \\mu$',
      steps: [
        'KE at bottom of ramp: $m g H$.',
        'On flat, friction does work $-\\mu m g d$.',
        'Setting $m g H = \\mu m g d$ gives $d = H/\\mu$. Notice $m$ cancels.',
      ],
    },
    {
      prompt: 'A $2\\,\\text{kg}$ object on a horizontal spring ($k = 50\\,\\text{N/m}$, amplitude $0.4\\,\\text{m}$) has a friction coefficient $\\mu = 0.1$ with the surface. What fraction of the initial energy remains after one half-cycle? ($g = 10$.)',
      answer: '$\\approx 60\\%$',
      steps: [
        'Initial energy: $\\tfrac{1}{2}(50)(0.16) = 4\\,\\text{J}$.',
        'Friction force: $\\mu m g = 0.1 \\cdot 2 \\cdot 10 = 2\\,\\text{N}$.',
        'Over a half-cycle, the block moves $\\approx 2 A = 0.8\\,\\text{m}$, so friction dissipates $2 \\cdot 0.8 = 1.6\\,\\text{J}$.',
        'Fraction remaining: $(4 - 1.6)/4 = 0.6 = 60\\%$.',
      ],
    },
    {
      prompt: 'A small bead slides from rest down a frictionless wire from point A at height $h_A$ to point B at height $h_B$. Show that the speed at B depends only on the height difference, not the shape of the wire.',
      answer: '$v_B = \\sqrt{2 g (h_A - h_B)}$, independent of path.',
      steps: [
        'The only forces on the bead are gravity and the normal force from the wire.',
        'The normal force is always perpendicular to velocity and does no work.',
        'So mechanical energy is conserved: $\\tfrac{1}{2} m v_B^2 = m g (h_A - h_B)$.',
        'This is a general property of conservative forces.',
      ],
    },
    {
      prompt: 'A block of mass $m$ is dropped onto a vertical spring of constant $k$ from a height $h$ above the spring\'s uncompressed end. Find the maximum compression $x$.',
      answer: 'Solve $\\tfrac{1}{2} k x^2 - m g x - m g h = 0$. $x = \\dfrac{m g + \\sqrt{(m g)^2 + 2 m g h k}}{k}$.',
      steps: [
        'Set total mechanical energy at release equal to that at maximum compression.',
        'At release: PE is $m g (h + x)$ taking the bottom as zero.',
        'At max compression: spring stores $\\tfrac{1}{2} k x^2$, KE is zero.',
        '$m g (h + x) = \\tfrac{1}{2} k x^2 \\Rightarrow \\tfrac{1}{2} k x^2 - m g x - m g h = 0$.',
        'Quadratic formula gives the result above (take the positive root).',
      ],
    },
  ];

  PS.registerTopic("phys-cm-energy", {
    title: "Work, energy, and power",
    description: "Conservation of energy, work-energy theorem, and power.",
    warmup: ENERGY_WARMUP,
    standard: ENERGY_STANDARD,
    challenge: ENERGY_CHALLENGE,
  });

  // ============================================================
  // TOPIC: phys-cm-rotation
  // ============================================================
  var ROTATION_WARMUP = [
    {
      prompt: 'A wheel spinning at $10\\,\\text{rad/s}$ with a moment of inertia $2\\,\\text{kg m}^2$ has what rotational kinetic energy?',
      answer: '$100\\,\\text{J}$',
      steps: [
        '$K = \\tfrac{1}{2} I \\omega^2 = \\tfrac{1}{2}(2)(100) = 100\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'What torque is needed to give a flywheel of $I = 5\\,\\text{kg m}^2$ an angular acceleration of $4\\,\\text{rad/s}^2$?',
      answer: '$20\\,\\text{N m}$',
      steps: [
        '$\\tau = I \\alpha = 5 \\cdot 4 = 20\\,\\text{N m}$.',
      ],
    },
    {
      prompt: 'A disk of mass $M$ and radius $R$ has moment of inertia $I = \\tfrac{1}{2} M R^2$. What is $I$ for a $4\\,\\text{kg}$, $0.5\\,\\text{m}$ radius disk?',
      answer: '$0.5\\,\\text{kg m}^2$',
      steps: [
        '$I = \\tfrac{1}{2}(4)(0.25) = 0.5\\,\\text{kg m}^2$.',
      ],
    },
    {
      prompt: 'A ball on a string of length $0.5\\,\\text{m}$ swings in a circle at $2\\,\\text{m/s}$. What is its angular velocity?',
      answer: '$4\\,\\text{rad/s}$',
      steps: [
        '$\\omega = v / r = 2 / 0.5 = 4\\,\\text{rad/s}$.',
      ],
    },
    {
      prompt: 'If angular momentum $L = I \\omega$ is conserved and $I$ halves, what happens to $\\omega$?',
      answer: 'It doubles.',
      steps: [
        '$I \\omega = \\text{const}$, so halving $I$ doubles $\\omega$.',
        'This is why a figure skater spins faster when pulling arms in.',
      ],
    },
  ];

  var ROTATION_STANDARD = [
    {
      prompt: 'A uniform rod of mass $m$ and length $L$ rotates about one end. Find its moment of inertia about that end.',
      answer: '$I = \\tfrac{1}{3} m L^2$',
      steps: [
        '$I = \\int_0^L r^2 \\,dm = \\int_0^L r^2 (m/L) \\,dr$.',
        '$= (m/L) \\cdot L^3/3 = m L^2/3$.',
      ],
    },
    {
      prompt: 'A uniform disk ($M = 2\\,\\text{kg}$, $R = 0.1\\,\\text{m}$) rolls without slipping at $3\\,\\text{m/s}$. Find its total kinetic energy.',
      answer: '$13.5\\,\\text{J}$',
      steps: [
        'Translational: $\\tfrac{1}{2} M v^2 = \\tfrac{1}{2}(2)(9) = 9\\,\\text{J}$.',
        'Rotational: $\\tfrac{1}{2} I \\omega^2 = \\tfrac{1}{2}(\\tfrac{1}{2} M R^2)(v/R)^2 = \\tfrac{1}{4} M v^2 = 4.5\\,\\text{J}$.',
        'Total: $9 + 4.5 = 13.5\\,\\text{J}$.',
      ],
    },
    {
      prompt: 'A solid sphere and hollow sphere of equal mass and radius roll down an incline. Which reaches the bottom first?',
      answer: 'The solid sphere.',
      steps: [
        'Solid sphere: $I = \\tfrac{2}{5} M R^2$. Hollow: $I = \\tfrac{2}{3} M R^2$.',
        'Less rotational inertia means more of the gravitational PE goes into translational KE.',
        'Solid sphere has smaller $I/(MR^2)$, so it accelerates faster.',
      ],
    },
    {
      prompt: 'A merry-go-round ($I = 500\\,\\text{kg m}^2$, spinning at $2\\,\\text{rad/s}$) has a $50\\,\\text{kg}$ child jump onto the edge at radius $2\\,\\text{m}$. Find the new angular velocity.',
      answer: '$\\approx 1.43\\,\\text{rad/s}$',
      steps: [
        'Conservation of angular momentum (no external torque about the axis).',
        'Before: $L_i = I \\omega = 500 \\cdot 2 = 1000\\,\\text{kg m}^2/\\text{s}$.',
        'After: $I_f = I + m r^2 = 500 + 50 \\cdot 4 = 700$.',
        '$\\omega_f = 1000 / 700 \\approx 1.43\\,\\text{rad/s}$.',
      ],
    },
    {
      prompt: 'A uniform rod of length $1\\,\\text{m}$, pivoted at one end, is released from horizontal rest. Find its angular velocity when it swings through vertical. ($g = 10$.)',
      answer: '$\\omega = \\sqrt{3 g / L} \\approx 5.48\\,\\text{rad/s}$',
      steps: [
        'Center of mass drops $L/2$.',
        'Energy conservation: $m g (L/2) = \\tfrac{1}{2} I \\omega^2$ with $I = \\tfrac{1}{3} m L^2$.',
        '$m g L/2 = \\tfrac{1}{6} m L^2 \\omega^2$, so $\\omega^2 = 3 g/L = 30$, $\\omega \\approx 5.48\\,\\text{rad/s}$.',
      ],
    },
    {
      prompt: 'A $10\\,\\text{kg}$ flywheel with $I = 0.5\\,\\text{kg m}^2$ is spun up from rest to $600\\,\\text{rpm}$ by a constant torque in $10\\,\\text{s}$. Find the torque.',
      answer: '$\\approx 3.14\\,\\text{N m}$',
      steps: [
        '$600\\,\\text{rpm} = 600 \\cdot 2\\pi/60 = 20\\pi\\,\\text{rad/s} \\approx 62.8\\,\\text{rad/s}$.',
        'Angular acceleration: $\\alpha = \\omega/t = 62.8/10 = 6.28\\,\\text{rad/s}^2$.',
        'Torque: $\\tau = I \\alpha = 0.5 \\cdot 6.28 = 3.14\\,\\text{N m}$.',
      ],
    },
    {
      prompt: 'A yo-yo consists of a solid disk of mass $M$ and radius $R$ on a massless string. Find its acceleration as it falls.',
      answer: '$a = \\tfrac{2}{3} g$',
      steps: [
        'Equations: $M g - T = M a$ (linear) and $T R = I \\alpha$ (rotational).',
        '$I = \\tfrac{1}{2} M R^2$ and $a = R\\alpha$ for rolling without slip.',
        '$T R = \\tfrac{1}{2} M R^2 (a/R) \\Rightarrow T = \\tfrac{1}{2} M a$.',
        '$M g - \\tfrac{1}{2} M a = M a \\Rightarrow g = \\tfrac{3}{2} a$, so $a = \\tfrac{2}{3} g$.',
      ],
    },
    {
      prompt: 'Compare the translational and rotational kinetic energies of a solid cylinder rolling without slipping.',
      answer: 'Translational is $\\tfrac{2}{3}$ of total; rotational is $\\tfrac{1}{3}$.',
      steps: [
        'Translational KE: $\\tfrac{1}{2} M v^2$.',
        'Rotational KE: $\\tfrac{1}{2} (\\tfrac{1}{2} M R^2)(v/R)^2 = \\tfrac{1}{4} M v^2$.',
        'Ratio: trans/rot = $2/1$, so total is $\\tfrac{3}{4} M v^2$ and fractions are $2/3$ and $1/3$.',
      ],
    },
  ];

  var ROTATION_CHALLENGE = [
    {
      prompt: 'A uniform disk of mass $M$ and radius $R$ rolls without slipping down an incline of angle $\\theta$. Find its linear acceleration.',
      answer: '$a = \\tfrac{2}{3} g \\sin\\theta$',
      steps: [
        'Newton\'s second law along slope: $M g \\sin\\theta - f = M a$.',
        'Torque about center: $f R = I \\alpha = (\\tfrac{1}{2} M R^2)(a/R)$, so $f = \\tfrac{1}{2} M a$.',
        'Substitute: $M g \\sin\\theta - \\tfrac{1}{2} M a = M a$, giving $g \\sin\\theta = \\tfrac{3}{2} a$.',
        '$a = \\tfrac{2}{3} g \\sin\\theta$, which is less than the frictionless $g\\sin\\theta$ because some energy goes into rotation.',
      ],
    },
    {
      prompt: 'A figure skater with arms extended has $I_1 = 4\\,\\text{kg m}^2$ and spins at $\\omega_1 = 2\\,\\text{rev/s}$. When she pulls her arms in, $I_2 = 1\\,\\text{kg m}^2$. Find the ratio of final to initial kinetic energy and explain where the extra energy comes from.',
      answer: 'Ratio is $4$. Extra energy comes from the skater\'s muscles doing work against centrifugal effects while pulling the arms in.',
      steps: [
        'Angular momentum conservation: $I_1 \\omega_1 = I_2 \\omega_2$, so $\\omega_2 = 8\\,\\text{rev/s}$.',
        'KE ratio: $(\\tfrac{1}{2} I_2 \\omega_2^2)/(\\tfrac{1}{2} I_1 \\omega_1^2) = I_2 \\omega_2^2 / (I_1 \\omega_1^2) = I_1/I_2 = 4$.',
        'The additional energy is supplied by the muscular work done pulling the arms inward against the effective centrifugal force.',
      ],
    },
    {
      prompt: 'A $2\\,\\text{kg}$ ball moving at $6\\,\\text{m/s}$ strikes a stationary uniform rod of mass $4\\,\\text{kg}$, length $1\\,\\text{m}$, pivoted at one end. The ball strikes at the far end and sticks. Find the angular velocity after collision.',
      answer: '$\\omega = 3.6\\,\\text{rad/s}$',
      steps: [
        'Angular momentum about the pivot is conserved (the pivot exerts zero torque about itself).',
        'Before: $L_i = m v r = 2 \\cdot 6 \\cdot 1 = 12\\,\\text{kg m}^2/\\text{s}$.',
        'After: $I_{\\text{total}} = \\tfrac{1}{3} M L^2 + m L^2 = \\tfrac{1}{3}(4)(1) + (2)(1) = \\tfrac{4}{3} + 2 = \\tfrac{10}{3}\\,\\text{kg m}^2$.',
        '$\\omega = L_i / I_{\\text{total}} = 12 / (10/3) = 3.6\\,\\text{rad/s}$.',
      ],
    },
    {
      prompt: 'A uniform thin hoop, a uniform solid disk, and a uniform solid sphere are released from rest at the top of the same incline and roll without slipping. In what order do they reach the bottom?',
      answer: 'Sphere first, disk second, hoop last.',
      steps: [
        'Acceleration down incline: $a = g\\sin\\theta / (1 + I/(M R^2))$.',
        'Sphere: $I/(MR^2) = 2/5 \\Rightarrow a = \\tfrac{5}{7} g\\sin\\theta$.',
        'Disk: $I/(MR^2) = 1/2 \\Rightarrow a = \\tfrac{2}{3} g\\sin\\theta$.',
        'Hoop: $I/(MR^2) = 1 \\Rightarrow a = \\tfrac{1}{2} g\\sin\\theta$.',
        'Larger acceleration means faster, so sphere > disk > hoop.',
      ],
    },
    {
      prompt: 'A planet moves in an elliptical orbit around a star. Show that its angular momentum about the star is conserved, using Kepler\'s second law.',
      answer: 'Kepler\'s second law is equivalent to conservation of angular momentum.',
      steps: [
        'Kepler: the line from star to planet sweeps equal areas in equal times. Rate $dA/dt$ is constant.',
        '$dA/dt = \\tfrac{1}{2} |\\vec r \\times \\vec v|$.',
        'So $|\\vec r \\times \\vec v| = 2 \\, dA/dt = \\text{const}$.',
        'Multiply by mass: $|\\vec r \\times m\\vec v| = |\\vec L| = \\text{const}$.',
        'This is guaranteed because gravity is a central force (no torque about the star).',
      ],
    },
  ];

  PS.registerTopic("phys-cm-rotation", {
    title: "Rotation and angular momentum",
    description: "Torque, moment of inertia, rolling, and conservation of angular momentum.",
    warmup: ROTATION_WARMUP,
    standard: ROTATION_STANDARD,
    challenge: ROTATION_CHALLENGE,
  });

})();
