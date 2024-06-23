
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";


function Profile({username}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box mb="25px">
    <Box display="flex" justifyContent="center" alignItems="center">
      <img
        alt="profile-user"
        width="100px"
        height="100px"
        src={`../../assets/lwah_30.jpg`}
        style={{ cursor: "pointer", borderRadius: "50%" }}
      />
    </Box>
    <Box textAlign="center">
      <Typography
        variant="h5"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "10px 0 0 0" }}
      >
      {username}
      </Typography>
      <Link to='/form' style={{textDecoration: "none"}}>
      <Typography variant="h6" color={colors.greenAccent[500]}>
      Profile Settings
      </Typography>
      </Link>
    </Box>
  </Box>
    );
}

export default Profile;

