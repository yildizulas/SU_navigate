import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const FloorPlanScreenSVG = () => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    loadSvgFile();
  }, []);

  const loadSvgFile = async () => {
    const asset = Asset.fromModule(require('../assets/floors/FENS/fens_floor1_1.svg'));
    await asset.downloadAsync();
    let content = await FileSystem.readAsStringAsync(asset.localUri);
    // Oda ve kapı görselini ekleyin
    const roomElement = `<text x="160" y="225" font-family="Arial" font-size="15" fill="blue" id="room1040" cursor="pointer">1040</text>`;
    const doorRect = `<rect x="820" y="650" width="50" height="20" fill="green" />`;
    // Navigasyon yolu çizgisi
    const path = `<path d="M820,670 L180,240" stroke="red" stroke-width="5"/>`;
    content = content.replace('</svg>', `${roomElement}${doorRect}${path}</svg>`);
    setSvgContent(content);
  };

  const injectedJavaScript = `
    document.addEventListener('click', function(e) {
      e.preventDefault();
      const target = e.target;
      if (target.id === 'room1040') {
        const roomInfo = { roomNumber: '1040', description: 'Navigating from entrance to Room 1040.' };
        window.ReactNativeWebView.postMessage(JSON.stringify(roomInfo));
      }
    });
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=2.5, maximum-scale=3.0, user-scalable=yes" />
      <style>
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
        #container {
          overflow: scroll;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        svg {
          width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div id="container">
        ${svgContent}
      </div>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webView}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          alert(data.description);
        }}
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
