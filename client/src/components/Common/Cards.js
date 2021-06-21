import React from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import "./Cards.css";
const useStyles = makeStyles({
  root: {},
});

export default function Cards(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className="cards-image"
          alt={props.data.alt}
          image={props.image}
          title={props.data.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {props.data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href="signup">
          <Button size="small" color="primary" variant="contained">
            Get Started
          </Button>
        </Link>
        <p>Have an Account ?</p>
        <Link href="login">
          <Button size="small" color="secondary" variant="contained">
            -{">"} Login
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
