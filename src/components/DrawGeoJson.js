import React from 'react';
import PropTypes from 'prop-types';
import { getPath } from '../helpers/';

const DrawGeoJson = (props) => (
  <g>
    {props.features.map((d, i) => (
      <path
        key={`${props.url}_${i}`}
        d={getPath(d)}
        fill="none"
        stroke={props.color}
        strokeWidth="1"
      />
    ))}
  </g>
);

DrawGeoJson.defaultProps = {
  color: 'black',
};

DrawGeoJson.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default DrawGeoJson;
