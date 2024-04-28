import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

// Önceden tanımlanmış yollar (örnek veridir)
const paths = {
  'entrance1_to_classroom5': [
    { x: 10, y: 300 }, // Kapı koordinatı
    { x: 150, y: 200 }, // Koridor koordinatları
    { x: 200, y: 200 }, // Sınıf kapısı koordinatı
  ],
  // Diğer yollar...
};

// Harita üzerinde bir rota çizmek için kullanılan bileşen
const PathLine = ({ path }) => {
  return path.map((point, index) => (
    <View
      key={index}
      style={{
        position: 'absolute',
        left: point.x,
        top: point.y,
        width: 1,
        height: 50,
        backgroundColor: 'red', // Rota çizgi rengi
      }}
    />
  ));
};

const FloorPlanScreenOptinal = ({ route }) => {
  // Kullanıcının seçtiği rota (varsayılan olarak boş bir dizi)
  const [selectedPath, setSelectedPath] = React.useState([]);

  // Kullanıcının kapı ve sınıf seçimine bağlı olarak rotayı güncelleyen fonksiyon
  const selectPath = (entrance, classroom) => {
    const pathKey = `${entrance}_to_${classroom}`;
    const newPath = paths[pathKey];
    setSelectedPath(newPath || []);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/floors/FENS/fens_floor1_1.png')} style={styles.map} />
      {selectedPath.length > 0 && <PathLine path={selectedPath} />}
      {/* Örnek olarak, kapı1'den sınıf5'e giden yolu çizmek için bir buton */}
      <TouchableOpacity style={styles.button} onPress={() => selectPath('entrance1', 'classroom5')}>
        <Text>Entrance 1 to Classroom 5</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FFF',
    padding: 10,
  },
  // Diğer stiller...
});

export default FloorPlanScreenOptinal;
