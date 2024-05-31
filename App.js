import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Genel MapScreen sayfasını import edin
import MapScreen from './screens/MapScreen';
import FloorPlanScreen from './screens/FloorPlanScreen';
import FloorPlanScreenSVG from './screens/FloorPlanScreenSVG';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './styles/colors';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'Kampüs Haritası' }} 
        />
        <Stack.Screen 
          name="FloorPlanSVG" 
          component={FloorPlanScreenSVG} 
          options={{ title: 'Kat Planı SVG' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
