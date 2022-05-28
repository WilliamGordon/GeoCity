import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const TripSubscriber = () => {
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [trip, setTrip] = React.useState({});
  const { user, isAuthenticated } = useAuth0();
  let { linkId } = useParams();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    setOpenBuffer(true);
    fetch("https://localhost:44396/api/Trip/GetTripOverview/" + linkId)
      .then((response) => response.json())
      .then((tripData) => {
        console.log(tripData);
        setTrip({ ...tripData });
        setOpenBuffer(false);
      })
      .catch((rejected) => {
        setOpenBuffer(false);
      });
  }, []);
  return (
    <>
      {isAuthenticated && (
        <Box sx={{ marginTop: "25px" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Participate to a trip in {trip.city.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {trip.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {trip.description}
                  </Typography>
                  <Typography variant="body2">
                    Number of days : {trip.days}
                    <br />
                    Number of participants : {trip.tripUsers.length}
                  </Typography>
                  <Box sx={{ height: "25px" }}></Box>
                  <Stack direction="row" spacing={2}>
                    {trip.tripUsers &&
                      trip.tripUsers.map((u) => {
                        return <Avatar>{u.user.firstname[0]}</Avatar>;
                      })}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small">Confirme my participation</Button>
                </CardActions>
              </Card>
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
            Please Login to be able to participate to trip
          </Alert>
        </Box>
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

export default TripSubscriber;
