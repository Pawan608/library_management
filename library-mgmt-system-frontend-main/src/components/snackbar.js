import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSnabarStore } from "../store/zustandstore";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars({ children }) {
  const { message, status, setCloseSnackbar, openSnackbar } = useSnabarStore();
  //   console.log("message from snakbar", message);
  //   const [open, setOpen] = React.useState(false);
  const handleClose = (_, reason) => {
    // console.log(event);
    if (reason === "clickaway") {
      return;
    }
    setCloseSnackbar();
    // setOpen(false);
  };

  React.useEffect(() => {
    if (openSnackbar)
      setTimeout(() => {
        setCloseSnackbar();
      }, 4000);
  }, [openSnackbar]);
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {/* This is a success message! */}
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  );
}
