import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";

export const TripsList = (props) => {
  useEffect(() => {
    console.log(props.data);
    console.log(props.edit);
  }, [props.data]);

  return (
    <>
      {props.data &&
        props.data.map((trip) => {
          return <TripCard key={trip.id} data={trip} edit={props.edit} />;
        })}
    </>
  );
};
export default TripsList;
