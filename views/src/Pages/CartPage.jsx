import React from "react";
import { styled } from "styled-components";
import CartItemComponent from "../Components/CartPage/CartItemContainer";
import Checkout from "../Components/CartPage/Checkout";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.allCart.cart);
  return (
    <Container>
      <CartItemComponent />
      <Right>
        <Checkout />
        {cart.length !== 0 && (
          <Button onClick={() => dispatch(clearCart())}>Clear All Items</Button>
        )}
      </Right>
    </Container>
  );
};
const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  height: fit-content;
  padding: 1rem;
  justify-content: center;
  gap: 2rem;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 25%;
`;
const Button = styled.button`
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  border: none;
  border-radius: 10px;
  transition-timing-function: ease-in-out;
  transition-duration: 100ms;
  font-family: "Poppins", sans-serif;
  background-color: black;
  &:hover {
    background-color: #333333;
    cursor: pointer;
  }
`;
export default CartPage;
