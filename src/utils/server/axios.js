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
    next_detail: "/api/quiz/detail",
    detail: ADMIN_BASE_PATH + "/quiz/detail",
    next_list: "/api/quiz/list",
    list: ADMIN_BASE_PATH + "/quiz/list-all",
    next_unlockRoom: "/api/quiz/lock-unlock-room",
    unlockRoom: ADMIN_BASE_PATH + "/quiz/unlock-room"
  },
  moderator: {
    next_create: "/api/moderator/create",
    create: ADMIN_BASE_PATH + "/quiz/create-moderator",
    next_list: "/api/moderator/list",
    list: ADMIN_BASE_PATH + "/quiz/list-moderator"
  }
};
