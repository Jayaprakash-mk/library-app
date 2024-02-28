import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, styled, Snackbar, SnackbarContent, Alert} from '@mui/material';
import Axios from 'axios';
import { style } from '@mui/system';
import AddBookForm from './addBookForm';
import BookList from './BookList';


const DarkContainer = styled(Container)({
  backgroundColor: '#333333', 
  padding: '20px',
  borderRadius: '8px',
});

const DarkTypography = styled(Typography)({
  color: '#FFFFFF',
});

const DarkTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
  },
  '& .MuiInputLabel-root': {
    color: '#FFFFFF', 
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#FFFFFF', 
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#FFFFFF',
  },
});

const DarkButton = styled(Button)({
  color: '#FFFFFF', 
  backgroundColor: '#2196F3', 
  '&:hover': {
    backgroundColor: '#1565C0',
  },
});

const AdminLogin = (props) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  });

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showEmailErrorAlert, setEmailErrorAlert] = useState(false);
  const [showPasswordErrorAlert, setPasswordErrorAlert] = useState(false);
  const [who, setWho] = useState(false);
  const [user, setUser] = useState(false);

  const handleInputChange = (e, isLogin) => {
    const { name, value } = e.target;

    if (isLogin) {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLogin = () => {
    Axios.post('https://considerable-harlie-jayaprakashmk.koyeb.app/login',loginData)
      .then((response) => {
        console.log(response.data);
        if(response.data.isAdmin){
          props.choice1(true);
          setWho(true);
          setUser(false);
        }
        else{
          props.choice2(true);
          setUser(true);
          setWho(false);

        }
      })
      .catch((error) => {
        console.error('Login error:', error.response?.data?.message || 'Unknown error');
      });
  };

  const handleSignUp = () => {

    Axios.post('https://considerable-harlie-jayaprakashmk.koyeb.app/signup', signupData)
      .then((response) => {
        console.log(response.data);
        if(response.data.message === "Invalid email id"){
          setEmailErrorAlert(true);
          return;
        }
        else if(response.data.message === "weak password error"){
          setPasswordErrorAlert(true);
          return;
        }
        else {
          setAlertMessage("successfully Signed up!!!");
          setOpenSnackbar(true);
          console.log(response.error);
        }
        
      })
      .catch((error) => {
        setAlertMessage("Something wrong!!!");
        console.error('Signup error:', error.response?.data?.message || 'Unknown error');
      });
  };

  const toggleFormView = () => {
    setIsLoginPage((prevIsLoginPage) => !prevIsLoginPage);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  return (
    <>
    <Typography variant="h2" gutterBottom style={{marginTop: '20px', fontWeight: 'bold', marginLeft: '470px'}}>
          Library Management
    </Typography>
    <DarkContainer maxWidth="sm" style={{ marginTop: '100px', padding: '2rem' }}>
      <DarkTypography variant="h4" align="center" gutterBottom>
        {isLoginPage ? 'Login' : 'Sign Up'}
      </DarkTypography>
      {isLoginPage ? (
        <>
          <DarkTextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={loginData.email}
            onChange={(e) => handleInputChange(e, true)}
          />
          <DarkTextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={loginData.password}
            onChange={(e) => handleInputChange(e, true)}
          />
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <DarkButton variant="contained" onClick={handleLogin}>
              Login
            </DarkButton>
            <DarkButton variant="outlined" onClick={toggleFormView}>
              Sign UP
            </DarkButton>
          </Box>
        </>
      ) : (
        <>
          <DarkTextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={signupData.email}
            onChange={(e) => handleInputChange(e, false)}
          />
          <DarkTextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={signupData.password}
            onChange={(e) => handleInputChange(e, false)}
          />
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <DarkButton variant="contained" onClick={handleSignUp}>
              Sign Up
            </DarkButton>
            <DarkButton variant="outlined" onClick={toggleFormView}>
              Back to Login
            </DarkButton>
          </Box>
          
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <SnackbarContent
              message={alertMessage}
              style={{ backgroundColor: 'green', color: 'white' }}
            />
          </Snackbar>
        </>
      )}
    </DarkContainer>
    {showEmailErrorAlert && (
        <Alert style={{margin: 'auto',marginTop: '50px',width: '35%',}} severity="error" onClose={() => setEmailErrorAlert(false)}>
          Invalid Email Id.
        </Alert>
      )}
      {showPasswordErrorAlert && (
        <Alert style={{margin: 'auto',marginTop: '50px',width: '35%',}} severity="error" onClose={() => setPasswordErrorAlert(false)}>
          Password must contain 6 characters, atleast 1 lowerCase, atleast 1 UpperCase, atleast 1 digit.
        </Alert>
      )}
      
    </>
  );
};

export default AdminLogin;
