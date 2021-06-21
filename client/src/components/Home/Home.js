import React from "react";
import blood from "../../assests/cardbg.jpg";
import {
  Grid,
  makeStyles,
  Toolbar,
  Button,
  Typography,
  CssBaseline,
  Container,
  Paper,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import "./Home.css";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },

  toolbar: {
    zIndex: "5em",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#c1281f",
    color: "white",
    margin: "0",
    padding: "1em",
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: "blood",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: "1em",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },

  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Home() {
  const classes = useStyles();
  return (
    <div style={{ overflow: "hidden" }}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{ margin: "0", padding: "0" }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            Blood Bank
          </Typography>
          
          <Button
            style={{ background: "#ffff", color: "#000",marginRight:"1em" }}
            className="options"
            variant="outlined"
            size="small"
            href="/signup"
          >
            Sign up
          </Button>
          

          <Button
            style={{ background: "#ffff", color: "#000" }}
            className="options"
            variant="outlined"
            size="small"
            href="/login"
          >
            login
          </Button>
        </Toolbar>

        <br></br>

        <Container maxWidth="xl">
          <Paper
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${blood})` }}
          >
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    Online Blood bank
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    You Can’t Buy A Life For Someone With Money, But You Can
                    Save A Life Of Someone By Donating Blood To Him.
                    <br></br>
                    <br></br>
                    <Button
                      style={{ background: "black", color: "#fff" }}
                      className="options"
                      variant="outlined"
                      size="large"
                      color="info"
                      href="/login"
                    >
                      Donate Now
                    </Button>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <CardActionArea component="a">
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Typography component="h3" variant="h5">
                            Five Reasons Why You Should Donate Blood
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Typography variant="subtitle1" paragraph>
                            1. Development of new red blood cells
                          </Typography>

                          <Typography variant="subtitle1" paragraph>
                            2. Reducing risk of heart disease
                          </Typography>

                          <Typography variant="subtitle1" paragraph>
                            3. Burns calories
                          </Typography>

                          <Typography variant="subtitle1" paragraph>
                            4. Free blood test
                          </Typography>

                          <Typography variant="subtitle1" paragraph>
                            5.Save lives
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                     <Copyright />
                  </div>
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
          
        </Container>
      </Container>
     

     
    </div>
  );
}

export default Home;
