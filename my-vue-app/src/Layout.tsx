import { useEffect, useState } from "react";
import { ActiveContext, ThemeContext } from "./Context/context";
import Header from "./components/Header/Header";
import AuthProvider from "./HOC/AuthProvider";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import "./App.css";
import { useDispatch } from "react-redux";
import { refreshToken } from "./store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { FilterMenuProvider } from "./HOC/FilterMenuProvider";
import FilterMenu from "./components/FilterMenu/FilterMenu";

const Layout = () => {
  const [isActive, setIsactive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("Theme", (!isDark).toString());
  };

  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme) {
      setIsDark(theme === "true");
    }

    const refreshTokenInterval = setInterval(async () => {
      try {
        await dispatch(refreshToken());
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshTokenInterval);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthProvider>
        <ActiveContext.Provider
          value={{ isActive: isActive, setIsActive: setIsactive }}
        >
          <div className={`app ${isDark ? "dark" : "light"}`}>
            <div className="container">
              <FilterMenuProvider>
                <Header />
                <FilterMenu />
              </FilterMenuProvider>
              <section className="main">
                <Navbar />
                <Outlet />
              </section>
            </div>
          </div>
        </ActiveContext.Provider>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;
