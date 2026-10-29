import KMHeroWeb from './components/hero/KMHeroWeb.jsx';
import ThemeSwitch from './components/ThemeSwitch.jsx';
import useTheme from './useTheme.js';
import { ACHIEVEMENTS, EMAIL, EXPERIENCE, LINKS, NAV, PROJECTS, RESUME_URL, SKILLS, WRITING_TOPICS } from './data.js';

const PAD = 'clamp(20px,4vw,48px)';
const DIV = '2px solid var(--color-divider)';
const sectionStyle = { borderTop: '2px solid var(--color-text)', padding: '28px 0 72px', scrollMarginTop: 80 };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', borderTop: DIV, borderLeft: DIV };
const cellStyle = { padding: 24, borderRight: DIV, borderBottom: DIV, display: 'flex', flexDirection: 'column' };

function SectionHead({ n, title }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 48px', alignItems: 'baseline', marginBottom: 28 }}>
      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '0.08em', flex: '0 0 auto' }}>{n}</span>
      <h2 style={{ margin: 0, fontSize: 'clamp(36px,4.6vw,64px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{title}</h2>
    </div>
  );
}

function Header({ dark, onToggle }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--color-bg)', borderBottom: DIV }}>
      <nav style={{ maxWidth: 1440, margin: '0 auto', padding: `14px ${PAD}`, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <a href="#top" className="brand" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto' }}>
          <span style={{ width: 16, height: 16, background: 'var(--color-accent)', display: 'block' }}></span>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>Kamraan Mulani</span>
        </a>
        <div style={{ display: 'flex', gap: '8px 22px', flexWrap: 'wrap', flex: '0 1 auto', minWidth: 0, fontSize: 15, fontWeight: 600 }}>
          {NAV.map((l) => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
        </div>
        <ThemeSwitch isDark={dark} onToggle={onToggle} />
        <a className="btn btn-primary" href={RESUME_URL} download="Kamraan_Mulani_Resume.docx" style={{ whiteSpace: 'nowrap', flex: 'none' }}>Résumé ↓</a>
      </nav>
    </header>
  );
}

function Hero() {
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new Event('km-replay'));
  };
  const cta = { minWidth: 180, justifyContent: 'flex-start', padding: '12px 16px', fontSize: 15 };
  return (
    <section style={{ paddingTop: 'clamp(16px,2vw,28px)' }}>
      <h1 className="sr-only">Kamraan Mulani — AI/ML Engineer</h1>
      <div aria-hidden="true"><KMHeroWeb /></div>
      <div style={{ borderTop: DIV, display: 'flex', flexWrap: 'wrap', gap: '24px 48px', padding: '28px 0 56px', alignItems: 'flex-start' }}>
        <p style={{ flex: '2 1 520px', margin: 0, fontSize: 'clamp(22px,2.1vw,30px)', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em', textWrap: 'pretty' }}>
          AI/ML engineer building retrieval systems, voice agents and vision pipelines that ship. B.E. IT (AI/ML) at Vidyalankar Institute of Technology, Mumbai — CGPA 9.938, graduating 2027.
        </p>
        <div style={{ flex: '1 1 280px', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a className="btn btn-primary" href="#work" style={cta}>View work →</a>
          <a className="btn btn-secondary" href={`mailto:${EMAIL}`} style={cta}>Email me</a>
          <button className="btn btn-ghost" onClick={replay} style={{ padding: '12px 4px', fontSize: 15 }}>↻ Replay intro</button>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" style={sectionStyle}>
      <SectionHead n="01" title="Selected work" />
      {PROJECTS.map((p, i) => (
        <article key={p.title} className="row-hover" style={{ borderTop: DIV, borderBottom: i === PROJECTS.length - 1 ? DIV : undefined, padding: '28px 0', display: 'flex', flexWrap: 'wrap', gap: '20px 48px' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-neutral-700)' }}>{p.meta}</span>
            <h3 style={{ margin: 0, fontSize: 'clamp(26px,2.4vw,34px)', letterSpacing: '-0.02em' }}>{p.title}</h3>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{p.tagline}</span>
          </div>
          <p style={{ flex: '2 1 420px', margin: 0, fontSize: 17, lineHeight: 1.55, textWrap: 'pretty' }}>
            {p.body}
            {p.highlight && <> <strong style={{ color: 'var(--color-accent-700)' }}>{p.highlight}</strong></>}
          </p>
          <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map((t) => <span key={t} className="tag tag-neutral" style={{ fontSize: 13 }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.links.map((l) => <a key={l.label} className="btn btn-ghost" href={l.href} style={{ fontSize: 15 }}>{l.label}</a>)}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={sectionStyle}>
      <SectionHead n="02" title="Experience" />
      {EXPERIENCE.map((e, i) => (
        <div key={e.org} style={{ borderTop: DIV, borderBottom: i === EXPERIENCE.length - 1 ? DIV : undefined, padding: '28px 0', display: 'flex', flexWrap: 'wrap', gap: '16px 48px' }}>
          <div style={{ flex: '1 1 220px', fontSize: 15, fontWeight: 600, color: 'var(--color-neutral-700)' }}>{e.when}</div>
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h3 style={{ margin: 0, fontSize: 26, letterSpacing: '-0.02em' }}>{e.org}</h3>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{e.role}</span>
          </div>
          <ul style={{ flex: '2 1 460px', margin: 0, paddingLeft: 18, fontSize: 17, lineHeight: 1.55, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {e.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={sectionStyle}>
      <SectionHead n="03" title="Skills" />
      <div style={gridStyle}>
        {SKILLS.map((s) => (
          <div key={s.label} style={{ ...cellStyle, gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{s.label}</span>
            <span style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.4 }}>{s.items}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" style={sectionStyle}>
      <SectionHead n="04" title="Achievements" />
      <div style={gridStyle}>
        {ACHIEVEMENTS.map((a) => (
          <div key={a.big} style={{ ...cellStyle, gap: 10 }}>
            <span style={{ fontSize: 'clamp(48px,5vw,72px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', color: a.accent ? 'var(--color-accent)' : undefined }}>{a.big}</span>
            <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45 }}>{a.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" style={sectionStyle}>
      <SectionHead n="05" title="Writing" />
      <div style={{ borderTop: DIV, paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: '20px 48px', alignItems: 'flex-start' }}>
        <p style={{ flex: '1 1 360px', margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.45, textWrap: 'pretty' }}>
          Technical posts on Hashnode about the retrieval and prompting techniques behind modern GenAI systems.
        </p>
        <div style={{ flex: '2 1 480px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {WRITING_TOPICS.map((t) => <span key={t} className="tag tag-outline" style={{ fontSize: 15, padding: '8px 14px' }}>{t}</span>)}
        </div>
        <a className="btn btn-secondary" href={LINKS.hashnode} style={{ padding: '12px 16px', fontSize: 15 }}>Read on Hashnode →</a>
      </div>
    </section>
  );
}

function Contact() {
  const ink = 'var(--on-accent)';
  return (
    <section id="contact" style={{ background: 'var(--color-accent)', color: ink, scrollMarginTop: 60 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: `clamp(48px,7vw,104px) ${PAD} 40px`, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(48px,8vw,128px)', lineHeight: 0.95, letterSpacing: '-0.045em', maxWidth: '14ch', textWrap: 'balance' }}>Let’s build something that retrieves.</h2>
        <div style={{ borderTop: `2px solid ${ink}`, paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: '20px 48px', alignItems: 'baseline' }}>
          <a href={`mailto:${EMAIL}`} className="accent-link" style={{ flex: '2 1 420px', fontSize: 'clamp(22px,2.4vw,34px)', fontWeight: 800, letterSpacing: '-0.01em', wordBreak: 'break-word' }}>{EMAIL} →</a>
          <div style={{ display: 'flex', flex: '1 1 320px', flexWrap: 'wrap', gap: '12px 28px', fontSize: 18, fontWeight: 800 }}>
            <a href={LINKS.github} className="accent-link">GitHub</a>
            <a href={LINKS.linkedin} className="accent-link">LinkedIn</a>
            <a href={LINKS.leetcode} className="accent-link">LeetCode</a>
            <a href={LINKS.hashnode} className="accent-link">Hashnode</a>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px', fontSize: 15, fontWeight: 600, justifyContent: 'space-between' }}>
          <span>© 2026 Kamraan Mulani · Mumbai, India</span>
          <a href="#top" className="accent-link">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { dark, toggle, panelRef, label } = useTheme();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}>
      <div ref={panelRef} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--color-accent)', transform: 'translateX(-101%)', pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', padding: PAD }}>
        <span style={{ fontWeight: 800, fontSize: 'clamp(64px,12vw,200px)', lineHeight: 0.9, letterSpacing: '-0.05em', color: 'var(--on-accent)' }}>{label}</span>
      </div>
      <Header dark={dark} onToggle={toggle} />
      <main id="top" style={{ maxWidth: 1440, margin: '0 auto', padding: `0 ${PAD}` }}>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Achievements />
        <Writing />
      </main>
      <Contact />
    </div>
  );
}
