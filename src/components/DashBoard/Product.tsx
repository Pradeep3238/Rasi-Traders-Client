// Product component file

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Typography, Carousel, message, Button, Popconfirm } from "antd";
import styles from "./product.module.scss";
import { useState } from "react";
import EditProductModal from "./EditProductModal ";
const { Title } = Typography;

const handleDelete = async (productId: any) => {
  try {
    console.log(productId);
    const response = await fetch(
      `http://localhost:3000/api/v1/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      message.success("Successfully Deleted Item");
    }
  } catch (err) {
    message.error("Error Deleting item");
  }
};

const Product: React.FC<{ data: any }> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Card
      type="inner"
      bordered
      hoverable
      className={styles.cardContainer}
      cover={
        <div className={styles.imageContainer}>
          <Carousel effect="fade" dots>
            {data.images.map((image: string, index: number) => (
              <img className={styles.image} src={image} key={index} />
            ))}
          </Carousel>
        </div>
      }
      actions={[
        <Button
          type="text"
          onClick={showModal}
          icon={<EditOutlined />}
        ></Button>,

        <Popconfirm
          title="Are you sure you want to delete this product ?"
          onConfirm={() => handleDelete(data._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="text" icon={<DeleteOutlined />} key="Delete">
          </Button>
        </Popconfirm>,
      ]}
    >
      <Title level={4}>{data.name}</Title>
      <h4>{data.price}</h4>
      <p>{data.color}</p>
      <p>{data.category}</p>

      <EditProductModal open={open} onCancel={handleCancel} data={data} />
    </Card>
  );
};

export default Product;
