import {
  REMOVE_ROUTE,
  POPULATE_ALL_ROUTES,
  ADD_ROUTE,
  ADD_PATH,
  ADD_BUS,
  ADD_PATH_BUSES,
  ADD_PATH_LAST_TIME,
  ADD_MAP_DATA_FEATURES,
} from '../actions/';

const initialState = {
  mapDataFeatures: [], // data to render the background city map
  allRoutes: [], // list of all routes for agency (MUNI)
  selectedRoutes: [], // currently displayeds routes
  routePaths: {}, // route path information (Bus stops, etc)
  routePathBuses: {}, // key = route tag, value = array of bus IDs in that route
  routePathLastTime: {}, // key = route tag, value = last time API was called
  buses: {}, // individual buses, key = bus id, value = bus info
};

const busAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ROUTE: {
      const routeIndex = state.selectedRoutes.indexOf(action.route);
      if (routeIndex === -1) return state;
      const newSelectedRoutes = state.selectedRoutes.slice();
      newSelectedRoutes.splice(routeIndex, 1);
      return Object.assign({}, state, {
        selectedRoutes: newSelectedRoutes,
      });
    }
    case ADD_ROUTE: {
      const newSelectedRoutes = state.selectedRoutes.slice();
      newSelectedRoutes.push(action.route);
      return Object.assign({}, state, {
        selectedRoutes: newSelectedRoutes,
      });
    }
    case ADD_MAP_DATA_FEATURES: {
      const newFeatures = state.mapDataFeatures.slice();
      newFeatures.push(action.data);
      return Object.assign({}, state, {
        mapDataFeatures: newFeatures,
      });
    }
    case ADD_PATH: {
      return {
        ...state,
        routePaths: {
          ...state.routePaths,
          [action.key]: action.value,
        },
      };
    }
    case ADD_BUS: {
      return {
        ...state,
        buses: {
          ...state.buses,
          [action.key]: action.value,
        },
      };
    }
    case ADD_PATH_BUSES: {
      let newValue = action.value;
      // we do not want to replace existing bus list, but add on to it
      // will need to figure out when to remove buses that are no longer in service.
      // It seems like the API doesn't have a clean way to find buses no longer in service.
      if (state.routePathBuses[action.key] !== undefined) {
        const curList = state.routePathBuses[action.key].slice();
        newValue = Array.from(new Set(curList.concat(action.value)));
      }
      return {
        ...state,
        routePathBuses: {
          ...state.routePathBuses,
          [action.key]: newValue,
        },
      };
    }
    case ADD_PATH_LAST_TIME: {
      return {
        ...state,
        routePathLastTime: {
          ...state.routePathLastTime,
          [action.key]: action.value,
        },
      };
    }
    case POPULATE_ALL_ROUTES: {
      return Object.assign({}, state, {
        allRoutes: action.routes,
      });
    }
    default:
      return state;
  }
};

export default busAppReducer;
