import React from "react";
import { Typography, Box, styled } from "@mui/material";
//importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

import imageNews from "../../assets/images/imageNews.svg";

//Styles
// importacion de los estilos de swiper
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

const BoxSlide = styled(Box)(() => ({
  padding: 0,
  maxHeight: "52vh",
  borderRadius: "10px",

  img: {
    objectFit: "contain",
    width: "100%",
    maxHeight: "52vh",
  },
}));

// install Swiper modules
SwiperCore.use([Pagination]);

const News = () => {
  return (
    <div>
      <Typography variant="h6" color="#0087FF" mt={4}>
        News{" "}
      </Typography>
      <Swiper
        //slidesPerView={1}
        //spaceBetween={5}
        keyboard={{
          enabled: true,
        }}
        pagination={true}
        //navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <BoxSlide>
            <img src={imageNews} alt="lets go" />
          </BoxSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BoxSlide>
            <img src={imageNews} alt="lets go" />
          </BoxSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BoxSlide>
            <img src={imageNews} alt="lets go" />
          </BoxSlide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default News;
