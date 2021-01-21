import { useEffect, useState } from 'react';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(() => {
    const updateStoredSize = () => {
      setSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateStoredSize);
    updateStoredSize();

    return () => window.removeEventListener('resize', updateStoredSize);
  }, []);

  return size;
}

export default useWindowSize;
