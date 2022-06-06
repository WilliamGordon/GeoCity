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
    if (isAuthenticated) {
      if (trip !== undefined) {
        fetchTripUserRating();
      }
    }
  }, [trip, user]);

  useEffect(() => {
    console.log("RATING", tripUserRating);
  }, [tripUserRating]);

  useEffect(() => {
    if (rating) {
      if (tripUserRating.id) {
        updateTripUserRating();
      } else {
        postTripUserRating();
      }
    }
  }, [rating]);

  const fetchTripUserRating = () => {
    API.get(`TripUserRating/${trip.id}/${user.sub}`)
      .then((res) => {
        console.log(res);
        setTripUserRating(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const postTripUserRating = (tur) => {
    API.post(`TripUserRating`, tur)
      .then((res) => {
        console.log("ADDDING SUCCESS", res);
        setRating(tur.rating);
        setTripUserRating((previous) => ({ ...previous, id: res.data }));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const updateTripUserRating = (tur) => {
    API.put(`TripUserRating`, tur)
      .then((res) => {
        console.log("ADDDING SUCCESS", res);
        setRating(tur.rating);
        setTripUserRating((previous) => ({ ...previous, id: res.data }));
      })
      .catch((error) => {
        console.error("There was an error!", error);
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
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              console.log(newValue);
              if (newValue) {
                if (tripUserRating.id) {
                  postTripUserRating({
                    tripId: trip.id,
                    userId: user.sub,
                    Rating: newValue,
                  });
                } else {
                  postTripUserRating({
                    id: tripUserRating.id,
                    Rating: newValue,
                  });
                }
              }
            }}
          />
        </div>
        <Box sx={{ height: "25px" }}></Box>
      </Box>
    </Modal>
  );
};

export default RatingModal;
