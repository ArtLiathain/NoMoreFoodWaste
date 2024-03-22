import { Card } from "@chakra-ui/react";
import { SignUpForm } from "../LoginForm/signUpForm";

export const SignUpPage = () => {
  return (
    <div className="bg-light min-w-full flex-grow flex flex-col justify-center gap-2">
      <Card maxW="md" mx="auto" bg="brand.content">
        <h1 className="text-5xl text-highlight">Sign Up</h1>
        <SignUpForm></SignUpForm>
      </Card>
    </div>
  );
};

export default SignUpPage;
