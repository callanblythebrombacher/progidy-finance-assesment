import React from 'react';
import {DataTable} from 'react-native-paper';
import {tableStyles as styles} from '../styles/atom.styles.ts';
import {TableRowProps} from '../interfaces/atom.interfaces.ts';

export const TableRow: React.FC<TableRowProps> = ({cellData}) => {
  return (
    <DataTable.Row style={styles.tableRow}>
      {cellData.map(({item, isNumeric}, index) => (
        <DataTable.Cell key={index} numeric={isNumeric ? true : undefined}>
          {item}
        </DataTable.Cell>
      ))}
    </DataTable.Row>
  );
};
