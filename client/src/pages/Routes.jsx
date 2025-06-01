import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Auth from './Auth/index'
import Home from './Home/index'
import StudentDashboard from './Dashboard/Student/index'
import SuperAdminDashboard from './Dashboard/Super Admin/index'
import AdminDashboard from './Dashboard/Admins/index'
import TeacherDashboard from './Dashboard/Teacher'
import ProtectedRoute from '../Protected-Route/ProtectedRoute'
import UnauthorizedPage from '../components/unauthorized/UnauthorizedPage'
import PageNotFound from '../components/page-not-found/PageNotFound'
function Index() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/web/*" element={<Auth />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/*" element={<Home />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute    allowedRoles={['student']} />}>
          <Route path="/student/*" element={<StudentDashboard />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['sup_admin']} />}>
          <Route path="/sup-admin/*" element={<SuperAdminDashboard />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['admin1','admin2']} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
          <Route path="/teacher/*" element={<TeacherDashboard />} />
        </Route>
        
        {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Index