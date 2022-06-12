import React, { useEffect, useState, useRef } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

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

export const Pointer = (props) => {
  const [point, setPoint] = useState({});

  useMapEvents({
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
      <Popup className="pointer-popup-suggestion">
        <Button
          onClick={(e) => {
            props.AddPointOfInterest({
              latitude: point.latitude,
              longitude: point.longitude,
            });
            setPoint({});
          }}
          sx={styleButton}
        >
          POI
        </Button>
      </Popup>
    </Marker>
  ) : null;
};

export default Pointer;
