import {useState} from 'react';

/**
 * Custom hook to manage search query state.
 * @param initialQuery Initial value for search query (default: empty string).
 * @returns An object with functions and state to manage search query.
 */
const useSearch = (initialQuery: string = '') => {
  // State to hold the current search query
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Function to update search query state
  const handleSearch = (text: string) => setSearchQuery(text);

  // Function to clear search query (set it to an empty string)
  const handleClearInput = () => setSearchQuery('');

  // Return functions and state to be used by components
  return {
    setSearchQuery, // Function to set search query
    searchQuery, // Current search query state
    handleSearch, // Function to handle search input changes
    handleClearInput, // Function to clear search input
  };
};

export default useSearch;
