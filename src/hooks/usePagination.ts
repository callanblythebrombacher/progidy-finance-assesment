import {useState, useEffect, SetStateAction, Dispatch} from 'react';

const usePagination = (tableRowsLength: number, page: number) => {
  const [numberOfItemsPerPageList] = useState([15, 30, 60]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableRowsLength);

  return {
    numberOfItemsPerPageList,
    itemsPerPage,
    setItemsPerPage,
    from,
    to,
  };
};

export default usePagination;
