import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Auth from './Auth/index'
import Home from './Home/index'
import StudentDashboard from './Dashboard/Student/index'
import SuperAdminDashboard from './Dashboard/Super Admin/index'
import AdminDashboard from './Dashboard/Admins/index'
import TeacherDashboard from './Dashboard/Teacher'
function Index() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/web/*' element={<Auth />} />
      <Route path='/*' element={<Home />} />
      <Route path='/student/*' element={<StudentDashboard />} />
      <Route path='/sup-admin/*' element={<SuperAdminDashboard />} />
      <Route path='/admin/*' element={<AdminDashboard />} />
      <Route path='/teacher/*' element={<TeacherDashboard />} />
      <Route path='/*' element={<>no page Found</>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Index