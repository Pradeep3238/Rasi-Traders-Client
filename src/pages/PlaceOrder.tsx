import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Input,
  List,
  Select,
  Typography,
  message,
} from "antd";
import useRazorpay from "../hooks/useRazorPay";
import { useSelector } from "react-redux";
import { CartStateType } from "../store/cart-slice";
import { useEffect, useState } from "react";
import ContentWrapper from "../components/ContentWrapper";
import { City, ICity } from "country-state-city";
import UnAuthorized from "../components/UnAuthorized";

const { Title, Paragraph } = Typography;

const PlaceOrder: React.FC = () => {
  const cart = useSelector((state: CartStateType) => state.cart);
  const {isAuthenticated} = useSelector((state: any) => state.auth);
  const { userData,token } = useSelector((state: any) => state.auth);
  const { billAmount, items } = cart;
  const { loading, initiatePayment } = useRazorpay(userData,token, billAmount, cart);

  const [address, setAddress] = useState(userData?.shippingAddress);
  const [isEditing, setIsEditing] = useState(false);
 

  const [cities, setCities] = useState<ICity[]>([]);
  useEffect(() => {
    const data = City.getCitiesOfState("IN", "TN");
    setCities(data.map((city: any) => city.name));
  }, []);

  const handleChangeAddress = () => {
    setIsEditing(true); // Enable editing
  };

  

  const handleSaveAddress = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: {
            street: address.street,
            city: address.city,
            zip:address.zip
          },
        }),
      });

      if (response.ok) {
        message.success("Address updated successfully");

        setIsEditing(false);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to update address");
      }
    } catch (err: any) {
      console.error("Error updating address:", err);
      message.error("Failed to update address. Please try again later.");
    }
  };

  const handleAddressChange = (key: string, value: string) => {
    setAddress((prevAddress: any) => ({
      ...prevAddress,
      [key]: value,
    }));
  };

  const placeOrderHandler =async (e: any) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/verify-stock`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({items})
      })

      if (!response.ok) {
        const errorData = await response.json();
        message.info(errorData.message || 'Failed to verify stock');
      }else{
        initiatePayment();
      }
    }catch(err){
      console.log(err);
      message.info('failed to check the stock')
    }
    e.preventDefault();
  };

if(!isAuthenticated){
  return <UnAuthorized subtitle="Login or Signup to place an order"/>
}

  return (
    <ContentWrapper>
      <Flex>
        <Title level={3}>Delivery address</Title>

        <Button
          size="large"
          icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
          style={{ marginLeft: "auto", marginTop: 25, maxWidth: 300 }}
          onClick={isEditing ? handleSaveAddress : handleChangeAddress}
          disabled={loading}
        >
          {isEditing ? "Save Address" : "Change Address"}
        </Button>
      </Flex>
      <div style={{ width: "70%", marginTop: 20, marginLeft: 40 }}>
        {isEditing ? (
          <>
            <Input
              placeholder="Street"
              value={address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              style={{ marginTop: 10 }}
            />

            <Select
              showSearch
              placeholder="City"
              value={address.city}
              onChange={(val: string) => handleAddressChange("city", val)}
              style={{ marginTop: 10, width: 200 }}
            >
              {cities.map((city: any) => (
                <Select.Option key={city} value={city}>
                  {city}
                </Select.Option>
              ))}
            </Select>
            <Input
              placeholder="Zip"
              value={address.zip}
              onChange={(e) => handleAddressChange("zip", e.target.value)}
              style={{ marginTop: 10 }}
            />
          </>
        ) : (
          <>
            <Title level={5}>
              DoorNo & Street :{" "}
              <span style={{ fontWeight: "lighter" }}>{address.street}</span>
            </Title>
            <Title level={5}>
              City :{" "}
              <span style={{ fontWeight: "lighter" }}>{address.city}</span>
            </Title>
            <Title level={5}>
              Zip Code :{" "}
              <span style={{ fontWeight: "lighter" }}>{address.zip}</span>
            </Title>
          </>
        )}
      </div>
      <Divider />

      <Title level={3}>Review Items & Delivery</Title>

      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar size={100} shape="square" src={item.image} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={
                <>
                  <Paragraph>Price: {item.price} </Paragraph>
                  <Paragraph style={{ marginTop: -15 }}>
                    Quantity: {item.quantity}
                  </Paragraph>
                  <Paragraph style={{ marginTop: -15 }}>
                    Total Price: {item.quantity * item.price}
                  </Paragraph>
                </>
              }
            />
          </List.Item>
        )}
      />
      <Divider />
      <Button
        size="large"
        icon={<CheckOutlined />}
        style={{ marginLeft: "80%", marginTop: 25, maxWidth: 300 }}
        onClick={placeOrderHandler}
        disabled={loading}
      >
        {loading ? "Processing..." : `Checkout ₹ ${billAmount}`}
      </Button>
    </ContentWrapper>
  );
};

export default PlaceOrder;
