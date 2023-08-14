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
import { InputLabel } from "@mui/material";
import DataTable from "../../layouts/import-table";

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

  //console.log(searchBy);
  // stores form data for book search
  const [formData, setFormData] = React.useState("");

  // functions handling opening and closing of dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // store books returned by API
  const [books, setBooks] = React.useState({
    num: 0,
    array: [],
  });

  // function to handle search
  const handleSearch = () => {
    // call frappe API to get books * while calling API use searchBy value as "key" and formData value as "data" *
    // add all the data in "books.array" and update "books.num"
  };

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
            To Add book to the library please enter either book title, author
            name or ISBN
          </DialogContentText>
          <Grid container alignItems={"center"} spacing={2} sx={{ mt: "10px", marginBottom: "15px" }}>
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
          {books.num!==0 && (<DataTable />)}
        </DialogContent>
        <DialogActions>
          <Button variant={books.num===0?"disabled":"contained"} onClick={handleImport}>
            Import All
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
