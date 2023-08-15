import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import {
  useCSRFstore,
  useMemberStore,
  useSnabarStore,
} from "../../store/zustandstore";
import { axiosPost } from "../../axios/axiosPost";

export default function FormDialog() {
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    valid: false,
    showError: false,
  });
  const [open, setOpen] = React.useState(false);
  const { csfrValue } = useCSRFstore();
  const { setError, setSuccess } = useSnabarStore();
  const { setNewMember } = useMemberStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
    const response = await axiosPost(`library/member/create`, csfrValue, {
      data: { name: formData.fullname, email: formData.email },
    });
    if (response.status == "success") {
      setSuccess("Member successfully added");
      setNewMember(response.data);
      setFormData({
        fullname: "",
        email: "",
        valid: false,
        showError: false,
      });
    } else {
      setError(response.message);
    }
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
                error={formData.showError && !formData.fullname}
                margin="normal"
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                error={formData.showError && !formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: "25px" }}
                // disabled={!formData.valid}
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
