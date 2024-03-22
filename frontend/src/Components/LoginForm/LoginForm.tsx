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

export const LoginForm = ({onUserLogin}: {onUserLogin: (email: string) => void}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (email === "" || password === "") {
      return;
    }
    onUserLogin(email);
  };

  return (
    <Center>
      <Box p={4} bg="brand.100" w="300px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel fontWeight="bold" color="brand.highlight">
                Email
              </FormLabel>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={isSubmitted && email === ""}
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
            <ButtonGroup>
              <Button
                type="submit"
                size={"md"}
                color="brand.dark"
                bg="brand.highlight"
              >
                Submit
              </Button>
              <Button onClick={() => navigate("/")}>Cancel</Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};
