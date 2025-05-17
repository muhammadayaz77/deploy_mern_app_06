import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
// import Dashboard from "./Dashboard"
// import Profile from "./Profile"

// =====(CSS)====
// import './dashboard.style.css'
import ChangePassword from "../ChangePassword"
import CreateAdmin from "./CreateAdmin"
import ManageAdmin from "./ManageAdmin"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/create-admin/" element={<CreateAdmin />} />
        <Route path="/manage-admin/" element={<ManageAdmin />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
    </>
  )
}

export default Index
