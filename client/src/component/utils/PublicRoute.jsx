import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {

  const { isLoggedIn, getUser } = useAuth()

  if (isLoggedIn) {
    if (getUser?.role === 'admin') {
      return <Navigate to='/dashboard' />;
    }
    else{
      return <Navigate to='/' />;
    }
  }

  return children
}

export default PublicRoute
