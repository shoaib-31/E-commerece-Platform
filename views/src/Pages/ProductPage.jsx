import React from "react";
import { styled } from "styled-components";
import Product from "../Components/ProductPage/Product";

const ProductPage = () => {
  return (
    <Container>
      <Product />
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
export default ProductPage;
