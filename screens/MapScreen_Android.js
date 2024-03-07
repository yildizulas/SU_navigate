// Artık Gereksiz
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen_Android = () => {
  return (
    
    <MapView
      provider={PROVIDER_GOOGLE} // Google Maps'i kullan
      style={{ flex: 1 }}
      region={{
        latitude: 40.89360763590254,
        longitude: 29.380166148372258,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      }}
    />
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
});

export default MapScreen_Android;
