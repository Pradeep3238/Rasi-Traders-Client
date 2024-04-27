import React, { useEffect, useState } from "react";
import {  Button, Table, Tag } from "antd";
import { useSelector } from "react-redux";

const OrdersPage: React.FC = () => {

  const {userData} = useSelector((state:any)=> state.auth)
const [orderData, setOrderData] = useState();

  useEffect(()=>{
    const fetchOrders = async()=>{
      try{

        const response =await fetch(`http://localhost:3000/api/v1/order/${userData._id}`);
  
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        console.log(data)
        
        const formattedData = data.order.map((order: any) => ({
          key: order._id,
          transactionId: order. razorpay_payment_id,
          product: order.products.map((prod: any) => <div key={prod.product._id}>• {prod.product.name} - <span style={{fontWeight:'bold'}}>{prod.quantity}</span></div>),
          billAmount: order.billAmount,
          status: order.status,
          quantity: order.totalQuantity
        }));
        setOrderData(formattedData);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  fetchOrders();
}, [userData._id])

console.log(orderData)
const columns = [

  {
    title: "Transaction Id",
    dataIndex: "transactionId",
    key: "transactionId",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Products & Quantity",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "No.Of Items",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Bill Amount",
    dataIndex: "billAmount",
    key: "billAmount",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status: string) => {
      let color: string;
      switch (status) {
        case "pending":
          color = "red";
          break;
        case "processing":
          color = "yellow";
          break;
        case "shipped":
          color = "orange";
          break;
        case "delivered":
          color = "green";
          break;
        default:
          color = "blue"; // Default color if status is not recognized
          break;
      }
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: ()=><Button type='dashed' style={{borderColor:'red'}}>Cancel Order</Button>,
  },
];

return (
  <Table columns={columns} dataSource={orderData} />
);
};

export default OrdersPage;
