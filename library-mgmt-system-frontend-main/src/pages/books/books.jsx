import React from "react";
import FormDialog from "../../components/dialog-form/dialog-form";
import BasicSelect from "../../layouts/select";
import { FormControl, Grid, IconButton, Paper } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./books.css";
import ExistingBooksTable from "../../layouts/exirsting-books-table";
import { axiosFetch } from "../../axios/axiosFetch";
import ClearIcon from "@mui/icons-material/Clear";
import { useBookData } from "../../store/zustandstore";
export default function Books() {
  // stores search by value for book
  const [searchBy, setSearchBy] = React.useState("");
  // stores form data for book search
  const [formData, setFormData] = React.useState("");
  const [isTouched, setIsTouched] = React.useState(false);
  const handleChnage = (e) => {
    const { value } = e.target;
    setIsTouched(true);
    setFormData(value);
  };
  // const [bookList, setBookList] = React.useState([]);
  const { bookData, setBookData } = useBookData();
  const getbooks = async (url) => {
    // console.log("books url", url);
    const response = await axiosFetch(url);
    if (response.status == "success") {
      // console.log("response book list", response);
      setBookData(response.data);
    }
    // console.log("all books", response);
  };
  React.useEffect(() => {
    getbooks(`library/books/search/`);
  }, []);
  // function to handle search
  const handleSearch = () => {
    // console.log("handle serach called");
    getbooks(
      `library/books/search/?${
        formData ? `${searchBy}=${formData.trim().split(" ").join("%20")}` : ""
      }`
    );
    // call frappe API to get books * while calling API use searchBy value as "key" and formData value as "data" *
    // use "createData" function to populate rows array
  };
  console.log(" all mbooks", bookData);
  return (
    <div className="book">
      <div className="heading">
        <h1>Books</h1>
        <FormDialog />
      </div>
      <Paper
        elevation={10}
        style={{ borderRadius: "20px", padding: "10px", marginBottom: "25px" }}
      >
        <Grid container alignItems={"center"} spacing={2} sx={{ mt: "10px" }}>
          <BasicSelect searchBy={searchBy} setSearchBy={setSearchBy} />
          <Grid item xs={4} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={formData}
                label={
                  searchBy.slice(0, 1).toUpperCase() +
                  searchBy.slice(1).toLowerCase()
                }
                type="text"
                variant="outlined"
                onChange={handleChnage}
                // error={isTouched && !searchBy}
                disabled={searchBy ? false : true}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ borderRadius: "25px" }}
              disabled={searchBy && formData ? false : true}
            >
              <IconButton>
                <SearchIcon color="white" />
              </IconButton>
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
                getbooks(`library/books/search/`);
              }}
              // disabled={searchBy && formData ? false : true}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
              clear
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ExistingBooksTable />
    </div>
  );
}
