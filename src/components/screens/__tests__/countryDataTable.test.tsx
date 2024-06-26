import React from 'react';
import {shallow} from 'enzyme';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import CountryDataTable from '../countryDataTable.screen.tsx';
import {FilterableDataTable} from '../../templates/filterableDataTabled.template.tsx';
import useFetchCountryData from '../../../hooks/useFetchCountryData.ts';
import useNormalizeData from '../../../hooks/useNormalizeData.ts';
import {softDelete} from '../../../redux/reducers/country.slice.ts';
import {countryThunk} from '../../../redux/thunk/country.thunk.ts';

import {jest, it, describe, beforeEach, afterEach, expect} from '@jest/globals';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../hooks/useFetchCountryData');
jest.mock('../../hooks/useNormalizeData');
jest.mock('../src/templates/FilterableDataTable', () => 'FilterableDataTable');

describe('CountryDataTable Component', () => {
  const mockDispatch = jest.fn();
  const mockCountryData = [{name: 'Test Country'}];
  const mockRowData = [{data: [{item: 'Test Country'}], isActive: true}];
  const mockPickerList = [
    {label: 'Currency', value: 1},
    {label: 'Alpha 2 Code', value: 2},
    {label: 'Alpha 3 Code', value: 3},
  ];

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockReturnValue(false); // Mock deletionEvent as false
    (useFetchCountryData as jest.Mock).mockReturnValue(mockCountryData);
    (useNormalizeData as jest.Mock).mockReturnValue({
      pickerList: mockPickerList,
      rowData: mockRowData,
      setRowData: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders FilterableDataTable when country data is available', () => {
    const wrapper = shallow(<CountryDataTable />);
    expect(wrapper.find(FilterableDataTable)).toHaveLength(1);
  });

  it('renders error message and retry button when country data is not available', () => {
    (useFetchCountryData as jest.Mock).mockReturnValue(null);
    const wrapper = shallow(<CountryDataTable />);
    expect(wrapper.find(Text).dive().text()).toContain(
      'There was a problem retrieving the country data, please try again',
    );
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('dispatches softDelete action when handleDelete is called', () => {
    const wrapper = shallow(<CountryDataTable />);
    const filterableDataTable = wrapper.find(FilterableDataTable);
    filterableDataTable.props().handleDelete('Test Country');
    expect(mockDispatch).toHaveBeenCalledWith(softDelete('Test Country'));
  });

  it('dispatches countryThunk when retry button is pressed', () => {
    (useFetchCountryData as jest.Mock).mockReturnValue(null);
    const wrapper = shallow(<CountryDataTable />);
    wrapper.find(Button).props().onPress();
    expect(mockDispatch).toHaveBeenCalledWith(countryThunk());
  });
});
