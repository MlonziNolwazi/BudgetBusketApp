import { useContext, useState } from "react";
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { tokens, ColorModeContext } from "../../../../theme";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useAuth } from '../../../../uath/AuthenticationContex';
import ForgotPassword from '../../forgotpassword';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as database } from '../../../../uath/firebase';
import { enqueueSnackbar } from 'notistack';
import Loader from '../../../../components/Loader';
import { useEffect } from "react";
import { get } from "../../../../data/service/api";
import { where } from "firebase/firestore";


function Login() {
  const [open, setOpen] = useState(true);
  const { login, upDateUserDetails } = useAuth();
  const navigate = useNavigate();
  let userCredentials = null;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const CustomBox = styled(Box)(({ theme }) => ({
 
    backgroundColor: theme.palette.mode === 'light' ? colors.primary[900] :colors.primary[500], // Default background color
    boxShadow: 24,
    borderRadius: theme.shape.borderRadius,
    // Custom background image
    //backgroundImage: 'url("../../assets/lwah_30.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }));


  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegisterRedirect = () => {
    setOpen(false);
    navigate('/register'); // Redirect to register
  };

  const handleForgotPasswordRedirect = () => {
    setOpen(false);
    navigate('/forgotpassword'); // Redirect to forgot password
  };



  const auth = useAuth();

  const status = localStorage.getItem("Status");

  useEffect(() => {
    console.log(userCredentials,"this is a useeffect");
      
    async function fetchData() {
      console.log(userCredentials,"this is a useeffect");
      
      if(userCredentials){
        const request = {
          //statement: where("email", "==", "nolwazimlonzi@gmail.com"),
        // statement: where("email", "==", "admin@gmail.com"),
          statement: where("email", "==", userCredentials.email),
          table: "users"
        };

        get(request).then((response) => {
        // setMode(response[0].theme);
        //upDateUserDetails();
          //localStorage.setItem("LoggedInUserDetails", JSON.stringify(response[0]));
          console.log(userCredentials,"loggedInUserDetails", auth);
          
        });
    }
  }

    fetchData();
  }, []);



  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  navigate('/loader'); // Redirect to dashboard
    signInWithEmailAndPassword(database, values.email, values.password).then((userCredential) => {
      userCredentials = userCredential.user;
     
      
        const request = {
          //statement: where("email", "==", "nolwazimlonzi@gmail.com"),
        // statement: where("email", "==", "admin@gmail.com"),
          statement: where("email", "==", userCredential?.user?.email),
          table: "users"
        };

        get(request).then((response) => {
        // setMode(response[0].theme);
        upDateUserDetails(response[0]);
        colorMode.userThemeColor(response[0].theme);
        theme.palette.mode = response[0].theme;
         // localStorage.setItem("LoggedInUserDetails", JSON.stringify(response[0]));
          console.log(response,"loggedInUserDetails from login component, response[0].theme", response[0].theme);
          
        });
     
      console.log('Successfully logged in',userCredential);
      
      login();
      handleClose();
      const timer = setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard
        enqueueSnackbar('Successfully logged in', { variant: 'success' });
      }, 3000);
    
      
    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;

      if(errorCode === 'auth/invalid-credential')
      {
        enqueueSnackbar('Invalid Username/Password', { variant: 'error' });
        navigate('/login'); // Redirect to dashboard
      }else{
        enqueueSnackbar(`Error logging in`, { variant: 'error' });
        console.log('Error logging in:', errorMessage);
        navigate('/login'); // Redirect to dashboard
      }
     
    });
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box m="20px">
     
       <Dialog 
            open={open} 
            fullWidth maxWidth='sm' 
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
        color={colors.grey[100]}
        fontWeight="bold"
        textAlign={'center'}
        sx={{ m: "0 0 5px 0" }}
       
      >
        
         <LoginIcon style={{ marginRight: '10px', fontSize: "40px", top: "10px" , position: "relative"}}></LoginIcon>
            Login
         
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
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" mt="20px">
                  <Button onClick={handleForgotPasswordRedirect} color="info">
                    Forgot Password?
                  </Button>
                  <DialogActions>
                    <Button onClick={handleRegisterRedirect} color="danger">
                      Register
                    </Button>


                    <Button type="submit" color="secondary" variant="contained">
                    Login
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

export default Login;
