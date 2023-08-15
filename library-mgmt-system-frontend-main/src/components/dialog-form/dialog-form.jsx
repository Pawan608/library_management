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
  const { bookList, setBookList, setBookImportLoading, loading } =
    useBookImport();
  const [changeSearch, setChangeSearch] = React.useState(true);
  const getbooks = async (url_new = undefined) => {
 setBookImportLoading(true);
    const url =
      url_new ||
      `https://frappe.io/api/method/frappe-library?page=${page}&${
        formData ? `${searchBy}=${formData.trim().split(" ").join("%20")}` : ""
      }`;
    const response = await axiosPatch("library/books", csfrValue, { url });
    // console.log("responseee", response);
    if (response.status == "success") {
      // console.log(response.status);
      setBookList(response.data);
    }
    setBookImportLoading(false);
  };
  React.useEffect(() => {
    getbooks();
  }, [triggerCall]);
  const handleSearch = () => {
    setChangeSearch((el) => !el);
    setPage(1);
    getbooks();
  };
  // functions handling opening and closing of dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  // console.log("all books", bookList);
  const handleClose = () => {
    setSearchBy("");
    // setBookList([]);
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
            imported, and kindly select the checkbox
          </DialogContentText>
          <Grid
            container
            alignItems={"center"}
            spacing={2}
            sx={{ mt: "10px", marginBottom: "15px" }}
          >
            <BasicSelect searchBy={searchBy} setSearchBy={setSearchBy} />
            <Grid item xs={6} sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Search By</InputLabel> */}
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={formData}
                  label={
                    searchBy.slice(0, 1).toUpperCase() +
                    searchBy.slice(1).toLowerCase()
                  }
                  onChange={(event) => setFormData(event.target.value)}
                  type="text"
                  variant="outlined"
                  disabled={searchBy ? false : true}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1} sx={{ mr: "20px" }}>
              <Button
                variant="filled"
                onClick={handleSearch}
                disabled={searchBy && formData ? false : true}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                sx={{ borderRadius: "25px" }}
                onClick={() => {
                  setSearchBy("");
                  setFormData("");
                  setChangeSearch((el) => !el);
                  getbooks(
                    `https://frappe.io/api/method/frappe-library?page=${page}`
                  );
                }}
                // disabled={searchBy && formData ? false : true}
              >
                clear
              </Button>
            </Grid>
          </Grid>

          {bookList.length  ? (
            <DataTable
              setPage={setPage}
              page={page}
              setTriggercall={setTriggercall}
              triggerCall={triggerCall}
              handleClose={handleClose}
              changeSearch={changeSearch}
            />
          ) : loading ? (
            "Loading..."
          ) : (
            "No Book found"
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </StyledDialog>
    </div>
  );
}
