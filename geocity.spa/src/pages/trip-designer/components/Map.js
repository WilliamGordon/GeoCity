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
  Collapse,
  Box,
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
import * as ELG from "esri-leaflet-geocoder";
import "./Map.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

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
  const [searchPoint, setSearchPoint] = React.useState({});

  // STATE COSMETICS
  const [readonly, setReadonly] = React.useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [openSuccessNotif, setOpenSuccessNotif] = React.useState(false);
  const [successNotif, setSuccessNotif] = React.useState(false);
  const [openErrorNotif, setOpenErrorNotif] = React.useState(false);
  const [errorNotif, setErrorNotif] = React.useState(false);

  const [zoomCluster, setZoomCluster] = React.useState(true);
  const [expandedSuggestion, setexpandedSuggestion] = React.useState(false);
  const [searchFunctionAdded, setSearchFunctionAdded] = React.useState(false);

  // OTHERS
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  const routingMachine = useRef();
  const { tripId } = useParams();
  const { user } = useAuth0();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    fetchTrip(tripId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReadonly(props.readonly);
  }, [props.readonly]);

  useEffect(() => {
    if (trip.id && !props.readonly) {
      fetchTripUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip, user]);

  useEffect(() => {
    if (trip.itinaries) {
      fetchItinary(trip.itinaries[0].id); // Fetch the first itinary by default
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  useEffect(() => {
    if (pointForUpdate.id) {
      setOpenPointModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointForUpdate]);

  useEffect(() => {
    if (itinary.id) {
      setZoomCluster(true);
      fetchPoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinary]);

  useEffect(() => {
    if (points.length > 0) {
      if (zoomCluster) {
        ZoomInCluster();
        setZoomCluster(false);
      }
      if(trip.isPublished) {
        generateRoute();
      } 
      fetchSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  useEffect(() => {
    if (infoForItinaryUpdate) {
      putItinary({
        id: itinary.id,
        distance: infoForItinaryUpdate.distance,
        duration: infoForItinaryUpdate.duration,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoForItinaryUpdate]);

  useEffect(() => {
    ZoomInCluster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if(!props.readonly) {
      if (map && trip) {
        if (!searchFunctionAdded) {
          const searchControl = new ELG.Geosearch({
            position: "topright",
            placeholder: "Enter an address or place e.g. 1 York St",
            useMapBounds: false,
            providers: [
              ELG.arcgisOnlineProvider({
                apikey:
                  "AAPKf36f375d73c448b0bb7a68a9759cb2c4EesZUIK2HKA1XeztBxliNBzFL_h6CJJUHcVYzDGlinMiIF5BOrpoTB-iHWA2AwIO",
                nearby: {
                  lat: trip.city.latitude,
                  lng: trip.city.longitude,
                },
              }),
            ],
          }).addTo(map);
          searchControl.on("results", function (data) {
            setSearchPoint({
              latitude: data.latlng.lat,
              longitude: data.latlng.lng,
            });
          });
          setSearchFunctionAdded(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, trip, props.readonly]);

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

    fetch(
      "https://nominatim.openstreetmap.org/reverse?lat=" +
        point.latitude +
        "&lon=" +
        point.longitude +
        "&format=geojson"
    )
      .then((response) => response.json())
      .then((POI) => {
        postPointOfCrossing({
          userCreateId: user.sub,
          itinaryId: itinary.id,
          pointOfCrossing: {
            cityId: trip.city.id,
            latitude: point.latitude,
            longitude: point.longitude,
            address: POI.features[0].properties.display_name,
          },
        });
      })
      .catch((rejected) => {
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
            address: POI.features[0].properties.display_name,
          },
        });
      })
      .catch((rejected) => {
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
      deletePointOfInterest(point.id, point.modifiedDate);
    } else {
      deletePointOfCrossing(point.id, point.modifiedDate);
    }
  };

  // ROUTING NEW
  const generateRoute = () => {
    if (isRouteGenerated === false) {
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
      routingMachine.current.setWaypoints(itiplace);
    }
  };

  const deleteRoute = () => {
    if (routingMachine.current) {
      routingMachine.current.setWaypoints([]);
      setIsRouteGenerated(false);
    }
  };

  const getInfoRoute = (e) => {
    if (!trip.isPublished) {
      setInfoForItinaryUpdate(e);
    }
    setIsRouteGenerated(true);
  };

  const switchItinary = (id) => {
    deleteRoute();
    fetchItinary(id);
  };

  const handleSuccess = (msg) => {
    setOpenSuccessNotif(true);
    setSuccessNotif(msg)
  } 

  const handleError = (err) => {
    setOpenErrorNotif(true);
    var errorMsg = "";
    if(err.request) {
      if (err.request.responseText) {
        errorMsg = err.request.responseText;
      }
    }
    setErrorNotif(errorMsg)
  } 

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
        handleError(error);
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
        handleError(error);
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
        handleError(error);
      });
  };

  // POST API CALLS
  const postPointOfInterest = (poi) => {
    API.post(`ItinaryPointOfInterest`, poi)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        handleSuccess("The point was correctly added to your itinary");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const postAddSuggestions = (suggestion) => {
    API.post(`ItinaryPointOfInterest/AddSuggestion`, suggestion)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        handleSuccess("Suggestion correctly added to your itinary");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const postPointOfCrossing = (poc) => {
    API.post(`ItinaryPointOfCrossing`, poc)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        handleSuccess("The point has been correctly added to your itinary !");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  // PUT API CALLS
  const putItinary = (itinaryForUpdate) => {
    if (itinaryForUpdate.distance !== undefined) {
      API.put(`Itinary`, itinaryForUpdate)
        .then((res) => {
          fetchItinary(itinary.id);
          handleSuccess("The itinary was correctly updated !");
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  // DELETE API CALLS
  const deletePointOfInterest = (id, modifiedDate) => {
    API.delete(`ItinaryPointOfInterest/${id}/${modifiedDate}`)
      .then((res) => {
        fetchPoints();
        handleSuccess("The point was correctly deleted !");
      })
      .catch((error) => {
        fetchItinary(itinary.id);
        handleError(error);
      });
  };

  const deletePointOfCrossing = (id, modifiedDate) => {
    API.delete(`ItinaryPointOfCrossing/${id}/${modifiedDate}`)
      .then((res) => {
        fetchPoints();
        handleSuccess("The point was correctly deleted !");
      })
      .catch((error) => {
        fetchItinary(itinary.id);
        handleError(error);
      });
  };

  return (
    <>
      {Object.keys(trip).length && (
        <>
          <Snackbar
            open={openSuccessNotif}
            autoHideDuration={3000}
            onClose={() => {
              setOpenSuccessNotif(false);
              setSuccessNotif("");
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
                setSuccessNotif("");
              }}
              severity="success"
              sx={{ width: "100%" }}
              variant="filled"
            >
              {successNotif ? successNotif : ""}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorNotif}
            autoHideDuration={3000}
            onClose={() => {
              setOpenErrorNotif(false);
              setErrorNotif("");
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
                setErrorNotif("");
              }}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              {errorNotif ? errorNotif : "Oups something went wrong !"}
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
            success={(msg) => {
              handleSuccess(msg);
            }}
            error={(msg) => {
              handleError(msg);
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
                searchPoint={searchPoint}
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
                  maxHeight: "35vh",
                  paddingTop: "0.5%",
                  paddingLeft: "0.5%",
                  paddingRight: "0.5%",
                  boxSizing: "border-box",
                  backgroundColor: "#eceff1",
                  flexShrink: 0,
                  minWidth: "25%",
                  float: "left",
                  position: "fixed",
                  left: "74%",
                  bottom: "2%",
                  overflow: "auto",
                  marginTop: "15px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    marginLeft: "auto",
                    marginRight: 0,
                    color: "#9fafce",
                    backgroundColor: "#10377a",
                    fontSize: "0.680rem",
                    height: "30px",
                    width: "100%",
                    margin: "0 auto",
                    marginBottom: "15px",
                    "&:hover": {
                      backgroundColor: "#10377a",
                      color: "#ffffff",
                    },
                  }}
                  onClick={(e) => {
                    setexpandedSuggestion(!expandedSuggestion);
                  }}
                >
                  Open Suggestions Tab
                </Button>
                <Collapse in={expandedSuggestion} timeout="auto">
                  <Box
                    style={{
                      minHeight: "35vh",
                    }}
                  >
                    {suggestions.length !== 0 &&
                      suggestions.map((item, index) => (
                        <ListItem sx={styleBorder} key={index}>
                          <ListItemIcon>
                            <ExploreIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography
                            component={'span'}
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
                  </Box>
                </Collapse>
              </Paper>
            </>
          )}
          <PointModal
            readonly={readonly}
            open={openPointModal}
            close={handleClosePointModal}
            point={pointForUpdate}
            refreshPoints={fetchPoints}
            success={(msg) => {
              handleSuccess(msg);
            }}
            error={(msg) => {
              handleError(msg);
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
