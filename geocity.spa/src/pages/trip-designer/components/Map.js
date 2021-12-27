import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import MapSideBar from './MapSideBar'
import PlaceList from "./PlaceList";
import RoutingControl from '../routing/RoutingControl'

export const Map = (props) => {
  const [placeList, setPlaceList] = useState([]);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const routingMachine = useRef();
  
  const generateRoute = () => isRouteGenerated ? setIsRouteGenerated(false) : setIsRouteGenerated(true);

  const sendDataToParent = (data) => setPlaceList(data);

  useEffect(() => {
      if (isRouteGenerated) {
        if (routingMachine.current) {
          routingMachine.current.setWaypoints(placeList.map(x => x.position));
        }
      } else {
        if (routingMachine.current) {
          routingMachine.current.setWaypoints([]);
        }
      }
  });

    return (
      <>
        <MapSideBar 
          placeList={placeList} 
          generateRoute={generateRoute} 
          isRouteGenerated={isRouteGenerated}
          trip={props.trip} />
        <MapContainer
          center={[props.trip.city.latitude, props.trip.city.longitude]}
          zoom={12}
          minZoom={8}
          style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }} >
          <PlaceList 
            sendDataToParent={sendDataToParent}
            tripIsGenerated={props.isRouteGenerated} 
            trip={props.trip} />
          <RoutingControl 
            ref={routingMachine} 
            waypoints={placeList}/>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </>
    )
}

export default Map;