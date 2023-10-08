import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, MobileNumberPicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const { Title } = Typography

const initialState = { Name: "", Class: "", MobileNumber: "", status: "", MobileNumber: "" }

export default function UpMobileNumberTeacher() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  

  const getDocument = useCallback(async () => {

    const docRef = doc(firestore, "Teachers", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const Teacher = docSnap.data()
      setState(Teacher)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Teacher not found")
    }
  }, [params.id])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { Name, Class, Department, MobileNumber } = state

    if (!Name) { return message.error("Please enter Name") }

    const Teacher = {
      ...state,
      Name, Class, Department, MobileNumber,
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Teachers", Teacher.id), Teacher);
      message.success("Teacher upMobileNumberd successfully")
      navigate("/")
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
              <Title level={2} className='m-0 text-center'>Update Teacher's Details</Title>

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
