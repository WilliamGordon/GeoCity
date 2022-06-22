import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import API from "../../../../common/API/API";

export const ItinaryModal = (props) => {
  const [trip, setTrip] = useState({});
  const [itinary, setItinary] = useState({});

  useEffect(() => {
    setItinary(props.itinary);
  }, [props.itinary]);

  useEffect(() => {
    setTrip(props.trip);
  }, [props.trip]);

  const submitForm = () => {
    API.delete(`Itinary/${itinary.id}`)
      .then((res) => {
        // NOTIF SUCCESS
        // REFRESH TRIP
        props.refreshTrip(trip.id);
        props.success("Itinary deleted !");
        props.close();
      })
      .catch((error) => {
        // NOTIF ERROR
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
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirme deletion of itinary (day {itinary.day}) ?
        </Typography>
        <Box sx={{ height: "25px" }}></Box>
        <Box sx={{ height: "25px" }}></Box>
        <Button
          variant="contained"
          onClick={submitForm}
          sx={{
            marginBottom: "15px !important",
            color: "#9fafce",
            backgroundColor: "#9e0821",
            width: "100%",
            margin: "0 auto",
            "&:hover": {
              backgroundColor: "#9e0821",
              color: "#ffffff",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default ItinaryModal;
