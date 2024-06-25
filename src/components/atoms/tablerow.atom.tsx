import React from 'react';
import {DataTable} from 'react-native-paper';
import {tableStyles as styles} from '../styles/atoms.styles.ts';
import {TableRowProps} from '../../interfaces/atom.interfaces.ts';

export const TableRow: React.FC<TableRowProps> = ({cellData, isActive}) => {
  if (!isActive) return null;
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
