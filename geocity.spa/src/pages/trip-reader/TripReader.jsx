import React from "react";
import { Box, Grid } from "@mui/material";

import Map from "../trip-designer/components/Map";

export const TripReader = () => {
  return (
    <>
      <Box>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Map readonly={true} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TripReader;
