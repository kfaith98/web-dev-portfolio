import { useState, useEffect } from 'react';

// Returns true once `active` has stayed true for `delay` ms
export function useSlowHint(active, delay = 5000) {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => setIsSlow(true), delay);

    return () => {
      clearTimeout(timer);
      setIsSlow(false);
    };
  }, [active, delay]);

  return isSlow;
}