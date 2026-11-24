import { useState, useEffect } from 'react';

/**
 * Smoothly counts up from 0 to `target` using requestAnimationFrame and ease-out cubic easing.
 * Immediately resets to 0 when `isActive` becomes false.
 */
export function useCountUp(target, isActive = true, duration = 900, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setValue(0);
      return;
    }

    let rafId = null;
    let timeoutId = null;
    let startTime = null;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(animate);
      }, delay);
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, isActive, duration, delay]);

  return isActive ? value : 0;
}

export default useCountUp;
