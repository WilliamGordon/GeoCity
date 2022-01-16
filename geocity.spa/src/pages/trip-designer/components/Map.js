import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import MapSideBar from './MapSideBar'
import PlaceList from "./PlaceList";
import RoutingControl from '../routing/RoutingControl'
import ItinaryPlaceCreateUpdateModal from './ItinaryPlaceCreateUpdateModal'

export const Map = (props) => {
  const [itinary, setItinary] = useState({});
  const [itinaryList, setItinaryList] = useState([]);
  const [itinaryPlace, setItinaryPlace] = useState({});
  const [itinaryPlaceList, setItinaryPlaceList] = useState([]);
  const [isRouteGenerated, setIsRouteGenerated] = useState(false);
  const [open, setOpen] = useState(false);
  const routingMachine = useRef();

  useEffect(() => {
    var itinariesTest = [];
    var placesForItinary = [];
    props.trip.itinaries.forEach(itinary => {
      var i = {
        id: itinary.id,
        name: itinary.name,
        description: itinary.description,
        distance: itinary.distance,
        duration: itinary.duration,
      };
      itinary.itinaryPlaces.forEach(itinaryPlace => {
        var ip = {
          id: itinaryPlace.id,
          itinaryId: itinary.id,
          name: itinaryPlace.name,
          description: itinaryPlace.description,
          duration: itinaryPlace.duration,
          price: itinaryPlace.price,
          latitude: itinaryPlace.place.latitude,
          longitude: itinaryPlace.place.longitude,
        }
        placesForItinary.push(ip);
      });
      itinariesTest.push(i);
    });
    setItinary(itinariesTest[0]);
    setItinaryList(itinariesTest);
    setItinaryPlaceList(placesForItinary);
  }, [])
  useEffect(() => {
    if (isRouteGenerated) {
      if (routingMachine.current) {
        var itiplace = [];
        itinaryPlaceList.forEach(ip => {
          if (itinary.id == ip.itinaryId) {
            itiplace.push([ip.latitude, ip.longitude])
          }
        });

        routingMachine.current.setWaypoints(itiplace);
      }
    } else {
      if (routingMachine.current) {
        routingMachine.current.setWaypoints([]);
      }
    }
  });
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
  const addItinaryPlace = (p) => {
    setItinaryPlaceList([...itinaryPlaceList, p]);
  }
  const updateItinaryPlace = (p) => setItinaryPlaceList([...itinaryPlaceList.filter(x => x.id !== p.id), p]);
  const toggleItinary = (id) => {
    itinaryList.forEach(itinary => {
      console.log(id)
      if (itinary.id == id) {
        setItinary(itinary);
        console.log(itinary)
      }
    })
  }
  return (
    <>
      <MapSideBar
        handleOpen={handleOpen}
        trip={props.trip}
        itinary={itinary}
        itinaryList={itinaryList}
        itinaryPlaceList={itinaryPlaceList}
        switchItinary={toggleItinary}
        generateRoute={generateRoute}
        isRouteGenerated={isRouteGenerated}
      />
      <MapContainer
        center={[props.trip.city.latitude, props.trip.city.longitude]}
        zoom={12}
        minZoom={8}
        style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }} >
        <PlaceList
          removeMarker={removeMarker}
          handleOpen={handleOpen}
          tripIsGenerated={props.isRouteGenerated}
          itinary={itinary}
          itinaryPlaceList={itinaryPlaceList}
          trip={props.trip} />
        <RoutingControl
          ref={routingMachine}
          itinary={itinary}
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
        itinary={itinary}
        itinaryPlace={itinaryPlace}
        handleClose={handleClose} />
    </>
  )
}

export default Map;