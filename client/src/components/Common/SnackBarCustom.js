import React from "react";
import { Snackbar, IconButton, Slide } from "@material-ui/core";
import { X } from "react-feather";

function SlideTransition(props) {
    return <Slide {...props} direction="top" />;
  }

function SnackBarCustom(props) {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={() => props.setOpen(false)}
        message={props.message}
        TransitionComponent={SlideTransition}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => props.setOpen(false)}
            >
              <X fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default SnackBarCustom;