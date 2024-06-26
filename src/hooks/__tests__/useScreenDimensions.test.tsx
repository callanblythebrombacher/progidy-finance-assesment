import {renderHook} from '@testing-library/react-native';
import useScreenDimensions from '../useScreenDimensions.ts';
import {Dimensions, ScaledSize} from 'react-native';

import {describe, jest, expect, it, beforeEach} from '@jest/globals';

// Mock Dimensions
describe('useScreenDimensions hook', () => {
  const mockDimensions = {
    get: jest.fn().mockReturnValue({height: 800, width: 600} as ScaledSize),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  jest.spyOn(Dimensions, 'get').mockImplementation(mockDimensions.get);
  jest
    .spyOn(Dimensions, 'addEventListener')
    .mockImplementation(mockDimensions.addEventListener);

  it('should update screen dimensions on change', () => {
    const {result} = renderHook(() => useScreenDimensions());

    expect(result.current.height).toBe(800);
    expect(result.current.width).toBe(600);
  });

  it('should add event listener on mount', () => {
    renderHook(() => useScreenDimensions());

    expect(mockDimensions.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
