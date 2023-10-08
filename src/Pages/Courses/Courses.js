import React, { useEffect, useState } from 'react'
// import "./Courses.scss"
import { Button, Divider, Modal,  Space, Tooltip, message } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { firestore } from '../../config/firebase'




export default function Deapartments() {

  const [allDocuments, setAllDocuments] = useState([])
  const [documents, setDocuments] = useState([])
  const [Course, setCourse] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setCourse(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleupdate = (_, Description) => setCourse(s => ({ ...s, Description }))

  const getCourses = async () => {
    const q = query(collection(firestore, "Courses"));
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
   getCourses()
  }, [])

  // useEffect(() => {
  //   const filteredDocuments = allDocuments.filter(Course => Course.status === status)
  //   setDocuments(filteredDocuments)
  // }, [allDocuments, status])

  // const handleEdit = (Course) => {
  //   console.log('Course', Course)
  //   setCourse(Course)
  //   setIsModalOpen(true)
  // }
  const handleUpdate = () => {
    let { Name, Code, Description, NoOfStudents } = Course

    if (!Name) { return message.error("Please enter Name") }

    const updateCourse = {
      Name, Code, Description, NoOfStudents,
      DescriptionModified: new Description().getTime()
    }

    const updatedCourses = documents.map(oldCourse => {
      if (oldCourse.id === Course.id)
        return updateCourse
      return oldCourse
    })

    setDocuments(updatedCourses)
    localStorage.setItem("Courses", JSON.stringify(updatedCourses))
    message.success("Course upDated successfully")
    setIsModalOpen(false)
  }

  const handleDelete = async (Course) => {

    try {
      await deleteDoc(doc(firestore, "Courses", Course.id));

      let documentsAfterDelete = documents.filter(doc => doc.id !== Course.id)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)

      message.success("Course deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting Course")
    }
  }

  return (
    <div className='content container-fluid '>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="sub-header">
              <div className="page-title">
                Courses
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
                    <h3 className="page-Name">Courses</h3>
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
                              <th>ID</th>
                              <th>Course Name</th>
                              <th>Course Code</th>
                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((Course, i) => {
                              return (
                                <tr key={i}>
                                  <th>{i + 1}</th>
                                  <td>{Course.id}</td>
                                  <td>{Course.Name}</td>
                                  <td>{Course.Code}</td>
                                  <td>{Course.Description}</td>
                                  <td>
                                    <Space>
                                      <Tooltip Name="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(Course) }} /></Tooltip>
                                      <Tooltip Name="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/Courses/EditCourses/${Course.id}`) }} /></Tooltip>
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
