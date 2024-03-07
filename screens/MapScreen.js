import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { zoomIn, zoomOut } from '../navigation/ZoomControls'; // ZoomControls.js'den fonksiyonları import edin

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
      // Harita sınırlarını ayarlama işlevi önceki kod örneğinde yoktu,
      // bu nedenle burada kullanılmıyor.
    }
  }, [isMapReady, region]);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Arama işlevselliğini burada uygulayabilirsiniz
    // Örneğin, markerları filtreleme veya harita görünümünü ayarlama
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
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Stil tanımlamalarını iki kod parçasından birleştirin
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  zoomButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 1 },
    marginVertical: 5,
  },
  zoomText: {
    fontSize: 20,
    color: 'black',
  },
});

export default MapScreen;
