import 'react-native-gesture-handler/jestSetup';

// Mock modules that are not supported by Jest
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Swipeable to avoid native code execution
jest.mock('react-native-gesture-handler', () => {
  const actualGestureHandler = jest.requireActual(
    'react-native-gesture-handler',
  );
  return {
    ...actualGestureHandler,
    Swipeable: jest.fn().mockImplementation(({children}) => children),
  };
});
