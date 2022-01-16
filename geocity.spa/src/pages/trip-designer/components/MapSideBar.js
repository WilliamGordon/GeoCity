import React, { useState, useEffect } from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import PushPinIcon from '@mui/icons-material/PushPin';
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

const styleButtonItinary = {
  marginTop: "5px !important",
  marginBottom: "2px !important",
  marginLeft: "10px !important",
  color: '#9fafce',
  backgroundColor: "#10377a",
  width: "10%",
  margin: "0 auto",
  '&:hover': {
    backgroundColor: "#10377a", color: '#ffffff'
  }
}

const styleBorder = {
  margin: "0 auto",
  width: "90%",
  marginBottom: "4px !important",
}

const styleItinaries = {
  margin: "0 auto",
  width: "90%",
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
      <List sx={styleItinaries}>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 1
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 2
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 3
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 4
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 1
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 2
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 3
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 4
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 1
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 2
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 3
        </Button>
        <Button variant="contained" size="small" sx={styleButtonItinary}>
          Day 4
        </Button>
      </List>
      <List>
        {
          props.itinaryPlaceList &&
          props.itinaryPlaceList.map((p) => {
            return <ListItem sx={styleBorder} button id={p.id} key={p.id} onClick={(e) => props.handleOpen(p)}>
              <ListItemIcon>
                <PushPinIcon />
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