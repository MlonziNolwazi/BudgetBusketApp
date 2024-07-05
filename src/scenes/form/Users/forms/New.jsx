
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import React, { useState } from 'react';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, IconButton, Box, Stack, Stepper, Step, StepLabel,Paper, Checkbox,RadioGroup,
  Typography, useMediaQuery, styled,  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText, Switch
} from '@mui/material';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";



  function NewForm({onClose, title, handleSubmit  }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const uniqueId = nanoid();
    const navigate = useNavigate();
  
    const handleFormSubmit = (values) => {
      
        handleSubmit({...values, id: uniqueId});
        
      };
    
      const steps = ['Personal Details', 'Terms & Conditions', 'Completed'];


      //const requiredFields = ['firstname', 'lastname', 'email', 'contact', 'password', 'address', 'gender', 'role'];
      const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
      
      const checkoutSchema = yup.object().shape({
        firstname: yup.string().required("required"),
        lastname: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        contact: yup
          .string()
          .matches(phoneRegExp, "Phone number is not valid")
          .required("required"),
          password: yup.string().required("Password is required"),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required"),
        address: yup.string().required("required"),
        gender: yup.string().required("Gender is required"),
        role: yup.string().required("Role is required"),
      });
      const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        address: "",
        gender:"",
          role:""
      };
    
    return (
        <>
        <Header title={title} subtitle="title" />

        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact No."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                          fullWidth
                          variant="filled"
                          type="password"
                          label="Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          error={!!touched.password && !!errors.password}
                          helperText={touched.password && errors.password}
                          sx={{ gridColumn: "span 2" }}
                        />
                         <TextField
                          fullWidth
                          variant="filled"
                          type="password"
                          label="Confirm Password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          error={!!touched.confirmPassword && !!errors.confirmPassword}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          sx={{ gridColumn: "span 2" }}
                        />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ gridColumn: "span 2" }}
                >
                <FormControl component="fieldset" error={touched.gender && !!errors.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
              {touched.gender && errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ gridColumn: "span 2" }}
            >             
            <FormControl component="fieldset" error={touched.role && !!errors.role}>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="store" control={<Radio />} label="Store" />
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
              </RadioGroup>
              {touched.role && errors.role && (
                <FormHelperText>{errors.role}</FormHelperText>
              )}
            </FormControl>
            </Box>
            <DialogActions sx={{ justifyContent: 'flex-end', gridColumn: "span 4" }}>
        <Button onClick={onClose} color="secondary">Close</Button>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </DialogActions>

      
            </Box>
           
          </form>
        )}
      </Formik>
      </>
    );
  }


 
export default NewForm;
