import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddProductModal from "../components/DashBoard/AddProductModal";

import Product from "../components/DashBoard/Product";



const DashboardPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/products/");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <>
      <div>
        <Button type="primary" style={{ float: "right" }} onClick={showModal}>
          {" "}
          <PlusCircleOutlined /> Add Product{" "}
        </Button>
      </div>

      <Row gutter={[32, 32]} style={{ marginTop: 50 }}>
        {products.map((product, index) => (
          <Col key={index} span={8} style={{ marginBottom: 16 }}>
            <Product data={product} />
          </Col>
        ))}
      </Row>

      <AddProductModal open={open} onCancel={handleCancel} />
    </>
  );
};

export default DashboardPage;
