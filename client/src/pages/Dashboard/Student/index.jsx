import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import Dashboard from "./Dashboard"
import Profile from "./Profile"

// =====(CSS)====
import './dashboard.style.css'
import ChangePassword from "../ChangePassword"
import Result from "./Result"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/result" element={<Result />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
    </>
  )
}

export default Index
