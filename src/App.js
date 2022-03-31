import "./App.css";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Draft from "./components/Draft";
import Post from "./components/Post";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const [cookies] = useCookies(["jwtoken"]);

  if (!cookies.jwtoken) {
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
