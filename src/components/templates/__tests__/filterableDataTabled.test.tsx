import React from 'react';
import {shallow} from 'enzyme';
import {FilterableDataTable} from '../filterableDataTabled.template.tsx';
import {VariableSearchBar} from '../../organisms/variableSearchBar.organisms.tsx';
import {Table} from '../../molecules/dataTable.molecule.tsx';

import {jest, describe, it, expect} from '@jest/globals';

jest.mock('../src/organisms/VariableSearchBar', () => 'VariableSearchBar');
jest.mock('../src/molecules/Table', () => 'Table');

describe('FilterableDataTable Component', () => {
  const mockHandleDelete = jest.fn();
  const mockTableConfig = {
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
    rowConfig: [{data: [{item: 'Test Country'}], isActive: true}],
    headerConfig: [
      {item: 'Country', isNumeric: false},
      {item: 'Flag', isNumeric: true},
      {item: 'Currency', isNumeric: true},
    ],
  };

  it('renders VariableSearchBar and Table with correct props', () => {
    const wrapper = shallow(
      <FilterableDataTable
        tableConfig={mockTableConfig}
        handleDelete={mockHandleDelete}
      />,
    );

    expect(wrapper.find('VariableSearchBar').props().searchBarProps).toEqual(
      mockTableConfig.searchBarConfig,
    );
    expect(wrapper.find('VariableSearchBar').props().pickerProps).toEqual(
      mockTableConfig.pickerConfig,
    );

    expect(wrapper.find('Table').props().page).toEqual(mockTableConfig.page);
    expect(wrapper.find('Table').props().setPage).toEqual(
      mockTableConfig.setPage,
    );
    expect(wrapper.find('Table').props().handleDelete).toEqual(
      mockHandleDelete,
    );
    expect(wrapper.find('Table').props().headerRow).toEqual(
      mockTableConfig.headerConfig,
    );
    expect(wrapper.find('Table').props().tableRows).toEqual(
      mockTableConfig.rowConfig,
    );
  });
});
