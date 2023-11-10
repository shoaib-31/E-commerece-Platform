import React from "react";
import styled from "styled-components";
import Ship from "./Ship.svg";
import free from "./free.svg";
import high from "./high-quality.svg";

function WhyUs() {
  return (
    <Container>
      <Head>WHY SHOP WITH US</Head>
      <Items>
        <Item>
          <Img src={Ship} />
          <Content>
            <div>Fast Delivery:</div>
            <div>Get your orders faster than ever before!</div>
          </Content>
        </Item>
        <Item>
          <Img src={free} />
          <Content>
            <div>Free Delivery:</div>
            <div>
              Enjoy stress-free shopping with fast and free delivery on us!
            </div>
          </Content>
        </Item>
        <Item>
          <Img src={high} />
          <Content>
            <div>Best Quality:</div>
            <div>Uncompromising quality - our standard, your satisfaction.</div>
          </Content>
        </Item>
      </Items>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  border-radius: 20px;
  height: fit-content;
  background-color: white;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;
const Items = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const Img = styled.img`
  aspect-ratio: 1;
  width: 20%;
`;
const Head = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  @media (max-width: 550px) {
    font-size: 1.5rem;
  }
`;
const Content = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  color: #320f4b;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  align-items: center;
  @media (max-width: 550px) {
    font-size: 0.9rem;
  }
`;
const Item = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export default WhyUs;
