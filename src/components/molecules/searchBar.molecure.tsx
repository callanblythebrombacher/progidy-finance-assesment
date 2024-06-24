import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AutocompleteAtom} from '../atoms/autocomplete.atom';
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
  const handleSearch = (text: string) => setSearchQuery(text);

  const handleFilterSearch = (
    query: string,
    searchData: AutoCompleteData,
  ): AutoCompleteData => {
    const trimmedQuery = query.trim().toLowerCase();
    return searchData.filter(item =>
      item.listTitle.toLowerCase().includes(trimmedQuery),
    );
  };

  const handleClearInput = () => {
    setAutoCompleteData([]);
    setSearchQuery('');
    clearFilteredSearch();
  };

  useEffect(() => {
    if (!searchData) return; // Ensure searchData is not null or undefined

    const filteredData = handleFilterSearch(searchQuery, searchData);

    if (filteredData.length > 0 && searchQuery !== '') {
      setAutoCompleteData(filteredData);
    } else {
      setAutoCompleteData(undefined);
    }
  }, [searchQuery, searchData]);

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
          onPress={handleClearInput}
          style={styles.iconButton}
        />
      )}
      <AutocompleteAtom autocompleteData={autoCompleteData} />
    </View>
  );
};

export default SearchBar;
