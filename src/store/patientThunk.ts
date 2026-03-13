import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createPatient,
  deletePatient,
  getPatients,
  updatePatient,
} from "../api/patientApi";
import type { IPatientRequest } from "../type/patient/patientRequest";
import type { IPatientResponse } from "../type/patient/patientResponse";

interface IUpdatePatientPayload {
  patientData: IPatientRequest;
}

interface IApiErrorResponse {
  message?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<IApiErrorResponse>(error)) {
    const apiMessage = error.response?.data?.message;

    if (apiMessage) {
      return apiMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

export const fetchPatientsThunk = createAsyncThunk<
  IPatientResponse[],
  void,
  { rejectValue: string }
>("patient/fetchPatients", async (_, thunkApi) => {
  try {
    const response = await getPatients();
    return response.data as IPatientResponse[];
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createPatientThunk = createAsyncThunk<
  IPatientResponse,
  IPatientRequest,
  { rejectValue: string }
>("patient/createPatient", async (patientData, thunkApi) => {
  try {
    const response = await createPatient(patientData);
    return response.data as IPatientResponse;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const updatePatientThunk = createAsyncThunk<
  IPatientResponse,
  IUpdatePatientPayload,
  { rejectValue: string }
>("patient/updatePatient", async ({ patientData }, thunkApi) => {
  try {
    const response = await updatePatient(patientData);
    return response.data as IPatientResponse;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const deletePatientThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("patient/deletePatient", async (id, thunkApi) => {
  try {
    await deletePatient(id);
    return id;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});
