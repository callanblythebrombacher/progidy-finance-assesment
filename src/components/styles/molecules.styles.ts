import {StyleSheet} from 'react-native';
export const tableStyles = StyleSheet.create({
  table: {
    position: 'relative',
    zIndex: 1,
    top: 10,
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
    alignItems: 'center',
  },
});

export const searchBarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    zIndex: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  iconButton: {
    position: 'absolute',
    right: 3,
    top: 9,
  },
});
