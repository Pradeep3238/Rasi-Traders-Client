import {
  Alert,
  Button,
  Card,
  Spin,
  Typography,
  Image,
  Flex,
  Carousel,
  Row,
  Col,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/products/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      console.log(data);
      setProduct(data.data);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return (
      <Alert message="Error fetching product details" type="error" showIcon />
    );
  }

  if (product) {
    return (
      <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px",
        }}
      >
        <Card style={{ width: 1000 }}>
          <Row gutter={[20, 20]}>
            <Col span={10}>
              <div style={{ flex: 1 }}>
                <Carousel autoplay>
                  {product.images.map((item: any) => (
                    <Image
                      src={item}
                      alt={product.name}
                      style={{ width: "100%" }}
                    />
                  ))}
                </Carousel>
              </div>
            </Col>
            <Col span={14}>
              {product.quantity > 0 && (
                <Tag
                  color={product.quantity < 20 ? "orange" : "green"}
                  style={{
                    fontSize: 18,
                    position: "absolute",
                    right: 20,
                    top: 20,
                    padding: 10,
                  }}
                >
                  {product.quantity < 20 ? "Only few left" : "In Stock"}
                </Tag>
              )}

              <div style={{ paddingLeft: "15px" }}>
                <Title level={2} style={{ marginBottom: 0 }}>
                  {product.name}
                </Title>

                <Flex vertical>
                  <Paragraph style={{marginTop:20, fontSize: 16 }}>
                    <span
                      style={{ fontWeight: "light", fontFamily: "sans-serif" }}
                    >
                      Category:{" "}
                    </span>
                    {product.category}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 16 }}>
                    <span style={{ fontWeight: 10, fontFamily: "sans-serif" }}>
                      Description:{" "}
                    </span>
                    {product.description}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 16 }}>
                    <span
                      style={{ fontWeight: "light", fontFamily: "sans-serif" }}
                    >
                      Brand:{" "}
                    </span>
                    {product.brand}
                  </Paragraph>
                  <Paragraph style={{  fontSize: 16 }}>
                    <span
                      style={{ fontWeight: "light", fontFamily: "sans-serif" }}
                    >
                      Material:{" "}
                    </span>
                    {product.material}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 16 }}>
                    <span
                      style={{ fontWeight: "light", fontFamily: "sans-serif" }}
                    >
                      Color:{" "}
                    </span>
                    {product.color}
                  </Paragraph>
                  <Paragraph style={{ fontSize: 16 }}>
                    <span
                      style={{ fontWeight: "light", fontFamily: "sans-serif" }}
                    >
                      Dimensions:{" "}
                    </span>
                    {product.dimensions}
                  </Paragraph>
                </Flex>
                <Flex justify="space-between">
                  <Title
                    level={2}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: "150px",
                    }}
                  >
                    ₹{product.price}/
                    <span style={{ fontSize: 20 }}>{product.unit}</span>
                  </Title>
                  <Button
                    type="primary"
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      right: "20px",
                    }}
                    onClick={() => alert(`Buying ${product.name}`)}
                  >
                    Add to Cart
                  </Button>
                </Flex>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      
      </>
    );
  }
};

export default ProductDetailsPage;
