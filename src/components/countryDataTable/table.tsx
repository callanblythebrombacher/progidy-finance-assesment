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
    <View style={styles.wrapper}>
      <CountrySearchBar
        countryData={countryData}
        setFilteredData={setFilteredData}
      />
      <Table
        countryData={countryData}
        filteredData={filteredData}
        handleDelete={handleDelete}
      />
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
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };
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
    <DataTable style={styles.dataTable}>
      <DataTable.Header style={styles.dataTableHeader}>
        <DataTable.Title>Country</DataTable.Title>
        <DataTable.Title numeric>Flag</DataTable.Title>
        <DataTable.Title numeric>Currency</DataTable.Title>
      </DataTable.Header>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
      </ScrollView>
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
        countryData?.filter(country =>
          country.currencyArray[0]?.name
            .toLowerCase()
            .includes(text.toLowerCase()),
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
    <List.Item
      style={styles.autoCompleteListItem}
      title={item.currencyArray[0]?.name || 'N/A'}
      onPress={() => handleItemPress(item)}
    />
  );

  const handleItemPress = (item: NormalizedCountryArrayItem) => {
    setSearchQuery(item.currencyArray[0]?.name || 'N/A');
    setFilteredData(item);
    setAutocompleteData([]);
  };

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
          onPress={clearInput}
          style={styles.iconButton}
        />
      )}
      {autocompleteData.length > 0 && (
        <View style={styles.autocompleteListView}>
          <FlatList
            data={autocompleteData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    zIndex: 3,
    flex: 1,
    position: 'relative',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  iconButton: {
    position: 'absolute',
    zIndex: 4,
    right: 3,
    top: 5,
  },
  row: {
    height: 70,
    backgroundColor: 'white',
  },
  deleteButtonView: {
    backgroundColor: 'red',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autocompleteListView: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 60,
    width: '100%',
    height: 900,
  },
  autoCompleteListItem: {
    backgroundColor: 'white',
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
  },
  dataTable: {
    paddingTop: 50,
    position: 'relative',
    zIndex: 1,
  },
  dataTableHeader: {
    backgroundColor: '#dddddd',
    width: '100%',
  },
  wrapper: {
    paddingBottom: 160,
    backgroundColor: '#fff',
  },
});
