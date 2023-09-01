import React, { useState } from "react";
import { styled } from "styled-components";

const ProfileComponent = () => {
  const [formData, setFormData] = useState({
    name: "Shoaib Akhtar",
    phoneNumber: "9125216099",
    email: "shoaibakmasood@gmail.com",
    gender: "male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
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
