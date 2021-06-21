import {
  Card,
  Button,
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Slider,
  Grid,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";

export default function ReciveBlood({id}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const [bloodCount, setBloodCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [op, setOp] = useState(0);
  const [on, setOn] = useState(0);
  const [ap, setAp] = useState(0);
  const [an, setAn] = useState(0);
  const [bp, setBp] = useState(0);
  const [bn, setBn] = useState(0);
  const [abp, setAbp] = useState(0);
  const [abn, setAbn] = useState(0);
  const [blood, setBlood] = useState("O+");
  const [count, setCount] = useState(0);
  const [max, setMax] = useState(op);


async function setMaxValue(bloodGroup)
{
  switch (bloodGroup) {
            case "O+":
              setMax(op);
             
              break;
            case "O-":
             setMax(on);
              break;
            case "A+":
              setMax(ap);
              break;
            case "A-":
              setMax(an);
              break;
            case "B+":
             setMax(bp);
              break;
            case "B-":
              setMax(bn);
              break;
            case "AB+":
              setMax(abp);
              break;
            case "AB-":
             setMax(abn);
              break;
            default:
              break;
          }
}

  async function getTotalBlood() {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getBloodstotal`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setBloodCount(result.data);
        result.data.forEach((element) => {
          switch (element.bloodGroup) {
            case "O+":
              setOp(element.count);
              setMax(element.count);
              break;
            case "O-":
              setOn(element.count);
              break;
            case "A+":
              setAp(element.count);
              break;
            case "A-":
              setAn(element.count);
              break;
            case "B+":
              setBp(element.count);
              break;
            case "B-":
              setBn(element.count);
              break;
            case "AB+":
              setAbp(element.count);
              break;
            case "AB-":
              setAbn(element.count);
              break;
            default:
              break;
          }
        });
        
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }


   async function requestingBlood() {
    setLoading(true);
    let result;
    try {
      let data = {
        bloodGroup: blood,
        quantity: count,
      };

    

      result = await axios({
        url: `${process.env.REACT_APP_URL}/reciveBlood?id=${id}`,
        method: "post",
        data: data,
         headers :{
            'Content-Type': 'application/json', 
          }
      });

      if (result.status === 200) {
        window.alert(
          "Request Sent!. Click View Requested Details to know more. "
        );
        window.location.reload();
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      err.response !== null && err.response !== undefined
        ? window.alert(err.response.data.message)
        : window.alert(err.message);
    }
  }

  const handleChange = (event, newValue) => {
    setCount(newValue);
  };

  useEffect(() => {
    getTotalBlood();
  }, []);

  const classes = useStyles();

  return (
    <>
      <Container style={{ textAlign: "center", maxWidth: "80vw" }}>
        <Typography
          component="h6"
          variant="h6"
          color="inherit"
          align="center"
          style={{ marginRight: "2em" }}
        >
          {" "}
          <strong>Total Blood Available</strong>
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>O+</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>O-</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>A+</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>A-</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>B+</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>B-</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>AB+</strong>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="inherit"
                    align="center"
                    style={{ marginRight: "2em" }}
                  >
                    {" "}
                    <strong>AB-</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{op}</TableCell>
                <TableCell>{on}</TableCell>
                <TableCell>{ap}</TableCell>
                <TableCell>{an}</TableCell>
                <TableCell>{bp}</TableCell>
                <TableCell>{bn}</TableCell>
                <TableCell>{abp}</TableCell>
                <TableCell>{abn}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <br></br>
      <Container style={{ textAlign: "center", maxWidth: "50vw" }}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
              
                <Typography
                  component="p"
                  variant="h5"
                  color="inherit"
                  align="center"
                  style={{ marginRight: "2em" }}
                >
                  <strong> blood</strong>
                  
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Select
                  native
                  value={blood}
                  required
                  fullWidth
                  
                  onChange={(e) => {
                    setBlood(e.target.value);
                    setMaxValue(e.target.value);
                    
                  }}
                  variant="outlined"
                  inputProps={{
                    name: "blood",
                    id: "blood-native-simple",
                  }}
                >
                  
                  <option value={"O+"}>O +ive</option>
                  <option value={"O-"}>O -ive</option>
                  <option value={"A+"}>A +ive</option>
                  <option value={"A-"}>A -ive</option>
                  <option value={"B+"}>B +ive</option>
                  <option value={"B-"}>B -ive</option>
                  <option value={"AB+"}>AB +ive</option>
                  <option value={"AB-"}>AB -ive</option>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  onChange={handleChange}
                  aria-label="pretto slider"
                  min={0}
                  max={max}
                  defaultValue={0}
                />
                <div>{count}</div>
              </Grid>

              <Grid item xs={12}>
                <Button style={{background:"#e83636",color:"white"}}

                onClick={(e) => {
                if (count===0) {
                  window.alert("count should not be 0");
                  
                } else {

                 requestingBlood();
                  
                }
              }}
                
                >Request</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

const PrettoSlider = withStyles({
  root: {
    color: "#e83636",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

