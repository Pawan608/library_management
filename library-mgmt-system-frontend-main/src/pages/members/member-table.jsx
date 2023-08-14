import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./members.css"

function createData(name, id, books, debt, data) {
  return {
    name,
    id, 
    books,
    debt,
    history: data
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.books}</TableCell>
        <TableCell align="left">{row.debt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transactions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Issue Date</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell align="left">Return Date</TableCell>
                    <TableCell align="left">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.issueDate}
                      </TableCell>
                      <TableCell>{historyRow.isbn}</TableCell>
                      <TableCell align="left">{historyRow.returnDate}</TableCell>
                      <TableCell align="left">
                        85
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
    createData("Bhavy", "bhavy#0001", 4, 250, [{issueDate: "2023-07-25", isbn: "vtbdfbdgbg", returnDate: "NA"}, {issueDate: "2023-07-28", isbn: "cdscdsfbdgbg", returnDate: "2023-08-05"}]),
    createData("Pawan", "pawan#0002", 8, 840, [{issueDate: "2023-07-05", isbn: "dsgergfbdgbg", returnDate: "2023-07-04"}])
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} elevation={10} sx={{borderRadius: "25px"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className='col-name'>Name</TableCell>
            <TableCell className='col-name' align="left">Member ID</TableCell>
            <TableCell className='col-name' align="left">Books</TableCell>
            <TableCell className='col-name' align="left">Debt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}