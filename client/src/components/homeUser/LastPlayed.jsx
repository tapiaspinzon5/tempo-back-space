import React from "react";
import { Typography, Grid, styled } from "@mui/material";
import CardLastPlayed from "./CardLastPlayed";
//importaciones de Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper";

//Styles
// importacion de los estilos de swiper
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
//Style components
const MainLastGames = styled(Grid)(({ theme }) => ({
  marginTop: "1rem",
  h6: {
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

// instacia de los  Swiper modules
SwiperCore.use([Keyboard, Pagination, Navigation]);

const LastPlayed = () => {
  return (
    <MainLastGames>
      <Typography variant="subtitle1" color="initial">
        Last Played
      </Typography>
      <Swiper
        slidesPerView={6}
        spaceBetween={5}
        // keyboard={{
        //   enabled: true,
        // }}
        pagination={{
          clickable: true,
        }}
        //navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
        <SwiperSlide>
          <CardLastPlayed />
        </SwiperSlide>
      </Swiper>
    </MainLastGames>
  );
};

export default LastPlayed;
