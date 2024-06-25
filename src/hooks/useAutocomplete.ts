import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {AutoCompleteData} from '../interfaces/atom.interfaces';
import {Filter} from '../utils/filter';
import {Normalize} from '../utils/normalize';
import {NormalizedCountryArrayItem} from '../interfaces/normalize.interface';

// Initialize instances of Filter and Normalize classes
const filter = new Filter();
const normalize = new Normalize();

/**
 * Custom hook for handling autocomplete functionality.
 * @param setSearchQuery - Setter function for the search query state.
 * @param searchQuery - Current search query string.
 * @param searchData - Data to be used for autocomplete suggestions.
 * @param pickerValue - Value indicating the picker selection.
 * @param countryData - Array of normalized country data.
 * @param setRowData - Setter function for row data.
 * @param setPage - Setter function for the current page.
 * @returns Object containing autoCompleteData, setAutoCompleteData, and handleItemSelection function.
 */
const useAutocomplete = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
  searchQuery: string,
  searchData: AutoCompleteData,
  pickerValue: number,
  countryData: NormalizedCountryArrayItem[] | null,
  setRowData: (data: any) => void,
  setPage: Dispatch<SetStateAction<number>>,
) => {
  // State to manage autocomplete data
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);

  // Function to filter searchData based on query
  const handleFilterSearch = (
    query: string,
    searchData: AutoCompleteData,
  ): AutoCompleteData => {
    const trimmedQuery = query.trim().toLowerCase();
    return searchData.filter(item =>
      item.listTitle.toLowerCase().includes(trimmedQuery),
    );
  };

  // Function to handle item selection from autocomplete suggestions
  const handleItemSelection = (itemTitle: string) => {
    setSearchQuery(itemTitle); // Update search query with selected item
    setAutoCompleteData([]); // Clear autocomplete suggestions
  };

  useEffect(() => {
    // Ensure searchData is available and not null/undefined
    if (!searchData) return;

    // Filter searchData based on searchQuery
    const filteredData = handleFilterSearch(searchQuery, searchData);

    // Handle a selection event and update table data
    if (
      filteredData.length === 1 &&
      searchQuery === filteredData[0].listTitle
    ) {
      handleItemSelection(filteredData[0].listTitle); // Clear autocomplete data on item selection
      const filteredCountryData = filter.getFilteredCountryData(
        pickerValue,
        searchQuery,
        countryData,
      );
      const rowConfig = normalize.getRowConfig(filteredCountryData);
      setRowData(rowConfig); // Set row data based on filtered configuration
    }

    // Update autoCompleteData based on filtered results
    if (
      filteredData.length > 0 &&
      searchQuery !== '' &&
      searchQuery !== filteredData[0].listTitle
    ) {
      setAutoCompleteData(filteredData);
      setPage(0); // Reset page to 0 when search query changes
    } else {
      setAutoCompleteData(undefined);
    }
  }, [searchQuery, searchData]); // Dependencies for useEffect

  // Return autoCompleteData, setAutoCompleteData, and handleItemSelection function
  return {
    autoCompleteData,
    setAutoCompleteData,
    handleItemSelection,
  };
};

export default useAutocomplete;
