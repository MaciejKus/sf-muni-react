import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import '../styles/RouteList.css';

const RouteSelection = (props) => (
  <div>
    <h2>Select Muni Routes</h2>
    <ul className="routeList">
      {props.routes.map((route) => {
        const selectedIndex = props.selectedRoutes.indexOf(route.tag);
        const isActive = selectedIndex !== -1;
        return (
          <ListItem
            key={route.tag}
            tag={route.tag}
            isActive={isActive}
            handleAddRoute={props.addRoute}
            handleRemoveRoute={props.removeRoute}
            title={route.title}
          />
        );
      })}
    </ul>
  </div>
);

RouteSelection.propTypes = {
  tag: PropTypes.string,
  title: PropTypes.string,
  routes: PropTypes.array.isRequired,
  addRoute: PropTypes.func,
  removeRoute: PropTypes.func,
  selectedRoutes: PropTypes.arrayOf(PropTypes.string),
};

RouteSelection.defaultTypes = {
  tag: '',
  title: '',
  selectedRoutes: [],
};

export default RouteSelection;
