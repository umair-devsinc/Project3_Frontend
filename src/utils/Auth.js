import Cookies from "js-cookie";
const isLogin = () => {
  return Cookies.get("jwtoken") ? true : false;
};

const logout = (navigate) => {
  Cookies.remove("jwtoken");
  sessionStorage.setItem("id", null);
  navigate("/");

  return false;
};

export { isLogin, logout };
