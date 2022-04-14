import axios from "axios";

const userSignin = (user) => {
  return axios.get(
    `${process.env.REACT_APP_PATH}/signIn?email=${user.email}&&password=${user.password}`,
    { withCredentials: true }
  );
};

const userSignup = (user) => {
  console.log("in user sign up");
  return axios.post(
    `${process.env.REACT_APP_PATH}/register`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
};

export { userSignin, userSignup };
