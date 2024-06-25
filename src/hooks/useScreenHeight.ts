import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

const useScreenHeight = () => {
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight);

  useEffect(() => {
    const updateHeight = ({window: {height}}: any) => {
      setHeight(height);
    };

    Dimensions.addEventListener('change', updateHeight);
  }, []);

  return height;
};

export default useScreenHeight;
