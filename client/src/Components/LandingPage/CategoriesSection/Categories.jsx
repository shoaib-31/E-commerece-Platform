import React from "react";
import styled from "styled-components";
import CategoriesData from "./CategoriesData";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <Container>
      <Heading>Categories</Heading>
      <hr style={{ backgroundColor: "black", width: "98%", height: "1px" }} />
      <CategoriesBox>
        {CategoriesData.map((category) => {
          return (
            <Category to={`/product/${category.link}`}>
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
  &:hover {
    text-decoration: underline;
  }
`;
const CategoryImg = styled.img`
  width: 17rem;
  height: 17rem;
  border-radius: 10px;
`;
const Container = styled.div`
  max-width: 1700px;
  width: 100%;
  height: fit-content;
  background-color: white;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const CategoriesBox = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Heading = styled.div`
  width: 98%;
  font-size: 1.5rem;
  color: black;
`;

export default Categories;