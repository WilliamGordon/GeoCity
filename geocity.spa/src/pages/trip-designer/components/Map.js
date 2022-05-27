import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import Points from "./Points";
import POCModal from "./Modal/POCModal";

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

export const Map = (props) => {
  const [trip, setTrip] = useState({});
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
  const [itinary, setItinary] = useState({});
  const [pointOfCrossing, setPointOfCrossing] = useState([]);
  const [pointOfInterest, setPointOfInterest] = useState([]);
  const [pointOfCrossingForUpdate, setPointOfCrossingForUpdate] = useState({});
  const [pointOfInterestForUpdate, setPointOfInterestForUpdate] = useState({});
  const [openPOCModal, setOpenPOCModal] = React.useState(false);
  const [openPOIModal, setOpenPOIModal] = React.useState(false);
  const [openBuffer, setOpenBuffer] = React.useState(false);

  let { tripId } = useParams();

  useEffect(() => {
    setOpenBuffer(true);
    fetch("https://localhost:44396/api/Trip/" + tripId)
      .then((response) => response.json())
      .then((tripData) => {
        setOpenBuffer(false);
        console.log(tripData);
        setTrip({
          id: tripData.id,
          city: tripData.city,
          days: tripData.day,
        });
        setItinary({
          id: tripData.itinaries[0].id,
          day: tripData.itinaries[0].day,
          distance: tripData.itinaries[0].distance,
          duration: tripData.itinaries[0].duration,
        });
        setPointOfCrossing(tripData.itinaries[0].itinaryPointOfCrossing);
        setPointOfInterest(tripData.itinaries[0].itinaryPointOfInterest);
        setTripIsLoaded(true);
      })
      .catch((rejected) => {
        setOpenBuffer(false);
      });
  }, []);

  const AddPointOfCrossing = (point) => {
    // Call API to create PointOfCrossing
    fetch("https://localhost:44396/api/ItinaryPointOfCrossing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
        setPointOfCrossing((previousState) => [
          ...previousState,
          {
            id: result,
            latitude: point.latitude,
            longitude: point.longitude,
          },
        ]);
      })
      .catch((rejected) => {
        console.log(rejected);
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
        console.log(POI);
        fetch("https://localhost:44396/api/ItinaryPointOfInterest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
            setPointOfInterest((previousState) => [
              ...previousState,
              {
                id: result,
                latitude: POI.features[0].geometry.coordinates[1],
                longitude: POI.features[0].geometry.coordinates[0],
              },
            ]);
          })
          .catch((rejected) => {
            console.log(rejected);
          });
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const Pointer = () => {
    const [point, setPoint] = useState({});

    const map = useMapEvents({
      click(e) {
        setPoint({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });

    return point.latitude ? (
      <Marker
        key={point.id}
        id={point.id}
        position={[point.latitude, point.longitude]}
      >
        <Popup>
          <Button
            onClick={(e) =>
              AddPointOfInterest({
                latitude: point.latitude,
                longitude: point.longitude,
              })
            }
            sx={styleButton}
          >
            POI
          </Button>
          <Button
            onClick={(e) =>
              AddPointOfCrossing({
                latitude: point.latitude,
                longitude: point.longitude,
              })
            }
            sx={styleButton}
          >
            POC
          </Button>
        </Popup>
      </Marker>
    ) : null;
  };

  useEffect(() => {
    console.log("UPDATED");
    if (pointOfCrossingForUpdate.id) {
      setOpenPOCModal(true);
    }
  }, [pointOfCrossingForUpdate]);

  const handlePointOfCrossingUpdate = (POC) => {
    setPointOfCrossingForUpdate(POC);
    console.log("onOpen");
  };

  const handlePointOfInterestUpdate = (type, point) => {
    // setPointOfCrossingForUpdate(point);
    // setOpenPOCModal(true);
  };

  const handleClose = () => {
    setOpenPOCModal(false);
    setPointOfCrossingForUpdate({});
    console.log("onClose");
  };

  return (
    <>
      {tripIsLoaded && (
        <>
          <MapContainer
            center={[trip.city.latitude, trip.city.longitude]}
            zoom={12}
            minZoom={8}
            style={styleMapContainer}
          >
            <Pointer />
            <Points
              key="PointOfCrossing"
              data={pointOfCrossing}
              handleUpdate={handlePointOfCrossingUpdate}
            />
            <Points
              key="PointOfInterest"
              data={pointOfInterest}
              handleUpdate={handlePointOfInterestUpdate}
            />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <POCModal
            open={openPOCModal}
            close={handleClose}
            pointOfCrossing={pointOfCrossingForUpdate}
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
