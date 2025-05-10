import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Student/Dashboard'

function Index() {
  return (
    <>
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default Index