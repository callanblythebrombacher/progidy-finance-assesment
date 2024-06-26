import React from 'react';
import {shallow} from 'enzyme';
import {View} from 'react-native';
import {VariableSearchBar} from '../variableSearchBar.organisms.tsx';
import {SearchBar} from '../../molecules/searchBar.molecure.tsx';
import {PickerComponent} from '../../atoms/picker.atom.tsx';
import {VariableSearchBarProps} from '../../../interfaces/organism.interfaces';
import {variableSearchBarStyles as styles} from '../../styles/organisms.styles';

import {describe, jest, it, expect} from '@jest/globals';

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
    const wrapper = shallow(<VariableSearchBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a View component with the correct style', () => {
    const wrapper = shallow(<VariableSearchBar {...props} />);
    expect(wrapper.find(View).prop('style')).toEqual(styles.container);
  });

  it('renders SearchBar with the correct props', () => {
    const wrapper = shallow(<VariableSearchBar {...props} />);
    const searchBar = wrapper.find(SearchBar);
    expect(searchBar).toHaveLength(1);
    expect(searchBar.props()).toEqual(mockSearchBarProps);
  });

  it('renders PickerComponent with the correct props', () => {
    const wrapper = shallow(<VariableSearchBar {...props} />);
    const pickerComponent = wrapper.find(PickerComponent);
    expect(pickerComponent).toHaveLength(1);
    expect(pickerComponent.props()).toEqual(mockPickerProps);
  });
});
