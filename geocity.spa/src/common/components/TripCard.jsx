import { red } from "@mui/material/colors";
import {
  Card,
  Avatar,
  Button,
  Chip,
  Box,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import WatchIcon from "@mui/icons-material/Watch";
import EuroIcon from "@mui/icons-material/Euro";
import StraightenIcon from "@mui/icons-material/Straighten";
import { getReadableDate, getReadableTime } from "../helpers/utils";

const styleButton = {
  marginBottom: "15px !important",
  color: "#9fafce",
  backgroundColor: "#10377a",
  fontSize: "70%",
  height: "30px",
  width: "80px",
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
  width: "80px",
  height: "20px",
};

export const TripCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: "100%", marginTop: "10px", height: "75px" }}>
        <Box>
          <Grid container spacing={0}>
            <Grid
              item
              xs={10}
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
                    {props.data.city.name[0]}
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
                    <Grid item xs={7} sx={{ ...border }}>
                      <Chip
                        sx={chip}
                        size="small"
                        icon={<FormatListNumberedIcon sx={{ width: "20px" }} />}
                        label={props.data.days}
                      />
                      <Chip
                        sx={chip}
                        size="small"
                        icon={<EuroIcon sx={{ width: "20px" }} />}
                        label={props.data.price}
                      />
                      <Chip
                        sx={chip}
                        size="small"
                        icon={<WatchIcon sx={{ width: "20px" }} />}
                        label={props.data.duration}
                      />
                      <Chip
                        sx={chip}
                        size="small"
                        icon={<StraightenIcon sx={{ width: "20px" }} />}
                        label={props.data.distance}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                ...border,
                paddingLeft: "5px",
              }}
            >
              <Rating
                name="read-only"
                value={props.data.rating || 0}
                readOnly
                sx={{
                  ...border,
                  marginTop: "5px",
                }}
              />
              {props.edit}
              {!props.edit && (
                <Button
                  variant="contained"
                  sx={{ ...styleButton, marginLeft: "20px" }}
                  onClick={() => {
                    navigate("/trip-reader/" + props.data.id);
                  }}
                >
                  Explore
                </Button>
              )}
              {props.edit && (
                <Button
                  variant="contained"
                  sx={{ ...styleButton, marginLeft: "20px" }}
                  onClick={() => {
                    navigate("/trip-designer/" + props.data.id);
                  }}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};
export default TripCard;
