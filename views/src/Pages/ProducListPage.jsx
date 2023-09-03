import React, { useState } from "react";
import { styled } from "styled-components";
import Product from "../Components/ProductListPage/Product";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function ProducListPage() {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const categories = [
    { name: "Electronics", value: "electronics" },
    { name: "Men's Clothing", value: "men" },
    { name: "Women's Clothing", value: "women" },
  ];
  return (
    <Container>
      <Filters>
        <FormControl sx={{ width: "80%" }}>
          <InputLabel id="select-label">Select a Category</InputLabel>
          <Select
            labelId="select-label"
            id="basic-select"
            value={selectedOption}
            onChange={handleChange}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category.value}>{category.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Filters>
      <Products>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Products>
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
  height: fit-content;
  background-color: white;
  border-radius: 10px;
`;

export default ProducListPage;
