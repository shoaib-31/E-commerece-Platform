import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import Product from "../Components/ProductListPage/Product";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchProducts } from "../features/productSlice";
import Preloader from "../Components/Preloader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { clientconfig } from "../../clientconfig";
function ProducListPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState(category);
  const { products, status, error } = useSelector((state) => state.products);
  const { url } = clientconfig;
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    axios
      .get(`${url}/products/category/getCategory`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    dispatch(fetchProducts(selectedOption));
  }, [dispatch, selectedOption]);

  return (
    <Container>
      <Filters>
        <FormControl sx={{ width: "80%" }}>
          <InputLabel id="select-label">Category</InputLabel>
          <Select
            labelId="select-label"
            id="basic-select"
            value={selectedOption}
            onChange={handleChange}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category}>{toTitleCase(category)}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Filters>
      {status === "loading" ? (
        <Preloader />
      ) : status === "failed" ? (
        <div>Error: {error}</div>
      ) : (
        <Products>
          {products.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </Products>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: fit-content;
  color: black;
  gap: 1rem;
  display: flex;
  margin: 1rem 0;
  justify-content: center;
`;
const Filters = styled.div`
  width: 20%;
  height: fit-content;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Products = styled.div`
  width: 60%;
  height: 45rem;
  overflow-y: scroll;
  background-color: white;
  border-radius: 10px;
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

export default ProducListPage;
