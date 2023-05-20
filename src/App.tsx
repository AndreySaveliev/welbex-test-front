import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './ProtectedRoutes'
import { api } from './utils/api';

function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setIsLoggedIn(true)
  //     navigate('/')
  //   }
  // }, [navigate])

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     const token = JSON.parse(localStorage.getItem('token'))
  //     api.checkMe(token).then((res) => console.log(res))
  //   }
  // },[])

  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route
        path="/"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <HomePage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
