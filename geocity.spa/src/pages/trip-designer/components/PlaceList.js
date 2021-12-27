
import React, { useState, useEffect } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';

export const PlaceList = (props) => {
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    var placesForItinary = []; 
    props.trip.itinaries.forEach(itinary => {
      itinary.itinaryPlaces.forEach(itinaryPlace => {
        placesForItinary.push({
          id: itinaryPlace.id,
          position: [itinaryPlace.place.latitude, itinaryPlace.place.longitude]
        });
      });
    });
    setPlaceList(placesForItinary);
  }, [])

  useEffect(() => {
    props.sendDataToParent(placeList);
  })

  const addMarker = (marker) => {
    if (!props.tripIsGenerated) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ItinaryId: props.trip.itinaries[0].id,
          Name: "none",
          latitude: marker.position[0],
          Longitude: marker.position[1],
          Description: "none",
          Price: 0,
          Duration: 0,
        })
      };
      fetch('https://localhost:44396/api/ItinaryPlace', requestOptions)
        .then(response => response.json())
        .then(itinaryPlaceId => {
          marker.id = itinaryPlaceId;
          setPlaceList([...placeList, marker]);
        }).catch(rejected => {
          console.log(rejected)
        });
    }
  }

  const removeMarker = (id) => {
    if (!props.tripIsGenerated) {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      };
      console.log(requestOptions)
      console.log(id)
      fetch('https://localhost:44396/api/ItinaryPlace/' + id, requestOptions)
        .then(response => response.json())
        .then(itinaryPlaceId => {
          setPlaceList(placeList.filter(p => p.id !== id));
        }).catch(rejected => {
          console.log(rejected)
        });
    }
  }

  const updateMarker = (marker) => {
    if (!props.tripIsGenerated) {
      setPlaceList([...placeList.filter(p => p.id !== marker.id), { id: marker.id, position: marker.position }]);
    }
  }

  useMapEvents({
    click(e) {
      addMarker({
        id: 0,
        position: [e.latlng.lat, e.latlng.lng]
      })
    },
  })

  return (
    <>
      { 
        placeList.map((p) => (
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
export default PlaceList;