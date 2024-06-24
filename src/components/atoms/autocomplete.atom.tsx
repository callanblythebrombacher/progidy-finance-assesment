import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {autoCompleteStyles as styles} from '../styles/atom.styles';
import {AutoCompleteProps} from '../interfaces/atom.interfaces';

export const Autocomplete: React.FC<AutoCompleteProps> = ({
  autocompleteData,
}) => {
  // Function to render each item in the FlatList
  const renderItem = ({
    item,
  }: {
    item: {
      listTitle: string;
      onPress: () => void;
    };
  }) => (
    <List.Item
      style={styles.autoCompleteListItem}
      title={item.listTitle}
      onPress={item.onPress}
    />
  );

  // State to manage screen dimensions
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight);
  const [width, setWidth] = useState(screenHeight); // Should be 'screenWidth'

  // Effect to update dimensions on screen change
  useEffect(() => {
    const updateHeight = ({window: {height, width}}: any) => {
      setHeight(height);
      setWidth(width);
    };
    Dimensions.addEventListener('change', updateHeight);
  }, []);

  return (
    <View
      style={[
        styles.autocompleteListContainer,
        {
          height:
            autocompleteData && autocompleteData.length > 0
              ? height - (height > width ? 100 : 80) // Adjust height based on screen orientation
              : 0,
          width: width,
        },
      ]}>
      <FlatList
        data={autocompleteData} // Data to be rendered in FlatList
        renderItem={renderItem} // Render method for each item
        keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList
      />
    </View>
  );
};
