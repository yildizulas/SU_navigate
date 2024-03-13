import React, { useState, useRef, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../navigation/SearchBar';
import markers from '../navigation/markers';  // İşaretçilerin tanımlandığı dosya

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

  useEffect(() => {
    if (isMapReady && mapRef.current) {
      // Map boundary settings can be adjusted here
    }
  }, [isMapReady, region]);

  const onMapLayout = () => {
    setMapReady(true);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            onPress={toggleModal}
          >
            <Icon name={marker.icon} size={30} color={marker.color} />
          </Marker>
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>FENS Entrance Details</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleModal}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
