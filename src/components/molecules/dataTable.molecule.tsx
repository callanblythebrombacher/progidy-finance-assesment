import React, {useEffect, useRef, useState} from 'react';
import {DataTable, Icon} from 'react-native-paper';
import {TableHeader} from '../atoms/tableHeader.atom';
import {TableRow} from '../atoms/tablerow.atom';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {SwipeableComponent} from '../atoms/swipeable.atom';
import {tableStyles as styles} from '../styles/molecules.styles';
import {DataTableProps} from '../interfaces/molecules.interfaces';

export const Table: React.FC<DataTableProps> = ({
  headerRow,
  tableRows,
  handleDelete,
  page,
  setPage,
}) => {
  const refsArray = useRef<
    (React.ElementRef<typeof SwipeableComponent> | null)[]
  >([]);
  const [numberOfItemsPerPageList] = useState([15, 30, 60]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableRows.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight);

  useEffect(() => {
    const updateHeight = ({window: {height}}: any) => {
      setHeight(height);
    };
    Dimensions.addEventListener('change', updateHeight);
  }, []);

  const renderRightActions = (rowData: any, index: number) => (
    <TouchableOpacity
      onPress={() => {
        if (refsArray.current[index]) {
          refsArray.current[index]?.close(); // Ensure the ref exists before calling close()
        }
        handleDelete(rowData[0].item);
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
        style={[styles.scrollView, {height: height - 150}]}>
        {tableRows.slice(from, to).map((row, index) => {
          const tableRow = <TableRow key={index} cellData={row.data} />;

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
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${tableRows.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </ScrollView>
    </DataTable>
  );
};
