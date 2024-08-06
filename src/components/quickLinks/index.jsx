import {List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const filteredData = ["History"];

export default function QuickLinks() {
  const navigate = useNavigate();
  return (
    <List className="rounded-sm">
      {filteredData.map((item, index) => (
        <ListItem
          key={index}
          className="bg-primary my-1 rounded-md cursor-pointer"
        >
          <ListItemText
            primary={item}
            className="text-white"
            onClick={() => navigate(item?.toLowerCase())}
          />
        </ListItem>
      ))}
    </List>
  );
}
