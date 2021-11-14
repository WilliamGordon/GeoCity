
import React, { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import PointOfInterest from './PointOfInterest'
import nextId from "react-id-generator";

export const PointOfInterestList = (props) => {

  useEffect(() => {
    console.log("RERENDER", props.pointOfInterests)
  }, [])

  const addPointOfInterest = useMapEvents({
    click(e) {
      console.log("ADD")
      console.log(props.pointOfInterests)
      let _pointOfInterests = props.pointOfInterests;
      _pointOfInterests.push({ 
        key: nextId(),
        position: [e.latlng.lat, e.latlng.lng]
      })
      console.log(_pointOfInterests)
      props.sendDataToParent(_pointOfInterests)
    },
  })

  const removePointOfInterest = (id) => {
    console.log("REMOVE")
    console.log(props.pointOfInterests)
    let _pointOfInterests = props.pointOfInterests.filter((item) => item.key !== id);
    console.log(_pointOfInterests)
    props.sendDataToParent(_pointOfInterests)
  }

  const updatePointOfInterest = (id, position) => {
    console.log("UPDATE")
    
    let _pointOfInterests = props.pointOfInterests;
    _pointOfInterests.forEach(poi => {
      if (poi.key == id) {
        poi.position = position;
      }
    });
    props.sendDataToParent(_pointOfInterests)
  }

  return (
    <div>
      { 
        props.pointOfInterests && 
        props.pointOfInterests.map((p) => {
          return <PointOfInterest 
            key={p.key}
            pointOfInterest={p}
            pointOfInterests={props.pointOfInterests}
            updatePointOfInterest={updatePointOfInterest} 
            removePointOfInterest={removePointOfInterest} 
            />
        })
      }
    </div>
  )
}
export default PointOfInterestList;