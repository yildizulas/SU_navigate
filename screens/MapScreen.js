import React from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import ways from '../data/ways.json';
import colors from '../styles/colors.js'; // Renklerin yolu doğru sağlandığından emin olun

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kampüs Haritası</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.89360763590254,
          longitude: 29.380166148372258,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {ways.map((way, index) => (
          <Polyline
            key={index}
            coordinates={way.coords.map(({ lat, lon }) => ({
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
            }))}
            strokeColor={colors.primary.mediumBlue} // Polyline rengini mediumBlue olarak güncelle
            strokeWidth={3}
          />
        ))}
      </MapView>
      <TextInput
        style={styles.searchBar}
        placeholder="Try “FENS” or “Akbank” etc."
        placeholderTextColor={colors.blackAndWhite.mediumGrey}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary.darkBlue, // Header ve SafeAreaView arka plan rengi
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
    top: 70,
    left: 20,
    right: 20,
    backgroundColor: colors.blackAndWhite.lightestGrey, // Arama çubuğu arka plan rengini lightestGrey olarak güncelle
    borderRadius: 25,
    fontSize: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  // Diğer stil tanımları...
});

export default MapScreen;
