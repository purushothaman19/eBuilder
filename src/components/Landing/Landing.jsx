import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './landing.css';
import { useEffect, useState } from "react";


function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="primary" href="." style={{ textDecoration:'none' }}>
        ExamBuilder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function LandingPage() {

  const [spinner, showSpinner] = useState(false);
  const [vUser, setVUser]= useState(false);

  // const checkValidation = async () => { 
  //   const res = await fetch('http://localhost:3002/validUser');
  //   const user = await res.json();
  //   console.log(user);
  //   setVUser( user );
  // }

  // useEffect(()=>{   
  //     if(vUser) 
  // })

  useEffect(()=>{
       setTimeout(()=>{
           showSpinner(true);
       }, 2000);
  })

  return (
    ( spinner ? 
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1677613935629-5de03180c113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" id='getin'>
              Get in
            </Typography>
            <p id='account_text'> Use your <a style={{color:'blue'}} href='https://support.google.com/accounts/answer/27441?hl=en'> Google account </a>  to get in! </p>
            <Box component="form" sx={{ mt: 1 }}>
               
                <a href='http://localhost:3002/login' style={{ textDecoration:'none' }}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    id='getinbtn'
                >
                    Get In
                </Button>
                </a>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
      :
      <>
          <img src='https://cdn.dribbble.com/users/722246/screenshots/9714311/media/1714775b3deacede41aef42533ada46c.gif' alt='Loading' />
          <h3> Loading... </h3>
      </>
  )
  );
}