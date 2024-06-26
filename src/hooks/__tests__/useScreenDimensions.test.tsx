import {renderHook} from '@testing-library/react-native';
import useScreenDimensions from '../useScreenDimensions.ts';

import {describe, jest, expect, it} from '@jest/globals';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({height: 800, width: 600}),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

describe('useScreenDimensions hook', () => {
  it('should update screen dimensions on change', () => {
    const {result} = renderHook(() => useScreenDimensions());

    expect(result.current.height).toBe(800);
    expect(result.current.width).toBe(600);
  });
});
