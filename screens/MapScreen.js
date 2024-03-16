import React, { useState, useRef, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../navigation/SearchBar';
import markers from '../navigation/markers';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import * as Location from 'expo-location';

const MapScreen = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 40.890817,
    longitude: 29.379623,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapReady, setMapReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    (async () => {
      console.log("Attempting to fetch current location...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
    const latDelta = newRegion.latitudeDelta;
    const newZoomLevel = Math.round(Math.log(360 / latDelta) / Math.LN2);
    setZoomLevel(newZoomLevel);
  };

  const handleMarkerPress = (marker) => {
    console.log("Marker pressed:", marker.id);
    setModalVisible(true);
  };

  
  const goToCurrentLocation = async () => {
    console.log("Attempting to fetch current location...");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      console.log("Current location fetched:", location);

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      };

      mapRef.current.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        onLayout={onMapLayout}
        showsUserLocation={true}
      >
        {markers.filter(marker => zoomLevel > 17.5).map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            onPress={() => handleMarkerPress(marker)}
          >
            <Icon name={marker.icon} size={30} color={marker.color} />
          </Marker>
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Entrance Details</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomIn(mapRef, region, setRegion)}>
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomOut(mapRef, region, setRegion)}>
          <Icon name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.myLocationButton} onPress={goToCurrentLocation}>
        <Icon name="crosshairs" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  zoomContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  myLocationButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { height: 1, width: 1 },
  },
});

export default MapScreen;
