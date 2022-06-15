import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import {
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  ListItem,
  Typography,
  ListItemIcon,
  Button,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RoutingControl from "../routing/RoutingControl";
import MapSideBar from "./MapSideBar";
import Pointer from "./Pointer";
import Points from "./Points";
import PointModal from "./Modal/PointModal";
import ExploreIcon from "@mui/icons-material/Explore";
import API from "../../../common/API/API";
import "./Map.css";

const styleBorder = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  height: "32px",
  fontSize: "14px",
  marginBottom: "4px !important",
};

export const Map = (props) => {
  // STATE FOR DATA
  const [trip, setTrip] = useState({});
  const [tripUser, setTripUser] = React.useState({});
  const [itinary, setItinary] = useState({});
  const [points, setPoints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [pointForUpdate, setPointForUpdate] = useState({});
  const [openPointModal, setOpenPointModal] = React.useState(false);
  const [infoForItinaryUpdate, setInfoForItinaryUpdate] = React.useState({});

  // STATE COSMETICS
  const [readonly, setReadonly] = React.useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [openSuccessNotif, setOpenSuccessNotif] = React.useState(false);
  const [openErrorNotif, setOpenErrorNotif] = React.useState(false);
  const [zoomCluster, setZoomCluster] = React.useState(true);

  // OTHERS
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  const routingMachine = useRef();
  const { tripId } = useParams();
  const { user } = useAuth0();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    fetchTrip(tripId);
  }, []);

  useEffect(() => {
    setReadonly(props.readonly);
  }, [props.readonly]);

  useEffect(() => {
    if (trip.id && !props.readonly) {
      fetchTripUser();
    }
  }, [trip, user]);

  useEffect(() => {
    if (trip.itinaries) {
      fetchItinary(trip.itinaries[0].id); // Fetch the first itinary by default
    }
  }, [trip]);

  useEffect(() => {
    if (pointForUpdate.id) {
      setOpenPointModal(true);
    }
  }, [pointForUpdate]);

  useEffect(() => {
    if (itinary.id) {
      setZoomCluster(true);
      fetchPoints();
    }
  }, [itinary]);

  useEffect(() => {
    if (points.length > 0) {
      if (zoomCluster) {
        ZoomInCluster();
        setZoomCluster(false);
      }
      fetchSuggestions();
    }
  }, [points]);

  useEffect(() => {
    if (infoForItinaryUpdate) {
      putItinary({
        id: itinary.id,
        distance: infoForItinaryUpdate.distance,
        duration: infoForItinaryUpdate.duration,
      });
    }
  }, [infoForItinaryUpdate]);

  useEffect(() => {
    ZoomInCluster();
  }, [map]);

  // MAP ACTION
  const ZoomInCluster = () => {
    if (map) {
      const isEmpty =
        Object.keys(featureGroupRef.current.getBounds()).length === 0;
      if (!isEmpty) {
        map.fitBounds(featureGroupRef.current.getBounds(), {
          padding: [100, 100],
        });
      }
    }
  };

  // ADDING POINTS
  const AddPointOfCrossing = (point) => {
    // Call API to create PointOfCrossing
    postPointOfCrossing({
      userCreateId: user.sub,
      itinaryId: itinary.id,
      pointOfCrossing: {
        cityId: trip.city.id,
        latitude: point.latitude,
        longitude: point.longitude,
      },
    });
  };

  const AddPointOfInterest = (point) => {
    fetch(
      "https://nominatim.openstreetmap.org/reverse?lat=" +
        point.latitude +
        "&lon=" +
        point.longitude +
        "&format=geojson"
    )
      .then((response) => response.json())
      .then((POI) => {
        postPointOfInterest({
          userCreateId: user.sub,
          itinaryId: itinary.id,
          pointOfInterest: {
            osmId: POI.features[0].properties.osm_id.toString(),
            name: POI.features[0].properties.name,
            category: POI.features[0].properties.category,
            latitude: POI.features[0].geometry.coordinates[1],
            longitude: POI.features[0].geometry.coordinates[0],
            cityId: trip.city.id,
          },
        });
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  // UPDATE POINTS
  const handleUpdate = (point) => {
    setPointForUpdate({ ...point });
  };

  const handleClosePointModal = () => {
    setOpenPointModal(false);
    setPointForUpdate({});
  };

  // DELETE POINTS
  const handleDelete = (point) => {
    if (point.osmId) {
      deletePointOfInterest(point.id);
    } else {
      deletePointOfCrossing(point.id);
    }
  };

  // ROUTING NEW
  const generateRoute = () => {
    if (isRouteGenerated == false) {
      console.log("FROM GENERATE : " + itinary.day);
      createRoute();
    } else {
      deleteRoute();
    }
  };

  const createRoute = () => {
    if (routingMachine.current) {
      var itiplace = [];
      var waypoints = points.sort((a, b) => {
        return a.position - b.position;
      });
      waypoints.forEach((ip) => {
        itiplace.push([ip.latitude, ip.longitude]);
      });
      console.log(points);
      console.log(itiplace);
      routingMachine.current.setWaypoints(itiplace);
    }
  };

  const deleteRoute = () => {
    console.log("DELETE ROUTE");
    if (routingMachine.current) {
      routingMachine.current.setWaypoints([]);
      setIsRouteGenerated(false);
    }
  };

  const getInfoRoute = (e) => {
    setInfoForItinaryUpdate(e);
    setIsRouteGenerated(true);
  };

  const switchItinary = (id) => {
    deleteRoute();
    fetchItinary(id);
  };

  // GET API CALLS
  const fetchTrip = (id) => {
    setOpenBuffer(true);
    API.get(`Trip/${id}`)
      .then((res) => {
        setTrip({
          id: res.data.id,
          createdDate: res.data.createdDate,
          modifiedDate: res.data.modifiedDate,
          name: res.data.name,
          description: res.data.description,
          days: res.data.days,
          isPublished: res.data.isPublished,
          link: res.data.link,
          rating: res.data.rating,
          itinaries: res.data.itinaries.map((x) => ({ id: x.id, day: x.day })),
          tripUsers: res.data.tripUsers.map((x) => ({
            id: x.id,
            userId: x.userId,
            firstname: x.user.firstname,
            lastname: x.user.lastname,
            createdDate: x.createdDate,
            isOwner: x.isOwner,
          })),
          city: {
            id: res.data.city.id,
            name: res.data.city.name,
            latitude: res.data.city.latitude,
            longitude: res.data.city.longitude,
          },
        });
        setOpenBuffer(false);
      })
      .catch((error) => {
        setOpenBuffer(false);
      });
  };

  const fetchTripUser = () => {
    setOpenBuffer(true);
    API.get(`TripUser/${user.sub}/${trip.id}`)
      .then((res) => {
        setTripUser({
          id: res.data.id,
          createdDate: res.data.createdDate,
          modifiedDate: res.data.modifiedDate,
          isOwner: res.data.isOwner,
        });
        setOpenBuffer(false);
      })
      .catch((error) => {
        setOpenBuffer(false);
      });
  };

  const fetchItinary = (id) => {
    API.get(`Itinary/${id}`)
      .then((res) => {
        setItinary({
          id: res.data.id,
          createdDate: res.data.createdDate,
          modifiedDate: res.data.modifiedDate,
          day: res.data.day,
          duration: res.data.duration,
          distance: res.data.distance,
          tripId: res.data.tripId,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const fetchPoints = () => {
    API.get(`Itinary/${itinary.id}`)
      .then((res) => {
        setPoints(
          [
            ...res.data.itinaryPointOfCrossing,
            ...res.data.itinaryPointOfInterest,
          ].sort((a, b) => {
            return a.position - b.position;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const fetchSuggestions = () => {
    API.get(`PointOfInterest/GetAllSuggestionForCityQuery/${trip.city.id}`)
      .then((res) => {
        // FILTER SUGGESTION TO NOT INCLUDE POINT ALREADY ADDED
        var filterdSuggestion = res.data.filter((p) => {
          if (points.filter((e) => e.osmId === p.osmId).length > 0) {
            return false;
          } else {
            return true;
          }
        });
        setSuggestions(
          [...filterdSuggestion].sort((a, b) => {
            return b.nbTimeUsed - a.nbTimeUsed;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // POST API CALLS
  const postPointOfInterest = (poi) => {
    API.post(`ItinaryPointOfInterest`, poi)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  const postAddSuggestions = (suggestion) => {
    console.log(suggestion);
    API.post(`ItinaryPointOfInterest/AddSuggestion`, suggestion)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  const postPointOfCrossing = (poc) => {
    API.post(`ItinaryPointOfCrossing`, poc)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  // PUT API CALLS
  const putItinary = (itinaryForUpdate) => {
    console.log("UPDATE : ", itinaryForUpdate);
    if (itinaryForUpdate.distance !== undefined) {
      API.put(`Itinary`, itinaryForUpdate)
        .then((res) => {
          fetchItinary(itinary.id);
          setOpenSuccessNotif(true);
        })
        .catch((error) => {
          setOpenErrorNotif(true);
        });
    }
  };

  // DELETE API CALLS
  const deletePointOfInterest = (id) => {
    API.delete(`ItinaryPointOfInterest/${id}`)
      .then((res) => {
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  const deletePointOfCrossing = (id) => {
    API.delete(`ItinaryPointOfCrossing/${id}`)
      .then((res) => {
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  return (
    <>
      {Object.keys(trip).length && (
        <>
          <Snackbar
            open={openSuccessNotif}
            autoHideDuration={1000}
            onClose={() => {
              setOpenSuccessNotif(false);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              marginTop: "55px",
            }}
          >
            <Alert
              onClose={() => {
                setOpenSuccessNotif(false);
              }}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              The point was correctly added !
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorNotif}
            autoHideDuration={1000}
            onClose={() => {
              setOpenErrorNotif(false);
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              marginTop: "55px",
            }}
          >
            <Alert
              onClose={() => {
                setOpenErrorNotif(false);
              }}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Oups something went wrong !
            </Alert>
          </Snackbar>
          <MapSideBar
            readonly={readonly}
            trip={trip}
            isUserOWner={tripUser.isOwner}
            itinary={itinary}
            points={points}
            refreshTrip={fetchTrip}
            switchItinary={switchItinary}
            generateRoute={generateRoute}
            isRouteGenerated={isRouteGenerated}
            handleUpdate={handleUpdate}
            success={() => {
              setOpenSuccessNotif(true);
            }}
            error={() => {
              setOpenErrorNotif(true);
            }}
          />
          <MapContainer
            center={[trip.city.latitude, trip.city.longitude]}
            zoom={14}
            minZoom={8}
            style={{
              height: "100vh",
              width: "67%",
              float: "right",
              position: "fixed",
              left: "33%",
              top: "65px",
            }}
            whenCreated={setMap}
          >
            {!readonly && (
              <Pointer
                AddPointOfCrossing={AddPointOfCrossing}
                AddPointOfInterest={AddPointOfInterest}
              />
            )}

            <FeatureGroup ref={featureGroupRef}>
              <Points
                readonly={readonly}
                data={points}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            </FeatureGroup>
            <RoutingControl ref={routingMachine} getInfoRoute={getInfoRoute} />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>

          {!readonly && (
            <>
              <Paper
                style={{
                  padding: "1%",
                  boxSizing: "border-box",
                  height: "calc(35% - 65px)",
                  backgroundColor: "#eceff1",
                  flexShrink: 0,
                  minWidth: "25%",
                  float: "left",
                  position: "fixed",
                  left: "74%",
                  bottom: "2%",
                  backgroundColor: "#eceff1",
                  overflow: "auto",
                  marginTop: "15px",
                }}
              >
                {suggestions.length !== 0 &&
                  suggestions.map((item, index) => (
                    <ListItem sx={styleBorder}>
                      <ListItemIcon>
                        <ExploreIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography
                        sx={{
                          paddingTop: "5px",
                          fontSize: "0.790rem",
                        }}
                        variant="body2"
                        gutterBottom
                      >
                        {item.name}{" "}
                        <Chip
                          sx={{
                            fontSize: "0.7125rem",
                          }}
                          size="small"
                          label={item.category}
                        />
                        <Chip
                          sx={{
                            fontSize: "0.7125rem",
                          }}
                          size="small"
                          label={item.nbTimeUsed}
                        />
                        <Chip
                          sx={{
                            fontSize: "0.7125rem",
                          }}
                          size="small"
                          label={item.priceRange}
                        />
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          marginLeft: "auto",
                          marginRight: 0,
                          minWidth: "0px",
                          color: "#9fafce",
                          backgroundColor: "#10377a",
                          fontSize: "0.680rem",
                          height: "17px",
                          "&:hover": {
                            backgroundColor: "#10377a",
                            color: "#ffffff",
                          },
                        }}
                        onClick={(e) => {
                          console.log(e);
                          var p = {
                            itinaryId: itinary.id,
                            pointOfInterestId: item.id,
                            userCreateId: user.sub,
                          };
                          postAddSuggestions(p);
                        }}
                      >
                        +
                      </Button>
                    </ListItem>
                  ))}
              </Paper>
            </>
          )}
          <PointModal
            readonly={readonly}
            open={openPointModal}
            close={handleClosePointModal}
            point={pointForUpdate}
            refreshPoints={fetchPoints}
            success={() => {
              setOpenSuccessNotif(true);
            }}
            error={() => {
              setOpenErrorNotif(true);
            }}
          />
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBuffer}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Map;
