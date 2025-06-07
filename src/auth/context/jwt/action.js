"use client";


import { setSession } from "./utils";
import { STORAGE_KEY } from "./constant";
import { apiClient } from "src/utils/client-api";
import axios, { endpoints } from "../../../utils/server/axios";

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error("Access token not found in response");
    }

    setSession(accessToken);
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ email, password, firstName, lastName }) => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error("Access token not found in response");
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error("Error during sign up:", error);
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await apiClient("/api/auth/logout", {
      method: "POST",
    });
    await setSession(null);
    window.location.href = "/auth/sign-in";
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};
