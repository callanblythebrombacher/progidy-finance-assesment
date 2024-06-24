import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FilterableDataTable} from '../templates/filterableDataTabled.template.tsx';
import {countryThunk} from '../../redux/thunk/country.thunk';
import {Normalize} from '../../utils/normalize.ts';
import {Filter} from '../../utils/filter';
import {TableConfig} from '../interfaces/templates.interface';
import {AutoCompleteData} from '../interfaces/atom.interfaces';
import {TableRows} from '../interfaces/molecules.interfaces';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {NormalizedCountryArrayItem} from '../../interfaces/normalize.interface.ts';
import {softDelete} from '../../redux/reducers/country.slice.ts';

const normalize = new Normalize(); // Instance of Normalize class
const filter = new Filter(); // Instance of Filter class

const CountryDataTable = () => {
  const dispatch: AppDispatch = useDispatch(); // Redux dispatch function
  const countryData: NormalizedCountryArrayItem[] | null = useSelector(
    // Selecting country data from Redux store
    (state: RootState) => state.countryReducer.data,
  );

  // State variables
  const [pickerValue, setPickerValue] = useState(1);
  const [pickerList, setPickerList] = useState<AutoCompleteData | null>(null);
  const [rowData, setRowData] = useState<TableRows>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);
  const [page, setPage] = useState(0);

  // Fetch country data on component mount
  useEffect(() => {
    dispatch(countryThunk());
  }, []);

  // Update picker list when pickerValue or countryData changes
  useEffect(() => {
    if (countryData) {
      const searchListArray = normalize.getSearchList(pickerValue, countryData); // Normalize search list
      const searchList = searchListArray.map(listTitle => ({
        listTitle,
        onPress: () => handleItemPress(listTitle),
      }));
      setPickerList(searchList); // Set picker list based on normalized data
    }
  }, [pickerValue, countryData]);

  // Update row data when countryData changes
  useEffect(() => {
    if (countryData) {
      const rowConfig = normalize.getRowConfig(countryData); // Normalize row configuration
      setRowData(rowConfig); // Set row data based on normalized configuration
      setPage(0); // Reset page to 0
    }
  }, [countryData]);

  // Handle item press in picker list
  const handleItemPress = (listTitle: string) => {
    setSearchQuery(listTitle); // Set search query
    const filteredCountryData = filter.getFilteredCountryData(
      pickerValue,
      listTitle,
      countryData,
    ); // Filter country data
    const rowConfig = normalize.getRowConfig(filteredCountryData); // Normalize filtered row configuration
    setRowData(rowConfig); // Set row data based on filtered configuration
  };

  // Clear filter and reset row data
  const handleClearFilter = () => {
    if (countryData) {
      const rowConfig = normalize.getRowConfig(countryData); // Normalize row configuration
      setRowData(rowConfig); // Set row data based on normalized configuration
    }
  };

  // Handle deletion of country item
  const handleDelete = (itemToDelete: string) => {
    dispatch(softDelete(itemToDelete)); // Dispatch soft delete action
  };

  // Render the component based on whether country data is available or not
  if (countryData) {
    // Table configuration object
    const tableConfig: TableConfig = {
      searchBarConfig: {
        searchData: pickerList || [], // Search data for picker list
        searchQuery,
        setSearchQuery,
        clearFilteredSearch: handleClearFilter,
        autoCompleteData,
        setAutoCompleteData,
      },
      pickerConfig: {
        items: [
          {label: 'Currency', value: 1},
          {label: 'Alpha 2 Code', value: 2},
          {label: 'Alpha 3 Code', value: 3},
        ],
        value: pickerValue,
        setValue: setPickerValue,
      },
      headerConfig: [
        {item: 'Country', isNumeric: false},
        {item: 'Flag', isNumeric: true},
        {item: 'Currency', isNumeric: true},
      ],
      rowConfig: rowData, // Row configuration
      page,
      setPage,
    };

    return (
      <FilterableDataTable
        handleDelete={handleDelete}
        tableConfig={tableConfig}
      />
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          There was a problem retrieving the country data, please try again
        </Text>
        <Button onPress={() => dispatch(countryThunk())} title={'Try Again'} />
      </View>
    );
  }
};

export default CountryDataTable;
