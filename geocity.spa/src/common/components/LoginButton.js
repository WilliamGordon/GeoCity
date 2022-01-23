import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  return (
    <>
      <Button
        to="/login"
        sx={{
          fontSize: "70%",
          height: "25px",
          "&:hover": {
            color: "#ffffff",
          },
        }}
        size="small"
        color="inherit"
        variant="outlined"
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
    </>
  );
};

export default LoginButton;
