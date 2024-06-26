// Import necessary dependencies and setup for testing
import React from 'react';
import {render} from '@testing-library/react-native';
import {FilterableDataTable} from '..//filterableDataTabled.template.tsx';
import {TableConfig} from '../../../interfaces/templates.interface.ts';

jest.mock(
  '../../organisms/variableSearchBar.organisms.tsx',
  () => 'VariableSearchBar',
);
jest.mock('../../molecules/dataTable.molecule.tsx', () => 'Table');
const mockHandleDelete = jest.fn();
const mockTableConfig: TableConfig = {
  page: 1,
  setPage: jest.fn(),
  searchBarConfig: {
    searchData: [],
    searchQuery: '',
    setSearchQuery: jest.fn(),
    clearFilteredSearch: jest.fn(),
    autoCompleteData: [],
    setAutoCompleteData: jest.fn(),
    setRowData: jest.fn(),
    pickerValue: 1,
    setPage: jest.fn(),
  },
  pickerConfig: {
    items: [
      {label: 'Currency', value: 1},
      {label: 'Alpha 2 Code', value: 2},
      {label: 'Alpha 3 Code', value: 3},
    ],
    value: 1,
    setValue: jest.fn(),
  },
  rowConfig: [
    {
      isSwipeable: true,
      data: [{item: 'Test Country', isNumeric: false}],
      isActive: true,
    },
  ],
  headerConfig: [
    {item: 'Country', isNumeric: false},
    {item: 'Flag', isNumeric: true},
    {item: 'Currency', isNumeric: true},
  ],
};

describe('FilterableDataTable component', () => {
  it('renders VariableSearchBar and Table components correctly', () => {
    const {getByTestId} = render(
      <FilterableDataTable
        tableConfig={mockTableConfig}
        handleDelete={mockHandleDelete}
      />,
    );

    // Assert that VariableSearchBar component is rendered
    const searchBar = getByTestId('variable-search-bar');
    expect(searchBar).toBeTruthy();

    // Assert that Table component is rendered
    const table = getByTestId('data-table');
    expect(table).toBeTruthy();
  });
});
