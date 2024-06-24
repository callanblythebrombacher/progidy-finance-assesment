import {
  AutoCompleteData,
  CellData,
  HeaderData,
  TableRowProps,
} from './atom.interfaces.ts';
import {Dispatch, ReactNode, SetStateAction} from 'react';

export type TableRows = {
  isSwipeable: boolean;
  data: CellData;
  swipeableOnPress?: () => void;
  swipeableRenderItem?: ReactNode;
}[];

export interface DataTableProps {
  headerRow: HeaderData;
  tableRows: TableRows;
  handleDelete: (itemToDelete: string) => void;
}

export interface SearchBarProps {
  searchData: AutoCompleteData;
  clearFilteredSearch: () => void;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
