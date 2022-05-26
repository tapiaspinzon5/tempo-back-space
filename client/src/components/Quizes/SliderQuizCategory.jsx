import React from "react";
import CardActivityManage from "../../components/Quizes/CardActivityManage";
import { Box } from "@mui/material";

//importaciones de swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

//import SwiperCore, { Keyboard, Navigation, Pagination } from "swiper";

//Styles
// // importacion de los estilos de swiper

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// instacia de los  Swiper modules
//SwiperCore.use([Keyboard, Pagination, Navigation]);

const SliderQuizCategory = ({ quizUser, category }) => {
  return (
    <Box sx={{ width: "86vw" }}>
      {/* <Swiper
        loop={false}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1092: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1390: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {quizUser.map(
          (quiz) =>
            quiz.Topic === category && (
              <SwiperSlide>
                <CardActivityManage quiz={quiz} progress={20} />
              </SwiperSlide>
            )
        )}
      </Swiper> */}

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1092: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1390: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {quizUser.map(
          (quiz) =>
            quiz.Topic === category && (
              <SwiperSlide>
                <CardActivityManage quiz={quiz} progress={20} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </Box>
  );
};

export default SliderQuizCategory;
