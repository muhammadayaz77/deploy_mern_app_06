import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Navbar from "../../components/shared/Navbar"
import Footer from "../../components/shared/Footer"
import UnauthorizedPage from "../../components/unauthorized/UnauthorizedPage"
import PageNotFound from "../../components/page-not-found/PageNotFound"


function index() {
  return (
    <div className="">
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
    <Footer />
    </div>
  )
}

export default index