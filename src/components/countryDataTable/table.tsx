import React, {useMemo, useState} from 'react';
import {DataTable, IconButton, List, Appbar, Icon} from 'react-native-paper';
import {
  ActivityIndicator,
  useColorScheme,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {countryThunk} from '../../redux/thunk/country.thunk.ts';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {useDispatch, useSelector} from 'react-redux';
import {NormalizedCountryArrayItem} from '../../interfaces/normalize.interface.ts';
import {Swipeable} from 'react-native-gesture-handler';
import {softDelete} from '../../redux/reducers/country.slice.ts';

export default function CountryDataTable() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const dispatch: AppDispatch = useDispatch();
  const countryData = useSelector(
    (state: RootState) => state.countryReducer.data,
  );

  const [filteredData, setFilteredData] =
    useState<NormalizedCountryArrayItem | null>(null);

  React.useEffect(() => {
    dispatch(countryThunk());
  }, []);

  const handleDelete = (name: string) => {
    dispatch(softDelete(name));
    setFilteredData(null);
  };

  return (
    <View>
      <Appbar.Header style={styles.appBar}>
        <CountrySearchBar
          countryData={countryData}
          setFilteredData={setFilteredData}
        />
      </Appbar.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
        style={backgroundStyle}>
        <Table
          countryData={countryData}
          filteredData={filteredData}
          handleDelete={handleDelete}
        />
      </ScrollView>
    </View>
  );
}

interface TableProps {
  countryData: NormalizedCountryArrayItem[] | null;
  filteredData: NormalizedCountryArrayItem | null;
  handleDelete: (name: string) => void;
}

const Table: React.FC<TableProps> = ({
  countryData,
  filteredData,
  handleDelete,
}) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([15, 30, 60]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const from = page * itemsPerPage;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const tableData = useMemo(() => {
    return filteredData !== null ? [filteredData] : countryData ?? [];
  }, [countryData, filteredData]);

  if (!tableData.length) {
    return <ActivityIndicator animating={true} />;
  }

  const to = Math.min((page + 1) * itemsPerPage, tableData.length);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Country</DataTable.Title>
        <DataTable.Title numeric>Flag</DataTable.Title>
        <DataTable.Title numeric>Currency</DataTable.Title>
      </DataTable.Header>

      {tableData.slice(from, to).map((item, index) => (
        <Swipeable
          key={index}
          renderRightActions={() => (
            <TouchableOpacity
              onPress={() => handleDelete(item.name)}
              style={styles.deleteButtonView}>
              <Icon source="delete" color="#fff" size={30} />
            </TouchableOpacity>
          )}
          friction={2}
          rightThreshold={40}>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.flag}</DataTable.Cell>
            <DataTable.Cell numeric>
              {item.currencyArray[0]?.currency || 'N/A'}
            </DataTable.Cell>
          </DataTable.Row>
        </Swipeable>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${tableData.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

interface CountrySearchBarProps {
  countryData: NormalizedCountryArrayItem[] | null;
  setFilteredData: (arg: NormalizedCountryArrayItem | null) => void;
}

const CountrySearchBar: React.FC<CountrySearchBarProps> = ({
  countryData,
  setFilteredData,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autocompleteData, setAutocompleteData] = useState<
    NormalizedCountryArrayItem[]
  >([]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const autocompleteData =
        countryData?.filter(
          country =>
            country.alpha2.toLowerCase().includes(text.toLowerCase()) ||
            country.alpha3.toLowerCase().includes(text.toLowerCase()),
        ) ?? [];
      setAutocompleteData(autocompleteData);
    } else {
      setAutocompleteData([]);
    }
  };

  const clearInput = () => {
    setSearchQuery('');
    setFilteredData(null);
    setAutocompleteData([]);
  };

  const renderItem = ({item}: {item: NormalizedCountryArrayItem}) => (
    <>
      <List.Item title={item.alpha2} onPress={() => handleItemPress(item)} />
      <List.Item title={item.alpha3} onPress={() => handleItemPress(item)} />
    </>
  );

  const handleItemPress = (item: NormalizedCountryArrayItem) => {
    setSearchQuery(item.name);
    setFilteredData(item);
    setAutocompleteData([]);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== '' && (
          <IconButton
            icon="close"
            onPress={clearInput}
            style={styles.iconButton}
          />
        )}
      </View>
      {autocompleteData.length > 0 && (
        <FlatList
          data={autocompleteData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    bottom: 2.5,
  },
  row: {
    height: 60,
    backgroundColor: 'white',
  },
  deleteButtonView: {
    backgroundColor: 'red',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#919191',
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure the ScrollView can grow to fit content
    paddingBottom: 160, // Adjust padding as necessary to prevent cutoff
  },
});
