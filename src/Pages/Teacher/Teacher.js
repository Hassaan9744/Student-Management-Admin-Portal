import React, { useEffect, useState } from 'react'
// import "./Teachers.scss"
import { Button, Divider, Modal, Select, Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { firestore } from '../../config/firebase'




export default function Teachers() {

  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [Teacher, setTeacher] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setTeacher(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleupdate = (_, MobileNumber) => setTeacher(s => ({ ...s, MobileNumber }))

  const getTeachers = async () => {
    const q = query(collection(firestore, "Teachers"));
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
   getTeachers()
  }, [])

  // useEffect(() => {
  //   const filteredDocuments = allDocuments.filter(Teacher => Teacher.status === status)
  //   setDocuments(filteredDocuments)
  // }, [allDocuments, status])

  // const handleEdit = (Teacher) => {
  //   console.log('Teacher', Teacher)
  //   setTeacher(Teacher)
  //   setIsModalOpen(true)
  // }
  const handleUpdate = () => {
    let { Name, Class, MobileNumber, Department } = Teacher

    if (!Name) { return message.error("Please enter Name") }

    const updateTeacher = {
      Name, Class, MobileNumber, Department,
      MobileNumberModified: new MobileNumber().getTime()
    }

    const updatedTeachers = documents.map(oldTeacher => {
      if (oldTeacher.id === Teacher.id)
        return updateTeacher
      return oldTeacher
    })

    setDocuments(updatedTeachers)
    localStorage.setItem("Teachers", JSON.stringify(updatedTeachers))
    message.success("Teacher upMobileNumberd successfully")
    setIsModalOpen(false)
  }

  const handleDelete = async (Teacher) => {

    try {
      await deleteDoc(doc(firestore, "Teachers", Teacher.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== Teacher.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Teacher deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting Teacher")
    }
  }

  return (
    <div className='content container-fluid '>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-header">
              <div className="page-title">
                Teachers
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
                    <h3 className="page-Name">Teachers</h3>
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
                  
                  <Divider />

                  <div className="row">
                    <div className="col">
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Class</th>
                              <th>MobileNumber</th>
                              <th>Department</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((Teacher, i) => {
                              return (
                                <tr key={i}>
                                  <th>{i + 1}</th>
                                  <td>{Teacher.Name}</td>
                                  <td>{Teacher.Class}</td>
                                  <td>{Teacher.MobileNumber}</td>
                                  <td>{Teacher.Department}</td>
                                  <td>
                                    <Space>
                                      <Tooltip Name="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(Teacher) }} /></Tooltip>
                                      <Tooltip Name="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/Teachers/EditTeachers/${Teacher.id}`) }} /></Tooltip>
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
