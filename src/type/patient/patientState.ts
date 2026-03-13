import type { IPatientResponse } from "./patientResponse";

export interface IPatientState {
  patientList: IPatientResponse[];
  loading: boolean;
  error: string | null;
}
