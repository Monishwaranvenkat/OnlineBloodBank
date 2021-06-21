import React, { useEffect, useState } from "react";

import {
  Backdrop,
  CircularProgress,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  Paper,
  Container,
   Grid,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import theme from "../../theme/theme";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Requested() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

   const [blood, setBlood] = useState(""); 

  async function getRecivedList() {
    setLoading(true);
    let result;
	
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getRequested`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setData(result.data);
         setFilteredData(result.data);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecivedList();
  }, []);





  function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
	<TableCell component="th" scope="row" >{row.user.name}</TableCell>
        <TableCell >{row.date}</TableCell>
        <TableCell >{row.bloodGroup}</TableCell>
        <TableCell >{row.quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                List of user you Recived from
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Doanted date</TableCell>
                    <TableCell >Expiry Date</TableCell>
                    <TableCell >Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.donators.map((donaor,index) => (
                    <TableRow key={index}>
			    <TableCell  component="th" scope="row"> {donaor.user.name} </TableCell>
                      <TableCell>
                        {donaor.date}
                      </TableCell>
                      <TableCell>{donaor.expiryDate}</TableCell>
                      <TableCell >{donaor.quantity}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

  return (
    <>
     <div style={{ width: "90%", margin: "auto" }}>

	     <Grid container>
          <Grid item sm={2}>
            <h2>Received Details</h2>
          </Grid>
          <Grid item sm={3}>
            <p style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
              Filter by blood group
            </p>
          </Grid>
          <Grid item sm={2}>
            <Select
              native
              value={blood}
              required
              label="Blood group"
              fullWidth
              onChange={(e) => {
                setBlood(e.target.value);
                let filter =
                  e.target.value === ""
                    ? data
                    : data.filter((ele) => ele.bloodGroup === e.target.value);
                setFilteredData(filter);
              }}
              style={{ height: "3rem", marginTop: "1rem" }}
              variant="outlined"
              inputProps={{
                name: "blood",
                id: "blood-native-simple",
              }}
            >
              <option value={""}>Show All</option>
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
        </Grid>
        <br />

    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
	      <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell >Blood Group</TableCell>
              <TableCell >Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
		   {filteredData.length > 0 ? (
			   filteredData.map((row,index) => (
              <Row key={index} row={row} />
            )))

                 : (

			 <TableCell colSpan={8}>
                  {" "}
                  <h2 style={{ textAlign: "center" }}>No Data Found!.</h2>
                </TableCell>

			
               
              )}

           
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
	</div>
    </>
  );
}

export default Requested;
