// OncoMind project preview: kaesit.github.io/oncomind/ and /tr/oncomind/.
// An illustrated "field guide" promo page. It must never show research data: every drawing is either
// generic (aspirin, a made-up formula, schematic line art) or a random toy pattern, and it says so.
// English copy is here; Turkish overrides live in oncomind.tr.mjs and are deep-merged over it.
import TR from './oncomind.tr.mjs';
import { readFileSync } from 'node:fs';

export const COPY = {
  en: {
    title: 'OncoMind · Project preview — Esad Abdullah Kösedağ',
    description: 'An illustrated preview of OncoMind, an experimental, research-only open-source project. A promotion, not a publication. Contains no research data.',
    run: { guide: 'OncoMind · field guide', preview: 'Preview edition — not a publication', plate: 'Plate', foot: 'Illustrative only · no research data', colophon: 'Colophon' },
    toy: 'Toy example · not an OncoMind output',
    drawing: 'Drawing',
    keyTo: 'Key to plate',
    cover: {
      chips: ['Project preview · not a publication · no research data', 'OncoMind · field guide', 'Preview edition · v0.1'],
      title: 'OncoMind',
      dek: 'An illustrated field guide to an open-source workbench for cancer research experiments: what it is for, how it is put together, and what it is not.',
      footnote: 'A promotional preview of a software project, not a scientific paper. Every drawing and value on this page is illustrative.',
      caption: 'Frontispiece: a drifting field of colour, drawn live by a shader. Decorative only.',
      github: 'View the code on GitHub',
    },
    notice: {
      label: 'Please read first',
      heading: 'This is a preview, not a publication.',
      text: 'This page is a promotional introduction to OncoMind, an experimental, research-only open-source software project. It is not a paper, a preprint or a report of findings, and it contains no research data: no datasets, no model outputs, no measurements and no results. Every drawing, number and pattern on this page is illustrative and labelled as such. The only real molecule shown is aspirin, a well-known public medicine used as a teaching example. OncoMind has not been clinically validated, and nothing here is medical advice.',
      legend: 'Wherever a value or pattern appears, look for this tag',
    },
    numerals: {
      label: 'Numbers about this page and the software · not research results',
      items: [['6', 'plates in this guide'], ['4', 'parts in the software'], ['5', 'ADMET checks explained on Plate V'], ['v0.1', 'the current version. Expect rough edges.']],
    },
    index: {
      title: 'Plates',
      items: [
        ['I', 'What it is for', 'six aims, one workbench', 'aims'],
        ['II', 'How it is built', 'four parts and the rooms of the dashboard', 'built'],
        ['III', 'The life cycle', 'from public data to a person’s review', 'cycle'],
        ['IV', 'Two ways to write a molecule', 'text and graphs', 'molecule'],
        ['V', 'The body map', 'how the toxicity view shows risk', 'body'],
        ['VI', 'Not yet drawn', 'what is planned', 'planned'],
        ['—', 'Colophon', 'about this preview', 'colophon'],
      ],
    },
    aims: {
      title: 'What It Is For',
      short: 'What it is for',
      dek: 'Six things OncoMind is meant to do, drawn as one small sea creature with six spines.',
      key: [
        ['Data analysis', 'Machine-learning models trained on public research datasets, used to look for patterns in cancer data that are worth a closer look.'],
        ['Candidate molecules', 'Generative models built for the project propose new, synthetic molecules that could be studied as drug candidates. A proposed molecule is an idea to test, not a medicine.'],
        ['Decision-support experiments', 'Early experiments with tools that might one day help researchers compare treatment options. Research only, with no clinical use.'],
        ['Analytics dashboards', 'Charts and tables for exploring a dataset and finding better questions to ask of it.'],
        ['Awareness guides', 'Plain-language guides that help patients and families understand cancer research. Educational, never diagnostic.'],
        ['3D views (planned)', 'A future viewer for medical images in three dimensions. Not built yet; see Plate VI.'],
      ],
      svgTitle: 'A radiolarian with six numbered spines',
      svgDesc: 'A round shell with six spines. Spines 1 to 5 are solid; spine 6 is dashed because that aim is planned.',
      caption: 'OncoMind drawn as a radiolarian, a tiny sea creature with a glass-like shell and long spines. Each spine stands for one aim; the dashed spine is planned. A metaphor, not biology.',
      facts: [
        ['In short', 'OncoMind is an open-source workbench for cancer research experiments. It keeps data, models and what they produce in one place, so a researcher can follow an idea from a dataset to a molecule to a question worth asking.'],
        ['Where it lives', 'On GitHub, in the open. Anyone can read the code, run it on their own machine and see how each part works.'],
        ['Life stage', 'Experimental. The dashboard is an early version, v0.1. Parts of it change often, and some of it is still a sketch.'],
        ['Who it is for', 'Researchers and students in bioinformatics and computational chemistry, and anyone curious about what tools like these can and cannot do.'],
      ],
      notTitle: 'What it is not',
      not: 'It is not a diagnostic tool, a medical device or a source of treatment advice, and it has not been clinically validated. If you have a question about your health, please talk to a doctor.',
    },
    built: {
      title: 'How It Is Built',
      short: 'How it is built',
      dek: 'Four parts that work side by side, each packed in its own container, and a dashboard divided into rooms.',
      docker: 'Docker · containers',
      key: [
        ['A', 'Interface', ['React 18', 'visx', 'Radix UI', 'TanStack Table'], 'What people see and click. A React web app, with charts drawn by visx, interface parts from Radix UI and large tables handled by TanStack Table.'],
        ['B', 'Application API', ['C#', '.NET 8'], 'Accounts, records and the rules of the app.'],
        ['C', 'Model service', ['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'RDKit'], 'Where models run, and where molecules are read, checked and scored. RDKit handles the chemistry.'],
        ['D', 'Database', ['MongoDB'], 'Records and molecules, kept as flexible documents.'],
      ],
      around: ['Around them', 'Docker', 'Each part runs in its own container, so the workbench can be set up the same way on different machines.'],
      svgDesc: 'Four equal bands for the interface, application API, model service and database, inside a dashed outline labelled Docker.',
      caption: 'The four parts of OncoMind inside a dashed outline that stands for Docker. The bands are the same size on purpose: they show parts, not amounts.',
      roomsTitle: 'The rooms of the dashboard (v0.1)',
      roomsIntro: 'What you see through the interface: a handful of rooms, each with one job. This page shows no screens from them.',
      rooms: [
        ['Sign-in', 'Accounts for the people using a research install.'],
        ['Overview', 'A place to organise the records of a research project. This preview shows none.'],
        ['Datasets', 'Where public research datasets are loaded, inspected and prepared before any model sees them.'],
        ['Models', 'The project’s trained models, and what each one is for.'],
        ['Treatment comparison (experimental)', 'Early decision-support experiments. Research only; not meant to guide anyone’s care.'],
        ['Toxicity analysis', 'Predicted toxicity drawn on a body map.', 'body', 'See Plate V'],
        ['Drug candidates', 'A gallery of generated molecules, each with a drug-likeness score and a molecular weight.', 'molecule', 'See Plate IV'],
        ['Analytics', 'Charts for exploring data and asking better questions of it.'],
        ['Settings', 'Preferences and accounts.'],
      ],
      also: ['Also in the project', 'Awareness guides. Plain-language reading for patients and families. Educational, not diagnostic.'],
    },
    cycle: {
      title: 'The Life Cycle of a Candidate',
      short: 'The life cycle',
      dek: 'How an idea moves through OncoMind, from public data to a person’s review, and back again.',
      centre: 'A person reviews every turn.',
      hint: 'Seven stages, one loop. Select a stage to read about it.',
      tablist: 'Stages of the life cycle',
      stageOf: (n, t) => `Stage ${n} of ${t}`,
      stages: [
        ['Gather', 'Start from public data', 'Models learn from public research datasets: published records of molecules and how they behaved in experiments.'],
        ['Clean', 'Tidy the data', 'Remove duplicates, write every molecule in one standard form, and drop entries that make no chemical sense. Whatever is wrong here is carried into everything a model learns later.'],
        ['Learn', 'Train a generator', 'A model studies known molecules to learn their patterns, with the aim of writing new ones. OncoMind explores two kinds of generator, shown on Plate IV.'],
        ['Propose', 'Generate candidates', 'The model is asked for molecules that are not already in its training data. The next steps are there to sort them.'],
        ['Score', 'Score drug-likeness', 'Each candidate gets simple descriptors, such as QED and molecular weight, that say whether it looks like a typical drug. Plate IV shows how a candidate card reads.'],
        ['Screen', 'Screen for toxicity', 'ADMET models estimate how a molecule might be absorbed, spread through the body, broken down and cleared, and whether it might cause harm. Plate V shows how that is drawn.'],
        ['Review', 'A person decides', 'A researcher looks at what is left and decides what deserves a closer look, if anything. Often the answer leads back to the data with a better question.'],
      ],
      prev: 'Previous stage',
      next: 'Next stage',
      restart: 'Back to the start',
      loopLine: 'The loop continues, usually with a sharper question.',
      note: 'Every candidate in this loop is a hypothesis for a laboratory to test, not a treatment.',
      caption: 'Seven stages in one loop. A description of the intended workflow, not a record of anything done.',
      facts: [
        ['Why a loop?', 'Proposing molecules is cheap. Knowing which ones deserve attention is not. Each pass is a chance to drop weak ideas early and to ask a sharper question next time.'],
        ['Where people come in', 'Software can sort and score, but it cannot take responsibility for a decision. In OncoMind the last step is meant to be a person, and the loop is built around that.'],
      ],
    },
    molecule: {
      title: 'Two Ways to Write a Molecule',
      short: 'Two ways to write a molecule',
      dek: 'A molecule can be written as a line of text or drawn as a graph of atoms and bonds. OncoMind explores generators of both kinds. Here is the difference, shown with aspirin.',
      asText: 'As text · SMILES',
      asDrawing: 'As a drawing',
      toy: 'Toy example · aspirin, a well-known public molecule · not an OncoMind output',
      stamp: ['Toy example · aspirin', 'Not an OncoMind output'],
      slider: 'Read the string one character at a time',
      hint: 'Hover or tap a character to find it in the drawing, or an atom to find it in the string.',
      step: 'Step through', pause: 'Pause',
      toGraph: 'Show as a graph', toDrawing: 'Show as a chemist’s drawing',
      charOf: (n, t) => `Character ${n} of ${t}`,
      legend: [['C', 'carbon'], ['O', 'oxygen'], ['( )', 'a branch'], ['=', 'a double bond'], ['1 … 1', 'where a ring opens and closes'], ['H', 'hydrogen atoms are implied, not written']],
      chars: [
        'A carbon atom, the first one written. Hydrogen atoms are not written; a reader fills them in.',
        'A second carbon, bonded to the first.',
        'Opens a branch. What follows hangs off the carbon just before it.',
        'A double bond.',
        'An oxygen atom, joined to that carbon by the double bond.',
        'Closes the branch. The main chain carries on from the carbon before the bracket.',
        'An oxygen atom that links the chain to the ring.',
        'A carbon atom, the first atom of the ring.',
        'Opens a ring. This carbon is marked, and the ring will close where the digit 1 appears again.',
        'A double bond inside the ring.',
        'A ring carbon.',
        'A ring carbon, joined by a single bond.',
        'A double bond.',
        'A ring carbon.',
        'A ring carbon.',
        'A double bond.',
        'The sixth ring carbon.',
        'Closes the ring. This carbon bonds back to the one marked earlier. Six carbons with alternating double bonds make a benzene ring.',
        'A carbon atom hanging off the ring.',
        'Opens another branch from that carbon.',
        'A double bond.',
        'An oxygen atom, double-bonded to the carbon.',
        'Closes the branch.',
        'The last atom, an oxygen with an implied hydrogen. With the carbon and the other oxygen, it forms an acid group. That is the whole molecule.',
      ],
      graphCaption: 'The same molecule as a graph model sees it: thirteen atoms as nodes and the bonds as edges, with hydrogens left implicit.',
      svgLabel: 'Skeletal drawing of aspirin',
      caption: 'Aspirin written two ways: as a line of text, read one character at a time the way a sequence model reads it, and as a drawing of the same atoms and bonds.',
      facts: [
        ['Written as text', 'SMILES writes a molecule as one line of letters, digits and symbols. A sequence model, such as an LSTM, learns that grammar and writes new strings one character at a time, a little like predictive text.', 'LSTM · long short-term memory, a kind of neural network that reads and writes sequences step by step, with a memory of earlier steps.'],
        ['Drawn as a graph', 'A graph treats atoms as points and bonds as the lines between them. A graph model, such as a Graph-VAE, learns a compact space of whole structures and samples new ones from it. It works with the shape of the molecule directly, not a sentence about it.', 'Graph-VAE · a graph variational autoencoder, which learns by compressing molecules and rebuilding them.'],
        ['Why two?', 'They are two common ways to approach the same task. This page only shows how each one reads a molecule; it says nothing about how they behave in OncoMind.'],
      ],
      cardTitle: 'Where a molecule ends up: a candidate card',
      cardIntro: 'In the Drug candidates room, each generated molecule gets a card with its structure, a drug-likeness score and a molecular weight. Here is a simplified one, with aspirin standing in and the values left blank on purpose.',
      card: [['Name', 'Aspirin (stand-in)'], ['Drug-likeness (QED)', '—'], ['Molecular weight', '—']],
      cardToy: 'Toy example · values left blank on purpose',
      cardKey: [
        ['Structure', 'The molecule, drawn from its atoms and bonds.'],
        ['Name', 'Generated molecules have no common name. A familiar medicine stands in here.'],
        ['Drug-likeness (QED)', 'Quantitative Estimate of Drug-likeness: one number on a scale from 0 to 1 that sums up simple properties such as size, polarity and flexibility. Closer to 1 means the structure looks more like known oral drugs. A rough guide, not a verdict.'],
        ['Molecular weight', 'How heavy the molecule is, usually given in grams per mole (g/mol) or daltons. Size affects how easily a compound can move through the body.'],
      ],
    },
    body: {
      title: 'The Body Map',
      short: 'The body map',
      dek: 'OncoMind’s toxicity view draws predicted risks onto a human figure, so a long report can be read at a glance. Here the figure only explains the checks behind it.',
      intro: 'ADMET is a checklist for whether a molecule could work in the body at all: Absorption, Distribution, Metabolism, Excretion and Toxicity. Each check asks one question and is drawn at one place on the figure. Below, the checks run from the top of the figure down.',
      group: 'ADMET checks',
      question: 'The question', matters: 'Why it matters',
      // order: top to bottom on the figure
      checks: [
        ['D', 'Distribution', 'the blood–brain barrier', 'Brain', 'Once a molecule is in the blood, where does it travel? A common check is whether it is likely to cross the blood–brain barrier, the tight lining that protects the brain.', 'Depending on what a medicine is for, crossing that barrier can be the aim or a risk.'],
        ['T', 'Toxicity', 'the heart', 'Heart', 'Could the molecule cause harm? Harm can show up in many organs; the heart is drawn here because it is a common place to look.', 'Early warnings help researchers drop risky ideas before anyone spends time making them.'],
        ['M', 'Metabolism', 'the liver', 'Liver', 'How will the body break the molecule down? Much of that work happens in the liver.', 'A molecule broken down too quickly may not last long enough to work, and what it breaks down into matters too.'],
        ['E', 'Excretion', 'the kidneys', 'Kidneys', 'How will the body clear the molecule? Often, through the kidneys.', 'What the body cannot clear can build up.'],
        ['A', 'Absorption', 'the gut', 'Gut', 'If a medicine is swallowed, would this molecule pass from the gut into the blood?', 'A molecule that is never absorbed cannot do anything, however well it is aimed.'],
      ],
      inApp: 'In the app, you paste a SMILES string or pick a candidate, and each region turns red where a model predicts a possible problem and green where it does not. Here, flagged is pink with stripes and clear is teal with dots, each with a word label, so they read without colour.',
      toyOn: 'Show a toy pattern', toyOff: 'Hide toy pattern', reroll: 'Draw another',
      live: (f, c) => `Toy pattern, drawn at random: ${f} flagged, ${c} clear. Not a prediction, and not about any molecule.`,
      cardToyLine: 'In the app, a flag here would mean a model predicts trouble for this check. This one is random.',
      states: { flagged: 'Flagged', clear: 'Clear', none: 'Not shown', toy: 'toy' },
      legend: [['flagged', 'Flagged (striped): in the app, a model predicts a risk for this check. Here, toy pattern only.'], ['clear', 'Clear (dotted): in the app, no risk predicted. Here, toy pattern only.'], ['none', 'Not shown (outline): nothing drawn.']],
      stamp: ['Toy pattern · random', 'Not a prediction'],
      svgTitle: 'Line drawing of a human figure with five regions, each linked to one ADMET check.',
      caption: 'Five checks placed on a schematic figure. The placement is a simplification for teaching; real toxicity can involve any organ.',
      facts: [
        ['Where the estimates come from', 'ADMET models learn from published laboratory measurements, and they can be wrong, especially for molecules unlike anything they have seen.'],
        ['What it cannot tell you', 'A clear region does not mean a molecule is safe, and a flagged one does not prove harm. These are estimates for researchers to weigh, never a statement about anyone’s health.'],
      ],
      health: 'This plate explains part of a research tool. It is not health information, and it says nothing about any medicine you or anyone else takes.',
    },
    planned: {
      title: 'Not Yet Drawn',
      short: 'Not yet drawn',
      dek: 'Some of OncoMind is still a sketch. One planned piece is a way to look at medical images in three dimensions.',
      toy: 'Toy shape · a made-up mathematical form · not anatomy, not a scan',
      slider: 'Move the cutting plane',
      cutOf: (n, t) => `Cut ${n} of ${t}`,
      inset: 'The cut, seen flat',
      svgLabel: 'A made-up rounded shape drawn as a stack of contour slices, with one slice highlighted and shown flat in a circle on the right',
      caption: 'A made-up shape cut into slices, to suggest what a 3D viewer does: turn a volume, cut through it and look at one layer at a time.',
      facts: [
        ['What is planned', 'A viewer in the dashboard for medical images in three dimensions, for turning a volume around and slicing through it layer by layer. The details are still open.'],
        ['Why it is hard', 'Medical images are large, private and easy to misread. A viewer has to be quick, careful with privacy and honest about what it shows. None of that is solved yet.'],
        ['Status', 'Planned. Nothing on this plate exists in the app today.'],
      ],
      stamp: 'Planned',
    },
    colophon: {
      kicker: 'Colophon',
      title: 'About This Preview',
      boxLabel: 'About this page',
      box: 'This is a promotional preview of OncoMind, an open-source software project. It is not a scientific publication, a preprint or a summary of findings, and it has not been peer reviewed. It contains no research data: no datasets, model outputs, measurements or results. Every drawing, value and pattern here is illustrative. Patterns are either drawn at random in your browser or made from a fixed formula, and the only real molecule shown, aspirin, is a well-known public medicine used as a teaching example. OncoMind is experimental and for research only. It does not diagnose, treat or give advice on any medical condition. If you have a question about your health or about any medicine, please talk to a doctor.',
      readout: [
        ['Status', 'Experimental. For research only.'],
        ['Interface', 'v0.1'],
        ['Code', 'Open source, on GitHub'],
        ['Next', '3D views of medical images (planned)'],
        ['Made by', 'Esad Abdullah Kösedağ, as an independent open-source project'],
        ['Built with', null],
        ['This page', 'Drawn with HTML, CSS and SVG, with a little JavaScript for the moving parts. The frontispiece is a shader. There are no images of the app and no tracking.'],
      ],
      stack: ['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'RDKit', 'C# / .NET 8', 'React 18', 'visx', 'Radix UI', 'TanStack Table', 'MongoDB', 'Docker'],
      invite: 'If you work in cheminformatics, oncology or medical software and want to talk about the project, I would be glad to hear from you.',
      links: { code: 'Read the code on GitHub', contact: 'Get in touch', back: 'Back to the portfolio' },
      end: 'End of the preview edition.',
    },
  },
};

// ---------- helpers ----------
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
function deepMerge(a, b) {
  if (b === undefined) return a;
  if (Array.isArray(a) && Array.isArray(b)) return a.map((x, i) => (b[i] === undefined ? x : deepMerge(x, b[i])));
  if (isObj(a) && isObj(b)) {
    const o = { ...a };
    for (const k of Object.keys(b)) o[k] = deepMerge(a[k], b[k]);
    return o;
  }
  return b;
}
const f = (n) => Math.round(n * 10) / 10;
const rad = (d) => (d * Math.PI) / 180;
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// ---------- geometry (shared by no-JS markup and the JS) ----------
function radiolarian({ numbered }) {
  const C = 320;
  const pt = (r, a) => [f(C + r * Math.cos(rad(a))), f(C + r * Math.sin(rad(a)))];
  let s = '<g class="guides">';
  s += `<circle cx="${C}" cy="${C}" r="210" class="g-dot"/><circle cx="${C}" cy="${C}" r="296" class="g-dot"/>`;
  for (let a = 0; a < 360; a += 6) {
    const len = a % 30 === 0 ? 12 : 6;
    const [x1, y1] = pt(296, a), [x2, y2] = pt(296 - len, a);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="g-tick"/>`;
  }
  s += '</g><g class="shell">';
  s += `<circle cx="${C}" cy="${C}" r="150" class="s-1"/><circle cx="${C}" cy="${C}" r="100" class="s-2"/><circle cx="${C}" cy="${C}" r="46" class="s-1"/>`;
  for (let a = 0; a < 360; a += 15) {
    const [x1, y1] = pt(46, a), [x2, y2] = pt(150, a);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="s-strut"/>`;
  }
  for (let i = 0; i < 24; i++) { const [x, y] = pt(125, i * 15 + 7.5); s += `<circle cx="${x}" cy="${y}" r="7" class="s-2"/>`; }
  for (let i = 0; i < 12; i++) { const [x, y] = pt(73, i * 30 + 15); s += `<circle cx="${x}" cy="${y}" r="8" class="s-2"/>`; }
  s += '</g>';
  const angles = [240, 180, 120, 300, 0, 60];
  angles.forEach((a, i) => {
    const n = i + 1;
    const perp = a + 90;
    const p = (r, w) => [f(C + r * Math.cos(rad(a)) + w * Math.cos(rad(perp))), f(C + r * Math.sin(rad(a)) + w * Math.sin(rad(perp)))];
    const shaft = [p(150, 5), p(262, 0.6), p(262, -0.6), p(150, -5)].map((q) => q.join(',')).join(' ');
    let barbs = '';
    for (const r of [205, 240]) {
      const [bx, by] = pt(r, a);
      for (const sgn of [1, -1]) {
        const ba = a + 180 + sgn * 40;
        barbs += `<line x1="${bx}" y1="${by}" x2="${f(bx + 14 * Math.cos(rad(ba)))}" y2="${f(by + 14 * Math.sin(rad(ba)))}"/>`;
      }
    }
    const [mx, my] = pt(290, a);
    s += `<g class="arm${n === 6 ? ' is-planned' : ''}" data-arm="${n}"><polygon class="shaft" points="${shaft}"/><g class="barbs">${barbs}</g>`;
    if (numbered) s += `<circle class="marker" cx="${mx}" cy="${my}" r="17"/><text class="num" x="${mx}" y="${f(my + 5)}">${n}</text>`;
    s += '</g>';
  });
  return s;
}

// Aspirin in Kekulé form. Atom ids follow SMILES order; coordinates from a 2D depiction, bond length 50.
const SMILES = 'CC(=O)OC1=CC=CC=C1C(=O)O';
const ATOMS = [
  ['C', 66.8, 140], ['C', 110.1, 165], ['O', 110.1, 215], ['O', 153.4, 140], ['C', 196.7, 165], ['C', 196.7, 215], ['C', 240, 240],
  ['C', 283.3, 215], ['C', 283.3, 165], ['C', 240, 140], ['C', 240, 90], ['O', 196.7, 65], ['O', 283.3, 65],
];
const BONDS = [[1, 2, 1], [2, 3, 2], [2, 4, 1], [4, 5, 1], [5, 6, 2], [6, 7, 1], [7, 8, 2], [8, 9, 1], [9, 10, 2], [10, 5, 1], [10, 11, 1], [11, 12, 2], [11, 13, 1]];
// What each SMILES character writes: atom id, bond "a-b", branch/resume at an atom, ring open/close.
const MAP = ['a1', 'a2 b1-2', 'br a2', 'b2-3', 'a3', 'br a2', 'a4 b2-4', 'a5 b4-5', 'ring a5', 'b5-6', 'a6', 'a7 b6-7', 'b7-8', 'a8', 'a9 b8-9', 'b9-10', 'a10', 'ring b10-5', 'a11 b10-11', 'br a11', 'b11-12', 'a12', 'br a11', 'a13 b11-13'];
const RING_C = [240, 190];

function aspirin({ withIds }) {
  let s = '<g class="bonds">';
  for (const [a, b, o] of BONDS) {
    const [, x1, y1] = ATOMS[a - 1], [, x2, y2] = ATOMS[b - 1];
    const id = `${a}-${b}`;
    let lines = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    if (o === 2) {
      // second line: offset 4px; in the ring it sits inside and is shortened 15%
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
      let nx = -dy / L, ny = dx / L;
      const inRing = a >= 5 && a <= 10 && b >= 5 && b <= 10;
      if (inRing) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        if ((RING_C[0] - mx) * nx + (RING_C[1] - my) * ny < 0) { nx = -nx; ny = -ny; }
        const k = 7, t = 0.15;
        lines += `<line x1="${f(x1 + dx * t + nx * k)}" y1="${f(y1 + dy * t + ny * k)}" x2="${f(x2 - dx * t + nx * k)}" y2="${f(y2 - dy * t + ny * k)}"/>`;
      } else {
        const k = 2.2;
        lines = `<line x1="${f(x1 + nx * k)}" y1="${f(y1 + ny * k)}" x2="${f(x2 + nx * k)}" y2="${f(y2 + ny * k)}"/><line x1="${f(x1 - nx * k)}" y1="${f(y1 - ny * k)}" x2="${f(x2 - nx * k)}" y2="${f(y2 - ny * k)}"/>`;
      }
    }
    s += `<g class="bond"${withIds ? ` data-b="${id}"` : ''}>${lines}</g>`;
  }
  s += '</g><g class="atoms">';
  ATOMS.forEach(([el, x, y], i) => {
    const label = i === 12 ? 'OH' : el;
    s += `<g class="atom${el === 'C' ? ' is-c' : ''}"${withIds ? ` data-a="a${i + 1}"` : ''}>`;
    if (withIds) s += `<circle class="hit" cx="${x}" cy="${y}" r="14"/><circle class="node" cx="${x}" cy="${y}" r="12"/>`;
    s += `<circle class="knock" cx="${x}" cy="${y}" r="${label === 'OH' ? 13 : 10}"/><text class="el" x="${x}" y="${y + 5}">${label}</text></g>`;
  });
  return s + '</g>';
}

function cycleGeometry(n) {
  const C = 300, R = 230;
  const ang = (k) => -90 + (k * 360) / n;
  const pt = (r, a) => [f(C + r * Math.cos(rad(a))), f(C + r * Math.sin(rad(a)))];
  let arcs = '';
  const gap = 34; // node radius 26 + breathing room, as an angle on the ring
  const da = (gap / R) * (180 / Math.PI);
  for (let k = 0; k < n; k++) {
    const a1 = ang(k) + da, a2 = ang(k + 1) - da;
    const [x1, y1] = pt(R, a1), [x2, y2] = pt(R, a2);
    arcs += `<path class="arc" data-from="${k + 1}" d="M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}" marker-end="url(#om-arrow)"/>`;
  }
  const nodes = [];
  for (let k = 0; k < n; k++) nodes.push({ k: k + 1, xy: pt(R, ang(k)), glyph: pt(172, ang(k)), pct: [f(50 + (100 * R) / 600 * Math.cos(rad(ang(k)))), f(50 + (100 * R) / 600 * Math.sin(rad(ang(k))))], a: ang(k) });
  return { arcs, nodes };
}

// tiny 22px line glyphs for the cycle, drawn around (0,0)
const GLYPHS = [
  '<rect x="-8" y="-9" width="14" height="16" rx="1"/><path d="M-5 -11h14v16"/><path d="M-5 -4h8M-5 0h8M-5 4h5"/>',
  '<path d="M-10 -9h20l-7 9v8l-6 3v-11z"/>',
  '<circle cx="-8" cy="-6" r="2"/><circle cx="-8" cy="6" r="2"/><circle cx="0" cy="-8" r="2"/><circle cx="0" cy="0" r="2"/><circle cx="0" cy="8" r="2"/><circle cx="8" cy="0" r="2"/><path d="M-6 -6L-2 -8M-6 -6L-2 0M-6 6L-2 0M-6 6L-2 8M2 -8L6 0M2 0H6M2 8L6 0"/>',
  '<path d="M-6 2l4-7h8l4 7-4 7h-8z"/><path d="M2 -5v-6M2 -11l-4 -2M2 -11l4 -2"/>',
  '<path d="M-10 5a10 10 0 0 1 20 0"/><path d="M0 5l5-8"/><circle cx="0" cy="5" r="1.5"/>',
  '<circle cx="0" cy="-8" r="3"/><path d="M-5 -3h10l-1 7h-2l-1 7h-2l-1-7h-2z"/>',
  '<circle cx="-2" cy="-2" r="7"/><path d="M3 3l7 7"/>',
];

function stackSvg(c) {
  const ys = [52, 144, 236, 328];
  const glyph = [
    '<rect x="-12" y="-10" width="24" height="20" rx="2"/><path d="M-12 -4h24"/>',
    '<path d="M-5 -9l-7 9 7 9M5 -9l7 9-7 9"/>',
    '<circle cx="-9" cy="6" r="3"/><circle cx="9" cy="6" r="3"/><circle cx="0" cy="-8" r="3"/><path d="M-7 4L-2 -6M7 4L2 -6M-6 6h12"/>',
    '<ellipse cx="0" cy="-8" rx="11" ry="4"/><path d="M-11 -8v16a11 4 0 0 0 22 0v-16"/><path d="M-11 0a11 4 0 0 0 22 0"/>',
  ];
  let s = `<rect class="docker" x="16" y="16" width="408" height="388" rx="18"/><rect class="knockout" x="140" y="8" width="160" height="16"/><text class="mono-lab" x="220" y="20">${c.built.docker}</text>`;
  c.built.key.forEach(([L, name], i) => {
    const y = ys[i];
    s += `<g class="band" data-part="${L}"><rect class="band-r" x="56" y="${y}" width="328" height="64" rx="10"/><rect class="band-h" x="56" y="${y}" width="48" height="64" rx="10"/>`;
    s += `<g class="glyph" transform="translate(130 ${y + 32})">${glyph[i]}</g><text class="band-l" x="166" y="${y + 41}">${L}</text><text class="band-n" x="196" y="${y + 37}">${name}</text>`;
    s += `<circle class="bnum" cx="30" cy="${y + 32}" r="13"/><text class="bnum-t" x="30" y="${y + 36}">${i + 1}</text></g>`;
    if (i < 3) s += `<g class="link"><line x1="214" y1="${y + 64}" x2="214" y2="${y + 92}"/><line x1="226" y1="${y + 64}" x2="226" y2="${y + 92}"/><circle cx="214" cy="${y + 64}" r="2"/><circle cx="214" cy="${y + 92}" r="2"/><circle cx="226" cy="${y + 64}" r="2"/><circle cx="226" cy="${y + 92}" r="2"/></g>`;
  });
  return s;
}

function volume(c) {
  const N = 41, T = 72;
  const R = (z) => Math.sqrt(Math.max(0, 1 - z * z)) * (1 + 0.15 * z);
  const r = (th, z) => R(z) * (1 + 0.1 * Math.sin(3 * th + 2 * z) + 0.06 * Math.sin(5 * th - 3 * z) + 0.04 * Math.sin(7 * th + z));
  const slices = [];
  for (let i = 0; i < N; i++) {
    const z = -1 + i / 20;
    let d = '', flat = '', maxX = -1e9, maxY = 0;
    for (let k = 0; k < T; k++) {
      const th = (k / T) * Math.PI * 2;
      const rr = r(th, z);
      const X = f(250 + 170 * rr * Math.cos(th)), Y = f(210 - 140 * z + 60 * rr * Math.sin(th));
      if (X > maxX) { maxX = X; maxY = Y; }
      d += `${k ? 'L' : 'M'}${X} ${Y}`;
      flat += `${k ? 'L' : 'M'}${f(548 + 72 * rr * Math.cos(th))} ${f(210 + 72 * rr * Math.sin(th))}`;
    }
    slices.push({ d: d + 'Z', flat: flat + 'Z', lx: maxX, ly: maxY, empty: R(z) < 0.02 });
  }
  return slices;
}

// The body figure is hand-drawn line art (assets/oncomind/body-figure.svg.frag).
function bodyFigure() {
  try { return readFileSync(new URL('./assets/oncomind/body-figure.svg.frag', import.meta.url), 'utf8'); } catch { return ''; }
}

// ---------- render ----------
export function render({ lang, base, esc, canvas, ticks }) {
  const c = lang === 'tr' ? deepMerge(COPY.en, TR) : COPY.en;
  const T = (s) => esc(s);
  const toyTag = (s) => `<span class="om-toy">${T(s)}</span>`;
  const run = (label, num, total, title) => ({
    top: `<div class="om-run" aria-hidden="true"><span><i></i>${T(c.run.guide)}</span><span>${T(c.run.preview)}</span><span><i></i>${T(label)}</span></div>`,
    bot: `<div class="om-run om-run-b" aria-hidden="true"><span>${T(num === null ? c.run.colophon : `${c.run.plate} (${String(num).padStart(2, '0')}/${String(total).padStart(2, '0')})`)}</span><span>${T(title)}</span><span>${T(c.run.foot)}</span></div>`,
  });
  const head = (n, id, s) => `<header class="om-head"><span class="om-numeral" aria-hidden="true">${roman[n - 1]}</span><div><h2 id="${id}-h">${T(s.title)}</h2><p class="om-dek">${T(s.dek)}</p></div></header>`;
  const facts = (list, cls = '') => `<div class="om-facts ${cls}">${list.map(([h, p, d]) => `<div class="om-fact"><h3>${T(h)}</h3><p>${T(p)}</p>${d ? `<p class="om-def">${T(d)}</p>` : ''}</div>`).join('')}</div>`;
  const caption = (n, text) => `<p class="om-cap"><span class="om-cap-l">${T(c.drawing)} ${roman[n - 1]}</span> ${T(text)}</p>`;
  const plate = (n, id, cls, s, inner) => {
    const r = run(`${c.run.plate} ${roman[n - 1]}`, n, 6, s.short);
    return `<section class="om-plate ${cls}" id="${id}" aria-labelledby="${id}-h">${r.top}${head(n, id, s)}${inner}${r.bot}${ticks}</section>`;
  };

  // sprite: patterns, markers, symbols
  const sprite = `<svg class="om-sprite" width="0" height="0" aria-hidden="true" focusable="false"><defs>
<pattern id="om-hatch-ink" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="p-ink" x1="0" y1="0" x2="0" y2="6"/></pattern>
<pattern id="om-hatch-om" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="p-om" x1="0" y1="0" x2="0" y2="6"/></pattern>
<pattern id="om-dots-clear" width="6" height="6" patternUnits="userSpaceOnUse"><circle class="p-clear" cx="3" cy="3" r="1.1"/></pattern>
<marker id="om-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="m-ink" d="M1 1L8 5L1 9"/></marker>
<marker id="om-arrow-om" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="m-om" d="M1 1L8 5L1 9"/></marker>
<symbol id="om-radiolarian" viewBox="0 0 640 640">${radiolarian({ numbered: false })}</symbol>
<symbol id="mol-aspirin" viewBox="40 40 270 225">${aspirin({ withIds: false })}</symbol>
</defs></svg>`;

  // ----- cover -----
  const cover = `
<section class="banner om-cover" aria-label="${T(c.cover.title)}">
  ${canvas('oncomind', ' data-hero')}
  <svg class="om-front" viewBox="0 0 640 640" aria-hidden="true" focusable="false"><use href="#om-radiolarian"/></svg>
  <div class="banner-in om-cover-in">
    <div class="mono hero-meta">${c.cover.chips.map((x, i) => `<span${i === 0 ? ' class="om-chip-pre"' : ''}>${i ? '● ' : ''}${T(x)}</span>`).join('')}</div>
    <div class="om-cover-b">
      <div>
        <h1 class="banner-title om-title">${T(c.cover.title)}</h1>
        <p class="om-cover-dek">${T(c.cover.dek)}</p>
        <p class="mono om-footnote">${T(c.cover.footnote)}</p>
        <a class="om-btn om-gh" href="https://github.com/kaesit/oncomind" target="_blank" rel="noopener">${T(c.cover.github)} &#8599;</a>
      </div>
      <p class="mono om-cover-cap">${T(c.cover.caption)}</p>
    </div>
  </div>
  ${ticks}
</section>
<aside class="om-notice" role="note" aria-labelledby="om-notice-h">
  <span class="mono om-notice-l">${T(c.notice.label)}</span>
  <div><h2 id="om-notice-h">${T(c.notice.heading)}</h2><p>${T(c.notice.text)}</p></div>
  <p class="om-notice-legend"><span>${T(c.notice.legend)} &darr;</span> ${toyTag(c.toy)}</p>
</aside>
<section class="om-intro" aria-label="${T(c.index.title)}">
  <p class="mono om-num-l">${T(c.numerals.label)}</p>
  <dl class="readouts big om-numerals">${c.numerals.items.map(([v, l]) => `<div><dt>${T(v)}</dt><dd>${T(l)}</dd></div>`).join('')}</dl>
  <nav class="om-index" aria-labelledby="om-index-h">
    <h2 id="om-index-h" class="om-index-t">${T(c.index.title)}</h2>
    <ol>${c.index.items.map(([n, t, d, id]) => `<li><a href="#${id}"><span class="mono">${n}</span><span class="om-index-n">${T(t)}</span><i aria-hidden="true"></i><span class="om-index-d">${T(d)}</span></a></li>`).join('')}</ol>
  </nav>
</section>`;

  // ----- plate I -----
  const A = c.aims;
  const keyItem = (k, i) => `<li data-arm="${i + 1}"><span class="om-kn" aria-hidden="true">${i + 1}</span><div><h3>${T(k[0])}</h3><p>${T(k[1])}</p></div></li>`;
  const p1 = plate(1, 'aims', 'om-full om-aims', A, `
<div class="om-aims-main">
  <ol class="om-key om-key-l">${A.key.slice(0, 3).map(keyItem).join('')}</ol>
  <figure class="om-fig om-aims-fig">
    <svg id="om-specimen" viewBox="0 0 640 640" role="img" aria-labelledby="aims-st aims-sd"><title id="aims-st">${T(A.svgTitle)}</title><desc id="aims-sd">${T(A.svgDesc)}</desc>${radiolarian({ numbered: true })}</svg>
    <figcaption>${caption(1, A.caption)}</figcaption>
  </figure>
  <ol class="om-key om-key-r" start="4">${A.key.slice(3).map((k, i) => keyItem(k, i + 3)).join('')}</ol>
</div>
${facts(A.facts, 'om-facts-4')}
<div class="om-not"><h3>${T(A.notTitle)}</h3><p>${T(A.not)}</p></div>`);

  // ----- plate II -----
  const B = c.built;
  const p2 = plate(2, 'built', 'om-ground om-built', B, `
<div class="om-built-main">
  <figure class="om-inset om-built-fig">
    <svg id="om-stack" viewBox="0 0 440 420" role="img" aria-labelledby="built-sd"><desc id="built-sd">${T(B.svgDesc)}</desc>${stackSvg(c)}</svg>
    <figcaption>${caption(2, B.caption)}</figcaption>
    ${ticks}
  </figure>
  <ol class="om-layers">${B.key.map(([L, name, tools, text]) => `<li data-part="${L}"><span class="om-letter" aria-hidden="true">${L}</span><div><h3>${T(name)}</h3><p class="om-tools">${tools.map((t) => `<span>${T(t)}</span>`).join('')}</p><p>${T(text)}</p></div></li>`).join('')}
    <li class="om-around"><span class="om-letter" aria-hidden="true">&#9633;</span><div><h3>${T(B.around[0])} · ${T(B.around[1])}</h3><p>${T(B.around[2])}</p></div></li>
  </ol>
</div>
<div class="om-rooms">
  <h3>${T(B.roomsTitle)}</h3>
  <p class="om-rooms-i">${T(B.roomsIntro)}</p>
  <ol>${B.rooms.map(([n, d, link, lt], i) => `<li><span class="mono">${String(i + 1).padStart(2, '0')}</span><h4>${T(n)}</h4><p>${T(d)}${link ? ` <a href="#${link}">${T(lt)}</a>` : ''}</p></li>`).join('')}</ol>
  <p class="om-also"><strong>${T(B.also[0])}.</strong> ${T(B.also[1])}</p>
</div>`);

  // ----- plate III -----
  const Y = c.cycle;
  const n = Y.stages.length;
  const geo = cycleGeometry(n);
  const cycleSvg = `<svg id="om-cycle" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
<circle class="ring" cx="300" cy="300" r="230"/><circle class="guide" cx="300" cy="300" r="150"/>${geo.arcs}
${geo.nodes.map((nd) => `<g class="node" data-step="${nd.k}"><circle cx="${nd.xy[0]}" cy="${nd.xy[1]}" r="26"/><text x="${nd.xy[0]}" y="${f(nd.xy[1] + 5)}">${nd.k}</text></g><g class="glyph" transform="translate(${nd.glyph[0]} ${nd.glyph[1]})">${GLYPHS[nd.k - 1]}</g>`).join('')}
<g id="cycle-orbit"><circle class="halo" cx="300" cy="106" r="10"/><circle class="orbit-dot" cx="300" cy="106" r="5"/></g></svg>`;
  const side = (a) => (Math.abs(Math.cos(rad(a))) < 0.3 ? (Math.sin(rad(a)) < 0 ? 't' : 'b') : Math.cos(rad(a)) > 0 ? 'r' : 'l');
  const p3 = plate(3, 'cycle', 'om-full om-cycle', Y, `
<div class="om-cycle-main">
  ${facts([Y.facts[0]], 'om-cycle-f1')}
  <div class="om-cycle-wrap">
    <div class="cycle-ring" data-stages="${n}">
      ${cycleSvg}
      <div class="cycle-tabs" role="tablist" aria-label="${T(Y.tablist)}" hidden>
        ${Y.stages.map(([name], i) => `<button type="button" role="tab" id="cyc-tab-${i + 1}" aria-controls="cyc-p-${i + 1}" class="lab-${side(geo.nodes[i].a)}" style="left:${geo.nodes[i].pct[0]}%;top:${geo.nodes[i].pct[1]}%" data-step="${i + 1}"><span class="mono">${i + 1}</span><span class="cyc-name">${T(name)}</span></button>`).join('')}
      </div>
      <p class="cycle-centre">${T(Y.centre)}</p>
    </div>
    <ol class="cycle-steps">${Y.stages.map(([name, h, p], i) => `<li id="cyc-p-${i + 1}" data-step="${i + 1}"><p class="mono">${T(Y.stageOf(i + 1, n))} · ${T(name)}</p><h3>${T(h)}</h3><p>${T(p)}</p>${i === n - 1 ? `<p class="cycle-loop" hidden>${T(Y.loopLine)}</p>` : ''}</li>`).join('')}</ol>
    <p class="cycle-hint" hidden>${T(Y.hint)}</p>
    <div class="cycle-nav" hidden><button type="button" class="om-btn" data-dir="-1">&larr; ${T(Y.prev)}</button><button type="button" class="om-btn" data-dir="1" data-next="${T(Y.next)}" data-restart="${T(Y.restart)}">${T(Y.next)} &rarr;</button></div>
    ${caption(3, Y.caption)}
  </div>
  <div class="om-cycle-f2">${facts([Y.facts[1]])}<p class="om-note">${T(Y.note)}</p></div>
</div>`);

  // ----- plate IV -----
  const M = c.molecule;
  const chSpan = (i) => `<span class="ch" data-i="${i}" data-map="${MAP[i]}">${SMILES[i]}</span>`;
  // grouped so a line break never falls inside the ring or a branch: CC(=O)O | C1=CC=CC=C1 | C(=O)O
  const chars = [[0, 7], [7, 18], [18, 24]].map(([a, b]) => `<span class="tok">${Array.from({ length: b - a }, (_, k) => chSpan(a + k)).join('')}</span>`).join('');
  const molSvg = `<svg id="om-molecule" viewBox="40 30 290 240" role="img" aria-label="${T(M.svgLabel)}" data-view="drawing">${aspirin({ withIds: true })}<circle class="anchor-ring" cx="-50" cy="-50" r="17"/>
<g class="om-stamp" transform="rotate(-4 250 258)"><rect x="168" y="246" width="158" height="22"/><text x="174" y="255">${T(M.stamp[0])}</text><text x="174" y="264">${T(M.stamp[1])}</text></g></svg>`;
  const p4 = plate(4, 'molecule', 'om-ground om-molecule', M, `
<div class="om-inset om-mol" data-chars="${T(JSON.stringify(M.chars))}" data-charof="${T(M.charOf('{n}', '{t}'))}" data-step="${T(M.step)}" data-pause="${T(M.pause)}" data-to-graph="${T(M.toGraph)}" data-to-drawing="${T(M.toDrawing)}" data-graph-cap="${T(M.graphCaption)}">
  <div class="om-mol-top"><span class="mono">${T(M.asText)}</span>${toyTag(M.toy)}</div>
  <div class="om-mol-grid">
    <div class="om-mol-text">
      <p class="smiles" aria-hidden="true">${chars}</p><p class="sr-only">SMILES: ${SMILES}</p>
      <div class="om-mol-ctrl" hidden>
        <label class="mono" for="mol-range">${T(M.slider)}</label>
        <input id="mol-range" type="range" min="0" max="${SMILES.length - 1}" step="1" value="0">
        <div class="om-mol-cap" aria-live="off"><p class="mono"></p><p></p></div>
        <p class="om-hint">${T(M.hint)}</p>
        <div class="om-btns"><button type="button" class="om-btn" data-act="step">${T(M.step)}</button><button type="button" class="om-btn" data-act="view">${T(M.toGraph)}</button></div>
      </div>
    </div>
    <figure class="om-mol-fig"><span class="mono">${T(M.asDrawing)}</span>${molSvg}<p class="om-mol-gcap" hidden>${T(M.graphCaption)}</p></figure>
  </div>
  <ul class="om-legend">${M.legend.map(([k, v]) => `<li><b class="mono">${T(k)}</b> ${T(v)}</li>`).join('')}</ul>
  ${caption(4, M.caption)}
  ${ticks}
</div>
${facts(M.facts, 'om-facts-3')}
<div class="om-card-row">
  <div class="om-card-wrap">
    <h3>${T(M.cardTitle)}</h3>
    <p>${T(M.cardIntro)}</p>
    <div class="om-card" role="group" aria-label="${T(M.cardTitle)}">
      <div class="om-card-art"><svg viewBox="0 0 270 225" aria-hidden="true" focusable="false"><use href="#mol-aspirin"/></svg><span class="om-kn" data-k="1" aria-hidden="true">1</span></div>
      <dl>${M.card.map(([k, v], i) => `<div data-k="${i + 2}"><dt class="mono">${T(k)}</dt><dd>${T(v)}<span class="om-kn" aria-hidden="true">${i + 2}</span></dd></div>`).join('')}</dl>
      ${toyTag(M.cardToy)}
      ${ticks}
    </div>
  </div>
  <ol class="om-key om-card-key">${M.cardKey.map(([h, p], i) => `<li data-k="${i + 1}"><span class="om-kn" aria-hidden="true">${i + 1}</span><div><h3>${T(h)}</h3><p>${T(p)}</p></div></li>`).join('')}</ol>
</div>`);

  // ----- plate V -----
  const Bd = c.body;
  const fig = bodyFigure();
  // leader rows: right of the figure, one per check, from the organ anchor to x 410
  const anchors = {};
  for (const m of fig.matchAll(/data-check="([DTMEA])"[^>]*?data-ax="(\d+)"[^>]*?data-ay="(\d+)"/g)) anchors[m[1]] = [+m[2], +m[3]];
  const rowY = [70, 200, 290, 370, 450];
  const leaders = Bd.checks.map(([L], i) => {
    const [ax, ay] = anchors[L] || [200, rowY[i]];
    const y = rowY[i];
    return `<g class="lead" data-check="${L}"><path class="leader" d="M${ax} ${ay}L${ax + 20} ${ay}L${ax + 40} ${y}L410 ${y}"/><circle class="anchor" cx="${ax}" cy="${ay}" r="3"/><text class="lab-l" x="422" y="${y + 8}">${L}</text><text class="lab-n" x="448" y="${y + 5}">${T(Bd.checks[i][1])} · ${T(Bd.checks[i][3])}</text></g>`;
  }).join('');
  const bodySvg = `<svg id="om-body" viewBox="0 0 720 680" role="img" aria-labelledby="body-st" preserveAspectRatio="xMinYMid slice"><title id="body-st">${T(Bd.svgTitle)}</title>${fig}${leaders}
<g class="om-stamp body-stamp" transform="rotate(-4 575 575)"><rect x="450" y="545" width="250" height="60"/><text x="464" y="571">${T(Bd.stamp[0])}</text><text x="464" y="591">${T(Bd.stamp[1])}</text></g></svg>`;
  const p5 = plate(5, 'body', 'om-full om-body', Bd, `
<p class="om-body-intro">${T(Bd.intro)}</p>
<div class="om-body-main" data-states="${T(JSON.stringify(Bd.states))}" data-live="${T(Bd.live('{f}', '{c}'))}" data-toy-on="${T(Bd.toyOn)}" data-toy-off="${T(Bd.toyOff)}">
  <p class="body-toytag" hidden>${toyTag(`${Bd.stamp[0]} · ${Bd.stamp[1]}`)}</p>
  <div class="bodymap">
    ${bodySvg}
    <div class="body-checks" role="group" aria-label="${T(Bd.group)}" hidden>
      ${Bd.checks.map(([L, name, where, shortName], i) => `<button type="button" class="body-check" data-check="${L}" aria-pressed="false" style="--y:${f((rowY[i] / 680) * 100)}%"><span class="bc-l">${L}</span><span class="bc-n mono">${T(name)}<span class="bc-w">: ${T(where)}</span></span><span class="bc-short mono">${T(shortName)}</span><span class="bc-s mono"></span></button>`).join('')}
    </div>
  </div>
  <div class="body-side">
    <dl class="body-dl">${Bd.checks.map(([L, name, where, , q, w]) => `<div data-check="${L}"><dt>${L} · ${T(name)}, ${T(where)}</dt><dd><p><span class="mono">${T(Bd.question)}</span>${T(q)}</p><p><span class="mono">${T(Bd.matters)}</span>${T(w)}</p></dd></div>`).join('')}</dl>
    <p class="body-inapp">${T(Bd.inApp)}</p>
    <div class="body-toy" hidden>
      <div class="om-btns"><button type="button" class="om-btn" data-act="toy">${T(Bd.toyOn)}</button><button type="button" class="om-btn" data-act="reroll" hidden>${T(Bd.reroll)}</button></div>
      <p class="body-live mono" aria-live="polite"></p>
      <p class="body-toyline" hidden>${T(Bd.cardToyLine)}</p>
    </div>
    <ul class="body-legend">${Bd.legend.map(([k, v]) => `<li><i class="sw sw-${k}" aria-hidden="true"></i>${T(v)}</li>`).join('')}</ul>
  </div>
</div>
${caption(5, Bd.caption)}
${facts(Bd.facts, 'om-facts-2')}
<p class="om-health">${T(Bd.health)}</p>`);

  // ----- plate VI -----
  const V = c.planned;
  const sl = volume(c);
  const mid = 20;
  const volSvg = `<svg id="om-volume" viewBox="0 0 640 420" role="img" aria-label="${T(V.svgLabel)}">
<g class="slices">${sl.map((s, i) => `<path class="slice${i === mid ? ' is-cut' : i > mid ? ' is-above' : ' is-below'}${s.empty ? ' is-empty' : ''}" data-i="${i}" data-flat="${s.flat}" data-lx="${s.lx}" data-ly="${s.ly}" d="${s.d}"/>`).join('')}</g>
<circle class="inset-frame" cx="548" cy="210" r="86"/>${Array.from({ length: 12 }, (_, k) => { const a = (k * 30 * Math.PI) / 180; return `<line class="inset-tick" x1="${f(548 + 86 * Math.cos(a))}" y1="${f(210 + 86 * Math.sin(a))}" x2="${f(548 + 80 * Math.cos(a))}" y2="${f(210 + 80 * Math.sin(a))}"/>`; }).join('')}
<path class="inset-cut" d="${sl[mid].flat}"/><path class="cut-link" d="M${sl[mid].lx} ${sl[mid].ly}L462 210"/>
<text class="mono-lab" x="548" y="318">${T(V.inset)}</text></svg>`;
  const p6 = plate(6, 'planned', 'om-ground om-planned', V, `
<div class="om-planned-main">
  <figure class="om-inset om-vol" data-cutof="${T(V.cutOf('{n}', '{t}'))}">
    ${toyTag(V.toy)}
    ${volSvg}
    <div class="om-vol-ctrl"><label class="mono" for="vol-range" hidden>${T(V.slider)}</label><input id="vol-range" type="range" min="1" max="${sl.length - 2}" step="1" value="${mid}" aria-valuetext="${T(V.cutOf(mid, sl.length - 2))}" hidden><output class="mono" for="vol-range" aria-hidden="true" hidden>${T(V.cutOf(mid, sl.length - 2))}</output></div>
    <figcaption>${caption(6, V.caption)}</figcaption>
    ${ticks}
  </figure>
  <div class="om-planned-f">${V.facts.map(([h, p], i) => `<div class="om-fact"><h3>${T(h)}${i === 2 ? ` <span class="om-stampbox">${T(V.stamp)}</span>` : ''}</h3><p>${T(p)}</p></div>`).join('')}</div>
</div>`);

  // ----- colophon -----
  const K = c.colophon;
  const colo = `
<section class="om-plate om-ground om-colophon" id="colophon" aria-labelledby="colophon-h">
  ${run(c.run.colophon, null, 6, K.title).top}
  <header class="om-head om-head-k"><div><p class="mono">${T(K.kicker)}</p><h2 id="colophon-h">${T(K.title)}</h2></div></header>
  <div class="om-colo-main">
    <div class="om-colo-box"><span class="mono">${T(K.boxLabel)}</span><p>${T(K.box)}</p>${ticks}</div>
    <div class="om-colo-side">
      <dl class="om-readout">${K.readout.map(([k, v]) => `<div><dt class="mono">${T(k)}</dt><dd>${v === null ? `<span class="chips">${K.stack.map((s) => `<span>${T(s)}</span>`).join('')}</span>` : T(v)}</dd></div>`).join('')}</dl>
      <p class="om-invite">${T(K.invite)}</p>
      <p class="om-links"><a class="om-btn" href="https://github.com/kaesit/oncomind" target="_blank" rel="noopener">${T(K.links.code)} &#8599;</a><a class="om-btn" href="${base}#contact">${T(K.links.contact)}</a><a class="om-btn" href="${base}">&larr; ${T(K.links.back)}</a></p>
    </div>
  </div>
  <div class="om-end"><svg viewBox="0 0 640 640" aria-hidden="true" focusable="false"><use href="#om-radiolarian"/></svg><p>${T(K.end)}</p><span class="mono">(06/06)</span></div>
  ${run(c.run.colophon, null, 6, K.title).bot}
</section>
<div class="om-closing" aria-hidden="true">${canvas('oncomind', ' data-hero')}</div>`;

  const body = `<div class="om" id="om">${sprite}${cover}${p1}${p2}${p3}${p4}${p5}${p6}${colo}</div>`;
  return {
    title: c.title,
    description: c.description,
    head: '<link rel="stylesheet" href="/oncomind/oncomind.css">',
    scripts: '<script src="/oncomind/oncomind.js" defer></script>',
    body,
  };
}
