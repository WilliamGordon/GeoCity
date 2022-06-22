import React, { useState, useEffect } from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import {
  Card,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  Paper,
} from "@mui/material";

const styleDrawer = {
  width: "33%",
  flexShrink: 0,
  zIndex: 1301,
  "& .MuiDrawer-paper": {
    width: "33%",
    backgroundColor: "#eceff1",
    boxSizing: "border-box",
    position: "fixed",
    top: "65px",
    height: "calc(100% - 65px)",
  },
};

const styleTypography = {
  backgroundColor: "#ffffff",
  fontSize: "initial",
  width: "100%",
  margin: "0 auto",
};

const styleBorder = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  height: "32px",
  fontSize: "14px",
  marginBottom: "4px !important",
};

export const MapSideBar = (props) => {
  // STATE FOR DATA
  const [city, setCity] = React.useState({});
  const [points, setPoints] = useState([]);

  // LIFE CYCLE USE EFFECT METHODS
  useEffect(() => {
    setCity(props.city);
  }, [props.city]);

  useEffect(() => {
    setPoints(props.points);
  }, [props.points]);

  return (
    <>
      <Drawer elevation={16} sx={styleDrawer} variant="permanent" anchor="left">
        <Toolbar
          sx={{
            backgroundColor: "white",
            minHeight: "43px !important",
            heigth: "43px !important",
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="overline"
            display="block"
            gutterBottom
            align="center"
            component="div"
            sx={styleTypography}
          >
            {city.name}
          </Typography>
        </Toolbar>
        <Divider />
        <Card
          variant="outlined"
          sx={{
            overflow: "initial",
            margin: "0 auto",
            width: "90%",
          }}
        ></Card>
        <Paper
          style={{
            backgroundColor: "#eceff1",
            maxHeight: "100%",
            overflow: "auto",
            width: "90%",
            margin: "0 auto",
            marginTop: "15px",
          }}
        >
          {points.length !== 0 &&
            points.map((item, index) => (
              <ListItem
                sx={styleBorder}
                button
                id={item.id}
                key={item.id}
                onClick={(e) => props.handleUpdate(item)}
              >
                <ListItemIcon>
                  <ExploreIcon fontSize="small" />
                </ListItemIcon>
                <Typography
                  sx={{
                    paddingTop: "5px",
                    fontSize: "0.790rem",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  {item.name}
                </Typography>
              </ListItem>
            ))}
        </Paper>
      </Drawer>
    </>
  );
};

export default MapSideBar;
