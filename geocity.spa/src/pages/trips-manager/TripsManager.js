import React, { useState, useEffect } from 'react';
import { Box, Grid, Backdrop, CircularProgress } from '@mui/material';

export const TripsManager = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          HELLO
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

export default TripsManager;
