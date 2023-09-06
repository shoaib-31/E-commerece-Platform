import Navbar from "./Components/Navbar";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Footer from "./Components/Footer";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";
import ProductListPage from "./Pages/ProducListPage";
import ProductIndividual from "./Components/ProductPage/ProductIndividual";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import { SignUp } from "./Pages/SignUp";

function App() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    // check the current route
    const currentPath = location.pathname;
    if (currentPath === "/login" || currentPath === "/signup") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [location.pathname]);

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/product/:category/:productId"
            element={<ProductIndividual />}
          />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/product/:category" element={<ProductListPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {showNav && <Footer />}
    </>
  );
}

export default App;
