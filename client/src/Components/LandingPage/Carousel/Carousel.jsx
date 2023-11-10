import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Shop from "./shop.png";
import { NextArrow, PrevArrow } from "./CarouselArrows";
import "./CustomCarousel.css";

const Carousel = () => {
  const settings = {
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
      <StyledSlider {...settings}>
        <Card>
          <Content>
            <Big>Welcome to AtoZ Online Shop</Big>
            <Small>
              Welcome to AtoZ! Discover a world of endless possibilities in just
              a click. Explore our curated collection of products, find the
              perfect items to suit your lifestyle, and enjoy a seamless
              shopping experience. Thank you for choosing us as your online
              shopping destination!
            </Small>
            <Button>Contact Us</Button>
          </Content>
          <ImageContainer>
            <Img src={Shop} />
          </ImageContainer>
        </Card>
        <Card>
          <Content>
            <Big>Welcome to AtoZ Online Shop</Big>
            <Small>
              Welcome to AtoZ! Discover a world of endless possibilities in just
              a click. Explore our curated collection of products, find the
              perfect items to suit your lifestyle, and enjoy a seamless
              shopping experience. Thank you for choosing us as your online
              shopping destination!
            </Small>
            <Button>Contact Us</Button>
          </Content>
          <ImageContainer>
            <Img src={Shop} />
          </ImageContainer>
        </Card>
      </StyledSlider>
    </CarouselContainer>
  );
};

const Card = styled.div`
  background: rgb(141, 115, 163);
  background: radial-gradient(circle, #a08daf 0%, #9435d9 100%);
  height: 35rem;
  width: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column-reverse;
  }
`;
const ImageContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  font-size: 1rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  border: 1px solid transparent;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
  background-color: #6504a1;
  &:hover {
    background-color: #9435d9;
    border: 1px solid #6504a1;
    color: #3d0461;
  }
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  @media (max-width: 550px) {
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: "Poppins", sans-serif;
  width: 50%;
  gap: 1rem;
  justify-content: center;
  height: 100%;
  @media (max-width: 550px) {
    width: 85%;
  }
`;
const Big = styled.div`
  font-size: 4rem;
  font-weight: 600;
  @media (max-width: 1000px) {
    font-size: 3rem;
  }
  @media (max-width: 650px) {
    font-size: 2.5rem;
  }
`;
const StyledSlider = styled(Slider)`
  width: 90%;
  border-radius: 20px;
  overflow: hidden;
`;
const Small = styled.div`
  @media (max-width: 650px) {
    font-size: 0.9rem;
  }
`;
const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Carousel;
