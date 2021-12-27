import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
} from '@mui/material';

export const PlaceEditModal = (props) => {

  // itinaryPlaceId input
  const [itinaryPlaceId, setItinaryPlaceId] = useState(props.itinaryPlace.id)

  // Name input
  const [name, setName] = useState(props.itinaryPlace.name)
  const [nameError, setNameError] = useState("")

  // Price input
  const [price, setPrice] = useState(props.itinaryPlace.price)
  const [priceError, setPriceError] = useState("")

  // Duration input
  const [duration, setDuration] = useState(props.itinaryPlace.duration)
  const [durationError, setDurationError] = useState("")
  
  // Description input
  const [description, setDescription] = useState(props.itinaryPlace.description ? props.itinaryPlace.description : "")
  const [descriptionError, setDescriptionError] = useState("")

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          EDIT PLACE {props.itinaryPlaceId}
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Name"
          type="text"
          autoComplete='off'
          value={name}
          error={nameError ? true : false}
          helperText={nameError}
          onChange={(event) => {
            setNameError("");
            setName(event.target.value);
          }}
          onBlur={(event) => {
            if (event.target.value == "") {
              setNameError("Please provide a name for your trip");
            } else {
              setNameError("");
            }
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
          autoComplete='off'
          value={price}
          error={priceError ? true : false}
          helperText={priceError}
          onChange={(event) => {
            setPriceError("");
            setPrice(event.target.value);
          }}
          onBlur={(event) => {
            if (event.target.value == "") {
              setPriceError("Please provide a name for your trip");
            } else {
              setPriceError("");
            }
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
          autoComplete='off'
          value={duration}
          error={durationError ? true : false}
          helperText={durationError}
          onChange={(event) => {
            setDurationError("");
            setDuration(event.target.value);
          }}
          onBlur={(event) => {
            if (event.target.value == "") {
              setDurationError("Please provide a name for your trip");
            } else {
              setDurationError("");
            }
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
          autoComplete='off'
          value={description}
          error={descriptionError ? true : false}
          helperText={descriptionError}
          onChange={(event) => {
            setDescriptionError("");
            setDescription(event.target.value);
          }}
          onBlur={(event) => {
            if (event.target.value == "") {
              setDescriptionError("Please provide a name for your trip");
            } else {
              setDescriptionError("");
            }
          }}
          required
          fullWidth
          sx={{
            marginBottom: 4,
          }}
        />
      </Box>
    </Modal>
  );
}

export default PlaceEditModal;