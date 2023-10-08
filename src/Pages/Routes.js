import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Courses from './Courses'
import Home from './Home'
import Department from './Department'
import Students from './Students'
import Teachers from './Teacher'

export default function Index() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/courses' element={<Courses/>} />
                <Route path='/Deapartment' element={<Department/>} />
                <Route path='/Students' element={<Students/>} />
                <Route path='/Teachers*' element={<Teachers/>} />
            </Routes>
        </>
    )
}
