import React, { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../../common/API/API";
import TripsList from "../../../common/components/TripsList";

export const TripListFavorite = (props) => {
  const { user, isAuthenticated } = useAuth0();

  // RETRIEVED DATA
  const [trips, setTrips] = React.useState([]);

  // COMPONENT HIDE SHOW
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchTrips = () => {
      setLoading(true);
      API.get(`TripUserFavorite/${user.sub}`)
        .then((res) => {
          setTrips(
            res.data.map((x) => ({ id: x.id, isOwner: x.isOwner, ...x.trip }))
          );
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    if (isAuthenticated) {
      fetchTrips();
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {!loading && <TripsList data={trips} edit={false} />}
    </>
  );
};

export default TripListFavorite;
