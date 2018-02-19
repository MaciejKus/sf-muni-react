import { connect } from 'react-redux';
import RouteSelection from '../components/RouteSelection';
import {
  addRoute,
  fetchRoutePath,
  fetchBusLocations,
  removeRoute,
} from '../actions/';

const mapStateToProps = (state) => ({
  routes: state.allRoutes,
  selectedRoutes: state.selectedRoutes,
});

const mapDispatchToProps = (dispatch) => ({
  addRoute: (route) => {
    dispatch(addRoute(route));
    dispatch(fetchRoutePath(route));
    dispatch(fetchBusLocations(route));
  },
  removeRoute: (route) => {
    dispatch(removeRoute(route));
  },
});

const RouteSelectionContainer = connect(mapStateToProps, mapDispatchToProps)(RouteSelection,);

export default RouteSelectionContainer;
