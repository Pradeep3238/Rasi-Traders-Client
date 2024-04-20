import React, { useEffect, useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import Product from "../components/DashBoard/Product";
import DashBoardCarousel from "../components/DashBoard/DashBoardCarousel";
import FooterComponent from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Paragraph, Title } = Typography;
const DashboardPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const {token} = useSelector((state:any) => state.auth);
  
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
    <>
      <div style={{ textAlign: "center" }}>
        <Title level={1} style={{ fontStyle: "oblique" }}>
          Rasi Traders
        </Title>
        <Paragraph
          style={{
            fontFamily: "monospace",
            fontStretch: "extra-expanded",
            fontSize: 24,
          }}
        >
          A perfect choice for a perfect home !{" "}
        </Paragraph>
      </div>
      <DashBoardCarousel />

        <Title style={{ textAlign: "center" }}>Our Products</Title>
        <Row gutter={[16, 48]} style={{ marginTop: 50 }}>
          {products.slice(0, 4).map((product, index) => (
            <Col key={index} span={6}>
              <Product data={product} />
            </Col>
          ))}
        </Row>
        <Button
          type="primary"
          size="large"
          style={{width:200, margin:'auto', marginTop:40}}
          onClick={() => navigate("/Products")}
        >
          View More
        </Button>

      <FooterComponent />
    </>
  );
};

export default DashboardPage;
