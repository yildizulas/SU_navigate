import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';

const FloorPlanScreenSVG = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Oda tıklama handler fonksiyonu
  const onRoomPress = (roomId) => {
    setSelectedRoom(roomId);
    // Burada yol hesaplama fonksiyonları eklenebilir.
  };

  // SVG içerikleri burada tanımlanır
  const svgContent = (
    <Svg height="100%" width="100%" viewBox="0 0 100 100">
      {/* Odalar ve yollar için Path elemanları */}
      <G>
        {/* Oda örneği */}
        <Path
          id="room1"
          onPress={() => onRoomPress('room1')}
          d="M10,10 L50,10 L50,50 L10,50 Z"
          fill="none"
          stroke="black"
        />
        {/* ... diğer odalar ve yollar */}
      </G>
      {/* Seçilen odaya ait bilgileri göstermek için bir Text elemanı */}
      {selectedRoom && (
        <SvgText
          x="50%"
          y="90%"
          textAnchor="middle"
          stroke="#000"
          fontSize="5"
          onPress={() => onRoomPress(null)}
        >
          {`Selected Room: ${selectedRoom}`}
        </SvgText>
      )}
    </Svg>
  );

  return (
    <View style={styles.container}>
      {svgContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default FloorPlanScreenSVG;
