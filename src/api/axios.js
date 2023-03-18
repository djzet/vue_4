import axios from "axios";
import { getItem } from "@/helpers/persistanceStorage";

axios.defaults.baseURL = "https://jurapro.bhuser.ru/api-shop";

axios.interceptors.request.use((config) => {
  const token = getItem("user_token");
  const authorizisationToken = token ? `Token ${token}` : "";
  config.headers.Authorization = authorizisationToken;
  return config;
});

export default axios;
