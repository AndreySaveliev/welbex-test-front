import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import { UserContext } from './context/userContex';
import { User } from './types/types';
import { useEffect, useState } from 'react';

function App() {
  const isLoggedIn = !!JSON.stringify(localStorage.getItem('isLoggedIn'));
  // const user: User = JSON.parse(JSON.stringify(localStorage.getItem('user')))
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [user, setUser] = useState<User>({
    name: '',
    id: '',
    email: ''
  })
  // const user: User = JSON.parse(localStorage.getItem('user')!);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')!));
    }
  }, [user]);

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
