import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const GeneralDataGrid = ({
  rows,
  columns,
  rowsPerPageOptions,
  initialState,
  onRowClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const changePageHandler = (newPage) => {
    setPage(newPage);
  };
  const changeRowsPerPageHandler = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      page={page}
      onPageChange={changePageHandler}
      pageSize={rowsPerPage}
      onPageSizeChange={changeRowsPerPageHandler}
      rowsPerPageOptions={rowsPerPageOptions}
      initialState={initialState}
      onRowClick={onRowClick}
      sx={{
        "& .MuiDataGrid-columnHeader": {
          fontSize: "1rem",
          color: "var(--light)",
          fontWeight: "bold",
          fontFamily: "Montserrat",
          backgroundColor: "var(--green)",
        },
        "& .MuiDataGrid-cell": {
          color: "var(--dark)",
        },
      }}
    />
  );
};

export default GeneralDataGrid;
