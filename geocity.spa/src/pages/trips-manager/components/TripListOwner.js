import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const TripListOwner = (props) => {
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
    // Get all data from trip
    console.log("https://localhost:44396/api/Trip/GetTripsUser/owner/" + 1)
    fetch('https://localhost:44396/api/Trip/GetTripsUser/owner/' + 1)
      .then(response => response.json())
      .then(tripData => {
        setOpen(false);
        setTrip(tripData)
        setTripIsLoaded(true)
      }).catch(rejected => {
        setOpen(false);
      });
  }, []);

  return (
    <div>
      {
        tripIsLoaded &&
        trip.map(x => {
          return <Card sx={{ minWidth: 275, marginBottom: "10px" }} key={x.trip.id}>
                   <CardActionArea onClick={(e) => {
                     console.log(e);
                     navigate("/trip-designer/" + x.trip.id);
                   }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {x.trip.city.name}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {x.trip.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
        })
      }
    </div>
  );
}

export default TripListOwner;
