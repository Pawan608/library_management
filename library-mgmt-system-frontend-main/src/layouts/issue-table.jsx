import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const IssueTable = () => {
  const columns = [
    { field: "date", align: "left", headerName: "Issue Date", width: 200 },
    { field: "id", align: "left", headerName: "MemberID", width: 200 },
    { field: "isbn", align: "left", headerName: "ISBN", width: 200 },
    {
      field: "return",
      headerName: "Return Book",
      width: 200,
      renderCell: (params) => {
        console.log("params", params);
        return (
          <Button variant="contained" color="primary">
            Return Book
          </Button>
        );
      },
    },
  ];

  const rows = [
    { date: "2023-28-05", id: "bhavy#0001", isbn: "159848165151" },
    { date: "2023-08-05", id: "pawan#0001", isbn: "278948165151" },
  ];

  return (
    <div>
      <DataGrid rows={rows} columns={columns} sx={{borderRadius: "25px", boxShadow: 10}} />
    </div>
  );
};

export default IssueTable;
