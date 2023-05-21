import { Navigate } from 'react-router-dom';

// interface ProtecteRoutesProps {
//   children: React.ReactNode;
//   isLoggedIn: boolean;
// }

const ProtectedRoutes = ({
  children,
  isLoggedIn
}: {
  children: JSX.Element;
  isLoggedIn: boolean;
}) => {

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
