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
import { FilterMenuProvider } from "./HOC/FilterMenuProvider";
import FilterMenu from "./components/FilterMenu/FilterMenu";
import { useAuthInitialization } from "./hook/useAuthInitialization";

const Layout = () => {
  const [isActive, setIsactive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("Theme", (!isDark).toString());
  };

  useAuthInitialization();

  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme) {
      setIsDark(theme === "true");
    }
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
