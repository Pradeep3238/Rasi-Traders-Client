import { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values: any) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        message.success("Successfully Logged In!");
        dispatch(
          authActions.login({ token: data.token, data: data.user })
        );
        navigate('/')
      } else if (res.status === 401) {
        setError(data.message);
        message.error(data.message);
      } else {
        message.error("Login failed");
      }
    } catch (err) {
      message.error("An error occurred during login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
