import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import Draft from "./views/Draft";
import Post from "./views/Post";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const userID = sessionStorage.getItem("id");

  if (!userID) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/draft" element={<Draft />} />
          <Route path="/post/:id" element={<Post />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
