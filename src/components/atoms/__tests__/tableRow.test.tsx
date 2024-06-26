import React from 'react';
import {shallow} from 'enzyme';
import {DataTable} from 'react-native-paper';
import {TableRow} from '../tableRow.atom.tsx';
import {tableStyles as styles} from '../../styles/atoms.styles.ts';

import {describe, beforeEach, it, expect, afterEach, jest} from '@jest/globals';

describe('TableRow Atom', () => {
  const mockCellData = [
    {item: 'John Doe', isNumeric: false},
    {item: '25', isNumeric: true},
    {item: 'New York', isNumeric: false},
  ];

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<TableRow cellData={mockCellData} isActive={true} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isActive is true', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('does not render when isActive is false', () => {
    wrapper.setProps({isActive: false});
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders DataTable.Row component', () => {
    const dataTableRow = wrapper.find(DataTable.Row);
    expect(dataTableRow).toHaveLength(1);
    expect(dataTableRow.prop('style')).toEqual(
      expect.objectContaining(styles.tableRow),
    );
  });

  it('renders DataTable.Cell components with correct props', () => {
    const dataTableCells = wrapper.find(DataTable.Cell);
    expect(dataTableCells).toHaveLength(mockCellData.length);

    mockCellData.forEach((cell, index) => {
      const dataTableCell = dataTableCells.at(index);
      expect(dataTableCell.prop('numeric')).toBe(cell.isNumeric);
      expect(dataTableCell.children().text()).toBe(cell.item);
    });
  });
});
