import React,{useState,useContext} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,makeStyles,Container } from '@material-ui/core';
import LockOutlined from '@material-ui/icons/LockOutlined';


import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

import SnackBarCustom from "../Common/SnackBarCustom";
import {validateEmail,validatePassword} from "../Common/validator";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Blood Bank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));


export default function Login() {
  

  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

    async function login(e) {
    e.preventDefault();

    let data = {
      email,
      password,
    };
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/login`,
        method: "post",
        data: data,
      });
      if (result.status === 200) {
        localStorage.setItem("bb_auth_token", result.data.jwt);
        window.location.reload();
      } else {
        window.alert(`${result.data.message}`);
      }
    } catch (err) {
      if (err.message.includes("401")) {
        if (err.response.data.trace.includes("Bad credentials")) {
          setOpen(true);
          setMessage("Login Failed!. Try again with the right credentials.");
        } else {
          setOpen(true);
          setMessage(
            "You are blocked by admin. You must be unblocked inorder to login. Contact Admin!"
          );
        }
      } else {
        window.alert(err.message);
      }
    }
  }

  return (

     <Container  component="main" maxWidth="xs">
        <SnackBarCustom open={open} setOpen={setOpen} message={message} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
               type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoFocus

               helperText={
                email.length > 1 && !validateEmail(email) && "Email is Not Valid"
              }
              error={email.length > 1 && !validateEmail(email)}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}

               helperText={
                password.length > 1 &&
                !validatePassword(password) &&
                "Password is not Valid. Must contain minimum 8 characters, Uppsercase, Lowercase, Numbers and one Special Characters."
              }
              error={password.length > 1  && !validatePassword(password)}
              
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                if (validateEmail(email) && validatePassword(password)) {
                  login(e);
                } else {
                  e.preventDefault();
                  setOpen(true);
                  setMessage("Email or Pasword is not valid");
                }
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
      </div>
    </Container>

  );
}