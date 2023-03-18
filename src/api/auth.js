import axios from "@/api/axios";

const register = (user) => {
  return axios.post("/signup", user);
};

const login = (user) => {
  return axios.post("/login", user);
};

const getCurrentUser = () => {
  return axios.get("/user");
};

export default {
  register,
  login,
  getCurrentUser,
};
