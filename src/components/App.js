import React from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import RouteSelectionContainer from '../containers/RouteSelectionContainer';
import { fetchAllRoutes, updateCurrentBuses } from '../actions/';
import '../styles/App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllRoutes());
    this.pollBusData();
  }

  componentWillUnmount() {
    clearInterval(this.busTimer);
  }

  pollBusData() {
    this.busTimer = setInterval(() => {
      this.props.dispatch(updateCurrentBuses());
    }, 15000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Live SF Muni Map</h1>
        </header>
        <section className="mainSection">
          <Map />
          <RouteSelectionContainer />
        </section>
      </div>
    );
  }
}

App = connect()(App);

export default App;
