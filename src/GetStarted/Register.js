import { useState } from "react";
import { X } from "lucide-react";
import "../GetStarted/Register.css";

const Register = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Delay closing to allow animation to complete
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration or login logic here
    console.log(isLogin ? "Logging in" : "Registering", { email, password });
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
            {isLogin ? "Login" : "Create an Account"}
          </h2>
          <button
            onClick={handleClose}
            className="text-befd73 hover:text-9eda4d"
          >
            <X size={30} />
          </button>
        </div>
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
            {isLogin ? "Login" : "Create Profile"}
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-befd73 hover:text-9eda4d"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
