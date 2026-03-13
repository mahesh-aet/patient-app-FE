import type { FC } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridRowModes,
  type GridColDef,
  type GridRowId,
  type GridRowModel,
  type GridRowModesModel,
} from "@mui/x-data-grid";

import type { IPatientRequest } from "../../type/patient/patientRequest";
import type { IPatientResponse } from "../../type/patient/patientResponse";
import { useAppSelector } from "../../store/hooks";

interface IPatientTable {
  PatientData: IPatientResponse[];
  onDeletePatient: (id: number) => void;
  onUpdatePatient: (patientData: IPatientRequest) => Promise<IPatientResponse>;
}

export const PatientTable: FC<IPatientTable> = ({
  PatientData,
  onDeletePatient,
  onUpdatePatient,
}) => {
  const { loading } = useAppSelector((state) => state.patient);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleEditPatient = (id: GridRowId) => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 10,
      editable: false,
    },
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
      field: "email",
      headerName: "Email",
      width: 120,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      width: 120,
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
      width: 80,
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
      width: 80,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit the required cell" arrow>
            <IconButton
              aria-label="edit-patient"
              color="primary"
              onClick={() => handleEditPatient(params.row.id as number)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton
            aria-label="delete-patient"
            color="error"
            onClick={() => onDeletePatient(params.row.id as number)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const processRowUpdate = (
    newRow: GridRowModel<IPatientResponse>,
    oldRow: GridRowModel<IPatientResponse>,
  ) => {
    const updatedRow = newRow as IPatientResponse;
    const previousRow = oldRow as IPatientResponse;

    const hasRowChanged =
      updatedRow.firstName !== previousRow.firstName ||
      updatedRow.lastName !== previousRow.lastName ||
      updatedRow.address !== previousRow.address ||
      updatedRow.city !== previousRow.city ||
      updatedRow.state !== previousRow.state ||
      updatedRow.zipCode !== previousRow.zipCode ||
      updatedRow.phoneNumber !== previousRow.phoneNumber ||
      updatedRow.email !== previousRow.email;

    if (!hasRowChanged) {
      return previousRow;
    }

    return onUpdatePatient(updatedRow);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={PatientData}
        columns={columns}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
        }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error("Failed to update patient", error);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        loading={loading}
      />
    </Box>
  );
};
