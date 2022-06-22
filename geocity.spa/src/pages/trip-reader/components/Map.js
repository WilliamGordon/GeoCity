import React, { useEffect, useState, createRef, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { Backdrop, CircularProgress } from "@mui/material";
import MapSideBar from "./MapSideBar";
import Points from "./Points";
import { useParams } from "react-router-dom";

const styleMapContainer = {
  height: "100vh",
  width: "67%",
  float: "right",
  position: "fixed",
  left: "33%",
  top: "65px",
};

export const Map = (props) => {
  const [trip, setTrip] = useState({});
  const [itinary, setItinary] = useState({});
  const [itinaries, setItinaries] = useState([]);
  const [points, setPoints] = useState({});
  const [openBuffer, setOpenBuffer] = React.useState(false);
  const [tripIsLoaded, setTripIsLoaded] = useState(false);
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
        setPoints([
          ...tripData.itinaries[0].itinaryPointOfCrossing,
          ...tripData.itinaries[0].itinaryPointOfInterest,
        ]);
        setTripIsLoaded(true);
      })
      .catch((rejected) => {
        setOpenBuffer(false);
      });
  }, []);

  useEffect(() => {
    // Get all points for itinary
    if (itinary.id) {
      fetch("https://localhost:44396/api/Itinary/" + itinary.id)
        .then((response) => response.json())
        .then((itinaryData) => {
          setPoints([
            ...itinaryData.itinaryPointOfCrossing,
            ...itinaryData.itinaryPointOfInterest,
          ]);
        })
        .catch((rejected) => {
        });
    }
  }, [itinary]);

  useEffect(() => {
    if (map) {
      ZoomInCluster();
    }
  }, [map]);

  // SWITCH INITINARY
  const toggleItinary = (id) => {
    itinaries.forEach((itinary) => {
      if (itinary.id == id) {
        setItinary(itinary);
      }
    });
  };

  const ZoomInCluster = () => {
    if (map) {
      const isEmpty =
        Object.keys(featureGroupRef.current.getBounds()).length === 0;
      if (!isEmpty) {
        map.fitBounds(featureGroupRef.current.getBounds());
      }
    }
  };

  return (
    <>
      {tripIsLoaded && (
        <>
          <MapSideBar
            trip={trip}
            itinary={itinary}
            itinaries={itinaries}
            points={points}
            switchItinary={toggleItinary}
          />
          <MapContainer
            center={[trip.city.latitude, trip.city.longitude]}
            zoom={14}
            minZoom={8}
            style={styleMapContainer}
            whenCreated={setMap}
          >
            <FeatureGroup ref={featureGroupRef}>
              <Points data={points} />
            </FeatureGroup>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
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
