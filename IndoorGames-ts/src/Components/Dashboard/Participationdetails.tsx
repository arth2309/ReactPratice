import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useContext } from "react";
import CountContext from "../../store/count-context";
import { Count, RegistrationDetails } from "../../Type";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { itemActions, countActions } from "../../store";

import Analysis from "./Analysis";

const Participationdetails = (props: { list: RegistrationDetails[] }) => {
  const ctx = useContext<Count>(CountContext);

  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.item.items);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "name",
      headerName: "Full Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "interested",
      headerName: "Interested",
      width: 110,
    },
    {
      field: "number",
      headerName: "No of Games",
      width: 110,
    },
    {
      field: "checked",
      headerName: "Games",
      width: 230,
    },
    {
      field: "type",
      headerName: "Table Tennis Type",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,

      renderCell: (params) => (
        <div>
          <Button
            style={{ marginRight: 10 }}
            variant="contained"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>

          {/* <Button
            variant="contained"
            onClick={() => handleUpdate(params.row.id)}
          >
            Update
          </Button> */}
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    dispatch(itemActions.removeItem(id));
    dispatch(countActions.decrement());

    ctx.count = ctx.count - 1;
  };

  // const handleUpdate = (id : number) => {

  //   dispatch(itemActions.updateItem(id));
  // }

  const rows = items;

  return (
    <>
      <Analysis />

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default Participationdetails;
