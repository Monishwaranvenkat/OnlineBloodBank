import React, { useEffect, useContext} from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Globe as GlobeIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinus,
  Users as UsersIcon,
  Grid as GridIcon,
  Layout as LayoutIcon,
  ArrowLeftCircle,
  Activity
} from "react-feather";
import NavItem from "./NavItem";
import PropTypes from "prop-types";
import {UserContext} from "../../../contexts/userContext";

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    height: "calc(100%)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const {name}= useContext(UserContext);


  const items = [
    {
      href:"users",
      icon : UsersIcon,
      title : "All Users"
    },
    {
      href:"donated",
      icon : UserPlusIcon,
      title : "Blood Inventory"
    },
    {
      href:"request",
      icon : UserMinus,
      title : "Requested Data"
    },

    {
      href: "/login",
      icon: LockIcon,
      title: "Logout",
    }
  ];
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column" style={{background:"red"}}>
      {/* <img src={Currys} alt="profile_image" style={{ width: "80%",margin:"auto" }} />
      <Divider /> */}

      <Box alignItems="center" display="flex" flexDirection="column" p={2} className={classes.drawer}>
        <Avatar
          className={classes.avatar}
          src={""}
        />
        <Typography className={classes.name} color="white" variant="h5">
          Admin
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {/*user.jobTitle*/}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.title !== "Logout" ? item.href : ""}
              key={item.title}
              title={item.title}
              icon={item.icon}
              onClick = {()=>{
                if(item.title === "Logout"){
                  localStorage.removeItem("bb_auth_token");
                  window.alert("Logged Out Successfully!");
                  window.location.href = "/";
                }
              }}
            />
          ))}
          
          <br />
          <hr />
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};


NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;