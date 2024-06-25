import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

interface ScreenDimensions {
  height: number;
  width: number;
}

const useScreenDimensions = (): ScreenDimensions => {
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>({
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  });

  useEffect(() => {
    const updateScreenDimensions = ({window: {height, width}}: any) => {
      setScreenDimensions({height, width});
    };

    Dimensions.addEventListener('change', updateScreenDimensions);
  }, []);

  return screenDimensions;
};

export default useScreenDimensions;
