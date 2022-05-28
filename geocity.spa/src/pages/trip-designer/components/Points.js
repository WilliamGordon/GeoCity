import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import L from "leaflet";

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
  });
}

export const Points = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((p) => {
          // Only show point for the currently selected itinary
          return (
            <Marker
              key={p.id}
              id={p.id}
              position={[p.latitude, p.longitude]}
              icon={GetIcon(p.osmId ? "poi" : "poc")}
            >
              <Popup>
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
