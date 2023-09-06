import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";
import {
  FaAngleUp,
  FaCartShopping,
  FaGear,
  FaPowerOff,
  FaUser,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { clientconfig } from "../../clientconfig";
const { url } = clientconfig;
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isPopover, setIsPopover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleLogout = () => {
    const token = user.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${url}/user/logout`, { headers })
      .then((response) => {
        // Redirect the user to the desired route after logout
        navigate("/"); // Replace '/login' with the desired logout destination
        dispatch(clearCart());
        dispatch(logout());
      })
      .catch((error) => {
        // Handle any errors that occurred during logout
        console.error("Logout error:", error.message);
      });
  };
  const popoverRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopover(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Main>
      <NavbarContainer>
        <Logo to="/">AtoZ</Logo>
        <Search>
          <SearchContainer>
            <SearchBar type="text" placeholder="Find your product" />
          </SearchContainer>
          <StyledMagni style={{ cursor: "pointer" }} />
        </Search>
        {user ? (
          <NavigationLinks>
            <Profile
              onClick={() => {
                event.stopPropagation();
                setIsPopover(!isPopover);
              }}
            >
              <FaUser />
              {user.name}
              <Arrow show={isPopover}>
                <FaAngleUp />
              </Arrow>
              <Popover show={isPopover} ref={popoverRef}>
                <PopItem show={isPopover} to="/account">
                  <span>
                    <FaGear />
                  </span>{" "}
                  Your Account
                </PopItem>
                <PopItem show={isPopover} onClick={handleLogout}>
                  <span>
                    <FaPowerOff />
                  </span>{" "}
                  Log Out
                </PopItem>
              </Popover>
            </Profile>

            <CartNav>
              <FaCartShopping />
              <StyledLink to="/cart">Cart</StyledLink>
            </CartNav>
          </NavigationLinks>
        ) : (
          <Login to="/login">Login/Signup</Login>
        )}
      </NavbarContainer>
    </Main>
  );
};

const Login = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  color: white;
`;
const Arrow = styled.span`
  color: white;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  transform: rotate(${(props) => (props.show ? "180deg" : "0deg")});
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Main = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  height: fit-content;
  justify-content: center;
  align-items: center;
`;
const StyledMagni = styled(FaMagnifyingGlass)`
  width: 2rem;
  height: 2rem;
  color: white;
`;
const CartNav = styled.div`
  display: flex;
  font-size: 1.1rem;
  gap: 7px;
  align-items: center;
  cursor: pointer;
`;
const Profile = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  gap: 4px;
`;
const PopItem = styled(Link)`
  text-decoration: none;
  color: white;
  display: ${(props) => (props.show ? "block" : "none")};
  &:hover {
    text-decoration: underline;
  }
`;
const Popover = styled.div`
  position: absolute;
  right: -20%;
  background-color: #272727;
  border-radius: 5px;
  top: 2.5rem;
  width: 10rem;
  height: ${(props) => (props.show ? "3rem" : "0rem")};
  color: white;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
  padding: ${(props) => (props.show ? "1rem" : "0rem")};
  display: flex;
  margin: 1rem;
  z-index: 2;
  flex-direction: column;
  &::after {
    content: "";
    border: 1rem solid #272727;
    position: absolute;
    border-top: 1rem solid transparent;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    top: -1.6rem;
    right: 0;
    display: ${(props) => (props.show ? "block" : "none")};
  }
`;

const NavbarContainer = styled.nav`
  background-color: black;
  color: white;
  display: flex;
  height: 2rem;
  width: 1650px;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 2.6rem;
  font-weight: bold;
  width: fit-content;
  text-decoration: none;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 50vw;
  height: 2rem;
  align-items: center;
  background-color: white;
  border-radius: 18px;
  padding: 0.5rem;
  margin: 1rem;
`;

const SearchBar = styled.input`
  flex: 1;
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  border: none;
  background-color: transparent;
  color: black;

  &:focus {
    outline: none;
  }
`;

const NavigationLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  width: fit-content;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
`;
export default Navbar;
