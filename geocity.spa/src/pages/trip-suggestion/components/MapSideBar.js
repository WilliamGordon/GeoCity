import React, { useState, useEffect } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExploreIcon from "@mui/icons-material/Explore";
import EuroIcon from "@mui/icons-material/Euro";
import StraightenIcon from "@mui/icons-material/Straighten";
import WatchIcon from "@mui/icons-material/Watch";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Drawer,
  Toolbar,
  Typography,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  Paper,
  Grid,
  IconButton,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import PublishIcon from "@mui/icons-material/Publish";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../../common/API/API";

const styleButtonEdit = {
  marginTop: "5px",
  marginLeft: "10px",
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "red",
  },
};

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

const styleBorder = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  height: "32px",
  fontSize: "14px",
  marginBottom: "4px !important",
};

const styleItinaries = {
  margin: "0 auto",
  width: "90%",
};

const getListStyle = (isDraggingOver) => ({
  width: "98%",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const MapSideBar = (props) => {
  // STATE FOR DATA
  const [city, setCity] = React.useState({});
  const [points, setPoints] = useState([]);

  // OTHERS
  const { user, isAuthenticated } = useAuth0();

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
