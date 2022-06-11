import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Chip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  getReadableDate,
  getReadableTime,
} from "../../../../common/helpers/utils";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    neutral: {
      main: "#10377a",
      contrastText: "#fff",
    },
  },
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
}

export const UserModal = (props) => {
  const [trip, setTrip] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTrip(props.trip);
  }, [props.trip]);

  useEffect(() => {
    if (trip.id) {
      setUsers(trip.tripUsers);
    }
  }, [trip]);

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
          width: 420,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          PARTICIPANTS
        </Typography>
        <Box sx={{ height: "25px" }}></Box>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {users.length !== 0 &&
            users.map((item, index) => (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar {...stringAvatar(`${item.firstname}`)} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.lastname}`}
                  secondary={`Join the ${getReadableDate(
                    item.createdDate
                  )} at ${getReadableTime(item.createdDate)}`}
                />
                {item.isOwner && (
                  <ThemeProvider theme={theme}>
                    <Chip label="Owner" size="small" color="neutral" />
                  </ThemeProvider>
                )}
              </ListItem>
            ))}
        </List>
        <Box sx={{ height: "25px" }}></Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
