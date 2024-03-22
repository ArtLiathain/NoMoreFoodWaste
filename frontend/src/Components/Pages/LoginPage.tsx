import { SetStateAction, useEffect, useState } from "react";
import TablePage from "./TablePage";
import { Card } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginForm";

export const LoginPage = () => {
  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("email");
    return savedEmail ? JSON.parse(savedEmail) : "";
  });

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  const handleUserLogin = (newEmail: SetStateAction<string>) => {
    setEmail(newEmail);
  };

  return email !== "" ? (
    <TablePage email={email} onUserLogout={handleUserLogin}></TablePage>
  ) : (
    <div className="bg-light min-w-full flex-grow flex flex-col justify-center gap-2">
      <Card maxW="md" mx="auto" bg="brand.content">
        <h1 className="text-5xl text-highlight">Login</h1>
        <LoginForm onUserLogin={handleUserLogin}></LoginForm>
      </Card>
      <div className="text-2xl">
        Don't have an account?
        <NavLink to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up!
        </NavLink>
      </div>
    </div>
  );
};

export default LoginPage;
