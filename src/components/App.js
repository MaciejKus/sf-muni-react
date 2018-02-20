import React from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import RouteSelectionContainer from '../containers/RouteSelectionContainer';
import { fetchAllRoutes, updateCurrentBuses, fetchMapDataFeatures } from '../actions/';
import '../styles/App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllRoutes());
    this.pollBusData();

  const mapComponentData = [ 
    { 
      color: '#bbb', 
      url: './assets/sfmaps/streets.json', 
    }, 
    { 
      color: '#777', 
      url: './assets/sfmaps/freeways.json', 
    }, 
    { 
      color: '#999', 
      url: './assets/sfmaps/arteries.json', 
    }, 
  ]; 

    mapComponentData.forEach( (d) => {
      this.props.dispatch(fetchMapDataFeatures(d.url, d.color));
    })
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
