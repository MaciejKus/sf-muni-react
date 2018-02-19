import { geoAlbers, geoPath } from 'd3-geo';

// If adding additional cities might want to make this a function
export const projectionSF = geoAlbers()
  .center([0, 37.7749]) // San Francisco longitude
  .rotate([122.4194, 0]) // San Francisco latitude
  .scale(320000)
  .translate([800 / 2, 800 / 2]);

export const getPath = (d) => geoPath().projection(projectionSF)(d);

// given an array of points with an array of lat lon in each point from the NexyBus API,
// return a geoJSON LineString array
export const toGeoLineString = (path) =>
  path.map((obj) => {
    const lonLatArray = obj.point.map((p) => [p.lon, p.lat]);
    return {
      type: 'LineString',
      coordinates: lonLatArray,
    };
  });

export const toGeoMultiPoint = (buses) => {
  const lonLatArray = buses.map((bus) => [bus.lon, bus.lat]);
  return {
    type: 'MultiPoint',
    coordinates: lonLatArray,
  };
};
