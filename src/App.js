import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { NavbarHome } from "./Navbar/NavBarHome";
import Body from "./Body/Body";
import Register from "./GetStarted/Register";
import Home from "../src/GetStarted/Home";
import Login from "./GetStarted/Login";
import { AuthProvider, useAuth } from "./contexts/authContext/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleToggleRegister = () => {
    setShowRegister((prev) => !prev);
    setShowLogin(false);
  };

  const handleToggleLogin = () => {
    setShowLogin((prev) => !prev);
    setShowRegister(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {user ? (
        <NavbarHome
          onRegisterClick={handleToggleRegister}
          onLogout={handleLogout}
        />
      ) : (
        <Navbar
          onRegisterClick={handleToggleRegister}
          onLoginClick={handleToggleLogin}
        />
      )}
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Body />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          {/* Add other routes here */}
        </Routes>
      </div>
      {showRegister && (
        <RegisterWrapper
          onClose={() => setShowRegister(false)}
          onLoginClick={handleToggleLogin}
        />
      )}
      {showLogin && (
        <LoginWrapper
          onClose={() => setShowLogin(false)}
          onRegisterClick={handleToggleRegister}
        />
      )}
    </>
  );
}

// Wrapper component to handle navigation in Register
function RegisterWrapper({ onClose, onLoginClick }) {
  const navigate = useNavigate();
  return (
    <Register
      onClose={onClose}
      onLoginClick={onLoginClick}
      onSuccess={() => navigate("/home")}
    />
  );
}

// Wrapper component to handle navigation in Login
function LoginWrapper({ onClose, onRegisterClick }) {
  const navigate = useNavigate();
  return (
    <Login
      onClose={onClose}
      onRegisterClick={onRegisterClick}
      onSuccess={() => navigate("/home")}
    />
  );
}

export default App;
