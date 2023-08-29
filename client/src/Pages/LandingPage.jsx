import React from "react";
import Carousel from "../Components/LandingPage/Carousel/Carousel";
import { styled } from "styled-components";
import Categories from "../Components/LandingPage/CategoriesSection/Categories";

const LandingPage = () => {
  return (
    <Container>
      <Carousel />
      <Categories />
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
