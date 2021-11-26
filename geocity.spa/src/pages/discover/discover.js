import React, { Component } from 'react';
import CitiesList from './components/CitiesList';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default class Discover extends Component {
  render() {
    return (
      <Box sx={{ backgroundColor: "#E8E8E8"}}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10} sx={{ marginTop: "15px" }}>
            <Card sx={{ minWidth: 275, backgroundColor: "#fffff" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  <b>Explore your city of choice</b>
                </Typography>
              </CardContent>
            </Card>
            <CitiesList />
          </Grid>
        </Grid>
      </Box>
    );
  }
}