import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {ItemType, ValueType} from 'react-native-dropdown-picker';

export type AutoCompleteData = {
  listTitle: string;
  onPress: () => void;
  [key: string]: any;
}[];
export interface AutoCompleteProps {
  autocompleteData: AutoCompleteData | undefined;
  onItemPress: (itemTitle: string) => void;
}

export interface SwipeableComponentProps {
  children: ReactNode[] | ReactNode;
  renderRightActions: () => ReactNode;
  friction?: number;
  rightThreshold?: number;
}

export type HeaderData = {
  item: string | number;
  isNumeric: boolean;
}[];
export interface TableHeaderProps {
  headerData: HeaderData;
}

export type CellData = {
  item: string;
  isNumeric: boolean;
}[];

export interface TableRowProps {
  cellData: CellData;
  isActive: boolean;
}

export interface PickerProps {
  items: ItemType<ValueType>[];
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
