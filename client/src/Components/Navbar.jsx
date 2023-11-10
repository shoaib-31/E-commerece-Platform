import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";
import MediaQuery from "react-responsive";
import { FaBars } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import {
  FaAngleUp,
  FaCartShopping,
  FaGear,
  FaPowerOff,
  FaUser,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { clientconfig } from "../../clientconfig";
import SideBar from "./SideBar";
const { url } = clientconfig;

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.user);
  const [isPopover, setIsPopover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setIsClicked(false);
  };
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
      <MediaQuery maxWidth={460}>
        <LogoSmall to="/">AtoZ</LogoSmall>
      </MediaQuery>
      <NavbarContainer>
        <Logo to="/">AtoZ</Logo>
        <Search>
          <SearchContainer>
            <SearchBar
              type="text"
              placeholder="Find your product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
          <StyledMagni
            onClick={() => navigate(`/product/search?search=${searchQuery}`)}
            style={{ cursor: "pointer" }}
          />
        </Search>
        <MediaQuery minWidth={1001}>
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
                    {user.role === "Admin"
                      ? "Manage Website"
                      : user.role === "BusinessOwner"
                      ? "Manage Products"
                      : "Your Account"}
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
        </MediaQuery>
        <MediaQuery maxWidth={1000}>
          {!isClicked ? (
            <StyledBars
              onClick={() => {
                setIsClicked(!isClicked);
                document.body.style.overflow = "hidden";
                document.body.style.height = "100vh";
              }}
            />
          ) : (
            <StyledX
              onClick={() => {
                setIsClicked(!isClicked);
                document.body.style.overflow = "";
              }}
            />
          )}
        </MediaQuery>
      </NavbarContainer>
      <SideBar show={isClicked} setIsClicked={setIsClicked} />
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

const StyledBars = styled(FaBars)`
  font-size: 2rem;
  z-index: 100;
  @media (max-width: 460px) {
    font-size: 1.5rem;
  }
`;
const StyledX = styled(FaXmark)`
  font-size: 2rem;
  z-index: 100;
  @media (max-width: 460px) {
    font-size: 1.5rem;
  }
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
  background-color: #000;
  display: flex;
  height: fit-content;
  justify-content: center;
  @media (max-width: 460px) {
    flex-direction: column;
    align-items: center;
  }
`;
const StyledMagni = styled(FaMagnifyingGlass)`
  width: 2rem;
  height: 2rem;
  color: white;
  @media (max-width: 460px) {
    height: 1.5rem;
    width: 1.5rem;
  }
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
  width: fit-content;
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
  width: 12rem;
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
  background-color: #000;
  color: white;
  display: flex;
  height: fit-content;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 460px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

const Logo = styled(Link)`
  color: white;
  font-size: 2.6rem;
  font-weight: bold;
  width: fit-content;
  text-decoration: none;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
  @media (max-width: 460px) {
    display: none;
  }
`;
const LogoSmall = styled(Link)`
  color: white;
  font-size: 2.6rem;
  font-weight: bold;
  width: fit-content;
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
  @media (max-width: 4460px) {
    font-size: 1.2rem;
    background-color: #101010;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 50vw;
  height: 2rem;
  align-items: center;
  background-color: white;
  border-radius: 18px;
  padding: 0.5rem;
  margin: 0.5rem;
  @media (max-width: 460px) {
    height: 1.5rem;
    border-radius: 10px;
  }
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
  @media (max-width: 500px) {
    font-size: 1rem;
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
