const SunPath = 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41';
const MoonPath = 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z';

const Sun = ({ size, stroke }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="square">
    <circle cx="12" cy="12" r="4"></circle><path d={SunPath}></path>
  </svg>
);
const Moon = ({ size, stroke }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="square">
    <path d={MoonPath}></path>
  </svg>
);

export default function ThemeSwitch({ isDark, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={onToggle}
      className="theme-switch"
      style={{ position: 'relative', width: 64, height: 32, padding: 0, border: '2px solid var(--color-text)', background: 'transparent', cursor: 'pointer', flex: 'none', display: 'block' }}
    >
      <span style={{ position: 'absolute', left: 7, top: 7, color: 'var(--color-neutral-500)' }}><Sun size={14} stroke={2.4} /></span>
      <span style={{ position: 'absolute', right: 7, top: 7, color: 'var(--color-neutral-500)' }}><Moon size={14} stroke={2.4} /></span>
      <span style={{ position: 'absolute', left: 3, top: 3, width: 22, height: 22, background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-accent)', transition: 'transform 420ms cubic-bezier(.7,0,.2,1)', transform: isDark ? 'translateX(32px)' : 'translateX(0px)' }}>
        {isDark ? <Moon size={12} stroke={3} /> : <Sun size={12} stroke={3} />}
      </span>
    </button>
  );
}
