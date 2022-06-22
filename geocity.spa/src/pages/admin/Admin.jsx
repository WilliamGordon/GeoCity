import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import {
  Grid,
  Box,
  Paper,
  InputBase,
  CircularProgress,
} from "@mui/material";
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
  // INPUTS STATE
  const [searchValue, setSearchValue] = React.useState();

  // RETRIEVED DATA
  const [cities, setCities] = React.useState([]);

  // COMPONENT HIDE SHOW
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    setLoading(true);
    API.get(`City`)
      .then((res) => {
        setLoading(false);
        setCities([...res.data]);
      })
      .catch((error) => {
        setLoading(false);
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
                  if (e.keyCode === 13) {
                    e.preventDefault();
                  }
                }}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
              />
              <IconButton
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
