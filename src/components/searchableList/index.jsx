import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSubBiller} from "../../redux";

function SearchableList({data, loading}) {
  const [searchQuery, setSearchQuery] = useState("");
  const {selectedSubBiller} = useSelector((state) => state.bbpsSlice);
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.billerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSubBiller = (val) => {
    dispatch(setSubBiller(val));
  };

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <div className="border-primary-light rounded-md border-2">
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
      />
      <div className="max-h-96 overflow-y-scroll">
        <List className="rounded-sm">
          {filteredData.map((item) => (
            <Fragment key={item.billerId}>
              <ListItem
                className={`${
                  selectedSubBiller.billerName === item.billerName
                    ? "bg-gray-100"
                    : ""
                } cursor-pointer`}
                onClick={() => handleSelectSubBiller(item)}
              >
                <ListItemText primary={item.billerName} />
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      </div>
    </div>
  );
}

export default SearchableList;
