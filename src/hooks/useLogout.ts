import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear()
    dispatch(authActions.logout());
    navigate("/login");
    message.success("You have been logged out!");
  };
  return { logout };
};

export default useLogout;
