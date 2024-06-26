import {renderHook, act} from '@testing-library/react-native';
import useSearch from '../useSearch.ts';
import {it, describe, expect} from '@jest/globals';
describe('useSearch hook', () => {
  it('should initialize with initial query', () => {
    const {result} = renderHook(() => useSearch('initial'));

    expect(result.current.searchQuery).toBe('initial');
  });

  it('should update search query', () => {
    const {result} = renderHook(() => useSearch(''));

    act(() => {
      result.current.handleSearch('new query');
    });

    expect(result.current.searchQuery).toBe('new query');
  });

  it('should clear search query', () => {
    const {result} = renderHook(() => useSearch('initial'));

    act(() => {
      result.current.handleClearInput();
    });

    expect(result.current.searchQuery).toBe('');
  });
});
