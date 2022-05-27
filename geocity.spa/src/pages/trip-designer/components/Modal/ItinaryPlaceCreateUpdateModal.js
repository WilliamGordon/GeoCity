import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

export const ItinaryPlaceCreateUpdateModal = (props) => {
  const [itinaryPlace, setItinaryPlace] = useState(props.itinaryPlace);

  useEffect(() => {
    setItinaryPlace(props.itinaryPlace);
  }, [props.itinaryPlace]);

  const submitForm = () => {
    console.log(itinaryPlace);

    if (itinaryPlace.id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itinaryId: props.itinary.Id,
          price: itinaryPlace.price,
          duration: itinaryPlace.duration,
          description: itinaryPlace.description,
          pointOfInterest: {
            osmId: "string",
            name: "string",
            category: "string",
            latitude: itinaryPlace.place.latitude,
            longitude: itinaryPlace.place.longitude,
          },
        }),
      };
      fetch(
        "https://localhost:44396/api/ItinaryPointOfCrossing",
        requestOptions
      )
        .then((response) => response.json())
        .then((itinaryPlace) => {
          console.log(itinaryPlace);
          props.updateItinaryPlace({
            id: itinaryPlace.id,
            name: itinaryPlace.name,
            description: itinaryPlace.description,
            price: itinaryPlace.price,
            duration: itinaryPlace.duration,
            latitude: itinaryPlace.place.latitude,
            longitude: itinaryPlace.place.longitude,
          });
          props.handleClose();
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itinaryId: props.itinary.id, // For now just use the first day of the itinary by default
          name: itinaryPlace.name,
          description: itinaryPlace.description,
          price: itinaryPlace.price,
          duration: itinaryPlace.duration,
          latitude: itinaryPlace.latitude,
          longitude: itinaryPlace.longitude,
        }),
      };
      console.log(requestOptions);
      fetch("https://localhost:44396/api/ItinaryPlace", requestOptions)
        .then((response) => response.json())
        .then((itinaryPlaceId) => {
          // ADDING THE MARKER THROUGH THE MODAL
          props.addItinaryPlace({
            id: itinaryPlaceId,
            itinaryId: props.itinary.id,
            name: itinaryPlace.name,
            description: itinaryPlace.description,
            price: itinaryPlace.price,
            duration: itinaryPlace.duration,
            latitude: itinaryPlace.latitude,
            longitude: itinaryPlace.longitude,
          });
          props.handleClose();
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
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
          EDIT PLACE {itinaryPlace.id}
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Name"
          type="text"
          autoComplete="off"
          value={itinaryPlace.name || ""}
          onChange={(event) => {
            setItinaryPlace({ ...itinaryPlace, name: event.target.value });
          }}
          required
          fullWidth
          sx={{
            marginTop: 4,
            marginBottom: 4,
          }}
        />
        <TextField
          id="price"
          name="price"
          label="Price"
          type="text"
          autoComplete="off"
          value={itinaryPlace.price || ""}
          onChange={(event) => {
            setItinaryPlace({ ...itinaryPlace, price: event.target.value });
          }}
          required
          fullWidth
          sx={{
            marginBottom: 4,
          }}
        />
        <TextField
          id="duration"
          name="duration"
          label="Duration"
          type="text"
          autoComplete="off"
          value={itinaryPlace.duration || ""}
          onChange={(event) => {
            setItinaryPlace({ ...itinaryPlace, duration: event.target.value });
          }}
          required
          fullWidth
          sx={{
            marginBottom: 4,
          }}
        />
        <TextField
          multiline
          rows={5}
          id="description"
          name="description"
          label="Description"
          type="text"
          autoComplete="off"
          value={itinaryPlace.description || ""}
          onChange={(event) => {
            setItinaryPlace({
              ...itinaryPlace,
              description: event.target.value,
            });
          }}
          required
          fullWidth
          sx={{
            marginBottom: 4,
          }}
        />
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

export default ItinaryPlaceCreateUpdateModal;
