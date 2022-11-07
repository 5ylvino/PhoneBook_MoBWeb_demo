import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, authAction } from "../../redux/reducers/auth";
import { InitialState } from "../../types";

type Response = {
  login: (payload: any) => any;
  logout: (payload: any) => any;
  register: (payload: any) => any;
  update: (payload: any) => any;
} & InitialState;
export const useAuth = (): Response => {
  const dispatch = useDispatch();
  const state = useSelector(authSelector);

  const logout = (payload: any) =>
      dispatch<any>(
        authAction({
          path: "/logout",
          method: "POST",
          payload: { ...payload, source: "api" },
        })
      ),
    login = (payload: any) =>
      dispatch<any>(
        authAction({
          path: "/login",
          method: "POST",
          payload: { ...payload, source: "api" },
        })
      ),
    register = (payload: any) =>
      dispatch<any>(
        authAction({
          path: "/register",
          method: "POST",
          payload: { ...payload, source: "api" },
        })
      ),
    update = (payload: any) =>
      dispatch<any>(
        authAction({
          path: "/update",
          method: "POST",
          payload: { ...payload, source: "api" },
        })
      );

  return {
    ...state,
    login,
    logout,
    register,
    update,
  };
};
