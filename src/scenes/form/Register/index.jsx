import { useState, useEffect } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, IconButton, Box, Stack, Stepper, Step, StepLabel,Paper, Checkbox,RadioGroup,
  Typography, useMediaQuery, styled,  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText, Switch
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import Check from '@mui/icons-material/Check';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { tokens } from "../../../theme";
import { useTheme } from '@mui/material/styles';
import { post } from '../../../data/service/api';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { getAuth, RecaptchaVerifier, createUserWithEmailAndPassword } from "firebase/auth";
import db from '../../../uath/firebase';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonAddIcon />,
    2: <AutoStoriesIcon />,
    3: <TaskAltIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['Personal Details', 'Terms & Conditions', 'Completed'];


const requiredFields = ['firstname', 'lastname', 'email', 'contact', 'password', 'address', 'gender', 'role'];
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
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
  address: "",
  gender:"",
    role:""
};

function Register() {
  const [open, setOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const CustomBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? colors.primary[900] : colors.primary[500],
    boxShadow: 24,
    borderRadius: theme.shape.borderRadius,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };


  function omitProperty(obj, propertyToOmit) {
    const { [propertyToOmit]: omitted, ...rest } = obj;
    return rest;
  }


/*  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log("reCAPTCHA solved");
        }
      }, auth);
    }
  }, [auth]);*/


  const handleFormSubmit = () => {
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return;
    }
    console.log(formData);
    navigate('/loader');
    const request = { ...formData, theme: 'dark' };
    console.log("Record request:", request);

    setLoading(true);
    
      createUserWithEmailAndPassword(auth, request.email, request.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          post({ table: "users", record: omitProperty(request, 'password') })
            .then((record) => {
              console.log(omitProperty(request, 'password'), "Record added:", record);
              enqueueSnackbar('User added successfully!', { variant: 'success' });
              handleClose();
              navigate('/login');
            })
            .catch((error) => {
              console.error("Error adding record:", error);
              enqueueSnackbar('Failed to add user. Please try again.', { variant: 'error' });
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if(errorCode === "auth/email-already-in-use")
          {
            enqueueSnackbar('Email already in use. Try Logging in!', { variant: 'error' });
            navigate('/login');
          }else
          {
              console.error("Error signing in:", errorCode, errorMessage);
              enqueueSnackbar(`Failed to sign in user. Please try again.`, { variant: 'error' });
          }
        
        })
        .finally(() => {
          setLoading(false);
          
        });
    
  };
  const handleStepClick = (step,values) => {
    values && setFormData(values);
    console.log(formData, 'formdata');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveStep(step);
  };

  const handleTermsChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  

  return (
    <Box m="20px">
      <IconButton color="primary" aria-label="register" onClick={handleClickOpen}>
        <PersonAddIcon />
      </IconButton>
      <Dialog 
      open={open} 
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose(event, reason);
        }
      }}
      disableEscapeKeyDown
        fullWidth maxWidth='lg'>
          
        <CustomBox>
          <DialogTitle>
            <Typography
              variant="h2"
              color={colors.grey[100]}
              fontWeight="bold"
              textAlign={'center'}
              sx={{ m: "0 0 5px 0" }}
            >
              <AssignmentIndIcon fontSize="large" sx={{ marginRight: '10px', fontSize: "40px", top: "10px", position: "relative" }} />
              Register
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
                  <Stack sx={{ width: '100%', top: "10px" }} spacing={4}>
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                      {steps.map((label, index) => (
                        <Step key={label} onClick={() => index === 1 ? handleStepClick(index,values) : handleStepClick(index)}>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {activeStep === 0 && (
                      <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                          "& > div": { gridColumn: { xs: "span 4", sm: "span 2" } },
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
                          label="Email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Contact Number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contact}
                          name="contact"
                          error={!!touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{ gridColumn: "span 4" }}
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
                          sx={{ gridColumn: "span 4" }}
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
        <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  sx={{ gridColumn: "span 4" }}
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
  sx={{ gridColumn: "span 4" }}
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

                      </Box>
                    )}
                    {activeStep === 1 && (
                      <Box>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Terms and Conditions
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula nullam augue. Proin non nunc nec nisi tincidunt dapibus non nec libero. Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Nam tristique at ipsum vel vestibulum. Aenean at felis ut nunc vestibulum viverra.
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Suspendisse potenti. Praesent finibus, libero eu pretium pretium, augue risus ornare arcu, eu efficitur lectus quam ut nulla. Aliquam sollicitudin libero ac lectus scelerisque iaculis. Sed condimentum, ex eu egestas vestibulum, dolor massa consequat odio, a cursus eros velit non urna. Donec lacinia mi vitae velit scelerisque, at euismod turpis pulvinar.
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Mauris condimentum, nibh id vehicula placerat, arcu sem efficitur eros, non pretium ex risus sit amet orci. Sed tristique augue sit amet ligula pellentesque suscipit. Cras ultricies condimentum enim, non bibendum orci. Vivamus sit amet eros sit amet erat lacinia vehicula. Cras vel est vitae lacus laoreet volutpat in ac justo.
                        </Typography>
                      </Paper>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                          checked={acceptedTerms}
                          onChange={handleTermsChange}
                          color="primary"
                        />
                        <Typography variant="body2">
                          I accept the Terms and Conditions
                        </Typography>
                      </Box>
                    </Box>
                    )}
                   {activeStep === 2 && (
                    <Box>
                        <Typography variant="h4" style={{ marginBottom: '20px', textDecoration: "underline", textAlign: "center" }}>Review Your Information</Typography>
                        <Box 
                        display="grid" 
                        gap="20px" 
                        gridTemplateColumns="repeat(1, 1fr)" 
                        sx={{ width: '100%', textAlign: 'center', margin: 'auto'}}
                        >
                        <Typography variant="body1" style={{ textAlign: 'center'}}>First Name: {formData.firstname}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center'}}> Last Name: {formData.lastname}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center'}}>Email: {formData.email}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center'}}>Contact Number: {formData.contact}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center'}}>Password: {formData.password}</Typography>
                        <Typography variant="body1" style={{ textAlign: 'center'}}>Address: {formData.address}</Typography>
                        </Box>
                    </Box>
                    )}
                  </Stack>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <DialogActions>
                      <Button onClick={handleClose} color="danger">
                        Login
                      </Button>
                      <Button type="submit" color="secondary" variant="contained"  onClick={handleFormSubmit}>
                        Submit
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

export default Register;
