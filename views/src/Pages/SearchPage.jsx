import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../Components/ProductListPage/Product";
import { clientconfig } from "../../clientconfig";
import axios from "axios";
import { styled } from "styled-components";
import Preloader from "../Components/Preloader";

const { url } = clientconfig;
const SearchPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search");
    if (query) {
      setSearchQuery(query);

      // Fetch search results based on the query
      axios
        .get(`${url}/products/search?search=${query}`)
        .then((response) => {
          setSearchResults(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <Container>
      {loading ? (
        <Preloader />
      ) : (
        <Products>
          <h2>Search Results:</h2>
          {searchResults.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </Products>
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 45rem;
  display: flex;
  justify-content: center;
  border-radius: 10px;
`;
const Products = styled.div`
  width: 75%;
  margin: 1rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
`;
export default SearchPage;
