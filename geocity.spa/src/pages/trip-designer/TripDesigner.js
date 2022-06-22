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
import { useParams } from "react-router-dom";

import Map from "./components/Map";

export const TripDesigner = () => {
  const [isParticipant, setIsParticipant] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const { tripId } = useParams();
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    setOpenBuffer(true);
    if (isAuthenticated) {
      fetch("https://localhost:44396/api/TripUser/" + user.sub + "/" + tripId)
        .then((response) => response.json())
        .then((userId) => {
          setIsUserLoaded(true);
          setIsParticipant(true);
          setOpenBuffer(false);
        })
        .catch((rejected) => {
          setIsParticipant(false);
          setIsUserLoaded(true);
          setIsParticipant(false);
          setOpenBuffer(false);
        });
    }
  }, [user, isAuthenticated, tripId]);

  return (
    <>
      {isUserLoaded && (
        <>
          {isParticipant && (
            <Box>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Map />
                </Grid>
              </Grid>
            </Box>
          )}
          {!isParticipant && (
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
                You are not a participant for this trip
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

export default TripDesigner;
