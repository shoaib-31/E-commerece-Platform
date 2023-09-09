import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { clientconfig } from "../../../clientconfig";
import axios from "axios";
import { useSelector } from "react-redux";
const { url } = clientconfig;
function OrderItem(props) {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { productId, quantity, status, _id } = props.item;
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleClick = () => {
    axios
      .patch(`${url}/orders/${_id}`, {}, { headers }) // Pass an empty object as the request data
      .then(() => {
        props.setRefresh(!props.refresh);
      })
      .catch((error) => {
        console.error("Error canceling order:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/products/${productId}`)
      .then((response) => {
        setThumbnail(response.data.thumbnail);
        setTitle(response.data.title);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Container>
      <Image src={thumbnail} />
      <Mid>
        <Name>{title}</Name>
        <Status>
          <span style={{ color: "black" }}>Status: </span>
          {status}
        </Status>
      </Mid>
      <Quantity>
        Quantity:<span>{quantity}</span>
      </Quantity>
      <Button onClick={handleClick}>Cancel</Button>
    </Container>
  );
}
const Button = styled.button`
  width: 10rem;
  height: 3rem;
  border: none;
  margin-right: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  background-color: #000;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
  &:hover {
    background-color: #222333;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  border: 1px solid transparent;
  background-color: #f4f3f3;
  border: 1px solid #000;
`;
const Quantity = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: 500;
  align-items: flex-end;
  font-family: "Poppins", sans-serif;
`;
const Mid = styled.div`
  width: 50%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;
  height: fit-content;
  color: #000;
  font-family: "Fjalla One", sans-serif;
`;
const Status = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #53c522;
  font-family: "Poppins", sans-serif;
`;
const Image = styled.img`
  height: 90%;
  aspect-ratio: 1;
`;
export default OrderItem;
