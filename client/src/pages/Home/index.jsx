import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactUs from './ContactUs'
import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'
import PageNotFound from '../../components/page-not-found/PageNotFound'

function Index() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Navigate to='/web/login' />} />
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Index