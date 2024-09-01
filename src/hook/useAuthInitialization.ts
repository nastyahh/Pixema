import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getUserProfile,
  refreshToken,
  toggleIsLogged,
} from "../store/userSlice";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

export const useAuthInitialization = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, Action>>();

  useEffect(() => {
    const initAuth = async () => {
      const storedLogin = localStorage.getItem("Login");

      if (storedLogin) {
        try {
          dispatch(toggleIsLogged(true));
          await dispatch(getUserProfile()).unwrap();
        } catch (error) {
          console.error("Error getting user profile:", error);
          try {
            await dispatch(refreshToken()).unwrap();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            localStorage.removeItem("Login");
            dispatch(toggleIsLogged(false));
          }
        }
      } else {
        dispatch(toggleIsLogged(false));
      }
    };
    initAuth();
  }, []);
};
