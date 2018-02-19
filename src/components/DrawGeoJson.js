import React from 'react';
import PropTypes from 'prop-types';
import { json as d3json } from 'd3-fetch';
import { getPath } from '../helpers/';

class DrawGeoJson extends React.Component {
  constructor() {
    super();
    this.state = {
      dataFeatures: [],
    };
  }

  componentDidMount() {
    d3json(this.props.dataUrl)
      .then((data) =>
        this.setState({
          dataFeatures: data.features,
        }),)
      .catch(err => console.warn(err));
  }
  render() {
    return (
      <g>
        {this.state.dataFeatures.map((d, i) => (
          <path
            key={`${this.props.dataUrl}_${i}`}
            d={getPath(d)}
            fill="none"
            stroke={this.props.strokeColor}
            strokeWidth="1"
          />
        ))}
      </g>
    );
  }
}

DrawGeoJson.defaultProps = {
  strokeColor: 'black',
};

DrawGeoJson.propTypes = {
  strokeColor: PropTypes.string,
  dataUrl: PropTypes.string.isRequired,
};

export default DrawGeoJson;
