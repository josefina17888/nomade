import React from 'react'
// import {Pie} from "react-chartjs-2"
// import {Chart as ChartJS, 
//   BarElement,
// CategoryScale,
// LinearScale,
// Title,
// Legend } from "chart.js"
// import {useState , useEffect} from "react"

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Legend 
// )



// export default function Dought() {
 

//   return (
//     <div>
//         <Pie
//       data={{
//         labels:['Jan','Feb','Mar','Apr','May','Jun'],
//         datasets:[{
//           data:[100,200,300,400,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[20,44,300,33,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[22,200,444,400,500,30],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         }]
//       }
//       }
//       >

//       </Pie>
//     </div>
     
//   )
// }

// import React from 'react'
// import {Pie , Bar, Doughnut} from "react-chartjs-2"
// import {Chart as ChartJS, 
//   BarElement,
// CategoryScale,
// LinearScale,
// Title,
// Legend } from "chart.js"
// import {useState , useEffect} from "react"

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Legend 
// )


// export default function Dough() {
// return (
//     <div>
//        {/* <Bar
//       data={chartData}
//       options={chartOptions}
//       height="50px"
//       /> */}
//        {/* <Bar
//       data={{
//         labels:['Ene','Feb','Mar','Abr','May','Jun'],
//         datasets:[{
//           label:'Reservas',
//           data:[100,200,300,400,500,600],
//           backgroundColor:'#069A8E',
//           barThickness:12
//         },

//         ]
//       }}
//       options={{
//         tooltips:{
//           mode:'index',
//           callbacks:{
//             label:function(toolTipItem){
//               return ("Revenue: $"+toolTipItem.value)
//             }
//           }

//         },
//         scales:{
//           xAxes:[
//             {
//               gridLines:{
//               color:'cyan'
//             },
//               scaleLabel:{
//                 labelString:'Months',
//                 display:true,
//                 fontColor:'blue',
//                 fontSize:20
//               },
//               ticks:{
//                 fontColor:'green'
//               }
//             }
//           ],
//           yAxes:[
//           {
//             gridLines:{
//               color:'cyan'
//             },
//             scaleLabel:{
//                 labelString:'Revenue',
//                 display:true,
//                 fontColor:'blue',
//                 fontSize:20,
//               },
//             ticks:{
//               beginAtZero:true,
//               fontColor:'green',
              
//             }
//           }
//           ]
//         }
//       }}
//       height="50px"
//       >

//       </Bar> */}


//       {/* <Pie
//       data={{
//         labels:['Jan','Feb','Mar','Apr','May','Jun'],
//         datasets:[{
//           data:[100,200,300,400,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[20,44,300,33,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[22,200,444,400,500,30],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         }]
//       }
//       }
//       >
//       </Pie> */}
//       <Doughnut
//       data={{
//         labels:['Jan','Feb','Mar','Apr','May','Jun'],
//         datasets:[{
//           data:[100,200,300,400,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[20,44,300,33,500,600],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         },
//         {
//           data:[22,200,444,400,500,30],
//           backgroundColor:['red','green','orange','purple','cyan','blue'],
//         }]
//       }
//       }
//       >

//       </Doughnut>
//     </div>
     
//   )
// }
import {Bar, Pie, Doughnut} from 'react-chartjs-2'

function Chart() {
    return (
      <div className="App">
        <h1>Welcome to ChartJS Demo</h1>
        {/* <Bar
        data={{
          labels:['Jan','Feb','Mar','Apr','May','Jun'],
          datasets:[{
            label:'Store 1',
            data:[100,200,300,400,500,600],
            backgroundColor:'red',
            barThickness:12
          },
          {
            label:'Store 2',
            data:[321,212,344,332,223,566],
            backgroundColor:'green',
            barThickness:12
          },
          {
            label:'Store 3',
            data:[123,200,232,400,232,23],
            backgroundColor:'orange',
            barThickness:12
          },
          {
            label:'Store 4',
            data:[100,500,300,343,43,343],
            backgroundColor:'purple',
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
        >
  
        </Bar> */}
  
        <Pie
        data={{
          labels:['Jan','Feb','Mar','Apr','May','Jun'],
          datasets:[{
            data:[100,200,300,400,500,600],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          },
          {
            data:[20,44,300,33,500,600],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          },
          {
            data:[22,200,444,400,500,30],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          }]
        }
        }
        >
  
        </Pie>
  
        {/* <Doughnut
        data={{
          labels:['Jan','Feb','Mar','Apr','May','Jun'],
          datasets:[{
            data:[100,200,300,400,500,600],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          },
          {
            data:[20,44,300,33,500,600],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          },
          {
            data:[22,200,444,400,500,30],
            backgroundColor:['red','green','orange','purple','cyan','blue'],
          }]
        }
        }
        >
  
        </Doughnut> */}
  
      </div>
    );
  }
  
  export default Chart;