import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import ChangePassword from "../ChangePassword"
import Assign from "./Admin1/Assign"
import ManageAdmin from "./Admin2/SubmitClass"
import PageNotFound from "../../../components/page-not-found/PageNotFound"
import SendNotification from "./Admin1/SendNotification"
import ManageNotification from "./Admin1/ManageNotification"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/assign-class" element={<Assign />} />
        <Route path="/send-notification" element={<SendNotification />} />
        <Route path="/manage-notification" element={<ManageNotification />} />
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
