import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavigationBar() {
  const location = useLocation();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "#10377a", zIndex: 1400 }}
        position="static"
      >
        <Toolbar>
          <IconButton
            component={Link}
            to="/discover"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 5, color: "#ffffff" }}
          >
            <MapIcon />
          </IconButton>
          <Button
            component={Link}
            to="/discover"
            sx={{
              fontSize: "70%",
              height: "25px",
              width: "150px",
              marginRight: "15px",
              color: location.pathname.includes("discover")
                ? "#ffffff"
                : "#9fafce",
              "&:hover": {
                color: "#ffffff",
              },
            }}
            size="small"
            color="inherit"
            variant="outlined"
          >
            Discover
          </Button>
          <Button
            component={Link}
            to="/trip-form"
            sx={{
              fontSize: "70%",
              height: "25px",
              width: "150px",
              color: location.pathname.includes("trip-form")
                ? "#ffffff"
                : "#9fafce",
              "&:hover": {
                color: "#ffffff",
              },
            }}
            size="small"
            color="inherit"
            variant="outlined"
          >
            Create
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            component={Link}
            to="/trips-manager/owner"
            sx={{
              color: location.pathname.includes("my-trips")
                ? "#ffffff"
                : "#9fafce",
              fontSize: "70%",
              height: "25px",
              marginRight: "15px",
              "&:hover": {
                color: "#ffffff",
              },
            }}
            size="small"
            color="inherit"
            variant="outlined"
          >
            My Trips
          </Button>
          {!isAuthenticated && (
            <Button
              id="qsLoginBtn"
              color="primary"
              block
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}
          {isAuthenticated && (
            <Button
              to="#"
              id="qsLogoutBtn"
              onClick={() => logoutWithRedirect()}
            >
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
