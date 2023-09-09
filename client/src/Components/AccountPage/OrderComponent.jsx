import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import OrderItem from "./OrderItem";
import { clientconfig } from "../../../clientconfig";
import { useSelector } from "react-redux";
import Preloader from "../Preloader";
const { url } = clientconfig;
function OrderComponent() {
  const [refresh, setRefresh] = useState(false);
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Make a GET request to fetch the data
    axios
      .get(`${url}/orders/`, {
        headers,
      })
      .then((response) => {
        // Assuming the response data is an array
        setData(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);
  return (
    <Container>
      {isLoading ? (
        <Preloader />
      ) : data.length ? (
        data.map((obj) => (
          <OrderItem refresh={refresh} setRefresh={setRefresh} item={obj} />
        ))
      ) : (
        <No>You have not ordered yet.</No>
      )}
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
const No = styled.div`
  width: 100%;
  height: fit-content;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: #4a4a4a;
  font-family: "Poppins", sans-serif;
`;
export default OrderComponent;
