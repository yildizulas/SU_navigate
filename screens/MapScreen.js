import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import ways from '../data/ways.json';
import pois from '../data/pois.json';
import colors from '../styles/colors.js';





// Özelleştirilmiş harita stilini tanımlayın
const customMapStyle = [
  {
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text',
    stylers: [{ visibility: 'off' }],
  },
  // Diğer tüm yer işaretlerini ve etiketleri gizleyin
];

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 40.89360763590254,
    longitude: 29.380166148372258,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const matchedPoi = pois.find(poi => poi.name.toLowerCase().includes(text.toLowerCase()));
      if (matchedPoi) {
        setRegion({
          latitude: matchedPoi.lat,
          longitude: matchedPoi.lon,
          latitudeDelta: 0.0022, // Zoom seviyesini ayarlayabilirsiniz
          longitudeDelta: 0.0021,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kampüs Haritası</Text>
      </View>
      <MapView
      provider={MapView.PROVIDER_GOOGLE}
      style={styles.map}
      region={region}
      customMapStyle={customMapStyle} // Özelleştirilmiş harita stilini kullan
      // ... Diğer MapView özellikleri
    >
        {ways.map((way, index) => (
          <Polyline
            key={index}
            coordinates={way.coords.map(({ lat, lon }) => ({
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            }))}
            strokeColor={colors.primary.mediumBlue}
            strokeWidth={3}
          />
        ))}
        {pois.map((poi, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(poi.lat),
            longitude: parseFloat(poi.lon),
          }}
          title={poi.name}
          // Opsiyonel olarak özelleştirilmiş Marker görünümü
        />
        ))}
      </MapView>
      <TextInput
        style={styles.searchBar}
        value={searchTerm}
        onChangeText={handleSearch}
        placeholder='Try “FENS” or “Akbank” etc.'
        placeholderTextColor={colors.blackAndWhite.mediumGrey}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.darkBlue,
  },
  header: {
    height: 60,
    backgroundColor: colors.primary.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerText: {
    color: colors.blackAndWhite.lightestGrey,
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 10,
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

export default MapScreen;
