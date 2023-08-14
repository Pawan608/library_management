import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";

const ExistingBooksTable = ({ setBookList, bookList }) => {
  const rows = [
    { title: "Harry Potter", author: "J.K. Rowling", id: "156118961551" },
    { title: "War and Peace", author: "Leo tolestoy", id: "256118961551" },
  ];
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (bookList.length) {
      const newRow = bookList.forEach((book) => {
        return { title: book.title };
      });
    }
  }, [bookList]);
  const columns = [
    { field: "title", align: "left", headerName: "Title", width: 200 },
    { field: "author", align: "left", headerName: "Author", width: 200 },
    { field: "id", align: "left", headerName: "ISBN", width: 200 },
    {
      field: "rent",
      headerName: "Rent of Book",
      width: 200,
      renderCell: (params) => {
        return (
          <TextField
            value={params.row.rent || 0}
            onChange={(e) =>
              handleInputChange(params.row.id, "rent", e.target.value)
            }
            type="number"
            variant="outlined"
          />
        );
      },
    },
    {
      field: "updateRent",
      headerName: "Update Rent",
      width: 200,
      renderCell: (params) => {
        console.log("params", params);
        return (
          <Button variant="contained" color="primary">
            Update Rent
          </Button>
        );
      },
    },
    {
      field: "issueBook",
      headerName: "Issue Book",
      width: 200,
      renderCell: (params) => {
        console.log("params", params);
        return (
          <Button variant="contained" color="primary">
            Issue Book
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ borderRadius: "25px", boxShadow: 10 }}
      />
    </div>
  );
};

export default ExistingBooksTable;
