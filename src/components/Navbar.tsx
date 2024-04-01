import React from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header} = Layout;


import { RootState } from "../store/cart-slice";

const Navbar: React.FC = () => {
  
  const navigate = useNavigate();
  const cartQuantity = useSelector((state:RootState) => state.cart.totalQuantity)
  
  const items2: MenuProps["items"] = [
    {
      key: "",
      label: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      key:"Products",
      label:'Products',
      icon:<ProductOutlined/>
    },
    {
      key: "Orders",
      label: "Your Orders",
      icon: <TruckOutlined  />,
    },
    {
      key: "Cart",
      label: "Cart",
      icon: (
        <Badge count={cartQuantity} overflowCount={99} size="small"> {/* Use Badge component with count */}
          <ShoppingCartOutlined />
        </Badge>
      ),
    },
  
    {
      key: "Logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          marginBottom:20,
        }}
      >
        <div className="demo-logo">
          <h2>Rasi Traders</h2>
        </div>
        <Menu
        style={{minWidth:550}}
          mode="horizontal"
          defaultSelectedKeys={[""]}
          defaultOpenKeys={["Dashboard"]}
          items={items2}
          onSelect={(key) => {
            const path = key.key;
            navigate(path);
          }}
        />
      </Header>
      </Layout>
  );
};

export default Navbar;
