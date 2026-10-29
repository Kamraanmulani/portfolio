import { createContext, useContext } from 'react';

// Scene timeline for the hero composition (seconds).
export const SCENES = [['Grid', 2], ['Query', 3], ['Retrieve', 3], ['Reel', 5.2], ['Hero', 5], ['Wipe', 1]];
export const CUES = {};
let acc = 0;
SCENES.forEach(([n, d]) => { CUES[n] = acc; acc += d; });
// Plays once, then holds on the lockup.
export const END = CUES.Hero + 4.8;

export const Easing = {
  linear: (t) => t,
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};

export const animate = ({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) => (t) =>
  t <= start ? from : t >= end ? to : from + (to - from) * ease((t - start) / (end - start));

export const CompositionContext = createContext({ T: 0, CUES });
export const useComposition = () => useContext(CompositionContext);

export function Shot({ from, to, children }) {
  const { T } = useContext(CompositionContext);
  return <div style={{ display: T >= from && T < to ? 'contents' : 'none' }}>{children}</div>;
}
