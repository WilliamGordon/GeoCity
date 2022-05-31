import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";

export const Trips = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((trip) => {
          return <TripCard data={trip} />;
        })}
    </>
  );
};
export default Trips;
