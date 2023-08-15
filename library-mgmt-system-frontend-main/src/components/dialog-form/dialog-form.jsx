import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import BasicSelect from "../../layouts/select";
import { FormControl, Grid } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
// import { InputLabel } from "@mui/material";
import DataTable from "../../layouts/import-table";
import { axiosFetch } from "../../axios/axiosFetch";
import { axiosPatch } from "../../axios/axiosPatch";
import { useCSRFstore } from "../../store/zustandstore";
import { useBookImport } from "../../store/zustandstore";
const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 800px; /* Adjust the width as needed */
    min-width: 800px;
  }
`;
export default function FormDialog() {
  // handles opening and closing of dialog box
  const [open, setOpen] = React.useState(false);

  // stores search by value for book
  const [searchBy, setSearchBy] = React.useState("");
  const { csfrValue } = useCSRFstore();
  //console.log(searchBy);
  // stores form data for book search
  const [triggerCall, setTriggercall] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [formData, setFormData] = React.useState("");
  const { bookList, setBookList } = useBookImport();

  const getbooks = async () => {
    const url = `https://frappe.io/api/method/frappe-library?page=${page}&${
      formData ? `${searchBy}=${formData.trim().split(" ").join("%20")}` : ""
    }`;
    const response = await axiosPatch("library/books", csfrValue, { url });

    if (response.status == "success") {
      // console.log(response.status);
      setBookList(response.data);
    }
    // console.log("all books", response);
  };
  React.useEffect(() => {
    getbooks();
  }, [triggerCall]);
  const handleSearch = () => {
    setPage(1);
    setBookList([]);
    getbooks();
  };
  // functions handling opening and closing of dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSearchBy("");
    setPage(1);
    setFormData("");
    setOpen(false);
  };
  // function to handle search

  // function to handle import of books to database using APIs
  const handleImport = () => {
    // call api to import books to library
    // if success then
    handleClose();
    // else display error
  };
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        style={{ borderRadius: "15px" }}
      >
        Add Book
      </Button>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add book to the library please enter the number of books to be
            imported, and kindly select the list of books to be imported
          </DialogContentText>
          <Grid
            container
            alignItems={"center"}
            spacing={2}
            sx={{ mt: "10px", marginBottom: "15px" }}
          >
            <BasicSelect searchBy={searchBy} setSearchBy={setSearchBy} />
            <Grid item xs={6} sx={{ minWidth: 120 }}>
              {searchBy !== "" && (
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Search By</InputLabel> */}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={formData}
                    label={searchBy}
                    onChange={(event) => setFormData(event.target.value)}
                    type="text"
                    variant="outlined"
                  />
                </FormControl>
              )}
            </Grid>
            <Grid item xs={3}>
              {searchBy !== "" && (
                <Button variant="filled" onClick={handleSearch}>
                  Search
                </Button>
              )}
            </Grid>
          </Grid>
          {bookList.length && (
            <DataTable
              setPage={setPage}
              page={page}
              setTriggercall={setTriggercall}
              triggerCall={triggerCall}
              handleClose={handleClose}
            />
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </StyledDialog>
    </div>
  );
}
