import React from "react";
import {
  FaCartShopping,
  FaGear,
  FaHouseChimney,
  FaPowerOff,
  FaUser,
} from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { clientconfig } from "../../clientconfig";
const { url } = clientconfig;
import axios from "axios";

function SideBar(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const token = user.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${url}/user/logout`, { headers })
      .then((response) => {
        navigate("/");
        dispatch(clearCart());
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };
  const handleCloseSidebar = () => {
    props.setIsClicked(false);
    document.body.style.overflow = "";
  };
  return (
    <Main show={props.show}>
      {user ? (
        <List>
          <Item to="/" onClick={handleCloseSidebar}>
            <FaHouseChimney />
            &nbsp;Home
          </Item>
          <Item to="/cart" onClick={handleCloseSidebar}>
            <FaCartShopping />
            &nbsp;Go to Cart
          </Item>
          <Item to="/account" onClick={handleCloseSidebar}>
            <FaGear />
            &nbsp;
            {user.role === "Admin"
              ? "Manage Website"
              : user.role === "BusinessOwner"
              ? "Manage Products"
              : "Your Account"}
          </Item>
          <Logout
            onClick={() => {
              handleCloseSidebar();
              handleLogout();
            }}
          >
            <FaPowerOff />
            &nbsp;Logout
          </Logout>
          <Name>
            <FaUser />
            {user.name}
          </Name>
        </List>
      ) : (
        <Item to="/login">Login/Signup</Item>
      )}
    </Main>
  );
}
const Main = styled.div`
  position: absolute;
  display: flex;
  width: ${(props) => (props.show ? "25rem" : "0")};
  right: 0;
  top: 0;
  z-index: 50;
  height: 100vh;
  background-color: black;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;
  outline: none;
`;
const Name = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: white;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
const Logout = styled.div`
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
  font-family: "Poppins", sans-serif;
  white-space: nowrap;
`;
export default SideBar;
