import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

export const PointModal = (props) => {
  const [point, setPoint] = useState({});
  useEffect(() => {
    setPoint({ ...props.point });
  }, [props.point]);

  const submitForm = () => {};
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
          EDIT PLACE
        </Typography>

        {point.osmId && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Name : {point.name}
          </Typography>
        )}

        {point.osmId && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Category : {point.category}
          </Typography>
        )}
        {point.osmId && (
          <TextField
            id="price"
            name="price"
            label="Price"
            type="text"
            autoComplete="off"
            value={point.price || ""}
            onChange={(event) => {
              setPoint({
                ...point,
                price: event.target.value,
              });
            }}
            required
            fullWidth
            sx={{
              marginBottom: 2,
            }}
          />
        )}
        {point.osmId && (
          <TextField
            id="duration"
            name="duration"
            label="Duration"
            type="text"
            autoComplete="off"
            value={point.duration || ""}
            onChange={(event) => {
              setPoint({
                ...point,
                duration: event.target.value,
              });
            }}
            required
            fullWidth
            sx={{
              marginBottom: 2,
            }}
          />
        )}
        <TextField
          multiline
          rows={5}
          id="description"
          name="description"
          label="Description"
          type="text"
          autoComplete="off"
          value={point.description || ""}
          onChange={(event) => {
            setPoint({
              ...point,
              description: event.target.value,
            });
          }}
          required
          fullWidth
          sx={{
            marginBottom: 2,
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

export default PointModal;
