import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import { useGeoLocation } from '../../../common/hooks/useGeoLocation';
import PointOfInterestList from './PointOfInterestList'

export const ItinaryMap = (props) => {
  const location = useGeoLocation();

  if (location.loaded) {
    return (
      <MapContainer
        center={[location.coordinates.lat, location.coordinates.lng]}
        zoom={14}
        minZoom={12}
        style={{ height: '100vh', width: '67%', float: "right", position: "fixed", left: "33%", top: "65px" }}
      >
        <PointOfInterestList sendDataToParent={props.sendDataToParent} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    )
  } else {
    return null;
  }
}

export default ItinaryMap;