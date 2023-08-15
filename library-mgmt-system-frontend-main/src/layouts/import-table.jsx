import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useBookImport } from "../store/zustandstore";
import Button from "@mui/material/Button";
import { axiosPost } from "../axios/axiosPost";
import { useCSRFstore } from "../store/zustandstore";
import { useSnabarStore } from "../store/zustandstore";
export default function DataTable({
  triggerCall,
  setTriggercall,
  setPage,
  page,
  handleClose,
}) {
  const { bookList } = useBookImport();
  // console.log("book lisjahbsj", bookList);
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const { csfrValue } = useCSRFstore();
  const { setSuccess, setError } = useSnabarStore();
  // setPaginationModel((prev) => {
  //   console.log(prev);
  //   return prev;
  // });
  const handleChangePage = (event) => {
    console.log(event);

    setPaginationModel((prev) => {
      return { ...event };
    });
    // console.log("event", (event.page + 1) * 10, data.length);
    if ((event.page + 1) * 10 == data.length) {
      setTriggercall((prev) => !prev);
      setPage((page) => page + 1);
    }
  };
  React.useEffect(() => {
    setData([
      ...data,
      ...bookList.map((book, index) => ({
        id: index,
        title: book.title,
        authors: book.authors,
        isbn: book.isbn,
        stock: 0,
        bookID: book.bookID,
        average_rating: book.average_rating,
        isbn13: book.isbn13,
        language_code: book.language_code,
        ratings_count: book.ratings_count,
        text_reviews_count: book.text_reviews_count,
        publication_date: book.publication_date,
        publisher: book.publisher,
        price_per_day: 20,
      })),
    ]);
  }, [bookList]);
  const handleInputChange = (id, field, value) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(newData);
  };
  const handleImport = async () => {
    const newData = rowSelectionModel.map((el) => {
      // if (!data[el].stock) return;
      return { ...data[el] };
    });
    // console.log("new Data", newData);
    console.log({
      data: newData,
    });
    if (newData.length) {
      const response = await axiosPost(`library/books/create`, csfrValue, {
        data: newData,
      });
      if (response.status == "success") {
        setSuccess("Book successfully imported");
        handleClose();
      } else {
        setError(response.message);
      }
    }
  };
  console.log("new selection", rowSelectionModel);
  const columns = [
    { field: "title", headerName: "Title", width: 130 },
    { field: "authors", headerName: "Author", width: 130 },
    { field: "isbn", headerName: "ISBN", width: 130 },
    {
      field: "numBooks",
      headerName: "Number of Books",
      width: 200,
      renderCell: (params) => (
        <TextField
          value={params.row.stock || ""}
          onChange={(e) =>
            setData((prev) => {
              console.log(params);
              params.row.stock = Number(e.target.value);
              prev[params.row.id].stock = Number(e.target.value);
              return [...prev];
            })
          }
          type="number"
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          // pageSize={1}
          checkboxSelection
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          // rowCount={""}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          onPaginationModelChange={(prev) => handleChangePage(prev)}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          isRowSelectable={(params) => params.row.stock > 0}
          rowSelectionModel={rowSelectionModel}
        />
      </div>
      <Button
        variant={!rowSelectionModel.length ? "disabled" : "contained"}
        onClick={handleImport}
        sx={{ mt: "10px" }}
      >
        Import All
      </Button>
    </>
  );
}
