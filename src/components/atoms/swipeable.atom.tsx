import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableComponentProps} from '../interfaces/atom.interfaces.ts';

export const SwipeableComponent: React.FC<SwipeableComponentProps> = ({
  children,
  renderRightActions,
  friction,
  rightThreshold,
}) => {
  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={friction ? friction : 2}
      rightThreshold={rightThreshold ? rightThreshold : 40}>
      {children}
    </Swipeable>
  );
};
