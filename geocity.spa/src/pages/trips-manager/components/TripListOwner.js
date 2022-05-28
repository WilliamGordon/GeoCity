import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  AvatarGroup,
  Avatar,
  Chip,
  Box,
  Grid,
  Paper,
  ButtonBase,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import StraightenIcon from "@mui/icons-material/Straighten";
import WatchIcon from "@mui/icons-material/Watch";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const TripListOwner = (props) => {
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const useStyle = {
    grid: {},
    chip: {
      marginRight: "4px",
      marginBottom: "4px",
      fontSize: "0.6125rem",
      width: "60px",
    },
  };

  useEffect(() => {
    setOpen(true);
    // Get all data from trip
    fetch(
      "https://localhost:44396/api/Trip/GetTripsUser/owner/" +
        user.sub.split("|")[1]
    )
      .then((response) => response.json())
      .then((tripData) => {
        setOpen(false);
        setTrip(tripData);
        setTripIsLoaded(true);
      })
      .catch((rejected) => {
        setOpen(false);
      });
  }, []);

  return (
    <>
      {tripIsLoaded &&
        trip.map((x) => {
          return (
            <>
              <Card
                key={x.trip.id}
                sx={{ ...useStyle.grid, padding: 0.5, marginBottom: "7px" }}
              >
                <CardActionArea
                  onClick={(e) => {
                    navigate("/trip-designer/" + x.trip.id);
                  }}
                >
                  <Grid container spacing={0.5} sx={{ ...useStyle.grid }}>
                    <Grid item sx={{ ...useStyle.grid, padding: 0.5 }}>
                      <ButtonBase
                        sx={{ width: "100px", height: "95%" }}
                      ></ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container sx={{ ...useStyle.grid }}>
                      <Grid item xs={12} md={12} sx={useStyle.grid}>
                        <Typography sx={{ fontSize: 15 }} component="div">
                          {x.trip.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12} sx={useStyle.grid}>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {x.trip.city.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={8} md={8} sx={useStyle.grid}>
                        <Chip
                          sx={useStyle.chip}
                          size="small"
                          icon={<FormatListNumberedIcon />}
                          label={3}
                        />
                        <Chip
                          sx={useStyle.chip}
                          size="small"
                          icon={<EuroIcon />}
                          label={"0,00"}
                        />
                        <Chip
                          sx={useStyle.chip}
                          size="small"
                          icon={<WatchIcon />}
                          label={"00:00"}
                        />
                        <Chip
                          sx={useStyle.chip}
                          size="small"
                          icon={<StraightenIcon />}
                          label={"0 km"}
                        />
                      </Grid>
                      <Grid item xs={4} md={4} sx={useStyle.grid}>
                        <AvatarGroup
                          max={4}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 24,
                              height: 24,
                              fontSize: 15,
                            },
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 24, height: 24 }}
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                            sx={{ width: 24, height: 24 }}
                          />
                          <Avatar
                            alt="Cindy Baker"
                            src="/static/images/avatar/3.jpg"
                            sx={{ width: 24, height: 24 }}
                          />
                          <Avatar
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                            sx={{ width: 24, height: 24 }}
                          />
                          <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                            sx={{ width: 24, height: 24 }}
                          />
                        </AvatarGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            </>
          );
        })}
    </>
  );
};

export default TripListOwner;
