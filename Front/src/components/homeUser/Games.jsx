import React from "react";
import { Grid, Typography, styled } from "@mui/material";
import CardGame from "./CardGame";
//importaciones de swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper";

//Styles
// importacion de los estilos de swiper
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
//Style components
const MainGames = styled(Grid)(({ theme }) => ({
  marginTop: "1rem",
  h6: {
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

// instacia de los  Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

const Games = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <MainGames>
      <Typography variant="subtitle1" color="initial">
        Games
      </Typography>

      <Swiper
        slidesPerView={6}
        spaceBetween={5}
        keyboard={{
          enabled: true,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1092: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          1290: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
        <SwiperSlide
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardGame />
        </SwiperSlide>
      </Swiper>
    </MainGames>
  );
};

export default Games;
