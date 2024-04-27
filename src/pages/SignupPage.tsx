import { useEffect, useState } from "react";
import { City, ICity } from "country-state-city";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Typography,
  Image,
  Spin,
  Space,
  Select,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo4.png";
import useSignup from "../hooks/useSignup";

const SignupPage = () => {
  const [step, setStep] = useState(1); // Initial step
  const [formData, setFormData] = useState({}); // State to hold form data
  const { loading, registerUser } = useSignup(); // Custom hook for signup

  const [cities, setCities] = useState<ICity[]>([]);
  useEffect(() => {
    const data = City.getCitiesOfState("IN", "TN");
    setCities(data.map((city: any) => city.name));
  }, []);

  // Handle form submission for step 1 (basic user details)
  const handleStep1Submit = (values: any) => {
    setFormData({ ...formData, ...values }); // Update form data
    setStep(2); // Move to the next step
  };

  // Handle final form submission
  const handleFinalSubmit = (values: any) => {
    const finalFormData = { ...formData, ...values };
    registerUser(finalFormData); // Submit final form data
  };

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
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
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
              <Button block type="primary" htmlType="submit">
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
                      label:city
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
                {loading ? <Spin /> : "Signup"}
              </Button>
            </Form.Item>
          </Form>
        )}

        <Typography.Text style={{ textAlign: "center", display: "block" }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography.Text>
      </div>
    </div>
  );
};

export default SignupPage;
