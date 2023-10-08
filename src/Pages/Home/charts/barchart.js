import { BarElement } from 'chart.js'
import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import  {chart as chartjs} from "chart.js/auto"

export default function barchart({chartdata}) {
  return (
  <Line data={chartdata} />

  )
}
