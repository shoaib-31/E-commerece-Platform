import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { clientconfig } from "../../../clientconfig";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "../Preloader";
import ManageProductComponent from "./ManageProductComponent";
import { setAllProducts } from "../../features/adminSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const { url } = clientconfig;

function ManageProduct() {
  const [refresh, setRefresh] = useState(false);
  const categoryOptions = [
    "Smartphones",
    "Laptops",
    "Skincare",
    "Home-Decoration",
    "Groceries",
    "Fragrences",
    "Shoes",
    "Clothings",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: "",
    brand: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/products/`, formData, {
        headers,
      });

      console.log(
        "Form submitted successfully. Server response:",
        response.data
      );

      // Optionally, you can reset the form fields after successful submission
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        thumbnail: "",
        brand: "",
      });
      handleCloseModal();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Form submission failed:", error.message);
    }
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const productData = useSelector((state) => state.admin.products);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (role == "Admin") {
      axios
        .get(`${url}/products/getAll/`, { headers })
        .then((response) => {
          dispatch(setAllProducts(response.data));
        })
        .catch((error) => {
          console.error("Not Fetched", error.message);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      axios
        .get(`${url}/products/business/all`, { headers })
        .then((response) => {
          dispatch(setAllProducts(response.data));
        })
        .catch((error) => {
          console.error("Not Fetched", error.message);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [refresh]);
  return (
    <Container>
      <Add>
        <Btn onClick={handleOpenModal}>Add a Product</Btn>
      </Add>
      <Right>
        {isLoading ? (
          <Preloader />
        ) : (
          productData.map((item) => {
            return (
              <ManageProductComponent
                item={item}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            );
          })
        )}
      </Right>
      <StyledModal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <FormContainer>
          <FormHead id="modal-title">Add a Product</FormHead>
          <Form onSubmit={handleSubmit}>
            <InputBox>
              <Label htmlFor="productName">Name:</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="productDescription">Description:</Label>
              <TextArea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="productName">Price:</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="productName">Brand:</Label>
              <Input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="productName">
                Image Link &#40;Optional&#41;:
              </Label>
              <Input
                type="text"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <FormControl variant="outlined">
                <InputLabel htmlFor="category">Select a category</InputLabel>
                <Select
                  native
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Select a category"
                >
                  <option aria-label="None" value="" />
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </InputBox>

            <ButtonBox>
              <Btn onClick={handleCloseModal}>Cancel</Btn>
              <Btn onClick={handleSubmit} type="submit">
                Add
              </Btn>
            </ButtonBox>
          </Form>
        </FormContainer>
      </StyledModal>
    </Container>
  );
}
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: flex-end;
`;
const FormContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  background-color: #fff;
  box-shadow: 24px;
  border-radius: 1rem;
  padding: 2rem;
  @media (max-width: 1000px) {
    width: 80%;
  }
  @media (max-height: 800px) {
    height: 80%;
    overflow-y: scroll;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
  font-family: "Fjalla One", sans-serif;
  margin: 5px 0;
  @media (max-width: 450px) {
    font-size: 1.2rem;
  }
`;
const FormHead = styled.div`
  font-size: 2rem;
  font-family: "Fjalla One", sans-serif;
  text-align: center;
`;
const Input = styled.input`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
`;
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  height: 40rem;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
`;
const Right = styled.div`
  overflow-y: auto; /* Use 'auto' to show scrollbar only when needed */
  max-height: 100%; /* Set a maximum height for the container */
  width: 100%;
  display: flex;
  flex-direction: column;
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
const Add = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Btn = styled.button`
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
  @media (max-width: 450px) {
    width: 7rem;
  }
`;
export default ManageProduct;
