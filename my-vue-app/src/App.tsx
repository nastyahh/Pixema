import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="sign-in" element={<SignIn/>}/> */}
      </Route>
    </Routes>
  );
}

export default App;
