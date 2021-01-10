import { Route, Navigate } from "react-router-dom";
import { useSession } from "../context/UserContext";

const AdminRoute = ({ path, element }) => {
  const { user, isAdmin } = useSession();

  return !!user && isAdmin ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
