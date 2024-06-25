import React, {useRef} from 'react';
import {SwipeableComponent} from '../components/atoms/swipeable.atom.tsx';

/**
 * Custom hook to manage an array of SwipeableComponent refs.
 * @returns A useRef instance initialized with an array of SwipeableComponent refs.
 */
const useSwipeableRefs = () => {
  // Initialize a useRef with an empty array
  const refsArray = useRef<
    (React.ElementRef<typeof SwipeableComponent> | null)[]
  >([]);

  return refsArray;
};

export default useSwipeableRefs;
