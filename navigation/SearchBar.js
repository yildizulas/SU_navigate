// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import SearchBar from '../navigation/SearchBar'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  // Define the handleSearch function
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality here
    // For example, filtering markers or adjusting the map view
  };

  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Try “FENS” or “Akbank” etc."
      value={searchQuery}
      onChangeText={handleSearch} // Use the handleSearch function
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute', // Ensure the search bar is positioned over the map
    top: Platform.OS === 'ios' ? 40 : 20, // Adjust top position to ensure visibility
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10, // Ensure searchBar is on top
  },
});

export default SearchBar;