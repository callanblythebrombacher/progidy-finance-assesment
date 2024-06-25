import React from 'react';
import {FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {autoCompleteStyles as styles} from '../styles/atoms.styles';
import {AutoCompleteProps} from '../../interfaces/atom.interfaces.ts';
import useScreenDimensions from '../../hooks/useScreenDimensions';

export const Autocomplete: React.FC<AutoCompleteProps> = ({
  autocompleteData,
  onItemPress,
}) => {
  const {height, width} = useScreenDimensions();

  const renderItem = ({
    item,
  }: {
    item: {listTitle: string; onPress: () => void};
  }) => (
    <List.Item
      style={styles.item}
      title={item.listTitle}
      onPress={() => {
        onItemPress(item.listTitle);
        item.onPress();
      }}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          height:
            autocompleteData && autocompleteData.length > 0
              ? height - (height > width ? 100 : 80)
              : 0,
          width: width,
        },
      ]}>
      <FlatList
        data={autocompleteData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
