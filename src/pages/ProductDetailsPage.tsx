import { Alert, Button, Spin,Typography, Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const {Title,Paragraph}= Typography 

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchProductData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      console.log(data)
      setProduct(data.data);
      setLoading(false);
    } catch (err:any) {
      setError(err);
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchProductData();
}, [id]);

 if (loading) {
    return <Spin tip="Loading product details..." />;
}

if (error) {
    return <Alert message="Error fetching product details" type="error" showIcon />;
}

if (product) {
    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>{product.name}</Title>
            <Image src={product.images[0]} alt={product.name} style={{ width: '100%', marginBottom: '20px' }} />
            <Paragraph>{product.description}</Paragraph>
            <Paragraph>
                <strong>Price:</strong> ₹{product.price}
            </Paragraph>
            <Button type="primary" onClick={() => alert(`Buying ${product.name}`)}>
                Buy Now
            </Button>
        </div>
    );
};
};
export default ProductDetailsPage;
