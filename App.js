import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen'; // MapScreen dosyanızın yolu

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './styles/colors'; // Renklerin bulunduğu yolu güncelleyinizz.



const Stack = createNativeStackNavigator();

export default function App() {
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


