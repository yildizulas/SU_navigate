// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
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
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    zIndex: 10,
  },
});

export default SearchBar;
