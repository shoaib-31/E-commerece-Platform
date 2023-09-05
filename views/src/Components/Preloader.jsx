import React from "react";
import { styled } from "styled-components";
import Loadergif from "./Rhombus.gif";
const Preloader = () => {
  return (
    <Loader>
      <img src={Loadergif} alt="Loading" />
    </Loader>
  );
};
const Loader = styled.div`
  width: 60%;
  height: 45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
export default Preloader;
