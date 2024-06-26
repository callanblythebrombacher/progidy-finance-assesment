import React from 'react';
import {shallow} from 'enzyme';
import {DataTable} from 'react-native-paper';
import {TableHeader} from '../tableHeader.atom.tsx';
import {tableStyles as styles} from '../../styles/atoms.styles.ts';

import {describe, jest, beforeEach, afterEach, expect, it} from '@jest/globals';

describe('TableHeader Atom', () => {
  const mockHeaderData = [
    {item: 'Name', isNumeric: false},
    {item: 'Age', isNumeric: true},
    {item: 'City', isNumeric: false},
  ];

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<TableHeader headerData={mockHeaderData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders DataTable.Header component', () => {
    const dataTableHeader = wrapper.find(DataTable.Header);
    expect(dataTableHeader).toHaveLength(1);
    expect(dataTableHeader.prop('style')).toEqual(
      expect.objectContaining(styles.tableHeader),
    );
  });

  it('renders DataTable.Title components with correct props', () => {
    const dataTableTitles = wrapper.find(DataTable.Title);
    expect(dataTableTitles).toHaveLength(mockHeaderData.length);

    mockHeaderData.forEach((header, index) => {
      const dataTableTitle = dataTableTitles.at(index);
      expect(dataTableTitle.prop('numeric')).toBe(header.isNumeric);
      expect(dataTableTitle.children().text()).toBe(header.item);
    });
  });
});
