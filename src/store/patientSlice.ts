import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import {
  createPatientThunk,
  deletePatientThunk,
  fetchPatientsThunk,
  updatePatientThunk,
} from "./patientThunk";
import type { IPatientState } from "../type/patient/patientState";

const initialState: IPatientState = {
  patientList: [],
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = action.payload;
      })
      .addCase(fetchPatientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch patients";
      })
      .addCase(createPatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList.push(action.payload);
      })
      .addCase(createPatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create patient";
      })
      .addCase(updatePatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = state.patientList.map((patient) =>
          patient.id === action.payload.id ? action.payload : patient,
        );
      })
      .addCase(updatePatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update patient";
      })
      .addCase(deletePatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = state.patientList.filter(
          (patient) => patient.id !== action.payload,
        );
      })
      .addCase(deletePatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete patient";
      });
  },
});

export const selectPatientList = (state: RootState) =>
  state.patient.patientList;
export const selectPatientLoading = (state: RootState) => state.patient.loading;
export const selectPatientError = (state: RootState) => state.patient.error;

export default patientSlice.reducer;
