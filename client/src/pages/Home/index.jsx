import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContactUs from './ContactUs'
import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'

function Index() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/contact-us' element={<ContactUs />} />
      <Route path='/*' element={<div className='mt-20'>Page Not Found</div>} />
    </Routes>
    <Footer />
    </>
  )
}

export default Index