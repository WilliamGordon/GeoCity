import React, { useState, useEffect } from "react";
import { red } from "@mui/material/colors";
import { Card, CardHeader, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleButton = {
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
  width: "90%",
  margin: "0 auto",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "#ffffff",
  },
};

export const TripCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: "100%", marginTop: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.data.city.name[0]}
          </Avatar>
        }
        action={
          <Button
            variant="contained"
            sx={styleButton}
            onClick={() => {
              navigate("/trip-reader/" + props.data.id);
            }}
          >
            Explore
          </Button>
        }
        title={props.data.name}
        subheader={props.data.modifiedDate}
      />
    </Card>
  );
};
export default TripCard;
