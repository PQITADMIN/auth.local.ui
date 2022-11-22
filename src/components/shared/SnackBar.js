import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**@file SnackBar.js is the snackbar component to show the various messages/notifications. */

/* @function snackbar takes two params
 * @param {object} message - have two key value pairs.<br/>
 * 1. message: string - the message to be displayed in the snackbar.<br/>
 * 2. type: string - the type of the message.e.g., error,success,info <br/>
 * @param {function} setAlertMessage - the function to set the message to empty string after 3 seconds.
 * and returns Snackbar component with
 * @returns {component} Snackbar component with the message and type.
 */
function CustomizedSnackbars({ message, setAlertMessage }) {
  useEffect(() => {
    setTimeout(() => setAlertMessage({ message: "", type: "" }), 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Snackbar
      open={message.message ? true : false}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      className={`w-full max-w-7xl pr-5 sm:px-10`}
      sx={{
        "& .MuiPaper-root ": {
          justifyContent: "center",
        },
      }}
    >
      <Alert severity={message.type} sx={{ width: "100%" }}>
        {message.message}
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbars;
