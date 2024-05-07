import { Button, Card, Flex, Tag, Typography, message, theme } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Product: React.FC<{ data: any }> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: any) => state.cart);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const isItemInCart = items.some(
    (cartItem: any) => cartItem.itemId === data._id
  );

  const {
    token: { colorSuccess },
  } = theme.useToken();

  const addItemToCartHandler = () => {
   if(!isAuthenticated){
    message.error('login or signup to add items to cart')
   }else if(isAuthenticated){

     dispatch(
      cartActions.addItemToCart({
        itemId: data._id,
        image: data.images[0],
        price: data.price,
        quantity: 1,
        name: data.name,
      })
    );
   }
  };

  const goToCartHandler = () => {
    navigate("/cart");
  };

  const viewProductHandler = () => {
    navigate(`/products/${data._id}`);
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
      {data.quantity > 0 ? (
        <Tag
          color={data.quantity < 20 ? "orange" : "green"}
          style={{
            fontSize: 14,
            position: "absolute",
            right: 20,
            top: 20,
            padding: 3,
          }}
        >
          {data.quantity < 20 ? "Only few left" : "In Stock"}
        </Tag>
      ) : (
        <Tag
          color="red"
          style={{
            fontSize: 14,
            position: "absolute",
            right: 20,
            top: 20,
            padding: 3,
          }}
        >
          Out of Stock
        </Tag>
      )}

      <Title level={3} style={{ margin: 0 }}>
        {data.name}
      </Title>
      <Paragraph style={{ fontFamily: "monospace", margin: 0 }}>
        ₹<span style={{ fontWeight: "bold" }}>{data.price}</span>/
        <span style={{ fontSize: 12, fontWeight: "0" }}>{data.unit}</span>
      </Paragraph>

      <Flex vertical style={{ padding: 0, margin: 0 }}>
        <Paragraph style={{ margin: "10px 0 0 0" }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Category:{" "}
          </span>
          {data.category}
        </Paragraph>
        <Paragraph style={{ margin: 0 }}>
          <span style={{ fontWeight: 10, fontFamily: "sans-serif" }}>
            Description:{" "}
          </span>
          {data.description}
        </Paragraph>
        <Paragraph style={{ margin: 0 }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Brand:{" "}
          </span>
          {data.brand}
        </Paragraph>
        <Paragraph style={{ margin: "0 0 10px 0" }}>
          <span style={{ fontWeight: "light", fontFamily: "sans-serif" }}>
            Material:{" "}
          </span>
          {data.material}
        </Paragraph>
      </Flex>
      <Flex gap={20}>
        {isItemInCart ? (
          <Button
            icon={<ShoppingCartOutlined />}
            type="default"
            style={{ backgroundColor: colorSuccess }}
            onClick={goToCartHandler}
          >
            Go to Cart
          </Button>
        ) : (
          <Button
            icon={<ShoppingCartOutlined />}
            type="default"
            onClick={addItemToCartHandler}
            disabled={data.quantity===0}
          >
            Add to Cart
          </Button>
        )}
  
        <Button
          icon={<EyeOutlined />}
          type="primary"
          onClick={viewProductHandler}
        >
          View Product{" "}
        </Button>
      </Flex>
    </Card>
  );
};

export default Product;
