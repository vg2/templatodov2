import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./Button";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <></>;

  return <Button className="bg-cararra-950" onClick={() => logout()}>Log Out</Button>;
};

export default LogoutButton;