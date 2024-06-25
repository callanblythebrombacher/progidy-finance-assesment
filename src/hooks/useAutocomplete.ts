import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AutoCompleteData} from '../interfaces/atom.interfaces';
import {Filter} from '../utils/filter';
import {Normalize} from '../utils/normalize';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

const filter = new Filter();
const normalize = new Normalize();

const useAutocomplete = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
  searchQuery: string,
  searchData: AutoCompleteData,
  pickerValue: number,
  countryData: NormalizedCountryArrayItem[] | null,
  setRowData: (data: any) => void,
  setPage: Dispatch<SetStateAction<number>>,
  setSearchChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);

  const handleFilterSearch = (
    query: string,
    searchData: AutoCompleteData,
  ): AutoCompleteData => {
    const trimmedQuery = query.trim().toLowerCase();
    return searchData.filter(item =>
      item.listTitle.toLowerCase().includes(trimmedQuery),
    );
  };

  const handleItemSelection = (itemTitle: string) => {
    setSearchQuery(itemTitle);
    setAutoCompleteData([]);
    setSearchChanged(true);
  };

  useEffect(() => {
    if (!searchData) return;

    const filteredData = handleFilterSearch(searchQuery, searchData);

    if (
      filteredData.length === 1 &&
      searchQuery === filteredData[0].listTitle
    ) {
      setPage(0);
      handleItemSelection(filteredData[0].listTitle); // Clear autocomplete data on item selection
      const filteredCountryData = filter.getFilteredCountryData(
        pickerValue,
        searchQuery,
        countryData,
      );
      const rowConfig = normalize.getRowConfig(filteredCountryData);
      setRowData(rowConfig);
    }

    if (
      filteredData.length > 0 &&
      searchQuery !== '' &&
      searchQuery !== filteredData[0].listTitle
    ) {
      setAutoCompleteData(filteredData);
    } else {
      setAutoCompleteData(undefined);
    }
  }, [searchQuery, searchData]);

  return {
    autoCompleteData,
    setAutoCompleteData,
    handleItemSelection,
  };
};

export default useAutocomplete;
