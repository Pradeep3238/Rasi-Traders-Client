import { useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const useSignup = () => {

  const dispatch = useDispatch();
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
 
  const registerUser = async (values:any) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status === 201) {
        message.success("Successfully Registered");

        dispatch(authActions.login(data.token, data.user));
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        message.error("Registration failed");
      }
    } catch (err:any) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};
export default useSignup;