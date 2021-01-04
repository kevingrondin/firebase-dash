import { useSession } from "../context/UserContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useSession();
  const { id } = useParams();

  if (!user) return null;

  return (
    <div>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default Profile;
