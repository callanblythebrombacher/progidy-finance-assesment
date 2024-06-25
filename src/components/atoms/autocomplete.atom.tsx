import React from 'react';
import {FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {autoCompleteStyles as styles} from '../styles/atoms.styles';
import {AutoCompleteProps} from '../../interfaces/atom.interfaces.ts';
import useScreenDimensions from '../../hooks/useScreenDimensions';

/**
 * Autocomplete component displays a list of items based on autocompleteData.
 * Users can select an item, triggering onItemPress.
 */
export const Autocomplete: React.FC<AutoCompleteProps> = ({
  autocompleteData,
  onItemPress,
}) => {
  const {height, width} = useScreenDimensions(); // Hook to get screen dimensions

  /**
   * Renders each item in the FlatList.
   * @param item - Item object containing listTitle and onPress function.
   */
  const renderItem = ({
    item,
  }: {
    item: {listTitle: string; onPress: () => void};
  }) => (
    <List.Item
      style={styles.item}
      title={item.listTitle}
      onPress={() => {
        onItemPress(item.listTitle); // Trigger onItemPress with selected item's title
        item.onPress(); // Execute item-specific onPress function
      }}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          // Adjust container height based on whether autocompleteData is empty or not
          height:
            autocompleteData && autocompleteData.length > 0
              ? height - (height > width ? 100 : 80)
              : 0,
          width: width, // Set container width to screen width
        },
      ]}>
      {/* FlatList to render autocompleteData */}
      <FlatList
        data={autocompleteData}
        renderItem={renderItem} // Render each item using renderItem function
        keyExtractor={(item, index) => index.toString()} // Extract keys for each item
      />
    </View>
  );
};
