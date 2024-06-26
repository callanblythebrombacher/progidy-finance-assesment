import React from 'react';
import {render} from '@testing-library/react-native';
import {SwipeableComponent} from '../swipeable.atom';

import {describe, beforeEach, afterEach, jest, it, expect} from '@jest/globals';

describe('SwipeableComponent Atom', () => {
  const mockChildren = <div>Swipeable Content</div>;
  const mockRenderRightActions = () => <div>Right Actions</div>;
  const mockFriction = 2;
  const mockRightThreshold = 40;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(
      <SwipeableComponent
        renderRightActions={mockRenderRightActions}
        friction={mockFriction}
        rightThreshold={mockRightThreshold}>
        {mockChildren}
      </SwipeableComponent>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders Swipeable component with correct props', () => {
    const {getByTestId} = render(
      <SwipeableComponent
        renderRightActions={mockRenderRightActions}
        friction={mockFriction}
        rightThreshold={mockRightThreshold}>
        {mockChildren}
      </SwipeableComponent>,
    );

    const swipeable = getByTestId('swipeable-component');
    expect(swipeable.props.renderRightActions).toBe(mockRenderRightActions);
    expect(swipeable.props.friction).toBe(mockFriction);
    expect(swipeable.props.rightThreshold).toBe(mockRightThreshold);
  });

  it('renders children inside Swipeable component', () => {
    const {getByText} = render(
      <SwipeableComponent
        renderRightActions={mockRenderRightActions}
        friction={mockFriction}
        rightThreshold={mockRightThreshold}>
        {mockChildren}
      </SwipeableComponent>,
    );

    const swipeableContent = getByText('Swipeable Content');
    expect(swipeableContent).toBeTruthy();
  });
});
