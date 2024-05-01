import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const FloorPlanScreenSVG = () => {
  const [base64SVG, setBase64SVG] = useState('');

  useEffect(() => {
    loadSvgFile();
  }, []);

  const loadSvgFile = async () => {
    const asset = Asset.fromModule(require('../assets/floors/FENS/fens_floor1_1.svg'));
    await asset.downloadAsync();
    const svgContent = await FileSystem.readAsStringAsync(asset.localUri, { encoding: FileSystem.EncodingType.Base64 });
    const svgDataUri = `data:image/svg+xml;base64,${svgContent}`;
    setBase64SVG(svgDataUri);
  };

  const injectedJavaScript = `
    document.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default click behavior
      const coords = { x: e.pageX, y: e.pageY };
      window.ReactNativeWebView.postMessage(JSON.stringify(coords));
    });
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: `<img src="${base64SVG}" style="width: 100%; height: auto;" />` }}  // Düzeltme burada yapıldı
        style={styles.webView}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => console.log(event.nativeEvent.data)}
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
