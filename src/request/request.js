import axios from "axios";
import { logOut } from "../utils/apiRequest";
import { getTokenStorage } from "../utils/auth.util";

const axiosInstance = axios.create({
  baseURL: "https://www.task-manager.api.mvn-training.com",
});

export const requestHandler = async (config) => {
  const accessToken = getTokenStorage();
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return config;
};

const responseErrorHandler = async (error) => {
  if (error?.response?.status === 401) {
    logOut();
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  responseErrorHandler
);

axiosInstance.interceptors.request.use(requestHandler, (err) =>
  Promise.reject(err)
);

export { axiosInstance as ApiClient };
