// FloorPlanScreen.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const FloorPlanScreen = () => {
  const images = [{
    url: '',
    props: {
      source: require('../assets/floors/FENS/fens_floor1_1.png')
    }
  }];

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        backgroundColor="transparent"
        style={styles.floorPlanImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floorPlanImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  zoomInstructions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  }
});

export default FloorPlanScreen;
