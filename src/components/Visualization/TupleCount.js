import React, { useState } from 'react';
import './Visualization.css';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const TupleCount = () => {
  const [output,setOutput]=useState(0)
  function queryData()
  {
    console.log("here");
    axios.get(`http://localhost:5000/api/tuple/`).then(res => {
      console.log("here");
      setOutput(res.data[0]);
    })
  }
    return (
        <div className="App">
        <header className="App-header">
        <div>
          <h1 className="app-h2">Total Number of Tuples</h1>
          <p className="output1"> {output} </p>  
          <p><Button class = "circlebutton circlebutton1" disableRipple="true" onClick={() => queryData()} >Click To Query</Button></p>
       </div>
        </header>
      </div>
       
    );
}
 
export default TupleCount;