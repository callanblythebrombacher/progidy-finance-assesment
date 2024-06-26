import React from 'react';
import {render} from '@testing-library/react-native';
import {TableHeader} from '../tableHeader.atom';
import {tableStyles as styles} from '../../styles/atoms.styles';

import {describe, it, expect} from '@jest/globals';

describe('TableHeader Atom', () => {
  const mockHeaderData = [
    {item: 'Name', isNumeric: false},
    {item: 'Age', isNumeric: true},
    {item: 'City', isNumeric: false},
  ];

  it('renders correctly', () => {
    const {toJSON} = render(<TableHeader headerData={mockHeaderData} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders DataTable.Header component', () => {
    const {getByTestId} = render(<TableHeader headerData={mockHeaderData} />);
    const dataTableHeader = getByTestId('data-table-header');
    expect(dataTableHeader).toBeTruthy();
    expect(dataTableHeader.props.style).toEqual(styles.tableHeader);
  });

  it('renders DataTable.Title components with correct props', () => {
    const {getByText} = render(<TableHeader headerData={mockHeaderData} />);

    mockHeaderData.forEach(header => {
      const dataTableTitle = getByText(header.item);
      expect(dataTableTitle).toBeTruthy();
      expect(dataTableTitle.props.numeric).toBe(header.isNumeric);
    });
  });
});
