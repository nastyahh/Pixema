import { useEffect, useState } from "react";
import { ActiveContext, ThemeContext } from "./Context/context";
import AuthProvider from "./HOC/AuthProvider";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/pixemaLogo.svg";
import "./App.css";

const AuthLayout = () => {
  const [isActive, setIsactive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("Theme", (!isDark).toString());
  };

  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme) {
      setIsDark(theme === "true");
    }
  }, []);

  return (
    <div className="auth-layout">
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <ActiveContext.Provider
          value={{ isActive: isActive, setIsActive: setIsactive }}
        >
          <AuthProvider>
            <div className="auth-container">
              <header className="auth-header">
                <div className="auth-logo">
                  <Logo />
                </div>
              </header>
              <Outlet />
            </div>
            <footer className="auth-footer">© All Rights Reserved</footer>
          </AuthProvider>
        </ActiveContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
};

export default AuthLayout;
