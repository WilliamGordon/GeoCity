import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer
} from 'react-leaflet';
import { useGeoLocation } from '../../../common/hooks/useGeoLocation';
import PointOfInterestList from "./PointOfInterestList";
import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

export const Map = (props) => {
  const location = useGeoLocation();
  const rMachine = useRef();
  const [points, setPoints] = useState([]);

  const sendDataToParent = (data) => {
    setPoints(data)
    props.sendDataToParent(data);
  }

  useEffect(() => {
    console.log("RERENDER MAP", points)
    if (rMachine.current) {
      console.log(rMachine.current)
      let pois = [];
      points.forEach(element => {
        pois.push(element.position);
      });
      rMachine.current.setWaypoints(pois);
    }
  }, [points, rMachine]);

  if (location.loaded) {
    return (
      <>
        <MapContainer
          center={[location.coordinates.lat, location.coordinates.lng]}
          zoom={3}
          minZoom={3}
          style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }}
        >
          <PointOfInterestList sendDataToParent={sendDataToParent} />
          <RoutingControl ref={rMachine} waypoints={points}/>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={maps.base}
          />
        </MapContainer>
      </>
    )
  } else {
    return null;
  }
}

export default Map;