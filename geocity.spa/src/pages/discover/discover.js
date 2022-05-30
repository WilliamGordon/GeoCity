import React, { useState, useEffect } from "react";
import CitiesList from "./components/CitiesList";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/material/IconButton";
import {
  Grid,
  Box,
  Button,
  Typography,
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
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { styled } from "@mui/material/styles";

const useStyles = {
  grid: {
    minWidth: 275,
    maxWidth: 975,
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
  },
};

const styleButton = {
  margin: "10px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "#ffffff",
  },
};

const Input = styled(MuiInput)`
  width: 42px;
`;

export const Discover = (props) => {
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [value, setValue] = React.useState(30);
  const [valueRating, setValueRating] = React.useState(2);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
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
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              minWidth: 275,
              maxWidth: 975,
              margin: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Explore your city of choice"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button
              variant="contained"
              sx={styleButton}
              onClick={handleExpandClick}
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
                        onChange={handleChange}
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
                          onChange={handleSliderChange}
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                      <Grid item>
                        <Input
                          value={value}
                          size="small"
                          onChange={handleInputChange}
                          onBlur={handleBlur}
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
                        setValueRating(newValue);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Card>
          <CitiesList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Discover;
