// components/TableComponent.js
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {useState} from "react";

// Sample data
const data = [
  {
    param0: "header0",
    param1: "header1",
    param2: "header2",
    param3: "header3",
    param4: "header4",
    param5: "header5",
  },
  {
    param0: "body0",
    param1: "body1",
    param2: "body2",
    param3: "body3",
    param4: "body4",
    param5: "body5",
  },
  {
    param0: "body0",
    param1: "body1",
    param2: "body2",
    param3: "body3",
    param4: "body4",
    param5: "body5",
  },
  {
    param0: "body0",
    param1: "body1",
    param2: "body2",
    param3: "body3",
    param4: "body4",
    param5: "body5",
  },
  {
    param0: "body0",
    param1: "body1",
    param2: "body2",
    param3: "body3",
    param4: "body4",
    param5: "body5",
  },
  {
    param0: "body0",
    param1: "body1",
    param2: "body2",
    param3: "body3",
    param4: "body4",
    param5: "body5",
  },
];

const useStyles = makeStyles(() => ({
  stickyHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#4a5daa",
    zIndex: 1000,
  },
}));

const TableComponent = () => {
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy) {
      if (orderDirection === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
    return 0;
  });

  const headers = Object.values(data[0]);

  return (
    <Paper className="p-4">
      <div className="flex flex-row justify-between">
        <Typography variant="h5" color="primary" className="my-2">
          Transaction History
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          onChange={handleSearch}
        />
      </div>
      <TableContainer className="rounded-md">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sortDirection={orderBy === header ? orderDirection : false}
                  className={classes.stickyHeader}
                  sx={{color: "#fff"}}
                >
                  <TableSortLabel
                    active={orderBy === header}
                    direction={orderBy === header ? orderDirection : "asc"}
                    onClick={() => handleSortRequest(header)}
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(row).map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
