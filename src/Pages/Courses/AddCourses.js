import React, { useState } from 'react'
import { Button, Col,Divider, Form, Input, Row, Typography, message } from 'antd'
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../config/firebase';

const { Title } = Typography

const initialState = { Name: "", Code: "", Description: "",}

export default function Hero() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handledate = (_, Description) => setState(s => ({ ...s, Description }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { Name, Code, Description } = state

    if (!Name) { return message.error("Please enter Name") }

    const Course = {
      Name, Code, Description,
    //   DescriptionCreated: new Description().getTime(),
      id: Math.random().toString(36).slice(2)
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Courses", Course.id), Course);
      message.success("A new Course added successfully")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }
  return (
    <>
      <div ClassName="container">
        <div ClassName="row">
          <div ClassName="col">
            <div ClassName="card p-3 p-md-4">
              <Title level={2} ClassName='m-0 text-center'>Add Course</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Nme">
                      <Input placeholder="Input Course's Name" name='Name' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Code">
                      <Input placeholder="Input Course's Code" name='Code' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Description">
                      <Input ClassName='w-100' placeholder="Input Course's Started Year" name='Description' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="No Of Student">
                      <Input placeholder="Input Course's No Of Student" name='NoOfStudent' onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' ClassName='w-100' loading={isProcessing} onClick={handleSubmit}>Add Course</Button>
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
