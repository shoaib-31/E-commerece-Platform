import React from "react";
import styled from "styled-components";
import CategoriesData from "./CategoriesData";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <Container>
      <Heading>Shop By Category</Heading>
      <hr style={{ backgroundColor: "black", width: "98%", height: "1px" }} />
      <CategoriesBox>
        {CategoriesData.map((category) => {
          return (
            <Category to={`/product/${category.name}`}>
              <CategoryImg src={category.image} />
              <CategoryName>{category.name}</CategoryName>
            </Category>
          );
        })}
      </CategoriesBox>
    </Container>
  );
}
const Category = styled(Link)`
  padding: 5px;
  margin: 5px;
  text-decoration: none;
  color: black;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 10px gray;
    transform: scale(1.05);
  }
`;
const CategoryName = styled.span`
  margin: 0.5rem 0rem;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;
const CategoryImg = styled.img`
  width: 17rem;
  height: 17rem;
  border-radius: 10px;
  @media (max-width: 550px) {
    width: 14rem;
    height: 14rem;
  }
`;
const Container = styled.div`
  width: 90%;
  height: fit-content;
  background-color: white;
  margin: 1rem 0;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
`;
const CategoriesBox = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    justify-content: center;
    width: 100%;
  }
`;
const Heading = styled.div`
  width: 98%;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1rem;
  font-family: "Poppins", sans-serif;
  color: black;
  @media (max-width: 550px) {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default Categories;
