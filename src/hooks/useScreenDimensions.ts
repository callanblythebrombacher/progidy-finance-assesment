import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

interface ScreenDimensions {
  height: number;
  width: number;
}

/**
 * Custom hook to fetch and monitor screen dimensions.
 * @returns An object containing current screen height and width.
 */
const useScreenDimensions = (): ScreenDimensions => {
  // Initialize state with current screen dimensions
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>({
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  });

  useEffect(() => {
    // Function to update screen dimensions on screen rotation or resize
    const updateScreenDimensions = ({window: {height, width}}: any) => {
      setScreenDimensions({height, width});
    };

    // Add event listener to listen for screen dimension changes
    Dimensions.addEventListener('change', updateScreenDimensions);
  }, []); // Empty dependency array ensures effect runs only once on component mount

  return screenDimensions;
};

export default useScreenDimensions;
