import { useState } from "react";
import { X } from "lucide-react";
import "../GetStarted/Register.css";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../auth";
// import { useAuth } from "../contexts/authContext/index"; // Removed as it's not used

const Register = ({ onClose, onLoginClick, onSuccess }) => {
  const [isSigningIn, setSigningIn] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Delay closing to allow animation to complete
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters."
      );
      return;
    }

    if (!isSigningIn) {
      setSigningIn(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        onSuccess();
        alert("Account created successfully");
      } catch (err) {
        setError(
          err.message || "Failed to create an account. Please try again."
        ); // More detailed error
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
        await doSignInWithGoogle();
        onSuccess();
      } catch (err) {
        setError(
          err.message || "Failed to sign in with Google. Please try again."
        ); // More detailed error
      }
      setSigningIn(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center ${
        isExiting ? "popup-exit" : "popup-enter"
      }`}
    >
      <div className="bg-141414 border-2 border-befd73 rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-befd73 mt-5">
            Create an Account
          </h2>
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
            disabled={isSigningIn} // Disable while signing in
          >
            {isSigningIn ? "Creating..." : "Create Profile"}{" "}
            {/* Show progress */}
          </button>
        </form>
        <button
          onClick={onGoogleSignIn}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-2"
          disabled={isSigningIn} // Disable while signing in
        >
          {isSigningIn ? "Signing in..." : "Sign in with Google"}{" "}
          {/* Show progress */}
        </button>
        <p className="mt-4 text-center text-white">
          Already have an account?
          <button
            onClick={() => {
              handleClose();
              onLoginClick();
            }}
            className="ml-1 text-befd73 hover:text-9eda4d"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
