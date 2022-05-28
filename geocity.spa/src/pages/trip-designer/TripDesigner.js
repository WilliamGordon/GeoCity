import React, { useState, useEffect } from "react";
import { Box, Grid, Alert, AlertTitle } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import Map from "./components/Map";

export const TripDesigner = () => {
  const { user, isAuthenticated } = useAuth0();
  let { tripId } = useParams();

  return (
    <>
      {isAuthenticated && (
        <Box>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Map />
            </Grid>
          </Grid>
        </Box>
      )}
      {!isAuthenticated && (
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
            Please Login to be able to create your own Itinaries
          </Alert>
        </Box>
      )}
    </>
  );
};

export default TripDesigner;
