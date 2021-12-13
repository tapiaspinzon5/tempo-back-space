import React from "react";
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
  // marginTop: "1rem",
  // width: "92vw",
  // h6: {
  //   fontWeight: "bold",
  //   fontSize: "20px",
  // },
}));

const CategoryGames = () => {
  return (
    <MainCategoryGames>
      <Typography variant="subtitle1">My couses</Typography>
      <Swiper
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1092: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1290: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>algo</SwiperSlide>
      </Swiper>
    </MainCategoryGames>
  );
};

export default CategoryGames;
