import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import busAppReducer from './reducers';

export default () => createStore(busAppReducer, applyMiddleware(thunk));
