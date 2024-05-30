import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Modal, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';

const FloorPlanScreenSVG = () => {
  const [svgContent, setSvgContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [previousRoom, setPreviousRoom] = useState('');
  const webViewRef = useRef(null);

  useEffect(() => {
    loadSvgFile();
  }, []);

  const loadSvgFile = async () => {
    const asset = Asset.fromModule(require('../assets/floors/FENS/fens_floor1_1.svg'));
    await asset.downloadAsync();
    let content = await FileSystem.readAsStringAsync(asset.localUri);

    const roomElements = `
      <text x="160" y="225" font-family="Arial" font-size="15" fill="blue" id="room1040" cursor="pointer">1040</text>
      <text x="150" y="265" font-family="Arial" font-size="15" fill="blue" id="room1039" cursor="pointer">1039</text>
      <text x="150" y="295" font-family="Arial" font-size="15" fill="blue" id="room1038" cursor="pointer">1038</text>
      <text x="150" y="330" font-family="Arial" font-size="15" fill="blue" id="room1037" cursor="pointer">1037</text>
      <text x="324" y="627" font-family="Arial" font-size="15" fill="blue" id="room1022" cursor="pointer">1022</text>
      <text x="152" y="743" font-family="Arial" font-size="15" fill="blue" id="room1014" cursor="pointer">1014</text>
      <text x="628" y="152" font-family="Arial" font-size="15" fill="blue" id="room1064" cursor="pointer">1064</text>
      <text x="768" y="590" font-family="Arial" font-size="15" fill="blue" id="room1100" cursor="pointer">1100</text>
      <text x="663" y="406" font-family="Arial" font-size="15" fill="blue" id="room1089" cursor="pointer">1089</text>
      <text x="835" y="818" font-family="Arial" font-size="15" fill="blue" id="room1110" cursor="pointer">1110</text>
    `;
    const doorRect = `
      <circle cx="812.56884765625" cy="662.219970703125" r="10" fill="red" id="doorRect"/>
    `;

    const paths = splitPaths(`
      <line x1="812.56884765625" y1="662.219970703125" x2="196.28976440429688" y2="662.219970703125" stroke="orange" stroke-width="2" id="path1" data-start="812.56884765625,662.219970703125" data-end="196.28976440429688,662.219970703125" />
      <line x1="196.28976440429688" y1="662.219970703125" x2="196.28976440429688" y2="769.1967163085938" stroke="orange" stroke-width="2" id="path2" data-start="196.28976440429688,662.219970703125" data-end="196.28976440429688,769.1967163085938" />
      <line x1="196.28976440429688" y1="769.1967163085938" x2="340.4757995605469" y2="769.1967163085938" stroke="orange" stroke-width="2" id="path3" data-start="196.28976440429688,769.1967163085938" data-end="340.4757995605469,769.1967163085938" />
      <line x1="340.4757995605469" y1="769.1967163085938" x2="340.4757995605469" y2="662.219970703125" stroke="orange" stroke-width="2" id="path4" data-start="340.4757995605469,769.1967163085938" data-end="340.4757995605469,662.219970703125" />
      <line x1="673.033935546875" y1="662.219970703125" x2="673.033935546875" y2="776.1734619140625" stroke="orange" stroke-width="2" id="path5" data-start="673.033935546875,662.219970703125" data-end="673.033935546875,776.1734619140625" />
      <line x1="673.033935546875" y1="776.1734619140625" x2="812.56884765625" y2="776.1734619140625" stroke="orange" stroke-width="2" id="path6" data-start="673.033935546875,776.1734619140625" data-end="812.56884765625,776.1734619140625" />
      <line x1="812.56884765625" y1="662.219970703125" x2="812.56884765625" y2="841.289794921875" stroke="orange" stroke-width="2" id="path7" data-start="812.56884765625,662.219970703125" data-end="812.56884765625,841.289794921875" />
      <line x1="717.219970703125" y1="662.219970703125" x2="717.219970703125" y2="320.3595275878906" stroke="orange" stroke-width="2" id="path8" data-start="717.219970703125,662.219970703125" data-end="717.219970703125,320.3595275878906" />
      <line x1="819.5455932617188" y1="320.3595275878906" x2="717.219970703125" y2="320.3595275878906" stroke="orange" stroke-width="2" id="path9" data-start="819.5455932617188,320.3595275878906" data-end="717.219970703125,320.3595275878906" />
      <line x1="296.2897644042969" y1="320.3595275878906" x2="296.2897644042969" y2="662.219970703125" stroke="orange" stroke-width="2" id="path10" data-start="296.2897644042969,320.3595275878906" data-end="296.2897644042969,662.219970703125" />
      <line x1="200.94093322753906" y1="320.3595275878906" x2="200.94093322753906" y2="255.24325561523438" stroke="orange" stroke-width="2" id="path11" data-start="200.94093322753906,320.3595275878906" data-end="200.94093322753906,255.24325561523438" />
      <line x1="200.94093322753906" y1="255.24325561523438" x2="221.87115478515625" y2="255.24325561523438" stroke="orange" stroke-width="2" id="path12" data-start="200.94093322753906,255.24325561523438" data-end="221.87115478515625,255.24325561523438" />
      <line x1="221.87115478515625" y1="255.24325561523438" x2="221.87115478515625" y2="180.82464599609375" stroke="orange" stroke-width="2" id="path13" data-start="221.87115478515625,255.24325561523438" data-end="221.87115478515625,180.82464599609375" />
      <line x1="221.87115478515625" y1="180.82464599609375" x2="724.1967163085938" y2="180.82464599609375" stroke="orange" stroke-width="2" id="path14" data-start="221.87115478515625,180.82464599609375" data-end="724.1967163085938,180.82464599609375" />
      <line x1="724.1967163085938" y1="180.82464599609375" x2="724.1967163085938" y2="199.42930603027344" stroke="orange" stroke-width="2" id="path15" data-start="724.1967163085938,180.82464599609375" data-end="724.1967163085938,199.42930603027344" />
      <line x1="724.1967163085938" y1="199.42930603027344" x2="819.5455932617188" y2="199.42930603027344" stroke="orange" stroke-width="2" id="path16" data-start="724.1967163085938,199.42930603027344" data-end="819.5455932617188,199.42930603027344" />
      <line x1="819.5455932617188" y1="199.42930603027344" x2="819.5455932617188" y2="320.3595275878906" stroke="orange" stroke-width="2" id="path17" data-start="819.5455932617188,199.42930603027344" data-end="819.5455932617188,320.3595275878906" />
      <line x1="345.1269836425781" y1="320.3595275878906" x2="345.1269836425781" y2="180.82464599609375" stroke="orange" stroke-width="2" id="path18" data-start="345.1269836425781,320.3595275878906" data-end="345.1269836425781,180.82464599609375" />
      <line x1="819.5455932617188" y1="320.3595275878906" x2="717.219970703125" y2="320.3595275878906" stroke="orange" stroke-width="2" id="path19" data-start="819.5455932617188,320.3595275878906" data-end="717.219970703125,320.3595275878906" />
      <line x1="200.94093322753906" y1="320.3595275878906" x2="724.1967163085938" y2="320.3595275878906" stroke="orange" stroke-width="2" id="path20" data-start="200.94093322753906,320.3595275878906" data-end="724.1967163085938,320.3595275878906" />
    `);

    content = content.replace('</svg>', `${roomElements}${doorRect}${paths}</svg>`);
    setSvgContent(content);
  };

  function splitPaths(paths) {
    const lines = paths.match(/<line[^>]*>/g) || [];
    const newPaths = [];
    let pathCounter = 1;

    lines.forEach(line => {
      const x1 = parseFloat(line.match(/x1="([^"]*)"/)[1]);
      const y1 = parseFloat(line.match(/y1="([^"]*)"/)[1]);
      const x2 = parseFloat(line.match(/x2="([^"]*)"/)[1]);
      const y2 = parseFloat(line.match(/y2="([^"]*)"/)[1]);

      if (x1 === x2) { // vertical line
        const deltaY = Math.abs(y2 - y1);
        if (deltaY > 40) {
          const numberOfSegments = Math.ceil(deltaY / 40);
          const segmentLength = deltaY / numberOfSegments;

          for (let i = 0; i < numberOfSegments; i++) {
            const newY1 = y1 + i * segmentLength * Math.sign(y2 - y1);
            const newY2 = y1 + (i + 1) * segmentLength * Math.sign(y2 - y1);
            newPaths.push(`<line x1="${x1}" y1="${newY1}" x2="${x1}" y2="${newY2}" stroke="orange" stroke-width="2" id="path${pathCounter}" />`);
            pathCounter++;
          }
        } else {
          newPaths.push(line);
        }
      } else if (y1 === y2) { // horizontal line
        const deltaX = Math.abs(x2 - x1);
        if (deltaX > 40) {
          const numberOfSegments = Math.ceil(deltaX / 40);
          const segmentLength = deltaX / numberOfSegments;

          for (let i = 0; i < numberOfSegments; i++) {
            const newX1 = x1 + i * segmentLength * Math.sign(x2 - x1);
            const newX2 = x1 + (i + 1) * segmentLength * Math.sign(x2 - x1);
            newPaths.push(`<line x1="${newX1}" y1="${y1}" x2="${newX2}" y2="${y1}" stroke="orange" stroke-width="2" id="path${pathCounter}" />`);
            pathCounter++;
          }
        } else {
          newPaths.push(line);
        }
      } else {
        newPaths.push(line);
      }
    });

    return newPaths.join('\n');
  }

  const resetPreviousSelection = () => {
    if (previousRoom) {
      webViewRef.current.injectJavaScript(`
        document.getElementById('room${previousRoom}').setAttribute('fill', 'blue');
        var existingMarker = document.getElementById('target-marker');
        if (existingMarker) existingMarker.remove();
      `);
    }
  };

  const placeMarker = (coords) => {
    const script = `
      console.log('Placing marker at:', ${JSON.stringify(coords)});
      var svg = document.querySelector('svg');
      var existingMarker = document.getElementById('target-marker');
      if (existingMarker) existingMarker.remove();
      var marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      marker.setAttribute('cx', ${coords.x});
      marker.setAttribute('cy', ${coords.y});
      marker.setAttribute('r', '5');
      marker.setAttribute('fill', 'red');
      marker.setAttribute('id', 'target-marker');
      svg.appendChild(marker);
    `;
    webViewRef.current.injectJavaScript(script);
  };

  const injectedJavaScript = `
    console.log('Injected JavaScript is running');

    document.addEventListener('click', function(e) {
      console.log('Event: click');
      const svg = document.querySelector('svg');
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
      console.log('Coordinates:', cursorpt);
      window.ReactNativeWebView.postMessage(JSON.stringify({ x: cursorpt.x, y: cursorpt.y }));
    });

    function addClickListener(roomId) {
      var room = document.getElementById(roomId);
      if (room) {
        console.log('Adding click event listener to', roomId);
        room.addEventListener('click', function() {
          console.log('Event:', roomId, 'click');
          window.ReactNativeWebView.postMessage(JSON.stringify({ room: roomId.replace('room', '') }));
        });
      } else {
        console.log(roomId, 'element not found');
      }
    }

    addClickListener('room1040');
    addClickListener('room1039');
    addClickListener('room1038');
    addClickListener('room1037');
    addClickListener('room1022');
    addClickListener('room1014');
    addClickListener('room1064');
    addClickListener('room1100');
    addClickListener('room1089');
    addClickListener('room1110');

    window.findClosestPath = function(roomId) {
      console.log('Function: findClosestPath', roomId);
      var room = document.getElementById(roomId);
      if (!room) {
        console.log('Room not found:', roomId);
        return null;
      }
      var roomBBox = room.getBBox();
      var roomX = roomBBox.x + roomBBox.width / 2;
      var roomY = roomBBox.y + roomBBox.height / 2;
      console.log('Room coordinates:', { roomX, roomY });

      var paths = document.querySelectorAll('line');
      var closestPathId = null;
      var minDistance = Infinity;
      var closestCoords = null;

      paths.forEach(function(path) {
        var startCoords = path.getAttribute('data-start').split(',').map(Number);
        var endCoords = path.getAttribute('data-end').split(',').map(Number);
        
        var distances = [
          { coord: { x: startCoords[0], y: startCoords[1] }, distance: Math.sqrt(Math.pow(roomX - startCoords[0], 2) + Math.pow(roomY - startCoords[1], 2)) },
          { coord: { x: endCoords[0], y: endCoords[1] }, distance: Math.sqrt(Math.pow(roomX - endCoords[0], 2) + Math.pow(roomY - endCoords[1], 2)) }
        ];

        distances.forEach(function(d) {
          if (d.distance < minDistance) {
            minDistance = d.distance;
            closestPathId = path.id;
            closestCoords = d.coord;
          }
        });
      });

      console.log('Closest path:', closestPathId);
      return closestCoords;
    };
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

  const handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.room) {
      setSelectedRoom(message.room);
      setModalVisible(true);
    }

    if (message.x && message.y) {
      console.log(`Coordinates: ${message.x}, ${message.y}`);
    }

    if (message.path) {
      console.log('Received path:', message.path);
      highlightPath(message.path);
    }

    if (message.coords) {
      console.log('Received coords:', message.coords);
      placeMarker(message.coords);
    }
  };

  const handleGo = () => {
    resetPreviousSelection();
    webViewRef.current.injectJavaScript(`
      (function() {
        console.log('Finding closest path for room${selectedRoom}');
        var closestCoords = window.findClosestPath('room${selectedRoom}');
        console.log('Closest coords:', closestCoords);
        window.ReactNativeWebView.postMessage(JSON.stringify({ coords: closestCoords }));
      })();
    `);
    webViewRef.current.injectJavaScript(`
      document.getElementById('room${selectedRoom}').setAttribute('fill', 'red');
    `);
    setPreviousRoom(selectedRoom);
    setModalVisible(false);
  };

  const handleBack = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webView}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Room {selectedRoom}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleGo}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FloorPlanScreenSVG;
