import { useSession } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useSession();

  if (!isAdmin) navigate(`/profile/${user.uid}`);

  return (
    <div>
      <h1>USERS</h1>
    </div>
  );
};

export default Users;
