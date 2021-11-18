
import React, { useState, useEffect, useMemo } from 'react';
import { useMapEvents, Marker, Tooltip } from 'react-leaflet';
import PointOfInterest from './PointOfInterest'
import nextId from "react-id-generator";

export const PointOfInterestList = (props) => {
  const [pointOfInterests, setpointOfInterests] = useState([]); // the lifted state

  useEffect(() => {
      console.log("RERENDER", pointOfInterests)
      props.sendDataToParent(pointOfInterests)
  })

  useMapEvents({
    click(e) {
      console.log("FROM PARENT")
      console.log("ADD", {
        id: nextId(),
        position: [e.latlng.lat, e.latlng.lng]
      })
      setpointOfInterests([...pointOfInterests, {
        id: nextId(),
        position: [e.latlng.lat, e.latlng.lng]
      }]);
    },
  })

  return (
    <div>
      { pointOfInterests &&
        pointOfInterests.map((p) => (
          <Marker
            draggable={true}
            eventHandlers={{
              click: (e) => {
                setpointOfInterests(pointOfInterests.filter(p => p.id !== e.target.options.id));
              },
              dragend(e) {
                setpointOfInterests([...pointOfInterests.filter(p => p.id !== e.target.options.id), { id: e.target.options.id, position: [e.target._latlng.lat, e.target._latlng.lng]}]);
              },
            }}
            key={p.id}
            id={p.id}
            position={p.position}
          >
            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
              {p.id}
            </Tooltip>
          </Marker>
        ))
      }
    </div>
  )
}
export default PointOfInterestList;