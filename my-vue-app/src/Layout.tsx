import { useState } from "react";
import { ActiveContext } from "./Context/context";
import Header from "./components/Header/Header";
import AuthProvider from "./HOC/AuthProvider";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import "./App.css";

const Layout = () => {
  const [isActive, setIsactive] = useState(false);

  return (
    <AuthProvider>
      <ActiveContext.Provider
        value={{ isActive: isActive, setIsActive: setIsactive }}
      >
        <div className="container">
          <Header />
          <section className="main">
            <Navbar />
            <Outlet />
          </section>
        </div>
      </ActiveContext.Provider>
    </AuthProvider>
  );
};

export default Layout;
