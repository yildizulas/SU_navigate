import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import ways from '../data/ways.json';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // Kampüsün başlangıç koordinatları
        }}
      >
        {ways.map((way, index) => (
          <Polyline
            key={index}
            coordinates={way.coords.map(({ lat, lon }) => ({
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            }))}
            strokeColor="#000" // Yolun rengi, isteğe bağlı olarak değiştirilebilir
            strokeWidth={4} // Yolun kalınlığı, isteğe bağlı olarak değiştirilebilir
          />
        ))}
      </MapView>
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
});

export default MapScreen;
