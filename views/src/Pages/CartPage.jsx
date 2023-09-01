import React from "react";
import { styled } from "styled-components";
import CartItemComponent from "../Components/CartPage/CartItemContainer";
import Checkout from "../Components/CartPage/Checkout";

const CartPage = () => {
  return (
    <Container>
      <CartItemComponent />
      <Checkout />
    </Container>
  );
};
const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  height: fit-content;
  padding: 1rem;
  justify-content: center;
  gap: 1rem;
`;
export default CartPage;
