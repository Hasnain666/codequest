import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Navbar } from "./Navbar/Navbar";
import { NavbarHome } from "./Navbar/NavBarHome";
import Body from "./Body/Body";
import Register from "./GetStarted/Register";
import Home from "../src/GetStarted/Home";
import Login from "./GetStarted/Login";
import Code from "./GetStarted/Code";
import "./GetStarted/ScrollToTop";
import Forum from "./GetStarted/Forum";
import About from "./GetStarted/About";
import { AuthProvider, useAuth } from "./contexts/authContext/index";
import ScrollToTop from "./GetStarted/ScrollToTop";

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
  const location = useLocation();

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
      <ScrollToTop />
      {user ? (
        <NavbarHome onLogout={handleLogout} />
      ) : (
        <Navbar
          onRegisterClick={handleToggleRegister}
          onLoginClick={handleToggleLogin}
        />
      )}
      <div className="main-content">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="page-transition"
            timeout={300}
          >
            <Routes location={location}>
              <Route
                path="/"
                element={user ? <Navigate to="/home" /> : <Body />}
              />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="/" />}
              />
              <Route
                path="/code"
                element={user ? <Code /> : <Navigate to="/" />}
              />
              <Route
                path="/forum"
                element={user ? <Forum /> : <Navigate to="/" />}
              />
              <Route
                path="/about"
                element={user ? <About /> : <Navigate to="/" />}
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
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
//Wrapper component to handle registration
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
