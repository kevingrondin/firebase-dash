import { Route, Navigate } from "react-router-dom";
import { useSession } from "../context/UserContext";

const ProfileRedirect = ({ path, element }) => {
  const { user, isAdmin } = useSession();

  return !user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={isAdmin ? "/users" : `/profile/${user.uid}`} />
  );
};

export default ProfileRedirect;
