import React, { useState } from "react";
import { styled } from "styled-components";
import OrderComponent from "../Components/AccountPage/OrderComponent";
import ProfileComponent from "../Components/AccountPage/ProfileComponent";

const AccountPage = () => {
  const [Option, setOption] = useState("profile");
  return (
    <Container>
      <List>
        <Item
          onClick={() => {
            setOption("profile");
          }}
          current="profile"
          active={Option}
        >
          Your Profile
        </Item>
        <Item
          onClick={() => {
            setOption("order");
          }}
          current="order"
          active={Option}
        >
          Your Orders
        </Item>
      </List>
      <Options>
        {Option === "order" ? (
          <OrderComponent />
        ) : Option === "profile" ? (
          <ProfileComponent />
        ) : null}
      </Options>
    </Container>
  );
};
const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  color: black;
  padding: 1rem;
  height: fit-content;
  justify-content: center;
  gap: 1rem;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  font-family: "Poppins", sans-serif;
  width: 15%;
  background-color: white;
  border-radius: 10px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.active == props.current ? "white" : "black")};
  background-color: ${(props) =>
    props.active == props.current ? "black" : "white"};
  justify-content: center;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition-timing-function: ease-in-out;
  transition-duration: 100ms;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: fit-content;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
`;
export default AccountPage;
