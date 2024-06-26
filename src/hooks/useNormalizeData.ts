import {useState, useEffect} from 'react';
import {Normalize} from '../utils/normalize';
import {AutoCompleteData} from '../interfaces/atom.interfaces.ts';
import {TableRows} from '../interfaces/molecules.interfaces.ts';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

const normalize = new Normalize(); // Instance of Normalize class

/**
 * Custom hook to normalize and manage data based on picker value and country data.
 * @param pickerValue The current value of the picker.
 * @param countryData The array of normalized country data.
 * @param setSearchQuery Function to set the search query.
 * @returns An object containing picker list, row data, and a setter function for row data.
 */
const useNormalizeData = (
  pickerValue: number,
  countryData: NormalizedCountryArrayItem[] | null,
  setSearchQuery: (query: string) => void,
) => {
  const [pickerList, setPickerList] = useState<AutoCompleteData | null>(null); // State for autocomplete picker list
  const [rowData, setRowData] = useState<TableRows>([]); // State for table rows

  // Effect to update picker list based on picker value and country data
  useEffect(() => {
    if (countryData) {
      // Normalize and create search list based on picker value and country data
      const searchListArray = normalize.getSearchList(pickerValue, countryData);
      const searchList = searchListArray.map(listTitle => ({
        listTitle,
        onPress: () => {
          handleItemPress(listTitle); // Handler for item press to set search query
        },
      }));
      setPickerList(searchList); // Set picker list state
    }
  }, [pickerValue, countryData]);

  // Effect to update row data based on country data
  useEffect(() => {
    if (countryData) {
      const rowConfig = normalize.getRowConfig(countryData); // Normalize row configuration
      setRowData(rowConfig); // Set row data state
    }
  }, [countryData]);

  // Handler for item press to set search query
  const handleItemPress = (listTitle: string) => {
    setSearchQuery(listTitle); // Set search query state
  };

  return {pickerList, rowData, setRowData};
};

export default useNormalizeData;
