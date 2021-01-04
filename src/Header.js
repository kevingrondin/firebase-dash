import { useNavigate } from "react-router-dom";
import { logout } from "./firebase";
import { useSession } from "./context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    navigate("/signup");
  };

  return (
    <header>
      <h2>The Grid</h2>
      {!!user && (
        <button className="ui secondary button logout" onClick={logoutUser}>
          LOGOUT
        </button>
      )}
    </header>
  );
};

export default Header;
