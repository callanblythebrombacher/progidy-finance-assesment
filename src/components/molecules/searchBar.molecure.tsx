import React from 'react';
import {TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Autocomplete} from '../atoms/autocomplete.atom';
import {searchBarStyles as styles} from '../styles/molecules.styles';
import {SearchBarProps} from '../../interfaces/molecules.interfaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import useSearch from '../../hooks/useSearch';
import useAutocomplete from '../../hooks/useAutocomplete';

export const SearchBar: React.FC<SearchBarProps> = ({
  searchData,
  clearFilteredSearch,
  searchQuery: propSearchQuery,
  pickerValue,
  setRowData,
  setPage,
}) => {
  // Redux selector to get country data
  const countryData = useSelector(
    (state: RootState) => state.countryReducer.data,
  );

  // Custom hook for managing search functionality
  const {searchQuery, handleSearch, handleClearInput, setSearchQuery} =
    useSearch(propSearchQuery);

  // Custom hook for managing autocomplete functionality
  const {autoCompleteData: filteredAutoCompleteData, handleItemSelection} =
    useAutocomplete(
      setSearchQuery,
      searchQuery,
      searchData,
      pickerValue,
      countryData,
      setRowData,
      setPage,
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch} // Handle input change
      />
      {searchQuery !== '' && (
        <IconButton
          icon="close"
          onPress={() => {
            handleClearInput(); // Clear search input
            clearFilteredSearch(); // Clear filtered search results
          }}
          style={styles.iconButton}
        />
      )}
      <Autocomplete
        autocompleteData={filteredAutoCompleteData}
        onItemPress={handleItemSelection} // Handle selection from autocomplete
      />
    </View>
  );
};
