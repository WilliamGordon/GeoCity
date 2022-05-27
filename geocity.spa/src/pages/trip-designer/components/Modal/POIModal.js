import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

export const ItinaryPOI_Modal = (props) => {
  const [itinaryPOI, setItinaryPOI] = useState(props.itinaryPOI);

  useEffect(() => {
    setItinaryPOI(itinaryPOI);
  }, [itinaryPOI]);

  const updateItinaryPOI = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itinaryId: props.itinary.Id,
        price: itinaryPOI.price,
        duration: itinaryPOI.duration,
        description: itinaryPOI.description,
        itinaryPOI: {
          osmId: "string",
          name: "string",
          category: "string",
          latitude: itinaryPOI.place.latitude,
          longitude: itinaryPOI.place.longitude,
        },
      }),
    };
    fetch("https://localhost:44396/api/ItinaryPointOfCrossing", requestOptions)
      .then((response) => response.json())
      .then((itinaryPOI) => {
        console.log(itinaryPOI);
        props.updateItinaryPlace({
          id: itinaryPOI.id,
          name: itinaryPOI.name,
          description: itinaryPOI.description,
          price: itinaryPOI.price,
          duration: itinaryPOI.duration,
          latitude: itinaryPOI.place.latitude,
          longitude: itinaryPOI.place.longitude,
        });
        props.handleClose();
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  const submitForm = () => {
    if (itinaryPOI.id) {
      updateItinaryPOI();
    } else {
      createItinaryPOI();
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
          EDIT PLACE {itinaryPOI.id}
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Name"
          type="text"
          autoComplete="off"
          value={itinaryPOI.name || ""}
          onChange={(event) => {
            setItinaryPOI({
              ...itinaryPOI,
              name: event.target.value,
            });
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
          value={itinaryPOI.price || ""}
          onChange={(event) => {
            setItinaryPOI({
              ...itinaryPOI,
              price: event.target.value,
            });
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
          value={itinaryPOI.duration || ""}
          onChange={(event) => {
            setItinaryPOI({
              ...itinaryPOI,
              duration: event.target.value,
            });
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
          value={itinaryPOI.description || ""}
          onChange={(event) => {
            setItinaryPOI({
              ...itinaryPOI,
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

export default ItinaryPOI_Modal;
