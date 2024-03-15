// FloorPlanScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

// Önceden tanımlanmış PDF yollarınızın objesi
const pdfFiles = {
  'MÜHENDİSLİK 1. KAT': require('../floors/FENS/MÜHENDİSLİK 1. KAT.pdf'),
  // 'Diğer katların dosya yollarını da buraya ekleyebilirsiniz'
};

const FloorPlanScreen = ({ route }) => {
  const { floor } = route.params; // Parametre olarak 'floor' aldık

  // 'floor' parametresine göre doğru PDF dosyasını seçiyoruz
  const source = pdfFiles[floor];

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
      />
    </View>
  );
};

// Stil tanımlamalarınız
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default FloorPlanScreen;
