import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { clientconfig } from "../../../clientconfig";
import { removeFromUsers } from "../../features/adminSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
function ManageUserComponent(props) {
  useEffect(() => {}, [props.refresh]);
  const { url } = clientconfig;
  const dispatch = useDispatch();
  const { _id, name, email, phoneNumber, gender, role, password } = props.item;
  function handleDelete() {
    axios.delete(`${url}/user/email/${email}`, { headers }).then(() => {
      dispatch(removeFromUsers(_id));
      props.setRefresh(!props.refresh);
    });
  }
  const roleOptions = ["User", "BusinessOwner", "Admin"];
  const genderOptions = ["Male", "Female", "Others"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    gender: gender,
    role: role,
    password: password,
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
        `${url}/user/email/${email}`,
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
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return (
    <CompContainer>
      <Name>{name}</Name>
      <Info>
        <Small>E-mail: {email}</Small>
        <Small>Phone Number: {phoneNumber}</Small>
        <Small>Gender: {gender}</Small>
        <Small>Role: {role}</Small>
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
          <FormHead id="modal-title">Update User</FormHead>
          <Form onSubmit={handleSubmit}>
            <InputBox>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="email">E-mail:</Label>
              <Input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputBox>

            <InputBox>
              <Label htmlFor="phoneNumber">Phone Number:</Label>
              <Input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </InputBox>

            <InputBox>
              <FormControl variant="outlined">
                <InputLabel htmlFor="gender">Select a Gender</InputLabel>
                <Select
                  native
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  label="Select a Gender"
                >
                  <option aria-label="None" value="" />
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </InputBox>
            <InputBox>
              <FormControl variant="outlined">
                <InputLabel htmlFor="role">Select a Role</InputLabel>
                <Select
                  native
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label="Select a Role"
                >
                  <option aria-label="None" value="" />
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </InputBox>
            <InputBox>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
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
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled(Link)`
  display: flex;
  width: 55%;
  flex-wrap: wrap;
  text-decoration: none;
  justify-content: space-evenly;
  align-items: flex-start;
`;
const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  width: 25%;
  color: black;
  font-family: "Fjalla One", sans-serif;
`;
const Small = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
  width: 18rem;
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
export default ManageUserComponent;
