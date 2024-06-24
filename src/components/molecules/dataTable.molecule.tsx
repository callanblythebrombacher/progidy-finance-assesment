import React, {ReactNode, useEffect} from 'react';
import {DataTable, Icon} from 'react-native-paper';
import {TableHeader} from '../atoms/tableHeader.atom.tsx';
import {TableRow} from '../atoms/tablerow.atom.tsx';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {SwipeableComponent} from '../atoms/swipeable.atom.tsx';
import {tableStyles as styles} from '../styles/molecules.styles.ts';
import {DataTableProps} from '../interfaces/molecules.interfaces.ts';

export const Table: React.FC<DataTableProps> = ({
  headerRow,
  tableRows,
  handleDelete,
  page,
  setPage,
}) => {
  const [numberOfItemsPerPageList] = React.useState([15, 30, 60]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const from = page * itemsPerPage;

  const to = Math.min((page + 1) * itemsPerPage, tableRows.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = React.useState(screenHeight);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      setHeight(height);
    });
  }, []);

  return (
    <DataTable style={styles.table}>
      <TableHeader headerData={headerRow} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.scrollView, {height: height - 220}]}>
        {tableRows.slice(from, to).map((row, index) => {
          const tableRow = <TableRow cellData={row.data} />;

          const renderRightActions = () => (
            <TouchableOpacity
              onPress={() => handleDelete(row.data[0].item)}
              style={styles.deleteButtonView}>
              <Icon source="delete" color="#fff" size={30} />
            </TouchableOpacity>
          );
          return row.isSwipeable ? (
            <SwipeableComponent
              key={index}
              renderRightActions={renderRightActions}>
              {tableRow}
            </SwipeableComponent>
          ) : (
            tableRow
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
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </ScrollView>
    </DataTable>
  );
};
