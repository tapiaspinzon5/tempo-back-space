import React from "react";
import CardActivityManage from "../../components/Quizes/CardActivityManage";
import { Box } from "@mui/material";

//importaciones de swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

//Styles
// // importacion de los estilos de swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderQuizCategory = ({ quizUser, category }) => {
  return (
    <Box sx={{ width: "86vw" }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        modules={[Navigation, Pagination, A11y]}
        navigation
        // pagination={{ clickable: true }}
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
          (quiz, index) =>
            quiz.Topic === category && (
              <SwiperSlide key={index}>
                <CardActivityManage quiz={quiz} progress={20} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </Box>
  );
};

export default SliderQuizCategory;
