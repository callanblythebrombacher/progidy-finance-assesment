import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Autocomplete} from '../atoms/autocomplete.atom';
import {searchBarStyles as styles} from '../styles/molecules.styles';
import {AutoCompleteData} from '../interfaces/atom.interfaces';
import {SearchBarProps} from '../interfaces/molecules.interfaces';

export const SearchBar: React.FC<SearchBarProps> = ({
  searchData,
  clearFilteredSearch,
  setSearchQuery,
  searchQuery,
  setAutoCompleteData,
  autoCompleteData,
}) => {
  // Handler for updating search query state
  const handleSearch = (text: string) => setSearchQuery(text);

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

  // Handler to clear search input and reset autocomplete data
  const handleClearInput = () => {
    setAutoCompleteData([]);
    setSearchQuery('');
    clearFilteredSearch();
  };

  useEffect(() => {
    // Ensure searchData is available and not null/undefined
    if (!searchData) return;

    // Filter searchData based on searchQuery
    const filteredData = handleFilterSearch(searchQuery, searchData);

    // Update autoCompleteData based on filtered results
    if (filteredData.length > 0 && searchQuery !== '') {
      setAutoCompleteData(filteredData);
    } else {
      setAutoCompleteData(undefined);
    }
  }, [searchQuery, searchData]);

  return (
    <View style={styles.container}>
      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* Clear button shown when searchQuery is not empty */}
      {searchQuery !== '' && (
        <IconButton
          icon="close"
          onPress={handleClearInput}
          style={styles.iconButton}
        />
      )}
      {/* Autocomplete suggestions */}
      <Autocomplete autocompleteData={autoCompleteData} />
    </View>
  );
};

export default SearchBar;
