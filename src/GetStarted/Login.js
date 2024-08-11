import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/authContext/index";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../auth";

const Login = ({ onClose, onRegisterClick, onSuccess }) => {
  const { setUser } = useAuth();
  const [isSigningIn, setSigningIn] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Delay closing to allow animation to complete
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isSigningIn) {
      setSigningIn(true);
      try {
        const userCredential = await doSignInWithEmailAndPassword(
          email,
          password
        );
        setUser(userCredential.user); // Set the user in context after successful login
        if (onSuccess) onSuccess();
        handleClose(); // Close the popup after successful login
        navigate("/home");
      } catch (err) {
        setError(
          "Failed to log in. Please check your credentials and try again."
        );
      }
      setSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (!isSigningIn) {
      setSigningIn(true);
      try {
        const userCredential = await doSignInWithGoogle();
        setUser(userCredential.user); // Set the user in context after successful login
        if (onSuccess) onSuccess();
        handleClose(); // Close the popup after successful login
        navigate("/home");
      } catch (err) {
        setError("Failed to sign in with Google. Please try again.");
      }
      setSigningIn(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center ${
          isExiting ? "popup-exit" : "popup-enter"
        }`}
      >
        <div className="bg-141414 border-2 border-befd73 rounded-xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-befd73 mt-5">Login</h2>
            <button
              onClick={handleClose}
              className="text-befd73 hover:text-9eda4d"
            >
              <X size={30} />
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-befd73 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-1e1e1e text-white border-2 border-befd73 rounded-md focus:outline-none focus:border-9eda4d"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-befd73 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-1e1e1e text-white border-2 border-befd73 rounded-md focus:outline-none focus:border-9eda4d"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-befd73 text-141414 py-2 rounded-md hover:bg-9eda4d transition-colors"
            >
              Login
            </button>
          </form>
          <button
            onClick={onGoogleSignIn}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-2"
          >
            Sign in with Google
          </button>
          <p className="mt-4 text-center text-white">
            Don't have an account?
            <button
              onClick={() => {
                handleClose();
                onRegisterClick();
              }}
              className="ml-1 text-befd73 hover:text-9eda4d"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
