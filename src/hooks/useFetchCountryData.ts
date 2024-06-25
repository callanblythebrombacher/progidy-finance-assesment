import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {countryThunk} from '../redux/thunk/country.thunk';
import {RootState} from '../redux/store';
import {AppDispatch} from '../redux/store';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

/**
 * Custom hook to fetch country data from Redux store using a thunk.
 * @returns Normalized array of country data or null if data is not available.
 */
const useFetchCountryData = (): NormalizedCountryArrayItem[] | null => {
  const dispatch: AppDispatch = useDispatch(); // Get dispatch function from Redux store

  // Use useEffect to dispatch countryThunk action on component mount
  useEffect(() => {
    dispatch(countryThunk()); // Dispatch countryThunk action to fetch country data
  }, [dispatch]); // Dependency array to ensure useEffect runs only once

  // Retrieve country data from Redux store using useSelector
  return useSelector((state: RootState) => state.countryReducer.data);
};

export default useFetchCountryData;
