import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
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
  const [isMapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (isMapReady && mapRef.current) {
      // ...
    }
  }, [isMapReady, region]);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  // Zoom fonksiyonlarını ZoomControls.js'den çağırın
  const handleZoomIn = () => zoomIn(mapRef, region, setRegion);
  const handleZoomOut = () => zoomOut(mapRef, region, setRegion);

  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    elevation: 2, // Android için gölge efekti
    shadowOpacity: 0.25, // iOS için gölge efekti
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 1 },
    marginVertical: 5,
  },
  zoomText: {
    fontSize: 20,
    color: '#000',
  },
});

export default MapScreen;
