import { useAuth0 } from "@auth0/auth0-react";
import { Card, Typography, CardContent, Avatar } from "@mui/material";

const Profile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <Card sx={{ margin: "auto", marginTop: "15px", width: "80%" }}>
        <CardContent>
          <Avatar src={user.picture} sx={{ width: 24, height: 24 }}></Avatar>
          <Typography variant="body2">{user.email}</Typography>
          <Typography variant="body2">{user.name}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Profile;
