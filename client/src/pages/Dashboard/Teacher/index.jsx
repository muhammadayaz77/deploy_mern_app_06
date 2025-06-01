import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import ChangePassword from "../ChangePassword"
import Grades from "./Grades"
import PageNotFound from "../../../components/page-not-found/PageNotFound"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/add-marks/" element={<Grades />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </>
  )
}

export default Index
