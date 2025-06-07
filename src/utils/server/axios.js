import axios from "axios";

export const ADMIN_BASE_PATH = "/admin";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorData = err?.response?.data || { message: "Server Error" };
    return Promise.reject(errorData);
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    login: ADMIN_BASE_PATH + "/login",

    // next_order_list: (id) => `/api/customers/${id}/orders/`,
    // order_list: (id) => `/orders/customer/${id}`,
  },
  quiz: {
    next_create: "/api/quiz/create",
    create: ADMIN_BASE_PATH + "/quiz/create",
  },
};
