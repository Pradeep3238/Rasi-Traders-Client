import {Link} from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
  Image,
  Spin
  
} from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import logo from '../assets/logo4.png';

import useSignup from "../hooks/useSignup";

const { useToken } = theme;

const SignupPage = () => {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();
  const {loading,registerUser} = useSignup();
  
  const handleRegister=(values:any)=>{
    registerUser(values);
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
          padding: screens.md
            ? `${token.paddingXL}px`
            : `${token.paddingXL}px ${token.padding}px`,
          width: "380px",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: token.marginXXS }}>
          <Image preview={false} width={200} src={logo} />

          <Typography.Title level={2}>Signup</Typography.Title>
        </div>
        <Form name="signup" layout="vertical" requiredMark="optional" autoComplete="on" onFinish={handleRegister}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button block type={loading ? undefined : "primary"} htmlType="submit">
              {loading ? <Spin/> : 'Signup'}
            </Button>
            <Typography.Text
              style={{ textAlign: "center", display: "block", margin: "8px 0" }}
            >
              or
            </Typography.Text>
            <Button block type="primary" icon={<GoogleOutlined />}>
              Sign up with Google
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            Already have an account?{" "}
            <Link to="/login">
               Login
            </Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;