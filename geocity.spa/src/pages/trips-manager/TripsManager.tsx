import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Tabs,
  Tab,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const TripsManager = (props: {
  component:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [open, setOpen] = React.useState(false);
  const [tripIsLoaded, setTripIsLoaded] = React.useState(false);
  const [tripsUser, setTripsUser] = React.useState({});
  const [value, setValue] = React.useState("/trips-manager/owner");

  const handleChange = (
    _event: any,
    newValue: React.SetStateAction<string>
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#E8E8E8" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={10} sx={{ marginTop: "15px" }}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                minWidth: 275,
                marginBottom: "15px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon label tabs example"
              >
                <Tab
                  icon={<PersonPinIcon />}
                  value="/trips-manager/owner"
                  component={Link}
                  iconPosition="start"
                  label="Trips Owner"
                  to={"/trips-manager/owner"}
                />
                <Tab
                  icon={<PeopleIcon />}
                  value="/trips-manager/participant"
                  component={Link}
                  iconPosition="start"
                  label="Trips Participant"
                  to={"/trips-manager/participant"}
                />
                <Tab
                  icon={<FavoriteIcon />}
                  value="/trips-manager/favorite"
                  component={Link}
                  iconPosition="start"
                  label="Favorites"
                  to={"/trips-manager/favorite"}
                />
              </Tabs>
            </Card>
            {props.component}
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TripsManager;
