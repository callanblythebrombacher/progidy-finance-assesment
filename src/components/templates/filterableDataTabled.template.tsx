import React from 'react';
import {VariableSearchBar} from '../organisms/variableSearchBar.organisms.tsx';
import {Table} from '../molecules/dataTable.molecule.tsx';
import {FilterableDataTableTemplateProps} from '../interfaces/templates.interface.ts';
import {View} from 'react-native';
import {filterableDataTableStyles as styles} from '../styles/templates.styles.ts';

export const FilterableDataTable: React.FC<
  FilterableDataTableTemplateProps
> = ({tableConfig, handleDelete}) => {
  const {
    page,
    setPage,
    searchBarConfig,
    pickerConfig,
    rowConfig,
    headerConfig,
  } = tableConfig;
  return (
    <View style={styles.wrapper}>
      <VariableSearchBar
        searchBarProps={searchBarConfig}
        pickerProps={pickerConfig}
      />
      <Table
        page={page}
        setPage={setPage}
        handleDelete={handleDelete}
        headerRow={headerConfig}
        tableRows={rowConfig}
      />
    </View>
  );
};
