import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Map from './components/Map'
import ItinarySideBar from './components/ItinarySideBar'

export const Design = () => {
  const [pointOfInterestList, setPointOfInterestList] = useState([]);

  useEffect(() => {
    console.log("RERENDER DESIGN", pointOfInterestList)
  })

  const sendDataToParent = (data) => {
    setPointOfInterestList(data);
  }

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <ItinarySideBar pointOfInterestList={pointOfInterestList} />
          <Map sendDataToParent={sendDataToParent} pointOfInterestList={pointOfInterestList}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Design;
