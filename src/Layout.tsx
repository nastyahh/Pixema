import { useEffect, useState } from "react";
import {
  ActiveContext,
  BurgerMenuContext,
  ThemeContext,
} from "./Context/context";
import Header from "./components/Header/Header";
import AuthProvider from "./HOC/AuthProvider";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  getUserProfile,
  refreshToken,
  toggleIsLogged,
} from "./store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { FilterMenuProvider } from "./HOC/FilterMenuProvider";
import FilterMenu from "./components/FilterMenu/FilterMenu";

const Layout = () => {
  const [isActive, setIsactive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    const initAuth = async () => {
      const storedLogin = localStorage.getItem("Login");

      if (storedLogin) {
        try {
          dispatch(toggleIsLogged(true));
          await dispatch(getUserProfile()).unwrap();
        } catch (error) {
          console.error("Error getting user profile:", error);
          try {
            await dispatch(refreshToken()).unwrap();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            localStorage.removeItem("Login");
            dispatch(toggleIsLogged(false));
          }
        }
      } else {
        dispatch(toggleIsLogged(false));
      }
    };

    initAuth();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthProvider>
        <ActiveContext.Provider
          value={{ isActive: isActive, setIsActive: setIsactive }}
        >
          <BurgerMenuContext.Provider
            value={{
              isMenuOpen,
              toggleMenu() {
                setIsMenuOpen((prev) => !prev);
              },
              closeMenu() {
                setIsMenuOpen(false);
              },
            }}
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
          </BurgerMenuContext.Provider>
        </ActiveContext.Provider>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default Layout;
