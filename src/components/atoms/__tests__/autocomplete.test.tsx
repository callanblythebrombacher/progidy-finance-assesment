import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Autocomplete} from '../autocomplete.atom';

import {jest, describe, expect, beforeEach, afterEach, it} from '@jest/globals';

const mockDefault = jest.fn().mockReturnValue({height: 800, width: 600});
jest.mock('../../../hooks/useScreenDimensions', () => ({
  __esModule: true,
  default: mockDefault, // Mock useScreenDimensions hook return values
}));

describe('Autocomplete Component', () => {
  const mockAutocompleteData = [
    {listTitle: 'Item 1', onPress: jest.fn()},
    {listTitle: 'Item 2', onPress: jest.fn()},
    {listTitle: 'Item 3', onPress: jest.fn()},
  ];

  const mockOnItemPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(
      <Autocomplete
        autocompleteData={mockAutocompleteData}
        onItemPress={mockOnItemPress}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders FlatList with correct props', () => {
    const {getByTestId} = render(
      <Autocomplete
        autocompleteData={mockAutocompleteData}
        onItemPress={mockOnItemPress}
      />,
    );

    const flatList = getByTestId('autocomplete-flatlist');
    expect(flatList).toBeTruthy();
    expect(flatList.props.data).toEqual(mockAutocompleteData);
    expect(flatList.props.keyExtractor).toBeInstanceOf(Function);
    expect(flatList.props.renderItem).toBeInstanceOf(Function);
  });

  it('calls onItemPress and item onPress functions when ListItem is pressed', () => {
    const {getAllByTestId} = render(
      <Autocomplete
        autocompleteData={mockAutocompleteData}
        onItemPress={mockOnItemPress}
      />,
    );

    const listItem = getAllByTestId('autocomplete-list-item')[0];
    fireEvent.press(listItem);

    expect(mockOnItemPress).toHaveBeenCalledWith('Item 1');
    expect(mockAutocompleteData[0].onPress).toHaveBeenCalled();
  });

  it('adjusts container height based on autocompleteData length', () => {
    const {getByTestId, rerender} = render(
      <Autocomplete
        autocompleteData={mockAutocompleteData}
        onItemPress={mockOnItemPress}
      />,
    );

    const container = getByTestId('autocomplete-container');
    expect(container.props.style).toEqual([
      expect.objectContaining({height: 700}), // Adjusted height calculation based on mock screen dimensions
      expect.objectContaining({width: 600}),
    ]);

    // Simulate empty autocompleteData
    rerender(
      <Autocomplete autocompleteData={[]} onItemPress={mockOnItemPress} />,
    );
    expect(container.props.style).toEqual([
      expect.objectContaining({height: 0}),
      expect.objectContaining({width: 600}),
    ]);
  });
});
