
import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const styleButton = {
  marginBottom: "15px !important",
  color: '#9fafce',
  backgroundColor: "#10377a",
  margin: "0 auto",
  '&:hover': {
    backgroundColor: "#10377a", color: 'red'
  }
}

export const PlaceList = (props) => {
  const addMarker = (marker) => {
    // CREATE ItinaryPlace With Modal
    console.log(marker.position[0]);
    console.log(marker.position[1]);
    props.handleOpen({
      id: 0,
      latitude: marker.position[0],
      longitude: marker.position[1],
    });
  }

  // const updateMarker = (marker) => {
  //   if (!props.tripIsGenerated) {
  //     itinaryPlaceList([...itinaryPlaceList.filter(p => p.id !== marker.id), { id: marker.id, position: marker.position }]);
  //   }
  // }

  useMapEvents({
    click(e) {
      addMarker({
        id: 0,
        position: [e.latlng.lat, e.latlng.lng]
      })
    },
  })

  return (
    <>
      {
        props.itinaryPlaceList &&
        props.itinaryPlaceList.map((p) => {
          if (props.itinary.id == p.itinaryId) {
            return <Marker
              draggable={true}
              key={p.id}
              id={p.id}
              position={[p.latitude, p.longitude]}
              eventHandlers={{
                dragend(e) {
                  // updateMarker({
                  //   id: e.target.options.id,
                  //   position: [e.target._latlng.lat, e.target._latlng.lng]
                  // })
                },
              }}
            >
              <Popup>
                {p.id}
                {p.name}
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => props.handleOpen(p)}
                  sx={styleButton}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => props.removeMarker(p.id)}
                  sx={styleButton}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Popup>
            </Marker>
          }
        })
      }
    </>
  )
}
export default PlaceList;