// Auth.js
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <Login onClose={toggleAuthMode} />
      ) : (
        <Register onClose={toggleAuthMode} />
      )}
    </>
  );
};

export default Auth;
