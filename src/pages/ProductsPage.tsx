import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Product from "../components/DashBoard/Product";
import CommonLayout from "./CommonLayout";



const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);


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
  }, [products]);


  return (
    <CommonLayout>
      <Row gutter={[16, 48]} style={{ marginTop: 50 }}>
        {products.map((product, index) => (
          <Col key={index} span={6} >
            <Product data={product} />
          </Col>
        ))}
      </Row>

  
    </CommonLayout>
  );
};

export default ProductsPage;
