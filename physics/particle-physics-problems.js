/*
 * LearningHub - Particle Physics Problem Set
 * Registers three topics with the LearningHubProblemSet runtime:
 *   phys-pp-sm        - Standard Model tour, quarks, leptons, gauge bosons, Higgs
 *   phys-pp-symmetry  - Gauge symmetries, Noether currents, discrete symmetries
 *   phys-pp-beyond    - BSM, flavor physics, CKM/PMNS, neutrinos, open questions
 *
 * Examples pull from collider physics (LHC, Belle II, LHCb), neutrino experiments
 * (Super-K, DUNE, KamLAND), and precision atomic experiments wherever possible.
 */
(function () {
  "use strict";

  function register() {
    if (!window.LearningHubProblemSet) {
      setTimeout(register, 80);
      return;
    }
    var PS = window.LearningHubProblemSet;

    // ============================================================
    // TOPIC: phys-pp-sm
    // ============================================================
    var PP_SM_WARMUP = [
      {
        prompt: 'How many fundamental fermions does the Standard Model contain, counting quarks and leptons together (one per species, ignoring color and antiparticles)?',
        answer: '12: six quarks ($u, d, c, s, t, b$) and six leptons ($e, \\mu, \\tau, \\nu_e, \\nu_\\mu, \\nu_\\tau$).',
        steps: [
          'Three generations, each with an up-type and a down-type quark: 6 quarks.',
          'Three generations, each with a charged lepton and a neutrino: 6 leptons.',
          'Total: 12 fundamental fermions.',
        ],
      },
      {
        prompt: 'Which generation does the top quark belong to, and what makes it distinct?',
        answer: 'Third generation. At about 173 GeV it is the heaviest known elementary particle and decays before it can hadronize.',
        steps: [
          'Third-generation up-type quark, partner of the bottom quark.',
          'Its Yukawa coupling $y_t \\approx 1$ is the largest in the Standard Model.',
          'Its lifetime $\\sim 5 \\times 10^{-25}$ s is shorter than the QCD hadronization timescale, so no top-flavored mesons exist.',
        ],
      },
      {
        prompt: 'Name the four gauge bosons of the Standard Model (not counting gluon color multiplicities) and the forces they mediate.',
        answer: 'Photon (electromagnetism), $W^\\pm$ and $Z$ (weak force), and the gluon (strong force). The gluon has 8 color combinations.',
        steps: [
          'Photon $\\gamma$ is massless and mediates electromagnetism.',
          '$W^\\pm$ at 80.4 GeV and $Z$ at 91.2 GeV mediate the weak force.',
          'Gluons mediate the strong force; the 8 independent color-anticolor combinations all have zero mass and zero electric charge.',
        ],
      },
      {
        prompt: 'What is the electric charge of an up quark? A down quark? A strange quark?',
        answer: '$+2/3, -1/3, -1/3$ (in units of the proton charge).',
        steps: [
          'Up-type quarks ($u, c, t$) carry $+2/3$.',
          'Down-type quarks ($d, s, b$) carry $-1/3$.',
          'The proton $(uud)$ has charge $2/3 + 2/3 - 1/3 = 1$.',
        ],
      },
      {
        prompt: 'Which Standard Model particle is responsible for giving other particles mass, and when was it discovered?',
        answer: 'The Higgs boson, discovered in July 2012 by the ATLAS and CMS experiments at CERN.',
        steps: [
          'Weak-boson and fermion masses come from couplings to the Higgs vacuum expectation value $v \\approx 246$ GeV.',
          'The quantum of the Higgs field is a scalar boson of mass 125.25 GeV.',
          'Both ATLAS and CMS reported a 5-sigma signal in the $H \\to \\gamma\\gamma$ and $H \\to ZZ^*$ channels on July 4, 2012.',
        ],
      },
      {
        prompt: 'What is a hadron, and what are the two main families of hadrons?',
        answer: 'A hadron is a bound state of quarks held together by the strong force. Baryons contain three quarks; mesons contain a quark-antiquark pair.',
        steps: [
          'Quarks carry color charge and cannot exist as free particles.',
          'Color-singlet combinations are color-neutral and therefore stable against further rearrangement.',
          'Proton and neutron are baryons ($uud$ and $udd$); pions and kaons are mesons.',
        ],
      },
      {
        prompt: 'What is lepton universality, and what does it predict for the decay rates $\\tau \\to e\\nu_e\\nu_\\tau$ and $\\tau \\to \\mu\\nu_\\mu\\nu_\\tau$?',
        answer: 'Lepton universality is the Standard Model prediction that the three charged leptons couple identically to the $W$ and $Z$ bosons. The two decays have nearly equal branching fractions, differing only by phase space corrections from the muon mass.',
        steps: [
          'Gauge couplings of $e, \\mu, \\tau$ to $W, Z$ are equal by construction.',
          'Differences in decay rates come from the kinematic factor $(m_{\\tau}^2 - m_\\ell^2)^2 / m_\\tau^4$.',
          'The measured branching fractions agree with the Standard Model at the 0.1% level for taus.',
        ],
      },
      {
        prompt: 'Which particle in the Standard Model has the smallest measured mass that is known to be nonzero?',
        answer: 'Lightest neutrino. Its mass is below 1 eV, but the mass-squared differences $\\Delta m^2$ measured from oscillation give nonzero masses for at least two of the three.',
        steps: [
          'Tritium beta-decay endpoint experiments (KATRIN) constrain $m_\\beta < 0.8$ eV.',
          'Cosmology from the CMB and large-scale structure constrains $\\sum m_\\nu \\lesssim 0.12$ eV.',
          'Oscillation measurements give $\\Delta m_{21}^2 \\approx 7.5 \\times 10^{-5}\\,\\text{eV}^2$, so at least one neutrino has mass $\\gtrsim 8$ meV.',
        ],
      },
    ];

    var PP_SM_STANDARD = [
      {
        prompt: 'The proton is composed of two up quarks and one down quark. Verify that its electric charge is $+1$ using the quark charges.',
        answer: '$2 \\times (+2/3) + 1 \\times (-1/3) = +1$.',
        steps: [
          'Each up quark contributes $+2/3$.',
          'The down quark contributes $-1/3$.',
          'Sum: $4/3 - 1/3 = 1$.',
        ],
      },
      {
        prompt: 'The neutron is $udd$. Compute its electric charge and explain why it is electrically neutral.',
        answer: '$+2/3 + 2(-1/3) = 0$. The neutron is neutral.',
        steps: [
          'Up-quark contribution: $+2/3$.',
          'Two down quarks: $2 \\times (-1/3) = -2/3$.',
          'Total: zero.',
        ],
      },
      {
        prompt: 'A pion $\\pi^+$ is $u\\bar d$. What is its charge and baryon number?',
        answer: 'Charge $+1$; baryon number $0$.',
        steps: [
          'Charge: $+2/3 - (-1/3) = +1$.',
          'Baryon number: $1/3 + (-1/3) = 0$.',
          'Mesons always have baryon number zero because a quark contributes $+1/3$ and an antiquark $-1/3$.',
        ],
      },
      {
        prompt: 'Why does the top quark not form hadrons in practice, unlike the other five quark flavors?',
        answer: 'Its lifetime is shorter than the hadronization timescale. It decays via $t \\to W b$ in $\\sim 5 \\times 10^{-25}$ s, faster than the $\\sim 10^{-24}$ s needed for confinement to set in.',
        steps: [
          'The top decay width is $\\Gamma_t \\approx 1.4$ GeV, which gives a very short lifetime.',
          'Confinement requires a distance $\\sim 1/\\Lambda_{\\text{QCD}}$ traveled at light speed: $\\sim 10^{-24}$ s.',
          'Top decays first. Nobody has ever seen a "top-hadron."',
        ],
      },
      {
        prompt: 'A muon has mass $m_\\mu = 105.66$ MeV and a lifetime $\\tau_\\mu = 2.197\\,\\mu$s. Its decay rate scales as $G_F^2 m_\\mu^5 / (192 \\pi^3)$. Explain why the tau, with $m_\\tau = 1.777$ GeV, has a dramatically shorter lifetime.',
        answer: 'The decay rate grows as $m^5$, so the tau decay rate is $(m_\\tau / m_\\mu)^5 \\approx (16.8)^5 \\approx 1.3 \\times 10^6$ times larger. Actually the tau has additional hadronic decay channels, further shortening it. Measured $\\tau_\\tau \\approx 2.9 \\times 10^{-13}$ s.',
        steps: [
          'Decay rate is $\\propto m^5$ from the phase-space integral of a three-body weak decay.',
          '$(m_\\tau / m_\\mu)^5 \\approx 1.3 \\times 10^6$, giving a naive lifetime $\\tau_\\mu / 1.3 \\times 10^6 \\approx 1.7$ fs.',
          'Hadronic channels (branching $\\approx 65$%) further shorten it, giving the observed $2.9 \\times 10^{-13}$ s.',
        ],
      },
      {
        prompt: 'How many gluons are there in QCD, and why is that number?',
        answer: 'Eight. QCD has gauge group $SU(3)$, and the dimension of its adjoint representation is $3^2 - 1 = 8$.',
        steps: [
          '$SU(N)$ has $N^2 - 1$ generators, which are the gauge bosons in the adjoint representation.',
          'For $N = 3$: $9 - 1 = 8$ gluons.',
          'The eight gluons form a color octet; combinations like $r\\bar r + g\\bar g + b\\bar b$ are excluded because they correspond to the singlet representation.',
        ],
      },
      {
        prompt: 'Explain what "asymptotic freedom" means physically and name the 2004 Nobel Prize winners who discovered it.',
        answer: 'At high momentum transfer $Q$, the strong coupling $\\alpha_s(Q)$ becomes small, so quarks and gluons behave almost like free particles. David Gross, Frank Wilczek, and David Politzer won the 2004 Nobel Prize for showing this is a feature of $SU(3)$ gauge theory with fewer than 17 flavors.',
        steps: [
          'The QCD beta function at one loop is $\\beta(\\alpha_s) = -\\alpha_s^2 (11 - 2 n_f / 3) / (2\\pi)$.',
          'For $n_f < 33/2$, the sign is negative, so $\\alpha_s$ shrinks at higher scales.',
          'Experimentally $\\alpha_s(M_Z) \\approx 0.118$ while $\\alpha_s(1\\,\\text{GeV}) \\approx 0.4$.',
        ],
      },
      {
        prompt: 'A $Z$ boson at rest decays $80$% of the time into hadrons. Given $m_Z = 91.2$ GeV, what is the maximum energy a single outgoing quark can carry?',
        answer: 'Half the $Z$ mass: $\\approx 45.6$ GeV.',
        steps: [
          'Treat quarks as massless compared to $m_Z$.',
          'In the $Z$ rest frame, the two-body decay gives each particle $E = m_Z / 2$.',
          'Each quark (before hadronization) carries approximately $45.6$ GeV.',
        ],
      },
      {
        prompt: 'Why do pions ($\\pi^\\pm$, $\\pi^0$) have such small masses compared to the proton?',
        answer: 'Pions are pseudo-Nambu-Goldstone bosons of the spontaneously broken chiral symmetry of QCD. They are not massless because the up and down quark masses are small but nonzero, giving pions mass of order $\\sqrt{m_q \\Lambda_{\\text{QCD}}} \\approx 140$ MeV.',
        steps: [
          'QCD with $n_f$ massless flavors has chiral symmetry $SU(n_f)_L \\times SU(n_f)_R$.',
          'The QCD vacuum spontaneously breaks this to the diagonal $SU(n_f)_V$.',
          'Goldstone theorem guarantees $n_f^2 - 1$ massless bosons; for $n_f = 2$, three pions.',
          'Quark masses explicitly break chiral symmetry, giving the pions a small mass.',
        ],
      },
      {
        prompt: 'The $W^+$ boson couples left-handed fermions. What is the role of helicity in the decay $\\pi^- \\to \\mu^- \\bar\\nu_\\mu$ versus $\\pi^- \\to e^- \\bar\\nu_e$?',
        answer: 'The decay is helicity-suppressed: a stationary pion with spin 0 produces a back-to-back charged lepton and antineutrino. The antineutrino must be right-handed and the lepton left-handed, but a nonzero lepton mass requires a "wrong" helicity component. The suppression factor is $(m_\\ell / m_\\pi)^2$, which favors the muon ($\\approx 1.28 \\times 10^{-4}$) over the electron ($\\approx 2.5 \\times 10^{-5}$) by about $5000$.',
        steps: [
          'Pion has spin 0 and rest frame is chosen.',
          'Charged-current weak interaction only couples left-handed fermions and right-handed antifermions.',
          'Massless lepton would be fully left-handed, giving zero amplitude from spin-0 initial state.',
          'Nonzero mass restores the decay; suppression is $(m_\\ell / m_\\pi)^2$, favoring the heavier muon over the electron channel by a factor of $(m_\\mu/m_e)^2 \\times (1 - m_\\mu^2/m_\\pi^2)^2/(1 - m_e^2/m_\\pi^2)^2 \\approx 8000/1.6 \\approx 5000$.',
        ],
      },
      {
        prompt: 'Given the Higgs vacuum expectation value $v = 246$ GeV and the top quark mass $m_t = 173$ GeV, estimate the top Yukawa coupling $y_t$.',
        answer: '$y_t = \\sqrt{2}\\, m_t / v \\approx 0.995$.',
        steps: [
          'Fermion mass from Yukawa term: $m_f = y_f\\, v / \\sqrt{2}$.',
          'Solving: $y_t = \\sqrt{2} \\times 173 / 246 \\approx 0.995$.',
          'Close to unity, which is why the top is "special" — it is the only fermion with an $\\mathcal{O}(1)$ Higgs coupling.',
        ],
      },
      {
        prompt: 'Estimate the number of Higgs bosons produced per second at the LHC during a typical fill with luminosity $\\mathcal{L} = 2 \\times 10^{34}\\,\\text{cm}^{-2}\\,\\text{s}^{-1}$, given an inclusive Higgs production cross-section of $\\sigma_H \\approx 55$ pb at $\\sqrt{s} = 13$ TeV.',
        answer: '$\\sim 1.1$ Higgs bosons per second, or about $10^5$ per day.',
        steps: [
          '$1\\,\\text{pb} = 10^{-36}\\,\\text{cm}^2$, so $\\sigma_H \\approx 5.5 \\times 10^{-35}\\,\\text{cm}^2$.',
          'Rate $= \\mathcal{L} \\sigma = 2 \\times 10^{34} \\times 5.5 \\times 10^{-35} \\approx 1.1$ Hz.',
          'Over a 10-hour fill: $\\sim 4 \\times 10^4$ Higgs bosons. Over a year: $\\mathcal{O}(10^7)$.',
        ],
      },
      {
        prompt: 'What distinguishes a baryon from a meson in terms of quark content and spin-statistics?',
        answer: 'Baryons contain three quarks (or three antiquarks), are fermions, and carry baryon number $\\pm 1$. Mesons contain one quark and one antiquark, are bosons, and carry baryon number 0.',
        steps: [
          'Baryon: $qqq$ combined into a color singlet via $\\epsilon_{abc}$. Spin $1/2$ or $3/2$, so fermionic.',
          'Meson: $q \\bar q$ color singlet. Spin 0 or 1, so bosonic.',
          'These quantum numbers fix what decays are allowed and what the associated selection rules look like.',
        ],
      },
      {
        prompt: 'The proton\'s mass is about 938 MeV. What fraction of it comes from the up and down quark rest masses?',
        answer: 'A tiny fraction. Two up quarks ($\\approx 4.4$ MeV) plus one down ($\\approx 4.7$ MeV) give about 9 MeV, or roughly 1% of the proton mass. The remaining 99% is dynamical — binding energy of gluons and quark-antiquark pairs.',
        steps: [
          'Rest-mass contribution: $2 m_u + m_d \\approx 2 \\times 2.2 + 4.7 \\approx 9$ MeV.',
          'Total proton mass: $938$ MeV.',
          'Ratio: $9/938 \\approx 0.01$, so roughly 1% from "quark masses" in the naive sense.',
          'The rest comes from confined gluon fields and sea-quark contributions, which lattice QCD can now compute directly.',
        ],
      },
      {
        prompt: 'Why is the electric charge of all hadrons an integer multiple of $e$, even though quarks have fractional charges?',
        answer: 'Because hadrons are color singlets, meaning they contain either three quarks (or three antiquarks) with charges that sum to an integer, or a quark-antiquark pair whose charges cancel to an integer.',
        steps: [
          'Three quarks: summed charge is $3 \\times 1/3 = 1$ in units where one quark is $1/3$.',
          'Up-type and down-type differ by $\\pm 1$.',
          'Every allowed combination has integer electric charge in units of $e$, which is why individual quark charges have never been observed in isolation.',
        ],
      },
    ];

    var PP_SM_CHALLENGE = [
      {
        prompt: 'Explain why the ratio $R = \\sigma(e^+ e^- \\to \\text{hadrons}) / \\sigma(e^+ e^- \\to \\mu^+ \\mu^-)$ provides a clean test of the number of quark colors.',
        answer: 'At high energy, the electromagnetic production of a quark-antiquark pair is identical to the muon case except that each quark flavor contributes its squared charge and each flavor comes in $N_c = 3$ color copies. So $R = N_c \\sum_q e_q^2$. At energies above $b$-quark threshold, the sum is $(4/9 + 1/9 + 4/9 + 1/9 + 1/9) = 11/9$, giving $R \\approx 3 \\times 11/9 \\approx 3.67$, matching experiment.',
        steps: [
          'The amplitude for $e^+ e^- \\to q\\bar q$ at leading order is the same as for $e^+ e^- \\to \\mu^+ \\mu^-$ with $q_\\mu \\to e_q$ and summed over colors.',
          'Cross-sections scale as charge squared, so $\\sigma_q = N_c e_q^2 \\sigma_\\mu$.',
          'Above $b\\bar b$ threshold and below $t\\bar t$: 5 active flavors.',
          'The measured $R$ values from PETRA and LEP confirmed $N_c = 3$.',
        ],
      },
      {
        prompt: 'Derive, at the level of a back-of-envelope, why the Fermi constant $G_F \\approx 1.17 \\times 10^{-5}\\,\\text{GeV}^{-2}$ is so small in natural units.',
        answer: '$G_F / \\sqrt 2 = g^2 / (8 M_W^2)$. With $g \\approx 0.65$ (the $SU(2)_L$ coupling, comparable in size to electromagnetic $e$) and $M_W \\approx 80$ GeV, you get $G_F \\approx 1.17 \\times 10^{-5}\\,\\text{GeV}^{-2}$. The "weakness" of the weak force at low energies is entirely an artifact of the heavy $W$ in the propagator; the underlying coupling is comparable to $\\alpha$.',
        steps: [
          'At low momentum transfer $|q^2| \\ll M_W^2$, the $W$ propagator is $\\approx -g_{\\mu\\nu}/M_W^2$.',
          'Four-fermion effective coupling: $G_F / \\sqrt 2 = g^2 / (8 M_W^2)$.',
          '$g \\approx 0.65$ gives $G_F \\approx (0.65)^2 / (8 \\times 80^2 \\times \\sqrt 2) \\approx 1.2 \\times 10^{-5}\\,\\text{GeV}^{-2}$.',
          'Above the $W$ threshold the propagator no longer suppresses anything and weak processes become comparable to electromagnetic ones.',
        ],
        hint: 'Match the four-fermion effective operator to the $W$-exchange diagram in the low-energy limit.',
      },
      {
        prompt: 'Why does $e^+ e^- \\to Z^0 \\to \\nu\\bar\\nu$ with invisible neutrinos give a precise count of light neutrino species at LEP, and what was the measured number?',
        answer: 'The total $Z$ width includes a contribution for each neutrino species with mass below $m_Z / 2$. Measuring $\\Gamma_{\\text{total}}$ from the $Z$ line shape and subtracting the charged-lepton and hadronic widths gives an "invisible" width, which divided by the predicted $\\Gamma(Z \\to \\nu\\bar\\nu) \\approx 166.3$ MeV gives the number. LEP measured $N_\\nu = 2.9963 \\pm 0.0074$, consistent with three.',
        steps: [
          'At LEP, $e^+ e^-$ collisions at $\\sqrt s = m_Z$ scan the $Z$ resonance.',
          'Fit the line shape to get $\\Gamma_{\\text{tot}}$, $\\Gamma_{\\text{ee}}$, $\\Gamma_{\\text{had}}$, etc.',
          '$\\Gamma_{\\text{inv}} = \\Gamma_{\\text{tot}} - \\Gamma_{\\text{visible}}$.',
          '$N_\\nu = \\Gamma_{\\text{inv}} / \\Gamma(Z \\to \\nu\\bar\\nu)_{\\text{theory}} \\approx 3$.',
          'This rules out any further neutrino flavors below $m_Z / 2 \\approx 45$ GeV.',
        ],
      },
    ];

    PS.registerTopic("phys-pp-sm", {
      title: "The Standard Model tour",
      description: "Quarks, leptons, gauge bosons, and the Higgs. Counting, charges, masses, and what makes each piece distinctive.",
      warmup: PP_SM_WARMUP,
      standard: PP_SM_STANDARD,
      challenge: PP_SM_CHALLENGE,
    });

    // ============================================================
    // TOPIC: phys-pp-symmetry
    // ============================================================
    var PP_SYM_WARMUP = [
      {
        prompt: 'State Noether\'s theorem in one sentence.',
        answer: 'Every continuous symmetry of the action implies a conserved current (and therefore a conserved charge).',
        steps: [
          'Start from an action $S = \\int \\mathcal{L}\\, d^4 x$.',
          'If $\\mathcal{L}$ is invariant under a smooth transformation parametrized by $\\epsilon$, you can construct a conserved current $J^\\mu$ with $\\partial_\\mu J^\\mu = 0$.',
          'Integrating $J^0$ over all space gives the conserved charge.',
        ],
      },
      {
        prompt: 'Which continuous symmetry gives conservation of energy?',
        answer: 'Time-translation invariance of the Lagrangian.',
        steps: [
          'If $\\mathcal{L}$ has no explicit dependence on $t$, time translation is a symmetry.',
          'Noether applied to time translation gives energy conservation.',
          'Spatial translation symmetries give momentum conservation; rotational symmetry gives angular momentum.',
        ],
      },
      {
        prompt: 'What is the gauge group of the full Standard Model?',
        answer: '$SU(3)_c \\times SU(2)_L \\times U(1)_Y$.',
        steps: [
          '$SU(3)_c$ is the color gauge group of QCD — acts on quarks.',
          '$SU(2)_L$ acts on left-handed weak doublets.',
          '$U(1)_Y$ is hypercharge.',
          'After electroweak symmetry breaking, $SU(2)_L \\times U(1)_Y \\to U(1)_{\\text{EM}}$.',
        ],
      },
      {
        prompt: 'Is parity ($P$) a symmetry of the Standard Model?',
        answer: 'No. Parity is maximally violated by the weak interaction: the $W$ couples only to left-handed fermions (and right-handed antifermions).',
        steps: [
          'Strong and electromagnetic interactions are $P$-symmetric.',
          'The weak interaction is chiral: only left-handed components couple to $W^\\pm$.',
          'This was first seen in Chien-Shiung Wu\'s 1957 cobalt-60 beta decay experiment.',
        ],
      },
      {
        prompt: 'What discrete symmetry is believed to be exactly conserved in any local Lorentz-invariant quantum field theory?',
        answer: '$CPT$: the combination of charge conjugation, parity, and time reversal.',
        steps: [
          'Any local, unitary, Lorentz-invariant QFT obeys $CPT$ (Lüders-Pauli theorem).',
          '$CPT$ symmetry implies particle and antiparticle have equal mass and equal lifetime.',
          'Tests on neutral kaons confirm $CPT$ to parts in $10^{18}$.',
        ],
      },
      {
        prompt: 'What is color confinement, physically?',
        answer: 'Quarks and gluons cannot exist as isolated free particles; only color-neutral bound states (mesons, baryons, glueballs) are observed.',
        steps: [
          'QCD\'s non-Abelian gauge self-interaction makes the force between color charges grow with distance.',
          'Trying to isolate a color charge creates enough potential energy to pop a new $q\\bar q$ pair out of the vacuum.',
          'The result is hadronization into color singlets.',
        ],
      },
      {
        prompt: 'Electric charge conservation follows from which symmetry?',
        answer: '$U(1)_{\\text{EM}}$ gauge symmetry — the unbroken subgroup of $SU(2)_L \\times U(1)_Y$ after electroweak symmetry breaking.',
        steps: [
          'Before EWSB: $SU(2)_L \\times U(1)_Y$ with weak isospin and hypercharge.',
          'Higgs picks a vacuum; unbroken generator is $Q = T_3 + Y/2$.',
          'This residual $U(1)_{\\text{EM}}$ is the electromagnetic gauge symmetry whose conserved charge is electric charge.',
        ],
      },
      {
        prompt: 'Why is baryon number not an exact symmetry of the Standard Model, even though no baryon-number-violating processes have been observed perturbatively?',
        answer: 'Non-perturbative electroweak "sphaleron" processes at high temperature violate $B + L$ (while preserving $B - L$). At the temperatures of the early universe this was relevant for baryogenesis.',
        steps: [
          'Perturbatively, the Standard Model conserves $B$ and $L$ separately.',
          'The $SU(2)_L$ vacuum has nontrivial topology, and instanton/sphaleron transitions change $B + L$ by integer units.',
          'At $T \\gg 100$ GeV these transitions are unsuppressed, which is important for baryogenesis scenarios.',
        ],
      },
    ];

    var PP_SYM_STANDARD = [
      {
        prompt: 'Write down the Noether current for a complex scalar field under $\\phi \\to e^{i\\alpha}\\phi$.',
        answer: '$J^\\mu = i(\\phi^* \\partial^\\mu \\phi - \\phi \\partial^\\mu \\phi^*)$.',
        steps: [
          'Lagrangian $\\mathcal{L} = \\partial_\\mu \\phi^* \\partial^\\mu \\phi - m^2 |\\phi|^2$.',
          'Infinitesimal transformation: $\\delta\\phi = i\\alpha \\phi$, $\\delta\\phi^* = -i\\alpha \\phi^*$.',
          '$J^\\mu = \\partial \\mathcal{L}/\\partial(\\partial_\\mu \\phi) \\cdot \\delta\\phi / \\alpha + \\text{c.c.} = i(\\phi^* \\partial^\\mu \\phi - \\phi \\partial^\\mu \\phi^*)$.',
        ],
      },
      {
        prompt: 'Explain why a massless photon follows from $U(1)_{\\text{EM}}$ gauge invariance.',
        answer: 'A photon mass term $\\frac{1}{2} m_\\gamma^2 A_\\mu A^\\mu$ is not gauge invariant under $A_\\mu \\to A_\\mu - \\partial_\\mu \\alpha$. Gauge symmetry forbids it, so the photon remains massless to all orders.',
        steps: [
          'Gauge transformation: $A_\\mu \\to A_\\mu - \\partial_\\mu \\alpha(x)$.',
          'Mass term transforms as $A_\\mu A^\\mu \\to A_\\mu A^\\mu - 2 A^\\mu \\partial_\\mu \\alpha + (\\partial\\alpha)^2$, which is not invariant.',
          'Unbroken gauge invariance therefore protects $m_\\gamma = 0$.',
          'Experimentally $m_\\gamma < 10^{-18}$ eV.',
        ],
      },
      {
        prompt: 'Why is the weak force called "chiral"?',
        answer: 'Because it couples only to left-handed (chirality eigenstate) fermions and right-handed antifermions. Under parity, left- and right-handed components swap, so the interaction is not parity invariant.',
        steps: [
          'A Dirac spinor has left- and right-handed components $\\psi_L, \\psi_R$.',
          'The $SU(2)_L$ weak coupling only touches $\\psi_L$.',
          '$\\psi_R$ has no weak charge (it is a singlet under $SU(2)_L$).',
          'This is as chiral as it gets and is what maximal parity violation means.',
        ],
      },
      {
        prompt: 'The CKM matrix $V_{\\text{CKM}}$ parameterizes quark mixing. How many independent real parameters does a general $3 \\times 3$ unitary matrix have, and how many of those are physically meaningful in the Standard Model?',
        answer: 'A $3 \\times 3$ unitary matrix has 9 independent real parameters. Five phases can be absorbed into quark field redefinitions, leaving 4 physical parameters: three mixing angles and one $CP$-violating phase.',
        steps: [
          'General unitary $N \\times N$ matrix: $N^2$ real parameters.',
          'Mixing angles: $N(N-1)/2 = 3$ for $N = 3$.',
          'Phases: $N(N+1)/2 = 6$, minus $(2N - 1) = 5$ that can be absorbed into fields.',
          'Physical phases: $6 - 5 = 1$. That single phase is the $CP$-violating one.',
        ],
      },
      {
        prompt: 'Show that in the Standard Model, lepton flavor (electron, muon, tau number separately) is conserved at tree level, but not in the presence of neutrino masses.',
        answer: 'Without neutrino masses, each lepton generation has its own accidental global symmetry, and flavors are conserved. With nonzero neutrino masses and mixing via the PMNS matrix, lepton flavor is no longer a good quantum number — only total lepton number remains.',
        steps: [
          'Tree-level weak interactions couple $(\\ell, \\nu_\\ell)$ as a doublet, so $N_e, N_\\mu, N_\\tau$ are separately conserved.',
          'Neutrino mass terms mix flavors: propagation eigenstates are not weak eigenstates.',
          'Charged-lepton-flavor-violating processes like $\\mu \\to e\\gamma$ are allowed but with tiny rates ($\\sim 10^{-54}$ in the minimal scheme).',
          'Experimental limits on such processes (MEG, Mu2e) look for BSM enhancements.',
        ],
      },
      {
        prompt: 'Compute the electric charge of a left-handed electron neutrino using $Q = T_3 + Y/2$, given $T_3 = +1/2$ and $Y = -1$ for the left-handed lepton doublet.',
        answer: '$Q = 1/2 + (-1)/2 = 0$.',
        steps: [
          '$T_3 = +1/2$ (upper component of the $SU(2)_L$ doublet).',
          '$Y/2 = -1/2$.',
          'Sum: $0$. The neutrino is electrically neutral.',
        ],
      },
      {
        prompt: 'In the Standard Model, is the sum $B - L$ conserved non-perturbatively?',
        answer: 'Yes. Sphaleron processes change $B$ and $L$ by the same amount ($\\Delta B = \\Delta L$), so $B - L$ is conserved exactly in the Standard Model.',
        steps: [
          'The anomaly equation $\\partial_\\mu J^\\mu_B = \\partial_\\mu J^\\mu_L$ gives equal divergences.',
          'Therefore $J^\\mu_{B-L}$ is conserved exactly.',
          '$B + L$ is only approximately conserved at low temperatures; non-perturbative sphalerons violate it at high $T$.',
        ],
      },
      {
        prompt: 'Why does the existence of three generations make $CP$ violation possible in the quark sector, but not two?',
        answer: 'In two generations, the mixing matrix has 1 angle and no physical phase (a $2\\times 2$ unitary matrix has 4 real parameters, minus 3 phase redefinitions = 1 parameter). With three generations there is 1 physical phase, which produces $CP$ violation.',
        steps: [
          'Count: $N \\times N$ unitary matrix has $N^2$ parameters, $N(N-1)/2$ angles, $N(N+1)/2$ phases.',
          'Absorbing $2N - 1$ phases into quark fields leaves $N(N+1)/2 - (2N - 1) = (N-1)(N-2)/2$ physical phases.',
          'For $N = 2$: 0 phases. For $N = 3$: 1 phase. Kobayashi and Maskawa predicted the third generation in 1973 precisely because observed $CP$ violation requires it.',
        ],
      },
      {
        prompt: 'A collider produces a $B^0 - \\bar B^0$ pair. Explain the role of $CP$ violation in the measured asymmetry.',
        answer: 'Neutral $B$ mesons oscillate between particle and antiparticle via the weak interaction. $CP$ violation appears as different time-dependent decay rates for $B^0$ vs $\\bar B^0$ into $CP$ eigenstates like $J/\\psi K_S$. BaBar and Belle measured $\\sin(2\\beta) \\approx 0.7$ via this asymmetry.',
        steps: [
          'Produce correlated $B^0 \\bar B^0$ pairs at the $\\Upsilon(4S)$ resonance.',
          'Tag one side as $B^0$ or $\\bar B^0$; wait, watch the other side oscillate.',
          'Compare decay rates to $CP$-eigenstate final states at different times.',
          'A nonzero asymmetry is direct evidence of $CP$ violation, and its magnitude fixes the weak phase $\\beta$.',
        ],
      },
      {
        prompt: 'Which two Japanese physicists predicted a third generation of quarks to explain $CP$ violation, and what year was it?',
        answer: 'Makoto Kobayashi and Toshihide Maskawa, in 1973. They shared the 2008 Nobel Prize for this work.',
        steps: [
          'They extended the Cabibbo mixing matrix from two generations to three.',
          'The key observation: $N = 3$ is the minimum number of generations for which the mixing matrix can have a physical $CP$-violating phase.',
          'At the time only the up, down, strange, and charm quarks were known (charm itself still tentative). The prediction was audacious.',
        ],
      },
      {
        prompt: 'What is a Noether current for the continuous $U(1)$ phase symmetry of QED, and what conserved charge does it give?',
        answer: 'The electromagnetic current $J^\\mu = \\bar\\psi \\gamma^\\mu \\psi$, whose integral gives the total electric charge (in units of $e$).',
        steps: [
          'Transformation: $\\psi \\to e^{-i e \\alpha(x)}\\psi$.',
          'Current: $J^\\mu_{\\text{EM}} = e \\bar\\psi \\gamma^\\mu \\psi$.',
          'Conservation: $\\partial_\\mu J^\\mu = 0$ on shell.',
          'Integrated: $Q = \\int J^0 d^3 x$ is the total charge.',
        ],
      },
      {
        prompt: 'Why does a nonzero Higgs VEV leave the electromagnetic $U(1)$ unbroken?',
        answer: 'The Higgs doublet is chosen so that its VEV is electrically neutral (zero in the upper component). The linear combination of $T_3$ and $Y$ that annihilates this direction — namely $Q = T_3 + Y/2$ — remains unbroken, giving the surviving $U(1)_{\\text{EM}}$.',
        steps: [
          'Higgs doublet: $H = (H^+, H^0)^T$, vacuum at $(0, v/\\sqrt 2)$.',
          'Generators that act nontrivially on the vacuum are broken; those that annihilate the vacuum remain.',
          '$Q|0\\rangle = 0$ because the lower component is electrically neutral.',
          'The three broken generators give rise to the longitudinal modes of $W^\\pm$ and $Z$.',
        ],
      },
      {
        prompt: 'Discuss the role of the strong CP problem in particle physics.',
        answer: 'QCD has a gauge-invariant topological term $\\theta_{\\text{QCD}}\\, G\\tilde G$ that would violate $CP$. Experiments (neutron EDM) bound $\\theta_{\\text{QCD}} \\lesssim 10^{-10}$, which is unnaturally small. Why it is so small is the "strong CP problem"; the most popular solution invokes a new pseudo-Goldstone called the axion.',
        steps: [
          '$G \\tilde G$ is a total derivative, but has an integer winding number that is nontrivial.',
          'Adding $\\theta G \\tilde G$ to the Lagrangian is allowed and would give a neutron electric dipole moment $\\sim 10^{-16}\\,\\theta\\,e\\,\\text{cm}$.',
          'Measurement: $d_n < 1.8 \\times 10^{-26}\\,e\\,\\text{cm}$, so $\\theta \\lesssim 10^{-10}$.',
          'The Peccei-Quinn axion mechanism dynamically drives $\\theta \\to 0$, predicting a new light particle (the axion).',
        ],
      },
      {
        prompt: 'What is the physical content of the Goldstone theorem?',
        answer: 'Spontaneous breaking of a continuous global symmetry produces one massless scalar (a Goldstone boson) for every broken generator.',
        steps: [
          'Before breaking: Lagrangian invariant under a continuous group $G$.',
          'Ground state invariant only under a subgroup $H \\subset G$.',
          'Each broken generator corresponds to a direction in field space in which the potential is flat.',
          'Small oscillations along these flat directions are massless — the Goldstones.',
        ],
      },
      {
        prompt: 'How does the Higgs mechanism differ from the Goldstone theorem?',
        answer: 'When the broken symmetry is a local (gauge) symmetry, the would-be Goldstone bosons are "eaten" by the gauge bosons, which thereby acquire longitudinal polarizations and become massive. No physical massless scalars remain.',
        steps: [
          'Gauging a global symmetry introduces gauge bosons with their own degrees of freedom.',
          'In unitary gauge, the Goldstones disappear and the gauge bosons pick up a third polarization.',
          'Counting: massless gauge boson has 2 polarizations; massive has 3. The extra polarization comes from the Goldstone.',
          'In the Standard Model, three of the four electroweak gauge bosons eat three Higgs doublet components and become $W^\\pm, Z$.',
        ],
      },
    ];

    var PP_SYM_CHALLENGE = [
      {
        prompt: 'Explain why Noether\'s theorem gives a conserved current for every global continuous symmetry but only a current identity for every local continuous (gauge) symmetry.',
        answer: 'For global symmetries, Noether\'s first theorem gives a nontrivially conserved current. For local symmetries, Noether\'s second theorem gives an identity between the equations of motion (a constraint) rather than a genuinely physical conserved quantity — the "current" is really a reformulation of the gauge dynamics. Physical conservation laws under gauge symmetry correspond to global subgroups.',
        steps: [
          'Noether\'s first theorem: one parameter, one current, one charge.',
          'Noether\'s second theorem: a function of spacetime parameter gives an identity $\\partial_\\mu (\\text{eom-dependent current}) = 0$, not independent of the equations of motion.',
          'The "global" part of a gauge symmetry gives the physical conserved quantity: e.g., total electric charge.',
          'Gauge invariance is more a redundancy of description than a symmetry in the usual sense.',
        ],
        hint: 'Compare local $U(1)$ gauge invariance (electrodynamics) with the global phase symmetry of a free complex scalar.',
      },
      {
        prompt: 'Sketch the argument for why the electroweak theory needs a Higgs (or something like it) to be unitary at high energies.',
        answer: 'Without the Higgs, the scattering amplitude $WW \\to WW$ grows with energy as $E^2$, violating unitarity above $\\sim 1$ TeV. The Higgs boson exchange gives a cancellation that tames the amplitude. If the Higgs did not exist, something else (a technicolor resonance, a heavy scalar, or strong dynamics) would have to show up below 1 TeV — the LHC search program was designed with this in mind.',
        steps: [
          'Longitudinal $W$ polarizations contribute the dangerous $E^2$ growth.',
          'In a theory with just $W, Z$, the two-to-two scattering amplitude violates unitarity bounds near a TeV.',
          '$s$-channel Higgs exchange exactly cancels the bad $E^2$ behavior.',
          'A 125 GeV Higgs preserves unitarity up to any energy you like, given its measured couplings.',
        ],
      },
      {
        prompt: 'Suppose you measured a $CP$-violating asymmetry in $K^0 - \\bar K^0$ mixing that could not be explained by the Standard Model. Describe one qualitatively different BSM origin for such an effect.',
        answer: 'New heavy particles running in a box diagram — for example, supersymmetric squarks and gluinos, or a heavy $Z\'$ — could contribute new loop amplitudes with new $CP$ phases beyond the CKM one. The observable is a deviation of $\\epsilon_K$ or $\\epsilon\'/\\epsilon_K$ from the tightly constrained SM prediction. Precision flavor physics at LHCb, Belle II, and NA62 targets exactly these windows.',
        steps: [
          'In the SM, $K - \\bar K$ mixing is dominated by top-mediated box diagrams.',
          'BSM particles in the loop contribute additional amplitudes with new phases.',
          'Any deviation of $\\epsilon_K \\approx 2.23 \\times 10^{-3}$ from the SM would be a signal.',
          'Flavor physics already excludes large classes of BSM models because these predictions are so precise.',
        ],
      },
    ];

    PS.registerTopic("phys-pp-symmetry", {
      title: "Symmetries and conservation laws",
      description: "Gauge symmetries, Noether currents, discrete symmetries, and how they constrain what particle physicists can compute.",
      warmup: PP_SYM_WARMUP,
      standard: PP_SYM_STANDARD,
      challenge: PP_SYM_CHALLENGE,
    });

    // ============================================================
    // TOPIC: phys-pp-beyond
    // ============================================================
    var PP_BSM_WARMUP = [
      {
        prompt: 'Name three major empirical shortcomings of the Standard Model that motivate BSM physics.',
        answer: 'Dark matter, neutrino masses, and the matter-antimatter asymmetry of the universe.',
        steps: [
          'Dark matter: no SM particle fits. Required by rotation curves, lensing, CMB.',
          'Neutrino masses: the original SM had massless neutrinos; oscillation forces them to be massive.',
          'Baryogenesis: the measured $CP$ violation in the CKM is too small by orders of magnitude to produce the observed baryon asymmetry.',
        ],
      },
      {
        prompt: 'What does "BSM" stand for?',
        answer: '"Beyond the Standard Model." A blanket term for any proposed physics that extends or modifies the Standard Model.',
        steps: [
          'Supersymmetry, grand unified theories, extra dimensions, composite Higgs, dark sectors — all are BSM.',
          'Searches are parametrized by "what you would look for at the LHC / IceCube / LUX-ZEPLIN / etc."',
        ],
      },
      {
        prompt: 'What is supersymmetry (SUSY) in one sentence?',
        answer: 'A symmetry relating bosons and fermions, so that every Standard Model particle has a "superpartner" differing by spin $1/2$.',
        steps: [
          'Quarks and leptons (spin $1/2$) pair with squarks and sleptons (spin $0$).',
          'Gauge bosons (spin $1$) pair with gauginos (spin $1/2$).',
          'The Higgs pairs with the Higgsino. SUSY doubles the particle content.',
        ],
      },
      {
        prompt: 'What is the "WIMP miracle"?',
        answer: 'A heavy ($\\sim 100$ GeV) weakly-coupled stable particle freezes out of thermal equilibrium in the early universe with a relic abundance remarkably close to the observed dark matter density, without any fine tuning. It was the main theoretical motivation for WIMP dark-matter searches.',
        steps: [
          'Freeze-out relic density is $\\Omega_\\chi h^2 \\sim 3 \\times 10^{-27}\\,\\text{cm}^3\\,\\text{s}^{-1} / \\langle \\sigma v\\rangle$.',
          'For $\\langle \\sigma v \\rangle \\sim $ weak-interaction strength you get $\\Omega \\sim 0.1$ — matching observation.',
          'That coincidence was the intellectual engine for WIMPs for two decades.',
          'Direct detection has been pushing the WIMP parameter space steadily smaller since 2010.',
        ],
      },
      {
        prompt: 'What is the axion?',
        answer: 'A hypothetical light pseudoscalar boson, originally proposed to solve the strong $CP$ problem. It is a natural dark-matter candidate and is searched for in haloscopes (ADMX, MADMAX) and helioscopes (CAST).',
        steps: [
          'Peccei and Quinn (1977) proposed a new global $U(1)$ symmetry whose spontaneous breaking introduces a pseudo-Goldstone.',
          'That Goldstone — the axion — dynamically cancels the $\\theta_{\\text{QCD}}$ angle, solving strong $CP$.',
          'Cosmologically, axions can be produced non-thermally in the early universe and accumulate as cold dark matter.',
          'Their mass is only weakly constrained by observation: astrophysics and cosmology allow $\\mu$eV to meV.',
        ],
      },
      {
        prompt: 'What is a sterile neutrino?',
        answer: 'A hypothetical neutrino that does not couple to any Standard Model gauge boson — it only interacts through mixing with the active neutrinos and possibly gravity. It could explain neutrino masses (via the seesaw mechanism) or be dark matter.',
        steps: [
          'Standard Model neutrinos are $SU(2)_L$ doublet members with no right-handed partner.',
          'A sterile (right-handed) neutrino is singlet under the SM gauge group.',
          'Mixing via a Majorana mass term can explain the smallness of observed neutrino masses (seesaw).',
          'Sterile neutrinos with keV mass are candidate warm dark matter.',
        ],
      },
      {
        prompt: 'What is the hierarchy problem?',
        answer: 'Naturalness: why is the Higgs mass 125 GeV and not at the Planck scale, given that quantum corrections should drag it upward by orders of magnitude?',
        steps: [
          'Scalar masses receive quadratically divergent radiative corrections from all particles that couple to them.',
          'Absent a cancellation, the natural Higgs mass is of order the highest scale in the theory, i.e. $M_{\\text{Pl}} \\sim 10^{19}$ GeV.',
          'Observed value is 125 GeV, so something must cancel the corrections.',
          'Candidate solutions: SUSY, composite Higgs, extra dimensions, or just "nature chose a fine-tuned value."',
        ],
      },
      {
        prompt: 'What is the "see-saw mechanism" for neutrino masses?',
        answer: 'Add a heavy right-handed Majorana neutrino. The light observed neutrino gets mass $m_\\nu \\sim m_D^2 / M_R$, where $m_D$ is a Dirac mass (from the Higgs) and $M_R$ is a heavy Majorana mass. A large $M_R$ naturally explains the smallness of $m_\\nu$.',
        steps: [
          'Add a right-handed neutrino $N_R$ that is a SM gauge singlet.',
          'Two types of mass terms: Dirac $m_D \\bar\\nu_L N_R$ (from Higgs coupling) and Majorana $\\tfrac12 M_R N_R^T C N_R$ (from $N_R$ itself).',
          'Diagonalize the $2 \\times 2$ mass matrix. For $M_R \\gg m_D$: $m_{\\text{light}} \\approx m_D^2 / M_R$, $m_{\\text{heavy}} \\approx M_R$.',
          'With $m_D \\sim $ electroweak, $M_R \\sim 10^{15}$ GeV gives $m_{\\text{light}} \\sim 0.05$ eV.',
        ],
      },
    ];

    var PP_BSM_STANDARD = [
      {
        prompt: 'A minimum-seesaw neutrino gets mass $m_\\nu = m_D^2 / M_R$ with $m_D = 100$ GeV (Dirac from Higgs). What $M_R$ gives $m_\\nu \\approx 0.05$ eV?',
        answer: '$M_R \\approx (100\\,\\text{GeV})^2 / 0.05\\,\\text{eV} \\approx 2 \\times 10^{14}$ GeV.',
        steps: [
          '$m_D^2 = (100\\,\\text{GeV})^2 = 10^4\\,\\text{GeV}^2 = 10^{13}\\,\\text{eV}^2$.',
          '$M_R = m_D^2 / m_\\nu = 10^{13}\\,\\text{eV}^2 / 0.05\\,\\text{eV} = 2 \\times 10^{14}$ eV... wait that gives 2e14 eV, let me redo.',
          'Consistent units: $m_D = 10^{11}$ eV, $m_\\nu = 5 \\times 10^{-2}$ eV. $M_R = (10^{11})^2 / (5 \\times 10^{-2}) = 2 \\times 10^{23}$ eV $= 2 \\times 10^{14}$ GeV.',
          'That is right near the GUT scale, which is why seesaw is so appealing.',
        ],
      },
      {
        prompt: 'Two-flavor neutrino oscillation has probability $P(\\nu_\\alpha \\to \\nu_\\beta) = \\sin^2 2\\theta \\sin^2(\\Delta m^2 L / 4 E)$. For $\\Delta m^2 = 2.5 \\times 10^{-3}\\,\\text{eV}^2$, $L = 1300$ km, $E = 2$ GeV (DUNE baseline), compute the phase argument in convenient units.',
        answer: '$\\Delta m^2 L / (4E) \\approx 1.27 \\cdot 2.5 \\times 10^{-3} \\cdot 1300 / 2 \\approx 2.06$ radians, close to $\\pi/2$. This is near the first oscillation maximum.',
        steps: [
          'Use convenient-unit formula: $\\Delta m^2 [\\text{eV}^2] \\cdot L [\\text{km}] / (4 E [\\text{GeV}]) \\times 1.27$.',
          'Substitute: $1.27 \\times 2.5 \\times 10^{-3} \\times 1300 / 2 = 1.27 \\times 1.625 \\approx 2.06$.',
          '$\\sin^2(2.06) \\approx 0.78$, so the oscillation probability is high — DUNE is designed to hit the first maximum.',
        ],
      },
      {
        prompt: 'Why do dark-matter direct-detection experiments use xenon and not lighter nuclei?',
        answer: 'Spin-independent WIMP-nucleus cross-sections scale as $A^2$ (coherent enhancement), where $A$ is the atomic mass number. Xenon with $A \\approx 131$ gives $A^2 \\approx 17{,}000$, many times the sensitivity of a lighter nucleus. Xenon is also a good scintillator and ionization medium.',
        steps: [
          'Coherent scattering enhances the cross-section because the WIMP wavelength is larger than the nucleus.',
          '$\\sigma_{\\text{SI}} \\propto A^2 \\mu^2$, where $\\mu$ is the WIMP-nucleus reduced mass.',
          'Xenon has the best combination of $A$ and detectability.',
          'Lighter targets (Ge, Si, He) are used to push to low WIMP masses instead, where the kinematics favors smaller $A$.',
        ],
      },
      {
        prompt: 'Compute the sensitivity boost (in cross-section per unit exposure) for xenon ($A = 131$) versus argon ($A = 40$) for a spin-independent WIMP.',
        answer: '$(131/40)^2 \\approx 10.7$, so xenon has about an order of magnitude better cross-section reach per unit target mass.',
        steps: [
          '$A^2$ ratio: $131^2 / 40^2 = 17161 / 1600 \\approx 10.7$.',
          'This is why the largest direct-detection programs (LZ, XENONnT, PandaX) all use xenon.',
          'Argon has other advantages (depleted $^{39}$Ar content, nuclear recoil rejection) but xenon wins on raw cross-section reach.',
        ],
      },
      {
        prompt: 'A proton is assumed to decay via GUT-scale physics with rate $\\Gamma \\sim m_p^5 / M_{\\text{GUT}}^4$. For $M_{\\text{GUT}} = 10^{16}$ GeV, estimate the proton lifetime.',
        answer: '$\\tau \\sim M_{\\text{GUT}}^4 / m_p^5 \\approx (10^{16})^4 / (0.938)^5 \\approx 10^{64}\\,\\text{GeV}^{-1}$, which after converting to seconds gives $\\tau \\sim 10^{34}$ years. Super-Kamiokande has set limits near this range.',
        steps: [
          'Rate has dimensions of mass, and dimensional analysis gives $\\Gamma \\sim m_p^5 / M_{\\text{GUT}}^4$.',
          'Convert: $\\Gamma \\approx (1\\,\\text{GeV})^5 / (10^{16}\\,\\text{GeV})^4 = 10^{-64}$ GeV.',
          '$\\tau = \\hbar/\\Gamma \\approx 6.6 \\times 10^{-25}\\,\\text{s} / 10^{-64} \\approx 10^{40}$ s.',
          'Convert to years: $3 \\times 10^{7}$ s/year, giving $\\tau \\approx 3 \\times 10^{32}$ years. Super-K has a current lower bound $\\tau(p \\to e^+ \\pi^0) > 2.4 \\times 10^{34}$ years.',
        ],
      },
      {
        prompt: 'Explain how neutrinoless double-beta decay, if observed, would establish that neutrinos are Majorana.',
        answer: 'Double-beta decay with no outgoing neutrinos requires a $\\Delta L = 2$ process, which only works if the neutrino is its own antiparticle. Measuring the rate — or setting upper limits — constrains the effective Majorana neutrino mass.',
        steps: [
          'Two-neutrino double-beta decay ($2\\nu\\beta\\beta$) is observed and well understood.',
          '$0\\nu\\beta\\beta$ requires a virtual Majorana neutrino propagator linking the two vertices.',
          'Rate is proportional to $|m_{\\beta\\beta}|^2 = |\\sum U_{ei}^2 m_i|^2$.',
          'Experiments like KamLAND-Zen and LEGEND are reaching sensitivity $m_{\\beta\\beta} \\lesssim 30$ meV, approaching the inverted-hierarchy range.',
        ],
      },
      {
        prompt: 'What is the anomalous magnetic moment of the muon, and why is the recent experimental result at Fermilab a potential window to new physics?',
        answer: 'The muon\'s magnetic moment is $(g-2)/2$, which QED predicts very precisely from loop corrections. The Fermilab Muon g-2 experiment (final result 2025) measured it $\\sim 5\\sigma$ above the SM prediction — hinting at new virtual particles contributing to the loops. The hadronic vacuum polarization contribution is still debated, so the ultimate significance is not yet settled.',
        steps: [
          'QED loops give $a_\\mu = (g-2)/2 \\approx 0.001165921$.',
          'Contributions from strong and weak interactions fine-tune this to many decimal places.',
          'Experimental value from Fermilab (2025 final): $a_\\mu^{\\text{exp}} = 0.00116592059(22)$.',
          'SM prediction: complicated by competing calculations of the leading hadronic VP, which vary at the level of the experimental uncertainty.',
          'The persistent tension motivates many BSM models with new particles at the hundreds-of-GeV scale.',
        ],
      },
      {
        prompt: 'Why are LHCb\'s measurements of "lepton flavor universality" tests — like $R(K) = \\text{Br}(B \\to K \\mu\\mu)/\\text{Br}(B \\to K ee)$ — of particular interest for BSM?',
        answer: 'The SM predicts $R(K) \\approx 1$ (with tiny kinematic corrections), because muons and electrons couple identically to the $Z/\\gamma$. A significant deviation would be direct evidence of new physics discriminating between lepton flavors, e.g. a leptoquark. LHCb has seen and then un-seen anomalies in this channel; the 2022 update brought $R(K)$ back to the SM value.',
        steps: [
          'SM prediction: $R(K) = 1 + \\mathcal{O}(m_\\mu^2/m_B^2) \\approx 1$ to great precision.',
          'Historical measurements had $R(K) \\sim 0.75$, $\\sim 2.5\\sigma$ below 1.',
          '2022 reanalysis with better control of background moved the result back to $R(K) = 0.95(5)$ — consistent with SM.',
          'The episode was a useful reminder that extraordinary claims need extraordinary backgrounds control.',
        ],
      },
      {
        prompt: 'What is a "leptoquark"?',
        answer: 'A hypothetical particle that couples directly to a quark-lepton pair, carrying both color and lepton number. Appears naturally in grand unified theories. Would mediate proton decay and induce flavor-violating $B$ decays.',
        steps: [
          'In $SU(5)$ GUTs, leptons and quarks are in the same representation, and gauge bosons mediating between them are leptoquarks.',
          'They would couple like $X_{\\mu} \\bar q \\gamma^\\mu \\ell$ and induce processes like $p \\to e^+ \\pi^0$.',
          'Proton decay constraints push leptoquark masses above about $10^{15}$ GeV unless couplings are small.',
          'LHC searches constrain TeV-scale leptoquarks in $\\tau q$, $\\mu q$, and $eq$ final states.',
        ],
      },
      {
        prompt: 'Explain why inflation (in cosmology) is of interest to particle physicists even though it is "cosmology".',
        answer: 'The inflaton is a new scalar field, with constraints on its potential coming from CMB measurements of $n_s$ and $r$. Building a BSM theory that realizes inflation naturally is an active particle-physics problem, and inflation also sets the energy scale at which any BSM symmetries can be relevant.',
        steps: [
          'Inflation requires a scalar field with a very flat potential and specific slow-roll parameters.',
          'Realizing this in a UV-complete theory (e.g., string theory, SUSY, composite models) is nontrivial.',
          'The energy scale of inflation is observable via the tensor-to-scalar ratio $r$.',
          'An observed $r$ would give a direct measurement of a particle-physics scale far above what any collider can reach.',
        ],
      },
      {
        prompt: 'A proton-proton collision at the LHC produces a pair of 1-TeV gluino candidates. Describe what the final state signature would look like.',
        answer: 'Each gluino cascade-decays through lighter SUSY particles down to the lightest supersymmetric particle (LSP), which escapes the detector. The event signature is multiple high-$p_T$ jets (from the cascade) plus large missing transverse momentum (from the two LSPs).',
        steps: [
          'Gluino decays like $\\tilde g \\to q \\bar q \\tilde\\chi^0_1$ or via heavier intermediate states.',
          'Each cascade produces several jets and possibly leptons.',
          'LSP is stable and weakly interacting, leaving the detector invisibly.',
          'The classic search: $\\geq 4$ jets, large $\\not{E}_T$, no leptons. Limits now rule out gluinos up to about 2.3 TeV in simple models.',
        ],
      },
      {
        prompt: 'What is the "vacuum stability" argument involving the top quark and the Higgs?',
        answer: 'The top quark contributes negatively to the running of the Higgs self-coupling $\\lambda$. Extrapolating the measured top and Higgs masses, $\\lambda$ goes slightly negative near $10^{10}$–$10^{12}$ GeV, implying our electroweak vacuum is metastable. The tunneling rate is astronomically small (longer than the age of the universe by many orders of magnitude), so we are safe, but the marginal stability is intriguing.',
        steps: [
          'RG equation for $\\lambda$ includes a negative term from the large top Yukawa.',
          'Solving numerically with $m_H = 125$ GeV and $m_t = 173$ GeV, $\\lambda(\\mu)$ passes through zero near $10^{10}$ GeV.',
          'If $\\lambda < 0$ at high scales, the Higgs potential is unbounded below there.',
          'The computed tunneling rate to the true vacuum is $\\sim 10^{-300}$ per Hubble volume per Hubble time — extraordinarily stable in practice.',
        ],
      },
      {
        prompt: 'Explain why "grand unification" at $\\sim 10^{16}$ GeV is motivated by the measured values of the three gauge couplings at the $Z$ mass.',
        answer: 'Running the three Standard Model gauge couplings up from $M_Z$ using the renormalization group, they almost — but not quite — meet at about $10^{16}$ GeV. In the minimal supersymmetric extension, they meet much more cleanly. This hint is one of the main (indirect) motivations for both GUTs and weak-scale SUSY.',
        steps: [
          'Measured at $M_Z$: $\\alpha_1^{-1} \\approx 59$, $\\alpha_2^{-1} \\approx 30$, $\\alpha_3^{-1} \\approx 8$.',
          'Running with SM beta functions: convergence at $\\sim 10^{13}\\text{--}10^{14}$ GeV but imperfect.',
          'Adding supersymmetric particles at $\\sim$ TeV modifies the beta functions and gives much cleaner convergence at $\\sim 2 \\times 10^{16}$ GeV.',
          'This was a major selling point of SUSY in the 1990s.',
        ],
      },
      {
        prompt: 'Why is $CP$ violation in the quark sector alone insufficient to explain the observed cosmic matter-antimatter asymmetry?',
        answer: 'The Sakharov conditions require $CP$ violation, but the Kobayashi-Maskawa (CKM) $CP$ violation in the SM gives a baryogenesis efficiency $\\sim 10^{-20}$, many orders of magnitude too small. Therefore some additional source of $CP$ violation — in the lepton sector, in a BSM theory, or in a phase transition — is required.',
        steps: [
          'Estimate of SM baryogenesis contribution involves the Jarlskog invariant $J \\approx 3 \\times 10^{-5}$.',
          'Additional factors of quark mass ratios suppress the result by many orders of magnitude.',
          'Observed $\\eta_B \\equiv n_b / n_\\gamma \\approx 6 \\times 10^{-10}$.',
          'Required: new $CP$ sources. Leptogenesis via heavy Majorana neutrinos is a leading scenario.',
        ],
      },
      {
        prompt: 'Summarize the experimental status of SUSY at the LHC as of 2024–2025.',
        answer: 'The LHC has excluded simplest natural SUSY scenarios with gluinos up to $\\sim 2.3$ TeV and first/second-generation squarks up to $\\sim 2$ TeV. Stop-squark limits are weaker due to more complicated decays. Flavor-violating SUSY is tightly constrained by $B$-physics. SUSY is not dead but is no longer the default BSM scenario; what survives requires either heavier partners or cleverer spectra.',
        steps: [
          'ATLAS and CMS searches target missing-$E_T$ signatures typical of $R$-parity-conserving SUSY.',
          'No excesses observed. Limits set on gluino, squark, and neutralino masses.',
          'Stop-squark searches are more model-dependent and limits are lower ($\\sim 1.2$ TeV).',
          'Theoretically, "natural SUSY" with light stops and Higgsinos is increasingly constrained.',
        ],
      },
    ];

    var PP_BSM_CHALLENGE = [
      {
        prompt: 'Argue from first principles why a new light (sub-eV) scalar particle with gravitational couplings to matter would modify tests of the inverse-square law at sub-millimeter distances.',
        answer: 'A light scalar $\\phi$ with mass $m_\\phi$ mediates a Yukawa-type potential $V(r) \\propto e^{-m_\\phi r}/r$ between test masses. For $r \\gtrsim 1/m_\\phi$, the contribution decays exponentially. Torsion-pendulum experiments (Eot-Wash group) probe deviations from $1/r^2$ gravity at sub-mm scales, which constrains $m_\\phi \\gtrsim \\hbar c / (1\\,\\text{mm}) \\sim 10^{-3}$ eV for couplings comparable to gravity.',
        steps: [
          'Yukawa potential from scalar exchange with mass $m_\\phi$.',
          'Deviation from Newton\'s $1/r^2$ scales as $e^{-m_\\phi r / \\hbar c}$.',
          'Eot-Wash experiments test down to $\\sim 50\\,\\mu$m separations.',
          'They rule out many models with extra-dimensional "dark" forces that would show up here.',
        ],
      },
      {
        prompt: 'Explain the idea behind leptogenesis and why it is a compelling alternative to electroweak baryogenesis.',
        answer: 'Leptogenesis uses the decays of heavy right-handed (Majorana) neutrinos to produce a lepton asymmetry in the early universe. Sphaleron processes then partially convert this to a baryon asymmetry. It is compelling because the necessary ingredients (heavy $N_R$, $CP$ phases in the PMNS matrix, out-of-equilibrium decays) are already required to explain observed neutrino masses via the seesaw.',
        steps: [
          'Heavy $N_R$ decays produce lepton asymmetry via $CP$-violating loops.',
          'Electroweak sphalerons, active at $T > 100$ GeV, convert $L$ into $B$.',
          'Required $N_R$ masses ($\\gtrsim 10^9$ GeV) are naturally associated with the seesaw scale.',
          'The story closes if you ever measure leptonic $CP$ violation at DUNE or Hyper-K consistent with predictions.',
        ],
      },
      {
        prompt: 'Discuss what it would take experimentally to convincingly detect dark matter via direct detection, and which aspects of the observation are most important for ruling out alternatives.',
        answer: 'Detecting dark matter directly requires (i) a recoil signal consistent with elastic scattering off a heavy particle, (ii) an annual modulation pattern matching the Earth\'s motion through the Galactic halo, and (iii) reproducibility across multiple target nuclei. DAMA/LIBRA claimed annual modulation in NaI but other experiments (XENON, LZ, CDMS) with different targets have not confirmed it. A convincing signal would have all three features.',
        steps: [
          'The recoil energy spectrum should match kinematics for a particle of the expected WIMP mass.',
          'The rate should modulate annually by $\\sim 1$-few percent as Earth moves through the Galactic DM wind.',
          'Cross-checks across nuclei (Xe, Ar, Ge, Si) must give consistent results.',
          'DAMA\'s claimed signal has been controversial for two decades precisely because it fails the multi-target test.',
        ],
      },
    ];

    PS.registerTopic("phys-pp-beyond", {
      title: "Beyond the Standard Model and flavor physics",
      description: "Dark matter, neutrino masses, SUSY, hierarchy, flavor, and the experimental landscape of BSM searches.",
      warmup: PP_BSM_WARMUP,
      standard: PP_BSM_STANDARD,
      challenge: PP_BSM_CHALLENGE,
    });
  }

  register();
})();
