import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosPost } from "../../axios/axiosPost";
import { useBookData, useCSRFstore } from "../../store/zustandstore";
import { useSnabarStore } from "../../store/zustandstore";
export default function IsuueBookDialog({ setOpen, open, index }) {
  const { csfrValue } = useCSRFstore();
  const { bookData, setDecreaseBookStock } = useBookData();
  const [memberID, setMemberID] = React.useState("");
  const { setSuccess, setError } = useSnabarStore();
  console.log(memberID);
  const handleClose = () => {
    setMemberID("");
    setOpen(false);
  };
  console.log(
    "new request",
    `library/transaction/create/${bookData[index]?.isbn}/${memberID.trim(" ")}`
  );
  const handleSubmit = async () => {
    const response = await axiosPost(
      `library/transaction/create/${bookData[index]?.isbn}/${memberID}`,
      csfrValue,
      {}
    );
    if (response.status == "success") {
      setDecreaseBookStock(index);

      handleClose();
      setSuccess("Book successfully uploadeded");
    } else {
      setError(response.message);
    }
    // console.log(response);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Issue Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This form is to issue the currently selected book
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Member ID"
            type="text"
            fullWidth
            variant="outlined"
            value={memberID}
            onChange={(event) => setMemberID(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
