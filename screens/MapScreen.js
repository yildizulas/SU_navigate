import React, { useState, useRef, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../navigation/SearchBar';
import { buildingDescriptions, markers } from '../navigation/markers';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 40.890817,
    longitude: 29.379623,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [selectedMarkerCategory, setSelectedMarkerCategory] = useState(null); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setVisibleMarkers([]);
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleSearch = async (query) => {
    const lowercasedQuery = query.toLowerCase();
    let closestMarker = null;
    let minDistance = Infinity;

    // Kullanıcının mevcut konumunu al
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const userLocation = { latitude: coords.latitude, longitude: coords.longitude };

    // Tüm marker'ları ve açıklamalarını kontrol et
    Object.keys(buildingDescriptions).forEach(key => {
      const descriptions = buildingDescriptions[key].toLowerCase().split('\n'); // Açıklama metinlerini böl ve küçük harfe çevir

      // Eğer sorgu açıklama metinlerinden herhangi birinde geçiyorsa
      if (descriptions.some(description => description.includes(lowercasedQuery))) {
        // Bu kategorideki tüm marker'ları kontrol et
        markers[key].forEach(marker => {
          const distance = getDistance(userLocation, marker.coordinate);
          if (distance < minDistance) {
            closestMarker = marker;
            minDistance = distance;
          }
        });
      }
    });

    if (closestMarker && region) {
      await fetchRouteData(userLocation, closestMarker.coordinate);
      setSelectedMarker(closestMarker); // En yakın marker'ı seçili marker olarak ayarla
      setModalVisible(true); // Modal'ı göster
    } else {
      console.log('No matching description or marker found');
      setRouteCoordinates([]);
    }
  };


  const handleMarkerPress = (marker, event) => {
    event.stopPropagation();
    setSelectedMarker(marker);
    setModalVisible(true);
  };
  
  // İki konum arasındaki mesafeyi hesaplayan fonksiyon
  const getDistance = (location1, location2) => {
    const rad = (x) => x * Math.PI / 180;
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(location2.latitude - location1.latitude);
    const dLong = rad(location2.longitude - location1.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(location1.latitude)) * Math.cos(rad(location2.latitude)) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);

    // Belirli bir zoom seviyesinden sonra marker'ları göster
    if (newRegion.latitudeDelta < 0.002 && newRegion.longitudeDelta < 0.004) {
      setVisibleMarkers(markers);
    } else {
      setVisibleMarkers([]);
    }
  };

  const fetchRouteData = async (startCoord, endCoord) => {
    const apiKey = 'AIzaSyBAJ6oNyIj-NLw95eFfGakiVy3mzOjE1_4'; // Replace this with your actual Google API key
    const mode = 'walking'; // You can change this to 'walking', 'bicycling' or 'transit'
    const origin = `${startCoord.latitude},${startCoord.longitude}`;
    const destination = `${endCoord.latitude},${endCoord.longitude}`;
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    try {
      const response = await fetch(directionsUrl);
      const json = await response.json();
      //console.log(json);
      //console.log("\n");
      if (json.routes.length) {
        const points = json.routes[0].overview_polyline.points;
        const steps = decodePolyline(points); // Function to decode polyline
        setRouteCoordinates(steps);
        console.log("route destination completed.");
      } else {
        setRouteCoordinates([]);
        console.log('No routes found.');
      }
    } catch (error) {
      console.error('Error fetching route data:', error);
      setRouteCoordinates([]);
    }
  };

  const decodePolyline = (encoded) => {
    return polyline.decode(encoded).map(array => {
      return { latitude: array[0], longitude: array[1] };
    });
  };
  const ModalContent = () => {
    if (!selectedMarker) return null;
    
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={styles.closeButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.modalText}>{selectedMarker.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('FloorPlan', { marker: selectedMarker });
          }}
        >
          <Text style={styles.textStyle}>Kat Planına Git</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearch={handleSearch} 
      />
      <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          onRegionChangeComplete={onRegionChangeComplete}
          onPress={() => {
            // Eğer burada modalVisible kontrolü yapılırsa, kullanıcı herhangi bir Marker'ın üzerine tıklamadığı sürece modal kapatılacaktır.
            if (modalVisible) {
              setModalVisible(false);
            }
          }}
        >
        {Object.keys(visibleMarkers).map(category => (
            visibleMarkers[category].map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                onPress={(e) => handleMarkerPress(marker, e)}
              >
                <Icon name={marker.icon} size={30} color={marker.color} />
              </Marker>
          ))
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={2}
            strokeColor="purple"
          />
        )}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
          <ModalContent />
        </SafeAreaView>
      </Modal>
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomIn(mapRef, region, setRegion)}>
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={() => zoomOut(mapRef, region, setRegion)}>
          <Icon name="minus" size={24} color="black" />
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
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%', // Bu satırı ekleyin veya güncelleyin
    height: '35%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginBottom: 10,
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
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007AFF', // iOS geri butonu rengi
    // ... diğer stil tanımlamalarınız
  },
});

export default MapScreen;
