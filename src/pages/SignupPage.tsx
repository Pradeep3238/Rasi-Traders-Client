import { useEffect, useState } from "react";
import { City, ICity } from "country-state-city";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Typography,
  Image,
  Space,
  Select,
  Modal,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo4.png";
import useSignup from "../hooks/useSignup";



const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { loading, registerUser } = useSignup();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false); // new state for sending OTP
  const [verifyingOtp, setVerifyingOtp] = useState(false); 

  const [cities, setCities] = useState<ICity[]>([]);
  useEffect(() => {
    const data = City.getCitiesOfState("IN", "TN");
    setCities(data.map((city: any) => city.name));
  }, []);

  const handleEmail = (event:any)=>{
    setEmail(event?.target.value)
  }

  const handleOtpChange = (event:any) => {
    setOtp(event.target.value);
  };

  const handleVerifyOTP = async () => {
    setVerifyingOtp(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body:JSON.stringify({email,otp})
        }
      );
      if (response.ok) {
        setVerificationStatus(true);
        setOpen(false);
        message.success("OTP verified successfully!");
      } else {
        message.error('Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.log(err);
      message.error('OTP verification failed. Please try again.');
    }finally {
      setVerifyingOtp(false);
    }
  };

  const modalHandler = async()=>{
    if(!email){
      message.error('please enter an email')
    }else{

      setSendingOtp(true);
        try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/send-otp`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({ email }),
          })
          if(!response.ok){
            message.error('Something went wrong. Try again later.')
          }else{
            setOpen(true);
          }
        }catch(err){
          console.log(err);
          message.error('Failed to send OTP. Please try again.');
        } finally {
          setSendingOtp(false);
        }
    }
  }

  const handleStep1Submit = (values: any) => {
    setFormData({ ...formData, ...values });
    setStep(2);
  };

  const handleFinalSubmit = (values: any) => {
    const finalFormData = { ...formData, ...values };
    registerUser(finalFormData);
  };

  const handleCancel=()=>{
    setOpen(false)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: "20px",
          width: "380px",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Image preview={false} width={200} src={logo} />
          <Typography.Title level={2}>Signup</Typography.Title>
        </div>

        {step === 1 && (
          <Form name="signup" layout="vertical" onFinish={handleStep1Submit}>
            <Space style={{gap:15}}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} onChange={handleEmail} placeholder="Email" style={{width:300}} />
              </Form.Item>
              <Form.Item>
                <Button onClick={modalHandler} disabled={verificationStatus}>{sendingOtp ?<LoadingOutlined/>:'Verify'}</Button>
              </Form.Item>
            </Space>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "16px" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                disabled={!verificationStatus}
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        )}

        {step === 2 && (
          <Form name="signup" layout="vertical" onFinish={handleFinalSubmit}>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone" />
            </Form.Item>
            <Space.Compact>
              <Form.Item name={["shippingAddress", "street"]}>
                <Input placeholder="Door No and street" />
              </Form.Item>
              <Form.Item name={["shippingAddress", "city"]}>
                <Select
                  showSearch
                  placeholder="City"
                  options={cities.map((city: any) => ({
                    value: city,
                    label: city,
                  }))}
                />
              </Form.Item>
              <Form.Item name={["shippingAddress", "zip"]}>
                <Input placeholder="Pincode" />
              </Form.Item>
            </Space.Compact>

            <Form.Item style={{ marginBottom: "16px" }}>
              <Button
                block
                type={loading ? undefined : "primary"}
                htmlType="submit"
              >
                {loading ? <LoadingOutlined /> : "Signup"}
              </Button>
            </Form.Item>
          </Form>
        )}

        <Typography.Text style={{ textAlign: "center", display: "block" }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography.Text>
      </div>

      <Modal visible={open} onOk={handleVerifyOTP} okButtonProps={{ disabled: verifyingOtp }} okText={ verifyingOtp ? <LoadingOutlined  /> : "OK"} onCancel={handleCancel}>
        <Typography.Paragraph>
          Check your mail for OTP !
        </Typography.Paragraph>
        <Input placeholder="OTP here" onChange={handleOtpChange}></Input>
      </Modal>
    </div>
  );
};

export default SignupPage;
