import React from "react";
import CardGameCategory from "./CardGameCategory";
import { Typography, Grid, styled } from "@mui/material";
//importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

//Styles
// importacion de los estilos de swiper
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

//Style components
const MainCategoryGames = styled(Grid)(({ theme }) => ({
  marginTop: "1rem",
  h6: {
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

const CategoryGames = () => {
  return (
    <MainCategoryGames>
      <Typography variant="subtitle1" color="initial">
        Adventure Games
      </Typography>
      <Swiper slidesPerView={5} spaceBetween={5}>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
        <SwiperSlide>
          <CardGameCategory />
        </SwiperSlide>
      </Swiper>
    </MainCategoryGames>
  );
};

export default CategoryGames;
