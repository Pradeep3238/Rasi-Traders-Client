import { Typography, Layout, Divider } from "antd";
import FeedBackForm from "./FeedBackForm";

const{Paragraph}= Typography

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
  return (
    <Footer>
      <Divider orientation="left" style={{fontSize:24}}>Your FeedBacks</Divider>
      <FeedBackForm/>
        <Paragraph style={{textAlign:'center',fontStretch:'extra-expanded'}}>Designed By Pradeep ● 2024</Paragraph>
    </Footer>
  );
};
export default FooterComponent;
