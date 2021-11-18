
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

export const PointOfInterest = (props) => {
  const [position, setPosition] = useState(props.pointOfInterest.position)
  const [id] = useState(props.pointOfInterest.key)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        setPosition(markerRef.current.getLatLng())
        props.updatePointOfInterestFromList({
          id : id,
          position : position
        });
      },
      click() {
        markerRef.current.remove();
        props.removePointOfInterestFromList({
          id : id,
          position : position
        });
      }
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      key={id}
      id={id}
      ref={markerRef}
      position={position}
    >
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        {id}
      </Tooltip>
    </Marker>
  )
}
export default PointOfInterest;