import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";

export default function BasicSelect({ searchBy, setSearchBy }) {
  // function handling searchBy dropdown
  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <Grid item xs={3} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Search By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchBy}
          label="Search By"
          onChange={handleChange}
        >
          <MenuItem value={"authors"}>Author</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"isbn"}>ISBN</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}
