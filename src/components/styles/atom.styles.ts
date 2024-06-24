import {StyleSheet} from 'react-native';

export const autoCompleteStyles = StyleSheet.create({
  autoCompleteListItem: {
    backgroundColor: 'white',
    borderBottomColor: '#e7e7e7',
    borderBottomWidth: 1,
    height: 60,
  },
  autocompleteListContainer: {
    position: 'absolute',
    width: '100%',
    top: 65, // Adjust as needed based on your layout
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export const tableStyles = StyleSheet.create({
  tableHeader: {backgroundColor: '#dddddd', width: '100%'},
  tableRow: {height: 70, backgroundColor: 'white'},
});

export const pickerStyles = StyleSheet.create({
  container: {
    zIndex: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
  },
});
