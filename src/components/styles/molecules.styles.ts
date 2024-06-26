import {StyleSheet} from 'react-native';
export const tableStyles = StyleSheet.create({
  table: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  deleteButtonView: {
    backgroundColor: 'red',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
});

export const searchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: 210,
    zIndex: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  iconButton: {
    position: 'absolute',
    right: 3,
    top: 0,
  },
});
