import { Routes, Route } from "react-router-dom";
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
import Auth from "./HOC/Auth";
import Settings from "./pages/Settings/Settings";
import SearchByFilters from "./pages/SearchByFilters/SearchByFilters";
import Confirmation from "./pages/Confirmation/Confirmation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="activate/:uid/:token" element={<Activation />} />
        <Route path="/:imdbID" element={<Movie />} />
        <Route
          path="favorites"
          element={
            <Auth>
              <Favorites />
            </Auth>
          }
        />
        <Route path="trends" element={<Trends />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search-by-filters" element={<SearchByFilters />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>
      <Route element={<AuthLayout />}>
        {" "}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>{" "}
    </Routes>
  );
}

export default App;
