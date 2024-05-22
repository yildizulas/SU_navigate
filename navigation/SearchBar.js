// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {

  // This function is now dedicated to updating the search query state.
  const handleChangeText = (query) => {
    setSearchQuery(query);
  };

  // This will be triggered when the user submits their search query.
  const handleSubmitEditing = () => {
    onSearch(searchQuery);
  };

  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Try “FENS” or “Akbank” etc."
      value={searchQuery}
      onChangeText={handleChangeText} // Only update searchQuery on text change
      onSubmitEditing={handleSubmitEditing} // Trigger search on submit
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 12,
    left: 10,
    right: 10, // Adjust based on your layout
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
