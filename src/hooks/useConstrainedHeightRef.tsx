import { RefObject, useEffect, useRef } from 'react';

import useWindowSize from './useWindowSize';

function useConstrainedHeightRef<RefType extends HTMLElement>(
  initialValue: RefType | null,
  deps: unknown[] = [],
): RefObject<RefType> {
  const windowSize = useWindowSize();
  const elementRef = useRef<RefType>(initialValue);

  useEffect(() => {
    if (!elementRef.current || !windowSize.innerHeight) return;

    const element = elementRef.current;

    const clearHeightStyles = () => {
      element.style.height = '';
    };

    const adaptStylesToAvailableHeight = () => {
      const expandedHeight = element.scrollHeight;

      const clientRect = element.getBoundingClientRect();
      const maxHeightAvailable = windowSize.innerHeight - clientRect.top;

      element.style.height = `${Math.min(
        expandedHeight,
        maxHeightAvailable,
      )}px`;
    };

    clearHeightStyles();
    requestAnimationFrame(adaptStylesToAvailableHeight);
  }, [windowSize.innerHeight, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return elementRef;
}

export default useConstrainedHeightRef;
