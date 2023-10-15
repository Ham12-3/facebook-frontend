import ProtectedRoutes from '@/redux/store/ProtectedRoutes'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'

function Layout({children}: {children:React.ReactNode}) {
  return (
   <ProtectedRoutes>
    <NavBar/>
    {children}
   </ProtectedRoutes>
  )
}

export default Layout