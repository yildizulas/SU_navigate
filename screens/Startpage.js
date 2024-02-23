import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import colors from '../styles/colors';
import * as Linking from 'expo-linking';

const EntranceScreen = ({ navigation }) => {
   
    const handlerForGoogleMap = () => {
      const latitude = '40.89360763590254';
      const longitude = '29.380166148372258';
      const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(googleMapsURL);
    };
    
    if (Platform.OS === 'android'){

        return (
            <View style={styles.container}>
              <Text style={styles.title}>Welcome to SU_Navigate</Text>
              <Button 
                title="Go to Map"
                onPress = {() => navigation.navigate('Map')}
                
              />
            </View>
          );


    }

    else
    {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Welcome to SU_Navigate</Text>
              <Button 
                title="Go to Map"
                onPress = {handlerForGoogleMap}
               
              />
            </View>
          );

    }
  };
 


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffff', // You can use your colors from colors.js
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#349834',
      backgroundColor: 'white'
      // You can add color from your colors.js file
      // color: colors.primary,
    }
  });





export default EntranceScreen;
