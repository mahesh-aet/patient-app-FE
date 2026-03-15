/* eslint-disable react-hooks/set-state-in-effect */
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
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
  const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false);
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const { patientList, loading, error } = useAppSelector(
    (state) => state.patient,
  );

  const handleFormDisplay = () => {
    setShowCreateForm(true);
  };

  const handleDeletePatient = (id: number) => {
    void dispatch(deletePatientThunk(id))
      .unwrap()
      .then(() => {
        setSuccessMessage("Patient deleted successfully");
        setIsSuccessToastOpen(true);
      });
  };

  const handleCreateSuccess = () => {
    setSuccessMessage("Patient added successfully");
    setIsSuccessToastOpen(true);
  };

  const handleUpdatePatient = async (patientData: IPatientRequest) => {
    const updatedPatient = await dispatch(
      updatePatientThunk({ patientData }),
    ).unwrap();

    setSuccessMessage("Patient updated successfully");
    setIsSuccessToastOpen(true);

    return updatedPatient;
  };

  useEffect(() => {
    dispatch(fetchPatientsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setIsErrorToastOpen(true);
    }
  }, [error]);

  const handleCloseErrorToast = () => {
    setIsErrorToastOpen(false);
  };

  const handleCloseSuccessToast = () => {
    setIsSuccessToastOpen(false);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

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
          <PatientForm
            setShowCreateForm={setShowCreateForm}
            onCreateSuccess={handleCreateSuccess}
            handleCloseForm={handleCloseForm}
          />
        )}
      </Grid>

      {loading && <Typography>Loading patients...</Typography>}

      <PatientTable
        PatientData={patientList}
        onDeletePatient={handleDeletePatient}
        onUpdatePatient={handleUpdatePatient}
      />

      <Snackbar
        open={isErrorToastOpen}
        autoHideDuration={4000}
        onClose={handleCloseErrorToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseErrorToast}
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isSuccessToastOpen}
        autoHideDuration={3000}
        onClose={handleCloseSuccessToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
