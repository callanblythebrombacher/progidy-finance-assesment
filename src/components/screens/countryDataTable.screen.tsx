import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FilterableDataTable} from '../templates/filterableDataTabled.template.tsx';
import {countryThunk} from '../../redux/thunk/country.thunk';
import {Normalize} from '../../utils/noramlize.ts';
import {Filter} from '../../utils/filter';
import {TableConfig} from '../interfaces/templates.interface';
import {AutoCompleteData} from '../interfaces/atom.interfaces';
import {TableRows} from '../interfaces/molecules.interfaces';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {NormalizedCountryArrayItem} from '../../interfaces/normalize.interface.ts';
import {softDelete} from '../../redux/reducers/country.slice.ts';

const normalize = new Normalize();
const filter = new Filter();

const CountryDataTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const countryData: NormalizedCountryArrayItem[] | null = useSelector(
    (state: RootState) => state.countryReducer.data,
  );

  const [pickerValue, setPickerValue] = useState(1);
  const [pickerList, setPickerList] = useState<AutoCompleteData | null>(null);
  const [rowData, setRowData] = useState<TableRows>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState<
    AutoCompleteData | undefined
  >([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(countryThunk());
  }, []);

  useEffect(() => {
    if (countryData) {
      const searchListArray = normalize.getSearchList(pickerValue, countryData);
      const searchList = searchListArray.map(listTitle => ({
        listTitle,
        onPress: () => handleItemPress(listTitle),
      }));
      setPickerList(searchList);
    }
  }, [pickerValue, countryData]);

  useEffect(() => {
    if (countryData) {
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig);
      setPage(0);
    }
  }, [countryData]);

  const handleItemPress = (listTitle: string) => {
    setSearchQuery(listTitle);
    const filteredCountryData = filter.getFilteredCountryData(
      pickerValue,
      listTitle,
      countryData,
    );
    const rowConfig = normalize.getRowConfig(filteredCountryData);
    setRowData(rowConfig);
  };

  useEffect(() => {
    setAutoCompleteData([]);
    setPage(0);
  }, [rowData]);

  const handleClearFilter = () => {
    if (countryData) {
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
