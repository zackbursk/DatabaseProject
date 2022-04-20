import React from 'react';
import '../Visualization/Visualization.css';
import { useHistory } from "react-router-dom"
const Home = () => {

    const history = useHistory(); //History allows for button to navigate to another page.
  

    return (
      <div className="App">
      <header className="App-header">
       <div class>
         <h1 className="app-h1">Welcome</h1>
    </div>
    </header>
    </div>
    );
}
 
export default Home;
