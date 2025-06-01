import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import ChangePassword from "../ChangePassword"
import Assign from "./Admin1/Assign"
import ManageAdmin from "./Admin2/SubmitClass"
import PageNotFound from "../../../components/page-not-found/PageNotFound"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/assign-class/" element={<Assign />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        {/* Add admin2 routes */}
        <Route path="/get/classes" element={<ManageAdmin />} />
      <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </>
  )
}

export default Index
