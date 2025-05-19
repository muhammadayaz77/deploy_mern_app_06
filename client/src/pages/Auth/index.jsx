import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"


function index() {
  return (
    <div className="">
    <Navbar />
    <Routes>
      {/* <Route path="/protected" element={<><h1 className="mt-10 text-black">protected</h1></>}/> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/*" element={<>page not found</>} /> */}
      

      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
    <Footer />
    </div>
  )
}

export default index