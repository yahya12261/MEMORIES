import axios from "axios";

export const API_URL = "http://localhost:8081/api/v1/auth";

const signup = (user) => {
  var Email = user.Email;
  var Pass = user.Pass;
  var First = user.First;
  var Middle = user.Middle;
  var Last = user.Last;
  var Dob = user.Dob;
  return axios
    .post(API_URL + "/SignUp", {
      Email,
      Pass,
      First,
      Middle,
      Last,
      Dob,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (user) => {
  var Email = user.Email;
  var Pass = user.Pass;
  return axios
    .post(API_URL + "/SignIn", {
      Email,
      Pass,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
