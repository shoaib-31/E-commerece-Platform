import React, { useState } from "react";
import { styled } from "styled-components";
import { addToCartWithCheck, removeFromCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Product(props) {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const { _id, thumbnail, title, price, category } = props.item;
  const dynamicURL = `/product/${category}/${_id}`;
  return (
    <CompContainer>
      <Image src={thumbnail} />
      <Info to={dynamicURL}>
        <Name>{title}</Name>
        <Cost>₹ {price}</Cost>
      </Info>
      <Third>
        {!isClicked ? (
          <Button
            onClick={() => {
              dispatch(addToCartWithCheck(props.item));
              setIsClicked(true);
            }}
          >
            ADD TO CART
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#333333" }}
            onClick={() => {
              dispatch(removeFromCart(props.item));
              setIsClicked(false);
            }}
          >
            ADDED TO CART
          </Button>
        )}
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
  gap: 5px;
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
  @media (max-width: 450px) {
    height: 75%;
  }
`;
const Info = styled(Link)`
  display: flex;
  width: 60%;
  height: 55%;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: black;
  font-family: "Fjalla One", sans-serif;
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;
const Cost = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
  @media (max-width: 450px) {
    font-size: 12px;
  }
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
  @media (max-width: 450px) {
    font-size: 10px;
    padding: 0 0.5rem;
  }
`;
export default Product;
