import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import SignIn from "./pages/SignIn/SignIn";
import AuthLayout from "./AuthLayout";
import SignUp from "./pages/SignUp/SignUp";
import Activation from "./pages/Activation/Activation";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import Favorites from "./pages/Favorites/Favorites";
import Trends from "./pages/Trends/Trends";
import Settings from "./pages/Settings/Settings";
import SearchByFilters from "./pages/SearchByFilters/SearchByFilters";
import Confirmation from "./pages/Confirmation/Confirmation";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordConfirm from "./pages/PasswordConfirm/PasswordConfirm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home isDark={false} />} />
        <Route path="activate/:uid/:token" element={<Activation />} />
        <Route path=":imdbID" element={<Movie />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="trends" element={<Trends />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search-by-filters" element={<SearchByFilters />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/Pixema" element={<Navigate to="/" replace />} />
      </Route>
      <Route element={<AuthLayout />}>
        {" "}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password-confirm" element={<PasswordConfirm />} />
      </Route>{" "}
    </Routes>
  );
}

export default App;
