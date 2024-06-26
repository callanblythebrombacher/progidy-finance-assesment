import React from 'react';
import {shallow} from 'enzyme';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {Table} from '../dataTable.molecule.tsx';
import {TableHeader} from '../../atoms/tableHeader.atom';
import {TableRow} from '../../atoms/tableRow.atom.tsx';
import {SwipeableComponent} from '../../atoms/swipeable.atom';
import {resetDeletionEvent} from '../../../redux/reducers/country.slice';
import usePagination from '../../../hooks/usePagination';
import useSwipeableRefs from '../../../hooks/useSwipeableRefs';
import useScreenDimensions from '../../../hooks/useScreenDimensions';
import {RootState} from '../../../redux/store';

import {jest, describe, beforeEach, afterEach, expect, it} from '@jest/globals';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../src/hooks/usePagination');
jest.mock('../src/hooks/useSwipeableRefs');
jest.mock('../src/hooks/useScreenDimensions');
jest.mock('../src/atoms/tableHeader.atom', () => ({
  TableHeader: () => 'TableHeader',
}));
jest.mock('../src/atoms/tablerow.atom', () => ({
  TableRow: () => 'TableRow',
}));
jest.mock('../src/atoms/swipeable.atom', () => ({
  SwipeableComponent: jest.fn(({children}) => children),
}));

describe('Table Component', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector as jest.Mock;
  const mockUseDispatch = useDispatch as jest.Mock;

  const mockHeaderRow = [{item: 'Header1', isNumeric: false}];
  const mockTableRows = [
    {data: [{item: 'Row1', isNumeric: false}], isActive: true},
    {data: [{item: 'Row2', isNumeric: false}], isActive: true},
  ];
  const mockHandleDelete = jest.fn();
  const mockSetPage = jest.fn();

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue(false);
    (usePagination as jest.Mock).mockReturnValue({
      from: 0,
      to: 1,
      numberOfItemsPerPageList: [10, 20, 30],
      itemsPerPage: 10,
      setItemsPerPage: jest.fn(),
    });
    (useSwipeableRefs as jest.Mock).mockReturnValue({current: []});
    (useScreenDimensions as jest.Mock).mockReturnValue({height: 800});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const wrapper = shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders TableHeader and TableRow components', () => {
    const wrapper = shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(wrapper.find(TableHeader)).toHaveLength(1);
    expect(wrapper.find(TableRow)).toHaveLength(mockTableRows.length);
  });

  it('renders SwipeableComponent for each row', () => {
    const wrapper = shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(wrapper.find(SwipeableComponent)).toHaveLength(mockTableRows.length);
  });

  it('calls handleDelete when delete action is triggered', () => {
    const wrapper = shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    const deleteButton = wrapper.find(TouchableOpacity).at(0);
    deleteButton.simulate('press');
    expect(mockHandleDelete).toHaveBeenCalledWith('Row1');
  });

  it('resets page and dispatches resetDeletionEvent on tableRows change', () => {
    shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(mockSetPage).toHaveBeenCalledWith(0);
    expect(mockDispatch).toHaveBeenCalledWith(resetDeletionEvent());
  });

  it('renders DataTable.Pagination with correct props', () => {
    const wrapper = shallow(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    const pagination = wrapper.find(DataTable.Pagination);
    expect(pagination).toHaveLength(1);
    expect(pagination.prop('page')).toBe(0);
    expect(pagination.prop('numberOfPages')).toBe(1);
    expect(pagination.prop('numberOfItemsPerPageList')).toEqual([10, 20, 30]);
    expect(pagination.prop('numberOfItemsPerPage')).toBe(10);
  });
});
