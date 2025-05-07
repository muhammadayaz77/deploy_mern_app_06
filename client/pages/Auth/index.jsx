import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Navbar from "../../src/components/shared/Navbar"


function index() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default index