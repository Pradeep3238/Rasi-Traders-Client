
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
  Image,
  Checkbox,
  Alert,
  Spin,
} from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import logo from '../assets/logo4.png';
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
const { useToken } = theme;

const LoginPage = () => {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();

  const { loginUser, loading, error } = useLogin();

  const handleLogin = (values:any) => {
    loginUser(values);
    
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
        <div style={{ textAlign: "center", marginBottom: token.marginXL }}>

        <Image preview={false} width={200} src={logo}  />
          <Typography.Title level={2}>Login</Typography.Title >
        </div>
        <Form
          name="login"
          layout="vertical"
          requiredMark="optional"
          autoComplete="on"
          onFinish={handleLogin}
        >
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

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href="#"
              style={{ float: "right" }}
            >
              Forgot password
            </a>
          </Form.Item>
          {error && (
            <Alert description={error} type="error" showIcon closable />
            
          )}

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              block
              type={loading ? undefined : "primary"}
              htmlType="submit"
            >
              {loading ? <Spin /> : "Sign In"}
              
            </Button>
            <Typography.Text
              style={{ textAlign: "center", display: "block", margin: "8px 0" }}
            >
              or
            </Typography.Text>
            <Button block type="primary" icon={<GoogleOutlined />}>
              Sign in with Google
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            Don't have an account? <Link to="/signup">Register</Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;