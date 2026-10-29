import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { animate, Easing, Shot, useComposition } from './composition.jsx';

const C = { bg: 'var(--color-bg, #f3f2f2)', ink: 'var(--color-text, #201e1d)', red: 'var(--color-accent, #ec3013)', red700: 'var(--color-accent-700, #ae1800)', n700: 'var(--color-neutral-700, #605d5d)', onRed: 'var(--on-accent, #201e1d)', rule: 'color-mix(in srgb, var(--color-text, #201e1d) 40%, transparent)', guide: 'color-mix(in srgb, var(--color-text, #201e1d) 12%, transparent)', edge: 'color-mix(in srgb, var(--color-text, #201e1d) 16%, transparent)' };
const F = '"Archivo", system-ui, sans-serif';
const X0 = 80, CW = 1760 / 7, R0 = 100, R1 = 390, R2 = 680, RB = 930, GS = 270;

const MOTION = {
  enter: (s, e, a = 0, b = 1) => animate({ from: a, to: b, start: s, end: e, ease: Easing.easeOutExpo }),
  draw: (s, e, a = 0, b = 1) => animate({ from: a, to: b, start: s, end: e, ease: Easing.easeInOutCubic }),
  pop: (s, e, a = 0, b = 1) => animate({ from: a, to: b, start: s, end: e, ease: Easing.easeOutBack }),
};

function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const NAME = 'KAMRAANMULANI'.split('');
const QTEXT = 'who is kamraan mulani?';
const PICKS = [['Docker', 3], ['Qdrant', 3], ['MongoDB', 0], ['RAG', 0], ['FastAPI', 4], ['LLaVA 13B', 4], ['Neo4j', 0], ['MCP', 0], ['Multilingual', 1], ['LangGraph', 0], ['Java', 1], ['ElevenLabs', 5], ['FAISS', 2]];
const OTHERS = ['Python', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'LangChain', 'OpenCV', 'YOLOv10', 'Whisper', 'Twilio', 'Groq', 'OpenAI', 'HyDE', 'RRF', 'CoT', 'OCR', 'NLP', 'SQL', 'FOIR/DTI', 'Postman', 'Vercel', 'Step-Back'];

const TOKENS = (() => {
  const r = rng(11), slots = [];
  for (let row = 0; row < 4; row++) for (let c = 0; c < 9; c++)
    slots.push({ x: 90 + c * 186 + (row % 2) * 30 + (r() - 0.5) * 60, y: 440 + row * 120 + (r() - 0.5) * 44 });
  const order = slots.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const list = [];
  PICKS.forEach(([w, ci], k) => list.push({ w, ci, pick: k, ...slots[order[k]] }));
  OTHERS.forEach((w, k) => list.push({ w, ci: -1, pick: -1, ...slots[order[13 + k]] }));
  list.forEach((t, i) => { t.i = i; t.appear = r(); t.ph = r() * 6.28; });
  return list;
})();

const EDGES = (() => {
  const seen = {}, out = [];
  TOKENS.forEach((a) => {
    let best = null, bd = 1e9;
    TOKENS.forEach((b) => { if (a === b) return; const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < bd) { bd = d; best = b; } });
    const key = Math.min(a.i, best.i) + '-' + Math.max(a.i, best.i);
    if (!seen[key]) { seen[key] = 1; out.push([a.i, best.i]); }
  });
  return out;
})();

const drift = (tk, T) => ({ dx: Math.sin(T * 0.7 + tk.ph) * 8, dy: Math.cos(T * 0.55 + tk.ph * 1.3) * 6 });
const abs = (x, y, extra) => ({ position: 'absolute', left: x, top: y, ...extra });

const REEL = [
  { n: '01', kicker: 'Experience — Mar 2026 → Present', big: 'IIT BOMBAY', size: 250, bg: C.red, fg: C.onRed, bigC: C.onRed, sub: 'AI/ML Intern, TIH IIT Bombay. Leading a bank-statement digitization pipeline: OCR, NLP categorization, FOIR/DTI and fraud-risk signals for lending.', meta: 'FastAPI · OCR · NLP · Fintech' },
  { n: '02', kicker: 'Experience — Dec 2025 → Jan 2026', big: 'NIC', size: 560, bg: C.ink, fg: C.bg, bigC: C.red, sub: 'National Informatics Centre, Government of India. YOLO + LLaVA validation pipeline for offline, privacy-sensitive deployment.', meta: 'YOLO · LLaVA · Python' },
  { n: '03', kicker: 'Open source — ragforge on npm', big: 'COUNT', size: 520, bg: C.red, fg: C.onRed, bigC: C.onRed, sub: 'npm downloads. Query expansion, hybrid semantic retrieval and reranking for production RAG.', meta: 'Node.js · LangChain · Qdrant' },
  { n: '04', kicker: 'Smart India Hackathon 2024', big: 'SIH ’24', size: 400, bg: C.ink, fg: C.bg, bigC: C.red, sub: '3rd Runner-up with Abhayam — AI-driven women-safety surveillance. Plus 10+ national hackathon finals.', meta: 'Computer vision · React Native' },
];
const CUT = 1.3;

const STATS = [
  { v: (p) => (9.938 * p).toFixed(3), suf: '', label: 'CGPA · B.E. IT (AI/ML)' },
  { v: (p) => String(Math.round(3 * p)).padStart(2, '0'), suf: '', label: 'AI/ML internships · IIT Bombay, NIC, KloudStac' },
  { v: (p) => String(Math.round(10 * p)), suf: '+', label: 'National hackathon finals' },
  { v: (p) => String(Math.round(1000 * p)), suf: '+', label: 'npm downloads · ragforge' },
];

function GridLayer({ T, CUES, guides }) {
  const top = MOTION.draw(0, 0.8)(T), bot = MOTION.draw(0.3, 1.1)(T);
  const nameRules = MOTION.draw(CUES.Retrieve + 0.9, CUES.Retrieve + 1.6)(T);
  return (
    <Fragment>
      {guides && Array.from({ length: 8 }, (_, k) => (
        <div key={k} style={abs(X0 + k * CW, R0, { width: 1, height: (RB - R0) * MOTION.draw(0.1 + k * 0.06, 0.9 + k * 0.06)(T), background: C.guide })}></div>
      ))}
      <div style={abs(0, R0 - 1, { width: 1920 * top, height: 2, background: C.rule })}></div>
      <div style={abs(1920 * (1 - bot), RB - 1, { width: 1920 * bot, height: 2, background: C.rule })}></div>
      <div style={abs(X0, R1 - 1, { width: 1760 * nameRules, height: 2, background: C.rule })}></div>
      <div style={abs(1840 - 1760 * nameRules, R2 - 1, { width: 1760 * nameRules, height: 2, background: C.rule })}></div>
    </Fragment>
  );
}

function TopBar({ T }) {
  const blink = Math.floor(T * 1.6) % 2 === 0;
  const items = [
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ width: 20, height: 20, background: C.red }}></div><span style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-0.01em' }}>KM</span></div>,
    <span>AI/ML Engineer</span>,
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 10, height: 10, background: C.red, opacity: blink ? 1 : 0.25 }}></div><span>Mumbai, India</span></div>,
  ];
  const cols = [0, 4, 6];
  return items.map((it, k) => {
    const p = MOTION.enter(1.0 + k * 0.08, 1.7 + k * 0.08)(T);
    return <div key={k} style={abs(X0 + cols[k] * CW + (k ? 14 : 0), 34, { fontSize: 22, fontWeight: 600, color: C.ink, opacity: p, transform: `translateY(${(1 - p) * 24}px)` })}>{it}</div>;
  });
}

function StatusBar({ T, CUES }) {
  const msgs = [
    { at: 0.9, txt: 'Indexing résumé.pdf — 36 chunks' },
    { at: CUES.Query + 0.2, txt: 'Embedding query → 1536-d vector' },
    { at: CUES.Retrieve, txt: 'Retrieved top-13 · cosine · reranked' },
    { at: CUES.Reel, txt: 'Streaming context' },
  ];
  let cur = null;
  msgs.forEach((m) => { if (T >= m.at) cur = m; });
  const hero = T >= CUES.Reel + 1;
  if (hero) {
    return (
      <Fragment>
        <div style={abs(X0, 976, { fontSize: 22, fontWeight: 600, color: C.ink })}>B.E. Information Technology (AI/ML) — Vidyalankar Institute of Technology, Mumbai · 2023–27</div>
        <div style={abs(X0 + 5 * CW + 14, 976, { display: 'flex', gap: 28, fontSize: 22, fontWeight: 800, color: C.ink })}>
          <span>GitHub</span><span>LinkedIn</span><span>LeetCode</span><span>Hashnode</span>
        </div>
      </Fragment>
    );
  }
  if (!cur) return null;
  const p = MOTION.enter(cur.at, cur.at + 0.4)(T);
  return (
    <div style={abs(X0, 976, { display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 600, color: C.ink, opacity: p, transform: `translateY(${(1 - p) * 20}px)` })}>
      <div style={{ width: 12, height: 12, background: C.red }}></div><span>{cur.txt}</span>
    </div>
  );
}

function QueryBlock({ T, CUES, qRef }) {
  const Q = CUES.Query, R = CUES.Retrieve;
  const kin = MOTION.enter(Q, Q + 0.5)(T), out = MOTION.draw(R + 0.85, R + 1.3)(T);
  const tp = MOTION.draw(Q + 0.4, Q + 1.7)(T);
  const typed = QTEXT.slice(0, Math.floor(tp * QTEXT.length + 0.001));
  const typing = tp > 0 && tp < 1;
  const caretOn = typing || Math.floor(T * 2.4) % 2 === 0;
  const line = MOTION.draw(Q + 0.1, Q + 0.8)(T);
  const ro = MOTION.enter(Q + 1.8, Q + 2.3)(T);
  return (
    <div style={abs(0, 0, { width: 1920, height: 400, opacity: kin * (1 - out), transform: `translateY(${-40 * out}px)` })}>
      <div style={abs(X0, 128, { display: 'flex', gap: 16, fontSize: 22, fontWeight: 600, color: C.n700 })}>
        <span style={{ color: C.ink, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Query</span><span>semantic search over résumé.pdf</span>
      </div>
      <div style={abs(X0 + 5 * CW + 14, 128, { fontSize: 22, fontWeight: 600, color: C.red700, opacity: ro })}>1536-d · cosine · top-k 13</div>
      <div style={abs(X0, 180, { fontSize: 76, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: C.ink, display: 'flex', alignItems: 'center', whiteSpace: 'pre' })}>
        <span>{typed}</span>
        <span style={{ display: 'inline-block', width: 34, height: 70, marginLeft: 8, background: C.red, opacity: caretOn ? 1 : 0 }}></span>
      </div>
      <span ref={qRef} style={abs(X0, 180, { fontSize: 76, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, visibility: 'hidden', whiteSpace: 'pre' })}>{QTEXT}</span>
      <div style={abs(X0, 300, { width: 1760 * line, height: 2, background: C.ink })}></div>
    </div>
  );
}

function TokenField({ T, CUES, charRefs, qx }) {
  const Q = CUES.Query, R = CUES.Retrieve;
  const dim = MOTION.draw(R + 0.2, R + 0.6)(T), gone = MOTION.draw(R + 1.2, R + 1.8)(T);
  const edgeOp = MOTION.draw(Q + 1.0, Q + 1.8)(T) * (1 - dim);
  const pos = TOKENS.map((tk) => { const d = drift(tk, T); return { x: tk.x + d.dx, y: tk.y + d.dy }; });
  const origin = { x: qx + 60, y: 215 };
  return (
    <Fragment>
      <svg width="1920" height="1080" style={abs(0, 0, { overflow: 'visible' })}>
        {EDGES.map(([a, b], k) => (
          <line key={'e' + k} x1={pos[a].x + 5} y1={pos[a].y + 11} x2={pos[b].x + 5} y2={pos[b].y + 11} stroke={C.edge} strokeWidth="1" opacity={edgeOp}></line>
        ))}
        {PICKS.map((_, k) => {
          const tb = R + 0.05 + k * 0.05;
          const p = MOTION.draw(tb, tb + 0.35)(T);
          const fade = 1 - MOTION.draw(R + 1.0 + k * 0.07, R + 1.3 + k * 0.07)(T);
          const tx = pos[k].x + 5, ty = pos[k].y + 11;
          return <line key={'b' + k} x1={origin.x} y1={origin.y} x2={origin.x + (tx - origin.x) * p} y2={origin.y + (ty - origin.y) * p} stroke={C.red} strokeWidth="2" opacity={p > 0 ? fade : 0}></line>;
        })}
      </svg>
      {TOKENS.map((tk, i) => {
        const a0 = Q + 0.5 + tk.appear * 1.2;
        const op = MOTION.enter(a0, a0 + 0.45)(T), sc = MOTION.pop(a0, a0 + 0.45, 0.4, 1)(T);
        const isPick = tk.pick >= 0;
        const hit = isPick && T >= R + 0.4 + tk.pick * 0.05;
        const t0 = R + 1.0 + tk.pick * 0.07;
        const lifted = isPick && T >= t0;
        const restOp = isPick ? 1 - MOTION.draw(t0, t0 + 0.3)(T) : (1 - 0.8 * dim) * (1 - gone);
        const pre = isPick ? tk.w.slice(0, tk.ci) : tk.w;
        const ch = isPick ? tk.w[tk.ci] : '';
        const post = isPick ? tk.w.slice(tk.ci + 1) : '';
        return (
          <div key={i} style={abs(tk.x, tk.y, { display: 'flex', alignItems: 'center', gap: 10, transform: `translate(${pos[i].x - tk.x}px,${pos[i].y - tk.y}px) scale(${sc})`, transformOrigin: '0 50%', opacity: op, whiteSpace: 'pre' })}>
            <div style={{ width: 10, height: 10, background: hit ? C.red : C.ink, opacity: restOp }}></div>
            <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, color: C.ink }}>
              <span style={{ opacity: restOp }}>{pre}</span>
              {isPick && <span ref={(el) => (charRefs.current[tk.pick] = el)} style={{ color: lifted ? 'transparent' : hit ? C.red : C.ink, fontWeight: hit ? 800 : 600 }}>{ch}</span>}
              {isPick && <span style={{ opacity: restOp }}>{post}</span>}
            </div>
            {isPick && (
              <div style={abs(0, -30, { fontSize: 18, fontWeight: 800, color: C.red700, opacity: (hit ? MOTION.enter(R + 0.4 + tk.pick * 0.05, R + 0.7 + tk.pick * 0.05)(T) : 0) * restOp })}>{(0.97 - tk.pick * 0.013).toFixed(2)}</div>
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

function Glyphs({ T, CUES, meas, nameX }) {
  const R = CUES.Retrieve, s0 = 22 / GS;
  return NAME.map((ch, i) => {
    const tk = TOKENS[i];
    const t0 = R + 1.0 + i * 0.07, t1 = t0 + 0.75;
    const col = i < 7 ? i : i - 7, top = (i < 7 ? R0 : R1) + 12;
    const left = X0 + 10 + (nameX[i] != null ? nameX[i] : col * CW);
    const off = meas[i] || { x: 20 + tk.ci * 12.6, y: 0 };
    const d = drift(tk, T);
    const sx = tk.x + d.dx + off.x, sy = tk.y + d.dy + off.y;
    const p = MOTION.draw(t0, t1)(T);
    const s = MOTION.pop(t0, t1, s0, 1)(T);
    const tx = (sx - left) * (1 - p), ty = (sy - top) * (1 - p) - Math.sin(Math.PI * p) * 180;
    const rot = Math.sin(Math.PI * p) * (i % 2 ? 26 : -26);
    return (
      <div key={i} style={abs(left, top, { fontSize: GS, fontWeight: 800, lineHeight: 1, color: T > t1 + 0.1 ? C.ink : C.red, transformOrigin: '0 0', transform: `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${s})`, opacity: T >= t0 ? 1 : 0 })}>{ch}</div>
    );
  });
}

function RedCell({ T, CUES }) {
  const R = CUES.Retrieve;
  const fill = MOTION.draw(R + 2.25, R + 2.7)(T), txt = MOTION.enter(R + 2.6, R + 3.1)(T);
  const blink = Math.floor(T * 2.4) % 2 === 0;
  return (
    <div style={abs(X0 + 6 * CW + 1, R1 + 1, { width: CW - 1, height: R2 - R1 - 2 })}>
      <div style={abs(0, 0, { width: '100%', height: '100%', background: C.red, transformOrigin: '0 50%', transform: `scaleX(${fill})` })}></div>
      <div style={abs(22, 22, { fontSize: 44, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em', color: C.onRed, opacity: txt, transform: `translateY(${(1 - txt) * 30}px)` })}>
        AI/ML<br />Engineer<span style={{ display: 'inline-block', width: 20, height: 36, marginLeft: 6, background: C.onRed, opacity: blink ? 1 : 0 }}></span>
      </div>
      <div style={abs(22, 190, { width: CW - 44, fontSize: 22, fontWeight: 800, lineHeight: 1.2, color: C.onRed, opacity: MOTION.enter(R + 2.8, R + 3.2)(T) })}>RAG · Voice agents · Vision</div>
    </div>
  );
}

function StatsBand({ T, CUES }) {
  const H = CUES.Hero;
  return (
    <Shot from={CUES.Reel + 0.5} to={CUES.Wipe + 0.45}>
      <div style={abs(0, R2 + 1, { width: 1920, height: RB - R2 - 2, background: C.bg })}></div>
      {STATS.map((st, k) => {
        const s = H + 0.35 + k * 0.12;
        const cnt = MOTION.enter(s, s + 1.5)(T), rev = MOTION.enter(s, s + 0.5)(T);
        const sep = MOTION.draw(H + 0.2 + k * 0.06, H + 0.8 + k * 0.06)(T);
        return (
          <div key={k} style={abs(X0 + k * 440, R2 + 1, { width: 440, height: RB - R2 - 2 })}>
            {k > 0 && <div style={abs(-1, 0, { width: 2, height: (RB - R2 - 2) * sep, background: C.rule })}></div>}
            <div style={abs(k ? 24 : 0, 26, { overflow: 'hidden', height: 124 })}>
              <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: C.ink, transform: `translateY(${(1 - rev) * 124}px)` }}>
                {st.v(cnt)}<span style={{ color: C.red }}>{st.suf}</span>
              </div>
            </div>
            <div style={abs(k ? 24 : 0, 172, { width: 380, fontSize: 22, fontWeight: 600, lineHeight: 1.3, color: C.n700, opacity: MOTION.enter(s + 0.2, s + 0.7)(T) })}>{st.label}</div>
          </div>
        );
      })}
    </Shot>
  );
}

function Cut({ T, start, end, d }) {
  const lt = T - start;
  const k = MOTION.enter(start, start + 0.4)(T);
  const big = d.big === 'COUNT' ? Math.round(MOTION.enter(start + 0.1, start + 1.0, 0, 1000)(T)) + '+' : d.big;
  const gTop = 475 - d.size * 0.46;
  return (
    <Shot from={start} to={end}>
      <div style={abs(0, 0, { width: 1920, height: 1080, background: d.bg, color: d.fg, overflow: 'hidden' })}>
        <div style={abs(X0, 70, { fontSize: 24, fontWeight: 800, opacity: k, transform: `translateY(${(1 - k) * 30}px)` })}>{d.n} / 04</div>
        <div style={abs(X0 + 2 * CW + 14, 70, { fontSize: 24, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: k, transform: `translateY(${(1 - k) * 30}px)` })}>{d.kicker}</div>
        <div style={abs(X0, 129, { width: 1760 * MOTION.draw(start, start + 0.5)(T), height: 2, background: d.fg })}></div>
        <div style={abs(X0 - 10, gTop, { overflow: 'hidden', height: d.size * 0.94, width: 1840 })}>
          <div style={{ fontSize: d.size, fontWeight: 800, lineHeight: 0.94, letterSpacing: '-0.045em', color: d.bigC, whiteSpace: 'nowrap', transform: `translate(${-lt * 50}px,${MOTION.enter(start, start + 0.5, d.size, 0)(T)}px)` }}>{big}</div>
        </div>
        <div style={abs(X0, 819, { width: 1760 * MOTION.draw(start + 0.1, start + 0.6)(T), height: 2, background: d.fg })}></div>
        <div style={abs(X0, 852, { width: 1080, fontSize: 32, fontWeight: 600, lineHeight: 1.25, textWrap: 'pretty', opacity: MOTION.enter(start + 0.15, start + 0.6)(T) })}>{d.sub}</div>
        <div style={abs(X0 + 5 * CW + 14, 852, { fontSize: 24, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: MOTION.enter(start + 0.25, start + 0.7)(T) })}>{d.meta}</div>
      </div>
    </Shot>
  );
}

function Reel({ T, CUES }) {
  const S = CUES.Reel, H = CUES.Hero;
  const y = T < H ? MOTION.enter(S - 0.05, S + 0.4, 1080, 0)(T) : MOTION.draw(H, H + 0.5, 0, -1080)(T);
  return (
    <Shot from={S - 0.1} to={H + 0.6}>
      <div style={abs(0, 0, { width: 1920, height: 1080, transform: `translateY(${y}px)` })}>
        {REEL.map((d, k) => <Cut key={k} T={T} d={d} start={S + k * CUT} end={k === 3 ? H + 0.6 : S + (k + 1) * CUT}></Cut>)}
      </div>
    </Shot>
  );
}

function Wipe({ T, CUES }) {
  const Wp = CUES.Wipe;
  const x = T < Wp + 0.45 ? MOTION.draw(Wp, Wp + 0.45, -1920, 0)(T) : MOTION.draw(Wp + 0.55, Wp + 1.0, 0, 1920)(T);
  return <div style={abs(0, 0, { width: 1920, height: 1080, background: C.red, transform: `translateX(${x}px)` })}></div>;
}

export default function KMPiece({ guides, noTop }) {
  const { T, CUES } = useComposition();
  const charRefs = useRef([]), qRef = useRef(null), nameRefs = useRef([]);
  const [meas, setMeas] = useState({ c: [], q: 960, n: [] });
  useLayoutEffect(() => {
    const m = () => setMeas({ c: charRefs.current.map((el) => (el ? { x: el.offsetLeft, y: el.offsetTop } : null)), q: qRef.current ? qRef.current.offsetWidth : 960, n: nameRefs.current.map((el) => (el ? el.offsetLeft : null)) });
    m();
    if (document.fonts) document.fonts.ready.then(m);
    const id = setTimeout(m, 800);
    return () => clearTimeout(id);
  }, []);
  const cam = 1 + 0.02 * MOTION.draw(CUES.Hero + 0.4, CUES.Wipe)(T);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.bg, fontFamily: F, color: C.ink, overflow: 'hidden' }}>
      <Shot from={0} to={CUES.Wipe + 0.45}>
        <div style={abs(0, 0, { width: 1920, height: 1080, transform: `scale(${cam})`, transformOrigin: '50% 45%' })}>
          <GridLayer T={T} CUES={CUES} guides={guides}></GridLayer>
          {!noTop && <TopBar T={T}></TopBar>}
          <StatusBar T={T} CUES={CUES}></StatusBar>
          <Shot from={CUES.Query} to={CUES.Retrieve + 1.4}><QueryBlock T={T} CUES={CUES} qRef={qRef}></QueryBlock></Shot>
          <Shot from={CUES.Query} to={CUES.Retrieve + 2.4}><TokenField T={T} CUES={CUES} charRefs={charRefs} qx={X0 + meas.q}></TokenField></Shot>
          <RedCell T={T} CUES={CUES}></RedCell>
          <StatsBand T={T} CUES={CUES}></StatsBand>
          {['KAMRAAN', 'MULANI'].map((w, r) => (
            <div key={'m' + r} style={abs(0, 0, { fontSize: GS, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', visibility: 'hidden', whiteSpace: 'pre' })}>
              {w.split('').map((ch, j) => <span key={j} ref={(el) => (nameRefs.current[r * 7 + j] = el)}>{ch}</span>)}
            </div>
          ))}
          <Glyphs T={T} CUES={CUES} meas={meas.c} nameX={meas.n}></Glyphs>
        </div>
      </Shot>
      <Reel T={T} CUES={CUES}></Reel>
      <Wipe T={T} CUES={CUES}></Wipe>
    </div>
  );
}
