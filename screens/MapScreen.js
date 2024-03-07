import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import Icon from 'react-native-vector-icons/FontAwesome';

const MapScreen = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 40.89360763590254,
    longitude: 29.380166148372258,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (isMapReady && mapRef.current) {
      // Burada harita sınırlarını ayarlayabilirsiniz
    }
  }, [isMapReady, region]);

  const onMapLayout = () => {//amaaan
    setMapReady(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Arama işlevselliği burada uygulanabilir
  };

  const handleZoomIn = () => zoomIn(mapRef, region, setRegion);
  const handleZoomOut = () => zoomOut(mapRef, region, setRegion);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Try “FENS” or “Akbank” etc."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onLayout={onMapLayout}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Icon name="plus" style={styles.zoomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Icon name="minus" style={styles.zoomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  zoomButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 2,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 1 },
    marginVertical: 5,
    width: 40,
    height: 40,
  },
  zoomIcon: {
    fontSize: 24,
    color: 'black',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
  zoomContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default MapScreen;
