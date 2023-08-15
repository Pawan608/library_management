import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
// import { axiosPost } from "../axios/axiosPost";
import { useBookData, useSnabarStore } from "../store/zustandstore";
import { axiosPatch } from "../axios/axiosPatch";
import { useCSRFstore } from "../store/zustandstore";
import IsuueBookDialog from "../components/dialog-form/issueBookDialog";
const ExistingBooksTable = () => {
  // const rows = [
  //   { title: "Harry Potter", author: "J.K. Rowling", id: "156118961551" },
  //   { title: "War and Peace", author: "Leo tolestoy", id: "256118961551" },
  // ];
  // console.log("bookData", bookList);
  const { bookData } = useBookData();
  const [rows, setRows] = React.useState([]);
  const [openIssueDialog, setOpenIssueDialog] = React.useState(false);
  const [index, setIndex] = React.useState(-1);
  const { setSuccess, setError } = useSnabarStore();
  const { csrfValue } = useCSRFstore();
  React.useEffect(() => {
    setRows(
      bookData.map((book, index) => {
        return {
          title: book.title || "No Data",
          author: book.authors,
          id: book.isbn,
          rent: book.price_per_day,
          stock: book.stock,
          index: index,
        };
      })
    );
  }, [bookData]);
  console.log("rowsss", rows);
  const handleChangeRent = async (isbn, rent) => {
    // console.log("rent", { rent });
    const response = await axiosPatch(
      `library/books/changerent/${isbn}`,
      csrfValue,
      { rent }
    );
    // console.log("response", response);
    if (response.status == "success") {
      setSuccess(response.message);
    } else {
      setError(response.message);
    }
  };
  const columns = [
    { field: "title", align: "left", headerName: "Title", width: 200 },
    { field: "author", align: "left", headerName: "Author", width: 200 },
    { field: "id", align: "left", headerName: "ISBN", width: 200 },
    { field: "stock", align: "left", headerName: "Stock", width: 200 },
    {
      field: "rent",
      headerName: "Rent of Book",
      width: 200,
      renderCell: (params) => {
        return (
          <TextField
            value={params.row.rent}
            type="number"
            variant="outlined"
            onChange={(event) => {
              setRows((prev) => {
                prev[params.row.index].rent = event.target.value;
                return [...prev];
              });
            }}
          />
        );
      },
    },
    {
      field: "updateRent",
      headerName: "Update Rent",
      width: 200,
      renderCell: (params) => {
        // console.log("params", params);
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleChangeRent(params.row.id, params.row.rent);
            }}
          >
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
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIndex(params?.row?.index);
              setOpenIssueDialog(true);
            }}
          >
            Issue Book
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{ borderRadius: "25px", boxShadow: 10 }}
        />
      </div>
      <IsuueBookDialog
        setOpen={setOpenIssueDialog}
        open={openIssueDialog}
        index={index}
      />
    </>
  );
};

export default ExistingBooksTable;
