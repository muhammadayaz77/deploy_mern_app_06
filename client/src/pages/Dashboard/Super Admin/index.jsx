import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
// import Dashboard from "./Dashboard"
// import Profile from "./Profile"

// =====(CSS)====
// import './dashboard.style.css'
import ChangePassword from "../ChangePassword"
import CreateAdmin from "./CreateAdmin"
import ManageAdmin from "./ManageAdmin"
import PageNotFound from "../../../components/page-not-found/PageNotFound"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/create-admin/" element={<CreateAdmin />} />
        <Route path="/manage-admin/" element={<ManageAdmin />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </>
  )
}

export default Index
