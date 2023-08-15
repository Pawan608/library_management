import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function BasicCard({ data }) {
  return (
    <Card
      sx={{
        minWidth: 400,
        borderRadius: "25px",
        minHeight: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={10}
    >
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h5" component="div" sx={{ mb: "20px" }}>
            {data.heading}
          </Typography>
          <Typography
            sx={{ mb: "20px", fontSize: "30px", fontWeight: "600" }}
            component="h2"
            color="text.secondary"
          >
            {data.count}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: "auto" }}>
          {data.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
