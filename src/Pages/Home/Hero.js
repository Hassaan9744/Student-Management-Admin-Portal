import React, { useState } from 'react'
import img from "../../assets/dash-icon-01.svg"
import img2 from "../../assets/dash-icon-02.svg"
import img3 from "../../assets/dash-icon-03.svg"
import img4 from "../../assets/dash-icon-04.svg"
import "./Hero.scss"
import BarChart from './charts/barchart'
import {Userdata, studentData} from "./charts/UserData"
import { Bar } from 'react-chartjs-2'



export default function Hero() {
  const [userData ,setUserdata] = useState({
    labels: Userdata.map((data)=> data.year),
    datasets:[{
      label: "Students",
      data: Userdata.map((data)=> data.Students),

    },{
      label: "Teachers",
      data: Userdata.map((data)=> data.Teachers),

    },
  ]
  })
  const [StudentData ,setStudentData] = useState({
    labels: studentData.map((data)=> data.year),
    datasets:[{
      label: "Boys",
      data: studentData.map((data)=> data.Boy),

    },{
      label: "Girls",
      data: studentData.map((data)=> data.Girls),

    },
  ]
  })
  return (
    <>
      <div className="container-fluid content">

        <div className="row col-12">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">
                <div className="db-info">
                  <h6 className='name'>Students</h6>
                  <h3 className='count'>50055</h3>
                </div>
                <div className="db-icon">
                  <img src={img} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">

                <div className="db-info">
                  <h6 className='name'>Awards</h6>
                  <h3 className='count'>50+</h3>
                </div>
                <div className="db-icon">
                  <img src={img2} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">

                <div className="db-info">
                  <h6 className='name'>Department</h6>
                  <h3 className='count'>20+</h3>
                </div>
                <div className="db-icon">
                  <img src={img3} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card bg-comman w-100">
              <div className="card-body">

                <div className="db-info">
                  <h6 className='name'>Revenue</h6>
                  <h3 className='count'>505+</h3>
                </div>
                <div className="db-icon">
                  <img src={img4} alt="Dashboard Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 col-lg-6 mt-3">
            <div className="card card-chart">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="card-title">Overview</h5>
                  </div>
                  <div className="col-6">
                    <ul className="chart-list-out">
                      <li><span className="circle-green"></span>Number of Students and Teachers</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
              <BarChart chartdata={userData} />
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 mt-3">
            <div className="card card-chart">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="card-title">Number of Students</h5>
                  </div>
                  <div className="col-6">
                    <ul className="chart-list-out">
                      <li><span className="circle-blue"></span>Boys and Girls</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body">
              <Bar data={StudentData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
