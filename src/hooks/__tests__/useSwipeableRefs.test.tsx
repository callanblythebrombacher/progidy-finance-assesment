import {renderHook} from '@testing-library/react-native';
import useSwipeableRefs from '../useSwipeableRefs.ts';

import {describe, it, expect} from '@jest/globals';

describe('useSwipeableRefs hook', () => {
  it('should initialize with empty refs array', () => {
    const {result} = renderHook(() => useSwipeableRefs());

    expect(result.current.current.length).toBe(0);
  });
});
