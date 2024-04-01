import { Button, Card, Flex, Typography } from "antd";
import { ShoppingCartOutlined, TruckOutlined } from "@ant-design/icons";
import styles from "./product.module.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const { Title } = Typography;

const Product: React.FC<{ data: any }> = ({ data }) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        itemId: data._id,
        image:data.images[0],
        price: data.price,
        quantity: 1,
        name: data.name,
      })
    );
  };

  return (
    <Card
      type="inner"
      hoverable
      className={styles.cardContainer}
      cover={
        <div className={styles.imageContainer}>
          <img className={styles.image} src={data.images[0]} />
        </div>
      }
    >
      <Title level={4}>{data.name}</Title>
      <h4>{data.price}</h4>
      <p>{data.color}</p>
      <p>{data.category}</p>
      <Flex gap={2  }>
        <Button
          icon={<ShoppingCartOutlined />}
          type="default"
          onClick={addItemToCartHandler}
        >
          Add to Cart
        </Button>

        <Button icon={<TruckOutlined />} type="primary">
          Buy now{" "}
        </Button>
      </Flex>
    </Card>
  );
};

export default Product;
