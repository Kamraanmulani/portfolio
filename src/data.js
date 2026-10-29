export const EMAIL = 'kamraanmulani8284@gmail.com';
export const RESUME_URL = '/Kamraan_Mulani_Resume.docx';

export const LINKS = {
  github: 'https://github.com/Kamraanmulani',
  linkedin: 'https://www.linkedin.com/in/kamraan-mulani-944166223/',
  leetcode: 'https://leetcode.com/u/KamraanMulani/',
  hashnode: 'https://hashnode.com/@kamraanmulani',
};

export const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export const PROJECTS = [
  {
    meta: 'Feb 2026 · Insurance · Vision',
    title: 'InsureAuto AI',
    tagline: 'AI damage assessment for insurance claims and fraud analytics',
    body: 'A full-stack claims platform that reads vehicle photos and video, using YOLOv10 and LLaVA 13B to detect damage, classify severity and estimate repair cost. Multi-layer fraud checks — perceptual hashing, EXIF validation and Qdrant similarity search — flag duplicate or manipulated evidence and produce an automated claim risk score.',
    tags: ['YOLOv10', 'LLaVA 13B', 'OpenCV', 'Qdrant', 'FastAPI', 'React', 'Docker'],
    links: [{ label: 'View code →', href: 'https://github.com/Kamraanmulani/InsureAutoAI' }],
  },
  {
    meta: 'Nov 2025 · Real estate · Voice',
    title: 'Real Estate Voice Agent',
    tagline: 'A conversational calling system that answers property inquiries',
    body: 'Real-time, multilingual phone conversations over Twilio with LLM reasoning (OpenAI / Groq), Whisper for speech-to-text and ElevenLabs for low-latency speech. A memory-aware RAG layer — Neo4j graph memory plus Qdrant vector search — recalls past calls and reasons over FAQs, pricing and property specs in PDF, Excel and Word.',
    tags: ['Whisper', 'ElevenLabs', 'Twilio', 'LangChain', 'Neo4j', 'Qdrant'],
    links: [{ label: 'View code →', href: 'https://github.com/Kamraanmulani/Real-Estate-Voice-Agent' }],
  },
  {
    meta: 'Oct 2025 · Open source · npm',
    title: 'ragforge',
    tagline: 'Advanced RAG techniques, made simple',
    body: 'A lightweight open-source toolkit that sharpens RAG pipelines with query expansion, hybrid semantic retrieval and reranking — built for production LLM apps.',
    highlight: '1000+ downloads on npm.',
    tags: ['Node.js', 'LangChain', 'OpenAI', 'Qdrant'],
    links: [{ label: 'View code →', href: 'https://github.com/Kamraanmulani/ragforge' }, { label: 'npm →', href: 'https://www.npmjs.com/package/ragforge' }],
  },
];

export const EXPERIENCE = [
  {
    when: 'Mar 2026 — Present',
    org: 'IIT Bombay (TIH)',
    role: 'AI/ML Intern · BFSI / Fintech',
    points: [
      'Leading a team building a bank-statement pipeline — evaluating OCR and PDF parsing to structure data across bank formats, with transaction validation and NLP categorization.',
      'FastAPI services and analytics for income stability, recurring EMIs, cash flow, FOIR/DTI and fraud-risk indicators that support lending decisions.',
    ],
  },
  {
    when: 'Dec 2025 — Jan 2026',
    org: 'National Informatics Centre',
    role: 'AI/ML Intern · Government of India',
    points: [
      'Multi-stage validation pipeline combining YOLO detection and LLaVA vision-language models to structure, validate and flag anomalies across large volumes of employee image data.',
      'Rule-based data-quality and verification logic with structured reporting, tuned for offline, privacy-sensitive, government-grade deployment.',
    ],
  },
  {
    when: 'Jun 2025 — Oct 2025',
    org: 'Kloudineer Technologies',
    role: 'AI Research Intern · KloudStac',
    points: [
      'Researched generative AI and documented the Model Context Protocol (MCP) to improve agent interoperability and context-retrieval patterns in LLM apps and RAG pipelines.',
    ],
  },
];

export const SKILLS = [
  { label: 'AI / ML', items: 'Generative AI, LangChain, LangGraph, RAG, Voice agents, YOLO, LLaVA' },
  { label: 'Languages', items: 'Python, Java, JavaScript' },
  { label: 'Frontend & backend', items: 'React, Tailwind CSS, HTML, Bootstrap, Node.js, Express, FastAPI' },
  { label: 'Databases', items: 'SQL, MongoDB, Neo4j, Qdrant, FAISS' },
  { label: 'Tools', items: 'Git, GitHub, Docker, Postman, Vercel, Netlify, Render' },
  { label: 'Coursework', items: 'Data structures & algorithms, DBMS, Operating systems, Cloud computing' },
];

export const ACHIEVEMENTS = [
  { big: '3rd', text: 'Smart India Hackathon 2024 — Runner-up with Abhayam, an AI women-safety surveillance system.' },
  { big: 'Top 14', text: 'BharatGen GenAI Hackathon (DST, Govt. of India) — Parenthood AI, for parents of children with ADHD & autism.' },
  { big: 'Winner', text: 'CodeAthon 2025 Hackathon.', accent: true },
  { big: '10+', text: 'National hackathon finals.' },
  { big: '#651', text: 'TCS CodeVita Season 13 — Round 2 finalist, global rank.' },
  { big: 'Topper', text: 'Class topper in semesters 1, 2 and 5.' },
];

export const WRITING_TOPICS = ['RAG', 'HyDE', 'Reciprocal Rank Fusion', 'Parallel query retrieval', 'Chain-of-Thought', 'Step-Back prompting'];
