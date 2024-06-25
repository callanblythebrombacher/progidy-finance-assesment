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
  setSearchChanged,
}) => {
  const countryData = useSelector(
    (state: RootState) => state.countryReducer.data,
  );

  const {searchQuery, handleSearch, handleClearInput, setSearchQuery} =
    useSearch(propSearchQuery);
  const {autoCompleteData: filteredAutoCompleteData, handleItemSelection} =
    useAutocomplete(
      setSearchQuery,
      searchQuery,
      searchData,
      pickerValue,
      countryData,
      setRowData,
      setPage,
      setSearchChanged,
    );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {searchQuery !== '' && (
        <IconButton
          icon="close"
          onPress={() => {
            handleClearInput();
            clearFilteredSearch();
          }}
          style={styles.iconButton}
        />
      )}
      <Autocomplete
        autocompleteData={filteredAutoCompleteData}
        onItemPress={handleItemSelection}
      />
    </View>
  );
};
