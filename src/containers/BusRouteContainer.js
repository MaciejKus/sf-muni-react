import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PathRoutes from '../components/PathRoutes';
import BusStops from '../components/BusStops';
import DrawBus from '../components/DrawBus';

const BusRoute = (props) => (
  <g>
    {props.selectedRoutePaths.map((route, i) => (
      <PathRoutes
        key={`pathroute_${route.tag}_${i}`}
        id={`${route.tag}_${i}`}
        paths={route.path}
        color={route.color}
      />
    ))}
    {props.selectedBusStops.map((bus) => (
      <BusStops
        key={`busstop_${bus.id}`}
        id={`busstop_${bus.id}`}
        busStops={bus.busStops}
        color={bus.color}
      />
    ))}
    {props.selectedBuses.map((bus) => (
      <DrawBus
        key={`bus_${bus.id}`}
        id={`bus_${bus.id}`}
        buses={bus.buses}
        color={bus.color}
      />
    ))}
  </g>
);

BusRoute.propTypes = {
  selectedRoutePaths: PropTypes.arrayOf(PropTypes.object),
  selectedBusStops: PropTypes.arrayOf(PropTypes.object),
  selectedBuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const selectedRoutePaths = [];
  const selectedBusStops = [];
  const selectedBuses = [];
  state.selectedRoutes.forEach((r) => {
    let color = '000000';
    if (state.routePaths[r] !== undefined) {
      selectedRoutePaths.push(state.routePaths[r]);
      color = state.routePaths[r].color;
      selectedBusStops.push({
        color,
        id: r,
        busStops: state.routePaths[r].stop,
      });
    }
    if (
      state.routePathBuses[r] !== undefined &&
      state.routePathBuses[r].length > 0
    ) {
      selectedBuses.push({
        color,
        id: state.routePathBuses[r][0], // first bus for that route is the ID
        buses: state.routePathBuses[r].map((busId) => state.buses[busId]),
      });
    }
  });

  return {
    selectedRoutePaths,
    selectedBusStops,
    selectedBuses,
  };
};

const BusRouteContainer = connect(mapStateToProps)(BusRoute);

export default BusRouteContainer;
