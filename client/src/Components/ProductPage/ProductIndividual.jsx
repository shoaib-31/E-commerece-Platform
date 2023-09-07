import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../assets/fonts.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loadergif from "../Rhombus.gif";
import { addToCartWithCheck, removeFromCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { clientconfig } from "../../../clientconfig";
const { url } = clientconfig;
function ProductIndividual() {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a GET request with Axios
    axios
      .get(`${url}/products/${productId}`) // Replace with your API endpoint and parameter
      .then((response) => {
        setProductData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      });
  }, [productId]);
  if (loading) {
    return (
      <Loader>
        <img src={Loadergif} alt="Loading" />
      </Loader>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!productData) {
    return <div>Product not found.</div>;
  }

  const { thumbnail, brand, price, description, title } = productData;
  return (
    <Container>
      <ImgContainer>
        <Image src={thumbnail} />
      </ImgContainer>
      <InfoContainer>
        <Company>{brand}</Company>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <PriceContainer>
          <Price>₹ {price}</Price>
        </PriceContainer>
        <ButtonContainer>
          {!isClicked ? (
            <Button
              onClick={() => {
                dispatch(addToCartWithCheck({ ...productData, quantity: 1 }));
                setIsClicked(true);
              }}
            >
              ADD TO CART
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#333333" }}
              onClick={() => {
                dispatch(removeFromCart(productData));
                setIsClicked(false);
              }}
            >
              ADDED TO CART
            </Button>
          )}
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
}
const Loader = styled.div`
  width: 100%;
  height: 50rem;
  display: flex;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Container = styled.div`
  max-width: 1700px;
  width: 100%;
  height: fit-content;
  background-color: white;
  margin: 2rem auto;
  display: flex;
  min-height: 50rem;
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
