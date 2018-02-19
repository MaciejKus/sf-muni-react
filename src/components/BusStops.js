import React from 'react';
import PropTypes from 'prop-types';
import { getPath, toGeoMultiPoint } from '../helpers/';

const BusStops = (props) => {
  const geoObj = toGeoMultiPoint(props.busStops);
  return (
    <path
      key={`bus_points_${props.id}`}
      d={getPath(geoObj)}
      fill={`#${props.color}`}
      strokeWidth="1"
      stroke="black"
    />
  );
};

BusStops.defaultProps = {
  color: '0000000',
};

BusStops.propTypes = {
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  busStops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BusStops;
