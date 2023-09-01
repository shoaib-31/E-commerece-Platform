import React from "react";
import { styled } from "styled-components";
import OrderItem from "./OrderItem";

function OrderComponent() {
  return (
    <Container>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default OrderComponent;
