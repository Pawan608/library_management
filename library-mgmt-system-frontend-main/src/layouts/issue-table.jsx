import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useCSRFstore, useSnabarStore } from "../store/zustandstore";
import { axiosFetch } from "../axios/axiosFetch";
import { axiosPatch } from "../axios/axiosPatch";
const IssueTable = () => {
  const [transactions, setTransactions] = React.useState([]);
  const { csrfvalue } = useCSRFstore();
  const { setError, setSuccess } = useSnabarStore();
  const [rows, setRows] = React.useState([]);
  const getAllTransactions = async () => {
    const response = await axiosFetch("library/transaction/list/issued");
    if (response.status == "success") {
      setTransactions(response.data);
    }
  };
  React.useEffect(() => {
    getAllTransactions();
  }, []);
  React.useEffect(() => {
    if (transactions.length) {
      setRows(
        transactions.map((transaction, index) => ({
          id: index,
          date: transaction.created_at,
          isbn: transaction.book.isbn,
          memberID: transaction.member.memberID,
          transactionID: transaction.transaction_id,
        }))
      );
    }
  }, [transactions]);

  const handleReturn = async (transactionID, index) => {
    const response = await axiosPatch(
      `library/transaction/return/${transactionID}`,
      csrfvalue,
      {}
    );
    if (response.status == "success") {
      setSuccess("Book successfully returned");
      setTransactions((prev) => prev.filter((el, i) => i !== index));
    } else {
      setError(response.message);
    }
  };

  const columns = [
    { field: "date", align: "left", headerName: "Issue Date", width: 200 },
    { field: "memberID", align: "left", headerName: "MemberID", width: 200 },
    { field: "isbn", align: "left", headerName: "ISBN", width: 200 },
    {
      field: "return",
      headerName: "Return Book",
      width: 200,
      renderCell: (params) => {
        console.log("params", params);
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleReturn(params.row.transactionID, params.row.id);
            }}
          >
            Return Book
          </Button>
        );
      },
    },
  ];

  // const rows = [
  //   { date: "2023-28-05", id: "bhavy#0001", isbn: "159848165151" },
  //   { date: "2023-08-05", id: "pawan#0001", isbn: "278948165151" },
  // ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ borderRadius: "25px", boxShadow: 10 }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default IssueTable;
