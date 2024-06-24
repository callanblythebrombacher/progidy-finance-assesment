import {SearchBarProps, TableRows} from './molecules.interfaces.ts';
import {HeaderData, PickerProps} from './atom.interfaces.ts';

export type TableConfig = {
  searchBarConfig: SearchBarProps;
  pickerConfig: PickerProps;
  headerConfig: HeaderData;
  rowConfig: TableRows;
};

export interface FilterableDataTableTemplateProps {
  tableConfig: TableConfig;
  handleDelete: (itemToDelete: string) => void;
}
