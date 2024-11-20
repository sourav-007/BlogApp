import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'


export const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-slate-50'>
      <Header />
      <main className='flex-grow mt-0 mb-0 bg-slate-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
