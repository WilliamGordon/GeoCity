import React, { useState, useEffect } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
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

export const PointModal = (props) => {
  const [point, setPoint] = useState({});
  const [isSuggestion, setIsSuggestion] = useState(false);

  useEffect(() => {
    setPoint({ ...props.point });
  }, [props.point]);

  useEffect(() => {
    if (point) {
      setIsSuggestion(point.isSuggestion);
    }
  }, [point]);

  const handleChange = () => {
    if (isSuggestion) {
      setIsSuggestion(false);
    } else {
      setIsSuggestion(true);
    }
  };

  const submitForm = () => {
    API.put(`PointOfInterest`, {
      id: point.id,
      isSuggestion: isSuggestion,
    })
      .then((res) => {
        props.refreshPoints();
        props.success("The suggestion has been added to your trip !");
        props.close();
      })
      .catch((error) => {
        props.error(error);
        props.close();
      });
  };

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box sx={{ ...useStyles.box }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          sx={{
            marginBottom: "10px",
          }}
        >
          EDIT PLACE
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSuggestion || false}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Is suggestion"
        />
        <TextField
          id="name"
          label="Name"
          type="text"
          autoComplete="off"
          value={point.name || ""}
          InputProps={{
            style: { fontSize: "90%" },
            pattern: "[0-9]*",
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
          id="category"
          name="category"
          label="Category"
          type="text"
          autoComplete="off"
          value={point.category || ""}
          InputProps={{
            style: { fontSize: "90%" },
            pattern: "[0-9]*",
          }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
          }}
        />
        <TextField
          id="nbTimeUsed"
          name="nbTimeUsed"
          label="Used"
          type="text"
          autoComplete="off"
          value={point.nbTimeUsed || ""}
          InputProps={{
            style: { fontSize: "90%" },
            pattern: "[0-9]*",
          }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
          }}
        />
        <TextField
          id="price"
          name="price"
          label="price"
          type="text"
          autoComplete="off"
          value={point.priceRange || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
            style: { fontSize: "90%" },
            pattern: "[0-9]*",
          }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
          }}
        />
        <TextField
          id="duration"
          name="duration"
          label="Duration"
          type="text"
          autoComplete="off"
          value={point.durationRange || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <AccessAlarmIcon />
              </InputAdornment>
            ),
            style: { fontSize: "90%" },
            pattern: "[0-9]*",
          }}
          fullWidth
          margin="dense"
          size="small"
          sx={{
            ...useStyles.textField,
          }}
        />
        <Box sx={{ height: "25px" }}></Box>

        <Button
          variant="contained"
          onClick={submitForm}
          sx={{
            ...useStyles.button,
          }}
        >
          Envoyer
        </Button>
        <Box sx={{ height: "25px" }}></Box>
      </Box>
    </Modal>
  );
};

export default PointModal;
