import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselData } from "./CarouselData";
import { NextArrow, PrevArrow } from "./CarouselArrows";
import "./CustomCarousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    responsive: [
      {
        breakpoint: 601,
        settings: {
          centerPadding: "10%",
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {CarouselData.map((data) => {
          return (
            <ImageContainer>
              <Img src={data.img} />
            </ImageContainer>
          );
        })}
      </Slider>
    </CarouselContainer>
  );
};

const ImageContainer = styled.div`
  width: 1650px;
  height: 15rem;
`;
const Img = styled.img`
  width: 100%;
  height: 15rem;
`;
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Carousel;
