import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, DepartmentPicker, Divider, Form, Input, Row, Select, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const { Title } = Typography

const initialState = { Name: "", Surname: "", Department: "", status: "", Address: "" }

export default function UpDepartmentStudent() {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  

  const getDocument = useCallback(async () => {

    const docRef = doc(firestore, "Students", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const Student = docSnap.data()
      setState(Student)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Student not found")
    }
  }, [params.id])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { Name, Surname, Department, Address, status } = state

    if (!Name) { return message.error("Please enter Name") }

    const Student = {
      ...state,
      Name, Surname, Department, Address, status,
    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Students", Student.id), Student);
      message.success("Student upDepartmentd successfully")
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
              <Title level={2} className='m-0 text-center'>Update Student's Details</Title>

              <Divider />

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Name">
                      <Input placeholder='Input your Name' name='Name' value={state.Name} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Surname">
                      <Input placeholder='Input your Surname' name='Surname' value={state.Surname} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Department">
                    <Input className='w-100' placeholder='Input your Department' name='Department' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Status">
                      <Select value={state.status} onChange={status => setState(s => ({ ...s, status }))}>
                        {["Present", "Absent"].map((status, i) => {
                          return <Select.Option key={i} value={status}>{status}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Address">
                      <Input.TextArea placeholder='Input your Address' name='Address' value={state.Address} onChange={handleChange} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update Student</Button>
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
