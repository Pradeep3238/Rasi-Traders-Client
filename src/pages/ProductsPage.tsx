import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Product from "../components/DashBoard/Product";
import {  useSelector } from "react-redux";




const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const {token} =useSelector((state:any)=> state.auth)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/products/",{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });

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

      <Row gutter={[16, 48]} style={{ marginTop: 50 }}>
        {products.map((product, index) => (
          <Col key={index} span={6} >
            <Product data={product} />
          </Col>
        ))}
      </Row>

  );
};

export default ProductsPage;
