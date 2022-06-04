import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import {
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import RoutingControl from "../routing/RoutingControl";
import MapSideBar from "./MapSideBar";
import Points from "./Points";
import PointModal from "./Modal/PointModal";
import L from "leaflet";
import API from "../../../common/API/API";
import "./Map.css";

const styleMapContainer = {
  height: "100vh",
  width: "67%",
  float: "right",
  position: "fixed",
  left: "33%",
  top: "65px",
};

const styleButton = {
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  margin: "0 auto",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "red",
  },
};

function GetIcon() {
  return L.icon({
    iconUrl: require("../../../assets/icons/pin.svg").default,
    iconSize: new L.Point(40, 40),
    iconAnchor: [19, 41],
    popupAnchor: [0, -50],
  });
}

export const Map = (props) => {
  const { user } = useAuth0();
  const [trip, setTrip] = useState({});
  const [itinary, setItinary] = useState({});
  const [itinaries, setItinaries] = useState([]);
  const [points, setPoints] = useState({});
  const [pointForUpdate, setPointForUpdate] = useState({});
  const [openPointModal, setOpenPointModal] = React.useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [openSuccessNotif, setOpenSuccessNotif] = React.useState(false);
  const [openErrorNotif, setOpenErrorNotif] = React.useState(false);
  const [isUserOWner, setIsUserOWner] = React.useState(false);
  const routingMachine = useRef();
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  let { tripId } = useParams();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    setOpenBuffer(true);
    fetch("https://localhost:44396/api/Trip/" + tripId)
      .then((response) => response.json())
      .then((tripData) => {
        setOpenBuffer(false);
        setTrip({
          id: tripData.id,
          name: tripData.name,
          city: tripData.city,
          days: tripData.day,
          link: tripData.link,
        });
        setItinary({
          id: tripData.itinaries[0].id,
          day: tripData.itinaries[0].day,
          distance: tripData.itinaries[0].distance,
          duration: tripData.itinaries[0].duration,
        });
        setItinaries(tripData.itinaries);
        setPoints(
          [
            ...tripData.itinaries[0].itinaryPointOfCrossing,
            ...tripData.itinaries[0].itinaryPointOfInterest,
          ].sort((a, b) => {
            return a.position - b.position;
          })
        );
        setTripIsLoaded(true);
      })
      .catch((rejected) => {
        setOpenBuffer(false);
      });
  }, []);

  useEffect(() => {
    setOpenBuffer(true);
    fetch("https://localhost:44396/api/TripUser/" + user.sub + "/" + tripId)
      .then((response) => response.json())
      .then((tripUser) => {
        setIsUserOWner(tripUser.isOwner);
      })
      .catch((rejected) => {
        setOpenBuffer(false);
      });
  }, []);

  useEffect(() => {
    if (pointForUpdate.id) {
      setOpenPointModal(true);
    }
  }, [pointForUpdate]);

  useEffect(() => {
    // Get all points for itinary
    if (itinary.id) {
      fetch("https://localhost:44396/api/Itinary/" + itinary.id)
        .then((response) => response.json())
        .then((itinaryData) => {
          setPoints(
            [
              ...itinaryData.itinaryPointOfCrossing,
              ...itinaryData.itinaryPointOfInterest,
            ].sort((a, b) => {
              return a.position - b.position;
            })
          );
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, [itinary]);

  useEffect(() => {
    // Get all points for itinary
    if (points.length > 0) {
      ZoomInCluster();
    }
  }, [points]);

  useEffect(() => {
    if (isRouteGenerated) {
      if (routingMachine.current) {
        var itiplace = [];
        points.forEach((ip) => {
          itiplace.push([ip.latitude, ip.longitude]);
        });
        routingMachine.current.setWaypoints(itiplace);
      }
    } else {
      if (routingMachine.current) {
        routingMachine.current.setWaypoints([]);
      }
    }
  });

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

  const refreshPoints = () => {
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

  // POINTER OBJECT
  const Pointer = () => {
    const [point, setPoint] = useState({});

    const map = useMapEvents({
      click(e) {
        if (point.latitude) {
          setPoint({});
        } else {
          setPoint({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          });
        }
      },
    });

    return point.latitude ? (
      <Marker
        key={point.id}
        id={point.id}
        position={[point.latitude, point.longitude]}
        icon={GetIcon()}
      >
        <Popup className="pointer-popup">
          <Button
            onClick={(e) => {
              AddPointOfInterest({
                latitude: point.latitude,
                longitude: point.longitude,
              });
              setPoint({});
            }}
            sx={styleButton}
          >
            POI
          </Button>
          <Button
            onClick={(e) => {
              AddPointOfCrossing({
                latitude: point.latitude,
                longitude: point.longitude,
              });
              setPoint({});
            }}
            sx={styleButton}
          >
            POC
          </Button>
        </Popup>
      </Marker>
    ) : null;
  };

  // ADDING POINTS
  const AddPointOfCrossing = (point) => {
    // Call API to create PointOfCrossing
    fetch("https://localhost:44396/api/ItinaryPointOfCrossing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userCreateId: user.sub,
        itinaryId: itinary.id,
        pointOfCrossing: {
          cityId: trip.city.id,
          latitude: point.latitude,
          longitude: point.longitude,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        refreshPoints();
        setOpenSuccessNotif(true);
      })
      .catch((rejected) => {
        setOpenErrorNotif(true);
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
        fetch("https://localhost:44396/api/ItinaryPointOfInterest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            refreshPoints();
            setOpenSuccessNotif(true);
          })
          .catch((rejected) => {
            setOpenErrorNotif(true);
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
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    var type = point.osmId
      ? "ItinaryPointOfInterest"
      : "ItinaryPointOfCrossing";
    fetch(
      "https://localhost:44396/api/" + type + "/" + point.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((pointId) => {
        refreshPoints();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  // SWITCH INITINARY
  const toggleItinary = (id) => {
    itinaries.forEach((itinary) => {
      if (itinary.id == id) {
        setItinary(itinary);
        ZoomInCluster();
      }
    });
  };

  // ROUTING
  const generateRoute = () => {
    if (isRouteGenerated) {
      setIsRouteGenerated(false);
    } else {
      setIsRouteGenerated(true);
    }
  };

  // NOTIFICATIONS
  const handleCloseSuccessNotif = () => {
    setOpenSuccessNotif(false);
  };

  const handleCloseErrorNotif = () => {
    setOpenErrorNotif(false);
  };

  const handleOpenSuccessNotif = () => {
    setOpenSuccessNotif(true);
  };

  const handleOpenErrorNotif = () => {
    setOpenErrorNotif(true);
  };

  return (
    <>
      {tripIsLoaded && (
        <>
          <Snackbar
            open={openSuccessNotif}
            autoHideDuration={1000}
            onClose={handleCloseSuccessNotif}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              marginTop: "55px",
            }}
          >
            <Alert
              onClose={handleCloseSuccessNotif}
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
            onClose={handleCloseErrorNotif}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              marginTop: "55px",
            }}
          >
            <Alert
              onClose={handleCloseErrorNotif}
              severity="error"
              sx={{ width: "100%" }}
              variant="filled"
            >
              Oups something went wrong !
            </Alert>
          </Snackbar>
          <MapSideBar
            trip={trip}
            isUserOWner={isUserOWner}
            itinary={itinary}
            itinaries={itinaries}
            points={points}
            switchItinary={toggleItinary}
            generateRoute={generateRoute}
            isRouteGenerated={isRouteGenerated}
            handleUpdate={handleUpdate}
          />
          <MapContainer
            center={[trip.city.latitude, trip.city.longitude]}
            zoom={14}
            minZoom={8}
            style={styleMapContainer}
            whenCreated={setMap}
          >
            <Pointer />
            <FeatureGroup ref={featureGroupRef}>
              <Points
                data={points}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            </FeatureGroup>
            <RoutingControl
              ref={routingMachine}
              itinary={itinary}
              waypoints={points}
            />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <PointModal
            open={openPointModal}
            close={handleClosePointModal}
            point={pointForUpdate}
            refreshPoints={refreshPoints}
            success={handleOpenSuccessNotif}
            error={handleOpenErrorNotif}
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
