import React, { useState, useEffect } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import EuroIcon from '@mui/icons-material/Euro';
import StraightenIcon from '@mui/icons-material/Straighten';
import WatchIcon from '@mui/icons-material/Watch';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ItinaryPlaceCreateUpdateModal from './ItinaryPlaceCreateUpdateModal'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
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
    backgroundColor: '#eceff1',
    boxSizing: 'border-box',
    position: "fixed",
    top: "65px",
    height: 'calc(100% - 65px)'
  },
}

const styleTypography = {
  backgroundColor: "#ffffff",
  fontSize: "initial",
  width: "100%",
  margin: "0 auto",
}

const styleButton = {
  marginBottom: "15px !important",
  color: '#9fafce',
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
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
  fontSize: "70%",
  height: "17px",
  width: "10%",
  margin: "0 auto",
  '&:hover': {
    backgroundColor: "#10377a", color: '#ffffff'
  }
}

const styleBorder = {
  backgroundColor: '#ffffff',
  margin: "0 auto",
  height: "40px",
  width: "90%",
  marginBottom: "4px !important",
}

const styleText = {
  fontSize: "150%",
}

const styleItinaries = {
  margin: "0 auto",
  width: "90%",
}

export const MapSideBar = (props) => {
  const [itinaryPlace, setItinaryPlace] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("RERENDER MAP SIDE BAR")
    console.log(props.itinaryPlaceList)
  })

  const handleClose = () => {
    setOpen(false);
    setItinaryPlace({})
  }

  const handleItinary = (e, id) => {
    // Load all the itinaryPlace For that day
    props.switchItinary(id);
  }

  const getNumberOfItinary = () => {
    var nbItinaryPlaceForItinary = 0;
    props.itinaryPlaceList.forEach(ip => {
      if (props.itinary.id == ip.itinaryId) {
        nbItinaryPlaceForItinary++;
      }
    });
    console.log(nbItinaryPlaceForItinary);
    return nbItinaryPlaceForItinary
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
        {
          props.itinaryList &&
          props.itinaryList.map((p) => {
            return <Button variant="contained" size="small" sx={{
              marginTop: "5px !important",
              marginBottom: "2px !important",
              marginLeft: "10px !important",
              color: props.itinary.id == p.id ? '#ffffff' : '#9fafce',
              backgroundColor: "#10377a",
              fontSize: "70%",
              height: "17px",
              width: "10%",
              margin: "0 auto",
              '&:hover': {
                backgroundColor: "#10377a", color: '#ffffff'
              }
            }} key={p.id} id={p.id} onClick={(e) => handleItinary(e, p.id)}>
              Day {props.itinaryList.indexOf(p) + 1}
            </Button>
          })
        }
      </List>
      <Card variant="outlined" sx={{
        margin: "0 auto",
        width: "90%",
      }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Day {props.itinaryList.indexOf(props.itinary) + 1}
          </Typography>
          <Chip sx={{ marginRight: "4px" }} size="small" icon={<FormatListNumberedIcon />} label={getNumberOfItinary()} />
          <Chip sx={{ marginRight: "4px" }} size="small" icon={<EuroIcon />} label={props.itinary.price ? props.itinary.price : "0,00"} />
          <Chip sx={{ marginRight: "4px" }} size="small" icon={<WatchIcon />} label={props.itinary.duration ? props.itinary.duration : "00:00"} />
          <Chip sx={{ marginRight: "4px" }} size="small" icon={<StraightenIcon />} label={props.itinary.price ? props.itinary.price : "0 km"} />
          <Typography variant="body2">
            Description : {props.itinary.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
      <List>
        {
          props.itinaryPlaceList &&
          props.itinaryPlaceList.map((p) => {
            if (props.itinary.id == p.itinaryId) {
              return <ListItem sx={styleBorder} button id={p.id} key={p.id} onClick={(e) => props.handleOpen(p)}>
                <ListItemIcon>
                  <PushPinIcon fontSize="small" />
                </ListItemIcon>
                <Typography sx={{
                  paddingTop: "5px",
                }} variant="body2" gutterBottom>{p.id + " - " + p.name}</Typography>
              </ListItem>
            }
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
        itinary={props.itinary}
        itinaryPlace={itinaryPlace}
        handleClose={handleClose} />
    </Drawer>
  );
}

export default MapSideBar;