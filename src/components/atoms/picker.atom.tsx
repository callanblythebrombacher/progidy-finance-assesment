import React, {useState} from 'react';
import {PickerProps} from '../../interfaces/atom.interfaces.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import {View} from 'react-native';
import {pickerStyles as styles} from '../styles/atoms.styles.ts';

export const PickerComponent: React.FC<PickerProps> = ({
  items,
  setValue,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [selectItems, setSelectItems] = useState(items);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={selectItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setSelectItems}
      />
    </View>
  );
};
