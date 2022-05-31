import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export const PublishModal = (props) => {
  const [publishTrip, setPublishTrip] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const [tripId, setTripId] = useState();

  useEffect(() => {
    console.log(props.tripId);
    setTripId(props.tripId);
  }, [props.tripId]);

  const handleChange = () => {
    if (publishTrip) {
      setPublishTrip(false);
    } else {
      setPublishTrip(true);
    }
  };

  const submitForm = () => {
    fetch("https://localhost:44396/api/Trip/PublishTrip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TripId: tripId,
        UserId: user.sub,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((rejected) => {
        console.log(rejected);
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
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          PUBLISH TRIP
        </Typography>
        <Box sx={{ height: "25px" }}></Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={publishTrip}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="I want to publish my trip"
        />
        <Box sx={{ height: "25px" }}></Box>
        <Button
          variant="contained"
          onClick={submitForm}
          sx={{
            marginBottom: "15px !important",
            color: "#9fafce",
            backgroundColor: "#10377a",
            width: "100%",
            margin: "0 auto",
            "&:hover": {
              backgroundColor: "#10377a",
              color: "#ffffff",
            },
          }}
        >
          Envoyer
        </Button>
      </Box>
    </Modal>
  );
};

export default PublishModal;