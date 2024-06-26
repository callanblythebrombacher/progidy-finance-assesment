import {renderHook, act} from '@testing-library/react-native';
import useAutocomplete from '../useAutocomplete.ts';

import {describe, it, jest, expect} from '@jest/globals';

describe('useAutocomplete hook', () => {
  it('should update autocomplete data when search query changes', () => {
    const setSearchQuery = jest.fn();
    const searchData = [
      {listTitle: 'United States', onPress: jest.fn()},
      {listTitle: 'United Kingdom', onPress: jest.fn()},
      {listTitle: 'Canada', onPress: jest.fn()},
    ];
    const {result, rerender} = renderHook(() =>
      useAutocomplete(
        setSearchQuery,
        'Uni',
        searchData,
        1,
        null,
        jest.fn(),
        jest.fn(),
      ),
    );

    // Initial render
    expect(result.current.autoCompleteData).toEqual([
      {listTitle: 'United States', onPress: expect.any(Function)},
      {listTitle: 'United Kingdom', onPress: expect.any(Function)},
      {listTitle: 'Canada', onPress: expect.any(Function)},
    ]);

    // Change search query to filter 'United' items
    act(() => {
      rerender();
    });

    expect(result.current.autoCompleteData).toEqual([
      {listTitle: 'United States', onPress: expect.any(Function)},
      {listTitle: 'United Kingdom', onPress: expect.any(Function)},
    ]);
  });

  it('should handle item selection and clear autocomplete data', () => {
    const setSearchQuery = jest.fn();
    const handleItemSelection = jest.fn();
    const searchData = [
      {listTitle: 'United States', onPress: jest.fn()},
      {listTitle: 'United Kingdom', onPress: jest.fn()},
      {listTitle: 'Canada', onPress: jest.fn()},
    ];
    const {result} = renderHook(() =>
      useAutocomplete(
        setSearchQuery,
        'Uni',
        searchData,
        1,
        null,
        jest.fn(),
        jest.fn(),
      ),
    );

    // Select an item 'United States'
    act(() => {
      result.current.handleItemSelection('United States');
    });

    expect(setSearchQuery).toHaveBeenCalledWith('United States');
    expect(result.current.autoCompleteData).toEqual([]);
  });
});
