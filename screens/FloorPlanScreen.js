import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FloorPlanScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/floors/FENS/fens_floor1_1.jpg')} 
        style={styles.floorPlanImage} 
        />
      {/* Eğer yol çizdirmek isterseniz burada ekstra işlemler yapabilirsiniz. */}
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
    width: '100%', // Görüntüyü ekranın genişliğine göre ayarlayın
    height: '100%', // Görüntüyü ekranın yüksekliğine göre ayarlayın
    resizeMode: 'contain', // Tüm görüntünün sığdığından emin olun
  },
});

export default FloorPlanScreen;
