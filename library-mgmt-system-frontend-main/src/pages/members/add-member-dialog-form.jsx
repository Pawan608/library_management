import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";

export default function FormDialog() {
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
    // use handleClose to close dialog box
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        style={{ borderRadius: "15px" }}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter details of client in order to add them as member of library
          </DialogContentText>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{borderRadius: "25px"}}
              >
                Register
              </Button>
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}
