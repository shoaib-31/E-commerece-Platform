import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { clientconfig } from "../../clientconfig";
import { Link, useNavigate } from "react-router-dom";
const { url } = clientconfig;
export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    role: "User",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Both passwords should be the same.");
      return;
    }

    // Remove confirmPassword from the data sent to the server
    const { confirmPassword, ...postData } = formData;
    try {
      const response = await axios.post(`${url}/user/signup`, postData);
      setIsSigned(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      // Redirect to login page or wherever you want after successful signup
    } catch (err) {
      console.error(err); // Handle error
      setError("An error occurred while signing up.");
    }
  };

  return (
    <SignupContainer>
      <Modal show={isSigned}>Signed Up. Now Login to Continue</Modal>
      <Head>Sign Up</Head>
      <Box>
        <SignupForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <GenderRadioContainer>
            <RadioLabel>Gender:</RadioLabel>
            <RadioInput
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <RadioLabel>Male</RadioLabel>
            <RadioInput
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <RadioLabel>Female</RadioLabel>
          </GenderRadioContainer>
          <RoleRadioContainer>
            <RadioLabel>Register As:</RadioLabel>
            <div>
              <RadioInput
                type="radio"
                name="role"
                value="User"
                checked={formData.role === "User"}
                onChange={handleChange}
              />
              <RadioLabel>User</RadioLabel>
              <RadioInput
                type="radio"
                name="role"
                value="BusinessOwner"
                checked={formData.role === "BusinessOwner"}
                onChange={handleChange}
              />
              <RadioLabel>Business Owner</RadioLabel>
            </div>
          </RoleRadioContainer>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </SignupForm>
        <Register to="/login">Already have an account?</Register>
      </Box>
    </SignupContainer>
  );
};
const Register = styled(Link)`
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: right;
  color: black;
`;
const Modal = styled.div`
  position: absolute;
  z-index: 2;
  top: ${(props) => (props.show ? "4rem" : "-20rem")};
  background-color: black;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 10px;
  transition-timing-function: ease-in;
  transition-duration: 1s;
`;
const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100vh;
  @media (max-width: 500px) {
    padding: 0;
  }
`;
const Head = styled.div`
  font-size: 2rem;
  color: black;
  font-weight: 600;
  text-align: center;
  margin: 1rem;
  font-family: "Courier New", Courier, monospace;
`;
const Box = styled.div`
  padding: 3rem;
  border-radius: 20px;
  background-color: white;
  border: 1px solid black;
  @media (max-width: 500px) {
    width: 15rem;
    padding: 1rem;
    border-radius: 5px;
  }
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: "Poppins", sans-serif;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  border: 1px solid gray;
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const GenderRadioContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px;
`;

const RadioInput = styled.input`
  margin: 0 5px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
  color: black;
`;

const RoleRadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`;

const SubmitButton = styled.button`
  font-size: 1.3rem;
  font-family: "Poppins", sans-serif;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
  transition-timing-function: ease-in;
  transition-duration: 0.4s;
  transition-delay: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #222222;
  }
`;
