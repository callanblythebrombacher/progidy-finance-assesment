import React from 'react';
import {render} from '@testing-library/react-native';
import {DataTable} from 'react-native-paper';
import {TableRow} from '../tableRow.atom';
import {tableStyles as styles} from '../../styles/atoms.styles';

import {describe, beforeEach, it, expect} from '@jest/globals';

describe('TableRow Atom', () => {
  const mockCellData = [
    {item: 'John Doe', isNumeric: false},
    {item: '25', isNumeric: true},
    {item: 'New York', isNumeric: false},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isActive is true', () => {
    const {toJSON} = render(
      <TableRow cellData={mockCellData} isActive={true} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('does not render when isActive is false', () => {
    const {queryByTestId} = render(
      <TableRow cellData={mockCellData} isActive={false} />,
    );
    expect(queryByTestId('data-table-row')).toBeNull();
  });

  it('renders DataTable.Row component', () => {
    const {getByTestId} = render(
      <TableRow cellData={mockCellData} isActive={true} />,
    );
    const dataTableRow = getByTestId('data-table-row');
    expect(dataTableRow).toBeTruthy();
    expect(dataTableRow.props.style).toEqual(styles.tableRow);
  });

  it('renders DataTable.Cell components with correct props', () => {
    const {getByText} = render(
      <TableRow cellData={mockCellData} isActive={true} />,
    );

    mockCellData.forEach(cell => {
      const dataTableCell = getByText(cell.item);
      expect(dataTableCell).toBeTruthy();
      expect(dataTableCell.props.numeric).toBe(cell.isNumeric);
    });
  });
});
