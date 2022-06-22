import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
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

const getReadableDate = (strDate) => {
  if (strDate) {
    var date = strDate.split("T")[0];
    var year = date.split("-")[0];
    var month = date.split("-")[1];
    var day = date.split("-")[2];
    return `${day}/${month}/${year}`;
  }
};

const getReadableTime = (strDate) => {
  if (strDate) {
    var Time = strDate.split("T")[1];
    var hours = Time.split(":")[0];
    var minutes = Time.split(":")[1];
    return `${hours}:${minutes}`;
  }
};

export const PointModal = (props) => {
  const [point, setPoint] = useState({});
  const { user } = useAuth0();
  useEffect(() => {
    setPoint({ ...props.point });
  }, [props.point]);

  const submitForm = () => {
    if (point.osmId) {
      API.put(`ItinaryPointOfInterest`, {
        userUpdateId: user.sub,
        id: point.id,
        price: point.price,
        duration: point.duration,
        description: point.description,
        modifiedDate: point.modifiedDate,
      })
        .then((res) => {
          props.refreshPoints();
          API.get(`ItinaryPointOfInterest/${point.id}`)
            .then((res) => {
              setPoint({ ...res.data });
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
          props.success("Point of Interest correctly updated !");
          props.close();
        })
        .catch((error) => {
          props.refreshPoints();
          props.error(error);
          props.close();
        });
    } else {
      API.put(`ItinaryPointOfCrossing`, {
        userUpdateId: user.sub,
        id: point.id,
        description: point.description,
        modifiedDate: point.modifiedDate,
      })
        .then((res) => {
          props.refreshPoints();
          API.get(`ItinaryPointOfCrossing/${point.id}`)
            .then((res) => {
              setPoint({ ...res.data });
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
          props.success("Point of Crossing correctly updated !");
          props.close();
        })
        .catch((error) => {
          props.refreshPoints();
          props.error(error);
          props.close();
        });
    }
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
          {props.readonly ? "DETAILS PLACE" : "EDIT PLACE"} 
        </Typography>
        {point.osmId && (
          <>
            <Typography
              sx={{
                ...useStyles.typography,
              }}
            >
              Name : <b>{point.name}</b>
            </Typography>
            <Typography
              sx={{
                ...useStyles.typography,
              }}
            >
              Category : <b>{point.category}</b>
            </Typography>
          </>
        )}
        <Typography
          sx={{
            ...useStyles.typography,
          }}
        >
          Address : <b>{point.address}</b>
        </Typography>
        {point.osmId && (
          <>
            <TextField
              disabled={props.readonly}
              id="price"
              label="Price"
              type="number"
              autoComplete="off"
              value={point.price || ""}
              onChange={(event) => {
                setPoint({
                  ...point,
                  price: event.target.value,
                });
              }}
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
                marginTop: "25px !important",
              }}
            />
            <TextField
              disabled={props.readonly}
              id="duration"
              name="duration"
              label="Duration"
              type="number"
              autoComplete="off"
              value={point.duration || ""}
              onChange={(event) => {
                setPoint({
                  ...point,
                  duration: event.target.value,
                });
              }}
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
          </>
        )}
        <TextField
              disabled={props.readonly}
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
        {
          !props.readonly && (
            <>
            <Button
              variant="contained"
              onClick={submitForm}
              sx={{
                ...useStyles.button,
              }}
            >
              Envoyer
            </Button>
            <Box sx={{ fontSize: "70%" }}>
              <Typography sx={{ fontSize: "110%", marginBottom: "2px" }}>
                Created by <b>{point.userCreateName}</b> the{" "}
                {getReadableDate(point.createdDate)} at{" "}
                {getReadableTime(point.createdDate)}
              </Typography>
              <Typography sx={{ fontSize: "110%" }}>
                Last Modified by <b>{point.userUpdateName}</b> the{" "}
                {getReadableDate(point.modifiedDate)} at{" "}
                {getReadableTime(point.modifiedDate)}
              </Typography>
            </Box>
            </>
          )
        }
       
      </Box>
    </Modal>
  );
};

export default PointModal;
