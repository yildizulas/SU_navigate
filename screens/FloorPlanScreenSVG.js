import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const FloorPlanScreenSVG = () => {
  const [svgUri, setSvgUri] = useState('');

  useEffect(() => {
    loadLocalSvg();
  }, []);

  const loadLocalSvg = async () => {
    const asset = Asset.fromModule(require('../assets/floors/FENS/fens_floor1_1.svg'));
    await asset.downloadAsync();
    setSvgUri(asset.localUri);
  };

  const handleNavigationStateChange = (event) => {
    if (event.title) {
      const data = JSON.parse(event.title);
      Alert.alert('Oda Bilgisi', `Oda: ${data.roomName}`);
    }
  };

  const injectedJavaScript = `
    document.addEventListener('click', function(e) {
      const roomElement = e.target.closest('[data-room-id]');
      if (roomElement) {
        const roomData = { roomName: roomElement.getAttribute('data-room-id') };
        window.ReactNativeWebView.postMessage(JSON.stringify(roomData));
      }
    });
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ uri: svgUri }}
        style={styles.webView}
        injectedJavaScript={injectedJavaScript}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  }
});

export default FloorPlanScreenSVG;
