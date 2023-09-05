import React from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
function Checkout() {
  const { totalQuantity, totalPrice } = useSelector((state) => state.allCart);
  return (
    <Container>
      <Head>Summary</Head>
      <hr style={{ backgroundColor: "black", height: "1px", width: "100%" }} />
      <TotalQuant>
        <span>Total Quantity:</span>
        <span>{totalQuantity}</span>
      </TotalQuant>
      <TotalQuant>
        <span>Total Price:</span>
        <span>₹ {totalPrice}</span>
      </TotalQuant>
      <CheckoutBtn>Checkout</CheckoutBtn>
    </Container>
  );
}
const Container = styled.div`
  width: 25%;
  height: fit-content;
  color: black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  background-color: white;
`;
const Head = styled.div`
  width: 100%;
  height: fit-content;
  font-weight: 400;
  display: flex;
  font-size: 1.3rem;
  color: black;
  flex-direction: column;
`;
const TotalQuant = styled.div`
  width: 95%;
  height: fit-content;
  font-weight: 500;
  display: flex;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  align-items: center;
  justify-content: space-between;
`;
const CheckoutBtn = styled.button`
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
export default Checkout;
