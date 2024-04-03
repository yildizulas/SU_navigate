import React, { useState, useRef, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert } from 'react-native';
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);

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

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);

    const markerRegion = {
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
    };
    mapRef.current.animateToRegion(markerRegion, 1000);
  };

  const levenshteinDistance = (str1, str2) => {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
  };
  
  const similarityThreshold = 3;

  const handleSearch = async (query) => {
    const lowercasedQuery = query.toLowerCase().trim();
    let closestMarker = null;
    let exactMatchFound = false;

    const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const userLocation = { latitude: coords.latitude, longitude: coords.longitude };

    // Check for exact match in the keys and descriptions first
    Object.keys(buildingDescriptions).forEach(key => {
        const descriptions = buildingDescriptions[key].toLowerCase();
        if (key.toLowerCase().includes(lowercasedQuery) || descriptions.includes(lowercasedQuery)) {
            markers[key].forEach(marker => {
                const distance = getDistance(userLocation, marker.coordinate);
                if (!closestMarker || distance < getDistance(userLocation, closestMarker.coordinate)) {
                    closestMarker = marker;
                    exactMatchFound = true;
                }
            });
        }
    });

    // If no exact match found, use similarity to find the closest match
    if (!exactMatchFound) {
        let lowestDistance = Infinity;
        Object.keys(buildingDescriptions).forEach(key => {
            markers[key].forEach(marker => {
                const distance = levenshteinDistance(marker.name.toLowerCase(), lowercasedQuery);
                if (distance < lowestDistance && distance <= similarityThreshold) {
                    closestMarker = marker;
                    lowestDistance = distance;
                }
            });
        });
    }

    if (closestMarker) {
        setSelectedMarker(closestMarker);
        setModalVisible(true);

        const newRegion = {
            latitude: closestMarker.coordinate.latitude,
            longitude: closestMarker.coordinate.longitude,
            latitudeDelta: 0.0013,
            longitudeDelta: 0.0013,
        };
        mapRef.current.animateToRegion(newRegion, 1000);
    } else {
        console.log('No matching description or marker found');
        setRouteCoordinates([]);
    }
  };


  const handleGoPress = async () => {
    if (selectedMarker) {
        const currentLocation = await fetchCurrentLocation();
        await fetchRouteData(currentLocation, selectedMarker.coordinate);

        // Ensure we have the route coordinates available to calculate the bounds
        if (routeCoordinates.length > 0) {
            const maxLat = Math.max(currentLocation.latitude, selectedMarker.coordinate.latitude);
            const minLat = Math.min(currentLocation.latitude, selectedMarker.coordinate.latitude);
            const maxLng = Math.max(currentLocation.longitude, selectedMarker.coordinate.longitude);
            const minLng = Math.min(currentLocation.longitude, selectedMarker.coordinate.longitude);

            // Calculate the center of the map view
            const centerLat = (maxLat + minLat) / 2;
            const centerLng = (maxLng + minLng) / 2;

            // Calculate the deltas with a reasonable padding to ensure both locations are visible
            const latitudeDelta = Math.abs(maxLat - minLat) * 1.5; // Increase multiplier for more padding if needed
            const longitudeDelta = Math.abs(maxLng - minLng) * 1.5; // Increase multiplier for more padding if needed

            const newRegion = {
                latitude: centerLat,
                longitude: centerLng,
                latitudeDelta,
                longitudeDelta,
            };

            mapRef.current.animateToRegion(newRegion, 1000); // Smoothly animate to the new region
        }

        setModalVisible(false); // Optionally close the modal if needed
    } else {
        console.log('No marker selected');
    }
  };

  // İki konum arasındaki mesafeyi hesaplayan fonksiyon
  const getDistance = (location1, location2) => {
    const toRadians = (deg) => deg * Math.PI / 180;
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = toRadians(location2.latitude - location1.latitude);
    const dLong = toRadians(location2.longitude - location1.longitude);
    const lat1 = toRadians(location1.latitude);
    const lat2 = toRadians(location2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
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

  const fetchCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  const MAX_DISTANCE = 150; // 150 metre çapı olarak belirledik

  const handleMapPress = async (e) => {
      const clickedLocation = e.nativeEvent.coordinate;
      let closestMarker = null;
      let shortestDistance = Infinity;

      Object.keys(markers).forEach(category => {
          markers[category].forEach(marker => {
              const distance = getDistance(clickedLocation, marker.coordinate);
              if (distance < shortestDistance && distance <= MAX_DISTANCE) {
                  shortestDistance = distance;
                  closestMarker = marker;
              }
          });
      });

      if (closestMarker) {
          setSelectedMarker(closestMarker);
          setModalVisible(true);

          const newRegion = {
              latitude: closestMarker.coordinate.latitude,
              longitude: closestMarker.coordinate.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
          };
          mapRef.current.animateToRegion(newRegion, 1000);
      } else {
          console.log('No nearby marker found');
          setModalVisible(false);
          setSelectedMarker(null);
      }
  };


  const ModalContent = () => {
    if (!selectedMarker) return null;
    
    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
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
          <Icon name="university" size={24} color="white" />
          <Text style={styles.textStyle}>Inside of the Building</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoPress}>
          <Icon name="location-arrow" size={24} color="white" />
          <Text style={styles.textStyle}>Go</Text>
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
          onPress={handleMapPress}
        >
        {selectedMarker && (
        <Marker
            coordinate={selectedMarker.coordinate}
            onPress={() => handleMarkerPress(selectedMarker)}
        >
            <Icon name={selectedMarker.icon} size={30} color={selectedMarker.color} />
        </Marker>
    )}
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
    borderRadius: 20, // Köşeleri yuvarlaklaştır
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%', // Modalın genişliğini azalt
    alignSelf: 'center', // Merkezileştir
    borderWidth: 1,
    borderColor: '#ddd', // Add a border to the modal
    backgroundColor: "#f9f9f9", // Light background for the modal content
  },
  modalText: {
    fontSize: 16, // Yazı tipi boyutunu artır
    fontWeight: "bold", // Yazı tipi kalınlığını artır
    textAlign: "center",
    marginBottom: 15,
    paddingBottom: 10, // Add padding at the bottom
    borderBottomWidth: 1,
    borderColor: '#ddd', // Add a separator
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row', // İçerikleri yatay olarak hizala
    alignItems: 'center', // İçerikleri dikey olarak ortala
    justifyContent: 'center', // İçerikleri yatay olarak ortala
    // Butonun diğer stil tanımlamaları
    backgroundColor: "#2196F3",
    marginBottom: 10,
    marginTop: 15, // Add margin at the top
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8, // İcon ile yazı arasında boşluk bırak
  },
  buttonIcon: {
    fontSize: 20, // İcon boyutu
    color: "white", // İcon rengi
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
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
});

export default MapScreen;
