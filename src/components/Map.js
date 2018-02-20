import React from 'react';
import BusRouteContainer from '../containers/BusRouteContainer';
import MapBackgroundContainer from '../containers/MapBackgroundContainer';

const Map = () => {
  return (
    <svg width="800" height="800" viewBox="0, 0, 800, 800">
      <MapBackgroundContainer />
      <BusRouteContainer />
    </svg>
  );
};

export default Map;
