import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

import { PatientTable } from "../components/patient/PatientTable";
import PatientForm from "../components/patient/PatientForm";
import type { IPatientRequest } from "../type/patient/patientRequest";
import {
  deletePatientThunk,
  fetchPatientsThunk,
  updatePatientThunk,
} from "../store/patientThunk";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const DashBoard = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { patientList, loading, error } = useAppSelector(
    (state) => state.patient,
  );

  const handleFormDisplay = () => {
    setShowCreateForm(true);
  };

  const handleDeletePatient = (id: number) => {
    void dispatch(deletePatientThunk(id));
  };

  const handleUpdatePatient = async (patientData: IPatientRequest) => {
    return dispatch(updatePatientThunk({ patientData })).unwrap();
  };

  useEffect(() => {
    void dispatch(fetchPatientsThunk());
  }, [dispatch]);

  return (
    <Grid container flexDirection={"column"} spacing={2}>
      <Grid sx={{ my: 1, backgroundColor: "#f3f3f3" }}>
        <Typography fontSize={24}>Patient Dashboard</Typography>
      </Grid>
      <Grid container>
        {!showCreateForm && (
          <Button type="submit" variant="contained" onClick={handleFormDisplay}>
            <AddIcon />
            <Typography fontSize={16} textTransform={"none"}>
              Add New Patient
            </Typography>
          </Button>
        )}
        {showCreateForm && (
          <PatientForm setShowCreateForm={setShowCreateForm} />
        )}
      </Grid>

      {loading && <Typography>Loading patients...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <PatientTable
        PatientData={patientList}
        onDeletePatient={handleDeletePatient}
        onUpdatePatient={handleUpdatePatient}
      />
    </Grid>
  );
};
