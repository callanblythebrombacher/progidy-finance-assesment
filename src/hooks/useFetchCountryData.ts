import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {countryThunk} from '../redux/thunk/country.thunk';
import {RootState} from '../redux/store';
import {AppDispatch} from '../redux/store';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

const useFetchCountryData = (): NormalizedCountryArrayItem[] | null => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(countryThunk());
  }, [dispatch]);

  return useSelector((state: RootState) => state.countryReducer.data);
};

export default useFetchCountryData;
