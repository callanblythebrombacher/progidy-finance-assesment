import React, {ReactNode, useState} from 'react';
import {FilterableDataTable} from '../templates/filterableDataTabled.template.tsx';
import {TableConfig} from '../interfaces/templates.interface.ts';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {useDispatch, useSelector} from 'react-redux';
import {countryThunk} from '../../redux/thunk/country.thunk.ts';
import {Normalize} from '../../utils/noramlize.ts';
import {AutoCompleteData} from '../interfaces/atom.interfaces.ts';
import {NormalizedCountryArrayItem} from '../../interfaces/normalize.interface.ts';
import {TableRows} from '../interfaces/molecules.interfaces.ts';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {Filter} from '../../utils/filter.ts';
import {Icon} from 'react-native-paper';

const normalize = new Normalize();
const filter = new Filter();
export default function CountryDataTable() {
  const dispatch: AppDispatch = useDispatch();
  const countryData: NormalizedCountryArrayItem[] | null = useSelector(
    (state: RootState) => state.countryReducer.data,
  );
  const [pickerValue, setPickerValue] = useState<number>(1);
  const [pickerList, setPickerList] = useState<AutoCompleteData | null>(null);
  const [rowData, setRowData] = useState<TableRows>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    dispatch(countryThunk());
  }, []);

  React.useEffect(() => {
    if (pickerValue !== null && countryData !== null) {
      const searchListArray: string[] = normalize.getSearchList(
        pickerValue,
        countryData,
      );
      let searchList: AutoCompleteData = [];
      searchListArray.forEach(listTitle => {
        searchList = [
          ...searchList,
          {
            listTitle,
            onPress: handleItemPress,
          },
        ];
      });
      setPickerList(searchList);
    }
  }, [pickerValue]);

  React.useEffect(() => {
    if (countryData !== null) {
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig);
    }
  }, [countryData]);

  const handleItemPress = () => {
    const filterdCountryData: NormalizedCountryArrayItem[] =
      filter.getFilteredCountryData(pickerValue, searchQuery, countryData);
    const rowConfig = normalize.getRowConfig(filterdCountryData);
    setRowData(rowConfig);
  };

  if (countryData !== null) {
    const handleClearFilter = () => {
      const rowConfig = normalize.getRowConfig(countryData);
      setRowData(rowConfig);
    };

    const handleDelete = (itemToDelete: string) => {
      console.log(`Deleting ${itemToDelete}`);
    };

    const tableConfig: TableConfig = {
      searchBarConfig: {
        searchData: pickerList || [],
        searchQuery,
        setSearchQuery,
        clearFilteredSearch: handleClearFilter,
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
    };

    return (
      <FilterableDataTable
        handleDelete={handleDelete}
        tableConfig={tableConfig}
      />
    );
  } else {
    return (
      <View>
        <Text>
          There was a problem retrieving the country data, please try again
        </Text>
        <Button onPress={() => dispatch(countryThunk)} title={'Try Again'} />
      </View>
    );
  }
}
