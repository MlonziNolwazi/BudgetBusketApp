import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { imageDb } from '../../../uath/firebase';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { v4 } from 'uuid';
import { useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll} from 'firebase/storage';

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

const InputFileUpload = ({setImgUrl}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedImg, setSelectedImg] = React.useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImg(file);
      const imgRef = ref(imageDb, `file/${v4()}`);
      try {
        await uploadBytes(imgRef, file);
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image.');
      }
    }
  };

  useEffect(() => {
    return () => {
     listAll(ref(imageDb, 'file')).then((res) => {
      console.log(res,'THESE ARE IMAGESS')
        res.items.forEach((itemRef) => {
          console.log(itemRef,'THESE ARE items')
          getDownloadURL(itemRef).then((url) => {
           // console.log("url", aaaa)
           setImgUrl(data=>[...data, url] )
          });
  
        });
        
      });
  
    };
  }, []);

  //console.log("Img Url", imgUrl)

  return (
      <div>
        <label htmlFor="upload-button">
          <VisuallyHiddenInput
            id="upload-button"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Profile Picture
          </Button>
        </label>
        {selectedImg && (
          <Typography variant="body2" color={colors.greenAccent[500]}>
            Selected file: {selectedImg.name}
          </Typography>
        )}
  
       
      </div>
  );
}
  
  export default InputFileUpload;
