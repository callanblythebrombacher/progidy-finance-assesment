import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerComponent} from '../picker.atom';

import {describe, jest, beforeEach, afterEach, it, expect} from '@jest/globals';

describe('PickerComponent Atom', () => {
  const mockItems = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2},
    {label: 'Option 3', value: 3},
  ];

  const mockSetValue = jest.fn();
  const mockValue = 1;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('passes correct props to DropDownPicker', () => {
    render(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );

    console.log(screen.debug());

    const dropDownPicker = screen.getByTestId('dropdown-picker');
    expect(dropDownPicker.props.collapsable).toBe(false);
    expect(dropDownPicker.props.value).toBe(mockValue);
    expect(dropDownPicker.props.items).toEqual(mockItems);
    expect(typeof dropDownPicker.props.setOpen).toBe('function');
    expect(typeof dropDownPicker.props.setValue).toBe('function');
    expect(typeof dropDownPicker.props.setItems).toBe('function');
  });

  it('triggers setValue function on value change', () => {
    render(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );

    const dropDownPicker = screen.getByTestId('dropdown-picker');
    fireEvent(dropDownPicker, 'open');
    fireEvent(dropDownPicker, 'valueChange', 'option2');
    expect(mockSetValue).toHaveBeenCalledWith('option2');
  });

  it('toggles open state when DropDownPicker is clicked', () => {
    const {rerender} = render(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );

    const dropDownPicker = screen.getByTestId('dropdown-picker');
    fireEvent(dropDownPicker, 'open');
    rerender(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );
    expect(dropDownPicker.props.open).toBe(true);
    fireEvent(dropDownPicker, 'close');
    rerender(
      <PickerComponent
        items={mockItems}
        setValue={mockSetValue}
        value={mockValue}
      />,
    );
    expect(dropDownPicker.props.open).toBe(false);
  });
});
