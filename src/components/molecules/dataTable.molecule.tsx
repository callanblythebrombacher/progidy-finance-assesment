import React, {useEffect} from 'react';
import {DataTable, Icon} from 'react-native-paper';
import {TableHeader} from '../atoms/tableHeader.atom';
import {TableRow} from '../atoms/tableRow.atom.tsx';
import {ScrollView, TouchableOpacity} from 'react-native';
import {SwipeableComponent} from '../atoms/swipeable.atom';
import {tableStyles as styles} from '../styles/molecules.styles';
import {DataTableProps} from '../../interfaces/molecules.interfaces';
import usePagination from '../../hooks/usePagination';
import useSwipeableRefs from '../../hooks/useSwipeableRefs';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {resetDeletionEvent} from '../../redux/reducers/country.slice.ts';
import useScreenDimensions from '../../hooks/useScreenDimensions.ts';

export const Table: React.FC<DataTableProps> = ({
  headerRow,
  tableRows,
  handleDelete,
  page,
  setPage,
}) => {
  // Custom hooks
  const refsArray = useSwipeableRefs(); // Hook to manage swipeable item refs
  const screenHeight = useScreenDimensions().height; // Hook to get screen height
  const screenWidth = useScreenDimensions().width; // Hook to get screen height
  const {from, to, numberOfItemsPerPageList, itemsPerPage, setItemsPerPage} =
    usePagination(tableRows.length, page); // Hook to manage pagination state

  const dispatch: AppDispatch = useDispatch(); // Redux dispatch function
  const deletionEvent = useSelector(
    (state: RootState) => state.countryReducer.deletionEvent,
  ); // Selecting deletionEvent from Redux store

  // Effect to handle deletion event and pagination adjustments
  useEffect(() => {
    // Check if deletionEvent is falsey (null or undefined)
    if (!deletionEvent) {
      setPage(0); // Reset page to 0
      dispatch(resetDeletionEvent()); // Dispatch resetDeletionEvent action to Redux store
    }
  }, [tableRows]); // Dependency array ensures effect runs when tableRows changes

  // Function to render right swipe actions for each row
  const renderRightActions = (rowData: any, index: number) => (
    <TouchableOpacity
      onPress={() => {
        if (refsArray.current[index]) {
          refsArray.current[index]?.close(); // Close swipeable if ref exists
        }
        handleDelete(rowData[0].item); // Handle delete action for the row
      }}
      style={styles.deleteButtonView}>
      <Icon source="delete" color="#fff" size={30} />
    </TouchableOpacity>
  );

  return (
    <DataTable style={styles.table}>
      <TableHeader headerData={headerRow} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[
          styles.scrollView,
          {
            height:
              screenWidth > 500
                ? screenHeight > screenWidth
                  ? screenHeight - 304
                  : screenHeight - 204
                : screenHeight > screenWidth
                ? screenHeight - 280
                : screenHeight - 224,
          },
        ]}>
        {tableRows.slice(from, to).map((row, index) => {
          const tableRow = (
            <TableRow key={index} cellData={row.data} isActive={row.isActive} />
          );

          // Wrap each TableRow in SwipeableComponent for swipe actions
          return (
            <SwipeableComponent
              ref={ref => (refsArray.current[index] = ref)}
              key={index}
              renderRightActions={() => renderRightActions(row.data, index)}>
              {tableRow}
            </SwipeableComponent>
          );
        })}
        {screenHeight < screenWidth && (
          <DataTable.Pagination
            style={[styles.pagination, {height: screenWidth > 500 ? 80 : 120}]}
            page={page}
            numberOfPages={Math.ceil(tableRows.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${tableRows.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel="Rows per page"
          />
        )}
      </ScrollView>
      {screenHeight > screenWidth && (
        <DataTable.Pagination
          style={[styles.pagination, {height: screenWidth > 500 ? 80 : 120}]}
          page={page}
          numberOfPages={Math.ceil(tableRows.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${tableRows.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel="Rows per page"
        />
      )}
    </DataTable>
  );
};
