import {  useState } from 'react';
import logo from '../assets/logo5.png'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const useRazorpay = (userData:any, token:string, billAmount:any, orderData:any) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const initiatePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
        method: 'POST',
        body: JSON.stringify({
          amount: billAmount * 100,
          currency: 'INR',
          receipt: "receiptId"
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
      const order = await response.json();
      console.log(order);

      const options = {
        key: "rzp_test_lEjUkxcCd826xz",
        amount: billAmount,
        currency: 'INR',
        name: "Rasi Traders",
        description: "Test Transaction",
        image: logo,
        order_id: order.id,
        handler: async function (response:any) {
          const body = {
            user: userData,
            products:orderData,
            ...response,
          };
          console.log(body)
          const validateRes = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/order/create`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${token}`
              },
            }
          );
          const res = await validateRes.json();
          console.log(res);
          message.success("Payment successful");

          navigate("/orders");

        },

        prefill: {
          name: userData.userName,
          email: userData.email,
          contact: userData.phoneNumber,
        },

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  

  return {
    loading,
    initiatePayment
  };
};

export default useRazorpay;
