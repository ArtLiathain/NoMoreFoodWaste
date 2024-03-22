import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AboutPage from "./Components/Pages/AboutPage";
import { LoginPage } from "./Components/Pages/LoginPage";
import HomePage from "./Components/Pages/HomePage";
import { CustomerPage } from "./Components/Pages/CustomerPage";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import HamburgerNavbar from "./Components/Navbar/HamburgerNavbar";
import SignUpPage from "./Components/Pages/SignUpPage";
import ChatPage from "./Components/Pages/ChatPage";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      dark: "#12372A",
      light: "#FBFADA",
      content: "#436850",
      highlight: "#ADBC9F",
    },
  },
});

function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  console.log(isMobile);
  return (
    <ChakraProvider theme={theme}>
      <div className="flex flex-col min-h-screen  w-screen ">
        <div className="overflow-y-auto flex-1 w-screen flex flex-col items-center text-center font-mono ">
          <BrowserRouter>
            {isMobile ? <HamburgerNavbar /> : <Navbar />}

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/contactus" element={<CustomerPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<AboutPage />} />
            </Routes>
            <Footer></Footer>
          </BrowserRouter>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
