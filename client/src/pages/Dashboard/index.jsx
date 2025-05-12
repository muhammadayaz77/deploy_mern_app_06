import { Route, Routes } from "react-router-dom"
import Layout from "../../components/dashboard/layout"
import Dashboard from "./Student/Dashboard"
import Profile from "./Student/Profile"

// =====(CSS)====
import './dashboard.style.css'


function Index() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
  )
}

export default Index
