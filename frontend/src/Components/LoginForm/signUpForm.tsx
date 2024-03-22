import React from "react";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Center,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (username === "" || password === "" || password !== confirmPassword) {
      return;
    }
    const response = await fetch(
      "http://BackendLB-1190462709.us-east-1.elb.amazonaws.com/adduseraccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      }
    );
    if (response.ok) {
      console.log("Sign up successful");
    } else {
      console.log("Sign up failed");
    }
  };

  return (
    <Center>
      <Box p={4} bg="brand.100" w="300px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel fontWeight="bold" color="brand.highlight">
                Username
              </FormLabel>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                isInvalid={isSubmitted && username === ""}
                className="text-white"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel fontWeight="bold" color="brand.highlight">
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={isSubmitted && password === ""}
                className="text-white"
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel fontWeight="bold" color="brand.highlight">
                Confirm Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isInvalid={
                  (isSubmitted && confirmPassword === "") ||
                  password !== confirmPassword
                }
                className="text-white"
              />
            </FormControl>
            <ButtonGroup>
              <Button
                type="submit"
                size={"md"}
                color="brand.dark"
                bg="brand.highlight"
              >
                Sign Up
              </Button>
              <Button onClick={() => navigate("/")}>Cancel</Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};
