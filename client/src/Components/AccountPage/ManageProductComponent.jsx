import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientconfig } from "../../../clientconfig";
import { removeFromProducts } from "../../features/adminSlice";
function ManageProductComponent(props) {
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {}, [props.refresh]);
  const { url } = clientconfig;
  const dispatch = useDispatch();
  const { _id, thumbnail, title, price, category } = props.item;
  const dynamicURL = `/product/${category}/${_id}`;
  function handleDelete() {
    axios.delete(`${url}/products/${_id}`, { headers }).then(() => {
      dispatch(removeFromProducts(_id));
      props.setRefresh(!props.refresh);
    });
  }
  return (
    <CompContainer>
      <Image src={thumbnail} />
      <Info to={dynamicURL}>
        <Name>{title}</Name>
        <Cost>₹ {price}</Cost>
      </Info>
      <Third>
        <Button>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Third>
    </CompContainer>
  );
}

const Third = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 1rem;
`;
const CompContainer = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  justify-content: flex-start;
  border-radius: 10px;
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
`;
const Info = styled(Link)`
  display: flex;
  width: 70%;
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
`;
const Cost = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;
const Button = styled.button`
  width: 6rem;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  padding: 0 0.5rem;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  background-color: #000;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
  &:hover {
    background-color: #222333;
  }
`;
export default ManageProductComponent;
