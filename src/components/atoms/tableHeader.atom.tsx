import React from 'react';
import {DataTable} from 'react-native-paper';
import {tableStyles as styles} from '../styles/atoms.styles.ts';
import {TableHeaderProps} from '../../interfaces/atom.interfaces.ts';
export const TableHeader: React.FC<TableHeaderProps> = ({headerData}) => {
  return (
    <DataTable.Header style={styles.tableHeader}>
      {headerData.map(({item, isNumeric}, index) => (
        <DataTable.Title key={index} numeric={isNumeric ? true : undefined}>
          {item}
        </DataTable.Title>
      ))}
    </DataTable.Header>
  );
};
