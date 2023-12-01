import "../styles/Login.css";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Google } from "react-bootstrap-icons";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="login-container">
      <p> Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>
        <Google />
        Sign In With Google
      </button>
    </div>
  );
};
