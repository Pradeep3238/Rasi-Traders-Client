import {
  HomeOutlined,
  LogoutOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Button, Layout, Menu, Image } from "antd";
import { useNavigate,Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header } = Layout;

import { CartStateType } from "../store/cart-slice";
import useLogout from "../hooks/useLogout";
import logo from '../assets/logo2.png'
import FooterComponent from "../components/Footer";



const CommonLayout: React.FC = () => {

  const {logout} = useLogout();
  const navigate = useNavigate();
  const location = useLocation();


  const {totalQuantity} = useSelector(
    (state: CartStateType) => state.cart
  );

  const logoutHandler=() =>{
    logout();
  }

  const items2: MenuProps["items"] = [
    {
      key: "",
      label: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      key: "products",
      label: "Products",
      icon: <ProductOutlined />,
    },
    {
      key: "orders",
      label: "Your Orders",
      icon: <TruckOutlined />,
    },
    {
      key: "cart",
      label: "Cart",
      icon: (
        <Badge count={totalQuantity} overflowCount={99} size="small">
          {" "}
          {/* Use Badge component with count */}
          <ShoppingCartOutlined />
        </Badge>
      ),
    },
  ];

  const selectedkey = location.pathname.slice(1)

  return (
    <Layout>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:'space-between',
            backgroundColor: "white",
            marginBottom: 20,
          }}
        >
          <div>
            <Image preview={false} src={logo} height={45} />
          </div>
          <Menu
            style={{flexGrow:1, minWidth: 450 }}
            mode="horizontal"
            selectedKeys={[selectedkey]}
            items={items2}
            onSelect={(key) => {
              const path = key.key;
              navigate(path);
            }}
          />
          <div  >
            <Button onClick={logoutHandler} icon={<LogoutOutlined/>} type="text">Logout</Button>
          </div>
        </Header>
      </Layout>
      <Layout style={{ padding: "0 24px 24px" }}>

          <Outlet/>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default CommonLayout;
