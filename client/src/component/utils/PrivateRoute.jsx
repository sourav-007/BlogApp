import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, roles }) => {

    const { getUser } = useAuth()

    if (roles && !roles.includes(getUser?.role)) {
        return <Navigate to='/unauthorized' />
    }

    if(roles && roles.includes(getUser?.role)){
        
    }
    

    return children
}

export default PrivateRoute
