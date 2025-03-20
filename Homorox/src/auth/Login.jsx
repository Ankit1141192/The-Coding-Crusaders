import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import logo from "../assets/logo.png";
import {Image} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc"; // Import Google icon from react-icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2> <Image src={logo} alt="logo" boxSize="60px" w = "30%" /> Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button className="auth-button primary" onClick={handleLogin}>
          Login
        </button>

        <div className="separator">OR</div>

        {/* ✅ Google Login Button with Logo */}
        <button className="auth-button google" onClick={loginWithGoogle}>
          <FcGoogle className="google-icon" /> Login with Google
        </button>

        <p className="auth-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
