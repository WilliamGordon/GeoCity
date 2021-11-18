import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import ItinaryMap from './components/ItinaryMap'
import ItinarySideBar from './components/ItinarySideBar'

export const Design = () => {
  const [state, setState] = useState([]); // the lifted state

  const sendDataToParent = (data) => {
    setState(data);
  }

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <ItinarySideBar pointOfInterests={state} />
          <ItinaryMap sendDataToParent={sendDataToParent} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Design;
