import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import CountryDataTable from '../countryDataTable.screen.tsx';
import {Button, Text} from 'react-native';
import {FilterableDataTable} from '../../templates/filterableDataTabled.template.tsx';
import useFetchCountryData from '../../../hooks/useFetchCountryData.ts';
import {softDelete} from '../../../redux/reducers/country.slice.ts';
import {countryThunk} from '../../../redux/thunk/country.thunk.ts';
import {jest} from '@jest/globals';

// Mocking react-redux and custom hooks
const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));
jest.mock('../../../hooks/useFetchCountryData');
describe('CountryDataTable Component', () => {
  const mockCountryData = [{name: 'Test Country'}];
  const mockRowData = [{data: [{item: 'Test Country'}], isActive: true}];
  const mockPickerList = [
    {label: 'Currency', value: 1},
    {label: 'Alpha 2 Code', value: 2},
    {label: 'Alpha 3 Code', value: 3},
  ];

  beforeEach(() => {
    //useSelector.mockReturnValue(false); // Mock deletionEvent as false
    //useFetchCountryData.mockReturnValue(mockCountryData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders FilterableDataTable when country data is available', () => {
    const {getByTestId} = render(<CountryDataTable />);
    expect(getByTestId('filterable-data-table')).toBeDefined();
  });

  it('renders error message and retry button when country data is not available', () => {
    //useFetchCountryData.mockReturnValue(null);
    const {getByText, getByTestId} = render(<CountryDataTable />);
    expect(
      getByText(
        'There was a problem retrieving the country data, please try again',
      ),
    ).toBeDefined();
    expect(getByTestId('retry-button')).toBeDefined();
  });

  it('dispatches softDelete action when handleDelete is called', () => {
    const {getByTestId} = render(<CountryDataTable />);
    const filterableDataTable = getByTestId('filterable-data-table');
    fireEvent(filterableDataTable, 'handleDelete', 'Test Country');
    expect(mockDispatch).toHaveBeenCalledWith(softDelete('Test Country'));
  });

  it('dispatches countryThunk when retry button is pressed', () => {
    //useFetchCountryData.mockReturnValue(null);
    const {getByTestId} = render(<CountryDataTable />);
    const retryButton = getByTestId('retry-button');
    fireEvent.press(retryButton);
    expect(mockDispatch).toHaveBeenCalledWith(countryThunk());
  });
});
