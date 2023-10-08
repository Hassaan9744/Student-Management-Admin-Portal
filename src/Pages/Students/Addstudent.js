import React, { useState } from 'react'
import { Button, Col, Option, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../config/firebase';

const { Title } = Typography

const initialState = { Name: "", ContactNo: "", Department: "", Address: "", Status: "" }

export default function Hero() {
  const [status, SetStatus] = useState()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const Atendences =["Present","Absent"]

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handledate = (_, Department) => setState(s => ({ ...s, Department }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { Name, ContactNo, Department, Address, Status } = state

    if (!Name) { return message.error("Please enter Name") }

    const Student = {
      Name, ContactNo, Department, Address, Status,
      //   DepartmentCreated: new Department().getTime(),
      id: Math.random().toString(36).slice(2)
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Students", Student.id), Student);
      message.success("A new Student added successfully")
      console.log('student.id', Student.id)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Add Student</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Nme">
                      <Input placeholder='Input Student Name' name='Name' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="ContactNo">
                      <Input placeholder='Input Students ContactNo' name='ContactNo' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Department">
                      <Input className='w-100' placeholder='Input Students Department' name='Department' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8} >
                  <Form.Item label="Address">
                      <Input placeholder='Input Students Address' name='Address' onChange={handleChange} />
                    </Form.Item>
                  </Col>  
                  {/* <Col xs={24} lg={8}>
                  <Form.Item label="Status">
                       <Select placeholder="Select status" onChange={handleChange} name="Status">
                {["active", "inactive"].map((status, i) => {
                  return <Select.Option key={i} value={status}>{status}</Select.Option>
                })}
              </Select>
                    </Form.Item>
                  </Col>   */}
                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Student</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
