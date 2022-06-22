import React from "react";
import { Grid, Box, Tabs, Paper, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

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

export const TripsManager = (props) => {
  const [value, setValue] = React.useState("/trips-manager/participant");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs example"
              centered
              sx={useStyles.tabsRoot}
            >
              <Tab
                icon={<PeopleIcon />}
                value="/trips-manager/participant"
                component={Link}
                iconPosition="start"
                label="Trips Participant"
                to={"/trips-manager/participant"}
                sx={useStyles.tabRoot}
              />
              <Tab
                icon={<FavoriteIcon />}
                value="/trips-manager/favorite"
                component={Link}
                iconPosition="start"
                label="Favorites"
                to={"/trips-manager/favorite"}
                sx={useStyles.tabRoot}
              />
            </Tabs>
          </Paper>
          <Box>{props.component}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TripsManager;
