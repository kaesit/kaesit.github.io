// Everything the site says lives in this file.
// Sources: CV (Oct 2026), github.com/kaesit, and the experience stories + blog posts
// from the old Framer site. Edit here, then run `node build.mjs`.

export const site = {
  url: 'https://kaesit.github.io',
  updated: '2026-10-17',
};

export const person = {
  name: 'Esad Abdullah Kösedağ',
  short: 'esad_kosedag',
  role: 'Software engineer',
  focus: 'Machine learning & bioinformatics',
  location: 'Elazığ, Türkiye',
  // GitHub bio, verbatim
  bio: 'Thanks to my interest in computers from an early age, I have always lived an inner life with computers, and it’ll be like this for the rest of my life.',
  email: 'eakosedag@gmail.com',
  cv: '/supplemantary_material/Esad_Abdullah_KOSEDAG_CV.pdf',
  links: [
    { label: 'GitHub', href: 'https://github.com/kaesit' },
    { label: 'LinkedIn', href: 'https://tr.linkedin.com/in/esad-abdullah-k%C3%B6seda%C4%9F-71427a23b' },
    { label: 'YouTube', href: 'https://www.youtube.com/@esadabdullahkosedag' },
  ],
};

// Gradient presets for the WebGL backgrounds (see assets/gradient.js).
// mode: 'flow' | 'horizon' | 'bloom'. Colors go dark -> light.
export const palettes = {
  hero:      { mode: 'flow',    seed: 3.1, colors: ['#07060b', '#1b1f6b', '#e2572b', '#ffd9b8'] },
  oncomind:  { mode: 'bloom',   seed: 7.4, colors: ['#05060a', '#3a0f4f', '#c23a7a', '#9fe7dc'] },
  uav:       { mode: 'horizon', seed: 1.7, colors: ['#04070d', '#123a6b', '#7fb6d9', '#f3efe4'] },
  rocket:    { mode: 'horizon', seed: 5.2, colors: ['#070404', '#4a120a', '#ff5a1f', '#ffe1a8'] },
  travel:    { mode: 'flow',    seed: 9.9, colors: ['#03080a', '#0c4a44', '#3fbf8a', '#f0f5c8'] },
  board:     { mode: 'flow',    seed: 2.6, colors: ['#060608', '#2b2b38', '#8d8fa8', '#e9e9f2'] },
  fungal:    { mode: 'bloom',   seed: 4.4, colors: ['#050703', '#26330f', '#b0a03a', '#f1e9c9'] },
  matrix:    { mode: 'horizon', seed: 8.1, colors: ['#030504', '#0d2a1c', '#4a8f6a', '#d9f2e2'] },
  graph:     { mode: 'bloom',   seed: 2.2, colors: ['#04050c', '#14245e', '#5b7cff', '#e6ecff'] },
};

export const work = [
  {
    slug: 'oncomind',
    title: 'OncoMind',
    kicker: 'Bioinformatics, drug discovery',
    summary: 'An open-source, AI-driven drug discovery and bioinformatics research platform for leukemia.',
    role: 'Project founder, AI/ML research',
    period: 'Oct 2025 — present',
    org: 'Open-source project',
    stack: ['Python', 'FastAPI', 'C# / .NET', 'React', 'MongoDB', 'PyTorch', 'RDKit'],
    palette: 'oncomind',
    readouts: [
      ['32,437', 'compounds after cleaning 57,619 raw entries'],
      ['95% / 90%', 'valid molecules, LSTM / Graph-VAE'],
      ['−10%', 'BBB toxicity vs. the LSTM pipeline'],
    ],
    bullets: [
      'Curated and preprocessed a dataset of 6 kinase inhibitors, cleaning 57,619 raw molecular entries down to 32,437 canonicalized, deduplicated compounds for generative model training.',
      'Trained and benchmarked two generative architectures for de novo drug candidate synthesis (SMILES): an LSTM model and a Graph-VAE model, achieving 95% and 90% accuracy respectively in generating chemically viable compounds.',
      'Identified that LSTM-generated candidates exhibited 90% BBB toxicity; re-engineered the pipeline with the Graph-VAE architecture to reduce BBB toxicity by 10%, improving candidate safety profile for targeted therapy.',
      'Architected a full-stack drug discovery platform (Python/FastAPI backend, C#/.NET service layer, React frontend, MongoDB) to support the end-to-end pipeline from data ingestion to candidate generation.',
    ],
    story: {
      challenge: 'The challenge was the research part: choosing the right genomes for future candidate compounds that might cure leukemia. But the more important part is the optimization and data scraping. Scraping genomic data is not as easy as scraping e-commerce website text. It is not hard to fetch data; it is hard to extract it clean and be sure about the compounds before training a massive LSTM model.',
      goal: 'The goal is very wide: developing a digital drug discovery and bioinformatics laboratory for researchers and doctors. I designed the system to be optimized, easy to use and as clear as a government document. Anybody with enough knowledge of bioscience or bioinformatics should be able to use the app easily. But even though I developed a very clear and useful UI, I needed more, so I wrote the Awareness Guide.',
      result: 'The project is still ongoing, and it is not going to end in this decade. Maybe the next one :)',
    },
    links: [{ label: 'Repository', href: 'https://github.com/kaesit/oncomind' }],
    // Screenshots of the OncoMind web app (v0.1 presentation demo)
    gallery: [
      { src: 'img/oncomind-candidates.jpg', w: 1610, h: 1060, wide: true, caption: 'Generated drug candidates with QED and molecular weight' },
      { src: 'img/oncomind-toxicity.jpg', w: 1500, h: 860, caption: 'ADMET toxicity report mapped onto the body' },
      { src: 'img/oncomind-sign-in.jpg', w: 980, h: 640, caption: 'Sign-in screen of OncoMind OS' },
      { src: 'img/oncomind-analytics.jpg', w: 846, h: 356, wide: true, caption: 'Training data: 57,619 raw molecules, 32,437 after canonicalization' },
    ],
  },
  {
    slug: 'alcin-uav',
    title: 'Alçın UAV Team',
    kicker: 'Computer vision, UAV systems',
    summary: 'An AI-integrated autonomous UAV built from scratch for the Teknofest Savaşan İHA dogfight competition.',
    role: 'Computer vision & UAV systems engineer',
    period: 'Jan 2023 — Jun 2024',
    org: 'Teknofest Savaşan İHA',
    stack: ['YOLOv8', 'NVIDIA Jetson Xavier NX', 'OpenCV', 'Python', 'Qt Quick'],
    palette: 'uav',
    image: { src: 'img/alcin-uav-tracking.jpg', alt: 'Tracking interface locking onto a UAV in flight, with a detection box and confidence label', w: 1342, h: 619 },
    readouts: [
      ['30 FPS', 'stable on-board inference'],
      ['97%', 'detection accuracy'],
      ['60 s', 'target lock, stable flight'],
    ],
    bullets: [
      'Optimized and deployed a custom YOLOv8 model on an NVIDIA Jetson Xavier NX, achieving stable 30 FPS inference with 97% detection accuracy for real-time UAV tracking.',
      'Achieved uninterrupted target lock for 60 seconds in stable flight conditions and 25 seconds in turbulent conditions, validating tracking robustness under variable aerodynamic disturbance.',
      'Designed and developed flight control algorithms and a Ground Control Station (GCS) using Qt Quick for real-time UAV avionics monitoring.',
    ],
    story: {
      challenge: 'The competition requirements were about producing an AI-integrated autonomous UAV that can dogfight.',
      goal: 'Our goal was to produce a UAV, but my part was AI integration and ground station development. I started the project much earlier than my friends on the team, because this part is the most important and challenging part to do.',
      result: 'Our team developed an armed UAV entirely from scratch, and that was a challenging task. My job was even more challenging; I had to train a model that included at least 150k images, and the training process was very slow with Google Colab and Kaggle. So, I decided to train all the models locally, but first, I needed good hardware and perfect environment configurations for computer vision. For a while, I thought I would never finish the models and the dogfight algorithm before the competition deadline. But in the end, this adventure taught me one thing: even with limited timelines, if you don’t lose your passion, you will always find a way to improve your tasks. It might not be as perfect as you wish, but you can still make it.',
    },
    links: [
      { label: 'Tracking interface', href: 'https://github.com/kaesit/uav-tracking-interface' },
      { label: 'Competition', href: 'https://teknofest.org/tr/competitions/competition/33' },
    ],
  },
  {
    slug: 'capella-rocket',
    title: 'Capella Model Rocket Team',
    kicker: 'Avionics, embedded systems',
    summary: 'Flight computer telemetry and ground station for a sounding rocket built for Teknofest.',
    role: 'Team leader, lead avionics & embedded systems',
    period: 'Nov 2022 — Jun 2024',
    org: 'Teknofest Roket Yarışması',
    stack: ['STM32F103C8T6', 'C', 'Kalman filter', 'C# WinForms'],
    palette: 'rocket',
    image: { src: 'img/capella-rocket.jpg', alt: 'The Capella team’s sounding rocket on a display stand', w: 1800, h: 1355 },
    readouts: [
      ['78 B', 'telemetry packet, full fidelity'],
      ['~30% → 5–8%', 'telemetry data loss'],
    ],
    bullets: [
      'Programmed a competition-mandated telemetry system on an STM32F103C8T6 (LQFP48) flight computer, compressing sensor data packets to 78 bytes to meet judge interface bandwidth requirements while preserving full telemetry fidelity.',
      'Implemented a Kalman filter for sensor fusion, reducing telemetry data loss from ~30% to 5–8% under flight conditions, significantly improving ground station tracking reliability.',
      'Designed and developed a Ground Control Station (GCS) interface using C# Windows Forms to visualize real-time flight data.',
    ],
    links: [{ label: 'Competition', href: 'https://teknofest.org/tr/competitions/competition/31' }],
  },
  {
    slug: 'budgettravel',
    title: 'BudgetTravel',
    kicker: 'LLM agents, full stack',
    summary: 'An AI travel planner that turns natural-language requests into personalized, route-optimized itineraries.',
    role: 'Scrum master & AI engineer',
    period: 'Feb 2025 — Jun 2025',
    org: '4-person capstone team, remote',
    stack: ['OpenAI API', 'Google Maps API', 'Node.js', 'EJS'],
    palette: 'travel',
    readouts: [
      ['~10 → 2–5 min', 'itinerary planning time'],
      ['4', 'people, two workstreams'],
    ],
    bullets: [
      'Reduced AI-generated travel itinerary planning time from ~10 minutes to 2–5 minutes by optimizing the agent’s background review and map-traversal pipeline, integrating OpenAI and Google Maps APIs for real-time route optimization.',
      'Led sprint planning and task delegation as Scrum Master for a 4-person capstone team, coordinating full-stack development across AI backend and web frontend workstreams.',
      'Designed a full-stack AI-powered travel planning platform enabling users to generate personalized, optimized itineraries from natural language input.',
    ],
    links: [
      { label: 'Live site', href: 'https://budgettravel.vercel.app' },
      { label: 'Repository', href: 'https://github.com/kaesit/budgettravel' },
    ],
  },
  {
    slug: 'smart-board',
    title: 'Smart Board',
    kicker: 'Mail API, Windows',
    summary: 'A smart board lock screen that teachers unlock with disposable passwords sent by mail.',
    role: 'Developer',
    period: '2 weeks',
    org: 'OSB Teknik Koleji',
    stack: ['Yandex Mail', 'Windows'],
    palette: 'board',
    readouts: [],
    bullets: [],
    story: {
      challenge: 'The client’s problem was that the old lockdown software was very slow on new Windows operating systems. We had to build new lockdown software that uses a mail server, so that only teachers can get into the smart board, with disposable passwords based on Yandex Mail.',
      goal: 'Our goal was to build an efficient service that is fast and compatible, with a good user experience. It needed to be easy to use, and the backend services had to be efficient so they don’t waste teachers’ time in class.',
      result: 'Finally, we developed the e-mail service module that allows teachers to open the smart board lock screen with their passwords.',
    },
    links: [],
  },
];

export const experience = [
  {
    org: 'BB Technologies',
    place: 'Kayseri, Türkiye',
    role: 'Junior software developer',
    period: 'Jun 2023 — Sep 2023',
    bullets: [
      'Co-developed a Gantt-chart-based production scheduling system for a steel manufacturing plant, covering six machine types, and integrated it with the company’s existing .NET infrastructure using Node.js.',
      'Built the system to schedule machine operations down to individual worker shift synchronization, enabling significantly more precise production planning than the company’s previous manual process.',
      'Per finance team estimates, the tool contributed to an estimated $1–4M in annual cost savings and accelerated production planning timelines by at least one month.',
      'Used DevExtreme for custom UI components and managed data across FirebirdSQL and MSSQL databases.',
    ],
  },
];

// Timeline shown in the experience section (newest first).
export const timeline = [
  { period: '2025 —', role: 'Project founder', org: 'OncoMind', href: 'work/oncomind.html' },
  { period: '2025', role: 'Scrum master & AI engineer', org: 'BudgetTravel', href: 'work/budgettravel.html' },
  { period: '2023', role: 'Junior software developer', org: 'BB Technologies', href: '#bb-technologies' },
  { period: '2023 — 24', role: 'Computer vision & UAV systems engineer', org: 'Alçın UAV Team', href: 'work/alcin-uav.html' },
  { period: '2022 — 24', role: 'Team leader, avionics', org: 'Capella Model Rocket Team', href: 'work/capella-rocket.html' },
];

// Picked from github.com/kaesit. Descriptions come from each repo.
export const repos = [
  { name: 'labox', lang: 'Python', year: 2026, desc: 'A platform for simplifying communication between medical devices.' },
  { name: 'LLMHallucinations', lang: '', year: 2026, desc: 'Multidisciplinary hallucination detection and automated assessment tool for large language models.' },
  { name: 'research-agent', lang: 'Python', year: 2026, desc: 'A research agent for practicing the fundamentals of agents, LangGraph and TensorFlow.', demo: 'https://research-agent-vhhllfhvuvvzrt8t5hxb24.streamlit.app/' },
  { name: 'PySide6PersonalHubApplication', lang: 'Python', year: 2026, desc: 'My own PySide6 desktop hub for games, music, movies and shows.' },
  { name: 'ImageCaptioningPySide6', lang: 'Python', year: 2025, desc: 'A PySide6 interface that comments on images and vocalizes the comments using open-source image-captioning models.' },
  { name: 'Machine-Learning-Libraries-and-Algorithms', lang: 'Jupyter', year: 2025, desc: 'Machine learning libraries and algorithms.' },
  { name: 'LeetCodeProblems', lang: 'Python', year: 2024, desc: '56 of the top 150 interview questions on LeetCode, with my solutions.' },
  { name: 'uav-tracking-interface', lang: 'Python', year: 2024, desc: 'UAV detection software built to stay accurate even at long distances.' },
  { name: 'autonomous-car', lang: 'Python', year: 2023, desc: 'An autonomous car made with Python.' },
];

export const education = {
  school: 'Fırat University',
  place: 'Elazığ, Türkiye',
  degree: 'B.S. Software Engineering',
  period: 'Expected Jun 2028',
  courses: ['Data structures & algorithms', 'Linear algebra', 'Probability & statistics', 'Discrete mathematics', 'Data science', 'Numerical analysis'],
};

export const skills = ['Python', 'C++', 'JavaScript', 'Node.js', 'PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'pandas', 'RDKit', 'Docker', 'Team leadership'];
export const languages = ['Turkish (native)', 'English (intermediate / advanced)'];
export const interests = ['Film production', 'Game production', 'Composing music', 'Graphic design'];

// "Currently" panel on the home page. The latest post is added automatically by build.mjs.
export const currently = [
  { key: 'building', value: 'labox', note: 'A platform for simplifying communication between medical devices.', href: 'https://github.com/kaesit/labox' },
  { key: 'studying', value: 'Software Engineering, Fırat University' },
];

// Favorites in the About section, in Esad's own words.
export const favorites = [
  { title: 'Mr. Robot', year: '2015–2019', kind: 'Series', note: 'I never thought someone would be this brave about telling something different, be this realistic, and still somehow make you watch it.' },
  { title: 'Kardeş Payı', year: '2014–2015', kind: 'Series', note: 'The Best Turkish Comedy Show' },
  { title: 'Contact', year: '1997', kind: 'Film', note: 'The ending is a great answer to both believers and non-believers. It really asks: do you only need science, or religion, or is it better when they’re together?' },
  { title: 'The Matrix & The Gladiator', year: '1999, 2000', kind: 'Films', note: 'The very first movies I ever watched as a kid, so they have a special place in my heart.' },
  { title: 'Jobs', year: '2013', kind: 'Film', note: 'It inspired me, but it also showed the real side of Steve Jobs. I left the movie inspired, and knowing Steve Jobs wasn’t as pure as we thought when we were kids. But it still inspires me how he thinks and executes in such a visionary way ' },
];

// Blog posts. Body is a list of blocks: ['h2'|'h3'|'p', text] or ['ul', [items]].
// The two older posts were carried over from the Framer site.
export const posts = [
  {
    slug: 'lstm-or-graph-vae',
    title: 'LSTM or Graph-VAE? Testing the Usual Choice for Molecule Generation',
    dek: 'Why I tested a graph model against the standard SMILES LSTM, and where each one won.',
    date: '2026-10-17',
    category: 'Machine learning',
    minutes: 4,
    palette: 'graph',
    body: [
      ['p', 'When I started generating drug candidates for OncoMind, almost every example I found used the same model: an LSTM that writes molecules as SMILES strings, one character at a time. I kept wondering why that became the norm, and whether a different architecture could do better for what I needed.'],
      ['h2', 'The question'],
      ['p', 'A SMILES string is a way of writing a molecule as a line of text. An LSTM learns the grammar of that text and writes new strings that follow it. A Graph-VAE works differently: it treats a molecule as a graph, with atoms as nodes and bonds as edges, and learns a space it can sample new graphs from.'],
      ['p', 'My question was simple. If the model sees the structure of the molecule instead of a line of text, does it produce better candidates?'],
      ['h2', 'The setup'],
      ['p', 'I trained both models on the same data: compounds related to 6 kinase inhibitors. The raw data had 57,619 entries. After canonicalizing and removing duplicates, 32,437 compounds were left for training. Cleaning took more effort than training. A small mistake in the data turns into thousands of bad molecules later.'],
      ['p', 'Then I compared the molecules each model generated on four things:'],
      ['ul', [
        'Validity: whether the output is a real, chemically valid molecule.',
        'Synthetic accessibility: how hard the molecule would be to make in a lab.',
        'Uniqueness: how many of the generated molecules are different from each other.',
        'BBB permeability: whether the molecule is likely to cross the blood–brain barrier, which I treated as a toxicity risk for these candidates.',
      ]],
      ['h2', 'What happened'],
      ['p', 'The LSTM won on validity and synthetic accessibility. More of what it wrote was valid, and its molecules were easier to make.'],
      ['p', 'The Graph-VAE was worse on both. But it was clearly better on the two results I cared about most. It produced many more unique molecules, and fewer of its candidates were predicted to cross the blood–brain barrier. Most of the LSTM’s candidates were flagged for BBB permeability.'],
      ['h2', 'Why I think the LSTM is the norm'],
      ['p', 'This is my guess after the experiment, not a proven rule. An LSTM is very good at following the patterns in its training data. That gives you valid molecules that are easy to synthesize, which is what many benchmarks reward. The same habit also makes its outputs similar to each other and to the training set, including properties you might want to avoid. A graph model explores more, and it pays for that with molecules that are more often invalid or harder to make.'],
      ['h2', 'What I took from it'],
      ['p', 'There was no single winner. Which model is “more accurate” depends on what you measure. For OncoMind I moved the pipeline to the Graph-VAE, because at this stage new and safer candidates matter more to me than easy ones. An invalid molecule is easy to throw away; a valid one that crosses the blood–brain barrier is the harder problem.'],
      ['p', 'I don’t think the LSTM is the wrong choice. It is a strong baseline, and this comparison only meant something because I had it to compare against.'],
      ['p', 'If you have worked on molecule generation and think I missed something, I would like to hear it.'],
    ],
  },
  {
    slug: 'interuniverse-fungal-civilization',
    title: 'Interuniverse Fungal Civilization',
    dek: 'A little brainstorm about aliens.',
    date: '2024-07-01',
    category: 'Science fiction',
    minutes: 5,
    palette: 'fungal',
    body: [
      ['p', 'Have you ever thought about aliens or any other life form far away from us. They might be very different, weird, ugly, beautiful, powerful, weak, individual or collective mind. We heard a lot about collective mind stories but what about imagining real things by sticking science bit harder than movies, a fungi civilization that impossible to describe with our limited vocabulary but i’ll try.'],
      ['h2', 'Forms of Life Beyond Your Reality'],
      ['p', 'The outer life looks scary but also light our curiosity we hope to find them but we also don’t hesitate having conspiracy theories about aliens; reptilians, they live, secret invasion.'],
      ['h3', 'Kardashev scale'],
      ['p', '“The Kardashev scale is a method of measuring a civilization’s level of technological advancement based on the amount of energy it is capable of harnessing and using.” but we’ll think differently what about all of this energy usage is related to transportation and how fast you can travel, speed of light; wrong answer, the answer is TELEPORTATION, a fungal civilization that use interuniversal transportation to invade planets, galaxies and even universes to rule and evolute better after every successful invasion. A giant meteorical intelligences vast knowledge rules and bond planets with their spores and expand the border of their collective mind to be close to one thing we know an absolute infinite, eternal power of existence.'],
      ['h2', 'Conclusion'],
      ['p', 'Do not just think about symbiotes think differently there might be colors, technologies, knowledge around and beyond of universes, we might be the only freak creature who is aware of itself and might be the weakest and wildest one but there is one inevitable truth that no one can escape even we found aliens. And most painful idea is this: what if there is another creature imagines a life like ours maybe we’ll become the aliens we dream one day but that day what remains to love, remember, worship. Or the ones who will call themselves even human.'],
    ],
  },
  {
    slug: 'the-matrix-virus-of-this-era',
    title: 'The Matrix Virus of This Era',
    dek: 'How The Matrix damaged our society.',
    date: '2024-06-11',
    category: 'Science fiction',
    minutes: 3,
    palette: 'matrix',
    body: [
      ['h2', 'What is The Matrix'],
      ['p', 'In today’s digital era, escaping from The Matrix is capitalized and it’s a money printing machine, people think they are out of the system, but they are actually the ones who feed it. The Prophecy is a lie, be billionaire, be millionaire, be rich, be wealthy, be the most powerful existence in universe. You wonder how you do it, you must escape from the Matrix, and to escape from the Matrix you should buy my $30 Udemy course. We call this a self-fulfilling prophecy.'],
      ['h2', 'Degeneracy Due To Popular Culture'],
      ['p', 'Many members of the youth (specifically males) are seen as cash cows for the internet’s most successful “entrepreneurs”, they can easily be maneuvered, they can think they are special and everybody else is stupid or “NPCs”, and these people use The Matrix as a metaphor for justifying their invalid actions. The Matrix, the movie, was once used to tell about the dangers of technology, the value of freedom, the value of human life, and is now a tool for algorithms to spread hate and narcissism.'],
      ['h2', 'The Damage'],
      ['p', 'If a man doesn’t see his peers as humans, then he can do whatever he wants, at the end of the day, he’s in the matrix and everybody else is just NPCs who are dispensable. School shootings, hate towards women, hate towards other races. You are not special, you are not in The Matrix, and your race is not superior. The reason why so many young people tend to act like this cannot be explained with one parameter; games, shows or algorithms are all a part of a consumption that drives these youth crazy, not just one. We are overexposed and we cannot see the truth. “It might be brain fog”, “losers”, “fatherless”, “incel”: those are all accusations people make when a young person takes an invalid action. But blaming parents, teachers, the person themselves, social media, their ethnicity or physical appearance will not solve the problem; it makes the wound deeper. Internet and face-to-face connection, we need them both. I am aware some people suggest that those involved in these “incidents” read books, etc. A problem of isolation cannot be solved with another habit that can grow more isolation. Instead we should educate them, understand why they are doing this, why they’re shy, why they’re bullied or struggling to have friends, whether they have good parents. If none of these are the problem itself, then…'],
      ['h2', 'Conclusion'],
      ['p', 'The lesson is: the more a man is virtualized, the more isolated and dangerous he becomes. We should educate our people about virtual life, and remind them that the videos or things they are overexposed to on the internet are not the whole of reality. Shows, movies, and fictional characters should stay as they were created. We must not forget that what we consume is consumed; it shouldn’t begin to consume us back.'],
    ],
  },
];
