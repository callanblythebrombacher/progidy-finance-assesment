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
  const countryData = useFetchCountryData();

  const [pickerValue, setPickerValue] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);
  const [page, setPage] = useState<number>(0);
  const [searchChanged, setSearchChanged] = useState<boolean>(false);
  const {pickerList, rowData, setRowData} = useNormalizeData(
    pickerValue,
    countryData,
    setSearchQuery,
  );

  const handleClearFilter = () => {
    if (countryData) {
      const normalize = new Normalize();
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig);
    }
  };

  const handleDelete = (itemToDelete: string) => {
    dispatch(softDelete(itemToDelete));
  };

  if (countryData) {
    const tableConfig: TableConfig = {
      searchBarConfig: {
        searchData: pickerList || [],
        searchQuery,
        setSearchQuery,
        clearFilteredSearch: handleClearFilter,
        autoCompleteData,
        setAutoCompleteData,
        setRowData,
        pickerValue,
        setPage,
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
      rowConfig: rowData,
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
