import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ListItems.css';

class ListItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.isActive) {
      this.props.handleRemoveRoute(this.props.tag);
    } else {
      this.props.handleAddRoute(this.props.tag);
    }
  }

  render() {
    return (
      <li
        onClick={this.handleClick}
        className={this.props.isActive ? 'isActive' : ''}
      >
        {this.props.title}
      </li>
    );
  }
}

ListItem.defaultProps = {
  isActive: false,
};

ListItem.propTypes = {
  isActive: PropTypes.bool,
  handleAddRoute: PropTypes.func.isRequired,
  handleRemoveRoute: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ListItem;
