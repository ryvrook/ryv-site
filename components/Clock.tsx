'use client';

import { useEffect, useState } from 'react';

// Empty until mounted so server and client markup agree.
export function Clock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const set = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, '0');
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}`);
    };
    set();
    const tick = setInterval(set, 15000);
    return () => clearInterval(tick);
  }, []);
  return <span>{time || '--:--'}</span>;
}
