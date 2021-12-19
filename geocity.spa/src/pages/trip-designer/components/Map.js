import React, { useEffect, useState, useRef } from "react";
import MapSideBar from './MapSideBar'
import { MapContainer, TileLayer } from 'react-leaflet';
import { useGeoLocation } from '../../../common/hooks/useGeoLocation';
import PointOfInterestList from "./PointOfInterestList";
import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

export const Map = (props) => {
  const rMachine = useRef();
  const [pointOfInterestList, setPointOfInterestList] = useState([]);
  const [tripIsGenerated, setTripIsGenerated] = useState(false);
  
  const generateTrip = () => {
    if (tripIsGenerated) {
      setTripIsGenerated(false);
    } else {
      setTripIsGenerated(true);
    }
  }

  const sendDataToParent = (data) => {
    setPointOfInterestList(data)
  }

  useEffect(() => {
    console.log("RENDER")
      if (tripIsGenerated) {
        if (rMachine.current) {
          rMachine.current.setWaypoints(pointOfInterestList.map(x => x.position));
        }
      } else {
        if (rMachine.current) {
          rMachine.current.setWaypoints([]);
        }
      }
  });

    return (
      <>
        <MapSideBar 
          pointOfInterestList={pointOfInterestList} 
          generateTrip={generateTrip} 
          tripIsGenerated={tripIsGenerated}
          />
        <MapContainer
          center={[props.trip.city.latitude, props.trip.city.longitude]}
          zoom={12}
          minZoom={8}
          style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }}
        >
          <PointOfInterestList 
            sendDataToParent={sendDataToParent} 
            tripIsGenerated={props.tripIsGenerated} />
          <RoutingControl 
            ref={rMachine} 
            waypoints={pointOfInterestList}/>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={maps.base}
          />
        </MapContainer>
      </>
    )
}

export default Map;