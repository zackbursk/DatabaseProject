import React from 'react';
import './Visualization.css';
import weatherTable from './w2.jpeg';
import routesTable from './r2.jpeg';
import airlinesTable from './airlines.jpeg';
import airplanesTable from './airplanes.jpeg';
import airportsTable from './airports.jpeg';
import departuresTable from './departures.jpeg';
const Visualization = () => {
    return (
      <div className="App">
      <header className="App-header">
       <div class>
         <h1 className="app-h1">Table Data</h1>
          <p>Routes Table</p>
          <img src={routesTable} className="App-logo" alt="logo" />
          <p>Weather Table</p>
          <img src={weatherTable} className="App-logo" alt="logo" />
          <p>Departures Table</p>
          <img src={departuresTable} className="App-logo" alt="logo" />
          <p>Airplanes Table</p>
          <img src={airplanesTable} className="App-logo" alt="logo" />
          <p>Airlines Table</p>
          <img src={airlinesTable} className="App-logo" alt="logo" />
          <p>Airports Table</p>
          <img src={airportsTable} className="App-logo" alt="logo" />
    </div>
    </header>
    </div>
    );
}
 
export default Visualization;