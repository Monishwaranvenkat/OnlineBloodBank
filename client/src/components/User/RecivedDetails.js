import React, { useContext, useEffect, useState } from "react";

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
  Container
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

function RecivedDetails({id}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(true);
  const classes = useRowStyles();

  async function getRecivedList() {
    setLoading(true);
    let result;
	
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/GetRecivedDetailByUser?id=${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setData(result.data);
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
        <TableCell component="th" scope="row" >{row.date}</TableCell>
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
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Date</TableCell>
              <TableCell >Blood Group</TableCell>
              <TableCell >Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </>
  );
}

export default RecivedDetails;
