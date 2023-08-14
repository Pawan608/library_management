import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {TextField} from "@mui/material";

export default function BasicList(props) {
  const list = (
    <div className="list">
      <List>
        {props.books.map((item) => (
          <ListItem disablePadding>
            <ListItemText primary={item.title} />
            <ListItemText primary={item.author} />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        {list}
      </nav>
    </Box>
  );
}
