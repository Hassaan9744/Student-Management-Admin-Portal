import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import "./App.scss"
import { Route, Routes } from 'react-router-dom'
import Courses from './Pages/Courses'
import Home from './Pages/Home'
import Department from './Pages/Department/Department'
import AddDepartment from './Pages/Department/AddDepartment'
import EditDepartment from './Pages/Department/EditDepartment'
import Students from './Pages/Students/Students'
import EditStudents from './Pages/Students/EditStudent'
import AddStudents from './Pages/Students/Addstudent'
import Teachers from './Pages/Teacher/Teacher'
import AddTeachers from './Pages/Teacher/AddTeacher'
import EditTeachers from './Pages/Teacher/EditTeacher'



const { Sider, Content } = Layout;

export default function Hero() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="sider">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minWidth: "250px",
            minHeight: "100vh",
            marginRight: "10px",
            background: "white",
            position: "static",
          }}
        >
          <div className="demo-logo-vertical" />
          <span className="float-left fs-4 fw-bold m-3">
            {collapsed ? "" : `Saylani` }
          </span>
          <Button
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="fs-4 me-5" />
              ) : (
                <MenuFoldOutlined className="fs-4 me-4" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              border: "1px solid transparent",
              backgroundColor: "transparent",
              float: "right",
            }}
          />
          <Menu
            style={{
              background: "white",
              color: "light",
              fontFamily: "Roboto",
              paddingTop: "5px",
            }}
            mode="inline"
            // dfeaultSelectedKeys={["5"]}
            items={[
              {
                label: collapsed ? (
                  ""
                ) : (
                  <span className="fw-bold mb-0">Menu Items</span>
                ),
              },
              {
                key: "1",
                icon: <i className="fa-solid fa-table-cells-large"></i>,
                label: (
                  <Link to="/" className="text-decoration-none">
                    DashBoard
                  </Link>
                ),
              },
              {
                icon: <i className="fa-solid fa-graduation-cap"></i>,
                label: (
                  <Link to="/Students" className="text-decoration-none">
                    Students
                  </Link>
                ), children:[
                  {
                    key: "2",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Students" className="text-decoration-none">
                        Student's List
                      </Link>
                    ),
                  },
                  {
                    key:"3",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Students/AddStudent" className="text-decoration-none">
                        Add Student
                      </Link>
                    ),
                  },
                  
                ]

              },
              {
                key: "4",
                icon: <i className="fa-solid fa-school"></i>,
                label: (
                  <Link to="/Department" className="text-decoration-none">
                    Department
                  </Link>
                ),children:[
                  {
                    key: "5",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Department" className="text-decoration-none">
                        Department's List
                      </Link>
                    ),
                  },
                  {
                    key:"6",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Departments/AddDepartment" className="text-decoration-none">
                        Add Department
                      </Link>
                    ),
                  },
                  
                ]
                
              },
              {
                key: "",
                icon: <i className="fa-solid fa-person-chalkboard"></i>,
                label: (
                  <Link to="/Teachers" className="text-decoration-none">
                    Teachers
                  </Link>
                ), children:[
                  {
                    key: "7",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Teachers" className="text-decoration-none">
                        Teacher's List
                      </Link>
                    ),
                  },
                  {
                    key:"8",
                    icon: <i className="fa-solid fa-table-cells-large"></i>,
                    label: (
                      <Link to="/Teachers/AddTeacher" className="text-decoration-none">
                        Add Teacher
                      </Link>
                    ),
                  },
                  
                ]

              },
              {
                key: "6",
                icon: <i className="fa-solid fa-book"></i>,
                label: (
                  <Link to="/courses" className="text-decoration-none">
                    Courses
                  </Link>
                ),
              },
            ]}
          />

        </Sider>
        <Layout>
          <div className="container-fluid" style={{backgroundColor:"white",width:"100%",}}>
          <h1 className="mt-2 mb-0 fw-bold" style={{ marginLeft: 30 }}>
            Welcome Admin!
          </h1>
          <hr className="py-2" />
          </div>
          <Content className="content-home">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/courses' element={<Courses />} />
              <Route path='/Department' element={<Department />} />
              <Route path='/Departments/EditDepartments' element={<EditDepartment />} />
              <Route path='/Departments/AddDepartment' element={<AddDepartment />} />
              <Route path='/Students' element={<Students />} />
              <Route path='/Students/EditStudents' element={<EditStudents />} />
              <Route path='/Students/AddStudent' element={<AddStudents />} />
              <Route path='/Teachers/EditTeachers' element={<EditTeachers />} />
              <Route path='/Teachers/AddTeacher' element={<AddTeachers />} />
              <Route path='/Teachers*' element={<Teachers />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
