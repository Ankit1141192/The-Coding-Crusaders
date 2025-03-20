import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import {Image} from "@chakra-ui/react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleEmailRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const finalName = name || email.split("@")[0];


      await updateProfile(user, { displayName: finalName });

      alert("Registered successfully!");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      
      if (!user.displayName) {
        await updateProfile(user, { displayName: user.email.split("@")[0] });
      }

      alert("Signed in with Google!");
    } catch (err) {
      setError("Google Sign-In failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2> <Image src={logo} alt="logo" boxSize="60px" w = "30%" /> Register</h2>
       

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
          />

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

        <button className="auth-button primary" onClick={handleEmailRegister}>
          Register with Email
        </button>

        <div className="separator">OR</div>

        <button className="auth-button google" onClick={handleGoogleSignIn}>
          <FcGoogle className="google-icon" /> Register with Google
        </button>

        <p className="auth-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
