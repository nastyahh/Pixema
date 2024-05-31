import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import SignIn from "./pages/SignIn/SignIn";
import AuthLayout from "./AuthLayout";
import SignUp from "./pages/SignUp/SignUp";
import Activation from "./pages/Activation/Activation";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="activate/:uid/:token" element={<Activation />} />
      </Route>
      <Route element={<AuthLayout />}>
        {" "}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
