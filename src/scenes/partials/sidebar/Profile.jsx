import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, getMetadata, deleteObject  } from 'firebase/storage';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { imageDb, auth } from '../../../uath/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { get, update, ref as dbRef   } from "firebase/database";
import db from "../../../uath/firebase";
import { useSnackbar } from 'notistack';
import { useAuth } from '../../../uath/AuthenticationContex';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUpload = ({ username }) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [selectedImg, setSelectedImg] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null)
  const { loggedInUserDetails } = useAuth();  
  const { id}  = loggedInUserDetails;
  const { enqueueSnackbar } = useSnackbar();
  console.log('ID' , id)


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    debugger
    if (file) {
      
      try {
      setLoading(true);
      const imgRef2 = ref(imageDb, `files/${id}`);
      console.log('imgRef2',imgRef2)
       
                // Delete the file

        await getMetadata(imgRef2);
        deleteObject(imgRef2).then(() => {
          // File deleted successfully
          debugger
            console.log("Image deleted successfully.");
        //const checkFileExists = downloadURL = await getDownloadURL(imgRef);
        setSelectedImg(file);
        setOpen(true);
       
      
      
          const imgRef = ref(imageDb, `files/${id}`);
          uploadBytes(imgRef, file).then(() => {
            console.log("imgref ---",imgRef)
            const downloadURL = getDownloadURL(imgRef).then((url) => {
              setImgUrl((data) => url);
            //setProfilePicture(downloadURL);
            setLoading(false);
            })
            
          })
         
       
        }).catch((error) => {
          // Uh-oh, an error occurred!
          throw error;
        });
     
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          // Show error notification if the file does not exist
         // enqueueSnackbar('Profile picture not found.', { variant: 'error' });
         setSelectedImg(file);
         setOpen(true);
       
       
       
           const imgRef = ref(imageDb, `files/${id}`);
           uploadBytes(imgRef, file).then(() => {
             console.log("imgref ---",imgRef)
             const downloadURL = getDownloadURL(imgRef).then((url) => {
               setImgUrl((data) => url);
             //setProfilePicture(downloadURL);
             setLoading(false);
             enqueueSnackbar('Profile picture Successfully Changed.', { variant: 'success' });
             })
             
           })


        } else {
          console.error("Failed to delete profile picture:", error);
          enqueueSnackbar('Failed to delete profile picture.', { variant: 'error' });
        }
        setLoading(false);
      }
      
    }
  };



  useEffect(() => {
    const fetchProfilePicture = async () => {
     
      if (id) {
        debugger
        try {
          const userProfileRef = ref(imageDb, `files/${id}`);
          const downloadURL = await getDownloadURL(userProfileRef);
          //const snapshot = await get(userProfileRef); 
          (downloadURL) ? setImgUrl(downloadURL) :setImgUrl('../../assets/profile.png');
          
        } catch (error) {
          setImgUrl('../../assets/profile.png');
          console.error("Failed to retrieve profile picture:", error);
        }
      }
    };

    fetchProfilePicture();
  }, [id]);
  

  const handleClose = () => {
    setOpen(false);
    setSelectedImg(null);
  };

  const handleSaveProfilePicture = () => {
    alert('Profile picture saved!');
    setOpen(false);
  };


 

  return (
    <Box mb="25px">
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="profile-user"
          width="100px"
          height="100px"
          src={imgUrl ? imgUrl : '../../assets/lwah_30.jpg'}
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
       
        <label htmlFor="file-upload">
          <VisuallyHiddenInput id="file-upload" type="file" onChange={handleFileChange} />
          <Typography variant="h6" color={colors.greenAccent[500]} style={{cursor : 'pointer'}}>
            Profile Settings
          </Typography>
        </label>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogContent style={{textAlign: "center"}}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="body1">
                Image uploaded successfully!
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default InputFileUpload;
