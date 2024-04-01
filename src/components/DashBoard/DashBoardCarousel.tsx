import { Carousel } from "antd";
import styles from "./dashBoardCarousel.module.scss";
import imageList from '../../assets/carouselImages/index.js'

const DashBoardCarousel: React.FC = () => {
  return (
    <div className={styles.imageContainer}>

    <Carousel autoplay>
      {imageList.map((image: any) => (
        <img src={image} alt="" />
      ))}
    </Carousel>
    </div>
  );
};

export default DashBoardCarousel;
