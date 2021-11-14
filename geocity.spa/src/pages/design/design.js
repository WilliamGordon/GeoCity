import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import ItinaryMap from './components/ItinaryMap'
import ItinarySideBar from './components/ItinarySideBar'

export const Design = () => {
  const [pointOfInterests, setpointOfInterests] = useState([]); // the lifted state

  useEffect(() => {
      console.log("RERENDER", pointOfInterests)
  }, [])

  const sendDataToParent = (pois) => { // the callback. Use a better name
    console.log("FROM PARENT")
    console.log("NEW", pois)
    console.log("OLD", pointOfInterests)

    setpointOfInterests([...pois]);

    console.log("UPDATE", pointOfInterests)
  };

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <ItinarySideBar sendDataToParent={sendDataToParent} pointOfInterests={pointOfInterests} />
          <ItinaryMap sendDataToParent={sendDataToParent} pointOfInterests={pointOfInterests} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Design;
