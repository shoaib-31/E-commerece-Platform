import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import User from "../../public/User";
import Cart from "../../public/Cart";
import { FaAngleUp, FaGear, FaPowerOff } from "react-icons/fa6";

const Navbar = () => {
  const [isPopover, setIsPopover] = useState(false);
  return (
    <Main>
      <NavbarContainer>
        <Logo>AtoZ</Logo>
        <SearchContainer>
          <SearchBar type="text" placeholder="Find your product" />
        </SearchContainer>
        <NavigationLinks>
          <Profile
            onClick={() => {
              setIsPopover(!isPopover);
            }}
          >
            <User />
            User
            <Arrow show={isPopover}>
              <FaAngleUp />
            </Arrow>
            <Popover show={isPopover}>
              <PopItem show={isPopover}>
                <span>
                  <FaGear />
                </span>{" "}
                Settings
              </PopItem>
              <PopItem show={isPopover}>
                <span>
                  <FaPowerOff />
                </span>{" "}
                Log Out
              </PopItem>
            </Popover>
          </Profile>

          <CartNav>
            <Cart />
            <StyledLink to="/about">Cart</StyledLink>
          </CartNav>
        </NavigationLinks>
      </NavbarContainer>
    </Main>
  );
};

const Arrow = styled.span`
  color: white;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  transform: rotate(${(props) => (props.show ? "180deg" : "0deg")});
`;
const Main = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  height: fit-content;
  justify-content: center;
  align-items: center;
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
  top: 3rem;
  width: 8rem;
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

const Logo = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: bold;
  width: 10%;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 50%;
  height: 2.5rem;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 0.25rem;
`;

const SearchBar = styled.input`
  flex: 1;
  font-size: 1rem;
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
  width: 15%;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
`;
export default Navbar;
