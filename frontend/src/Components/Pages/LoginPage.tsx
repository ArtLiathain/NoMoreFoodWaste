import { LoginForm } from "../LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <div className="bg-content min-w-full flex-grow flex flex-col justify-center gap-2">
      <div>
        <h1 className="text-5xl ">Login</h1>
      </div>
      <div className="rounded bg-content min-w-full ">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
