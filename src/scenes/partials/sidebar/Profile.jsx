
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadImages from "./set-profile-picture";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';


function Profile({username}) {

  const [imgUrl, setImgUrl] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
      setOpen(false);
    //  setSelectedImg(null);
    };

    
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
      <Link to='/set-profile-picture' style={{ textDecoration: "none" }}>
        <Typography variant="h6" color={colors.greenAccent[500]}>
          Profile Settings
        </Typography>
      </Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogContent>
          <UploadImages setProfilePicture={setImgUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveProfilePicture}>Save</Button>
        </DialogActions>
      </Dialog> 

    </Box>
  </Box>
    );
}

export default Profile;

