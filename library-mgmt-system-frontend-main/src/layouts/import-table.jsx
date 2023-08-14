import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';

export default function DataTable() {
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const [data, setData] = useState(rows);

const handleInputChange = (id, field, value) => {
  const newData = data.map((item) =>
    item.id === id ? { ...item, [field]: value } : item
  );
  setData(newData);
};

const columns = [
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'author', headerName: 'Author', width: 130 },
  { field: 'isbn', headerName: 'ISBN', width: 130 },
  {
    field: 'numBooks',
    headerName: 'Number of Books',
    width: 200,
    renderCell: (params) => (
      <TextField
        value={params.row.numBooks || 0}
        onChange={(e) => handleInputChange(params.row.id, 'numBooks', e.target.value)}
        type="number"
        variant="outlined"
      />
    ),
  },
];


  return (
    <div style={{width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
