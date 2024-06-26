import React from 'react';
import {shallow} from 'enzyme';
import {FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {Autocomplete} from '../autocomplete.atom.tsx';

import {jest, describe, expect, beforeEach, afterEach, it} from '@jest/globals';

jest.mock('../src/hooks/useScreenDimensions', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({height: 800, width: 600}), // Mock useScreenDimensions hook return values
}));

describe('Autocomplete Component', () => {
  const mockAutocompleteData = [
    {listTitle: 'Item 1', onPress: jest.fn()},
    {listTitle: 'Item 2', onPress: jest.fn()},
    {listTitle: 'Item 3', onPress: jest.fn()},
  ];

  const mockOnItemPress = jest.fn();

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <Autocomplete
        autocompleteData={mockAutocompleteData}
        onItemPress={mockOnItemPress}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders FlatList with correct props', () => {
    const flatList = wrapper.find(FlatList);
    expect(flatList).toHaveLength(1);
    expect(flatList.prop('data')).toEqual(mockAutocompleteData);
    expect(flatList.prop('keyExtractor')).toBeInstanceOf(Function);
    expect(flatList.prop('renderItem')).toBeInstanceOf(Function);
  });

  it('calls onItemPress and item onPress functions when ListItem is pressed', () => {
    const listItem = wrapper.find(List.Item).first();
    listItem.simulate('press');
    expect(mockOnItemPress).toHaveBeenCalledWith('Item 1');
    expect(mockAutocompleteData[0].onPress).toHaveBeenCalled();
  });

  it('adjusts container height based on autocompleteData length', () => {
    // Initial height when autocompleteData is not empty
    expect(wrapper.find(View).prop('style')).toEqual([
      expect.objectContaining({height: 700}), // Adjusted height calculation based on mock screen dimensions
      expect.objectContaining({width: 600}),
    ]);

    // Simulate empty autocompleteData
    wrapper.setProps({autocompleteData: []});
    expect(wrapper.find(View).prop('style')).toEqual([
      expect.objectContaining({height: 0}),
      expect.objectContaining({width: 600}),
    ]);
  });
});
