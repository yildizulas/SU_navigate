// ZoomControls.js
const zoomIn = (mapRef, region, setRegion) => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    mapRef.current.animateToRegion(newRegion, 200);
    setRegion(newRegion);
  };
  
  const zoomOut = (mapRef, region, setRegion) => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    mapRef.current.animateToRegion(newRegion, 200);
    setRegion(newRegion);
  };
  
  export { zoomIn, zoomOut };
  