import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Chip,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const TripListParticipant = (props) => {
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(true);
      fetch("https://localhost:44396/api/TripUser/" + user.sub)
        .then((response) => response.json())
        .then((tripData) => {
          setOpen(false);
          setTrip(tripData);
          console.log(tripData);
          setTripIsLoaded(true);
        })
        .catch((rejected) => {
          setOpen(false);
        });
    }
  }, [user]);

  return (
    <div>
      {tripIsLoaded &&
        trip.map((x) => {
          return (
            <Card
              sx={{ minWidth: 275, maxWidth: 675, marginBottom: "10px" }}
              key={x.trip.id}
            >
              <CardActionArea
                onClick={(e) => {
                  navigate("/trip-designer/" + x.trip.id);
                }}
              >
                <CardContent>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item>
                          <Typography>{x.trip.name}</Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item>
                          {x.isOwner && <Chip label="Owner" color="primary" />}
                          {x.trip.isPublished && (
                            <Chip
                              label="Published"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                          {!x.isOwner && (
                            <Chip label="Participant" color="success" />
                          )}
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item>Days : {x.trip.days}</Item>
                      </Grid>
                      <Grid item xs={8}>
                        <Item>{x.trip.description}</Item>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
    </div>
  );
};

export default TripListParticipant;
