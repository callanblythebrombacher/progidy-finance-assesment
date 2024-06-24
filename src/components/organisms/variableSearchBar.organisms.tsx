import React from 'react';
import {SearchBar} from '../molecules/searchBar.molecure.tsx';
import {PickerComponent} from '../atoms/picker.atom.tsx';
import {VariableSearchBarProps} from '../interfaces/organism.interfaces.ts';
import {View} from 'react-native';
import {variableSearchBarStyles as styles} from '../styles/organisms.styles.ts';
export const VariableSearchBar: React.FC<VariableSearchBarProps> = ({
  searchBarProps,
  pickerProps,
}) => {
  return (
    <View style={styles.container}>
      <SearchBar {...searchBarProps} />
      <PickerComponent {...pickerProps} />
    </View>
  );
};
