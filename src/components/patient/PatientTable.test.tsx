import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { PatientTable } from "./PatientTable";
import { useAppSelector } from "../../store/hooks";
import type { IPatientResponse } from "../../type/patient/patientResponse";

jest.mock("../../store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@mui/x-data-grid", () => {
  const DataGrid = (props: {
    columns: Array<{
      field: string;
      headerName?: string;
      renderCell?: (params: { row: IPatientResponse }) => React.ReactNode;
    }>;
    rows: IPatientResponse[];
  }) => {
    const firstRow = props.rows[0] as IPatientResponse;

    return (
      <div>
        {props.columns.map((column) => (
          <div key={column.field}>{column.headerName}</div>
        ))}
        <div>{firstRow.id}</div>
        <div>{firstRow.firstName}</div>
        <div>{firstRow.lastName}</div>
        <div>{firstRow.email}</div>
      </div>
    );
  };

  return {
    DataGrid,
    GridRowModes: {
      Edit: "edit",
    },
  };
});

describe("PatientTable", () => {
  const patientRows: IPatientResponse[] = [
    {
      id: 1,
      firstName: "mahesh",
      lastName: "kul",
      email: "mahesh@example.com",
      phoneNumber: "0771234567",
      address: "No 1",
      city: "Colombo",
      state: "Western",
      zipCode: "10100",
    },
  ];

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({ patient: { loading: false } }),
    );
  });

  it("renders expected table columns", () => {
    const onDeletePatientMock = jest.fn();
    const onUpdatePatientMock = jest.fn().mockResolvedValue(patientRows[0]);

    render(
      <PatientTable
        PatientData={patientRows}
        onDeletePatient={onDeletePatientMock}
        onUpdatePatient={onUpdatePatientMock}
      />,
    );

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Last name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone number")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("Zip code")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders table with mock patient data", () => {
    const onDeletePatientMock = jest.fn();
    const onUpdatePatientMock = jest.fn().mockResolvedValue(patientRows[0]);

    render(
      <PatientTable
        PatientData={patientRows}
        onDeletePatient={onDeletePatientMock}
        onUpdatePatient={onUpdatePatientMock}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("mahesh")).toBeInTheDocument();
    expect(screen.getByText("kul")).toBeInTheDocument();
    expect(screen.getByText("mahesh@example.com")).toBeInTheDocument();
  });
});
