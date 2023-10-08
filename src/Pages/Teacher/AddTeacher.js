import React, { useState } from 'react'
import { Button, Col,Divider, Form, Input, Row, Typography, message } from 'antd'
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../config/firebase';

const { Title } = Typography

const initialState = { Name: "", Class: "", MobileNumber: "", Department: "" }

export default function Hero() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handledate = (_, MobileNumber) => setState(s => ({ ...s, MobileNumber }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { Name, Class, MobileNumber, Department } = state

    if (!Name) { return message.error("Please enter Name") }

    const Teacher = {
      Name, Class, MobileNumber, Department,
    //   MobileNumberCreated: new MobileNumber().getTime(),
      id: Math.random().toString(36).slice(2)
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Teachers", Teacher.id), Teacher);
      message.success("A new Teacher added successfully")
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
              <Title level={2} className='m-0 text-center'>Add Teacher</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Nme">
                      <Input placeholder="Input Teacher's Name" name='Name' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Class">
                      <Input placeholder="Input Teacher's Class" name='Class' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="MobileNumber">
                      <Input className='w-100' placeholder="Input Teacher's MobileNumber" name='MobileNumber' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Department">
                      <Input.TextArea placeholder="Input Teacher's Department" name='Department' onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Teacher</Button>
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
