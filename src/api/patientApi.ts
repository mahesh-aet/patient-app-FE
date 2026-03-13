import axios from "axios";
import type { IPatientRequest } from "../type/patient/patientRequest";

const API = "http://localhost:8080/api/v1/patient";

export const getPatients = () => axios.get(API);

export const createPatient = (patientData: IPatientRequest) =>
  axios.post(API, patientData);

export const updatePatient = (id: number, patientData: IPatientRequest) =>
  axios.put(`${API}/${id}`, patientData);

export const deletePatient = (id: number) => axios.delete(`${API}/${id}`);
