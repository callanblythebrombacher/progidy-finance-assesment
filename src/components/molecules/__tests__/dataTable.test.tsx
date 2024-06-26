import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Table} from '../dataTable.molecule';
import {resetDeletionEvent} from '../../../redux/reducers/country.slice';
import usePagination from '../../../hooks/usePagination';
import useSwipeableRefs from '../../../hooks/useSwipeableRefs';
import useScreenDimensions from '../../../hooks/useScreenDimensions';
import {useSelector, useDispatch} from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../../hooks/usePagination');
jest.mock('../../../hooks/useSwipeableRefs');
jest.mock('../../../hooks/useScreenDimensions');
jest.mock('../../atoms/tableHeader.atom', () => ({
  TableHeader: () => 'TableHeader',
}));
jest.mock('../../atoms/tableRow.atom', () => ({
  TableRow: () => 'TableRow',
}));
jest.mock('../../atoms/swipeable.atom', () => ({
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
    const {toJSON} = render(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders TableHeader and TableRow components', () => {
    const {getByText} = render(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(getByText('TableHeader')).toBeTruthy();
    expect(getByText('TableRow')).toBeTruthy(); // Assumes TableRow renders some identifiable content
  });

  it('renders SwipeableComponent for each row', () => {
    const {getAllByText} = render(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(getAllByText('SwipeableComponent')).toHaveLength(
      mockTableRows.length,
    );
  });

  it('calls handleDelete when delete action is triggered', () => {
    const {getByText} = render(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    fireEvent.press(getByText('Row1'));
    expect(mockHandleDelete).toHaveBeenCalledWith('Row1');
  });

  it('resets page and dispatches resetDeletionEvent on tableRows change', () => {
    render(
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
    const {getByTestId} = render(
      <Table
        headerRow={mockHeaderRow}
        tableRows={mockTableRows}
        handleDelete={mockHandleDelete}
        page={0}
        setPage={mockSetPage}
      />,
    );

    const pagination = getByTestId('data-table-pagination');
    expect(pagination.props.page).toBe(0);
    expect(pagination.props.numberOfPages).toBe(1);
    expect(pagination.props.numberOfItemsPerPageList).toEqual([10, 20, 30]);
    expect(pagination.props.numberOfItemsPerPage).toBe(10);
  });
});
