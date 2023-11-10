import React from "react";
import { styled } from "styled-components";
import CartItemComponent from "./CartItemComponent";
import { useSelector } from "react-redux";
function CartItemContainer() {
  const cart = useSelector((state) => state.allCart.cart);
  return (
    <Container show={cart.length === 0}>
      {cart.length === 0 ? (
        <NoItemsMessage>No items in cart</NoItemsMessage>
      ) : (
        cart.map((cartItem) => <CartItemComponent item={cartItem} />)
      )}
    </Container>
  );
}
const NoItemsMessage = styled.div`
  font-size: 1.2rem;
  color: gray;
  margin-top: 2rem;
`;
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
  justify-content: ${(props) => (props.show ? "center" : "flex-start")};
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
  @media (max-width: 750px) {
    width: 90%;
    height: fit-content;
  }
`;

export default CartItemContainer;
