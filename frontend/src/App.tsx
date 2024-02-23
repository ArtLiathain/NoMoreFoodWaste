import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AboutPage from "./Components/Pages/AboutPage";
import { LoginPage } from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";
import { CustomerPage } from "./Components/Pages/CustomerPage";
import { FoodPage } from "./Components/Pages/FoodPage";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between items-center w-screen text-center font-mono">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<CustomerPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="*" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
