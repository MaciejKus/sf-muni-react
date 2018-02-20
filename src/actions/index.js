import { json as d3json } from 'd3-fetch';
import { toGeoLineString } from '../helpers/';

export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const ADD_ROUTE = 'ADD_ROUTE';
export const ADD_PATH = 'ADD_PATH';
export const ADD_PATH_LAST_TIME = 'ADD_PATH_LAST_TIME';
export const ADD_PATH_BUSES = 'ADD_PATH_BUSES';
export const ADD_BUS = 'ADD_BUS';
export const ADD_MAP_DATA_FEATURES = 'ADD_MAP_DATA_FEATURES';
export const POPULATE_ALL_ROUTES = 'POPULATE_ALL_ROUTES';

export const removeRoute = (route) => ({
  type: REMOVE_ROUTE,
  route,
});

export const addRoute = (route) => ({
  type: ADD_ROUTE,
  route,
});

export const addMapDataFeatures = (data) => ({
  type: ADD_MAP_DATA_FEATURES,
  data,
});

export const addPath = (key, value) => ({
  type: ADD_PATH,
  key,
  value,
});

export const addBus = (key, value) => ({
  type: ADD_BUS,
  key,
  value,
});

export const addPathBuses = (key, value) => ({
  type: ADD_PATH_BUSES,
  key,
  value,
});

export const addPathLastTime = (key, value) => ({
  type: ADD_PATH_LAST_TIME,
  key,
  value,
});

export const populateAllRoutes = (routes) => ({
  type: POPULATE_ALL_ROUTES,
  routes,
});

// get individual buses
export const fetchBusLocations = (route) => (dispatch, getState) => {
  // get time of last time the API was queried to prevent
  // unneeded data transfers with the API. See
  // https://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf
  const lastTime = getState().routePathLastTime[route] || 0;

  return d3json(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&r=${route}&t=${lastTime}`,)
    .then((response) => {
      if (response.vehicle === undefined) {
        throw new Error(`No current buses for route ${route}`);
      }
      // a single route is returned as an object not an array
      // we turn it into an array
      if (Array.isArray(response.vehicle) === false) {
        response.vehicle = [response.vehicle];
      }
      // array of bus IDs only
      const busIDs = [];
      response.vehicle.forEach((v) => {
        busIDs.push(v.id);
        // update individual bus info
        dispatch(addBus(v.id, v));
      });
      dispatch(addPathBuses(route, busIDs));
      dispatch(addPathLastTime(route, response.lastTime.time));
    })
    .catch((err) => console.log(err));
};

// get the route path information (bus stops, etc.)
export const fetchRoutePath = (route) => (dispatch, getState) => {
  // if we already have this path, no need to fetch it again
  const currentPaths = getState().routePaths;
  const paths = Object.keys(currentPaths);
  for (const path of paths) {
    if (path.tag === route) return null;
  }

  return (
    d3json(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=${route}`,)
      .then(response => response.route)
      // turn path into an array of GeoJSON LineString Geometry Objects
      .then((response) => {
        response.path = toGeoLineString(response.path);
        return response;
      })
      .then((response) => {
        dispatch(addPath(route, response));
      })
      .catch(err => console.log(err))
  );
};

// get list of all routes
export const fetchAllRoutes = () => (dispatch) => {
  const url =
    'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni';
  return d3json(url)
    .then(response => response.route)
    .then((response) => {
      dispatch(populateAllRoutes(response));
    })
    .catch((err) => {
      console.log('failed to get Muni data', err);
    });
};

export const fetchMapDataFeatures = (url, color) => (dispatch) => {
  return d3json(url)
    .then((data) => {
      dispatch(addMapDataFeatures(
        {features: data.features, url: url, color: color}
      ))
    })
    .catch((err) => console.warn(`fetch failed ${err}`));
};

// update the data of currently selected buses
export const updateCurrentBuses = () => (dispatch, getState) => {
  const selectedRoutes = getState().selectedRoutes || [];
  selectedRoutes.forEach((r) => {
    dispatch(fetchBusLocations(r));
  });
};
