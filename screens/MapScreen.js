import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Modal, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert, FlatList, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../navigation/SearchBar';
import { buildingDescriptions, markers, facultyMembers } from '../navigation/markers';
import { zoomIn, zoomOut } from '../navigation/ZoomControls';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 40.890817,
    longitude: 29.379623,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  });

  const [offices, setOffices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

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

  useEffect(() => {
    const updateSuggestions = async () => {
      if (searchQuery.trim() === '') {
        setSuggestions([]);
      } else {
        const newSuggestions = calculateSuggestions(searchQuery).slice(0, 5);
        setSuggestions(newSuggestions);
      }
    };

    const delayDebounce = setTimeout(() => {
      updateSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setShowSuggestions(true);
    if (text.length > 0) {
      // Otomatik tamamlama önerilerini hesapla ve güncelle
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (item) => {
    setSearchQuery(item.match);
    setShowSuggestions(false);
    handleSearch(item);
  };

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

  const calculateSuggestions = (query) => {
    let matches = [];
    Object.keys(buildingDescriptions).forEach((key) => {
      const descriptionLines = buildingDescriptions[key].split('\n');
      const matchedLine = descriptionLines.find(line => line.toLowerCase().includes(query.toLowerCase()));
      if (matchedLine) {
        matches.push({ match: matchedLine, key, type: 'building' });
      }
    });

    Object.keys(facultyMembers).forEach((name) => {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        const facultyDetail = facultyMembers[name];
        matches.push({ match: name, key: name, building: facultyDetail.building, type: 'faculty' });
      }
    });

    return matches;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
        <Text style={styles.suggestionItem}>{item.match}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = async (selectedSuggestion) => {
    const queryKey = selectedSuggestion.key;
    let selectedMarker = null;
    setModalVisible(true);
    setSuggestions([]);

    if (facultyMembers[queryKey]) {
      const facultyDetail = facultyMembers[queryKey];
      const buildingMarker = markers[facultyDetail.building]?.[0];
      if (buildingMarker) {
        selectedMarker = {
          ...buildingMarker,
          title: queryKey,
          description: `${facultyDetail.building} ${facultyDetail.room}`,
          type: 'faculty'
        };
      }
    } else if (buildingDescriptions[queryKey]) {
      const buildingMarker = markers[queryKey]?.[0];
      if (buildingMarker) {
        selectedMarker = {
          ...buildingMarker,
          description: buildingDescriptions[queryKey],
          type: 'building'
        };
      }
    }

    if (selectedMarker) {
      setSelectedMarker(selectedMarker);
      const newRegion = {
        ...region,
        latitude: selectedMarker.coordinate.latitude,
        longitude: selectedMarker.coordinate.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
      setModalVisible(true);
    } else {
      console.log('No matching marker found');
    }
  };

  const handleGoPress = async () => {
    if (selectedMarker) {
      const currentLocation = await fetchCurrentLocation();
      await fetchRouteData(currentLocation, selectedMarker.coordinate);

      if (routeCoordinates.length > 0) {
        const maxLat = Math.max(currentLocation.latitude, selectedMarker.coordinate.latitude);
        const minLat = Math.min(currentLocation.latitude, selectedMarker.coordinate.latitude);
        const maxLng = Math.max(currentLocation.longitude, selectedMarker.coordinate.longitude);
        const minLng = Math.min(currentLocation.longitude, selectedMarker.coordinate.longitude);

        const centerLat = (maxLat + minLat) / 2;
        const centerLng = (maxLng + minLng) / 2;

        const latitudeDelta = Math.abs(maxLat - minLat) * 1.5;
        const longitudeDelta = Math.abs(maxLng - minLng) * 1.5;

        const newRegion = {
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta,
          longitudeDelta,
        };

        mapRef.current.animateToRegion(newRegion, 1000);
      }

      setModalVisible(false);
    } else {
      console.log('No marker selected');
    }
  };

  const getDistance = (location1, location2) => {
    const toRadians = (deg) => deg * Math.PI / 180;
    const R = 6378137;
    const dLat = toRadians(location2.latitude - location1.latitude);
    const dLong = toRadians(location2.longitude - location1.longitude);
    const lat1 = toRadians(location1.latitude);
    const lat2 = toRadians(location2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLong / 2) * Math.sin(dLong / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);

    if (newRegion.latitudeDelta < 0.002 && newRegion.longitudeDelta < 0.004) {
      setVisibleMarkers(markers);
    } else {
      setVisibleMarkers([]);
    }
  };

  const fetchRouteData = async (startCoord, endCoord) => {
    const apiKey = 'AIzaSyBAJ6oNyIj-NLw95eFfGakiVy3mzOjE1_4';
    const mode = 'walking';
    const origin = `${startCoord.latitude},${startCoord.longitude}`;
    const destination = `${endCoord.latitude},${endCoord.longitude}`;
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${apiKey}`;

    try {
      const response = await fetch(directionsUrl);
      const json = await response.json();
      if (json.routes.length) {
        const points = json.routes[0].overview_polyline.points;
        const steps = decodePolyline(points);
        setRouteCoordinates(steps);
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

  const MAX_DISTANCE = 150;

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

    const goButton = (
      <TouchableOpacity style={styles.button} onPress={handleGoPress}>
        <Icon name="location-arrow" size={24} color="white" />
        <Text style={styles.textStyle}>Go</Text>
      </TouchableOpacity>
    );

    if (selectedMarker.type === 'faculty') {
      return (
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>{selectedMarker.title}</Text>
          <Text style={styles.modalText}>{selectedMarker.description}</Text>
          {selectedMarker.type === 'faculty' && goButton}
        </View>
      );
    }

    return (
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.modalText}>{selectedMarker.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('FloorPlanSVG', { marker: selectedMarker });
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
    <Fragment>
      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearch}
        />
        {showSuggestions && searchQuery.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.suggestionsContainer}
          />
        )}
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
              strokeWidth={1}
              strokeColor="red"
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
        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.myLocationButton} onPress={goToCurrentLocation}>
            <Icon name="crosshairs" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 81 : 53,
    width: '100%',
    maxHeight: 200,
    backgroundColor: 'white',
    zIndex: 1000,
    borderRadius: 20,
    left: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: "#f9f9f9",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2196F3",
    marginBottom: 10,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  buttonIcon: {
    fontSize: 20,
    color: "white",
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
    color: '#007AFF',
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
