import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Platform modülünü import edin
import { Platform } from 'react-native';

// IOS ve Android için özel sayfaları import edin
import MapScreen_IOS from './screens/MapScreen_IOS';
import MapScreen_Android from './screens/MapScreen_Android';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './styles/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  // Platforma göre MapScreen componentini seçin
  const MapScreen = Platform.select({
    ios: MapScreen_IOS,
    android: MapScreen_Android,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Kampüs Haritası' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
