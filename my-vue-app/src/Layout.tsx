import { useState } from "react";
import { ActiveContext } from "./Context/context";
import Header from "./components/Header/Header";
import AuthProvider from "./HOC/AuthProvider";

const Layout = () => {
  const [isActive, setIsactive] = useState(false);

  return (
    <>
      <ActiveContext.Provider
        value={{ isActive: isActive, setIsActive: setIsactive }}
      >
        <AuthProvider>
          <Header />
        </AuthProvider>
      </ActiveContext.Provider>
    </>
  );
};

export default Layout;
