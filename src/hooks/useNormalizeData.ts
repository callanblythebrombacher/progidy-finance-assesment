import {useState, useEffect} from 'react';
import {Normalize} from '../utils/normalize';
import {AutoCompleteData} from '../interfaces/atom.interfaces.ts';
import {TableRows} from '../interfaces/molecules.interfaces.ts';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

const normalize = new Normalize();

const useNormalizeData = (
  pickerValue: number,
  countryData: NormalizedCountryArrayItem[] | null,
  setSearchQuery: (query: string) => void,
) => {
  const [pickerList, setPickerList] = useState<AutoCompleteData | null>(null);
  const [rowData, setRowData] = useState<TableRows>([]);

  useEffect(() => {
    if (countryData) {
      const searchListArray = normalize.getSearchList(pickerValue, countryData);
      const searchList = searchListArray.map(listTitle => ({
        listTitle,
        onPress: () => {
          handleItemPress(listTitle);
        },
      }));
      setPickerList(searchList);
    }
  }, [pickerValue, countryData]);

  useEffect(() => {
    if (countryData) {
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig);
    }
  }, [countryData]);

  const handleItemPress = (listTitle: string) => {
    setSearchQuery(listTitle);
  };

  return {pickerList, rowData, setRowData};
};

export default useNormalizeData;
