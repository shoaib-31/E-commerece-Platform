import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientconfig } from "../../../clientconfig";
import { removeFromProducts } from "../../features/adminSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
function ManageProductComponent(props) {
  useEffect(() => {}, [props.refresh]);
  const { url } = clientconfig;
  const dispatch = useDispatch();
  const { _id, thumbnail, title, price, category, description, brand } =
    props.item;
  const dynamicURL = `/product/${category}/${_id}`;
  function handleDelete() {
    axios.delete(`${url}/products/${_id}`, { headers }).then(() => {
      dispatch(removeFromProducts(_id));
      props.setRefresh(!props.refresh);
    });
  }
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
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    price: price,
    category: category,
    thumbnail: thumbnail,
    brand: brand,
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
      const response = await axios.patch(`${url}/products/${_id}`, formData, {
        headers,
      });

      console.log(
        "Form submitted successfully. Server response:",
        response.data
      );

      // Optionally, you can reset the form fields after successful submission
      handleCloseModal();
      props.setRefresh(!props.refresh);
    } catch (error) {
      console.error("Form submission failed:", error.message);
    }
  };
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return (
    <CompContainer>
      <Image src={thumbnail} />
      <Info to={dynamicURL}>
        <Name>{title}</Name>
        <Cost>₹ {price}</Cost>
      </Info>
      <Third>
        <Button onClick={handleOpenModal}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Third>
      <StyledModal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <FormContainer>
          <FormHead id="modal-title">Update Product</FormHead>
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
                Update
              </Btn>
            </ButtonBox>
          </Form>
        </FormContainer>
      </StyledModal>
    </CompContainer>
  );
}
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
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
`;

const Third = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  gap: 1rem;
  flex: 2;
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
  @media (max-width: 550px) {
    height: fit-content;
    flex-wrap: wrap;
  }
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
const Image = styled.img`
  height: 90%;
  border-radius: 5px;
  aspect-ratio: 1;
  @media (max-width: 550px) {
    height: 5rem;
  }
`;
const Info = styled(Link)`
  display: flex;
  width: 70%;
  height: fit-content;
  text-decoration: none;
  flex: 1;
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
