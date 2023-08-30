import styled from "styled-components";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  );
}

const Main = styled.div`
  color: red;
  font-size: 3rem;
`;

export default App;
