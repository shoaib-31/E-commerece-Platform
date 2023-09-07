import Carousel from "../Components/LandingPage/Carousel/Carousel";
import { styled } from "styled-components";
import React from "react";
import Categories from "../Components/LandingPage/CategoriesSection/Categories";
import Description from "../Components/LandingPage/DescriptionSection/Description";
const LandingPage = () => {
  return (
    <Container>
      <Carousel />
      <Categories />
      <Description />
    </Container>
  );
};
const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export default LandingPage;
