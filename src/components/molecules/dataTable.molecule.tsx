import React, {useEffect, useState} from 'react';
import {DataTable, Icon} from 'react-native-paper';
import {TableHeader} from '../atoms/tableHeader.atom';
import {TableRow} from '../atoms/tablerow.atom';
import {ScrollView, TouchableOpacity} from 'react-native';
import {SwipeableComponent} from '../atoms/swipeable.atom';
import {tableStyles as styles} from '../styles/molecules.styles';
import {DataTableProps} from '../../interfaces/molecules.interfaces';
import usePagination from '../../hooks/usePagination';
import useScreenHeight from '../../hooks/useScreenHeight';
import useSwipeableRefs from '../../hooks/useSwipeableRefs';
import {current} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {resetDeletionEvent} from '../../redux/reducers/country.slice.ts';

export const Table: React.FC<DataTableProps> = ({
  headerRow,
  tableRows,
  handleDelete,
  page,
  setPage,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const refsArray = useSwipeableRefs(tableRows.length);
  const screenHeight = useScreenHeight();
  const {from, to, numberOfItemsPerPageList, itemsPerPage, setItemsPerPage} =
    usePagination(tableRows.length, currentPage);
  const dispatch: AppDispatch = useDispatch();
  const deletionEvent = useSelector(
    (state: RootState) => state.countryReducer.deletionEvent,
  );

  useEffect(() => {
    if (deletionEvent) {
      setPage(0);
      dispatch(resetDeletionEvent());
    }
  }, [tableRows]);

  const renderRightActions = (rowData: any, index: number) => (
    <TouchableOpacity
      onPress={() => {
        if (refsArray.current[index]) {
          refsArray.current[index]?.close();
        }
        handleDelete(rowData[0].item);
        // Adjust page if the last page becomes empty after deleting an item
        if (tableRows.length % itemsPerPage === 1 && page > 0) {
          setPage(page - 1);
        }
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
        style={[styles.scrollView, {height: screenHeight - 150}]}>
        {tableRows.slice(from, to).map((row, index) => {
          const tableRow = (
            <TableRow key={index} cellData={row.data} isActive={row.isActive} />
          );

          return (
            <SwipeableComponent
              ref={ref => (refsArray.current[index] = ref)}
              key={index}
              renderRightActions={() => renderRightActions(row.data, index)}>
              {tableRow}
            </SwipeableComponent>
          );
        })}
        <DataTable.Pagination
          style={styles.pagination}
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
      </ScrollView>
    </DataTable>
  );
};
