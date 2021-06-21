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
  Paper,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme/theme";

import axios from "axios";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function DonatedDetails({ id }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function getDonatedDetilas() {
    setLoading(true);
    let result;

    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/GetDonatedDetailByUser?id=${id}`,
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
    getDonatedDetilas();
  }, []);

  return (
    <>
      <Container>
        <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <TableContainer component={Paper}>
          <Table aria-label="donated">
            <TableHead>
              <TableRow>
                
                <TableCell>Doanted date</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((donaor, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{donaor.date}</TableCell>
                  <TableCell>{donaor.expiryDate}</TableCell>
                  <TableCell>{donaor.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default DonatedDetails;
