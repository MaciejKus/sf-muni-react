import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DrawGeoJson from '../components/DrawGeoJson';

const MapBackground= (props) => (
  <g>
    {props.mapDataFeatures.map((d) => (
        <DrawGeoJson
          key={`ma_${d.url}`}
          color={d.color}
          url={d.url}
          features={d.features}
        />
      )
    )}
  </g>
);

MapBackground.propTypes = {
  d: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    mapDataFeatures: state.mapDataFeatures,
  }
};

const MapBackgroundContainer = connect(mapStateToProps)(MapBackground);

export default MapBackgroundContainer;
