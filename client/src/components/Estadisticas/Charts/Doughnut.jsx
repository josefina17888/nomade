import React from 'react'
import {Bar, Pie, Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS, 
  BarElement,
CategoryScale,
LinearScale,
Title,
Legend,ArcElement } from "chart.js"
import {useState , useEffect} from "react"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  ArcElement
)




function ChartP({ocupacion}) {
  console.log(ocupacion)
    return (
      <div className="App" style={{width:"30%" , height:"30%"}}>
        <h1>Ocupación</h1>
        
        <Doughnut
        data={{
          labels:[`${ocupacion}% - Ocupado` , `${100 - ocupacion}% - No Ocupado`],
          datasets:[{
            data:[ocupacion, 100 - ocupacion ],
            backgroundColor:['red','green'],
            hoverOffset: 4,
            label: "Ocupación"
          }]}} 
        >
  
        </Doughnut>
  
      </div>
    );
  }
  
  export default ChartP;