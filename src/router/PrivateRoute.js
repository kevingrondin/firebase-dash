import { Route, Navigate, useParams } from "react-router-dom";
import { useSession } from "../context/UserContext";

const PrivateRoute = ({ path, element }) => {
  const { user, isAdmin } = useSession();
  const { id } = useParams();

  return user?.uid === id || isAdmin ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
