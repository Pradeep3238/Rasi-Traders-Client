import React, { ReactNode, useState } from "react";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import logo from "../assets/react.svg";
import {
  BookOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "Orders",
    label: "Orders",
    icon: <ProductOutlined />,
  },

  {
    key: "Customers",
    label: "Customers",
    icon: <UserOutlined />,
  },

  {
    key: "Feedbacks",
    label: "Feedbacks",
    icon: <BookOutlined />,
  },
];



const CommonLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
 const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout >
      <Header
        style={{
          top:0,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          position: "fixed", // Set header to have a fixed position
          width: "100%", // Ensure header spans the full width
          zIndex: 1000, // Ensure header is above other elements
        }}
      >

        <div style={{ display: "flex" }}>
          <img src={logo} alt="" />{" "}
          <span style={{ paddingLeft: 10 }}>Rasi Traders</span>
        </div>

        <div style={{ flex: "1 1 0%" }}>
          <Button style={{ float: "right" }} type="text">
            <LogoutOutlined />
            Logout
          </Button>
        </div>

      </Header>

      <Layout hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ overflow: "auto", height: "100vh", position:'fixed', zIndex: 999, top:64 }} // Set z-index to ensure Sider appears above the Content
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["Dashboard"]}
            defaultOpenKeys={["Dashboard"]}
            style={{ height: "100%" }}
            items={items2}
            onSelect={key =>{
              const path = key.key
              navigate(path)
            }}
          />
        </Sider>
         <Button
          type="text"
          icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ marginLeft: collapsed ? 80 : 200, top: 250, position: "fixed", zIndex: 1000 }}
        />
        <Layout style={{ marginLeft: collapsed ? 100 : 220}} >
          <Content
            style={{
              padding: 24,
              margin: "64px 16px 0", 
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow:'initial'
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
