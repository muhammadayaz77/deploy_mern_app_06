import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import UnauthorizedPage from "../../components/unauthorized/UnauthorizedPage"


function index() {
  return (
    <div className="">
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/*" element={<>page not found</>} /> */}
      

      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
    <Footer />
    </div>
  )
}

export default index