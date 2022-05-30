import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const styleButton = {
  fontSize: "70%",
  height: "25px",
  marginRight: "15px",
  color: "#ffffff",
  "&:hover": {
    color: "#ffffff",
  },
};

export default function NavigationBar() {
  const location = useLocation();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        lastname: user.nickname,
        firstname: user.name,
        Id: user.sub,
      }),
    };
    fetch("https://localhost:44396/api/User", requestOptions)
      .then((response) => response.json())
      .then((userId) => {})
      .catch((rejected) => {});
  }

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
              ...styleButton,
              width: "150px",
              color: location.pathname.includes("discover")
                ? "#ffffff"
                : "#9fafce",
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
              ...styleButton,
              width: "150px",
              color: location.pathname.includes("trip-form")
                ? "#ffffff"
                : "#9fafce",
            }}
            size="small"
            color="inherit"
            variant="outlined"
          >
            Create
          </Button>
          <Box sx={{ flexGrow: 1 }}></Box>
          {isAuthenticated && (
            <Button
              component={Link}
              to="/trips-manager/participant"
              sx={{
                ...styleButton,
                color: location.pathname.includes("trips-manager/participant")
                  ? "#ffffff"
                  : "#9fafce",
              }}
              size="small"
              color="inherit"
              variant="outlined"
            >
              My Trips
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              to="/login"
              sx={{
                ...styleButton,
                color: "#9fafce",
              }}
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button
              to="/login"
              sx={{
                ...styleButton,
                color: "#9fafce",
              }}
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          )}
          {isAuthenticated && (
            <IconButton component={Link} to="/profile">
              <Avatar
                src={user.picture}
                sx={{ width: 24, height: 24 }}
              ></Avatar>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
