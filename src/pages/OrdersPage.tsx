import React, { useEffect, useState } from "react";
import { Button, Modal, Spin, Table, Tag, message } from "antd";
import { useSelector } from "react-redux";
import UnAuthorized from "../components/UnAuthorized";

interface Order {
  key: string;
  transactionId: string;
  product: JSX.Element[];
  billAmount: number;
  status: string;
  quantity: number;
}
const OrdersPage: React.FC = () => {
  const { userData, isAuthenticated, token } = useSelector(
    (state: any) => state.auth
  );
  const [orderData, setOrderData] = useState<Order[]>();
  const [cancelOrderId, setCancelOrderId] = useState<null | string>(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/${userData._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        console.log(data);

        const formattedData = data.order.map((order: any) => ({
          key: order._id,
          transactionId: order.razorpay_payment_id,
          product: order.products.map((prod: any) => (
            <div key={prod.product._id}>
              • {prod.product.name} -{" "}
              <span style={{ fontWeight: "bold" }}>{prod.quantity}</span>
            </div>
          )),
          billAmount: order.billAmount,
          status: order.status,
          quantity: order.totalQuantity,
        }));
        setOrderData(formattedData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orderData);

  const handleCancelOrder = (transactionId: string) => {
    setCancelOrderId(transactionId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    setIsCancelModalVisible(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/cancel/${cancelOrderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      const responseData = await response.json();
      message.success(
        "Order cancelled successfully. You amount will be refunded in 5-7 business days"
      );
      const updatedOrderData =
        orderData &&
        orderData.map((order: any) =>
          order.key === cancelOrderId
            ? { ...order, status: "cancelled" }
            : order
        );
      setOrderData(updatedOrderData);
      console.log("Cancellation response:", responseData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
  };

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
            color = "grey";
            break;
          case "confirmed":
            color = "yellow";
            break;
          case "shipped":
            color = "orange";
            break;
          case "delivered":
            color = "green";
            break;
          case "cancelled":
            color = "red"; // Default color if status is not recognized
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
      render: (_: any, record: any) => (
        <Button
          type="dashed"
          style={{ color: "red" }}
          onClick={() => handleCancelOrder(record.transactionId)}
          disabled={record.status === "cancelled"}
        >
          Cancel Order
        </Button>
      ),
    },
  ];

  if (!isAuthenticated) {
    return <UnAuthorized subtitle="Login to view your orders" />;
  }

  return (
    <>
      <Spin spinning={loading} size="large">
        <Table columns={columns} dataSource={orderData} />
      </Spin>
      <Modal
        title="Order cancellation"
        visible={isCancelModalVisible}
        onOk={handleCancel}
        onCancel={handleCancelModalCancel}
      >
        <p>Are you sure you want to cancel this order?</p>
        <p color="red">only 50% of the order would be refunded</p>
        {isCancelling && <Spin />}
      </Modal>
    </>
  );
};

export default OrdersPage;
