import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const updateStoredSize = () => {
      setSize({
        width: window.outerWidth,
        height: window.outerHeight,
      });
    };

    window.addEventListener('resize', updateStoredSize);
    updateStoredSize();

    return () => window.removeEventListener('resize', updateStoredSize);
  }, []);

  return size;
}

export default useWindowSize;
