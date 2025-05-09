import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Auth from './Auth/index'
import Home from './Home/index'
function Index() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/web/*' element={<Auth />} />
      <Route path='/*' element={<Home />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Index