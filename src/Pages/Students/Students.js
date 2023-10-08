import React, { useEffect, useState } from 'react'
import "./Students.scss"
import { Button, Divider, Modal, Select, Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { firestore } from '../../config/firebase'




export default function Students() {

  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  // const [status, SetStatus] = useState("Present")
  const [Student, setStudent] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setStudent(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleupdate = (_, Department) => setStudent(s => ({ ...s, Department }))

  const getStudents = async () => {
    const q = query(collection(firestore, "Students"));
    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data()
      array.push(data)
    });
    setAllDocuments(array)
    setDocuments(array)
  }

  useEffect(() => {
   getStudents()
  }, [])


  // const handleEdit = (Student) => {
  //   console.log('Student', Student)
  //   setStudent(Student)
  //   setIsModalOpen(true)
  // }
  const handleUpdate = () => {
    let { Name, ContactNo, Department, Address } = Student

    if (!Name) { return message.error("Please enter Name") }

    const updateStudent = {
      Name, ContactNo, Department, Address,
      DepartmentModified: new Department().getTime()
    }

    const updatedStudents = documents.map(oldStudent => {
      if (oldStudent.id === Student.id)
        return updateStudent
      return oldStudent
    })

    setDocuments(updatedStudents)
    localStorage.setItem("Students", JSON.stringify(updatedStudents))
    message.success("Student upDepartmentd successfully")
    setIsModalOpen(false)
  }

  const handleDelete = async (Student) => {

    try {
      await deleteDoc(doc(firestore, "Students", Student.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== Student.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Student deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting Student")
    }
  }

  return (
    <div className='content container-fluid '>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-header">
              <div className="page-title">
                Students
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman shadow">
            <div className="card-body">
              <div className="page-header">
                <div className="row align-items-center" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="col">
                    <h3 className="page-Name">Students</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <a href="#" className="btn btn-outline-primary me-2"><i class="fas fa-download"></i> Download</a>
                  </div>
                </div>
              </div>


            </div>
            <div className="rwo">
              <div className='py-5'>
                <div className="container">
                  <div className="row">
                    <div className="col text-center">
                      <span className='me-1' style={{fontSize:"18px", fontWeight:"600",}}>Students Data</span>
                    
                    </div>
                  </div>
                  <Divider />

                  <div className="row">
                    <div className="col">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Contact No.</th>
                              <th>Department</th>
                              <th>Address</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((Student, i) => {
                              return (
                                <tr key={i}>
                                  <th>{i + 1}</th>
                                  <td>{Student.id}</td>
                                  <td>{Student.Name}</td>
                                  <td>{Student.ContactNo}</td>
                                  <td>{Student.Address}</td>
                                  <td>{Student.status}</td>
                                  <td>
                                    <Space>
                                      <Tooltip Name="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(Student) }} /></Tooltip>
                                      <Tooltip Name="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/Students/EditStudents/${Student.id}`) }} /></Tooltip>
                                    </Space>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Modal>

    </Modal>
    </div>
  )
}
