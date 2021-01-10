import { useEffect, useState } from "react";
import { useSession } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const Users = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useSession();
  const [users, setUsers] = useState([]);

  if (!isAdmin) navigate(`/profile/${user.uid}`);

  useEffect(() => {
    const usersRef = db.collection("users");
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <table className="ui selectable celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Secret Address</th>
            <th>Phone</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>
                <Link to={`/profile/${user.uid}`}>{user.name}</Link>
              </td>
              <td>{user.specialty}</td>
              <td>
                {user.address} {user.city}, {user.state} {user.zip}
              </td>
              <td>{user.phone}</td>
              <td>{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
