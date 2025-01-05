'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const result = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setValue(event.matches);
    result.addEventListener('change', onChange);
    setValue(result.matches);
    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
