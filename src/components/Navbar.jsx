import { Link } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../styles/Navbar.css";
import { HouseFill, PlusSquareFill, PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const userName = user?.displayName.slice(0, user?.displayName.indexOf(" "));

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <Link to="/">
          <HouseFill size={"1.3rem"} />
          <p>Home</p>
        </Link>

        {!user ? (
          <Link to="/login">
            <PersonCircle size={"1.3rem"} />
            <p>Login</p>
          </Link>
        ) : (
          <Link to="/createpost">
            <PlusSquareFill size={"1.2rem"} />
            <p>Create Post</p>
          </Link>
        )}

        {user && (
          <div className="user">
            <>
              <img
                src={user?.photoURL}
                width={17}
                height={17}
                style={{ borderRadius: "20px" }}
              />
              <p> {userName}</p>
            </>
          </div>
        )}
        {user && (
          <div className="logout">
            <button onClick={signUserOut}>Log Out</button>
          </div>
        )}
      </div>
    </div>
  );
};
