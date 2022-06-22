import { red } from "@mui/material/colors";
import {
  Card,
  Avatar,
  Button,
  Chip,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getReadableDate, getReadableTime } from "../helpers/utils";

const styleButton = {
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
  width: "140px",
  margin: "0 auto",
  "&:hover": {
    backgroundColor: "#10377a",
    color: "#ffffff",
  },
};

const border = {
  border: "0px solid black",
};

const chip = {
  marginRight: "4px",
  marginBottom: "4px",
  fontSize: "0.7125rem",
  height: "20px",
};

export const CityCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: "100%", marginTop: "10px", height: "75px" }}>
        <Box>
          <Grid container spacing={0}>
            <Grid
              item
              xs={9}
              sx={{
                ...border,
                paddingTop: "10px !important",
                paddingLeft: "15px !important",
                paddingRight: "15px !important",
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={1} sx={{ ...border }}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {props.data.name[0]}
                  </Avatar>
                </Grid>
                <Grid item xs={11} sx={{ ...border }}>
                  <Typography
                    className="MuiCardHeader-title"
                    component="span"
                    display="block"
                    variant="body2"
                    sx={{ ...border }}
                  >
                    {props.data.name}
                  </Typography>
                  <div sx={{ whiteSpace: "pre-wrap" }}></div>
                  <Grid container spacing={0}>
                    <Grid item xs={5} sx={{ ...border }}>
                      <Typography
                        className="MuiCardHeader-subheader"
                        color="text.secondary"
                        component="span"
                        display="block"
                        variant="body2"
                        sx={{ ...border, width: "240px" }}
                      >
                        Published the {getReadableDate(props.data.modifiedDate)}
                        {" at "}
                        {getReadableTime(props.data.modifiedDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={7} sx={{ ...border, paddingLeft: "5px" }}>
                      <Chip
                        sx={chip}
                        size="small"
                        label={"Nb Trips : " + props.data.nbTrips}
                      />
                      <Chip
                        sx={chip}
                        size="small"
                        label={
                          "Nb Point of Interest : " +
                          props.data.nbPointOfInterests
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                ...border,
                paddingLeft: "5px",
              }}
            >
              <Button
                variant="contained"
                sx={{ ...styleButton, marginLeft: "20px", marginTop: "20px" }}
                onClick={() => {
                  navigate("/trip-suggestion/" + props.data.id);
                }}
              >
                EDIT SUGGESTIONS
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default CityCard;
