import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import MapSideBar from "./MapSideBar";
import Pointer from "./Pointer";
import Points from "./Points";
import PointModal from "./Modal/PointModal";
import API from "../../../common/API/API";
import "./Map.css";

export const Map = (props) => {
  // STATE FOR DATA
  const [city, setCity] = useState([]);
  const [points, setPoints] = useState([]);
  const [pointForUpdate, setPointForUpdate] = useState({});
  const [openPointModal, setOpenPointModal] = React.useState(false);

  // STATE COSMETICS
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [openSuccessNotif, setOpenSuccessNotif] = React.useState(false);
  const [openErrorNotif, setOpenErrorNotif] = React.useState(false);
  const [zoomCluster, setZoomCluster] = React.useState(true);

  // OTHERS
  const [map, setMap] = useState(null);
  const featureGroupRef = useRef();
  const { cityId } = useParams();

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    fetchCity(cityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (city.id) {
      fetchPoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  useEffect(() => {
    if (points.length > 0) {
      if (zoomCluster) {
        ZoomInCluster();
        setZoomCluster(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, zoomCluster]);

  useEffect(() => {
    if (pointForUpdate.id) {
      setOpenPointModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointForUpdate]);

  useEffect(() => {
    ZoomInCluster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // UPDATE POINTS
  const handleUpdate = (point) => {
    setPointForUpdate({ ...point });
  };

  const handleClosePointModal = () => {
    setOpenPointModal(false);
    setPointForUpdate({});
  };

  // GET API CALLS
  const fetchCity = (id) => {
    setOpenBuffer(true);
    API.get(`City/${id}`)
      .then((res) => {
        setCity({
          id: res.data.id,
          createdDate: res.data.createdDate,
          modifiedDate: res.data.modifiedDate,
          name: res.data.name,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        });
        setOpenBuffer(false);
      })
      .catch((error) => {
        setOpenBuffer(false);
      });
  };

  const fetchPoints = () => {
    API.get(`PointOfInterest/${city.id}`)
      .then((res) => {
        setPoints([...res.data]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  // POST API CALLS
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
          osmId: POI.features[0].properties.osm_id.toString(),
          name: POI.features[0].properties.name,
          category: POI.features[0].properties.category,
          latitude: POI.features[0].geometry.coordinates[1],
          longitude: POI.features[0].geometry.coordinates[0],
          address: POI.features[0].properties.display_name,
          cityId: city.id,
        });
      })
      .catch((rejected) => {
      });
  };

  const postPointOfInterest = (poi) => {
    API.post(`PointOfInterest`, poi)
      .then((res) => {
        // REFRESH POINTS
        fetchPoints();
        setOpenSuccessNotif(true);
      })
      .catch((error) => {
        setOpenErrorNotif(true);
      });
  };

  return (
    <>
      {Object.keys(city).length && (
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
            city={city}
            points={points}
            handleUpdate={handleUpdate}
            success={() => {
              setOpenSuccessNotif(true);
            }}
            error={() => {
              setOpenErrorNotif(true);
            }}
          />
          <MapContainer
            center={[city.latitude, city.longitude]}
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
            <Pointer AddPointOfInterest={AddPointOfInterest} />}
            <FeatureGroup ref={featureGroupRef}>
              <Points data={points} handleUpdate={handleUpdate} />
            </FeatureGroup>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <PointModal
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
