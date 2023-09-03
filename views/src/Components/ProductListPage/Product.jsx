import React, { useState } from "react";
import { styled } from "styled-components";
import ProductImg from "../ProductPage/Product.webp";

function Product() {
  return (
    <CompContainer>
      <Image src={ProductImg} />
      <Info>
        <Name>Manba Limited Edition Running Shoes</Name>
        <Price>₹ 1200</Price>
      </Info>
      <Third>
        <Button>ADD TO CART</Button>
      </Third>
    </CompContainer>
  );
}

const Third = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  gap: 1rem;
`;
const CompContainer = styled.div`
  width: 98%;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  border: 1px solid transparent;
  &:hover {
    background-color: #f2f0f0;
    border: 1px solid #000;
  }
`;
const Image = styled.img`
  height: 90%;
  border-radius: 5px;
  aspect-ratio: 1;
`;
const Info = styled.div`
  display: flex;
  width: 60%;
  height: 55%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: black;
  font-family: "Fjalla One", sans-serif;
`;
const Price = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  padding: 0 1rem;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  background-color: #000;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
  &:hover {
    background-color: #222333;
  }
`;
export default Product;
