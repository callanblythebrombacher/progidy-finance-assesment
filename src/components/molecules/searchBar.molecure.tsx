import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AutocompleteAtom} from '../atoms/autocomplete.atom.tsx';
import {searchBarStyles as styles} from '../styles/molecules.styles.ts';
import {AutoCompleteData} from '../interfaces/atom.interfaces.ts';
import {SearchBarProps} from '../interfaces/molecules.interfaces.ts';

export const SearchBar: React.FC<SearchBarProps> = ({
  searchData,
  clearFilteredSearch,
  setSearchQuery,
  searchQuery,
}) => {
  const [autocompleteData, setAutocompleteData] = useState<
    AutoCompleteData | undefined
  >([]);

  const handleSearch = (text: string) => setSearchQuery(text);

  const handleFilterSearch = (
    query: string,
    searchData: AutoCompleteData,
  ): AutoCompleteData => {
    const trimmedQuery = query.trim();
    const lowerCaseQuery = trimmedQuery.toLowerCase();
    return searchData.filter(item =>
      item.listTitle.toLowerCase().includes(lowerCaseQuery),
    );
  };
  const handleClearInput = () => {
    setAutocompleteData([]);
    setSearchQuery('');
    clearFilteredSearch();
  };

  useEffect(() => {
    const filteredData = handleFilterSearch(searchQuery, searchData);
    if (filteredData.length > 0 && searchQuery !== '') {
      setAutocompleteData(filteredData);
    } else {
      setAutocompleteData(undefined);
    }
  }, [searchQuery]);

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
      <AutocompleteAtom autocompleteData={autocompleteData} />
    </View>
  );
};
