import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import {VariableSearchBar} from '../variableSearchBar.organisms';
import {SearchBar} from '../../molecules/searchBar.molecule';
import {PickerComponent} from '../../atoms/picker.atom';
import {VariableSearchBarProps} from '../../../interfaces/organism.interfaces';
import {variableSearchBarStyles as styles} from '../../styles/organisms.styles';

import {describe, it, expect} from '@jest/globals';

describe('VariableSearchBar Component', () => {
  const mockSearchBarProps = {
    searchData: [{id: 1, name: 'Test Country'}],
    clearFilteredSearch: jest.fn(),
    searchQuery: '',
    pickerValue: '',
    setRowData: jest.fn(),
    setPage: jest.fn(),
  };

  const mockPickerProps = {
    items: [{label: 'Option 1', value: 'option1'}],
    setValue: jest.fn(),
    value: '',
  };

  const props: VariableSearchBarProps = {
    searchBarProps: mockSearchBarProps,
    pickerProps: mockPickerProps,
  };

  it('renders correctly with given props', () => {
    const {toJSON} = render(<VariableSearchBar {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders a View component with the correct style', () => {
    const {getByTestId} = render(<VariableSearchBar {...props} />);
    const viewComponent = getByTestId('variable-search-bar-container');
    expect(viewComponent).toBeTruthy();
    expect(viewComponent.props.style).toEqual(styles.container);
  });

  it('renders SearchBar with the correct props', () => {
    const {getByTestId} = render(<VariableSearchBar {...props} />);
    const searchBarComponent = getByTestId('search-bar-component');
    expect(searchBarComponent.props).toEqual(
      expect.objectContaining(mockSearchBarProps),
    );
  });

  it('renders PickerComponent with the correct props', () => {
    const {getByTestId} = render(<VariableSearchBar {...props} />);
    const pickerComponent = getByTestId('picker-component');
    expect(pickerComponent.props).toEqual(
      expect.objectContaining(mockPickerProps),
    );
  });
});
