import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Navbar from "../../src/components/shared/Navbar"
import Footer from "../../src/components/shared/Footer"


function index() {
  return (
    <div className="">
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
    </div>
  )
}

export default index