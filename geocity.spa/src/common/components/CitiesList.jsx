import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";

export const CitiesList = (props) => {
  return (
    <>
      {props.data &&
        props.data.map((city) => {
          return <CityCard key={city.id} data={city} />;
        })}
    </>
  );
};
export default CitiesList;
