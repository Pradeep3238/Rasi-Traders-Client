import {  Layout, Divider } from "antd";
import FeedBackForm from "./FeedBackForm";


const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer>
      <Divider orientation="left" style={{fontSize:24}}>Your FeedBacks</Divider>
      <FeedBackForm/>
    </Footer>
  );
};
export default FooterComponent;
