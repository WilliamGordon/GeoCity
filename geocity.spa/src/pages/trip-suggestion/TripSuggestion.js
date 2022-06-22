import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

import Map from "./components/Map";

export const TripSuggestion = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    setOpenBuffer(true);
    if (isAuthenticated) {
      if (
        user["https://schemas.quickstarts.com/roles"].includes("GeocityAdmin")
      ) {
        setIsAdmin(true);
        setIsUserLoaded(true);
        setOpenBuffer(false);
      }
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {isUserLoaded && (
        <>
          {isAdmin && (
            <Box>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Map />
                </Grid>
              </Grid>
            </Box>
          )}
          {!isAdmin && (
            <Box
              sx={{
                backgroundColor: "#E8E8E8",
                margin: "auto",
                marginTop: 10,
                width: "450px",
                height: "100%",
              }}
            >
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                You are not an admin
              </Alert>
            </Box>
          )}
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBuffer}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TripSuggestion;
