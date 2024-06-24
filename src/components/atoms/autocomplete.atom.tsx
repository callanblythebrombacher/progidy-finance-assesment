import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {List} from 'react-native-paper';
import {autoCompleteStyles as styles} from '../styles/atom.styles';
import {AutoCompleteProps} from '../interfaces/atom.interfaces';

export const AutocompleteAtom: React.FC<AutoCompleteProps> = ({
  autocompleteData,
}) => {
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

  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(screenHeight);

  useEffect(() => {
    const updateHeight = ({window: {height}}: any) => {
      setHeight(height);
    };
    Dimensions.addEventListener('change', updateHeight);
  }, []);

  return (
    <View
      style={[
        styles.autocompleteListContainer,
        {
          height:
            autocompleteData && autocompleteData.length > 0 ? height - 60 : 0,
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
