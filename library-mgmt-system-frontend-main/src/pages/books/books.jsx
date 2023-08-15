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
  const [bookList, setBookList] = React.useState([]);
  const getbooks = async () => {
    const url = `library/books/search/?${
      formData ? `${searchBy}=${formData.trim().split(" ").join("%20")}` : ""
    }`;
    console.log("books url", url);
    const response = await axiosFetch(url);
    if (response.status == "success") {
      setBookList(response.data);
    }
    // console.log("all books", response);
  };
  React.useEffect(() => {
    getbooks();
  }, []);
  // function to handle search
  const handleSearch = () => {
    // console.log("handle serach called");
    getbooks();
    // call frappe API to get books * while calling API use searchBy value as "key" and formData value as "data" *
    // use "createData" function to populate rows array
  };
  // console.log(" all mbooks", bookList);
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
          <Grid item xs={6} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={formData}
                label={searchBy}
                type="text"
                variant="outlined"
                onChange={handleChnage}
                // error={isTouched && !searchBy}
                helperText={
                  isTouched && searchBy == ""
                    ? "Please select the search by option from the dropdown"
                    : ""
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ borderRadius: "25px" }}
            >
              <IconButton>
                <SearchIcon color="white" />
              </IconButton>
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ExistingBooksTable setBookList={setBookList} bookList={bookList} />
    </div>
  );
}
