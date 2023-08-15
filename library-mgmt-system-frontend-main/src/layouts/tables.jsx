import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { axiosFetch } from "../axios/axiosFetch";
import { returnColumns } from "../utils/return-table-utils";
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [transactions, setTransactions] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const getAllTransactions = async () => {
    const response = await axiosFetch("library/transaction/list/returned");
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
        transactions.reverse().map((transaction, index) => ({
          id: transaction.member.memberID,
          date: transaction.end_date,
          isbn: transaction.book.isbn,
          rent: transaction.total_amount,
          memberID: transaction.member.memberID,
        }))
      );
    }
  }, [transactions]);
  return (
    <Paper
      elevation={10}
      sx={{ width: "100%", overflow: "hidden", borderRadius: "25px" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead color="primary">
            <TableRow>
              {returnColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {returnColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
