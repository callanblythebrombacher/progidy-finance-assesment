import {useState} from 'react';

const useSearch = (initialQuery: string = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (text: string) => setSearchQuery(text);

  const handleClearInput = () => setSearchQuery('');

  return {
    setSearchQuery,
    searchQuery,
    handleSearch,
    handleClearInput,
  };
};

export default useSearch;
