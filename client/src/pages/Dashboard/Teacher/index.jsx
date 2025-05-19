import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import ChangePassword from "../ChangePassword"
import Grades from "./Grades"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/add-marks/" element={<Grades />} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
    </>
  )
}

export default Index
