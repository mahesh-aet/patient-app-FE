import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import PatientForm from "./PatientForm";
import { useAppDispatch } from "../../store/hooks";
import { createPatientThunk } from "../../store/patientThunk";

jest.mock("../../store/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("../../store/patientThunk", () => ({
  createPatientThunk: jest.fn((payload) => ({
    type: "patient/createPatient",
    payload,
  })),
}));

describe("PatientForm", () => {
  const setup = () => {
    const unwrapMock = jest.fn().mockResolvedValue({});
    const dispatchMock = jest.fn().mockReturnValue({ unwrap: unwrapMock });
    const setShowCreateFormMock = jest.fn();
    const onCreateSuccessMock = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

    render(
      <PatientForm
        setShowCreateForm={setShowCreateFormMock}
        onCreateSuccess={onCreateSuccessMock}
      />,
    );

    return {
      dispatchMock,
      unwrapMock,
      setShowCreateFormMock,
      onCreateSuccessMock,
    };
  };

  it("renders all patient form inputs", () => {
    setup();

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("Zip Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Patient" }),
    ).toBeInTheDocument();
  });

  it("updates field values when user types", () => {
    setup();

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneNumberInput = screen.getByLabelText("Phone Number");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(firstNameInput, { target: { value: "mahesh" } });
    fireEvent.change(lastNameInput, { target: { value: "kul" } });
    fireEvent.change(phoneNumberInput, { target: { value: "0771234567" } });
    fireEvent.change(emailInput, { target: { value: "mahesh@example.com" } });

    expect(firstNameInput).toHaveValue("mahesh");
    expect(lastNameInput).toHaveValue("kul");
    expect(phoneNumberInput).toHaveValue("0771234567");
    expect(emailInput).toHaveValue("mahesh@example.com");
  });

  it("submits patient details and triggers callbacks on success", async () => {
    const {
      dispatchMock,
      unwrapMock,
      setShowCreateFormMock,
      onCreateSuccessMock,
    } = setup();

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "mahesh" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "kul" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "0771234567" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "mahesh@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Patient" }));

    await waitFor(() => {
      expect(createPatientThunk).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "mahesh",
          lastName: "kul",
          phoneNumber: "0771234567",
          email: "mahesh@example.com",
        }),
      );
      expect(dispatchMock).toHaveBeenCalled();
      expect(unwrapMock).toHaveBeenCalled();
      expect(setShowCreateFormMock).toHaveBeenCalledWith(false);
      expect(onCreateSuccessMock).toHaveBeenCalled();
    });
  });
});
