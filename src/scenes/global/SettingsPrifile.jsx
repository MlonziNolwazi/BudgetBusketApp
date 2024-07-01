import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useSnackbar } from 'notistack'; // Import notistack for snackbar notifications
import { useAuth } from '../../uath/AuthenticationContex';

function SettingsProfile() {
  const [open, setOpen] = useState(false);
  const { loggedInUserDetails, upDateUserDetails } = useAuth();

  const { id , firstname, lastname, email, password, role, theme } = loggedInUserDetails || {id: '', firstname:'', lastname:'', email:'', password:'', role:'', theme:''}
  console.log('User Details: from settings component', loggedInUserDetails);

  const [formData, setFormData] = useState({
    id,
    firstname,
    lastname,
    email,
    password,
    confirmPassword : password,
    role,
    theme
  });

  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar(); // Initialize notistack

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstname) tempErrors.name = "First Name is required";
    if (!formData.lastname) tempErrors.name = "Last Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {

    if (validate()) {
      // Save settings logic here
      console.log('User Details saved', formData);
      //localStorage.setItem("LoggedInUserDetails", JSON.stringify(formData));
      upDateUserDetails(formData).then(() => {

          enqueueSnackbar('User Details Udated successfully!', { variant: 'success' });
          handleClose();

      }).catch((error) => {
        
      enqueueSnackbar('Failed to update user details. Please try again.', { variant: 'error' });
      });


    } else {
      enqueueSnackbar('Please correct the errors in the form', { variant: 'error' });
    }
  };

  return (
    <div>
      <IconButton sx={{ mr: 2 }} aria-label="settings" onClick={handleClickOpen} title="Settings">
        <SettingsOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.firstname}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
          autoFocus
          margin="dense"
          id="lastname"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={formData.lastname}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />


          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsProfile;
