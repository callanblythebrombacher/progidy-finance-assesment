import React from 'react';
import {shallow} from 'enzyme';
import {TextInput, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {SearchBar} from '../searchBar.molecure.tsx';
import {Autocomplete} from '../../atoms/autocomplete.atom';
import useSearch from '../../../hooks/useSearch';
import useAutocomplete from '../../../hooks/useAutocomplete';
import {RootState} from '../../../redux/store';

import {jest, describe, beforeEach, afterEach, it, expect} from '@jest/globals';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../src/hooks/useSearch');
jest.mock('../src/hooks/useAutocomplete');
jest.mock('../src/atoms/autocomplete.atom', () => ({
  Autocomplete: () => 'Autocomplete',
}));

describe('SearchBar Component', () => {
  const mockUseSelector = useSelector as jest.Mock;
  const mockUseSearch = useSearch as jest.Mock;
  const mockUseAutocomplete = useAutocomplete as jest.Mock;

  const mockSearchData = [{id: 1, name: 'Test Country'}];
  const mockClearFilteredSearch = jest.fn();
  const mockSetRowData = jest.fn();
  const mockSetPage = jest.fn();

  beforeEach(() => {
    mockUseSelector.mockReturnValue(mockSearchData);
    mockUseSearch.mockReturnValue({
      searchQuery: '',
      handleSearch: jest.fn(),
      handleClearInput: jest.fn(),
      setSearchQuery: jest.fn(),
    });
    mockUseAutocomplete.mockReturnValue({
      autoCompleteData: [],
      handleItemSelection: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const wrapper = shallow(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders TextInput and IconButton components', () => {
    const wrapper = shallow(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    expect(wrapper.find(TextInput)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(0); // No icon button when searchQuery is empty

    wrapper.setProps({searchQuery: 'Test'});
    expect(wrapper.find(IconButton)).toHaveLength(1); // Icon button when searchQuery is not empty
  });

  it('calls handleSearch on TextInput change', () => {
    const mockHandleSearch = jest.fn();
    mockUseSearch.mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleClearInput: jest.fn(),
      setSearchQuery: jest.fn(),
    });

    const wrapper = shallow(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    wrapper.find(TextInput).simulate('changeText', 'Test');
    expect(mockHandleSearch).toHaveBeenCalledWith('Test');
  });

  it('calls handleClearInput and clearFilteredSearch on IconButton press', () => {
    const mockHandleClearInput = jest.fn();
    mockUseSearch.mockReturnValue({
      searchQuery: 'Test',
      handleSearch: jest.fn(),
      handleClearInput: mockHandleClearInput,
      setSearchQuery: jest.fn(),
    });

    const wrapper = shallow(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery="Test"
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    wrapper.find(IconButton).simulate('press');
    expect(mockHandleClearInput).toHaveBeenCalled();
    expect(mockClearFilteredSearch).toHaveBeenCalled();
  });

  it('renders Autocomplete component with correct props', () => {
    const mockAutoCompleteData = [{id: 1, name: 'Test Suggestion'}];
    const mockHandleItemSelection = jest.fn();
    mockUseAutocomplete.mockReturnValue({
      autoCompleteData: mockAutoCompleteData,
      handleItemSelection: mockHandleItemSelection,
    });

    const wrapper = shallow(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery="Test"
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    const autocomplete = wrapper.find(Autocomplete);
    expect(autocomplete).toHaveLength(1);
    expect(autocomplete.prop('autocompleteData')).toEqual(mockAutoCompleteData);
    expect(autocomplete.prop('onItemPress')).toEqual(mockHandleItemSelection);
  });
});
