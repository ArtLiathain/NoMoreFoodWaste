import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AboutPage from "./Components/Pages/AboutPage";
import { LoginPage } from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between items-center w-screen text-center font-mono">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/Home" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
