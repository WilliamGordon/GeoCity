import * as React from "react";
import { red } from "@mui/material/colors";
import { Card, CardHeader, Avatar, Button } from "@mui/material";

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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%", marginTop: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            O
          </Avatar>
        }
        action={
          <Button variant="contained" sx={styleButton}>
            Explore
          </Button>
        }
        title="Trip name"
        subheader="Trip created at"
      />

      {/* <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="share" style={{ flex: 1 }}>
          <Rating name="read-only" value={4} readOnly />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
