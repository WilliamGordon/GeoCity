
import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker, Tooltip } from 'react-leaflet';
import nextId from "react-id-generator";

export const PointOfInterestList = (props) => {
  const [pointOfInterestList, setPointOfInterestList] = useState([]);

  useEffect(() => {
    console.log("RERENDER POIS", pointOfInterestList)
    props.sendDataToParent(pointOfInterestList);
  })

  const addMarker = (marker) => {
    setPointOfInterestList([...pointOfInterestList, marker]);
  }

  const removeMarker = (id) => {
    setPointOfInterestList(pointOfInterestList.filter(p => p.id !== id));
  }

  const updateMarker = (marker) => {
    setPointOfInterestList([...pointOfInterestList.filter(p => p.id !== marker.id), { id: marker.id, position: marker.position }]);
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
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
              {p.id}
            </Tooltip>
          </Marker>
        ))
      }
    </>
  )
}
export default PointOfInterestList;