import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { clientconfig } from "../../../clientconfig";
import { useSelector, useDispatch } from "react-redux";
import Preloader from "../Preloader";
import ManageUserComponent from "./ManageUserComponent";
import { setAllUsers } from "../../features/adminSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

const { url } = clientconfig;

function ManageUser() {
  const { token } = useSelector((state) => state.user.user);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [refresh, setRefresh] = useState(false);
  const roleOptions = ["User", "BusinessOwner", "Admin"];
  const genderOptions = ["Male", "Female", "Others"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    gender: "",
    password: "",
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
      const response = await axios.post(`${url}/user/signup`, formData);

      console.log(
        "Form submitted successfully. Server response:",
        response.data
      );

      // Optionally, you can reset the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        role: "",
        gender: "",
        password: "",
      });
      handleCloseModal();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Form submission failed:", error.message);
    }
  };
  const userData = useSelector((state) => state.admin.users);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${url}/user/getAll/`, { headers })
      .then((response) => {
        dispatch(setAllUsers(response.data));
      })
      .catch((error) => {
        console.error("Not Fetched", error.message);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [refresh]);
  return (
    <Container>
      <Add>
        <Btn onClick={handleOpenModal}>Add a User</Btn>
      </Add>
      <Right>
        {isLoading ? (
          <Preloader />
        ) : (
          userData.map((item) => {
            return (
              <ManageUserComponent
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
          <FormHead id="modal-title">Add a User</FormHead>
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
              <Label htmlFor="email">Email:</Label>
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
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
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
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
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
`;
export default ManageUser;
