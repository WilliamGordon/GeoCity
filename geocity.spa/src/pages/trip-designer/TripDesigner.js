import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import Map from "./components/Map";

export const TripDesigner = () => {
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TripDesigner;
