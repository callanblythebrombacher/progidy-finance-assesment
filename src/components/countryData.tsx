import React, {useEffect, useState} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'react-native-paper';
import {countryThunk} from '../redux/thunk/country.thunk.ts';
import {AppDispatch, RootState} from '../redux/store.ts';
import {useDispatch, useSelector} from 'react-redux';

export function CountryData() {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch: AppDispatch = useDispatch();
  const countryData = useSelector(
    (state: RootState) => state.countryReducer.data,
  );
  const [state, setState] = useState<string | null>(null);

  const buttonPressedHandler = () => {
    dispatch(countryThunk());
  };

  useEffect(() => {
    if (countryData) {
      const countryDataJson = JSON.stringify(countryData, null, 2);
      setState(countryDataJson);
    }
  }, [countryData]);
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => buttonPressedHandler()}>
        Press me
      </Button>
      <Text>{state}</Text>
    </View>
  );
}
