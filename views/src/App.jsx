import styled from "styled-components";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import Footer from "./Components/Footer";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";
import ProducListPage from "./Pages/ProducListPage";
import ProductIndividual from "./Components/ProductPage/ProductIndividual";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/product/products/:productId"
          element={<ProductIndividual />}
        />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/product" element={<ProducListPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
