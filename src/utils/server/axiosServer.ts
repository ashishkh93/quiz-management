import axios from "axios";
import { cookies } from "next/headers";
import { STORAGE_KEY } from "src/auth/context/jwt";

export async function createAuthenticatedAxios() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(STORAGE_KEY);

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  if (authCookie) {
    try {
      const authObj = JSON.parse(authCookie.value);

      if (authObj?.token) {
        instance.defaults.headers.common.Authorization = `${authObj.token}`;
      }
    } catch (err) {
      console.error("Failed to parse auth cookie:", err);
    }
  }

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const errorData = {
        message: err?.response?.data?.error || "Server Error",
      };
      return Promise.reject(errorData);
    }
  );

  return instance;
}
