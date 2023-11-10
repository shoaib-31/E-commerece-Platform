import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientconfig } from "../../../clientconfig";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
function OrderedItemComponent(props) {
  const [product, setProduct] = useState(null);
  const { _id, status, quantity, productId } = props.item;
  useEffect(() => {
    axios.get(`${url}/products/${productId}`).then((response) => {
      setProduct(response.data);
    });
  }, [props.refresh]);
  const { url } = clientconfig;
  const thumbnail = product ? product.thumbnail : "";
  const title = product ? product.title : "";
  const price = product ? product.price : "";
  function handleDelete() {
    axios.delete(`${url}/orders/super/${_id}`, { headers }).then(() => {
      props.setRefresh(!props.refresh);
    });
  }
  const statusOptions = [
    "Not Dispatched Yet",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Payment Failed",
    "Pending",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    status: status,
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
      const response = await axios.patch(
        `${url}/orders/upper/${_id}`,
        formData,
        {
          headers,
        }
      );

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
  const { token, role } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return (
    <CompContainer>
      <Image src={thumbnail} />
      <Info>
        <Name>{title}</Name>
        <Cost>₹ {price}</Cost>
        <Status>
          <span style={{ color: "black" }}>Status:</span>
          {status}
        </Status>
      </Info>
      <Third>
        <Button onClick={handleOpenModal}>Update</Button>
        {role == "Admin" && <Button onClick={handleDelete}>Delete</Button>}
      </Third>
      <StyledModal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <FormContainer>
          <FormHead id="modal-title">Update Order Status</FormHead>
          <Form onSubmit={handleSubmit}>
            <InputBox>
              <FormControl variant="outlined">
                <InputLabel htmlFor="status">Select a status</InputLabel>
                <Select
                  native
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Select a status"
                >
                  <option aria-label="None" value="" />
                  {statusOptions.map((option) => (
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
const Status = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #53c522;
  font-family: "Poppins", sans-serif;
  @media (max-width: 450px) {
    font-size: 1rem;
  }
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
    width: 6rem;
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
  flex-wrap: wrap;
  justify-content: flex-start;
  border-radius: 10px;
  width: 100%;
  border: 1px solid transparent;
  &:hover {
    background-color: #f2f0f0;
    border: 1px solid #000;
  }
  @media (max-width: 450px) {
    height: fit-content;
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
  @media (max-width: 750px) {
    width: 70vw;
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

const FormHead = styled.div`
  font-size: 2rem;
  font-family: "Fjalla One", sans-serif;
  text-align: center;
  @media (max-width: 450px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
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
  @media (max-width: 450px) {
    width: 4rem;
  }
`;
const Info = styled(Link)`
  display: flex;
  width: 70%;
  height: 55%;
  text-decoration: none;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  flex: 1;
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
export default OrderedItemComponent;
