import React from "react";
import { styled } from "styled-components";
import CartItemComponent from "./CartItemComponent";

function CartItemContainer() {
  return (
    <Container>
      <CartItemComponent />
      <CartItemComponent />
      <CartItemComponent />
      <CartItemComponent />
      <CartItemComponent />
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  height: 40rem;
  padding: 1rem;
  color: black;
  background-color: white;
  border-radius: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: darkgray lightgray;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: gray;
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray;
    border-radius: 10px;
  }
`;

export default CartItemContainer;
