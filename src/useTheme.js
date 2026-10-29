import { useCallback, useEffect, useRef, useState } from 'react';

function initialDark() {
  try {
    const v = localStorage.getItem('km-theme');
    if (v) return v === 'dark';
  } catch (e) {}
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function apply(dark) {
  const root = document.documentElement;
  if (dark) root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  try { localStorage.setItem('km-theme', dark ? 'dark' : 'light'); } catch (e) {}
}

// Theme state plus the full-screen accent panel that wipes across on toggle.
export default function useTheme() {
  const panelRef = useRef(null);
  const busy = useRef(false);
  const [dark, setDark] = useState(initialDark);
  const [label, setLabel] = useState('Dark.');

  useEffect(() => { apply(dark); }, [dark]);

  const toggle = useCallback(() => {
    if (busy.current) return;
    const next = !dark, el = panelRef.current;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || !el.animate || reduce) { setDark(next); return; }
    busy.current = true;
    setLabel(next ? 'Dark.' : 'Light.');
    const ease = 'cubic-bezier(.7,0,.2,1)';
    el.animate([{ transform: 'translateX(-101%)' }, { transform: 'translateX(0)' }], { duration: 380, easing: ease, fill: 'forwards' }).finished
      .then(() => {
        setDark(next);
        return el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }], { duration: 420, delay: 120, easing: ease, fill: 'forwards' }).finished;
      })
      .then(() => { el.getAnimations().forEach((a) => a.cancel()); busy.current = false; })
      .catch(() => { setDark(next); busy.current = false; });
  }, [dark]);

  return { dark, toggle, panelRef, label };
}
