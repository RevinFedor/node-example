import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentToken } from './authSlice'

const Requireauth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()


  return (
    token 
    ? <Outlet/>
    : <Navigate to='/login' state={{form:location}} replace />
  )
}

export default Requireauth