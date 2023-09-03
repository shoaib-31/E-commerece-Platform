import React, { useState } from "react";
import productImage from "./Product.webp";
import styled from "styled-components";
import "../../assets/fonts.css";
import { FaPlus, FaMinus } from "react-icons/fa6";

function ProductIndividual() {
  const [quantity, setQuantity] = useState(1);
  return (
    <Container>
      <ImgContainer>
        <Image src={productImage} />
      </ImgContainer>
      <InfoContainer>
        <Company>Manba</Company>
        <Title>Manba Limited Edition Running Shoes</Title>
        <Description>
          Experience the epitome of running innovation with the Manba Limited
          Edition Running Shoes. Merging cutting-edge technology with sleek
          design, these shoes offer a responsive, cushioned midsole for optimal
          energy return and joint protection. The breathable yet durable upper
          ensures a secure fit while promoting airflow, and the meticulous
          craftsmanship is evident in every detail, from reflective accents to
          the customizable lacing system. Elevate your running game with these
          shoes that embody performance and style in every stride.
        </Description>
        <PriceContainer>
          <Price>₹ 1200</Price>
        </PriceContainer>
        <ButtonContainer>
          <QuantityContainer>
            <AlterQuantity
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              <FaPlus />
            </AlterQuantity>
            <Quantity>{quantity}</Quantity>
            <AlterQuantity
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <FaMinus />
            </AlterQuantity>
          </QuantityContainer>
          <Button>ADD TO CART</Button>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
}
const Container = styled.div`
  max-width: 1700px;
  width: 100%;
  height: fit-content;
  background-color: white;
  margin-top: 1rem;
  display: flex;
  min-height: 80vh;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
`;
const ImgContainer = styled.div`
  width: 40%;
  height: 80%;
`;
const Image = styled.img`
  width: 90%;
  height: 50%;
  border-radius: 10px;
  box-shadow: 1px 1px 10px #333333;
`;

const InfoContainer = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
`;
const Company = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin: 1rem 0;
  color: #222222;
`;
const Title = styled.div`
  font-size: 3rem;
  margin: 1rem 0;
  font-family: "Fjalla One", sans-serif;
`;
const Description = styled.div`
  font-size: 0.8rem;
  font-family: "Poppins", sans-serif;
  width: 70%;
  font-weight: 300;
`;
const PriceContainer = styled.div`
  width: 100%;
`;
const Price = styled.div`
  font-size: 2rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin: 1rem 0;
`;
const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;
const Button = styled.button`
  width: 40%;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  background-color: #000;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
  &:hover {
    background-color: #222333;
  }
`;
const QuantityContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AlterQuantity = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222222;
  cursor: pointer;
  &:active {
    background-color: #333333;
    transform: scale(0.99);
  }
`;
const Quantity = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;
export default ProductIndividual;
