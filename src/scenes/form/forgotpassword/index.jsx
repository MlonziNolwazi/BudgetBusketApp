// src/components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Formik } from "formik";
import * as yup from "yup";
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { auth as database } from '../../../uath/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../../theme";


function ForgotPassword() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CustomBox = styled(Box)(({ theme }) => ({
    backgroundColor: colors.primary[400],
    boxShadow: 24,
    borderRadius: theme.shape.borderRadius,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }));

  const handleClose = () => {
    navigate('/login');
  };

  const handleFormSubmit = async (values) => {

        const { email } = values;

        try {

          sendPasswordResetEmail(database, email).then((res) => {
              enqueueSnackbar('Password reset email sent', { variant: 'success' });
              console.log('Password reset email sent',res);
              navigate('/login');

          }).catch((error) => {

            enqueueSnackbar('Error sending password reset email', { variant: 'error' });
            console.log(error,'Sending password reset email to:', email);
          });
          //handleClose();
        } catch (error) {
          console.error('Error sending password reset email:', error);
        }
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
  });

  const initialValues = {
    email: "",
  };

  return (
    <Box m="20px">
      <Dialog 
        open={open} 
        fullWidth 
        maxWidth='sm' 
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose(event, reason);
          }
        }}
        disableEscapeKeyDown
      >
        <CustomBox>
          <DialogTitle>
            <Typography
              variant="h2"
              color={ colors.primary[700] }
              fontWeight="bold"
              textAlign="center"
              sx={{ m: "0 0 5px 0" }}
            >
              Forgot Password
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="grid" gap="20px">
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt="20px">
                    <DialogActions>
                      <Button onClick={handleClose} color="error">
                        Cancel
                      </Button>
                      <Button type="submit" color="secondary" variant="contained">
                        Reset Password
                      </Button>
                    </DialogActions>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        </CustomBox>
      </Dialog>
    </Box>
  );
}

export default ForgotPassword;
