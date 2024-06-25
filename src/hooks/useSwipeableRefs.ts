import {useRef} from 'react';
import {SwipeableComponent} from '../components/atoms/swipeable.atom.tsx';

const useSwipeableRefs = (length: number) => {
  const refsArray = useRef<
    (React.ElementRef<typeof SwipeableComponent> | null)[]
  >([]);

  return refsArray;
};

export default useSwipeableRefs;
