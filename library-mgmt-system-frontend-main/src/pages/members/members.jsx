import * as React from "react";
import CollapsibleTable from "./member-table";
import { Button, Box, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FormDialog from "./add-member-dialog-form";

export default function Members() {
    const theme = useTheme();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
          marginBottom: "25px",
        }}
        //backgroundColor={theme.palette.secondary.main}
      >
        <h1>Members</h1>
        <FormDialog />
      </Box>
      <Paper></Paper>
      <CollapsibleTable />
    </div>
  );
}
