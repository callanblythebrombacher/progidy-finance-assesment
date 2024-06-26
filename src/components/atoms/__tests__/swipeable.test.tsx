import React from 'react';
import {shallow} from 'enzyme';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableComponent} from '../swipeable.atom.tsx';

import {describe, beforeEach, afterEach, jest, it, expect} from '@jest/globals';

describe('SwipeableComponent Atom', () => {
  const mockChildren = <div>Swipeable Content</div>;
  const mockRenderRightActions = () => <div>Right Actions</div>;
  const mockFriction = 2;
  const mockRightThreshold = 40;

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <SwipeableComponent
        renderRightActions={mockRenderRightActions}
        friction={mockFriction}
        rightThreshold={mockRightThreshold}>
        {mockChildren}
      </SwipeableComponent>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Swipeable component with correct props', () => {
    const swipeable = wrapper.find(Swipeable);
    expect(swipeable).toHaveLength(1);
    expect(swipeable.prop('renderRightActions')).toBe(mockRenderRightActions);
    expect(swipeable.prop('friction')).toBe(mockFriction);
    expect(swipeable.prop('rightThreshold')).toBe(mockRightThreshold);
  });

  it('renders children inside Swipeable component', () => {
    expect(wrapper.contains(mockChildren)).toBe(true);
  });
});
