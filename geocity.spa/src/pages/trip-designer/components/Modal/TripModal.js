import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import API from "../../../../common/API/API";

const useStyles = {
  textField: {},
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  button: {
    marginBottom: "15px !important",
    color: "#9fafce",
    backgroundColor: "#10377a",
    width: "100%",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#10377a",
      color: "#ffffff",
    },
  },
  typography: {
    marginBottom: "0px !important",
  },
};

export const TripModal = (props) => {
  const [name, setName] = useState();
  const [days, setDays] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(props.trip.name);
    setDays(props.trip.days);
    setDescription(props.trip.description);
  }, [props.trip]);

  const submitForm = () => {
    API.put(`Trip`, {
      id: props.trip.id,
      name: name,
      description: description,
    })
      .then((res) => {
        props.refreshTrip(props.trip.id);
        props.success();
        props.close();
      })
      .catch((error) => {
        props.error();
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{
            marginBottom: "10px",
          }}
        >
          EDIT TRIP
        </Typography>
        <TextField
          id="name"
          label="name"
          type="text"
          autoComplete="off"
          value={name || ""}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
            marginTop: "25px !important",
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
          value={description || ""}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          inputProps={{ style: { fontSize: "90%" } }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
            marginBottom: "25px !important",
            fontSize: "40% !important",
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

export default TripModal;
