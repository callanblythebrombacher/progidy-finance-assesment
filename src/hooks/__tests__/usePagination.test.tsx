import {renderHook} from '@testing-library/react-native';
import usePagination from '../usePagination.ts';

import {describe, it, expect} from '@jest/globals';

describe('usePagination hook', () => {
  it('should calculate correct from and to values based on page and itemsPerPage', () => {
    const tableRowsLength = 100; // Example table rows length
    const page = 2; // Example current page
    const {result, rerender} = renderHook(() =>
      usePagination(tableRowsLength, page),
    );

    expect(result.current.from).toBe(30); // Page 2, itemsPerPage 15
    expect(result.current.to).toBe(45); // Page 2, itemsPerPage 15

    // Rerender with different page and itemsPerPage values
    rerender({tableRowsLength, page: 3});

    expect(result.current.from).toBe(45); // Page 3, itemsPerPage 15
    expect(result.current.to).toBe(60); // Page 3, itemsPerPage 15

    // Rerender with different itemsPerPage value
    rerender({tableRowsLength, page: 3, itemsPerPage: 30});

    expect(result.current.from).toBe(90); // Page 3, itemsPerPage 30
    expect(result.current.to).toBe(100); // Page 3, itemsPerPage 30
  });

  it('should default to first page when page is negative', () => {
    const tableRowsLength = 100; // Example table rows length
    const {result} = renderHook(() => usePagination(tableRowsLength, -1));

    expect(result.current.from).toBe(0); // Page 0, itemsPerPage 15
    expect(result.current.to).toBe(15); // Page 0, itemsPerPage 15
  });
});
