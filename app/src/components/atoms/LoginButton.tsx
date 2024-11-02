import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./Button";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) return <></>;

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;
