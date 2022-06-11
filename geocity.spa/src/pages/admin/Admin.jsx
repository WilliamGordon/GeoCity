import React, { useState, useEffect } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import CitiesList from "../../common/components/CitiesList";
import API from "../../common/API/API";

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

const Admin = () => {
  const { user, isAuthenticated } = useAuth0();
  // INPUTS STATE
  const [searchValue, setSearchValue] = React.useState();
  const [value, setValue] = React.useState(30);
  const [valueRating, setValueRating] = React.useState(2);

  // RETRIEVED DATA
  const [cities, setCities] = React.useState([]);

  // COMPONENT HIDE SHOW
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [user]);

  const submit = () => {};

  const fetchCities = () => {
    API.get(`City`)
      .then((res) => {
        setCities([...res.data]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <Box>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            ...useStyles.grid,
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "top",
            justifyContent: "center",
          }}
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
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    e.preventDefault();
                    submit();
                  }
                }}
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
            </Paper>
            {loading && (
              <Box>
                <CircularProgress />
              </Box>
            )}
            {!loading && <CitiesList data={cities} edit={true} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
