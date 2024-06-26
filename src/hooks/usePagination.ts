import {useState} from 'react';

/**
 * Custom hook to manage pagination logic.
 * @param tableRowsLength The total number of rows in the table.
 * @param page The current page index.
 * @returns An object containing pagination state and functions.
 */
const usePagination = (tableRowsLength: number, page: number) => {
  const [numberOfItemsPerPageList] = useState([15, 30, 60]); // Array of items per page options
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]); // State for items per page

  // Calculate the starting index (from) and ending index (to) of the displayed rows on the current page
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableRowsLength);

  return {
    numberOfItemsPerPageList, // List of available items per page options
    itemsPerPage, // Current number of items per page
    setItemsPerPage, // Function to set the number of items per page
    from, // Starting index of displayed rows on the current page
    to, // Ending index of displayed rows on the current page
  };
};

export default usePagination;
