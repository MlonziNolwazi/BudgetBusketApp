import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import classes from './Loader.module.css';


export default function Loader() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    
    <Backdrop
    sx={{ color: '#fff', background : "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    onClick={handleClose}
  >
    <div>
     <div className={classes.loader}>Loading...
  <span></span>
</div>
    </div>
    
  </Backdrop>
  );
}
