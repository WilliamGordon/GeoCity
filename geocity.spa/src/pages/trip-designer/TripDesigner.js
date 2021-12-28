import React, { useState, useEffect } from 'react';
import { Box, Grid, Backdrop, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Map from './components/Map'

export const TripDesigner = (props) => {
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);

  let { tripId } = useParams();

  useEffect(() => {
    setOpen(true);
    fetch('https://localhost:44396/api/Trip/' + tripId)
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
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          {tripIsLoaded && <Map trip={trip} />}
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
