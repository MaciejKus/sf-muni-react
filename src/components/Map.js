import React from 'react';
import DrawGeoJson from './DrawGeoJson';
import BusRouteContainer from '../containers/BusRouteContainer';

const Map = () => {
  const mapComponentData = [
    {
      strokeColor: '#bbb',
      dataUrl: './assets/sfmaps/streets.json',
    },
    {
      strokeColor: '#777',
      dataUrl: './assets/sfmaps/freeways.json',
    },
    {
      strokeColor: '#999',
      dataUrl: './assets/sfmaps/arteries.json',
    },
  ];

  return (
    <svg width="800" height="800" viewBox="0, 0, 800, 800">
      {mapComponentData.map((d) => (
        <DrawGeoJson
          key={`ma_${d.dataUrl}`}
          strokeColor={d.strokeColor}
          dataUrl={d.dataUrl}
        />
      ))}
      <BusRouteContainer />
    </svg>
  );
};

export default Map;
