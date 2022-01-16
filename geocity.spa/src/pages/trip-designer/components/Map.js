import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import MapSideBar from './MapSideBar'
import PlaceList from "./PlaceList";
import RoutingControl from '../routing/RoutingControl'
import ItinaryPlaceCreateUpdateModal from './ItinaryPlaceCreateUpdateModal'

export const Map = (props) => {
  const [itinaryPlace, setItinaryPlace] = useState({});
  const [itinaryPlaceList, setItinaryPlaceList] = useState([]);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [open, setOpen] = useState(false);
  const routingMachine = useRef();

  const handleOpen = (e) => {
    console.log(e.id)
    if (e.id) {
      fetch('https://localhost:44396/api/ItinaryPlace/' + e.id)
        .then(response => response.json())
        .then(tripData => {
          setOpen(true);
          setItinaryPlace(tripData)
        }).catch(rejected => {
          console.log(rejected)
        });
    } else {
      setOpen(true);
      setItinaryPlace(e)
    }
  }

  const handleClose = () => {
    setOpen(false);
    setItinaryPlace({})
  }

  useEffect(() => {
    var placesForItinary = [];
    props.trip.itinaries.forEach(itinary => {
      itinary.itinaryPlaces.forEach(itinaryPlace => {
        placesForItinary.push({
          id: itinaryPlace.id,
          name: itinaryPlace.name,
          description: itinaryPlace.description,
          duration: itinaryPlace.duration,
          price: itinaryPlace.price,
          latitude: itinaryPlace.place.latitude,
          longitude: itinaryPlace.place.longitude,
        });
      });
    });
    console.log(props.trip);
    console.log(placesForItinary);
    setItinaryPlaceList(placesForItinary);
  }, [])

  const removeMarker = (id) => {
    if (!props.tripIsGenerated) {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch('https://localhost:44396/api/ItinaryPlace/' + id, requestOptions)
        .then(response => response.json())
        .then(itinaryPlaceId => {
          setItinaryPlaceList(itinaryPlaceList.filter(p => p.id !== id));
        }).catch(rejected => {
          console.log(rejected)
        });
    }
  }

  const generateRoute = () => isRouteGenerated ? setIsRouteGenerated(false) : setIsRouteGenerated(true);

  const addItinaryPlace = (p) => setItinaryPlaceList([...itinaryPlaceList, p]);
  const updateItinaryPlace = (p) => setItinaryPlaceList([...itinaryPlaceList.filter(x => x.id !== p.id), p]);

  useEffect(() => {
    if (isRouteGenerated) {
      if (routingMachine.current) {
        routingMachine.current.setWaypoints(itinaryPlaceList.map(x => [x.latitude, x.longitude]));
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
        handleOpen={handleOpen}
        itinaryPlaceList={itinaryPlaceList}
        generateRoute={generateRoute}
        isRouteGenerated={isRouteGenerated}
        trip={props.trip} />
      <MapContainer
        center={[props.trip.city.latitude, props.trip.city.longitude]}
        zoom={12}
        minZoom={8}
        style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }} >
        <PlaceList
          removeMarker={removeMarker}
          handleOpen={handleOpen}
          tripIsGenerated={props.isRouteGenerated}
          itinaryPlaceList={itinaryPlaceList}
          trip={props.trip} />
        <RoutingControl
          ref={routingMachine}
          waypoints={itinaryPlaceList} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <ItinaryPlaceCreateUpdateModal
        addItinaryPlace={addItinaryPlace}
        updateItinaryPlace={updateItinaryPlace}
        open={open}
        trip={props.trip}
        itinaryPlace={itinaryPlace}
        handleClose={handleClose} />
    </>
  )
}

export default Map;