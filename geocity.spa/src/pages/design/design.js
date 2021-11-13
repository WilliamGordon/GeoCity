import React, { Component } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const drawerWidth = "30%";

export default class Design extends Component {
  render() {
    return (
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sx={{ border: "1px solid black" }}>
            <Drawer
              elevation={16}
              sx={{
                top: "67px",
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  top: "67px",
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Toolbar>
                CREATE YOUR ITINARY
              </Toolbar>
              <Divider />
              <List>
                <ListItem button key="1">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="STEP 1"/>
                </ListItem>
                <ListItem button key="2">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="STEP 2"/>
                </ListItem>
                <ListItem button key="3">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="STEP 3"/>
                </ListItem>
                <ListItem button key="4">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="STEP 4"/>
                </ListItem>
                <ListItem button key="5">
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add STEP"/>
                </ListItem>
              </List>
            </Drawer>
          </Grid>
        </Grid>
      </Box>
    );
  }
}