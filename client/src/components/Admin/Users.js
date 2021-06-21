  
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
  Select,
  Grid,
  InputLabel,
  FormControl,
  Tooltip,
  Dialog,
  IconButton,
  Button,
  Snackbar 
} from "@material-ui/core";
import axios from "axios";
import { Trash, Edit, UserX, UserCheck,X } from "react-feather";
import theme from "../../theme/theme";
function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blood, setBlood] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function getUsers() {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getAllUser`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setUsers(result.data);
        setFilteredUsers(result.data);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  async function getUserById(id) {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getUserById?id=${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setUser(result.data);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  async function blockUser(id){
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/blockUser?id=${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setAlertMessage(`User with id=${id} is Blocked`)
        setShowAlert(true);
        let updateId =  users.map((value,index)=>{
          if(value.id === id) {
            value.active = false;
            return value;
          }
          else return value;
        })
        setUsers(updateId);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  async function UnblockUser(id){
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/unblockUser?id=${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setAlertMessage(`User with id=${id} is Unblocked`)
        setShowAlert(true);
        let updateId =  users.map((value,index)=>{
          if(value.id === id) {
            value.active = true;
            return value;
          }
          else return value;
        })
        setUsers(updateId);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  async function deleteUser(id){
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/deleteUser?id=${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setAlertMessage(`User with id=${id} is Deleted`)
        setShowAlert(true);
        let userList =  users.filter((ele) => ele.id !== id);
        setUsers(userList);
        setFilteredUsers(userList);
        setLoading(false);
      }
    } catch (err) {
      if(err.message.includes("500")) {
        setAlertMessage("Delete Failed! As user has donated or recieved blood. Delete those records before deleting user!");
        setShowAlert(true);
        setLoading(false);
      }
      else{
        setAlertMessage(err.message);
        setLoading(false);
      }    
    }
  }



  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div style={{ width: "90%", margin: "auto" }}>
        <Grid container>
          <Grid item sm={2}>
            <h2>List of All Users</h2>
          </Grid>
          <Grid item sm={3}>
            <p style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
              Filter Users by blood group
            </p>
          </Grid>
          <Grid item sm={2}>
            <Select
              native
              value={blood}
              required
              label="Mobile Number"
              fullWidth
              onChange={(e) => {
                setBlood(e.target.value);
                let filterUsers =
                  e.target.value === ""
                    ? users
                    : users.filter((ele) => ele.bloodGroup === e.target.value);
                setFilteredUsers(filterUsers);
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
                <TableCell style={{ color: "#000" }}>Active Status</TableCell>
                <TableCell style={{ color: "#000" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((row) => (
                  <TableRow
                    key={row.name}
                    hover
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   setOpen(true);
                    //   getUserById(row.id);
                    // }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.bloodGroup}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{`${row.country},${row.state},${row.city}`}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        style={{ background: row.active ? "green" : "red" }}
                        label={row.active ? "Active" : "Not Active"}
                      />
                    </TableCell>
                    {row.email==="admin@admin.com"?<TableCell></TableCell>:
                    <TableCell>
                      <Tooltip title="Delete User" >
                        <Trash className="tooltip" onClick={()=> deleteUser(row.id)}  style={{ color: "red", margin: "0.2rem" }} />
                      </Tooltip>
                     
                      {row.active ? (
                        <Tooltip title="Block User">
                          <UserX className="tooltip" onClick={()=> blockUser(row.id)} style={{ color: "red", margin: "0.2rem" }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unblock User">
                          <UserCheck className="tooltip"
                          onClick={()=> UnblockUser(row.id)} 
                            style={{ color: "green", margin: "0.2rem" }}
                          />
                        </Tooltip>
                      )}
                    </TableCell>
                    }
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  {" "}
                  <h2 style={{ textAlign: "center" }}>No Data Found!.</h2>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog open={open} className="dialog-1" onClose={() => setOpen(false)}>
          <div
            style={{
              background: "#fff",
              color: "#000",
              padding: "2%",
              margin: "auto",
              minWidth: "30vw",
            }}
          >
            <h3> User Detail</h3>
            <hr />
            {user !== null ? <p>{user.dob}</p> : <p>User Not found</p>}
          </div>
        </Dialog>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={()=>setShowAlert(false)}
        message={alertMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>setShowAlert(false)}>
              <X fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Users;