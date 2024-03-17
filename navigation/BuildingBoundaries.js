

// BuildingBoundaries.js //s
const buildingBoundaries = [
    {
      id: 'building1',
      name: 'Library',
      coordinates: [
        { latitude: 40.890391, longitude: 29.376701 },
        { latitude: 40.889716, longitude: 29.376956 },
        { latitude: 40.889897, longitude: 29.377723 },
        { latitude: 40.890511, longitude: 29.377439 },
        // Closing the polygon by repeating the first coordinate as the last is correct
        { latitude: 40.890391, longitude: 29.376701 },
      ],
    },
    {
      id: 'building2',
      name: 'FAS',
      coordinates: [
        { latitude: 40.890544, longitude: 29.377599 },
        { latitude: 40.889952, longitude: 29.377846 },
        { latitude: 40.890134, longitude: 29.378667 },
        { latitude: 40.890725, longitude: 29.378408 },
        // Close the polygon by repeating the first coordinate as the last
        { latitude: 40.890544, longitude: 29.377599 },
      ],
    },
    // Add more buildings as needed
  ];
  
  export default buildingBoundaries;
  