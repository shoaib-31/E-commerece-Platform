import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { clientconfig } from "../../clientconfig";
const { url } = clientconfig;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${url}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          responseType: "json",
        }
      )
      .then((response) => {
        // Access the data from the fulfilled value
        const responseData = response.data;

        const { message, login, user } = responseData.data; // Extract data from responseData
        const { password, ...userDataWithoutPassword } = user;
        const dataToBeSent = { ...userDataWithoutPassword, token: login };
        // Check for a successful login message
        if (message === "login successful" && login) {
          // Store the JWT token in a browser cookie or local storage
          // Dispatch the user to the Redux store
          dispatch(setUser(dataToBeSent));

          // Clear the form fields and error message
          setEmail("");
          setPassword("");
          setError("");

          // Redirect the user to a different route after successful login
          navigate("/"); // Replace '/dashboard' with your desired route
        } else {
          setError("Authentication failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        // Handle authentication errors here
        console.error("Authentication error:", error.message);
        setError("Authentication failed. Please check your credentials.");
      });
  };

  return (
    <FormContainer>
      <Box>
        <Head>Login</Head>
        <Form>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </Button>
          {error && <div className="error">{error}</div>}
        </Form>
        <Register to="/signup">Don't have an account?</Register>
      </Box>
    </FormContainer>
  );
};
const Head = styled.div`
  font-size: 2rem;
  color: black;
  font-weight: 600;
  text-align: center;
  margin: 1rem;
  font-family: "Courier New", Courier, monospace;
`;
const Register = styled(Link)`
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: right;
  color: black;
`;
// LoginForm.js
const Box = styled.div`
  padding: 3rem;
  border-radius: 20px;
  background-color: white;
  border: 1px solid black;
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background-color: white;
  color: black;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 5px;
`;

const Button = styled.button`
  font-size: 1.3rem;
  font-family: "Poppins", sans-serif;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  transition-timing-function: ease-in;
  transition-duration: 0.4s;
  transition-delay: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #222222;
  }
`;

export default Login;
