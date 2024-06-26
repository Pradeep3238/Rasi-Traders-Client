import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Space, Spin } from "antd";
import Product from "../components/DashBoard/Product";
import {  useSelector } from "react-redux";
const {Option} = Select
const {Search} = Input

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div>
      <Row gutter={[16, 48]} style={{ marginTop: 50 }}>
        <Col span={24}>
          <div style={{ marginBottom: 48 }}>
            <Search placeholder="Search products" size="large" style={{ width: 300 }} />
            <div style={{ float: 'right' }}>
              <Space.Compact>
                <Select defaultValue="all" style={{ width: 120 }} size="large">
                  <Option value="all">All</Option>
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                </Select>
                <Button type="primary" style={{ marginRight: 50 }} size="large">
                  Filter
                </Button>
              </Space.Compact>
              <Space.Compact style={{ marginRight: 25 }}>
                <Select defaultValue="asc" size="large" style={{ width: 120 }}>
                  <Option value="asc">Ascending</Option>
                  <Option value="desc">Descending</Option>
                </Select>
                <Button type="primary" size="large">Sort</Button>
              </Space.Compact>
            </div>
          </div>
        </Col>
      </Row>
      <Spin spinning={loading} size="large">
        <Row gutter={[16, 48]}>
          {products.map((product, index) => (
            <Col key={index} span={6}>
              <Product data={product} />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default ProductsPage;
