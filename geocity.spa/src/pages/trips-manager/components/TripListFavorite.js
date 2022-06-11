import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../../common/API/API";
import TripsList from "../../../common/components/TripsList";

export const TripListFavorite = (props) => {
  const { user, isAuthenticated } = useAuth0();

  // RETRIEVED DATA
  const [trips, setTrips] = React.useState([]);

  // COMPONENT HIDE SHOW
  const [loading, setLoading] = React.useState(false);

  const fetchTrips = () => {
    setLoading(true);
    API.get(`TripUserFavorite/${user.sub}`)
      .then((res) => {
        console.log(res.data);
        setTrips(
          res.data.map((x) => ({ id: x.id, isOwner: x.isOwner, ...x.trip }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTrips();
    }
  }, [user]);

  useEffect(() => {
    console.log(trips);
  }, [trips]);

  return (
    <>
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {!loading && <TripsList data={trips} edit={true} />}
    </>
  );
};

export default TripListFavorite;
