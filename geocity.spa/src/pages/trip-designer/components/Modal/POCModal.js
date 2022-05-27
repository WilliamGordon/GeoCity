import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

export const POCModal = (props) => {
  const [pointOfCrossing, setPointOfCrossing] = useState(props.pointOfCrossing);

  useEffect(() => {
    console.log("FIRST RENDER");
    setPointOfCrossing(props.pointOfCrossing);
  }, []);

  useEffect(() => {
    console.log("STATE CHANGE RENDER");
  }, [pointOfCrossing]);

  const submitForm = () => {};

  return (
    <Modal
      key={props.pointOfCrossing.id}
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
          EDIT PLACE {pointOfCrossing.id}
        </Typography>
        <TextField
          multiline
          rows={5}
          id="description"
          name="description"
          label="Description"
          type="text"
          autoComplete="off"
          value={pointOfCrossing.description || ""}
          onChange={(event) => {
            setPointOfCrossing({
              ...pointOfCrossing,
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

export default POCModal;
