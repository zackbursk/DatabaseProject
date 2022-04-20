import React, {useState} from 'react';
import './Visualization.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const Trend6 = () => {
  const [output,setOutput]=useState([10,10,10,10,10,10,10,10,10,10,10,10])
  const [airportName,setAirportName]=useState("JetBlue Airways")
  const [airplaneName,setAirplaneName]=useState("JetBlue Airways")
  const [cityCode,setCityName]=useState("JetBlue Airways")
  const [airlineName,setAirlineName]=useState("JetBlue Airways")

  const handleAirportNameChange = ({ currentTarget: input }) => {
    setAirportName(input.value);
  };
  const handleAirplaneNameChange = ({ currentTarget: input }) => {
    setAirplaneName(input.value);
  };
  const handleCityChange = ({ currentTarget: input }) => {
    setCityName(input.value);
  };
  const handleAirlineNameChange = ({ currentTarget: input }) => {
    setAirlineName(input.value);
  };

  function queryData()
  {
    axios.get(`http://localhost:5000/api/trend6/${airlineName}`).then(res => {
      setOutput([res.data[0][0],res.data[0][1],res.data[0][2],res.data[0][3],res.data[0][4]]);
    })
  }
  return (
    <div className="App2">
    <header className="App2-header">
    <div>
      <h1 className="app-h11">Delays Based On Different Airlines</h1>
   </div>
   <div className="chart">
    <Line 
    data={{
      labels: ['2010','2011','2012','2013','2014'],
      datasets: [{
        label: 'Average Delay',
        data: output,
        borderColor: 'rgb(71, 23, 246)',
        backgroundColor: 'rgb(192, 192, 192, .5)',
        pointBackgroundColor: 'rgb(23, 26, 33)',
        pointRadius: '4',
      }],
    }}
    height={600}
    width={1200}
    options={{
      maintainAspectRatio: false,
      responsive: false,
    }
    }
  />
    </div>
    <div className="id" style={{
        borderWidth: 2,
        borderRadius: 9
      }}>
    <form>
        <label>
        <p>Airline Name: </p>
        <input type="text" name="Name" value={airlineName} onChange={handleAirlineNameChange}/>
        </label>
      </form>
      <Button class = "squarebutton squarebutton1" disableRipple="true" onClick={() => queryData()} >Query</Button>
    </div>
    </header>
  </div>
   
);
}
 
export default Trend6;