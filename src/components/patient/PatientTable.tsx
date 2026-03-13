import type { FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { IPatientResponse } from "../../type/patient/patientResponse";

interface IPatientTable {
  PatientData: IPatientResponse[];
  onDeletePatient: (id: number) => void;
}

export const PatientTable: FC<IPatientTable> = ({
  PatientData,
  onDeletePatient,
}) => {
  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 100,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 100,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
      editable: true,
    },
    {
      field: "zipCode",
      headerName: "Zip code",
      width: 100,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete-patient"
          color="error"
          onClick={() => onDeletePatient(params.row.id as number)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={PatientData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
