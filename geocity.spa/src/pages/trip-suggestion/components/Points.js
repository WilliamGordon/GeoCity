import React, { useState, useEffect } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import L from "leaflet";
import "./Map.css";

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

function GetIcon(type) {
  return L.icon({
    iconUrl: require("../../../assets/icons/pin-" + type + ".svg").default,
    iconSize: new L.Point(40, 40),
    iconAnchor: [19, 41],
    popupAnchor: [0, -40],
    tooltipAnchor: [15, -30],
  });
}

export const Points = (props) => {
  return (
    <>
      {Object.keys(props.data).length !== 0 &&
        props.data.map((p) => {
          // Only show point for the currently selected itinary
          return (
            <Marker
              key={p.id}
              id={p.id}
              position={[p.latitude, p.longitude]}
              icon={GetIcon(p.osmId ? "poi" : "poc")}
            >
              {p.osmId && <Tooltip>{p.name}</Tooltip>}
              {!p.osmId && <Tooltip>Step #{p.id.slice(0, 5)}</Tooltip>}
              <Popup className="point-popup">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => {
                    props.handleUpdate(p);
                  }}
                  sx={styleButton}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => props.handleDelete(p)}
                  sx={styleButton}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
};
export default Points;
