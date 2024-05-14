import { Avatar, Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CartStateType, cartActions, CartItem } from '../store/cart-slice';
import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UnAuthorized from '../components/UnAuthorized';

const columns = (addItemToCartHandler: any, removeItemFromCartHandler: any) => [
  {
    dataIndex:'image',
    key:'image',
    render:(image:string)=>(<Avatar size={50} src={image}/>)
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text: any, record: CartItem) => (
      <span>
        <Button shape='circle' size='small' icon={<MinusOutlined />} onClick={() => removeItemFromCartHandler(record.itemId)} />
        {'\t'}{text}{'\t'}
        <Button shape='circle' size='small' icon={<PlusOutlined />} onClick={() => addItemToCartHandler(record)} />
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
];

const CartPage: React.FC = () => {

  const {isAuthenticated} = useSelector((state: any) => state.auth);
  const cart = useSelector((state: CartStateType) => state.cart);
  const{billAmount, items} = cart
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addItemToCartHandler = (item: CartItem) => {
    dispatch(cartActions.addItemToCart(item));
  };

  const removeItemFromCartHandler = (itemId: string) => {
    dispatch(cartActions.removeItemFromCart(itemId));
  };

  const tableData = items ? items.map(item => ({
    key: item.itemId,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    itemId: item.itemId,
  })) : [];


  const placeOrderHandler = () => {
    navigate('/placeOrder' );

  };
  
  if(!isAuthenticated){
    return <UnAuthorized subtitle='Login to add items to cart'/>
  }

  return (
      <Flex vertical style={{marginLeft:80, marginRight:80}}>
      <Table columns={columns(addItemToCartHandler, removeItemFromCartHandler)} dataSource={tableData} />
      <Button size='large' icon={<CheckOutlined />} style={{ marginLeft: 'auto', marginTop: 25, maxWidth: 300 }} onClick={placeOrderHandler}> Checkout ₹ {(billAmount)} </Button>
      </Flex>

  );
};

export default CartPage;


