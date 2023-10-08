import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, NoOfStudentPicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const { Title } = Typography

const initialState = { Name: "", HOD: "", NoOfStudent: "", status: "", NoOfStudent: "" }

export default function UpdateDepartment() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  

  const getDocument = useCallback(async () => {

    const docRef = doc(firestore, "Departments", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const Department = docSnap.data()
      setState(Department)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Department not found")
    }
  }, [params.id])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { Name, HOD, StartedYear, NoOfStudent } = state

    if (!Name) { return message.error("Please enter Name") }

    const Department = {
      ...state,
      Name, HOD, StartedYear, NoOfStudent,
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Departments", Department.id), Department);
      message.success("Department upNoOfStudentd successfully")
      navigate("/")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsProcessing(false)
  }
  return (
    <>
      <div HODName="container">
        <div HODName="row">
          <div HODName="col">
            <div HODName="card p-3 p-md-4">
              <Title level={2} HODName='m-0 text-center'>Update Department's Details</Title>

              <Divider />

              <Form layout="vertical">
              <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <Form.Item label="Nme">
                      <Input placeholder="Input Department's Name" name='Name' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="HOD">
                      <Input placeholder="Input Department's HOD" name='HOD' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Form.Item label="NoOfStudent">
                      <Input HODName='w-100' placeholder="Input Department's No Of Student" name='No of Student' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="StartedYear">
                      <Input.TextArea placeholder="Input Department's Started Year" name=' ' onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' HODName='w-100' loading={isProcessing} onClick={handleSubmit}>Add Department</Button>
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
