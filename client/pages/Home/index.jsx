import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './ContactUs'
import Navbar from '../../src/components/shared/Navbar'
import Footer from '../../src/components/shared/Footer'

function Index() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/contact-us' element={<ContactUs />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Index