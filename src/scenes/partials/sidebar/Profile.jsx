import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { imageDb } from '../../../uath/firebase';

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
  const [profilePicture, setProfilePicture] = React.useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImg(file);
      setOpen(true);
      setLoading(true);
      const imgRef = ref(imageDb, `file/${v4()}`);
      try {
        await uploadBytes(imgRef, file);
        const downloadURL = await getDownloadURL(imgRef);
        setImgUrl((data) => [...data, downloadURL]);
        setProfilePicture(downloadURL);
        setLoading(false);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(imageDb, 'file');
      try {
        const res = await listAll(listRef);
        const urls = await Promise.all(res.items.map((itemRef) => getDownloadURL(itemRef)));
        setImgUrl(urls.slice(0, 1) || []);
        console.log(urls);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

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
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            <Typography variant="h6" color={colors.greenAccent[500]}>
            Profile Settings
          </Typography>
          </Button>
        </label>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography variant="body1">
                Image uploaded successfully!
              </Typography>
            )}
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

export default InputFileUpload;
