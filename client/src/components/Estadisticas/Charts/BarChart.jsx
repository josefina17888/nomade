import React from 'react'
import {Bar} from "react-chartjs-2"
import {Chart as ChartJS, 
  BarElement,
CategoryScale,
LinearScale,
Title,
Legend } from "chart.js"
import {useState , useEffect} from "react"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend 
)



export default function BarChart() {
  // const [chartData , setChartData] = useState({
  //   datasets: []
  // })
  // const [chartOptions, setChartOptions] = useState({})

  // useEffect(() => {
  //   setChartData({
  //     labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [
  //       {
  //         label: "Reservas por País",
  //         data: [12,55,20,30,45,50],
  //         borderColor: "red",
  //         backgroundColor: "skyblue"
  //       }
  //     ]
  //   })
  //   setChartOptions({
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top"
  //       },
  //       title: {
  //         display: true,
  //         text: "holaaaaaa"
  //       }
  //     },
      
  //   })
  // }, [])

  

  return (
    <div>
       {/* <Bar
      data={chartData}
      options={chartOptions}
      height="50px"
      /> */}
       <Bar
      data={{
        labels:['Ene','Feb','Mar','Abr','May','Jun'],
        datasets:[{
          label:'Reservas',
          data:[100,200,300,400,500,600],
          backgroundColor:'#069A8E',
          barThickness:12
        },

        ]
      }}
      options={{
        tooltips:{
          mode:'index',
          callbacks:{
            label:function(toolTipItem){
              return ("Revenue: $"+toolTipItem.value)
            }
          }

        },
        scales:{
          xAxes:[
            {
              gridLines:{
              color:'cyan'
            },
              scaleLabel:{
                labelString:'Months',
                display:true,
                fontColor:'blue',
                fontSize:20
              },
              ticks:{
                fontColor:'green'
              }
            }
          ],
          yAxes:[
          {
            gridLines:{
              color:'cyan'
            },
            scaleLabel:{
                labelString:'Revenue',
                display:true,
                fontColor:'blue',
                fontSize:20,
              },
            ticks:{
              beginAtZero:true,
              fontColor:'green',
              
            }
          }
          ]
        }
      }}
      height="50px"
      >

      </Bar>
    </div>
     
  )
}

