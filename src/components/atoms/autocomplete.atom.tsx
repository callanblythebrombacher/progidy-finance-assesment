import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {autoCompleteStyles as styles} from '../styles/atom.styles.ts';
import {AutoCompleteProps} from '../interfaces/atom.interfaces.ts';

export const AutocompleteAtom: React.FC<AutoCompleteProps> = ({
  autocompleteData,
}) => {
  let renderItem;

  if (autocompleteData === undefined) {
    renderItem = () => (
      <List.Item
        style={styles.autoCompleteListItem}
        title={'no matching results'}
      />
    );
  } else {
    renderItem = ({
      item,
    }: {
      item: {
        listTitle: string;
        onPress: () => void;
        [key: string]: any;
      };
    }) => (
      <List.Item
        style={styles.autoCompleteListItem}
        title={item.listTitle}
        onPress={item.onPress}
      />
    );
  }

  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        styles.autocompleteListContainer,
        {
          height:
            autocompleteData !== undefined && autocompleteData.length > 0
              ? windowHeight
              : 0,
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
