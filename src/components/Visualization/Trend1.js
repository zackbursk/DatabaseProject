import React, {useState} from 'react';
import './Visualization.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Button from '@material-ui/core/Button'
const Trend1 = () => {
  const [output,setOutput]=useState([10,10,10,10,10,10,10,10,10,10,10,10])
  const [year,setYear]=useState(2012)
  
  const handleYearChange = ({ currentTarget: input }) => {
    setYear(input.value);
  };

  function queryData()
  {
    axios.get(`http://localhost:5000/api/trend1/${year}`).then(res => {
      setOutput([res.data[0][0],res.data[0][1],res.data[0][2],res.data[0][3]]);
    })
  }
    return (
      <div className="App2">
      <header className="App2-header">
      <div>
        <h1 className="app-h11">Delays During Different Seasons</h1>
     </div>
     <div className="chart">
        <Line 
        data={{
          labels: ['Winter','Spring','Summer','Autumn'],
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
          <p>Year (2010 - 2014): </p>
            <input type="number" name="Year" value={year} onChange={handleYearChange}/>
            </label>
          </form>
          <Button class= "squarebutton squarebutton1" disableRipple="true" onClick={() => queryData()} >Query</Button>
        </div>
      </header>
      </div>
    );
}
 
export default Trend1;