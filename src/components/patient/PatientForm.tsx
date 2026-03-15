import type { FC } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { IPatientRequest } from "../../type/patient/patientRequest";
import { useAppDispatch } from "../../store/hooks";
import { createPatientThunk } from "../../store/patientThunk";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
});

interface IPatientForm {
  setShowCreateForm(value: boolean): void;
  onCreateSuccess: () => void;
  handleCloseForm: () => void;
}

const PatientForm: FC<IPatientForm> = ({
  setShowCreateForm,
  onCreateSuccess,
  handleCloseForm,
}) => {
  const dispatch = useAppDispatch();

  const initialValues: IPatientRequest = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
  };

  const handleSubmit = async (values: IPatientRequest) => {
    await dispatch(createPatientThunk(values)).unwrap();
    setShowCreateForm(false);
    onCreateSuccess();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched }) => {
        console.log(errors);
        return (
          <Form>
            <Grid
              container
              spacing={2}
              sx={{
                width: { xs: "300px", sm: "600px" },
                border: "1px solid",
                p: 5,
                borderRadius: 1,
              }}
            >
              <Grid container width={"100%"} justifyContent={"space-between"}>
                <Grid my={1}>
                  <Typography variant="h6">Patient Create Form</Typography>
                </Grid>
                <IconButton
                  aria-label="close-form"
                  color="primary"
                  onClick={handleCloseForm}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  value={values.zipCode}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained">
                  Create Patient
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PatientForm;
