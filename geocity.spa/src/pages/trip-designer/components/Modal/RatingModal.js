import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Rating } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../../../common/API/API";

export const RatingModal = (props) => {
  const [trip, setTrip] = useState({});
  const [tripUserRating, setTripUserRating] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [rating, setRating] = React.useState();

  useEffect(() => {
    setTrip(props.trip);
  }, [props.trip]);

  useEffect(() => {
    const fetchTripUserRating = (id) => {
      API.get(`TripUserRating/${id}/${user.sub}`)
        .then((res) => {
          setTripUserRating(res.data);
          setRating(res.data.rating);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };
    if (isAuthenticated) {
      if (trip !== undefined) {
        fetchTripUserRating(trip.id);
      }
    }
  }, [trip, user, isAuthenticated]);

  const postTripUserRating = (tur) => {
    API.post(`TripUserRating`, tur)
      .then((res) => {
        setRating(tur.rating);
        setTripUserRating((previous) => tur);
        props.success("Your rating has been added !");
      })
      .catch((error) => {
        props.error(error);
      });
  };

  const updateTripUserRating = (tur) => {
    API.put(`TripUserRating`, tur)
      .then((res) => {
        setRating(tur.rating);
        setTripUserRating((previous) => tur);
        props.success("Your rating has been added !");
        props.close();
      })
      .catch((error) => {
        props.error(error);
        props.close();
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          RATE THIS TRIP
        </Typography>
        <Box sx={{ height: "25px" }}></Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {trip && (
            <Rating
              name="simple-controlled"
              value={rating || 0}
              onChange={(event, newValue) => {
                if (newValue) {
                  if (tripUserRating.id) {
                    updateTripUserRating({
                      id: tripUserRating.id,
                      rating: newValue,
                    });
                  } else {
                    postTripUserRating({
                      tripId: trip.id,
                      userId: user.sub,
                      rating: newValue,
                    });
                  }
                }
              }}
            />
          )}
        </div>
        <Box sx={{ height: "25px" }}></Box>
      </Box>
    </Modal>
  );
};

export default RatingModal;
