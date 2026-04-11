/*
 * LearningHub - Linear Algebra Problem Set
 * Registers 4 topics: linalg-matmul, linalg-linsys, linalg-eigen, linalg-svd
 */
(function () {
  "use strict";
  if (!window.LearningHubProblemSet) {
    console.error("[linear-algebra-problems] LearningHubProblemSet runtime not loaded");
    return;
  }
  var PS = window.LearningHubProblemSet;

  // --- helpers ---------------------------------------------------------
  function mat2(a, b, c, d) {
    return '\\begin{pmatrix}' + a + ' & ' + b + '\\\\ ' + c + ' & ' + d + '\\end{pmatrix}';
  }
  function vec2(a, b) {
    return '\\begin{pmatrix}' + a + '\\\\ ' + b + '\\end{pmatrix}';
  }
  function vec3(a, b, c) {
    return '\\begin{pmatrix}' + a + '\\\\ ' + b + '\\\\ ' + c + '\\end{pmatrix}';
  }
  function mat3(m) {
    return '\\begin{pmatrix}' +
      m[0][0]+' & '+m[0][1]+' & '+m[0][2]+'\\\\ '+
      m[1][0]+' & '+m[1][1]+' & '+m[1][2]+'\\\\ '+
      m[2][0]+' & '+m[2][1]+' & '+m[2][2]+'\\end{pmatrix}';
  }

  // ==========================================================================
  // TOPIC: linalg-matmul  (vectors, dot products, matrix ops)
  // ==========================================================================

  // Warmup: matrix-vector product 2x2 * 2x1
  function genMatVec2(rng) {
    var a = rng.nonzeroInt(-5, 5), b = rng.nonzeroInt(-5, 5);
    var c = rng.nonzeroInt(-5, 5), d = rng.nonzeroInt(-5, 5);
    var x = rng.nonzeroInt(-4, 4), y = rng.nonzeroInt(-4, 4);
    var r1 = a * x + b * y;
    var r2 = c * x + d * y;
    return {
      prompt: 'Compute $A\\mathbf{v}$ where $A = ' + mat2(a, b, c, d) + '$ and $\\mathbf{v} = ' + vec2(x, y) + '$.',
      answer: '$' + vec2(r1, r2) + '$',
      steps: [
        'Row 1 dotted with $\\mathbf{v}$: $' + a + '\\cdot' + x + ' + ' + b + '\\cdot' + y + ' = ' + r1 + '$.',
        'Row 2 dotted with $\\mathbf{v}$: $' + c + '\\cdot' + x + ' + ' + d + '\\cdot' + y + ' = ' + r2 + '$.',
        'So $A\\mathbf{v} = ' + vec2(r1, r2) + '$.',
      ],
    };
  }

  // Warmup: 3D dot product
  function genDot3(rng) {
    var a = rng.nonzeroInt(-5, 5), b = rng.nonzeroInt(-5, 5), c = rng.nonzeroInt(-5, 5);
    var p = rng.nonzeroInt(-5, 5), q = rng.nonzeroInt(-5, 5), r = rng.nonzeroInt(-5, 5);
    var ans = a*p + b*q + c*r;
    return {
      prompt: 'Compute $\\mathbf{u}\\cdot\\mathbf{v}$ where $\\mathbf{u} = ' + vec3(a,b,c) + '$ and $\\mathbf{v} = ' + vec3(p,q,r) + '$.',
      answer: '$' + ans + '$',
      steps: [
        'The dot product sums component-wise products.',
        '$\\mathbf{u}\\cdot\\mathbf{v} = ' + a + '\\cdot' + p + ' + ' + b + '\\cdot' + q + ' + ' + c + '\\cdot' + r + '$.',
        '$= ' + (a*p) + ' + ' + (b*q) + ' + ' + (c*r) + ' = ' + ans + '$.',
      ],
    };
  }

  // Standard: matrix-matrix product 2x2 by 2x2
  function genMatMat2(rng) {
    var a = rng.nonzeroInt(-4, 4), b = rng.nonzeroInt(-4, 4);
    var c = rng.nonzeroInt(-4, 4), d = rng.nonzeroInt(-4, 4);
    var e = rng.nonzeroInt(-4, 4), f = rng.nonzeroInt(-4, 4);
    var g = rng.nonzeroInt(-4, 4), h = rng.nonzeroInt(-4, 4);
    var r11 = a*e + b*g, r12 = a*f + b*h;
    var r21 = c*e + d*g, r22 = c*f + d*h;
    return {
      prompt: 'Compute $AB$ where $A = ' + mat2(a,b,c,d) + '$ and $B = ' + mat2(e,f,g,h) + '$.',
      answer: '$' + mat2(r11, r12, r21, r22) + '$',
      steps: [
        'Entry $(i,j)$ is row $i$ of $A$ dotted with column $j$ of $B$.',
        '$(AB)_{11} = ' + a + '\\cdot' + e + ' + ' + b + '\\cdot' + g + ' = ' + r11 + '$.',
        '$(AB)_{12} = ' + a + '\\cdot' + f + ' + ' + b + '\\cdot' + h + ' = ' + r12 + '$.',
        '$(AB)_{21} = ' + c + '\\cdot' + e + ' + ' + d + '\\cdot' + g + ' = ' + r21 + '$.',
        '$(AB)_{22} = ' + c + '\\cdot' + f + ' + ' + d + '\\cdot' + h + ' = ' + r22 + '$.',
      ],
    };
  }

  var STATIC_MATMUL_STANDARD = [
    {
      prompt: 'If $A$ is $3\\times 5$ and $B$ is $5\\times 2$, what are the dimensions of $AB$? Is $BA$ defined?',
      answer: '$AB$ is $3\\times 2$. $BA$ is not defined.',
      steps: [
        'For $AB$ to exist, inner dims must match: $A$ has 5 columns, $B$ has 5 rows. Good.',
        'Result takes outer dims: $3$ rows (from $A$), $2$ columns (from $B$).',
        'For $BA$, we would need $B$\'s columns ($2$) to match $A$\'s rows ($3$). They don\'t, so $BA$ is undefined.',
      ],
    },
    {
      prompt: 'Give a 2x2 example showing that matrix multiplication is not commutative: find matrices $A, B$ with $AB \\neq BA$.',
      answer: 'Many examples. E.g., $A = \\begin{pmatrix}0 & 1\\\\ 0 & 0\\end{pmatrix}$, $B = \\begin{pmatrix}0 & 0\\\\ 1 & 0\\end{pmatrix}$ gives $AB = \\begin{pmatrix}1 & 0\\\\ 0 & 0\\end{pmatrix}$ but $BA = \\begin{pmatrix}0 & 0\\\\ 0 & 1\\end{pmatrix}$.',
      steps: [
        'Pick any two noncommuting matrices. The shift/projection pair above is the canonical example.',
        'Compute $AB$: row 1 of $A$ dotted with columns of $B$ gives $(1, 0)$; row 2 is zero.',
        'Compute $BA$: row 1 of $B$ is zero; row 2 of $B$ dotted with columns of $A$ gives $(0, 1)$.',
        'These differ, so $AB \\neq BA$ in general.',
      ],
    },
    {
      prompt: 'Compute $\\|\\mathbf{v}\\|$ for $\\mathbf{v} = (3, -4, 12)$.',
      answer: '$13$',
      steps: [
        '$\\|\\mathbf{v}\\|^2 = 3^2 + (-4)^2 + 12^2 = 9 + 16 + 144 = 169$.',
        '$\\|\\mathbf{v}\\| = \\sqrt{169} = 13$.',
      ],
    },
    {
      prompt: 'Are $\\mathbf{u} = (1, 2, 2)$ and $\\mathbf{v} = (2, -1, 0)$ orthogonal?',
      answer: 'Yes.',
      steps: [
        'Compute the dot product: $1\\cdot 2 + 2\\cdot(-1) + 2\\cdot 0 = 2 - 2 + 0 = 0$.',
        'Zero dot product means the vectors are perpendicular.',
      ],
    },
    {
      prompt: 'Find the angle between $\\mathbf{u} = (1, 0)$ and $\\mathbf{v} = (1, 1)$.',
      answer: '$45^{\\circ}$ (or $\\pi/4$).',
      steps: [
        '$\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}$.',
        'Numerator: $1\\cdot 1 + 0\\cdot 1 = 1$. Norms: $\\|\\mathbf{u}\\| = 1$, $\\|\\mathbf{v}\\| = \\sqrt{2}$.',
        '$\\cos\\theta = 1/\\sqrt{2}$, so $\\theta = 45^{\\circ}$.',
      ],
    },
    {
      prompt: 'If $A$ is $m\\times n$, what condition on $m, n$ is needed for $A^TA$ to be invertible?',
      answer: 'The columns of $A$ must be linearly independent (so $A$ has rank $n$, which forces $m \\ge n$).',
      steps: [
        '$A^TA$ is always $n\\times n$ and symmetric positive semidefinite.',
        'It is invertible iff it has full rank $n$, which happens iff the columns of $A$ are linearly independent.',
        'That requires $m \\ge n$ (you cannot have $n$ independent vectors in $\\mathbb{R}^m$ when $m < n$).',
      ],
    },
  ];

  var STATIC_MATMUL_CHALLENGE = [
    {
      prompt: 'Prove that $(AB)^T = B^T A^T$ for any conformable matrices $A, B$.',
      answer: 'See steps.',
      steps: [
        'Let $A$ be $m\\times n$ and $B$ be $n\\times p$. Then $AB$ is $m\\times p$ and $(AB)^T$ is $p\\times m$.',
        'By definition $((AB)^T)_{ij} = (AB)_{ji} = \\sum_k A_{jk} B_{ki}$.',
        'Also $(B^T A^T)_{ij} = \\sum_k (B^T)_{ik}(A^T)_{kj} = \\sum_k B_{ki} A_{jk}$.',
        'Both sums are $\\sum_k A_{jk} B_{ki}$. So $(AB)^T = B^T A^T$.',
      ],
    },
    {
      prompt: 'Show that if $A$ and $B$ are both invertible $n\\times n$ matrices then $(AB)^{-1} = B^{-1}A^{-1}$.',
      answer: 'See steps.',
      steps: [
        'Let $C = B^{-1}A^{-1}$. We check that $C(AB) = I$ and $(AB)C = I$.',
        '$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I$.',
        '$(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}IB = I$.',
        'So $C$ satisfies the inverse axioms and $(AB)^{-1} = B^{-1}A^{-1}$.',
      ],
    },
    {
      prompt: 'An image convolution is a linear map. For a $4\\times 4$ input image and a $3\\times 3$ kernel (stride 1, no padding), what are the dimensions of the matrix representation of the convolution operator viewed as a map from $\\mathbb{R}^{16}$ to $\\mathbb{R}^{?}$?',
      answer: 'The output image is $2\\times 2$, so the operator is a $4\\times 16$ matrix (often very sparse).',
      steps: [
        'A $3\\times 3$ kernel applied to a $4\\times 4$ image with stride 1 and no padding yields $(4-3+1)^2 = 2\\times 2 = 4$ outputs.',
        'Flattening input to $\\mathbb{R}^{16}$ and output to $\\mathbb{R}^4$, the convolution is a linear map $\\mathbb{R}^{16} \\to \\mathbb{R}^4$.',
        'So its matrix is $4\\times 16$. Each row has only 9 nonzero entries (the 9 kernel values at the appropriate input positions).',
      ],
    },
    {
      prompt: 'Two matrices $A$ (size $100\\times 100$) and $B$ (size $100 \\times 1$) plus a scalar multiplication $c\\mathbf{B}$ where $c$ is a scalar. You want to compute $ABc$. Naive cost is one matrix-vector and one scalar multiply. Does it matter whether you scale by $c$ first or last? Why does associativity generally matter for performance?',
      answer: 'For this case either order is $O(n^2)$. In general: associativity lets you choose the cheapest parenthesization — e.g., $ABC\\mathbf{x}$ right-to-left is three $O(n^2)$ mat-vec products, but left-to-right is two $O(n^3)$ mat-mat products.',
      steps: [
        'Matrix multiplication is associative, so $(AB)c = A(Bc) = c(AB)$. The arithmetic result is the same.',
        'For operation count, however, $Bc$ is $n$ multiplies ($O(n)$), then $A(Bc)$ is $O(n^2)$. Total $O(n^2)$.',
        'Compare to longer chains: $(ABC)\\mathbf{x}$ evaluated left-to-right requires building $AB$ (cost $n^3$), then $(AB)C$ (another $n^3$), then mat-vec ($n^2$).',
        'Right-to-left: $C\\mathbf{x}$ ($n^2$), then $B(C\\mathbf{x})$ ($n^2$), then $A(\\cdots)$ ($n^2$). Total $O(n^2)$.',
        'Associativity costs nothing mathematically but saves a factor of $n$ when applied wisely. Every deep-learning framework exploits this.',
      ],
    },
    {
      prompt: 'Let $P = \\mathbf{v}\\mathbf{v}^T / (\\mathbf{v}^T\\mathbf{v})$ for a nonzero $\\mathbf{v}\\in\\mathbb{R}^n$. Show that $P^2 = P$ and describe what $P$ does geometrically.',
      answer: '$P$ is the orthogonal projection onto the line spanned by $\\mathbf{v}$; $P^2 = P$ holds because projecting twice does nothing extra.',
      steps: [
        'Compute $P^2 = \\frac{\\mathbf{v}\\mathbf{v}^T}{\\mathbf{v}^T\\mathbf{v}} \\cdot \\frac{\\mathbf{v}\\mathbf{v}^T}{\\mathbf{v}^T\\mathbf{v}} = \\frac{\\mathbf{v}(\\mathbf{v}^T\\mathbf{v})\\mathbf{v}^T}{(\\mathbf{v}^T\\mathbf{v})^2}$.',
        'The scalar $\\mathbf{v}^T\\mathbf{v}$ cancels: $P^2 = \\frac{\\mathbf{v}\\mathbf{v}^T}{\\mathbf{v}^T\\mathbf{v}} = P$.',
        'Geometrically, $P\\mathbf{x}$ drops a perpendicular from $\\mathbf{x}$ onto the line $\\mathrm{span}(\\mathbf{v})$.',
        'Any projector satisfies $P^2 = P$ (idempotence). Combined with $P^T = P$, this is the definition of an orthogonal projector.',
      ],
    },
  ];

  PS.registerTopic("linalg-matmul", {
    title: "Vectors, dot products, matrix multiplication",
    description: "Component arithmetic, row-column products, associativity, noncommutativity.",
    warmup:   [genMatVec2, genDot3],
    standard: [genMatMat2, STATIC_MATMUL_STANDARD],
    challenge: STATIC_MATMUL_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: linalg-linsys
  // ==========================================================================

  // Warmup: determinant of a 2x2
  function genDet2(rng) {
    var a = rng.nonzeroInt(-6, 6), b = rng.nonzeroInt(-6, 6);
    var c = rng.nonzeroInt(-6, 6), d = rng.nonzeroInt(-6, 6);
    var det = a*d - b*c;
    return {
      prompt: 'Find $\\det A$ for $A = ' + mat2(a,b,c,d) + '$.',
      answer: '$' + det + '$',
      steps: [
        'For a $2\\times 2$ matrix, $\\det = ad - bc$.',
        '$' + a + '\\cdot' + d + ' - ' + b + '\\cdot' + c + ' = ' + (a*d) + ' - ' + (b*c) + ' = ' + det + '$.',
      ],
    };
  }

  // Warmup: inverse of a 2x2 (when det != 0)
  function genInv2(rng) {
    var a, b, c, d, det;
    do {
      a = rng.nonzeroInt(-4, 4); b = rng.nonzeroInt(-4, 4);
      c = rng.nonzeroInt(-4, 4); d = rng.nonzeroInt(-4, 4);
      det = a*d - b*c;
    } while (det === 0);
    return {
      prompt: 'Compute $A^{-1}$ for $A = ' + mat2(a,b,c,d) + '$.',
      answer: '$\\frac{1}{' + det + '}' + mat2(d, -b, -c, a) + '$',
      steps: [
        'Use the 2x2 inverse formula: $A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}$.',
        'Here $\\det A = ' + a + '\\cdot' + d + ' - ' + b + '\\cdot' + c + ' = ' + det + '$.',
        'Swap the diagonal, flip the signs of the off-diagonal, divide by the determinant.',
      ],
    };
  }

  // Standard: determinant of a 3x3 via cofactor expansion
  function genDet3(rng) {
    var m = [[0,0,0],[0,0,0],[0,0,0]];
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) m[i][j] = rng.int(-3, 3);
    // Guarantee nonzero top-left and nonzero det occasionally.
    if (m[0][0] === 0) m[0][0] = 1;
    var det =
      m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])
      - m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])
      + m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
    return {
      prompt: 'Compute $\\det A$ for $A = ' + mat3(m) + '$.',
      answer: '$' + det + '$',
      steps: [
        'Expand along the first row: $\\det A = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}$ where $M_{ij}$ are the $2\\times 2$ minors.',
        '$M_{11} = ' + m[1][1] + '\\cdot' + m[2][2] + ' - ' + m[1][2] + '\\cdot' + m[2][1] + ' = ' + (m[1][1]*m[2][2]-m[1][2]*m[2][1]) + '$.',
        '$M_{12} = ' + m[1][0] + '\\cdot' + m[2][2] + ' - ' + m[1][2] + '\\cdot' + m[2][0] + ' = ' + (m[1][0]*m[2][2]-m[1][2]*m[2][0]) + '$.',
        '$M_{13} = ' + m[1][0] + '\\cdot' + m[2][1] + ' - ' + m[1][1] + '\\cdot' + m[2][0] + ' = ' + (m[1][0]*m[2][1]-m[1][1]*m[2][0]) + '$.',
        'Combine: $' + m[0][0] + '\\cdot M_{11} - ' + m[0][1] + '\\cdot M_{12} + ' + m[0][2] + '\\cdot M_{13} = ' + det + '$.',
      ],
    };
  }

  var STATIC_LINSYS_STANDARD = [
    {
      prompt: 'Solve the system $\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases}$.',
      answer: '$x = 2,\\ y = 1$',
      steps: [
        'Add the two equations: $3x = 6$, so $x = 2$.',
        'Back-substitute: $y = x - 1 = 1$.',
        'Check: $2(2) + 1 = 5$ and $2 - 1 = 1$. Both satisfied.',
      ],
    },
    {
      prompt: 'Is the system $\\begin{cases} x + 2y = 3 \\\\ 2x + 4y = 6 \\end{cases}$ consistent? If so, how many solutions?',
      answer: 'Yes; infinitely many solutions.',
      steps: [
        'The second equation is exactly twice the first, so the two lines are identical.',
        'Every point on the line $x + 2y = 3$ is a solution.',
        'The solution set is a 1-parameter family: $(3 - 2t, t)$ for any $t\\in\\mathbb{R}$.',
      ],
    },
    {
      prompt: 'A system $A\\mathbf{x}=\\mathbf{b}$ has a unique solution. What can you say about $\\det A$?',
      answer: '$\\det A \\neq 0$.',
      steps: [
        'A unique solution exists iff $A$ is invertible (for a square system).',
        'A square matrix is invertible iff its determinant is nonzero.',
      ],
    },
    {
      prompt: 'Without solving, determine the rank of $\\begin{pmatrix} 1 & 2 & 3\\\\ 2 & 4 & 6\\\\ 0 & 1 & 1\\end{pmatrix}$.',
      answer: '$2$',
      steps: [
        'Row 2 is twice row 1, so they are linearly dependent.',
        'Row 3 is not a scalar multiple of row 1, and it has a nonzero entry where row 1 has none to cancel.',
        'Rows 1 and 3 are linearly independent; row 2 contributes nothing new. Rank $= 2$.',
      ],
    },
    {
      prompt: 'The chemical equation $a\\,\\mathrm{C_3H_8} + b\\,\\mathrm{O_2} \\to c\\,\\mathrm{CO_2} + d\\,\\mathrm{H_2O}$ gives 3 conservation equations (C, H, O) in 4 unknowns. Find the smallest positive integer solution.',
      answer: '$a = 1,\\ b = 5,\\ c = 3,\\ d = 4$.',
      steps: [
        'Carbon: $3a = c$. Hydrogen: $8a = 2d$. Oxygen: $2b = 2c + d$.',
        'Set $a = 1$. Then $c = 3$, $d = 4$.',
        'Oxygen: $2b = 6 + 4 = 10$, so $b = 5$. Smallest integer balance.',
      ],
    },
  ];

  var STATIC_LINSYS_CHALLENGE = [
    {
      prompt: 'Prove that if $A$ has a left inverse $L$ (i.e., $LA = I$) and a right inverse $R$ (i.e., $AR = I$), then $L = R$ and $A$ is invertible.',
      answer: 'See steps.',
      steps: [
        'Consider the product $LAR$.',
        'Associating one way: $(LA)R = IR = R$.',
        'Associating the other: $L(AR) = LI = L$.',
        'So $L = R$, and this common value is a two-sided inverse of $A$.',
      ],
    },
    {
      prompt: 'Suppose $A$ is $n\\times n$ and $A^2 = 0$ (the zero matrix). Show $A$ is not invertible.',
      answer: 'See steps.',
      steps: [
        'If $A$ were invertible, multiply $A^2 = 0$ on the left by $A^{-1}$.',
        'Then $A = A^{-1}\\cdot 0 = 0$.',
        'But the zero matrix is not invertible, a contradiction.',
        'So $A$ cannot have been invertible.',
      ],
    },
    {
      prompt: 'An overdetermined system $A\\mathbf{x} = \\mathbf{b}$ has $A$ of size $m\\times n$ with $m > n$ and full column rank. Derive the least-squares normal equations.',
      answer: '$A^T A \\hat{\\mathbf{x}} = A^T\\mathbf{b}$. Solution: $\\hat{\\mathbf{x}} = (A^T A)^{-1} A^T \\mathbf{b}$.',
      steps: [
        'Minimize $\\|A\\mathbf{x} - \\mathbf{b}\\|^2 = (A\\mathbf{x} - \\mathbf{b})^T(A\\mathbf{x} - \\mathbf{b})$.',
        'Expand: $\\mathbf{x}^T A^T A \\mathbf{x} - 2\\mathbf{b}^T A \\mathbf{x} + \\mathbf{b}^T\\mathbf{b}$.',
        'Gradient with respect to $\\mathbf{x}$: $2 A^T A \\mathbf{x} - 2 A^T \\mathbf{b}$. Set to zero.',
        'Obtain $A^T A \\mathbf{x} = A^T \\mathbf{b}$. Full column rank means $A^T A$ is invertible.',
      ],
    },
    {
      prompt: 'Suppose a linear system $A\\mathbf{x} = \\mathbf{b}$ has solution set $\\{\\mathbf{x}_0 + t\\mathbf{v} : t \\in \\mathbb{R}\\}$ for some particular $\\mathbf{x}_0$ and direction $\\mathbf{v}$. What does this tell you about $A\\mathbf{v}$ and the nullspace of $A$?',
      answer: '$A\\mathbf{v} = \\mathbf{0}$, so $\\mathbf{v}$ lies in $\\ker A$. The nullspace has dimension $\\ge 1$.',
      steps: [
        'The solution set is the particular solution plus the nullspace: $\\{\\mathbf{x}_0 + \\mathbf{n} : \\mathbf{n}\\in\\ker A\\}$.',
        'Every $t\\mathbf{v}$ must be in the nullspace, so $A(t\\mathbf{v}) = 0$, i.e., $A\\mathbf{v} = 0$.',
        'Thus $\\mathbf{v}\\in\\ker A$ and the nullspace is at least 1-dimensional.',
        'By the rank-nullity theorem, $\\mathrm{rank}(A) + \\dim\\ker A = n$, so rank $< n$.',
      ],
    },
  ];

  PS.registerTopic("linalg-linsys", {
    title: "Determinants, inverses, and linear systems",
    description: "Gaussian elimination, determinants, invertibility, and solution geometry.",
    warmup:   [genDet2, genInv2],
    standard: [genDet3, STATIC_LINSYS_STANDARD],
    challenge: STATIC_LINSYS_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: linalg-eigen
  // ==========================================================================

  // Warmup: eigenvalues of a 2x2 with controlled integer eigenvalues
  function genEig2(rng) {
    // Build a matrix with known eigenvalues l1, l2
    var l1 = rng.nonzeroInt(-4, 4), l2 = rng.nonzeroInt(-4, 4);
    while (l2 === l1) l2 = rng.nonzeroInt(-4, 4);
    // Use a random similarity on a diagonal to hide the eigenvalues
    var p = rng.pick([1, 2]);
    var a = l1 + p * 0; // keep simple: use upper triangular
    // Upper triangular with l1, l2 on the diagonal and an off-diagonal entry.
    var b = rng.nonzeroInt(-3, 3);
    return {
      prompt: 'Find the eigenvalues of $A = ' + mat2(l1, b, 0, l2) + '$.',
      answer: '$\\lambda_1 = ' + l1 + ',\\ \\lambda_2 = ' + l2 + '$',
      steps: [
        '$A$ is upper triangular, so its eigenvalues are exactly its diagonal entries.',
        'Alternatively: $\\det(A - \\lambda I) = (' + l1 + '-\\lambda)(' + l2 + '-\\lambda) = 0$.',
        'Roots: $\\lambda = ' + l1 + '$ and $\\lambda = ' + l2 + '$.',
      ],
    };
  }

  // Warmup: trace and determinant relations
  function genTraceDet2(rng) {
    var a = rng.nonzeroInt(-5, 5), b = rng.int(-3, 3);
    var c = rng.int(-3, 3), d = rng.nonzeroInt(-5, 5);
    var tr = a + d, det = a*d - b*c;
    return {
      prompt: 'For $A = ' + mat2(a,b,c,d) + '$, compute $\\mathrm{tr}(A)$ and $\\det(A)$. What does the characteristic polynomial look like?',
      answer: '$\\mathrm{tr}(A) = ' + tr + ',\\ \\det(A) = ' + det + '$. Characteristic polynomial: $\\lambda^2 - ' + tr + '\\lambda + ' + det + '$.',
      steps: [
        'Trace is the sum of the diagonal: $' + a + ' + ' + d + ' = ' + tr + '$.',
        'Determinant: $ad - bc = ' + (a*d) + ' - ' + (b*c) + ' = ' + det + '$.',
        'For any $2\\times 2$ matrix: $\\det(A - \\lambda I) = \\lambda^2 - \\mathrm{tr}(A)\\lambda + \\det(A)$.',
      ],
    };
  }

  var STATIC_EIGEN_STANDARD = [
    {
      prompt: 'Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}4 & 1\\\\ 2 & 3\\end{pmatrix}$.',
      answer: '$\\lambda_1 = 5$ with eigenvector $(1, 1)$; $\\lambda_2 = 2$ with eigenvector $(1, -2)$.',
      steps: [
        'Characteristic polynomial: $\\det(A - \\lambda I) = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10$.',
        'Roots: $\\lambda = 5$ and $\\lambda = 2$.',
        'For $\\lambda = 5$: solve $(A - 5I)\\mathbf{v} = 0$, giving $-v_1 + v_2 = 0$, so $\\mathbf{v} = (1,1)$.',
        'For $\\lambda = 2$: solve $(A - 2I)\\mathbf{v} = 0$, giving $2v_1 + v_2 = 0$, so $\\mathbf{v} = (1, -2)$.',
      ],
    },
    {
      prompt: 'What are the eigenvalues of a rotation matrix $R(\\theta) = \\begin{pmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{pmatrix}$?',
      answer: '$\\lambda = e^{\\pm i\\theta} = \\cos\\theta \\pm i\\sin\\theta$.',
      steps: [
        'Characteristic polynomial: $\\lambda^2 - 2\\cos\\theta\\,\\lambda + 1 = 0$.',
        'Quadratic formula: $\\lambda = \\cos\\theta \\pm \\sqrt{\\cos^2\\theta - 1} = \\cos\\theta \\pm i\\sin\\theta$.',
        'No real eigenvalues unless $\\theta \\in \\{0, \\pi\\}$. Geometric sense: rotation leaves no real direction fixed.',
      ],
    },
    {
      prompt: 'Show that the eigenvalues of a symmetric real matrix are real.',
      answer: 'See steps.',
      steps: [
        'Let $A = A^T$ be real. Suppose $A\\mathbf{v} = \\lambda\\mathbf{v}$ with $\\mathbf{v}\\neq 0$, allowing complex entries.',
        'Take conjugate transpose of both sides: $\\mathbf{v}^*A = \\bar\\lambda \\mathbf{v}^*$ (using $A = A^T = \\bar A$ for a real symmetric matrix).',
        'Right-multiply by $\\mathbf{v}$: $\\mathbf{v}^*A\\mathbf{v} = \\bar\\lambda\\,\\mathbf{v}^*\\mathbf{v}$. But also $\\mathbf{v}^*A\\mathbf{v} = \\lambda\\,\\mathbf{v}^*\\mathbf{v}$.',
        'Since $\\mathbf{v}^*\\mathbf{v} > 0$, divide: $\\lambda = \\bar\\lambda$, so $\\lambda \\in \\mathbb{R}$.',
      ],
    },
    {
      prompt: 'PageRank is the dominant eigenvector of the web link matrix. Why does this eigenvector exist and why is the dominant eigenvalue exactly $1$?',
      answer: 'The link matrix (after a teleport adjustment) is column-stochastic, positive, and the Perron-Frobenius theorem guarantees a unique dominant eigenvalue equal to $1$ with a positive eigenvector.',
      steps: [
        'Entries of each column sum to $1$: this is the Markov/stochastic property.',
        'A column-stochastic matrix has $1$ as an eigenvalue, with the all-ones vector as a left eigenvector.',
        'Perron-Frobenius: for a positive (strictly $> 0$) matrix, the largest eigenvalue is simple and positive, with a strictly positive eigenvector.',
        'Google\'s "damping factor" $d$ tweak forces positivity so Perron-Frobenius applies; the dominant right eigenvector is PageRank.',
      ],
    },
    {
      prompt: 'The matrix $A = \\begin{pmatrix}2 & 1\\\\ 0 & 2\\end{pmatrix}$ has $\\lambda = 2$ with algebraic multiplicity 2. Is it diagonalizable?',
      answer: 'No.',
      steps: [
        'Compute the eigenspace: $(A - 2I)\\mathbf{v} = 0$ gives $\\begin{pmatrix}0 & 1\\\\ 0 & 0\\end{pmatrix}\\mathbf{v} = 0$, so $v_2 = 0$ and $v_1$ free.',
        'The eigenspace is 1-dimensional, spanned by $(1, 0)$.',
        'Geometric multiplicity (1) is less than algebraic multiplicity (2), so $A$ is defective and not diagonalizable.',
      ],
    },
  ];

  var STATIC_EIGEN_CHALLENGE = [
    {
      prompt: 'Prove that similar matrices have the same eigenvalues (with multiplicities).',
      answer: 'See steps.',
      steps: [
        'Let $B = P^{-1}AP$. Then $\\det(B - \\lambda I) = \\det(P^{-1}AP - \\lambda P^{-1}P) = \\det(P^{-1}(A - \\lambda I)P)$.',
        'Determinant is multiplicative: $\\det P^{-1} \\cdot \\det(A - \\lambda I)\\cdot \\det P = \\det(A - \\lambda I)$.',
        'So $A$ and $B$ have the same characteristic polynomial, hence the same eigenvalues with the same multiplicities.',
      ],
    },
    {
      prompt: 'Power iteration: show that applying $A^k$ to a generic starting vector $\\mathbf{v}$ converges (after normalization) to the dominant eigenvector, assuming a unique largest-modulus eigenvalue.',
      answer: 'See steps.',
      steps: [
        'Write $\\mathbf{v} = c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots$ in an eigenbasis with $|\\lambda_1| > |\\lambda_i|$ for $i \\ge 2$.',
        'Then $A^k\\mathbf{v} = c_1\\lambda_1^k\\mathbf{v}_1 + \\sum_{i\\ge 2} c_i\\lambda_i^k\\mathbf{v}_i$.',
        'Factor out $\\lambda_1^k$: $A^k\\mathbf{v} = \\lambda_1^k\\left(c_1\\mathbf{v}_1 + \\sum_{i\\ge 2}c_i(\\lambda_i/\\lambda_1)^k\\mathbf{v}_i\\right)$.',
        'Each ratio has modulus $< 1$, so it goes to $0$ as $k\\to\\infty$. The bracket tends to $c_1\\mathbf{v}_1$, and after normalization you recover $\\mathbf{v}_1$.',
        'Convergence rate: geometric with ratio $|\\lambda_2/\\lambda_1|$. "Spectral gap" determines speed.',
      ],
    },
    {
      prompt: 'Show that $\\mathrm{tr}(A) = \\sum_i \\lambda_i$ and $\\det(A) = \\prod_i \\lambda_i$ for an $n\\times n$ matrix.',
      answer: 'See steps.',
      steps: [
        'Characteristic polynomial: $p(\\lambda) = \\det(\\lambda I - A) = \\prod_i (\\lambda - \\lambda_i)$.',
        'Expand the product: $\\lambda^n - (\\sum_i\\lambda_i)\\lambda^{n-1} + \\cdots + (-1)^n\\prod_i \\lambda_i$.',
        'Compare to the cofactor expansion of $\\det(\\lambda I - A)$: coefficient of $\\lambda^{n-1}$ is $-\\mathrm{tr}(A)$, constant term is $(-1)^n\\det A$.',
        'Match coefficients: $\\sum_i\\lambda_i = \\mathrm{tr}(A)$ and $\\prod_i \\lambda_i = \\det(A)$.',
      ],
    },
    {
      prompt: 'In an undamped mass-spring system $M\\ddot{\\mathbf{x}} + K\\mathbf{x} = 0$ with $M, K$ symmetric positive definite, the normal modes solve $K\\mathbf{v} = \\lambda M\\mathbf{v}$. Explain why all $\\lambda$ are positive.',
      answer: 'Because both $K$ and $M$ are symmetric positive definite, the generalized eigenvalues are all real and positive; each corresponds to a squared natural frequency.',
      steps: [
        'Left-multiply by $\\mathbf{v}^T$: $\\mathbf{v}^T K\\mathbf{v} = \\lambda\\,\\mathbf{v}^T M\\mathbf{v}$.',
        'Both quadratic forms are positive (PD matrices), so $\\lambda = \\mathbf{v}^T K\\mathbf{v} / \\mathbf{v}^T M\\mathbf{v} > 0$.',
        'Physical meaning: $\\lambda = \\omega^2$ where $\\omega$ is a natural frequency. Real positive $\\omega$ gives genuine oscillation, not growth or decay.',
      ],
    },
  ];

  PS.registerTopic("linalg-eigen", {
    title: "Eigenvalues and diagonalization",
    description: "Characteristic polynomials, eigenvectors, diagonalization, and applications.",
    warmup:   [genEig2, genTraceDet2],
    standard: STATIC_EIGEN_STANDARD,
    challenge: STATIC_EIGEN_CHALLENGE,
  });

  // ==========================================================================
  // TOPIC: linalg-svd
  // ==========================================================================

  var STATIC_SVD_WARMUP = [
    {
      prompt: 'The singular values of $A$ are $\\sigma_1 = 4,\\ \\sigma_2 = 2,\\ \\sigma_3 = 1$. What is $\\|A\\|_2$ (the spectral / operator 2-norm)?',
      answer: '$4$',
      steps: [
        'The 2-norm of a matrix equals its largest singular value.',
        '$\\|A\\|_2 = \\sigma_1 = 4$.',
      ],
    },
    {
      prompt: 'What is $\\|A\\|_F$ (Frobenius norm) if the singular values of $A$ are $3, 2, 1$?',
      answer: '$\\sqrt{14}$',
      steps: [
        'Frobenius norm equals the $\\ell_2$ norm of the singular-value vector.',
        '$\\|A\\|_F = \\sqrt{3^2 + 2^2 + 1^2} = \\sqrt{14}$.',
      ],
    },
    {
      prompt: 'A matrix $A$ has SVD $U\\Sigma V^T$ with $\\Sigma$ diagonal entries $10, 5, 0.01$. Is $A$ nearly singular?',
      answer: 'Yes; the smallest singular value is very small, so the condition number $\\sigma_{\\max}/\\sigma_{\\min} = 1000$ is large.',
      steps: [
        'A matrix is singular iff some singular value is exactly zero.',
        'Here none are zero, so $A$ is invertible, but $\\sigma_{\\min} = 0.01$ is tiny.',
        'Condition number $\\kappa_2 = 10 / 0.01 = 1000$. The matrix is ill-conditioned.',
      ],
    },
    {
      prompt: 'If $A$ is symmetric positive definite with eigenvalues $\\lambda_i$, how do its singular values relate to its eigenvalues?',
      answer: 'The singular values equal the eigenvalues.',
      steps: [
        'For a symmetric PD matrix $A$, we can write $A = Q\\Lambda Q^T$ with $Q$ orthogonal and $\\Lambda$ diagonal with positive $\\lambda_i$.',
        'This is already an SVD (take $U = V = Q$, $\\Sigma = \\Lambda$).',
        'So $\\sigma_i = \\lambda_i$.',
      ],
    },
    {
      prompt: 'Given $A\\in\\mathbb{R}^{m\\times n}$ with $m > n$, what are the possible shapes of $U$, $\\Sigma$, $V$ in the "full" SVD?',
      answer: '$U$ is $m\\times m$ orthogonal; $\\Sigma$ is $m\\times n$ with zeros below row $n$; $V$ is $n\\times n$ orthogonal.',
      steps: [
        'Full SVD keeps all columns of $U$ (including null space of $A^T$) and all of $V$.',
        'The diagonal matrix $\\Sigma$ pads with zero rows to become $m\\times n$.',
        'The economical or "thin" SVD instead uses only the first $n$ columns of $U$ and an $n\\times n$ diagonal $\\Sigma$.',
      ],
    },
  ];

  var STATIC_SVD_STANDARD = [
    {
      prompt: 'You have a $1000\\times 500$ data matrix. Its top 20 singular values are $\\{500, 400, \\ldots, 20\\}$ and the remaining 480 are tiny (under $1$). Explain what rank-20 SVD approximation does and why it might be useful.',
      answer: 'Rank-20 SVD approximation replaces $A$ with $A_{20} = U_{20}\\Sigma_{20}V_{20}^T$: a $1000\\times 500$ matrix that uses only 20-dim factors. It captures almost all the information (the tail singular values are noise), and stores the whole thing in $20(1000+500) = 30000$ numbers instead of 500000.',
      steps: [
        'The Eckart-Young theorem: $A_k$ is the best rank-$k$ approximation in both Frobenius and spectral norm.',
        'Truncating to top 20 discards mostly noise since the other 480 singular values are tiny.',
        'Storage shrinks from $mn$ to $k(m+n)$.',
        'This is the backbone of PCA (principal component analysis), latent semantic indexing, LoRA fine-tuning, recommender systems, and image compression.',
      ],
    },
    {
      prompt: 'Relate the columns of $V$ (right singular vectors) to the eigenvectors of $A^T A$.',
      answer: 'The columns of $V$ are an orthonormal basis of eigenvectors of $A^T A$, with eigenvalues $\\sigma_i^2$.',
      steps: [
        'Start from $A = U\\Sigma V^T$, so $A^TA = V\\Sigma^T U^T U\\Sigma V^T = V\\Sigma^T\\Sigma V^T$.',
        '$\\Sigma^T\\Sigma$ is diagonal with entries $\\sigma_i^2$.',
        'Thus $A^T A = V D V^T$ where $D_{ii} = \\sigma_i^2$. This is an eigendecomposition.',
        'Columns of $V$ are orthonormal eigenvectors of $A^TA$, eigenvalues are $\\sigma_i^2$.',
      ],
    },
    {
      prompt: 'Why is PCA often defined on the mean-centered data matrix, and what does the centering fix?',
      answer: 'Centering subtracts the mean so that the sample covariance equals $\\frac{1}{n-1}X^TX$. Without centering, SVD picks up the direction toward the overall mean, which is usually not what you want.',
      steps: [
        'Define $X \\in \\mathbb{R}^{n\\times d}$ with rows as observations.',
        'Sample covariance: $\\frac{1}{n-1}\\sum_i(x_i - \\bar x)(x_i - \\bar x)^T = \\frac{1}{n-1}\\tilde X^T\\tilde X$ where $\\tilde X = X - \\mathbf{1}\\bar x^T$.',
        'PCA takes eigenvectors of the covariance, i.e., the right singular vectors of $\\tilde X$.',
        'If you skip centering, the first singular vector is dominated by the mean direction, masking the structure of interest.',
      ],
    },
    {
      prompt: 'What is the SVD of a diagonal matrix $D = \\mathrm{diag}(3, -5, 0, 2)$?',
      answer: '$U = \\mathrm{diag}(1, -1, 1, 1)$ (sign flip), $\\Sigma = \\mathrm{diag}(5, 3, 2, 0)$ after reordering, $V$ equal to the corresponding permutation.',
      steps: [
        'Singular values are non-negative, so the $-5$ becomes $+5$ (absorbing its sign into $U$).',
        'SVD conventionally orders $\\sigma_i$ decreasing: $\\Sigma = \\mathrm{diag}(5, 3, 2, 0)$.',
        '$U$ and $V$ are permutations (plus the sign flip on the entry corresponding to $-5$) to undo the reordering and sign change.',
        'The zero entry means $A$ is rank 3.',
      ],
    },
    {
      prompt: 'When does $AA^T = A^TA$? What does this property imply about $A$?',
      answer: 'It happens iff $A$ is normal. Normal matrices are unitarily diagonalizable with possibly complex eigenvalues; orthogonal, symmetric, and skew-symmetric matrices are all normal.',
      steps: [
        'A matrix satisfying $AA^T = A^TA$ is called normal.',
        'Equivalent: $A$ can be written $A = U\\Lambda U^T$ (or $U^*$ for complex) with $U$ orthogonal/unitary and $\\Lambda$ diagonal.',
        'For real matrices, normality includes symmetric ($A = A^T$), skew-symmetric ($A = -A^T$), and orthogonal ($A^TA = I$).',
      ],
    },
  ];

  var STATIC_SVD_CHALLENGE = [
    {
      prompt: 'Prove the Eckart-Young theorem for the Frobenius norm: among all matrices of rank at most $k$, the truncated SVD $A_k = \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$ minimizes $\\|A - B\\|_F$.',
      answer: 'See sketch.',
      steps: [
        'By the unitary invariance of the Frobenius norm, $\\|A - B\\|_F = \\|\\Sigma - U^T B V\\|_F$.',
        'Minimizing over rank-$k$ $B$ is equivalent to minimizing $\\|\\Sigma - C\\|_F$ over rank-$k$ $C$.',
        'The Frobenius-norm best rank-$k$ approximation of a diagonal non-negative matrix is obtained by keeping the $k$ largest diagonal entries and zeroing the rest.',
        'Undoing the change of variables gives $B^* = U\\Sigma_k V^T = A_k$.',
        'Minimal error: $\\|A - A_k\\|_F^2 = \\sigma_{k+1}^2 + \\cdots + \\sigma_r^2$.',
      ],
    },
    {
      prompt: 'Low-rank adaptation (LoRA). A large model has a weight matrix $W\\in\\mathbb{R}^{d\\times d}$ with $d = 4096$. LoRA fine-tunes by learning a rank-$r$ update $\\Delta W = BA$ with $A\\in\\mathbb{R}^{r\\times d}, B\\in\\mathbb{R}^{d\\times r}, r = 8$. How many parameters does the LoRA update use versus a full update?',
      answer: 'Full update: $d^2 = 4096^2 \\approx 1.68 \\times 10^7$ parameters. LoRA update: $2dr = 2 \\cdot 4096 \\cdot 8 = 65{,}536$ parameters. About 256x savings.',
      steps: [
        'A full update is a dense $d\\times d$ matrix: $d^2$ parameters.',
        'LoRA factors $\\Delta W = BA$ with $B$ being $d\\times r$ and $A$ being $r\\times d$: total $dr + dr = 2dr$ parameters.',
        'For $d = 4096, r = 8$: $d^2 = 16{,}777{,}216$ vs $2dr = 65{,}536$. Ratio: $d/(2r) = 256$.',
        'This works because fine-tuning updates empirically have low effective rank.',
      ],
    },
    {
      prompt: 'You are compressing an $800 \\times 600$ grayscale image (480000 pixels). Find the largest rank $k$ such that a rank-$k$ approximation uses fewer floats than the original.',
      answer: '$k < 480000 / (800 + 600) \\approx 342.86$, so $k \\le 342$.',
      steps: [
        'Rank-$k$ SVD storage: $U_k$ is $m\\times k$, $V_k$ is $n\\times k$, plus $k$ singular values. Total $k(m + n + 1)$.',
        'For $m = 800, n = 600$: storage is $k(800 + 600 + 1) = 1401k$.',
        'Original size: $800 \\cdot 600 = 480{,}000$ floats.',
        'Solve $1401k < 480000$: $k < 342.6$. So $k \\le 342$ gives compression.',
      ],
    },
    {
      prompt: 'Consider the pseudoinverse $A^+ = V \\Sigma^+ U^T$ where $\\Sigma^+$ is obtained from $\\Sigma$ by reciprocating nonzero entries and transposing. Show that $A^+A\\mathbf{x} = \\mathbf{x}$ whenever $\\mathbf{x}$ is in the row space of $A$.',
      answer: 'See steps.',
      steps: [
        'Row space of $A$ = column space of $A^T$ = span of the right singular vectors corresponding to nonzero singular values.',
        'Any $\\mathbf{x}$ in the row space: $\\mathbf{x} = \\sum_{i:\\sigma_i\\neq 0} c_i \\mathbf{v}_i$.',
        'Then $A\\mathbf{x} = \\sum c_i \\sigma_i \\mathbf{u}_i$, and $A^+A\\mathbf{x} = \\sum c_i (1/\\sigma_i)\\sigma_i \\mathbf{v}_i = \\sum c_i\\mathbf{v}_i = \\mathbf{x}$.',
        'On the nullspace, $A$ kills the input, so $A^+A$ projects orthogonally onto the row space.',
      ],
    },
  ];

  PS.registerTopic("linalg-svd", {
    title: "SVD, rank, and low-rank approximation",
    description: "Singular values, Eckart-Young, PCA, pseudoinverses, and the modern machinery of ML.",
    warmup:   STATIC_SVD_WARMUP,
    standard: STATIC_SVD_STANDARD,
    challenge: STATIC_SVD_CHALLENGE,
  });
})();
