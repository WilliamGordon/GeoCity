import React, { useState, useEffect } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import ItinaryPlaceCreateUpdateModal from './ItinaryPlaceCreateUpdateModal'
import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const styleDrawer = {
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
}

const styleTypography = {
  fontSize: "initial",
  width: "80%",
  margin: "0 auto",
}

const styleButton = {
  marginBottom: "15px !important",
  color: '#9fafce',
  backgroundColor: "#10377a",
  width: "90%",
  margin: "0 auto",
  '&:hover': {
    backgroundColor: "#10377a", color: '#ffffff'
  }
}

export const MapSideBar = (props) => {
  const [itinaryPlace, setItinaryPlace] = useState({});
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setItinaryPlace({})
  }

  return (
    <Drawer
      elevation={16}
      sx={styleDrawer}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          align="center"
          component="div"
          sx={styleTypography}>
          Create your trip
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {
          props.itinaryPlaceList &&
          props.itinaryPlaceList.map((p) => {
            return <ListItem button id={p.id} key={p.id} onClick={(e) => props.handleOpen(p)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={p.id + " - " + p.name} />
            </ListItem>
          })
        }
      </List>
      <Button variant="contained" sx={styleButton}>
        Add new step
      </Button>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Button
        onClick={() => props.generateRoute()}
        variant="contained"
        sx={styleButton}>
        {props.isRouteGenerated && <>Reset</>}
        {!props.isRouteGenerated && <>Generate Trip</>}
      </Button>
      <ItinaryPlaceCreateUpdateModal
        open={open}
        itinaryPlace={itinaryPlace}
        handleClose={handleClose} />
    </Drawer>
  );
}

export default MapSideBar;