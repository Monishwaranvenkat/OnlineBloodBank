import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
  Container,
  Toolbar,
  Box,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Icon,Tooltip
} from "@material-ui/core";
import DialogCustom from "../Common/DialogCustom";

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { UserContext } from "../../contexts/userContext";
import axios from "axios";
import theme from "../../theme/theme";
import "./Home1.css";
import RecivedDetails from "./RecivedDetails";
import DonateBlood from "./DonateBlood";
import ReciveBlood from "./ReciveBlood";
import DonatedDetails from "./DonatedDetails";






function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



function Home1() {
  const { name } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("1990-05-24");
  const [phone, setPhone] = useState("");
  const [blood1, setBlood1] = useState("O+");
  const [country, setCountry] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("")
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
    mainGrid: {
      marginTop: theme.spacing(3),
    },

    toolbar: {
      zIndex: "9em",
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: "0",
      padding: "1em",
      backgroundColor:"#de2323",
    },
    toolbarTitle: {
      flex: 1,
    },

    toolbarSecondary: {
      justifyContent: "space-between",
      overflowX: "auto",
       backgroundColor:"#d32f2f",
       color:"white"
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  }));


  



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  async function getCurrentUser(id) {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/userByJwt?id=${localStorage.getItem(
          "bb_auth_token"
        )}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setUser(result.data);

        setLoading(false);
         let data = result.data;
        setName1(data.name);
        setEmail(data.email);
        setDob(data.dob);
        setCity(data.city);
        setCountry(data.country);
        setBlood1(data.bloodGroup);
        setStates(data.state);
        setPhone(data.phone);
        setPassword(data.password);
        result.data.active
          ? setAlertMessage(`Welcome back ${result.data.name}`)
          : setAlertMessage(
              `Welcome back ${result.data.name}. You have been blocked by the admin. Contact Admin for further procedure to unblock the account!`
            );
        setShowAlert(true);
        setLoading(false);

      }
    } catch (err) {
      if (err.message.includes("401")) {
        setAlertMessage(`You are not Authorized. Login to continue.`);
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "login";
        }, 2000);
      }
      window.alert(err.message);
      setLoading(false);
    }
  }


   async function editProfile(e) {
    if (password === cpassword) {
      const data = {
        name: name1,
        email,
        dob,
        phone,
        bloodGroup: blood1,
        country,
        state: states,
        city,
        password,
      };
      data.dob = dob;
      let result;
      try {
        result = await axios({
          url: `${process.env.REACT_APP_URL}/updateUser?id=${user.id}`,
          method: "put",
          data: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
          },
        });
        if (result.status === 200) {
          window.alert("Details Updated successfully");
          window.location.reload();
        } else if (result.status === 400) {
          window.alert(result.data.message);
          window.location.reload();
        }
      } catch (err) {
        err.response !== null && err.response !== undefined
          ? window.alert(err.response.data.message)
          : window.alert(err.message);
      }
    } else {
      window.alert("Password and Confirm Password doesn't match");
    }
  }
  


  
  useEffect(() => {
    getCurrentUser();
  }, []);

  
  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ margin: "0", padding: "0"}}
      >
        
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h3"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Blood Bank
          </Typography>

          <Icon style={{ marginRight: "5px" }}>
            <AccountCircleOutlinedIcon style={{ fontSize: "25" }} />
          </Icon>
          <Typography
            component="p"
            variant="p"
            color="inherit"
            align="center"
            style={{ marginRight: "2em" }}
          >
            {user.name === "" ? "User" : `${user.name}`}
          </Typography>

          <Button
            style={{ background: "#ffff", color: "#000" }}
            className="options"
            variant="outlined"
            size="small"
            onClick={() => {
              localStorage.removeItem("bb_auth_token");
              window.alert("Logged Out Successfully!");
              window.location.href = "/";
            }}
          >
            logout
          </Button>
        </Toolbar>

               <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>

                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
                 TabIndicatorProps={{
style: {
  backgroundColor: "#ffff"
 }
}}
                  >
          <Tab label="personal Details " {...a11yProps(0)} />
          <Tab label="Donate Blood" {...a11yProps(1)} />
          <Tab label="Receive Blood" {...a11yProps(2)} />
          <Tab label="Donated Details" {...a11yProps(3)} />
          <Tab label="Received Details" {...a11yProps(4)} />
        </Tabs>

      </Toolbar>
      </Container>
    
      <main>
         <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

            <TabPanel value={value} index={0}>

               <List
          component="nav"
          aria-label="secondary mailbox folders"
          style={{ width: "60%", margin: "auto" }}
        >

           

          <h3>Profile Details  &nbsp;{" "}
            <Tooltip title="Edit Profile">
            <CreateOutlinedIcon style={{ color: "teal", cursor: "pointer" }}
                onClick={() => setEdit(true)}></CreateOutlinedIcon></Tooltip> </h3>
         
          
          <hr />
        

          <Grid container>
            {Object.keys(user).map((key) => {
              if (key === "id" || key === "roles" || key === "active")
                return null;
              else {
                return (
                  <Grid item sm={6}>
                    <ListItem>
                      <p style={{ fontSize: "1rem" }}>
                        <b>{key.charAt(0).toUpperCase() + key.slice(1)} : </b>{" "}
                        {user[key]}
                      </p>
                    </ListItem>
                  </Grid>
                );
              }
            })}
          </Grid>
        </List>


      {edit && (
        <DialogCustom
          open={edit}
          setOpen={setEdit}
          name1={name1}
          setName1={setName1}
          email={email}
          setEmail={setEmail}
          dob={dob}
          setDob={setDob}
          phone={phone}
          setPhone={setPhone}
          blood1={blood1}
          setBlood1={setBlood1}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          states={states}
          setStates={setStates}
          password={password}
          setPassword={setPassword}
          cpassword={cpassword}
          setCpassword={setCpassword}
          successAction={editProfile}
          title="Edit Profile"
          type="profile"
        />
      )}
      
      </TabPanel>

      <TabPanel value={value} index={1}>
            { user.id && <DonateBlood  id={user.id} />}
      </TabPanel>
      <TabPanel value={value} index={2}>
          { user.id && <ReciveBlood  id={user.id} />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        { user.id && <DonatedDetails  id={user.id} />}
      </TabPanel>
      <TabPanel value={value} index={4}>
         <RecivedDetails
            id={user.id === null || user.id === undefined ? 2 : user.id}
          />
      </TabPanel>

      </main>
    </div>
  );
}

export default Home1;
