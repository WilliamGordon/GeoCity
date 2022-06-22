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
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import PublishIcon from "@mui/icons-material/Publish";
import GroupIcon from "@mui/icons-material/Group";
import ItinaryModal from "./Modal/ItinaryModal";
import PublishModal from "./Modal/PublishModal";
import ShareModal from "./Modal/ShareModal";
import TripModal from "./Modal/TripModal";
import UserModal from "./Modal/UserModal";
import RatingModal from "./Modal/RatingModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../../common/API/API";

const styleButtonEdit = {
  marginTop: "5px",
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

const styleItinaries = {
  margin: "0 auto",
  width: "90%",
};

const getListStyle = (isDraggingOver) => ({
  width: "98%",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const MapSideBar = (props) => {
  // STATE FOR DATA
  const [trip, setTrip] = React.useState({});
  const [itinary, setItinary] = React.useState({});
  const [points, setPoints] = useState([]);
  const [tripUserFavorite, setTripUserFavorite] = useState({});
  const [link, setLink] = React.useState({});
  const [totalPrice, setTotalPrice] = React.useState();
  const [totalDuration, setTotalDuration] = React.useState();
  const [totalDistance, setTotalDistance] = React.useState();

  // STATE COSMETICS
  const [openItinaryModal, setOpenItinaryModal] = React.useState(false);
  const [openPublishModal, setOpenPublishModal] = React.useState(false);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const [openTripModal, setOpenTripModal] = React.useState(false);
  const [openUserModal, setOpenUserModal] = React.useState(false);
  const [openRatingModal, setOpenRatingModal] = React.useState(false);

  // OTHERS
  const { user, isAuthenticated } = useAuth0();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    setTrip(props.trip);
  }, [props.trip]);

  useEffect(() => {
    setItinary(props.itinary);
  }, [props.itinary]);

  useEffect(() => {
    setPoints(props.points);
  }, [props.points]);

  useEffect(() => {
    if (points.length) {
      // Calculate total price
      var total = 0;
      points.forEach((element) => {
        if (element.price) {
          total = total + element.price;
        }
      });
      setTotalPrice((Math.round(total * 100) / 100).toFixed(2));

      // Calculate total duration
      var totalMinutes = 0;
      totalMinutes = itinary.duration;
      points.forEach((element) => {
        if (element.duration) {
          totalMinutes = totalMinutes + element.duration;
        }
      });
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;

      setTotalDuration(
        hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0")
      );

      // Calculate total distance
      setTotalDistance(itinary.distance + " km");
    } else {
      setTotalPrice((Math.round(0 * 100) / 100).toFixed(2));
      setTotalDuration("00:00");
      setTotalDistance("0 km");
    }
  }, [trip, itinary, points]);

  useEffect(() => {
    const fetchTripUserFavorite = () => {
      API.get(`TripUserFavorite/${trip.id}/${user.sub}`)
        .then((res) => {
          setTripUserFavorite(res.data);
        })
        .catch((error) => {
        });
    };

    if (props.readonly) {
      if (trip.id && isAuthenticated) {
        fetchTripUserFavorite();
      }
    }
  }, [trip, user, isAuthenticated, props.readonly]);

  // MODAL HANDLING
  const handleOpenItinaryModal = () => {
    setOpenItinaryModal(true);
  };
  const handleOpenPublishModal = () => {
    setOpenPublishModal(true);
  };
  const handleOpenShareModal = () => {
    setOpenShareModal(true);
    setLink(trip.link);
  };
  const handleOpenTripModal = () => {
    setOpenTripModal(true);
  };
  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  };
  const handleOpenRatingModal = () => {
    setOpenRatingModal(true);
  };

  const handleCloseItinaryModal = () => {
    setOpenItinaryModal(false);
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
  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };
  const handleCloseRatingModal = () => {
    setOpenRatingModal(false);
  };

  // EVENT COMPONENT
  const handleItinary = (e, id) => {
    props.switchItinary(id);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination && !props.readonly) {
      return;
    }

    var pointForPositionUpdate = {
      userUpdateId: user.sub,
      id: result.draggableId.split("|")[0],
      position: result.destination.index,
    };

    if (result.draggableId.split("|")[1] === "undefined") {
      updatePositionPointOfCrossing(pointForPositionUpdate, result);
    } else {
      updatePositionPointOfInterest(pointForPositionUpdate, result);
    }
  };
  // CREATE API CALS
  const postItinary = (itinary) => {
    API.post(`Itinary`, itinary)
      .then((res) => {
        props.success("The itinary was successfully created !");
        props.refreshTrip(trip.id);
      })
      .catch((error) => {
        props.error(error);
      });
  };

  // UPDATE API CALLS
  const updatePositionPointOfInterest = (poi, result) => {
    API.put(`ItinaryPointOfInterest/UpdatePosition`, poi)
      .then((res) => {
        props.success("Position updated !");
        const items = reorder(
          points,
          result.source.index,
          result.destination.index
        );
        setPoints([...items]);
      })
      .catch((error) => {
        props.error(error);
      });
  };

  const updatePositionPointOfCrossing = (poc, result) => {
    API.put(`ItinaryPointOfCrossing/UpdatePosition`, poc)
      .then((res) => {
        props.success("Position updated !");
        const items = reorder(
          points,
          result.source.index,
          result.destination.index
        );
        setPoints([...items]);
      })
      .catch((error) => {
        props.error(error);
      });
  };

  const postTripUserFavorite = () => {
    API.post(`TripUserFavorite`, {
      tripId: trip.id,
      userId: user.sub,
    })
      .then((res) => {
        setTripUserFavorite((previous) => ({ ...previous, id: res.data }))
        props.success("This trip has been added to your favorite");
      })
      .catch((error) => {
        props.error(error);
      });
  };

  const deleteTripUserFavorite = () => {
    API.delete(`TripUserFavorite/${tripUserFavorite.id}`)
      .then((res) => {
        setTripUserFavorite({});
        props.success("This trip has been removed from your favorite");
      })
      .catch((error) => {
        props.error(error);
      });
  };

  return (
    <>
      <Drawer elevation={16} sx={styleDrawer} variant="permanent" anchor="left">
        <Toolbar
          sx={{
            backgroundColor: "white",
            minHeight: "43px !important",
            heigth: "43px !important",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            align="center"
            component="div"
            sx={styleTypography}
          >
            {trip.name}
          </Typography>
          {!props.readonly && (
            <>
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
            </>
          )}
          <IconButton
            onClick={(e) => {
              handleOpenUserModal();
            }}
            aria-label="update"
            size="small"
            sx={styleButtonEdit}
          >
            <GroupIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
        <Divider />
        {props.readonly && isAuthenticated && (
          <>
            <Toolbar
              sx={{
                backgroundColor: "white",
                minHeight: "43px !important",
                heigth: "43px !important",
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "5px",
              }}
            >
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                align="center"
                component="div"
                sx={{ ...styleTypography }}
              >
                <Rating name="read-only" value={trip.rating || 0} readOnly />
              </Typography>
              <IconButton
                onClick={(e) => {
                  handleOpenRatingModal();
                }}
                aria-label="update"
                size="small"
                sx={styleButtonEdit}
              >
                <GradeIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  if (tripUserFavorite.id) {
                    deleteTripUserFavorite();
                  } else {
                    postTripUserFavorite();
                  }
                }}
                aria-label="update"
                size="small"
                sx={{
                  marginTop: "5px",
                  marginLeft: "10px",
                  marginBottom: "15px !important",
                  color: "#9fafce",
                  backgroundColor: tripUserFavorite.id ? "red" : "#10377a",
                  "&:hover": {
                    backgroundColor: "#10377a",
                    color: "white",
                  },
                }}
              >
                <FavoriteIcon fontSize="inherit" />
              </IconButton>
            </Toolbar>
          </>
        )}
        <List sx={styleItinaries}>
          {trip.itinaries &&
            trip.itinaries.map((p) => {
              return (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "2px !important",
                    marginLeft: "10px !important",
                    color: itinary.id === p.id ? "#ffffff" : "#9fafce",
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
          {!props.readonly && (
            <>
              {trip.itinaries && trip.itinaries.length < 5 && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "2px !important",
                    marginLeft: "10px !important",
                    color: "#9fafce",
                    backgroundColor: "#10377a",
                    fontSize: "0.680rem",
                    height: "17px",
                    margin: "0 auto",
                    "&:hover": {
                      backgroundColor: "#10377a",
                      color: "#ffffff",
                    },
                  }}
                  onClick={(e) => {
                    postItinary({
                      day: trip.itinaries.length + 1,
                      tripId: trip.id,
                    });
                  }}
                >
                  +
                </Button>
              )}
            </>
          )}
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
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontSize: "1.180rem",
                  }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  Day {itinary.day}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "80px",
                  }}
                  size="small"
                  icon={<FormatListNumberedIcon />}
                  label={points.length}
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "80px",
                  }}
                  size="small"
                  icon={<EuroIcon />}
                  label={totalPrice}
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "80px",
                  }}
                  size="small"
                  icon={<WatchIcon />}
                  label={totalDuration}
                />
                <Chip
                  sx={{
                    marginRight: "4px",
                    marginBottom: "4px",
                    fontSize: "0.7125rem",
                    width: "80px",
                  }}
                  size="small"
                  icon={<StraightenIcon />}
                  label={totalDistance}
                />
              </Grid>
              <Grid item xs={1}>
                {!props.readonly && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        handleOpenItinaryModal();
                      }}
                      aria-label="update"
                      size="small"
                      sx={styleButtonEdit}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </>
                )}
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {points.length !== 0 &&
                    points.map((item, index) => (
                      <Draggable
                        key={item.id + "|" + item.osmId}
                        draggableId={item.id + "|" + item.osmId}
                        isDragDisabled={props.readonly}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <ListItem
                              sx={{ ...styleBorder }}
                              button
                              id={item.id}
                              key={item.id}
                              onClick={(e) => props.handleUpdate(item)}
                            >
                              <ListItemIcon>
                                {item.osmId && <ExploreIcon fontSize="small" />}
                                {!item.osmId && (
                                  <PushPinIcon fontSize="small" />
                                )}
                              </ListItemIcon>
                              <Typography
                                sx={{
                                  paddingTop: "5px",
                                  fontSize: "0.790rem",
                                }}
                                variant="body2"
                                gutterBottom
                              >
                                {item.name ? item.name : ""}
                                {!item.osmId && item.address
                                  ? item.address.slice(0, 40) + " ..."
                                  : ""}
                                {!item.osmId && !item.address
                                  ? "# Step " + item.id.slice(0, 5)
                                  : ""}
                              </Typography>
                            </ListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Paper>
        {!props.readonly && (
          <>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button
              onClick={() => props.generateRoute()}
              variant="contained"
              sx={styleButton}
            >
              {props.isRouteGenerated && <>Reset</>}
              {!props.isRouteGenerated && <>Generate Trip</>}
            </Button>
          </>
        )}
      </Drawer>
      {!props.readonly && (
        <>
          <ItinaryModal
            trip={trip}
            itinary={itinary}
            open={openItinaryModal}
            close={handleCloseItinaryModal}
            refreshTrip={props.refreshTrip}
            success={props.success}
            error={props.error}
          />
          <PublishModal
            trip={trip}
            open={openPublishModal}
            close={handleClosePublishModal}
            refreshTrip={props.refreshTrip}
            success={props.success}
            error={props.error}
          />
          <ShareModal
            link={link}
            open={openShareModal}
            close={handleCloseShareModal}
          />
          <TripModal
            trip={trip}
            open={openTripModal}
            close={handleCloseTripModal}
            refreshTrip={props.refreshTrip}
            success={props.success}
            error={props.error}
          />
        </>
      )}
      <UserModal
        trip={trip}
        open={openUserModal}
        close={handleCloseUserModal}
      />
      {props.readonly && (
        <RatingModal
          trip={trip}
          open={openRatingModal}
          close={handleCloseRatingModal}
          refreshTrip={props.refreshTrip}
          success={props.success}
          error={props.error}
        />
      )}
    </>
  );
};

export default MapSideBar;
