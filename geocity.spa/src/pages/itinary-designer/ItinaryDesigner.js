import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Map from './components/Map'
import SideBar from './components/SideBar'

export const ItinaryDesigner = (props) => {
  const [pointOfInterestList, setPointOfInterestList] = useState([]);
  const [itinaryIsGenerated, setItinaryIsGenerated] = useState(false);

  const sendDataToParent = (data) => {
    setPointOfInterestList(data);
  }

  const generateItinary = () => {
    if (itinaryIsGenerated) {
      setItinaryIsGenerated(false);
    } else {
      setItinaryIsGenerated(true);
    }
  }

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" >
        <Grid item xs={12}>
          <SideBar pointOfInterestList={pointOfInterestList} generateItinary={generateItinary} itinaryIsGenerated={itinaryIsGenerated}/>
          <Map sendDataToParent={sendDataToParent} pointOfInterestList={pointOfInterestList} itinaryIsGenerated={itinaryIsGenerated}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ItinaryDesigner;
