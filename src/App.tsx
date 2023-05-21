import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes'

function App() {
  const isLoggedIn = !!JSON.stringify(localStorage.getItem('isLoggedIn'))

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
