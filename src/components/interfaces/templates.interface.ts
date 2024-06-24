import {SearchBarProps, TableRows} from './molecules.interfaces.ts';
import {HeaderData, PickerProps} from './atom.interfaces.ts';
import {Dispatch, SetStateAction} from 'react';

export type TableConfig = {
  searchBarConfig: SearchBarProps;
  pickerConfig: PickerProps;
  headerConfig: HeaderData;
  rowConfig: TableRows;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export interface FilterableDataTableTemplateProps {
  tableConfig: TableConfig;
  handleDelete: (itemToDelete: string) => void;
}
