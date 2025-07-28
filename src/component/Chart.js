import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, LinearScale, Chart as ChartJS } from 'chart.js/auto'

ChartJS.register(
    CategoryScale,
    LinearScale
)

function Chart({data}) {
  return (
    <Bar className="chart" data={data}/>
  )
}

export default Chart
