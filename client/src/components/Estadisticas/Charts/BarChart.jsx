import React from 'react'
import {Bar} from "react-chartjs-2"



function BarChart() {
  
  return (
    <div>
      <Bar
      data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        }}
      height={400}
      width={600}
      />
      <p>Hola Mundo</p>

    </div>
  )
}

export default BarChart