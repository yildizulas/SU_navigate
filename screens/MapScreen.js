import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import ways from '../data/ways.json';
import colors from '../styles/colors.js';

const MapScreen = () => {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.89360763590254, // Güncellenmiş kampüs enlem koordinatı
            longitude: 29.380166148372258, // Güncellenmiş kampüs boylam koordinatı
            latitudeDelta: 0.01, // Uygun zoom seviyesi için ayarlanmış delta değeri
            longitudeDelta: 0.01, // Uygun zoom seviyesi için ayarlanmış delta değeri
          }}
        >
          {ways.map((way, index) => (
            <Polyline
              key={index}
              coordinates={way.coords.map(({ lat, lon }) => ({
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
              }))}
              strokeColor={colors.primary.lightBlue1} // Yolun rengi için ana renkleri kullan
              strokeWidth={3} // Yolun kalınlığı
            />
          ))}
        </MapView>
        {/* Arama çubuğu ekleyelim */}
        <TextInput
          style={styles.searchBar}
          placeholder="Try “FENS” or “Akbank” etc."
          placeholderTextColor={colors.blackAndWhite.mediumGrey}
        />
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: colors.blackAndWhite.lightestGrey,
    borderRadius: 20,
    fontSize: 15,
    padding: 15,
    elevation: 5, // Sadece Android için gölge efekti
    shadowColor: colors.blackAndWhite.black, // Sadece iOS için gölge efekti
    shadowOffset: { width: 0, height: 2 }, // Sadece iOS için gölge efekti
    shadowOpacity: 0.1, // Sadece iOS için gölge efekti
    shadowRadius: 5, // Sadece iOS için gölge efekti
  },
  // Diğer stiller...
});

export default MapScreen;
