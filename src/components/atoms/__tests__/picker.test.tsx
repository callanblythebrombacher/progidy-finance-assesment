import React from 'react';
import {shallow} from 'enzyme';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerComponent} from '../picker.atom.ts';

import {describe, jest, beforeEach, afterEach, it, expect} from '@jest/globals';

describe('PickerComponent Atom', () => {
  const mockItems = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2},
    {label: 'Option 3', value: 3},
  ];

  const mockSetValue = jest.fn();
  const mockValue = 1;

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes correct props to DropDownPicker', () => {
    const dropDownPicker = wrapper.find(DropDownPicker);
    expect(dropDownPicker).toHaveLength(1);
    expect(dropDownPicker.prop('open')).toBe(false); // Initial state of 'open'
    expect(dropDownPicker.prop('value')).toBe(mockValue);
    expect(dropDownPicker.prop('items')).toEqual(mockItems);
    expect(typeof dropDownPicker.prop('setOpen')).toBe('function');
    expect(typeof dropDownPicker.prop('setValue')).toBe('function');
    expect(typeof dropDownPicker.prop('setItems')).toBe('function');
  });

  it('triggers setValue function on value change', () => {
    const dropDownPicker = wrapper.find(DropDownPicker);
    dropDownPicker.simulate('change', 'option2');
    expect(mockSetValue).toHaveBeenCalledWith('option2');
  });

  it('toggles open state when DropDownPicker is clicked', () => {
    const dropDownPicker = wrapper.find(DropDownPicker);
    dropDownPicker.simulate('open');
    expect(wrapper.find(DropDownPicker).prop('open')).toBe(true);
    dropDownPicker.simulate('close');
    expect(wrapper.find(DropDownPicker).prop('open')).toBe(false);
  });
});
