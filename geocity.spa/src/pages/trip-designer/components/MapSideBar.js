import React, { useState, useEffect } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExploreIcon from "@mui/icons-material/Explore";
import EuroIcon from "@mui/icons-material/Euro";
import StraightenIcon from "@mui/icons-material/Straighten";
import WatchIcon from "@mui/icons-material/Watch";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  Box,
  Card,
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
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import PublishIcon from "@mui/icons-material/Publish";
import PublishModal from "./Modal/PublishModal";
import ShareModal from "./Modal/ShareModal";
import TripModal from "./Modal/TripModal";

const styleButtonEdit = {
  marginTop: "10px",
  marginLeft: "10px",
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "red",
  },
};

const styleDrawer = {
  width: "33%",
  flexShrink: 0,
  zIndex: 1301,
  "& .MuiDrawer-paper": {
    width: "33%",
    backgroundColor: "#eceff1",
    boxSizing: "border-box",
    position: "fixed",
    top: "65px",
    height: "calc(100% - 65px)",
  },
};

const styleTypography = {
  backgroundColor: "#ffffff",
  fontSize: "initial",
  width: "100%",
  margin: "0 auto",
};

const styleButton = {
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
  width: "90%",
  margin: "0 auto",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "#ffffff",
  },
};

const styleBorder = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  height: "32px",
  fontSize: "14px",
  marginBottom: "4px !important",
};

const styleText = {
  fontSize: "150%",
};

const styleItinaries = {
  margin: "0 auto",
  width: "90%",
};

export const MapSideBar = (props) => {
  const [openPublishModal, setOpenPublishModal] = React.useState(false);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const [openTripModal, setOpenTripModal] = React.useState(false);
  const [trip, setTrip] = React.useState({});
  const [link, setLink] = React.useState({});

  useEffect(() => {
    console.log(props.trip);
    setTrip({ ...props.trip });
  }, [props.trip]);

  const handleOpenPublishModal = () => {
    setOpenPublishModal(true);
  };
  const handleOpenShareModal = () => {
    setOpenShareModal(true);
    console.log(trip.link);
    setLink(trip.link);
  };
  const handleOpenTripModal = () => {
    setOpenTripModal(true);
  };

  const handleClosePublishModal = () => {
    setOpenPublishModal(false);
  };
  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };
  const handleCloseTripModal = () => {
    setOpenTripModal(false);
  };

  const handleItinary = (e, id) => {
    props.switchItinary(id);
  };

  const getNumberOfItinary = () => {
    var nbItinaryPlaceForItinary = 0;
    props.points.forEach((ip) => {
      if (props.itinary.id == ip.itinaryId) {
        nbItinaryPlaceForItinary++;
      }
    });
    return nbItinaryPlaceForItinary;
  };

  return (
    <>
      <Drawer elevation={16} sx={styleDrawer} variant="permanent" anchor="left">
        <Toolbar>
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            align="center"
            component="div"
            sx={styleTypography}
          >
            {props.trip.name}
          </Typography>
          {props.isUserOWner && (
            <>
              <IconButton
                onClick={(e) => {
                  handleOpenPublishModal();
                }}
                aria-label="update"
                size="small"
                sx={styleButtonEdit}
              >
                <PublishIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  handleOpenShareModal();
                }}
                aria-label="share"
                size="small"
                sx={styleButtonEdit}
              >
                <ShareIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  handleOpenTripModal();
                }}
                aria-label="update"
                size="small"
                sx={styleButtonEdit}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </>
          )}
        </Toolbar>
        <Divider />
        <List sx={styleItinaries}>
          {props.itinaries &&
            props.itinaries.map((p) => {
              return (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "2px !important",
                    marginLeft: "10px !important",
                    color: props.itinary.id == p.id ? "#ffffff" : "#9fafce",
                    backgroundColor: "#10377a",
                    fontSize: "0.680rem",
                    height: "17px",
                    width: "10%",
                    margin: "0 auto",
                    "&:hover": {
                      backgroundColor: "#10377a",
                      color: "#ffffff",
                    },
                  }}
                  key={p.id}
                  id={p.id}
                  onClick={(e) => handleItinary(e, p.id)}
                >
                  Day {p.day}
                </Button>
              );
            })}
        </List>
        <Card
          variant="outlined"
          sx={{
            overflow: "initial",
            margin: "0 auto",
            width: "90%",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography
                  sx={{
                    fontSize: "1.180rem",
                  }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Day {}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "65px",
                  }}
                  size="small"
                  icon={<FormatListNumberedIcon />}
                  label={getNumberOfItinary()}
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "65px",
                  }}
                  size="small"
                  icon={<EuroIcon />}
                  label={props.itinary.price ? props.itinary.price : "0,00"}
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "65px",
                  }}
                  size="small"
                  icon={<WatchIcon />}
                  label={
                    props.itinary.duration ? props.itinary.duration : "00:00"
                  }
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "65px",
                  }}
                  size="small"
                  icon={<StraightenIcon />}
                  label={props.itinary.price ? props.itinary.price : "0 km"}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {props.itinary.description && (
                  <Typography variant="body2">
                    Description : {props.itinary.description}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Paper
          style={{
            backgroundColor: "#eceff1",
            maxHeight: "100%",
            overflow: "auto",
            width: "90%",
            margin: "0 auto",
            marginTop: "15px",
          }}
        >
          <List>
            {props.points &&
              props.points.map((p) => {
                return (
                  <ListItem
                    sx={styleBorder}
                    button
                    id={p.id}
                    key={p.id}
                    onClick={(e) => props.handleUpdate(p)}
                  >
                    <ListItemIcon>
                      {p.osmId && <ExploreIcon fontSize="small" />}
                      {!p.osmId && <PushPinIcon fontSize="small" />}
                    </ListItemIcon>
                    <Typography
                      sx={{
                        paddingTop: "5px",
                        fontSize: "0.790rem",
                      }}
                      variant="body2"
                      gutterBottom
                    >
                      {p.name ? p.name : "Step"}
                    </Typography>
                  </ListItem>
                );
              })}
          </List>
        </Paper>
        <Button variant="contained" sx={styleButton}>
          Add new step
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          onClick={() => props.generateRoute()}
          variant="contained"
          sx={styleButton}
        >
          {props.isRouteGenerated && <>Reset</>}
          {!props.isRouteGenerated && <>Generate Trip</>}
        </Button>
      </Drawer>
      <PublishModal
        tripId={props.trip}
        open={openPublishModal}
        close={handleClosePublishModal}
      />
      <ShareModal
        link={link}
        open={openShareModal}
        close={handleCloseShareModal}
      />
      <TripModal open={openTripModal} close={handleCloseTripModal} />
    </>
  );
};

export default MapSideBar;
