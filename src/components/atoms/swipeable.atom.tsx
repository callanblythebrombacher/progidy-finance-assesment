import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableComponentProps} from '../../interfaces/atom.interfaces.ts'; // Remove '.ts' extension

export const SwipeableComponent = React.forwardRef<
  any,
  SwipeableComponentProps
>(({children, renderRightActions, friction, rightThreshold}, ref) => {
  return (
    <Swipeable
      ref={ref}
      renderRightActions={renderRightActions}
      friction={friction ?? 2}
      rightThreshold={rightThreshold ?? 40}>
      {children}
    </Swipeable>
  );
});
