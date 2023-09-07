import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { clientconfig } from "../../../clientconfig";
const { url } = clientconfig;
import axios from "axios";
import { setUser } from "../../features/userSlice";
const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { name, email, gender, phoneNumber, token } = user;
  const originalemail = email;
  const [formData, setFormData] = useState({
    name,
    phoneNumber,
    email,
    gender,
  });
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PATCH request to the server with the updated user data
      const response = await axios.patch(
        `${url}/user/email/${originalemail}`,
        formData,
        { headers }
      );

      // Check the response status and handle it accordingly
      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        dispatch(setUser(response.data.User));
      } else {
        console.error("Data update failed.");
      }
    } catch (error) {
      console.error("An error occurred while updating data:", error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number:</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email Address:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Gender:</Label>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormGroup>
        <Button type="submit">Save</Button>
      </form>
    </FormContainer>
  );
};
const FormContainer = styled.div`
  width: 90%;
  padding: 20px;
  border: none;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-family: "Fjalla One", sans-serif;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1.1rem;
  background-color: white;
  color: black;
  font-family: "Poppins", sans-serif;
  &:focus-visible {
    outline-color: black;
  }
`;

const Select = styled.select`
  width: 10%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: white;
  color: black;
  font-family: "Poppins", sans-serif;
  font-size: 1.1rem;
`;

const Button = styled.button`
  background-color: black;
  color: #fff;
  padding: 10px 4rem;
  border: none;
  font-size: 1.1rem;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #222222;
  }
`;

export default ProfileComponent;
