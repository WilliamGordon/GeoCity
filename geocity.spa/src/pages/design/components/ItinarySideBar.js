import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const ItinarySideBar = (props) => {
  
  return (
    <Drawer
      elevation={16}
      sx={{
        width: "33%",
        flexShrink: 0,
        zIndex: 1301,
        '& .MuiDrawer-paper': {
          width: "33%",
          boxSizing: 'border-box',
          position: "fixed",
          top: "65px",
          height: 'calc(100% - 65px)'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="overline" display="block" gutterBottom align="center" component="div" sx={{ fontSize: "initial", width: "80%", margin: "0 auto" }}>
          Create your itinary
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          props.pointOfInterests &&
          props.pointOfInterests.map((p) => {
            return <ListItem button key={p.key}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={p.key + "|" + p.position[0].toString().substring(0,5) + "_" + p.position[1].toString().substring(0,5)} />
            </ListItem>
          })
        }
      </List>
      <Button variant="contained" sx={{
        marginBottom: "15px !important",
        color: '#9fafce',
        backgroundColor: "#10377a",
        width: "90%",
        margin: "0 auto",
        '&:hover': {
          backgroundColor: "#10377a", color: '#ffffff'
        }
      }}>
        Add new step
      </Button>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Button variant="contained" sx={{
        marginBottom: "15px !important",
        color: '#9fafce',
        backgroundColor: "#10377a",
        width: "90%",
        margin: "0 auto",
        '&:hover': {
          backgroundColor: "#10377a", color: '#ffffff'
        }
      }}>
        Generate Itinary
      </Button>
    </Drawer>
  );
}

export default ItinarySideBar;