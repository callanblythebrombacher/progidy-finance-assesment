import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {FilterableDataTable} from '../templates/filterableDataTabled.template.tsx';
import useFetchCountryData from '../../hooks/useFetchCountryData';
import useNormalizeData from '../../hooks/useNormalizeData';
import {TableConfig} from '../../interfaces/templates.interface';
import {AutoCompleteData} from '../../interfaces/atom.interfaces.ts';
import {softDelete} from '../../redux/reducers/country.slice';
import {countryThunk} from '../../redux/thunk/country.thunk.ts';
import {AppDispatch} from '../../redux/store.ts';
import {Normalize} from '../../utils/normalize.ts';

const CountryDataTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch country data using a custom hook
  const countryData = useFetchCountryData();

  // State variables for managing picker, search, autocomplete, and pagination
  const [pickerValue, setPickerValue] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);
  const [page, setPage] = useState<number>(0);
  const [searchChanged, setSearchChanged] = useState<boolean>(false);

  // Custom hook for normalizing data based on picker value and country data
  const {pickerList, rowData, setRowData} = useNormalizeData(
    pickerValue,
    countryData,
    setSearchQuery, // Passing setSearchQuery callback to handle item press in useNormalizeData
  );

  // Function to clear filter and reset row data based on current country data
  const handleClearFilter = () => {
    if (countryData) {
      const normalize = new Normalize();
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig); // Update row data based on normalized configuration
    }
  };

  // Function to dispatch soft delete action
  const handleDelete = (itemToDelete: string) => {
    dispatch(softDelete(itemToDelete));
  };

  // Conditional rendering based on whether countryData is available
  if (countryData) {
    // Constructing table configuration object
    const tableConfig: TableConfig = {
      searchBarConfig: {
        searchData: pickerList || [], // Search data for autocomplete dropdown
        searchQuery, // Current search query
        setSearchQuery, // Setter function for search query
        clearFilteredSearch: handleClearFilter, // Function to clear search filter
        autoCompleteData, // Autocomplete suggestions data
        setAutoCompleteData, // Setter function for autocomplete data
        setRowData, // Setter function for row data
        pickerValue, // Current picker value
        setPage, // Setter function for page
      },
      pickerConfig: {
        items: [
          {label: 'Currency', value: 1},
          {label: 'Alpha 2 Code', value: 2},
          {label: 'Alpha 3 Code', value: 3},
        ],
        value: pickerValue, // Current picker value
        setValue: setPickerValue, // Setter function for picker value
      },
      headerConfig: [
        {item: 'Country', isNumeric: false},
        {item: 'Flag', isNumeric: true},
        {item: 'Currency', isNumeric: true},
      ],
      rowConfig: rowData, // Row configuration data
      page, // Current page number
      setPage, // Setter function for page
    };

    // Render FilterableDataTable component with configured props
    return (
      <FilterableDataTable
        handleDelete={handleDelete}
        tableConfig={tableConfig}
      />
    );
  } else {
    // Render error message and retry button if countryData is not available
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
