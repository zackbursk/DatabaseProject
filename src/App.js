import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Navigation from './components/Navigation/Navigation.js';
import Visualization from './components/Visualization/Visualization.js';
import Trend1 from './components/Visualization/Trend1.js';
import Trend2 from './components/Visualization/Trend2.js';
import Trend3 from './components/Visualization/Trend3.js';
import Trend4 from './components/Visualization/Trend4.js';
import Trend5 from './components/Visualization/Trend5.js';
import Trend6 from './components/Visualization/Trend6.js';
import Trend7 from './components/Visualization/Trend7.js';
import Trend8 from './components/Visualization/Trend8.js';
import Trend9 from './components/Visualization/Trend9.js';
import TupleCount from './components/Visualization/TupleCount.js';
class App extends Component {
  render() {
    console.log("here");
    return (      
      <BrowserRouter>
        <Navigation />
          <Switch>
           <Route path="/" component={Home} exact/>
           <Route path="/Visualizations" component={Visualization}/>
           <Route path="/Trend1" component={Trend1}/>
           <Route path="/Trend2" component={Trend2}/>
           <Route path="/Trend3" component={Trend3}/>
           <Route path="/Trend4" component={Trend4}/>
           <Route path="/Trend5" component={Trend5}/>
           <Route path="/Trend6" component={Trend6}/>
           <Route path="/Trend7" component={Trend7}/>
           <Route path="/Trend8" component={Trend8}/>
           <Route path="/Trend9" component={Trend9}/>
           <Route path="/TupleCount" component={TupleCount}/>
         </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
