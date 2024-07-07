
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from '@mui/material';
import { nanoid } from 'nanoid';



  function EditForm({ onClose, title, handleSubmit , initialValues }) {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const uniqueId = nanoid();
    const [formValues, setFormValues] = useState(initialValues);
  
    const handleFormSubmit = (values) => {
      
        handleSubmit({...formValues,...values});
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
       
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
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


const checkoutSchema = yup.object().shape({
    description: yup.string().required("required"),
  name: yup.string().required("required")
});


export default EditForm;
