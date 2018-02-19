import React from 'react';
import PropTypes from 'prop-types';
import { getPath } from '../helpers/';

const PathRoutes = (props) => (
  // if(props.paths === undefined) return null;
  <g>
    {props.paths.map((route, i) => (
      <path
        key={`${props.id}_${i}`}
        d={getPath(route)}
        stroke={`#${props.color}`}
        fill="none"
        strokeWidth="2"
      />
    ))}
  </g>
);

PathRoutes.defaultProps = {
  color: '000000',
};

PathRoutes.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default PathRoutes;
