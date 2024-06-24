import { useState } from "react";
import { ActiveContext } from "./Context/context";
import AuthProvider from "./HOC/AuthProvider";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/pixemaLogo.svg";
import "./App.css";

const AuthLayout = () => {
  const [isActive, setIsactive] = useState(false);

  return (
    <div className="auth-layout">
      <ActiveContext.Provider
        value={{ isActive: isActive, setIsActive: setIsactive }}
      >
        <AuthProvider>
          <header className="auth-header">
            <div>
              <Logo />
            </div>
          </header>
          <Outlet />
          <footer className="auth-footer">© All Rights Reserved</footer>
        </AuthProvider>
      </ActiveContext.Provider>
    </div>
  );
};

export default AuthLayout;
