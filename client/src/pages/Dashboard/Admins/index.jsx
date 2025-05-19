import { Route, Routes } from "react-router-dom"
import Layout from "../../../components/dashboard/layout"
import ChangePassword from "../ChangePassword"


function Index() {
  return (
    <>
    {/* <SubNavDashboard /> */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/assign-class/" element={<>assign</>} />
        <Route path="/credentials/change" element={<ChangePassword />} />
        {/* Add more routes as needed */}
      </Route>
    </Routes>
    </>
  )
}

export default Index
