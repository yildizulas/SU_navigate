// SearchBar.js
import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../styles/colors.js';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <TextInput
      style={styles.searchBar}
      value={searchTerm}
      onChangeText={handleSearch}
      placeholder="Try “FENS” or “Akbank” etc."
      placeholderTextColor={colors.blackAndWhite.mediumGrey}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: colors.blackAndWhite.lightestGrey,
    borderRadius: 25,
    fontSize: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default SearchBar;
