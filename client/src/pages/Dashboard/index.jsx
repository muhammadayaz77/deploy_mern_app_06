import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Student/Dashboard'
import { Analytics } from './Student/analytics'
import { Layout } from '../../components/shared/layout'
import { Team } from './Student/team'
import { DashboardPage } from './Student/DashboardPage'

function Index() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/team' element={<Team />} />
      <Route path='*' element={<DashboardPage />} />


    </Routes>
    </>
  )
}

export default Index