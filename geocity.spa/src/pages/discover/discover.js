import React, { useState, useEffect } from "react";
import Trips from "./components/Trips";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import {
  Grid,
  Box,
  Button,
  Paper,
  InputBase,
  Divider,
  Collapse,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const useStyles = {
  paper: {
    p: "2px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 275,
    maxWidth: 975,
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  },
  icon: {
    p: "10px",
  },
  divider: {
    height: 28,
    m: 0.5,
  },
  grid: {
    minWidth: 275,
    maxWidth: 975,
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  },
  button: {
    margin: "10px !important",
    color: "#9fafce",
    backgroundColor: "#10377a",
    fontSize: "70%",
    height: "30px",
    "&:hover": {
      backgroundColor: "#10377a",
      color: "#ffffff",
    },
  },
  searchInput: {
    ml: 1,
    flex: 1,
    fontSize: "80%",
  },
};

const Input = styled(MuiInput)`
  width: 42px;
`;

export const Discover = (props) => {
  // INPUTS STATE
  const [searchValue, setSearchValue] = React.useState();
  const [value, setValue] = React.useState(30);
  const [valueRating, setValueRating] = React.useState(2);

  // RETRIEVED DATA
  const [trips, setTrips] = React.useState([]);

  // COMPONENT HIDE SHOW
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = () => {
    setLoading(true);
    fetch("https://localhost:44396/api/Trip/Search=" + searchValue)
      .then((response) => response.json())
      .then((tripsData) => {
        setLoading(false);
        setTrips([...tripsData]);
        console.log(tripsData);
      })
      .catch((rejected) => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ backgroundColor: "#E8E8E8" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={useStyles.grid}
      >
        <Grid item xs={10} sx={{ marginTop: "15px" }}>
          <Paper component="form" sx={useStyles.paper}>
            <IconButton sx={useStyles.icon} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={useStyles.searchInput}
              placeholder="Explore your city of choice"
              value={searchValue ? searchValue : ""}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <IconButton
              onClick={submit}
              sx={useStyles.icon}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={useStyles.divider} orientation="vertical" />
            <Button
              variant="contained"
              sx={useStyles.button}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              Advanced search
            </Button>
          </Paper>
          <Card>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Days
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Days"
                        onChange={(event, newValue) => {
                          setValue(
                            event.target.value === ""
                              ? ""
                              : Number(event.target.value)
                          );
                        }}
                        sx={{ m: 1, height: 35 }}
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      sx={{ m: 0.45, height: 25 }}
                    >
                      <Grid item>
                        <EuroIcon />
                      </Grid>
                      <Grid item xs>
                        <Slider
                          value={typeof value === "number" ? value : 0}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                      <Grid item>
                        <Input
                          value={value}
                          size="small"
                          onChange={(event, newValue) => {
                            setValue(
                              event.target.value === ""
                                ? ""
                                : Number(event.target.value)
                            );
                          }}
                          onBlur={() => {
                            if (value < 0) {
                              setValue(0);
                            } else if (value > 100) {
                              setValue(100);
                            }
                          }}
                          inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sx={{ m: 2.5, height: 25 }}>
                    <Rating
                      name="simple-controlled"
                      value={valueRating}
                      onChange={(event, newValue) => {
                        setValue(
                          event.target.value === ""
                            ? ""
                            : Number(event.target.value)
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Card>
          {loading && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          <Trips data={trips} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Discover;
