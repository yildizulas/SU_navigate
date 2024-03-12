// MapScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../navigation/SearchBar'; 

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
      // Map boundary settings can be adjusted here
    }
  }, [isMapReady, region]);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onLayout={onMapLayout}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomIn(mapRef, region, setRegion)}>
          <Icon name="plus" style={styles.zoomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomOut(mapRef, region, setRegion)}>
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
  zoomContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  
});

export default MapScreen;
