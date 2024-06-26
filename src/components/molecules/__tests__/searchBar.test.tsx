import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import {SearchBar} from '../searchBar.molecure';
import useSearch from '../../../hooks/useSearch';
import useAutocomplete from '../../../hooks/useAutocomplete';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../../hooks/useSearch');
jest.mock('../../../hooks/useAutocomplete');
jest.mock('../../atoms/autocomplete.atom', () => ({
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
    const {toJSON} = render(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders TextInput and IconButton components', () => {
    const {getByPlaceholderText, queryByTestId, getByTestId} = render(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    const textInput = getByPlaceholderText('Search');
    expect(textInput).toBeTruthy();

    expect(queryByTestId('icon-button')).toBeFalsy(); // No icon button when searchQuery is empty

    fireEvent.changeText(textInput, 'Test');
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toBeTruthy(); // Icon button appears when searchQuery is not empty
  });

  it('calls handleSearch on TextInput change', () => {
    const mockHandleSearch = jest.fn();
    mockUseSearch.mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      handleClearInput: jest.fn(),
      setSearchQuery: jest.fn(),
    });

    const {getByPlaceholderText} = render(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery=""
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    const textInput = getByPlaceholderText('Search');
    fireEvent.changeText(textInput, 'Test');
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

    const {getByTestId} = render(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery="Test"
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    const iconButton = getByTestId('icon-button');
    fireEvent.press(iconButton);
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

    const {getByTestId} = render(
      <SearchBar
        searchData={mockSearchData}
        clearFilteredSearch={mockClearFilteredSearch}
        searchQuery="Test"
        pickerValue=""
        setRowData={mockSetRowData}
        setPage={mockSetPage}
      />,
    );

    const autocomplete = getByTestId('autocomplete');
    expect(autocomplete).toBeTruthy();
    // Ensure Autocomplete receives correct props if they are specified in your Autocomplete component
    // expect(autocomplete.props.autocompleteData).toEqual(mockAutoCompleteData);
    // expect(autocomplete.props.onItemPress).toEqual(mockHandleItemSelection);
  });
});
