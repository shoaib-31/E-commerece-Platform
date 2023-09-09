import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import Product from "../Components/ProductListPage/Product";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchProducts } from "../features/productSlice";
import Preloader from "../Components/Preloader";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
function ProducListPage() {
  const navigate = useNavigate(); // Get the navigate function
  const { category } = useParams();
  const dispatch = useDispatch();
  const categories = [
    "Smartphones",
    "Laptops",
    "Skincare",
    "Home-Decoration",
    "Groceries",
    "Fragrences",
    "Shoes",
    "Clothings",
  ];
  const { products, status, error } = useSelector((state) => state.products);
  const [selectedOption, setSelectedOption] = useState(category);
  const handleChange = (event) => {
    const newCategory = event.target.value;
    setSelectedOption(newCategory);

    // Update the URL parameter when the Select value changes
    navigate(`/product/${newCategory}`);
  };
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
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
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Filters>
      {status === "loading" ? (
        <Preloader />
      ) : status === "failed" ? (
        <div>Error: {error}</div>
      ) : products.length == 0 ? (
        <Products>
          <No>No products related to {selectedOption} category found.</No>
        </Products>
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
const No = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: gray;
`;
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
