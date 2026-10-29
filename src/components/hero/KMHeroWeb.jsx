import { useEffect, useRef, useState } from 'react';
import { CompositionContext, CUES, END } from './composition.jsx';
import KMPiece from './KMPiece.jsx';

// Live web runner for the KM hero composition — no video transport. Plays once, holds on the lockup.
export default function KMHeroWeb() {
  const box = useRef(null);
  const [T, setT] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => box.current && setScale(box.current.clientWidth / 1920));
    ro.observe(box.current);
    const onReplay = () => setRun((r) => r + 1);
    window.addEventListener('km-replay', onReplay);
    return () => { ro.disconnect(); window.removeEventListener('km-replay', onReplay); };
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(END); return; }
    let t = 0, last = null, raf;
    const tick = (now) => {
      if (last != null) t = Math.min(END, t + Math.min(0.05, (now - last) / 1000));
      last = now; setT(t);
      if (t < END) raf = requestAnimationFrame(tick);
    };
    setT(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  return (
    <div ref={box} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--color-bg)' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
        <CompositionContext.Provider value={{ T, CUES }}>
          <KMPiece guides noTop />
        </CompositionContext.Provider>
      </div>
    </div>
  );
}
