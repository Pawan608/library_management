import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { axiosFetch } from "../../axios/axiosFetch";
import { useCSRFstore } from "../../store/zustandstore";
export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275, borderRadius: "25px" }} elevation={10}>
      <CardContent>
        <Typography variant="h5" component="div">
          Head
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  );
}