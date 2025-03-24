import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from 'react-router-dom'; // tom obtain children on that route


export default function PrivateRoute() {
    const {currentUser} = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/signin'/>;// to get the children on that route
}
