import React, { useState, useEffect } from 'react';
import { Box, Grid, Backdrop, CircularProgress } from '@mui/material';
import Map from './components/Map'
import { useParams } from 'react-router-dom';

export const TripDesigner = (props) => {
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  
  let { tripId } = useParams();
  console.log(tripId);

  useEffect(() => {
    setOpen(true);
    // Get all data from trip
    console.log("https://localhost:44396/api/Trip/" + tripId)
    fetch('https://localhost:44396/api/Trip/' + tripId)
      .then(response => response.json())
      .then(tripData => {
        setOpen(false);
        console.log(tripData);
        setTrip(tripData)
        setTripIsLoaded(true)
      }).catch(rejected => {
        setOpen(false);
        console.log(rejected);
      });
  }, []);

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          { tripIsLoaded && <Map trip={trip}/> }
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default TripDesigner;
