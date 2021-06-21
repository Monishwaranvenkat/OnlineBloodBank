import React, { useEffect, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Modal,
  Dialog,
  Grid,
  Select
} from "@material-ui/core";
import axios from "axios";
import { Trash, Edit } from "react-feather";
import theme from "../../theme/theme";
import routes from "../../routes";

function Donated() {

   
  const [loading, setLoading] = useState(false);
   const [blood, setBlood] = useState(""); 
  const[liveBlood,setLiveBlood]= useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function getDonatedList() {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getLiveBlood`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
	      setLiveBlood(result.data);
	       setFilteredData(result.data);
        
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDonatedList();
  }, []);



    return (
        <>
      <div style={{ width: "90%", margin: "auto" }}>
       


	<Grid container>
          <Grid item sm={6}>
            <h2>Live inventory Details</h2>
            <p>List of Live blood available in blood bank is shown here</p>
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
                    ? liveBlood
                    : liveBlood.filter((ele) => ele.user.bloodGroup === e.target.value);
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


        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: "#fff" }}>
              <TableRow>
                <TableCell style={{ color: "#000" }}>Name </TableCell>
                <TableCell style={{ color: "#000" }}>Email</TableCell>
                <TableCell style={{ color: "#000" }}>Blood Group</TableCell>
                <TableCell style={{ color: "#000" }}>DOB</TableCell>
                <TableCell style={{ color: "#000" }}>Mobile Number</TableCell>
                <TableCell style={{ color: "#000" }}>Address</TableCell>
                <TableCell style={{ color: "#000" }}>Donated Date</TableCell>
                <TableCell style={{ color: "#000" }}>Expiry Date</TableCell>
		<TableCell style={{ color: "#000" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) =>(
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.user.name}
                    </TableCell>
                    <TableCell>{row.user.email}</TableCell>
                    <TableCell>{row.user.bloodGroup}</TableCell>
                    <TableCell>{row.user.dob}</TableCell>
                    <TableCell>{row.user.phone}</TableCell>
                    <TableCell>{`${row.user.country},${row.user.state},${row.user.city}`}</TableCell>
                    <TableCell>
                      {row.date}
                     
                    </TableCell>
                    <TableCell>
                      {row.expiryDate}
                    </TableCell>
		     <TableCell>
                      {row.quantity}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
               	 <TableCell colSpan={8}>
                  {" "}
                  <h2 style={{ textAlign: "center" }}>There is no blood available in inventory!.</h2>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
         <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
    )
}

export default Donated