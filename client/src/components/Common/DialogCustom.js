import React from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  TextField,
  makeStyles
} from "@material-ui/core";
import theme from "../../theme/theme";

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function DialogCustom(props) {
    const classes = useStyles();
  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.type === "receive" && (
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <Select
                    native
                    value={props.blood}
                    required
                    fullWidth
                    onChange={(e) => props.setBlood(e.target.value)}
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
                <Grid item sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="count"
                    label="Quantity"
                    name="Quantity"
                    autoComplete="Quantity"
                    value={props.count}
                    onChange={(e) => props.setCount(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
            {props.type === "donate" && (
              <ol>
                <li>&nbsp;&nbsp; You must be fit and healthy.</li>
                <li>
                  &nbsp;&nbsp; You should not be suffering from transmittable
                  diseases.
                </li>
                <li>
                  &nbsp;&nbsp; Age and weight- You must be 18–65 years old and
                  should <br /> &nbsp;&nbsp; weigh a minimum of 50 kg.
                </li>
                <li>
                  &nbsp;&nbsp; Pulse rate- Between 50 and 100 without
                  irregularities.
                  <br /> &nbsp;&nbsp; Hemoglobin level- A minimum of 12.5 g/dL.
                </li>
              </ol>
            )}
            { props.type === "profile" && (
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       autoComplete="name"
                       name="name"
                       variant="outlined"
                       required
                       fullWidth
                       id="firstName"
                       label="First Name"
                       autoFocus
                       value={props.name1}
                       onChange={(e) => props.setName1(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="email"
                       label="Email"
                       name="email"
                       autoComplete="email"
                       value={props.email}
                       onChange={(e) => props.setEmail(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       required
                       fullWidth
                       id="date"
                       variant="outlined"
                       label="Date of Birth"
                       type="date"
                       className={classes.textField}
                       InputLabelProps={{
                         shrink: true,
                       }}
                       value={props.dob}
                       onChange={(e) => props.setDob(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="mobile"
                       label="Mobile Number"
                       name="mobile"
                       autoComplete="mobile"
                       value={props.phone}
                       onChange={(e) => props.setPhone(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <Select
                       native
                       value={props.blood1}
                       required
                       fullWidth
                       onChange={(e) => props.setBlood1(e.target.value)}
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
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="country"
                       label="Country"
                       name="country"
                       autoComplete="country"
                       value={props.country}
                       onChange={(e) => props.setCountry(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="state"
                       label="State"
                       name="state"
                       autoComplete="state"
                       value={props.states}
                       onChange={(e) => props.setStates(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="city"
                       label="City"
                       name="city"
                       autoComplete="city"
                       value={props.city}
                       onChange={(e) => props.setCity(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       name="password"
                       label="Password"
                       type="password"
                       id="password"
                       autoComplete="current-password"
                       value={props.password}
                       onChange={(e) => props.setPassword(e.target.value)}
                     />
                   </Grid>
                   <Grid item xs={12} sm={6}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       name="confirm password"
                       label="Confirm Password"
                       type="password"
                       id="confirm password"
                       autoComplete="confirm-password"
                       value={props.cpassword}
                       onChange={(e) => props.setCpassword(e.target.value)}
                     />
                   </Grid>
                 </Grid>

            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.setOpen(false)}
            color="secondary"
            size="small"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => props.successAction()}
            color="primary"
            autoFocus
            size="small"
            variant="contained"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogCustom;