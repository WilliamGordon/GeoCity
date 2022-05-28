import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, TextField, Button } from "@mui/material";

export const ShareModal = (props) => {
  const [link, setLink] = useState({});

  useEffect(() => {
    console.log(props.link);
    setLink({ ...props.link });
  }, [props.link]);

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
          width: 570,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Share your trip with a friend
        </Typography>
        <Box sx={{ height: "25px" }}></Box>
        <TextField
          id="Link"
          name="Link"
          label="Link"
          type="text"
          autoComplete="off"
          value={"http://localhost:3000/trip-subscriber/" + props.link}
          required
          fullWidth
          sx={{
            marginBottom: 2,
          }}
        />
      </Box>
    </Modal>
  );
};

export default ShareModal;
