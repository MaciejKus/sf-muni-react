import React from 'react';
import PropTypes from 'prop-types';
import { projectionSF } from '../helpers/';

const DrawBus = (props) => (
  <g>
    {props.buses.map((bus) => {
      const xy = projectionSF([bus.lon, bus.lat]);
      return (
        <rect
          key={`bus_rect_${bus.id}`}
          fill={`#${props.color}`}
          stroke="black"
          strokeWidth="1"
          x={xy[0]}
          y={xy[1]}
          width="12"
          height="12"
        />
      );
    })}
  </g>
);

DrawBus.defaultProps = {
  color: '000000',
};

DrawBus.propTypes = {
  buses: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default DrawBus;
