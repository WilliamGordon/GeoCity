
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

export const PointOfInterest = (props) => {
  const [position, setPosition] = useState(props.pointOfInterest.position)
  const markerRef = useRef(null)

  useEffect(() => {
    console.log("RERENDER", props.pointOfInterests)
  }, [])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          // props.updatePointOfInterest(props.pointOfInterest.key, position);

        }
      },
      click() {
        markerRef.current.remove();
        console.log(position)
        console.log("HIT");
        console.log(props.pointOfInterests);
        // props.removePointOfInterest(props.pointOfInterest.key);
      }
    }),
    [],
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      key={props.pointOfInterest.key}
      id={props.pointOfInterest.key}
      ref={markerRef}
      position={position}
    >
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        {props.pointOfInterest.key}
      </Tooltip>
    </Marker>
  )
}
export default PointOfInterest;