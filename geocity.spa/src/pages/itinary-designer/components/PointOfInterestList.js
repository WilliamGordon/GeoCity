
import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import nextId from "react-id-generator";

export const PointOfInterestList = (props) => {
  const [pointOfInterestList, setPointOfInterestList] = useState([]);

  useEffect(() => {
    props.sendDataToParent(pointOfInterestList);
  })

  const addMarker = (marker) => {
    if (!props.itinaryIsGenerated) {
      setPointOfInterestList([...pointOfInterestList, marker]);
    }
  }

  const removeMarker = (id) => {
    if (!props.itinaryIsGenerated) {
      setPointOfInterestList(pointOfInterestList.filter(p => p.id !== id));
    }
  }

  const updateMarker = (marker) => {
    if (!props.itinaryIsGenerated) {
      setPointOfInterestList([...pointOfInterestList.filter(p => p.id !== marker.id), { id: marker.id, position: marker.position }]);
    }
  }

  useMapEvents({
    click(e) {
      addMarker({
        id: nextId(),
        position: [e.latlng.lat, e.latlng.lng]
      })
    },
  })

  return (
    <>
      { 
        pointOfInterestList.map((p) => (
          <Marker
            draggable={true}
            key={p.id}
            id={p.id}
            position={p.position}
            eventHandlers={{
              click: (e) => {
                removeMarker(e.target.options.id);
              },
              dragend(e) {
                updateMarker({
                  id: e.target.options.id,
                  position: [e.target._latlng.lat, e.target._latlng.lng]
                })
              },
            }}
          >
          </Marker>
        ))
      }
    </>
  )
}
export default PointOfInterestList;