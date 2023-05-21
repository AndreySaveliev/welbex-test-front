import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import { UserContext } from './context/userContex';
import { User } from './types/types';

function App() {
  const isLoggedIn = !!JSON.stringify(localStorage.getItem('isLoggedIn'));
  // const user: User = JSON.parse(JSON.stringify(localStorage.getItem('user')))
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user: User = JSON.parse(localStorage.getItem('user')!)
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <ProtectedRoutes isLoggedIn={isLoggedIn}>
              <HomePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
