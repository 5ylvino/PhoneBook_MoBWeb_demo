import { useDispatch, useSelector } from "react-redux";
import { userSelector, userAction } from "../../redux/reducers/users";
import { InitialState } from "../../types";

type UserResponse = {
  getUsers: () => any;
} & InitialState;
export const useUser = (): UserResponse => {
  const dispatch = useDispatch();
  const state = useSelector(userSelector);

  const getUsers = () =>
    dispatch<any>(userAction({ path: "/users", method: "GET" }));

  return {
    ...state,
    getUsers,
  };
};
